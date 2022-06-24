/*INISEAL:[RXPIZ2AdVCAssuTFIz1p9r9yGKM%3D%0A]*/
/*****************************************************************************
 * 파일명 : opb-common-nickname-pop.js
 * 작성일 : 2012. 11. 7
 * 작성자 :
 * 설   명 : 계좌별칭관리 팝업javascript 정의 파일
 * 2단계까지의 namespace는 pbk-package.js 에 정의 되어 있다.
 * ===========================================================================
 * 변경이력:
 * DATE             AUTHOR      DESCRIPTION
 * ---------------------------------------------------------------------------
 * 변경 이력은 이곳에 추가 합니다.
 *****************************************************************************/


/********************************************
 * 공통 START
/********************************************/
/**
 * 계좌별칭관리팝업 script
 *
 * @author Jiho Park
 * @since 2008.02.05
 */
pbk.common.inquiry = function(){
    // private variables
    var hanaBodyDiv = 'hanaBodyDiv';

    // private function
    var callbackInputFronAction = function(res, args) {
        //opb.common.ajax.parseAjaxData_fnc(res, true);

        var data = eval('(' + res.responseText + '  )');

        if (data.acctAlnm == null) {
            data.acctAlnm = "";
        }
        document.getElementById("rmrk1").value = data.acctAlnm;
        document.getElementById("rmrk2").value = data.acctAlnm;
    };

	return{
		
		//계좌상세페이지 뛰웠는지 여부
		callBackFncYn: null,
		
		//리프레쉬 유무 
		refreshYn : null,
		
		//대출계좌여부
		loanAcctNoYn : null,
		
		//대출계좌번호 + "&" + 실행번호 
		loanAcctInfo : null,
		
		//컨텐츠콜백펑션
		saveCallBackFnc : null,
		
		//팝업창 콜백펑션
		savePopCallback : null,				
		      	
        // 계좌정보보기팝업
        openPopAccountInfo : function(formObj, backObjID, callbackFnc){

			pbk.common.inquiry.saveCallBackFnc = callbackFnc;

			//var url = "/inquiry/account/wpdep406_17p.do";
			
			//리뉴얼로 계좌정보보기 팝업 변경
			var url = "/inquiry/account/wpdep406_17p_n.do";
			opb.common.layerpopup.openLayer_fnc(url, 'accountInfoLayer', null, formObj, backObjID);
        },
        
        /**
         * 해지예상 조회 페이지로 이동
         */
        goCloseList : function(acctNo) {
        	var oSendForm = form.createForm([{
 	            id: 'acctNo',
 	            value: acctNo
    	 	}]);
        	opb.common.layerpopup.closeLayer_fnc('accountInfoLayer');
        	pbk.web.util.goMenu('/inquiry/account/wpdep406_24i_01.do', oSendForm);
            //form.createFormSubmit([{id:"acctNo",value:acctNo}],"/inquiry/index.do?menuItemId=wpdep406_24i_01","/inquiry/account/wpdep406_24i_01.do");
        },
        
        //해지예상 폼으로 받을때
        goCloseListParam: function(acctNo, curCd) {
        	var oSendForm = form.createForm([
        	    {id:'acctNo',value:acctNo}, 
        	    {id:'curCd',value:curCd}
        	]);
        	
        	opb.common.layerpopup.closeLayer_fnc('accountInfoLayer');
//        	pbk.web.util.goMenu('/inquiry/account/wpdep406_24i_01.do', oSendForm);
        	// 개인뱅킹 리뉴얼 LNB 메뉴 표시를 위한 refresh 적용
        	pbk.web.util.goRefreshMenu('/inquiry/account/wpdep406_24i_01.do', oSendForm);

        },
        
        //타이틀로 별칭열때
        openPopAccountNickname: function(callBackFncType, backObjID){

            pbk.common.inquiry.callBackFncYn = "N"; // 팝업창여부 셋팅
            pbk.common.inquiry.saveCallBackFnc = callBackFncType;

            var url = opb.base.APPLICATION_CONTEXT_ROOT + "/inquiry/account/wpdep406_09p.do";
            opb.common.layerpopup.openLayer_fnc(url, 'accountNicknameLayer', null, null, backObjID);
         },
       
         // 2012.11.13 나 기 민  : 계좌별칭 변경!!
         openPopAccountNickname2 : function(acctNo, parentObjID, back_id, callBack, curCd){        	 
        	 pbk.common.inquiry.refreshYn = "N";   
        	 
        	 if (parentObjID == "wplon444_03p")
        	 {
        		 pbk.common.inquiry.loanAcctNoYn = "Y";   // 대출통장 표기!!
        	 }
        	 if (null != callBack && callBack != undefined){
        		 pbk.common.inquiry.callBackFncYn = "N";
        		 pbk.common.inquiry.saveCallBackFnc = callBack ;
        	 }else{
        		 pbk.common.inquiry.callBackFncYn = "Y"; // 계좌정보보기 창에서 수행할 경우!
        	 }        	               
        	 
        	 var formObj = form.createForm([{id:"acctNo",value:acctNo}]);
        	 var url = opb.base.APPLICATION_CONTEXT_ROOT + "/inquiry/account/wpdep406_09p_03.do";

        	 if (null != parentObjID && parentObjID != undefined){
        		 opb.common.layerpopup.openLayer_fnc(url, 'accountNicknameLayer', parentObjID, formObj, back_id, function() {pbk.common.inquiry.handleAccountNickname(acctNo, curCd);});
        	 }else{
        		 opb.common.layerpopup.openLayer_fnc(url, 'accountNicknameLayer', null, formObj, back_id, function() {pbk.common.inquiry.handleAccountNickname(acctNo, curCd);});
        	 }            
         },
         
		 /**
         *  별칭 저장하기
         */
         createAccountNickname: function(formObj, click_obj) {
        	 
        	 if(click_obj == null || (typeof click_obj) == 'undefined' || click_obj == '') {
        		 click_obj = 'rmrk1';
        	 }

             var jForm = new hana.JForm();
             if (formObj.acctNo.value == null || formObj.acctNo.value == ""  ){
            	 formObj.acctNo.focus();
            	 opb.common.layerpopup.openAlert_fnc("계좌번호 선택오류","계좌번호를 선택해 주세요.");
                 return;
             }

             if (formObj.rmrk1.value.length > 12) {
            	 formObj.rmrk1.focus();
            	 opb.common.layerpopup.openAlert_fnc("계좌별칭오류","계좌별칭은 12자 이하여야 합니다.");
                 return;
               }
             if(formObj.rmrk2.value==formObj.rmrk1.value) {
            	 formObj.rmrk1.focus();
            	 opb.common.layerpopup.openAlert_fnc("계좌별칭 입력오류","변경된 내용이 없습니다.");
             	 return;
             }
             
             if(formObj.rmrk1.value==""){
                 formObj.rmrk1.value=="      ";
             }

             var hanaAjax = new hana.JHanaAjax('', true, true);
             hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT
                         + "/inquiry/account/wpdep406_09p_02.do", formObj, true, pbk.common.inquiry.closePop, 'euc-kr');

         },
         //팝업창 reload
         closePop : function(res, option) {
             // Return 데이터 Json타입 체크
             //opb.common.ajax.parseAjaxData_fnc(res, true);

             // Json타입으로 변환
             var _data = eval('(' + res.responseText + ')');

             if (_data.code == 'Y') {
                 // 메시지 출력
                 opb.common.layerpopup.openMessage_fnc({
                     isConfirm: false,
                     title    : '확인',
                     message  : '계좌 별칭이 변경되었습니다.',
                     callback : function(e) {

                             pbk.common.inquiry.refreshYn = "Y";

                             var url = "/inquiry/account/wpdep406_09p_04.do";
                             var hanaAjax = new hana.JHanaAjax('selectBoxDiv', true, true);
                             hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + url, null);

                             //바뀐별칭보여주기
                             document.getElementById('rmrk1').value=_data.outputMsg.rmrk1;
                     }
                 });
             }else{
             /*
                 opb.common.layerpopup.openMessage_fnc({
                     isConfirm: false,
                     title    : '계좌별칭변경오류',
                     message  : '오류로 인하여 계좌 별칭이 변경되지 않았습니다.',
                     callback : function(e) {
                     }
                 });
                 */
             }
         },

         /**
         *  2013.01.15 나 기 민 : 계좌별칭 변경시 Callback 구현!!
         */
       
         handleAccountNickname: function(acctNo, curCd){
			//상세없이 별칭열었을때
			if (pbk.common.inquiry.callBackFncYn =="N" && pbk.common.inquiry.refreshYn =="Y"){
				eval(pbk.common.inquiry.saveCallBackFnc);
				pbk.common.inquiry.callBackFncYn = "N";
                pbk.common.inquiry.callBackFnc="";
                pbk.common.inquiry.refreshYn = "N";
                pbk.common.inquiry.loanAcctNoYn ="N";                
			//상세열은후 별칭열었을때
			}else if (pbk.common.inquiry.callBackFncYn=="Y" && pbk.common.inquiry.refreshYn =="Y" ){			
				if(pbk.common.inquiry.loanAcctNoYn == "Y" ){
					var formObj = form.createForm([{id:"acctNo",value:acctNo},{id:"acctSeqNo",value:curCd}]);					
					var url = "/loan/inquiry/wplon444_03p.do";
					url = opb.base.APPLICATION_CONTEXT_ROOT + url;
					
					var _hanaAjax = new hana.JHanaAjax('wplon444_03p', true, true);
		        	_hanaAjax.ajaxCommSubmitCallback(url, formObj, eval(pbk.common.inquiry.saveCallBackFnc));		
				}else{
					var formObj = form.createForm([{id:"acctNo",value:acctNo},{id:"curCd",value:curCd}]);
					var url = "/inquiry/account/wpdep406_17p.do";
					url = opb.base.APPLICATION_CONTEXT_ROOT + url;
					
		        	var _hanaAjax = new hana.JHanaAjax('accountInfoLayer', true, true);
		        	_hanaAjax.ajaxCommSubmitCallback(url, formObj, eval(pbk.common.inquiry.saveCallBackFnc));			        
				}
			}
		},		
         
         /**
          * 계좌번호 변경시
          * @param {Object} formObj
          */
         changeAcctNo: function(formObj) {

             var url = "/inquiry/account/wpdep406_09p_01.do";
             hanaAjax = new hana.JHanaAjax(hanaBodyDiv, true, true);
             hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + url, formObj, true, callbackInputFronAction, 'UTF-8');
         },
         
		//대출콜백
    	openPopcallTypeLoan : function (){
    	//	var formObj = form.createForm([{id:"paramReturnType",value:"loan"}]);
    		var url = "/inquiry/account/wpdep406_04i.do";
	        var hanaAjax = new hana.JHanaAjax(opb.base.CONTENTS_DIV, true, true);
	        hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + url, null);
    	},
    	//대출콜백
    	openPopcallTypeTotal : function (){
    	//	var formObj = form.createForm([{id:"paramReturnType",value:"loan"}]);
    		var url = "/inquiry/account/wpdep406_05i.do";
	        var hanaAjax = new hana.JHanaAjax(opb.base.CONTENTS_DIV, true, true);
	        hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + url, null);
    	}
	};
}();