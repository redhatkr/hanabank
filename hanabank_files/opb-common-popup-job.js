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

pbk.common.popup.job = function() {
	/**
	 * private 
	 */
	var jobNameObj = null; 
	var jobCodeObj = null;
	var disJobNameObj = null;
		
	// public space
	return {
		popupId : null,
		backId : null,
		/**
		 * 직종 검색
		 * @param {Object} oForm
		 */
		submitSearchJikjong : function(oForm) {
			
			var _officeCd = oForm.officeCd.value; // 직장코드
			
			var oSelectJikjong = oForm.jikjongCd; // 직장 SelectBox
            for (var i = oSelectJikjong.options.length; i >= 0 ; i--) {
                oSelectJikjong.options[i] = null;
            }
			
			oSelectJikjong.options[0] = new Option("직종을 선택하세요","");
			
			var hanaAjax = new hana.JHanaAjax(null, true, true);
			hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT 
				+ "/common/popup/job_pop_3.do?custOcpCd=" + _officeCd 
				, null
				, true
				, function(res) {
					//opb.common.ajax.parseAjaxData_fnc(res,true);
					var _data = eval('(' + res.responseText + ')');
					
                    if (_data.contMap) {
                        
                        var ResultLIST = _data.contMap['BIZ.ESH0007.OUT.REC'];
                        for(var i=0; i<ResultLIST.size(); i++){
                            oSelectJikjong.options[i + 1] = new Option(ResultLIST[i].custOcpSclasCdNm1, ResultLIST[i].custOcpCd1);
                        }
                    }
				}//[end] callback
				, "EUC-KR");
		}, //[end] submitSearchJikjong
		
		/**
		 * 직위 검색
		 * @param {Object} oForm
		 */
		submitSearchJikwi : function(oForm) {
			
			var _jikjongCd = oForm.jikjongCd.value; // 직위코드
			
			var oSelectJikwi = oForm.jikwiCd; // 직위 SelectBox
            for (var i = oSelectJikwi.options.length; i >= 0 ; i--) {
                oSelectJikwi.options[i] = null;
            }
			
			oSelectJikwi.options[0] = new Option("직위를 선택하세요","");
			
			var hanaAjax = new hana.JHanaAjax(null, true, true);
			hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT 
				+ "/common/popup/job_pop_4.do?&custOcpCd=" + _jikjongCd
				, null
				, true
				, function(res) {
					//opb.common.ajax.parseAjaxData_fnc(res,true);
					var _data = eval('(' + res.responseText + ')');
					
                    if (_data.contMap) {
                        
                        var ResultLIST = _data.contMap['BIZ.ESH0007.OUT.REC'];
                        for(var i=0; i<ResultLIST.size(); i++){
                            oSelectJikwi.options[i + 1] = new Option(ResultLIST[i].custOcpCdNm1, ResultLIST[i].custOcpCd1);
                        }
                    }
				}//[end] callback
				, "EUC-KR");
		},
		
		
		/**
		 * 직업찾기 분류 2 : setting 하기 
		 * @param {Object} frmObj
		 */
		submitSearchOffice : function(frmObj){
			var _jikgunCd = frmObj.jikgun.value; // 직군코드
			
			var oSelectOffice = frmObj.officeCd; // 직장 SelectBox
            for (var i = oSelectOffice.options.length; i >= 0 ; i--) {
                oSelectOffice.options[i] = null;
            }
			
			oSelectOffice.options[0] = new Option("직업을 선택하세요","");
			var hanaAjax = new hana.JHanaAjax(null, true, true);
			hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/job_pop_2.do?custOcpCd=" + _jikgunCd, 
				frmObj,
				 true,
				function(res){
					//opb.common.ajax.parseAjaxData_fnc(res,true);
					var _data = eval('(' + res.responseText + ')');
					
					if (_data.contMap) {
                        
						var ResultLIST = _data.contMap['BIZ.ESH0007.OUT.REC'];
                        for(var i=0; i<ResultLIST.size(); i++){
							oSelectOffice.options[i + 1] = new Option(ResultLIST[i].custOcpMclasCdNm1, ResultLIST[i].custOcpCd1);
						}
					}
                    
				}, 'UTF-8');
		},
		/**
		 * 직업찾기 POPUP 창을 연다. 
		 * @param {String} popupId
		 * @param {HTMLElement} jobNameEl 값을 반환할 직업명 Element
		 * @param {HTMLElement} jobCodeEl 값을 반환한 직업코드 Element
		 * @param {HTMLElement} disJobNameEl 값을 화면에 보여줄 Element
		 */
		openPop : function(popupId, backId, jobNameEl,jobCodeEl, disJobNameEl) {
			pbk.common.popup.job.popupId = popupId;	
			pbk.common.popup.job.backId = backId;	
			jobNameObj = jobNameEl;  
			jobCodeObj = jobCodeEl;
			disJobNameObj = disJobNameEl; 	
//            pbk.extJS.popup.focusFlag.isElementFocus = true;
//            pbk.extJS.popup.focusFlag.focusElementId = 'oneDepth'; 
//            pbk.extJS.popup.isPrint = false;
			opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT+'/common/popup/job_pop.do', popupId, null, null, backId);			
		},
		submitJopCd : function(frmObj){
			//부모창 오브젝트 설정 
            var jForm = new hana.JForm();
            if (!jForm.add(new hana.JSelect('분류1',frmObj.jikgun))
                      .add(new hana.JSelect('분류2',frmObj.officeCd))
                      .add(new hana.JSelect('분류3',frmObj.jikjongCd))
                      .validate()) {
                return false;
            }
			$('custOcpCd').value=frmObj.jikjongCd.options[frmObj.jikjongCd.selectedIndex].value;
            var codeNm1= frmObj.jikgun.options[frmObj.jikgun.selectedIndex].text;
            var codeNm2= frmObj.officeCd.options[frmObj.officeCd.selectedIndex].text;
            var codeNm3= frmObj.jikjongCd.options[frmObj.jikjongCd.selectedIndex].text;
          
            
        	$('custOcpCdNm').value=codeNm1 + " " + codeNm2 + " " + codeNm3;
			$('disJobName').value= "["+$('custOcpCd').value+"]" + $('custOcpCdNm').value;
			//삭제 버튼 display 제어  3 : 무직자 
			if($('custOcpCd').value.substring(0,1)=="3"){
				$('companyBtn').style.display="";
			}
			//팝업 닫기 
			pbk.common.popup.job.closePop();
			
		},
		/**
		 * 
		 * @param {HTMLForm} formObj
		 */
		validateForm : function(formObj){
			var jForm = new hana.JForm();
			if (!jForm.add(new hana.JSelect('분류1',formObj.oneDepth).range(1,1))
						.add(new hana.JSelect('분류2',formObj.twoDepth).range(1,1))
						.add(new hana.JSelect('분류3',formObj.threeDepth).range(1,1))
						.add(new hana.JSelect('분류4',formObj.fourDepth).range(1,1))						
						.validate()) {
				return;
			}		
			pbk.common.popup.phone.setInfo(formObj.fourDepth);			
		},
		/**
		 * 직업찾기 popup 을 닫는다. 
		 */
		closePop : function() {
			opb.common.layerpopup.closeLayer_fnc(pbk.common.popup.job.popupId);
			pbk.common.popup.job.popupId= null;		
		}
	}
}();
