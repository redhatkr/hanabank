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
* 공통 - 팝업 - 직장명 검색
* @author Oh,Ryunkyong
*/
pbk.common.popup.company = function(){	

	var callbackResult = function(res, arg){
	 	
		var instance = this;
	 	
		/*var resType = res.getResponseHeader('json-type');
		if (resType == 'normal') {
			// parsing
		}*/	
		//opb.common.ajax.parseAjaxData_fnc(res,true);
		// IE에서 DOM TBODY 접근성 문제 를 해결하기 위해 아예 table 부터 다시 그린다. 
		var data = eval('('+res.responseText+')');		
		
		var html = "";
		
		var companyTempl = new Template("<tr><td class=\"b-tnone\" scope=\"col\"><a href=\"#//HanaBank\" onclick=\"javascript:pbk.common.popup.company.setInfo('#{crpnRegNo}','#{crpnNm}');\">#{crpnRegNo}</a></td><td class=\"b-tnone\" scope=\"col\">#{crpnNm}</td><td class=\"b-tnone\" scope=\"col\">#{custAllAdr}</td></tr>\n");
		
		if (data.contMap['BIZ.ESH0008.OUT.REC']) {		
			html += "<div class=\"tbl_tbldiv\">";
			html += "<table class=\"tbl_col01\" summary=\"코드, 직장명, 본사주소을 보여줍니다.\">";
			html += "<caption>직업찾기검색 리스트</caption>";
			html += "<colgroup>";
			html += "<col style=\"width:30%\" />";
			html += "<col style=\"width:20%\" />";
			html += "<col style=\"width:50%\" />";
			html += "</colgroup>";
			html += "<thead>";
			html += "<tr>";
			html += "<th class=\"b-tnone\" scope=\"col\">코드</th>";
			html += "<th class=\"b-tnone\" scope=\"col\">직장명</th>";
			html += "<th class=\"b-tnone\" scope=\"col\">본사주소</th>";
			html += "</tr>";
			html += "</thead>";
			html += "<tbody>";
           var ResultLIST = data.contMap['BIZ.ESH0008.OUT.REC'];
			for(var i=0; i<ResultLIST.size(); i++){
				var data =ResultLIST[i];
				html += companyTempl.evaluate(data); 
			}
			html += "</tbody>";
			html += "</table>";
			html += "</div>";
		} else {
			html  = "<div class=\"tbl_tbldiv\">";
			html += "<table class=\"tbl_col01\" summary=\"코드, 직장명, 본사주소을 보여줍니다.\">";
			html += "<caption>직업찾기검색 리스트</caption>";
			html += "<colgroup>";
			html += "<col style=\"width:30%\" />";
			html += "<col style=\"width:20%\" />";
			html += "<col style=\"width:50%\" />";
			html += "</colgroup>";
			html += "<thead>";
			html += "<tr>";
			html += "<th class=\"b-tnone\" scope=\"col\">코드</th>";
			html += "<th class=\"b-tnone\" scope=\"col\">직장명</th>";
			html += "<th class=\"b-tnone\" scope=\"col\">본사주소</th>";
			html += "</tr>";
			html += "</thead>";
			html += "<tbody>";
			html += "<tr>";
			html += "<td colspan=\"3\">검색된 데이터가 없습니다.</td>";
			html += "</tr>";
			html += "</tbody>";
			html += "</table>";
			html += "</div>";
			
			//html = "<tr><td colspan='3'>검색된 데이터가 없습니다.</td></tr>";
		}
		document.getElementById("resultTableWrap").innerHTML = html;
	};
	
	var companyNameObj = null; 
	var companyCodeObj = null;

	return {
		popupId :null,
		backId:null,
		/**
		 * 직장명 검색창을 연다.
		 * @param {String} popupId
		 * @param {HTMLElement} companyName
		 * @param {HTMLElement} companyCode
		 */
		openPop : function(popupId, backId, companyNameEl,companyCodeEl) {
			pbk.common.popup.company.popupId = popupId;
			pbk.common.popup.company.backId = backId;
//           pbk.extJS.popup.focusFlag.isElementFocus = true;
//           pbk.extJS.popup.focusFlag.focusElementId = 'pSearchCompanyName';         
			companyNameObj = companyNameEl;  
			companyCodeObj = companyCodeEl;
//			pbk.extJS.popup.isPrint = false;
			opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT+'/common/popup/company_pop.do', popupId, null, null, backId);
       },
       /**
		 * 직장명 검색창을 닫는다.
		 */
		closePop : function(){
    	   opb.common.layerpopup.closeLayer_fnc(pbk.common.popup.company.popupId);
			pbk.common.popup.company.popupId = null;
		},
		/**
		 * 직장명을 검색한다.
		 * @param {Object} formObj
		 */
		searchList : function(formObj) {
			var jForm = new hana.JForm();
			var jText = new hana.JText('직장명',formObj.crpnNm);			
			jText.rangeCheck = true;
			jText.min = 3;
			jText.max = 10;
			if (!jForm.add(jText).validate()) {
				return;
			}
			
			hanaAjax = new hana.JHanaAjax('resultTableWrap', true, true);
			hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + '/common/popup/company_search.do', formObj, true, callbackResult, 'UTF-8');
			
		},
		
		/**
		 * Element에 회사명과 회사코드를 설정한다. 
		 * @param {String} companyCode 회사코드
		 * @param {String} companyName 회사명
		 */
		setInfo : function(companyCode, companyName) {
			if( companyCodeObj && null!=companyCodeObj)
				companyCodeObj.value = companyCode;
			if ( companyNameObj && null!=companyNameObj)
			companyNameObj.value = companyName;
			this.closePop();
		}
	}
}();