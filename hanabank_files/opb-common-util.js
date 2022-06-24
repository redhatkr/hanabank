/************************************************************************************************
 * @file opb-common-util.js
 * @since 2012. 11. 20.
 * @author 오범석
 * 
 * @filelocation 모든 페이지에서 공통적으로 include 하는 top 페이지 에서 사용 선언
 * 
 * @fileoverview opb.common.xxx 와 같이 파일을 분리할수 없는것을 모아둔곳
 * 
 * @dependencies opb-base-namespace.js, JHanaAjax.js, opb-core-prototype.js, opb-core.js
 * 
 * @warn 수정 시 반드시 관리자와 상의하세요.
 * 
 * <pre>
 * ==============================================================================================
 * 변경이력:
 * DATE                AUTHOR        DESCRIPTION
 * ----------------------------------------------------------------------------------------------
 * 2012.11.08          오범석        최초작성
 * </pre>
 ************************************************************************************************/
 
/**
 * <pre>
 * ===================================================================================
 * 변수 선언부
 * ===================================================================================
 * </pre>
 */
 
/* ---------------- 자동로그아웃 타이머 - start ---------------- */
opb.common.util.auto_logout_timer.DEFAULT_TIMEOUT_SEC = 10 * 60; /* 자동로그아웃 시간(초) 의 기본 값  */

opb.common.util.auto_logout_timer.DEFAULT_TIMER_DELAY_SEC = 1; /* setInterval() 이 수행되는 시간(초) 의 기본값  */

opb.common.util.auto_logout_timer.timeInstance_num; /* 자동로그아웃 까지 남은 시간이 기록되는 instance  */

opb.common.util.auto_logout_timer.timerInterval_obj; /* 자동로그아웃까지 남은 시간을 표시하기 위해 setInterval()로 수행되는 object 를 정리하기 위해 담아두는 곳  */

opb.common.util.auto_logout_timer.timerDelaySec_num; /* setInterval() 이 실제 수행되는 시간(초)  */

opb.common.util.auto_logout_timer.TIMEVIEW_DIV = 'HANA_AUTOLOGOUT_TIMER_DIV'; /* top include 에 있는 자동로그아웃 이 되기까지 남은 시간을 표시하는 뷰 타이머 div  */

opb.common.util.auto_logout_timer.AUTO_LOGOUT_URL = opb.base.APPLICATION_CONTEXT_ROOT + '/common/pbkLogoutTimerSubmit.do';/* 시간 만료에 의해 호출되는 로그아웃 URL  */

opb.common.util.auto_logout_timer.RENEW_URL = opb.base.APPLICATION_CONTEXT_ROOT + '/common/restartTimer.do'; /* 로그인 연장 URL  */

opb.common.util.auto_logout_timer.SHOW_NOTICE_AFTER_AUTOLOGOUT_URL = opb.base.APPLICATION_CONTEXT_ROOT + '/common/login/timeoutOk.do';/* 자동로그아웃 후에 안내화면 URL  */

opb.common.util.auto_logout_timer.LOGOUT_URL = opb.base.APPLICATION_CONTEXT_ROOT + '/common/pbkLogoutSubmit.do'; /* 로그아웃 URL  */

opb.common.util.auto_logout_timer.LOGOUT_FORWARD_URL = opb.base.APPLICATION_CONTEXT_ROOT + '/common/logoutForward.do'; /* 로그아웃 포워드 URL  */


opb.common.util.auto_logout_timer.noticePopup_DIV = 'HANA_AUTOLOGOUT_INFO_DIV'; /* ???? bottom 에서 제거 하고 js 에서 div 찍어내는것으로 수정  */
opb.common.util.auto_logout_timer.noticePopupMask_DIV = 'HANA_AUTOLOGOUT_INFO_MASK_DIV'; /* ???? bottom 에서 제거 하고 js 에서 div 찍어내는것으로 수정  */
opb.common.util.auto_logout_timer.noticePopupTimeView_DIV = 'HANA_AUTOLOGOUT_INFO_TIMER_DIV'; /* 1분알림 뷰 에 존재하는 타이머, * ???? bottom 에서 제거 하고 js 에서 div 찍어내는것으로 수정  */
/* ---------------- 자동로그아웃 타이머 - end ---------------- */

/* 탭메뉴 활성화 클래스  */
opb.common.util.activate_CLASS = 'ons';

//pc정보 
var I3GPCDesignateValue = "";
var I3GPCDesignateNatValue = "";
var I3GPCDesignateWdataValue = "";

/**
 * <pre>
 * ===================================================================================
 * 자동로그아웃 타이머
 * ===================================================================================
 * </pre>
 */
/* 자동로그아웃 타이머 생성  */
opb.common.util.auto_logout_timer.init_fnc = function(auto_logout_time_sec)
{
	try
	{
		if(!opb.common.util.isEmpty_fnc(opb.common.util.auto_logout_timer.timerInterval_obj))
		{
			/* 타이머가 이미 실행 중이라면 초기화 이전 타이머를 제거한다.  */ 
			clearInterval(opb.common.util.auto_logout_timer.timerInterval_obj);
		}
		
		opb.common.util.auto_logout_timer.timeInstance_num = opb.common.util.auto_logout_timer._getAutoLogoutTimeSec_fnc(auto_logout_time_sec); /* 자동로그아웃 sec 설정  */
		
		opb.common.util.auto_logout_timer.timerDelaySec_num = opb.common.util.auto_logout_timer.DEFAULT_TIMER_DELAY_SEC; /* 기본값으로 timer delay sec 을 설정  */
		opb.common.util.auto_logout_timer.timerInterval_obj = setInterval(opb.common.util.auto_logout_timer._update_fnc, opb.common.util.auto_logout_timer.timerDelaySec_num * 1000); /* 반복적인 실행  */
	}
	catch (e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.auto_logout_timer.init_fnc]');
	}
};

/* delay sec 을 받아 자동로그아웃 재시작  */
opb.common.util.auto_logout_timer.restart_fnc = function(timer_delay_sec)
{
	try
	{
		/* delay sec 이 존재한다면  */
		if (parseInt(timer_delay_sec))
		{
			if (opb.common.util.auto_logout_timer.timerInterval_obj)
			{
				opb.common.util.auto_logout_timer.timerDelaySec_num = timer_delay_sec; /* timer delay sec 을 설정  */

				clearInterval(opb.common.util.auto_logout_timer.timerInterval_obj); /* 실행되고 있는 타이머를 중지  */
				opb.common.util.auto_logout_timer.timerInterval_obj = setInterval(opb.common.util.auto_logout_timer._update_fnc, opb.common.util.auto_logout_timer.timerDelaySec_num * 1000); /* 반복적인 실행  */
			}
		}
		else
		{
			alert(location.href + '\n\n' + '파라메터 timer_delay_sec : "' + timer_delay_sec + '" 값이 올바르지 않습니다.\n숫자여야 합니다.' + '\n[opb.common.util.auto_logout_timer.restart_fnc]');
		}
	}
	catch (e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.auto_logout_timer.restart_fnc]');
	}
};

/* 자동로그아웃 타이머 연장  ??????? 인자값 받아서 처리하도록 수정  */
opb.common.util.auto_logout_timer.renewAutoLogoutTime_fnc = function(auto_logout_time_sec)
{
	try
	{
//		var hanaAjax = new hana.JHanaAjax('', false, false); /* 연장 수행  */
//		hanaAjax.ajaxSubmit(opb.common.util.auto_logout_timer.RENEW_URL, null, true, function(xml_http)
		/* hanaAjax 를 통해 자동로그아웃 시간을 연장 시 위 코드를 사용하면 무한반복된다. jQuery AJAX로 변경 */
		$j.post(opb.common.util.auto_logout_timer.RENEW_URL, function(data)
		{
			/* ???? fail 에 대한 방어 코드 추가 바람  */
			//opb.common.util.auto_logout_timer.timeInstance_num = opb.common.util.auto_logout_timer.DEFAULT_TIMEOUT_SEC; /* 시간 재설정  */
			opb.common.util.auto_logout_timer.timeInstance_num = opb.common.util.auto_logout_timer._getAutoLogoutTimeSec_fnc(auto_logout_time_sec); /* 자동로그아웃 시간 재설정  */

			/* 본 페이지에 자동로그아웃 남은 시간을 표시할 div 가 존재시 남은 시간을 표시  */
			if ($j('#' + opb.common.util.auto_logout_timer.TIMEVIEW_DIV).size() > 0)
			{
				$j('#' + opb.common.util.auto_logout_timer.TIMEVIEW_DIV).html(opb.common.util.auto_logout_timer._getLeftTimeText_fnc(false));
			}
			else
			{
				/* div 객체가 존재하지 않을수도 있으며, 존재 여부와 상관 없이 자동 로그아웃은 동작한다.  */
			}

			opb.common.util.auto_logout_timer.closeNoticePopup_fnc(); /* 1분알림창을 숨긴다. */
		});
	}
	catch (e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.auto_logout_timer.renewAutoLogoutTime_fnc]');
	}
};

/* 자동로그아웃 1분알림창 숨기기  */
opb.common.util.auto_logout_timer.closeNoticePopup_fnc = function()
{
	try
	{
		/* 1분전알림창, 마스크, 이벤트리스너를 모두 제거  */
		$j('#' + opb.common.util.auto_logout_timer.noticePopup_DIV).remove();
		$j('#' + opb.common.util.auto_logout_timer.noticePopupMask_DIV).remove();
		$j(window).unbind('.' + opb.common.util.auto_logout_timer.noticePopup_DIV);
	}
	catch (e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.auto_logout_timer.closeNoticePopup_fnc]');
	}
};

/* 자동로그아웃 타이머 시간 표현  */
opb.common.util.auto_logout_timer._update_fnc = function()
{
	try
	{
		opb.common.util.auto_logout_timer.timeInstance_num -= opb.common.util.auto_logout_timer.timerDelaySec_num; /* 남은 시간 줄이기  */

		if (opb.common.util.auto_logout_timer.timeInstance_num < 0)
		{
			/* 자동로그아웃 시간이 경과 한 경우  */

			$j.post(opb.common.util.auto_logout_timer.AUTO_LOGOUT_URL, function(data)
			{
				if(opb.common.util.isOtherIframe() && location.href.indexOf('/cyberfx/') > -1) {
					top.frames[0].location.href="/cyberfx/index.do";
				} else {
					document.location.href = opb.common.util.auto_logout_timer.SHOW_NOTICE_AFTER_AUTOLOGOUT_URL;
				}
				
			});

			clearInterval(opb.common.util.auto_logout_timer.timerInterval_obj); /* 실행되고 있는 타이머를 중지  */
			$j('body').fadeOut(1100);
		}
		else
		{
			/* 자동로그아웃 시간이 남은 경우  */

			/* 본 페이지에 자동로그아웃 남은 시간을 표시할 div 가 존재시 남은 시간을 표시  */
			if ($j('#' + opb.common.util.auto_logout_timer.TIMEVIEW_DIV).size() > 0)
			{
				$j('#' + opb.common.util.auto_logout_timer.TIMEVIEW_DIV).html(opb.common.util.auto_logout_timer._getLeftTimeText_fnc(false));
			}

			/* 자동로그아웃 1분알림창에 남은 시간을 표시할  div 가 존재시 남은 시간을 표시  */
			if ($j('#' + opb.common.util.auto_logout_timer.noticePopupTimeView_DIV).size() > 0)
			{
				$j('#' + opb.common.util.auto_logout_timer.noticePopupTimeView_DIV).html(opb.common.util.auto_logout_timer._getLeftTimeText_fnc(true));
			}
			
			try
			{
				/* 1분 남았을 경우 연장 안내 팝업 show  */
				if (opb.common.util.auto_logout_timer.timeInstance_num == 60)
				{
					/* 자동로그아웃 1분전 알림창이 없을 경우에 새로 만든다.  */
					if($j('#' + opb.common.util.auto_logout_timer.noticePopup_DIV).size() == 0)
					{
						/* 1분전 알림창을 추가한다.  */
						$j('body').append(opb.common.util.auto_logout_timer._getHtml());
						
						/* _layer : 1분전알림창, _mask : 1분전알림창 마스크  */
						var _layer = $j('#' + opb.common.util.auto_logout_timer.noticePopup_DIV);
						var _mask = $j('#' + opb.common.util.auto_logout_timer.noticePopupMask_DIV);

						/* Layer Show */
						/* _viewport : 브라우저 화면 [넓이, 높이], _offset : 브라우저 [x, y]좌표  */
						var _viewport = opb.common.util.getViewport_fnc();
						var _offset = opb.common.util.getScrollOffset_fnc();
						
						/* 마스크 위치 조정  */
						_mask.css('left', _offset[0]);
						_mask.css('top', _offset[1]);

						/* 레이어 팝업 넓이가 화면 넓이보다 크다면 좌측 포지션값을 0으로 설정. 아니라면 중간위치에 오도록 설정  */
						_layer.css('left', (_layer.width() > _viewport[0] ? 0 : (_viewport[0] / 2) - (_layer.width() / 2)) + _offset[0]);

						/* 레이어 팝업 높이가 화면 높이보다 크다면 상단 포지션값을 0으로 설정. 아니라면 중간위치에 오도록 설정  */
						_layer.css('top', (_layer.height() > _viewport[1] ? 0 : (_viewport[1] / 2) - (_layer.height() / 2)) + _offset[1]);

						_layer.show();
						_layer.focus();

						/* 화면스크롤시 마스크 위치를 재조정 하도록 scroll 이벤트 처리  */
						$j(window).bind('scroll.' + opb.common.util.auto_logout_timer.noticePopup_DIV, function(jevent)
						{
							var _viewport = opb.common.util.getViewport_fnc();
							var _offset = opb.common.util.getScrollOffset_fnc();
							_mask.css('left', _offset[0]);
							_mask.css('top', _offset[1]);
							
							/* 레이어 팝업 뜨는 위치 재조정 */
							_layer.css('left', (_layer.width() > _viewport[0] ? 0 : (_viewport[0] / 2) - (_layer.width() / 2)) + _offset[0]);
							_layer.css('top', (_layer.height() > _viewport[1] ? 0 : (_viewport[1] / 2) - (_layer.height() / 2)) + _offset[1]);
							
						});
						
						/* 1분 알림창이 떴을 때 Pause 키로 로그인 연장을 처리한다.  */
						/* IE 에서는 'body'에 멀티에서는 window 에 keyup 이벤트를 적용한다.  */ 
						$j(opb.common.util.getBrowserInfo().MSIE?'body':window).bind('keyup.' + opb.common.util.auto_logout_timer.noticePopup_DIV, function(jevent) {
							if(jevent.which == 19)
							{ // Pause KeyCode : 19
								opb.common.util.auto_logout_timer.renewAutoLogoutTime_fnc();
							}
						});
						
					}
				}
			}
			catch(e)
			{
				/* 자동로그아웃 1분전 알림창이 오류가 발생하여도 기능에 문제없도록 SKIP 처리  */
				alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.auto_logout_timer._update_fnc 1분전알림창]');
			}
		}
	}
	catch (e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.auto_logout_timer._update_fnc]');
	}
};

/* getting 자동로그아웃 sec  */
opb.common.util.auto_logout_timer._getAutoLogoutTimeSec_fnc = function(auto_logout_time_sec)
{
	var _return;

	try
	{
		if (parseInt(auto_logout_time_sec))
		{
			_return = parseInt(auto_logout_time_sec);
		}
		else
		{
			_return = opb.common.util.auto_logout_timer.DEFAULT_TIMEOUT_SEC;
		}
	}
	catch (settime_e)
	{
		_return = opb.common.util.auto_logout_timer.DEFAULT_TIMEOUT_SEC;
	}

	if(isNaN(_return)) {
		return 10 * 60; // 10분설정
	}
	
	return parseInt(_return / 60, 10) * 60;
};

/* getting 화면상에 표시할 남은 시간  */
opb.common.util.auto_logout_timer._getLeftTimeText_fnc = function(isonlysec)
{
	var _return = '';

	try
	{
		if (isonlysec === undefined || isonlysec == null)
		{
			isonlysec = true;
		}

		var _min = parseInt(opb.common.util.auto_logout_timer.timeInstance_num / 60);
		var _sec = parseInt(opb.common.util.auto_logout_timer.timeInstance_num % 60);

		if (isonlysec)
		{
			/* format - ss  */
			_return = String.leftPad(_sec, 2, '0');
		}
		else
		{
			/* format - mm:ss  */
			_return = String.leftPad(_min, 2, '0') + ':' + String.leftPad(_sec, 2, '0');
		}
	}
	catch (e)
	{
		_return = '[ERROR opb.common.util.auto_logout_timer._getLeftTimeText_fnc] ' + e;
	}

	return _return;
};

/* getting 자동로그아웃 1분전 연장알림 HTML 문자열  */
opb.common.util.auto_logout_timer._getHtml = function()
{
	var _return = new Array();
	
	try
	{
		_return.push('<div id="' + opb.common.util.auto_logout_timer.noticePopupMask_DIV + '" style="width:100%; height:100%; position:absolute; z-index:999991; background-color:#000000; filter: alpha(opacity=20); opacity: 0.2;"></div>');
		_return.push('<div id="' + opb.common.util.auto_logout_timer.noticePopup_DIV + '" style="display:none; position:absolute; z-index:999999;">');
		_return.push('	<div class="pop_ty02">');
		_return.push('		<p class="tit_logout">곧 로그아웃 예정입니다.</p>');
		_return.push('		<p class="tit_logout_time">남은시간 : <span id="' + opb.common.util.auto_logout_timer.noticePopupTimeView_DIV + '">60</span></p>');
		_return.push('		<div class="contBox02">');
		_return.push('			<p>타인의 부정사용을 막기위해, 로그인 후 약 10분동안 뱅킹<br /> 메뉴 클릭 등 사용이 없을 경우 자동으로 로그아웃됩니다.</p>');
		_return.push('		</div>');
		_return.push('		<div class="btn_ex01">');
		_return.push('			<span><a href="#//HanaBank" onclick="opb.common.util.auto_logout_timer.renewAutoLogoutTime_fnc();">연장</a></span>');
		_return.push('			<span class="exty01"><a href="#//HanaBank" onclick="opb.common.util.auto_logout_timer.closeNoticePopup_fnc();">취소</a></span>');
		_return.push('		</div>');
		_return.push('		<div class="pop_close"><a href="#//HanaBank" onclick="opb.common.util.auto_logout_timer.closeNoticePopup_fnc();"><img src="' + opb.base.IMG_SVR_DOMAIN + '/resource/img/common/btn_popclose.gif" alt="자동로그아웃 팝업 닫기" /></a></div>');
		_return.push('	</div>');
		_return.push('</div>');

	}
	catch (e)
	{
		_return = new Array();
	}
	
	return _return.join('');
};

/* 자동로그아웃 로그인 이동  */
opb.common.util.auto_logout_timer.goLogin = function()
{
    top.location.href = "/common/login/index.do";
};

/* 자동로그아웃 메인 이동  */
opb.common.util.auto_logout_timer.goMain = function()
{
    top.location.href = "/";
};

/**
 * <pre>
 * ===================================================================================
 * 독립성 함수
 * ===================================================================================
 * </pre>
 */

/**
 * 외부사이트에서 iframe으로 요청 요부
 */
opb.common.util.isOtherIframe = function() {
	
	var result = false;
	try {
		if(top.document.domain != document.domain) {
			result = true;
		}
	} catch(e) {
		result = true;
	}
	
	return result;
};

/**
 * 브라우저의 화면 넓이와 높이를 배열로 반환
 * 
 * @return Array [넓이픽셀, 높이픽셀]
 */
//opb.core.getViewport_fnc = function()
opb.common.util.getViewport_fnc = function()
{
	var _x = 0;
	var _y = 0;

//	var _doc_element = document.documentElement;
//	var _body = document.body;
//
//	_x = document.all ? (!_doc_element.clientWidth ? _body.clientWidth : _doc_element.clientWidth) : window.innerWidth;
//	_y = document.all ? (!_doc_element.clientHeight ? _body.clientHeight : _doc_element.clientHeight) : window.innerHeight;

	_x = $j(window).width();
	_y = $j(window).height();

	return [ _x, _y ];
};

/**
 * 브라우저의 스크롤된 좌표(좌측, 상단) 을 배열로 반환한다.
 * body 및 그 하위의 div 와 같은 객체에 모두 반응한다.
 * 
 * @return Array [좌측, 상단]
 */
//opb.core.getScrollOffset_fnc = function()
opb.common.util.getScrollOffset_fnc = function()
{
	var _x = 0;
	var _y = 0;

//	var _doc_element = document.documentElement;
//	var _body = document.body;

//	_x = document.all ? (!_doc_element.scrollLeft ? _body.scrollLeft : _doc_element.scrollLeft) : (window.pageXOffset ? window.pageXOffset : window.scrollX);
//	_y = document.all ? (!_doc_element.scrollTop ? _body.scrollTop : _doc_element.scrollTop) : (window.pageYOffset ? window.pageYOffset : window.scrollY);
	
	_x = $j(window).scrollLeft();
	_y = $j(window).scrollTop();

	return [ _x, _y ];
};

/**
 * clientHeight를 가져온다.
 * 
 * @return Array [넓이, 높이]
 */
opb.common.util.getClientHeight_fnc = function()
{
    var _x = 0;
    var _y = 0;

    if (window.innerHeight)
    {
        _x = window.innerWidth;
        _y = window.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight != undefined)
    {
        _x = document.documentElement.clientWidth;
        _y = document.documentElement.clientHeight;
    }
    else if (document.body)
    {
        _x = document.body.clientWidth;
        _y = document.body.clientHeight;
    }

    return [ _x, _y ];
};

/**
 * ScrollHeight를 가져온다.
 * 
 * @return Array [넓이, 높이]
 */
opb.common.util.getScrollHeight_fnc = function()
{
    var _x = 0;
    var _y = 0;

    if (document.body.scrollHeight > document.body.offsetHeight)
    {
        _x = document.body.scrollWidth;
        _y = document.body.scrollHeight;
    }
    else
    {
        _x = document.body.offsetWidth;
        _y = document.body.offsetHeight;
    }

    return [ _x, _y ];
};

/**
* 탑 프레임의 HTML 타이틀 변경
* 탑프레임의 타이틀 중 []로 표시된 서버정보를 제외한 부분을 변경
*
* @param {String} t 변경할 타이틀 문자열
*/
opb.common.util.setTopHtmlTitle_fnc = function(t)
{
	if(opb.common.util.isOtherIframe()) {
		return;
	}
	
	var index = top.document.title.indexOf('[');
	
	t = t.replace(/&lt;/g, "<");
	if(index == -1)
	{
		top.document.title = t;
	}
	else
	{
		top.document.title = t + top.document.title.substring(index);
	}	
	return;
};

/**
* 페이지 타이틀과 네비게이션 마지막 경로를 변경한다.
*
* @param {String} t 변경할 타이틀 문자열
*/
opb.common.util.setPageTitle_fnc = function(t)
{
	if(t && t != null && t != '') {
		$j('.pageTitle').text(t);
	}

	return;
};

/**
 * 인자가 null, empty, undefined 등을 체크한다.
 * 
 * @param obj 체크 할 값
 * @return null, empty, undefined = true
 */
opb.common.util.isEmpty_fnc = function(obj)
{
	
	try
	{
		if(obj == null || obj == undefined || (typeof obj) == 'undefined' || obj == '')
		{
			return true;
		}
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.isEmpty_fnc]');
	}
	return false;
	
};


/**
 * 지정한 URL로 페이지를 이동합니다.
 *
 * @param {Object} url URL 주소
 * @param {Object} is_ajax Ajax로 Page이동할지 여부
 * @param {Object} params 전송할 파라메터
 */
opb.common.util.goPage_fnc = function(url, is_ajax, params)
{
	try
	{
		var _param_array = params.split('&');

		var _frm = document.createElement('form');
		_frm.setAttribute('method', 'post');
		_frm.setAttribute('action', opb.base.APPLICATION_CONTEXT_ROOT + url);

		for (var i = 0; i < _param_array.length; i++)
		{
			var param = _param_array[i];
			var hiddenInput = document.createElement('input');
			hiddenInput.setAttribute('type', 'hidden');
			hiddenInput.setAttribute('id', param.split('=')[0]);
			hiddenInput.setAttribute('name', param.split('=')[0]);
			hiddenInput.setAttribute('value', param.split('=')[1]);

			_frm.appendChild(hiddenInput);
		}

		document.body.appendChild(_frm);

		if (is_ajax)
		{
			// Ajax 호출
			var hanaAjax = new hana.JHanaAjax(opb.base.CONTENTS_DIV, true, true);
			hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + url, _frm);
		}
		else
		{
			// 페이지 이동
			_frm.submit();
		}
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.goPage_fnc]');
	}
};

var menuJson;
var menuJsonYn = "N";

/**
 * 사이트맵을 트리구조로 보여준다.
 *
 * @param {Object} click_obj 사이트맵 Anchor Object
 */
opb.common.util.openSitemapTree_fnc = function(click_obj, url)
{
	try
	{
		if (url === undefined || url == null) {
			url = '/common/sitemap_tree.jsp';
		}
		
		if(menuJsonYn == "Y"){
	    	opb.common.layerpopup.openLayer_fnc(url, 'OPB_Sitemap_generatedByJS', null, null, click_obj);
		} else {
		
			var hanaAjax = new hana.JHanaAjax(null, true, true);
			hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/siteMapTreeView.do"  , null, false, function(res, option) {
				
			    var _data = eval('(' + res.responseText + ')'); 
			    menuJsonYn = _data.pbkMenuJsonFlag;
		    	menuJson = JSON.parse(_data.pbkMenuJson);
		    	//메뉴가 없을때 코딩
		    	
		    	opb.common.layerpopup.openLayer_fnc(url, 'OPB_Sitemap_generatedByJS', null, null, click_obj);
			
			});
		}
		
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.apps.common.popup.openSitemap_fnc]');
	}
};


/**
 * 사이트맵을 트리구조로 그린다.
 */
opb.common.util.siteMapMenuPrint = function($ul, object, menuJson){
	if((typeof object.menuNm) != 'string') {
		return;
	}
	
	$ul.append(
			$j('<li style="top-margin: -5px;"/>').attr('data-li', object.menuNo).addClass('lvl' + object.level).append(function() {
				var $data = $j('#table-row').clone().attr('id', 'no-' + object.menuNo).show('highlight');
				
				// 하위메뉴 적용
				var $sub = '<span>&nbsp;</span>';
				// 메뉴명 적용
				var menuLevel = Number(object.menuLvl)+1;
				
				if(menuJson[0][object.menuNo]) {
					
					$clickEvent = $data.find('#menu-nm').bind('click', function(event, flag) {
						var $parent = $data.parent();
						if($parent.find('ul').size() > 0) {
							$parent.find('ul').toggle('highlight');
						}else {
							var $ul2 = $j('<ul class="sortgroup' + object.level + '"/>').attr('data-ul', object.menuNo);
							$parent.append($ul2);
							$j.each(menuJson[0][object.menuNo], function(index2, object2) {
								$parent.append(opb.common.util.siteMapMenuPrint($ul2, object2, menuJson));
							});
//							wts.work.internet.menu.sortable($ul2, 'sortgroup' + object.level);
						}
						
						if($j(this).attr('class') == "depth0" + menuLevel + " mn_plus") {
							$data.find("#chk_" + object.menuNo).attr("class","depth0" + menuLevel + " mn_minus");
						}else {
							$data.find("#chk_" + object.menuNo).attr("class","depth0" + menuLevel + " mn_plus");
						}
						
					}).css('cursor', 'pointer').attr('id',"chk_" + object.menuNo);
					
					$data.find("#chk_" + object.menuNo).attr("class","depth0" + menuLevel + " mn_plus");
				}else{
					$data.find('#menu-nm').attr('id',"chk_" + object.menuNo);
					$data.find("#chk_" + object.menuNo).attr("class","depth0" + menuLevel + " mn_selt");
				}
				
				
				$data.find("#chk_" + object.menuNo).html(function() {
					var txt = '<span>';
					var nbsp = "";
					for(var t=1; t<object.level; t++) {
						nbsp += '&nbsp;&nbsp;';
					}
					
					var url = object.urlAdr;
					if(url == null || url == '') {
						url = object.menuPageFnctNm;
					}
					//alert(url);
					txt += nbsp;
					if(url == null || url == '') {
					} else {
						
			 			if("01" == object.menuClckTypCd) {//주소창링크
			 				txt += "<a href=\"#HanaBank\" onclick=\""+object.menuPageFnctNm + "('" + object.urlAdr + "');return false;\">";
			     		//}else if("02" == object.menuClckTypCd){//ajax통신
			     		//	txt += "<a href=\"#HanaBank\" onclick=\"goBankingMenu('" + object.urlAdr + "');return false;\">";
			     		}else if("03" == object.menuClckTypCd){//팝업오픈
			     			
			     		}else if("04" == object.menuClckTypCd){//레이어팝업오픈
			     			
			     		}else if("05" == object.menuClckTypCd){//윈도우팝업
			     			txt += "<a href=\"#//HanaBank\" onclick=\"window.open('" + object.urlAdr + "','" + object.menuPageFnctNm + "'); return false;\" title=\"새창으로 열립니다.\">";
			     		}else if("06" == object.menuClckTypCd){//alert창
			     			
			     		}else if("07" == object.menuClckTypCd){//함수호출
			     			txt += "<a href=\"#//HanaBank\" onclick=\"opb.common.util.closeSitemap_fnc();" + object.menuPageFnctNm + "; return false;\">";
			     		}else{
			     			txt += "<a href=\"#HanaBank\" onclick=\"pbk.web.util.goMenu('" + object.urlAdr + "');return false;\">";
			     		}

					}
					txt += object.menuNm + " [" + object.menuNo + "]";
					if(url == null || url == '') {
					} else {
						txt += '</a> : ' + url;
					}
					txt += '</span>';
					return txt;
				});
				
				
				
				// 메뉴주소 적용
//				$data.find('td.menu-url').text(object.urlAdr == '' ? object.menuPageFnctNm : object.urlAdr);
				// 메뉴사용여부 적용
//				$data.find('td.menu-use_yn').text(object.useYn);
				// 메뉴활성여부 적용
//				$data.find('td.menu-actv_yn').text(object.actvYn);
				return $data;
			})
		);
//	$j("#chk_" + object.menuNo).trigger('click',["chk_" + object.menuNo]);
};

opb.common.util.siteTrigger = function (object, menuJson){
//	if((typeof object.menuNm) != 'string') {
//		return;
//	}
//	
//	if(menuJson[0][object.menuNo]) {
//		
//		$j.each(menuJson[0][object.menuNo], function(index2, object2) {
//			$j("#chk_" + object.menuNo).trigger('click',["chk_" + object2.menuNo]);
//			opb.common.util.siteTrigger(object2, menuJson);
//		});
//		
//		$j("#chk_" + object.menuNo).trigger('click',["chk_" + object.menuNo]);
//	}
		
};

/**
 * 사이트맵을 보여준다.
 *
 * @param {Object} click_obj 사이트맵 Anchor Object
 */
opb.common.util.openSitemap_fnc = function(click_obj, url)
{
	try
	{
		if (url === undefined || url == null) {
			url = '/contents/xml/sitemap.jsp';
		}
		opb.common.layerpopup.openLayer_fnc(url, 'OPB_Sitemap_generatedByJS', null, null, click_obj);
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.apps.common.popup.openSitemap_fnc]');
	}
};

/**
 * 사이트맵을 닫는다.
 */
opb.common.util.closeSitemap_fnc = function()
{
	try
	{
		opb.common.layerpopup.closeLayer_fnc('OPB_Sitemap_generatedByJS');
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.apps.common.popup.closeSitemap_fnc]');
	}
};

/**
 * 입력 변수에 3 자리마다 콤마(,)를 붙여 반환한다.
 * 
 * @param num_string 콤마를 붙일 값
 */
opb.common.util.changeFormatCurrency_fnc = function(num_string)
{
	try
	{
		var _re = /,|\s+/g;
		var _num_string = num_string.replace(_re, '');
		
		_re = /(-?\d+)(\d{3})/;
		while (_re.test(_num_string))
		{
			_num_string = _num_string.replace(_re, '$1,$2');
		}
		
		return _num_string;
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.changeFormatCurrency_fnc]');
		return num_string;
	}
};

/**
 * 콤마(,)를 제거하여 반환한다.
 * 
 * @param {String} num_string 콤마를 제거할 값
 */
opb.common.util.stripCommas_fnc = function(num_string)
{
	try
	{
		var re = /,/g;
		return num_string.replace(re, '');
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.stripCommas_fnc]');
		return num_string;
	}
};

/**
 * 텍스트 필드에 입력한 값에 3자리마다 콤마(,)를 붙인다.
 * 텍스트 필드에 아래를 기입한다. onkeyup="toMoney(this)"
 * 
 * @param field 텍스트 필드
   // 사용하지 않는것으로 판단된 소캠 E2E 처리 부분을 제거하였습니다. 필요시 원복할 예정입니다.
 */
opb.common.changeObjectValueFormatCurrency_fnc = function(field)
{
	try
	{
		var _value = field.value;
		
		var _indexOfPoint = _value.indexOf('.');
		if (_indexOfPoint == -1)
		{
			field.value = opb.common.util.changeFormatCurrency_fnc(_value);
		}
		else
		{
			field.value = opb.common.util.changeFormatCurrency_fnc(_value.substring(0, _indexOfPoint));
			/* 소수점을 제거하려면 아래 코드를 사용하면 될것같다.  */
			//field.value = opb.common.util.changeFormatCurrency_fnc(_value.replace(/\./g, ''));
		}
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.changeObjectValueFormatCurrency_fnc]');
	}
};

/**
 * 선택한 탭메뉴로 활성화 상태로 만든다.
 * 나머지 탭메뉴는 비활성화 상태로 만든다.
 * 
 * @param {Object} target 활성화시킬 대상 object 또는 순번(0부터시작)
 * @param {String} parent_target_id TabMenu 영역 ID
 */
opb.common.util.toggleTabMenu_fnc = function(target, parent_target_id)
{
	try
	{
		$j('#' + parent_target_id).find('li').each(function(index)
		{
			/* 활성화할 오브젝트이거나 순번일 경우 활성화  */
		    if (this == target || index == target)
		    {
		    	$j(this).addClass(opb.common.util.activate_CLASS);
		    }
		    else
		    {
		    	$j(this).removeClass(opb.common.util.activate_CLASS);
		    }
		});
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.toggleTabMenu_fnc]');
	}
};

/**
 * 선택한 탭메뉴로 활성화 상태로 만든다.
 * 나머지 탭메뉴는 비활성화 상태로 만든다.
 * 
 * @param {Object} target 활성화시킬 대상 object 또는 순번(0부터시작)
 * @param {String} parent_target_id TabMenu 영역 ID
 */
opb.common.util.toggleTabMenuDay3_fnc = function(target, parent_target_id)
{
	try
	{
		$j('#' + parent_target_id).find('li').each(function(index)
		{
			/* 활성화할 오브젝트이거나 순번일 경우 활성화  */
		    if (this == target || index == target)
		    {
		    	$j(this).addClass('on');
		    }
		    else
		    {
		    	$j(this).removeClass('on');
		    }
		});
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.toggleTabMenuDay3_fnc]');
	}
};

/**
 * 화면의 특정위치 (id 에 해당하는 엘레멘트) 로 스크롤을 옮긴다.
 * 
 * @param {Object} target_id 이동할 타겟 아이디
 */
opb.common.util.scrollToTarget_fnc = function(target_id)
{
    var _target = document.getElementById(target_id);
    var _curleft = 0;
    var _curtop = 0;
    
    /* ID 에 해당하는 엘레멘트의 위치값을 가져온다.  */
    if ((typeof _target) == 'object' && _target.offsetParent)
    {
    	_curleft = _target.offsetLeft;
        _curtop = _target.offsetTop;
        
        while (_target = _target.offsetParent)
        {
        	_curleft += _target.offsetLeft; /* 왼쪽 위치값. ???? 사용하지 않는다.. 삭제해도됨.  */
            _curtop += _target.offsetTop; /* 위에서부터 위치값  */
        }
    }
    
    window.scrollTo(0, _curtop);
};

/**
 * 로그아웃 처리를 진행한다. 처리 후 로그아웃 페이지로 이동한다.
 */
opb.common.util.logout_fnc = function(forwardUrl)
{
	try
	{
		var hanaAjax = new hana.JHanaAjax('', true, true);
		/* 로그아웃 처리후 포워드 한다. (로그아웃 포워드 한다.)  */
		hanaAjax.ajaxSubmit(opb.common.util.auto_logout_timer.LOGOUT_URL, null, true, function(xmlHttp) {

			if(opb.common.util.isOtherIframe() && location.href.indexOf('/cyberfx/') > -1) {
				top.frames[0].location.href="/cyberfx/index.do";
				return;
			}

			if(forwardUrl == null || forwardUrl == 'undefined' ||  forwardUrl == '') {
//				hanaAjax.ajaxSubmit(opb.common.util.auto_logout_timer.LOGOUT_FORWARD_URL);
				top.location.href="/common/login/logoutOk.do";
			} else {
				top.location.href="/common/login.do";
			}
			
		});
		
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.logout_fnc]');
	}
};

/**
* 타겟 문자열의 어떤 문자열을 지정한 문자열로 치환한다.
*
* @param target 타겟 문자열
* @param str1 치환대상
* @param str2 치환문자
*/
opb.common.util.replaceAll_fnc = function( target, str1, str2 )
{
	try
	{
		/* target 이 null 일경우 에러 발생함. target 이 존재할 경우만 실행함   */
		if (target == null || str1 == str2)
		{
			return target;
		}
		else
		{
			var _temp_str = target.trim();
			
			/* 치환대상 문자열이 없을 때까지  반복해서 찾아서 바꾼다.  */
			while (_temp_str.indexOf(str1) > -1)
			{
				_temp_str = _temp_str.replace(str1, str2);
			}
			return _temp_str;
		}
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.replaceAll_fnc]');
	}
};

/**
 * 보안모듈 설치 페이지로 이동한다.
 */
opb.common.util.modeSecurityInstall_fnc = function()
{
	opb.common.layerpopup.openMessage_fnc({
        isConfirm: true,
        title: '보안모듈설치',
        message: '보안모듈이 설치되지 않았습니다.',
        callback: function(isConfirm) {
        	if(isConfirm)
        	{
        		top.location.href = '/common/module_install.html';
        	}
        }
	});
};

/**
 * 페이지 이동 함수 (location 을 이동한다.)
 * 
 * @param {String} url 서버 URL
 * @param {Object} data 히든필드에 저장할 데이터 [{key: value}]
 * @param {String} contentUrl index 페이지로 이동할 경우 content 영역에 표시할 url
 */
opb.common.util.goMenu_fnc = function(url, data, contentUrl, isParentTarget)
{
	try
	{
		// 현재 GNB ID와 요청 루트 패스가 같으면 Ajax 호출S
		// /contents, /cont, /portal, /css 일경우 Ajax 호출 제외
		if(url.indexOf('/contents/') != 0 && url.indexOf('/cont/') != 0
				/*&& url.indexOf('/portal/') != 0 && url.indexOf('/csc/') != 0*/
				&& url.indexOf('/index.do') == -1 && url.indexOf('/login.do') == -1) {
			
			if(((typeof isParentTarget) == 'undefined' || isParentTarget == false)
					&& !((typeof menuManager) == 'undefined') && url.indexOf("/"+menuManager.gnbId) == 0) {
				pbk.web.util.goAjaxMenu(url, data, null);
				return;
			} else {

				// 심플대응
				var locPathname = document.location.pathname;
				if(((typeof isParentTarget) == 'undefined' || isParentTarget == false)
						&&locPathname == url.substring(0, url.indexOf("/", 1))+"/index.do") {
					pbk.web.util.goAjaxMenu(url, data, null);
					return;
				}
				
				// 확장자 .do 이면 index.do로..
				var ext = url.slice(url.indexOf(".")+1);
				if(ext.indexOf("?") > -1) {
					ext = ext.substring(0, ext.indexOf("?"));
				}
				if(ext == "do") {
					if(url.indexOf('?') == -1) {
						contentUrl = url;
						url = contentUrl.substring(0, url.indexOf("/", 1))+"/index.do";
						
					}else {
						
						if(opb.common.util.isEmpty_fnc(data)) {
							data = [];
						}
						
						var qs = url.split('?')[1];
						var parameterValues = qs.split('&');
						for (var i = 0; i < parameterValues.length; i++){
							var param = parameterValues[i].split('=');
							if(param.length == 2) {
								data.push({'id': param[0], 'value': param[1]});
							}
						}
						
						contentUrl = url.split('?')[0];
						url = contentUrl.substring(0, url.indexOf("/", 1))+"/index.do";

					}
				}
				
			}
		}

		if(url == contentUrl) {
			contentUrl = null;
		}

		//if((url == '/banka/insu/wpdep407_01i.do') && (date.getToday('YmdHis') > '20140314200000') && (date.getToday('YmdHis') < '20140315040000')) {
		if((url == '/banka/insu/wpdep407_01i.do') && (date.getToday('YmdHis') > '20150718080000') && (date.getToday('YmdHis') < '20150718120000')) {
			
		   	opb.common.layerpopup.openMessage_fnc({
		   		isConfirm: false,
				title : '안내',
				message: '시스템 개선작업으로 보험/공제 관련조회가 일시 중단됩니다.<br />(2015.07.18 08:00 ~ 2015.07.18 12:00)<br />이용에 불편을 드려 죄송합니다.',
				callback : null
			});
			
			return;
		}
	    opb.common.layerpopup.openLoading_fnc();
		$j(window).unload(function() {
			try
			{
				opb.common.layerpopup.closeLoading_fnc();
			}
			catch(e){}
		});

		if(opb.common.util.isEmpty_fnc(data)) {
			data = null;
		}
		if(opb.common.util.isEmpty_fnc(contentUrl)) {
			contentUrl = null;
		}
	    
	    if(isParentTarget && isParentTarget == true && opb.common.util.isEmpty_fnc(parent.hanaSecureframe)) {
	    	hana.JHanaUtils.form.createFormSubmit(data, url, contentUrl, null, isParentTarget);
	    } else {
	    	hana.JHanaUtils.form.createFormSubmit(data, url, contentUrl, null, null);
	    }
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.goMenu_fnc]');
	}
};

/**
 * 메인페이지로 이동
 */
opb.common.util.goMainPage_fnc = function()
{
    opb.common.layerpopup.openLoading_fnc();
    
    if(opb.common.util.isEmpty_fnc(top.hanaSecureframe))
    {
    	//opb.common.util.goMenu_fnc('/');
    	top.location.href = '/';
    }
    else
    {
    	top.location.href = '/';
    }
};
 
/**
 * 로그아웃 후 메인페이지로 이동
 */
opb.common.util.goLogoutMainPage_fnc = function()
{
	opb.common.util.goLogoutLinkPage_fnc('/', '하나은행 개인뱅킹 메인');
};

/**
 * 로그아웃 후 링크페이지로 이동
 */
opb.common.util.goLogoutLinkPage_fnc = function(linkUrl, linkUrlName)
{
	if(linkUrlName == null || linkUrlName == 'undefined' ||  linkUrlName == '') {
	   	
		opb.common.layerpopup.openLoading_fnc();

		var hanaAjax = new hana.JHanaAjax('', true, true);

		/* 로그아웃 처리후 포워드 한다. (로그아웃 포워드 한다.)  */
		hanaAjax.ajaxSubmit(opb.common.util.auto_logout_timer.LOGOUT_URL, null, true, function(xmlHttp)
		{
			if(opb.common.util.isEmpty_fnc(top.hanaSecureframe))
			{
				opb.common.util.goMenu_fnc(linkUrl);
			}
			else
			{
				top.location.href = linkUrl;
			}
		}, 'UTF-8');
		
	} else {
		
	   	opb.common.layerpopup.openMessage_fnc({
			isConfirm : true,
			title : '서비스 종료 확인',
			message : linkUrlName + '화면으로 이동되며, <br />자동 로그아웃 됩니다. 이동하시겠습니까?',
			callback : function(isConfirm) {
				if(isConfirm)
				{
					opb.common.layerpopup.openLoading_fnc();
	
					var hanaAjax = new hana.JHanaAjax('', true, true);
	
					/* 로그아웃 처리후 포워드 한다. (로그아웃 포워드 한다.)  */
					hanaAjax.ajaxSubmit(opb.common.util.auto_logout_timer.LOGOUT_URL, null, true, function(xmlHttp)
					{
						if(opb.common.util.isEmpty_fnc(top.hanaSecureframe))
						{
							opb.common.util.goMenu_fnc(linkUrl);
						}
						else
						{
							top.location.href = linkUrl;
						}
					}, 'UTF-8');
				}
			}
		});
		
	}
}; 

/**
 * 개인뱅킹 메인페이지로 이동
 */
opb.common.util.goHanaBankMainPage_fnc = function()
{
	if(opb.common.util.isOtherIframe() && location.href.indexOf('/cyberfx/') > -1) {
		return;
	}
	
	try{
		document.location.href = "/index.html";
	}catch(e){}	
};

/**
 * 로그아웃 후 개인뱅킹 메인페이지로 이동
 */
opb.common.util.goLogoutHanaBankMainPage_fnc = function()
{
	opb.common.layerpopup.openMessage_fnc({
		isConfirm : true,
		title : '서비스 종료 확인',
		message : '하나은행 인터넷뱅킹 메인화면으로 이동되며, <br />자동 로그아웃 됩니다. 이동하시겠습니까?',
		callback : function(isConfirm) {
			if(isConfirm)
			{
				opb.common.util.goHanaBankMainPage_fnc();
			}
		}
	});
};

/**
 * 클라이언트의 플랫폼정보를 저장한 객체를 반환한다.
 * @base veraport20.js
 */
opb.common.util.getPlatformInfo = function()
{
    var platformInfo = {
        Windows:false, Linux:false, Ubuntu:false, Fedora:false, Mac:false, iOS:false, Android:false,
        Mobile:false, x64:false,
        type: 'unknown', name: 'unknown'
    };

    try
    {
	    platformInfo.name = navigator.platform;
	    if (navigator.appVersion.match('WOW64')) 
	    {
	    	platformInfo.name = 'WOW64';
	    }
	
	    if (platformInfo.name.match(/Win32/i) || platformInfo.name.match(/WOW64/i))
	    {
	        platformInfo.Windows = true;
	        platformInfo.type = 'Windows';
	        if (navigator.appVersion.match(/Win64/i))
	        {
	            platformInfo.x64 = true;
	            platformInfo.type = 'Windows64';
	        }
	    }
	    else if (platformInfo.name.match('Win64'))
	    {
	        platformInfo.Windows = true;
	        platformInfo.x64 = true;
	        platformInfo.type = 'Windows64';
	    }
	    else if (platformInfo.name.match('Linux armv'))
	    {
	        platformInfo.Mobile = true;
	        platformInfo.Android = true;
	        platformInfo.type = 'Android';
	    }
	    else if (platformInfo.name.match(/Linux/i))
	    {
	        platformInfo.Linux = true;
	        platformInfo.type = 'Linux';
	        if (platformInfo.name.match(/x86_64/i))
	        {
	            platformInfo.x64 = true;
	            platformInfo.type = 'Linux64';
	        }
		    else if (navigator.userAgent.match(/x86_64/i))
	        { //Opera
	            platformInfo.x64 = true;
	            platformInfo.type = 'Linux64';
	        }
		    if (navigator.userAgent.match(/Fedora/i))
		    {
		        platformInfo.Fedora = true;
		        platformInfo.type = 'Fedora';
		        if (platformInfo.x64) platformInfo.type = 'Fedora64';
		    }
		    else if (navigator.userAgent.match(/Ubuntu/i))
		    {
	            platformInfo.Ubuntu = true;
	            platformInfo.type = 'Ubuntu';
	            if (platformInfo.x64) platformInfo.type = 'Ubuntu64';
		    }
	    }
	    else if (platformInfo.name.match(/MacIntel/i))
	    {
	        platformInfo.Mac = true;
	        platformInfo.type = 'Mac';
	    }
	    else if (platformInfo.name == 'iPad'
	            || platformInfo.name == 'iPhone'
	            || platformInfo.name == 'iPod'
	            || platformInfo.name == 'iOS')
	    {
	        platformInfo.Mobile = true;
	        platformInfo.iOS = true;
	        platformInfo.type = 'iOS';
	    }
	
	    if ((navigator.userAgent.match(/iPhone/i))  ||
	        (navigator.userAgent.match(/iPod/i))    ||
	        (navigator.userAgent.match(/iPad/i))    ||
	        (navigator.userAgent.match(/Android/i)))
	    {
	        platformInfo.Mobile = true;
	    }
	    if ((navigator.userAgent.match(/Windows Phone/i)) ||
	        (navigator.userAgent.match(/Windows CE/i))    ||
	        (navigator.userAgent.match(/Symbian/i))       ||
	        (navigator.userAgent.match(/BlackBerry/i)))
	    {
	        platformInfo.Mobile = true;
	    }
	
	    //modify/remove system type
	    if (navigator.userAgent.match('Android') && navigator.userAgent.match('Opera Mini'))
	    {
	        platformInfo.Mobile = true;
	        platformInfo.Android = true;
	        platformInfo.type = 'Android';
	    }
    }
    catch(err)
    {
    	alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.getPlatformInfo]');
    }
    
    return platformInfo;
};


/**
 * 클라이언트의 플랫폼정보를 저장한 객체를 반환한다.
 * @base veraport20.js
 */
opb.common.util.getBrowserInfo = function()
{
    var browserInfo = {
        MSIE:false, Navigator:false, Firefox:false, Chrome:false, Safari:false, Opera:false, ChromePlus:false, ETC:false,
        name: 'unknown', version: '-1'
    };

    try {
        var index = -1;
        var tmp = '';
        if(navigator.appName == 'Microsoft Internet Explorer')
        {
            browserInfo.MSIE = true;
            browserInfo.name = 'MSIE';
            index = navigator.userAgent.indexOf(browserInfo.name)+browserInfo.name.length+1;
            tmp = navigator.userAgent.substring(index);
            index = tmp.indexOf(';');
            if (index < 0) index = tmp.indexOf(')');
            browserInfo.version = tmp.substring(0, index);
        }
        else if(navigator.userAgent.match(/Trident/i))
        { //IE v11 over
            browserInfo.MSIE = true;
            browserInfo.name = 'MSIE';
            index = navigator.userAgent.indexOf('rv:')+'rv:'.length;
            tmp = navigator.userAgent.substring(index);
            index = tmp.indexOf(';');
            if (index < 0) index = tmp.indexOf(')');
            browserInfo.version = tmp.substring(0, index);
        }
        else if (navigator.userAgent.match(/Navigator/i))
        { //Firefox
            browserInfo.Navigator = true;
            browserInfo.name = 'Navigator';
            index = navigator.userAgent.lastIndexOf(browserInfo.name)+browserInfo.name.length+1;
            tmp = navigator.userAgent.substring(index);
            browserInfo.version = tmp;
            index = tmp.indexOf(' ');
            if (index > 0) browserInfo.version = tmp.substring(0, index);
        }
        else if (navigator.userAgent.match(/Firefox/i))
        {
            browserInfo.Firefox = true;
            browserInfo.name = 'Firefox';
            index = navigator.userAgent.lastIndexOf(browserInfo.name)+browserInfo.name.length+1;
            tmp = navigator.userAgent.substring(index);
            browserInfo.version = tmp;
            index = tmp.indexOf(' ');
            if (index > 0) browserInfo.version = tmp.substring(0, index);
        }
        else if (navigator.userAgent.match(/OPR/i))
        { //Opera v15 over
            browserInfo.Opera = true;
            browserInfo.name = 'Opera';
            index = navigator.userAgent.lastIndexOf('OPR')+'OPR'.length+1;
            tmp = navigator.userAgent.substring(index);
            browserInfo.version = tmp;
            index = tmp.indexOf(' ');
            if (index > 0) browserInfo.version = tmp.substring(0, index);
        }
        else if (navigator.userAgent.match(/Chrome/i))
        { //Safari
            browserInfo.Chrome = true;
            browserInfo.name = 'Chrome';
            if (navigator.userAgent.match(/ChromePlus/i))
            {
                browserInfo.ChromePlus = true;
                browserInfo.name = 'ChromePlus';
            }
            index = navigator.userAgent.lastIndexOf(browserInfo.name)+browserInfo.name.length+1;
            tmp = navigator.userAgent.substring(index);
            browserInfo.version = tmp;
            index = tmp.indexOf(' ');
            if (index > 0) browserInfo.version = tmp.substring(0, index);
        }
        else if (navigator.userAgent.match(/Safari/i))
        {
            browserInfo.Safari = true;
            browserInfo.name = 'Safari';
            //index = navigator.userAgent.lastIndexOf(browserInfo.name)+browserInfo.name.length+1;
            index = navigator.userAgent.lastIndexOf('Version')+'Version'.length+1;
            tmp = navigator.userAgent.substring(index);
            browserInfo.version = tmp;
            index = tmp.indexOf(' ');
            if (index > 0) browserInfo.version = tmp.substring(0, index);
        }
        else if (navigator.userAgent.match(/Opera/i))
        {
            browserInfo.Opera = true;
            browserInfo.name = navigator.appName;
            index = navigator.userAgent.lastIndexOf('Version')+'Version'.length+1;
            tmp = navigator.userAgent.substring(index);
            browserInfo.version = tmp;
            index = tmp.indexOf(' ');
            if (index > 0) browserInfo.version = tmp.substring(0, index);
        }
        else
        {
            browserInfo.ETC = true;
            browserInfo.name = navigator.appName;
            browserInfo.version = 'NOT_OK';
        }
    }
    catch(err)
    {
    	alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.getBrowserInfo]');
    }

    return browserInfo;
};

/**
 * 오픈뱅킹 (모바일 환경) 이용안내
 */
opb.common.util.infoMobile_fnc = function(addedMessage)
{
	var _layer_div = 'info_mobile';
	var _mask_div = 'info_mobile_mask';
	
	var _html = new Array();
	_html.push('<div id="' + _mask_div + '" style="width:100%; height:100%; position:absolute; z-index:999991; background-color:#000000; filter: alpha(opacity=20); opacity: 0.2;"></div>');
	_html.push('<div id="' + _layer_div + '" style="display:none; position:absolute; z-index:999999;">');
    _html.push('    <div class="pop_ty01 pop_ty05">');
    _html.push('        <div class="pop_cont">');
    _html.push('        <h4>개인뱅킹 이용안내</h4>');
    _html.push('            <div class="info05">');
    _html.push('                <ul>');
    _html.push('                    <li>스마트폰, 태블릿 등 모바일 환경에서는 하나은행 개인뱅킹을 사용하실 수 없습니다.</li>');
    _html.push('                    <li>하나N Bank, 하나N mini 등 app 뱅킹을 이용해주시기 바랍니다.</li>');
    _html.push('                </ul>');
    _html.push('            </div>');
    _html.push('            <div class="btn_ex01">');
    _html.push('                <span><a href="http://m.hanabank.com/download" title="새창에서 안드로이드 하나N Bank 설치" target="_balnk">안드로이드 하나N Bank 설치하기</a></span>');
    _html.push('                <span><a href="https://itunes.apple.com/kr/app/id340826757" title="새창에서 아이폰 하나N Bank 설치" target="_balnk">아이폰 하나N Bank 설치하기</a></span>');
    _html.push('            </div>');
    _html.push('        </div>');
    _html.push('        <div class="pop_footer">');
    _html.push('            <p>COPYRIGHT(C) 2013 HANABANK. ALL RIGHTS RESERVED</p>');
    _html.push('        </div>');
    _html.push('    </div>');
    _html.push('</div>');
    
	/* 모바일 이용안내 팝업이 없을 경우에 새로 만든다.  */
	if($j('#' + _layer_div).size() == 0)
	{
		/* 1분전 알림창을 추가한다.  */
		$j('body').append(_html.join(''));
		
		/* _layer : 1분전알림창, _mask : 1분전알림창 마스크  */
		var _layer = $j('#' + _layer_div);
		var _mask = $j('#' + _mask_div);

		/* Layer Show */
		/* _viewport : 브라우저 화면 [넓이, 높이], _offset : 브라우저 [x, y]좌표  */
		var _viewport = opb.common.util.getViewport_fnc();
		var _offset = opb.common.util.getScrollOffset_fnc();
		
		/* 마스크 위치 조정  */
		_mask.css('left', _offset[0]);
		_mask.css('top', _offset[1]);

		/* 레이어 팝업 넓이가 화면 넓이보다 크다면 좌측 포지션값을 0으로 설정. 아니라면 중간위치에 오도록 설정  */
		_layer.css('left', (_layer.width() > _viewport[0] ? 0 : (_viewport[0] / 2) - (_layer.width() / 2)) + _offset[0]);

		/* 레이어 팝업 높이가 화면 높이보다 크다면 상단 포지션값을 0으로 설정. 아니라면 중간위치에 오도록 설정  */
		_layer.css('top', (_layer.height() > _viewport[1] ? 0 : (_viewport[1] / 2) - (_layer.height() / 2)) + _offset[1]);

		_layer.show();
		_layer.focus();

		/* 화면스크롤시 마스크 위치를 재조정 하도록 scroll 이벤트 처리  */
		$j(window).bind('scroll.' + _layer_div, function(jevent)
		{
			var _viewport = opb.common.util.getViewport_fnc();
			var _offset = opb.common.util.getScrollOffset_fnc();
			_mask.css('left', _offset[0]);
			_mask.css('top', _offset[1]);
			
			/* 레이어 팝업 뜨는 위치 재조정 */
			_layer.css('left', (_layer.width() > _viewport[0] ? 0 : (_viewport[0] / 2) - (_layer.width() / 2)) + _offset[0]);
			_layer.css('top', (_layer.height() > _viewport[1] ? 0 : (_viewport[1] / 2) - (_layer.height() / 2)) + _offset[1]);
			
		});
		
	}
};

/**
 * 클라이언트 OS or Browser가 오픈뱅킹에서 지원하는지 검사한다.
 * 지원하지 않는 OS or Browser 일 경우 안내메세지를 레이어팝업으로 출력한다.
 * @use 로그인페이지
 */
opb.common.util.checkClientsIsSupportedOpenbanking_fnc = function()
{
	var _platformInfo = opb.common.util.getPlatformInfo();
	/* Windows, Linux, Mac 일 경우에만 허용한다.  */
	if(!(_platformInfo.Windows || _platformInfo.Linux || _platformInfo.Mac))
	{
		//opb.common.util.infoMobile_fnc();
	}
	
	/* 브라우저 체크 시 아래 _browserInfo를 활용한다.
	var _browserInfo = opb.common.util.getBrowserInfo();
	*/
};

/** 에러방지용 */
opb.common.util.checkClientsIsSupportedOpenbanking = function()
{
	opb.common.util.checkClientsIsSupportedOpenbanking_fnc();
};

/**
 * AJAX로 HTML 수신 후에 디자인 요소 수정 필요에 의한 콜백 호출
 * @author 퍼블리셔
 * @see design.js
 */
var designInit = function() {
	/* 테이블의 최좌측/최우측 세로 라인을 없애준다.  */
	$j.each($j("table tr"), function(){
		$j(this).children().eq(0).css({
			"border-left": "none",
			"border-right": "1px solid #dadcdb"
		});
		$j(this).children().eq(-1).css({
			"border-right": "none"
		});
	});
	
	/* 탭메뉴로 이동 시 마우스 오버/리브에 대한 이벤트(on/off 디자인)를 적용한다.  */
	$j(".tabs li").mouseover(function(){
		$j(this).addClass("on");
		return false;
	});
	$j(".tabs li").mouseleave(function(){
		$j(this).removeClass("on");
		return false;
	});
};

/**
 * @20140307
 * 전자금융사기예방서비스를 위한 PC 정보를 수집하여, 서버로 전달하기 위한 폼에 저장한다.
 *  PC 정보 수집 모듈 : Ipinside(인터리젠), XecureWeb(소프트포럼)
 * 
 * @param {String} formName PC정보를 전송할 폼명
 * @param {Object} callback 업무별 후처리 할 콜백함수
 */
opb.common.util.gatheringClientPcInfo = function(formName, callback)
{
	/* 멤버변수 선언 */
	var IPINSIDE_PARAM_NAME = 'pcInfoByIpinside';
	var SOFO_PARAM_NAME = 'pcInfoByXecureWeb';
	try
	{
		var _isSuccess = true;
		var _errmsg = '';
		
		/* 전처리 */
		if(opb.common.util.isEmpty_fnc(formName) || (typeof document.forms[formName]) != 'object') {
			//alert('PC정보를 전송할 폼이 없습니다. formName=' + formName);
			_isSuccess = false;
			_errmsg = 'PC정보를 전송할 폼이 없습니다. formName=' + formName;
			
		}else {
		
			/* 인터리젠 모듈 PC정보 추출 - start */
			var _ipinsideResult = 'SUCCESS';
			
//				var _ipinsideDATA = PCDesignate();
			
			var _ipinsideDATA = I3GPCDesignateValue;
			
			if (opb.common.util.isEmpty_fnc(_ipinsideDATA)) {
				_ipinsideResult = 'NODATA';
			}
			
			if(_ipinsideResult == 'SUCCESS') {
				form.createHiddenField(document.forms[formName], IPINSIDE_PARAM_NAME, _ipinsideDATA);
				
				form.createHiddenField(document.forms[formName], "ipinsideCOMM", _ipinsideDATA);
				form.createHiddenField(document.forms[formName], "ipinsideNAT", I3GPCDesignateNatValue);
				form.createHiddenField(document.forms[formName], "ipinsideData", I3GPCDesignateWdataValue);
				
			}else if(_ipinsideResult == 'NODATA') {
				//alert('인터리젠 모듈에서 추출한 PC정보가 없습니다. (NODATA)');
				_errmsg = '\n<br/>인터리젠 모듈에서 추출한 PC정보가 없습니다. (NODATA)';
			}else {
				//alert('ERROR : 인터리젠 모듈에서 PC정보 추출이 실패하였습니다.');
				_errmsg = '\n<br/>ERROR : 인터리젠 모듈에서 PC정보 추출이 실패하였습니다.';
			}
			/* 인터리젠 모듈 PC정보 추출 - end */
			
			/* 소프트포럼 API를 사용하여 PC정보 추출 - start 20150819 윤상준*/
//			if((typeof XecureWeb.Wif) == 'function') {
//				var _xecurewebResult = 'SUCCESS';
//				var _xecurewebDATAs = XecureWeb.Wif(7+256, xecureSvrcert);
//				
//				if(opb.common.util.isEmpty_fnc(_xecurewebDATAs)) {
//					_xecurewebResult = 'NODATA';
//				}
//				
//				if(_xecurewebResult == 'SUCCESS') {
//					form.createHiddenField(document.forms[formName], SOFO_PARAM_NAME, _xecurewebDATAs);
//				}else if(_xecurewebResult == 'NODATA') {
//					//alert('소프트포럼 모듈에서 추출한 PC정보가 없습니다. (NODATA)');
//					_errmsg = '\n<br/>소프트포럼 모듈에서 추출한 PC정보가 없습니다. (NODATA)';
//				}else {
//					//alert('소프트포럼 모듈에서 PC정보 추출이 실패하였습니다.');
//					_errmsg = '\n<br/>소프트포럼 모듈에서 PC정보 추출이 실패하였습니다.';
//				}
//			}else {
//				//alert('소프트포럼 모듈을 찾을 수 없습니다. 화면을 새로고침한 후 사용하여 주십시오.');
//				_errmsg = '\n<br/>소프트포럼 모듈을 찾을 수 없습니다. 화면을 새로고침한 후 사용하여 주십시오.';
//			}
		}
		/* 소프트포럼 API를 사용하여 PC정보 추출 - end */

		if((typeof callback) == 'function') {
			callback(_isSuccess, _errmsg);
		}
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.gatheringClientPcInfo]');
	}
	
	if ((typeof callback) == 'function') {
		callback(true);
	}

};

/**
 * PC 지정 서비스에 가입한다.
 */
opb.common.util.joinPCService_fnc = function(popup_id, click_obj) {
	
	var hanaAjax = new hana.JHanaAjax('', true, true);
	hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT 
			+ '/common/popup/goDeviceRserved.do'
			, null
			, true
			, function(res, arg) {
   				var resData = eval('(' + res.responseText + ')');
				if(resData.returnResult == "Y") {
					opb.common.layerpopup.closeLayer_fnc(popup_id);
					opb.common.layerpopup.openMessage_fnc( {
						'isConfirm' : false,
						'title' : '성공',
						'message' : 'PC지정 서비스에 가입되었습니다. <BR/><BR/>사용하실 PC를 등록하시려면 아래 PC등록버튼을 <BR/>선택해 주시기 바랍니다.&nbsp;&nbsp;'
				        	+ '<span class="f_btn"><a href="#//HanaBank" onclick="opb.common.util.goMenu_fnc(\'/myhana/banking/wpcus402_26t.do\');">PC등록하기</a></span>'
				        	+ '<BR/><BR/>당행에 등록된 공인인증서가 없으신 경우에는 <BR/>공인인증서 발급/등록 후 사용하실 PC를 <BR/>지정하여 주시기 바랍니다.&nbsp;&nbsp;'
				        	+ '<span class="f_btn"><a href="#//HanaBank" onclick="opb.common.util.goMenu_fnc(\'/certify/certify/wpcer462_01t.do\');">공인인증서 발급하기</a></span>',
						'clickObj' : click_obj
					});
				}
				
			} //[end] callback
			, 'EUC-KR');

};

/**
 * 이상징후감지에 의한 이체제한 해지 페이지로 이동한다.
 */

opb.common.util.rejectTransferFDSCancel01 = function() {

	var hanaAjax = new hana.JHanaAjax('HANA_CONTENTS_DIV', true, true);
	hanaAjax.ajaxCommSubmit(pbk.APPLICATION_CONTEXT_ROOT+'/myhana/prevent/wpcus402_100t.do', null );

};

/**
 * 쿠키저장후 창닫기
 */

opb.common.util.closeCheckUserInfomationPopup = function(popNm, chk) {

   	if(chk){
   		var notOpenDay = document.getElementById('notOpenDay');
        	var todayDate = new Date();
    		todayDate.setDate(todayDate.getDate() + Number(notOpenDay.value));
    		document.cookie = popNm + "=" + escape("ok") + "; path=/; expires=" + todayDate.toGMTString() + ";";
   	}
		
   	opb.common.layerpopup.closeLayer_fnc(popNm);

};


/**
 * 쿠키값가져오기
 */

opb.common.util.getCookie = function(name) {

    var nameOfCookie = name + "=";
    var x = 0;
    while(x <= document.cookie.length)
    {
            var y = (x + nameOfCookie.length);
            if(document.cookie.substring(x,y) == nameOfCookie)
            {
                    if((endOfCookie = document.cookie.indexOf(";",y)) == -1)
                            endOfCookie = document.cookie.length;
                    return unescape(document.cookie.substring(y,endOfCookie));
            }
            x = document.cookie.indexOf(" ",x) + 1;
            if(x == 0)
                    break;
    }
    return "";

};

/**
 * 다국어 페이지.
 */
var COOKIE_MULTI_LANGUAGE_CODE_KEY = "_COOKIE_MULTI_LANGUAGE_CODE_KEY_";
opb.common.util.loadMultiLanguage = function(mlCode) {
	
    if(mlCode == null || mlCode == 'undefined' || mlCode == "") {
    	return;
    }
    mlCode = mlCode.toUpperCase();    	
	
    var cookieCode = opb.common.util.getCookie(COOKIE_MULTI_LANGUAGE_CODE_KEY);
    if(cookieCode == null || cookieCode == 'undefined' || cookieCode == ""){
    	
    } else {
        cookieCode = cookieCode.toUpperCase();    	
    }
    
    //alert(mlCode +":"+ cookieCode);
    if(mlCode != cookieCode){
    	opb.common.util.setCookieMultiLanguageCode(mlCode);
    	//세션 저장후 리프래쉬 한다.
    	opb.common.util.setSessionMultiLanguageCode(mlCode, cookieCode);
    }
    
};

opb.common.util.setCookieMultiLanguageCode = function(cookieCode) {

	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + 365);
	document.cookie = COOKIE_MULTI_LANGUAGE_CODE_KEY + "=" + cookieCode + "; path=/; expires=" + todayDate.toGMTString() + ";";

};

opb.common.util.setSessionMultiLanguageCode = function(newLangCode, cookiCode) {

	var hanaAjax = new hana.JHanaAjax('', true, true);
	var oSendForm = form.createForm([{id:'newLangCode', value:newLangCode}]);
	
	hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT 
			+ '/common/setSessionMulitLanguageCode.do'
			, oSendForm
			, true
			, function(res, arg) {
   				var resData = eval('(' + res.responseText + ')');
				if(resData.returnResult == "Y") {
					opb.common.util.setCookieMultiLanguageCode(newLangCode);
					
					if(newLangCode == 'KO' && cookiCode == '') {
						return;
					}
					
					window.location.href = window.location.href;
					//window.location.reload();
				}
				
			} //[end] callback
			, 'EUC-KR');

};

/**
 * 장차법 대응 table summary 자동 생성
 */
opb.common.util.setTableSummary = function(divId) {

//	console.log('setTableSummary');
	var _divId = divId;
	if(_divId == null || _divId == undefined || (typeof _divId) == 'undefined' || _divId == '') {
		_divId = opb.base.CONTENTS_DIV; 
	}
	
	var $div = $j("#"+_divId);
	if($div == null || $div == undefined || (typeof $div) == 'undefined') {
		return;
	}
	$div.find("table").has("caption").each(function() {

		var $table = $j(this);
		var rslt = "";
		
		//웹접근성관련 수정(id에  'noMakeSummary' 가 포함된 테이블의 경우 summary 조립하지 않음)
		var tableId = $table.attr("id");
		if(tableId == null || tableId == undefined) {
			tableId = "";
		}
		if(tableId.indexOf("noMakeSummary") < 0){
		
			$table.find("th").each(function(index) {
				
				var txt = $j(this).text();
				var tmpTxt = "";
				$j(this).contents().each(function(idx) {
					
					if(idx == 0) {
						tmpTxt = $j(this).text();
					} else if(idx == 1) {
						if($j(this).text().trim() == "*") {
							txt = tmpTxt;
						}
					}
				});
				
				rslt += txt + (((index+1) < $table.find("th").length) ? "," : "");
			});
			rslt += "(으)로 이루어진 " + $table.find("caption").text() + " 테이블입니다.";
			$table.attr("summary", rslt);
			//		alert(rslt);
		}

	});
	
	
	/*
		기능 : 웹접근성 정보성 테이블에 대한 id, headers 속성 추가 스크립트
		한 화면에 테이블이 여러개 존재할 경우 고려.
		table tbody안쪽 한개의 tr에 <th><td> 1:1 조합인 경우에 id, headers 추가.
	*/
	$div.find("table tbody").each(function(index){
		
		var $tbl = $j(this);
		$tbl.find("tr").each(function(i){
			var $th = $j("th", $j(this))
				,$td = $j("td", $j(this))
				,th_cnt = $th.length
				,td_cnt = $td.length;
			
			// scope가 없는 th가 있을 경우도 있기 때문에 한개의 tr에 th가 2개 이상이고 th와 td 갯수가 같은 경우에만 동작.
			// th에는 scope나 id 두 속성 중 한개만 존재하면 되기 때문에 scope 속성은 모두 제외시킴
			if(th_cnt >= 2 && th_cnt === td_cnt){
				$th.each(function(j){
					var th_id = $j(this).attr("id") || '';
					if(th_id == ""){
						// 현재 th에 id가 존재하지 않을 경우에는 td에 headers 속성값 신규 생성
						$j(this).attr("id","acc_"+index+"_"+i+j).removeAttr("scope");
						$j(this).next("td").attr("headers","acc_"+index+"_"+i+j);
					}else{
						// 현재 th에 id가 존재하는 경우에는 td에 headers 속성 id값을 유지
						$j(this).next("td").attr("headers",th_id).removeAttr("scope");
					}
				});
			}
		});
	});
	
};
//opb.common.util.setTableSummary();	

/**
 * 장차법 대응 tab summary 자동 생성
 */
opb.common.util.setTabSummary = function() {

	var _divId = null;
	if(_divId == null || _divId == undefined || (typeof _divId) == 'undefined' || _divId == '') {
		_divId = opb.base.CONTENTS_DIV; 
	}
	
	var $tabDiv = $j("#"+_divId);
	$j('[class*="pop_ty"]').each(function(idx) {
		
		if(idx == 0) {
			$tabDiv = $j(this);
		}
	});
	
	//var _divId = opb.base.CONTENTS_DIV;
	$tabDiv.find("[class^=tabs]").each(function() {
		
		var $li = $j(this).find("li");
		var rslt = "";
		$li.each(function(index) {
				rslt += $j(this).text().trim() + (((index+1) < $li.length) ? "," : "");

				$j(this).removeAttr("title");
				if($j(this).hasClass("ons")) {
					$j(this).find("a").attr("title", $j(this).text().trim() + " 탭 현재위치");
					//$j(this).attr("title", $j(this).text() + " 탭 현재위치");
				} else {
					$j(this).find("a").removeAttr("title");
				}
		});
		rslt += " 항목모음 입니다.";
		//$j(this).attr("title", rslt);
//		alert(rslt);
	});
	
};
//opb.common.util.setTabSummary();

/**
 * 장차법 대응 팝업 close title 자동 생성
 */
opb.common.util.checkWebAccessibility = function() {

	//console.log('setPopupCloseTitle');
	var isPopup = false;
	$j('[class*="pop_ty"]').each(function(idx) {
		
		var _title = $j(this).find('h4:first-child').text();
//		alert(_title);
		if(_title != null && _title.trim() != '') {
			$j('.pop_close').find('img').attr('alt', _title.trim()+' 팝업 닫기');
			if(idx == 0) {
				isPopup = true;
			}
		}
		
	});

	if(!isPopup && !opb.common.util.isOtherIframe()) {
		var topTitle = top.document.title;
		var pageTitle = $j.trim($j(".pageTitle").text());//$j(".pageTitle").text().trim();
		var headDiv = $j.trim($j(".pageTitle .headDiv").text());
		if(headDiv != undefined && headDiv != "") {
			pageTitle = headDiv;
		}
		$j('[class*="tabs"]').find('li.ons').first().each(function(idx) {
			
			var _tabTitle = $j(this).text().trim();
			top.document.title = _tabTitle + ' < ' + topTitle.substring(topTitle.indexOf(pageTitle));
		});
	}

	// step 이미지 찾기
	$j("p.stepDiv").each(function(index) {
		if($j(this).css("display") == "block" && $j(this).data("init") == undefined){
			var src = $j(this).find("img").attr("src");
			if(src != undefined && src != "") {
				var fileNm = src.substring(src.lastIndexOf("/")).replace(".gif","");
				
				if(fileNm != undefined && fileNm != "") {
					
					try {
						var stepNo = Number(fileNm.substring(fileNm.lastIndexOf("_")+1));
						if(top.document.title.indexOf("단계 < ") > -1) {
							top.document.title = stepNo + top.document.title.substring(top.document.title.indexOf("단계 < "));
						} else {
							top.document.title = stepNo + "단계 < " + top.document.title;
						}
						$j(this).data("init", "true");
						
					} catch(err){
					}
				}
			}
			
			// [팝업은 스크롤 제외되도록 조건 추가, 2018-03-06]
			if(!isPopup) $j('body, html').animate({scrollTop:0}, 200);
		}
	});
	
	if(!opb.common.util.isOtherIframe()) {	
		// CMS 에서 iframe로 호출한경우
		
		opb.common.util.cmsIframeHeightResize();
		
		var $imgs = $j('#HANA_CONTENTS_DIV').find('img');
		if($imgs != null && $imgs != undefined && $imgs.size() > 0) {
			$imgs.each(function() {
				var imgHeight = $j(this).height() | this.naturalHeight;
				
				if(imgHeight == 0) {
					var img = this;
					$j(img).load(function() {
						opb.common.util.cmsIframeHeightResize();
					});
				} 
			});
		}
		
	}
	
};

/**
 * CMS iframe 세로 사이즈 조정
 */
opb.common.util.cmsIframeHeightResize = function() {
	
	var doc = document.getElementById("HANA_CONTENTS_DIV");
	var obj = parent.document.getElementById("bankIframe");
	
	if(doc != null && obj != null) {

		var $contDiv = $j(doc);
		if(doc.offsetHeight == 0 && $contDiv.data('ready') != 'on') {
			$contDiv.attr('data-ready', 'on');
		} else {
			var h = doc.offsetHeight + 20;
			if(h < 800) {
				h = 800;
			}
			obj.height = h + "px";
			
			var $bankIframe = $j(obj);
			if($bankIframe.parent().hasClass('iframeDiv')) {
				$bankIframe.parent().css('height', h);
			}
		}
	}
	
};

/**
 * transKey, TouchEnKey 초기화
 */
var selfModuleCheck = false;
opb.common.util.initEncKey = function(divId) {
    
    /*
     * 비로그인 거래등에서 PC정보 수집모듈을 다시 가져오기 위하여 opb.common.util.checkInterezen();을 호출.
     * 이로인하여 키보드보안  초기화 작업이 중복호출된다.
     * 
     * 모듈의 호출순서를 맞춰주기위하여 checkInterezen()이 호출되는 거래에서는 
     * 타 함수호출(AJAX호출등)을 통한 호출을 막는다. 
     */
    if(selfModuleCheck){
        return false;
    }else{
        opb.common.util.selfInitEncKey(divId);
    }
};

/**
 * opb.common.util.checkInterezen()에서 후속거래등을 통해 호출되는 함수
 * 
 * transKey, TouchEnKey 초기화
 */
opb.common.util.selfInitEncKey = function(divId) {

	var _divId = divId;
	if(_divId == null || _divId == undefined || (typeof _divId) == 'undefined' || _divId == '') {
		_divId = opb.base.CONTENTS_DIV; 
	}

    $j('#'+_divId+' :input[data-enc]').each(function(idx) {

	    var $input = $j(this);
	    var arrEnc = $input.data("enc").split(";");
	    var datatype = "n";
	    var kbdx = 0;
	    var kbdy = 0;
	    var kbdtype = "number";
	    //alert(arrEnc.length);
	    if(arrEnc.length > 0) {                           
		    datatype = arrEnc[0];
		    if(arrEnc.length > 1) {
			    kbdx = parseInt(arrEnc[1]);
		    }
		    if(arrEnc.length > 2) {
			    kbdy = parseInt(arrEnc[2]);
		    }				    
	    }

    	if(datatype == "") {
	    	return;
    	}

	    if(datatype != "n" && datatype != "c") {
		    kbdtype = "qwerty";
	    } 
    	$input.attr("datatype", datatype);
    	$input.attr("enc", "on");

	    var mask = $input.data("encMask");
		if(typeof mask != 'undefined' && mask) {
	    	$input.attr('mask', mask);
	    }

		/*
		 * 가상키보드 초기화
		 * - 보안카드 입력이 있으
		 */
    	if(idx == 0) {
    		
			var isInitTransKey = false;
			$j('.key_block:first').each(function(idx) {
				
				isInitTransKey = true;
				$j('.keycard').each(function(idx) {
					isInitTransKey = false;					
				});
			});
	
    		//console.log('initTransKey='+isInitTransKey);
	    	if(!isInitTransKey) {
		    	//alert('initTransKey');
	    		//console.log('initTransKey');
	    		/* 가상키보드 사용 적용한다.  */ 
	    		initTransKey();
	    		
	    		/* 
	    		 * CMS iframe 일때 왜 reScan을 한번 더하는지 이유는 모르겠으나, 키보드보안이 선택설치로 변경된 이후
	    		 * 키보드보안, 가상키패드 동작시 에러가 발생하여 삭제한다. 2018.06.04_양균수 
   				if(navigator.platform.match('Win') == 'Win') {
   					var obj = parent.document.getElementById("bankIframe");
   					if(obj != null) {
   						TK_Rescan();
   					}
   				}
   				*/
	    		
	    		isInitTransKey = true;
	    	}
    	}
    	
    	//console.log($input.attr("id")+":"+datatype+":"+kbdtype+":"+kbdx+":"+kbdy);
    	addTransKey(this, 'on', kbdtype, kbdx, kbdy);
    	
    	selfModuleCheck = false;
    	
    });
	
};
//opb.common.util.initEncKey();
/**
 * PC정보수집모듈(인터리젠)에서 수집율 문제로
 * 키보드보안모듈을 PC정보수집모듈 실행 후 실행할수 있도록 요청. 
 * 하여 로그인페이지에서는 따로 함수실행함.
 */
$j(document).ready(function(){
	hana.JHanaNiceForms.init();	
	opb.common.util.setTableSummary();	
	opb.common.util.setTabSummary();
	opb.common.util.checkWebAccessibility();
	
	
	if($j('#certLogin').length < 1){
		opb.common.util.initEncKey();
	}else if($j('#iataLogin').length){
		opb.common.util.initEncKey();
	}
	
});

/**
 * 인터리젠 모듈 수집 여부 점검
 */
opb.common.util.checkInterezen = function() {
	var object = {
			
		    before:function(){
		        // 로딩화면 표시
		        opb.common.layerpopup.openLoading_fnc();
		    },
		    after:function(data){
		        if(data != null){
		            // data.U 설정
		        	I3GPCDesignateValue = data.U;
		        	I3GPCDesignateNatValue = data.ndata;
		        	I3GPCDesignateWdataValue = data.wdata;
		        	
		            // 로딩화면 제거
	            	opb.common.util.runAOS();		     
		            opb.common.layerpopup.closeLoading_fnc();
		        }
		        
//		        if((typeof PCDesignate) != 'function' || opb.common.util.isEmpty_fnc(PCDesignate())) {
		        if(I3GPCDesignateValue == null || I3GPCDesignateValue == undefined || I3GPCDesignateValue == ""){
		        	opb.common.layerpopup.closeLoading_fnc();
		        	
	    			var _msg = [];
	    			_msg.push('전자금융사기예방서비스를 위한 정보수집을 실패하였습니다.');
	    			_msg.push('안전한 거래를 위해 새로고침을 하거나 브라우저의 캐쉬를 삭제 조치 후 로그인 재시도를 하여 주시기 바랍니다.');
	    			_msg.push('(조치 후에도 계속 메시지가 나오면 고객센터에 문의 바랍니다)');
	    			_msg.push('');
	    			_msg.push('로그인거래를 계속 하시겠습니까?');
	    			opb.common.layerpopup.openMessage_fnc( {
	    				'isConfirm' : true,
	    				'title' : '알림',
	    				'message' : _msg.join('<br/>'),
	    				'callback' : function(confirm) {
	    					if(!confirm) {
	    						// TODO 이용안내 페이지로 이동, 이용안내페이지 제작 후 주소변경 필요
	    						//opb.common.util.goMenu_fnc('/common/installSecurityModule.jsp?P_name=UriI3GM')
	    						location.href = '/common/installSecurityModule.jsp?P_name=UriI3GM&url=' + encodeURIComponent(window.location.href);
	    					}else{
	    						opb.common.util.runAOS();
	    					}
	    				},
	    				'clickObj' : null
	    			});
	    		}

		    },
		    
		    // 설치체크 콜백
		    installCheckCallback:function(installCheckResult){
		        if(installCheckResult == IPinsideInstallCheckResultType.NotInstalled){
		            // 미설치시 처리
		            //alert("Not installed");
		            opb.common.layerpopup.closeLoading_fnc();
		            
		            var _msg = [];
	    			_msg.push('전자금융사기예방서비스를 위한 모듈이 설치되지 않았거나');
	    			_msg.push('정상적으로 실행되지 않았습니다.');
	    			_msg.push('');
	    			_msg.push('설치화면으로 이동 합니다.');
	    			_msg.push('(조치 후에도 계속 메시지가 나오면 고객센터에 문의 바랍니다.)');
	    			_msg.push('');
		            opb.common.layerpopup.openMessage_fnc( { 
	    				'isConfirm' : false,
	    				'title' : '알림',
	    				'message' : _msg.join('<br/>'),
	    				'callback' : function(confirm) {
	    					
	    					location.href = '/common/installSecurityModule.jsp?P_name=UriI3GM&url=' + encodeURIComponent(window.location.href);
	    				},
	    				'clickObj' : null
	    			});
		            
		            return false;
		        } else if(installCheckResult == IPinsideInstallCheckResultType.UpdateRequired){
		            // 업데이트 필요시 처리
		            //alert("Update Required");
		            // return true 인 경우 cfg에 설정된 설치페이지로 이동
		            // return false 인 경우 cfg에 설정된 설치페이지로 이동 안함. 필요한 경우 따로 Redirection 해야함
		            opb.common.layerpopup.closeLoading_fnc();
		            
		            var _msg = [];
	    			_msg.push('전자금융사기예방서비스를 위한 모듈 업데이트가 확인 되었습니다.');
	    			_msg.push('설치화면으로 이동 합니다.');
	    			_msg.push('(조치 후에도 계속 메시지가 나오면 고객센터에 문의 바랍니다)');
	    			_msg.push('');
//	    			_msg.push('로그인거래를 계속 하시겠습니까?');
		            opb.common.layerpopup.openMessage_fnc( {
	    				'isConfirm' : false,
	    				'title' : '알림',
	    				'message' : _msg.join('<br/>'),
	    				'callback' : function(confirm) {
	    					location.href = '/common/installSecurityModule.jsp?P_name=UriI3GM&url=' + encodeURIComponent(window.location.href);
	    				},
	    				'clickObj' : null
	    			});
		            
		            return false;
		        } else if(installCheckResult == IPinsideInstallCheckResultType.LatestInstalled){
		            // 설치된 경우 처리
//		            alert("Latest version Installed.");
		            // return true 인 경우 수집 후 after 구문 수행
		            // return false 인 경우 수집 하지 않고 멈춤
		            return true;
		        }
		    }
		};
	
	IPinside5.launchAgent(object);
	//opb.common.util.runAOS();

};

/**
 * AOS -> SCWSSP로 대체. aos구동안함.
 * PC정보 수집 모듈 실행 후 타모듈 실행한다.(보안부 요청)
 */

opb.common.util.runAOS = function() {
	
	//로그인의 경우만 구동한다._인증서로그인(certLogin)이 설정되어있는 화면에서만 실행.
	if ($j('#certLogin').length) {
		
		/* 공인인증서 선택 설치로 설치체크 */
		/* 공인인증서 선택 설치로 변경 */
		//Delfino.isInstall(false, opb.common.util.result_isInstall);
		opb.common.util.installEncKey();
		
// 2016.12.07 공인인증모듈 설치와 키보드보안 모듈 설치 순서 조정
//
//		/* 키보드보안, 가상키보드 체크 */ 
//		opb.common.util.selfInitEncKey();
//		
//		/* 방화벽 설치체크 */
//		SCWSCon_Install_forHana();
//		
//		//공인인증서 바로 뛰우기 설정.
//		pbk.common.cert.certInit();
     	
	}else if($j('#iataLogin').length){
		/* 키보드보안, 가상키보드 체크 */ 
		opb.common.util.selfInitEncKey();
		
		/* 방화벽 설치체크 */
		SCWSCon_Install_forHana();
	
	}else if(selfModuleCheck){
	  /* 키보드보안, 가상키보드 체크 */ 
      opb.common.util.selfInitEncKey();
	    
	}
};

/**
 * 키보드보안 모듈 설치 및 방화벽 설치
 * delfino 공인인증모듈 설치 완료 후 진행 - 2016.12.07
*/
opb.common.util.installEncKey = function() {
	/* 키보드보안, 가상키보드 체크 */ 
	opb.common.util.selfInitEncKey();
	
	/* 방화벽 설치체크 */
	SCWSCon_Install_forHana();
	
	//공인인증서 바로 뛰우기 설정.
	pbk.common.cert.certInit();
};

/* 공인인증 설치체크 콜백함수 */
opb.common.util.result_isInstall = function(result) {
    if(!result){
    	// alert("공인인증 모듈이 설치되지 않았습니다. \n설치페이지로 이동합니다.");
    	location.href = window.location.protocol + "//" + window.location.host + "/common/installSecurityModule.jsp?P_name=DelfinoG3&url=" + encodeURIComponent(window.location.href);
    } else {
    	/* 2016.12.07 키보드보안, 방화벽 설치 체크 호출 */
    	opb.common.util.installEncKey();
    }
    // result ? ret+='정상설치됨' : ret+='미설치';
};

/**
 * DIV 태그안에 있는 내용(innerText)을 input hidden 의 value에 넣는다(복사한다).
 */
opb.common.util.copyDivInnerTextToHiddenValue = function(oDiv, oHidden){

	if (oDiv != null && oDiv != undefined) {
	
		if (oHidden != null && oHidden != undefined) {
			var _tmp = $j(oDiv).text();
			oHidden.value = _tmp;
		}
		
	}
};

/**
 * DIV 태그안에 있는 내용(innerHTML)을 input hidden 의 value에 넣는다(복사한다).
 */
opb.common.util.copyDivInnerHTMLToHiddenValue = function(oDiv, oHidden) {
	
	if (oDiv != null && oDiv != undefined) {
		
		if (oHidden != null && oHidden != undefined) {
//			var _tmp = oDiv.innerHTML;
			var _tmp = $j(oDiv).html();
			oHidden.value = _tmp;
		}
		
	}
};

var menuNaviList;
/**
 * DIV 태그안에 있는 내용(innerHTML)을 input hidden 의 value에 넣는다(복사한다).
 */
opb.common.util.openNaviSubMenu = function(clickObj, listId) {
	
	try {
		var item_array = new Array();
		var menuList = menuNaviList["menuList"+listId];
		
		var len = menuList.length;
		for(var i=0; i < len; i++) {
			if (opb.common.util.isEmpty_fnc(menuList[i].urlAdr) && opb.common.util.isEmpty_fnc(menuList[i].menuPageFnctNm)) {
				item_array[item_array.length] = [menuList[i].menuNm, null, true, null, null];
			} else {
	 			if("01" == menuList[i].menuClckTypCd) {//주소창링크
					item_array[item_array.length] = [menuList[i].menuNm, null, true, null, menuList[i].menuPageFnctNm + "('" + menuList[i].urlAdr + "')"];
	     		}else if("03" == menuList[i].menuClckTypCd){//팝업오픈
	     			
	     		}else if("04" == menuList[i].menuClckTypCd){//레이어팝업오픈
	     			
	     		}else if("05" == menuList[i].menuClckTypCd){//윈도우팝업
					item_array[item_array.length] = [menuList[i].menuNm, null, true, null, "window.open('" + menuList[i].urlAdr + "'," + menuList[i].menuPageFnctNm + ")"];
	     		}else if("06" == menuList[i].menuClckTypCd){//alert창
	     			
	     		}else if("07" == menuList[i].menuClckTypCd){//함수호출
					item_array[item_array.length] = [menuList[i].menuNm, null, true, null, menuList[i].menuPageFnctNm];
	     		}else{

					item_array[item_array.length] = [menuList[i].menuNm, null, true, null, "pbk.web.util.goMenu('" + menuList[i].urlAdr + "')"];
	     		}
			}
		}
		
		opb.common.layerpopup.openSubLayerFunction_fnc(clickObj, 'naviSubMenu', item_array, 'right', 'HANA_MASK_WRAP_DIV');

	} catch(e) {};
};

opb.common.util.createNaviSubMenu = function(obj, listId) {
	
	try {
		var menuList = menuNaviList["menuList"+listId];
		
		var len = menuList.length;
		var _html = new Array();

		var _lnbMenuId = '';
		for(var i=0; i < len; i++) {
			
 			var _itemtext = menuList[i].menuNm;
 			
			if(menuList[i].level != 4 && _itemtext.substring(_itemtext.length-1) == '+') {
				_itemtext = _itemtext.substring(0, _itemtext.length-1);
			}
			
 			if(_itemtext == obj.parent().text() || _itemtext == (obj.parent().text()+"+")) {
 				_itemtext = "<strong>" + _itemtext + "</strong>";
 				if(menuList[i].level == "2" && menuList[i].menuId != null ) {
 					_lnbMenuId = menuList[i].menuId;
 				}
 			}

			var _href = null;
			var _funcname = null;

			if (opb.common.util.isEmpty_fnc(menuList[i].urlAdr) && opb.common.util.isEmpty_fnc(menuList[i].menuPageFnctNm)) {
			} else {
	 			if("01" == menuList[i].menuClckTypCd) {//주소창링크
					_funcname = menuList[i].menuPageFnctNm + "('" + menuList[i].urlAdr + "')";
	     		}else if("03" == menuList[i].menuClckTypCd){//팝업오픈
	     			
	     		}else if("04" == menuList[i].menuClckTypCd){//레이어팝업오픈
	     			
	     		}else if("05" == menuList[i].menuClckTypCd){//윈도우팝업
					_funcname = "window.open('" + menuList[i].urlAdr + "'," + menuList[i].menuPageFnctNm + ")";
	     		}else if("06" == menuList[i].menuClckTypCd){//alert창
	     			
	     		}else if("07" == menuList[i].menuClckTypCd){//함수호출
					_funcname = menuList[i].menuPageFnctNm;
	     		}else{

					_funcname = "pbk.web.util.goMenu('" + menuList[i].urlAdr + "')";
	     		}
	 			
				var _onclick = "";
				if (!opb.common.util.isEmpty_fnc(_href))
				{
					/* 온클릭 이벤트 내용을 만든다.  */
					if (!opb.common.util.isEmpty_fnc(_funcname)) {
						_onclick += _funcname + '(\'' + _href + '\', true);';
					} else {
						_onclick += 'opb.common.util.goPage_fnc(\'' + _href + '\', true);';
					}
					_html[_html.length] = '			<li><a href="#//HanaBank" onclick="' + _onclick + '">' + _itemtext + '</a></li>';
				} else {
					if (!opb.common.util.isEmpty_fnc(_funcname)) {
						_onclick += _funcname.replace(/\"/g, "'");
						_html[_html.length] = '			<li><a href="#//HanaBank" onclick="' + _onclick + '">' + _itemtext + '</a></li>';
					} else {
						_html[_html.length] = '			<li>' + _itemtext + '</li>';
					};
				};
	 			
			}
			
		}

		// level=2 이고 menuId 가 있으면 lnb 변경
		if(_lnbMenuId != null && _lnbMenuId != '') {
			
			var $lnbMenu = $j('#HANA_WRAP_DIV.banking #HANA_HEAD_DIV h2.' + _lnbMenuId);
			//var $lnbMenu = $j('#HANA_WRAP_DIV.banking #HANA_HEAD_DIV #lnb');
			if($lnbMenu.parent().is(':hidden')) {
				$lnbMenu.parent().siblings().hide();
				$lnbMenu.parent().show();

				//$j('#myBankingMenu').insertAfter($lnbMenu);
				$j('#lnbLoginInfo').insertAfter($lnbMenu);
				//$j('#searchDiv').insertBefore($lnbMenu.parent().find("#lnb"));
				$j('.menu dd').removeClass('on');
				
				if(!$lnbMenu.parent().hasClass('moreMenu')) {
					$lnbMenu.parent().addClass('on');
				//} else {
					var spClass = 'sp' + _lnbMenuId.substring(0, 1).toUpperCase() + _lnbMenuId.substring(1);
					
					$j('#gnb .menu dd').removeClass('on');
					var $spMenu = $j('#gnb a span.' + spClass);
					$spMenu.parent().parent().addClass('on');
				}
				
			}
			
		}
		
		obj.append(_html.join(''));

	} catch(e) {};
};

opb.common.util.initGnbBankMenu = function(initDiv) {
	
	var menuNm = jQuery('div.locateNew strong.last').text();
	var depth = jQuery('div.locateNew strong.last').attr('data-menuIdx');
	
	if((typeof initDiv) == 'undefined') {
		initDiv = 'gnbBankMenuDiv';
	}
	
	if(initDiv == 'gnbBankMenuDiv') {
		
		if(jQuery('#lnbBanking').css('display') != 'none') {
			depth -= 1;
			if(menuNm.trim() == '') {
				menuNm = '계좌조회';
				depth = 2;
			}
		} else {
			menuNm = '계좌조회';
			depth = 2;
		}
	}

	jQuery('#' + initDiv + ' .depth1 > li').removeClass('on');
	jQuery('#' + initDiv + ' .depth2 > li').removeClass('on');
	jQuery('#' + initDiv + ' .depth3 > li').removeClass('on');
	
	jQuery('#' + initDiv + ' .depth'+depth+' > li').each(function(){

		var $selfMenu = jQuery(this).children('a');
		if($selfMenu.text() == menuNm) {
			
			//jQuery('div.locateNew .locateList li').removeClass('on');
			//jQuery(this).children('a').parent('li').addClass('on');
			$selfMenu = $selfMenu.parent('li');
			$selfMenu.addClass('on');
			for(var i = 1; i < depth; i++) {
				$selfMenu = $selfMenu.parent().parent();
				$selfMenu.addClass('on');
			}
			return false;
		}
	});
	
};

//TODO 다국어뱅킹 전용
//개인뱅킹에서 다국어뱅킹으로 이동할 때 사용 한다.
//loadMultiLanguage에서 파생
opb.common.util.loadMultiLanguageForEasyone = function(mlCode) {

	var linkUrl = "/easyone_index.html";
	opb.common.layerpopup.openLoading_fnc();

	opb.common.util.setCookieMultiLanguageCode(mlCode);
	if(opb.common.util.isEmpty_fnc(top.hanaSecureframe))
	{
		opb.common.util.goMenu_fnc(linkUrl);
	}
	else
	{
		top.location.href = linkUrl;
	}

	
	
	//opb.common.util.goLogoutLinkPage_fnc('/easyone_index.html', '하나은행 다국어뱅킹 메인');

};

/**
 * CMS에서 iframe내 페이지 이동 함수 (location 을 이동한다.)
 * 
 * @param {String} url 서버 URL
 * @param {Object} data 히든필드에 저장할 데이터 [{key: value}]
 * @param {String} contentUrl index 페이지로 이동할 경우 content 영역에 표시할 url
 */
opb.common.util.goCmsMenu_fnc = function(url, data)
{
	try
	{

		var contentUrl = '';
		
		// 현재 GNB ID와 요청 루트 패스가 같으면 Ajax 호출S
		if(url.indexOf('/index.do') == -1) {
			
			// 확장자 .do 이면 index.do로..
			var ext = url.slice(url.indexOf(".")+1);
			if(ext.indexOf("?") > -1) {
				ext = ext.substring(0, ext.indexOf("?"));
			}
			if(ext == "do") {
				contentUrl = url;

				var arrPath = url.split('/');
				if(arrPath.length > 3) {
					contentUrl = url;
					url = '/'+arrPath[1]+'/'+arrPath[2]+'/index.do';
				}
			}

			
		}

		if(url == contentUrl) {
			contentUrl = null;
		}

	    opb.common.layerpopup.openLoading_fnc();
		$j(window).unload(function() {
			try
			{
				opb.common.layerpopup.closeLoading_fnc();
			}
			catch(e){}
		});

	    if(opb.common.util.isEmpty_fnc(data) && opb.common.util.isEmpty_fnc(contentUrl))
	    {
			location.href = url;
	    }
	    else
	    {
	        hana.JHanaUtils.form.createFormSubmit(data, url);
	    }
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.common.util.goMenu_fnc]');
	}
};

/**
 * css link 동적 로드
 * - divId 가 있으면 화면숨김 후 로딩완료시 화면표시
 * @since 20160525
 * @param cssUrl
 * @return
 */
opb.common.util.loadCSS_fnc = function(cssUrl, divId) {

	var $obj = null;
    if ($j("#" + divId).length > 0) {
    	$obj = $j("#" + divId);
    }

	if(!$j('link[href="' + cssUrl + '"]'). length) {
		var headId = document.getElementsByTagName('head')[0];
		var cssNode = document.createElement('link');
		cssNode.type = 'text/css';
		cssNode.rel = 'stylesheet';
		cssNode.href = cssUrl;
		headId.appendChild(cssNode);
	}
	
	if($obj != null) {
		$j(document).ready(function(){
			$obj.css('display', 'block');
		});
	}
};

/**
 * 부분배포를 조건 체크하는 함수
 * 1. 날짜, 아이피 비교.
 * 2. 서버당.
 * 
 * @param {type} 유형에 따라 조건 체크 1 or 2
 * 
 */
opb.common.util.checkPartDeploy_fnc = function(type)
{
    if(opbBaseIsRunPartDeploy == null){
        opbBaseIsRunPartDeploy = false;
        
        var _platformInfo = opb.common.util.getPlatformInfo();
        
        if(_platformInfo.Windows)   /* Windows경우만 체크한다.  */
        {
            if("1" == type){
                var toDay = date.getToday();
                toDay = toDay.substring(toDay.length-1);
                
                if(toDay == opb.base.partDeployCondFirst) opbBaseIsRunPartDeploy = true; 
                else opbBaseIsRunPartDeploy = false; 
                
            }else if("2" == type){
                if("4" == opb.base.partDeployCondSecond )   opbBaseIsRunPartDeploy = true; 
                else opbBaseIsRunPartDeploy = false; 
                
            }
        }else
            opbBaseIsRunPartDeploy = true;
        
    }
};

/**
 * print용도 css 
 * iif. 현재는 고정이나 차후 동적으로 파싱해서 가져올 수 있도록 할것.
 */
opb.common.util.injectionCssForPrint = '<style>body { padding:3em; margin:0; font-size:12px; line-height:1.8; font-family:"돋움",dotum,Helvetica,AppleGothic,sans-serif; } div.notice { border: 1px solid #ccc; background: #f7f7f7; color: #555; width: auto; margin: 0.5em 0; padding: 10px; line-height: 160%; } h1,h2,h3,h4,h5,h6 { margin:0 0 0.5em 0; line-height:1.1; } h3 { margin-top:3em; text-align:center; font-size:18px; letter-spacing:-1px; } .div_h4, h4 { margin-top:3em; font-size:13px; font-weight:bold; } h5,h6 { font-size:12px; font-weight:bold; margin-top:3em; } h6 { margin-top:2em; } caption { display:none; } table,input.select,textarea { font-family:inherit; font-size:inherit; } table { table-layout:fixed; border-collapse:collapse; width:100%; } th { background:#f7f7f7; } th,td { padding:1em; border:1px solid #dadcdb; } td img.estamp { vertical-align:middle; } tbody th {text-align:left;} ul.blt_3 { margin:2em 0 0 0; padding:0; font-size:14px; } ul.blt_3 li { padding:0 0 0 0; list-style-type:none; } p.t_center { text-align:center; font-size:16px; } .t11 { font-size:11px; } p.serial { font-size:11px; margin-top:3em; } div.txt_14_dotum.ta_cen { font-size:14px; text-align:center; margin-bottom:2em; } .t_right { text-align:right } .mgb20 { margin-bottom:2em; } .mt30, .mgt20 { margin-top:3em; } hr { border:0; border-bottom:1px solid #ccc; height:1px; }</style>';

