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

/**
 * 영업점찾기 팝업 Script 정의
 * 
 * @author Jiho Park
 * @since 2008. 11. 18
 */
pbk.common.popup.branch = function() {

	var oTempBussBrNm = null; // 영업점찾기 팝업을 열때 부모창의 영업점(지점)명 HTML Element Object
	var oTempBussBrKindCd = null; // 영업점찾기 팝업을 열때 부모창의 영업점(지점)코드 HTML Element Object 

	return {

		/**
		 * 해당 SelectBox의 option을 clear 한다.
		 * 
		 * @author Jiho Park
		 * @since 2008. 11. 04
		 * @param {Object} oSelectBox
		 */
		clearSelectBox : function(oSelectBox) {
            for (var i = oSelectBox.options.length; i >= 0; i--) {
                oSelectBox.options[i] = null;
            }
            oSelectBox.options[0] = new Option('선택하세요', '');
		}, // [end] clearSelectBox

		/**
		 * 영업점찾기 팝업을 연다.
		 * 
		 * @author Jiho Park
		 * @since 2008. 11. 17
		 * @param {Object} oBussBrNm 부모창의 영업점(지점)명 Html Element Object
		 * @param {Object} oBussKindCd 부모창의 영업점(지점)코드 Html Element Object
		 * * @param {Object} _msgType 영업점찾기 팝업의 출력 할 메세지 유형(Type)
		 */
		openPopupFindOffice : function(oBussBrNm, oBussBrKindCd, _msgType) {
			// 전역변수에 할당.
			this.oTempBussBrNm = oBussBrNm;
			this.oTempBussBrKindCd = oBussBrKindCd;

			var oSendForm = form.createForm([{
					id: 'msgType',
					value: _msgType
				}]);
			opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/branchInquiryForm.do"
				, 'popupFindOffice'
				, null
				, oSendForm);
		}, //[end] openPopupFindOffice



		/**
		 * 영업점(지점)찾기 조회를 실행 한다.
		 * 
		 * @author Jiho Park
		 * @since 2008. 11. 04
		 * @param {Object} oForm
		 * @param {String} _flag 시/도(sido), 구/군(gugun), 지점(jijum) 구분  
		 */
		submitFindOffce : function(oForm, _flag) {
            var oSendForm = null;
            if (_flag == "sido") {
				oSendForm = form.createForm([{
					id: 'inqTyp',
					value: _flag
				}]);

            } else if (_flag == "gugun") {
                oSendForm = form.createForm([{
					id: 'inqTyp',
					value: _flag
                }, {
                    id: 'jiyeokCd',
                    value: oForm.sdCd.value
                }]);

            } else if (_flag == "jijum") {
                oSendForm = form.createForm([{
					id: 'inqTyp',
					value: _flag
                }, {
                    id: 'zipCd',
                    value: oForm.guGunCd.value
                }]);

            }
            var hanaAjax = new hana.JHanaAjax('hanaMainDiv', true, true);
            hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/branchInquiry.do"
				, oSendForm
				, true
				, function(res) {
	                //pbk.ajax.parseData(res, true);

	                var _data = eval('(' + res.responseText + ')');
	                if (_data == null) {
						return;
					}
                    var oSelectBox = null;
                    var oSidoSelectBox = document.getElementById('sdCd');
                    var oGuGunSelectBox = document.getElementById('guGunCd');
                    var oJijumSelectBox = document.getElementById('bussBrNmInPopup');

					// Select Box Clear
                    if (_flag == 'sido') {
                        oSelectBox = document.getElementById('sdCd');
                        pbk.common.popup.branch.clearSelectBox(oSidoSelectBox);

                    } else if (_flag == 'gugun') {
                        oSelectBox = document.getElementById('guGunCd');
						
						if (oGuGunSelectBox != null && oGuGunSelectBox != undefined) {
							pbk.common.popup.branch.clearSelectBox(oGuGunSelectBox);
						}
						if (oJijumSelectBox != null && oJijumSelectBox != undefined) {
							pbk.common.popup.branch.clearSelectBox(oJijumSelectBox);
						}

                    } else if (_flag == 'jijum') {
                        oSelectBox = document.getElementById('bussBrNmInPopup');
						if (oJijumSelectBox != null && oJijumSelectBox != undefined) {
							pbk.common.popup.branch.clearSelectBox(oJijumSelectBox);
						}
                    }

					// Generate Option Tag
                    if (_flag == 'sido') {
                        oSelectBox = document.getElementById('sdCd');

						for(var i = 0; i < _data.sido.length; i++) {
							oSelectBox.options[i + 1] = new Option(_data.sido[i].sdFullNm, _data.sido[i].sdNm);
						}

                    } else if (_flag == 'gugun') {
                        oSelectBox = document.getElementById('guGunCd');
						for(var i = 0; i < _data.gugun.length; i++) {
							oSelectBox.options[i + 1] = new Option(_data.gugun[i].skkNm, _data.gugun[i].representZipNo);
						}

                    } else if (_flag == 'jijum') {
                        oSelectBox = document.getElementById('bussBrNmInPopup');
						var _count = 0;
						for(var i = 0; i < _data.jijum.length; i++) {
							if("11" == _data.jijum[i].bussBrKindCd) {
								
								oSelectBox.options[_count + 1] = new Option(_data.jijum[i].kornBrNm, _data.jijum[i].brNo);	
								_count++;
							}
						}
                    }
	            }//[end] callback
	            , "EUC-KR");
		}, //[end] submitFindOffce



		/**
		 * 영업점찾기 팝업에서 선택된 영업점 값을 부모창으로 전달 한다.
		 * 
		 * @author Jiho Park
		 * @since 2008. 11. 04
		 * @param {Object} oSelectBussBrNm 팝업에서 영업점 SelectBox Object
		 */
		handleOfficeNameCodeInPopup : function(oSelectBussBrNm) {
            if (oSelectBussBrNm.value == "") {
            	opb.common.layerpopup.openMessage_fnc({
                    title: '하나은행',
                    message: '영업점을 선택 하십시오.'
                });
                return;
            }
            if (oSelectBussBrNm != null && oSelectBussBrNm != undefined) {
                for (var i = 0; i < oSelectBussBrNm.options.length; i++) {
                    if (oSelectBussBrNm.options[i].selected == true) {
                        this.oTempBussBrNm.value = oSelectBussBrNm.options[i].text;
                        break;
                    }
                }
            }
            this.oTempBussBrKindCd.value = oSelectBussBrNm.value;
            opb.common.layerpopup.closeLayer_fnc('popupFindOffice');
		} //[end] handleOfficeNameCodeInPopup

	}; //[end] return

}(); //[end] opb.common.popup.branch

