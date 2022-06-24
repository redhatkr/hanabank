/************************************************************************************************
 * @file opb-common-layerpopup.js
 * @since 2012. 11. 20.
 * @author 오범석
 *
 * @filelocation 모든 페이지에서 공통적으로 include 하는 top 페이지 에서 사용 선언
 *
 * @fileoverview div 를 사용하여 popup 형태로 구현된 것
 *
 * @dependencies opb-base-namespace.js, JHanaAjax.js, opb-common-util.js
 *
 * @warn 수정 시 반드시 관리자와 상의하세요.  
 *
 * <pre>
 * ==============================================================================================
 * 변경이력:
 * DATE                AUTHOR        DESCRIPTION
 * ----------------------------------------------------------------------------------------------
 * 2012.11.08          오범석        최초작성 
 * 2015.07.17		   남기승		콜백 Alert 메시지 팝업 추가(openCallbakAlert_fnc)
 * 2015.11.06		   오범석		정적마크업을 팝업으로 띄우는 함수에 추가기능 적용(openSubLayerStatic_fnc)
 * </pre>
 ************************************************************************************************/

/**
 * <pre>
 * ===================================================================================
 * 변수 선언부
 * ===================================================================================
 * </pre>
 */
opb.common.layerpopup.closeFocusTarget_array = {}; /* 오프너 타겟ID */

opb.common.layerpopup.closeCallback_array = {}; /* 오프너 콜백함수  */

opb.common.layerpopup.dragHandle_class = 'draggable'; /* 드래그동작을 위한 class  */

opb.common.layerpopup.modalMaskLayerIDSufffix_str = 'OPB_modalMaskID_generatedByJS'; /* 모달용 마스크 suffix */

opb.common.layerpopup.modalMaskBackground_image = opb.base.IMG_SVR_DOMAIN + '/resource/img/blank.png'; /* 모달용 마스크 백그라운드 이미지 */

opb.common.layerpopup.loadingLayerID_str = 'OPB_loadingLayerID_generatedByJS';

opb.common.layerpopup.loading_image = opb.base.IMG_SVR_DOMAIN + '/resource/img/common/Loading.gif'; /* 처리중 이미지 */

opb.common.layerpopup.layerHas_class = 'OPB_layerClass_generateByJS'; /* 레이어 z-index 부여를 위한 css에 존재하지 않는 class  */

opb.common.layerpopup.messageDesign_CLASS = 'pop_ty11'; /* 메세지팝업 디자인을 위한 class, 실제 css 에 존재하는 요소  */

opb.common.layerpopup.layerNextFocus_str = 'OPB_layerNextFocus_generatedByJS';

opb.common.layerpopup.layerPrevFocus_str = 'OPB_layerPrevFocus_generatedByJS';

/**
 * <pre>
 * ===================================================================================
 * 레이어popup 컨트롤 관련
 * ===================================================================================
 * </pre>
 */
/* ---------------- open - start ---------------- */


opb.common.layerpopup.elementFocus = function(tmpTargetObj) {
	
	try {
		
		var targetObj = tmpTargetObj;
		
		if((typeof tmpTargetObj) == 'string') {
			targetObj = $j('#' + tmpTargetObj);
		}
		
		if((typeof targetObj) != 'object') {
			return;
		}
		
		if((typeof targetObj[0]) == 'object') {
			targetObj[0].focus();
		}else {
			targetObj.focus();
		}
		
	}catch(e) {
		// focus skip
	}
	
};

/**
 * Popup Layer를 화면에 출력합니다.
 *
 * @param {String} content_url 내용 URL
 * @param {String} layer_id 생성될 레이어의 ID(ID는 unique해야 한다)
 * @param {String} way 출력위치 (기본:우측, bottom:하단)
 * @param {Object} 팝업 창에 넘길 form Object
 * @param {String}{FormObj} click_obj 창 닫을 때 되돌아 가는 포커스 타겟 아이디
 * @param {Function} click_obj 창 닫을 때 호출하는 콜백함수
 */
opb.common.layerpopup.openLayer_fnc = function(content_url, layer_id, way, form_obj, click_obj, callback, show_id)
{
	try
	{
		/* 기존 팝업이 존재 할 경우 제거한다. (제거 전에 콜백함수를 제거한다.)  */
		opb.common.layerpopup.closeCallback_array[layer_id] = null;
		opb.common.layerpopup.closeLayer_fnc(layer_id);
		
		/* 레이어팝업의 z-index 값 부여. 기본 99이며, 레이어팝업에서 또다른 레이어팝업을 띄울경우 100씩 늘어난다.  */
		var _z_index = (1000 * $j('.' + opb.common.layerpopup.layerHas_class).size()) + 999;

		/* 레이어 닫을 때 되돌아갈 오프너의 아이디를 저장한다. 전달받은 OBJECT 또는 ID 가 없을경우 현재 포커스를 저장한다.  */
		if (opb.common.util.isEmpty_fnc(click_obj))
		{
			opb.common.layerpopup.closeFocusTarget_array[layer_id] = $j('body').find(':focus');
		}
		else
		{
			opb.common.layerpopup.closeFocusTarget_array[layer_id] = opb.common.layerpopup._makeJQueryObject_fnc(click_obj);
		}

		/* 레이어 닫을 때 호출할 콜백함수를 저장한다.  */
		opb.common.layerpopup.closeCallback_array[layer_id] = callback;
		
		/* 레이어를 안보이게 만든다. */
		var _layer = $j('<div/>').attr('id', layer_id).attr('tabindex', '-1').addClass(opb.common.layerpopup.layerHas_class).hide();
		_layer.css('position', 'absolute');
		_layer.css('z-index', _z_index);
		//$j('body').append(_layer);
		
		opb.common.layerpopup._appendThat_fnc(_layer, show_id);

		/* popup 호출 ajax */
		var hanaAjax = new hana.JHanaAjax(layer_id, true, true);

		/* ajax callback */
		hanaAjax.ajaxCommSubmitCallback(opb.base.APPLICATION_CONTEXT_ROOT + content_url, form_obj, function(isSuccess)
		{
			if (isSuccess)
			{
				/* 레이어팝업의 포커스 이동을 막기위한 DIV 추가  */
				_layer.prepend($j('<div/>').attr('id', layer_id + opb.common.layerpopup.layerPrevFocus_str).attr('tabindex', '0'));
				_layer.append($j('<div/>').attr('id', layer_id + opb.common.layerpopup.layerNextFocus_str).attr('tabindex', '0'));
				
				/* _viewport : 브라우저 화면 [넓이, 높이], _offset : 브라우저 [x, y]좌표   */
				var _viewport = opb.common.util.getViewport_fnc();
				var _offset = opb.common.util.getScrollOffset_fnc();
				
				/* 위치조정 전에 레이어를 먼저 보여준다. because 레이어 크기  */
				_layer.show();
				$j('.pop_cont').removeAttr('tabindex').attr('tabindex', '0');
				
				if (way == 'bottom' && (typeof opb.common.layerpopup.closeFocusTarget_array[layer_id]) == 'object')
				{
					var _position = $j(click_obj).offset();
					/* 레이어 팝업을 클릭한 객체 하단에 띄운다  */
					_layer.css('left', _position.left - 30);
					_layer.css('top', _position.top + opb.common.layerpopup.closeFocusTarget_array[layer_id].height() + 5);
				}
				else if (way == 'right' && (typeof opb.common.layerpopup.closeFocusTarget_array[layer_id]) == 'object')
				{
					var _position = $j(click_obj).offset();
					/* 레이어 팝업을 클릭한 객체 우측에 띄운다  */
					_layer.css('left', _position.left + opb.common.layerpopup.closeFocusTarget_array[layer_id].width() + 5);
					_layer.css('top', _position.top - 15);
				}
				else if (way === 'tooltipTypeList' &&  (typeof opb.common.layerpopup.closeFocusTarget_array[layer_id]) == 'object') 
				{	/* 20161108 :: day3 type으로 리스트타입의 툴팁이 팝업으로 생성됨 */

					var _position = $j(click_obj).offset()
					,	_width = $j(click_obj).width()
					,	_height = $j(click_obj).height()
					;

					_layer.css('left',_position.left + _width/2);
					_layer.css('top',_position.top);
				}
				else
				{
					/* 레이어 팝업 넓이가 화면 넓이보다 크다면 좌측 포지션값을 0으로 설정. 아니라면 중간위치에 오도록 설정   */
					_layer.css('left', (_layer.width() > _viewport[0] ? 0 : (_viewport[0] / 2) - (_layer.width() / 2)) + _offset[0]);
					/* 레이어 팝업 높이가 화면 높이보다 크다면 상단 포지션값을 0으로 설정. 아니라면 중간위치에 오도록 설정   */
					_layer.css('top', (_layer.height() > _viewport[1] ? 0 : (_viewport[1] / 2) - (_layer.height() / 2)) + _offset[1]);
				}

				//_layer.focus(); /* set layer focus  */

				/* 모달용 레이어마스크를 씌운다  
				 * 단, 아래방향의 툴팁이 아닐 경우만 */
				if (way === 'tooltipTypeList') {  
					opb.common.layerpopup._showMask_fnc(layer_id, 1, true);	//평상시에 보이는것처럼..
				} else {
					opb.common.layerpopup._showMask_fnc(layer_id, _z_index);
				}

				/* 레이어 팝업에서만 포커스가 이동하도록 처리한다. */
				opb.common.layerpopup.attachEventLayerFocus_fnc(layer_id);
				
				/* 드래그 기능 추가  */
				if ($j('#' + layer_id).find('.' + opb.common.layerpopup.dragHandle_class).length > 0)
				{
					$j('#' + layer_id).draggable({
						start : function() {
							$j(this).css('opacity', '0.3');

							$j(this).data("startingScrollTop", $j(this).parent().scrollTop());
						},
						stop : function() {
							$j(this).css('opacity', '1.0');
						},
						drag: function(event, ui) {
							var st = parseInt($j(this).data("startingScrollTop"));
							ui.position.top -= st;
						},
						cursor: 'move',
						containment: 'html',
						scroll: true,
						revert: false,
						/*
						scrollSensitivity: 100,*/
						handle : '.' + opb.common.layerpopup.dragHandle_class
					}).find('.' + opb.common.layerpopup.dragHandle_class).css('cursor', 'move');
				}
			}
			else
			{
				/* 실패 시 레이어 제거 (제거 전에 콜백함수를 제거한다.)  */
				opb.common.layerpopup.closeCallback_array[layer_id] = null;
				opb.common.layerpopup.closeLayer_fnc(layer_id);
			}

			/* 스크린리더에서 화면(DOM)을 새로 읽도록 처리한다.  */
			opb.common.layerpopup._rereadScreenReader_fnc($j('#' + layer_id + opb.common.layerpopup.layerPrevFocus_str));
		});

		/* 자동로그아웃시간 연장은 JHanaAjax 에서 처리한다. */
	}
	catch (e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.layerpopup.openLayer_fnc]');
	}
};

/**
 * Alert 레이어
 *
 * @param title 제목
 * @param message 메세지
 */
opb.common.layerpopup.openAlert_fnc = function(title, message, click_obj)
{
	opb.common.layerpopup.openMessage_fnc( {
		'isConfirm' : false,
		'title' : title,
		'message' : message,
		'clickObj' : click_obj
	});
};

/**
 * Confirm 레이어
 *
 * @param title 제목
 * @param message 메세지
 * @param callback 콜백함수
 */
opb.common.layerpopup.openConfirm_fnc_close = function(title, message, callback, click_obj)
{
	opb.common.layerpopup.openMessage_fnc_close( {
		'isConfirm' : true,
		'title' : title,
		'message' : message,
		'callback' : callback,
		'clickObj' : click_obj
	});
};





/**
 * Alert Callbak 레이어
 *
 * @param title 제목
 * @param message 메세지
 * @param callback 콜백함수
 */
opb.common.layerpopup.openCallbakAlert_fnc = function(title, message, callback, click_obj)
{
	opb.common.layerpopup.openMessage_fnc( {
		'isConfirm' : false,
		'title' : title,
		'message' : message,
		'callback' : callback,
		'clickObj' : click_obj
	});
};

/**
 * Confirm 레이어
 *
 * @param title 제목
 * @param message 메세지
 * @param callback 콜백함수
 */
opb.common.layerpopup.openConfirm_fnc = function(title, message, callback, click_obj)
{
	opb.common.layerpopup.openMessage_fnc( {
		'isConfirm' : true,
		'title' : title,
		'message' : message,
		'callback' : callback,
		'clickObj' : click_obj
	});
};

/**
 * 메세지 레이어
 *
 * @param config_obj 메세지 레이어 옵션
 */
opb.common.layerpopup.openMessage_fnc = function(config_obj)
{
	/* 여러개의 메세지 팝업을 위하여 개수를 레이어아이디에 추가한다.  */
	var _layer_id = 'opbLayerMessage' + $j('.' + opb.common.layerpopup.layerHas_class).size();

	try
	{
		var _closeBtnId = _layer_id + '_Close';
		var _okBtnId = _layer_id + '_OK';
		var _cancelBtnId = _layer_id + '_Cancel';

		/* 여러개의 메세지 팝업을 위하여 개수를 z-index 값에 반영한다.  */
		var _z_index = (1000 * $j('.' + opb.common.layerpopup.layerHas_class).size()) + 999;

		/* 레이어 닫을 때 되돌아갈 오프너의 아이디를 저장한다. 전달받은 OBJECT 또는 ID 가 없을경우 현재 포커스를 저장한다.  */
		if (opb.common.util.isEmpty_fnc(config_obj.clickObj))
		{
			opb.common.layerpopup.closeFocusTarget_array[_layer_id] = $j('body').find(':focus');
		}
		else
		{
			opb.common.layerpopup.closeFocusTarget_array[_layer_id] = opb.common.layerpopup._makeJQueryObject_fnc(config_obj.clickObj);
		}

		/* 메세지 팝업 HTML 생성 */
		var _html = new Array();
		config_obj.message = config_obj.message.replace(/\n/g,'<br/>');
		config_obj.message = config_obj.message.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
		try
		{
			_html[_html.length] = '<div class="' + opb.common.layerpopup.messageDesign_CLASS + '">';
			var _title = '';
			if (!opb.common.util.isEmpty_fnc(config_obj.title))
			{
				_title = config_obj.title.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>') + ' ';
				_html[_html.length] = '<h4>' + _title + '</h4>';
			}
			if (!opb.common.util.isEmpty_fnc(config_obj.time))
			{
				_html[_html.length] = '<p class="color03">' + config_obj.time + '</p>';
			}
			_html[_html.length] = '<div class="contBox01">';

			/*메세지 길이에 따라 정렬을 바꾸어준다.*/
			var _objMessageLength = (function(s,b,i,c){
				for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
				return b;
			})(config_obj.message);
			
			_objMessageLength > 87 ? _html[_html.length] = '<p style="text-align:left;">' + config_obj.message + '</p>' : _html[_html.length] = '<p>' + config_obj.message + '</p>';
			
			/* 시스템오류 상세내용이 있다면 자세히 보기를 보여준다. */
			if (!opb.common.util.isEmpty_fnc(config_obj.detailMsg))
			{
				_html[_html.length] = '<div class="btn_right">';
				_html[_html.length] = '<a class="btn_open" href="#//HanaBank" onclick="$j(this).find(\'img\').toggle();$j(this).parent().parent().next().toggle();">';
				_html[_html.length] = '<img src="' + opb.base.IMG_SVR_DOMAIN + '/resource/img/ico_plus.gif" alt="내용상세보기 열기" />';
				_html[_html.length] = '<img style="display:none;" src="' + opb.base.IMG_SVR_DOMAIN + '/resource/img/ico_minus.gif" alt="내용상세보기 닫기" />';
				_html[_html.length] = '</a></div>';
			}
			_html[_html.length] = '</div>';

			/* 시스템오류 상세내용이 있다면 상세내용을 보여준다. */
			if (!opb.common.util.isEmpty_fnc(config_obj.detailMsg))
			{
				_html[_html.length] = '<div class="info03" style="display:none;">';
				_html[_html.length] = '<ul>' + config_obj.detailMsg.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>') + '</ul>';
				_html[_html.length] = '</div>';
			}
			_html[_html.length] = '<div class="btn_ex01">';
			if (!opb.common.util.isEmpty_fnc(config_obj.okBtnText)) /*확인 버튼명을 변경할 수 있도록 수정*/ 
			{
				_html[_html.length] = '<span><a href="#//HanaBank" id="' + _okBtnId + '">'+config_obj.okBtnText+'</a></span>';
			}else{
				_html[_html.length] = '<span><a href="#//HanaBank" id="' + _okBtnId + '">확인</a></span>';
			}
			/* Confirm 메세지 팝업 일 경우 버튼 표현을 처리한다. */
			if ((typeof config_obj.isConfirm) == 'boolean' && config_obj.isConfirm)
			{
				if (!opb.common.util.isEmpty_fnc(config_obj.canBtnText))  /*취소 버튼명을 변경할 수 있도록 수정*/
				{
					_html[_html.length] = '<span class="exty01"><a href="#//HanaBank" id="' + _cancelBtnId + '">'+config_obj.canBtnText+'</a></span>';
				}else{
					_html[_html.length] = '<span class="exty01"><a href="#//HanaBank" id="' + _cancelBtnId + '">취소</a></span>';
				}
			}
			_html[_html.length] = '</div>';
			_html[_html.length] = '<div class="pop_close ' + opb.common.layerpopup.dragHandle_class + '"><a href="#//HanaBank"	id="' + _closeBtnId + '">';
			_html[_html.length] = '<img src="' + opb.base.IMG_SVR_DOMAIN + '/resource/img/common/btn_popclose.gif" alt="'+_title + '팝업 닫기" /></a>';
			_html[_html.length] = '</div>';
			_html[_html.length] = '</div>';
		}
		catch(e)
		{
			alert(location.href + '\n\n' + e + '\n[ERROR opb.common.layerpopup.getMessageHtml_fnc]');
			_html = new Array();
		}

		var _layer = $j('<div/>').attr('id', _layer_id).attr('tabindex', '-1').addClass(opb.common.layerpopup.layerHas_class).hide();
		_layer.css('position', 'absolute');
		_layer.css('z-index', _z_index);
		opb.common.layerpopup._appendThat_fnc(_layer, config_obj.clickObj);

		//_layer.width(0);
		//alert("->>"+_layer.width());
		
		_layer.html(_html.join(''));
		
		/* 레이어팝업의 포커스 이동을 막기위한 DIV 추가  */
		_layer.prepend($j('<div/>').attr('id', _layer_id + opb.common.layerpopup.layerPrevFocus_str).attr('tabindex', '0'));
		_layer.append($j('<div/>').attr('id', _layer_id + opb.common.layerpopup.layerNextFocus_str).attr('tabindex', '0'));
		
		/* Layer Show */
		/* _viewport : 브라우저 화면 [넓이, 높이], _offset : 브라우저 [x, y]좌표  */
		var _viewport = opb.common.util.getViewport_fnc();
		var _offset = opb.common.util.getScrollOffset_fnc();

		/* 레이어 팝업 넓이가 화면 넓이보다 크다면 좌측 포지션값을 0으로 설정. 아니라면 중간위치에 오도록 설정  */
		var $pop_ty11 = $j(_layer).find('.pop_ty11');
		//alert(_layer.width() +":"+ _viewport[0]);
		if(_layer.width() == _viewport[0]) {
			_layer.width($pop_ty11.width()+parseInt($pop_ty11.css('border-width'))+parseInt($pop_ty11.css('padding-left'))+parseInt($pop_ty11.css('padding-right')));
		}

		var _platformInfo = opb.common.util.getPlatformInfo();
		if(_platformInfo.Mobile) {
			$pop_ty11.css('padding-left', '5px');
			$pop_ty11.css('padding-right', '5px');
			$pop_ty11.css('border', '2px solid #2e9498');
		}
		
		if(!_platformInfo.Mobile && config_obj.screenFileNm == "wpdep406_70i_n_r") {//202110 renewal open
			$pop_ty11.css('width', '620px');
		}

		_layer.css('left', (_layer.width() > _viewport[0] ? 0 : (_viewport[0] / 2) - (_layer.width() / 2)) + _offset[0] + 2 );

		// CMS iframe 일때 top을 100px 로 고정
		if(parent.document.getElementById("bankIframe") != null) {
			_layer.css('top', 100);
		} else {
			/* 레이어 팝업 높이가 화면 높이보다 크다면 상단 포지션값을 0으로 설정. 아니라면 중간위치에 오도록 설정  */
			_layer.css('top', (_layer.height() > _viewport[1] ? 0 : (_viewport[1] / 2) - (_layer.height() / 2)) + _offset[1]);
			
			try {
				if (!opb.common.util.isEmpty_fnc(config_obj.targetObj) && $j('#' + config_obj.targetObj).length > 0) {
//					_layer.css('left', $j('#' + config_obj.targetObj).offset().left + 0);
					_layer.css('top', $j('#' + config_obj.targetObj).offset().top + 42);
				}
			} catch (e) {}
		}
 
		_layer.show();
  
		/* 모달용 레이어마스크를 씌운다  */
		opb.common.layerpopup._showMask_fnc(_layer_id, _z_index);

		/* 닫기버튼 클릭  */
		$j('#' + _closeBtnId).click( function()
		{
			opb.common.layerpopup.closeLayer_fnc(_layer_id);
			if ((typeof config_obj.callback) == 'function')
			{
				config_obj.callback(false);
			}
		});

		/* 확인버튼 클릭  */
		$j('#' + _okBtnId).click( function()
		{
			opb.common.layerpopup.closeLayer_fnc(_layer_id);
			if ((typeof config_obj.callback) == 'function')
			{
				config_obj.callback(true);
			}
		});

		/* Confirm 메세지 팝업 일 경우 이벤트를 처리한다. */
		if (config_obj.isConfirm)
		{
			/* 취소버튼 클릭  */
			$j('#' + _cancelBtnId).click( function()
			{
				opb.common.layerpopup.closeLayer_fnc(_layer_id);
				if ((typeof config_obj.callback) == 'function')
				{
					config_obj.callback(false);
				}
			});
		}

		/* 레이어 팝업에서만 포커스가 이동하도록 처리한다. */
		opb.common.layerpopup.attachEventLayerFocus_fnc(_layer_id);

		/* 드래그 기능 추가  */	
		if ($j('#' + _layer_id).find('.' + opb.common.layerpopup.dragHandle_class).length > 0)
		{
			$j('#' + _layer_id).draggable({
				start : function() {
					$j(this).css('opacity', '0.3');
					
					$j(this).data("startingScrollTop", $j(this).parent().scrollTop());
				},
				stop : function() {
					$j(this).css('opacity', '1.0');
				},
				drag: function(event, ui) {
					var st = parseInt($j(this).data("startingScrollTop"));
					ui.position.top -= st;
				},
				cursor: 'move',
				containment: 'html',
				scroll: true,
				revert: false,
				/*
				scrollSensitivity: 100,*/
				handle : '.' + opb.common.layerpopup.dragHandle_class
			}).find('.' + opb.common.layerpopup.dragHandle_class).css('cursor', 'move');
		}

		/* 자동로그아웃시간 연장은 처리하지 않는다. */

		/* 스크린리더에서 화면(DOM)을 새로 읽도록 처리한다.  */
		opb.common.layerpopup._rereadScreenReader_fnc($j('#' + _layer_id + opb.common.layerpopup.layerPrevFocus_str));
	}
	catch (e)
	{
		console.log(location.href + '\n\n' + e + '\n[ERROR opb.common.layerpopup.openMessage_fnc]');    
		/* (제거 전에 콜백함수를 제거한다.)  */
		opb.common.layerpopup.closeCallback_array[_layer_id] = null;		
		opb.common.layerpopup.closeLayer_fnc(_layer_id);
	}
};


/**
 * 메세지 레이어
 *
 * @param config_obj 메세지 레이어 옵션 닫기버튼 삭제
 */
opb.common.layerpopup.openMessage_fnc_close = function(config_obj)
{
	/* 여러개의 메세지 팝업을 위하여 개수를 레이어아이디에 추가한다.  */
	var _layer_id = 'opbLayerMessage' + $j('.' + opb.common.layerpopup.layerHas_class).size();

	try
	{
		var _closeBtnId = _layer_id + '_Close';
		var _okBtnId = _layer_id + '_OK';
		var _cancelBtnId = _layer_id + '_Cancel';

		/* 여러개의 메세지 팝업을 위하여 개수를 z-index 값에 반영한다.  */
		var _z_index = (1000 * $j('.' + opb.common.layerpopup.layerHas_class).size()) + 999;

		/* 레이어 닫을 때 되돌아갈 오프너의 아이디를 저장한다. 전달받은 OBJECT 또는 ID 가 없을경우 현재 포커스를 저장한다.  */
		if (opb.common.util.isEmpty_fnc(config_obj.clickObj))
		{
			opb.common.layerpopup.closeFocusTarget_array[_layer_id] = $j('body').find(':focus');
		}
		else
		{
			opb.common.layerpopup.closeFocusTarget_array[_layer_id] = opb.common.layerpopup._makeJQueryObject_fnc(config_obj.clickObj);
		}

		/* 메세지 팝업 HTML 생성 */
		var _html = new Array();
		config_obj.message = config_obj.message.replace(/\n/g,'<br/>');
		config_obj.message = config_obj.message.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
		try
		{
			_html[_html.length] = '<div class="' + opb.common.layerpopup.messageDesign_CLASS + '">';
			var _title = '';
			if (!opb.common.util.isEmpty_fnc(config_obj.title))
			{
				_title = config_obj.title.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>') + ' ';
				_html[_html.length] = '<h4>' + _title + '</h4>';
			}
			if (!opb.common.util.isEmpty_fnc(config_obj.time))
			{
				_html[_html.length] = '<p class="color03">' + config_obj.time + '</p>';
			}
			_html[_html.length] = '<div class="contBox01">';

			/*메세지 길이에 따라 정렬을 바꾸어준다.*/
			var _objMessageLength = (function(s,b,i,c){
				for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
				return b;
			})(config_obj.message);
			
			_objMessageLength > 87 ? _html[_html.length] = '<p style="text-align:left;">' + config_obj.message + '</p>' : _html[_html.length] = '<p>' + config_obj.message + '</p>';
			
			/* 시스템오류 상세내용이 있다면 자세히 보기를 보여준다. */
			if (!opb.common.util.isEmpty_fnc(config_obj.detailMsg))
			{
				_html[_html.length] = '<div class="btn_right">';
				_html[_html.length] = '<a class="btn_open" href="#//HanaBank" onclick="$j(this).find(\'img\').toggle();$j(this).parent().parent().next().toggle();">';
				_html[_html.length] = '<img src="' + opb.base.IMG_SVR_DOMAIN + '/resource/img/ico_plus.gif" alt="내용상세보기 열기" />';
				_html[_html.length] = '<img style="display:none;" src="' + opb.base.IMG_SVR_DOMAIN + '/resource/img/ico_minus.gif" alt="내용상세보기 닫기" />';
				_html[_html.length] = '</a></div>';
			}
			_html[_html.length] = '</div>';

			/* 시스템오류 상세내용이 있다면 상세내용을 보여준다. */
			if (!opb.common.util.isEmpty_fnc(config_obj.detailMsg))
			{
				_html[_html.length] = '<div class="info03" style="display:none;">';
				_html[_html.length] = '<ul>' + config_obj.detailMsg.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>') + '</ul>';
				_html[_html.length] = '</div>';
			}
			_html[_html.length] = '<div class="btn_ex01">';
			if (!opb.common.util.isEmpty_fnc(config_obj.okBtnText)) /*확인 버튼명을 변경할 수 있도록 수정*/ 
			{
				_html[_html.length] = '<span><a href="#//HanaBank" id="' + _okBtnId + '">'+config_obj.okBtnText+'</a></span>';
			}else{
				_html[_html.length] = '<span><a href="#//HanaBank" id="' + _okBtnId + '">확인</a></span>';
			}
			_html[_html.length] = '</div>';
			_html[_html.length] = '</div>';
		}
		catch(e)
		{
			alert(location.href + '\n\n' + e + '\n[ERROR opb.common.layerpopup.getMessageHtml_fnc]');
			_html = new Array();
		}

		var _layer = $j('<div/>').attr('id', _layer_id).attr('tabindex', '-1').addClass(opb.common.layerpopup.layerHas_class).hide();
		_layer.css('position', 'absolute');
		_layer.css('z-index', _z_index);
		opb.common.layerpopup._appendThat_fnc(_layer, config_obj.clickObj);

		//_layer.width(0);
		//alert("->>"+_layer.width());
		
		_layer.html(_html.join(''));
		
		/* 레이어팝업의 포커스 이동을 막기위한 DIV 추가  */
		_layer.prepend($j('<div/>').attr('id', _layer_id + opb.common.layerpopup.layerPrevFocus_str).attr('tabindex', '0'));
		_layer.append($j('<div/>').attr('id', _layer_id + opb.common.layerpopup.layerNextFocus_str).attr('tabindex', '0'));
		
		/* Layer Show */
		/* _viewport : 브라우저 화면 [넓이, 높이], _offset : 브라우저 [x, y]좌표  */
		var _viewport = opb.common.util.getViewport_fnc();
		var _offset = opb.common.util.getScrollOffset_fnc();

		/* 레이어 팝업 넓이가 화면 넓이보다 크다면 좌측 포지션값을 0으로 설정. 아니라면 중간위치에 오도록 설정  */
		var $pop_ty11 = $j(_layer).find('.pop_ty11');
		//alert(_layer.width() +":"+ _viewport[0]);
		if(_layer.width() == _viewport[0]) {
			_layer.width($pop_ty11.width()+parseInt($pop_ty11.css('border-width'))+parseInt($pop_ty11.css('padding-left'))+parseInt($pop_ty11.css('padding-right')));
		}

		var _platformInfo = opb.common.util.getPlatformInfo();
		if(_platformInfo.Mobile) {
			$pop_ty11.css('padding-left', '5px');
			$pop_ty11.css('padding-right', '5px');
			$pop_ty11.css('border', '2px solid #2e9498');
		}

		_layer.css('left', (_layer.width() > _viewport[0] ? 0 : (_viewport[0] / 2) - (_layer.width() / 2)) + _offset[0] + 2 );

		// CMS iframe 일때 top을 100px 로 고정
		if(parent.document.getElementById("bankIframe") != null) {
			_layer.css('top', 100);
		} else {
			/* 레이어 팝업 높이가 화면 높이보다 크다면 상단 포지션값을 0으로 설정. 아니라면 중간위치에 오도록 설정  */
			_layer.css('top', (_layer.height() > _viewport[1] ? 0 : (_viewport[1] / 2) - (_layer.height() / 2)) + _offset[1]);
			
			try {
				if (!opb.common.util.isEmpty_fnc(config_obj.targetObj) && $j('#' + config_obj.targetObj).length > 0) {
//					_layer.css('left', $j('#' + config_obj.targetObj).offset().left + 0);
					_layer.css('top', $j('#' + config_obj.targetObj).offset().top + 42);
				}
			} catch (e) {}
		}
 
		_layer.show();
  
		/* 모달용 레이어마스크를 씌운다  */
		opb.common.layerpopup._showMask_fnc(_layer_id, _z_index);

		/* 닫기버튼 클릭  */
		$j('#' + _closeBtnId).click( function()
		{
			opb.common.layerpopup.closeLayer_fnc(_layer_id);
			if ((typeof config_obj.callback) == 'function')
			{
				config_obj.callback(false);
			}
		});

		/* 확인버튼 클릭  */
		$j('#' + _okBtnId).click( function()
		{
			opb.common.layerpopup.closeLayer_fnc(_layer_id);
			if ((typeof config_obj.callback) == 'function')
			{
				config_obj.callback(true);
			}
		});

		/* Confirm 메세지 팝업 일 경우 이벤트를 처리한다. */
		if (config_obj.isConfirm)
		{
			/* 취소버튼 클릭  */
			$j('#' + _cancelBtnId).click( function()
			{
				opb.common.layerpopup.closeLayer_fnc(_layer_id);
				if ((typeof config_obj.callback) == 'function')
				{
					config_obj.callback(false);
				}
			});
		}

		/* 레이어 팝업에서만 포커스가 이동하도록 처리한다. */
		opb.common.layerpopup.attachEventLayerFocus_fnc(_layer_id);

		/* 드래그 기능 추가  */	
		if ($j('#' + _layer_id).find('.' + opb.common.layerpopup.dragHandle_class).length > 0)
		{
			$j('#' + _layer_id).draggable({
				start : function() {
					$j(this).css('opacity', '0.3');
					
					$j(this).data("startingScrollTop", $j(this).parent().scrollTop());
				},
				stop : function() {
					$j(this).css('opacity', '1.0');
				},
				drag: function(event, ui) {
					var st = parseInt($j(this).data("startingScrollTop"));
					ui.position.top -= st;
				},
				cursor: 'move',
				containment: 'html',
				scroll: true,
				revert: false,
				/*
				scrollSensitivity: 100,*/
				handle : '.' + opb.common.layerpopup.dragHandle_class
			}).find('.' + opb.common.layerpopup.dragHandle_class).css('cursor', 'move');
		}

		/* 자동로그아웃시간 연장은 처리하지 않는다. */

		/* 스크린리더에서 화면(DOM)을 새로 읽도록 처리한다.  */
		opb.common.layerpopup._rereadScreenReader_fnc($j('#' + _layer_id + opb.common.layerpopup.layerPrevFocus_str));
	}
	catch (e)
	{
		console.log(location.href + '\n\n' + e + '\n[ERROR opb.common.layerpopup.openMessage_fnc]');    
		/* (제거 전에 콜백함수를 제거한다.)  */
		opb.common.layerpopup.closeCallback_array[_layer_id] = null;		
		opb.common.layerpopup.closeLayer_fnc(_layer_id);
	}
};



/**
 * Sub Popup Layer를 화면에 출력합니다.
 * [기능추가] 출력위치 중앙 추가 (way = 'center')
 * [기능추가] 모달창으로 뜨는 기능 추가 (isModal = true)
 *
 * @param {Object} click_obj Sub Popup Layer를 위치시킬 오브젝트 (되돌아가는 obj로도 사용합니다.)
 * @param {String} layer_id 생성할 레이어의 아이디
 * @param {String} content Layer에 출력할 HTML
 * @param {String} way 출력위치 (기본:우측, bottom:하단, center:중앙)
 * @param {Boolean} isModal 모달팝업 여부 (true:모달)
 */
opb.common.layerpopup.openSubLayerStatic_fnc = function(click_obj, layer_id, contents, way, isModal, show_id)
{
	try
	{
		/* 기존 팝업이 존재 할 경우 제거한다.(제거 전에 콜백함수를 제거한다.)  */
		opb.common.layerpopup.closeCallback_array[layer_id] = null;
		opb.common.layerpopup.closeLayer_fnc(layer_id);
		
		var _z_index = (1000 * $j('.' + opb.common.layerpopup.layerHas_class).size()) + 999;

		/* 레이어 닫을 때 되돌아갈 오프너의 아이디를 저장한다. 전달받은 OBJECT 또는 ID 가 없을경우 현재 포커스를 저장한다.  */
		if (opb.common.util.isEmpty_fnc(click_obj))
		{
			opb.common.layerpopup.closeFocusTarget_array[layer_id] = $j('body').find(':focus');
		}
		else
		{
			opb.common.layerpopup.closeFocusTarget_array[layer_id] = opb.common.layerpopup._makeJQueryObject_fnc(click_obj);
		}

		// 레이어를 안보이게 만든다.
		var _layer = $j('<div/>').attr('id', layer_id).attr('tabindex', '-1').addClass(opb.common.layerpopup.layerHas_class).hide();
		_layer.css('position', 'absolute');
		_layer.css('z-index', _z_index);
		
		// HTML 입력
		_layer.html(contents);

		/* 레이어팝업의 포커스 이동을 막기위한 DIV 추가  */
		_layer.prepend($j('<div/>').attr('id', layer_id + opb.common.layerpopup.layerPrevFocus_str).attr('tabindex', '0'));
		_layer.append($j('<div/>').attr('id', layer_id + opb.common.layerpopup.layerNextFocus_str).attr('tabindex', '0'));

		opb.common.layerpopup._appendThat_fnc(_layer, show_id);

		var _position = $j(click_obj).offset();
		if(opb.common.util.isEmpty_fnc(_position)) {
			_position = {
					'top' : '100',
					'left' : '100'
			};
		}
		
		var _position = $j(click_obj).offset();

		/* 레이어 팝업 뜨는 위치 재조정  */
		if (way == 'bottom')
		{
			_layer.css('left', _position.left - 30);
			_layer.css('top', _position.top + $j(click_obj).height() + 5);
		}
		else if(way == 'center')
		{
			var _viewport = opb.common.util.getViewport_fnc();
			var _offset = opb.common.util.getScrollOffset_fnc();
			_layer.css('left', (_layer.width() > _viewport[0] ? 0 : (_viewport[0] / 2) - (_layer.width() / 2)) + _offset[0]);
			_layer.css('top', (_layer.height() > _viewport[1] ? 0 : (_viewport[1] / 2) - (_layer.height() / 2)) + _offset[1]);
		}
		else if(way == 'non')
		{
			_layer.css('left', _position.left + ($j(click_obj).width()/2));
			_layer.css('top', _position.top);
		}
		else
		{
			_layer.css('left', _position.left + $j(click_obj).width() + 5);
			_layer.css('top', _position.top);
		}

		_layer.show();
		//_layer.focus(); /* set layer focus  */

		/* 모달/모달리스 구분 처리 */
		if(isModal)
		{
			/* 모달용 레이어마스크를 씌운다  */
			opb.common.layerpopup._showMask_fnc(layer_id, _z_index);
			
			/* 드래그 기능 추가  */
			if ($j('#' + layer_id).find('.' + opb.common.layerpopup.dragHandle_class).length > 0)
			{
				$j('#' + layer_id).draggable({
					start : function() {
						$j(this).css('opacity', '0.3');
						
						$j(this).data("startingScrollTop", $j(this).parent().scrollTop());
					},
					stop : function() {
						$j(this).css('opacity', '1.0');
					},
					drag: function(event, ui) {
						var st = parseInt($j(this).data("startingScrollTop"));
						ui.position.top -= st;
					},
					cursor: 'move',
					containment: 'html',
					scroll: true,
					revert: false,
					/*
					scrollSensitivity: 100,*/
					handle : '.' + opb.common.layerpopup.dragHandle_class
				}).find('.' + opb.common.layerpopup.dragHandle_class).css('cursor', 'move');
			}			
		}
		else
		{
			/* 닫기 초기 값 설정  */
			var _is_close = false;
			
			/* click 이벤트 추가  */
			$j('body').unbind('click.' + layer_id).bind('click.' + layer_id, function(jevent) {
				/* 서브팝업일 경우 모달 제거하고, 다른곳 클릭하면 사라진다.  */
				if(_is_close && $j('#' + layer_id).find($j(jevent.target)).size() == 0) {
					/* 여기서 닫기가 콜 되는경우 포커스 이동하지 않는다. (제거 전에 콜백함수를 제거한다.)  */
					opb.common.layerpopup.closeCallback_array[layer_id] = null;
					opb.common.layerpopup.closeFocusTarget_array[layer_id] = null;
					opb.common.layerpopup.closeLayer_fnc(layer_id);
				}
				_is_close = true;
			});
		}
		
		/* 레이어 팝업에서만 포커스가 이동하도록 처리한다. */
		opb.common.layerpopup.attachEventLayerFocus_fnc(layer_id);

		/* 스크린리더에서 화면(DOM)을 새로 읽도록 처리한다.  */
		opb.common.layerpopup._rereadScreenReader_fnc($j('#' + layer_id + opb.common.layerpopup.layerPrevFocus_str));

		/* 자동로그아웃시간 연장은 JHanaAjax 에서 처리한다. */
	}
	catch (e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.layerpopup.openSubLayerStatic_fnc]');
	}
};

/**
 * 기능성 Sub Popup Layer를 화면에 출력합니다.
 *
 * @param {Object} click_obj Sub Popup Layer를 위치시킬 오브젝트 (되돌아가는 obj로도 사용합니다.)
 * @param {String} layer_id 생성할 레이어의 아이디
 * @param {Array} item_array Layer에 출력할 항목을 나열한 배열
 * @param {String} way 레이어팝업출력위치 (기본:우측, bottom:하단)
 */
opb.common.layerpopup.openSubLayerFunction_fnc = function(click_obj, layer_id, item_array, way, show_id)
{
	try
	{
		if(((typeof item_array) != 'array' && (typeof item_array) != 'object') || item_array.length == 0)
		{
			// 항목이 올바르지 않습니다.
			return;
		}

		var _html = new Array();
		if (way == 'bottom'){
			_html[_html.length] = '<div class="bankinfo_down">';
		}else{
			_html[_html.length] = '<div class="bankinfo">';
		}
		_html[_html.length] = '	<div class="lst_info">';
		_html[_html.length] = '		<ul>';

		/* 항목배열 수만큼 반복하여 새로운 항목을 만든다.  */
		$j.each(item_array, function(idx, items)
		{
			/* 항목이 배열일 경우에만 노출한다.  */
			if(((typeof items) == 'array' || (typeof items) == 'object'))
			{
				/* 항목이 모자를 경우 5개로 맞춘다.  */
				while(items.length < 5)
				{
					items[items.length] = '';
				}

				var i = 0;
				//itemText, href, is_ajax, params, _funcname
				var _itemtext = items[i++];
				var _href = items[i++];
				var _is_ajax = items[i++];
				var _params = items[i++];
				if((typeof _params) == 'string')
				{
					_params = decodeURIComponent(_params);
				}
				var _funcname = items[i++];

				var _onclick = 'opb.common.layerpopup.closeLayer_fnc(\'' + layer_id + '\');';
				if (!opb.common.util.isEmpty_fnc(_href))
				{
					/* 온클릭 이벤트 내용을 만든다.  */
					if (!opb.common.util.isEmpty_fnc(_funcname))
					{
						_onclick += _funcname + '(\'' + _href + '\', ' + _is_ajax + ', \'' + _params + '\');';
					}
					else
					{
						_onclick += 'opb.common.util.goPage_fnc(\'' + _href + '\', ' + _is_ajax + ', \'' + _params + '\');';
					}
					_html[_html.length] = '			<li><a href="#//HanaBank" onclick="' + _onclick + '">' + _itemtext + '</a></li>';
				}
				else
				{
					if (!opb.common.util.isEmpty_fnc(_funcname))
					{
						_onclick += _funcname.replace(/\"/g, "'");
						_html[_html.length] = '			<li><a href="#//HanaBank" onclick="' + _onclick + '">' + _itemtext + '</a></li>';
					}
					else
					{
						_html[_html.length] = '			<li>' + _itemtext + '</li>';
					}
				}
			}
		});

		_html[_html.length] = '		</ul>';
		_html[_html.length] = '	</div>';
		if (way == 'bottom'){
			_html[_html.length] = '	<div class="arrow"><img src="' + opb.base.IMG_SVR_DOMAIN + '/resource/img/btn/ico_arrow_top.png" alt="" /></div>';
		}else{
			_html[_html.length] = '	<div class="arrow"><img src="' + opb.base.IMG_SVR_DOMAIN + '/resource/img/btn/ico_arrow.png" alt="" /></div>';
		}
		_html[_html.length] = '	<div class="close02"><a href="#//HanaBank" onclick="opb.common.layerpopup.closeLayer_fnc(\'' + layer_id + '\');"><img src="' + opb.base.IMG_SVR_DOMAIN + '/resource/img/btn/btn_close02.gif" alt="팝업 닫기" /></a></div>';
		_html[_html.length] = '</div>';

		/* SubLayer를 Static 함수로 보여준다.  */
		opb.common.layerpopup.openSubLayerStatic_fnc(click_obj, layer_id, _html.join(''), way, false, show_id);

		/* 자동로그아웃시간 연장은 처리하지 않는다. */
	}
	catch (e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.layerpopup.openSubLayerFunction_fnc]');
	}
};

/**
 * 기능성 Sub Popup Layer를 화면에 출력합니다.
 *
 * @param {Object} click_obj Sub Popup Layer를 위치시킬 오브젝트 (되돌아가는 obj로도 사용합니다.)
 * @param {String} layer_id 생성할 레이어의 아이디
 * @param {Array} item_array Layer에 출력할 항목을 나열한 배열
 * @param {String} way 레이어팝업출력위치 (기본:우측, bottom:하단)
 */
opb.common.layerpopup.openSubLayerFunction2_fnc = function(click_obj, layer_id, item_array, show_id)
{	
	try
	{
		if(((typeof item_array) != 'array' && (typeof item_array) != 'object') || item_array.length == 0)
		{
			// 항목이 올바르지 않습니다.
			return;
		}

		var _html = new Array();
		_html[_html.length] = '<div class="tooltip type_list">';
		_html[_html.length] = '    <ul>';

		/* 항목배열 수만큼 반복하여 새로운 항목을 만든다.  */
		$j.each(item_array, function(idx, items)
		{
			/* 항목이 배열일 경우에만 노출한다.  */
			if(((typeof items) == 'array' || (typeof items) == 'object'))
			{
				/* 항목이 모자를 경우 5개로 맞춘다.  */
				while(items.length < 5)
				{
					items[items.length] = '';
				}

				var i = 0;
				//itemText, href, is_ajax, params, _funcname
				var _itemtext = items[i++];
				var _href = items[i++];
				var _is_ajax = items[i++];
				var _params = items[i++];
				if((typeof _params) == 'string')
				{
					_params = decodeURIComponent(_params);
				}
				var _funcname = items[i++];

				var _onclick = 'opb.common.layerpopup.closeLayer_fnc(\'' + layer_id + '\');';
				if (!opb.common.util.isEmpty_fnc(_href))
				{
					/* 온클릭 이벤트 내용을 만든다.  */
					if (!opb.common.util.isEmpty_fnc(_funcname))
					{
						_onclick += _funcname + '(\'' + _href + '\', ' + _is_ajax + ', \'' + _params + '\');';
					}
					else
					{
						_onclick += 'opb.common.util.goPage_fnc(\'' + _href + '\', ' + _is_ajax + ', \'' + _params + '\');';
					}
					_html[_html.length] = '			<li><a href="#//HanaBank" onclick="' + _onclick + '">' + _itemtext + '</a></li>';
				}
				else
				{
					if (!opb.common.util.isEmpty_fnc(_funcname))
					{
						_onclick += _funcname.replace(/\"/g, "'");
						_html[_html.length] = '			<li><a href="#//HanaBank" onclick="' + _onclick + '">' + _itemtext + '</a></li>';
					}
					else
					{
						_html[_html.length] = '			<li>' + _itemtext + '</li>';
					}
				}
			}
		});

		_html[_html.length] = '    </ul>';
		_html[_html.length] = '    <button type="button" class="close" onclick="opb.common.layerpopup.closeLayer_fnc(\'' + layer_id + '\');">닫기</button>';
		_html[_html.length] = '</div>';

		/* SubLayer를 Static 함수로 보여준다.  */
		opb.common.layerpopup.openSubLayerStatic_fnc(click_obj, layer_id, _html.join(''), 'non', false, show_id);

		/* 자동로그아웃시간 연장은 처리하지 않는다. */
	}
	catch (e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.layerpopup.openSubLayerFunction2_fnc]');
	}
};


/**
 * Sub Popup Layer를 화면에 출력합니다.
 * [기능추가] 출력위치 중앙 추가 (way = 'center')
 * [기능추가] 모달창으로 뜨는 기능 추가 (isModal = true)
 *
 * @param {Object} click_obj Sub Popup Layer를 위치시킬 오브젝트 (되돌아가는 obj로도 사용합니다.)
 * @param {String} layer_id 생성할 레이어의 아이디
 * @param {String} content Layer에 출력할 HTML
 * @param {String} way 출력위치 (기본:우측, bottom:하단, center:중앙)
 * @param {Boolean} isModal 모달팝업 여부 (true:모달)
 */
opb.common.layerpopup.openSubLayerStaticRenewal_fnc = function(click_obj, layer_id, contents, way, isModal, show_id)
{
	try
	{
		/* 기존 팝업이 존재 할 경우 제거한다.(제거 전에 콜백함수를 제거한다.)  */
		opb.common.layerpopup.closeCallback_array[layer_id] = null;
		opb.common.layerpopup.closeLayer_fnc(layer_id);
		
		var _z_index = (1000 * $j('.' + opb.common.layerpopup.layerHas_class).size()) + 999;

		/* 레이어 닫을 때 되돌아갈 오프너의 아이디를 저장한다. 전달받은 OBJECT 또는 ID 가 없을경우 현재 포커스를 저장한다.  */
		if (opb.common.util.isEmpty_fnc(click_obj))
		{
			opb.common.layerpopup.closeFocusTarget_array[layer_id] = $j('body').find(':focus');
		}
		else
		{
			opb.common.layerpopup.closeFocusTarget_array[layer_id] = opb.common.layerpopup._makeJQueryObject_fnc(click_obj);
		}

		var str = contents;
		var divObj = document.createElement('div');
		divObj.className = 'button-tooltip-position';
		divObj.id =layer_id;
		divObj.innerHTML = str;
		//$(click_obj).parent().append(divObj);
		var cObj = $(click_obj);
		cObj.parentNode.appendChild(divObj)
		
		var _position = $j(click_obj).offset();
		if(opb.common.util.isEmpty_fnc(_position)) {
			_position = {
					'top' : '100',
					'left' : '100'
			};
		}
		
		/* 모달/모달리스 구분 처리 */
		if(!isModal){
			/* 닫기 초기 값 설정  */
			var _is_close = false;
			
			/* click 이벤트 추가  */
			$j('body').unbind('click.' + layer_id).bind('click.' + layer_id, function(jevent) {
				/* 서브팝업일 경우 모달 제거하고, 다른곳 클릭하면 사라진다.  */
				if(_is_close && $j('#' + layer_id).find($j(jevent.target)).size() == 0) {
					/* 여기서 닫기가 콜 되는경우 포커스 이동하지 않는다. (제거 전에 콜백함수를 제거한다.)  */
					opb.common.layerpopup.closeCallback_array[layer_id] = null;
					opb.common.layerpopup.closeFocusTarget_array[layer_id] = null;
					opb.common.layerpopup.closeLayer_fnc(layer_id);
					cObj.classList.remove('on');
				}
				_is_close = true;
			});
		}
		
		/* 레이어 팝업에서만 포커스가 이동하도록 처리한다. */
		opb.common.layerpopup.attachEventLayerFocus_fnc(layer_id);

		/* 스크린리더에서 화면(DOM)을 새로 읽도록 처리한다.  */
		opb.common.layerpopup._rereadScreenReader_fnc($j('#' + layer_id + opb.common.layerpopup.layerPrevFocus_str));

		/* 자동로그아웃시간 연장은 JHanaAjax 에서 처리한다. */
	}
	catch (e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.layerpopup.openSubLayerStatic_fnc]');
	}
};

/**
 * renewal 추가 
 * 기능성 Sub Popup Layer를 화면에 출력합니다.
 *
 * @param {Object} click_obj Sub Popup Layer를 위치시킬 오브젝트 (되돌아가는 obj로도 사용합니다.)
 * @param {String} layer_id 생성할 레이어의 아이디
 * @param {Array} item_array Layer에 출력할 항목을 나열한 배열
 * @param {String} way 레이어팝업출력위치 (기본:우측, bottom:하단)
 */
opb.common.layerpopup.openSubLayerFunction3_fnc = function(click_obj, layer_id, item_array, show_id)
{	
	try
	{
		if(((typeof item_array) != 'array' && (typeof item_array) != 'object') || item_array.length == 0)
		{
			// 항목이 올바르지 않습니다.
			return;
		}
		
		var _html = new Array();
		//_html[_html.length] = '<div class="button-tooltip-position">';
		_html[_html.length] = '    <ul class="button-tooltip">';

		/* 항목배열 수만큼 반복하여 새로운 항목을 만든다.  */
		$j.each(item_array, function(idx, items)
		{
			/* 항목이 배열일 경우에만 노출한다.  */
			if(((typeof items) == 'array' || (typeof items) == 'object'))
			{
				/* 항목이 모자를 경우 5개로 맞춘다.  */
				while(items.length < 5)
				{
					items[items.length] = '';
				}

				var i = 0;
				//itemText, href, is_ajax, params, _funcname
				var _itemtext = items[i++];
				var _href = items[i++];
				var _is_ajax = items[i++];
				var _params = items[i++];
				if((typeof _params) == 'string')
				{
					_params = decodeURIComponent(_params);
				}
				var _funcname = items[i++];

				var _onclick = 'opb.common.layerpopup.closeLayer2_fnc(\'' + layer_id + '\');';
				if (!opb.common.util.isEmpty_fnc(_href))
				{
					/* 온클릭 이벤트 내용을 만든다.  */
					if (!opb.common.util.isEmpty_fnc(_funcname))
					{
						/*
						 * 리뉴얼 버튼 컨트롤 관련하여 수정  (계좌조회 화면에 2개의 버튼만 표시)
						 * [menuFunction],[openFundRepurchase] function이 아닌 경우 , 전달받은 param을 잘라서 매핑시킴
						 * ex. 'value1&value2&value3'  -> (value1, value2, value3)
						 * 
						 * */
						if(_funcname.indexOf('menuFunction') < 0 && _funcname.indexOf('openFundRepurchase') < 0 && _funcname.indexOf('openPopupEarningRateReport') < 0){
							var splitParams = _params.split('&');	

							_onclick += _funcname + '(';
							for(var i = 0; i< splitParams.length; i++ ){
								if(splitParams[i] == "[object HTMLButtonElement]"){
									_onclick += 'this' ;
									if(i < splitParams.length - 1){
										_onclick +=  ',';
									}
									
								}else{
									_onclick += '\'' + splitParams[i] +  '\'';
									if(i < splitParams.length - 1){
										_onclick +=  ',';
									}
								}
							}
							
							_onclick += ');';
						}else{
							/*
							 * 리뉴얼 버튼 컨트롤 관련하여 수정  (계좌조회 화면에 2개의 버튼만 표시)
							 * [menuFunction],[openFundRepurchase] function인 경우 , 전달받은 param 그대로 전달
							 * ex. _params='value1&value2&value3' -> _params='value1&value2&value3'
							 * 
							 * */
							_onclick += _funcname + '(\'' + _href + '\', ' + _is_ajax + ', \'' + _params + '\');';
						}
					}
					else
					{
						_onclick += 'opb.common.util.goPage_fnc(\'' + _href + '\', ' + _is_ajax + ', \'' + _params + '\');';
					}
					_html[_html.length] = '			<li><a href="#//HanaBank" onclick="' + _onclick + '">' + _itemtext + '</a></li>';
				}
				else
				{
					if (!opb.common.util.isEmpty_fnc(_funcname))
					{
						_onclick += _funcname.replace(/\"/g, "'");
						_html[_html.length] = '			<li><a href="#//HanaBank" onclick="' + _onclick + '">' + _itemtext + '</a></li>';
					}
					else
					{
						_html[_html.length] = '			<li>' + _itemtext + '</li>';
					}
				}
			}
		});
		
		_html[_html.length] =  '<li><button type="button" class="tooltip-close" onclick="opb.common.layerpopup.closeLayer2_fnc(\'' + layer_id + '\', this);" title="툴팁팝업 닫기"><img src="' + opb.base.IMG_SVR_DOMAIN + '/resource/simple/img/renewal/btn-tootip-close.png" alt="툴팁팝업 닫기 이미지" /></button></li>';
		_html[_html.length] =   '    </ul>';
		//_html[_html.length] =   '</div>';
		
		/* SubLayer를 Static 함수로 보여준다.  */
		opb.common.layerpopup.openSubLayerStaticRenewal_fnc(click_obj, layer_id, _html.join(''), 'non', false, show_id);
		/* 자동로그아웃시간 연장은 처리하지 않는다. */
	}
	catch (e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.layerpopup.openSubLayerFunctionRenewal_fnc]');
	}
};

/**
 * 로딩바 카운트 관리 Stack
 */ 
loadingStack = function() {
	/** 로딩 카운트 관리 **/
	var loadings = [];
	
    this.getLoadings = function() {
        return loadings;
    };

    this.clear = function() {
        loadings = [];
    };
};

loadingStack.prototype = {
		
	isEmpty : function() {
		return this.getLoadings().length == 0 ? true : false;
	}, 
	length : function() {
		return this.getLoadings().length;
	},
	length : function() {
		return this.getLoadings().length;
	},
	push : function() {
		this.getLoadings().push(this.getLoadings().length);
	},
	pop : function() {
		var element = this.peek();
		this.getLoadings().pop();
		return element;
	},
	peek : function() {
		var loadings = this.getLoadings();
		var element = loadings[loadings.length-1] == undefined ? null : loadings[loadings.length-1];
		return element;
	},
	clear : function() {
		this.clear();
	}
};
var ajaxloadingStack = new loadingStack();

/**
 * 로딩 레이어
 */
opb.common.layerpopup.openLoading_fnc = function()
{
	try
	{
		/* Layer Show */
		/* _viewport : 브라우저 화면 [넓이, 높이], _offset : 브라우저 [x, y]좌표  */
		var _viewport = opb.common.util.getViewport_fnc();
		var _offset = opb.common.util.getScrollOffset_fnc();
		
		/* 화면높이가 0 이면 표시하지 않는다 */
		if(_viewport[1] == 0) {
			return;
		}
		
		var _z_index = 99999;

		var _loading_layer = $j('#' + opb.common.layerpopup.loadingLayerID_str);

		/* 생성된 처리중 레이어가 없을경우 새로 생성한다.  */
		if(_loading_layer.length == 0)
		{
			_loading_layer = $j('<div/>').attr('id', opb.common.layerpopup.loadingLayerID_str).hide();
			_loading_layer.css('position', 'absolute');
			_loading_layer.css('z-index', _z_index);
			_loading_layer.attr('style', 'position:absolute; z-index:16777271; background-image:url(' + opb.base.IMG_SVR_DOMAIN + '/resource/img/common/Loading.gif);  no-repeat; background-position: center; height: 146px; width: 315px;');
//			_loading_layer.css('width', '300');
//			_loading_layer.css('height', '300');

			/* 로딩 HTML  */
			//_loading_layer.html('<div><img src="' + opb.common.layerpopup.loading_image + '" alt="처리중" complete="complete" /></div>');

			$j('body').append(_loading_layer);
		}


		/* 레이어 팝업 넓이가 화면 넓이보다 크다면 좌측 포지션값을 0으로 설정. 아니라면 중간위치에 오도록 설정  */
		_loading_layer.css('left', (_loading_layer.width() > _viewport[0] ? 0 : (_viewport[0] / 2) - (_loading_layer.width() / 2)) + _offset[0]);

		/* 레이어 팝업 높이가 화면 높이보다 크다면 상단 포지션값을 0으로 설정. 아니라면 중간위치에 오도록 설정  */
		_loading_layer.css('top', (_loading_layer.height() > _viewport[1] ? 0 : (_viewport[1] / 2) - (_loading_layer.height() / 2)) + _offset[1]);

		_loading_layer.show();

		/* 모달용 레이어마스크를 씌운다  */
		opb.common.layerpopup._showMask_fnc(opb.common.layerpopup.loadingLayerID_str, _z_index);
		
		/* 화면스크롤시 마스크 위치를 재조정 하도록 scroll 이벤트 처리  */
		$j(window).bind('scroll.' + opb.common.layerpopup.loadingLayerID_str, function(jevent)
		{
			var _viewport = opb.common.util.getViewport_fnc();
			var _offset = opb.common.util.getScrollOffset_fnc();
			/* 레이어 팝업 뜨는 위치 재조정 */
			_loading_layer.css('left', (_loading_layer.width() > _viewport[0] ? 0 : (_viewport[0] / 2) - (_loading_layer.width() / 2)) + _offset[0]);
			_loading_layer.css('top', (_loading_layer.height() > _viewport[1] ? 0 : (_viewport[1] / 2) - (_loading_layer.height() / 2)) + _offset[1]);
		});
		
		ajaxloadingStack.push();
	}
	catch (e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.layerpopup.openLoading_fnc]');
		opb.common.layerpopup.closeLoading_fnc();
	}
};
/* ---------------- open - end ---------------- */

/* ---------------- close - start ---------------- */
/**
 * Popup Layer를 닫는다.
 *
 * @param {String} layer_id 닫을 레이어 ID
 */
opb.common.layerpopup.closeLayer_fnc = function(layer_id)
{
	try
	{
		/* EventListener REMOVE */
		$j('#' + layer_id).unbind('.' + layer_id);
		$j('#' + layer_id).nextAll().unbind('.' + layer_id);
		$j('body').unbind('.' + layer_id);
		$j(window).unbind('.' + layer_id);
		
		/* 모든 개체의 (레이어에서 부여한) 이벤트를 제거한다. */
		//$('*').unbind('.' + layer_id);
		
		/*LAYER CLOSE*/
		$j('#' + layer_id).remove();
		/* MASK CLOSE */
		$j('#' + layer_id + opb.common.layerpopup.modalMaskLayerIDSufffix_str).remove();
		/* 스크린리더에서 화면(DOM)을 새로 읽도록 처리한다.  */
		opb.common.layerpopup._rereadScreenReader_fnc(opb.common.layerpopup.closeFocusTarget_array[layer_id]);
		opb.common.layerpopup.closeFocusTarget_array[layer_id] = null;
		
		/* 콜백 함수를 호출한다.  */
		if((typeof opb.common.layerpopup.closeCallback_array[layer_id]) == 'function')
		{
			opb.common.layerpopup.closeCallback_array[layer_id].apply(this);
			opb.common.layerpopup.closeCallback_array[layer_id] = null;
		}

		/* 자동로그아웃시간 연장은 처리하지 않는다. */
	}
	catch (e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.layerpopup.closeLayer_fnc]');
	}
};

/**
 * 로딩 레이어 닫기
 */
opb.common.layerpopup.closeLoading_fnc = function()
{
	ajaxloadingStack.pop();
	if(ajaxloadingStack.isEmpty()) {
		try
		{
			/* 로딩은 포커스 이동 안합니다. (제거 전에 콜백함수를 제거한다.)  */
			opb.common.layerpopup.closeCallback_array[opb.common.layerpopup.loadingLayerID_str] = null;
			opb.common.layerpopup.closeFocusTarget_array[opb.common.layerpopup.loadingLayerID_str] = null;
			opb.common.layerpopup.closeLayer_fnc(opb.common.layerpopup.loadingLayerID_str);
		}
		catch (e)
		{
			alert(location.href + '\n\n' + e + '\n[ERROR opb.common.layerpopup.closeLoading_fnc]');
		}
	}
};

/**
 * renewal 툴팁 close fn 추가
 * **/
opb.common.layerpopup.closeLayer2_fnc = function(layer_id,obj)
{
	try
	{
		/* EventListener REMOVE */
		$j('#' + layer_id).unbind('.' + layer_id);
		$j('#' + layer_id).nextAll().unbind('.' + layer_id);
		$j('body').unbind('.' + layer_id);
		$j(window).unbind('.' + layer_id);
		
		/*LAYER CLOSE*/
		document.getElementById(layer_id).hide();
		
		var btn =  $j('#' + layer_id)[0].siblings('button')
		setTimeout(function(){
			$j(btn).removeClass('on');
		},250)
		
		/* MASK CLOSE */
		$j('#' + layer_id + opb.common.layerpopup.modalMaskLayerIDSufffix_str).remove();
		/* 스크린리더에서 화면(DOM)을 새로 읽도록 처리한다.  */
		opb.common.layerpopup._rereadScreenReader_fnc(opb.common.layerpopup.closeFocusTarget_array[layer_id]);
		opb.common.layerpopup.closeFocusTarget_array[layer_id] = null;

		/* 자동로그아웃시간 연장은 처리하지 않는다. */
	}
	catch (e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.layerpopup.closeLayer2_fnc]');
	}
};

/* ---------------- close - end ---------------- */

/* Mask Layer */
opb.common.layerpopup._showMask_fnc = function(layer_id, z_index, transparent)
{
	try
	{
		var _mask_layer = $j('#' + layer_id + opb.common.layerpopup.modalMaskLayerIDSufffix_str);

		/* 생성된 마스크 레이어가 없을경우 새로 생성한다.  */
		if(_mask_layer.length == 0)
		{
			_mask_layer = $j('<div/>').attr('id', layer_id + opb.common.layerpopup.modalMaskLayerIDSufffix_str);
			//_mask_layer.attr('style', 'position:absolute; background-image:url(' + opb.common.layerpopup.modalMaskBackground_image + '?' + +new Date() + ');');
			if (!!transparent && transparent === true) {
				_mask_layer.attr('style', 'position:absolute; background-color:#000000; filter: alpha(opacity=1); opacity: 0.01;');
			} else {
				_mask_layer.attr('style', 'position:absolute; background-color:#000000; filter: alpha(opacity=20); opacity: 0.2;');
			}

			_mask_layer.css('z-index', z_index - 8);

			_mask_layer.css('width', '100%');
			_mask_layer.css('height', '100%');

			$j('body').append(_mask_layer);
		}

		var _offset = opb.common.util.getScrollOffset_fnc();
		_mask_layer.css('left', _offset[0]);
		_mask_layer.css('top', _offset[1]);

		$j(window).bind('scroll.' + layer_id, function(evt) {
			var _offset = opb.common.util.getScrollOffset_fnc();
			_mask_layer.css('left', _offset[0]);
			_mask_layer.css('top', _offset[1]);
		});
	}
	catch (e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.layerpopup._showMask_fnc]');
	}
};


/**
 * 레이어를 특정요소 다음에 출력하게 한다. (default:body)
 *
 * @param obj 위치할 객체 or ID (이 다음에 레이어 DIV가 생긴다.)
 * @param layer 표현할레이어
 */
opb.common.layerpopup._appendThat_fnc = function(layer, obj)
{
	/* 타겟, 포커스가 없을 경우 body에 prepend 한다.  */
	/*if((typeof obj) == 'string' && obj != ''){
		
		var _divId = $j('#' + obj);
		if(_divId == undefined || _divId == null) {
			$j('body').prepend(layer);
		} else {
			_divId.prepend(layer);
		}
	} else {
		$j('body').prepend(layer);
	}*/
	// 강제로 <body>에 preprend 하도록 적용
	$j('body').prepend(layer);

};

/**
 * dom obj or id를 jQuery Object 로 만든다.
 *
 * @param obj jQuery object로 만들 dom obj or id (아닐경우 null)
 */
opb.common.layerpopup._makeJQueryObject_fnc = function(obj)
{
	try
	{
		if((typeof obj) == 'object')
		{
			return $j(obj);
		}
		if ((typeof obj) == 'string')
		{
			return $j('#' + obj);
		}
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.layerpopup._makeJQueryObject_fnc]');
	}

};

/**
 * 스크린리더에서 페이지가 전환되었으니 다시 읽으라고 전달한다.
 * 
 * @see 실제로 스크린리더가 새로 읽도록 처리 할 수 없다. 포커스 이동만 처리한다.
 */
opb.common.layerpopup._rereadScreenReader_fnc = function(focus_jobj)
{
	try {
		/* 스크린리더가 새로 읽기 전에 읽을 곳으로 포커스를 이동한다.  */
		if(focus_jobj != null && (typeof focus_jobj == 'object'))
		{
			if(focus_jobj.attr('disabled') != 'disabled')
			{
				/* 인터프리터 식으로 포커스를 지정하니 특정 OS,Browser 에서 처리되지 않아, 텀을 주고 처리함  */
				setTimeout(function() {
					opb.common.layerpopup.elementFocus(focus_jobj);
				}, 100);
			}
		}
		
		/* 스크린리더에서 화면(DOM)을 새로 읽도록 처리할 수 있다면 좋다. */
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.layerpopup._rereadScreenReader_fnc]');
	}
};


/**
 * 레이어 팝업에서만 포커스가 이동하도록 처리한다
 * @param {String} layer_id 대상 레이어 아이디
 */
opb.common.layerpopup.attachEventLayerFocus_fnc = function(layer_id)
{
	// TODO DELETE 임시로 ESC 팝업창 닫기 적용
	/*
	$j('body').bind('keyup.' + layer_id, function(jevent) {
		if(jevent.which == 27) {
			opb.common.layerpopup.closeLayer_fnc(layer_id);
		}
	});
	*/
	/* 레이어의 다음 요소로 이동 시 레이어 처음 포커스 요소로 이동한다.  */
	$j('#' + layer_id).nextAll().bind('keyup.' + layer_id + ' keydown.' + layer_id, function(jevent)
	{
		/* SHIFT(16) + TAB(9) 레이어 마지막 DIV로 포커스 이동  */
		if(jevent.shiftKey && jevent.which == 9)
		{
//			$j('#' + layer_id + opb.common.layerpopup.layerNextFocus_str).focus();
			opb.common.layerpopup.elementFocus(layer_id + opb.common.layerpopup.layerNextFocus_str);
		}
		/* (Not SHIFT) TAB(9) 레이어 첫 DIV로 포커스 이동  */
		else if(jevent.which == 9)
		{
//			$j('#' + layer_id + opb.common.layerpopup.layerPrevFocus_str).focus();
			opb.common.layerpopup.elementFocus(layer_id + opb.common.layerpopup.layerPrevFocus_str);
		}
	});
	
	/* 레이어의 이전 항목에 도달 시 레이어 마지막 포커스 요소로 이동한다.  */
	$j('#' + layer_id + opb.common.layerpopup.layerPrevFocus_str).bind('keydown.' + layer_id, function(jevent)
	{
		/* SHIFT(16) + TAB(9) 레이어 마지막 DIV로 포커스 이동  */
		if(jevent.shiftKey && jevent.which == 9)
		{
//			$j('#' + layer_id + opb.common.layerpopup.layerNextFocus_str).focus();
			opb.common.layerpopup.elementFocus(layer_id + opb.common.layerpopup.layerNextFocus_str);
		}
		/* (Not SHIFT) TAB(9) 레이어 첫 DIV로 포커스 이동  */
		else if(jevent.which == 9)
		{
//			$j('#' + layer_id + opb.common.layerpopup.layerPrevFocus_str).focus();
			opb.common.layerpopup.elementFocus(layer_id + opb.common.layerpopup.layerPrevFocus_str);
		}
	});
	
	/* 레이어의 다음 항목에 도달 시 레이어 처음 포커스 요소로 이동한다.  */
	$j('#' + layer_id + opb.common.layerpopup.layerNextFocus_str).bind('keydown.' + layer_id, function(jevent)
	{
		/* SHIFT(16) + TAB(9) 레이어 마지막 DIV로 포커스 이동  */
		if(jevent.shiftKey && jevent.which == 9)
		{
//			$j('#' + layer_id + opb.common.layerpopup.layerNextFocus_str).focus();
			opb.common.layerpopup.elementFocus(layer_id + opb.common.layerpopup.layerNextFocus_str);
		}
		/* (Not SHIFT) TAB(9) 레이어 첫 DIV로 포커스 이동  */
		else if(jevent.which == 9)
		{
//			$j('#' + layer_id + opb.common.layerpopup.layerPrevFocus_str).focus();
			opb.common.layerpopup.elementFocus(layer_id + opb.common.layerpopup.layerPrevFocus_str);
		}
	});
	
};


/**
 * ajax로 back focus target 이 갱신되었을 경우 back target 새로 설정
 */ 
opb.common.layerpopup.resetFocusTargetCusReload_fnc = function(layer_id) {
	try {
		var _backID = opb.common.layerpopup.closeFocusTarget_array[layer_id].attr('id');
		opb.common.layerpopup.closeFocusTarget_array[layer_id] = $j('#' + _backID);
	}catch(e) {
		//alert(location.href + '\n\n' + e + '\n[ERROR opb.common.layerpopup.resetFocusTargetCusReload_fnc]');
	}
};
