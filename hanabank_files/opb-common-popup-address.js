/*****************************************************************************
 * 파일명 : pbk-common-popup-address.js
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

try {
    if(null == pbk.common.new_address || undefined == pbk.common.new_address) {
         pbk.common.new_address = {};
    }
} catch (e) {
    pbk.common.new_address = {};
}

/**
* 공통 팝업 - 우편번호 
* @author Oh,Ryunkyong
*/
pbk.common.popup.address = function() {
   /**
    * private
    */
   var post1Obj = null;
   var post2Obj = null;
   var address1Obj = null;
   var address22Obj = null;
   var oPmilSeqNo = null;
   var oZipNoDvCd = null;


   var callbackResult = function(res, arg){
       var instance = this;
       //opb.common.ajax.parseAjaxData_fnc(res,true);
       // IE에서 DOM TBODY 접근성 문제 를 해결하기 위해 아예 table 부터 다시 그린다.
       var data = eval('('+res.responseText+')');

       var _html = "<table summary='주소리스트' class='popcommom_02 mgt10'>";
       _html +="<caption>우편번호/주소</caption>";
       _html +="<colgroup>";
       _html +="<col style='width:*;' />";
       _html +="</colgroup>";
       _html +="<thead>";
       _html +="<tr>";
       _html +="<th scope='col'>우편번호/주소</th>";
       _html +="</tr>";
       _html +="</thead>";
       _html +="<tbody>";

       var datalist = data.zipList;
       var companyTempl = new Template("<tr><td class='line_ln tx_lt'><a href='#//HanaBank' onclick=\"javascript:pbk.common.popup.address.setInfo('#{post1}','#{post2}','#{address}', '#{pmilSeqNo}', '#{zipNoDvCd}');\">(#{post1}-#{post2}) #{address}</a></td>\n");

       if (datalist && datalist.length > 0) {
           for (var i = 0; i < datalist.length; i++) {
               var data =datalist[i];
               data.post1 = data.zipNo.substring(0,3);
               data.post2 = data.zipNo.substring(3,6);
               data.address = data.adr;
               _html += companyTempl.evaluate(data);
           }
       } else {
           _html += "<tr><td class='line_ln'>검색된 데이터가 없습니다.</td></tr>";
       }

       _html +="</tbody></table>";
       document.getElementById("resultTableWrap").innerHTML = _html;
   }


   var callbackResult3 = function(res, arg){

       var instance = this;
       //opb.common.ajax.parseAjaxData_fnc(res,true);
       // IE에서 DOM TBODY 접근성 문제 를 해결하기 위해 아예 table 부터 다시 그린다.
       var data = eval('('+res.responseText+')');


       var html = "<table summary='주소리스트' class='popcommom_02 mgt10'>";
       html +="<caption>우편번호/주소</caption>";
       html +="<colgroup>";
       html +="<col style='width:*;' />";
       html +="</colgroup>";
       html +="<thead>";
       html +="<tr>";
       html +="<th scope='col' colspan='2'>우편번호/주소</th>";
       html +="</tr>";
       html +="</thead>";
       html +="<tbody>";

       /*
       var html = "<table summary='주소리스트' class='popcommom_02 mgt10'>";
       html +="<thead>";
       html +="<tr>";
       html +="<th scope='col'>우편번호/주소</th>";
       html +="</tr>";
       html +="</thead>";
       html +="<tbody>";
        */

       var datalist = data.zipList;
       var companyTempl = new Template("<tr><td class='line_ln tx_lt'><a href='#//HanaBank' onclick=\"javascript:pbk.common.popup.address.openZipcodeApart('#{post1}#{post2}','#{address}','#{parentPopId}','#{seqNo}','#{zipCd}','#{address1}');\" style='cursor:hand;'>(#{post1}-#{post2}) #{address}</td>\n");

       if (datalist && datalist.length > 0) {
           for (var i = 0; i < datalist.length; i++) {
               var data =datalist[i];
               data.seqNo = data.pmilSeqNo;
               data.zipCd = data.zipNoDvCd;
               data.post1 = data.zipNo.substring(0,3);
               data.post2 = data.zipNo.substring(3,6);
               data.address1 = data.sdNm + ' ' + data.skkNm +' '+data.emdNm;// +' '+data.mntnHsnoNm +' '+data.strManHsnoNm +'~' +data.lstManHsnoNm;
               data.address = data.adr;
               data.parentPopId = pbk.common.popup.address.popupId;
               html += companyTempl.evaluate(data);
           }
       } else {
           html += "<tr><td class='line_ln'>검색된 데이터가 없습니다.</td></tr>";
       }

       html +="</tbody></table>";


       document.getElementById("resultTableWrap").innerHTML = html;
   }

   return {
       popupId: null,
       type : null,

       openZipcodeApart: function(port, adress, parentId, seqNo, zipCd, dong){

           var formObj = form.createForm();
           //form.removeHiddenField(formObj, 'zipNo');
           //form.removeHiddenField(formObj, 'zipAdr');
           form.createHiddenField(formObj, 'zipNo', port, false);
           form.createHiddenField(formObj, 'zipAdr', dong, false);
           form.createHiddenField(formObj, 'seqNo', seqNo, false);
           form.createHiddenField(formObj, 'zipCd', zipCd, false);


           zipParentPopId = parentId;
           var url = "/myhana/personal/wpcus401_01p.do";
           url = opb.base.APPLICATION_CONTEXT_ROOT + url;
           //pbk.extJS.popup.isPrint = false;
           opb.common.layerpopup.openLayer_fnc(url, 'zipcodeApartLayer', zipParentPopId, formObj);
       },

       /**
        * 우편번호찾기 POPUP 창을 연다.
        * @param {String} popupId
        * @param {HTMLElement} post1El    우편번호1
        * @param {HTMLElement} post2El    우편번호2
        * @param {HTMLElement} address1El 주소
        * @param {HTMLElement} address2El 상세주소
        * @param {String} type 1 : 주소만 , 2: 주택구조까지
        * @param {HTMLElement} pmilSeqNo 우편일련번호
        * @param {HTMLElement} zipNoDvCd 우편번호구분코드
        */
       openPop: function(popupId, post1El, post2El, address1El, address2El, type, pmilSeqNo, zipNoDvCd, focusTarget){ 	
           pbk.common.popup.address.popupId = popupId;
           pbk.common.popup.address.type = type;
           post1Obj = post1El;
           post2Obj = post2El;
           address1Obj = address1El;
           address2Obj = address2El;
           oPmilSeqNo = pmilSeqNo;
           oZipNoDvCd = zipNoDvCd;

           //pbk.extJS.popup.focusFlag.isElementFocus = true;
           //pbk.extJS.popup.focusFlag.focusElementId = 'pSearchName';
           //pbk.extJS.popup.isPrint = false;
           //pbk.extJS.popup.open(opb.base.APPLICATION_CONTEXT_ROOT + '/common/popup/address_pop.do', popupId, 480, null);
           opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT + '/common/popup/address_pop.do', popupId, null, null, focusTarget);
       },

       /**
        * 우편번호 조회 팝업에서 엔터키 입력시 조회 실행
        *
        * @author Jiho Park
        * @since 2008. 11. 27
        * @param {Object} event
        * @param {Object} oForm
        */
       searchListOnKeyDown : function(event, oForm) {
           if (event.keyCode == 13) { // is Enter Key
               pbk.common.popup.address.searchList(oForm);
           }
       }, //[end] searchListOnKeyDown

       /**
        * 우편번호 조회
        * @param {HTMLForm} formObj
        */
       searchList: function(formObj){
           var jForm = new hana.JForm();
           var url = '/common/popup/address_search.do';
           if (!jForm.add(new hana.JText('동/읍/면 이름', formObj.dongName).range(3, 10)).validate()) {
               return;
           }

           var hanaAjax = new hana.JHanaAjax(opb.base.CONTENTS_DIV, true, true);

           //hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + url, formObj, true, callbackResult, 'UTF-8');

           if( pbk.common.popup.address.type  == null || pbk.common.popup.address.type == 1 ){
               hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + url, formObj, true, callbackResult, 'UTF-8');
           }else if( pbk.common.popup.address.type  == null || pbk.common.popup.address.type == 3 ){
               hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + url, formObj, true, callbackResult3, 'UTF-8');
           }else{
               hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + url, formObj, true, callbackResult, 'UTF-8');
           }

       },

       /**
        * 직업찾기 popup 을 닫는다.
        */
       closePop: function(){
    	   opb.common.layerpopup.closeLayer_fnc(pbk.common.popup.address.popupId);
    	   pbk.common.popup.address.popupId = null;
       },

       /**
        * 선택한 값을 부모창에 셋팅한다.
        * @param {String} post1 우편번호1
        * @param {String} post2 우편번호2
        * @param {String} address1 주소
        * @param {String} pmilSeqNo 우편일련번호
        * @param {String} zipNoDvCd 우편번호구분코드
        */
       setInfo: function(post1, post2, address1, pmilSeqNo, zipNoDvCd, gb){

           if (post1Obj && null != post1Obj) {
               post1Obj.value = post1;
           }
           if (post2Obj && null != post2Obj) {
               post2Obj.value = post2;
           }

           if (oPmilSeqNo && null != oPmilSeqNo) {
               oPmilSeqNo.value = pmilSeqNo;
           }
           if (oZipNoDvCd && null != oZipNoDvCd) {
               oZipNoDvCd.value = zipNoDvCd;
           }

           if ($('pmilSeqNo2')){
               $('pmilSeqNo2').value =  pmilSeqNo;
               $('zipNoDvCd2').value =  zipNoDvCd;
           }

           if (address1Obj && null != address1Obj) {
               address1Obj.value = address1;
           }
           if (address2Obj && null != address2Obj) {
               address2Obj.select();
               address2Obj.focus();
           }
           if (address2Obj && gb == '1'){
               address2Obj.value = "";
               address2Obj.select();
               address2Obj.focus();
           }

           pbk.common.popup.address.closePop();
       },

       /**
        * 직장주소 삭제
        */
       deleteAddress: function(){
           opb.common.layerpopup.openMessage_fnc({
               isConfirm: true,
               title: '정보',
               message: '삭제하시겠습니까?',
               callback: function(e){
                   if (e) {
                       alert('삭제처리');
                   }
                   else {

                   }
               }
           });
       }
   }
}();



/************************************************************
 * 새로운주소(도로명주소) 검색
 * 
 * @since 2011.09.26
 * @author Jiho Park 
 ************************************************************/
pbk.common.new_address = function() {

	var QUERY_TYPE_SIDO  = "sido";
	var QUERY_TYPE_GUGUN = "gugun";
	
	var ZIP_NO_CODE_DORO = "3";
	var ZIP_NO_CODE_GIBUN = "4";

	var post3Obj    = null; 
	var post4Obj    = null;
	var address3Obj = null;
	var address4Obj = null;
	var oPmilSeqNo1 = null;
	var oZipNoDvCd1 = null;	
	
	return {
		popupId: null,
		parentId: null,
		back_id: null,
		type   : null, //1:구조선택포함(개인정보>자택주소), 2:구조미포함 (그외)

		/**
		 * @param _sidoCd 시/도 코드
		 * @param _gugunSelectBoxId 구/군 SelectBox ID
		 */
		handleSelectBoxGugun : function(_sidoCd, _gugunSelectBoxId) {

			var _sido     =  _sidoCd.split('|'); //코드 | 명
			var oSendForm = form.createForm([{id:"queryType",value:QUERY_TYPE_GUGUN},{id:"queryCode",value:_sido[0]}]);

			var oGugunSelectBox = document.getElementById(_gugunSelectBoxId);
			
			if(_sido[0] == "36"){//세종시 (시 군 구 미존재)
				hana.JHanaUtils.selectbox.clearOptions(oGugunSelectBox);
				oGugunSelectBox.options[0] = new Option("시 군 구 미존재", "");  //(Key, Value)
				oGugunSelectBox.disabled = true;
			}else{
				hana.JHanaUtils.selectbox.clearOptions(oGugunSelectBox);
				oGugunSelectBox.options[0] = new Option("", "");  //(Key, Value)
				oGugunSelectBox.disabled = false;
				var hanaAjax = new hana.JHanaAjax('', true, true);
				hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/nwAdrRgnAction.do"
									, oSendForm
									, true
									, function(res) {
										opb.common.ajax.parseAjaxData_fnc(res, true);
										var _data = eval('(' + res.responseText + ')');
										if(_data.pmh0110OutRecList == null || _data.pmh0110OutRecList == undefined) { 
											return; 
										}
										var oPmh0110OutRecList = _data.pmh0110OutRecList;
										oGugunSelectBox.options[0] = new Option("선택하세요", "");  //(Key, Value)
										for(var i = 0; i < oPmh0110OutRecList.size(); i++){
											oGugunSelectBox.options[i + 1] = new Option(oPmh0110OutRecList[i].nwAdrSkkNm , oPmh0110OutRecList[i].nwAdrSkkNm);
										}
									}
									, 'euc-kr');
			}

			

		},
		
		
		/**
		 * 구조형태 선택 selectbox
		 * aptNm : 아파트명
		 * vlgNm : 마을명
		 */
		 selectDwlShpCd: function(obj,formObj){
			
			// 아파트
			if(obj.value == "01"){
				
//				formObj.vlgNm.value    = formObj.vlgNm_1.value;            		// 마을명
				formObj.aptNm.value    = formObj.aptNm_1.value;            		// 아파트명
				formObj.exAdr100.value = "";                               		// 부속주소
//				$("shpcd01").style.display = "";     		// 마을명
			    $("shpcd02").style.display = "";    		// 아파트명
			    $("shpcd03").style.display = "";     		// 동호수
			    $("shpcd04").style.display = "none"; 		// 부속주소
			    $("shpcd02_1").innerText   = "아파트명";
			    $("shpcd02_2").innerText   = "아파트";
			    
			}
			
			// 빌라
			else if(obj.value == "02"){ 
				
//				formObj.vlgNm.value    = formObj.vlgNm_1.value;   				// 마을명
				formObj.aptNm.value    = formObj.aptNm_1.value;         		// 빌라명
				formObj.exAdr100.value = "";                            		// 부속주소
				
//			    $("shpcd01").style.display = ""; 			// 마을명
			    $("shpcd02").style.display = ""; 			// 빌라명
			    $("shpcd03").style.display = ""; 			// 동호수
			    $("shpcd04").style.display = "none"; 		// 부속주소
			    $("shpcd02_1").innerText   = "빌라명";
			    $("shpcd02_2").innerText   = "빌라";
			    
			}
			
			// 연립&다세대
			else if(obj.value == "03"){
				
//				formObj.vlgNm.value    = formObj.vlgNm_1.value; 				// 마을명
				formObj.aptNm.value    = formObj.aptNm_1.value; 				// 연립&다세대명
				formObj.exAdr100.value = ""; 									// 부속주소
				
//			    $("shpcd01").style.display = ""; 			// 마을명
			    $("shpcd02").style.display = ""; 			// 연립&다세대명
			    $("shpcd03").style.display = ""; 			// 동호수
			    $("shpcd04").style.display = "none"; 		// 부속주소
			    $("shpcd02_1").innerText   = "연립명";
			    $("shpcd02_2").innerText   = "";
			    
			}
			
			// 오피스텔
			else if(obj.value == "04"){ 
				
//				formObj.vlgNm.value    = formObj.vlgNm_1.value; 				// 마을명
				formObj.aptNm.value    = formObj.aptNm_1.value; 				// 오피스텔명
				formObj.exAdr100.value = ""; 									// 부속주소
				
//			    $("shpcd01").style.display = "";	 		// 마을명
			    $("shpcd02").style.display = ""; 			// 오피스텔명
			    $("shpcd03").style.display = ""; 			// 동호수
			    $("shpcd04").style.display = "none"; 		// 부속주소
			    $("shpcd02_1").innerText   = "오피스텔명";
			    $("shpcd02_2").innerText   = "오피스텔";	
			    
			}
			
			//단독(05), 기타(99)
			else if (obj.value == "05" || obj.value == "99"){ 
				
//				formObj.vlgNm.value 	= "";
			    formObj.aptNm.value 	= "";
			    formObj.bldApdgNm.value	= ""; 									// 동
			    formObj.athnCntNm.value	= ""; 									// 호수
				formObj.exAdr100.value  = formObj.exAdr_1.value; 				// 부속주소
				
//			    $("shpcd01").style.display = "none"; 		//마을명
			    $("shpcd02").style.display = "none"; 		//오피스텔명
			    $("shpcd03").style.display = "none"; 		//동호수
			    $("shpcd04").style.display = ""; 			//부속주소
			}
		},

		/**
		 * 우편번호 조회 팝업에서 엔터키 입력시 조회 실행
		 * 
		 * @author Jiho Park
		 * @since 2008. 11. 27
		 * @param {Object} event
		 * @param {Object} oForm
		 */
		searchListOnKeyDown : function(event, oForm, gubn) {
			 
			// 지번
			if( gubn =="G"){ 
				if (event.keyCode == 13) { // is Enter Key
					pbk.common.new_address.gibenSearchList(oForm);	
				}				
			} 
			// 도로명
			else if( gubn =="D" ){
				if (event.keyCode == 13) { // is Enter Key
					pbk.common.new_address.doloNmSearchList(oForm);	
				}				
			}
		}, //[end] searchListOnKeyDown
		


		/**
		 * 우편번호찾기 POPUP 창을 연다.
		 * @param {String} popupId
		 * @param {HTMLElement} post1El    우편번호1
		 * @param {HTMLElement} post2El    우편번호2
		 * @param {HTMLElement} address1El 주소
		 * @param {HTMLElement} address2El 상세주소
		 * @param {String} type 1,4,5 : 구조형태선택미포함
		 * @param {String} type 3 : 구조형태선택
		 * @param {String} addrType G:지번 , D : 도로명
		 * @param {HTMLElement} pmilSeqNo 우편일련번호
		 * @param {HTMLElement} zipNoDvCd 우편번호구분코드 
		 */
		 newOpenPopGb: function(popupId, post1El, post2El, address1El, address2El, type, addrType, menuGb, pmilSeqNo, zipNoDvCd){
			
			pbk.common.new_address.popupId = popupId;
			pbk.common.new_address.type    = type;
			post3Obj    = post1El;
			post4Obj    = post2El;
			address3Obj = address1El;
			address4Obj = address2El;
			oPmilSeqNo1 = pmilSeqNo;
			oZipNoDvCd1 = zipNoDvCd;

//		 	pbk.extJS.popup.focusFlag.isElementFocus = true;
//			pbk.extJS.popup.focusFlag.focusElementId = 'pSearchName';
			
			var oSendForm;
			oSendForm = form.createForm([{id:'addrType', value:addrType}]);
			oSendForm = form.createForm([{id:'menuGb', value:menuGb}]);
			
			//pbk.extJS.popup.isPrint = false;
			opb.common.layerpopup.openLayer_fncen(opb.base.APPLICATION_CONTEXT_ROOT + '/common/popup/new_address_pop.do', popupId, null, oSendForm);
		},

		/**
		 * 우편번호찾기 POPUP 창을 연다.
		 * @param {String} popupId
		 * @param (String) parentId  상위계층의 레이어 아이디
		 * @param (String) back_id 창 닫을 때 되돌아 가는 포커스 타겟 아이디
		 * @param {HTMLElement} post1El    우편번호1
		 * @param {HTMLElement} post2El    우편번호2
		 * @param {HTMLElement} address1El 주소
		 * @param {HTMLElement} address2El 상세주소
		 * @param {String} type 1,4,5 : 구조형태선택미포함
		 * @param {String} type 3 : 구조형태선택
		 * @param {String} addrType G:지번 , D : 도로명
		 * @param {HTMLElement} pmilSeqNo 우편일련번호
		 * @param {HTMLElement} zipNoDvCd 우편번호구분코드 
		 */
		 newOpenPop: function(popupId, parentId, back_id, post1El, post2El, address1El, address2El, type, addrType, pmilSeqNo, zipNoDvCd){
			
			pbk.common.new_address.popupId = popupId;
			pbk.common.new_address.parentId = parentId;
			pbk.common.new_address.back_id = back_id;
			pbk.common.new_address.type    = type;
			post3Obj    = post1El;
			post4Obj    = post2El;
			address3Obj = address1El;
			address4Obj = address2El;
			oPmilSeqNo1 = pmilSeqNo;
			oZipNoDvCd1 = zipNoDvCd;

		 	//pbk.extJS.popup.focusFlag.isElementFocus = true;
			//pbk.extJS.popup.focusFlag.focusElementId = 'pSearchName';
			
			var oSendForm = form.createForm([{id:'addrType', value:addrType}]);
			
			//pbk.extJS.popup.isPrint = false;
			opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT + '/common/popup/new_address_pop.do', popupId, parentId, oSendForm, back_id);
		},

		/*
		 * 탭메뉴 넘김
		 */
		 goTabMenu : function(addrType, menuGb){
			var oSendForm = form.createForm([{id:'addrType', value:addrType},{id:'menuGb', value:menuGb}]);
			var hanaAjax = new hana.JHanaAjax("HanaPopContentDiv", true, true);
	    	hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/new_address_pop_01.do", oSendForm);
	    	
			
		},
		
		/*
		 * 탭으로 이동함
		 * tabDivId : 내용부분
		 * Url : 내용부분 URL
		 */
		tabMenuGo : function(tabDivId, Url, tabFlag){
			if(tabFlag == "") {
				$j('#tab00').addClass('ons');
				$j('#tab01').removeClass('ons');
				$j('#tab02').removeClass('ons');
			}
			else {
				if(tabFlag != "G"){
					$j('#tab00').removeClass('ons');
					$j('#tab01').removeClass('ons');
					$j('#tab02').addClass('ons');
				}else{
					$j('#tab00').removeClass('ons');
					$j('#tab01').addClass('ons');
					$j('#tab02').removeClass('ons');
				}
			}
			var hanaAjax = new hana.JHanaAjax(tabDivId, true, true);
			hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + Url, null);
			
		},
		
		/**
		 * 통합검색
		 */
		unfySearchList : function(formObj, _requestPageNo){
			var jForm = new hana.JForm();
			if (!jForm.add(new hana.JText('검색어', formObj.srchStrnCtt)).validate()) {
				return;
			}
			
			form.createHiddenField(formObj,'requestPageNo', _requestPageNo);
			
			var hanaAjax = new hana.JHanaAjax("addressresult", true, true);
			//hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/addressContentUnfy_02.do", formObj); 
			hanaAjax.ajaxCommSubmitCallback(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/addressContentUnfy_02.do", formObj, function(){
				$j('#sample').hide();
			});
		},          	
		
		/*
		 * 지번 검색 STEP01
		 */
		 gibenSearchList: function(formObj){
			var jForm = new hana.JForm();
			if (!jForm.add(new hana.JText('동/읍/면 이름', formObj.emdNm).range(3, 10)).validate()) {
				return;
			}
			
			if(formObj.emdNm.value != "" && !pbk.common.new_address.isEtcChar(formObj.emdNm.value)) {
				alert("동/읍/면 이름에 특수문자는 입력할 수 없습니다.");
				return;
			}
			/*******
			var sdNm; //시도명
			var tagListSdNm =  formObj._sdNm.value.split('|'); //코드 | 코드명 (시도)

			
			//충청북도 : 43 , 충청남도 : 44
			//전라북도 : 45 , 전라남도 : 46
			//경상북도 : 47 , 경상남도 : 48
			if(tagListSdNm[0] == 43 ||tagListSdNm[0] == 44 || tagListSdNm[0] == 45 ||
				tagListSdNm[0] == 46 || tagListSdNm[0] == 47 || tagListSdNm[0] == 48){
				sdNm = tagListSdNm[1].substring(0,1) + tagListSdNm[1].substring(2,3);
			}else{
				sdNm =  tagListSdNm[1].substring(0,2);
			}
			
			form.createHiddenField(formObj, 'sdNm' , sdNm); //시도명
			*************/
			var hanaAjax = new hana.JHanaAjax("addressresult", true, true);
	    	hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/addressContentGiben_02.do", formObj);

		},		

		/*
		 * 지번 검색 STEP02
		 */
		 gibenSearchList_01 : function(formObj){
			
			var hanaAjax = new hana.JHanaAjax("addressTabBodyDiv", true, true);
			if(pbk.common.new_address.type == null || pbk.common.new_address.type == 1 || pbk.common.new_address.type == 4 || pbk.common.new_address.type == 5){
				pbk.common.new_address.newSetInfo(formObj);
			}else if(pbk.common.new_address.type == 3){
				hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/addressContentGiben_03.do", formObj);
			}else if(pbk.common.new_address.type == 6){
				hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/addressContentGiben_03_1.do", formObj);
			}
		},
		
		/*
		 * 지번 검색 STEP03 (구조형태 입력)
		 */		
		 gibenSearchList_02: function(formObj){

			var jForm = new hana.JForm();

			 if (!jForm.add(new hana.JSelect('구조형태', formObj.dwlShpCd)).validate()){
			 	return false;
			 }
			
			//구조형태관련
            var tempAptNm      = "";
            var tempStrShpCdNm = "";
            var tempVlgNm      = "";
            var tempAptApdgCnt = "";
            var tempAptAthnCnt = "";
            var tempOwhmExAdr  = "";
            
            // 아파트
            if(formObj.dwlShpCd.value == "01"){
            	
                tempAptNm      = formObj.aptNm.value + "아파트";
                tempStrShpCdNm = "아파트";
                
                if(!jForm.add(new hana.JText('아파트', formObj.aptNm).range(1,30))
                         .add(new hana.JText('동'    , formObj.bldApdgNm).nullable().range(1,20))
                         .add(new hana.JText('호수'  , formObj.athnCntNm).range(1,12)).validate()){
                	
                    return false;
                }
                
                if(formObj.aptNm.value.indexOf("아파트")>0){
                	//opb.common.layerpopup.openAlert_fnc("입력오류","아파트명 항목에 [아파트]는 입력하지 않으셔도 됩니다.");
                	opb.common.layerpopup.openAlert_fnc("입력오류","아파트명 항목에 [아파트]는 입력하지 않으셔도 됩니다.","aptNm");
                	return false;
                }
                
            }
            // 빌라 
            else if(formObj.dwlShpCd.value == "02"){
                
            	tempAptNm      = formObj.aptNm.value + "빌라";
                tempStrShpCdNm = "빌라";
                
                if(!jForm.add(new hana.JText('빌라', formObj.aptNm).range(1,30))
                         .add(new hana.JText('동'  , formObj.bldApdgNm).nullable().range(1,20))
                         .add(new hana.JText('호수', formObj.athnCntNm).range(1,12)).validate()){
                	
                    return false;
                }
                
                if(formObj.aptNm.value.indexOf("빌라")>0){
                	opb.common.layerpopup.openAlert_fnc("입력오류","빌라명 항목에 [빌라]는 입력하지 않으셔도 됩니다.","aptNm");
                	return false;
                }
            }
            // 연립
            else if(formObj.dwlShpCd.value == "03"){
                
            	tempAptNm      = formObj.aptNm.value + "연립";
                tempStrShpCdNm = "연립";
                
                if(!jForm.add(new hana.JText('연립', formObj.aptNm).range(1,30))
                         .add(new hana.JText('동'  , formObj.bldApdgNm).nullable().range(1,20))
                         .add(new hana.JText('호수', formObj.athnCntNm).range(1,12)).validate()){
                	
                    return false;
                }
                
                if(formObj.aptNm.value.indexOf("연립")>0){
                	opb.common.layerpopup.openAlert_fnc("입력오류","연립명 항목에 [연립]는 입력하지 않으셔도 됩니다.","aptNm");
                	return false;
                }                
            }
            // 오피스텔
            else if(formObj.dwlShpCd.value == "04"){
            	
                tempAptNm      = formObj.aptNm.value + "오피스텔";
                tempStrShpCdNm = "오피스텔";
                
                if(!jForm.add(new hana.JText('오피스텔', formObj.aptNm).range(1,30))
                         .add(new hana.JText('동'      , formObj.bldApdgNm).nullable().range(1,20))
                         .add(new hana.JText('호수'    , formObj.athnCntNm).range(1,12)).validate()){
                	
                    return false;
                }
                
                if(formObj.aptNm.value.indexOf("오피스텔")>0){
                	opb.common.layerpopup.openAlert_fnc("입력오류","오피스텔명 항목에 [오피스텔]은 입력하지 않으셔도 됩니다.","aptNm");
                	return false;
                }
            }
            // 단독
            else if(formObj.dwlShpCd.value == "05"){
                tempAptNm      = formObj.aptNm.value + "단독";
                tempStrShpCdNm = "단독";
            }
            // 기타
            else {
                tempStrShpCdNm ="기타";
            }            

            // 단독(05) || 기타(99)
            if(formObj.dwlShpCd.value == "05" || formObj.dwlShpCd.value == "99"){
            	
            	if(formObj.nwAdrManLdno1.value.trim() == ""){
            		opb.common.layerpopup.openAlert_fnc("입력오류","지번은 필수 입력항목 입니다.","nwAdrManLdno1");
                    return false;            			
            	}
            	
	        	if(formObj.nwAdrManLdno1.value.trim() == ""){ //번지 미입력
	        		tempOwhmExAdr = formObj.exAdr100.value;
	        	}else{
	        		if(formObj.nwAdrSbLdno1.value.trim() == ""){
	        			tempOwhmExAdr = formObj.nwAdrManLdno1.value.trim() +"번지 " +formObj.exAdr100.value;
	        		}else{
	        			tempOwhmExAdr = formObj.nwAdrManLdno1.value.trim() +"-"+ formObj.nwAdrSbLdno1.value.trim() +"번지 " +formObj.exAdr100.value;
	        		}
	        	}            	
            }else{
                if(formObj.vlgNm.value != ""){
                    tempVlgNm = formObj.vlgNm.value+"마을 ";
                    if(formObj.vlgNm.value.indexOf("마을")>0){
                    	opb.common.layerpopup.openAlert_fnc("입력오류","마을 항목에 [마을]은 입력하지 않으셔도 됩니다.","vlgNm");
                    	return false;
                    }
                }
                
                if(formObj.bldApdgNm.value != ""){
                    tempAptApdgCnt = formObj.bldApdgNm.value+"동 ";
                    if(formObj.bldApdgNm.value.indexOf("동")>0){
                    	opb.common.layerpopup.openAlert_fnc("입력오류","동 항목에 [동]은 입력하지 않으셔도 됩니다.","bldApdgNm");
                    	return false;
                    }
                }
                
                if(formObj.athnCntNm.value != ""){
                    tempAptAthnCnt = formObj.athnCntNm.value+"호";
                    if(formObj.athnCntNm.value.indexOf("호")>0){
                    	opb.common.layerpopup.openAlert_fnc("입력오류","호 항목에 [호]는 입력하지 않으셔도 됩니다.","athnCntNm");
                    	return false;
                    }
                } 
                
            	if(formObj.nwAdrManLdno1.value.trim() == ""){
            		tempOwhmExAdr = tempVlgNm + tempAptNm + " "+ tempAptApdgCnt + tempAptAthnCnt;
            	}else{
            		if(formObj.nwAdrSbLdno1.value.trim() == ""){
	   	           		 tempOwhmExAdr = formObj.nwAdrManLdno1.value +"번지 ";
		        		 tempOwhmExAdr = tempOwhmExAdr + tempVlgNm + tempAptNm + " "+ tempAptApdgCnt + tempAptAthnCnt;                			
            		}else{
	   	           		 tempOwhmExAdr = formObj.nwAdrManLdno1.value +" - "+ formObj.nwAdrSbLdno1.value +"번지 ";
		        		 tempOwhmExAdr = tempOwhmExAdr + tempVlgNm + tempAptNm + " "+ tempAptApdgCnt + tempAptAthnCnt;           			
            		}
            	}
            }

			if(formObj.nwAdrManLdno1 != undefined) {
				if(formObj.nwAdrManLdno1.value != "" && !pbk.common.new_address.isEtcChar(formObj.nwAdrManLdno1.value)) {
					opb.common.layerpopup.openAlert_fnc("입력오류","지번에 특수문자는 입력할 수 없습니다.","nwAdrManLdno1");
					return;
				}
			}
				
			if(formObj.dwlShpCd != undefined) {
				if(formObj.dwlShpCd.value != "" && !pbk.common.new_address.isEtcChar(formObj.dwlShpCd.value)) {
					opb.common.layerpopup.openAlert_fnc("입력오류","주거형태에 특수문자는 입력할 수 없습니다.","dwlShpCd");
					return;
				}
			}			
			
			if(formObj.vlgNm != undefined) {
				if(formObj.vlgNm.value != "" && !pbk.common.new_address.isEtcChar(formObj.vlgNm.value)) {
					opb.common.layerpopup.openAlert_fnc("입력오류","마을명에 특수문자는 입력할 수 없습니다.","vlgNm");
					return;
				}
			}		
			
			if(formObj.vlgNm != undefined) {
				if(formObj.aptNm.value != "" && !pbk.common.new_address.isEtcChar(formObj.aptNm.value)) {
					opb.common.layerpopup.openAlert_fnc("입력오류",tempStrShpCdNm+"에 특수문자는 입력할 수 없습니다.","vlgNm");
					return;
				}
			}				
			
			if(formObj.bldApdgNm != undefined) {
				if(formObj.bldApdgNm.value != "" && !pbk.common.new_address.isEtcChar(formObj.bldApdgNm.value)) {
					opb.common.layerpopup.openAlert_fnc("입력오류","동호수에 특수문자는 입력할 수 없습니다.","bldApdgNm");
					return;
				}
			}	
			
			if(formObj.athnCntNm != undefined) {
				if(formObj.athnCntNm.value != "" && !pbk.common.new_address.isEtcChar(formObj.athnCntNm.value)) {
					opb.common.layerpopup.openAlert_fnc("입력오류","동호수에 특수문자는 입력할 수 없습니다.","athnCntNm");
					return;
				}
			}
			
			if(formObj.exAdr100 != undefined) {
				if(formObj.exAdr100.value != "" && !pbk.common.new_address.isEtcChar(formObj.exAdr100.value)) {
					opb.common.layerpopup.openAlert_fnc("입력오류","부속주소에 특수문자는 입력할 수 없습니다.","exAdr100");
					return;
				}
			}		
				
			form.createHiddenField(formObj, 'setExAdr2'   , tempOwhmExAdr);
			form.createHiddenField(formObj, 'nwAdrManLdno', formObj.nwAdrManLdno1.value);
			form.createHiddenField(formObj, 'nwAdrSbLdno' , formObj.nwAdrSbLdno1.value);
			
			var hanaAjax = new hana.JHanaAjax("addressTabBodyDiv", true, true);
			hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/addressContentGiben_04.do", formObj);
		 },	

		/*
		 * 지번 검색 STEP03 (구조형태- 무조건 기타)
		 */		
		 gibenSearchList_02_1: function(formObj){

            var tempOwhmExAdr = "";
            
        	if(formObj.nwAdrManLdno1.value.trim() == ""){
        		opb.common.layerpopup.openAlert_fnc("입력오류","지번은 필수 입력항목 입니다.","nwAdrManLdno1");
            	return false;            		
        	}
            			
			if(formObj.nwAdrManLdno1.value != "" && !pbk.common.new_address.isEtcChar(formObj.nwAdrManLdno1.value)) {
				opb.common.layerpopup.openAlert_fnc("입력오류","지번에 특수문자는 입력할 수 없습니다.","nwAdrManLdno1");
				return;
			}
						
			if(formObj.exAdr100.value != "" && !pbk.common.new_address.isEtcChar(formObj.exAdr100.value)) {
				opb.common.layerpopup.openAlert_fnc("입력오류","부속주소에 특수문자는 입력할 수 없습니다.","exAdr100");
				return;
			}
			
        	if(formObj.nwAdrManLdno1.value.trim() == ""){ //번지 미입력
        		tempOwhmExAdr = formObj.exAdr100.value;
        	}else{
        		if(formObj.nwAdrSbLdno1.value.trim() == ""){
        			tempOwhmExAdr = formObj.nwAdrManLdno1.value.trim() +"번지 " +formObj.exAdr100.value;
        		}else{
        			tempOwhmExAdr = formObj.nwAdrManLdno1.value.trim() +"-"+ formObj.nwAdrSbLdno1.value.trim() +"번지 " +formObj.exAdr100.value;
        		}
        	}  

            form.createHiddenField(formObj, 'setExAdr2'   , tempOwhmExAdr);
			form.createHiddenField(formObj, 'nwAdrManLdno', formObj.nwAdrManLdno1.value); //번지1
			form.createHiddenField(formObj, 'nwAdrSbLdno' , formObj.nwAdrSbLdno1.value);  //번지2
			
			var hanaAjax = new hana.JHanaAjax("addressTabBodyDiv", true, true);
			hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/addressContentGiben_04.do", formObj);
		 },	
			 
			 
		/*
		 * 지번 검색 STEP04 
		 */			 
		 gibenSearchList_03: function(formObj){
			 var hanaAjax = new hana.JHanaAjax("addressTabBodyDiv", true, true);
			 hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/addressContentGiben_05.do", formObj);
		 },
		 
		 
		/*
		 * 도로명 우편번호 검색 STEP01
		 */
		 doloNmSearchList: function(formObj){

			var jForm = new hana.JForm();
			if (!jForm.add(new hana.JSelect('시도'    , formObj._nwAdrSdNm))
					  //[Day3 917-도로명주소 등록 프로세스 간소화]도로명/읍면동/건물명 중 택일, 2016-08-25
					  //.add(new hana.JText('도로명'  , formObj.nwAdrRoadNm))
					  .validate()) {
				return;
			}
			
			var tagListSdNm =  formObj._nwAdrSdNm.value.split('|'); //코드 | 코드명 (시도)

			if(tagListSdNm[0] != "36"){ //세종시 (시군구 미존재) - 필수 체크 제외
				if(formObj.nwAdrSkkNm.value == ""){
					opb.common.layerpopup.openAlert_fnc("입력오류","시군구를 입력하세요.","nwAdrSkkNm");
					return;
				}
			}
				
			if(formObj.nwAdrRoadNm.value != "" && !pbk.common.new_address.isEtcChar(formObj.nwAdrRoadNm.value)) {
				opb.common.layerpopup.openAlert_fnc("입력오류","도로명에 특수문자는 입력할 수 없습니다.","nwAdrRoadNm");
				return;
			}
			
			if(formObj.nwAdrEmdNm.value != "" && !pbk.common.new_address.isEtcChar(formObj.nwAdrEmdNm.value)) {
				opb.common.layerpopup.openAlert_fnc("입력오류","읍면동명에 특수문자는 입력할 수 없습니다.","nwAdrEmdNm");
				return;
			}			
			
			//[Day3 917-도로명주소 등록 프로세스 간소화]도로명/읍면동/건물명 중 택일, 2016-08-25
			//if(formObj._nwAdrBldNm.value == "" && formObj.nwAdrEmdNm.value == "" ) {
			//	opb.common.layerpopup.openAlert_fnc("입력오류","‘건물번호/건물명’ 혹은 ‘읍동명’ 둘 중 하나를 입력하세요.","_nwAdrBldNm");
			//	return;
			//}
			if(formObj.nwAdrRoadNm.value == "" && formObj._nwAdrBldNm.value == "" && formObj.nwAdrEmdNm.value == "" ) {
				opb.common.layerpopup.openAlert_fnc("입력오류","‘도로명’이나 ‘건물번호 또는 건물명’ 또는 ‘읍면동명’ 중 하나는 반드시 입력해야 합니다.","nwAdrRoadNm");
				return;
			}
			
			form.createHiddenField(formObj, 'nwAdrSdNm' , tagListSdNm[1]);
			form.createHiddenField(formObj, 'nwAdrBldNm', formObj._nwAdrBldNm.value); // 건물명
			
			var hanaAjax = new hana.JHanaAjax("addressTabBodyDiv", true, true);
			//[Day3 917-도로명주소 등록 프로세스 간소화]서비스 변경(addressContentDolonm_02.do->addressContentDolonm_02_01.do), 2016-09-08
			hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/addressContentDolonm_02_01.do", formObj);
		 },	

		 /*
		  * 도로명 우편번호 검색 STEP02
		  */
		 doloNmSearchList_01 : function(formObj){
			 var hanaAjax = new hana.JHanaAjax("addressTabBodyDiv", true, true);
			 	
			if(pbk.common.new_address.type == null || pbk.common.new_address.type == 1 || pbk.common.new_address.type == 4 || pbk.common.new_address.type == 5){
				pbk.common.new_address.newSetInfo(formObj);
			}else if(pbk.common.new_address.type == 3){
				hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/addressContentDolonm_03.do", formObj);
			}else if(pbk.common.new_address.type == 6){
				hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/addressContentDolonm_03_1.do", formObj);
			}

		 },

		 /*
		  * 도로명 우편번호 검색 STEP03 (구조형태 입력)
		  */
		 doloNmSearchList_02 : function(formObj){

			var jForm = new hana.JForm();

			 if (!jForm.add(new hana.JSelect('구조형태', formObj.dwlShpCd))
					 .add(new hana.JText('건물번호' , formObj.nwAdrManBldNo1))
					 .validate()){
			 	return false;
			 }
			
			//구조형태관련
            var tempAptNm      = "";
            var tempStrShpCdNm = "";
            var tempVlgNm      = "";
            var tempAptApdgCnt = "";
            var tempAptAthnCnt = "";
            var tempOwhmExAdr  = "";
            
            // 아파트 
            if(formObj.dwlShpCd.value == "01"){
                tempAptNm = formObj.aptNm.value + "아파트";
                tempStrShpCdNm ="아파트";
                if(!jForm.add(new hana.JText('아파트', formObj.aptNm).range(1,30))
                         .add(new hana.JText('동'    , formObj.bldApdgNm).nullable().range(1,20))
                         .add(new hana.JText('호수'  , formObj.athnCntNm).range(1,12)).validate()){
                	
                    return false;
                }
                
                if(formObj.aptNm.value.indexOf("아파트")>0){
                	opb.common.layerpopup.openAlert_fnc("입력오류","아파트명 항목에 [아파트]는 입력하지 않으셔도 됩니다.","aptNm");
                	return false;
                }
            }
            // 빌라
            else if(formObj.dwlShpCd.value == "02"){
                tempAptNm      = formObj.aptNm.value + "빌라";
                tempStrShpCdNm = "빌라";
               
                if(!jForm.add(new hana.JText('빌라', formObj.aptNm).range(1,30))
                         .add(new hana.JText('동'  , formObj.bldApdgNm).nullable().range(1,20))
                         .add(new hana.JText('호수', formObj.athnCntNm).range(1,12)).validate()){
                	
                    return false;
                }
                
                if(formObj.aptNm.value.indexOf("빌라")>0){
                	opb.common.layerpopup.openAlert_fnc("입력오류","빌라명 항목에 [빌라]는 입력하지 않으셔도 됩니다.","aptNm");
                	return false;
                }
            }
            // 연립
            else if(formObj.dwlShpCd.value == "03"){
            	
                tempAptNm      = formObj.aptNm.value + "연립";
                tempStrShpCdNm = "연립";
                
                if(!jForm.add(new hana.JText('연립', formObj.aptNm).range(1,30))
                         .add(new hana.JText('동'  , formObj.bldApdgNm).nullable().range(1,20))
                         .add(new hana.JText('호수', formObj.athnCntNm).range(1,12)).validate()){
                    return false;
                }
                
                if(formObj.aptNm.value.indexOf("연립")>0){
                	opb.common.layerpopup.openAlert_fnc("입력오류","연립명 항목에 [연립]는 입력하지 않으셔도 됩니다.","aptNm");
                	return false;
                }                
            }
            // 오피스텔
            else if(formObj.dwlShpCd.value == "04"){
            	
                tempAptNm      = formObj.aptNm.value + "오피스텔";
                tempStrShpCdNm = "오피스텔";
                
                if(!jForm.add(new hana.JText('오피스텔', formObj.aptNm).range(1,30))
                         .add(new hana.JText('동'      , formObj.bldApdgNm).nullable().range(1,20))
                         .add(new hana.JText('호수'    , formObj.athnCntNm).range(1,12)).validate()){
                	
                    return false;
                }
                
                if(formObj.aptNm.value.indexOf("오피스텔")>0){
                	opb.common.layerpopup.openAlert_fnc("입력오류","오피스텔명 항목에 [오피스텔]은 입력하지 않으셔도 됩니다.","aptNm");
                	return false;
                }
            }
            // 단독
            else if(formObj.dwlShpCd.value == "05"){
                tempAptNm      = formObj.aptNm.value + "단독";
                tempStrShpCdNm = "단독";
            }
            // 기타
            else{
                tempStrShpCdNm = "기타";
            }            

            // 단독(05) || 기타(99)
            if(formObj.dwlShpCd.value == "05" || formObj.dwlShpCd.value == "99"){
            	
	        	if(formObj.nwAdrManBldNo1.value.trim() == ""){ //건물번호 미존재
	        		if(formObj.exAdr100.value == ""){
            			opb.common.layerpopup.openAlert_fnc("입력오류","부속주소 또는 건물번호는 필수 입력항목 입니다.","nwAdrManBldNo1");
                    	return false;            			
            		}
	            	tempOwhmExAdr = "("+ formObj.exAdr100.value +")";
	        	}else{ //건물번호 존재
	        		if(formObj.nwAdrSbBldNo1.value.trim() == ""){
	        			tempOwhmExAdr = formObj.nwAdrManBldNo1.value.trim() +",(" +formObj.exAdr100.value +")";
	        		}else{
	                	tempOwhmExAdr = formObj.nwAdrManBldNo1.value.trim() +"-"+ formObj.nwAdrSbBldNo1.value.trim() +",(" +formObj.exAdr100.value +")";
	        		}
	        	}
            }else{
	            if(formObj.vlgNm.value != ""){
	                tempVlgNm = formObj.vlgNm.value+"마을 ";
	                if(formObj.vlgNm.value.indexOf("마을")>0){
	                	opb.common.layerpopup.openAlert_fnc("입력오류","마을 항목에 [마을]은 입력하지 않으셔도 됩니다.","vlgNm");
	                	return false;
	                }
	            }
	            
	            if(formObj.bldApdgNm.value != ""){
	                tempAptApdgCnt = formObj.bldApdgNm.value+"동 ";
	                if(formObj.bldApdgNm.value.indexOf("동")>0){
	                	opb.common.layerpopup.openAlert_fnc("입력오류","동 항목에 [동]은 입력하지 않으셔도 됩니다.","bldApdgNm");
	                	return false;
	                }
	            }
	            
	            if(formObj.athnCntNm.value != ""){
	                tempAptAthnCnt = formObj.athnCntNm.value+"호";
	                if(formObj.athnCntNm.value.indexOf("호")>0){
	                	opb.common.layerpopup.openAlert_fnc("입력오류","호 항목에 [호]는 입력하지 않으셔도 됩니다.","athnCntNm");
	                	return false;
	                }
	            } 
	            
	            if(formObj.nwAdrManBldNo1.value.trim() == ""){
	            	tempOwhmExAdr = tempVlgNm + tempAptNm + " "+ tempAptApdgCnt + tempAptAthnCnt;
	            }else{
	            	if(formObj.nwAdrSbBldNo1.value.trim() == ""){
		            	tempOwhmExAdr = formObj.nwAdrManBldNo1.value + ",";
		            	tempOwhmExAdr = tempOwhmExAdr + tempAptApdgCnt + tempAptAthnCnt +"(" + tempVlgNm + tempAptNm +")";	 	            		
	            	}else{
		            	tempOwhmExAdr = formObj.nwAdrManBldNo1.value +"-" + formObj.nwAdrSbBldNo1.value +",";
		            	tempOwhmExAdr = tempOwhmExAdr + tempAptApdgCnt + tempAptAthnCnt +"(" + tempVlgNm + tempAptNm +")";	            		
	            	}
	            }
            }

			form.createHiddenField(formObj, 'setExAdr2'    , tempOwhmExAdr);
			form.createHiddenField(formObj, 'exAdr110'     , formObj.exAdr100.value);       //부속주소110
			form.createHiddenField(formObj, 'nwAdrManBldNo', formObj.nwAdrManBldNo1.value); //입력건물번호1
			form.createHiddenField(formObj, 'nwAdrSbBldNo' , formObj.nwAdrSbBldNo1.value);  //입력건물번호2

	    	var hanaAjax = new hana.JHanaAjax("addressTabBodyDiv", true, true);
	    	hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/addressContentDolonm_04.do", formObj);
		 },

		 /*
		  * 도로명 우편번호 검색 STEP03 (구조형태- 무조건기타)
		  */
		 doloNmSearchList_02_1 : function(formObj){
           var tempOwhmExAdr = "";
           
           
			if(formObj.nwAdrManBldNo1.value != "" && !pbk.common.new_address.isEtcChar(formObj.nwAdrManBldNo1.value)) {
				opb.common.layerpopup.openAlert_fnc("건물번호에 특수문자는 입력할 수 없습니다.","nwAdrManBldNo1");
				return;
			}
			   
			if(formObj.exAdr100.value != "" && !pbk.common.new_address.isEtcChar(formObj.exAdr100.value)) {
				opb.common.layerpopup.openAlert_fnc("부속주소에 특수문자는 입력할 수 없습니다.","exAdr100");
				return;
			}
			
        	if(formObj.nwAdrManBldNo1.value.trim() == ""){ //건물번호 미존재
        		if(formObj.exAdr100.value == ""){
        			opb.common.layerpopup.openAlert_fnc("입력오류","부속주소 또는 건물번호는 필수 입력항목 입니다.","nwAdrManBldNo1");
                	return false;            			
        		}
            	tempOwhmExAdr = "("+ formObj.exAdr100.value +")";
        	}else{ //건물번호 존재
        		if(formObj.nwAdrSbBldNo1.value.trim() == ""){
        			tempOwhmExAdr = formObj.nwAdrManBldNo1.value.trim() +",(" +formObj.exAdr100.value +")";
        		}else{
                	tempOwhmExAdr = formObj.nwAdrManBldNo1.value.trim() +"-"+ formObj.nwAdrSbBldNo1.value.trim() +",(" +formObj.exAdr100.value +")";
        		}
        	}
	       	
			form.createHiddenField(formObj, 'setExAdr2'    , tempOwhmExAdr);
			form.createHiddenField(formObj, 'exAdr110'     , formObj.exAdr100.value);       //부속주소110
			form.createHiddenField(formObj, 'nwAdrManBldNo', formObj.nwAdrManBldNo1.value); //입력건물번호1
			form.createHiddenField(formObj, 'nwAdrSbBldNo' , formObj.nwAdrSbBldNo1.value);  //입력건물번호2			

	    	var hanaAjax = new hana.JHanaAjax("addressTabBodyDiv", true, true);
	    	hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/addressContentDolonm_04.do", formObj);
		 },
		 
		 /*
		  * 도로명 우편번호 검색 STEP04 (구조형태 입력)
		  */
		 doloNmSearchList_03 : function(formObj){	
			 var hanaAjax = new hana.JHanaAjax("addressTabBodyDiv", true, true); 
			 hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/addressContentDolonm_05.do", formObj);
		 },
		 
		 /*
		  * 부모창 값 입력 분기
		  */
		 newSetInfo : function(formObj){
			if(pbk.common.new_address.type == null || pbk.common.new_address.type == 1 || pbk.common.new_address.type == 5){
				//alert(1);
				form.createHiddenField(formObj, 'gb', '');
				pbk.common.new_address.newSetInfo_3(formObj); //구조형태미입력
			
			}else if(pbk.common.new_address.type == 4){
				//alert(2);
				form.createHiddenField(formObj, 'gb', '1');
				pbk.common.new_address.newSetInfo_3(formObj); //구조형태미입력
			
			}else if(pbk.common.new_address.type == 3 || pbk.common.new_address.type == 6 ){
				//alert(3);
				pbk.common.new_address.newSetInfo_1(formObj); //주소
				
			}
		 },	

		/**
		 * 선택한 주소값 부모창에 세팅 (자택주소)
	 	 * 
		 */
		 newSetInfo_1: function(formObj){

			 var _gb = radiobox.getCheckedValue(formObj.gubun);
			 var _exAdr1;
			 var _pmilSeqNo1;
			 var _pmilSeqNo2;			 
			 var _exAdr2;
			 var _owhmZipAdr;
			 var _owhmExAdr;
			 var gubn;
			 var _adrRfngYn;
			 
			 var _stdngCd = "";
			 var _basZoneNo = "";
			 var _basZoneBaseAdr1 = "";
			 var _basZoneExAdr1 = "";
			 var _basZoneEngAdr1 = "";
			 var _basZoneBaseAdr2 = "";
			 var _basZoneExAdr2 = "";
			 var _basZoneEngAdr2 = "";
			 
			 if(_gb == "3"){ //직접입력
				 
			 	if(formObj.searchGb.value =="G"){ //지번
					 
					if(formObj.nwAdrManLdno1.value != "" && !pbk.common.new_address.isEtcChar(formObj.nwAdrManLdno1.value)) {
						opb.common.layerpopup.openAlert_fnc("적용시 번지에 특수문자는 입력할 수 없습니다.","nwAdrManLdno1");
						return;
					}
					
			 	}else if(formObj.searchGb.value =="D"){ //도로명
					 
					if(formObj.nwAdrManBldNo1.value != "" && !pbk.common.new_address.isEtcChar(formObj.nwAdrManBldNo1.value)) {
						opb.common.layerpopup.openAlert_fnc("건물번호에 특수문자는 입력할 수 없습니다.","nwAdrManBldNo1");
						return;
					}
			 	}
				
			 //alert(formObj.dwlShpCd.value);
//			 	if(formObj.dwlShpCd.value == "01" || formObj.dwlShpCd.value == "02" || formObj.dwlShpCd.value == "03" || formObj.dwlShpCd.value == "04"){
//			 		
//				 	if(formObj.searchGb.value =="G"){ //지번선택
//				 		
//				 		if(formObj.nwAdrManLdno1.value.trim() == ""){
//				 			if(formObj.nwAdrSbLdno1.value.trim() == ""){
//				 				_exAdr1 ="";
//				 			}else{
//				 				_exAdr1 = formObj.nwAdrSbLdno1.value.trim() + "번지";  //부속주소
//				 			}
//				 		}else{
//					 		if(formObj.nwAdrSbLdno1.value.trim() == ""){
//					 			_exAdr1 = formObj.nwAdrManLdno1.value.trim() + "번지";  //부속주소
//					 		}else{
//					 			_exAdr1 = formObj.nwAdrManLdno1.value.trim() +"-" + formObj.nwAdrSbLdno1.value.trim() +"번지";  //부속주소
//					 		}				 			
//				 		}
//				 		
//				 	}else if(formObj.searchGb.value =="D"){ // 도로선택 
//				 		
//				 		if(formObj.nwAdrManBldNo1.value.trim() == ""){
//				 			if(formObj.nwAdrSbBldNo1.value.trim() == ""){
//				 				_exAdr1 ="";
//				 			}else{
//				 				_exAdr1 = formObj.nwAdrSbBldNo1.value.trim();
//				 			}
//				 		}else{
//					 		if(formObj.nwAdrSbBldNo1.value.trim() == ""){
//					 			_exAdr1 = formObj.nwAdrManBldNo1.value.trim();  //부속주소
//					 		}else{
//					 			_exAdr1 = formObj.nwAdrManBldNo1.value.trim() +"-" + formObj.nwAdrSbBldNo1.value.trim();  //부속주소
//					 		}				 			
//				 		}
//				 	}
//			 	}else{ //기타,단독
//			 		_exAdr1 = formObj.exAdr2.value;  //부속주소
//			 	}
			 	
			 	_exAdr1 = formObj.popupExAdr2.value;  //부속주소
				
			 	if(formObj.searchGb.value =="D"){ //도로명 선택
			 		gubn       = ZIP_NO_CODE_DORO;
				 	_pmilSeqNo1 = formObj.nwAdrPmilSeqNo.value;  // 도로명 일련번호 
			 	}else{
			 		gubn       = ZIP_NO_CODE_GIBUN;
			 		_pmilSeqNo1 = formObj.pmilSeqNo.value;      //우편번호 일련번호 
			 	}
				 _adrRfngYn  = "N";
				 _owhmZipAdr = formObj.custAdr2.value;
			 	 _owhmExAdr  = formObj.popupExAdr2.value;
				 _pmilSeqNo2 = "0";
				 _exAdr2     = ""; 
				 
				 _basZoneNo = formObj.zipNo.value;
				 _basZoneBaseAdr1 = formObj.custAdr2.value;
				 _basZoneExAdr1 = formObj.popupExAdr2.value;
				  
				  if(formObj.adrRfngYnGb.value == "N"){
					  formObj.nwAdrManBldNo.value = "0"; //신주소주건물번호1
					  formObj.nwAdrSbBldNo.value  = "0"; //신주소부건물번호2
					  formObj.nwAdrManLdno.value  = "0"; //신주소주지번1
					  formObj.nwAdrSbLdno.value   = "0"; //신주소주지번2
				  }
				  
			 }else if(_gb == "2"){ //지번
				
//				if(formObj.dwlShpCd.value == "01" || formObj.dwlShpCd.value == "02" || formObj.dwlShpCd.value == "03" || formObj.dwlShpCd.value == "04"){
//					 _exAdr1 = formObj.exAdr9991.value;  // 부속주소
//				 }else{
//					 _exAdr1 = formObj.exAdr.value;      // 부속주소
//				 }

			 	_exAdr1 = formObj.exAdr.value;      // 부속주소

			 	gubn       = ZIP_NO_CODE_GIBUN;
			 	_adrRfngYn  = "Y";
			 	_owhmZipAdr = formObj.custAdr.value;
			 	_owhmExAdr  = formObj.exAdr.value;
				_pmilSeqNo1 = formObj.pmilSeqNo.value;      // 우편번호 일련번호 
				_pmilSeqNo2 = formObj.nwAdrPmilSeqNo.value; // 도로명관련주소
				_exAdr2     = formObj.exAdr1.value; 	    // 도로명관련주소

				_stdngCd = formObj.stdngCd.value;
				_basZoneNo = formObj.zipNo.value;
				_basZoneBaseAdr1 = formObj.custAdr.value;
				_basZoneExAdr1 = formObj.exAdr.value;
				_basZoneEngAdr1 = formObj.engBaseAdr.value;
				_basZoneBaseAdr2 = formObj.custAdr1.value;
				_basZoneExAdr2 = formObj.exAdr1.value;
				_basZoneEngAdr2 = formObj.engRoadNmBaseAdr.value;
				
			 }else if(_gb == "1"){ //도로명

				 gubn       = ZIP_NO_CODE_DORO;
			 	 _adrRfngYn  = "Y";
			 	 _owhmZipAdr = formObj.custAdr1.value;
			     _owhmExAdr  = formObj.exAdr1.value;	
				 _exAdr1     = formObj.exAdr1.value;          // 부속주소
				 _pmilSeqNo1 = formObj.nwAdrPmilSeqNo.value;  // 도로명 일련번호 
				 _pmilSeqNo2 = formObj.pmilSeqNo.value;       // 우편번호관련
				 _exAdr2     = formObj.exAdr.value;           // 우편번호관련

				 _stdngCd = formObj.stdngCd.value;
				 _basZoneNo = formObj.zipNo.value;
				 _basZoneBaseAdr1 = formObj.custAdr1.value;
				 _basZoneExAdr1 = formObj.exAdr1.value;
				 _basZoneEngAdr1 = formObj.engRoadNmBaseAdr.value;
				 _basZoneBaseAdr2 = formObj.custAdr.value;
				 _basZoneExAdr2 = formObj.exAdr.value;
				 _basZoneEngAdr2 = formObj.engBaseAdr.value;
				 
			 }else{
		        opb.common.layerpopup.openAlert_fnc("입력오류","선택해주세요.","gubun");
		        return false;					 
			 }

			 form.createHiddenField(formObj, '_exAdr1'    , _exAdr1);
			 form.createHiddenField(formObj, '_pmilSeqNo1', _pmilSeqNo1);
			 form.createHiddenField(formObj, '_pmilSeqNo2', _pmilSeqNo2);
			 form.createHiddenField(formObj, '_exAdr2'    , _exAdr2);
			 form.createHiddenField(formObj, '_gb'        , gubn);
			 form.createHiddenField(formObj, 'adrRfngYn'  , _adrRfngYn);

			 form.createHiddenField(formObj, '_stdngCd'  , _stdngCd);
			 form.createHiddenField(formObj, '_basZoneNo'  , _basZoneNo);
			 form.createHiddenField(formObj, '_basZoneBaseAdr1'  , _basZoneBaseAdr1);
			 form.createHiddenField(formObj, '_basZoneExAdr1'  , _basZoneExAdr1);
			 form.createHiddenField(formObj, '_basZoneEngAdr1'  , _basZoneEngAdr1);
			 form.createHiddenField(formObj, '_basZoneBaseAdr2'  , _basZoneBaseAdr2);
			 form.createHiddenField(formObj, '_basZoneExAdr2'  , _basZoneExAdr2);
			 form.createHiddenField(formObj, '_basZoneEngAdr2'  , _basZoneEngAdr2);

			 // MyHana 직장주소 
			 if(pbk.common.new_address.popupId == "popupJobAddress") { 
				 //alert(_owhmExAdr);
				 $("wkplExAdr1").value = _owhmZipAdr;
				 $("exAdr2").value     = _owhmExAdr;	

				 $("wkplZipNo1").value = formObj.zipNo.value.substring(0,3); // 우편번호 1
				 $("wkplZipNo2").value = formObj.zipNo.value.substring(3,6); // 우편번호 2

				 $("pmilSeqNo2").value = _pmilSeqNo1;   // 우편번호 일련번호
				 $("zipNoDvCd2").value = gubn;          // 우편번호구분코드
				 
				 if($("wkplExAdr1").value.trim() == null || $("wkplExAdr1").value.trim() == ""){
					 if($("exAdr2").value.trim() == null || $("exAdr2").value.trim() == ""){
					        opb.common.layerpopup.openAlert_fnc("선택오류","해당주소에 값이 없습니다.","exAdr2");
					        return false;						 
					 }
				 }

				 pbk.common.new_address.createHiddenAddressMyhana(formObj);  

			 } 
			 //  대출 직장주소[loanJobAddr], 오토론 직장주소 [autoLoanJobAddr], 사잇돌 대출 [saitdolLoanJobAddr]
			 else if(pbk.common.new_address.popupId == "loanJobAddr" || pbk.common.new_address.popupId == "autoLoanJobAddr"
				 || pbk.common.new_address.popupId == "saitdolLoanJobAddr") { 
				 
				 if(pbk.common.new_address.popupId == "autoLoanJobAddr" || pbk.common.new_address.popupId == "saitdolLoanJobAddr"){
					 if(document.getElementById("wkplExAdrDiv1") != undefined) document.getElementById("wkplExAdrDiv1").style.display = 'none';
					 if(document.getElementById("wkplExAdrDiv2") != undefined) document.getElementById("wkplExAdrDiv2").style.display = '';
					 
					 if(document.getElementById("tempWkplExAdr") != undefined) document.getElementById("tempWkplExAdr").value  = _owhmExAdr;
				 }
				 
				 document.getElementById("wkplZipNo1").value = formObj.zipNo.value.substring(0,3); // 우편번호 1
				 document.getElementById("wkplZipNo2").value = formObj.zipNo.value.substring(3,6); // 우편번호 2

				 document.getElementById("pmilSeqNo2").value = _pmilSeqNo1;   // 우편번호 일련번호
				 document.getElementById("zipNoDvCd2").value = gubn;          // 우편번호구분코드

				 document.getElementById("wkplZipAdr").value = _owhmZipAdr;
				 document.getElementById("wkplExAdr").value  = _owhmExAdr;	
				 

				 if(document.getElementById("wkplZipAdr").value.trim() == null || document.getElementById("wkplZipAdr").value.trim() == ""){
					 if(document.getElementById("wkplExAdr").value.trim() == null || document.getElementById("wkplExAdr").value.trim() == ""){
					        opb.common.layerpopup.openAlert_fnc("선택오류","해당주소에 값이 없습니다.","wkplExAdr");
					        return false;						 
					 }
				 }
				 
				 //버팀목 전세자금대출인 경우 상세주소 가공, 2018-01-24 
				 //if($j('#isButtressLoan') != undefined) {
				 if(document.getElementById("isButtressLoan") != undefined) {
					 //상세주소 속성 변경전 기본 셋팅
					 $j('#wkplExAdr').attr('readonly', true);
					 if(!$j('#wkplExAdr').hasClass('disabled')) {
						 $j('#wkplExAdr').addClass('disabled');
					 }
					 $j('#dtlAdrInNotiDiv').hide();
					 
					 //지번
					 if(_gb == "2") {
						 $j('#wkplExAdr').attr('readonly', false);
						 $j('#wkplExAdr').removeClass('disabled');
						 $j('#wkplExAdr').val("");
						 $j('#dtlAdrInNotiDiv').show();
					 }
					 //도로명
					 else if(_gb == "1") {
						 var _wkplExAdr = _owhmExAdr;
						 if(_wkplExAdr.indexOf("(") >= 0) _wkplExAdr = _wkplExAdr.substring(0, _wkplExAdr.indexOf("("));
						 if(_wkplExAdr.indexOf(",") >= 0) _wkplExAdr = _wkplExAdr.substring(0, _wkplExAdr.indexOf(","));
						 $j('#wkplExAdr').val(_wkplExAdr);
					 }
				 }

				 pbk.common.new_address.createHiddenAddressLoan(formObj); 
			 				 
			 }
			 // 대출 주소(담보)
			 else if(pbk.common.new_address.popupId == "loancltrLoctAddr") { 

				 document.getElementById("cltrLoctZipNo1").value = formObj.zipNo.value.substring(0,3); // 우편번호 1
				 document.getElementById("cltrLoctZipNo2").value = formObj.zipNo.value.substring(3,6); // 우편번호 2

				 document.getElementById("cltrLoctPmilSeqNo").value = _pmilSeqNo1;   // 우편번호 일련번호
				 document.getElementById("cltrLoctZipNoDvCd").value = gubn;          // 우편번호구분코드

				 document.getElementById("cltrLoctZipAdr").value = _owhmZipAdr;
				 document.getElementById("cltrLoctExAdr").value  = _owhmExAdr;	
				 
				 if(document.getElementById("cltrLoctZipAdr").value.trim() == null || document.getElementById("cltrLoctZipAdr").value.trim() == ""){
					 if(document.getElementById("cltrLoctExAdr").value.trim() == null || document.getElementById("cltrLoctExAdr").value.trim() == ""){
					        opb.common.layerpopup.openAlert_fnc("선택오류","해당주소에 값이 없습니다.","cltrLoctExAdr");
					        return false;						 
					 }
				 }

				 pbk.common.new_address.createHiddenAddressLoan(formObj); 
			 				 
			 }			 			 
			 // 인터넷청약 주소
			 else if(pbk.common.new_address.popupId == "popupLiveAddr1"){ 
				 
				 form.createHiddenField(formObj, 'ExAdr1', _owhmZipAdr);
				 form.createHiddenField(formObj, 'ExAdr2', _owhmExAdr);				 

				 pbk.common.new_address.newSetInfo_2(formObj); // 상세값 입력
				 
			 } 
			 // 비로그인환전 주소 
			 else if(pbk.common.new_address.popupId == "owhmAddress2"){
				 
				 document.getElementById("zipNoAdr1").value = formObj.zipNo.value.substring(0,3); // 우편번호 1
			 	 document.getElementById("zipNoAdr2").value = formObj.zipNo.value.substring(3); // 우편번호 2

//			 	 document.getElementById("exAdr1").value = _owhmZipAdr;
//			 	 document.getElementById("exAdr2").value = _owhmExAdr;
			 	 address3Obj.value = _owhmZipAdr;
			 	 address4Obj.value = _owhmExAdr;
			 	 pbk.common.new_address.createHiddenAddressMyhana(formObj); // 상세값 입력
			 	
			 }
			 // 송금Tracking
			 else if(pbk.common.new_address.popupId == "owhmAddress5"){
				 
				 document.getElementById("cntcAdrZipNo1").value = formObj.zipNo.value.substring(0,3); // 우편번호 1
			 	 document.getElementById("cntcAdrZipNo2").value = formObj.zipNo.value.substring(3); // 우편번호 2

//			 	 document.getElementById("exAdr1").value = _owhmZipAdr;
//			 	 document.getElementById("exAdr2").value = _owhmExAdr;
			 	 address3Obj.value = _owhmZipAdr;
			 	 address4Obj.value = _owhmExAdr;
			 	 pbk.common.new_address.createHiddenAddressMyhana(formObj); // 상세값 입력
			 	
			 }
			 // 영문주소Return
			 else if(pbk.common.new_address.popupId == "owhmAddress4"){
				 
//				 document.getElementById("zipNoAdr1").value = formObj.zipNo.value.substring(0,3); // 우편번호 1
//			 	 document.getElementById("zipNoAdr2").value = formObj.zipNo.value.substring(3); // 우편번호 2
			 	 post3Obj.value    = formObj.zipNo.value.substring(0,3); // 우편번호 1
				 post4Obj.value    = formObj.zipNo.value.substring(3);   // 우편번호 2

			 	 address3Obj.value = ((_basZoneEngAdr1 != "")?_basZoneEngAdr1.toUpperCase():"");
			 	 //_basZoneEngAdr1과_basZoneEngAdr2같아서 널처리
			 	 //address4Obj.value = _basZoneEngAdr2;
			 	 address4Obj.value = "";
			 	 pbk.common.new_address.createHiddenAddressMyhana(formObj); // 상세값 입력
			 }
			 // 보관금 주소 
			 else if(pbk.common.new_address.popupId == "owhmAddress1"){
				 
				 document.getElementById("zipNo1").value = formObj.zipNo.value.substring(0,3); // 우편번호 1
			 	 document.getElementById("zipNo2").value = formObj.zipNo.value.substring(3,6); // 우편번호 2

//			 	 document.getElementById("exAdr1").value = _owhmZipAdr;
//			 	 document.getElementById("exAdr2").value = _owhmExAdr;
			 	 address3Obj.value = _owhmZipAdr;
			 	 address4Obj.value = _owhmExAdr;
			 	pbk.common.new_address.createHiddenAddressMyhana(formObj); // 상세값 입력
			 	
			 }
			 // MyHana 자택주소 
			 else if(pbk.common.new_address.popupId == "owhmAddress"){
				
                document.getElementById("owhmZipAdr").value = _owhmZipAdr;
			 	document.getElementById("owhmExAdr").value  = _owhmExAdr;

			 	document.getElementById("owhmZipNo01").value = formObj.zipNo.value.substring(0,3); // 우편번호 1
			 	document.getElementById("owhmZipNo02").value = formObj.zipNo.value.substring(3,6); // 우편번호 2	 
			 	document.getElementById("strShpCdNm").value  = formObj.strShpCdNm.value;	       // 구조형태 이름

			 	document.getElementById("pmilSeqNo").value = _pmilSeqNo1;                          // 우편번호 일련번호
			 	document.getElementById("zipNoDvCd").value = gubn;                                 // 우편번호구분코드
			 	document.getElementById("owhmZipNo").value = formObj.zipNo.value;                  // 우편번호	
			 	document.getElementById("etcAdr").value    = _exAdr1;                              // 부속주소
			 	document.getElementById("vlgNm").value     = formObj.vlgNm.value;                  // 마을	
			 	document.getElementById("aptNm").value     = formObj.aptNm.value;                  // 아파트명
			 	document.getElementById("bldApdgNm").value = formObj.bldApdgNm.value;              // 동
			 	document.getElementById("athnCntNm").value = formObj.athnCntNm.value;              // 호수				 
			 	document.getElementById("dwlShpCd").value  = formObj.dwlShpCd.value;               // 구조형태코드

			 	if(document.getElementById("owhmZipAdr").value.trim() == null || document.getElementById("owhmZipAdr").value.trim() == ""){
			 		if(document.getElementById("owhmExAdr").value.trim() == null || document.getElementById("owhmExAdr").value.trim() == ""){
			 			opb.common.layerpopup.openAlert_fnc("선택오류","해당주소에 값이 없습니다.","owhmExAdr");
			 			return false;						 
			 		}
			 	}

			 	// MyHana 자택주소 
			 	pbk.common.new_address.createHiddenAddressMyhana(formObj);
			 	
			 }
			 // MyHana 자택주소 
			 else if(pbk.common.new_address.popupId == "owhmAddress3"){
				
                document.getElementById("owhmZipAdr").value = _owhmZipAdr;
			 	document.getElementById("owhmExAdr").value  = _owhmExAdr;

			 	document.getElementById("owhmZipNo01").value = formObj.zipNo.value.substring(0,3); // 우편번호 1
			 	document.getElementById("owhmZipNo02").value = formObj.zipNo.value.substring(3,6); // 우편번호 2

			 	document.getElementById("pmilSeqNo").value = _pmilSeqNo1;                          // 우편번호 일련번호
			 	document.getElementById("zipNoDvCd").value = gubn;                                 // 우편번호구분코드
			 	document.getElementById("owhmZipNo").value = formObj.zipNo.value;                  // 우편번호	
			 	document.getElementById("etcAdr").value    = _exAdr1;                              // 부속주소

			 	document.getElementById("_strShpCdNm").value  = formObj.strShpCdNm.value;	       // 구조형태 이름
			 	document.getElementById("_vlgNm").value     = formObj.vlgNm.value;                  // 마을	
			 	document.getElementById("_aptNm").value     = formObj.aptNm.value;                  // 아파트명
			 	document.getElementById("_bldApdgNm").value = formObj.bldApdgNm.value;              // 동
			 	document.getElementById("_athnCntNm").value = formObj.athnCntNm.value;              // 호수				 
			 	document.getElementById("_dwlShpCd").value  = formObj.dwlShpCd.value;               // 구조형태코드

			 	if(document.getElementById("owhmZipAdr").value.trim() == null || document.getElementById("owhmZipAdr").value.trim() == ""){
			 		if(document.getElementById("owhmExAdr").value.trim() == null || document.getElementById("owhmExAdr").value.trim() == ""){
			 			opb.common.layerpopup.openAlert_fnc("선택오류","해당주소에 값이 없습니다.","owhmExAdr");
			 			return false;						 
			 		}
			 	}

			 	// MyHana 자택주소 
			 	pbk.common.new_address.createHiddenAddressMyhana(formObj);
			 	
			 }			 
			 // 대출 자택주소 
			 else if(pbk.common.new_address.popupId == "loanHomeAddr"){
				
                document.getElementById("owhmZipAdr").value = _owhmZipAdr;
			 	document.getElementById("owhmExAdr").value  = _owhmExAdr;

			 	document.getElementById("owhmZipNo01").value = formObj.zipNo.value.substring(0,3); // 우편번호 1
			 	document.getElementById("owhmZipNo02").value = formObj.zipNo.value.substring(3,6); // 우편번호 2
			 	document.getElementById("shpCdNm").value  = formObj.strShpCdNm.value;	       // 구조형태 이름

			 	document.getElementById("zipNoDvCd").value = gubn;                                 // 우편번호구분코드
			 	document.getElementById("owhmZipNo").value = formObj.zipNo.value;                  // 우편번호	

			 	if(document.getElementById("owhmZipAdr").value.trim() == null || document.getElementById("owhmZipAdr").value.trim() == ""){
			 		if(document.getElementById("owhmExAdr").value.trim() == null || document.getElementById("owhmExAdr").value.trim() == ""){
			 			opb.common.layerpopup.openAlert_fnc("선택오류","해당주소에 값이 없습니다.","owhmExAdr");
			 			return false;						 
			 		}
			 	}

			 	//대출 자택주소
			 	pbk.common.new_address.createHiddenAddressLoan(formObj);    
			 }
		  	 // My hana > 학생증카드  > 학생증카드  발급신청   
			 else if(pbk.common.new_address.popupId == "studentAddress" || pbk.common.new_address.popupId == "studentAddress1"){

				 /*
				 document.getElementById("owhmZipAdr").value = _owhmZipAdr;
				 document.getElementById("owhmExAdr").value  = _owhmExAdr;

				 document.getElementById("owhmZipNo01").value = formObj.zipNo.value.substring(0,3); // 우편번호 1
				 document.getElementById("owhmZipNo02").value = formObj.zipNo.value.substring(3,6); // 우편번호 2
				 document.getElementById("strShpCdNm").value  = formObj.strShpCdNm.value;	       // 구조형태 이름

				 document.getElementById("pmilSeqNo").value = _pmilSeqNo1;                          // 우편번호 일련번호
				 document.getElementById("zipNoDvCd").value = gubn;                                 // 우편번호구분코드
				 document.getElementById("owhmZipNo").value = formObj.zipNo.value;                  // 우편번호	
				 document.getElementById("etcAdr").value    = _exAdr1;                              // 부속주소
				 document.getElementById("vlgNm").value     = formObj.vlgNm.value;                  // 마을	
				 document.getElementById("aptNm").value     = formObj.aptNm.value;                  // 아파트명
				 document.getElementById("bldApdgNm").value = formObj.bldApdgNm.value;              // 동
				 document.getElementById("athnCntNm").value = formObj.athnCntNm.value;              // 호수				 
				 document.getElementById("dwlShpCd").value  = formObj.dwlShpCd.value;               // 구조형태코드

				 document.getElementById("owhmExAdr2").value  = formObj.nwAdrManLdno1.value;        // 입력지번1
				 document.getElementById("owhmExAdr3").value  = formObj.nwAdrSbLdno1.value;         // 입력지번2
*/
			 
				document.getElementById("owhmZipAdr").value = _owhmZipAdr;
				document.getElementById("owhmExAdr").value  = _owhmExAdr;
				
				document.getElementById("owhmZipNo01").value = formObj.zipNo.value.substring(0,3); // 우편번호 1
				document.getElementById("owhmZipNo02").value = formObj.zipNo.value.substring(3,6); // 우편번호 2
				document.getElementById("_strShpCdNm").value  = formObj.strShpCdNm.value;	       // 구조형태 이름
				
				document.getElementById("pmilSeqNo").value = _pmilSeqNo1;                          // 우편번호 일련번호
				document.getElementById("zipNoDvCd").value = gubn;                                 // 우편번호구분코드
				document.getElementById("owhmZipNo").value = formObj.zipNo.value;                  // 우편번호	
				document.getElementById("etcAdr").value    = _exAdr1;                              // 부속주소
				document.getElementById("_vlgNm").value     = formObj.vlgNm.value;                  // 마을	
				document.getElementById("_aptNm").value     = formObj.aptNm.value;                  // 아파트명
				document.getElementById("_bldApdgNm").value = formObj.bldApdgNm.value;              // 동
				document.getElementById("_athnCntNm").value = formObj.athnCntNm.value;              // 호수				 
				document.getElementById("_dwlShpCd").value  = formObj.dwlShpCd.value;               // 구조형태코드

//				document.getElementById("owhmExAdr2").value  = formObj.nwAdrManLdno1.value;        // 입력지번1
//				document.getElementById("owhmExAdr3").value  = formObj.nwAdrSbLdno1.value;         // 입력지번2

				 if(document.getElementById("owhmZipAdr").value.trim() == null || document.getElementById("owhmZipAdr").value.trim() == ""){
					 if(document.getElementById("owhmExAdr").value.trim() == null || document.getElementById("owhmExAdr").value.trim() == ""){
						 opb.common.layerpopup.openAlert_fnc("선택오류","해당주소에 값이 없습니다.","owhmExAdr");
						 return false;						 
					 }
				 }

				 pbk.common.new_address.createHiddenAddressMyhana(formObj);
			 }
			 
			 pbk.common.new_address.closePop();
		},	

		createHiddenAddressMyhana : function(formObj){
			var hddnAddressField = "";
			
			 if(pbk.common.new_address.popupId == "owhmAddress"    || pbk.common.new_address.popupId == "owhmAddress1"    || pbk.common.new_address.popupId == "owhmAddress3" || 	// MyHana > 자택 || 보관금
			    pbk.common.new_address.popupId == "studentAddress") { // 학생증카드 발급 

				hddnAddressField += "<input type=\"hidden\" name=\"custInfoRegRlsDvCd560\" id=\"custInfoRegRlsDvCd560\" value=\"1\">";                               // 주소변경여부
				hddnAddressField += "<input type=\"hidden\" name=\"zipNo4\"                id=\"zipNo4\"                value=\""+formObj.zipNo.value+"\">";         // 우편번호
				hddnAddressField += "<input type=\"hidden\" name=\"pmilSeqNo4\"            id=\"pmilSeqNo4\"            value=\""+formObj._pmilSeqNo1.value+"\">";   // 우편번호 일련번호 
				hddnAddressField += "<input type=\"hidden\" name=\"zipNoDvCd4\"            id=\"zipNoDvCd4\"            value=\""+formObj._gb.value+"\">";           // 우편번호구분코드 (1:도로명, 2:지번) 
				hddnAddressField += "<input type=\"hidden\" name=\"exAdr4\"                id=\"exAdr4\"                value=\""+formObj._exAdr1.value+"\">";       // 부속주소 
				hddnAddressField += "<input type=\"hidden\" name=\"dwlShpCd4\"             id=\"dwlShpCd4\"             value=\""+formObj.dwlShpCd.value+"\">";      // 구조형태 
				hddnAddressField += "<input type=\"hidden\" name=\"vlgNm4\"                id=\"vlgNm4\"                value=\""+formObj.vlgNm.value+"\">";         // 마을명 
				hddnAddressField += "<input type=\"hidden\" name=\"aptNm4\"                id=\"aptNm4\"                value=\""+formObj.aptNm.value+"\">";         // 아파트명 
				hddnAddressField += "<input type=\"hidden\" name=\"bldApdgNm4\"            id=\"bldApdgNm4\"            value=\""+formObj.bldApdgNm.value+"\">";     // 건물동명 
				hddnAddressField += "<input type=\"hidden\" name=\"athnCntNm4\"            id=\"athnCntNm4\"            value=\""+formObj.athnCntNm.value+"\">";     // 호수명 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrRoadNmCd4\"        id=\"nwAdrRoadNmCd4\"        value=\""+formObj.nwAdrRoadNmCd.value+"\">"; // 신주소 도로명 코드
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrEmdSeqNo4\"        id=\"nwAdrEmdSeqNo4\"        value=\""+formObj.nwAdrEmdSeqNo.value+"\">"; // 신주소읍면동일련번호 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrUdgrYn4\"          id=\"nwAdrUdgrYn4\"          value=\""+formObj.nwAdrUdgrYn.value+"\">";   // 신주소지하여부 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrManBldNo4\"        id=\"nwAdrManBldNo4\"        value=\""+formObj.nwAdrManBldNo.value+"\">"; // 신주소주건물번호 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrSbBldNo4\"         id=\"nwAdrSbBldNo4\"         value=\""+formObj.nwAdrSbBldNo.value+"\">";  // 신주소부건물번호 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrBldMgntNo4\"       id=\"nwAdrBldMgntNo4\"       value=\""+formObj.nwAdrBldMgntNo.value+"\">";// 신주소건물관리번호 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrMntnYn4\"          id=\"nwAdrMntnYn4\"          value=\""+formObj.nwAdrMntnYn.value+"\">";   // 신주소산여부 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrManLdno4\"         id=\"nwAdrManLdno4\"         value=\""+formObj.nwAdrManLdno.value+"\">";  // 신주소주지번	
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrSbLdno4\"          id=\"nwAdrSbLdno4\"          value=\""+formObj.nwAdrSbLdno.value+"\">";   // 신주소부지번
				hddnAddressField += "<input type=\"hidden\" name=\"adrRfngYn4\"            id=\"adrRfngYn4\"            value=\""+formObj.adrRfngYn.value+"\">";     // 정재된 주소 여부
				hddnAddressField += "<input type=\"hidden\" name=\"admSftNonBldNm4\"       id=\"admSftNonBldNm4\"       value=\""+formObj.admSftNonBldNm.value+"\">";// 신주소건물명(행정안전부 건물명)
				hddnAddressField += "<input type=\"hidden\" name=\"pmilSeqNo41\"           id=\"pmilSeqNo41\"           value=\""+formObj._pmilSeqNo2.value+"\">";   // 우편일련번호(선택 반대값) 
				hddnAddressField += "<input type=\"hidden\" name=\"exAdr41\"               id=\"exAdr41\"               value=\""+formObj._exAdr2.value+"\">";       // 부속주소(선택 반대값)
				
				if(pbk.common.new_address.popupId == "studentAddress"){
					hddnAddressField += "<input type=\"hidden\" name=\"stdngCd\"              id=\"stdngCd\"              value=\""+formObj._stdngCd.value+"\">";         // 법정동코드4
//					hddnAddressField += "<input type=\"hidden\" name=\"basZoneNo4\"           id=\"basZoneNo4\"           value=\""+formObj._basZoneNo.value+"\">";       // 기초구역번호4
					hddnAddressField += "<input type=\"hidden\" name=\"basZoneBaseAdr1\"      id=\"basZoneBaseAdr1\"      value=\""+formObj._basZoneBaseAdr1.value+"\">"; // 기초구역기본주소14
					hddnAddressField += "<input type=\"hidden\" name=\"basZoneExAdr1\"        id=\"basZoneExAdr1\"        value=\""+formObj._basZoneExAdr1.value+"\">";   // 기초구역부속주소14
//					hddnAddressField += "<input type=\"hidden\" name=\"basZoneEngAdr14\"      id=\"basZoneEngAdr14\"      value=\""+formObj._basZoneEngAdr1.value+"\">";  // 기초구역영문주소14
					hddnAddressField += "<input type=\"hidden\" name=\"basZoneBaseAdr2\"      id=\"basZoneBaseAdr2\"      value=\""+formObj._basZoneBaseAdr2.value+"\">"; // 기초구역기본주소24
					hddnAddressField += "<input type=\"hidden\" name=\"basZoneExAdr2\"        id=\"basZoneExAdr2\"        value=\""+formObj._basZoneExAdr2.value+"\">";   // 기초구역부속주소24
//					hddnAddressField += "<input type=\"hidden\" name=\"basZoneEngAdr24\"      id=\"basZoneEngAdr24\"      value=\""+formObj._basZoneEngAdr2.value+"\">";  // 기초구역영문주소24
				}else{
					hddnAddressField += "<input type=\"hidden\" name=\"stdngCd4\"              id=\"stdngCd4\"              value=\""+formObj._stdngCd.value+"\">";         // 법정동코드4
					hddnAddressField += "<input type=\"hidden\" name=\"basZoneNo4\"            id=\"basZoneNo4\"            value=\""+formObj._basZoneNo.value+"\">";       // 기초구역번호4
					hddnAddressField += "<input type=\"hidden\" name=\"basZoneBaseAdr14\"      id=\"basZoneBaseAdr14\"      value=\""+formObj._basZoneBaseAdr1.value+"\">"; // 기초구역기본주소14
					hddnAddressField += "<input type=\"hidden\" name=\"basZoneExAdr14\"        id=\"basZoneExAdr14\"        value=\""+formObj._basZoneExAdr1.value+"\">";   // 기초구역부속주소14
					hddnAddressField += "<input type=\"hidden\" name=\"basZoneEngAdr14\"       id=\"basZoneEngAdr14\"       value=\""+formObj._basZoneEngAdr1.value+"\">";  // 기초구역영문주소14
					hddnAddressField += "<input type=\"hidden\" name=\"basZoneBaseAdr24\"      id=\"basZoneBaseAdr24\"      value=\""+formObj._basZoneBaseAdr2.value+"\">"; // 기초구역기본주소24
					hddnAddressField += "<input type=\"hidden\" name=\"basZoneExAdr24\"        id=\"basZoneExAdr24\"        value=\""+formObj._basZoneExAdr2.value+"\">";   // 기초구역부속주소24
					hddnAddressField += "<input type=\"hidden\" name=\"basZoneEngAdr24\"       id=\"basZoneEngAdr24\"       value=\""+formObj._basZoneEngAdr2.value+"\">";  // 기초구역영문주소24
				}
				
				$('hanaAddressDivHome').innerHTML = hddnAddressField;
				
			 } else if(pbk.common.new_address.popupId == "studentAddress1") {	// 학생증카드 수정 

				 document.wpcus409_09tForm.zipNo4.value                = formObj.zipNo.value;         // 우편번호
				 document.wpcus409_09tForm.pmilSeqNo4.value            = formObj._pmilSeqNo1.value;   // 우편번호 일련번호 
				 document.wpcus409_09tForm.zipNoDvCd4.value            = formObj._gb.value;           // 우편번호구분코드 (1:도로명, 2:지번) 
				 document.wpcus409_09tForm.exAdr4.value                = formObj._exAdr1.value;       // 부속주소 
				 document.wpcus409_09tForm.dwlShpCd4.value             = formObj.dwlShpCd.value;      // 구조형태 
				 document.wpcus409_09tForm.vlgNm4.value                = formObj.vlgNm.value;         // 마을명 
				 document.wpcus409_09tForm.aptNm4.value                = formObj.aptNm.value;         // 아파트명 
				 document.wpcus409_09tForm.bldApdgNm4.value            = formObj.bldApdgNm.value;     // 건물동명 
				 document.wpcus409_09tForm.athnCntNm4.value            = formObj.athnCntNm.value;     // 호수명 
				 document.wpcus409_09tForm.nwAdrRoadNmCd4.value        = formObj.nwAdrRoadNmCd.value; // 신주소 도로명 코드
				 document.wpcus409_09tForm.nwAdrEmdSeqNo4.value        = formObj.nwAdrEmdSeqNo.value; // 신주소읍면동일련번호 
				 document.wpcus409_09tForm.nwAdrUdgrYn4.value          = formObj.nwAdrUdgrYn.value;   // 신주소지하여부 
				 document.wpcus409_09tForm.nwAdrManBldNo4.value        = formObj.nwAdrManBldNo.value; // 신주소주건물번호 
				 document.wpcus409_09tForm.nwAdrSbBldNo4.value         = formObj.nwAdrSbBldNo.value;  // 신주소부건물번호 
				 document.wpcus409_09tForm.nwAdrBldMgntNo4.value       = formObj.nwAdrBldMgntNo.value;// 신주소건물관리번호 
				 document.wpcus409_09tForm.nwAdrMntnYn4.value          = formObj.nwAdrMntnYn.value;   // 신주소산여부 
				 document.wpcus409_09tForm.nwAdrManLdno4.value         = formObj.nwAdrManLdno.value;  // 신주소주지번	
				 document.wpcus409_09tForm.nwAdrSbLdno4.value          = formObj.nwAdrSbLdno.value;   // 신주소부지번
				 document.wpcus409_09tForm.adrRfngYn4.value            = formObj.adrRfngYn.value;     // 정재된 주소 여부
				 document.wpcus409_09tForm.admSftNonBldNm4.value       = formObj.admSftNonBldNm.value;// 신주소건물명(행정안전부 건물명)
				 document.wpcus409_09tForm.pmilSeqNo41.value           = formObj._pmilSeqNo2.value;   // 우편일련번호(선택 반대값) 
				 document.wpcus409_09tForm.exAdr41.value               = formObj._exAdr2.value;       // 부속주소(선택 반대값) 
				 
			 } else if(pbk.common.new_address.popupId == "popupJobAddress"){ //MyHana > 자택
				 
				if($j("#custInfoRegRlsDvCd561").length > 0){
					$j("#custInfoRegRlsDvCd561").val("1");
				}else{
					hddnAddressField += "<input type=\"hidden\" name=\"custInfoRegRlsDvCd561\" id=\"custInfoRegRlsDvCd561\" value=\"1\">";
				} // 주소변경여부
				
				
				hddnAddressField += "<input type=\"hidden\" name=\"zipNo5\"                id=\"zipNo5\"                value=\""+formObj.zipNo.value+"\">";         // 우편번호
				hddnAddressField += "<input type=\"hidden\" name=\"pmilSeqNo5\"            id=\"pmilSeqNo5\"            value=\""+formObj._pmilSeqNo1.value+"\">";   // 우편번호 일련번호 
				hddnAddressField += "<input type=\"hidden\" name=\"zipNoDvCd5\"            id=\"zipNoDvCd5\"            value=\""+formObj._gb.value+"\">";           // 우편번호구분코드 (1:도로명, 2:지번) 
				hddnAddressField += "<input type=\"hidden\" name=\"exAdr5\"                id=\"exAdr5\"                value=\""+formObj._exAdr1.value+"\">";       // 부속주소 
				hddnAddressField += "<input type=\"hidden\" name=\"dwlShpCd5\"             id=\"dwlShpCd5\"             value=\""+formObj.dwlShpCd.value+"\">";      // 구조형태 
				hddnAddressField += "<input type=\"hidden\" name=\"vlgNm5\"                id=\"vlgNm5\"                value=\""+formObj.vlgNm.value+"\">";         // 마을명 
				hddnAddressField += "<input type=\"hidden\" name=\"aptNm5\"                id=\"aptNm5\"                value=\""+formObj.aptNm.value+"\">";         // 아파트명 
				hddnAddressField += "<input type=\"hidden\" name=\"bldApdgNm5\"            id=\"bldApdgNm5\"            value=\""+formObj.bldApdgNm.value+"\">";     // 건물동명 
				hddnAddressField += "<input type=\"hidden\" name=\"athnCntNm5\"            id=\"athnCntNm5\"            value=\""+formObj.athnCntNm.value+"\">";     // 호수명 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrRoadNmCd5\"        id=\"nwAdrRoadNmCd5\"        value=\""+formObj.nwAdrRoadNmCd.value+"\">"; // 신주소 도로명 코드
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrEmdSeqNo5\"        id=\"nwAdrEmdSeqNo5\"        value=\""+formObj.nwAdrEmdSeqNo.value+"\">"; // 신주소읍면동일련번호 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrUdgrYn5\"          id=\"nwAdrUdgrYn5\"          value=\""+formObj.nwAdrUdgrYn.value+"\">";   // 신주소지하여부 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrManBldNo5\"        id=\"nwAdrManBldNo5\"        value=\""+formObj.nwAdrManBldNo.value+"\">"; // 신주소주건물번호 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrSbBldNo5\"         id=\"nwAdrSbBldNo5\"         value=\""+formObj.nwAdrSbBldNo.value+"\">";  // 신주소부건물번호 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrBldMgntNo5\"       id=\"nwAdrBldMgntNo5\"       value=\""+formObj.nwAdrBldMgntNo.value+"\">";// 신주소건물관리번호 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrMntnYn5\"          id=\"nwAdrMntnYn5\"          value=\""+formObj.nwAdrMntnYn.value+"\">";   // 신주소산여부 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrManLdno5\"         id=\"nwAdrManLdno5\"         value=\""+formObj.nwAdrManLdno.value+"\">";  // 신주소주지번	
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrSbLdno5\"          id=\"nwAdrSbLdno5\"          value=\""+formObj.nwAdrSbLdno.value+"\">";   // 신주소부지번
				hddnAddressField += "<input type=\"hidden\" name=\"adrRfngYn5\"            id=\"adrRfngYn5\"            value=\""+formObj.adrRfngYn.value+"\">";     // 정재된 주소 여부
				hddnAddressField += "<input type=\"hidden\" name=\"admSftNonBldNm5\"       id=\"admSftNonBldNm5\"       value=\""+formObj.admSftNonBldNm.value+"\">";// 신주소건물명(행정안전부 건물명)
				hddnAddressField += "<input type=\"hidden\" name=\"pmilSeqNo51\"           id=\"pmilSeqNo41\"           value=\""+formObj._pmilSeqNo2.value+"\">";   // 우편일련번호(선택 반대값) 
				hddnAddressField += "<input type=\"hidden\" name=\"exAdr51\"               id=\"exAdr41\"               value=\""+formObj._exAdr2.value+"\">";       // 부속주소(선택 반대값)
				
				hddnAddressField += "<input type=\"hidden\" name=\"stdngCd5\"              id=\"stdngCd5\"              value=\""+formObj._stdngCd.value+"\">";         // 법정동코드5
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneNo5\"            id=\"basZoneNo5\"            value=\""+formObj._basZoneNo.value+"\">";       // 기초구역번호5
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneBaseAdr15\"      id=\"basZoneBaseAdr15\"      value=\""+formObj._basZoneBaseAdr1.value+"\">"; // 기초구역기본주소15
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneExAdr15\"        id=\"basZoneExAdr15\"        value=\""+formObj._basZoneExAdr1.value+"\">";   // 기초구역부속주소15
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneEngAdr15\"       id=\"basZoneEngAdr15\"       value=\""+formObj._basZoneEngAdr1.value+"\">";  // 기초구역영문주소15
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneBaseAdr25\"      id=\"basZoneBaseAdr25\"      value=\""+formObj._basZoneBaseAdr2.value+"\">"; // 기초구역기본주소25
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneExAdr25\"        id=\"basZoneExAdr25\"        value=\""+formObj._basZoneExAdr2.value+"\">";   // 기초구역부속주소25
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneEngAdr25\"       id=\"basZoneEngAdr25\"       value=\""+formObj._basZoneEngAdr2.value+"\">";  // 기초구역영문주소25

				$('hanaAddressDivJob').innerHTML = hddnAddressField;				 
			 }
		},

		// 대출 - 우편번호 검색 - setting
		createHiddenAddressLoan: function(formObj) {
			 
			if(pbk.common.new_address.popupId == "loanHomeAddr"){ // 대출 - 자택주소 
		 	
		 		var homeAddressField = "";
				homeAddressField += "<input type=\"hidden\" name=\"nwAdrRoadNmCd\"  		id=\"nwAdrRoadNmCd\"   		value=\""+formObj.nwAdrRoadNmCd.value+"\">";	// 신주소도로명코드             
				homeAddressField += "<input type=\"hidden\" name=\"nwAdrEmdSeqNo\"   		id=\"nwAdrEmdSeqNo\"   		value='"+formObj.nwAdrEmdSeqNo.value+"'>";	// 신주소읍면동일련번호         
				homeAddressField += "<input type=\"hidden\" name=\"nwAdrUdgrYn\"   			id=\"nwAdrUdgrYn\"   		value=\""+formObj.nwAdrUdgrYn.value+"\">";	// 신주소지하여부               
				homeAddressField += "<input type=\"hidden\" name=\"nwAdrManBldNo\"  		id=\"nwAdrManBldNo\"   		value=\""+formObj.nwAdrManBldNo.value+"\">";	// 신주소주건물번호             
				homeAddressField += "<input type=\"hidden\" name=\"nwAdrSbBldNo\"  			id=\"nwAdrSbBldNo\"  		value=\""+formObj.nwAdrSbBldNo.value+"\">";	// 신주소부건물번호             
				homeAddressField += "<input type=\"hidden\" name=\"nwAdrBldMgntNo\" 		id=\"nwAdrBldMgntNo\"  		value=\""+formObj.nwAdrBldMgntNo.value+"\">";// 신주소건물관리번호           
				homeAddressField += "<input type=\"hidden\" name=\"nwAdrMntnYn\" 			id=\"nwAdrMntnYn\" 	 		value=\""+formObj.nwAdrMntnYn.value+"\">";	// 신주소산여부                 
				homeAddressField += "<input type=\"hidden\" name=\"nwAdrManLdno\"   		id=\"nwAdrManLdno\"    		value=\""+formObj.nwAdrManLdno.value+"\">";	// 신주소주지번                 
				homeAddressField += "<input type=\"hidden\" name=\"nwAdrSbLdno\" 			id=\"nwAdrSbLdno\" 	 		value=\""+formObj.nwAdrSbLdno.value+"\">";	// 신주소부지번                 
				homeAddressField += "<input type=\"hidden\" name=\"rfngTgtYn\" 	    		id=\"rfngTgtYn\" 			value=\""+formObj.adrRfngYn.value+"\">";		// 정제대상여부                 
				homeAddressField += "<input type=\"hidden\" name=\"admSftNonBldNm\" 		id=\"admSftNonBldNm\"  		value=\""+formObj.admSftNonBldNm.value+"\">";// 행정안전부건물명  
				homeAddressField += "<input type=\"hidden\" name=\"etcPmilSeqNo\" 			id=\"etcPmilSeqNo\" 		value=\""+formObj._pmilSeqNo2.value+"\">";	// 기타우편일련번호             
				homeAddressField += "<input type=\"hidden\" name=\"etcZipNoDvCd\" 			id=\"etcZipNoDvCd\" 		value=\""+formObj._gb.value+"\">";           // 기타우편번호구분코드         
				homeAddressField += "<input type=\"hidden\" name=\"etcExAdr\"	    		id=\"etcExAdr\"		 		value=\""+formObj._exAdr2.value+"\">";		// 기타부속주소      
				homeAddressField += "<input type=\"hidden\" name=\"pmilSeqNo\"   			id=\"pmilSeqNo\"    		value=\""+formObj._pmilSeqNo1.value+"\">";					// 우편번호 일련번호                 
				homeAddressField += "<input type=\"hidden\" name=\"etcAdr\" 				id=\"etcAdr\" 	 	 		value=\""+formObj._exAdr1.value+"\">";						// 부속주소
				homeAddressField += "<input type=\"hidden\" name=\"vlgNm\" 					id=\"vlgNm\" 	 	 		value=\""+formObj.vlgNm.value+"\">";			// 마을
				homeAddressField += "<input type=\"hidden\" name=\"aptNm\" 	    			id=\"aptNm\" 		 		value=\""+formObj.aptNm.value+"\">";			// 아파트명                 
				homeAddressField += "<input type=\"hidden\" name=\"bldApdgNm\" 				id=\"bldApdgNm\"  	 		value=\""+formObj.bldApdgNm.value+"\">";		// 동  
				homeAddressField += "<input type=\"hidden\" name=\"athnCntNm\" 				id=\"athnCntNm\" 	 		value=\""+formObj.athnCntNm.value+"\">";		// 호수            
				homeAddressField += "<input type=\"hidden\" name=\"dwlShpCd\" 				id=\"dwlShpCd\" 	 		value=\""+formObj.dwlShpCd.value+"\">";      // 구조형태코드         
				
				//하나원큐  비상금대출 고객정보update용
				homeAddressField += "<input type=\"hidden\" name=\"zipNo4\"                id=\"zipNo4\"                value=\""+formObj.zipNo.value+"\">";         // 우편번호
				homeAddressField += "<input type=\"hidden\" name=\"pmilSeqNo4\"            id=\"pmilSeqNo4\"            value=\""+formObj._pmilSeqNo1.value+"\">";   // 우편번호 일련번호 
				homeAddressField += "<input type=\"hidden\" name=\"zipNoDvCd4\"            id=\"zipNoDvCd4\"            value=\""+formObj._gb.value+"\">";           // 우편번호구분코드 (1:도로명, 2:지번) 
				homeAddressField += "<input type=\"hidden\" name=\"exAdr4\"                id=\"exAdr4\"                value=\""+formObj._exAdr1.value+"\">";       // 부속주소 
				homeAddressField += "<input type=\"hidden\" name=\"dwlShpCd4\"             id=\"dwlShpCd4\"             value=\""+formObj.dwlShpCd.value+"\">";      // 구조형태 
				homeAddressField += "<input type=\"hidden\" name=\"vlgNm4\"                id=\"vlgNm4\"                value=\""+formObj.vlgNm.value+"\">";         // 마을명 
				homeAddressField += "<input type=\"hidden\" name=\"aptNm4\"                id=\"aptNm4\"                value=\""+formObj.aptNm.value+"\">";         // 아파트명 
				homeAddressField += "<input type=\"hidden\" name=\"bldApdgNm4\"            id=\"bldApdgNm4\"            value=\""+formObj.bldApdgNm.value+"\">";     // 건물동명 
				homeAddressField += "<input type=\"hidden\" name=\"athnCntNm4\"            id=\"athnCntNm4\"            value=\""+formObj.athnCntNm.value+"\">";     // 호수명 
				homeAddressField += "<input type=\"hidden\" name=\"nwAdrRoadNmCd4\"        id=\"nwAdrRoadNmCd4\"        value=\""+formObj.nwAdrRoadNmCd.value+"\">"; // 신주소 도로명 코드
				homeAddressField += "<input type=\"hidden\" name=\"nwAdrEmdSeqNo4\"        id=\"nwAdrEmdSeqNo4\"        value=\""+formObj.nwAdrEmdSeqNo.value+"\">"; // 신주소읍면동일련번호 
				homeAddressField += "<input type=\"hidden\" name=\"nwAdrUdgrYn4\"          id=\"nwAdrUdgrYn4\"          value=\""+formObj.nwAdrUdgrYn.value+"\">";   // 신주소지하여부 
				homeAddressField += "<input type=\"hidden\" name=\"nwAdrManBldNo4\"        id=\"nwAdrManBldNo4\"        value=\""+formObj.nwAdrManBldNo.value+"\">"; // 신주소주건물번호 
				homeAddressField += "<input type=\"hidden\" name=\"nwAdrSbBldNo4\"         id=\"nwAdrSbBldNo4\"         value=\""+formObj.nwAdrSbBldNo.value+"\">";  // 신주소부건물번호 
				homeAddressField += "<input type=\"hidden\" name=\"nwAdrBldMgntNo4\"       id=\"nwAdrBldMgntNo4\"       value=\""+formObj.nwAdrBldMgntNo.value+"\">";// 신주소건물관리번호 
				homeAddressField += "<input type=\"hidden\" name=\"nwAdrMntnYn4\"          id=\"nwAdrMntnYn4\"          value=\""+formObj.nwAdrMntnYn.value+"\">";   // 신주소산여부 
				homeAddressField += "<input type=\"hidden\" name=\"nwAdrManLdno4\"         id=\"nwAdrManLdno4\"         value=\""+formObj.nwAdrManLdno.value+"\">";  // 신주소주지번	
				homeAddressField += "<input type=\"hidden\" name=\"nwAdrSbLdno4\"          id=\"nwAdrSbLdno4\"          value=\""+formObj.nwAdrSbLdno.value+"\">";   // 신주소부지번
				homeAddressField += "<input type=\"hidden\" name=\"adrRfngYn4\"            id=\"adrRfngYn4\"            value=\""+formObj.adrRfngYn.value+"\">";     // 정재된 주소 여부
				homeAddressField += "<input type=\"hidden\" name=\"admSftNonBldNm4\"       id=\"admSftNonBldNm4\"       value=\""+formObj.admSftNonBldNm.value+"\">";// 신주소건물명(행정안전부 건물명)
				homeAddressField += "<input type=\"hidden\" name=\"pmilSeqNo41\"           id=\"pmilSeqNo41\"           value=\""+formObj._pmilSeqNo2.value+"\">";   // 우편일련번호(선택 반대값) 
				homeAddressField += "<input type=\"hidden\" name=\"exAdr41\"               id=\"exAdr41\"               value=\""+formObj._exAdr2.value+"\">";       // 부속주소(선택 반대값)
				
				homeAddressField += "<input type=\"hidden\" name=\"stdngCd4\"              	id=\"stdngCd4\"             value=\""+formObj._stdngCd.value+"\">";         // 법정동코드4
				homeAddressField += "<input type=\"hidden\" name=\"basZoneNo4\"            	id=\"basZoneNo4\"           value=\""+formObj._basZoneNo.value+"\">";       // 기초구역번호4
				homeAddressField += "<input type=\"hidden\" name=\"basZoneBaseAdr14\"      	id=\"basZoneBaseAdr14\"     value=\""+formObj._basZoneBaseAdr1.value+"\">"; // 기초구역기본주소14
				homeAddressField += "<input type=\"hidden\" name=\"basZoneExAdr14\"        	id=\"basZoneExAdr14\"       value=\""+formObj._basZoneExAdr1.value+"\">";   // 기초구역부속주소14
				homeAddressField += "<input type=\"hidden\" name=\"basZoneEngAdr14\"       	id=\"basZoneEngAdr14\"      value=\""+formObj._basZoneEngAdr1.value+"\">";  // 기초구역영문주소14
				homeAddressField += "<input type=\"hidden\" name=\"basZoneBaseAdr24\"      	id=\"basZoneBaseAdr24\"     value=\""+formObj._basZoneBaseAdr2.value+"\">"; // 기초구역기본주소24
				homeAddressField += "<input type=\"hidden\" name=\"basZoneExAdr24\"        	id=\"basZoneExAdr24\"       value=\""+formObj._basZoneExAdr2.value+"\">";   // 기초구역부속주소24
				homeAddressField += "<input type=\"hidden\" name=\"basZoneEngAdr24\"       	id=\"basZoneEngAdr24\"      value=\""+formObj._basZoneEngAdr2.value+"\">";  // 기초구역영문주소24
				
				$('loanHomeAddrDiv').innerHTML = homeAddressField;
				
			} else if(pbk.common.new_address.popupId == "loanJobAddr"){ // 대출 - 직장주소
				
				var jobAddressField = "";	
				jobAddressField += "<input type=\"hidden\" name=\"nwAdrRoadNmCd2\"  		id=\"nwAdrRoadNmCd2\"  		value=\""+formObj.nwAdrRoadNmCd.value+"\">";	// 신주소도로명코드2            
				jobAddressField += "<input type=\"hidden\" name=\"nwAdrEmdSeqNo2\"  		id=\"nwAdrEmdSeqNo2\"  		value=\""+formObj.nwAdrEmdSeqNo.value+"\">";	// 신주소읍면동일련번호2        
				jobAddressField += "<input type=\"hidden\" name=\"nwAdrUdgrYn2\" 			id=\"nwAdrUdgrYn2\" 	 	value=\""+formObj.nwAdrUdgrYn.value+"\">";	// 신주소지하여부2              
				jobAddressField += "<input type=\"hidden\" name=\"nwAdrManBldNo2\"  		id=\"nwAdrManBldNo2\"  		value=\""+formObj.nwAdrManBldNo.value+"\">";	// 신주소주건물번호2            
				jobAddressField += "<input type=\"hidden\" name=\"nwAdrSbBldNo2\" 			id=\"nwAdrSbBldNo2\" 	 	value=\""+formObj.nwAdrSbBldNo.value+"\">";	// 신주소부건물번호2            
				jobAddressField += "<input type=\"hidden\" name=\"nwAdrBldMgntNo2\" 		id=\"nwAdrBldMgntNo2\" 		value=\""+formObj.nwAdrBldMgntNo.value+"\">";// 신주소건물관리번호2          
				jobAddressField += "<input type=\"hidden\" name=\"nwAdrMntnYn2\" 			id=\"nwAdrMntnYn2\" 	 	value=\""+formObj.nwAdrMntnYn.value+"\">";	// 신주소산여부2                
				jobAddressField += "<input type=\"hidden\" name=\"nwAdrManLdno2\" 			id=\"nwAdrManLdno2\" 	 	value=\""+formObj.nwAdrManLdno.value+"\">";	// 신주소주지번2                
				jobAddressField += "<input type=\"hidden\" name=\"nwAdrSbLdno2\" 			id=\"nwAdrSbLdno2\" 	 	value=\""+formObj.nwAdrSbLdno.value+"\">";	// 신주소부지번2                
				jobAddressField += "<input type=\"hidden\" name=\"rfngTgtYn2\"	    		id=\"rfngTgtYn2\"		 	value=\""+formObj.adrRfngYn.value+"\">";		// 정제대상여부2                
				jobAddressField += "<input type=\"hidden\" name=\"admSftNonBldNm2\" 		id=\"admSftNonBldNm2\" 		value=\""+formObj.admSftNonBldNm.value+"\">";// 행정안전부건물명2            
				jobAddressField += "<input type=\"hidden\" name=\"etcPmilSeqNo2\" 			id=\"etcPmilSeqNo2\" 	 	value=\""+formObj._pmilSeqNo2.value+"\">";	// 기타우편일련번호2            
				jobAddressField += "<input type=\"hidden\" name=\"etcZipNoDvCd2\" 			id=\"etcZipNoDvCd2\" 	 	value=\""+formObj._gb.value+"\">";	        // 기타우편번호구분코드2        
				jobAddressField += "<input type=\"hidden\" name=\"etcExAdr2\"	    		id=\"etcExAdr2\"		 	value=\""+formObj._exAdr2.value+"\">";		// 기타부속주소2		
				                                                                                                                                         
				jobAddressField += "<input type=\"hidden\" name=\"stdngCd5\"              	id=\"stdngCd5\"             value=\""+formObj._stdngCd.value+"\">";         // 법정동코드5
				jobAddressField += "<input type=\"hidden\" name=\"basZoneNo5\"            	id=\"basZoneNo5\"           value=\""+formObj._basZoneNo.value+"\">";       // 기초구역번호5
				jobAddressField += "<input type=\"hidden\" name=\"basZoneBaseAdr15\"      	id=\"basZoneBaseAdr15\"     value=\""+formObj._basZoneBaseAdr1.value+"\">"; // 기초구역기본주소15
				jobAddressField += "<input type=\"hidden\" name=\"basZoneExAdr15\"        	id=\"basZoneExAdr15\"       value=\""+formObj._basZoneExAdr1.value+"\">";   // 기초구역부속주소15
				jobAddressField += "<input type=\"hidden\" name=\"basZoneEngAdr15\"       	id=\"basZoneEngAdr15\"      value=\""+formObj._basZoneEngAdr1.value+"\">";  // 기초구역영문주소15
				jobAddressField += "<input type=\"hidden\" name=\"basZoneBaseAdr25\"      	id=\"basZoneBaseAdr25\"     value=\""+formObj._basZoneBaseAdr2.value+"\">"; // 기초구역기본주소25
				jobAddressField += "<input type=\"hidden\" name=\"basZoneExAdr25\"        	id=\"basZoneExAdr25\"       value=\""+formObj._basZoneExAdr2.value+"\">";   // 기초구역부속주소25
				jobAddressField += "<input type=\"hidden\" name=\"basZoneEngAdr25\"       	id=\"basZoneEngAdr25\"      value=\""+formObj._basZoneEngAdr2.value+"\">";  // 기초구역영문주소25

				$('loanJobAddrDiv').innerHTML = jobAddressField;
			} else if(pbk.common.new_address.popupId == "autoLoanJobAddr" || pbk.common.new_address.popupId == "saitdolLoanJobAddr"){	// 1Q오토론,사잇돌대출 - 직장주소
				
				document.getElementById("nwAdrRoadNmCd2").value = formObj.nwAdrRoadNmCd.value;			//신주소도로명코드2
				document.getElementById("nwAdrEmdSeqNo2").value = formObj.nwAdrEmdSeqNo.value;			//신주소읍면동일련번호2
				document.getElementById("nwAdrUdgrYn2").value = formObj.nwAdrUdgrYn.value;				//신주소지하여부2
				document.getElementById("nwAdrManBldNo2").value = formObj.nwAdrManBldNo.value;			//신주소주건물번호2
				
				document.getElementById("nwAdrSbBldNo2").value = formObj.nwAdrSbBldNo.value;			//신주소부건물번호2
				document.getElementById("nwAdrBldMgntNo2").value = formObj.nwAdrBldMgntNo.value;		//신주소건물관리번호2
				document.getElementById("nwAdrManLdno2").value = formObj.nwAdrManLdno.value;			//신주소산여부2
				document.getElementById("nwAdrSbLdno2").value = formObj.nwAdrSbLdno.value;				//신주소주지번2
				document.getElementById("nwAdrMntnYn2").value = formObj.nwAdrMntnYn.value;				//신주소부지번2
				document.getElementById("admSftNonBldNm2").value = formObj.admSftNonBldNm.value;		//행정안전부건물명2
				document.getElementById("etcPmilSeqNo2").value = formObj._pmilSeqNo2.value;				//기타우편일련번호2
				document.getElementById("etcExAdr2").value = formObj._exAdr2.value;						//기타부속주소2
				if(pbk.common.new_address.popupId == "saitdolLoanJobAddr"){
					document.getElementById("rfngTgtYn2").value = formObj.adrRfngYn.value;					//주소정제여부2
				}else{
					document.getElementById("adrRfngYn2").value = formObj.adrRfngYn.value;					//주소정제여부2
				}
			}
		},		
		
		/**
		 * 선택한 주소값 부모창에 세팅 (구조형태 미선택)
		 * post3Obj : 우편번호1, post4Obj : 우편번호2
	 	 * oPmilSeqNo : 우편일련번호
	 	 * address3Obj : 기본주소, address3Obj : 상세주소
		 */
		 
		 newSetInfo_2: function(formObj){
			 	if (post3Obj && null != post3Obj) {
					post3Obj.value = formObj.zipNo.value.substring(0,3);
				}
				if (post4Obj && null != post4Obj) {
					post4Obj.value = formObj.zipNo.value.substring(3,6);
				}

				if (oPmilSeqNo1 && null != oPmilSeqNo1) {
					oPmilSeqNo1.value = formObj._pmilSeqNo1.value;
				}
				
	            if ($('pmilSeqNo2')){
	                $('pmilSeqNo2').value =  formObj._pmilSeqNo1.value;
	                $('zipNoDvCd2').value =  formObj._gb.value;
	            }

				if (oZipNoDvCd1 && null != oZipNoDvCd1) {
					oZipNoDvCd1.value = formObj._gb.value;
				}

				if (address3Obj && null != address3Obj) {
					address3Obj.value = formObj.ExAdr1.value;
				}

				if (address4Obj && null != address4Obj) {
					address4Obj.value = formObj.ExAdr2.value;
				}

				pbk.common.new_address.closePop();
		},	

		
		/**
		 * 선택한 주소값 부모창에 세팅 (구조형태 미선택)
		 * post3Obj : 우편번호1, post4Obj : 우편번호2
	 	 * oPmilSeqNo : 우편일련번호
	 	 * address3Obj : 기본주소, address3Obj : 상세주소
		 */
		 
		 newSetInfo_3: function(formObj){

			 if (post3Obj && null != post3Obj) {
				post3Obj.value = formObj.zipNo.value.substring(0,3);
			}
			

			if (post4Obj && null != post4Obj) {
				post4Obj.value = formObj.zipNo.value.substring(3,6);
			}

			if (oPmilSeqNo1 && null != oPmilSeqNo1) {
				oPmilSeqNo1.value = formObj.pmilSeqNo.value;
			}
			
			if ($('pmilSeqNo2')){
                $('pmilSeqNo2').value =  formObj.pmilSeqNo.value;
                $('zipNoDvCd2').value =  formObj.oZipNoDvCd.value;
            }

			if (oZipNoDvCd1 && null != oZipNoDvCd1) {
				oZipNoDvCd1.value = formObj.oZipNoDvCd.value;
			}

			if (address3Obj && null != address3Obj) {
				if(formObj.oZipNoDvCd.value == "1" || formObj.oZipNoDvCd.value == ZIP_NO_CODE_DORO){ //도로명
					address3Obj.value = formObj.adr110.value;
				}else if(formObj.oZipNoDvCd.value == "2" || formObj.oZipNoDvCd.value == ZIP_NO_CODE_GIBUN){ //지번
					address3Obj.value = formObj.adr2.value;
				}
			}

			if (address4Obj && null != address4Obj) {
				address4Obj.select();
				address4Obj.focus();
			}

			if (address4Obj && formObj.gb.value == '1'){
				address4Obj.value = "";
				address4Obj.select();
				address4Obj.focus();
			}
		 
			pbk.common.new_address.closePop();		

		},		
		 
		 /*
		  * 주소찾기 취소
		  */
		 addressCancel : function(gb){
			var formObj ;
			formObj = form.createForm([{id: 'addrType', value: gb}]);
	    	
			var hanaAjax = new hana.JHanaAjax("ContentDiv", true, true);
	    	hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/new_address_pop_01.do", formObj);
			
		 },

		 /*
		  * 팝업닫기
		  */
		  closePop: function(){
			 opb.common.layerpopup.closeLayer_fnc(pbk.common.new_address.popupId);
			 pbk.common.new_address.popupId = null;
		 },
			
		 /**
		     * 특수문자 입력 제외 
		     */
			isEtcChar : function (value) {
				var chars = "~!@#$%^&*()`_+|=\{}[]:;\"'<>?,./";
		        return pbk.common.new_address.containsEtcChars(value,chars);
			},
		        
		    /**
		     * 입력값에 특정 문자(chars)가 포함되어 있는지 확인
		     * 특정 문자만 비허용하려 할 때 사용
		     */
		     containsEtcChars : function (value,chars) {
				for (var inx = 0; inx < value.length; inx++) {
					if (chars.indexOf(value.charAt(inx)) > -1)
						return false;
	           	}
	           	return true;
	        },
		 dummy : null
	};
}();



/************************************************************
 * 송금용 새로운주소(도로명주소) 검색
 * @since 2015.15.29
 * @author 유정일 
 ************************************************************/
pbk.common.remit_new_address = function() {
	
	var post3Obj    = null; //우편번호1
	var post4Obj    = null;	//우편번호2
	var address3Obj = null; //주소1
	var address4Obj = null; //주소2
	
	return {
		
		popupId : null,
		
		/**
		 * 우편번호 찾기 POPUP Master
		 */
		newOpenPopMaster : function(post1El, post2El, address1El, address2El, back_id){
			
			pbk.common.remit_new_address.popupId  = "addrPopId1";
			post3Obj    = post1El;
			post4Obj    = post2El;
			address3Obj = address1El;
			address4Obj = address2El;
			
			var url = opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/remit_address_pop.do";
		    opb.common.layerpopup.openLayer_fnc(url, "hanaPopUpDiv", null, null, back_id);
		},
		
		/**
		 * 우편번호 검색 팝업 호출
		 */
		goNewOpenPop : function() {
			//우편번호 검색 팝업 호출
			pbk.common.remit_new_address.newOpenPop("G");
		},
		
		/**
		 * 우편번호 부모창 매핑
		 */
		setAddress : function(back_id) {
			//validate
			if(document.getElementById("zipNo1").value == "" 
			|| document.getElementById("zipNo2").value == ""
			|| document.getElementById("addr1").value  == ""
			|| document.getElementById("addr2").value  == "") {
				opb.common.layerpopup.openAlert_fnc("주소오류", "우편번호, 주소 및 상세주소가 입력되지 않았습니다.", back_id);
	 			return false;
			}
			
			post3Obj.value 	  = document.getElementById("zipNo1").value;
			post4Obj.value    = document.getElementById("zipNo2").value;
			address3Obj.value = document.getElementById("addr1").value;
			address4Obj.value = document.getElementById("addr2").value;
			
			//팝업종료
			opb.common.layerpopup.closeLayer_fnc("hanaPopUpDiv");
		},
		
		/**
		 * 우편번호찾기 POPUP 창을 연다. 
		 */
		 newOpenPop: function(addrType){			
			var oSendForm = form.createForm([{id:"addrType", value:addrType}]);
			opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/remit_new_address_pop.do", "addrPopId1", null, oSendForm, null);
		 },
		 
		 /**
		  * 팝업닫기
		  */
		 closePop: function(){
			 opb.common.layerpopup.closeLayer_fnc(pbk.common.remit_new_address.popupId);
			 pbk.common.remit_new_address.popupId = null;
		 },
	
		 /**
		 * 탭메뉴 넘김
		 */
		 goTabMenu : function(addrType, menuGb){
			 var oSendForm = form.createForm([{id:"addrType", value:addrType},{id:"menuGb", value:menuGb}]);
			 var hanaAjax = new hana.JHanaAjax("HanaPopContentDiv", true, true);
			 hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/remit_new_address_pop_01.do", oSendForm);
		 },
		
		 /**
		  * 탭으로 이동함
		  * tabDivId : 내용부분
		  * Url : 내용부분 URL
		  */
		 tabMenuGo : function(tabDivId, Url, tabFlag){
			 if(tabFlag != "G"){
				 $j("#tab01").removeClass("ons");
				 $j("#tab02").addClass("ons");
			 }
			 else{
				 $j("#tab01").addClass("ons");
				 $j("#tab02").removeClass("ons");
			 }
			 var hanaAjax = new hana.JHanaAjax(tabDivId, true, true);
			 hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + Url, null);
		 },
		 
		 /**
		  * 지번 검색 STEP01
		  */
		 gibenSearchList: function(formObj){
			 var jForm = new hana.JForm();
			 if (!jForm.add(new hana.JText('동/읍/면 이름', formObj.emdNm).range(3, 10)).validate()) {
					return;
			}
			
			 if(formObj.emdNm.value != "" && !pbk.common.new_address.isEtcChar(formObj.emdNm.value)) {
				 opb.common.layerpopup.openAlert_fnc("입력오류", "동/읍/면 이름에 특수문자는 입력할 수 없습니다.");
				 return;
			 }
			
			 /*******
			 var sdNm; //시도명
			 var tagListSdNm = formObj._sdNm.value.split("|"); //코드 | 코드명 (시도)

			 //충청북도 : 43 , 충청남도 : 44
			 //전라북도 : 45 , 전라남도 : 46
			 //경상북도 : 47 , 경상남도 : 48
			 if(tagListSdNm[0] == 43 || tagListSdNm[0] == 44 || tagListSdNm[0] == 45  ||
				tagListSdNm[0] == 46 || tagListSdNm[0] == 47 || tagListSdNm[0] == 48) {
				 sdNm = tagListSdNm[1].substring(0,1) + tagListSdNm[1].substring(2,3);
			 }
			 else {
				 sdNm =  tagListSdNm[1].substring(0,2);
			 }
			
			 form.createHiddenField(formObj, "sdNm", sdNm); //시도명
			*************/
			 var hanaAjax = new hana.JHanaAjax("addressresult", true, true);
			 hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/remitAddressContentGiben_02.do", formObj);
		 },
		
		 /**
		  * 지번 주소목록 선택
		  */
		 gibenSelectedList : function(formObj) {
			 document.getElementById("zipNo1").value = formObj.zipNo.value.substring(0,3);
			 document.getElementById("zipNo2").value = formObj.zipNo.value.substring(3);
			 document.getElementById("addr1").value  = formObj.adr.value;
			 document.getElementById("addr2").value  = "";
			 
			 //우편번호 검색창닫기
			 pbk.common.remit_new_address.closePop();
		 },
		 
		 /**
		  * 도로명 우편번호 검색 STEP01
		  */
		 doloNmSearchList : function(formObj) {
			var jForm = new hana.JForm();
			if(!jForm.add(new hana.JSelect("시도", formObj._nwAdrSdNm))
					  .add(new hana.JText("도로명", formObj.nwAdrRoadNm))
					  .add(new hana.JText("읍면동명", formObj.nwAdrEmdNm)).validate()) {
				return;
			}
			
			var tagListSdNm = formObj._nwAdrSdNm.value.split("|"); //코드 | 코드명 (시도)

			if(tagListSdNm[0] != "36") { //세종시 (시군구 미존재) - 필수 체크 제외
				if(formObj.nwAdrSkkNm.value == "") {
					opb.common.layerpopup.openAlert_fnc("입력오류", "시군구를 입력하세요.", "nwAdrSkkNm");
					return;
				}
			}
				
			if(formObj.nwAdrRoadNm.value != "" && !pbk.common.new_address.isEtcChar(formObj.nwAdrRoadNm.value)) {
				opb.common.layerpopup.openAlert_fnc("입력오류", "도로명에 특수문자는 입력할 수 없습니다.", "nwAdrRoadNm");
				return;
			}
			
			if(formObj.nwAdrEmdNm.value != "" && !pbk.common.new_address.isEtcChar(formObj.nwAdrEmdNm.value)) {
				opb.common.layerpopup.openAlert_fnc("입력오류", "읍면동명에 특수문자는 입력할 수 없습니다.", "nwAdrEmdNm");
				return;
			}			
			
			form.createHiddenField(formObj, "nwAdrSdNm" , tagListSdNm[1]);
			form.createHiddenField(formObj, "nwAdrBldNm", formObj._nwAdrBldNm.value); // 건물명
			
			var hanaAjax = new hana.JHanaAjax("addressTabBodyDiv", true, true);
			hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/remitAddressContentDolonm_02.do", formObj);
		 },	

		 /**
		  * 도로명 목록 선택
		  */
		 doloNmSelectedList : function(formObj) {
			 document.getElementById("zipNo1").value = formObj.zipNo.value.substring(0,3);
			 document.getElementById("zipNo2").value = formObj.zipNo.value.substring(3);
			 document.getElementById("addr1").value  = formObj.adr110.value;
			 document.getElementById("addr2").value  = "";
			 
			 //우편번호 검색창닫기
			 pbk.common.remit_new_address.closePop();
		 },
		
		 dummy : null
	};
}();
