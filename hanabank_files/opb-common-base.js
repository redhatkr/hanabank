/*INISEAL:[P%2Bf4PCRwkOTuisaa%2Bpv0hkdAUIM%3D%0A]*/
/*****************************************************************************
 * 파일명 : opb-common-base.js
 * 작성일 : 2008. 04. 19
 * 작성자 : ej
 * 설   명 : opb-common.js를 기능별 분리.
 *          추가인증선택 관련 스크립를 사용하기 위해 생성(2012-01-09 이은택)
 * ===========================================================================
 * 변경이력:
 * DATE				AUTHOR		DESCRIPTION
 * ---------------------------------------------------------------------------
 * 변경 이력은 이곳에 추가 합니다.  
 *****************************************************************************/

/**
 * 2채널서비스 인증번호 검증 
 *
 * @since
 */
opb.common.chnl2vrfc = function() {

    return {
    	submitChnl2apvNoApcAction : function( res, option ) {
            // Return 데이터 Json타입 체크
            //pbk.ajax.parseData(res, true);

		    var hanaAjax = new hana.JHanaAjax(null, true, true);
			hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + '/common/twoChannelApcNoReq.do'
			, null
			, true
			, function(res) {

				var _data = eval('(' + res.responseText + ')');	// Json타입으로 변환

				// 정상
				if (_data.chnl2ApvNoResult == "SUCCESS") {
					try{

				    	if ($('_CHNL2_APV_NO_VRFC_INPUT_') != undefined){
							$('_CHNL2_APV_NO_VRFC_INPUT_').value = _data.chnl2ApvNo;
						}
				    	if ($('_CHNL2_APV_NO_VRFC_INPUT_STATUS_') != undefined){
							$('_CHNL2_APV_NO_VRFC_INPUT_STATUS_').value = 'N';
						}

				    	if ($('_CHNL2_APV_NO_VRFC_INPUT_SPAN_') != undefined){
							$('_CHNL2_APV_NO_VRFC_INPUT_SPAN_').innerHTML = _data.chnl2ApvNo;
						}
				    	if ($('_CHNL2_APV_NO_VRFC_INPUT_STATUS_') != undefined){
							$('_CHNL2_APV_NO_VRFC_INPUT_STATUS_').value = 'N';
						}
				    } catch(e) {}
				} else {

					var _message = '2채널서비스 승인번호전송 중 오류가 발생했습니다.';
					if (_data.chnl2ApvNoResult != "ERROR") {
						_message = _data.chnl2ApvNoResult;
					}

					opb.common.layerpopup.openMessage_fnc({
						isConfirm : false,
						title     : '2채널승인번호전송상태',
						message   : _message,
						callback  : function(e){

							if ($('_CHNL2_APV_NO_VRFC_INPUT_') != undefined){
								$('_CHNL2_APV_NO_VRFC_INPUT_').value = '';
							}
							if ($('_CHNL2_APV_NO_VRFC_INPUT_STATUS_') != undefined){
								$('_CHNL2_APV_NO_VRFC_INPUT_STATUS_').value = 'N';
							}

							if ($('_CHNL2_APV_NO_VRFC_INPUT_SPAN_') != undefined){
								$('_CHNL2_APV_NO_VRFC_INPUT_SPAN_').innerHTML = "";
							}
							if ($('_CHNL2_APV_NO_VRFC_INPUT_STATUS_') != undefined){
								$('_CHNL2_APV_NO_VRFC_INPUT_STATUS_').value = 'N';
							}
						}
					});

					return;
				}

			} //[end]
			, 'EUC-KR');
		},

		// 비동기가 아닌 동기화 방식으로 호출
		chkChnl2ApvNoVrfcStatus : function () {
			var hanaAjax = new hana.JHanaAjax(null, true, true);
			hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + '/common/twoChannelApcNoVerify.do'
			, null
			, false
			, function(res) {

				var _data = eval('(' + res.responseText + ')');	// Json타입으로 변환

				// 정상
				if (_data.chnl2ApvNoVrfcStatusCd == "1") {
					if ($('_CHNL2_APV_NO_VRFC_INPUT_STATUS_') != undefined){
						$('_CHNL2_APV_NO_VRFC_INPUT_STATUS_').value = 'Y';
					}
				} else {
					if ($('_CHNL2_APV_NO_VRFC_INPUT_STATUS_') != undefined){
						$('_CHNL2_APV_NO_VRFC_INPUT_STATUS_').value = 'E';
					}

					var alertMsg = _data.chnl2ApvNoVrfcStatusMsg;

					if ( alertMsg == null )
						alertMsg = "2채널 인증을 하지 않으셨거나, 인증 거래중 오류가 발생하였습니다.";

					opb.common.layerpopup.openMessage_fnc({
						isConfirm : false,
						title     : '인증번호전송상태',
						message   : alertMsg,
						callback  : null
					});
					return;
				}
			} //[end] callback
			, 'EUC-KR');
		}

    };

}();

var SMSinsteadOfARS = new Object();
SMSinsteadOfARS.isCheck = false;
SMSinsteadOfARS.callBackFuc = null;
SMSinsteadOfARS.isVerify = false;

/**
 * ARS인증 
 *
 * @since 
 */
pbk.common.ARSauthentication = function() {
	
    return {
    	submitARSrequstAction : function() {
            
            var phoneCode = $('_ARS_REQ_PHONE_NUBMER_').value;
            var arsCertTrscDvCd = $('arsCertTrscDvCd').value;
            
            if(phoneCode == ""){
            	opb.common.layerpopup.openAlert_fnc("ARS인증", "연락처를 선택하여주시기 바랍니다.", '_ARS_REQ_PHONE_NUBMER_');
            	return false;
            }
            
            if($('_ARS_VRFC_INPUT_STATUS_') != undefined && $('_ARS_VRFC_INPUT_STATUS_').value == 'Y') {
                if(!pbk.common.ARSauthentication.submitARSresultPreCheck())  return false;
            }
            
            //나이스인증 대체 관련 초기화
            pbk.common.ARSauthentication.initSMSinsteadOfARS();
            
            var params = new Array();
    		params.push({id: 'certRqstTelNoTypCd', value:phoneCode}); 
    		params.push({id: 'arsCertTrscDvCd', value:arsCertTrscDvCd}); 
    		var frmObj2 = form.createForm(params);
    		
		    var hanaAjax = new hana.JHanaAjax(null, true, true);
			hanaAjax.ajaxSubmit(pbk.APPLICATION_CONTEXT_ROOT + '/common/arsApcNoReq.do'
			, frmObj2
			, true
			, function(res) {

				var _data = eval('(' + res.responseText + ')');	// Json타입으로 변환
				// 정상
				if (_data.arsApvNoResult == "SUCCESS") {
					try{
				    	if ($('_ARS_INPUT_VIEW_') != undefined){
							//
				    		var arsApvNo = _data.arsApvNo;
				    		// 022 멘트는 앞뒤구분이 없이 2자리만 인증한다.
				    		if (arsCertTrscDvCd == "022") {
				    			try {
				    				$('_ARS_INPUT_VIEW_').innerHTML = _data.arsCertNoDvCd == "01" ? arsApvNo.substring(0,2) :  arsApvNo.substring(2,4);
				    			}catch(e){
				    				$('_ARS_INPUT_VIEW_').innerHTML = arsApvNo.substring(0,2)+ "·" + arsApvNo.substring(2,4);
				    			}
				    		} else {
								$('_ARS_INPUT_VIEW_').innerHTML = arsApvNo.substring(0,2)+ "·" + arsApvNo.substring(2,4);
				    		}
						}
				    	
				    	if ($('_ARS_VRFC_INPUT_STATUS_') != undefined){
							$('_ARS_VRFC_INPUT_STATUS_').value = 'Y';
						}
				    	
				    } catch(e) {}
				    
				    opb.common.layerpopup.openMessage_fnc({
						isConfirm : false,
						title     : 'ARS인증 요청 상태',
						message   : 'ARS인증 요청이 완료되었습니다.<br /> ARS인증을 완료 후 진행하시길 바랍니다.',
						callback  : function(e){
							if (typeof gb_displayAddCertBtn == "function") {
								gb_displayAddCertBtn();
			    			}
						}
						
					});
				    
				} else {
					var _message = 'ARS인증 요청중  오류가 발생했습니다.';
					if (_data.arsApvNoResult != "ERROR") {
						_message = _data.arsApvNoResult;
					}
					
					if ($('_ARS_VRFC_INPUT_STATUS_') != undefined){
						$('_ARS_VRFC_INPUT_STATUS_').value = 'N';
					}
					opb.common.layerpopup.openMessage_fnc({
						isConfirm : false,
						title     : 'ARS인증 요청 상태',
						message   : _message,
						callback  : function(e){
							if ($('_ARS_INPUT_VIEW_') != undefined){
								
								$('_ARS_INPUT_VIEW_').innerHTML = '';
								
								
							}
						}
					});
				}
				
			} //[end] 
			, 'EUC-KR');
		},
		
		// ARS인증 결과 확인
		submitARSresultCheckAction : function (tempTran) {
            
			var arsCertTrscDvCd = $('arsCertTrscDvCd').value;
			 
			var params = new Array();
    		params.push({id: 'rsevTrscYn', value:tempTran}); 
    		var frmObj2 = form.createForm(params);
    		
    		//SMS대체 인증으로 이미 검증을 끝냈다면 SKIP.
    		if(SMSinsteadOfARS.isVerify) return true;
    		//else if(SMSinsteadOfARS.isCheck && SMSinsteadOfARS.callBackFuc == null){
    		//	SMSinsteadOfARS.callBackFuc = arguments.callee.caller.caller.caller;
    		//}
    			
    		var isRtn = false;
    		
		    var hanaAjax = new hana.JHanaAjax(null, true, true);
			hanaAjax.ajaxSubmit(pbk.APPLICATION_CONTEXT_ROOT + '/common/arsResultCheck.do'
			, frmObj2
			, false
			, function(res) {

				var _data = eval('(' + res.responseText + ')');	// Json타입으로 변환
				// 정상
				if (_data.arsApvNoResult == "SUCCESS") {
				    
				    isRtn = true;
				    
				} else {
					var _message = 'ARS인증 검증중  오류가 발생했습니다.';
					if (_data.arsApvNoResult != "ERROR") {
						_message = _data.arsApvNoResult;
					}
					
					if(_data.arsApvNoResultCode == 'BEBK82145' && SMSinsteadOfARS.isCheck 
							&& "023" != arsCertTrscDvCd && "024" != arsCertTrscDvCd){
						
						opb.common.layerpopup.openLayer_fnc(pbk.APPLICATION_CONTEXT_ROOT + '/common/smsInsteadOfARSPopUp.do', 'niceInstedOfARSPopUp', null, null, 780);
						
					}else{
						opb.common.layerpopup.openMessage_fnc({
							isConfirm : false,
							title     : 'ARS인증 요청 상태',
							message   : _message,
							callback  : function(e){}
						});
					}
					
					isRtn =  false;
				}
				
				
			} //[end] 
			, 'EUC-KR');
			
			return isRtn;
		},
		
		/*
		 *  반복적인  ARS인증 요청을 방지하기 위하여
		 *  선요청거래가 있었는지 확인하는 함수.
		 */ 
		submitARSresultPreCheck : function () {
            
            var params = new Array();
            params.push({id: 'rsevTrscYn', value:'Y'}); 
            var frmObj2 = form.createForm(params);
           
            var isRtn = false;
            var smsPreChek =  $('_SMS_INSTOF_CHK_') != undefined ? $('_SMS_INSTOF_CHK_').value : "";
            var arsCertTrscDvCd = $('arsCertTrscDvCd').value;
                         
            var hanaAjax = new hana.JHanaAjax(null, true, true);
            hanaAjax.ajaxSubmit(pbk.APPLICATION_CONTEXT_ROOT + '/common/arsResultCheck.do'
            , frmObj2
            , false
            , function(res) {

                var _data = eval('(' + res.responseText + ')'); // Json타입으로 변환
                
                // 거래가 정상인 경우 
                if (_data.arsApvNoResult == "SUCCESS") {
                    
                    opb.common.layerpopup.openMessage_fnc({
                        isConfirm : false,
                        title     : 'ARS인증 완료',
                        message   : '이미 ARS인증이 완료되었습니다.<br/>거래를 진행하여 주시기 바랍니다.',
                        callback  : function(e){}
                    });
                    
                    isRtn =  false;
                    
                } else {
                    
                	if(_data.arsApvNoResultCode == 'BEBK82145' && "SMS_CHECK" == smsPreChek 
							&& "023" != arsCertTrscDvCd && "024" != arsCertTrscDvCd){
						
						opb.common.layerpopup.openLayer_fnc(pbk.APPLICATION_CONTEXT_ROOT + '/common/smsInsteadOfARSPopUp.do', 'niceInstedOfARSPopUp', null, null, 780);
						
						$('_ARS_INPUT_VIEW_').innerHTML = '····';
						 isRtn =  false;
						
					}
                	else if (_data.arsApvNoResultCode != "BEBK82142") {
                        isRtn =  true;
                    }else{
                        opb.common.layerpopup.openMessage_fnc({
                            isConfirm : false,
                            title     : 'ARS인증 요청  중',
                            message   : 'ARS인증 요청 중입니다.<br/>ARS인증을 완료한 후 거래를 진행하여 주시기 바랍니다.',
                            callback  : function(e){}
                        });
                        
                        isRtn =  false;
                    }
                }
                
                
            } //[end] 
            , 'EUC-KR');
            
            return isRtn;
        },
        
		/*
		 * 인증번호 검증
		 */
		resultVerifySms3 : function(oForm) {
			
			if(oForm.apclYn.value != "Y"){
				opb.common.layerpopup.openAlert_fnc('','인증번호 요청을 진행해주세요.');
				return;
			}
			
			var jForm = new hana.JForm();
			if (!jForm.add(new hana.JNumber('인증번호',oForm.mbleCertNo).limitLength(6,6))
					.validate()) {
				return;
			}
			
			 var hanaAjax = new hana.JHanaAjax('', true, true);
		       	hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/resultVerifySms3.do"
			            , oForm
			            , true
			            , function(res, args) {
		       			
			       			var _data = eval('(' + res.responseText + ')');
			       			if("SUCCESS" == _data.RESULT) {
			       				
			       				opb.common.layerpopup.closeLayer_fnc('niceInstedOfARSPopUp');
			       				
			       				SMSinsteadOfARS.isVerify = true; 
			       				
		       					if(SMSinsteadOfARS.callBackFuc == null){
				       				opb.common.layerpopup.openMessage_fnc({
										isConfirm: false,
										title: '인증번호 검증 완료',
										message: '검증이 완료되었습니다. 다음단계를 진행해 주시기 바랍니다.'
									});
				       				
				       			}else{
				       				if((typeof SMSinsteadOfARS.callBackFuc) == 'string') {
				       					eval(SMSinsteadOfARS.callBackFuc);
				       				}else
				       					SMSinsteadOfARS.callBackFuc();
				       			}
		       					
			       			}
			            } //[end] callback
		       	); //[end] ajaxSubmit
			
		},
		
		initSMSinsteadOfARS : function() {
			SMSinsteadOfARS.isCheck = false;
			SMSinsteadOfARS.callBackFuc = null;
			SMSinsteadOfARS.isVerify = false;
		},
		
		setSMSinsteadOfARS : function(callBackFuc) {
			
			SMSinsteadOfARS.isCheck = true;
			if(callBackFuc != null){
				SMSinsteadOfARS.callBackFuc = callBackFuc;
			}
		}

    };

}(); 

opb.common.rejectTransfer = function(){
	var formObject = "";
	
	return{
		rejectTransferFDSCancel01 : function(){
			var hanaAjax = new hana.JHanaAjax('HANA_CONTENTS_DIV', true, true);
			hanaAjax.ajaxCommSubmit(pbk.APPLICATION_CONTEXT_ROOT+'/myhana/prevent/wpcus402_100t.do', null );
		},
	
		rejectTransferFDSCancel02 : function(formObj){
			
			var chkCnt = 0;
        	
			if(formObj.chk.length != undefined) { 	        	
				for (var i = 0; i < formObj.chk.length; i++) {
					if(formObj.chk[i].checked){
				    	chkCnt++;
					}
				}
			}else { // 단건 

				if(formObj.chk.checked){
					chkCnt++;
				}
			}
			
			if(chkCnt == 0) {
				opb.common.layerpopup.openAlert_fnc("제한 해제","제한 해제할 내역을 선택하세요.");
                return;
			}
			
			if(formObj._ARS_VRFC_INPUT_STATUS_.value != 'Y') {
				opb.common.layerpopup.openAlert_fnc('ARS 본인인증', 'ARS인증요청을 먼저 하여주시기 바랍니다.');
				return;
			}
			
			if (securityPasswdCheck()){ 
				if(!pbk.common.ARSauthentication.submitARSresultCheckAction())	return false;
				
				var hanaAjax = new hana.JHanaAjax("hanaMainDiv", true, true, null, 'joinBtnImgId');
				var url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/prevent/wpcus402_101t.do";
//				formObject = formObj;
//				pbk.web.util.showCertWithHTMLSign(url, formObj, "", opb.common.rejectTransfer.rejectTransferFDSCancel02CallBack);
				hanaAjax.ajaxCommSubmit(url, formObj);
            }
			
		},
		
		rejectTransferFDSCancel02CallBack : function(result){
        	form.createHiddenField(formObject,'signed_msg', result, false);
        	form.createHiddenField(formObject,'signed_storage', '', false);
        	
        	var url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/prevent/wpcus402_101t.do";
        	var hanaAjax = new hana.JHanaAjax("hanaMainDiv", true, true);
        	hanaAjax.ajaxCommSubmit(url, formObject);
        	
        }
	};
}();

//SMS인증번호 요청
opb.common.selfCnfm = function() {

	var callbackMessage4SelfCnfmAddSvc = function(res, args){

		opb.common.ajax.parseAjaxData_fnc(res, true);

		var data = eval('(' + res.responseText + ')');
		data.resResult = "SUCCESS";
		if (data.resResult == 'SUCCESS') { // 오류 검사

			opb.common.layerpopup.openMessage_fnc({
				isConfirm: false,
				title: '인증번호 요청',
				message: '등록하신 휴대폰으로 인증번호가 발송되었습니다.<br />(발신번호:1599-1111 / SMS 미수신시, 스팸등록이 되어 있을수 있으니 스팸메세지함 확인요망)',
				callback: function(e){
					document.getElementById('smsPw').focus();
					document.getElementById('apclYn').value='Y';
				}
			});
		}
		else {

			opb.common.layerpopup.openMessage_fnc({
				isConfirm: false,
				title: '인층번호요청 오류',
				message: data.errMsg,
				callback: function(e){
					return false;
				}
			});
		}

	};

	return {

		// 인증번호 요청
    	submitSelfCnfmAddSvc : function(frmObj){

			frmObj.apclYn.value='N';

    		var jForm = new hana.JForm();
    		if (!jForm
			          .add(new hana.JNumber('서비스구분코드', frmObj.svcDvCd))
//			          .add(new hana.JNumber('휴대전화번호 이동통신사', frmObj.mbphEnprCd))
			          .add(new hana.JNumber('휴대전화번호', frmObj.mbphNo))
					  .validate()) {
                 		return;
			}

    		var params = new Array();

            params.push({id: 'svcDvCd', value:frmObj.svcDvCd.value});       		// 서비스구분코드

            params.push({id: 'mbphNo', value:frmObj.mbphNo.value}); 	            // 휴대전화번호

			var frmObj2 = form.createForm(params);

			var url = opb.base.APPLICATION_CONTEXT_ROOT + "/certify/safe/wpcer467_02t_01.do";

			var hanaAjax = new hana.JHanaAjax(null, true, true);
			hanaAjax.ajaxSubmit(url, frmObj2, true, callbackMessage4SelfCnfmAddSvc, 'UTF-8');
        },

        choceSelfCnfmAddSecMdcl : function(formObj, selGb) {

        	if ($('ADD_SEC_MDCL_SEL_SMS') != undefined) {
				if (selGb == "_OFF") {
					var SMSSkip = document.getElementsByName('smsSkip');

					if (document.getElementsByName('smsSkip') != undefined && document.getElementsByName('smsSkip') != null) {
						$('smsSkip').value = 'OK';
					}
					$('ADD_SEC_MDCL_SEL_SMS').style.display = 'none';
				} else {
					if (document.getElementsByName('smsSkip') != undefined && document.getElementsByName('smsSkip') != null) {
						document.getElementsByName('smsSkip').value = "";
					}
					if ($('smsSkip') != undefined) {
						$('smsSkip').value = '';
					}
					$('ADD_SEC_MDCL_SEL_SMS').style.display = '';

					if ($('apclYn') != undefined) {
						$('apclYn').value = "N";
					}
					if ($('smsPw') != undefined) {
						$('smsPw').value = "";
					}
				}
			}

		}
	};
}();


pbk.common.userHighSec = function() {

	var callbackMessage4UserHighSecSvc = function(res, args){

		//pbk.ajax.parseData(res, true);
		opb.common.ajax.parseAjaxData_fnc(res, true);

		var data = eval('(' + res.responseText + ')');
		data.resResult = "SUCCESS";

		if (data.resResult == 'SUCCESS') { // 오류 검사
			opb.common.layerpopup.openMessage_fnc({
				isConfirm: false,
				title: '인증번호 요청',
				message: '등록하신 휴대폰으로 인증번호가 발송되었습니다.<br />(발신번호:1599-1111 / SMS 미수신시, 스팸등록이 되어 있을수 있으니 스팸메세지함 확인요망)',
				callback: function(e){
					if ($('smsPw') != undefined)	document.getElementById('smsPw').focus();
					if ($('apclYn') != undefined)	document.getElementById('apclYn').value='Y';
				}
			});
		}
		else {
			opb.common.layerpopup.openMessage_fnc({
				isConfirm: false,
				title: '인층번호요청 오류',
				message: data.errMsg,
				callback: function(e){
					return false;
				}
			});
		}
	};

	return {

		/*
         *  인증번호 요청
         *
         */
    	submitUserHighSecSvc : function(frmObj){

			frmObj.apclYn.value='N';

    		var jForm = new hana.JForm();
    		if (!jForm
    				.add(new hana.JText('서비스구분코드', frmObj.svcDvCd))
//			        .add(new hana.JNumber('휴대전화번호', frmObj.mbphNo))
					.validate()) {
    			return;
    		}

    		var params = new Array();
    		params.push({id: 'svcDvCd', value:frmObj.svcDvCd.value});       		// 서비스구분코드
//    		params.push({id: 'mbphNo', value:frmObj.mbphNo.value}); 	            // 휴대전화번호
    		var frmObj2 = form.createForm(params);

    		var url = opb.base.APPLICATION_CONTEXT_ROOT + "/certify/safe/wpcer467_02t_01.do";
    		var hanaAjax = new hana.JHanaAjax(null, true, true);
    		hanaAjax.ajaxSubmit(url, frmObj2, true, callbackMessage4UserHighSecSvc, 'UTF-8');
		},

		/**
		 * 개인정보변경 화면으로 이동
		 */
		moveModifyTel : function (){

			opb.common.layerpopup.openMessage_fnc({
               isConfirm: true,
               title    : '페이지이동',
               message  : '개인정보변경 페이지로 이동하시겠습니까?',
               callback : function(e)  {
                   if (e == true){     // 확인버튼 클릭시
					pbk.web.util.goMenu('/myhana/personal/wpcus401_01i.do');
                   }
               }
           });
		},
		
		/** 전자금융통합 프로젝트 Gap 반영 2016.01.06 시작 **/
		
		/**
		 * ARS 인증 - ARS 음성안내보기
		 */
		 showARSAnnouncement : function(){
			if($('_ARS_VRFC_INPUT_STATUS_').value != 'Y') {
				opb.common.layerpopup.openAlert_fnc("ARS 본인인증", "ARS인증요청을 먼저 하여주시기 바랍니다.");
				return false;
			}
			//opb.extJS.newPopup.open(pbk.APPLICATION_CONTEXT_ROOT + '/common/showARSAnnouncement.do', 'showARSAnnouncementPopUp', 495);
			opb.common.layerpopup.openLayer_fnc(pbk.APPLICATION_CONTEXT_ROOT + '/common/showARSAnnouncement.do', 'showARSAnnouncement', null, null, 495);
			
			 
		},
		
		/** 전자금융통합 프로젝트 Gap 반영 2016.01.06 종료 **/

		/*
		 *  추가보안매체 선택
		 *
		 * @param {Object} frmObj, form의 참조값
		 *
		 */
		choceHighSecMdcl : function(frmObj) {

			if ($('addUserHighSecChoMdclDv') == undefined) {
				opb.common.layerpopup.openAlert_fnc('추가보안매체', '추가보안매체 정보가 없습니다.');
				return;
			}

			var radioObj = document.getElementsByName("radio_addSecMdclDv");
			if (!radioObj) {
				opb.common.layerpopup.openAlert_fnc('추가보안매체', '추가보안매체 정보가 선택되지 않았습니다.');
				return;
			}

			// 사용할 보안 매체
			var addSecMdclDv = radiobox.getCheckedValue(radioObj);

			var _href = "";
			var _linkMsg = "";
			// 추가보안매체 DIV 태그 (매체추가시 추가)
			var ARR_ADD_SEC_MDCL_DIV_NM = new Array("ADD_SEC_MDCL_SEL_SMS","ADD_SEC_MDCL_SEL_BOT1","ADD_SEC_MDCL_DEPARTURE_INFO","ADD_SEC_MDCL_SEL_ARS");
			var addSecMdclDivNm = "";
			var defaultFocus = "";

			if (addSecMdclDv == "MDCL_SMS") { // 휴대폰SMS인증
				addSecMdclDivNm = ARR_ADD_SEC_MDCL_DIV_NM[0];
				defaultFocus = "smsPw";
			} else if (addSecMdclDv == "FACE_TRSC_CNFM") { // 1회용비밀번호
				addSecMdclDivNm = ARR_ADD_SEC_MDCL_DIV_NM[1];
				defaultFocus = "INSTANT_SEC_CERT_PWD";

			} else if(addSecMdclDv == "2_CHNL_SVC") { // 2채널인증
				_linkMsg = "2채널인증 서비스 신청화면으로 이동합니다.";

			} else if(addSecMdclDv == "DEVICE_RESERVE") { // 공인인증서 PC지정화면
				_linkMsg = "단말기 지정서비스 신청 화면으로 이동합니다.";

			} else if(addSecMdclDv == "ADD_CERT_MEAN_DEFAULT") { // DEFAULT 추가인증 미신청

			} else if(addSecMdclDv == "MDCL_SMS_DISABLED") { // 비지정 pc에서 이체성 거래사용 시
				_linkMsg = "안심이체 서비스 등록화면으로 이동합니다.";

			} else if(addSecMdclDv == "DEPARTURE_INFO") { 	// 출국정보 조회
				addSecMdclDivNm = ARR_ADD_SEC_MDCL_DIV_NM[2];
			
			}else if(addSecMdclDv == "ARS_2CHNL") { 	// ARS인증
				addSecMdclDivNm = ARR_ADD_SEC_MDCL_DIV_NM[3];
			}

			if (addSecMdclDv == "MDCL_SMS") {
				if ($('INSTANT_SEC_CERT_PWD') != undefined) {
					$('INSTANT_SEC_CERT_PWD').value = "";
				}
			}else if (addSecMdclDv == "DEPARTURE_INFO") {
				if ($('INSTANT_tmsgBodCtt') != undefined) {
					$('INSTANT_tmsgBodCtt').value = "";
				}
				
			}else if (addSecMdclDv == "ARS_2CHNL") {
				if ($('_ARS_INPUT_VIEW_') != undefined) {
					$('_ARS_INPUT_VIEW_').innerHTML = " ···· ";
				}
				
				if ($('_ARS_VRFC_INPUT_STATUS_') != undefined) {
					$('_ARS_VRFC_INPUT_STATUS_').value = "N";
				}
			
			}else {
				if ($('apclYn') != undefined) {
					$('apclYn').value = "N";
				}
				if ($('smsPw') != undefined) {
					$('smsPw').value = "";
				}
			}

			if (addSecMdclDv == "MDCL_SMS" || addSecMdclDv == "FACE_TRSC_CNFM" || addSecMdclDv == "DEPARTURE_INFO" || addSecMdclDv == "ADD_CERT_MEAN_DEFAULT" || addSecMdclDv == "ARS_2CHNL" ) { // 휴대폰SMS인증,1회용비밀번호,출국정보조회, 추가인증미신청, ARS 2채널 인증
				for (var i = 0; i < ARR_ADD_SEC_MDCL_DIV_NM.length ; i++) {
					if ($(ARR_ADD_SEC_MDCL_DIV_NM[i]) != undefined) {
						$(ARR_ADD_SEC_MDCL_DIV_NM[i]).style.display = 'none';
					}
				}


				if (addSecMdclDv != "ADD_CERT_MEAN_DEFAULT") {
					if ($(addSecMdclDivNm) != undefined) {
						$(addSecMdclDivNm).style.display = '';
					}
				}

				// pc사전지정 서비스 신청 시 sms 동의 초기화.
				if (addSecMdclDv == "MDCL_SMS") {
					if ($('agree_sms_chk') != undefined) {
						$('agree_sms_chk').checked = false;
					}
				}

				$('addUserHighSecChoMdclDv').value = addSecMdclDv;
				var oSendForm = form.createForm([
				                 				{id:'addUserHighSecChoMdclDv', value:addSecMdclDv}
				                 			]);

				// 사용자보안강화(추가보안매체선택 정보를 세션에 저장)
				var hanaAjax = new hana.JHanaAjax('', true, true);
				hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + '/common/comUserHighSecSessionInfo.do'
					, oSendForm
					, true
					, function(res, arg) {
						var resData = eval('(' + res.responseText + ')');

						if(resData.isSuccess == "true") {
							if (addSecMdclDv != "ADD_CERT_MEAN_DEFAULT") {
								if ($(defaultFocus) != undefined) {
									$(defaultFocus).focus();
								}
							}
						} else {
							//
						}
					} //[end] callback
					, 'EUC-KR');
			} else {
				opb.common.layerpopup.openMessage_fnc({
					isConfirm: true,
					title    : '알림',
					message  : _linkMsg,
					callback : function(e)  {
						if(e == true) {
							if(addSecMdclDv == "2_CHNL_SVC") { // 2채널인증
								pbk.web.util.goMenu("/myhana/prevent/wpcus402_78t.do");

							} else if(addSecMdclDv == "DEVICE_RESERVE") { // 공인인증서 PC지정화면
								pbk.web.util.goMenu("/myhana/prevent/wpcus402_51t.do");

							} else if(addSecMdclDv == "MDCL_SMS_DISABLED") { // 비지정 pc에서 이체성 거래사용 시 (안심이체서비스 신청으로)
								pbk.web.util.goMenu("/myhana/prevent/wpcus411_85t.do");
							}

						} {
							for (var i = 0; i < ARR_ADD_SEC_MDCL_DIV_NM.length ; i++) {
								if ($(ARR_ADD_SEC_MDCL_DIV_NM[i]) != undefined) {
									$(ARR_ADD_SEC_MDCL_DIV_NM[i]).style.display = 'none';
								}
							}
							// 취소시 디폴트 SMS인증에서 ARS 인증으로 변경..
							if ($(ARR_ADD_SEC_MDCL_DIV_NM[3]) != undefined) {
								
								radiobox.setCheckedValue(radioObj, "ARS_2CHNL");
								$(ARR_ADD_SEC_MDCL_DIV_NM[3]).style.display = '';

//								if ($('smsPw') != undefined) {
//									$('smsPw').focus();
//								}
								
								//서버에 휴대폰 SMS인증을 받겠다는 신호를보내기위하여 재귀함수로 호출.
								pbk.common.userHighSec.choceHighSecMdcl();
							}
						}
					},
	                clickObj: $('smsPw')
				});
				return;
			}
		},

		/*
		 *  1회용인증번호 오류횟수 5회 초과시 1회용인증순번 재조회
		 *
		 */
		searchInstantCertSeqNo : function() {

			var radioObj = document.getElementsByName("radio_addSecMdclDv");

			if (radioObj) {
				// 사용할 보안 매체
				var addSecMdclDv = radio.getCheckedValue(radioObj);

				// 1회용인증번호
				if (addSecMdclDv == "FACE_TRSC_CNFM") {

					$('addUserHighSecChoMdclDv').value = addSecMdclDv;

					var oSendForm = form.createForm([
					                 				{id:'addUserHighSecChoMdclDv', value:addSecMdclDv}
					                 				, {id:'searchInstantSecNoYn', value:'Y'}
					                 			]);

					// 사용자보안강화(추가보안매체선택 정보를 세션에 저장)
					var hanaAjax = new hana.JHanaAjax('', true, true);
					hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + '/common/comUserHighSecSessionInfo.do'
						, oSendForm
						, true
						, function(res, arg) {
							var resData = eval('(' + res.responseText + ')');

							if(resData.isSuccess == "true") {

								if ($('instantSecCertSeqNo') != undefined) {
									$('instantSecCertSeqNo').value = resData.INSTANT_CERT_SEQ_NO_VALUE;
								}
								if ($('INSTANT_CERT_SEQ_NO_SPAN_ID') != undefined) {
									$('INSTANT_CERT_SEQ_NO_SPAN_ID').innerHTML = resData.INSTANT_CERT_SEQ_NO_VALUE;
								}
								if ($('INSTANT_SEC_CERT_PWD') != undefined) {
									$('INSTANT_SEC_CERT_PWD').value = "";
									$('INSTANT_SEC_CERT_PWD').focus();
								}

								if (resData.INSTANT_CERT_SEQ_NO_VALUE == "0") {
									opb.common.layerpopup.openMessage_fnc({
										isConfirm: false
										, title: '안내'
										, message: '사용가능한 일회성인증번호가 없습니다.<BR/>가까운 영업점을 방문하여 신청하여 주시기 바랍니다.'
										, callback: function(e){
											if (radioObj) {
												//radioObj[3].disabled = true;
												if ($('_addSecMdclDv4_') != undefined) {
													$('_addSecMdclDv4_').disabled = true;
												}
											}
											if ($('ADD_SEC_MDCL_SEL_BOT1') != undefined) {
												$('ADD_SEC_MDCL_SEL_BOT1').style.display = 'none';
											}
											if (radioObj) {
												if ($('ADD_SEC_MDCL_SEL_SMS') != undefined) {
													radioObj[0].checked = true;
													$('ADD_SEC_MDCL_SEL_SMS').style.display = '';
													if ($('smsPw') != undefined) {
														$('smsPw').focus();
													}
												}
											}
					                    },
						                clickObj: null
									});
									return;
								}
							} else {
								opb.common.layerpopup.openMessage_fnc({
									isConfirm: false
									, title: '안내'
									, message: '일회성인증순번 조회중 오류가 발생했습니다.'
									, callback: null
									, clickObj: null
								});
								return;
							}
						} //[end] callback
						, 'EUC-KR');
				}

			}

		},

		isViewAgreeDepatureInfoPop : function(obj, oSendForm){

			if(oSendForm.isViewAgreePop.value != "Y"){
				opb.common.layerpopup.openAlert_fnc('고객정보동의', '동의내용을 확인하시기 바랍니다.');
				obj.checked = false;
				return false;
			}
		},

		agreeDepatureInfoPop : function(oSendForm, back_id){
			opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT + '/common/comUserHighSecAgreeDepatureInfoPopUp.do', 'AgreeDepatureInfoPopUp', null, null, back_id);

			oSendForm.isViewAgreePop.value = "Y";
		},

		selectDepatureInfo : function(oSendForm){

			if(!oSendForm.custInfoAgreeForMoj.checked){
				opb.common.layerpopup.openAlert_fnc('고객정보동의', '동의내용 확인 후 고객정보 제공동의 여부에 체크하여 주시기 바랍니다.');
				return false;
			}

			oSendForm.INSTANT_tmsgBodCtt.value = "" ;

			var hanaAjax = new hana.JHanaAjax('', true, true);
			hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + '/common/comUserHighSecDepatureInfo.do'
				, null
				, true
				, function(res, arg) {
					var resData = eval('(' + res.responseText + ')');

					if(resData.returnResult == "00000") {
						opb.common.layerpopup.openAlert_fnc('조회결과', '출국사실 여부가 확인되었습니다.');

						oSendForm.INSTANT_tmsgBodCtt.value = resData.returnResult ;

					}else if(resData.returnResult == "00001"){
						opb.common.layerpopup.openAlert_fnc('조회결과', '고객님의 출국조회 내역이 없습니다.');

						oSendForm.INSTANT_tmsgBodCtt.value = resData.returnResult ;
					}else {
						opb.common.layerpopup.openMessage_fnc({
							isConfirm: false
						   ,title: '에러'
						   ,message: '출국사실조회 중 에러가 발생하였습니다. \n' + resData.returnResult
						   ,callback: null
			               ,clickObj: null
						});
						return false;
					}
				} //[end] callback
				, 'EUC-KR');
		}

	};
}();



/*
 * 개인신용정보수집동의
 */
opb.common.agreeCustInfo = function(){
	return{

		/*
		 * 개인정보수집동의 여부_ 이미 필수고객정보에 동의 하였다면, 더이상 선택하지 못하게 한다.
		 */
		 checkAgreeDisable : function(changeAgreeResult289,gb){

			var oForm ="";

			if(gb == "deposit"){ //예금
				oForm = document.forms['agreeForm'];
			}else if(gb == "eplus_bankbook"){ //e플러스 통장 전환
				oForm = document.forms['posAccountList'];
			}

    		if(changeAgreeResult289 == "N")	return false;

    		for(var i=1; i < 6;i++){

    			if(i==2)continue;

    			eval('oForm.checkAgree'+i+'Y').checked = true;
    			eval('oForm.checkAgree'+i+'Y').disabled = true;
    			eval('oForm.checkAgree'+i+'N').disabled = true;
    		}
		 },

		downloadFiles : function(_fileName) {
			var BASE_DIR = "/resource/data/banking/deposit/";
			var oOpenedWindow = window.open(BASE_DIR + _fileName, "", "width=600, height=400, screenX=-100, screenY=-100, left=-10, top=-10 resizable=1");
			try {
				/* 자동로그아웃시간 연장 (20130306 자동으로 연장시키는 방법 사용 안함) */
//				opb.common.util.auto_logout_timer.renewAutoLogoutTime_fnc();
			}catch(e) {
			}

			//고객권리 안내문 클릭 여부
			if(document.getElementById('claimInfoYN') != undefined){
				document.getElementById('claimInfoYN').value = "Y";
			}

		}, //[end] downloadFiles

        CREDIT_INFOMATION : "wpcus_down.pdf"

	};//[end]return
}();



/*
 * 자물쇠카드 키 입력 및 인터랙션
 */

opb.common.keycardInput = function (bankType,inputType,data) {		
	/*
		bankType
	   	- pub : 개인뱅킹
		- eng : 영문뱅킹
		- opb : 오픈뱅킹

		inputType
		- num : 자물쇠카드 일련번호
		- pass : 카드번호

		data
		- 배열로 입력한다. 래핑을 위해서 2차배열로 함.
		- num 일 경우 (자물쇠카드 일련번호)
			[자물쇠카드 인풋박스 입력부분1,2,3] , [자물쇠카드 이미지 위 인풋박스 입력부분 1,2,3]
		- pass 일 경우 (자물쇠카드번호 앞/뒤)
			[자물쇠카드 인풋박스 입력부분1,2] , [자물쇠카드 이미지 위 인풋박스 입력부분 1,2,3] , [input[type=hidden]으로 복제할 1,2,3]


	 */

	var bankType
	,	inputType
	,	data

	,	handlerArray = []
	,	targetArray = []
	,	beCopiedArray = []

	,	target
	,	handler

	,	max
	;

	// 예외
	if (arguments.length < 2 || (inputType == 'pass' && data.length > 3)) {return false;}

	(function () {
	 	if (bankType == 'pub' || bankType == 'eng') {
			for (i in data[1]) {
				data[0].push(data[1][i]);
				data[1].push(data[0][i]);
			}	
		}
	})();

	handlerArray = data[0];
	targetArray = data[1];	
	if (data.length == '3') {
		beCopiedArray = data[2];
	}

	(handlerArray.length >= targetArray.length) ? (max = targetArray.length) : (max = handlerArray.length);


	//bgManipulation 핸들링..
	var keyCardPassArea = document.getElementById('keyCardPassArea');	//왼쪽 카드번호 입력 영역

	if (document.getElementById('keyCardNumArea')) {
		var keyCardNumArea = document.getElementById('keyCardNumArea');		//왼쪽 일련번호 입력 영역
		var blindInputMode = document.getElementById('blindInputMode');			
		var arrowInputMode = document.getElementById('arrowInputMode');			
	}
	

	if (inputType == 'num') {	//일련번호를 넣을 경우
		for (var i=0; i<max; i++) {		
			(function () {
				var handler = document.getElementById(handlerArray[i])
				,	target = document.getElementById(targetArray[i])
				;

				handler.onkeyup = function () {
					target.value = handler.value;
				};

				handler.onfocus = function () {
					handler.className = 'focusRed';
					target.className = 'focusRed';
					keyCardPassArea.className = 'bg_white keyCardPassArea';
					blindInputMode.className = 'blind_input_mode_top';
					arrowInputMode.className = 'arrow_input_mode_top';
				};

				handler.onblur = function () {
					target.className = '';
					handler.className = '';
					keyCardPassArea.className = 'keyCardPassArea'
					blindInputMode.className = 'blind_input_mode_none';
					arrowInputMode.className = 'arrow_input_mode_none';
						
				};
			})();	//anonymous for scope
		}	//for
	} else if (inputType == 'pass') {					//카드번호를 넣을 경우
		for (var i=0; i<max; i++) {		
			(function () {
				var handler = document.getElementById(handlerArray[i])
				,	target = document.getElementById(targetArray[i])
				,	beCopied = document.getElementById(beCopiedArray[i])
				;

				handler.onkeyup = function () {
					target.value = handler.value;
					beCopied.value = handler.value;
				};

				handler.onfocus = function () {
					handler.className = 'focusRed';
					target.className = 'focusRed';
					if (keyCardNumArea) {
						keyCardNumArea.className = 'bg_white keyCardNumArea';
						blindInputMode.className = 'blind_input_mode_bottom';
						arrowInputMode.className = 'arrow_input_mode_bottom';
					}
				};

				handler.onblur = function () {
					target.className = '';
					handler.className = '';
					if (keyCardNumArea) {
						keyCardNumArea.className = 'keyCardNumArea';
						blindInputMode.className = 'blind_input_mode_none';
						arrowInputMode.className = 'arrow_input_mode_none';
					}
				};
			})();	//anonymous for scope
		}	//for
	}	//if

};

/**
 * ARS인증 (안심거래서비스) 
 *
 * @since 
 */
pbk.common.safe = function() {
    return {

    };
}();

/**
 * 안심거래 ARS인증 
 *
 * @since 
 */
pbk.common.safe.ARSauthentication = function() {
	
    return {
    	submitARSrequstAction : function(lang) {
    		
    		var titleNm = 'ARS인증 요청';
    		var successMsg = 'ARS인증이 요청 되었습니다. ARS인증을 완료한 후 진행하시기 바랍니다.';
    		var errMsg = 'ARS인증 요청중  오류가 발생했습니다.';
    		
    		// 이미 인증번호 요청 중 상태 검증
			if ($('_ARS_VRFC_INPUT_STATUS_') != undefined && $('_ARS_VRFC_INPUT_STATUS_').value == "Y"){
				
				// S:정상(성공), F:디폴트(실패), W:인증대기
				var arsAppStatus = pbk.common.safe.ARSauthentication.submitARSresultCheckAction("Y");
				
				// 인증요청 & 검증완료
				if ("S" == arsAppStatus) {
					opb.common.layerpopup.openAlert_fnc(titleNm, "ARS 인증이 정상적으로 완료되었습니다.");
					return false;
				} 
				// 인증 요청 중
				else if ("W" == arsAppStatus) {
					opb.common.layerpopup.openAlert_fnc(titleNm, "이미 ARS인증이 요청 되었습니다. ARS인증을 완료한 후 진행하시기 바랍니다.");
					return false;
				}
			}
    		
			if ($('_ARS_REQ_PHONE_NUBMER_') != undefined && $('_ARS_REQ_PHONE_NUBMER_').disabled == true) {
				$('_ARS_REQ_PHONE_NUBMER_').disabled = false;
			}
    		
			var phoneCode = $('_ARS_REQ_PHONE_NUBMER_').value;
            var arsCertTrscDvCd = $('arsCertTrscDvCd').value;
            
            if (phoneCode == "") {
            	opb.common.layerpopup.openAlert_fnc("ARS인증", "ARS인증을 요청할 전화번호를 선택하여주시기 바랍니다.");

				return false;
            }
            var params = new Array();
    		params.push({id: 'certRqstTelNoTypCd', value:phoneCode}); 
    		params.push({id: 'arsCertTrscDvCd', value:arsCertTrscDvCd}); 
    		var frmObj2 = form.createForm(params);
    		
    		var arsUrl = '/common/arsApcNoReq.do';
    		
		    var hanaAjax = new hana.JHanaAjax(null, true, true);
			hanaAjax.ajaxSubmit(pbk.APPLICATION_CONTEXT_ROOT + arsUrl
			, frmObj2
			, true
			, function(res) {

				if ($('_ARS_VRFC_INPUT_STATUS_') != undefined){
					$('_ARS_VRFC_INPUT_STATUS_').value = 'N';
				}
				var _data = eval('(' + res.responseText + ')');	// Json타입으로 변환
				// 정상
				if (_data.arsApvNoResult == "SUCCESS") {
					try{
				    	if ($('_ARS_INPUT_VIEW_') != undefined){
							
				    		var arsApvNo = _data.arsApvNo;
							$('_ARS_INPUT_VIEW_').innerHTML = arsApvNo.substring(0,2)+ "·" + arsApvNo.substring(2,4);
						}
				    	
				    	if ($('_ARS_VRFC_INPUT_STATUS_') != undefined){
							$('_ARS_VRFC_INPUT_STATUS_').value = 'Y';
						}
				    	if ($('_ARS_REQ_PHONE_NUBMER_') != undefined) {
				    		$('_ARS_REQ_PHONE_NUBMER_').disabled = true;
		    			}
				    } catch(e) {}
				    
				    opb.common.layerpopup.openMessage_fnc({
						isConfirm : false,
						title     : titleNm,
						message   : successMsg,
						callback  : function(e){}
					});
				    
				} else {
					var _message = errMsg;
					if (_data.arsApvNoResult != "ERROR") {
						_message = _data.arsApvNoResult;
					}
					opb.common.layerpopup.openMessage_fnc({
						isConfirm : false,
						title     : titleNm,
						message   : _message,
						callback  : function(e){
							if ($('_ARS_INPUT_VIEW_') != undefined){
								$('_ARS_INPUT_VIEW_').innerHTML = '';
							}
						}
					});
				}
				
			} //[end] 
			, 'EUC-KR');
		},
		
		// ARS인증 결과 확인
		submitARSresultCheckAction : function (tempTran) {
            
			var params = new Array();
    		params.push({id: 'rsevTrscYn', value:tempTran}); 
    		var frmObj2 = form.createForm(params);
    		
    		var rtnCd = "F"; // S:정상(성공), F:디폴트(실패), W:인증대기
    		
		    var hanaAjax = new hana.JHanaAjax(null, true, true);
			hanaAjax.ajaxSubmit(pbk.APPLICATION_CONTEXT_ROOT + '/common/arsResultCheck.do'
			, frmObj2
			, false
			, function(res) {

				var _data = eval('(' + res.responseText + ')');	// Json타입으로 변환
				// 정상
				if (_data.arsApvNoResult == "SUCCESS") {
					rtnCd = "S";
				} else {
					if (_data.arsApvNoResultCode == "BEBK82142") {
						rtnCd =  "W";
					} else {
						rtnCd =  "F";
					}
				}
			} //[end] 
			, 'EUC-KR');
			
			return rtnCd;
		},
		
		// ARS 인증성공여부 확인
		safeTrscCheckByArs : function(lang) {
			
			var addSecMdclRadioObj = document.getElementsByName('radio_addSecMdclDv');
			if (addSecMdclRadioObj && (addSecMdclRadioObj.length > 0)) {
				return true;
			}
			
			if ($('_ARS_VRFC_INPUT_STATUS_') != undefined) {
				// 인증요청 중.
				if($('_ARS_VRFC_INPUT_STATUS_').value == "Y") {
					
					// S:정상(성공), F:디폴트(실패), W:인증대기
    				var arsAppStatus = pbk.common.safe.ARSauthentication.submitARSresultCheckAction("Y");
    				
    				// 검증실패
    				if ("F" == arsAppStatus) {
    					if ($('_ARS_VRFC_INPUT_STATUS_') != undefined){
    						$('_ARS_VRFC_INPUT_STATUS_').value = 'N';
    					}
    					if ($('_ARS_REQ_PHONE_NUBMER_') != undefined) {
				    		$('_ARS_REQ_PHONE_NUBMER_').disabled = false;
		    			}
    					opb.common.layerpopup.openAlert_fnc("ARS인증 요청", "ARS인증에 실패하였습니다. ARS인증을 재요청 하시기 바랍니다.");
    					return false;
    				} 
    				// 인증 요청 중
    				else if ("W" == arsAppStatus) {
    					opb.common.layerpopup.openAlert_fnc("ARS인증 요청", "이미 ARS인증이 요청 되었습니다. ARS인증을 완료한 후 진행하시기 바랍니다.");
    					return false;
    				}
				} 
				// 인증요청 안됨
				else {
					opb.common.layerpopup.openAlert_fnc('ARS 본인인증', 'ARS인증요청을 먼저 하여주시기 바랍니다.');
					return false;
					
				}
			}
			
			return true;
		}
		
    };
}();


/**
 * 스마트OTP/ TZOTP
 *
 * @since 
 */
var CONSTANT_OTP_LIMIT_TIME = 120;
var MOBILE_OTP_LIMIT_TIME = CONSTANT_OTP_LIMIT_TIME;
opb.common.smartOtp = function() {
    
    var SET_INTERVAL_NM;
    
    return {
    	
    	/**
		 * SMART/TZ OTP Opin번호 요청
		 *
		 * @since 2016.01.07 양균수
		 */
		requestOtpQuesRspsVlu : function() {
			
		    var hanaAjax = new hana.JHanaAjax(null, true, true);
			hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + '/common/otpQuesRspsVlu.do'
			, null
			, true
			, function(res) {
		
				var _data = eval('(' + res.responseText + ')');	// Json타입으로 변환
				// 정상
				if (_data.arsApvNoResult == "SUCCESS") {
				    
					if ($('_OTP_OPIN_VIEW_') != undefined)	$('_OTP_OPIN_VIEW_').innerHTML = _data.otpQuesRspsVlu;
					else if($('_OPIN_LIMIT_NUBMER_VIEW_') != undefined){
					    opb.common.smartOtp.initOtpTime();
					}
						
				}else{
					opb.common.layerpopup.openAlert_fnc("Error", "Opin번호 요청 중 에러가 발생하였습니다. \n" + _data.arsApvNoResult);
				}
				
			} //[end] 
			, 'EUC-KR');
		},
		
		/**
		 * 모바일OTP PUSH 재발송
		 * Opin번호 요청과 action 공유.  
		 * 
		 * @since 2021.09.16 양균수
		 */
		requestOtpPush : function() {
			var params = new Array();
    		params.push({id: 'reqType', value:'PUSH'}); 
    		var frmObj2 = form.createForm(params);
    		
		    var hanaAjax = new hana.JHanaAjax(null, true, true);
			hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + '/common/reqMOtpPush.do'
			, frmObj2
			, true
			, function(res) {
		
				var _data = eval('(' + res.responseText + ')');	// Json타입으로 변환
				// 정상
				if (_data.arsApvNoResult == "SUCCESS") {
				    
					opb.common.layerpopup.openAlert_fnc("모바일OTP", "모바일OTP 푸시(Push)가 발송되었습니다.");
						
				}else{
					opb.common.layerpopup.openAlert_fnc("Error", "PUSH 발송 중 에러가 발생하였습니다. \n" + _data.arsApvNoResult);
				}
				
			} //[end] 
			, 'EUC-KR');
		},
		
        /**
         * 1Q 모바일 OTP 남은시간 보여주기 초기화 및 시작...
         *
         * @since 2017.05.22 양균수
         */
        initOtpTime : function() {
            
            MOBILE_OTP_LIMIT_TIME = CONSTANT_OTP_LIMIT_TIME;
            clearTimeout(SET_INTERVAL_NM); 
            
            opb.common.smartOtp.startOtpTime();
            
        },
        
        /**
         * 1Q 모바일 OTP 남으시간 보여주기....재귀함수
         *
         * @since 2017.05.22 양균수
         */
        startOtpTime : function() {
            
            if ($('_OPIN_LIMIT_NUBMER_VIEW_') != undefined){
                $('_OPIN_LIMIT_NUBMER_VIEW_').innerHTML = MOBILE_OTP_LIMIT_TIME;
                if(MOBILE_OTP_LIMIT_TIME == 0){
                    return;
                }
                
                MOBILE_OTP_LIMIT_TIME = MOBILE_OTP_LIMIT_TIME - 1;
                SET_INTERVAL_NM = setTimeout("opb.common.smartOtp.startOtpTime()",1000);
                
            }
        }

    }
}();
