try {
    if(null == pbk.common.popup || undefined == pbk.common.popup) {
         pbk.common.popup = {};
    }
} catch (e) {
    pbk.common.popup = {};
}

/**
 * 공통 - 팝업 - 세금우대/생계형/비과세 한도 조회
 * @author Jiho Park
 * @since 2009. 02. 12
 */
pbk.common.popup.taxprim = function() {
	return {
		/**
		 * "세금우대/생계형 한도 조회 팝업"에서 TAB이미지 클릭시 해당 화면을 출력 한다.
		 * 
		 * @author Jiho Park
		 * @since 2009. 02. 02
		 * @param {HtmlElementObject} oTabImage 탭이미지 HtmlElementObject
		 * @param {Object} type 1:세금우대, 2:생계형
		 * @param {Object} oForm 
		 */
		toggleTabMenuTaxInfo : function(type, prdCd, agreeCheckYn ){

			
			var url = null;

			switch (type) {
				case '1' : 
					$j('ul.tabs li:eq(0)').addClass("ons");
					$j('ul.tabs li:eq(1)').removeClass("ons");
					url = "/common/popup/wpdep428_11p_01.do"; 
					break;
				case '2' :
					$j('ul.tabs li:eq(0)').removeClass("ons");
					$j('ul.tabs li:eq(1)').addClass("ons");
					url = "/common/popup/wpdep428_12p.do"; 
					break;
			}
			
            var oSendForm = form.createForm([
                             				{id: '_type',value: type}
                             				, {id: 'prdCd',value:prdCd}
                             				, {id: 'agreeCheckYn', value:agreeCheckYn}
                             			]);			
			
			hanaAjax = new hana.JHanaAjax("tabBodyDiv", true, true);
			hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT+ url, oSendForm, function(){ $j("#DepositTax").focus();});
		}, //[end] toggleTabMenuTaxInfo


		/**
		 * 세금우대/생계형 , 비과세 한도조회 팝업 Callback
		 */
		TAX_PRIM_POPUP_CALLBACK : null,

		/**
		 * 세금우대/생계형 한도조회 팝업 파라미터.
		 */
		TAX_PRIM_POPUP_PARAM_FORM : null,

		/**
		 * 세금우대/생계형 한도 조회 팝업을 연다.
		 * 
		 * @author Jiho Park
		 * @since 2009. 02. 10
		 * @param {Object} oForm
		 * @param {Object} _type 기본 선택 탭(1:세금우대, 2:생계형)
		 */
		openPopupTaxPrimLivingInquiry : function(oForm, _type, _btnId, oFormPopupParams) {
			
			if(_type == null || _type == undefined) {
				if(oForm.taxPrimYn == null || oForm.taxPrimYn == undefined) {
					_type = "1";	
				} else {
					_type = radiobox.getCheckedValue(oForm.taxPrimYn);	
				}
			}
			if(_type == '0') {
				_type = "1";

			} else if(_type == "2") {
				_type = "1";

			} else if(_type == "5") {
				_type = "2";
			
			} else {
				_type = "1";
			}

			var _displayTaxPrimYn = "Y";
			var _displayLivingTaxPrimYn = "Y";
			
			if(oFormPopupParams != null && oFormPopupParams != undefined) {

				var oDisplayTaxPrimYn = oFormPopupParams.displayTaxPrimYn; // 세금우대 출력 여부 객체
				var oDisplayLivingTaxPrimYn = oFormPopupParams.displayLivingTaxPrimYn; // 생계형(비과세) 출력 여부 객체

				if(oDisplayTaxPrimYn != null && oDisplayTaxPrimYn != undefined) {
					_displayTaxPrimYn = oDisplayTaxPrimYn.value;
				}

				if(_displayLivingTaxPrimYn != null && _displayLivingTaxPrimYn != undefined) {
					_displayLivingTaxPrimYn = oDisplayLivingTaxPrimYn.value;
				}

			}
			
            var oSendForm = form.createForm([
				{id: 'type',value: _type}
				, {id: 'prdCd',value: oForm.prdCd.value}
				, {id: 'agreeCheckYn', value: oForm.agreeCheckYn.value}
				, {id: 'displayTaxPrimYn', value: _displayTaxPrimYn}
				, {id: 'displayLivingTaxPrimYn', value: _displayLivingTaxPrimYn}
			]);

			opb.common.layerpopup.openLayer_fnc(pbk.APPLICATION_CONTEXT_ROOT+'/common/popup/wpdep428_11p.do', 'DepositTax',  null, oSendForm,_btnId);
            
		}, //[end] openPopTax

		/**
		 * 비과세한도조회 팝업을 연다.(생계형 아님)
		 * 
		 * @author Jiho Park
		 * @since 2009. 02. 12 
		 * @param {Object} oForm
		 */
		openPopupNonTaxInquiry : function(oForm){

			var _taxFreeDvCd = "0";

			var oTaxFreeDvCd = oForm.taxFreeDvCd;
			if (oTaxFreeDvCd != null && oTaxFreeDvCd != undefined) {
				_taxFreeDvCd = oTaxFreeDvCd.value;
			}

            var oSendForm = form.createForm([
				{id: 'prdCd',value: oForm.prdCd.value}
				, {id: 'taxPrimDvCd',value: _taxFreeDvCd}
				
			]);

			var callBackFunc = pbk.common.popup.taxprim.TAX_PRIM_POPUP_CALLBACK;

			if (callBackFunc != null && callBackFunc != undefined && callBackFunc != "") {
				pbk.extJS.popup.event.hide = callBackFunc;
			}

			pbk.extJS.popup.open(opb.base.APPLICATION_CONTEXT_ROOT+ "/common/popup/wpdep428_21p.do"
				, 'taxFreeLimitLayer'
				, 650
				, null
				, oSendForm);
		}

	}; //[end] return
}(); //[end] pbk.common.popup.taxprim 
