/*INISEAL:[tHUfI%2Bl%2BZbiCwy11t4R9IFQEvho%3D%0A]*/
/*****************************************************************************
 * 파일명 : pbk-common-popup-phone.js
 * 작성일 : 2008. 04. 19
 * 작성자 : ej
 * 설   명 : pbk-common.js를 기능별 분리.
 * ===========================================================================
 * 변경이력:
 * DATE				AUTHOR		DESCRIPTION
 * ---------------------------------------------------------------------------
 * 변경 이력은 이곳에 추가 합니다.
 *****************************************************************************/
try {
    if(null == pbk.common.popup || undefined == pbk.common.popup) {
         pbk.common.popup = {};
    }
} catch (e) {
    pbk.common.popup = {};
}
/**
* @author Jiho Park
* @since 2013.02.12
*/
pbk.common.verify = {};

pbk.common.verify.phone = function() {
	return {

		/**
		 * @author Jiho Park
		 * @since 2013.02.12
		 * 
		 * @param mbphEnprDvCd 휴대전화사업자구분코드
		 * @param mbphNo 휴대전화번호
		 * @param anonSessRegNoYN 주민사업자번호를 세션에서 읽어올지 여부
		 * @param anonSessRegNoName 세션에서 읽어올 주민사업자번호 명
		 * @param custNm 휴대폰명의자명
		 */
		sendSmsVerifyNo : function(mbphEnprDvCd, mbphNo, anonSessRegNoYN, anonSessRegNoName, custNm) {
       	var oSendForm = form.createForm([{id : 'mbphEnprDvCd', value : mbphEnprDvCd}
       									, {id : 'mbphNo', value : mbphNo}
       									, {id : 'anonSessRegNoYN', value : anonSessRegNoYN}
       									, {id : 'anonSessRegNoName', value : anonSessRegNoName}] );
    	if(custNm != null) {
    		form.createHiddenField(oSendForm,'custNm', custNm);
    	}
 
       	var hanaAjax = new hana.JHanaAjax('', true, true);
       	hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/sendVerifySms.do"
	            , oSendForm
	            , true
	            , function(res, args) {

       			try {
       				//console.log("res.responseText="+res.responseText);
       			} catch(e) {}
       		
       			

       			var _data = eval('(' + res.responseText + ')');
       			if("SUCCESS" == _data.RESULT) {
       					opb.common.layerpopup.openMessage_fnc({
							isConfirm: false,
							title: '인증번호 요청',
							message: '휴대폰번호 ' + mbphNo + '(으)로 인증번호가 발송되었습니다.'
						});
       			}
	            } //[end] callback
       	); //[end] ajaxSubmit

		}, //[end] sendSmsVerifyNo
	
		/**
		 * @author Jiho Park
		 * @since 2013.02.12
		 * 
		 * @param mbphEnprDvCd 휴대전화사업자구분코드
		 * @param mbphNo 휴대전화번호
		 * @param anonSessRegNoYN 주민사업자번호를 세션에서 읽어올지 여부
		 * @param anonSessRegNoName 세션에서 읽어올 주민사업자번호 명
		 * @param custNm 휴대폰명의자명
		 */
		sendSmsVerifyNo2 : function(oForm) {
		form.createHiddenField(oForm,'mbphEnprDvCd', oForm.newCom.value);
    	
       	var hanaAjax = new hana.JHanaAjax('', true, true);
       	hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/sendVerifySms2.do"
	            , oForm
	            , true
	            , function(res, args) {

       			try {
       				//console.log("res.responseText="+res.responseText);
       			} catch(e) {}
       		
       			

       			var _data = eval('(' + res.responseText + ')');
       			if("SUCCESS" == _data.RESULT) {
       					opb.common.layerpopup.openMessage_fnc({
							isConfirm: false,
							title: '인증번호 요청',
							message: '휴대폰번호 ' + _data.out.newNum + '(으)로 인증번호가 발송되었습니다.'
						});
       			}
	            } //[end] callback
       	); //[end] ajaxSubmit

		} //[end] sendSmsVerifyNo2

	}; //[end] return

}(); //[end] pbk.common.verify.phone
/**
 * 공통 - 팝업 - 휴대폰 변경
 * @author Oh,Ryunkyong 
 */
 /**
  * 공통 - 팝업 - 휴대폰 변경
  * @author Oh,Ryunkyong 
  */
 pbk.common.popup.phone = function() {
 	/**
 	 * private 
 	 */
 	var mobile1Obj = null; 
 	var mobile2Obj = null;
 	var mobile3Obj = null;
 	var mobile4Obj = null;
 	var mobile5Obj = null;
 	var mobile6Obj = null;
 	var mobile7Obj = null;
 	
 	/**
 	 * public
 	 */
 	return {
 		popupId : null,
 		backId : null,
 		/*
 		 * 휴대폰 변경창을 연다.
 		 * @param {String} popupId
 		 * @param {HTMLElement} mobile1El
 		 * @param {HTMLElement} mobile2El
 		 * @param {HTMLElement} mobile3El
 		 */
 		openPop :  function(popupId, backId, mobile1El, mobile2El, mobile3El, mobile4El, mbphSeqNo1, mbphRcgnNo, usrMbphNo) {
 			pbk.common.popup.phone.popupId = popupId;	
 			pbk.common.popup.phone.backId = backId;	
 			mobile1Obj = mobile1El;
 			mobile2Obj = mobile2El;
 			mobile3Obj = mbphSeqNo1;
 			mobile4Obj = mobile4El;
 			mobile5Obj = mbphRcgnNo;
 			mobile6Obj = mobile3El;
 			mobile7Obj = usrMbphNo;  //유저가 입력한 구휴대폰뒷번호
 			
//             pbk.extJS.popup.focusFlag.isElementFocus = true;
//             pbk.extJS.popup.focusFlag.focusElementId = 'oldNum';
             var paramUrl =  '/common/popup/phone_modify_pop.do?hp1='+mobile1El.value+'&hp2='+mobile2El.value+'&hp3='+mbphSeqNo1.value+'&hpCom='+mobile4El.value;
//             pbk.extJS.popup.isPrint = false;
             opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT+paramUrl, popupId, null, null, backId);
 		},
 		
 		
 		openPop2 :  function(formObj, popupId, backId, mobile1El) {
 			 
 			pbk.common.popup.phone.popupId = popupId;	
 			pbk.common.popup.phone.backId = backId;	

 			mobile1Obj = formObj;

// 			pbk.extJS.popup.focusFlag.isElementFocus = true;
//             pbk.extJS.popup.focusFlag.focusElementId = 'oldNum';
             var paramUrl =  '/common/popup/phone_modify_pop.do?hpCom='+mobile1El.value;
//             pbk.extJS.popup.isPrint = false;
             opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT+paramUrl, popupId, null, null, backId);
 		},
 		
 		validateForm2 : function(formObj){
 			
 			var jForm = new hana.JForm();
 			
 			if (!jForm.add(new hana.JNumber('구 휴대폰번호 뒤4자리',formObj.oldNum).nullable().limitLength(4,4))
 						.add(new hana.JSelect('휴대전화 앞번호',formObj.newNum1).nullable().range(1,1))
 						.add(new hana.JNumber('휴대전화 번호',formObj.newNum2).limitLength(3,4))
 						.add(new hana.JNumber('휴대전화 번호',formObj.newNum3).limitLength(4,4))
// 						.add(new hana.JNumber("자물쇠카드번호", formObj.firstPw,"firstPw").limitLength(2,2))
// 					  	.add(new hana.JNumber("자물쇠카드번호", formObj.lastPw,"lastPw").limitLength(2,2))
 						.validate()) {			
 				return;
 			}
 			
 			if(formObj.mbphAuthYn.value != "Y"){
 				if(formObj.mbphAuthYn.value == "N") 
 					opb.common.layerpopup.openAlert_fnc('휴대폰 본인인증 실패','휴대폰 본인인증에 실패하였습니다. 휴대폰번호를 확인하시기 바랍니다. ','mdphAutyFocusId');
 				else
 					opb.common.layerpopup.openAlert_fnc('휴대폰 본인인증 ','휴대폰 본인인증을 하시기 바랍니다. ','mdphAutyFocusId');
 		 		return null;
 			}
 			
 			// TODO 화면에서 체크를 안할경우는 이 부분을 삭제 한다.(구 휴대폰 검증)
 			// 구 휴대폰 검증  : 구 휴대폰 뒷번호가 맞는지 체크 한다.
 			//if(formObj.guHp3.value != formObj.oldNum.value){
                 //message.alert('휴대폰 번호 비교','구 휴대폰 번호가 일치하지 않습니다.');
 		 		//return;
 			//}
             
             //입력값 체크 서버에서 시작.			
             var url = opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/checkOldHpWithInHpAction.do";            
             var hanaAjax = new hana.JHanaAjax('', true, true);            
             //var sendForm = form.createForm([{id:'oldNum', value: formObj.oldNum.value}]);
             
             hanaAjax.ajaxSubmit( url, formObj, true, function(res, option){
             	            
                 var _data = eval('(' + res.responseText + ')');
                 if (_data.returnVal == 'Y'){                	
                 	mobile1Obj.oldNew.value = _data.oldNew;
                 		
                 	mobile1Obj.mbphEnprDvCd.value = formObj.newCom.value;
                 	mobile1Obj.mbphRcgnNo.value = formObj.newNum1.value;
                 	mobile1Obj.mbphOfcNo.value = formObj.newNum2.value;
                 	mobile1Obj.mbphSeqNo.value = formObj.newNum3.value;
                 	
                 	pbk.common.popup.phone.closePop();
                 } else {
                 
                	 opb.common.layerpopup.openAlert_fnc('휴대폰 번호 비교','구 휴대폰 번호가 일치하지 않습니다.');                    
                     return;
                 }
                  
                 }, 'euc-kr' );
             //입력값 서버에서 체크 끝
 			
 		},
 		
 		openPop3 :  function(formObj, popupId, backId, phoneType) {
 			 
 			pbk.common.popup.phone.popupId = popupId;	
 			pbk.common.popup.phone.backId = backId;	
 			
 			mobile1Obj = formObj;

// 			pbk.extJS.popup.focusFlag.isElementFocus = true;
//             pbk.extJS.popup.focusFlag.focusElementId = 'oldNum';
             var paramUrl =  '/common/popup/tel_modify_pop.do?phoneType='+phoneType;
//             pbk.extJS.popup.isPrint = false;
             opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT+paramUrl, popupId, null, null, backId);
 		},
 		
 		validateForm3 : function(formObj){
 			
 			var jForm = new hana.JForm();
 			
 			if (!jForm.add(new hana.JNumber('구 전화번호 뒤4자리',formObj.oldNum).limitLength(4,4))
 					.validate()) {			
 				return;
 			}
 			
 			if(formObj.phoneType.value == 'OFFICE'){
                if(!jForm.add(new hana.JSelect( '신규 직장전화 번호 앞자리',formObj.newNum1))
                         .add(new hana.JCurrency('신규 직장전화 번호 가운데자리',formObj.newNum2).limitLength(3,4))
                         .add(new hana.JCurrency('신규 직장전화 번호 뒷자리',formObj.newNum3).limitLength(4,4))
                         .validate()){
                    return false;
                }
                if(pbk.myhana.personal.info.phoneCheck(formObj.newNum2.value) == false){
					opb.common.layerpopup.openAlert_fnc('입력오류','신규 직장전화번호 가운데자리를 올바르게 입력하세요.','newNum2');
					return false;			
				}
 			}else{	
 			
 				if (!jForm.add(new hana.JSelect('신규 자택전화 번호 앞자리',formObj.newNum1).range(1,1))
 						.add(new hana.JNumber('신규 자택전화 번호 가운데자리',formObj.newNum2).limitLength(3,4))
 						.add(new hana.JNumber('신규 자택전화 번호 뒷자리',formObj.newNum3).limitLength(4,4))
 						.validate()) {			
 					
 					return;
 				}
 			}
 			
             //입력값 체크 서버에서 시작.			
             var url = opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/checkOldTelWithInTelAction.do";            
             var hanaAjax = new hana.JHanaAjax('', true, true);            
             //var sendForm = form.createForm([{id:'oldNum', value: formObj.oldNum.value}]);
             
             hanaAjax.ajaxSubmit( url, formObj, true, function(res, option){
             	            
                 var _data = eval('(' + res.responseText + ')');
                 if (_data.returnVal == 'Y'){                	
                 	
                 	if(formObj.phoneType.value == 'HOME'){
                 		mobile1Obj.telRgnNo.value = formObj.newNum1.value;
                     	mobile1Obj.telOfcNo.value = formObj.newNum2.value;
                     	mobile1Obj.telSeqNo.value = formObj.newNum3.value;
                 	} else if(formObj.phoneType.value == 'OFFICE'){
                 		mobile1Obj.telRgnNo2.value = formObj.newNum1.value;
                     	mobile1Obj.telOfcNo2.value = formObj.newNum2.value;
                     	mobile1Obj.telSeqNo2.value = formObj.newNum3.value;
                     	
                     	mobile1Obj.telExtNo2.value = formObj.newNum4.value;
                 	}
                 	
                 	pbk.common.popup.phone.closePop();
                 } else {
                 
                	 opb.common.layerpopup.openAlert_fnc('전화 번호 비교','구 전화 번호가 일치하지 않습니다.','backforcusId');                    
                     return;
                 }
                  
                 }, 'euc-kr' );
             //입력값 서버에서 체크 끝
 			
 		},
 		/** 전자금융통합 프로젝트 Gap 반영 2016.03.03 시작 **/
 		//본인인증 약관 팝업 
        popTelAgree : function(){
    		var url = opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/opb_telecom_view.do";
    		opb.common.layerpopup.openLayer_fnc(url, 'OpbMobilePhoneTelAgreePopup', null, null, 'popTelAgree');
			   	 
       },
       
       	popPrivateAgree : function(){
   		var url = opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/opb_private_view.do";
			opb.common.layerpopup.openLayer_fnc(url, 'OpbMobilePhonePrivateAgreePopup', null, null, 'popPrivateAgree');
       },
       
      	popPrivateAgree01 : function(){
  		var url = opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/opb_private_view01.do";
			opb.common.layerpopup.openLayer_fnc(url, 'OpbMobilePhonePrivateAgreePopup01', null, null, 'popPrivateAgree01');
       },
       
       	popServiceAgree : function(){
     	var url = opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/opb_service_view.do";
   			opb.common.layerpopup.openLayer_fnc(url, 'OpbMobilePhoneServiceAgreePopup', null, null, 'popServiceAgree');
       },
          
        popPrivateAgree02 : function(){
    	var url = opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/opb_private_view02.do";
  			opb.common.layerpopup.openLayer_fnc(url, 'OpbMobilePhonePrivateAgreePopup02', null, null, 'popPrivateAgree02');
       },   
       
       /** 전자금융통합 프로젝트 Gap 반영 2016.03.03 종료 **/
       
 		/**구 휴대폰번호 검증 후. 구/신 핸드폰번호 동일여부값과 입력 핸드폰값을 parent에 set. 
		 * hidden 처리 하지 않는다. (보안취약성에 따른 수정) - KOY 2010.09.15
		 * 
		 * @param {HTMLForm} formObj
		 */
		phoneValidateForm : function(formObj) {
			/** 전자금융통합 프로젝트 Gap 반영 2016.03.03 시작 **/
			//약관 동의 체크
 			var _checkAgree01 = radiobox.getCheckedValue(formObj.CheckAgree01);
 			var _checkAgree02 = radiobox.getCheckedValue(formObj.CheckAgree02);
 			var _checkAgree03 = radiobox.getCheckedValue(formObj.CheckAgree03);
 			
 			if (_checkAgree01 != "Y"||_checkAgree02 != "Y"||_checkAgree03 != "Y" ) {
 				opb.common.layerpopup.openMessage_fnc({
						isConfirm: false
						,title: '확인'
						, message: '약관에 동의하셔야 진행이 가능합니다.'
						, callback: null
					});
					return;
 				}
 			/** 전자금융통합 프로젝트 Gap 반영 2016.03.03 종료 **/
			
			var title = "";
			if(formObj.telGbn.value == 'mobile')		title = "휴대전화";	
			else if(formObj.telGbn.value == 'home') 	title = "자택전화";
			else if(formObj.telGbn.value == 'office')	title = "직장전화";
				
			var jForm = new hana.JForm();
			if (!jForm.add(new hana.JNumber('구 '+title+' 뒤4자리',formObj.oldNum).nullable().limitLength(4,4))
						.add(new hana.JSelect(title+' 앞번호',formObj.newNum1).nullable().range(1,1))
						.add(new hana.JNumber(title+' 번호',formObj.newNum2).limitLength(3,4))
						.add(new hana.JNumber(title+' 번호',formObj.newNum3).limitLength(4,4))
						.validate()) {
				return;
			}
			
			if(formObj.telGbn.value == 'mobile') {
				if(formObj.mbleCertNo.value == '') {
					opb.common.layerpopup.openAlert_fnc('오류', '휴대폰에 수신된 인증번호를 입력해 주십시요.');
					return;
				}
			}
			if(formObj.newCom != undefined){
				form.createHiddenField(formObj, 'mbphEnprDvCd', formObj.newCom.value);
			}
			form.createHiddenField(formObj, 'mbphNo', formObj.newNum1.value + '' + formObj.newNum2.value + '' + formObj.newNum3.value);
			
            var url = opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/checkOldHpWithInHpAction.do";
            var hanaAjax = new hana.JHanaAjax('', true, true);
                
            hanaAjax.ajaxSubmit( url, formObj, true, function(res, option){
                var _data = eval('(' + res.responseText + ')');
                if (_data.returnVal == 'Y'){
                	
                	if(formObj.telGbn.value == 'mobile') {

                		mobile1Obj.oldNew.value = _data.oldNew;
                		mobile1Obj.mbphEnprDvCd.value = formObj.newCom.value;
	                	mobile1Obj.mbphRcgnNo.value = formObj.newNum1.value;
	                	mobile1Obj.mbphOfcNo.value = formObj.newNum2.value;
	                	mobile1Obj.mbphSeqNo.value = formObj.newNum3.value;
	                	
	                	opb.common.layerpopup.openMessage_fnc({
            				isConfirm: false
                            , title: '하나은행'
                            , message: '휴대폰 본인인증을 완료 하였습니다.'
            				, callback : function() {
            					
            					var securFields = '';
            					$j(formObj).find(':input[data-enc]').each(function(idx) {
            						
            						if(idx == 0) {
            							securFields += $j(this).attr('id');
            						} else {
            							securFields += ','+$j(this).attr('id');
            						}
            					});
            					//console.log('securFields='+securFields);
            					
            					if(securFields != null && securFields != '') {
            					
            		        		var hidd = document.createElement('input');
            		        		hidd.type = 'hidden';
            		        		hidd.name = 'securFields';
            		        		hidd.id = 'securFields';
            		        		hidd.value = securFields;
            		        		formObj.appendChild(hidd);
            						
            					    var hanaAjax = new hana.JHanaAjax('', true, true);
            				       	hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/storePhoneNum.do"
            					            , formObj
            					            , true
            					            , function(res, args) {
            				
            					       			try {
            					       				//console.log("res.responseText="+res.responseText);
            					       			} catch(e) {}
            				
            					            } //[end] callback
            				       	); //[end] ajaxSubmit
            					}
            					
    	                		pbk.common.popup.phone.closePop();
                        	}
            			});
                        return;

                	} else if(formObj.telGbn.value == 'home') {

                		mobile1Obj.homeOldNew.value = _data.oldNew;
                		mobile1Obj.telRgnNo.value = formObj.newNum1.value;
	                	mobile1Obj.telOfcNo.value = formObj.newNum2.value;
	                	mobile1Obj.telSeqNo.value = formObj.newNum3.value;
	                	
	                	pbk.common.popup.phone.closePop();

                	} else if(formObj.telGbn.value == 'office') {

                		mobile1Obj.officeOldNew.value = _data.oldNew;
                		mobile1Obj.telRgnNo2.value = formObj.newNum1.value;
	                	mobile1Obj.telOfcNo2.value = formObj.newNum2.value;
	                	mobile1Obj.telSeqNo2.value = formObj.newNum3.value;
	                	
	                	pbk.common.popup.phone.closePop();
                	} else {
                		opb.common.layerpopup.openMessage_fnc({
                            title: '오류'
                            , message: '알 수 없는 변경유형 입니다. 고객센터에 문의하세요.'
                            , callback : function() {
    	                		pbk.common.popup.phone.closePop();
                        	}
                        });
                        return;
                	}
                } else {
                	opb.common.layerpopup.openAlert_fnc(title+' 번호 비교','구 '+title+' 번호가 일치하지 않습니다.');
                    return;
                }
                 
                }, 'euc-kr' );
		},
		/**
		 * @author Jiho Park
		 * @since 2012.07.11
		 */
		openPopupAuthPhoneNumberCheckOldNum : function(oForm, isNew) {
			
			var jForm = new hana.JForm();
			
			if(!isNew){
				if (!jForm.add(new hana.JNumber('구 휴대전화 뒤4자리', oForm.oldNum).nullable().limitLength(4,4)).validate()) {
					return false;
				}
			}
			
			if (!jForm.add(new hana.JSelect('휴대전화 앞번호',oForm.newNum1))
						.add(new hana.JNumber('휴대전화 번호',oForm.newNum2).limitLength(3,4))
						.add(new hana.JNumber('휴대전화 번호',oForm.newNum3).limitLength(4,4))
						.validate()) {
				return;
			}

			pbk.common.verify.phone.sendSmsVerifyNo2(oForm);
		},
 		/**
 		 * @author Jiho Park
 		 * @since 2012.07.11
 		 */
 		openPopupAuthPhoneNumber : function(oForm) {
 			
 			
 			var jForm = new hana.JForm();
 			
 			if (!jForm.add(new hana.JNumber('구 휴대전화 뒤4자리 ',oForm.oldNum).nullable().limitLength(4,4))
 						.add(new hana.JSelect('신규 휴대폰 번호 앞자리',oForm.newNum1).nullable().range(1,1))
 						.add(new hana.JNumber('신규 휴대폰 번호 가운데자리',oForm.newNum2).limitLength(3,4))
 						.add(new hana.JNumber('신규 휴대폰 번호 뒷자리 ',oForm.newNum3).limitLength(4,4))
 						.validate()) {			
 				return;
 			}
 			
 			opb.apps.common.util.openAuthPhoneNumber_fnc(oForm, "N");
 		},
 		/**
		 * 휴대폰번호, 직장전화번호, 자택전화번호 변경창을 연다
		 */
		phoneModyOpenPop : function(formObj, popupId, mobile1El, backId) {

			pbk.common.popup.phone.popupId = popupId;	
			pbk.common.popup.phone.backId = backId;	
 			
 			mobile1Obj = formObj;
            var paramUrl = '/common/popup/phone_modify_pop.do?hpCom='+mobile1El.value+'&telGbn='+popupId;
            opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT+paramUrl, popupId, null, null, backId);
		},
		resetMbphAuthYn : function(oForm) {
			oForm.mbphAuthYn.value = "N";
		},
 		closePop : function(){			
 			opb.common.layerpopup.closeLayer_fnc(pbk.common.popup.phone.popupId);
 			pbk.common.popup.phone.popupId = null;
 		},
 		
 		/**
		 * 휴대폰번호, 직장전화번호, 자택전화번호 변경창을 연다_2014version
		 */
		phoneModyOpenPop2014 : function(formObj, backId, changeTarget) {
			
			var popupId = 'changePhonePopup2014';
			pbk.common.popup.phone.popupId = popupId;	
			pbk.common.popup.phone.backId = backId;	
			mobile1Obj = formObj;
           
           var paramUrl = '/common/popup/phone_modify_pop_new_01.do?changeTarget='+changeTarget;
           
           opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT+paramUrl, popupId, null, null, backId);
		},
		
		selectAuthentication : function(type){
			var hanaAjax = new hana.JHanaAjax("PhonePopContent", true, true);
			
			if("HP" == type){
				hanaAjax.ajaxCommSubmit(pbk.APPLICATION_CONTEXT_ROOT + '/common/popup/phone_modify_pop_new_02_01.do', null);
				
			}else if("ARS" == type){
				hanaAjax.ajaxCommSubmit(pbk.APPLICATION_CONTEXT_ROOT + '/common/popup/phone_modify_pop_new_02_02.do', null);
			}else
				return null;
    		
		},
		
		checkSMSValidateForm : function(formObj) {
			
			var _labelTelecom = '';
			var _labelFirstDigit = '';
			var _labelPhoneNumber1 = '';
			var _labelPhoneNumber2= '';
			
			_labelTelecom = '통신사';
			_labelFirstDigit = '휴대전화 앞번호';
			_labelPhoneNumber1 = '휴대전화 번호';
			_labelPhoneNumber2= '휴대전화 번호';
				
			var jForm = new hana.JForm();
			if (!jForm.add(new hana.JSelect(_labelFirstDigit,formObj.newCom).range(1,1))
						.add(new hana.JSelect(_labelFirstDigit,formObj.newNum1).range(1,1))
						.add(new hana.JNumber(_labelPhoneNumber1,formObj.newNum2).limitLength(3,4))
						.add(new hana.JNumber(_labelPhoneNumber2,formObj.newNum3).limitLength(4,4))
						.validate()) {
				return;
			}
			
			if(formObj.mbleCertNo.value == '') {
				opb.common.layerpopup.openAlert_fnc('휴대폰 본인인증', '휴대폰에 수신된 인증번호를 입력해 주십시요.');
				return;
			}
			
			if(formObj.newCom != undefined){
				form.createHiddenField(formObj, 'mbphEnprDvCd', formObj.newCom.value);
			}else{
				form.createHiddenField(formObj, 'mbphEnprDvCd', '');
			}
			
			form.createHiddenField(formObj, 'mbphNo', formObj.newNum1.value + '' + formObj.newNum2.value + '' + formObj.newNum3.value);
			
            var url = pbk.APPLICATION_CONTEXT_ROOT + "/common/popup/checkHpSMSAction.do";
            var hanaAjax = new hana.JHanaAjax('', true, true);
                
            hanaAjax.ajaxSubmit( url, formObj, true, function(res, option){
                var _data = eval('(' + res.responseText + ')');
                if (_data.returnVal == 'Y'){

            		mobile1Obj.mbphEnprDvCd.value = formObj.newCom.value;
                	mobile1Obj.mbphRcgnNo.value = formObj.newNum1.value;
                	mobile1Obj.mbphOfcNo.value = formObj.newNum2.value;
                	mobile1Obj.mbphSeqNo.value = formObj.newNum3.value;
                	
                	opb.common.layerpopup.openMessage_fnc({
        				isConfirm: false
                        , title: '하나은행'
                        , message: '휴대폰 본인인증을 완료 하였습니다.'
        				, callback : function() {
        							pbk.common.popup.phone.goNewModifySubmit03();
        						
                    	}
        			});
                    return;

                } else {
                	opb.common.layerpopup.openAlert_fnc('휴대폰 본인인증에 실패하였습니다. 다시 시도하여 주시기 바랍니다.');
                    return;
                }
                 
            }, 'euc-kr' );
		},
		
		checkARSValidateForm : function(formObj) {
			if(formObj._ARS_VRFC_INPUT_STATUS_.value != 'Y') {
				opb.common.layerpopup.openAlert_fnc('ARS 본인인증', 'ARS인증요청을 먼저 하여주시기 바랍니다.');
				return;
			}
			
			var isResult = false;
			
			isResult = pbk.common.ARSauthentication.submitARSresultCheckAction("N");
			
			if(isResult)	pbk.common.popup.phone.goNewModifySubmit03();
			
		},
		
		checkOVERValidateForm : function(formObj) {
			if(formObj.INSTANT_tmsgBodCtt.value == '') {
				opb.common.layerpopup.openAlert_fnc('해외체류자 인증', '출국 사실조회를 먼저 하여주시기 바랍니다.');
				return;
			}else if(formObj.INSTANT_tmsgBodCtt.value == '00001'){
				opb.common.layerpopup.openAlert_fnc('해외체류자 인증', '고객님의 출국조회 내역이 없습니다. 다른 인증수단을 이용해 주십시오.');
				return;
			}else if(formObj.INSTANT_tmsgBodCtt.value == '00000'){
				pbk.common.popup.phone.goNewModifySubmit03(formObj);
			}
			
			
		},
		
		goNewModifySubmit03 : function(formObj){
			var hanaAjax = new hana.JHanaAjax("PhonePopContent", true, true);
			hanaAjax.ajaxCommSubmit(pbk.APPLICATION_CONTEXT_ROOT + '/common/popup/phone_modify_pop_new_03.do', formObj);
    		
		},
		
		settingPhoneForm : function(formObj) {
			
			var isHomeChange = false;
			var isOfficeChange = false;
			var isHPChange = false;
			
			var jForm = new hana.JForm();
			//자택전화
			if(formObj.homeNewNum1 != undefined && formObj.homeNewNum1.value != ""){
				if (!jForm.add(new hana.JNumber('자택전화 번호',formObj.homeNewNum2).limitLength(3,4))
						.add(new hana.JNumber('자택전화 번호',formObj.homeNewNum3).limitLength(4,4))
						.validate()) {
					return false;
				}
				
				
				isHomeChange = true;
			}
			
			//직장전화
			if(formObj.officeNewNum1 != undefined && formObj.officeNewNum1.value != ""){
				if (!jForm.add(new hana.JNumber('직장전화 번호',formObj.officeNewNum2).limitLength(3,4))
						.add(new hana.JNumber('직장전화 번호',formObj.officeNewNum3).limitLength(4,4))
						.validate()) {
					return false;
				}
				
				isOfficeChange = true;
			}
			
			//휴대전화
			if(formObj.hpNewNum1 != undefined && formObj.hpNewNum1.value != ""){
				if (!jForm.add(new hana.JSelect('통신사',formObj.hpNewCom).range(1,1))
						.add(new hana.JSelect('휴대전화 앞번호',formObj.hpNewCom).range(1,1))
						.add(new hana.JNumber('휴대전화 번호',formObj.hpNewNum2).limitLength(3,4))
						.add(new hana.JNumber('휴대전화 번호',formObj.hpNewNum3).limitLength(4,4))
						.validate()) {
					return false;
				}
				
				isHPChange = true;
			}
			
			
			if(isHPChange) {

        		mobile1Obj.oldNew.value = "N";
        		mobile1Obj.mbphEnprDvCd.value = formObj.hpNewCom.value;
            	mobile1Obj.mbphRcgnNo.value = formObj.hpNewNum1.value;
            	mobile1Obj.mbphOfcNo.value = formObj.hpNewNum2.value;
            	mobile1Obj.mbphSeqNo.value = formObj.hpNewNum3.value;

            	$j("#transkey_Tk_mbphSeqNo").each(function(idx) {
            		mobile1Obj.transkey_Tk_mbphSeqNo.value = formObj.transkey_Tk_hpNewNum3.value;
            		mobile1Obj.transkey_hMac_Tk_mbphSeqNo.value = formObj.transkey_hMac_Tk_hpNewNum3.value;
            		//console.log('mobile='+mobile1Obj.mbphSeqNo.value+">>"+mobile1Obj.transkey_Tk_mbphSeqNo.value+":"+mobile1Obj.transkey_hMac_Tk_mbphSeqNo.value);
            	});
            	
        	}

			if(isHomeChange) {

        		mobile1Obj.homeOldNew.value = "N";
        		mobile1Obj.telRgnNo.value = formObj.homeNewNum1.value;
        		mobile1Obj.telOfcNo.value = formObj.homeNewNum2.value;
        		mobile1Obj.telSeqNo.value = formObj.homeNewNum3.value;
        		
        		//자택전화번호 삭제 버튼 클릭여부
        		if(mobile1Obj.deleteHomePhoneCheck != undefined){
        			mobile1Obj.deleteHomePhoneCheck.value = "N";
        		}

        	}
			
			if(isOfficeChange) {

        		mobile1Obj.officeOldNew.value = "N";
        		mobile1Obj.telRgnNo2.value = formObj.officeNewNum1.value;
        		mobile1Obj.telOfcNo2.value = formObj.officeNewNum2.value;
        		mobile1Obj.telSeqNo2.value = formObj.officeNewNum3.value;
            	$j("#transkey_Tk_telSeqNo2").each(function(idx) {
            		mobile1Obj.transkey_Tk_telSeqNo2.value = formObj.transkey_Tk_officeNewNum3.value;
            		mobile1Obj.transkey_hMac_Tk_telSeqNo2.value = formObj.transkey_hMac_Tk_officeNewNum3.value;
            		//console.log('mobile='+mobile1Obj.telSeqNo2.value+">>"+mobile1Obj.transkey_Tk_telSeqNo2.value+":"+mobile1Obj.transkey_hMac_Tk_telSeqNo2.value);
            	});
            	
        		//직장전화번호 삭제 버튼 클릭여부
        		if(mobile1Obj.deleteOfficePhoneCheck != undefined){
        			mobile1Obj.deleteOfficePhoneCheck.value = "N";
        		}
            	
        	}
			
			if(formObj.officeNewNum4 != undefined && formObj.officeNewNum4.value != ""){
				mobile1Obj.telExtNo2.value = formObj.officeNewNum4.value;
			}
			
			//해외전화번호
			mobile1Obj.ovrsTelNo.value = formObj.newOvrsTelNo.value;

			var securFields = '';
			$j(formObj).find(':input[data-enc]').each(function(idx) {
				
				if(idx == 0) {
					securFields += $j(this).attr('id');
				} else {
					securFields += ','+$j(this).attr('id');
				}
			});
			//console.log('securFields='+securFields);
			
			if(securFields != null && securFields != '') {
			
        		var hidd = document.createElement('input');
        		hidd.type = 'hidden';
        		hidd.name = 'securFields';
        		hidd.id = 'securFields';
        		hidd.value = securFields;
        		formObj.appendChild(hidd);
				
			    var hanaAjax = new hana.JHanaAjax('', true, true);
		       	hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/storePhoneNum.do"
			            , formObj
			            , true
			            , function(res, args) {
		
			       			try {
			       				//console.log("res.responseText="+res.responseText);
			       			} catch(e) {}
		
			            } //[end] callback
		       	); //[end] ajaxSubmit
			}

			pbk.common.popup.phone.closePop();
			
		}
		
 	};
 }();
