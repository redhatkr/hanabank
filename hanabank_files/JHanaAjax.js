/*INISEAL:[qIeHm9TiWkuH8PjYWqzC4xqBTMo%3D%0A]*/
/*****************************************************************************
 * 파일명 : JHanaAjax.js
 * 작성일 : 2007. 12. 31
 * 작성자 : ork
 * 설   명 : Ajax통신을 위한 Utility js, prototype.js include 후 사용한다.
 * Dependency  : prototype.js , ext-base.js , ext-all.js
 * 메세지효과를 위하여 ExtJs 아래 정의 되어야 합니다.
 * ===========================================================================
 * 변경이력:
 * DATE				AUTHOR		DESCRIPTION
 * ---------------------------------------------------------------------------
 *              Nam,KiSeung	    HanaBank
 * 2007.12.31	Oh,Ryunkyong 	Revision
 * 2008.06.10   Oh,Ryunkyong    특정영역 Mask를 위해  Ext의 Ext.LoadMask 객체인 targetLoadingMask 변수 추가
 * 2008.09.26   오륜경           타이머 동작 시점 변경
 * 2008.11.26   오륜경           로그아웃되었을 때 로그아웃 플래그 설정 (타이머 동작하지 않도록 설정)
 * 2009.01.09   오륜경           20090109-1 404등의 에러시에 요청 URL과 응답URL을 보여준다.
 * 2009.03.04   오륜경           20090304 로그인 페이지를 리턴했을 경우 left 영역이 있다면 업데이트
 * 2009.03.29   오륜경           20090329 요청시마다 로그아웃 시간을 연장한다.
 * 2009.04.13   오륜경           20090413 transaction 을 설정했다면 마스크를 대기
 * 2009.04.16   오륜경           20090416 팝업에서 ajax 호출시 부모창 시간 리셋.
 * 2009.04.29   오륜경           20090429  404에 대한 처리는 404 페이지로 보내는 대신 msg layer로 띄워준다.
 * 2009.05.05   오륜경           20090505 password 필드 초기화 (특정오류코드가 넘어왔을시에)
 * 2009.05.06   오륜경           20090506 from serialize 공통화
 * 2009.05.07   오륜경           20090507 팝업에서 거래시 부모창 로그아웃 시간 연장
 * 2009.05.09   남기승           20090509 E2E 메시지 수정
 * 2009.05.14   오륜경           20090514 innerHTML 에 응답받은 모든 텍스트를 업데이트 (strip / evelScript 하지않음)
 * 2011.05.25	양균수		 	 IE외에 브라우져에서도 호출가능하도록 호출방식 변경.
 * 								 (ex> objForm.niceClass -> objForm.getAttribute("niceClass") )
 * 2013.01.24	오범석		 	 오류정의 이동. shttp_status_map(namespace, constants)
 * 								 password 필드 초기화할 에러코드 이동. passwordFieldClearHash(namespace, constants
 * 								 전자서명 URL 이동. signUrlHash(namespace, constants  
 * 2015.06.12   남기승           20150612 Ajax 호출시 javascript 동적호출 추가
 * 2015.06.12   남기승           20150622 Ajax 호출시 NiceForm init 추가
 * 2015.10.15   남기승           20151015 전자서명 대상데이터 속성명 HTML5대응(signid => data-signid)
 * 
 * 변경 이력은 이곳에 추가 합니다. 
 *****************************************************************************/

/**
 * Form prototype 추가 재정의
 * @since 20090226 오륜경 
 */
Form.serializeHanaElements = function(elements, getHash, isEscapeTag){
	var data = elements.inject({}, function(result, element){
		var reDash = /-/g;
		var reAcct = /,/g;
		var lTag   = /</g;
		var rTag   = />/g;

		if (!element.disabled && element.name) {
			var key = element.name;
			var value = '';
			try {
				value = $(element).getValue();
			}catch(e) {
				if(element.value) {
					value = element.value;
				}
			} // 특정OS/BW에서 콤보객체의 getValue() 오류발생
			if (value!=null && value !=undefined) {
//				var className = element.niceClass || element.className;
//				var className = element.getAttribute("niceClass") || element.className;
				var className = $j(element).data("niceClass") || element.className;
				if (className != undefined && className != null) {
					if (className.indexOf("bizno") != -1 || className.indexOf("cal") != -1) {
						value = value.replace(reDash, "");
					}
					else
						if (className.indexOf("acct") != -1 || className.indexOf("acctdollar") != -1) {
							value = value.replace(reAcct, "");
						}
				}

				// 20090407 글로벌 validation을 사용하지 않고 manual 속성을 추가했을 경우
				var stripCommas = element.stripCommas;
				if (stripCommas !=undefined && stripCommas !=null) {
					if (stripCommas == "true") {
						value = value.replace(reAcct, "");
					}
				}

				if (isEscapeTag) {
					value = value.replace(lTag, "&lt;");
					value = value.replace(rTag, "&gt;");
				}

				if (key in result) {
					if (result[key].constructor != Array)
						result[key] = [result[key]];
					result[key].push(value.stripScripts());
				}
				else
					result[key] = value.stripScripts();

//                // 20090506 E2E 보안필드 존재하면
//                var e2eFieldName = element.submitName || key;
//                if (e2eFieldName.indexOf('_E2E') != -1){
//                    result['_e2e_'] = true;
//                }
			}
		}
		return result;
	});
	return getHash ? data : Hash.toQueryString(data);
};

/**
 * @since 20090226 오륜경
 */
Form.serializeHanaData = function (form, getHash){
	return Form.serializeHanaElements(Form.getElements(form), getHash);
};

/*************** !@#$lawsn
 * 하기는 pbk-package.js 파일에 있는 전역적인 변수를 옮겨온 것
 * 추후 관련기능 개발 시 naming 및 위치를 바꿔야 한다.
 * 
 * @use /resource/js/JHanaAjax.js
 */
//pbk.ORIGIN_BTN_OBJ = new Array(); //중복 거래 방지버튼 원본 이미지 객체
hana.ORIGIN_BTN_OBJ = new Array(); //중복 거래 방지버튼 원본 이미지 객체

/**
 * @since 20090304 오륜경
 */
//var loginFormURLs = ['requireLogin','requireEngLogin'];
/* 20121212 사용하지 않는 requireEngLogin 제거함  */
var loginFormURLs = ['requireLogin'];

var clearGuid = function(){
	var sf = findHanaSecureFrame();
	// 로그인 GUID 초기화
	if ((typeof sf == "undefined") || (sf == null)) {
		// ignored..
	}
	else {
	    /*
	     * 2018.12.04 기업뱅킹을 통하여 개인뱅킹을 열었을경우 
	     * findHanaSecureFrame() : opner의 sf를 얻는 과정에서 기업뱅킹의 sf를 가져오는 경우 존재 .
	     * 그때 아래 과정에서 "SecurityError"로 인한 DOMException발생. skip처리함. 
	     */ 
	    try{
	        if (sf.loginGuid) {
	            sf.loginGuid = "";
	        }
        } catch(e){
            // ignored..
        }
	}
};

//전자서명 데이터생성
var getSignedData = function(form, eraseObjNames)
{

	if(form == null)
		return "";

	var eObjs = null;

	if(typeof(eraseObjNames)=="string") {
		eObjs = eraseObjNames.split(",");
	} else {
		eObjs = eraseObjNames;
	}

	var strResult = "";
	var $form = $j(form);
	$form.find("input[data-signid], input[name='ebondData']").each(function(idx, el) {
		
		var _signid = $j(el).data("signid");
		var _val = $j(el).val();
		var _id = $j(el).attr("id");
		var _name = $j(el).attr("name");
		var _type = $j(el).attr("type");

		if(_name == null || _name == '' || typeof _name == 'undefined') {
		    return;			
		} else {

			// 기업결재 전자서명일 경우엔 value만 넣는다.
			if(_name == "ebondData") {
			    strResult += _val;
			    return;
			}
			
		}

		if(_signid == null || _signid == '' || typeof _signid == 'undefined') {
			return;
		}

		if(_name=="filedata") return;

		// 20090413 전사암호화 필드 제외 (아래에 제외한 필드에 포함되지만..)
		if(_name=="password") return;
		if(_name=="pw") return;
        if(_name=="acctPw") return;
		if(_name=="paymAcctPw") return;
		if(_name=="wdrwAcctPw") return;
		if(_name=="ognTrscWdrwAcctPw") return;
		if(_name=="updBfPw") return;
		if(_name=="updAfPw") return;
		if(_name=="secPwd1_card") return;
		if(_name=="secPwd2_card") return;

		//////////////////////////
		//add to smgrl 2004/07/16
		if(eObjs!=null){

			for(var j=0; j<eObjs.length; j++){
				if(_name == eObjs[j]){
					return;
				}
			}

		}

		//제외한 컨트롤 지정 (AS-IS 남기승)
		if ( ((_type == "button") || (_type == "reset") || (_type == "submit") || (_type == "password"))) return;
		if ( ((_type == "radio") || (_type == "checkbox")) && (el.checked!=true) ) return;
		if ( _id == "*" ) return;

		if (_type == "select-one") {
			var sel = el.selectedIndex;
			if(sel < 0)
				return;
			else
				_val = el.options[sel].value;
		}

		//add to smgrl 2004/06/29
		if(_type == "select-multiple") {

			for(var j=0;j < el.options.length;j++){
				if(el.options[j].selected==true){
					if(strResult!="") strResult += "&";
					strResult += _name;
					strResult += "=";
					strResult += el.options[j].value;
				}
			}
			return;
		}

		if (strResult!="") strResult += "&";


		// element.id를 키로 서명값저장, element.id가 있을 경우에만 저장
		// 20090413 전자서명 필드key (signid) 이 있을 경우 필드이름을 지정.
		if (_signid && null != _signid && _signid != "") {
			strResult += encodeURIComponent(_signid);
			strResult += "[";
			strResult += _name;
			strResult += "]=";

			// 20091028 전자서명데이터중 약정서는 escape로 치환 
			if(_name.indexOf("signAgreeContents") == 0) {
				_val = escape(_val);
			} else {
				_val = escape(hana.JHanaUtils.form.removeFormatChar(el, _val));
			}
			strResult += _val;
		}

	});
	
	return strResult;
/*	
	//alert("form : " +form.serialize());
	if(form == null)
		return "";
	
	var strResult = "";

	var name = "";
	var value = "";
	var sel=0;
	var eObjs;

	if(typeof(eraseObjNames)=="string")
		eObjs = eraseObjNames.split(",");
	else
		eObjs = eraseObjNames;

	len = form.elements.length;

	var elm_name = "";
	var elm_signid = "";
	var elm_type = "";
	for(var i=0; i<len; i++)
	{
		element = form.elements[i];

		if(opb.common.util.getBrowserInfo().MSIE && parseInt(opb.common.util.getBrowserInfo().version, 10) < 9 ) {
//			elm_name = element.name;
//			elm_signid = element.signid;
//			if(elm_signid == undefined || elm_signid == null) {
//				elm_signid = element.readAttribute("signid");
//			}
//			elm_type = element.type;
			elm_name = element.getAttribute("name");
			elm_signid = element.getAttribute("signid");
			elm_type = element.getAttribute("type");
		} else {
			elm_name = element.readAttribute("name");
			elm_signid = element.readAttribute("signid");
			elm_type = element.readAttribute("type");
		}

		//alert(elm_name+":"+elm_signid+":"+elm_type);
		//제외할 이름 지정 2009.04.20 name 과 signid(20090425)가  지정 안 되어 있는 undefined 인 경우 제외함.
		if(elm_name == null || elm_name == '' || typeof elm_name == 'undefined') {
		    continue;			
		} else {

			// 기업결재 전자서명일 경우엔 value만 넣는다.
			if(elm_name == "ebondData") {
			    strResult += element.value;
			    continue;
			}
			
		}

		if(elm_signid == null || elm_signid == '' || typeof elm_signid == 'undefined') {
			continue;
		}

		if(elm_name=="filedata") continue;

		// 20090413 전사암호화 필드 제외 (아래에 제외한 필드에 포함되지만..)
		if(elm_name=="password") continue;
		if(elm_name=="pw") continue;
        if(elm_name=="acctPw") continue;
		if(elm_name=="paymAcctPw") continue;
		if(elm_name=="wdrwAcctPw") continue;
		if(elm_name=="ognTrscWdrwAcctPw") continue;
		if(elm_name=="updBfPw") continue;
		if(elm_name=="updAfPw") continue;
		if(elm_name=="secPwd1_card") continue;
		if(elm_name=="secPwd2_card") continue;

		//////////////////////////
		//add to smgrl 2004/07/16
		if(eObjs!=null){
			var j, eFlag = false;

			for(j=0; j<eObjs.length; j++){
				if(elm_name == eObjs[j]){
					eFlag = true;
					break;
				}
			}

			if(eFlag==true)
				continue;
		}

		//삭제할 필드로 지정되어있으면 서명 안함 2009.04.20
		//if(element.isEraseObj){
		//	continue;
		//}

		//제외한 컨트롤 지정 (AS-IS 남기승)
		//if (!((form.elements[i].type != "button") && (form.elements[i].type != "reset") && (form.elements[i].type != "submit") && (form.elements[i].type != "password"))) continue;
		// TO-BE 오륜경
		if ( ((form.elements[i].type == "button") || (form.elements[i].type == "reset") || (form.elements[i].type == "submit") || (form.elements[i].type == "password"))) continue;
		if ( ((elm_type == "radio") || (elm_type == "checkbox")) && (element.checked!=true) ) continue;
		if ( element.id == "*" ) continue;

		if (elm_type == "select-one") {
			sel = element.selectedIndex;
			if(sel<0)
				continue;
			else
				value = element.options[sel].value;
		} else{
			value = element.value;
		}

		//add to smgrl 2004/06/29
		if(elm_type == "select-multiple") {
			var j;

			for(j=0;j<element.options.length;j++){
				if(element.options[j].selected==true){
					if(strResult!="") strResult += "&";
					strResult += elm_name;
					strResult += "=";
					strResult += element.options[j].value;
				}
			}
			continue;
		}

		if (strResult!="") strResult += "&";


		// element.id를 키로 서명값저장, element.id가 있을 경우에만 저장
		// 20090413 전자서명 필드key (signid) 이 있을 경우 필드이름을 지정.
		if (elm_signid && null != elm_signid && elm_signid != "") {
			strResult += elm_signid;
			strResult += "[";
			strResult += elm_name;
			strResult += "]=";

			// 20091028 전자서명데이터중 약정서는 escape로 치환
			elValue = $(element).getValue();
			if(elm_name.indexOf("signAgreeContents") == 0) {
				elValue = escape(elValue);
			} else {
				elValue = hana.JHanaUtils.form.removeFormatChar(element);
			}
			strResult += elValue;
		}

	}

	return strResult;
*/
};

/**
 * 20090506 from serialize 공통화
 */
var formObjToQueryString = function(formObj, signData, url){
	var returnStr = '';
	if (null != formObj && typeof formObj == 'object') {
	    
	    //뱅크사인인증서를 사용한다면...
	    if(opb.base.useBankSign){
	        //필요 값을 채우고...
	        pbk.web.util.addBankSignField(formObj);
	        //초기화 하자. 즉, 한번쓰고 비우자.
	        pbk.web.util.initBankSign();
	    }
	    
		if(typeof useTouchEnnxKey != 'undefined' && useTouchEnnxKey) {
			pbk.web.util.makeEncKey(formObj);
		}

		var formSerialized  = Form.serializeHanaData(formObj);
		returnStr = formSerialized;	
					
		if ($('hid_enc_data') != null) {
			hana.JHanaUtils.form.removeHiddenField(formObj, "hid_enc_data");
		}

		/*전자서명관련*/
//		if(signData != "" && opb.base.signUrl_map.keys().include(url)) {
//			returnStr += "&signData="+encodeURIComponent(signData);
//		}
		
	}

	return returnStr;
};


/**
 * 유량제어 공통 스크립트 
 * 
 * 새창을 뛰울 경우 유량제어는 필요치 않으나  JHanaAjax를 사용하는 경우가 많으니 
 * NetFunnel의 undefined 체크 필요.
 * 
 * 유량제어가 필요할 경우 아래 .js를 모두 import하자.
 * pbk/resource/js/opb/opb-base-namespace.js
 * pbk/resource/js/opb/opb-base-constants.js
 * AimToG/NetFunnel/netfunnel.js
 * AimToG/NetFunnel/hanaBankSkin.js
 * 
 */

var hanaNetFunnelComplete = function(reqUrl, resType){
	//유량제어
	if( typeof NetFunnel != "undefined"){
		if(opb.base.netFunnelUrl_map.keys().include(reqUrl)){
			if(resType == 'error'){
				NetFunnel_Complete(); 
			}else if(opb.base.netFunnelUrl_map[reqUrl] != 'pbkLogin' ){
				NetFunnel_Complete(); 
			}
		}
	}
};

var hanaNetFunnelComplete2 = function(reqUrl){
	//유량제어
	if( typeof NetFunnel != "undefined"){
		if(opb.base.netFunnelUrl_map.keys().include(reqUrl)){
				NetFunnel_Complete(); 
		}
	}
};

var hanaNetFunnelStart = function(reqUrl, submitRequestFunction){
	
	if( typeof NetFunnel != "undefined"){
		if(opb.base.netFunnelUrl_map.keys().include(reqUrl)) {
			
			if(opb.base.netFunnelUrl_map[reqUrl] == 'pbkJoinGoods')		NetFunnel.TS_SKIN_ID = 'wpdep479_68t_01';
			else																	NetFunnel.TS_SKIN_ID = 'default';
			
			NetFunnel_Action({action_id:opb.base.netFunnelUrl_map[reqUrl]},function(ev,ret){
															submitRequestFunction();
				        								}
			);
		}else{
			submitRequestFunction();
		}
	}else submitRequestFunction();
};



/**
 * 로그아웃 여부 플래그
 * @author 오륜경 20081126
 */
hana.isLogout = false;
var loadedTime = "";

/**
 * 20090329 보안프레임 존재여부를 판단하여 프레임을 리턴한다.
 * @param {Object} f mainframe 여부
 */
var findHanaSecureFrame = function(f){
	var secureframe = null;
	var startwindow = top;
	var findFrameName = '';


	if (f) {
	  findFrameName = 'hanaMainframe';
	} else {
	  findFrameName = 'hanaSecureframe';
	}


	do{
        try{
            secureframe = startwindow.frames[findFrameName];
            if(secureframe != null){
                return secureframe;
            }
        } catch(e){
            secureframe = null;
        }
        if((secureframe==null || secureframe=='undefined') && startwindow.opener!=null){
            startwindow = startwindow.opener.top;
            continue;
        } else {
            startwindow = null;
        }
    }while(startwindow!=null);
    return secureframe;

};

/**
 * 보안프레임 및 이중로그인 확인
 */
var secureFrameCheck = function(guid){
	
	var _secureFrame = null;

	try
	{
		_secureFrame = findHanaSecureFrame();
	}
	catch(e){}

	var isErr = false;
	var errMsg = null;
	if(_secureFrame == null
		|| typeof(_secureFrame.loginGuid) != 'string')
	{
		errMsg = "하나은행 보안 프레임 또는 시큐어 변수를 찾을 수 없습니다. 이용할 수 없습니다.";
		isError = true;
	}
	else
	{
		if(_secureFrame.loginGuid != guid)
		{
			errMsg = "중복로그인 상태입니다. <br />다른 PC, 웹브라우저 또는 스마트폰에서 로그인 하셨습니다. <br />비정상적인 종료로 인하여 서버세션이 아직 살아있을 수 있습니다. <br />이체거래 후에는 반드시 정상 이체 결과를 확인 후 거래하여 주시기 바랍니다. <br />이용에 불편을 드려 대단히 죄송합니다.";
			isError = true;
		}
	}
	
	if(isErr) {
		
		var _maskDiv = document.getElementById('HANA_MASK_WRAP_DIV');
		if(_maskDiv)
		{
			_maskDiv.style.display = 'none';
		}
		
		opb.common.layerpopup.openMessage_fnc({
			isConfirm: false,
			title: 'ERROR',
			message: errMsg,
			callback: function(e) {
				if (e == true) {
					top.location.href = '/index.html';
				}
			}
		});

	}
	
};

/**
 * 모든 셀렉트 박스를 화면에서 숨기기
 */
var hiddeAllSelectBox = function() {
    for (var i=0; i<document.forms.length; i++) {
        for (var k=0; k<document.forms[i].length; k++) {
            el = document.forms[i].elements[k];
            if (el.type == "select-one" || el.style.visibility == 'visible')
                el.style.visibility = 'hidden';
        }
    }
};

var ajaxUpdateDiv = function(targetDiv, responseText) {
	if(responseText.indexOf('<body>') != -1) {
		if(opb.common.util.isOtherIframe) {
			parent.location.href = '/common/construct.html';
		} else {
			top.location.href = '/common/construct.html';
		}
		return;
	} else {
		try {
			$(targetDiv).update(responseText);
		} catch(e) {
			jQuery('#'+targetDiv).html(responseText);
		}
	}
};


/**
 * 20090507-1
 * 서밋했을 경우 버튼 대체 및 릴리즈
 **/
hana.submiButton = {
    alternateImg : function(objectId,altObjectSrc) {
        if (objectId !=null && altObjectSrc !=null) {
            $(objectId).src = altObjectSrc;
            $(objectId).onclick = function() {
                alert('처리중입니다. 잠시후에 시도하세요.');
                return;
            };
        }
    },
    // 이미지가 '처리중'인경우 원본 이미지로 돌려놓는다.
    releaseAltImg : function(objectId, objectSrc, objectOnclick){
        if (objectId !=null && objectId !=undefined && $(objectId) !=null) {
            if ($(objectId).src != null && $(objectId).src != undefined)
            	$(objectId).src = objectSrc;

			if ($(objectId).onclick != null && $(objectId).onclick != undefined)
            	$(objectId).onclick = objectOnclick;
        }
    },
    // 전역변수를 사용한경우 원본 이미지로 돌리는데 전역변수의 정보를 이용한다.
    releaseAltImg2 : function(){
        if (hana.ORIGIN_BTN_OBJ['id'] !=null && hana.ORIGIN_BTN_OBJ['id'] !=undefined && hana.ORIGIN_BTN_OBJ['id'] != "") {
            hana.submiButton.releaseAltImg(hana.ORIGIN_BTN_OBJ['id'],hana.ORIGIN_BTN_OBJ['src'],hana.ORIGIN_BTN_OBJ['onclick']);
        }
    }
};

 
/**
 * @class JHanaAjax Ajax 통신을 위한 util Class
 * @constructor hana.JHanaAjax
 * @param {String} _divTarget  대상 Div
 * @param {boolean} _isLoading loading 표시 여부
 * @param {boolean} _isWhole 대상 Div만 마스크레이어를 씌울지 여부, true일 경우 전체대상
 * @param {String} _maskTarget 대상 Div
 * @param {String} _objectId
 * TODO 기존에 삭제했었던 특정위치에만 마스트를 씌우고 로딩메세지를 출력하는 기능 구현 필요(마이하나)
 *      로딩메세지 종류는 big(현 flash), small 두가지
 *      프로토타입에서 set메서드 추가하여 로딩메세지 종류 선택할 수 있도록.. (2008.02.29)
 *
 */
hana.JHanaAjax = function(_divTarget, _isLoading, _isWhole, _maskTarget, _objectId){ // 생성자 함수
	/* Member field */
	var targetDiv = _divTarget; // 대상 Div 이름
	var isLoading = true; // loading 메세지를 보여줄 지 여부
	var isWhole = true; // target에 loading 을 표현하는 지 여부
    var focusElementId = null;
	var isSuccess = true;
	var callbackFunc = null;
	var objectId = null;
	var resType = null;

    /** start 20090507-1 ***/
    var objectSrc = null;
    var objectOnclick = null;
    var altObjectSrc = '/resource/images/common/btn_pbk_processing.gif'; // click시 대체 이미지
    var releseObj = {
        objectId : null,
        objectSrc : null,
        objectOnclick : null
    };
    
    var reqUrl = null;

	if (_objectId && _objectId != undefined){
        try {
        	//전역 변수에 처리 버튼의 값을 저장해둔다. (hana.ORIGIN_BTN_OBJ)

    		objectId = _objectId;
            releseObj.objectId = objectId;
            hana.ORIGIN_BTN_OBJ['id'] = objectId;

            if (null!=$(_objectId).src) {
                objectSrc = $(_objectId).src;
                releseObj.objectSrc = objectSrc;
                hana.ORIGIN_BTN_OBJ['src'] = objectSrc;
            }
            if (null!=$(_objectId).onclick) {
                objectOnclick = $(_objectId).onclick;
                releseObj.objectOnclick = $(_objectId).onclick;
                hana.ORIGIN_BTN_OBJ['onclick'] = objectOnclick;
            }

        } catch (e) {
           // ignored..
           // alert(e.toString());
        }
	}
    // 20090514
	this.isSimpleUpdate = false;

    this.getObjectSrc = function() {
        return objectSrc;
    };

    this.getObjectOnclick = function() {
        return objectOnclick;
    };

    this.getAltObjectSrc = function() {
        return altObjectSrc;
    };

    this.getReleseObj = function() {
        return releseObj;
    };
    /** end 20090507-1 ***/

	var maskTarget = _maskTarget;

    if (_divTarget && _divTarget != undefined) {
		targetDiv = _divTarget;
	}
	// 2008.06.11 오륜경 comment, 마스크가 씌워질 타겟이 없다면 업데이트 영역 타겟으로 설정한다.
	if (maskTarget == undefined) {
		maskTarget = _divTarget;
	}
	if (_isLoading != undefined) {
		isLoading = _isLoading;
	}

	if (isWhole != undefined) {
		isWhole = _isWhole;
	}

    this.transaction = false;

	/**
	 * 대상 Div를 가져온다.
	 */
	this.getTargetDiv = function(){
		return targetDiv;
	};

	this.getMaskTarget = function() {
		return maskTarget;
	};

	this.getIsWhole = function() {
		return isWhole;
	};
	
	this.getResType = function() {
		return resType;
	};
	
	this.setTargetDiv = function(_divTarget) {
		targetDiv = _divTarget;
	};

    this.setResType = function(type){
		resType = type;
	};

    /**
	 * 사용자 정의 포커스 할 element id
	 * @param {String} element id
	 */
    this.setFocusElementId = function(id){
		focusElementId = id;
	};

	/**
	 * Ajax 통신 정상종료여부
	 * @param {Object} success 정상종료여부
	 */
	this.setIsSuccess = function(success){
		isSuccess = success;
	};

	/**
	 * 사용자 정의 함수
	 * @param {Object} func 사용자 정의 함수
	 */
	this.setCallbackFunc = function(func){
		callbackFunc = func;
	};

	/**
	 * 메뉴및 컨텐츠 변경시 히스토리를 남기기 위한  객체
	 */
	this.getObjectId = function() {
		return objectId;
	};

	this.getIsLoading = function() {
		return isLoading;
	};

    /**
	 * 사용자 정의 포커스 할 element id 제공
	 */
    this.getFocusElementId = function(){
		return focusElementId;
	};

	/**
	 * @since 20090413
	 * @param {Object} bTrue
	 */
	this.setTransaction = function(bTrue) {
		this.transaction = bTrue;
	};
	/**
	 * @since 20090413
	 */
	this.getTransaction = function() {
		return this.transaction;
	};
	
	this.setReqUrl = function(url){
		if(url.indexOf("?") != -1){
			reqUrl = url.substring(0, url.indexOf("?"));
		}else
			reqUrl = url;
	};
	
	this.getReqUrl = function() {
		return reqUrl;
	};
	
}; 
 
hana.JHanaAjax.prototype = {

	/**
     * Ajax onCreate 된 시점에 수행 될 함수
     */
	onCreate : function() {
		try {
			var isLoading = this.getIsLoading();
			var maskTarget = this.getMaskTarget();
			var isWhole = this.getIsWhole();

            //*** 20090507-1
            var objectId = this.getObjectId();
            var altObjectSrc =  this.getAltObjectSrc();
            hana.submiButton.alternateImg(objectId,altObjectSrc);
            //*** 20090507-1 --->

			if (isLoading) {
				// Loading 여부가 true 일때만 loading Div를 나타낸다.
				if (isWhole) {
					opb.common.layerpopup.openLoading_fnc();
				}
				else {
//                    if($(maskTarget)){
//                        pbk.sLoadingMasks['x-mask' + maskTarget] = new Ext.LoadMask($(maskTarget), {
//                            msg: 'Loading...'
//                        });
//                        pbk.sLoadingMasks['x-mask' + maskTarget].show();
//                    }else{
//                        /*alert('maskTarget="'+maskTarget+'" 영역이 존재 하지 않습니다. JHanaAjax 설정을 확인하세요');*/
//                    }
				}
			}
		}catch(e){
            //alert('ajax onCreate 시점에서 에러 발생 :' + e.message);
        }
	},

    /**
     * Ajax onComplete 된 시점에 수행 될 함수
     */
	onComplete : function() {
		try {
			document.onmousedown = null;
			var isLoading      = this.getIsLoading();
			var maskTarget     = this.getMaskTarget();
			var isWhole        = this.getIsWhole();
			var focusElementId = this.getFocusElementId();
			var resType        = this.getResType();
			var reqUrl		  = this.getReqUrl();	
			// 20090413
			var transaction     = this.getTransaction();
			if (isLoading) {
				// 20090413 transaction 을 설정했다면.. 대기
				if (!transaction) {
					if (isWhole && resType !='redirect') {
						opb.common.layerpopup.closeLoading_fnc();
					}
					else {
//						if (pbk.sLoadingMasks['x-mask' + maskTarget]) {
//							/**
//			                 * mask target 영역이 mask 가 씌워지면서 position relative 로 바뀜
//			                 * mask 해제 시 다시 position static 으로 변경 2008.12.11 김상준
//			                 */
//							pbk.sLoadingMasks['x-mask' + maskTarget].el.setStyle("position", "static");
//							pbk.sLoadingMasks['x-mask' + maskTarget].hide();
//
//							pbk.sLoadingMasks['x-mask' + maskTarget] = null;
//						}
					}
				}
			}
			// 이쪽에서 다이나믹 폼을 변환 시키는 함수를 call 한다.
			if (hana.JHanaNiceForms) {
				hana.JHanaNiceForms.init();
			}

			if (focusElementId != null) {
				if ($(focusElementId) != null && $(focusElementId) != undefined) {
					document.getElementById(focusElementId).select();
					document.getElementById(focusElementId).focus();
				}
			}
			
		}catch(e){
            //alert('ajax onComplete 시점에서 에러 발생 :' + e.message);
        }

        //에러 확인 창 출력
        if(this.e){
//            var funcText = this.e.func.toString();
//            funcText = funcText.replace('function anonymous() {','');
//            funcText = funcText.replace(/}$/g,'');
//            var errMsg = 'ajax callback 함수 실행 시 에러 발생 했습니다. : '+this.e.message;
//
//            alert(errMsg + '\n실행 callback 함수 : \n' + funcText);
        }
    },

	/**
	 * Ajax로 Form 요청을 보낼때,
	 * callback 함수가 없고 div에 결과값을 바로 뿌려줄때 이용한다.
	 * @param {String} url, 요청 url
	 * @param {Object} formObj, form의 참조값
	 */
	ajaxCommSubmit : function(url, formObj, eraseObjNames, isScriptLoad) {
		var onCreate = this.onCreate;
		var onComplete = this.onComplete;

		var ajaxObj = this;

		var data = 'ajax=true';
		var targetDiv = this.getTargetDiv();
		var maskTarget = this.getMaskTarget();
		var isWhole = this.getIsWhole();
		var alertFailure = this.alertFailure;
		var isSuccess = this.setIsSuccess;
		var objectId = this.getObjectId();

        //*** 20090507-1
        var objectSrc = this.getObjectSrc();
        var objectOnclick = this.getObjectOnclick();
        var altObjectSrc =  this.getAltObjectSrc();
        var releseObj = this.getReleseObj();
        //*** 20090507-1 --->

        var setResType = this.setResType;
        //**** 20090514
        var isSimple = this.isSimpleUpdate;

		// 20090413
		var transaction     = this.getTransaction();

		var signData = '';
		
		var setReqUrl = this.setReqUrl;
		setReqUrl(url);
		
		var reqUrl = this.getReqUrl();

		// 인증서 제출이 필요한 페이지이면 signData를 가져온다.
		// 요청 url이 인증서 제출이 필요한 url인지
//		if(opb.base.signUrl_map.keys().include(url)) {
//			signData = getSignedData(formObj, eraseObjNames);
//		}

        // 20090506
        data += '&'+formObjToQueryString(formObj, signData, url);
		data += "&requestTarget="+targetDiv;
		
		/* 자동로그아웃시간 연장 (20130306 자동으로 연장시키는 방법 사용 안함) */ 
//		opb.common.util.auto_logout_timer.renewAutoLogoutTime_fnc();
		opb.common.util.auto_logout_timer.timeInstance_num = opb.common.util.auto_logout_timer._getAutoLogoutTimeSec_fnc();

		var submitRequestFunction = function(){
			new Ajax.Request(url, {
				method: 'post',
				parameters: null,
	            postBody : data,
	            onCreate : function(){
					onCreate.call(ajaxObj);
				},
				onComplete : function(){
					onComplete.call(ajaxObj);
				},
				onSuccess: function(xmlHttp, arg){
					
					if (xmlHttp.status == 0) {
	                    // 20090507-1 -->
	                    hana.submiButton.releaseAltImg(objectId,objectSrc,objectOnclick);
	                    // 20090507-1 -->
	
						//////// 20090417
						if (transaction) {
							if (isWhole) {
								opb.common.layerpopup.closeLoading_fnc();
							}
							else {
	//							if (pbk.sLoadingMasks['x-mask' + maskTarget]) {
	//								pbk.sLoadingMasks['x-mask' + maskTarget].el.setStyle("position", "static");
	//								pbk.sLoadingMasks['x-mask' + maskTarget].hide();
	//
	//								pbk.sLoadingMasks['x-mask' + maskTarget] = null;
	//							}
							}
						}
						//////// 20090417
	
						return null;
					}
					if (targetDiv != null && targetDiv != '' &&
						(targetDiv == opb.base.CONTENTS_DIV || targetDiv == 'hanaMainDiv')) {
						hana.JHanaUtils.html.scrollToTop();
					}
	
	
	                // 20090507-1 에러시 릴리즈를 위해 .. 성공시 릴리즈는 개발자가 한다.
					opb.common.ajax.parseAjaxData_fnc(xmlHttp,true,releseObj);
	
					var resType = xmlHttp.getResponseHeader('json-type');
					setResType(resType);
					
					//유량제어
					hanaNetFunnelComplete(reqUrl, resType);
					
					if (resType != 'error' && resType !='redirect') {
	
						// 20150713 loginOk이면 숨김 div 변경
						if(xmlHttp.getResponseHeader('_RESULT_URL_') == '/WEB-INF/jsp/common/login/loginOk.jsp') {
							if($('loginOkDiv')) {
								opb.common.layerpopup.openLoading_fnc();
								targetDiv = "loginOkDiv";
							}
						}
	
						var responseText = xmlHttp.responseText;
						// 20150925 동적 스크립트 추가
						responseText += opb.common.ajax.getAjaxResponseAddString_fnc(targetDiv, xmlHttp.getResponseHeader('checkSecureframe'));
	
						// 20150612 javascript 동적 로드추가
						if(isScriptLoad) {
							var pattern = /<\s*script\s+[^>]*src\s*=\s*["|']?([^"']+)/g;
							var m, urls = [];
							while(m = pattern.exec(responseText)) {
								urls.push(m[1]);
							}
							
							if(urls.length > 0) {
								
								opb.common.ajax.loadScripts_fnc(urls, 0, function() {
									//$(targetDiv).update(responseText);
									ajaxUpdateDiv(targetDiv, responseText);
								});
		
							} else {
								//$(targetDiv).update(responseText);
								ajaxUpdateDiv(targetDiv, responseText);
							}
						} else {
							//$(targetDiv).update(responseText);						
							ajaxUpdateDiv(targetDiv, responseText);
						}
						
						/* 20130130 퍼블리싱요청 : 디자인 적용 사항 */
	                    if((typeof designInit) == 'function') {
	                    	designInit();
	                    }
	
	                    // 20090507-1 -->
	                    hana.submiButton.releaseAltImg(objectId,objectSrc,objectOnclick);
	                    // 20090507-1 -->
	
						//////// 20090413
						if (transaction) {
							if (isWhole) {
								opb.common.layerpopup.closeLoading_fnc();
							}
							else {
	//							if (pbk.sLoadingMasks['x-mask' + maskTarget]) {
	//								pbk.sLoadingMasks['x-mask' + maskTarget].el.setStyle("position", "static");
	//								pbk.sLoadingMasks['x-mask' + maskTarget].hide();
	//
	//								pbk.sLoadingMasks['x-mask' + maskTarget] = null;
	//							}
							}
						}
						//////// 20090413
	
						/* 20090304 */
						var resultInfo = xmlHttp.getResponseHeader('_RESULT_URL_');
						if (loginFormURLs !=null && loginFormURLs.length > 0 && targetDiv == opb.base.CONTENTS_DIV) {
							for (var k=0;k<loginFormURLs.length; k++){
								if (null!=resultInfo && resultInfo==loginFormURLs[k]){
									/* 왼쪽 리프레쉬.*/
									//pbk.ajax.refreshLeft(true);
									// guid 클리어
									clearGuid();
									break;
								}
							}
						}
					} else {
						
						//////// 20090413
						if (transaction) {
							if (isWhole && resType != 'redirect') {
								opb.common.layerpopup.closeLoading_fnc();
							}
							else {
	//							if (pbk.sLoadingMasks['x-mask' + maskTarget]) {
	//								pbk.sLoadingMasks['x-mask' + maskTarget].el.setStyle("position", "static");
	//								pbk.sLoadingMasks['x-mask' + maskTarget].hide();
	//
	//								pbk.sLoadingMasks['x-mask' + maskTarget] = null;
	//							}
							}
						}
						//////// 20090413
					}
	
				},
				asynchronous: true,
				onFailure: alertFailure
			});
		};
		
		
		hanaNetFunnelStart(reqUrl, submitRequestFunction);
		
	},
	
	/**
	 * ajaxCommSubmit과 동일하나 callback 함수를 호출 한다.
	 *
	 * @author Jiho Park
	 * @since 2008.01.25
	 *
	 * @param {Object} url
	 * @param {Object} formObj
	 * @param {Object} callbackFunc
	 */
	ajaxCommSubmitCallback : function(url, formObj, callbackFunc, eraseObjNames, isScriptLoad) {
		
		var onCreate = this.onCreate;
		var onComplete = this.onComplete;
		
		var ajaxObj = this;
		var data = 'ajax=true';
		var targetDiv = this.getTargetDiv();
		var maskTarget = this.getMaskTarget();
		var isWhole = this.getIsWhole();
		var alertFailure = this.alertFailure;
		var isSuccess = this.setIsSuccess;
		var objectId = this.getObjectId();
		var signData = '';

        //*** 20090507-1
        var objectSrc = this.getObjectSrc();
        var objectOnclick = this.getObjectOnclick();
        var altObjectSrc =  this.getAltObjectSrc();
        var releseObj = this.getReleseObj();
        //*** 20090507-1 --->

        var setResType = this.setResType;

		//**** 20090514
        var isSimple = this.isSimpleUpdate;

		// 20090413
		var transaction     = this.getTransaction();
		
		var setReqUrl = this.setReqUrl;
		setReqUrl(url);
		
		var reqUrl = this.getReqUrl();
		
		// 인증서 제출이 필요한 페이지이면 signData를 가져온다.
		// 요청 url이 인증서 제출이 필요한 url인지
//		if(opb.base.signUrl_map.keys().include(url)) {
//			signData = getSignedData(formObj, eraseObjNames);
//		}

        // 20090506
        data += '&'+formObjToQueryString(formObj, signData, url);
		data += "&requestTarget="+targetDiv;
		
		/* 자동로그아웃시간 연장 (20130306 자동으로 연장시키는 방법 사용 안함) */
//		opb.common.util.auto_logout_timer.renewAutoLogoutTime_fnc();
		opb.common.util.auto_logout_timer.timeInstance_num = opb.common.util.auto_logout_timer._getAutoLogoutTimeSec_fnc();
		
		var submitRequestFunction = function(){
			new Ajax.Request(url, {
				method: 'post',
				parameters: null,
	            postBody : data,
				onCreate : function(){
					onCreate.call(ajaxObj);
				},
				onComplete : function(){
					onComplete.call(ajaxObj);
				},
				onSuccess: function(xmlHttp, arg){
					if (xmlHttp.status == 0) {
	                    // 20090507-1 -->
	                    hana.submiButton.releaseAltImg(objectId,objectSrc,objectOnclick);
	                    // 20090507-1 -->
	
						//////// 20090417
						if (transaction) {
							if (isWhole) {
								
								opb.common.layerpopup.closeLoading_fnc();
							}
							else {
	//							if (pbk.sLoadingMasks['x-mask' + maskTarget]) {
	//								pbk.sLoadingMasks['x-mask' + maskTarget].el.setStyle("position", "static");
	//								pbk.sLoadingMasks['x-mask' + maskTarget].hide();
	//
	//								pbk.sLoadingMasks['x-mask' + maskTarget] = null;
	//							}
							}
						}
						//////// 20090417
	
						return null;
					}
					if (targetDiv != null && targetDiv != '' &&
						(targetDiv == opb.base.CONTENTS_DIV || targetDiv == 'hanaMainDiv')) {
						hana.JHanaUtils.html.scrollToTop();
					}
	
					// 20090507-1 에러시 릴리즈를 위해 .. 성공시 릴리즈는 개발자가 한다.
					opb.common.ajax.parseAjaxData_fnc(xmlHttp,true,releseObj);
					var resType = xmlHttp.getResponseHeader('json-type');
					setResType(resType);
					
					//유량제어
					hanaNetFunnelComplete(reqUrl, resType);
					
					//////// 20090413
					if (transaction) {
						if (isWhole) {
							opb.common.layerpopup.closeLoading_fnc();
						}
						else {
	//						if (pbk.sLoadingMasks['x-mask' + maskTarget]) {
	//							pbk.sLoadingMasks['x-mask' + maskTarget].el.setStyle("position", "static");
	//							pbk.sLoadingMasks['x-mask' + maskTarget].hide();
	//
	//							pbk.sLoadingMasks['x-mask' + maskTarget] = null;
	//						}
						}
					}
					//////// 20090413
	
					if (resType != 'error' && resType !='redirect') {
	
						// 20150622 NiceForms 초기화 추가
						var responseText = xmlHttp.responseText;
						responseText += opb.common.ajax.getAjaxResponseAddString_fnc(targetDiv, xmlHttp.getResponseHeader('checkSecureframe'));
						// 20150612 javascript 동적 로드추가
						if(isScriptLoad) {
							var pattern = /<\s*script\s+[^>]*src\s*=\s*["|']?([^"']+)/g;
							var m, urls = [];
							while(m = pattern.exec(responseText)) {	
								urls.push(m[1]);
							}
							
							if(urls.length > 0) {
								
								jQuery.holdReady(true);
								opb.common.ajax.loadScripts_fnc(urls, 0, function() {
									//$(targetDiv).update(responseText);
									ajaxUpdateDiv(targetDiv, responseText);
								});
		
							} else {
								//$(targetDiv).update(responseText);
								ajaxUpdateDiv(targetDiv, responseText);
							}
						} else {
							//$(targetDiv).update(responseText);						
							ajaxUpdateDiv(targetDiv, responseText);
						}
						
	
						/* 20130130 퍼블리싱요청 : 디자인 적용 사항 */
	                    if((typeof designInit) == 'function') {
	                    	designInit();
	                    }
	
						/* 20090304 */
						var resultInfo = xmlHttp.getResponseHeader('_RESULT_URL_');
						if (loginFormURLs !=null && loginFormURLs.length > 0 && targetDiv == opb.base.CONTENTS_DIV) {
							for (var k=0;k<loginFormURLs.length; k++){
								if (null!=resultInfo && resultInfo==loginFormURLs[k]){
									/* 왼쪽 리프레쉬.*/
									//pbk.ajax.refreshLeft(true);
									// guid 클리어
									clearGuid();
									break;
								}
							}
						}
						
						try {
							callbackFunc(true);
	                    }catch(e){
	                        e.func = new Function(callbackFunc);
	                        ajaxObj.e = e;
	                    }
	                }
				},
				asynchronous: true,
				onFailure: alertFailure
			});
		};
		
		hanaNetFunnelStart(reqUrl, submitRequestFunction);
		
	},

	/**
	 * Ajax로 Form 요청을 보내고, Callback 함수로 데이터를 처리할 때 이용한다.
	 * @param {String} url 요청 URL
	 * @param {Object} formObj Form의 참조값
	 * @param {boolean}isAsync 동기화 여부(필수항목, 하지만 비동기로 설정됨)
	 * @param {String} callbackFunc
	 * @param {String} encodingType
	 */
	ajaxSubmit :  function(url, formObj, isAsync, callbackFunc, encodingType,eraseObjNames ) {

		var onCreate = this.onCreate;
		var onComplete = this.onComplete;
		var ajaxObj = this;
		var alertFailure = this.alertFailure;
		var maskTarget = this.getMaskTarget();
		var isWhole = this.getIsWhole();
		var data = 'ajax=true';
		var _privateCallBack = callbackFunc;
		var signData = '';

        var objectId = this.getObjectId();

        //*** 20090507-1
        var objectSrc = this.getObjectSrc();
        var objectOnclick = this.getObjectOnclick();
        var altObjectSrc =  this.getAltObjectSrc();
        var releseObj = this.getReleseObj();
        //*** 20090507-1 --->

        var setResType = this.setResType;

		// 20090413
		var transaction     = this.getTransaction();
		
		var setReqUrl = this.setReqUrl;
		setReqUrl(url);
		
		var reqUrl = this.getReqUrl();

		// 아래 인코딩은 무시한다. Ajax는 기본적으로 UTF-8 만으로 통신을 한다고 보면된다.
		// 그 이외의 Encoding을 지원하는 인코딩 함수가 없다.
		//var pEncodingType  = encodingType;
		//if (!encodingType || encodingType == undefined) {
		//	pEncodingType = 'EUC-KR';
		//}

		// 인증서 제출이 필요한 페이지이면 signData를 가져온다.
		// 요청 url이 인증서 제출이 필요한 url인지
//		signData = getSignedData(formObj, eraseObjNames);

//		if(opb.base.signUrl_map.keys().include(url)) {
//			signData = getSignedData(formObj, eraseObjNames);
//		}

        // 20090506
        data += '&'+formObjToQueryString(formObj, signData, url);
		data += "&requestTarget=";

		/* 자동로그아웃시간 연장 (20130306 자동으로 연장시키는 방법 사용 안함) */
//		opb.common.util.auto_logout_timer.renewAutoLogoutTime_fnc();
		opb.common.util.auto_logout_timer.timeInstance_num = opb.common.util.auto_logout_timer._getAutoLogoutTimeSec_fnc();
		
		var submitRequestFunction = function(){
			
			new Ajax.Request(url, {
				method: 'post',
				parameters: null,
				postBody : data,
				onCreate : function(){
					onCreate.call(ajaxObj);
				},
				onComplete : function(){
					onComplete.call(ajaxObj);
				},
				onSuccess: function(xmlHttp,args) {
					if (xmlHttp.status == 0) {
						// 20090507-1 -->
						hana.submiButton.releaseAltImg(objectId,objectSrc,objectOnclick);
						// 20090507-1 -->
						
						//////// 20090417
						if (transaction) {
							if (isWhole) {
								opb.common.layerpopup.closeLoading_fnc();
							}
							else {
//							if (pbk.sLoadingMasks['x-mask' + maskTarget]) {
//								pbk.sLoadingMasks['x-mask' + maskTarget].el.setStyle("position", "static");
//								pbk.sLoadingMasks['x-mask' + maskTarget].hide();
//
//								pbk.sLoadingMasks['x-mask' + maskTarget] = null;
//							}
							}
						}
						//////// 20090417
						
						return null;
					}
					// 20090507-1 에러시 릴리즈를 위해 .. 성공시 릴리즈는 개발자가 한다.
					opb.common.ajax.parseAjaxData_fnc(xmlHttp,true,releseObj);
					
					var resType = xmlHttp.getResponseHeader('json-type');
					setResType(resType);
					
					//유량제어
					hanaNetFunnelComplete(reqUrl, resType);
					
					//////// 20090413
					if (transaction) {
						if (isWhole && resType != 'redirect') {
							opb.common.layerpopup.closeLoading_fnc();
						}
						else {
//						if (pbk.sLoadingMasks['x-mask' + maskTarget]) {
//							pbk.sLoadingMasks['x-mask' + maskTarget].el.setStyle("position", "static");
//							pbk.sLoadingMasks['x-mask' + maskTarget].hide();
//
//							pbk.sLoadingMasks['x-mask' + maskTarget] = null;
//						}
						}
					}
					//////// 20090413
					try{
						if (resType != 'error' && (typeof _privateCallBack) == 'function') {
							
							// 로그인이면 로딩바 표시
							if(url.indexOf("LoginSubmit.do") > -1) {
								opb.common.layerpopup.openLoading_fnc();
							}
							
							_privateCallBack(xmlHttp, args);
							/* 20130130 퍼블리싱요청 : 디자인 적용 사항 */
							if((typeof designInit) == 'function') {
								designInit();
							}
						}
					}catch(e){
						e.func = new Function(_privateCallBack);
						ajaxObj.e = e;
					}
					//
					
				},
				asynchronous: isAsync,
				onFailure: alertFailure
			});
		};
		
		hanaNetFunnelStart(reqUrl, submitRequestFunction);
		
	},

	/**
	 *
	 * @param {Object} originalResquest
	 * @param {Object} xJson 수신한 데이터 헤더에 X-JSON 레이블이 있으면 eval한 결과값.
	 */
	alertFailure : function (originalResquest,xJson) {
		
		
		document.onmousedown=null;
		var reqStatus = originalResquest.status;
		var reqStatusText = originalResquest.statusText;
		// 20090109-1 404시에 요청 URL 과 응답URL을 보여주기위함
		var reqInfo = originalResquest.getResponseHeader('_REQUEST_URL_');
		var resInfo = originalResquest.getResponseHeader('_RESULT_URL_');
		var extraInfo = '';
        var errMsg = originalResquest.responseText;

       //*** 20090507-1
      	try {
      		//유량제어
      		hanaNetFunnelComplete2(reqInfo);
      		
      		//모근원 : this 호출이 아닌 전역변수에서 호출해서 restore
        	hana.submiButton.releaseAltImg2();
      	} catch (e) { }
        //*** 20090507-1 --->

		opb.common.layerpopup.closeLoading_fnc();

		var msgTitle = "";
		var msgBody = "";
        //404 error 인 경우 에러 페이지로 보낸다
        if (reqStatus == '404') {
			// 20090429 layer 로 보여준다.
			msgTitle = "전송 오류";
			reqStatusText = '<B><font color="red">입력하신 주소에 해당하는 페이지를 찾을 수 없습니다.</font></B><BR/>입력하신 주소를 다시 한번 확인해 주시기 바랍니다.<BR/>혹시 보시고자 하는 페이지가 없어졌거나 일시적으로 장애일 수 있습니다.';
        }

        //500, 503, 505 서버 error 인 경우 에러 메세지를 출력 한다.
        if (reqStatus.toString().startsWith('5')) {
			extraInfo = '<BR/><B><font color="red">응답 페이지에 에러가 있습니다.</font></B><BR/>혹시 보시고자 하는 페이지가 없어졌거나 일시적으로 장애일 수 있습니다.';
		}

        //MessageBox를 띄운다.
		var tmp = shttp_status_map[parseInt(reqStatus,10)];
		if (tmp == null || tmp == "") {
			msgTitle = "전송 오류";
			msgBody = reqStatusText;
			msgBody += extraInfo;
		}
		else {
			// 20090305 인증서 오류일경우는 URL 정보를 보여주지 않는다.
			var arr = tmp.split("|");
			msgTitle = arr[0];
			msgBody = arr[1];
		}

		opb.common.layerpopup.openMessage_fnc({
			isConfirm: false,
			title: msgTitle,
			message: reqStatus + " : " + msgBody,
			callback: function(e){
				if (e == true) {
				}
			}
		});
		//실패시에도 E2E초기화
		try{
			//document.getElementById("TouchEnKey").ReScanDocument();
			TK_Rescan();
		}catch(e){
			
		}
		originalResquest.abort();
		
		
	},

	/**
	 *
	 * @param {Object} originalResquest
	 * @param {Object} xJson 수신한 데이터 헤더에 X-JSON 레이블이 있으면 eval한 결과값.
	 */
	alertResponse : function (originalResquest,xJson) {
		var res = originalResquest.responseText;
		var instance = this;

		// 동작이 끝났을 경우 Observer 를 중지 시킨다.
		Event.stopObserving(window, 'resize', instance.resizeHandler);
		Event.stopObserving(window, 'scroll', instance.resizeHandler);

		opb.common.layerpopup.closeLoading_fnc();

		if(originalResquest.status == 551) {
			Element.update(opb.base.CONTENTS_DIV, res);
			return;
		}

		opb.common.layerpopup.openMessage_fnc({
			isConfirm: false,
			title: '처리 완료',
			message: '정상적 처리 되었습니다.',
			callback: function(e){
		}
		});
	}
};

