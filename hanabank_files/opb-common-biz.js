/*****************************************************************************
 * 파일명 : pbk-common-biz.js 
 * 작성일 : 2015. 10. 05
 * 작성자 : ksnam 
 * 설   명 : 업무 에서 공통으로 사용하는 javascript.
 * ===========================================================================
 * 변경이력:
 * DATE             AUTHOR      DESCRIPTION
 * ---------------------------------------------------------------------------
 * 변경 이력은 이곳에 추가 합니다.
 *****************************************************************************/

pbk.common.biz = function() {
	 
	return {

		//시간분류
		fundTimeCheck : function(){
		
			today =  hana.JHanaUtils.date.getToday('H:i');
			
			var thisHours = today.substring(0,2);
		
			var thisMinutes = today.substring(3);

			var checkTime = thisHours + thisMinutes; 
			
			return checkTime;
		},
		
		// 통화코드 조회 
		currCodeInquiry : function(oForm, oCurCd, sCurCd){
	
    		var SPAN_CURRENCY = 'spanCurrency';         // 통화단위(USD,JYP...) 출력 SPAN
    		
    		//다통화계좌 추가, 2016-03-29
			var _multiCurAcctYn = "N";
			var _acctNo = oForm.acctNo.value;
			var _tailNo = _acctNo.substring(_acctNo.length-2, _acctNo.length);
			if(_tailNo == "38") _multiCurAcctYn = "Y";

			var jForm = new hana.JForm();
			var hanaAjax = new hana.JHanaAjax(null, true, true);
			hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT +'/common/currCodeInquiry.do', 
				oForm , 
				true, 
				function(res) {
					opb.common.ajax.parseAjaxData_fnc(res,true);
			    	var _data = eval('(' + res.responseText + ')');
					if (_data.contMap) {
						var ResultLIST = _data.contMap['BIZ.PFX0081.OUT.REC'];
		                for(var i=0; i<ResultLIST.size(); i++){
		                	if(_multiCurAcctYn == "Y") {
		                		//자계좌;통화코드 조립, 2016-03-29
		                		oCurCd.options[i + 1] = new Option(ResultLIST[i].curCd, ResultLIST[i].acctNo+";"+ResultLIST[i].curCd);
		                	}
		                	else {
		                		oCurCd.options[i + 1] = new Option(ResultLIST[i].curCd, ResultLIST[i].curCd);
		                	}
							
							if(ResultLIST[i].curCd == sCurCd) {
								
								oCurCd[i+1].selected = "true";
								
					            // 해당 계좌 통화코드 표시 필드가 있다면
					            var oSpanCurrency = document.getElementById(SPAN_CURRENCY);
					            if (oCurCd != null && oSpanCurrency != undefined) {
					            	oSpanCurrency.innerHTML = sCurCd;
								}
							}
						}
		                
		                //다통화 외화계좌 거래내역 자동조회(계좌조회▶거래내역 화면이동시에만 적용) 처리, 2016-12-06
		                //console.log(">>>>>>autoExecYn=" + $("autoExecYn").value);
		                if($("autoExecYn") != undefined && $("autoExecYn").value == "Y") {
		                	pbk.inquiry.account.transact.searchTransactActionRenewal(document.forms['transactForm']);
		                	$("autoExecYn").value = "N";
		                }
		                
					}
				}, 
				'euc-kr' );
		},
		
		// 통화코드 조회 상품 임시저장 기능 추가 2017.09.14
		currCodeInquiry2 : function(oForm, oCurCd, sCurCd){
	
    		var SPAN_CURRENCY = 'spanCurrency';         // 통화단위(USD,JYP...) 출력 SPAN
    		
    		//다통화계좌 추가, 2016-03-29
			var _multiCurAcctYn = "N";
			var _acctNo = oForm.acctNo.value;
			var _tailNo = _acctNo.substring(_acctNo.length-2, _acctNo.length);
			if(_tailNo == "38") _multiCurAcctYn = "Y";

			var jForm = new hana.JForm();
			var hanaAjax = new hana.JHanaAjax(null, true, true);
			hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT +'/common/currCodeInquiry.do', 
				oForm , 
				true, 
				function(res) {
					opb.common.ajax.parseAjaxData_fnc(res,true);
			    	var _data = eval('(' + res.responseText + ')');
					if (_data.contMap) {
						var ResultLIST = _data.contMap['BIZ.PFX0081.OUT.REC'];
		                for(var i=0; i<ResultLIST.size(); i++){
		                	if(_multiCurAcctYn == "Y") {
		                		//자계좌;통화코드 조립, 2016-03-29
		                		oCurCd.options[i + 1] = new Option(ResultLIST[i].curCd, ResultLIST[i].acctNo+";"+ResultLIST[i].curCd);
		                	}
		                	else {
		                		oCurCd.options[i + 1] = new Option(ResultLIST[i].curCd, ResultLIST[i].curCd);
		                	}
							
							if(ResultLIST[i].curCd == sCurCd) {
								
								oCurCd[i+1].selected = "true";
								
					            // 해당 계좌 통화코드 표시 필드가 있다면
					            var oSpanCurrency = document.getElementById(SPAN_CURRENCY);
					            if (oCurCd != null && oSpanCurrency != undefined) {
					            	oSpanCurrency.innerHTML = sCurCd;
					            	 
								}
							}
						}
		                
		                //다통화 외화계좌 거래내역 자동조회(계좌조회▶거래내역 화면이동시에만 적용) 처리, 2016-12-06
		                //console.log(">>>>>>autoExecYn=" + $("autoExecYn").value);
		                if($("autoExecYn") != undefined && $("autoExecYn").value == "Y") {
		                	pbk.inquiry.account.transact.searchTransactActionRenewal(document.forms['transactForm']);
		                	$("autoExecYn").value = "N";
		                }
					}
					
	                //임시 저장호출시 다통화 코드 선택
	                if(typeof jQuery("[name=outCd]").val()!= "undefined"){
	                	
		    			if(jQuery("[name=outCd]").val() != "" && jQuery("[name=outCd]").val() != null){
		    				
		    				var setCd = jQuery("[name=outCd]").val();
		    				var setnewAmt = jQuery("[name=outnewAmt]").val();
		    				
			    			jQuery("[name=outCurCd] [value*="+setCd+"]").attr("selected",true);
			    					
			    			jQuery("[name=outCurCd]").trigger("change");	
			    			jQuery("#hiddenFuncBtn").click();		// 잔액 조회
			    			
			    			//신규금액 셋팅
			    			jQuery("[name=newAmt]").attr("value",setnewAmt);
			    			
			    			// 초기화
			    			jQuery("[name=outCd]").attr("value","");
			    			jQuery("[name=outnewAmt]").attr("value","");
			    			
		    			}
	                }
				}, 
				'euc-kr' );
		},
		
		// 통화코드 조회  202110 open용도
		currCodeInquiry3 : function(oForm, oCurCd, sCurCd){
	
    		var SPAN_CURRENCY = 'spanCurrency';         // 통화단위(USD,JYP...) 출력 SPAN
    		//다통화계좌 추가, 2016-03-29
			var _multiCurAcctYn = "N";
			var _acctNo = oForm.acctNo.value;
			var _tailNo = _acctNo.substring(_acctNo.length-2, _acctNo.length);
			if(_tailNo == "38") _multiCurAcctYn = "Y";

			var jForm = new hana.JForm();
			var hanaAjax = new hana.JHanaAjax(null, true, true);
			hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT +'/common/currCodeInquiry.do', 
				oForm , 
				true, 
				function(res) {
					opb.common.ajax.parseAjaxData_fnc(res,true);
			    	var _data = eval('(' + res.responseText + ')');
					if (_data.contMap) {
						jQuery(".ib-select-list ul").empty();
						var ResultLIST = _data.contMap['BIZ.PFX0081.OUT.REC'];
		                for(var i=0; i<ResultLIST.size(); i++){
		                	if(_multiCurAcctYn == "Y") {
		                		//자계좌;통화코드 조립, 2016-03-29
		                		oCurCd.options[i + 1] = new Option(ResultLIST[i].curCd, ResultLIST[i].acctNo+";"+ResultLIST[i].curCd);
		                		var ibSelectListUlLiHiddenHtml = "<input type='hidden' value='" + ResultLIST[i].acctNo+";"+ResultLIST[i].curCd + "' />" ;
		                		jQuery(".ib-select-list ul").append("<li>" +ibSelectListUlLiHiddenHtml + ResultLIST[i].curCd + "</li>");
		                	}
		                	else {
		                		oCurCd.options[i + 1] = new Option(ResultLIST[i].curCd, ResultLIST[i].curCd);
		                		var ibSelectListUlLiHiddenHtml = "<input type='hidden' value='" + ResultLIST[i].curCd + "' />" 
		                		jQuery(".ib-select-list ul").append("<li>" +ibSelectListUlLiHiddenHtml + ResultLIST[i].curCd + "</li>");
		                	}
							
							if(ResultLIST[i].curCd == sCurCd) {
								oCurCd[i+1].selected = "true";
								var thisVal =$(".ib-select-wrap select option:selected").val();
								jQuery('.ib-select').html(thisVal);
								
					            // 해당 계좌 통화코드 표시 필드가 있다면
					            var oSpanCurrency = document.getElementById(SPAN_CURRENCY);
					            if (oCurCd != null && oSpanCurrency != undefined) {
					            	oSpanCurrency.innerHTML = sCurCd;
								}
							}
						}
		                
		                //다통화 외화계좌 거래내역 자동조회(계좌조회▶거래내역 화면이동시에만 적용) 처리, 2016-12-06
		                if(jQuery("autoExecYn") != undefined && jQuery("autoExecYn").value == "Y") {
		                	pbk.inquiry.account.transact.searchTransactActionRenewal(document.forms['transactForm']);
		                	jQuery("autoExecYn").value = "N";
		                }
		                
					}
				}, 
				'euc-kr' );
		},
		
		
        /**
         * 소수점 자리수 size 보다크면 자른다.
         *
         * @since 2008.12.03 kj
         */
        roundOff : function(numStr, size) {

            if(size == undefined) size = 2;

            var money = opb.common.util.stripCommas_fnc(numStr.toString().replace(/-|\s+/g, ""));

            if(money.length == 0) return '0';
            if(money.indexOf('.') < 0) money = money+'.00';

            var moneySplit = money.split('.');     // 지수/소수부 분리.
            moneySplit[1] = moneySplit[1]+'00000000000000000000';

            if(size == 0)
                return moneySplit[0];
            else
                return moneySplit[0]+'.'+moneySplit[1].substring(0,size);
        },
		
        /**		
         * 전자금융거래 보안등급별 이체한도 인하 안내
         */		
        limitReduceInfoPopup: function() {		
        	var url = '/common/popup/limitReduceInfo.do';
        	url = pbk.APPLICATION_CONTEXT_ROOT + url;
        	
        	opb.common.layerpopup.openLayer_fnc(url, 'limitReduceInfoPopup', null, null, null);
        },
        
        closeLimitReduceInfoPopup: function(popNm, chk) {
        	if(chk){
        		var notOpenDay = document.getElementById('notOpenDay');
	        	var todayDate = new Date();
	    		todayDate.setDate(todayDate.getDate() + Number(notOpenDay.value));
	    		document.cookie = popNm + "=" + escape("ok") + "; path=/; expires=" + todayDate.toGMTString() + ";";
        	}
    		
        	opb.common.layerpopup.closeLayer_fnc(popNm);
        },
        
		/**
		* 증권계좌보기 팝업
		* 
		* @param {String} href URL
		* 
		*/
	   	openPopStockInfo : function(acctNo, backObjID){
		   	
		   	if( acctNo == undefined || acctNo == null ){
				   alert("접근 오류");
				   return false;
			   }
		   	
		   	var formObj = form.createForm([{id:'srchNo', value :acctNo}] );
		   	
		   	//pbk.extJS.popup.isPrint = true;
			opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT + "/inquiry/account/wpdep406_47p.do", 'stockInquiry', null, formObj, backObjID);
		   	
	   	},
		
        /**
         * 동일 내역 이체
         * @param {String} accNo       : 출금계좌번호
         * @param {String} bankCodeRcv : 입금은행
         * @param {String} acctNoRcv 	 : 입금계좌번호
         */
         sameTransfer : function(accNo, bankCodeRcv, acctNoRcv, acctCmd, acctCmdRcv, cmsNo, memo){

      	   var frmObj = form.createForm([{id :'sameTransfer', value : 'Y'},
      	                                 {id :'acctNo'		, value : accNo},
      	                                 {id :'bankCodeRcv'	, value : bankCodeRcv},
      	                                 {id :'acctNoRcv'	, value : acctNoRcv},
      	                                 {id :'acctCmd'		, value : acctCmd},
      	                                 {id :'acctCmdRcv'	, value : acctCmdRcv},
      	                                 {id :'cmsNo'		, value : cmsNo},
      	                                 {id :'memo'		, value : memo}] );
      	  // pbk.web.util.goMenu("/transfer/account/wpdep411_01t_01.do?", [{id:'sameTransfer', value:'Y'}, {id:'acctNo', value:accNo}, {id:'bankCodeRcv', value:bankCodeRcv}, {id:'acctNoRcv', value:acctNoRcv}, {id:'acctCmd', value:acctCmd}, {id:'acctCmdRcv', value:acctCmdRcv}, {id:'cmsNo', value:cmsNo}]);
      	   pbk.web.util.goRefreshMenu("/transfer/account/wpdep421_01t_01.do",frmObj);
         },
		
         downloadAdobe : function(){
			 //아크로벳리더 다운로드
			 var url = "http://www.adobe.com/kr/products/acrobat/readstep2.html";
			 var leftX = screen.width / 2 - 800 / 2;
		     var topY = -75 + screen.height / 2 - 600 / 2;
		     var featuresValue = 'width=' +  800 + ',height=' + 600 ;
		     featuresValue += ',left=' + leftX + ',top=' + topY + ',scrollbars=yes';
		     window.open(url,'hanabank',featuresValue);
         },
         
 		 /*
          * 펀드 투자자 예탁금 차액지급 안내팝업
          */
         openPopUpDepositInfo : function(){	
        	var _today = date.getToday();
 			_today = parseInt(_today, 10);
 			
 			if(_today < 20130104 ||_today > 20130430) {
 		        return;
 			}
 			var url = opb.base.APPLICATION_CONTEXT_ROOT + "/fund/transfer/wpfnd432_19p.do";
 			
 			var data = hana.JHanaUtils.cookie.getCookie('depositDifferenceInfo');
 			if(data != "Y"){ 
 				opb.common.layerpopup.openLayer_fnc(url, 'depositDifferenceInfo', null, null, null);     
 			}        		   	        
         },

         openPopUpDepositInfo_chkBox : function(form){
 			if(form.today.checked == true){
 				hana.JHanaUtils.cookie.setCookie('depositDifferenceInfo', 'Y', hana.JHanaUtils.cookie.getExpDate(1,0,0),'/',window.location.hostname);
 			}
 			opb.common.layerpopup.closeLayer_fnc('depositDifferenceInfo');
         },

         /**
          * 대시 제거 ,콤마 제거
          * @param {Object} dayStr
          */
         removeDash : function(stringVal){
             var retVal = stringVal;
             
             retVal = util.replaceAll(retVal, '-', '');
             retVal = util.replaceAll(retVal, '.', '');
             retVal = util.replaceAll(retVal, '/', '');
             retVal = util.replaceAll(retVal, ',', '');
             retVal = util.replaceAll(retVal, '<', '');
             retVal = util.replaceAll(retVal, '>', '');
             retVal = util.replaceAll(retVal, ' ', '');
             
             return retVal;
         }
         
	};
}();

/*
 * 개인신용정보수집동의 
 */
pbk.common.agreeCustInfo = function(){
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
			var oOpenedWindow = window.open(opb.base.IMG_SVR_DOMAIN + BASE_DIR + _fileName, "", "width=600, height=400, screenX=-100, screenY=-100, left=-10, top=-10 resizable=1");
			try {
				/* 자동로그아웃시간 연장 (20130306 자동으로 연장시키는 방법 사용 안함) */
//				opb.common.util.auto_logout_timer.renewAutoLogoutTime_fnc();
			}catch(e) {
			}

			//고객권리 안내문 클릭 여부
			if(document.getElementById('isDownCREDIT_INFOMATION') != undefined){
				document.getElementById('isDownCREDIT_INFOMATION').value = "Y";
			}
						
		}, //[end] downloadFiles

		// 마케팅(359)동의여부체크
		mktAgreeChk : function(){

			var hanaAjax = new hana.JHanaAjax(null, true, true);
			hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT +'/deposit/savings/marketing200AgreeChk.do', 
				null , 
				true, 
				function(res) {
			    	var _data = eval('(' + res.responseText + ')');
					if (_data.agreeChk == 'Y') {
						opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT + "/deposit/savings/marketing200AgreeChkPopup.do"
								 , 'mktAgreePopup'
								 , 730
								 , null
								 , null);
					}
				}, 
			'euc-kr' );
		},
		
        CREDIT_INFOMATION : "wpcus_down.pdf"
		
	};//[end]return
}();

/*
 * 펀드신규 
 * 상품소개자, 권유지점, 이벤트번호
 */
pbk.common.productJoin = function(){
	
	var branchCodeObj      = null;	// hidden 지점코드
	var branchNameObj      = null;	// hidden 지점명
	var inputBranchNameObj = null;	// 화면표시용(inputBox) 지점명
	var empCodeObj         = null;	// 직원번호
	var empNameObj         = null;	// 직원명

	var branchCode = "";
	var branchName = ""; 
	var empCode    = "";
	var empName    = ""; 
	var selectEmp  = false;		// 소속 직원 팝업에서의 선택여부
	
	return {
		 
		
		/**
		 * 영업점찾기팝업 (펀드가입 시 소개지점만 찾기) 
		 */
		openPop_branch : function(branchNameEl, branchCodeEl, inputBranchName) {
			 branchNameObj = branchNameEl;  
			 branchCodeObj = branchCodeEl;
			 inputBranchNameObj = inputBranchName;
			
			 var oSendForm = form.createForm([{id:"pageGb", value:"fund"},{id:"workGb", value:"fund"}]);
			 var url = opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/branchSearchNm.do";
			 opb.common.layerpopup.openLayer_fnc(url, 'popupBranchSearchNm', null, oSendForm, null);
		 },
		 
		 /**
		  * 영업점목록(펀드가입 시 소개지점만 찾기)
		  */
		 searchList_branch: function(brNm) {
			 if(brNm.value == ""){
				 opb.common.layerpopup.openAlert_fnc("지점명", "지점명을 입력 후 조회 버튼을 눌러 주시기 바랍니다.");	
				 return false;				
			 }

			 // 조회기준상태코드 ( 1:정상, 2:해지(취소), 9:전체)
			 var oSendForm = form.createForm([{id:"brNm", value:brNm.value},{id:"inqBascStCd", value:"1"},{id:"pageGb", value:"fund"}]);
			 var hanaAjax = new hana.JHanaAjax('', true, true);
			 hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT
					+ '/common/popup/branch_search.do'
					, oSendForm
					, true
					, function(res, arg) {
						var resData = eval('(' + res.responseText + ')');
						
						var html = "<p class='noti mt30'>조회 결과는 총 <strong>"+resData.recNcnt+"</strong>건입니다.</p>";
						html +="<div class='tbl_tbldiv'>"; 
						html +="<table summary='지점명 리스트를 보여줍니다.' class='tbl_col01'>";
						html +="<colgroup>";
						html +="<col /><col style='width:80px' />";
						html +="</colgroup>";
						html +="<thead>";
						html +="<tr>";
						html +="<th scope='col' class='b-tnone'>지점명</th>";
						html +="<th scope='col' class='b-tnone'>선택</th>";
						html +="</tr>";
						html +="</thead>";
						html +="<tbody>";

						var companyTempl = new Template("<tr><td class='left'>#{brNm}(#{brNo})</td><td class='tbl_cen'><span class='f_btn small'><a href='#//HanaBank' onclick=\"javascript:pbk.common.productJoin.setBrInfo_branch('#{brNo}','#{brNm}');\">선택</a></span></td></tr>\n");
						
						if (resData.contMap) {
				            
				            var ResultLIST = resData.contMap['BIZ.PCM1290.OUT.REC'];
							for(var i=0; i<ResultLIST.size(); i++){
								var data =ResultLIST[i];
								html += companyTempl.evaluate(data); 
							}				
						} else {
							html = "<tr><td colspan='2'>검색된 데이터가 없습니다.</td></tr>";
						}
						
						html +="</tbody></table></div>";
						document.getElementById("resultTableWrap").innerHTML = html;
					} //[end] callback
			, 'EUC-KR');
		 },
		 
		 /**
		  * 영업점셋팅(펀드가입 시 소개지점만 찾기)
		  */
		 setBrInfo_branch : function(brNo, kornBrNm){
			 branchNameObj.value = kornBrNm;  
			 branchCodeObj.value = brNo;
			 inputBranchNameObj.value = kornBrNm;
			 opb.common.layerpopup.closeLayer_fnc('popupBranchSearchNm');
		 },
		
		/*
		 * 영업점 찾기 팝업
		 */
		openPopupBranchSearchNm : function(tempBrNm,_clickObj){
			if(tempBrNm.value == ""){
				opb.common.layerpopup.openAlert_fnc("소개지점", "소개지점명을 입력 후 조회 버튼을 눌러 주시기 바랍니다.");	
				return false;					
			}
		
			var oSendForm = form.createForm([{id:'tempBrNm', value:tempBrNm.value},{id:'pageGb', value:'fund'}]);

			var url = opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/branchSearchNm.do";
			opb.common.layerpopup.openLayer_fnc(url, 'popupBranchSearchNm', null, oSendForm, _clickObj);
		},
		
		/**
		 * 지점찾기 검색창을 연다.
		 * @param {HTMLElement} branchName
		 * @param {HTMLElement} branchCode
		 * @param {HTMLElement} inputBranchName
		 * @param {HTMLElement} empName
		 * @param {HTMLElement} empCode
		 */
		 openPop : function(branchNameEl, branchCodeEl, inputBranchName, empNameEl, empCodeEl) {
			 branchNameObj      = branchNameEl;  
			 branchCodeObj      = branchCodeEl;
			 inputBranchNameObj = inputBranchName;
			 empNameObj         = empNameEl;  
			 empCodeObj         = empCodeEl;
			
			 var oSendForm = form.createForm([{id:"pageGb", value:"fund"}]);
			 var url = opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/branchSearchNm.do";
			 opb.common.layerpopup.openLayer_fnc(url, 'popupBranchSearchNm', null, oSendForm, null);
		 },
		/**
		 * 지점찾기 검색창을 닫는다.
		 */
		 closePop : function(){
			 opb.common.layerpopup.closeLayer_fnc('popupBranchSearchNm');
		 },
		/**
		 * 지점명을 검색한다.
		 * @param {Object} formObj
		 */
		 searchList : function(brNm) {
			 if(brNm.value == ""){
				 opb.common.layerpopup.openAlert_fnc("지점명", "지점명을 입력 후 조회 버튼을 눌러 주시기 바랍니다.");	
				 return false;					
			 }

			 // 지점, 직원 정보 초기화
			 branchCode = "";
			 branchName = ""; 
			 empCode    = "";
			 empName    = ""; 
			 selectEmp  = false;

			 // 조회기준상태코드 ( 1:정상, 2:해지(취소), 9:전체)
			 var oSendForm = form.createForm([{id:"brNm", value:brNm.value},{id:"inqBascStCd", value:"1"},{id:"pageGb", value:"fund"}]);
			 var hanaAjax = new hana.JHanaAjax('', true, true);
			 hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT
					+ '/common/popup/branch_search.do'
					, oSendForm
					, true
					, function(res, arg) {
						var resData 	= eval('(' + res.responseText + ')');
						
						var html = "<p class='noti mt30'>조회 결과는 총 <strong>"+resData.recNcnt+"</strong>건입니다.</p>";
						html +="<div class='tbl_tbldiv'>"; 
						html +="<table summary='지점명 리스트를 보여줍니다.' class='tbl_col01'>";
						html +="<colgroup>";
						html +="<col /><col style='width:80px' />";
						html +="</colgroup>";
						html +="<thead>";
						html +="<tr>";
						html +="<th scope='col' class='b-tnone'>지점명</th>";
						html +="<th scope='col' class='b-tnone'>선택</th>";
						html +="</tr>";
						html +="</thead>";
						html +="<tbody>";

						var companyTempl = new Template("<tr><td class='left'>#{brNm}(#{brNo})</td><td class='tbl_cen'><span class='f_btn small'><a href='#//HanaBank' onclick=\"javascript:pbk.common.productJoin.searchEmpList('#{brNo}','#{brNm}');\">선택</a></span></td></tr>\n");
						
						if (resData.contMap) {
				            
				            var ResultLIST = resData.contMap['BIZ.PCM1290.OUT.REC'];
							for(var i=0; i<ResultLIST.size(); i++){
								var data =ResultLIST[i];
								html += companyTempl.evaluate(data); 
							}				
						} else {
							html = "<tr><td colspan='2'>검색된 데이터가 없습니다.</td></tr>";
						}
						
						html +="</tbody></table></div>";
						document.getElementById("resultTableWrap").innerHTML = html;
					} //[end] callback
					, 'EUC-KR');
		 },

		/**
		 * 직원을 검색한다.
		 * @param brNo     지점코드
		 * @param kornBrNm 지점명
		 */
		 searchEmpList: function(brNo, kornBrNm){

			 // 선택된 지점을 세팅한다.
			 branchCode = brNo;
			 branchName = kornBrNm; 
			
			 var oSendForm = form.createForm([{id:"brNo",value:brNo},{id:"hanaFncHldgsGrcoCd",value:"01"},{id:"hdofcInqDvCd",value:"1"},{id:"pageGb", value:"fund"}]);
			
			 var hanaAjax = new hana.JHanaAjax("resultTableEmpWrap", true, true);
			 hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/common/popup/emp_search.do", oSendForm);
		 },

		/**
		 * 로컬변수에 지점명과 지점코드, 직원명, 직원코드를 설정한다. 
		 * @param {String} brNo 지점코드
		 * @param {String} kornBrNm 지점명
		 * @param {String} empNo 직원코드
		 * @param {String} empKornNm 직원명
		 */
		 setEmpInfo : function(brNo, kornBrNm, empNo, empKornNm) {
			 branchCode = brNo;
			 branchName = kornBrNm; 
			 empCode    = empNo;
			 empName    = empKornNm;
			 selectEmp  = true;
		 },
		 
		 /**
		 * 펀드 상세 페이지로 이동
		 * 
		 * @param {String} fundNo 펀드번호
		 * @param {String} fundPrdNm 펀드상품명 
		 * @param {String} bncerPrdCd 수익증권상품코드
		 * @param {String} ovrsNtaxFundYn 해외비과세펀드여부
		 */
		moveFundDetail : function(fundNo,fundPrdNm,bncerPrdCd, ovrsNtaxFundYn) {
			try {
				
				var _notAllowChar = ['%','_','|','--','!','#','\''];
				for(var i=0; i<_notAllowChar.length; i++) {
					do {
						var _idx = fundPrdNm.indexOf(_notAllowChar[i]);
						if(_idx == -1) {
							break;
						}
						fundPrdNm = fundPrdNm.replace(_notAllowChar[i], ' ');
					}while(true);
				}
				$j('#hiddenFocus4Contents').focus();
				
				var formObj = form.createForm();
				form.createHiddenField(formObj, 'procDvCd', '003', false);
				form.createHiddenField(formObj, 'adtnDvCd', '311', false);
				form.createHiddenField(formObj, 'fundNo'           , fundNo         , false);
				form.createHiddenField(formObj, 'dfrmTpOpenPossYn' , '' 						, false);
				form.createHiddenField(formObj, 'vltpOpenPossYn'   , ''   					, false);
				form.createHiddenField(formObj, 'rsvgOpenPossYn'   , ''   					, false);
				form.createHiddenField(formObj, 'taxPrimPossYn'    , ''    					, false);
				form.createHiddenField(formObj, 'lvhTpPossYn'      , ''     				, false);
				form.createHiddenField(formObj, 'bascDt'           , ''     				, false);
				form.createHiddenField(formObj, 'bascPrc'          , ''     				, false);
				form.createHiddenField(formObj, 'wrkgShpDvCd'      , ''     				, false);
				form.createHiddenField(formObj, 'rduTaxtPrdDvCd'   , ''   					, false);
				form.createHiddenField(formObj, 'fundRskLevlDvCd'  , ''  						, false);
				form.createHiddenField(formObj, 'fundPrdNm'        , fundPrdNm      , false);
				form.createHiddenField(formObj, 'fundSalePrdClasCd', ''							, false);
				form.createHiddenField(formObj, 'useYn'            , ''            	, false);
				form.createHiddenField(formObj, 'manAge'           , ''           	, false);
				form.createHiddenField(formObj, 'isWorkday2'       , ''       			, false);
				form.createHiddenField(formObj, 'elfYn'            , ''            	, false);
				form.createHiddenField(formObj, 'saleChnlDvCd'     , ''     				, false);
				form.createHiddenField(formObj, 'bncerPrdCd'       , bncerPrdCd     , false);
				if(ovrsNtaxFundYn == "1"){
					form.createHiddenField(formObj, 'fundKind'      , '3'       , false);
				}
				
				/*var hanaAjax = new hana.JHanaAjax("HANA_CONTENTS_DIV", true, true);
				hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + '/fund/fundmall/wpfnd435_10i_01.do', formObj
				, function(isSuccess) {
					if(isSuccess) {
						// 정상처리 시 (되돌아오기위해) 펀드컨텐츠를 숨긴다.
						$j('#' + _FUND_CONTENTS_DIV).hide();
					}
				}
				);
				opb.common.util.goMenu_fnc(opb.base.APPLICATION_CONTEXT_ROOT + '/fund/fundmall/wpfnd435_10i_01.do', formObj);*/
				opb.common.util.goMenu_fnc(opb.base.APPLICATION_CONTEXT_ROOT + '/fund/fundmall/wpfnd435_10i_02.do' , formObj, null, true);
			}catch(e) {
				alert(location.href + '\n\n' + e + '\n[ERROR opb.apps.page.fundmall.moveDetail]');
			}
		},
		
		/**
		 * 펀드 상세 페이지로 이동 (wpfnd435_50i.js 참조)
		 * 
		 * @param {String} fundNo 펀드번호
		 * @param {String} bncerPrdCd 수익증권상품코드
		 * @param {String} dmstOvrsDvCd 국내해외구분코드
		 */
		moveRenewDetail : function (fundNo, bncerPrdCd, dmstOvrsDvCd) {
			
			try {
				
				var formObj = form.createForm();
				form.createHiddenField(formObj, 'fundNo', fundNo, false);
				form.createHiddenField(formObj, 'bncerPrdCd', bncerPrdCd, false);
				form.createHiddenField(formObj, 'fundKind', dmstOvrsDvCd, false);		// 국내해외구분코드 (dmstOvrsDvCd)
				
				// 펀드상세조회시 상수값
				form.createHiddenField(formObj, 'fundTrscKindDtlsCd', '0007', false);
				
				opb.common.util.goMenu_fnc(opb.base.APPLICATION_CONTEXT_ROOT + '/fund/khafundmall/wpfnd438_10i.do', formObj, null, false);

			}catch(e) {
				alert(location.href + '\n\n' + e + '\n[ERROR opb.apps.page.khafundmall.moveDetail]');
			}
			
		},			

		//관심상품 등록 여부확인
		existCart  : function(prdCd, prdDvCd){
/*
			var loginYn = false;
			var loginFlag = $j("#HANA_AUTOLOGOUT_TIMER_DIV").html();
			if(loginFlag != undefined && loginFlag != "") {
				loginYn = true;
			}

			if (loginYn == true) {
				var _frm = form.createForm();
				form.createHiddenField(_frm, 'prdCd', prdCd);
				form.createHiddenField(_frm, 'prdDvCd', prdDvCd);
				
				var _url = opb.base.APPLICATION_CONTEXT_ROOT + "/cms/etc/cncrnExist.do";
	            var hanaAjax = new hana.JHanaAjax(null, true, true);
				hanaAjax.ajaxSubmit(_url, _frm
					, true
					, function(res, option) {
						var resType = res.getResponseHeader('json-type');
						if (resType == 'normal') {
							var _data = eval('(' + res.responseText + ')');
							if (_data.resultYN == 'Y') {//정상
								//console.log('관심상품으로 등록 불가');
								$j('.pageSet li.cart a').addClass('on');
								return;				
							}else{
								//console.log('관심상품으로 등록 가능');
								return;				
							}
						}
				}, "EUC-KR");
			}else{
				 return;				
			}
*/
			var loginYn = false;
			var loginFlag = $j("#HANA_AUTOLOGOUT_TIMER_DIV").html();
			if(loginFlag != undefined && loginFlag != "") {
				loginYn = true;
			}
			
			//window.open 펀드상세에서 관심상품 눌렀을 경우 부모창에 로그인div가 있는지 한번더 체크한다.   
			if(loginYn == false) {
				//퇴직연금 화면에서 호출시 참조해야할 부모창이 없음.(퇴직연금화면은 관심등록 없음)
				if(opener != undefined && opener != null) {
					if(opener.length > 0) {
						loginFlag = opener.$j("#HANA_AUTOLOGOUT_TIMER_DIV").html();
						if(loginFlag != undefined && loginFlag != "") {
							loginYn = true;
						}
					}
				}
			}			

			if (loginYn == true) {
				var _frm = form.createForm();
				form.createHiddenField(_frm, 'prdCd', prdCd);
				
				var _url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/personal/wpcus401_86i_01.do";
	            var hanaAjax = new hana.JHanaAjax(null, true, true);
				hanaAjax.ajaxSubmit(_url, _frm
					, true
					, function(res, option) {
						var resType = res.getResponseHeader('json-type');
						if (resType == 'normal') {
							var _data = eval('(' + res.responseText + ')');
							//console.log("existCart-86:"+_data.procYn);
							if (_data.procYn == 'Y') {//정상
								//console.log('관심상품으로 등록 불가');
								$j('.pageSet li.cart a').addClass('on');
								return;				
							}else{
								//console.log('관심상품으로 등록 가능');
								return;				
							}
						}
				}, "EUC-KR");
			}else{
				 return;				
			}
			
		},
		
		//관심상품 등록 여부확인
		//상품상세 디자인 변경에 따른 수정
		existCart2  : function(prdCd, prdDvCd){
/*
			var loginYn = false;
			var loginFlag = $j("#HANA_AUTOLOGOUT_TIMER_DIV").html();
			if(loginFlag != undefined && loginFlag != "") {
				loginYn = true;
			}

			if (loginYn == true) {
				var _frm = form.createForm();
				form.createHiddenField(_frm, 'prdCd', prdCd);
				form.createHiddenField(_frm, 'prdDvCd', prdDvCd);
				
				var _url = opb.base.APPLICATION_CONTEXT_ROOT + "/cms/etc/cncrnExist.do";
	            var hanaAjax = new hana.JHanaAjax(null, true, true);
				hanaAjax.ajaxSubmit(_url, _frm
					, true
					, function(res, option) {
						var resType = res.getResponseHeader('json-type');
						if (resType == 'normal') {
							var _data = eval('(' + res.responseText + ')');
							if (_data.resultYN == 'Y') {//정상
								//console.log('관심상품으로 등록 불가');
								$j('.util-area a.give-star').addClass('on');
								return;				
							}else{
								//console.log('관심상품으로 등록 가능');
								return;				
							}
						}
				}, "EUC-KR");
			}else{
				 return;				
			}
*/
			var loginYn = false;
			var loginFlag = $j("#HANA_AUTOLOGOUT_TIMER_DIV").html();
			if(loginFlag != undefined && loginFlag != "") {
				loginYn = true;
			}

			if (loginYn == true) {
				var _frm = form.createForm();
				form.createHiddenField(_frm, 'prdCd', prdCd);
				
				var _url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/personal/wpcus401_86i_01.do";
	            var hanaAjax = new hana.JHanaAjax(null, true, true);
				hanaAjax.ajaxSubmit(_url, _frm
					, true
					, function(res, option) {
						var resType = res.getResponseHeader('json-type');
						if (resType == 'normal') {
							var _data = eval('(' + res.responseText + ')');
							//console.log("existCart2-86:"+_data.procYn);
							if (_data.procYn == 'Y') {//정상
								//console.log('관심상품으로 등록 불가');
								$j('.util-area a.give-star').addClass('on');
								return;				
							}else{
								//console.log('관심상품으로 등록 가능');
								return;				
							}
						}
				}, "EUC-KR");
			}else{
				 return;				
			}
			
		},
		
		//관심상품 등록 여부확인
		//상품상세 디자인 변경에 따른 수정
		existCart3  : function(prdCd, prdDvCd, fncPrdNm, subUrl, prdImgPath, fncPrdCtt){

			var loginYn = false;
			var loginFlag = $j("#HANA_AUTOLOGOUT_TIMER_DIV").html();
			if(loginFlag != undefined && loginFlag != "") {
				loginYn = true;
			}

			if (loginYn == true) {
				var _frm = form.createForm();
				form.createHiddenField(_frm, 'prdCd', prdCd);
				form.createHiddenField(_frm, 'prdDvCd', prdDvCd);
				form.createHiddenField(_frm, 'prdImgPath', prdImgPath);
				form.createHiddenField(_frm, 'fncPrdNm', fncPrdNm);
				form.createHiddenField(_frm, 'fncPrdCtt', fncPrdCtt); //TODO 펀드상품설명 가져와야함.
				form.createHiddenField(_frm, 'urlAdr', subUrl);
				form.createHiddenField(_frm, 'rmk', '');
				
				var _url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/personal/wpcus401_86i_01.do";
	            var hanaAjax = new hana.JHanaAjax(null, true, true);
				hanaAjax.ajaxSubmit(_url, _frm
					, true
					, function(res, option) {
						var resType = res.getResponseHeader('json-type');
						if (resType == 'normal') {
							var _data = eval('(' + res.responseText + ')');
							console.log("86:"+_data.procYn);
							if (_data.procYn == 'Y') { 
								//console.log('관심상품으로 등록 불가');
								//$j('.util-area a.give-star').removeClass('on');
								form.createHiddenField(_frm, 'methodName', 'delete');
								form.createHiddenField(_frm, 'myConcernCode', prdCd, true);
								
								_url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/personal/wpcus401_85i_01.do";
					            hanaAjax = new hana.JHanaAjax(null, true, true);
								hanaAjax.ajaxSubmit(_url, _frm
									, true
									, function(res, option) {
										var resType = res.getResponseHeader('json-type');
										if (resType == 'normal') {
											var _data = eval('(' + res.responseText + ')');
											console.log("85-del:"+_data.resultYN);
											if (_data.resultYN == 'N') {//정상
												
												_url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/personal/wpcus401_90i_01.do";
												hanaAjax = new hana.JHanaAjax(null, false, false);
												hanaAjax.ajaxSubmit(_url, _frm
													, true
													, function(res, option) {
														var resType = res.getResponseHeader('json-type');
												}, "UTF-8");
												
												opb.common.layerpopup.openAlert_fnc("안내", "관심상품에서 삭제되었습니다.");
												$j('.util-area a.give-star').removeClass('on');
												return;				
											}else{
												opb.common.layerpopup.openAlert_fnc("오류", "관심상품에서 이미 삭제되었거나<br/>관심상품 삭제가 불가합니다.");
												return;				
											}
										}
								}, "EUC-KR");
								
								return;				
							}else{
								//console.log('관심상품으로 등록 가능');
								//$j('.util-area a.give-star').addClass('on');
								form.createHiddenField(_frm, 'methodName', 'insert');
								
								_url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/personal/wpcus401_85i_01.do";
					            hanaAjax = new hana.JHanaAjax(null, true, true);
								hanaAjax.ajaxSubmit(_url, _frm
									, true
									, function(res, option) {
										var resType = res.getResponseHeader('json-type');
										if (resType == 'normal') {
											var _data = eval('(' + res.responseText + ')');
											console.log("85-ins:"+_data.resultYN);
											if (_data.resultYN == 'Y') {//정상
												opb.common.layerpopup.openAlert_fnc("안내", "관심상품으로 등록되었습니다.");
												$j('.util-area a.give-star').addClass('on');
												return;				
											}else{
												opb.common.layerpopup.openAlert_fnc("오류", "관심상품으로 이미 등록되었거나<br/>관심상품 등록이 불가합니다.");
												return;				
											}
										}
								}, "EUC-KR");
								
								return;				
							}
						}
				}, "EUC-KR");
			}else{
				 return;				
			}
			
		},

		//관심상품 등록
		addCart  : function(prdCd, prdDvCd, fncPrdNm, subUrl, prdImgPath, fncPrdCtt){
/*
			var loginYn = false;
			var loginFlag = $j("#HANA_AUTOLOGOUT_TIMER_DIV").html();
			if(loginFlag != undefined && loginFlag != "") {
				loginYn = true;
			}

			if (loginYn == true) {
				
				if($j('.pageSet li.cart a').hasClass('on')) {
					//console.log('기 등록된 관심상품입니다.');
					return;
				}
				var _frm = form.createForm();
				form.createHiddenField(_frm, 'prdCd', prdCd);
				form.createHiddenField(_frm, 'prdDvCd', prdDvCd);
				form.createHiddenField(_frm, 'prdImgPath', prdImgPath);
				form.createHiddenField(_frm, 'fncPrdNm', fncPrdNm);
				form.createHiddenField(_frm, 'fncPrdCtt', fncPrdCtt); //TODO 펀드상품설명 가져와야함.
				form.createHiddenField(_frm, 'urlAdr', subUrl);
				form.createHiddenField(_frm, 'tabMenu', '1');
				
				var _url = opb.base.APPLICATION_CONTEXT_ROOT + "/cms/etc/cncrnPrd.do";
	            var hanaAjax = new hana.JHanaAjax(null, true, true);
				hanaAjax.ajaxSubmit(_url, _frm
					, true
					, function(res, option) {
						var resType = res.getResponseHeader('json-type');
						if (resType == 'normal') {
							var _data = eval('(' + res.responseText + ')');
							//console.log(_data);
							if (_data.resultYN == 'Y') {//정상
								
								opb.common.layerpopup.openAlert_fnc("안내", "관심상품으로 등록되었습니다.");
								$j('.pageSet li.cart a').addClass('on');
								return;				
							}else{
								opb.common.layerpopup.openAlert_fnc("오류", "관심상품으로 이미 등록되었거나<br/>관심상품 등록이 불가합니다.");
								return;				
							}
						}
				}, "EUC-KR");
			}else{
				 opb.common.layerpopup.openAlert_fnc("안내", "로그인 후 관심상품을 등록하세요!");
				 return;				
			}
*/
			var loginYn = false;
			var loginFlag = $j("#HANA_AUTOLOGOUT_TIMER_DIV").html();
			if(loginFlag != undefined && loginFlag != "") {
				loginYn = true;
			}
			
			//window.open 펀드상세에서 관심상품 눌렀을 경우 부모창에 로그인div가 있는지 한번더 체크한다.
			if(loginYn == false) {
				loginFlag = opener.$j("#HANA_AUTOLOGOUT_TIMER_DIV").html();
				if(loginFlag != undefined && loginFlag != "") {
					loginYn = true;
				}
			}

			if (loginYn == true) {
				var _frm = form.createForm();
				form.createHiddenField(_frm, 'prdCd', prdCd);
				form.createHiddenField(_frm, 'prdDvCd', prdDvCd);
				form.createHiddenField(_frm, 'prdImgPath', prdImgPath);
				form.createHiddenField(_frm, 'fncPrdNm', fncPrdNm);
				form.createHiddenField(_frm, 'fncPrdCtt', fncPrdCtt); //TODO 펀드상품설명 가져와야함.
				form.createHiddenField(_frm, 'urlAdr', subUrl);
				form.createHiddenField(_frm, 'rmk', '');
				
				var _url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/personal/wpcus401_86i_01.do";
	            var hanaAjax = new hana.JHanaAjax(null, true, true);
				hanaAjax.ajaxSubmit(_url, _frm
					, true
					, function(res, option) {
						var resType = res.getResponseHeader('json-type');
						if (resType == 'normal') {
							var _data = eval('(' + res.responseText + ')');
							//console.log("86:"+_data.procYn);
							if (_data.procYn == 'Y') { 
								//console.log('관심상품으로 등록 불가');
								//$j('.util-area a.give-star').removeClass('on');
								form.createHiddenField(_frm, 'methodName', 'delete');
								form.createHiddenField(_frm, 'myConcernCode', prdCd, true);
								
								_url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/personal/wpcus401_85i_01.do";
					            hanaAjax = new hana.JHanaAjax(null, true, true);
								hanaAjax.ajaxSubmit(_url, _frm
									, true
									, function(res, option) {
										var resType = res.getResponseHeader('json-type');
										if (resType == 'normal') {
											var _data = eval('(' + res.responseText + ')');
											//console.log("85-del:"+_data.resultYN);
											if (_data.resultYN == 'N') {//정상
												
												_url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/personal/wpcus401_90i_01.do";
												hanaAjax = new hana.JHanaAjax(null, false, false);
												hanaAjax.ajaxSubmit(_url, _frm
													, true
													, function(res, option) {
														var resType = res.getResponseHeader('json-type');
												}, "UTF-8");
												
												opb.common.layerpopup.openAlert_fnc("안내", "관심상품에서 삭제되었습니다.");
												$j('.pageSet li.cart a').removeClass('on');
												return;				
											}else{
												opb.common.layerpopup.openAlert_fnc("오류", "관심상품에서 이미 삭제되었거나<br/>관심상품 삭제가 불가합니다.");
												return;				
											}
										}
								}, "EUC-KR");
								
								return;				
							}else{
								//console.log('관심상품으로 등록 가능');
								//$j('.util-area a.give-star').addClass('on');
								form.createHiddenField(_frm, 'methodName', 'insert');
								
								_url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/personal/wpcus401_85i_01.do";
					            hanaAjax = new hana.JHanaAjax(null, true, true);
								hanaAjax.ajaxSubmit(_url, _frm
									, true
									, function(res, option) {
										var resType = res.getResponseHeader('json-type');
										if (resType == 'normal') {
											var _data = eval('(' + res.responseText + ')');
											//console.log("85-ins:"+_data.resultYN);
											if (_data.resultYN == 'Y') {//정상
												opb.common.layerpopup.openAlert_fnc("안내", "관심상품으로 등록되었습니다.");
												$j('.pageSet li.cart a').addClass('on');
												return;				
											}else{
												opb.common.layerpopup.openAlert_fnc("오류", "관심상품으로 이미 등록되었거나<br/>관심상품 등록이 불가합니다.");
												return;				
											}
										}
								}, "EUC-KR");
								
								return;				
							}
						}
				}, "EUC-KR");
			}else{
				opb.common.layerpopup.openAlert_fnc("안내", "로그인 후 관심상품을 등록하세요!");
				return;				
			}
			
		},
		
		//관심상품 등록
		//화면 디자인 변경에 따른 버튼 UI이벤트 수정
		addCart2  : function(prdCd, prdDvCd, fncPrdNm, subUrl, prdImgPath, fncPrdCtt){
/*
			var loginYn = false;
			var loginFlag = $j("#HANA_AUTOLOGOUT_TIMER_DIV").html();
			if(loginFlag != undefined && loginFlag != "") {
				loginYn = true;
			}

			if (loginYn == true) {
				
				if($j('.util-area a.give-star').hasClass('on')) {
					//console.log('기 등록된 관심상품입니다.');
					return;
				}
				var _frm = form.createForm();
				form.createHiddenField(_frm, 'prdCd', prdCd);
				form.createHiddenField(_frm, 'prdDvCd', prdDvCd);
				form.createHiddenField(_frm, 'prdImgPath', prdImgPath);
				form.createHiddenField(_frm, 'fncPrdNm', fncPrdNm);
				form.createHiddenField(_frm, 'fncPrdCtt', fncPrdCtt); //TODO 펀드상품설명 가져와야함.
				form.createHiddenField(_frm, 'urlAdr', subUrl);
				form.createHiddenField(_frm, 'tabMenu', '1');
				
				var _url = opb.base.APPLICATION_CONTEXT_ROOT + "/cms/etc/cncrnPrd.do";
	            var hanaAjax = new hana.JHanaAjax(null, true, true);
				hanaAjax.ajaxSubmit(_url, _frm
					, true
					, function(res, option) {
						var resType = res.getResponseHeader('json-type');
						if (resType == 'normal') {
							var _data = eval('(' + res.responseText + ')');
							//console.log(_data);
							if (_data.resultYN == 'Y') {//정상
								
								opb.common.layerpopup.openAlert_fnc("안내", "관심상품으로 등록되었습니다.");
								$j('.util-area a.give-star').addClass('on');
								return;				
							}else{
								opb.common.layerpopup.openAlert_fnc("오류", "관심상품으로 이미 등록되었거나<br/>관심상품 등록이 불가합니다.");
								return;				
							}
						}
				}, "EUC-KR");
			}else{
				 opb.common.layerpopup.openAlert_fnc("안내", "로그인 후 관심상품을 등록하세요!");
				 return;				
			}
*/
			var loginYn = false;
			var loginFlag = $j("#HANA_AUTOLOGOUT_TIMER_DIV").html();
			if(loginFlag != undefined && loginFlag != "") {
				loginYn = true;
			}

			if (loginYn == true) {
				var _frm = form.createForm();
				form.createHiddenField(_frm, 'prdCd', prdCd);
				form.createHiddenField(_frm, 'prdDvCd', prdDvCd);
				form.createHiddenField(_frm, 'prdImgPath', prdImgPath);
				form.createHiddenField(_frm, 'fncPrdNm', fncPrdNm);
				form.createHiddenField(_frm, 'fncPrdCtt', fncPrdCtt); //TODO 펀드상품설명 가져와야함.
				form.createHiddenField(_frm, 'urlAdr', subUrl);
				form.createHiddenField(_frm, 'rmk', '');
				
				var _url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/personal/wpcus401_86i_01.do";
	            var hanaAjax = new hana.JHanaAjax(null, true, true);
				hanaAjax.ajaxSubmit(_url, _frm
					, true
					, function(res, option) {
						var resType = res.getResponseHeader('json-type');
						if (resType == 'normal') {
							var _data = eval('(' + res.responseText + ')');
							//console.log("86:"+_data.procYn);
							if (_data.procYn == 'Y') { 
								//console.log('관심상품으로 등록 불가');
								//$j('.util-area a.give-star').removeClass('on');
								form.createHiddenField(_frm, 'methodName', 'delete');
								form.createHiddenField(_frm, 'myConcernCode', prdCd, true);
								
								_url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/personal/wpcus401_85i_01.do";
					            hanaAjax = new hana.JHanaAjax(null, true, true);
								hanaAjax.ajaxSubmit(_url, _frm
									, true
									, function(res, option) {
										var resType = res.getResponseHeader('json-type');
										if (resType == 'normal') {
											var _data = eval('(' + res.responseText + ')');
											//console.log("85-del:"+_data.resultYN);
											if (_data.resultYN == 'N') {//정상
												
												_url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/personal/wpcus401_90i_01.do";
												hanaAjax = new hana.JHanaAjax(null, false, false);
												hanaAjax.ajaxSubmit(_url, _frm
													, true
													, function(res, option) {
														var resType = res.getResponseHeader('json-type');
												}, "UTF-8");
												
												opb.common.layerpopup.openAlert_fnc("안내", "관심상품에서 삭제되었습니다.");
												$j('.util-area a.give-star').removeClass('on');
												return;				
											}else{
												opb.common.layerpopup.openAlert_fnc("오류", "관심상품에서 이미 삭제되었거나<br/>관심상품 삭제가 불가합니다.");
												return;				
											}
										}
								}, "EUC-KR");
								
								return;				
							}else{
								//console.log('관심상품으로 등록 가능');
								//$j('.util-area a.give-star').addClass('on');
								form.createHiddenField(_frm, 'methodName', 'insert');
								
								_url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/personal/wpcus401_85i_01.do";
					            hanaAjax = new hana.JHanaAjax(null, true, true);
								hanaAjax.ajaxSubmit(_url, _frm
									, true
									, function(res, option) {
										var resType = res.getResponseHeader('json-type');
										if (resType == 'normal') {
											var _data = eval('(' + res.responseText + ')');
											//console.log("85-ins:"+_data.resultYN);
											if (_data.resultYN == 'Y') {//정상
												opb.common.layerpopup.openAlert_fnc("안내", "관심상품으로 등록되었습니다.");
												$j('.util-area a.give-star').addClass('on');
												return;				
											}else{
												opb.common.layerpopup.openAlert_fnc("오류", "관심상품으로 이미 등록되었거나<br/>관심상품 등록이 불가합니다.");
												return;				
											}
										}
								}, "EUC-KR");
								
								return;				
							}
						}
				}, "EUC-KR");
			}else{
				opb.common.layerpopup.openAlert_fnc("안내", "로그인 후 관심상품을 등록하세요!");
				return;				
			}
			
		},

		/**
		 * Element에 지점명과 지점코드, 직원명, 직원코드를 설정한다. 
		 * @param {String} branchCode 지점코드 
		 * @param {String} branchName 지점명
		 * @param {String} empCode 직원코드
		 * @param {String} empName 직원명
		 */
		 setInfo : function(empCnt) {
			 if(empCnt > 0) {
				 if(!selectEmp) {
					 opb.common.layerpopup.openAlert_fnc("선택정보오류", "소속 직원을 선택하셔야 합니다.");
					 return false;
				 }
			 } else if(empCnt == 0) {
				 // 소속된 직원이 없을 경우
			 } else {
				 return false;
			 }

			 if( branchCodeObj && null!=branchCodeObj) branchCodeObj.value = branchCode;
			 if( branchNameObj && null!=branchNameObj) branchNameObj.value = branchName;
			 if( inputBranchNameObj && null!=inputBranchNameObj) inputBranchNameObj.value = branchName;
			 if( empCodeObj && null != empCodeObj)     empCodeObj.value    = empCode;
			 if( empNameObj && null != empNameObj)     empNameObj.value    = empName;
			 opb.common.layerpopup.closeLayer_fnc('popupBranchSearchNm');
		 },

		/**
		 * 직원정보 클리어 
		 */
		 clearInfo : function(branchNameEl, branchCodeEl, inputBranchName, empNameEl, empCodeEl) {

			 if( branchNameEl && null!=branchNameEl) branchNameEl.value = "";
			 if( branchCodeEl && null!=branchCodeEl) branchCodeEl.value = "";
			 if( inputBranchName && null!=inputBranchName) inputBranchName.value = "";
			 if( empCodeEl && null != empCodeEl)     empCodeEl.value    = "";
			 if( empNameEl && null != empNameEl)     empNameEl.value    = "";
		 }
		
	};//[end]return
}();


/*************************************************
 * 셀프기프팅 선물상자에 필요한 Script를 정의
 *************************************************/
pbk.common.giftBox = function(){
	return {
		/*
		 * 셀프기프팅 적금 - 선물상자 팝업
		 * 
		 */
		openPopup : function() {
		
			opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT + '/deposit/savings/wpdep438_49p_00.do', 'selfGiftingPop', null, null, null); 
		},
		
		/**
		 * 선물상자 금리받기 화면이동 
		 * 
		 * 
		 */
		goProductContents : function() {
			var hanaAjax = new hana.JHanaAjax("wpdep438_49pContents", true, true);
			hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT+ "/deposit/savings/wpdep438_49p.do", null);
		},
		
		/**
		 * 선물상자에서 
		 *  
		 * 선물퍼즐이미지선택 화면이동
		 * 
		 */
		goPuzzleImgSelect : function() {
			$j("#GiftList").attr("style","display:none");
			$j("#GiftPuzzle").attr("style","");
			$j("input:radio[name='gift_img']:radio[value='" + $j("#puzNo").val().toString() + "']").attr("checked", true);
		},
		
		/**
		 * 선물퍼즐 우대금리지급결과에서 
		 *  
		 * 확인버튼 클릭
		 * 
		 */
		puzzlePopupClose  : function() {
			opb.common.layerpopup.closeLayer_fnc('puzzlePop');
			pbk.common.giftBox.goProductContents();
		},
		
		/**
		 * 선물퍼즐이미지선택 화면 이미지변경
		 *
		 */
		changePuzzleImgNo : function(oForm){
			var puzzleNo = $j("input:radio[name='gift_img']:checked", $j(oForm)).val().toString();
			form.createHiddenField(oForm, "lnDpsTrscDvCd", $j("#lnDpsTrscDvCd").val());
			form.createHiddenField(oForm, "lnDpsInpCtt96", puzzleNo);
			form.createHiddenField(oForm, "acctNo", $j("#acctNo").val());
			
			var hanaAjax = new hana.JHanaAjax('', true, true);
			hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/deposit/savings/wpdep438_49p_04.do"
					, oForm
					, true
					, function(res, arg) {
							var _data = eval('(' + res.responseText + ')');
							
							if (_data.result == 'Success') { //성공
								pbk.common.giftBox.goProductContents();
							}
						} //[end] callback
					, 'EUC-KR');
			
		},
		
		/**
		 * 상세보기 버튼 클릭
		 *
		 */ 
		moveDetail: function(){
			opb.common.layerpopup.closeLayer_fnc('selfGiftingPop');
			location.href = "/cont/mall/mall08/mall0801/mall080102/1431344_115157.jsp";
			
		},
		
		/**
		 * 선물퍼즐이미지선택 화면 취소버튼클릭
		 *
		 */
		cancelChangePuzzleImg : function(){

			$j("#GiftList").attr("style","");
			$j("#GiftPuzzle").attr("style","display:none");
		},
		
		/**
		 * 선물상자 금리우대 받기
		 *
		 */
		primeRateEvent: function(kindCd, oForm, _clickObj){
			
			var MESSAGE_OBJ = "";
			
			if($j(_clickObj).parent().hasClass("disabled") == true){//disabled효과 적용한 버튼 이벤트 제외
				return false;
			}
			
			if(kindCd == "5068"){
				if(oForm.puzCount.value == 4){
					opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: '알림',
						message: "- 선물퍼즐 우대금리 :(참여횟수 4회)<br/>- 선물퍼즐 우대금리를 모두 받으셨습니다."
					});
					return false;
				}
			}else if(kindCd == "5138"){//신규고객 우대
				if(oForm.fuzlNewCustPtcnYn.value == 'N' && oForm.fuzlNewCustPossYn.value == 'N'){
					opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: '알림',
						message: "- 신규고객 기준에 해당안되어 우대금리 제공이 안됩니다.<br/>- 다른 우대금리 받기를 이용하세요"
					});
					return false;
				}else{
					MESSAGE_OBJ = "<신규고객 우대금리 지급 결과><br/><br/>-신규고객 우대금리(0.5%) 지급 완료!";
				}
			}else if(kindCd == "5139"){//추가거래 우대
				if(oForm.fuzlAdntPtclYn.value == 'N' && oForm.fuzlAdntPossYn.value == 'N'){
					opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: '알림',
						message: "- 추가거래 우대 기준에 해당안되어 우대금리 제공이 안됩니다.<br/>&nbsp;&nbsp;[추가거래 우대 대상]<br/>- 본 적금 가입 기간중, 인터넷/스마트폰뱅킹 또는 콜센터에서<br/>&nbsp;&nbsp;정기 예/적금 상품을 가입한 고객(단 자유 입출금 예금 제외)"
					});
					return false;
				}else{
					MESSAGE_OBJ = "<추가거래 우대금리 지급 결과><br/><br/>-추가거래 우대금리(0.5%) 지급 완료!";
				}
			}else if(kindCd == "5140"){//자동이체등록
				if(oForm.futrPuzlAtfPtcnYn.value == 'N' && oForm.futrPuzlAtfPossYn.value == 'N'){
					opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: '알림',
						message: "- 자동이체 우대 기준에 해당안되어 우대금리 제공이 안됩니다.<br/>&nbsp;&nbsp;[자동이체 우대 대상]<br/>&nbsp;&nbsp;당행 요구불통장을 통한 자동이체로 3개월 적립시<br/>&nbsp;&nbsp;(월 자동이체 최소액: 10만원)"
					});
					return false;
				}else{
					MESSAGE_OBJ = "<자동이체 우대금리 지급 결과><br/><br/>-자동이체 우대금리(0.3%) 지급 완료!";
				}
			}else if(kindCd == "5141"){//추천인우대
				if(oForm.futrPuzlRcmdPtcnYn.value == 'N' && oForm.futrPuzlRcmdPossYn.value == 'N'){
					opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: '알림',
						message: "- 친구추천 우대 기준에 해당안되어 우대금리 제공이 안됩니다.<br/>&nbsp;&nbsp;[친구거래 우대 대상 ]<br/>- 가입시 타인의 추천번호를 입력하였거나<br/>&nbsp;&nbsp;본인 추천번호로 타인이 가입한 경우 제공"
					});
					return false;
				}else{
					MESSAGE_OBJ = "<친구추천 우대금리 지급 결과><br/><br/>-친구추천 우대금리(0.3%) 지급 완료!";
				}
			}
			
			form.createHiddenField(oForm, 'lnDpsTrscDvCd', "1");
			form.createHiddenField(oForm, 'lnDpsTrscKindDtlsCd1', kindCd);

			
			var hanaAjax = new hana.JHanaAjax('', true, true);
			hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/deposit/savings/wpdep438_49p_01.do"
					, oForm
					, true
					, function(res, arg) {
							var _data = eval('(' + res.responseText + ')');
							
							if (_data.result == 'Success') { //성공
								//$j(_clickObj).parent().addClass("disabled");
								if(kindCd == "5068"){
									opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT + "/deposit/savings/wpdep438_49p_02.do", 'puzzlePop', null, oForm, _clickObj);
								}else{
									opb.common.layerpopup.openMessage_fnc({
										isConfirm: false,
										title: '확인',
										message: MESSAGE_OBJ,
										callback: function(e){
								  			if (e == true){	// 확인버튼 클릭시
												pbk.common.giftBox.goProductContents();
								  			}
								  		},
										clickObj: _clickObj
									});
								}
							
							}
						} //[end] callback
					, 'EUC-KR');
			
		}
	};//[end]return
}();

/*************************************************
 * 신용대출에 필요한 Script를 정의
 *************************************************/
pbk.common.cmsLoan = function(){
	return {
		/*
		 * 신용대출 => 무조건 로그인 후 거래로 수정 
		 * 
		 */
		openPopup : function(efamilyYn, prdCd) {

			var url = opb.base.APPLICATION_CONTEXT_ROOT + '/loan/credit/wplon470_30t.do?prdCd=' + prdCd;
			pbk.web.util.goMenu(url);
			
			/*

			var loginYn = false;
			var loginFlag = $j("#HANA_AUTOLOGOUT_TIMER_DIV").html();
			if(loginFlag != undefined && loginFlag != "") {
				loginYn = true;
			}
			
			if (loginYn == true) {
				var url = opb.base.APPLICATION_CONTEXT_ROOT + '/loan/credit/wplon470_30t.do?prdCd=' + prdCd;
				pbk.web.util.goMenu(url);
			} else {			
				var oSendForm = form.createForm([{id: 
				"efamilyYn",value:efamilyYn},{id:"prdCd",value:prdCd}]);
				opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT + '/loan/credit/wplon470_38p.do', 'openPopupContract', null, oSendForm, null); 
			}
			*/
		},
		
		/*
		 * 원클릭모기지 거래중지 안내팝업 
		 */
		openPopupStopInfo : function(){
			opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT + '/loan/mortgateone/wplon453_20p.do', 'openPopupStopInfo', null, null, null); 
		},
		
		submitStep01_LOGIN : function(oForm) {
		
			var url = opb.base.APPLICATION_CONTEXT_ROOT + '/loan/credit/wplon470_30t.do?prdCd=' + oForm.prdCd.value;
			pbk.web.util.goMenu(url);
			opb.common.layerpopup.closeLayer_fnc('openPopupContract');
		},
		
		submitStep00 : function(oForm) {
			
			var url = opb.base.APPLICATION_CONTEXT_ROOT + '/loan/credit/wplon470_30b_01.do?prdCd=' + oForm.prdCd.value;
			pbk.web.util.goMenu(url);
			opb.common.layerpopup.closeLayer_fnc('openPopupContract');
		},
		
		/**
		 * 원큐대출/이지페이론 - 신규신청 - STEP01로 이동 한다.
		 */
		submitStep01 : function(prdCd) {

			var oSendForm = form.createForm();
			form.createHiddenField(oSendForm, "efamilyYn", "N");
			form.createHiddenField(oSendForm, "prdCd", prdCd);
			
			var url = opb.base.APPLICATION_CONTEXT_ROOT + "/loan/efamily/wplon451_95t.do";
			pbk.web.util.goMenu(url, oSendForm);
			
		}, //[end] submitStep01

		/**
		 * 원클릭모기지 상담예약
		 */		
		cust_consult_p : function() {

			opb.common.layerpopup.openLayer_fnc(opb.base.APPLICATION_CONTEXT_ROOT + '/efamily/consult/cust_consult_pop.do?sel_kind=03', 'cust_consult_pop', '' , '', ''); 
			
		} //[end] cust_consult_p		
		
	
	};//[end]return
}();	

/*************************************************
 * 인증서관리에 필요한 Script를 정의  
 *************************************************/
pbk.common.certify = function(){
	return {
		/*
		 * G3, G10 설정
		 * 
		 */
		setModule : function() {			
			var brInfo = opb.common.util.getBrowserInfo();
			var pfInfo = opb.common.util.getPlatformInfo();
			if((brInfo.MSIE && brInfo.version < 11) || (pfInfo.Windows && brInfo.Safari)){
				Delfino.setModule('G3');
			} else {
				Delfino.setModule('G10');
				DelfinoConfig.cg.VPCGClientConfig.displayProviders = 'delfino,fincert';
			}
			
		}
		
	};//[end]return
}();	
