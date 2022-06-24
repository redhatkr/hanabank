/************************************************************************************************
 * @file opb-common-ajax.js
 * @since 2012. 12. 14.
 * @author 오범석
 *
 * @filelocation 모든 페이지에서 공통적으로 include 하는 top 페이지 에서 사용 선언
 *
 * @fileoverview 서버 요청 시 AJAX 처리에 대한 구현
 *
 * @dependencies opb-base-namespace.js, opb-common-util.js JHanaAjax.js
 *
 * @warn 수정 시 반드시 관리자와 상의하세요. 
 *
 * <pre>
 * ==============================================================================================
 * 변경이력:
 * DATE                AUTHOR        DESCRIPTION
 * ----------------------------------------------------------------------------------------------
 * 2012.12.14          오범석        최초작성
 * </pre>
 ************************************************************************************************/

/**
 * <pre>
 * ===================================================================================
 * 변수 선언부
 * ===================================================================================
 * </pre>
 */
/* 서버의 응답형태 구분 문자열  */
opb.common.ajax.responseType_str = 'json-type';

/* 응답형태가 redirect 일 때 location을 변경할지 AJAX로 화면을 변경할지 구분한다. Y:AJAX, N:주소이동   */
opb.common.ajax.viaLoginYN_str = 'viaLoginYN';

/* ????? 정확하게 무엇인지 확인해야 한다.  */
opb.common.ajax.guid_str = 'guid';

opb.common.ajax.response_default = 'normal'; /* AJAX 응답. 기본  */
opb.common.ajax.response_error = 'error'; /* AJAX 응답. 에러일 때  */
opb.common.ajax.response_redirect = 'redirect'; /* AJAX 응답. 페이지전환 일 때  */

/**
 * Ajax의 Callback함수로 넘겨받은 데이터를 가공/처리한다.
 * 데이터가 json타입일 경우 가공/처리 하지 않는다.
 * 
 * @param {Object} response_data response 데이터
 * @param {boolean} show_error 에러일경우 추가정보를 볼것인지
 * @param {Object} release_btn_obj 처리버튼의 원본 object
 */
opb.common.ajax.parseAjaxData_fnc = function(response_data, show_error, release_btn_obj)
{
	try
	{
	    var _response_type = response_data.getResponseHeader(opb.common.ajax.responseType_str);
	    
	    var _viaLoginYN = response_data.getResponseHeader(opb.common.ajax.viaLoginYN_str);
	    
	    var _guid = response_data.getResponseHeader(opb.common.ajax.guid_str);
	    
	    // 20081118 오륜경 로그를 보기위해 추가
	    if (opb.common.util.isEmpty_fnc(_guid))
	    {
	    	_guid = '';
	    }
	
	    if (opb.common.util.isEmpty_fnc(_viaLoginYN) || _viaLoginYN.trim() == '')
	    {
	        _viaLoginYN = 'N';
	    }
	    
	    /**
	     * 서버로부터 수신한 json-result 값이 error 일 경우에 오류메세지를 보여주도록 처리한다.
	     * 오류일 경우에는 비밀번호 및 보안키보드 관련한 필드를 초기화한다.
	     */
	    if (_response_type == opb.common.ajax.response_error)
	    {
			
	    	/* 로딩레이어가 안닫혔을 경우에 대비하여 닫는 함수를 콜한다.  */
	    	opb.common.layerpopup.closeLoading_fnc();
	
	        /* 처리 요청 버튼의 원본이 있다면 처리 요청 버튼을 원상복구한다.  */
	        if (!opb.common.util.isEmpty_fnc(release_btn_obj) && (typeof release_btn_obj) == 'object')
	        {
	        	// TODO ???????? JHanaAjax.js 파일에 정의 되어있다.
	            hana.submiButton.releaseAltImg(release_btn_obj.objectId, release_btn_obj.objectSrc, release_btn_obj.objectOnclick);
	        }
	
	        if (false != opb.common.ajax.parsingErrorData_fnc(response_data.responseText, show_error))
	        {
	        	/* 오류일경우 비밀번호 필드 초기화  */
				/*$j('input[type=password]').each(function(index)
				{
					if($j(this).attr('readonly') != 'readonly')
					{
						$j(this).val('');
					} 
				});*/
				
				/* 오류일경우 보안키보드 필드 초기화  */
				$j('input[type=text]').each(function(index)
				{
					var _text_id = $j(this).attr('id');
					if(typeof(_text_id) != 'undefined' && _text_id.indexOf('transkey') > -1)
					{
						var _trans_id = $j(this).attr('id').split('_');
						eval(_trans_id[0]).clear();
					}
				});
				
				// TODO ??????? <hana:stickyActionError 사용확인  
				opb.common.ajax.openErrorMessage_fnc('ERROR', opb.common.ajax.parsingErrorData_fnc(response_data.responseText, show_error));
	        }
	        return;
	    }
	    
	    /**
	     * 서버로부터 수신한 json-result 값이 normal 일 경우에는 콜백에서 처리하도록 SKIP한다.
	     */
	    else if (_response_type == opb.common.ajax.response_default)
	    {
	        // callback에서 처리한다.
	    }
	    
	    /**
	     * 서버로부터 수신한 json-result 값이 redirect 일 경우에는 화면을 이동한다.
	     * viaLoginYN(?) 값이 N이면 location을 이동하고, N이 아니면 AJAX로 처리한다.
	     */
	    else if (_response_type == opb.common.ajax.response_redirect)
	    {
	    	/* 로딩레이어가 안닫혔을 경우에 대비하여 닫는 함수를 콜한다.  */
	    	opb.common.layerpopup.closeLoading_fnc();
	        
	        var _url = eval('(' + response_data.responseText + ')');
	
	        /* _viaLoginYN 값이 N 일 경우 redirect 처리  */
	        if (_viaLoginYN == 'N')
	        {
	        	/* 페이지 redirect 시 로딩바 띄웁니다.  */
	        	opb.common.layerpopup.openLoading_fnc();
	
				if(opb.common.util.isOtherIframe()) {
					parent.frames[0].location.href = opb.base.APPLICATION_CONTEXT_ROOT + _url;
				} else {
		            if (parent[opb.base.MAIN_FRAME])
		            {
		                parent[opb.base.MAIN_FRAME].location = opb.base.APPLICATION_CONTEXT_ROOT + _url;
		            }
		            else if (opb.base.CONTENTS_DIV == 'MSN_CONTENT')
		            {
		                location.href = opb.base.APPLICATION_CONTEXT_ROOT + _url;
		            }
		            else
		            {
						top.location.href = opb.base.APPLICATION_CONTEXT_ROOT + _url;
		            }
				}
	        }
	        else
	        {
	        	/* _viaLoginYN 값이 N 이 아닐 경우 AJAX 처리  */
	            opb.common.layerpopup.closeLoading_fnc();
	            
	            var hanaAjax = new hana.JHanaAjax(opb.base.CONTENTS_DIV, false, false);
				hanaAjax.ajaxCommSubmit(_url, null, null);
	        }
	    }
	}
	catch (e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.ajax.parseAjaxData_fnc]');
	}
};

/**
 * Json Type으로 Return된 ErrorData를 가공된 ErrorMessage로 리턴한다.
 * 
 * @param {String} data responseText 데이터
 * @param {boolean} show_error 추가정보를 파싱할것인지?
 * @return _errorHash ['main'], ['detail']
 * 
 * /ibk/web/tag/StickyActionErrorTag.java
 * /pbk/web/tag/JspTailTagComponent.java
 */
opb.common.ajax.parsingErrorData_fnc = function(data, show_error)
{
	try
	{
		opb.common.layerpopup.closeLayer_fnc('bankSelect');
		/* 운영중 에러프로그램(errorProgram) 을 보여주지 않도록 설정한다. */
		show_error = false;
		
		
	    var _data = data.evalJSON();
	
	    // 에러메세지
	    var _errorContents_array = new Array();
	    
	    // 상세메세지 + trace
	    var _errorDetail_array = new Array();
	
	    var _errorCode = '';
	    var _errorMessage = '';
	    var _errorHash = new Hash();
	    var _errorGuid = '';
	
	    if (_data && _data.length )
	    {
	        var _errorCount = _data.length;
	        var _errorDetail = '';
	        
	        for (var i = 0; i < _errorCount; i++)
	        {
	            _errorCode = _data[i].errorCode;
	            _errorMessage = _data[i].errorMessage;
	
	            if (_errorCode == null) {
	                _errorCode ='';
	            }
	
	            /**************** 특정 오류코드에 대해 상세한 메세지 처리 START ****************/
	            /*
	             * 상세 메세지 처리하는 코드들은 메세지 처리 후 바로 처리 종료한다. (return false)
	             */

	            if ('BCOM17302' == _errorCode)
	            {
	                var _errorTitle = '알림 ' + new Date().format('Y-m-d');
	                var _msg = '접속하시려는 아이디는 보다나은 서비스 제공을 위해 기업뱅킹사용자로 전환이 되었습니다. <br />확인 버튼을 클릭하시면 하나은행 기업뱅킹을 사용하시는 화면으로 이동합니다.';

	                opb.common.layerpopup.openMessage_fnc({
	                    isConfirm: true,
	                    title: _errorTitle,
	                    message: _msg,
	                    callback: function(is_ok)
	                    {
	                        if (is_ok)
	                        {
		                    	// TODO ????? CBK_HOST.....
	                        	top.location.href = CBK_HOST;
	                        }
	                    }
	                });	                
	                
	                return false;
	                
	            }
	            else if ('OCOM03009' == _errorCode && 'OCOM03009wpdep411_02t_01' == _errorMessage)
	            {
	                var _errorTitle = '알림 '+ new Date().format('Y-m-d');
	                var _msg = '';
	
	                _msg = '입력하신 입금계좌는 청약종합저축계좌 입니다.<br/>'
	                     + '청약종합저축계좌로 이체 하시려면 적금/신탁/청약 납입 메뉴를 이용하시기 바랍니다.<br/>'
	                     + '적금/신탁/청약 납입 메뉴로 이동 하시려면 확인 버튼을 클릭하시기 바랍니다.';
	                
	                opb.common.layerpopup.openMessage_fnc({
	                    isConfirm: true,
	                    title: _errorTitle,
	                    message: _msg,
	                    callback: function(is_ok)
	                    {
	                        if (is_ok)
	                        {
		                    	// TODO ????? JMenuPanel 처리해야 함.....
		                    	pbk.web.util.goAjaxMenu('/transfer/account/wpdep411_25t_00.do');
	                        }
	                    }
	                });	                
	                
	                return false;
	
	            }
	            else if ('OCOM03009' == _errorCode && 'OCOM03009wpdep413_02t' == _errorMessage)
	            {
	                var _errorTitle = '알림 '+ new Date().format('Y-m-d');
	                var _msg = '';
	
	                _msg = '청약종합저축계좌는 예약이체가 등록되지 않습니다.<br/>'
	                     + '청약종함저축계좌로 즉시이체 하시려면 적금/신탁/청약 납입 메뉴를 이용하시기 바랍니다.<br/>'
	                     + '적금/신탁/청약 납입 메뉴로 이동 하시려면 확인 버튼을 클릭하시기 바랍니다.';
	                
	                opb.common.layerpopup.openMessage_fnc({
	                    isConfirm: true,
	                    title: _errorTitle,
	                    message: _msg,
	                    callback: function(is_ok)
	                    {
	                        if (is_ok)
	                        {
		                    	// TODO ????? JMenuPanel 처리해야 함.....
		                    	pbk.web.util.goAjaxMenu('/transfer/account/wpdep411_25t_00.do');
	                        }
	                    }
	                });
	                
	                return false;
	
	            }
	            else if ('RESET_SECURE_KEYBOARD' == _errorCode)
	            {
	                var _errorTitle = '알림 '+ new Date().format('Y-m-d');
	                
	                var _msg = '입력 대기시간이 길어 입력 값이 초기화 되었습니다.<BR/>확인 버튼을 눌러 화면을 새로고친 후 아이디와 비밀번호를 다시 입력해 주시기 바랍니다.';
	                
	                opb.common.layerpopup.openMessage_fnc({ 
	                    isConfirm: true,
	                    title: _errorTitle,
	                    message: _msg,
	                    callback: function(is_ok)
	                    {
	                        if (is_ok)
	                        {
		                    	/* 메시지로 이동할 URL이 전달된다.  */
		                        top.location.href = _data[i].errorMessage;
	                        }
	                    }
	                });

	                return false;
	                
	            }
	            else if ('OCOM16209' == _errorCode)
	            {
	            	opb.common.layerpopup.closeLayer_fnc('bankSelect');
	                var _errorTitle = '알림 '+ new Date().format('Y-m-d');
	                
	                //var _msg = '이용자 비밀번호 1회 오류입니다.';
	                var _msg = '이용자비밀번호 1회 오류입니다.';
	
	                opb.common.layerpopup.openMessage_fnc({
						isConfirm: true,
						title: _errorTitle,
						message: _msg,
		                canBtnText : '비밀번호 재등록',
		                callback : function(e)  {
	                   		if (e){     // 확인버튼 클릭시
	                   		}else{
	                   			var url = "/common/join/wpcom460_18t.do";

	                   			//개인뱅킹 리뉴얼 LNB 메뉴 표시를 위한 refresh 적용
	                            pbk.web.util.goRefreshMenu(opb.base.APPLICATION_CONTEXT_ROOT + url, null);	                   		
	                        }
	                   	}
					});
					
					//닫기버튼(X) 클릭시 취소 이벤트 발생하지 않고 팝업만 닫도록 수정
					var layer_id = $j('.' + opb.common.layerpopup.layerHas_class).attr("id");
					
					if(layer_id != null && layer_id !="" && layer_id != undefined){
					    var _closeBtnId = layer_id + '_Close';

						$j('#' +_closeBtnId).off('click');
					    
						$j('#' +_closeBtnId).on('click', function ()
						{
							opb.common.layerpopup.closeLayer_fnc(layer_id);
						});
					}						
	
	                return false;
	                
	            }
	            else if ('OCOM16210' == _errorCode)
	            {
	            	opb.common.layerpopup.closeLayer_fnc('bankSelect');
	                var _errorTitle = '알림 '+ new Date().format('Y-m-d');
	                
	                //var _msg = '이용자 비밀번호 2회 오류입니다.';
	                var _msg = '이용자비밀번호 2회 오류입니다.';
	
	                opb.common.layerpopup.openMessage_fnc({
						isConfirm: true,
						title: _errorTitle,
						message: _msg,
		                canBtnText : '비밀번호 재등록',
		                callback : function(e)  {
	                   		if (e){     // 확인버튼 클릭시
	                   		}else{
	                   			var url = "/common/join/wpcom460_18t.do";

	                   			//개인뱅킹 리뉴얼 LNB 메뉴 표시를 위한 refresh 적용
	                            pbk.web.util.goRefreshMenu(opb.base.APPLICATION_CONTEXT_ROOT + url, null);	                   		
	                        }
	                   	}
					});
					
					var layer_id = $j('.' + opb.common.layerpopup.layerHas_class).attr("id");
					
					if(layer_id != null && layer_id !="" && layer_id != undefined){
					    var _closeBtnId = layer_id + '_Close';

						$j('#' +_closeBtnId).off('click');
					    
						$j('#' +_closeBtnId).on('click', function ()
						{
							opb.common.layerpopup.closeLayer_fnc(layer_id);
						});
					}						
	
	                return false;
	                
	            }
	            else if ('OCOM16211' == _errorCode)
	            {
	            	opb.common.layerpopup.closeLayer_fnc('bankSelect');
	                var _errorTitle = '알림 '+ new Date().format('Y-m-d');
	                
	                var _msg = '이용자비밀번호 3회 오류입니다.<br/><br/>타은행(기관)에서 발급받은 유효한 공인인증서를 보유하신 고객은 공인인증센터>타기관/타행인증서 등록하기 메뉴에서 공인인증서 등록하시면 로그인이 가능합니다.<a href="#//hanaBank" onclick="pbk.web.util.goMenu(\'/certify/othersvc/wpcer463_01t.do\');return false;" >[바로가기]</a>';

	                opb.common.layerpopup.openMessage_fnc({
						isConfirm: true,
						title: _errorTitle,
						message: _msg,
		                canBtnText : '비밀번호 재등록',
		                callback : function(e)  {
	                   		if (e){     // 확인버튼 클릭시
	                   			var oForm = form.createForm([{id:"userId" , value: $('userId').value}]);
	                   		
	                   			var url = "/common/join/wpcom460_21p.do";
	                   			url = pbk.APPLICATION_CONTEXT_ROOT + url;
	                   			opb.common.layerpopup.openLayer_fnc(url, 'verifyID', null, oForm, null);
	                   		}else{
	                   			var url = "/common/join/wpcom460_18t.do";

	                   			//개인뱅킹 리뉴얼 LNB 메뉴 표시를 위한 refresh 적용
	                            pbk.web.util.goRefreshMenu(opb.base.APPLICATION_CONTEXT_ROOT + url, null);	                   		
	                        }
	                   	}
					});
					
					var layer_id = $j('.' + opb.common.layerpopup.layerHas_class).attr("id");
					
					if(layer_id != null && layer_id !="" && layer_id != undefined){
					    var _closeBtnId = layer_id + '_Close';

						$j('#' +_closeBtnId).off('click');
					    
						$j('#' +_closeBtnId).on('click', function ()
						{
							opb.common.layerpopup.closeLayer_fnc(layer_id);
						});
					}						
/*
	                opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: _errorTitle,
						message: _msg,
		                callback : function(e)  {
	                   		if (e){     // 확인버튼 클릭시
	                   		}
	                   	}
					});
*/	                
	                return false;
	                
	            }
	            else if ('OCOM16212' == _errorCode)
	            {
	            	opb.common.layerpopup.closeLayer_fnc('bankSelect');
	            	
	                var _errorTitle = '알림 '+ new Date().format('Y-m-d');
	                
		            var _msg = '이용자비밀번호 4회 오류입니다.<br/><br/>타은행(기관)에서 발급받은 유효한 공인인증서를 보유하신 고객은 공인인증센터>타기관/타행인증서 등록하기 메뉴에서 공인인증서 등록하시면 로그인이 가능합니다.<a href="#//hanaBank" onclick="pbk.web.util.goMenu(\'/certify/othersvc/wpcer463_01t.do\');return false;" >[바로가기]</a>';
	
	                opb.common.layerpopup.openMessage_fnc({
	                    isConfirm: true,
	                    title: _errorTitle,
	                    message: _msg,
		                canBtnText : '비밀번호 재등록',
		                callback : function(e)  {
	                   		if (e){     // 확인버튼 클릭시
	                   		}else{
	                   			var url = "/common/join/wpcom460_18t.do";

	                   			//개인뱅킹 리뉴얼 LNB 메뉴 표시를 위한 refresh 적용
	                            pbk.web.util.goRefreshMenu(opb.base.APPLICATION_CONTEXT_ROOT + url, null);	                   		
	                        }
	                   	}	                    
	                });
	                
					var layer_id = $j('.' + opb.common.layerpopup.layerHas_class).attr("id");
					
					if(layer_id != null && layer_id !="" && layer_id != undefined){
					    var _closeBtnId = layer_id + '_Close';

						$j('#' +_closeBtnId).off('click');
					    
						$j('#' +_closeBtnId).on('click', function ()
						{
							opb.common.layerpopup.closeLayer_fnc(layer_id);
						});
					}		                
	
	                return false;
	                
	            }
	            else if ('BCOM16069' == _errorCode)
	            {
	            	opb.common.layerpopup.closeLayer_fnc('bankSelect');
	                var _errorTitle = '알림 '+ new Date().format('Y-m-d');
	                
		            var _msg = '이용자비밀번호 5회 오류입니다.<br/><br/>타은행(기관)에서 발급받은 유효한 공인인증서를 보유하신 고객은 공인인증센터>타기관/타행인증서 등록하기 메뉴에서 공인인증서 등록하시면 로그인이 가능합니다.<a href="#//hanaBank" onclick="pbk.web.util.goMenu(\'/certify/othersvc/wpcer463_01t.do\');return false;" >[바로가기]</a>';
	
	                opb.common.layerpopup.openMessage_fnc({
						isConfirm: true,
						title: _errorTitle,
						message: _msg,
		                canBtnText : '비밀번호 재등록',
		                callback : function(e)  {
	                   		if (e){     // 확인버튼 클릭시
	                   		}else{
	                   			var url = "/common/join/wpcom460_18t.do";

	                   			//개인뱅킹 리뉴얼 LNB 메뉴 표시를 위한 refresh 적용
	                            pbk.web.util.goRefreshMenu(opb.base.APPLICATION_CONTEXT_ROOT + url, null);	                   		
	                        }
	                   	}
					});
					
					var layer_id = $j('.' + opb.common.layerpopup.layerHas_class).attr("id");
					
					if(layer_id != null && layer_id !="" && layer_id != undefined){
					    var _closeBtnId = layer_id + '_Close';

						$j('#' +_closeBtnId).off('click');
					    
						$j('#' +_closeBtnId).on('click', function ()
						{
							opb.common.layerpopup.closeLayer_fnc(layer_id);
						});
					}					
	
	                return false;
	                
	            }
	            
	            else if ('dupPWErr' == _errorCode)
	            {
	            	opb.common.layerpopup.closeLayer_fnc('bankSelect');
	                var _errorTitle = '알림 '+ new Date().format('Y-m-d');
	                
	                var _msg = '이용자 비밀번호 오류입력횟수 초과상태로 ID중복 정리 거래를 <br/>위하여 본인이 영업점에 내점(신분증 지참)하시기 바랍니다.'; 
	
	                opb.common.layerpopup.openMessage_fnc({
	                    isConfirm: false,
	                    title: _errorTitle,
	                    message: _msg
	                });
	
	                return false;
	                
	            }
	            
	            else if ('dupCust' == _errorCode || 'dupCust' == _errorCode)
	            {
	            	var formObj = form.createForm();
					url = "/common/login/bankSelect.do";

					opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT + url, 'bankSelect', null,  formObj);
	                return false;
	                
	            }
	            else if ('dupCustE4' == _errorCode || 'dupCustE4' == _errorCode)
	            {
	            	pbk.web.util.goAjaxMenu('/common/login/wpcom460_31t_00.do');
	                return false;
	                
	            }
	            
	            else if ('dupID' == _errorCode || 'dupID' == _errorCode)
	            {
	            	var formObj = form.createForm();
					
					url = "/common/login/idUseNo.do";

					opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT + url, 'IdSelect', null,  formObj);
	
	                return false;
	                
	            }
	            
	            else if ('dupScrt' == _errorCode || 'dupScrt' == _errorCode)
	            {
	            	
	            	pbk.web.util.goAjaxMenu('/common/login/wpcom460_35t.do');
	                return false;
	                
	            }
	            
	            
	            else if ('BCOM22925' == _errorCode || 'BCOM22933' == _errorCode)
	            {
	                var _errorTitle = '알림 '+ new Date().format('Y-m-d');
	                
	                var _msg = _errorMessage; 
	
	                opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: _errorTitle,
						message: _msg,
		                callback : function(e)  {
	                   		if (e){     // 확인버튼 클릭시
	                   			opb.common.util.rejectTransferFDSCancel01();
	                   		}
	                   	}
					});
	
	                return false;
	                
	            }
	            // 인증서 오류 - 새로고침이면 confirm 메시지로..
	            else if ('949' == _errorCode && _errorMessage.indexOf("새로고침")) {
	            	
	                var _errorTitle = '알림 '+ new Date().format('Y-m-d');
	                
	                var _msg = _errorMessage + "<br/><br/>새로고침 하시겠습니까?"; 
	
	                opb.common.layerpopup.openMessage_fnc({
						isConfirm: true,
						title: _errorTitle,
						message: _msg,
				        callback: function(isConfirm) {
		                	if(isConfirm)
		                	{
		                		location.reload(true);
		                	}
		                }
					});
	
	                return false;

	            }
	            // 800 타행/타기관 등록 안내와 페이지 포워딩
	            else if ('800' == _errorCode && _errorMessage.indexOf("타행/타기관") > -1) {
	            	
	                var _errorTitle = '알림 '+ new Date().format('Y-m-d');
	                
	                opb.common.layerpopup.openMessage_fnc({
						isConfirm: true,
						title: _errorTitle,
						message: _errorMessage,
				        callback: function(isConfirm) {
		                	if(isConfirm)
		                	{
		                		pbk.web.util.goMenu('/certify/othersvc/wpcer463_01t.do');
		                	}
		                }
					});
	
	                return false;
	            }
	            
	            // 1일/1회 이체한도 오류발생 시
	            else if ('BCOM15974' == _errorCode || 'BCOM15975' == _errorCode || 'OCOM16071' == _errorCode) {
	            	
	            	// 자물쇠카드 사용자, 1일이체한도가 1천만원 이상, 당일예외신청을 하지 않은 사용자만 당일 이체한도 예외신청 가능
	            	if(_USED_MEDIA_SECU_ == true && _OLD_DD_LIMIT_AMT_ > 10000000 && _YN_TRNSLIMIT_EXC_ == 'N') {
	            		var _tabMenu = 0;
	            		
	            		if('K' == _TRF_BNK_) { // 구외환 사용자인 경우 
            				_tabMenu = 3;
            			/* 20160531 구하나 사용자 예외신청 팝업 처리 안함
	            		}else if('H' == _TRF_BNK_ && 'Y' == _YN_OVRS_IP_) { // 구하나 사용자이고, 해외IP사용자 인 경우
	            			_tabMenu = 2;
	            		*/
	            		}
	            		
	            		/*
	            		 * _tabMenu 로 이체한도 예외 신청을 어디로 하는지 결정
	            		 *    2 : 구하나 해외사용자 이체한도 예외신청으로 이동
	            		 *    3 : 구외환 이체한도 예외신청으로 이동
	            		 *    그외 : 사용안함
	            		 */
	            		if(_tabMenu == 2 || _tabMenu == 3) {
	            			var h = [];
	            			h[h.length++] = '<div class="pop_tym" tabindex="0">';
	            			h[h.length++] = '	<div class="pop_cont">';
	            			if('BCOM15974' == _errorCode) {
	            				h[h.length++] = '		<p>1일 이체한도 금액이 초과되었습니다.<br>1일 이체한도를 1천만원 이상 지정하신 보안카드 이용 손님은 1일 이체한도 예외신청을<br>하신 경우 당일에 한하여 지정하신 이체한도대로 이체가 가능합니다.</p>';
	            			}else if('BCOM15975' == _errorCode || 'OCOM16071' == _errorCode) {
	            				h[h.length++] = '		<p>1회 이체한도 금액이 초과되었습니다.<br>1회 이체한도를 1천만원 이상 지정하신 보안카드 이용 손님은 1회 이체한도 예외신청을<br>하신 경우 당일에 한하여 지정하신 이체한도대로 이체가 가능합니다.</p>';
	            			}
	            			h[h.length++] = '		<div class="btn_ex01">';
	            			h[h.length++] = '			<span><a href="#//HanaBank" onclick="opb.common.layerpopup.closeLayer_fnc(\'popBCOM15974\');">확인</a></span>';
	            			h[h.length++] = '			<span><a href="#//HanaBank" onclick="opb.common.layerpopup.closeLayer_fnc(\'popBCOM15974\');	opb.common.util.goMenu_fnc(\'/myhana/banking/wpcus402_15t.do?tabMenu=' + _tabMenu + '&defaultYn=Y\');">이체한도 예외신청하기</a></span>';
	            			h[h.length++] = '		</div>';
	            			h[h.length++] = '	</div>';
	            			h[h.length++] = '</div>';
	            			var $div = $j('<div/>').html(h.join(''));
	            			opb.common.layerpopup.openSubLayerStatic_fnc(null, 'popBCOM15974', $div, 'center', true);
	            			
	            			return false;
	            		}
	            	}

	            }
	            
	            // 예적금 가입검증
	            else if ('vrfcErr' == _errorCode) {
	                var _errorTitle = '알림 '+ new Date().format('Y-m-d');
	                
	                var _msg = _errorMessage; 
	
	                opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: _errorTitle,
						message: _msg,
		                callback : function(e)  {
	                   		if (e){     // 확인버튼 클릭시
	                   			opb.common.util.goMenu_fnc('/cont/mall/mall08/mall0805/index.jsp');
	                   		}
	                   	}
					});
	
	                return false;	            
	            }
	            // 예금해지 거래가능시간 검증 (Wpdep428_104tAction.java)
	            else if ('BIBK741' == _errorCode || 'BIBK742' == _errorCode) {
	                var _errorTitle = '알림 '+ new Date().format('Y-m-d');
	                
	                var _msg = _errorMessage; 
	
	                opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: _errorTitle,
						message: _msg,
		                callback : function(e)  {
	                   		if (e){     // 해지예상조회에서 계좌해지메뉴로 이동시 오류발생하면  계좌해지메뉴로 이동  
	                   			if($j("input[name='prdCd']").val()  == undefined){ //해지예상조회에서 메뉴이동시에만 계좌해지메뉴로 이동하기위해 상품코드값으로 비교(해지예상조회화면에는 상품코드없음)
		                   			pbk.web.util.goRefreshMenu('/deposit/savings/wpdep428_103t.do?_menuNo=58047');
	                   			}
	                   		}
	                   	}
					});
	
	                return false;	            
	            }
	            // ID 중복정리가 되어있지 않은 상태에서 인증서 타행 등록 시도시 로그인페이지로 이동.
                else if ('BIBK00731' == _errorCode) {
                    
                    var _errorTitle = '알림 '+ new Date().format('Y-m-d');
                    
                    opb.common.layerpopup.openMessage_fnc({
                        isConfirm: false,
                        title: _errorTitle,
                        message: _errorMessage,
                        callback : function(e)  {
                            if (e){     // 확인버튼 클릭시
                                opb.common.util.goMenu_fnc('/common/login.do');
                            }
                        }
                    });
    
                    return false;
                }
	            // 오픈뱅킹 가입 튕기고 확인버튼 이동 처리
                else if ('rejectRgstOpenBanking' == _errorCode) {
                	
                	var html = '오픈뱅킹 서비스 이용을 위해서는 손님의 휴대폰번호 및 이메일 정보가 필요합니다.\n개인정보변경 화면으로 이동합니다.';
        			opb.common.layerpopup.openMessage_fnc({
        				isConfirm : true,
        				title : '알림',
        				message : html,
        				callback : function(e) {
        					if (e) pbk.web.util.goGnbMenu('/myhana/personal/wpcus401_01i.do?_menuNo=57870'); return false;
        				}
        			});
                	
                    return false;
                }
	            // (구) 연금펀드 종목전환 STEP03가입실행시 발생하는 오류에대한 별도처리.
                else if ('BCOM82715' == _errorCode)
	            {
	                var _error_time = new Date().format('Y-m-d H:i:s');
	                
	                var _msg = _errorMessage; 
	
	                opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						time: _error_time,
						message: _msg,
		                callback : function(e)  {
	                   		if (e){     // 확인버튼 클릭시
	                   			opb.common.util.goMenu_fnc("/fund/regist/wpfnd430_61t.do?_menuNo=18705", null);
	                   		}
	                   	}
					});
	
	                return false;
	                
	            }
                else if ('OCOM06367' == _errorCode)
                {
                	
	                opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title : '계좌비밀번호 오류 안내',
						message: "다른 출금계좌를 선택하시거나, 영업점 또는 하나은행 스마트폰뱅킹 앱인 '하나원큐'에서 계좌비밀번호 재등록 후 이용하시기 바랍니다.",
		                callback : function(e)  {
	                   		if (e){     // 확인버튼 클릭시
	                   		}
	                   	}
					});
	                
                	return false;
                }
	            //대출 금소법 에러
	            else if ('loanStbtErr' == _errorCode) {
	                var _errorTitle = '알림 '+ new Date().format('Y-m-d');
	                
	                var _msg = _errorMessage; 
	
	                opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: _errorTitle,
						message: _msg,
		                callback : function(e)  {
	                   		if (e){     // 확인버튼 클릭시
	                   			pbk.web.util.goMenu('/cont/mall/mall08/mall0805/index.jsp?catId=spb_2821,spb_2822,spb_2823,spb_2824,spb_2825,spb_2826&_menuNo=98786');
	                   		}
	                   	}
					});
	                return false;	            
	            }
	            /**************** 특정 오류코드에 대해 상세한 메세지 처리 END ****************/
	
	            var _errorMessage = opb.common.util.replaceAll_fnc(_data[i].errorMessage, '\\n', '<br/>');
	            var _errorProgram = _data[i].errorProgram;
	            var _errorPost = _data[i].errorPost;
	            
	            _errorGuid = _data[i].guid; 
	            if (opb.common.util.isEmpty_fnc(_errorGuid))
	            {
	                _errorGuid = '';
	            }
	
	            var _errorProgramPair = '';
	
	            /* 오류상세메시지  */
	            var _rfncMttr = opb.common.util.replaceAll_fnc(_data[i].rfncMttr, '\\n', '<br/>');
	            
	            // 각 tier 별 오류로그들
	            var errorLogs = _data[i].errorLogs;
	
	            if (show_error && (null != _errorProgram && _errorProgram != ''))
	            {
	                _errorProgramPair = _errorProgram + ' : '+_errorPost +'<br/>';
	            }
	
	            // 나타낼 메세지를 구성한다.
	            var errMsg = _errorMessage + '  ' + _errorProgramPair;
	
	            if (!opb.common.util.isEmpty_fnc(_rfncMttr))
	            {
	                _errorDetail += '조치사항 : ' + opb.common.util.replaceAll_fnc(_rfncMttr, '\\n', '<br/>') + '<br/>';
	            }
	            
	            if (null != errorLogs && errorLogs != '')
	            {
	                //tier 별 오류 메세지 추가
	                _errorDetail += '<font color="black">' + opb.common.util.replaceAll_fnc(opb.common.ajax.getDetailErrorMessage_fnc(errorLogs),'\\n','<br/>') + '</font>';
	
	            }
	            
	            if (!opb.common.util.isEmpty_fnc(_errorDetail))
	            {
	                _errorDetail_array.push('<li>' + _errorDetail + '</li>');
	            }
	            
	            _errorContents_array.push(errMsg);
	
	            // start 20090505
	            if (opb.base.passwordFieldClear_map && (
	                    _errorCode == 'OCOM16218' ||
	                    _errorCode == 'OCOM16219' ||
	                    _errorCode == 'OCOM16220' ||
	                    _errorCode == 'OCOM16221' ||
	                    _errorCode == 'OCOM16222' ||
	                    _errorCode == 'OCOM16223' ||
	                    _errorCode == 'OCOM16224' ||
	                    _errorCode == 'OCOM16225' ||
	                    _errorCode == 'OCOM16226' ||
	                    _errorCode == 'OCOM16227' ||
	                    _errorCode == 'BCOM15794' ||
	                    _errorCode == 'BCOM16810' ||
	                    _errorCode == 'BCOM16819' ))
	            {
	                // OTP 관련 오류 일 경우	                
	                var _otpObj = document.getElementById('_OTP_SECURITY_CERT_PWD_');
	                
	                if (!opb.common.util.isEmpty_fnc(_otpObj))
	                {
	                	var _otpFormObj = _otpObj.form;
	                    //_otpObj.value = '';
	                    TouchEnKeyboardClear(_otpFormObj.name, _otpObj.name, _otpObj.id);
	                }
	
	             // _OTP_SECURITY_CERT_PWD_
	            }
	            else if(opb.base.passwordFieldClear_map && opb.base.passwordFieldClear_map.keys().include(_errorCode))
	            {
	                
	            	if((typeof TouchEnKeyboardClear) == 'function')
	            	{
	            		$j('form').find('input[type="password"]').each(function() {
	            			var _this = $j(this);
	            			TouchEnKeyboardClear(this.form.name, _this.attr('name'), _this.attr('id'));
	            		});
	                }
	                else
	                {
	                	$j('form').find('input[type="password"]').val('');
	                }
	            }
	        }
	    }
	    else
	    {
	        // 알수 없는 오류
	        _errorContents_array.push('XXXX : 알수없는 오류 유형입니다.');
	    }
	
	    // 상세에러메세지
	    var _errorDetailContent = '';
	    
	    var _errorDetailBody = _errorDetail_array.join('');
	    
	    if (_errorDetail_array != null && _errorDetail_array.length > 0)
	    {
	        _errorDetailContent += _errorDetailBody;
	    }
	
	    var _guidFiled = '';
	    if (opb.common.util.isEmpty_fnc(_errorGuid))
	    {
	        _guidFiled = '';
	    }
	    else
	    {
	        if (_errorCode == '')
	        {
	            _guidFiled = '<li>GUID : '+ _errorGuid + '</li>';
	        }
	        else
	        {
	            _guidFiled = '<li>ERROR CODE : ' + _errorCode + '</li><li>GUID : ' + _errorGuid + '</li>';
	        }
	
	    }
	
	    _errorHash['main'] = _errorContents_array.join('');
	    _errorHash['detail'] = _errorDetailContent + '' + _guidFiled;
	    
	    return _errorHash;
	}
	catch (e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.ajax.parsingErrorData_fnc]');
	}
};

/**
 * 상세 로그 메세지 return
 * 
 * @param errorLogs
 */
opb.common.ajax.getDetailErrorMessage_fnc = function(errorLogs)
{
	try
	{
	    var _detailErrorMessage_array = new Array();
	
	    if( errorLogs && errorLogs.length )
	    {
	        for (var i = 0, len = errorLogs.length; i < len; i++)
	        {
	            var _msgCd = errorLogs[i].msgCd;
	            var _rspsMsgCtt = errorLogs[i].rspsMsgCtt;
	
	            var _errMsg = _msgCd + ' : ' + _rspsMsgCtt;
	            _detailErrorMessage_array.push('<li>' + _errMsg + '</li>');
	        }
	    }
	
	    return _detailErrorMessage_array.join('');
	}
	catch (e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.ajax.getDetailErrorMessage_fnc]');
	}
};


/**
 * 오류 메세지 Alert 창을 보여준다.
 * 
 * @param {String} error_title Alert창에 보여줄 Title
 * @param {String} error_contents Alert창에 보여줄 Content
 */
opb.common.ajax.openErrorMessage_fnc = function(error_title, error_contents)
{
	try
	{
		var _message = null;
		var _detail_message = null;
		
		if (error_contents){
			_message = error_contents['main'];
			_detail_message = error_contents['detail'];
		}
		
		var _error_time = new Date().format('Y-m-d H:i:s');
		
		opb.common.layerpopup.openMessage_fnc({
			isConfirm: false,
			time: _error_time,
			message: _message,
			detailMsg : _detail_message,
			callback: function(e) {
				return;
			}
		});
	}
	catch (e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.ajax.openErrorMessage_fnc]');
	}
};

/**
 * 이중로그인 및 보안프레임 확인
 * 
 * @param {String} loginGuid 로그인 GUID
 */
opb.common.ajax.checkSecureframe_fnc = function(checkSecureframe)
{
	//alert(checkSecureframe);
	if(checkSecureframe == null || checkSecureframe != 'true') {
		return;
	}
	
	var sf = top.frames['hanaSecureframe'];
	var element = document.getElementsByTagName('body')[0];
	if(sf == null || typeof(sf.loginGuid) != "string"){
	    if(element) {
	        element.style.display = 'none';
	        element.style.visibility = 'hidden';
	    }
	    
		alert("하나은행 보안 프레임 또는 시큐어 변수를 찾을 수 없습니다. 이용할 수 없습니다.");
		opb.common.util.logout_fnc('/common/login.do');
	}

};

/**
 * Ajax 결과에 ready javascript 추가
 */
opb.common.ajax.getAjaxResponseAddString_fnc = function(targetDiv, checkSecureframe) {

	var resultText = "";
	resultText += '<script type="text/javascript">';
	resultText += '$j(document).ready(function(){';
	resultText += 'hana.JHanaNiceForms.init();';	
	resultText += 'opb.common.util.setTableSummary("'+targetDiv+'");';	
	resultText += 'opb.common.util.setTabSummary();';
	resultText += 'opb.common.util.checkWebAccessibility();';
	resultText += 'opb.common.util.initEncKey("'+targetDiv+'");';
	if(typeof(checkSecureframe) != 'undefined' && checkSecureframe == 'true') {
		resultText += 'opb.common.ajax.checkSecureframe_fnc("'+checkSecureframe+'");';
	}
	resultText += '});';
	resultText += '</script>';

	return resultText;
};

/**
 * Ajax 로드시 javascript 동적 로드
 * 		<script type="text/javascript" src="xxx.js"></script>	// xxx.js 동적 로드
 * @since 20150612
 * @param aryScriptUrls
 * @param index
 * @param callback
 * @return
 */
opb.common.ajax.loadScripts_fnc = function(aryScriptUrls, index, callback) {

	jQuery.getScript(aryScriptUrls[index], function() {

		if(index+1 <= aryScriptUrls.length-1) {
				opb.common.ajax.loadScripts_fnc(aryScriptUrls, index+1, callback);
		} else {

			if(callback) {
				callback();
			}
			
		}
	});
	
};

