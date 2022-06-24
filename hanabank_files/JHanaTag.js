/*****************************************************************************
 * 파일명 : JHanaTag.js
 * 작성일 : 2007. 12. 28
 * 작성자 : 이승우
 * 설   명 :
 * dependency : ext-base.js, ext-all.js, pbk-extJS.js
 * ===========================================================================
 * 변경이력:
 * DATE                AUTHOR        DESCRIPTION
 * ---------------------------------------------------------------------------
 * 2007.12.31	       Oh,Ryunkyong  callbackCallCnt 변수 추가,
 * 								 	 dateQuickSelect 수정
 * 2009.03.03          오륜경         보안매체 공통 스크립트를 파일에서 분리함.
 * 2011.05.23		   양균수		 dateSelectSetDate 의 objYY.length = eday.getYear() - yy + 1; 소스에러.
 *                                   기존 계산함수 파이어폭스와 크롬에서 에러. 각 브라우져에 적용할수 있도록 수정함.
 *****************************************************************************/

/**
 * tag lib 초기화
 *
 */
pbk.tag = {}; // JHanaTag.js 에서만 사용

var callbackCallCnt = 0;
pbk.tag.dateQuickSelect = function() {
	// 실행함수 문자열
	var clickEventEleId = null;
    return {
		isClickFlag : false,
        dateSelectSetOptIndex : function (obj, inval) {

            for (var i = 0; i < obj.length; i++) {

                if (obj.options[i].value == inval) {
                    obj.selectedIndex = i;
                    return;
                }
            }
            obj.selectedIndex = 0;
        },

        dateSelectGetMaxDay : function(iyy, imm) {

            var maxday = new Date(iyy, imm - 1);

            maxday.setMonth(maxday.getMonth() + 1);
            maxday.setDate(maxday.getDate() - 1);
            return maxday.getDate();
        },
        dateSelectSetDate : function(YY, MM, DD, YYYYMMDD, baseDate, range, initDate, pCallbackFuncStr) {

            objYY = document.getElementById(YY);
			// 20081029 오륜경 inputbox에 값 설정후 실행할 함수 문자열
			clickEventEleId = pCallbackFuncStr;
			callbackCallCnt = callbackCallCnt+1;
			if (callbackCallCnt == 2) {
				this.isClickFlag = true;
				callbackCallCnt = 0;
			} else {
				this.isClickFlag = false;
			}



            if( objYY == null ){
                objYY = document.createElement("select");
                objYY.setAttribute("id", YY);
                objYY.setAttribute("name", YY);
                var yyyy = new Date().getFullYear();
                for( var i=0; i<3;i++){
                    objYY.options[i] = new Option(yyyy-i, yyyy-i);
                }
            }
            objMM = document.getElementById(MM);
            if( objMM == null )
            {
                objMM = document.createElement("select");
                objMM.setAttribute("id", MM);
                objMM.setAttribute("name", MM);
            }
            objDD = document.getElementById(DD);
            if( objDD == null )
            {
                objDD = document.createElement("select");
                objDD.setAttribute("id", DD);
                objDD.setAttribute("name", DD);
            }
            objYYYYMMDD = document.getElementById(YYYYMMDD);

            // objYY : 년도 FORM Object
            // objMM : 월 FORM Object
            // objDD : 일 FORM Object
            // baseDate : 기준년도
            // range : 구간
            // initDate : 초기 년월일

            var baseYY = parseInt(baseDate.substring(0, 4), 10);
            var baseMM = parseInt(baseDate.substring(4, 6), 10);
            var baseDD = parseInt(baseDate.substring(6), 10);
            var rangeType = range.substring(0, 1);
            var rangeValue = parseInt(range.substring(1), 10);

            var today = new Date(baseYY, baseMM - 1, baseDD);
            var sday = new Date(today);
            var eday = new Date(today);
            var tmpday = new Date(today);

            var initType = initDate.substring(0, 1);
            var initValue = parseInt(initDate.substring(1), 10);
            var initTmpday = new Date(today);


            if (initDate == "") {
                initDate = baseDate;
            }
            else if (initDate.substring(1, 2) == '-' || initDate.substring(1, 2) == '+') {

                if (initType == "Y")
                    initTmpday.setFullYear(initTmpday.getFullYear() + initValue);
                else if (initType == "M")
                    initTmpday.setMonth(initTmpday.getMonth() + initValue);
                else if (initType == "D") {
                    initTmpday.setDate(initTmpday.getDate() + initValue);
                }

                if (initDate.substring(1, 2) == '-')
                    initTmpday.setDate(initTmpday.getDate() + 1);
                else
                    initTmpday.setDate(initTmpday.getDate() - 1);

                iyy = initTmpday.getFullYear();

                //if (iyy < 2000)   iyy = 1900 + iyy; /* 필요가 없는 구문으로 주석처리함 by 천준호 */

                imm = initTmpday.getMonth() + 1;
                imm = imm < 10 ? "0" + imm : imm;

                idd = initTmpday.getDate();
                idd = idd < 10 ? "0" + idd : idd;

                initDate = "" + iyy + imm + idd;

            }

            if (rangeType == "Y"){
                tmpday.setFullYear(tmpday.getFullYear() + rangeValue);
            }else if (rangeType == "M"){
                tmpday.setMonth(tmpday.getMonth() + rangeValue);
            }else if (rangeType == "D"){
                tmpday.setDate(tmpday.getDate() + rangeValue);
            }

            if (rangeValue == 0) {
            }
            else if (rangeValue < 0) {
                sday = tmpday;
                sday.setDate(sday.getDate() + 1);
            }
            else {

                eday = tmpday;
                eday.setDate(eday.getDate() - 1);
            }
            yy = sday.getFullYear();
            // if (yy < 2000)   yy = 1900 + yy; /* 필요가 없는 구문으로 주석처리함 by 천준호 */
            objYY.length = eday.getFullYear() - yy + 1;

			// 파이어폭스 계산법에 맞춰 소스 수정_양균수.start
            /*
            if (rangeValue < 0) {
            	var TempEdayYY = eday.getYear();
            	if (TempEdayYY < 2000)   TempEdayYY = 1900 + TempEdayYY;
            	objYY.length = TempEdayYY - yy + 1;
            }else{
            	var TempEdayYY = eday.getYear();
            	for(;TempEdayYY < 2000;) TempEdayYY = 1900 + TempEdayYY;
            	objYY.length = TempEdayYY - yy + 1;
            }
            */
         // 파이어폭스 계산법에 맞춰 소스 수정.end

            for (i = 0; i < objYY.length; i++) {

                objYY.options[i].text = parseInt(yy) + i;
                objYY.options[i].value = parseInt(yy) + i;
            }

            iYY = (initDate == "" ? objYY.options[i].value : parseInt(initDate.substring(0, 4), 10));
            this.dateSelectSetOptIndex(objYY, iYY);

            this.dateSelectChangeYear(objYY, objMM, objDD, objYYYYMMDD, baseDate, range, initDate);

        },


        dateSelectChangeYear : function(objYY, objMM, objDD, objYYYYMMDD, baseDate, range, initDate) {

            var baseYY = parseInt(baseDate.substring(0, 4), 10);
            var baseMM = parseInt(baseDate.substring(4, 6), 10);
            var baseDD = parseInt(baseDate.substring(6), 10);
            var rangeType = range.substring(0, 1);
            var rangeValue = parseInt(range.substring(1), 10);

            today = new Date(baseYY, baseMM - 1, baseDD);
            sday = new Date(today);
            eday = new Date(today);
            tmpday = new Date(today);


            if (rangeType == "Y")
                tmpday.setFullYear(tmpday.getFullYear() + rangeValue);
            else if (rangeType == "M")
                tmpday.setMonth(tmpday.getMonth() + rangeValue);
            else if (rangeType == "D")
                tmpday.setDate(tmpday.getDate() + rangeValue);


            if (rangeValue == 0) {

            }
            else if (rangeValue < 0) {

                sday = tmpday;
                sday.setDate(sday.getDate() + 1);

            }
            else {

                eday = tmpday;
                eday.setDate(eday.getDate() - 1);

            }

            if (objYY.options[0].selected) {

                if (eday.getMonth() > sday.getMonth())
                    objMM.length = eday.getMonth() - sday.getMonth() + 1;
                else
                    objMM.length = 12 - sday.getMonth();

                mm = sday.getMonth() + 1;

            }
            else if (objYY.options[objYY.length - 1].selected) {

                objMM.length = eday.getMonth() + 1;
                mm = 1;

            }
            else {

                objMM.length = 12;
                mm = 1;

            }

            for (var i = 0; i < objMM.length; i++,mm++) {

                objMM.options[i].text = mm;
                objMM.options[i].value = mm < 10 ? "0" + mm : mm;

            }

            if (typeof(initDate) == "undefined")
                initDate = "";


            iMM = ((initDate == "" || initDate == 'undefined') ? objMM.options[0].value : parseInt(initDate.substring(4, 6), 10));
            this.dateSelectSetOptIndex(objMM, iMM);


            this.dateSelectChangeMonth(objYY, objMM, objDD, objYYYYMMDD, baseDate, range, initDate);

        },

        dateSelectChangeMonth : function(objYY, objMM, objDD, objYYYYMMDD, baseDate, range, initDate) {

            var baseYY = parseInt(baseDate.substring(0, 4), 10);
            var baseMM = parseInt(baseDate.substring(4, 6), 10);
            var baseDD = parseInt(baseDate.substring(6), 10);
            var rangeType = range.substring(0, 1);
            var rangeValue = parseInt(range.substring(1), 10);

            today = new Date(baseYY, baseMM - 1, baseDD);
            sday = new Date(today);
            eday = new Date(today);
            tmpday = new Date(today);

            if (rangeType == "Y")
                tmpday.setFullYear(tmpday.getFullYear() + rangeValue);
            else if (rangeType == "M")
                tmpday.setMonth(tmpday.getMonth() + rangeValue);
            else if (rangeType == "D")
                tmpday.setDate(tmpday.getDate() + (rangeValue - 1));

            if (rangeValue == 0) {

            }
            else if (rangeValue < 0) {

                sday = tmpday;
                sday.setDate(sday.getDate() + 1);

            }
            else {

                eday = tmpday;
                eday.setDate(eday.getDate() - 1);

            }

            if (objYY.options[0].selected && objMM.options[0].selected) {

                if (rangeValue == 0)
                    objDD.length = 1;
                else
                    objDD.length = this.dateSelectGetMaxDay(objYY.options[objYY.selectedIndex].value, objMM.options[objMM.selectedIndex].value) - sday.getDate() + 1;
                dd = sday.getDate();

            }
            else if (objYY.options[objYY.length - 1].selected && objMM.options[objMM.length - 1].selected) {

                objDD.options.length = eday.getDate();
                dd = 1;

            }
            else {

                objDD.length = this.dateSelectGetMaxDay(objYY.options[objYY.selectedIndex].value, objMM.options[objMM.selectedIndex].value);
                dd = 1;

            }

            for (var i = 0; i < objDD.length; i++,dd++) {

                objDD.options[i].text = dd;
                objDD.options[i].value = dd < 10 ? "0" + dd : dd;

            }

            if (typeof(initDate) == "undefined")
                initDate = "";

            iDD = ((initDate == "" || initDate == 'undefined') ? objDD.options[0].value : parseInt(initDate.substring(6), 10));
            this.dateSelectSetOptIndex(objDD, iDD);

            this.dateSelectChangeDay(objYY, objMM, objDD, objYYYYMMDD);

        },

        dateSelectChangeDay : function(objYY, objMM, objDD, objYYYYMMDD) {
            objYYYYMMDD.value = objYY.options[objYY.selectedIndex].value +"-"+ objMM.options[objMM.selectedIndex].value +"-"+ objDD.options[objDD.selectedIndex].value;
			if (null != clickEventEleId && clickEventEleId != '') {
				return $(clickEventEleId).onclick();
			}
			else {
				//var inquiryBtns = Ext.query("img[src$=btn_search.gif]");
				var inquiryBtns = $j('img[src$="btn_search.gif"]');
				//조회 버튼이 한개인경우

				if (inquiryBtns.length && inquiryBtns.length == 1 && this.isClickFlag) {
					if (inquiryBtns[0].onclick) {
						callbackCallCnt = 0;
						return inquiryBtns[0].onclick();
					}

					var aTag = inquiryBtns[0].parentNode;

					if (aTag.tagName == "A") {
						callbackCallCnt = 0;
						return aTag.onclick();
					}
				}
			}
        }
    }; // end return
}();
var dateQuickSelect = pbk.tag.dateQuickSelect;

pbk.tag.AmountQuickSelect = function() {
	/**
	 * *****************************************
	 * 내부에서만 사용되므로 외부에서 접근하지 않습니다.
	 * *****************************************
	 * Sub Pop Layer 객체 정보입니다.
	 */
	var bigCalPopLayerObj = null;
	var bigCalLayerId = null;

	/**
	 * *****************************************
	 * 내부에서만 사용되므로 외부에서 접근하지 않습니다.
	 * *****************************************
	 * 이벤트를 발생한 오브젝트 정보입니다.
	 */
	var bigCalLinkObj = null;

	/**
	 * 번호나 동작을 받아 값을 셋팅할 inputbox Object
	 */
	var calculatorInput = null;

	/**
	 * 금액을 한글로 표현할 영역아이디
	 */
	var labelKoreanDivId = null;

    return {
		/**
		 *
		 * @param {String} outputId
		 * @param {String} inputAmount 입력금액
		 */
		setTransferAmount: function(outputId, inputAmount){
			
			/* 금액필드 암호화 적용 시 처리  (Y:키보드보안으로 입력) */
			if($j('#cipher_trnsAmt_keyChk').val() == 'Y') {
				/* 키보드보안으로 입력 시 키보드보안 & 필드 값 초기화 및 마우스입력으로 변경 (N)  */
				TouchEnKeyboardClear($j('#' + outputId)[0].form.name, outputId, outputId);
				$j('#cipher_trnsAmt_keyChk').val('N');
			}
			
			calculatorInput = $(outputId);
			labelKoreanDivId = outputId+"Ko";
			if (calculatorInput) {
				var totalValue = 0;
				if (inputAmount == 0) {
					totalValue = 0;
					calculatorInput.value = totalValue;
				}
				else {
					if (calculatorInput.value != '') {
						totalValue = eval(parseFloat(opb.common.util.stripCommas_fnc(calculatorInput.value)) + parseFloat(inputAmount));
					}
					else {
						totalValue = parseFloat(inputAmount);
					}
				}
				if (input.toKoreanFromMoney(totalValue.toString(), labelKoreanDivId, 9,calculatorInput)) {
					calculatorInput.value = totalValue;
				} else {
					return;
				}

			}
			opb.common.changeObjectValueFormatCurrency_fnc(calculatorInput);
		},
		/**
		 *
		 * @param {String} outputId 인풋박스의 아이디
		 * @param {Object} obj 버튼 Object
		 */
		showAmountMachine: function(outputId, obj){
			calculatorInput = $(outputId);
			labelKoreanDivId = outputId+"Ko";
			pbk.tag.AmountQuickSelect.bigCal.show(obj,"bigCalculator","금액입력기","180",null, null);
		},

		// 금액입력기 클로져
		bigCal: {

			/**
			 * Sub Popup Layer를 화면에 출력합니다.
			 * @param {Object} linkObj Sub Popup Layer를 위치시킬 오브젝트
			 * @param {String} layerID 생성할 레이어의 아이디
			 * @param {String} title 제목
			 * @param {Number} layerWidth 레이어의 넓이
			 * @param {String} url Layer에 출력할 URL (Ajax 통신으로 레이어에 Update함)
			 * @param {Object} formObj 파라메터로 사용될 Form Object (Ajax 통신에 사용할 파라메터)
			 */
			show: function(linkObj, layerID, title, layerWidth, url, formObj){
				bigCalLinkObj = linkObj;

				// Dialog를 화면에 출력합니다.
				pbk.tag.AmountQuickSelect.bigCal.setDialog(layerID, title, layerWidth, url, formObj);

				// Dialog의 위치를 조정합니다.
				pbk.tag.AmountQuickSelect.bigCal.setPosition(layerID);

                hana.JHanaNiceForms.init();
            },


			/**
			 * *****************************************
			 * 내부에서만 사용되므로 외부에서 접근하지 않습니다.
			 * *****************************************
			 * Sub Pop Layer를 화면에서 제거합니다.
			 */
			close: function(){
//				if (null != bigCalPopLayerObj) {
//					// 이벤트 삭제
//					Event.stopObserving(window, 'resize', pbk.tag.AmountQuickSelect.bigCal.setPosition);
//					Event.stopObserving(window, 'scroll', pbk.tag.AmountQuickSelect.bigCal.setPosition);
//
//					// 화면에서 삭제
//					bigCalPopLayerObj.destroy();
//
//					// 마스크레이어 삭제
//					//pbk.extJS.layerMask.close();
//
//					// 관련객체 삭제
//					bigCalPopLayerObj = null;
//					bigCalLinkObj = null;
//				}
				// 금액입력기 닫기
				opb.common.layerpopup.closeLayer_fnc(bigCalLayerId);
			},

			/**
			 * *****************************************
			 * 내부에서만 사용되므로 외부에서 접근하지 않습니다.
			 * *****************************************
			 * Dialog를 화면에 출력합니다.
			 * @param {String} layerID 생성할 레이어의 아이디
			 * @param {String} title 제목
			 * @param {Number} layerWidth 레이어의 넓이
			 * @param {String} url Layer에 출력할 URL
			 * @param {Object} formObj 파라메터로 사용될 Form Object
			 */
			setDialog: function(layerID, title, layerWidth, url, formObj){
//				var config = {
//					id: layerID,
//					resizable: false,
//					closable: false,
//					footer: true,
//					border: false,
//					bodyBorder: false,
//					shadow: false,
//					plain: true,
//					width: layerWidth,
//					autoHeight: true
//				};
//
//				if (null == bigCalPopLayerObj) {
//					bigCalPopLayerObj = new Ext.Window(config);
//				}
//
//				// 레이어 화면에 노출
//				bigCalPopLayerObj.setVisible(true);
//
//				var subPopLayerID = bigCalPopLayerObj.id;
//				var baseHTML = pbk.tag.AmountQuickSelect.bigCal.getBaseHTML(subPopLayerID, title, layerWidth);
//
//				bigCalPopLayerObj.body.update(baseHTML.html);
//
//				// 이벤트 정의
//				Event.observe(window, 'resize', pbk.tag.AmountQuickSelect.bigCal.setPosition);
//				Event.observe(window, 'scroll', pbk.tag.AmountQuickSelect.bigCal.setPosition);
//
//				// 마스크레이어 생성
//				//pbk.extJS.layerMask.show($(subPopLayerID).style.zIndex);

				// Save LAYER ID to member variable.
				bigCalLayerId = layerID;

				if (url && null != url) {
//					// 내용 Update
//					var hanaAjax = new hana.JHanaAjax(baseHTML.contentID, true, true);
//					hanaAjax.ajaxCommSubmit(pbk.APPLICATION_CONTEXT_ROOT + url, formObj);
					opb.common.layerpopup.openSubLayerStatic_fnc(url, layerID, null, formObj, null);
				}else {
					var baseHTML = pbk.tag.AmountQuickSelect.bigCal.getBaseHTML(subPopLayerID, title, layerWidth);
					opb.common.layerpopup.openSubLayerStatic_fnc(baseHTML, layerID, null, formObj, null);
				}
			},

			/**
			 * *****************************************
			 * 내부에서만 사용되므로 외부에서 접근하지 않습니다.
			 * *****************************************
			 * Sub Pop Layer의 위치를 지정합니다.
			 * @param {String} popupID Popup 아이디
			 */
			setPosition: function(popupID){
				if (null != bigCalPopLayerObj) {
					if (null != bigCalLinkObj) {
						var popupObj = null;
						var linkObj = bigCalLinkObj;
						var position = Position.cumulativeOffset(linkObj);
						var objSize = Element.getDimensions(linkObj);
						var popupScrollTop = 0;

						if (null != popupID && popupID != undefined) {
							popupObj = $(popupID + '-extScrollDiv');
						}

						if (null != popupObj && popupObj != undefined) {
							popupScrollTop = popupObj.scrollTop;
						}
						// 버튼의 X 좌표 더하여 우측 끝에서 시작하도록
						// 화살표까지의 Y 좌표 = 155px
						var positionX = position[0] + objSize.width +'px';
						var positionY = position[1] + (objSize.height/2) - 155 - popupScrollTop + 'px';

						// 위치 재조정
						bigCalPopLayerObj.setPosition(positionX, positionY);
					}
				}
			},

		   /**
			* *****************************************
			* 내부에서만 사용되므로 외부에서 접근하지 않습니다.
			* *****************************************
			* 기본 HTML을 리턴합니다.
			* @param {String} id 아이디
			* @param {String} title 제목
			* @param {Number} width 넓이
			*/
			getBaseHTML: function(id, title, width){
				var baseHTML = '';
				var contID = id + '_bigCalculator_Cont';

				baseHTML += '<div id="calculator_big">';
				baseHTML += '	<div class="container">';
				baseHTML += '		<p class="caltitle"><img src="' + pbk.APPLICATION_CONTEXT_ROOT + '/resource/images/calculator/h1_calculator_big.gif" alt="비밀번호입력기" /></p>';
				baseHTML += '		<ul class="dial clear">';
				baseHTML += '			<li><a href="javascript:void(0);"><img src="' + pbk.APPLICATION_CONTEXT_ROOT + '/resource/images/calculator/dial_big_01_off.gif" alt="1" onmouseover="menuOver(this)" onmouseout="menuOut(this)" onclick="javascript:amountQuickSelect.bigCal.typeFunc(1);" /></a></li>';
				baseHTML += '			<li><a href="javascript:void(0);"><img src="' + pbk.APPLICATION_CONTEXT_ROOT + '/resource/images/calculator/dial_big_02_off.gif" alt="2" onmouseover="menuOver(this)" onmouseout="menuOut(this)" onclick="javascript:amountQuickSelect.bigCal.typeFunc(2);" /></a></li>';
				baseHTML += '			<li><a href="javascript:void(0);"><img src="' + pbk.APPLICATION_CONTEXT_ROOT + '/resource/images/calculator/dial_big_03_off.gif" alt="3" onmouseover="menuOver(this)" onmouseout="menuOut(this)" onclick="javascript:amountQuickSelect.bigCal.typeFunc(3);" /></a></li>';
				baseHTML += '			<li><a href="javascript:void(0);"><img src="' + pbk.APPLICATION_CONTEXT_ROOT + '/resource/images/calculator/dial_big_ac_off.gif" alt="억" onmouseover="menuOver(this)" onmouseout="menuOut(this)" onclick="javascript:amountQuickSelect.bigCal.typeMultifulFunc(100000000);" /></a></li>';
				baseHTML += '			<li><a href="javascript:void(0);"><img src="' + pbk.APPLICATION_CONTEXT_ROOT + '/resource/images/calculator/dial_big_04_off.gif" alt="4" onmouseover="menuOver(this)" onmouseout="menuOut(this)" onclick="javascript:amountQuickSelect.bigCal.typeFunc(4);" /></a></li>';
				baseHTML += '			<li><a href="javascript:void(0);"><img src="' + pbk.APPLICATION_CONTEXT_ROOT + '/resource/images/calculator/dial_big_05_off.gif" alt="5" onmouseover="menuOver(this)" onmouseout="menuOut(this)" onclick="javascript:amountQuickSelect.bigCal.typeFunc(5);" /></a></li>';
				baseHTML += '			<li><a href="javascript:void(0);"><img src="' + pbk.APPLICATION_CONTEXT_ROOT + '/resource/images/calculator/dial_big_06_off.gif" alt="6" onmouseover="menuOver(this)" onmouseout="menuOut(this)" onclick="javascript:amountQuickSelect.bigCal.typeFunc(6);" /></a></li>';
				baseHTML += '			<li><a href="javascript:void(0);"><img src="' + pbk.APPLICATION_CONTEXT_ROOT + '/resource/images/calculator/dial_big_man_off.gif" alt="만" onmouseover="menuOver(this)" onmouseout="menuOut(this)" onclick="javascript:amountQuickSelect.bigCal.typeMultifulFunc(10000);" /></a></li>';
				baseHTML += '			<li><a href="javascript:void(0);"><img src="' + pbk.APPLICATION_CONTEXT_ROOT + '/resource/images/calculator/dial_big_07_off.gif" alt="7" onmouseover="menuOver(this)" onmouseout="menuOut(this)" onclick="javascript:amountQuickSelect.bigCal.typeFunc(7);" /></a></li>';
				baseHTML += '			<li><a href="javascript:void(0);"><img src="' + pbk.APPLICATION_CONTEXT_ROOT + '/resource/images/calculator/dial_big_08_off.gif" alt="8" onmouseover="menuOver(this)" onmouseout="menuOut(this)" onclick="javascript:amountQuickSelect.bigCal.typeFunc(8);" /></a></li>';
				baseHTML += '			<li><a href="javascript:void(0);"><img src="' + pbk.APPLICATION_CONTEXT_ROOT + '/resource/images/calculator/dial_big_09_off.gif" alt="9" onmouseover="menuOver(this)" onmouseout="menuOut(this)" onclick="javascript:amountQuickSelect.bigCal.typeFunc(9);" /></a></li>';
				baseHTML += '			<li><a href="javascript:void(0);"><img src="' + pbk.APPLICATION_CONTEXT_ROOT + '/resource/images/calculator/dial_big_chun_off.gif" alt="천" onmouseover="menuOver(this)" onmouseout="menuOut(this)" onclick="javascript:amountQuickSelect.bigCal.typeMultifulFunc(1000);" /></a></li>';
				baseHTML += '			<li><a href="javascript:void(0);"><img src="' + pbk.APPLICATION_CONTEXT_ROOT + '/resource/images/calculator/dial_big_oneClear_off.gif" alt="하나만지움" onmouseover="menuOver(this)" onmouseout="menuOut(this)" onclick="javascript:amountQuickSelect.bigCal.clearBackSpaceFunc();" /></a></li>';
				baseHTML += '			<li><a href="javascript:void(0);"><img src="' + pbk.APPLICATION_CONTEXT_ROOT + '/resource/images/calculator/dial_big_00_off.gif" alt="0" onmouseover="menuOver(this)" onmouseout="menuOut(this)" onclick="javascript:amountQuickSelect.bigCal.typeFunc(0);" /></a></li>';
				baseHTML += '			<li><a href="javascript:void(0);"><img src="' + pbk.APPLICATION_CONTEXT_ROOT + '/resource/images/calculator/dial_big_clear_off.gif" alt="전체지움" onmouseover="menuOver(this)" onmouseout="menuOut(this)" onclick="javascript:amountQuickSelect.bigCal.clearAllFunc();" /></a></li>';
				baseHTML += '			<li><a href="javascript:void(0);"><img src="' + pbk.APPLICATION_CONTEXT_ROOT + '/resource/images/calculator/dial_big_won_off.gif" alt="원" onmouseover="menuOver(this)" onmouseout="menuOut(this)" onclick="javascript:amountQuickSelect.bigCal.typeWonFunc();" /></a></li>';
				baseHTML += '		</ul>';
				baseHTML += '	</div>';
				baseHTML += '	<div class="tail"><p id="m_confirm"><img src="' + pbk.APPLICATION_CONTEXT_ROOT + '/resource/images/calculator/money_confirm.gif" alt="금액을입력하세요" /></p><a href="javascript:void(0)"><img src="' + pbk.APPLICATION_CONTEXT_ROOT + '/resource/images/common/bg_pocket_2_close.gif" alt="창닫기"  onclick="javascript:amountQuickSelect.bigCal.close();"/></a></div>';
				baseHTML += '</div>';
				return {
					contentID: contID,
					html: baseHTML
				};
			},
			/**
			 * 숫자를 입력합니다.
			 * @param {String} num
			 */
			typeFunc : function(num) {
				if (calculatorInput) {
					if (calculatorInput.value != '') {
						var evalValue = parseFloat(opb.common.util.stripCommas_fnc(calculatorInput.value));
						if (evalValue != 0) {
							calculatorInput.value = evalValue.toString() + num.toString();
							//개인뱅킹은 9자리 즉 1억까지만 입력제한겁니다.
							if (!hana.JHanaUtils.input.toKoreanFromMoney(calculatorInput.value, labelKoreanDivId, 9,calculatorInput)) {
								return;
							}
							opb.common.changeObjectValueFormatCurrency_fnc(calculatorInput);
						}
						else {
							this.clearAllFunc();
							if (hana.JHanaUtils.input.toKoreanFromMoney("", labelKoreanDivId, 9,calculatorInput)) {
								calculatorInput.value = "";
							} else {
								return;
							}
							calculatorInput.value = num.toString();
						}
					} else {
							calculatorInput.value = calculatorInput.value + num.toString();
							if (!hana.JHanaUtils.input.toKoreanFromMoney(calculatorInput.value, labelKoreanDivId, 9,calculatorInput)) {
								return;
							}
							opb.common.changeObjectValueFormatCurrency_fnc(calculatorInput);
					}
				}
			},
			/**
			 * 해당 숫자를 곱합니다.
			 */
			typeMultifulFunc : function(num){
				if (calculatorInput) {
					if (calculatorInput.value != '') {
						var evalValue = parseFloat(opb.common.util.stripCommas_fnc(calculatorInput.value));
						var temp = evalValue * num;
						calculatorInput.value = temp;
						if (!hana.JHanaUtils.input.toKoreanFromMoney(calculatorInput.value, labelKoreanDivId, 9,calculatorInput)) {
							return;
						}
						opb.common.changeObjectValueFormatCurrency_fnc(calculatorInput);
					}
				}
			},

			/**
			 * 입력된 숫자 하나를 지운다.
			 */
			clearBackSpaceFunc : function() {
				if (calculatorInput) {
					var tripNumber = opb.common.util.stripCommas_fnc(calculatorInput.value);
					if (tripNumber.length > 0) {
						var afterDelNumber = tripNumber.substring(0,tripNumber.length - 1);
						calculatorInput.value = afterDelNumber;
						if (!hana.JHanaUtils.input.toKoreanFromMoney(calculatorInput.value, labelKoreanDivId, 9,calculatorInput)) {
							return;
						}
						opb.common.changeObjectValueFormatCurrency_fnc(calculatorInput);
					}
				}
			},
			/**
			 * 입력된 값을 clear 한다.
			 */
			clearAllFunc : function() {
				if (calculatorInput) {
					hana.JHanaUtils.input.toKoreanFromMoney ("0",labelKoreanDivId,9);
					calculatorInput.value = "";
				}
			},
			/**
			 * 금액입력을 끝낸다.
			 */
			typeWonFunc : function() {
				if (calculatorInput) {
					pbk.tag.AmountQuickSelect.bigCal.close();
					calculatorInput.select();
					calculatorInput.focus();
				}
			}

		}
	};
}();

var amountQuickSelect = pbk.tag.AmountQuickSelect;

/**
 * 아이콘 그룹 태그에 대한 함수 모음
 */
pbk.tag.icongroup = function() {
	return {
		/**
		 * 화면인쇄
		 * @param {Object} clickObj
		 * @param {Object} targetDiv
		 */
		print: {
			/**
			 *  태그의 호환성을 위해 .. 나중에 printDiv 로 대체 가능.
			 * @param {Object} clickObj
			 * @param {Object} targetDiv
			 */
			printScreen : function(clickObj, targetDiv) {
				//if (pbk!=undefined || pbk!=null) {
					/* 20090310 printmade 인쇄를 이용한다. printmade.js */
				//	if (targetDiv && targetDiv != null && targetDiv != '') {
				//		print_div(targetDiv, 0, 0, 0, 0, 0);
				//	}
				//	else {
				//		print_div(opb.base.CONTENTS_DIV, 0, 0, 0, 0, 0);
				//	}
				//}
				//else {
				        print_combo('',true,0,0,0,0,null);
					//print_part(opb.base.MAIN_FRAME);
				//}
			},
			/**
			 * 영역인쇄 (JHanaUtils로 위치 이동 할수 있음. 단지 태그에서 쓴다는 의미로 packaging)
			 * @param {Object} targetDiv
			 */
			printDiv : function(targetDiv){
				/* 20090310 printmade 인쇄를 이용한다. printmade.js */
				if (targetDiv && targetDiv != null && targetDiv != '') {
					print_div(targetDiv, 0, 0, 0, 0, 0);
				}
				else {
					print_div(opb.base.CONTENTS_DIV, 0, 0, 0, 0, 0);
				}
			}
		}
	}; //[end] return
}(); //[end] pbk.tag.icongroup

/**
 * fontSize 지정 태그 <pbk:changeFontSize .. > 에서 쓰이는 함수 모음
 */
pbk.tag.fontSize = function(){
	/**
	 * *****************************************
	 * 내부에서만 사용되므로 외부에서 접근하지 않습니다.
	 * *****************************************
	 * 폰트 기본 사이즈(12px)
	 */
	var divFontSize = 12;

	/**
	 * *****************************************
	 * 내부에서만 사용되므로 외부에서 접근하지 않습니다.
	 * *****************************************
	 * 변경할 HTML 태그 목록
	 */
	var tagList = ['DIV','TH','TD','A','SPAN'];

	return {
		/**
		 * 특정 영역의 FontSize를 조절한다.(2px씩 증가 또는 감소)
		 * @param {String} divId 사이즈 조정하고자 하는 영역의 element
		 * @param {String} flag +,-
		 */
		change : function(divId, flag) {
			if (flag=='+' && divFontSize > 24) {
				opb.common.layerpopup.openAlert_fnc("범위오류", "더이상 크게 할 수 없습니다.");
			}
			if (flag=='-' && divFontSize <= 10) {
				opb.common.layerpopup.openAlert_fnc("범위오류", "더이상 작게 할 수 없습니다.");
			}
			else {
				var changeSize = (flag == '+' ? divFontSize + 2 : divFontSize - 2);

				// 지정된 element 이하의 fontSize를 지정한다.
				var lst, el = null;
				for (var i = 0; i < tagList.length; i++) {
					lst = $(divId).getElementsByTagName(tagList[i]);
					if (lst != null && lst.length > 0) {
						for (var j = 0; j < lst.length; j++) {
							el = lst.item(j).style.fontSize = changeSize+'px';
						}
					}
				}
				divFontSize = changeSize;
			}
		}
	};
}();


/**
 * page 태그 <hana:paging .. > 에서 쓰이는 default 함수
 */
var goBtQueryPage = function(pageNum, formId, searchBtnId){
    var formObj = document.forms[formId];

    form.createHiddenField(formObj, "strPost", pageNum);

    $(searchBtnId).onclick();

    form.removeHiddenField(formObj, "strPost");
};


/**
 * page 태그 <hana:paging .. > 에서 쓰이는 default 함수
 */
var goKftcPage = function(pageNum, formId, searchBtnId){
    var formObj = document.forms[formId];

    form.createHiddenField(formObj, "pageNo", pageNum);

    $(searchBtnId).onclick();

    form.removeHiddenField(formObj, "pageNo");
};

/**
 * page 태그 <hana:paging .. > 에서 쓰이는 default 함수
 */
var goContinuousPage = function(pageNum, formId, searchBtnId){
	var formObj = document.forms[formId];

    form.createHiddenField(formObj, "pageNo", pageNum);

    //첫번째 조회인지 여부 (1 이면 초기화 됨)
    form.createHiddenField(formObj, "firstCont", "0");

    $(searchBtnId).onclick();

    form.removeHiddenField(formObj, "pageNo");

	form.removeHiddenField(formObj, "firstCont");
};


/**
 * 페이지 설정을 처리
 */
var setSearchPage = function( formObj, page, reflash ){
    // page 설정
    if (page != undefined) {
        if (isNaN(page)) {
            formObj.strPost.value = 1;
        }
        else {
            formObj.strPost.value = page;
        }
    }

    // 초기 설정
    if( reflash )
        formObj.reflash.value = reflash;
};


/* START  20090303 보안매체 공통 스크립트 입니다. */
var	securityNextFocus = function (from, to, len) {
	if(len == from.value.length) {
		to.focus();
		return;
	}
};

/**
* 입력값이 숫자로 되어있는지 체크
*/
var	securityIsNumber = function (value) {
   var chars = "0123456789";
   return securityContainsCharsOnly(value,chars);
};

/**
* 입력값이 특정 문자(chars)만으로 되어있는지 체크
* 특정 문자만 허용하려 할 때 사용
* ex) if (!securityContainsCharsOnly(form.blood,"ABO")) {
*         alert("혈액형 필드에는 A,B,O 문자만 사용할 수 있습니다.");
*     }
*/
var	securityContainsCharsOnly = function (value,chars) {
   for (var inx = 0; inx < value.length; inx++) {
      if (chars.indexOf(value.charAt(inx)) == -1)
          return false;
   }
   return true;
};
/* END  보안카드 공통 스크립트 입니다. */