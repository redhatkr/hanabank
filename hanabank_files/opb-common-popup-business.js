/**
 * 팝업 공통
 */

try {
    if(null == pbk.common.popup || undefined == pbk.common.popup) {
         pbk.common.popup = {};
    }
} catch (e) {
    pbk.common.popup = {};
}

pbk.common.popup.business = function(){
	
	return{
		
		/** 
		 * 보유카드 상세 메뉴의 Action을 호출한다
		 * 카드 > 카드이용조회 > 이용대금청구서
		 */
		openPopUseCardDetail: function(formObj, backObj) {
			var url = "/card/inquiry/wpccd435_02p.do";
			url = opb.base.APPLICATION_CONTEXT_ROOT + url;
			opb.common.layerpopup.openLayer_fnc(url, 'cardDetailLayer', null, formObj, backObj);
		}, 		//	End openPopUseCardDetail
		
		/**
		 * 승인전표 팝업 
		 * 카드 > 카드이용조회 > 이용(승인)내역 
		 */
		openPopApprovalChit : function(apvDt, crdNo, apvNo, crdSelTypCd, mestNo, backObj) {
			
			document.forms.tempForm.apvDt.value = apvDt;
			document.forms.tempForm.crdNo.value = crdNo;
			document.forms.tempForm.apvNo.value = apvNo;
			document.forms.tempForm.crdSelTypCd.value = crdSelTypCd;
			document.forms.tempForm.mestNo.value = mestNo;
			
			var url = '/card/inquiry/wpccd435_08p.do';
			url = opb.base.APPLICATION_CONTEXT_ROOT + url;
			
			opb.common.layerpopup.openLayer_fnc(url, 'approvalChipLayer', null, document.forms.tempForm, backObj);
		},

		/**
		 * 계좌정보보기 팝업창.
		 * 조회 > 계좌조회 > 거래내역조회
		 */
		openPopAccountInfo: function(formObj, backObjID) {
			
			var jForm = new hana.JForm();
            if (!jForm.add(new hana.JSelect("계좌 번호", formObj.acctNo))
                    .validate()) {
                return;
            }

			var url = "/inquiry/account/wpdep406_17p.do";
			url = opb.base.APPLICATION_CONTEXT_ROOT + url;
			opb.common.layerpopup.openLayer_fnc(url, 'accountInfoLayer', null, formObj, backObjID);
		}, 		//	End openPopAccountInfo

		/**
		 * 계좌정보보기 팝업창.
		 * 조회 > 펀드조회 > 거래내역조회
		 * 펀드 > 펀드조회/이체 > 거래내역조 
		 */
		openPopFundInfo: function(formObj) {
			
			var jForm = new hana.JForm();
            if (!jForm.add(new hana.JSelect("계좌 번호", formObj.acctNo))
                    .validate()) {
                return;
            }
			
			var url = "/inquiry/account/wpdep406_17p.do";
			url = opb.base.APPLICATION_CONTEXT_ROOT + url;
			opb.common.layerpopup.openLayer_fnc(url, 'accountInfoLayer',  null, formObj,'moneyPopUp');			
		},		//	End openPopFundInfo
		
		/**
		 * 영업점(안내/약도/지도)찾기 팝업을 연다.
		 * 
		 * @author Jiho Park
		 * @since 2009. 02. 25
		 * @param {String} _adminNo 점번호/영업점번호/지점번호
		 */
		openPopupBussInfo : function(_adminNo) {

			var bussInfoURL = "https://openhanafn.ttmap.co.kr/map.jsp";
			
			// 일반 영업점찾기 팝업 오픈
			if (_adminNo == null || _adminNo == undefined || _adminNo == "") {
				bussInfoURL = "https://openhanafn.ttmap.co.kr/map.jsp";

			// 해당영업점 지도로 팝업 오픈			
			} else {
				bussInfoURL = "https://openhanafn.ttmap.co.kr/map.jsp?branch_code=" + _adminNo;
			}
			
			window.open(bussInfoURL
				,'hanabank'
				,'width=876,height=605, toolbar=0, location=0, menubar=0, status=0');
		} //[end] openPopupBussInfo		
		
	};
}();

