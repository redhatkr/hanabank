try {
    if(null == pbk.common.popup || undefined == pbk.common.popup) {
         pbk.common.popup = {};
    }
} catch (e) {
    pbk.common.popup = {};
}

/**
 * 금융계산기 팝업
 */
pbk.common.popup.calculator = function() {
    
	var popupId = 'interestRate';
	var isPopupLayer = false;
	var baseUrl = 'http://dev11.kebhana.com:18080';
	var newBaseUrl = opb.base.APPLICATION_CONTEXT_ROOT;
	var isDebugEnabled = true;
	var isTest = 'false';
	var subUrl = '/foreign/calc/';
	
	var bankCal1_01 = baseUrl + '/contents/mall/bankcal/bankCal1_01.jsp'; //예금 - 적금월불입액
	var bankCal1_02 = baseUrl + '/contents/mall/bankcal/bankCal1_02.jsp'; //예금 - 적금만기금액
	var bankCal1_03 = baseUrl + '/contents/mall/bankcal/bankCal1_03.jsp'; //예금 - 예금만기금액
	var bankCal1_04 = baseUrl + '/contents/mall/bankcal/bankCal1_04.jsp'; //예금 - 원금계산기
	var bankCal2_01 = baseUrl + '/contents/mall/bankcal/bankCal2_01.jsp'; //대출
	var bankCal3_01 = baseUrl + '/contents/mall/bankcal/bankCal3_01.jsp'; //외환 - 외화환전
	var bankCal3_02 = baseUrl + '/contents/mall/bankcal/bankCal3_02.jsp'; //외환 - 해외송금
	var bankCal3_03 = baseUrl + '/contents/mall/bankcal/bankCal3_03.jsp'; //외환 - 수출입거래
	var bankCal3_04 = baseUrl + '/contents/mall/bankcal/bankCal3_04.jsp'; //외환 - 기준율로 계산
	var bankCal3_05 = baseUrl + '/contents/mall/bankcal/bankCal3_05.jsp'; //외환 - 교환비율
	var bankCal4_01 = baseUrl + '/contents/mall/bankcal/bankCal4_01.jsp'; //할인어음
	
	var bankCal6_01 = newBaseUrl + subUrl + 'wpfxd653_01p.do'; //예금 - 적금월불입액 /contents/mall/bankcal/bankCal1_01.jsp
	var bankCal6_02 = newBaseUrl + subUrl + 'wpfxd653_02p.do'; //예금 - 적금만기금액 /contents/mall/bankcal/bankCal1_02.jsp
	var bankCal6_03 = newBaseUrl + subUrl + 'wpfxd653_03p.do'; //예금 - 예금만기금액 /contents/mall/bankcal/bankCal1_03.jsp
	var bankCal6_04 = newBaseUrl + subUrl + 'wpfxd653_04p.do'; //예금 - 원금계산기 /contents/mall/bankcal/bankCal1_04.jsp
	var bankCal7_01 = newBaseUrl + subUrl + 'wpfxd653_05p.do'; //대출 /contents/mall/bankcal/bankCal2_01.jsp
	var bankCal8_01 = newBaseUrl + subUrl + 'wpfxd653_06p.do'; //외환 - 외화현찰환전 /kebPibProject/app_pib/pibWeb/jsp/pib/cm/PCM3001P.jsp
	var bankCal8_02 = newBaseUrl + subUrl + 'wpfxd653_07p.do'; //외환 - 외화송금 /kebPibProject/app_pib/pibWeb/jsp/pib/cm/PCM3101P.jsp
	var bankCal8_03 = newBaseUrl + subUrl + 'wpfxd653_08p.do'; //외환 - 외환매매 /kebPibProject/app_pib/pibWeb/jsp/pib/cm/PCM3301P.jsp
	var bankCal8_04 = newBaseUrl + subUrl + 'wpfxd653_09p.do'; //외환 - 외화수표 /kebPibProject/app_pib/pibWeb/jsp/pib/cm/PCM3201P.jsp /kebPibProject/app_pib/pibWeb/jsp/pib/cm/PCM3202P.jsp
	var bankCal8_05 = newBaseUrl + subUrl + 'wpfxd653_10p.do'; //외환 - 수출입거래 /contents/mall/bankcal/bankCal3_03.jsp
	var bankCal8_06 = newBaseUrl + subUrl + 'wpfxd653_11p.do'; //외환 - 매매기준율 /contents/mall/bankcal/bankCal3_04.jsp
	var bankCal8_07 = newBaseUrl + subUrl + 'wpfxd653_12p.do'; //외환 - 교환비율 /contents/mall/bankcal/bankCal3_05.jsp
	var bankCal9_01 = newBaseUrl + subUrl + 'wpfxd653_13p.do'; //할인어음 /contents/mall/bankcal/bankCal4_01.jsp
	
	var bankCa15 = 'wpfxd653_15p.do'; //통화구분
	var bankCa26 = 'wpfxd653_26t.do'; //외환 - 외화현찰환전
	var bankCa27 = 'wpfxd653_27t.do'; //외환 - 외화송금
	var bankCa28 = 'wpfxd653_28t.do'; //외환 - 외환매매
	var bankCa29 = 'wpfxd653_29t.do'; //외환 - 외화수표
	var bankCa30 = 'wpfxd653_30t.do'; //외환 - 수출입거래
	var bankCa31 = 'wpfxd653_31t.do'; //외환 - 매매기준율
	var bankCa32 = 'wpfxd653_32t.do'; //외환 - 교환비율
	
	var urlAll = {'11':bankCal1_01,'12':bankCal1_02,'13':bankCal1_03,'14':bankCal1_04
			     ,'21':bankCal2_01
			     ,'31':bankCal3_01,'32':bankCal3_02,'33':bankCal3_03,'34':bankCal3_04,'35':bankCal3_05
			     ,'41':bankCal4_01
			     
			     ,'61':bankCal6_01,'62':bankCal6_02,'63':bankCal6_03,'64':bankCal6_04
			     ,'71':bankCal7_01
			     ,'81':bankCal8_01,'82':bankCal8_02,'83':bankCal8_03,'84':bankCal8_04,'85':bankCal8_05,'86':bankCal8_06,'87':bankCal8_07
			     ,'91':bankCal9_01};
	
	return {

		/**
		 * 탭 메뉴 이동
		 * pbk.common.popup.calculator.goMenu
		 */
		goMenu : function(idx) {
			
			if(undefined === idx || '' === idx) {
				
				idx = '61';
			}
			
			var url = urlAll[idx];
			
			//opb.common.util.goMenu_fnc(url, null);
			location.href = url;
			
		}, // goMenu -End
		
		/**
		 * 팝업 열기
		 * pbk.common.popup.calculator.open
		 */
		open : function(idx) {
			
			if(undefined === idx || '' === idx) {
				
				idx = '61';
			}
			
			var url = urlAll[idx];
			
			if(isPopupLayer) {
				
				opb.common.layerpopup.openLayer_fnc(url, popupId, null, null, null);
			} else {

				var width = 735;
	            var height = 715;
	            var topPos = (screen.height) ? (screen.height - height)/2 : 0;
	            var leftPos = (screen.width) ? (screen.width - width)/2 : 0;

	            window.open(url, popupId, 'width=' + width + ',height=' + height
	            	+ ',toolbar=no,menubar=no,scrollbars=no,top=' + topPos + ',left=' + leftPos);
			}
			
		}, // open -End
	
		/**
		 * 팝업 닫기
		 * pbk.common.popup.calculator.close
		 */
		close : function() {
			
			if(isPopupLayer) {
				
				opb.common.layerpopup.closeLayer_fnc(popupId);
			} else {
				
				window.close();
			}
		}, // close -End
		
		/**
		 * 공통
		 * pbk.common.popup.calculator.common
		 */
		common : {
			
			/**
			 * 공통 선택
			 * pbk.common.popup.calculator.common.change
			 */
			change : {
				
				/**
				 * 공통 통화구분 선택
				 * pbk.common.popup.calculator.common.change.curDv
				 */
				curDv : function() {
					
					var curDvCdObj = $j('select[name=curDvCd]'); //통화구분
					var curDvCd1Obj = $j('#curDvCd1'); //통화구분
					
					curDvCd1Obj.text(curDvCdObj.val());

					if('' !== curDvCdObj.val()) {
						
						$j('#rslt999').addClass('none');
						var formObj = form.createForm([{id:'curDvCd', value :curDvCdObj.val()}] );
						var hanaAjax = new hana.JHanaAjax('', true, true);
						hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + subUrl + bankCa15, formObj, true, pbk.common.popup.calculator.common.change.getCurDv, 'UTF-8');
					}
				}, // curDv -End
				
				/**
				 * 공통 통화구분 선택 결과
				 * pbk.common.popup.calculator.common.change.getCurDv
				 */
				getCurDv : function(res, arg) {

					var data = eval('('+res.responseText+')');

					if(isDebugEnabled) {
						
						console.log(res.responseText);
						console.log(data);
					}

					if(data){

						if('success' === data.outHm.calcRslt) {

							var curDvCd = data.inHm.curDvCd; //통화구분
							
							var idx = 0;
							var acmnBuyRt = data.outRec[idx].acmnBuyRt; // R(16), 현찰매입율
							var acmnSllRt = data.outRec[idx].acmnSllRt; // R(16), 현찰매도율

							$j('#rslt999').removeClass('none');
							$j('#rslt999').text('고시환율 : 사실때 ' + html.toMoney(parseFloat(acmnSllRt).toFixed(2)) + ' / 파실때 ' + html.toMoney(parseFloat(acmnBuyRt).toFixed(2)));
						}
					}
				}, // getCurDv -End
				
				/**
				 * 공통 통화구분 선택
				 * pbk.common.popup.calculator.common.change.curDv2
				 */
				curDv2 : function() {
					
					var curDvCdObj = $j('select[name=curDvCd]'); //통화구분
					var curDvCd1Obj = $j('#curDvCd1'); //통화구분
					
					curDvCd1Obj.text(curDvCdObj.val());

					if('' !== curDvCdObj.val()) {
						
						$j('#rslt999').addClass('none');
						var formObj = form.createForm([{id:'curDvCd', value :curDvCdObj.val()}] );
						var hanaAjax = new hana.JHanaAjax('', true, true);
						hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + subUrl + bankCa15, formObj, true, pbk.common.popup.calculator.common.change.getCurDv2, 'UTF-8');
					}
				}, // curDv2 -End
				
				/**
				 * 공통 통화구분 선택 결과
				 * pbk.common.popup.calculator.common.change.getCurDv2
				 */
				getCurDv2 : function(res, arg) {

					var data = eval('('+res.responseText+')');

					if(isDebugEnabled) {
						
						console.log(res.responseText);
						console.log(data);
					}

					if(data){

						if('success' === data.outHm.calcRslt) {

							var curDvCd = data.inHm.curDvCd; //통화구분
							
							var idx = 0;
							var ttSllRt = data.outRec[idx].ttSllRt; // R(16), 전신환매도율(송금보낼때)
							var ttBuyRt = data.outRec[idx].ttBuyRt; // R(16), 전신환매입율(송금받을때)

							$j('#rslt999').removeClass('none');
							$j('#rslt999').text('고시환율 : 보낼때 ' + html.toMoney(parseFloat(ttSllRt).toFixed(2)) + ' / 받을때 ' + html.toMoney(parseFloat(ttBuyRt).toFixed(2)));
						}
					}
				}, // getCurDv2 -End
			
				/**
				 * 공통 거래구분 선택
				 * pbk.common.popup.calculator.common.change.trscDv
				 */
				trscDv : function() {
					
					var trscDvCdObj = $j('input:radio[name=trscDvCd]:checked'); //거래구분
					var trscAmt1TrObj = $j('#trscAmt1Tr'); //[거래금액]외화 tr
					var trscAmt2TrObj = $j('#trscAmt2Tr'); //[거래금액]원화 tr
					var trscAmt1Obj = $j('input[name=trscAmt1]'); //[거래금액]외화
					var trscAmt2Obj = $j('input[name=trscAmt2]'); //[거래금액]원화
					
					if(0 < trscDvCdObj.length) { //거래구분
						
						if('1' === trscDvCdObj.val() || '3' === trscDvCdObj.val()) { //[거래구분]원화
							
							trscAmt1TrObj.addClass('none'); //[거래금액]외화 비활성화
							trscAmt2TrObj.removeClass('none'); //[거래금액]원화 활성화
							
							trscAmt1Obj.val('10'); //[거래금액]외화 초기화
							trscAmt2Obj.val('100,000'); //[거래금액]원화 초기화
						} else {
							
							trscAmt1TrObj.removeClass('none'); //[거래금액]외화 활성화
							trscAmt2TrObj.addClass('none'); //[거래금액]원화 비활성화
							
							trscAmt1Obj.val('10'); //[거래금액]외화 초기화
							trscAmt2Obj.val('100,000'); //[거래금액]원화 초기화
						}
					}
				}, // trscDv -End
				
				/**
				 * 공통 거래금액 세팅
				 * pbk.common.popup.calculator.common.change.setTrscAmt
				 */
				setTrscAmt : function(num) {
					
					var trscDvCdObj = $j('input:radio[name=trscDvCd]:checked'); //거래구분
					var trscAmt1Obj = $j('input[name=trscAmt1]'); //[거래금액]외화
					var trscAmt2Obj = $j('input[name=trscAmt2]'); //[거래금액]원화
					
					if(0 < trscDvCdObj.length) { //거래구분
						
						if('1' === trscDvCdObj.val() || '3' === trscDvCdObj.val()) { //[거래구분]원화

							if(undefined === num || null === num || '' === num || '0' === num) {
								
								trscAmt2Obj.val('100,000'); //[거래금액]원화
							} else {
								
								trscAmt2Obj.val(num); //[거래금액]원화
							}
						} else {
							
							if(undefined === num || null === num || '' === num || '0' === num) {
								
								trscAmt1Obj.val('0'); //[거래금액]외화
							} else {
								
								trscAmt1Obj.val(num); //[거래금액]외화
							}
							
						}
					}
				}, // setTrscAmt -End
			
				/**
				 * 공통 환율기준 선택
				 * pbk.common.popup.calculator.common.change.exhgRtBasc
				 */
				exhgRtBasc : function() {

					var exhgRtBascCdObj = $j('input:radio[name=exhgRtBascCd]:checked'); //환율기준
					var exhgRtBascObj = $j('input[name=exhgRtBasc]');//[환율기준]직접입력 값
					var exhgRtBascPointObj = $j('input[name=exhgRtBascPoint]'); //[환율기준]직접입력 값
					var exhgRtPrimCdObj = $j('input:radio[name=exhgRtPrimCd]'); //환율우대
					var exhgRtPrimCd1Obj = $j('input:radio[name=exhgRtPrimCd]:checked'); //환율우대
					var exhgRtPrim1Obj = $j('select[name=exhgRtPrim1]'); //[환율우대]해당있음 값
					var exhgRtPrimObj = $j('input[name=exhgRtPrim]'); //[환율우대]해당있음 값
					
					if(0 < exhgRtBascCdObj.length) { //환율기준

						if('0' === exhgRtBascCdObj.val()) { //[환율기준]고시환율 선택 시
							
							exhgRtBascObj.attr('readonly' , true); //[환율기준]직접입력 값 비활성화
							exhgRtBascPointObj.attr('readonly' , true); //[환율기준]직접입력 값 비활성화
							
							exhgRtBascObj.addClass('disabled'); //[환율기준]직접입력 값 비활성화
							exhgRtBascPointObj.addClass('disabled'); //[환율기준]직접입력 값 비활성화
							
							exhgRtBascObj.val('0'); //[환율기준]직접입력 값 초기화
							exhgRtBascPointObj.val('00'); //[환율기준]직접입력 값 초기화

							exhgRtPrimCdObj.attr('disabled' , false); //환율우대 활성화
							
							exhgRtPrimCdObj.removeClass('disabled'); //환율우대 활성화
							
							if('1' === exhgRtPrimCd1Obj.val()) {
								
								exhgRtPrim1Obj.attr('disabled' , false); //[환율우대]해당있음 값 활성화
								
								exhgRtPrim1Obj.removeClass('disabled'); //[환율우대]해당있음 값 활성화
							} else {
								
								exhgRtPrim1Obj.attr('disabled' , true); //[환율우대]해당있음 값 비활성화
								
								exhgRtPrim1Obj.addClass('disabled'); //[환율우대]해당있음 값 비활성화
								
								exhgRtPrim1Obj.val('0'); //[환율우대]해당있음 값 초기화
								exhgRtPrimObj.val('0'); //[환율우대]해당있음 값 초기화
							}
						} else {
							
							exhgRtBascObj.attr('readonly' , false); //[환율기준]직접입력 값 활성화
							exhgRtBascPointObj.attr('readonly' , false); //[환율기준]직접입력 값 활성화
							
							exhgRtBascObj.removeClass('disabled'); //[환율기준]직접입력 값 활성화
							exhgRtBascPointObj.removeClass('disabled'); //[환율기준]직접입력 값 활성화
							
							exhgRtPrimCdObj.attr('disabled' , true); //환율우대 비활성화
							
							exhgRtPrimCdObj.addClass('disabled'); //환율우대 비활성화
							
							$j('input:radio[name=exhgRtPrimCd]:radio[value="0"]').prop('checked',true); //[환율우대]해당업음 선택
							
							exhgRtPrim1Obj.attr('disabled' , true); //[환율우대]해당있음 값 비활성화
							
							exhgRtPrim1Obj.addClass('disabled'); //[환율우대]해당있음 값 비활성화
							
							exhgRtPrim1Obj.val('0'); //[환율우대]해당있음 값 초기화
							exhgRtPrimObj.val('0'); //[환율우대]해당있음 값 초기화
						}
					}
				}, // exhgRtBasc -End
				
				/**
				 * 공통 환율우대 선택
				 * pbk.common.popup.calculator.common.change.exhgRtPrim
				 */
				exhgRtPrim : function() {
					
					var exhgRtPrimCdObj = $j('input:radio[name=exhgRtPrimCd]:checked'); //환율우대
					var exhgRtPrim1Obj = $j('select[name=exhgRtPrim1]'); //[환율우대]해당있음 값
					var exhgRtPrimObj = $j('input[name=exhgRtPrim]'); //환율우대
					
					if(0 < exhgRtPrimCdObj.length) { //환율우대
						
						if('0' === exhgRtPrimCdObj.val()) { //[환율우대]해당없음 선택 시
							
							exhgRtPrim1Obj.attr('disabled' , true); //[환율우대]해당있음 값 비활성화
							
							exhgRtPrim1Obj.addClass('disabled'); //[환율우대]해당있음 값 비활성화
							
							exhgRtPrim1Obj.val('0'); //[환율우대]해당있음 값 초기화
							exhgRtPrimObj.val('0'); //[환율우대]해당있음 값 초기화
						} else {
							
							exhgRtPrim1Obj.attr('disabled' , false); //[환율우대]해당있음 값 활성화
							
							exhgRtPrim1Obj.removeClass('disabled'); //[환율우대]해당있음 값 활성화
						}
					}
				} // exhgRtPrim -End				
			}, // change -End
			
			/**
			 * 공통 이벤트
			 * pbk.common.popup.calculator.common.event
			 */
			event : {
				
				/**
				 * 공통 통화구분 이벤트
				 * pbk.common.popup.calculator.common.event.curDv
				 */
				curDv : function() {
					
					var curDvCdObj = $j('select[name=curDvCd]'); //통화구분
					
					curDvCdObj.removeAttr('onchange').bind('change', function(){

						pbk.common.popup.calculator.common.change.curDv();
					});
				}, // curDv -End
				
				/**
				 * 공통 통화구분 이벤트
				 * pbk.common.popup.calculator.common.event.curDv2
				 */
				curDv2 : function() {
					
					var curDvCdObj = $j('select[name=curDvCd]'); //통화구분
					
					curDvCdObj.removeAttr('onchange').bind('change', function(){

						pbk.common.popup.calculator.common.change.curDv2();
					});
				}, // curDv2 -End
			
				/**
				 * 공통 거래구분 이벤트
				 * pbk.common.popup.calculator.common.event.trscDv
				 */
				trscDv : function() {
					
					var trscDvCdObj = $j('input:radio[name=trscDvCd]'); //거래구분
					
					trscDvCdObj.removeAttr('onclick').bind('click', function(){
	
						pbk.common.popup.calculator.common.change.trscDv();
					});
				}, // trscDv -End
				
				/**
				 * 공통 거래금액 이벤트
				 * pbk.common.popup.calculator.common.event.setTrscAmt
				 */
				setTrscAmt : function() {
					
					var setTrscAmt1 = $j('#setTrscAmt1');
					var setTrscAmt2 = $j('#setTrscAmt2');
					var setTrscAmt3 = $j('#setTrscAmt3');
					var setTrscAmt4 = $j('#setTrscAmt4');
					var setTrscAmt5 = $j('#setTrscAmt5');
					var setTrscAmt6 = $j('#setTrscAmt6');
					
					var setTrscAmt11 = $j('#setTrscAmt11');
					var setTrscAmt12 = $j('#setTrscAmt12');
					var setTrscAmt13 = $j('#setTrscAmt13');
					var setTrscAmt14 = $j('#setTrscAmt14');
					var setTrscAmt15 = $j('#setTrscAmt15');
					
					setTrscAmt1.removeAttr('onclick').bind('click', function(){
	
						pbk.common.popup.calculator.common.change.setTrscAmt('10');
					});
					
					setTrscAmt2.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.common.change.setTrscAmt('100');
					});
					
					setTrscAmt3.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.common.change.setTrscAmt('500');
					});
					
					setTrscAmt4.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.common.change.setTrscAmt('1,000');
					});
					
					setTrscAmt5.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.common.change.setTrscAmt('10,000');
					});
					
					setTrscAmt6.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.common.change.setTrscAmt();
					});
					
					setTrscAmt11.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.common.change.setTrscAmt('100,000');
					});
					
					setTrscAmt12.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.common.change.setTrscAmt('1,000,000');
					});
					
					setTrscAmt13.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.common.change.setTrscAmt('5,000,000');
					});
					
					setTrscAmt14.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.common.change.setTrscAmt('10,000,000');
					});
					
					setTrscAmt15.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.common.change.setTrscAmt();
					});
				}, // setTrscAmt -End
				
				/**
				 * 공통 환율기준 이벤트
				 * pbk.common.popup.calculator.common.event.exhgRtBasc
				 */
				exhgRtBasc : function() {
					
					var exhgRtBascCdObj = $j('input:radio[name=exhgRtBascCd]'); //환율기준
					
					exhgRtBascCdObj.removeAttr('onclick').bind('click', function(){
	
						pbk.common.popup.calculator.common.change.exhgRtBasc();
					});
				}, // exhgRtBasc -End
				
				/**
				 * 공통 환율우대 이벤트
				 * pbk.common.popup.calculator.common.event.exhgRtPrim
				 */
				exhgRtPrim : function() {
					
					var exhgRtPrimObj = $j('input[name=exhgRtPrimCd]'); //환율우대
					
					exhgRtPrimObj.removeAttr('onclick').bind('click', function(){
	
						pbk.common.popup.calculator.common.change.exhgRtPrim();
					});
				} // exhgRtPrim -End
			} // event -End
		}, // common -End
		
		/**
		 * 외화현찰환전
		 * pbk.common.popup.calculator.frcMnexh
		 */
		frcMnexh : {
			
			/**
			 * 외화현찰환전 초기화
			 * pbk.common.popup.calculator.frcMnexh.init
			 */
			init : function() {
				
				pbk.common.popup.calculator.frcMnexh.change.view(); //외화현찰환전 화면 세팅
				
				pbk.common.popup.calculator.common.change.curDv(); //공통 통화구분 선택
				pbk.common.popup.calculator.common.change.trscDv(); //공통 거래구분 선택
				pbk.common.popup.calculator.common.change.exhgRtBasc(); //공통 환율기준 선택
				pbk.common.popup.calculator.common.change.exhgRtPrim(); //공통 환율우대 선택
				
				pbk.common.popup.calculator.common.event.curDv(); //공통 통화구분 이벤트
				pbk.common.popup.calculator.common.event.trscDv(); //공통 거래구분 이벤트
				pbk.common.popup.calculator.common.event.setTrscAmt(); //공통 거래금액 이벤트
				pbk.common.popup.calculator.common.event.exhgRtBasc(); //공통 환율기준 이벤트
				pbk.common.popup.calculator.common.event.exhgRtPrim(); //공통 환율우대 이벤트
			}, // init -End
			
			/**
			 * 외화현찰환전 선택
			 * pbk.common.popup.calculator.frcMnexh.change
			 */
			change : {
				
				/**
				 * 외화현찰환전 화면 세팅
				 * pbk.common.popup.calculator.frcMnexh.change.view
				 */
				view : function(num) {

					if('0' === num){ //[거래구분]외화를 사실때 (외화기준)
						
						$j('#rslt096').removeClass('none'); //계산결과 타이틀
						$j('#rslt097').removeClass('none'); //계산결과 요약
						$j('#rslt098').removeClass('none'); //기준일
						$j('#rslt099').removeClass('none'); //계산결과 상세
						$j('#rslt197').addClass('none'); //계산결과 요약
						$j('#rslt199').addClass('none'); //계산결과 상세
						$j('#rslt297').addClass('none'); //계산결과 요약
						$j('#rslt299').addClass('none'); //계산결과 상세
					} else if('1' === num){ //[거래구분]외화를 사실때 (원화기준)
						
						$j('#rslt096').removeClass('none'); //계산결과 타이틀
						$j('#rslt097').addClass('none'); //계산결과 요약
						$j('#rslt098').removeClass('none'); //기준일
						$j('#rslt099').addClass('none'); //계산결과 상세
						$j('#rslt197').removeClass('none'); //계산결과 요약
						$j('#rslt199').removeClass('none'); //계산결과 상세
						$j('#rslt297').addClass('none'); //계산결과 요약
						$j('#rslt299').addClass('none'); //계산결과 상세
					} else if('2' === num){ //[거래구분]외화를 파실때
						
						$j('#rslt096').removeClass('none'); //계산결과 타이틀
						$j('#rslt097').addClass('none'); //계산결과 요약
						$j('#rslt098').removeClass('none'); //기준일
						$j('#rslt099').addClass('none'); //계산결과 상세
						$j('#rslt197').addClass('none'); //계산결과 요약
						$j('#rslt199').addClass('none'); //계산결과 상세
						$j('#rslt297').removeClass('none'); //계산결과 요약
						$j('#rslt299').removeClass('none'); //계산결과 상세
					} else {
						
						$j('#rslt096').addClass('none'); //계산결과 타이틀
						$j('#rslt097').addClass('none'); //계산결과 요약
						$j('#rslt098').addClass('none'); //기준일
						$j('#rslt099').addClass('none'); //계산결과 상세
						$j('#rslt197').addClass('none'); //계산결과 요약
						$j('#rslt199').addClass('none'); //계산결과 상세
						$j('#rslt297').addClass('none'); //계산결과 요약
						$j('#rslt299').addClass('none'); //계산결과 상세
					}
				} // view -End
			}, // change -End
		
			/**
			 * 외화현찰환전 계산 요청
			 * pbk.common.popup.calculator.frcMnexh.submit
			 */
			submit : function(formObj) {
				
				var jForm = new hana.JForm(formObj);
				
				pbk.common.popup.calculator.frcMnexh.change.view(); //외화현찰환전 화면 세팅
				
				var curDvCdObj = $j('select[name=curDvCd]'); //통화구분
				var trscDvCdObj = $j('input:radio[name=trscDvCd]:checked'); //거래구분
				var trscAmtObj = $j('input[name=trscAmt]'); //거래금액
				var trscAmt1Obj = $j('input[name=trscAmt1]'); //[거래금액]외화
				var trscAmt2Obj = $j('input[name=trscAmt2]'); //[거래금액]원화
				var exhgRtBascCdObj = $j('input:radio[name=exhgRtBascCd]:checked'); //환율기준
				var exhgRtPrimCdObj = $j('input:radio[name=exhgRtPrimCd]:checked'); //환율우대
				var exhgRtPrimObj = $j('input[name=exhgRtPrim]'); //환율우대
				var exhgRtPrim1Obj = $j('select[name=exhgRtPrim1]'); //[환율우대]해당있음 값
				var frcKindCdObj = $j('input:radio[name=frcKindCd]:checked'); //외화종류
				
				if (!jForm.add(new hana.JSelect('통화구분',formObj.curDvCd))
						.validate()) {
							return false;
				}

				if(0 === trscDvCdObj.length) { //거래구분

					opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: '오류',
						message: '거래구분을 선택하셔야 합니다.',
						callback: null
					});
					return false;
				} else {
					
					if('1' === trscDvCdObj.val()) { //[거래구분]외화를 사실때 (원화기준) 선택 시
						
						if (!jForm.add(new hana.JCurrency('거래금액',formObj.trscAmt2).rangeMoney(1,99999999999,'3'))
								.validate()) {
									return false;
						}
					} else {
						
						if (!jForm.add(new hana.JCurrency('거래금액',formObj.trscAmt1).rangeMoney(1,99999999999,'3'))
								.validate()) {
									return false;
						}
					}
				}
				
				if(0 === exhgRtBascCdObj.length) { //환율기준
				
					opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: '오류',
						message: '환율기준을 선택하셔야 합니다.',
						callback: null
					});
					return false;
				} else {
					
					if('1' === exhgRtBascCdObj.val()) { //[환율기준]직접입력 선택 시
						
						if (!jForm.add(new hana.JCurrency('환율기준 직접입력 값',formObj.exhgRtBasc).rangeMoney(1,99999999999,'3'))
								.validate()) {
									return false;
						}
						
						if (!jForm.add(new hana.JCurrency('환율기준 직접입력 값',formObj.exhgRtBascPoint).rangeMoney(0,99,'1'))
								.validate()) {
									return false;
						}
					}
				}
				
				if(0 === exhgRtPrimCdObj.length) { //환율우대
							   
					opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: '오류',
						message: '환율우대를 선택하셔야 합니다.',
						callback: null
					});
					return false;
				} else {
					
					if('1' === exhgRtPrimCdObj.val()) { //[환율우대]해당있음 선택 시
						
						if (!jForm.add(new hana.JNumber('환율우대 해당있음 값',formObj.exhgRtPrim1).range(5,100,'1'))
								.validate()) {
									return false;
						}
					}
				}
				
				if(0 === frcKindCdObj.length) { //외화종류
				
					opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: '오류',
						message: '외화종류를 선택하셔야 합니다.',
						callback: null
					});
					return false;
				} else {
					
					if('9' === frcKindCdObj.val()) { //[외화종류]
						
						if('USD/JPY/EUR/GBP/CAD/AUD/CHF'.indexOf(curDvCdObj.val()) < 0) {
							
							opb.common.layerpopup.openMessage_fnc({
								isConfirm: false,
								title: '오류',
								message: '여행자수표 조회시 미국,일본,유로화,영국,캐나다,호주,스위스,뉴질랜드만 가능합니다.',
								callback: null
							});
							return false;
						}
					}
				}
				
				if(0 < trscDvCdObj.length) { //거래구분
					
					if('1' === trscDvCdObj.val()) { //[거래구분]외화를 사실때 (원화기준) 선택 시
						
						trscAmtObj.val(trscAmt2Obj.val()); //[거래금액]원화
					} else {
						
						trscAmtObj.val(trscAmt1Obj.val()); //[거래금액]외화
					}
				}

				if(0 < exhgRtPrimCdObj.length) { //환율우대
					
					if('1' === exhgRtPrimCdObj.val()) { //[환율우대]해당있음 선택 시
						
						exhgRtPrimObj.val(exhgRtPrim1Obj.val()); //[환율우대]해당있음 값
					}
				}

				if(isDebugEnabled) {
					
					console.log($j('form').serialize());
				}
				
				$j('input[name=isTest]').val(isTest);

				var hanaAjax = new hana.JHanaAjax('', true, true);
				hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + subUrl + bankCa26, formObj, true, pbk.common.popup.calculator.frcMnexh.getResult, 'UTF-8');
			}, // submit -End
			
			/**
			 * 외화현찰환전 계산 결과
			 * pbk.common.popup.calculator.frcMnexh.getResult
			 */
			getResult : function(res, arg) {
				
				var data = eval('('+res.responseText+')');
				
				if(isDebugEnabled) {
					
					console.log(res.responseText);
					console.log(data);
				}
				
				if(data){
					
					if('success' === data.outHm.calcRslt) {

						var frcKindCdObj = $j('input:radio[name=frcKindCd]:checked'); //외화종류

						var curDvCd = data.inHm.curDvCd; //통화구분
						var trscDvCd = data.inHm.trscDvCd; //거래구분
						var trscAmt = data.inHm.trscAmt; //거래금액
						var exhgRtBascCd = data.inHm.exhgRtBascCd; //환율기준
						var exhgRtBasc = data.inHm.exhgRtBasc; //환율기준 금액
						var exhgRtBascPoint = data.inHm.exhgRtBascPoint; //환율기준 금액
						var exhgRtPrimCd = data.inHm.exhgRtPrimCd; //환율우대
						var exhgRtPrim = data.inHm.exhgRtPrim; //환율우대율
						var frcKindCd = data.inHm.frcKindCd; //외화종류

						var idx = 0;
						var regDt = data.outRec[idx].regDt; // X(8), 등록일자
						var curCd = data.outRec[idx].curCd; // X(3), 통화코드
						var cntyNm = data.outRec[idx].cntyNm; // X(20), 국가명
						var pbldSqn = data.outRec[idx].pbldSqn; // 9(5), 고시회차
						var dealBascRt = data.outRec[idx].dealBascRt; // R(16), 매매기준율
						var ttBuyRt = data.outRec[idx].ttBuyRt; // R(16), 전신환매입율
						var acmnBuyRt = data.outRec[idx].acmnBuyRt; // R(16), 현찰매입율
						var tcNegoRt = data.outRec[idx].tcNegoRt; // R(16), 여행자수표매입율
						var ttSllRt = data.outRec[idx].ttSllRt; // R(16), 전신환매도율
						var acmnSllRt = data.outRec[idx].acmnSllRt; // R(16), 현찰매도율
						var tcSllRt = data.outRec[idx].tcSllRt; // R(16), 여행자수표매도율
						var usdBascExhgRt = data.outRec[idx].usdBascExhgRt; // R(16), 미화기준환율
						var usdCvsRt = data.outRec[idx].usdCvsRt; // R(16), 미화환산율
						var excmsRt = data.outRec[idx].excmsRt; // R(12), 환가료율
						var acmnBuyMrgnRt = data.outRec[idx].acmnBuyMrgnRt; // R(16), 현찰매입마진율
						var acmnSllMrgnRt = data.outRec[idx].acmnSllMrgnRt; // R(16), 현찰매도마진율
						var curUnitVlu = data.outRec[idx].curUnitVlu; // 9(6), 통화단위값
						
//						var sExRate = data.clacHm.sExRate;
//						var dEXavg = data.clacHm.dEXavg;
//						var rate = data.clacHm.rate; //우대환율
						
						var calcRslt = data.outHm.calcRslt; //계산결과
						var today = data.outHm.today; //기준일
						var tMoney = data.outHm.tMoney; //외화(원화)금액
						var dfrcKrwAmt = data.outHm.dfrcKrwAmt; //원화차액
						var bfPrimExhgRt = data.outHm.bfPrimExhgRt; //우대받기 전 환율
						var afPrimExhgRt = data.outHm.afPrimExhgRt; //우대받은 후 환율
						var afPrimKrwAmt = data.outHm.afPrimKrwAmt; //우대받은 후 원화금액
						var afPrimFrcAmt = data.outHm.afPrimFrcAmt; //우대받은 후 외화금액
						var bfPrimFrcAmt = data.outHm.bfPrimFrcAmt; //우대받기 전 외화금액
						var afPrimBalKrwAmt = data.outHm.afPrimBalKrwAmt; //우대받은 후 남은 원화금액

						//외화를 사실때 (외화기준)
						$j('#rslt001').text(cntyNm); // X(20), 국가명
						$j('#rslt002').text(curCd); // X(3), 통화코드
						$j('#rslt003').text(curCd); // X(3), 통화코드
						$j('#rslt004').text(html.toMoney(tMoney)); //외화(원화)금액
						$j('#rslt005').text(html.toMoney(afPrimKrwAmt) + '원'); //우대받은 후 원화금액
						//$j('#rslt006').text(html.toDate(today)); //기준일
						$j('#rslt006').text(today); //기준일
						$j('#rslt007').text(cntyNm); //통화
						$j('#rslt008').text(curCd); //통화
						$j('#rslt009').text(curCd); //외화금액
						$j('#rslt010').text(html.toMoney(tMoney)); //외화(원화)금액
						$j('#rslt011').text('@' + html.toMoney(bfPrimExhgRt)); //우대받기 전 환율
						$j('#rslt012').text(exhgRtPrim + '%'); //환율우대율
						$j('#rslt013').text('@' + html.toMoney(afPrimExhgRt)); //우대받은 후 환율
						$j('#rslt014').text(html.toMoney(afPrimKrwAmt) + '원'); //우대받은 후 원화금액
						$j('#rslt015').text(html.toMoney(dfrcKrwAmt) + '원'); //원화차액
						$j('#rslt016').text(frcKindCdObj.next('label:first').html());
						
						//외화를 사실때 (원화기준)
						$j('#rslt101').text(html.toMoney(tMoney) + '원'); //외화(원화)금액
						$j('#rslt102').text(cntyNm); // X(20), 국가명
						$j('#rslt103').text(curCd); // X(3), 통화코드
						$j('#rslt104').text(curCd); // X(3), 통화코드
						$j('#rslt105').text(html.toMoney(afPrimFrcAmt)); //우대받기 전 외화금액
						$j('#rslt107').text(cntyNm); //통화
						$j('#rslt108').text(curCd); //통화
						$j('#rslt109').text(html.toMoney(tMoney) + '원'); //외화(원화)금액
						$j('#rslt110').text('@' + html.toMoney(bfPrimExhgRt)); //우대받기 전 환율
						$j('#rslt111').text(exhgRtPrim + '%'); //환율우대율
						$j('#rslt112').text('@' + html.toMoney(afPrimExhgRt)); //우대받은 후 환율
						$j('#rslt113').text(curCd); //외화금액
						$j('#rslt114').text(html.toMoney(bfPrimFrcAmt)); //우대받기 전 외화금액
						$j('#rslt115').text(curCd); //우대받은외화금액
						$j('#rslt116').text(html.toMoney(afPrimFrcAmt)); //우대받은 후 외화금액
						$j('#rslt117').text(html.toMoney(afPrimBalKrwAmt) + '원'); //우대받은 후 남은 원화금액
						$j('#rslt118').text(frcKindCdObj.next('label:first').html());
						
						//외화를 파실때
						$j('#rslt201').text(cntyNm); // X(20), 국가명
						$j('#rslt202').text(curCd); // X(3), 통화코드
						$j('#rslt203').text(curCd); // X(3), 통화코드
						$j('#rslt204').text(html.toMoney(tMoney)); //외화(원화)금액
						$j('#rslt205').text(html.toMoney(afPrimKrwAmt) + '원'); //우대받은 후 원화금액
						$j('#rslt207').text(cntyNm); //통화
						$j('#rslt208').text(curCd); //통화
						$j('#rslt209').text(curCd); //외화금액
						$j('#rslt210').text(html.toMoney(tMoney)); //외화(원화)금액
						$j('#rslt211').text('@' + html.toMoney(bfPrimExhgRt)); //우대받기 전 환율
						$j('#rslt212').text(exhgRtPrim + '%'); //환율우대율
						$j('#rslt213').text('@' + html.toMoney(afPrimExhgRt)); //우대받은 후 환율
						$j('#rslt214').text(html.toMoney(afPrimKrwAmt) + '원'); //우대받은 후 원화금액
						$j('#rslt215').text(html.toMoney(dfrcKrwAmt) + '원'); //원화차액
						$j('#rslt216').text(frcKindCdObj.next('label:first').html());
						
						pbk.common.popup.calculator.frcMnexh.change.view(trscDvCd); //외화현찰환전 화면 세팅

						$j("#scrContents").scrollTop($j("#scrContents").height() + $j("#calScr").height()); //스크롤 하단으로...
					}
				}
			} // getResult -End
		}, // frcMnexh -End
		
		/**
		 * 외화송금
		 * pbk.common.popup.calculator.frcRemt
		 */
		frcRemt : {
			
			/**
			 * 외화송금 초기화
			 * pbk.common.popup.calculator.frcRemt.init
			 */
			init : function() {
				
				pbk.common.popup.calculator.frcRemt.change.view(); //외화송금 화면 세팅
				
				pbk.common.popup.calculator.common.change.curDv2(); //공통 통화구분 선택
				pbk.common.popup.calculator.common.change.trscDv(); //공통 거래구분 선택
				pbk.common.popup.calculator.common.change.exhgRtBasc(); //공통 환율기준 선택
				pbk.common.popup.calculator.common.change.exhgRtPrim(); //공통 환율우대 선택
				
				pbk.common.popup.calculator.common.event.curDv2(); //공통 통화구분 이벤트
				pbk.common.popup.calculator.common.event.trscDv(); //공통 거래구분 이벤트
				pbk.common.popup.calculator.common.event.setTrscAmt(); //공통 거래금액 이벤트
				pbk.common.popup.calculator.common.event.exhgRtBasc(); //공통 환율기준 이벤트
				pbk.common.popup.calculator.common.event.exhgRtPrim(); //공통 환율우대 이벤트
			}, // init -End
			
			/**
			 * 외화송금 선택
			 * pbk.common.popup.calculator.frcRemt.change
			 */
			change : {
				
				/**
				 * 외화송금 화면 세팅
				 * pbk.common.popup.calculator.frcRemt.change.view
				 */
				view : function(num, num2) {

					if('0' === num){ //[거래구분]외화송금 보내실 때 (외화기준)
						
						$j('#rslt096').removeClass('none'); //계산결과 타이틀
						$j('#rslt097').removeClass('none'); //계산결과 요약
						$j('#rslt098').removeClass('none'); //기준일
						$j('#rslt099').removeClass('none'); //계산결과 상세
						$j('#rslt197').addClass('none'); //계산결과 요약
						$j('#rslt199').addClass('none'); //계산결과 상세
						$j('#rslt297').addClass('none'); //계산결과 요약
						$j('#rslt299').addClass('none'); //계산결과 상세
						
						if('0' === num2) { //[보낼곳]해외
							
							$j('#rslt399').removeClass('none');
							$j('#rslt499').removeClass('none');
							$j('#rslt599').addClass('none');
							$j('#rslt699').addClass('none');
						} else if('1' === num2) { //[보낼곳]국내
							
							$j('#rslt399').addClass('none');
							$j('#rslt499').addClass('none');
							$j('#rslt599').removeClass('none');
							$j('#rslt699').removeClass('none');
						} else {
							$j('#rslt399').addClass('none');
							$j('#rslt499').addClass('none');
							$j('#rslt599').addClass('none');
							$j('#rslt699').addClass('none');
						}
					} else if('1' === num){ //[거래구분]외화송금 보내실 때 (원화기준)
						
						$j('#rslt096').removeClass('none'); //계산결과 타이틀
						$j('#rslt097').addClass('none'); //계산결과 요약
						$j('#rslt098').removeClass('none'); //기준일
						$j('#rslt099').addClass('none'); //계산결과 상세
						$j('#rslt197').removeClass('none'); //계산결과 요약
						$j('#rslt199').removeClass('none'); //계산결과 상세
						$j('#rslt297').addClass('none'); //계산결과 요약
						$j('#rslt299').addClass('none'); //계산결과 상세
						
						if('0' === num2) { //[보낼곳]해외
							
							$j('#rslt399').removeClass('none');
							$j('#rslt499').removeClass('none');
							$j('#rslt599').addClass('none');
							$j('#rslt699').addClass('none');
						} else if('1' === num2) { //[보낼곳]국내
							
							$j('#rslt399').addClass('none');
							$j('#rslt499').addClass('none');
							$j('#rslt599').removeClass('none');
							$j('#rslt699').removeClass('none');
						} else {
							$j('#rslt399').addClass('none');
							$j('#rslt499').addClass('none');
							$j('#rslt599').addClass('none');
							$j('#rslt699').addClass('none');
						}
					} else if('2' === num){ //[거래구분]외화송금 받으실 때
						
						$j('#rslt096').removeClass('none'); //계산결과 타이틀
						$j('#rslt097').addClass('none'); //계산결과 요약
						$j('#rslt098').removeClass('none'); //기준일
						$j('#rslt099').addClass('none'); //계산결과 상세
						$j('#rslt197').addClass('none'); //계산결과 요약
						$j('#rslt199').addClass('none'); //계산결과 상세
						$j('#rslt297').removeClass('none'); //계산결과 요약
						$j('#rslt299').removeClass('none'); //계산결과 상세
						$j('#rslt399').addClass('none');
						$j('#rslt499').addClass('none');
						$j('#rslt599').addClass('none');
						$j('#rslt699').addClass('none');
					} else {
						
						$j('#rslt096').addClass('none'); //계산결과 타이틀
						$j('#rslt097').addClass('none'); //계산결과 요약
						$j('#rslt098').addClass('none'); //기준일
						$j('#rslt099').addClass('none'); //계산결과 상세
						$j('#rslt197').addClass('none'); //계산결과 요약
						$j('#rslt199').addClass('none'); //계산결과 상세
						$j('#rslt297').addClass('none'); //계산결과 요약
						$j('#rslt299').addClass('none'); //계산결과 상세
						$j('#rslt399').addClass('none');
						$j('#rslt499').addClass('none');
						$j('#rslt599').addClass('none');
						$j('#rslt699').addClass('none');
					}
				} // view -End
			}, // change -End
		
			/**
			 * 외화송금 계산 요청
			 * pbk.common.popup.calculator.frcRemt.submit
			 */
			submit : function(formObj) {
				
				var jForm = new hana.JForm(formObj);
				
				pbk.common.popup.calculator.frcRemt.change.view(); //외화송금 화면 세팅
				
				var trscDvCdObj = $j('input:radio[name=trscDvCd]:checked'); //거래구분
				var trscAmtObj = $j('input[name=trscAmt]'); //거래금액
				var trscAmt1Obj = $j('input[name=trscAmt1]'); //[거래금액]외화
				var trscAmt2Obj = $j('input[name=trscAmt2]'); //[거래금액]원화
				var exhgRtBascCdObj = $j('input:radio[name=exhgRtBascCd]:checked'); //환율기준
				var exhgRtPrimCdObj = $j('input:radio[name=exhgRtPrimCd]:checked'); //환율우대
				var exhgRtPrimObj = $j('input[name=exhgRtPrim]'); //환율우대
				var exhgRtPrim1Obj = $j('select[name=exhgRtPrim1]'); //[환율우대]해당있음 값
				var trmsPlceObj = $j('input:radio[name=trmsPlce]:checked'); //보낼곳

				if (!jForm.add(new hana.JSelect('통화구분',formObj.curDvCd))
						.validate()) {
							return false;
				}

				if(0 === trscDvCdObj.length) { //거래구분

					opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: '오류',
						message: '거래구분을 선택하셔야 합니다.',
						callback: null
					});
					return false;
				} else {
					
					if('1' === trscDvCdObj.val()) { //[거래구분]외화송금 보내실 때 (원화기준) 선택 시
						
						if (!jForm.add(new hana.JCurrency('거래금액',formObj.trscAmt2).rangeMoney(1,99999999999,'3'))
								.validate()) {
									return false;
						}
					} else {
						
						if (!jForm.add(new hana.JCurrency('거래금액',formObj.trscAmt1).rangeMoney(1,99999999999,'3'))
								.validate()) {
									return false;
						}
					}
				}
				
				if(0 === exhgRtBascCdObj.length) { //환율기준
				
					opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: '오류',
						message: '환율기준을 선택하셔야 합니다.',
						callback: null
					});
					return false;
				} else {
					
					if('1' === exhgRtBascCdObj.val()) { //[환율기준]직접입력 선택 시
						
						if (!jForm.add(new hana.JCurrency('환율기준 직접입력 값',formObj.exhgRtBasc).rangeMoney(1,99999999999,'3'))
								.validate()) {
									return false;
						}
						
						if (!jForm.add(new hana.JCurrency('환율기준 직접입력 값',formObj.exhgRtBascPoint).rangeMoney(0,99,'1'))
								.validate()) {
									return false;
						}
					}
				}
				
				if(0 === exhgRtPrimCdObj.length) { //환율우대
							   
					opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: '오류',
						message: '환율우대를 선택하셔야 합니다.',
						callback: null
					});
					return false;
				} else {
					
					if('1' === exhgRtPrimCdObj.val()) { //[환율우대]해당있음 선택 시
						
						if (!jForm.add(new hana.JNumber('환율우대 해당있음 값',formObj.exhgRtPrim1).range(5,100,'1'))
								.validate()) {
									return false;
						}
					}
				}
				
				if(0 === trmsPlceObj.length) { //보낼곳
					
					opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: '오류',
						message: '보낼곳을 선택하셔야 합니다.',
						callback: null
					});
					return false;
				}
				
				if(0 < trscDvCdObj.length) { //거래구분
					
					if('1' === trscDvCdObj.val()) { //[거래구분]외화송금 보내실 때 (원화기준) 선택 시
						
						trscAmtObj.val(trscAmt2Obj.val()); //[거래금액]원화
					} else {
						
						trscAmtObj.val(trscAmt1Obj.val()); //[거래금액]외화
					}
				}

				if(0 < exhgRtPrimCdObj.length) { //환율우대
					
					if('1' === exhgRtPrimCdObj.val()) { //[환율우대]해당있음 선택 시
						
						exhgRtPrimObj.val(exhgRtPrim1Obj.val()); //[환율우대]해당있음 값
					}
				}
				
				if(isDebugEnabled) {
					
					console.log($j('form').serialize());
				}
				
				$j('input[name=isTest]').val(isTest);

				var hanaAjax = new hana.JHanaAjax('', true, true);
				hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + subUrl + bankCa27, formObj, true, pbk.common.popup.calculator.frcRemt.getResult, 'UTF-8');
			}, // submit -End
			
			/**
			 * 외화송금 계산 결과
			 * pbk.common.popup.calculator.frcRemt.getResult
			 */
			getResult : function(res, arg) {
				
				var data = eval('('+res.responseText+')');
				
				if(isDebugEnabled) {
					
					console.log(res.responseText);
					console.log(data);
				}
				
				if(data){
					
					if('success' === data.outHm.calcRslt) {
						
						var curDvCd = data.inHm.curDvCd; //통화구분
						var trscDvCd = data.inHm.trscDvCd; //거래구분
						var trscAmt = data.inHm.trscAmt; //거래금액
						var exhgRtBascCd = data.inHm.exhgRtBascCd; //환율기준
						var exhgRtBasc = data.inHm.exhgRtBasc; //환율기준 금액
						var exhgRtBascPoint = data.inHm.exhgRtBascPoint; //환율기준 금액
						var exhgRtPrimCd = data.inHm.exhgRtPrimCd; //환율우대
						var exhgRtPrim = data.inHm.exhgRtPrim; //환율우대율
						var trmsPlce = data.inHm.trmsPlce; //보낼곳
						
						var idx = 0;
						var regDt = data.outRec[idx].regDt; // X(8), 등록일자
						var curCd = data.outRec[idx].curCd; // X(3), 통화코드
						var cntyNm = data.outRec[idx].cntyNm; // X(20), 국가명
						var pbldSqn = data.outRec[idx].pbldSqn; // 9(5), 고시회차
						var dealBascRt = data.outRec[idx].dealBascRt; // R(16), 매매기준율
						var ttBuyRt = data.outRec[idx].ttBuyRt; // R(16), 전신환매입율
						var acmnBuyRt = data.outRec[idx].acmnBuyRt; // R(16), 현찰매입율
						var tcNegoRt = data.outRec[idx].tcNegoRt; // R(16), 여행자수표매입율
						var ttSllRt = data.outRec[idx].ttSllRt; // R(16), 전신환매도율
						var acmnSllRt = data.outRec[idx].acmnSllRt; // R(16), 현찰매도율
						var tcSllRt = data.outRec[idx].tcSllRt; // R(16), 여행자수표매도율
						var usdBascExhgRt = data.outRec[idx].usdBascExhgRt; // R(16), 미화기준환율
						var usdCvsRt = data.outRec[idx].usdCvsRt; // R(16), 미화환산율
						var excmsRt = data.outRec[idx].excmsRt; // R(12), 환가료율
						var acmnBuyMrgnRt = data.outRec[idx].acmnBuyMrgnRt; // R(16), 현찰매입마진율
						var acmnSllMrgnRt = data.outRec[idx].acmnSllMrgnRt; // R(16), 현찰매도마진율
						var curUnitVlu = data.outRec[idx].curUnitVlu; // 9(6), 통화단위값
						
//	    				var dPre2 = data.clacHm.dPre2;
//	    				var dCurr = data.clacHm.dCurr;
//	    				var tmpsmny = data.clacHm.tmpsmny;
//	    				var tmpsmny2 = data.clacHm.tmpsmny2;
//	    				var lSend = data.clacHm.lSend;
//	    				var mrgnKrwAmtItntDmst = data.clacHm.mrgnKrwAmtItntDmst; //필요원화금액인터넷뱅킹국내
//	    				var mrgnKrwAmtItntOvls = data.clacHm.mrgnKrwAmtItntOvls; //필요원화금액인터넷뱅킹해외
//	    				var mrgnKrwAmtBussOvls = data.clacHm.mrgnKrwAmtBussOvls; //필요원화금액영업점해외
//	    				var mrgnKrwAmtBussDmst = data.clacHm.mrgnKrwAmtBussDmst; //필요원화금액영업점국내
//	    				var commItntDmst = data.clacHm.commItntDmst; //수수료인터넷뱅킹국내
//	    				var commItntOvls = data.clacHm.commItntOvls; //수수료인터넷뱅킹해외
//	    				var sBranch11 = data.clacHm.sBranch11;
//	    				var usexchpay = data.clacHm.usexchpay;
//	    				var dblCUR2 = data.clacHm.dblCUR2;

						var calcRslt = data.outHm.calcRslt; //계산결과
						var today = data.outHm.today; //기준일
						var tMoney = data.outHm.tMoney; //거래금액
	    				var afPrimMrgnKrwAmt = data.outHm.afPrimMrgnKrwAmt; //우대받은 후 총 원화금액
	    				var bfPrimMrgnKrwAmt = data.outHm.bfPrimMrgnKrwAmt; //우대받기 전 총 원화금액
//						var prtrExhgRt = data.outHm.prtrExhgRt; //우대받은환율
						var afPrimKrwAmt = data.outHm.afPrimKrwAmt; //우대받은 후 원화금액
						var bfPrimKrwAmt = data.outHm.bfPrimKrwAmt; //우대받기 전 원화금액
						var afPrimExhgRt = data.outHm.afPrimExhgRt; //우대받은 후 환율
						var bfPrimExhgRt = data.outHm.bfPrimExhgRt; //우대받기 전 환율
						var afPrimComm = data.outHm.afPrimComm; //우대받은 후 수수료
						var bfPrimComm = data.outHm.bfPrimComm; //우대받기 전 수수료
//						var balKrwAmt = data.outHm.balKrwAmt; //남은원화금액
//						var balKrwAmtV = data.outHm.balKrwAmtV; //남은원화금액
//						var frcAmt = data.outHm.frcAmt; //외화금액
						var bfPrimFrcAmt = data.outHm.bfPrimFrcAmt; //우대받기 전 외화금액
						var afPrimFrcAmt = data.outHm.afPrimFrcAmt; //우대받은 후 외화금액
						var afDfrcKrwAmt = data.outHm.afDfrcKrwAmt; //우대받은 후 원화차액
						var bfDfrcKrwAmt = data.outHm.bfDfrcKrwAmt; //우대받기 전 원화차액
						var dfrcKrwAmt = data.outHm.dfrcKrwAmt; //원화차액
//						var prtrKrwAmt = data.outHm.prtrKrwAmt; //우대받은원화금액
						var afPrimBalKrwAmt = data.outHm.afPrimBalKrwAmt; //우대받은 후 남은 원화금액
						var bfPrimBalKrwAmt = data.outHm.bfPrimBalKrwAmt; //우대받기 전 남은 원화금액

						$j('#rslt001').text(cntyNm); // X(20), 국가명
						$j('#rslt002').text(curCd); // X(3), 통화코드
						$j('#rslt003').text(html.toMoney(tMoney)); //외화
						$j('#rslt004').text(curCd); // X(3), 통화코드
						$j('#rslt005').text(html.toMoney(afPrimMrgnKrwAmt) + '원'); //원화
						//$j('#rslt006').text(html.toDate(today)); //기준일
						$j('#rslt006').text(today); //기준일
						$j('#rslt007').text(cntyNm); //인터넷뱅킹 거래 시 - 통화 iCurrIndex
						$j('#rslt008').text(curCd); //인터넷뱅킹 거래 시 - 통화
						$j('#rslt009').text(cntyNm); //영업점 거래 시 - 통화  iCurrIndex
						$j('#rslt010').text(curCd); //영업점 거래 시 - 통화
						$j('#rslt011').text(curCd); //인터넷뱅킹 거래 시 - 해외거래금액
						$j('#rslt012').text(html.toMoney(tMoney)); //인터넷뱅킹 거래 시 - 해외거래금액 userMoney
						$j('#rslt013').text(curCd); //영업점 거래 시 - 해외거래금액
						$j('#rslt014').text(html.toMoney(tMoney)); //영업점 거래 시 - 해외거래금액 userMoney
						$j('#rslt015').text('@' + html.toMoney(afPrimExhgRt)); //인터넷뱅킹 거래 시 - 적용환율 dblCUR
						$j('#rslt016').text('@' + html.toMoney(bfPrimExhgRt)); //영업점 거래 시 - 적용환율 dblCUR
						$j('#rslt017').text(exhgRtPrim + '%'); //인터넷뱅킹 거래 시 - 환율우대율 sPre
						$j('#rslt018').text('0%'); //영업점 거래 시 - 환율우대율
						$j('#rslt019').text(html.toMoney(afPrimMrgnKrwAmt) + '원'); //인터넷뱅킹 거래 시 - 필요한원화금액(C=A+B) sInter2 sInternet2
						$j('#rslt020').text(html.toMoney(bfPrimMrgnKrwAmt) + '원'); //영업점 거래 시 - 필요한원화금액(C=A+B) totYong1 totYong2
						$j('#rslt021').text(html.toMoney(afPrimComm) + '원'); //인터넷뱅킹 거래 시 - 수수료(전신료 포함)(A) sInter sInternet
						$j('#rslt022').text(html.toMoney(bfPrimComm) + '원'); //영업점 거래 시 - 수수료(전신료 포함)(A) sBranch
						$j('#rslt023').text(html.toMoney(afPrimKrwAmt) + '원'); //인터넷뱅킹 거래 시 - 원화금액(B) nInter2 - nInter nInternet2 - nInternet total strTotal nTotYong1 - nBranch nTotYong2 - nBranch total strTotal
						$j('#rslt024').text(html.toMoney(bfPrimKrwAmt) + '원'); //영업점 거래 시 - 원화금액(B) strTotal
						$j('#rslt025').text(html.toMoney(dfrcKrwAmt) + '원'); //인터넷뱅킹 거래 시 - 환율우대받은금액 stmpsmny3
						$j('#rslt026').text('0원'); //영업점 거래 시 - 환율우대받은금액

						$j('#rslt101').text(html.toMoney(tMoney) + '원'); //원화 userMoney
						$j('#rslt102').text(cntyNm); // X(20), 국가명
						$j('#rslt103').text(curCd); // X(3), 통화코드
						$j('#rslt104').text(html.toMoney(afPrimFrcAmt)); //외화 lSend2
						$j('#rslt105').text(curCd); // X(3), 통화코드
						$j('#rslt107').text(cntyNm); //인터넷뱅킹 거래 시 - 통화
						$j('#rslt108').text(curCd); //인터넷뱅킹 거래 시 - 통화
						$j('#rslt109').text(cntyNm); //영업점 거래 시 - 통화
						$j('#rslt110').text(curCd); //영업점 거래 시 - 통화
						$j('#rslt111').text(html.toMoney(tMoney) + '원'); //인터넷뱅킹 거래 시 - 해외거래금액 sMoney
						$j('#rslt112').text(html.toMoney(tMoney) + '원'); //인터넷뱅킹 거래 시 - 해외거래금액 sMoney
						$j('#rslt113').text('@' + html.toMoney(afPrimExhgRt)); //인터넷뱅킹 거래 시 - 적용환율 dblCUR3
						$j('#rslt114').text('@' + html.toMoney(bfPrimExhgRt)); //영업점 거래 시 - 적용환율 dblCUR
						$j('#rslt115').text(exhgRtPrim + '%'); //인터넷뱅킹 거래 시 - 환율우대율 special
						$j('#rslt116').text('0%'); //영업점 거래 시 - 환율우대율
						$j('#rslt117').text(curCd); //인터넷뱅킹 거래 시 - 외화금액
						$j('#rslt118').text(html.toMoney(afPrimFrcAmt)); //영업점 거래 시 - 외화금액 lSend2
						$j('#rslt119').text(curCd); //인터넷뱅킹 거래 시 - 외화금액
						$j('#rslt120').text(html.toMoney(bfPrimFrcAmt)); //영업점 거래 시 - 외화금액 lSend2
						$j('#rslt121').text(html.toMoney(afPrimComm) + '원'); //인터넷뱅킹 거래 시 - 수수료 sServiceCharge
						$j('#rslt122').text(html.toMoney(bfPrimComm) + '원'); //영업점 거래 시 - 수수료 sVisitServiceCharge
						$j('#rslt123').text(html.toMoney(dfrcKrwAmt) + '원'); //인터넷뱅킹 거래 시 - 환율우대받은금액 dblCUR4
						$j('#rslt124').text('0원'); //영업점 거래 시 - 환율우대받은금액
						$j('#rslt125').text(html.toMoney(afPrimBalKrwAmt) + '원'); //인터넷뱅킹 거래 시 - 남은원화금액 lNmj2
						$j('#rslt126').text(html.toMoney(bfPrimBalKrwAmt) + '원'); //영업점 거래 시 - 남은원화금액 lNmj
						
						$j('#rslt201').text(cntyNm); // X(20), 국가명
						$j('#rslt202').text(curCd); // X(3), 통화코드
						$j('#rslt203').text(html.toMoney(tMoney)); //외화
						$j('#rslt204').text(curCd); // X(3), 통화코드
						$j('#rslt205').text(html.toMoney(afPrimKrwAmt) + '원'); //원화
						$j('#rslt207').text(cntyNm); //통화
						$j('#rslt208').text(curCd); //통화
						$j('#rslt209').text(curCd); //외화금액
						$j('#rslt210').text(html.toMoney(tMoney)); //외화금액 userMoney
						$j('#rslt211').text('@' + html.toMoney(afPrimExhgRt)); //적용환율 sCur
						$j('#rslt212').text(exhgRtPrim + '%'); //환율우대율 special
						$j('#rslt213').text(html.toMoney(afPrimComm) + '원'); //수수료 sMoney
						$j('#rslt214').text(html.toMoney(afPrimKrwAmt) + '원'); //원화금액 tmpsmny
						$j('#rslt215').text(html.toMoney(dfrcKrwAmt) + '원'); //우대받은금액 dPretotal
						
						pbk.common.popup.calculator.frcRemt.change.view(trscDvCd, trmsPlce); //외화송금 화면 세팅
						
						$j("#scrContents").scrollTop($j("#scrContents").height() + $j("#calScr").height() - 520); //스크롤 하단으로...
					}
				}
			} // getResult -End
		}, // frcRemt -End
		
		/**
		 * 외환매매
		 * pbk.common.popup.calculator.frcDeal
		 */
		frcDeal : {

			/**
			 * 외환매매 초기화
			 * pbk.common.popup.calculator.frcDeal.init
			 */
			init : function() {
				
				pbk.common.popup.calculator.frcDeal.change.view(); //외환매매 화면 세팅
				
				pbk.common.popup.calculator.common.change.curDv(); //공통 통화구분 선택
				pbk.common.popup.calculator.common.change.trscDv(); //공통 거래구분 선택
				pbk.common.popup.calculator.common.change.exhgRtBasc(); //공통 환율기준 선택
				pbk.common.popup.calculator.common.change.exhgRtPrim(); //공통 환율우대 선택
				
				pbk.common.popup.calculator.common.event.curDv(); //공통 통화구분 이벤트
				pbk.common.popup.calculator.common.event.trscDv(); //공통 거래구분 이벤트
				pbk.common.popup.calculator.common.event.setTrscAmt(); //공통 거래금액 이벤트
				pbk.common.popup.calculator.common.event.exhgRtBasc(); //공통 환율기준 이벤트
				pbk.common.popup.calculator.common.event.exhgRtPrim(); //공통 환율우대 이벤트
			}, // init -End
			
			/**
			 * 외환매매 선택
			 * pbk.common.popup.calculator.frcDeal.change
			 */
			change : {
				
				/**
				 * 외환매매 화면 세팅
				 * pbk.common.popup.calculator.frcDeal.change.view
				 */
				view : function(num) {

					if('0' === num){ //[거래구분]외화를 사실 때 (외화기준)
						
						$j('#rslt096').removeClass('none'); //계산결과 타이틀
						$j('#rslt097').removeClass('none'); //계산결과 요약
						$j('#rslt098').removeClass('none'); //기준일
						$j('#rslt099').removeClass('none'); //계산결과 상세
						$j('#rslt197').addClass('none'); //계산결과 요약
						$j('#rslt199').addClass('none'); //계산결과 상세
						$j('#rslt297').addClass('none'); //계산결과 요약
						$j('#rslt299').addClass('none'); //계산결과 상세
						$j('#rslt397').addClass('none'); //계산결과 요약
						$j('#rslt399').addClass('none'); //계산결과 상세
					} else if('1' === num){ //[거래구분]외화를 사실 때 (원화기준)
						
						$j('#rslt096').removeClass('none'); //계산결과 타이틀
						$j('#rslt097').addClass('none'); //계산결과 요약
						$j('#rslt098').removeClass('none'); //기준일
						$j('#rslt099').addClass('none'); //계산결과 상세
						$j('#rslt197').removeClass('none'); //계산결과 요약
						$j('#rslt199').removeClass('none'); //계산결과 상세
						$j('#rslt297').addClass('none'); //계산결과 요약
						$j('#rslt299').addClass('none'); //계산결과 상세
						$j('#rslt397').addClass('none'); //계산결과 요약
						$j('#rslt399').addClass('none'); //계산결과 상세
					} else if('2' === num){ //[거래구분]외화를 파실 때 (외화기준)
						
						$j('#rslt096').removeClass('none'); //계산결과 타이틀
						$j('#rslt097').addClass('none'); //계산결과 요약
						$j('#rslt098').removeClass('none'); //기준일
						$j('#rslt099').addClass('none'); //계산결과 상세
						$j('#rslt197').addClass('none'); //계산결과 요약
						$j('#rslt199').addClass('none'); //계산결과 상세
						$j('#rslt297').removeClass('none'); //계산결과 요약
						$j('#rslt299').removeClass('none'); //계산결과 상세
						$j('#rslt397').addClass('none'); //계산결과 요약
						$j('#rslt399').addClass('none'); //계산결과 상세
					} else if('3' === num){ //[거래구분]외화를 파실 때 (원화기준)
						
						$j('#rslt096').removeClass('none'); //계산결과 타이틀
						$j('#rslt097').addClass('none'); //계산결과 요약
						$j('#rslt098').removeClass('none'); //기준일
						$j('#rslt099').addClass('none'); //계산결과 상세
						$j('#rslt197').addClass('none'); //계산결과 요약
						$j('#rslt199').addClass('none'); //계산결과 상세
						$j('#rslt297').addClass('none'); //계산결과 요약
						$j('#rslt299').addClass('none'); //계산결과 상세
						$j('#rslt397').removeClass('none'); //계산결과 요약
						$j('#rslt399').removeClass('none'); //계산결과 상세
					} else {
						
						$j('#rslt096').addClass('none'); //계산결과 타이틀
						$j('#rslt097').addClass('none'); //계산결과 요약
						$j('#rslt098').addClass('none'); //기준일
						$j('#rslt099').addClass('none'); //계산결과 상세
						$j('#rslt197').addClass('none'); //계산결과 요약
						$j('#rslt199').addClass('none'); //계산결과 상세
						$j('#rslt297').addClass('none'); //계산결과 요약
						$j('#rslt299').addClass('none'); //계산결과 상세
						$j('#rslt397').addClass('none'); //계산결과 요약
						$j('#rslt399').addClass('none'); //계산결과 상세
					}
				} // view -End
			}, // change -End
		
			/**
			 * 외환매매 계산 요청
			 * pbk.common.popup.calculator.frcDeal.submit
			 */
			submit : function(formObj) {
				
				var jForm = new hana.JForm(formObj);
				
				pbk.common.popup.calculator.frcDeal.change.view(); //외환매매 화면 세팅
				
				var trscDvCdObj = $j('input:radio[name=trscDvCd]:checked'); //거래구분
				var trscAmtObj = $j('input[name=trscAmt]'); //거래금액
				var trscAmt1Obj = $j('input[name=trscAmt1]'); //[거래금액]외화
				var trscAmt2Obj = $j('input[name=trscAmt2]'); //[거래금액]원화
				var exhgRtBascCdObj = $j('input:radio[name=exhgRtBascCd]:checked'); //환율기준
				var exhgRtPrimCdObj = $j('input:radio[name=exhgRtPrimCd]:checked'); //환율우대
				var exhgRtPrimObj = $j('input[name=exhgRtPrim]'); //환율우대
				var exhgRtPrim1Obj = $j('select[name=exhgRtPrim1]'); //[환율우대]해당있음 값

				if (!jForm.add(new hana.JSelect('통화구분',formObj.curDvCd))
						.validate()) {
							return false;
				}

				if(0 === trscDvCdObj.length) { //거래구분

					opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: '오류',
						message: '거래구분을 선택하셔야 합니다.',
						callback: null
					});
					return false;
				} else {
					
					if('1' === trscDvCdObj.val() || '3' === trscDvCdObj.val()) { //[거래구분]외화를 사실 때 (원화기준), 외화를 파실 때 (원화기준) 선택 시
						
						if (!jForm.add(new hana.JCurrency('거래금액',formObj.trscAmt2).rangeMoney(1,99999999999,'3'))
								.validate()) {
									return false;
						}
					} else {
						
						if (!jForm.add(new hana.JCurrency('거래금액',formObj.trscAmt1).rangeMoney(1,99999999999,'3'))
								.validate()) {
									return false;
						}
					}
				}
				
				if(0 === exhgRtBascCdObj.length) { //환율기준
				
					opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: '오류',
						message: '환율기준을 선택하셔야 합니다.',
						callback: null
					});
					return false;
				} else {
					
					if('1' === exhgRtBascCdObj.val()) { //[환율기준]직접입력 선택 시
						
						if (!jForm.add(new hana.JCurrency('환율기준 직접입력 값',formObj.exhgRtBasc).rangeMoney(1,99999999999,'3'))
								.validate()) {
									return false;
						}
						
						if (!jForm.add(new hana.JCurrency('환율기준 직접입력 값',formObj.exhgRtBascPoint).rangeMoney(0,99,'1'))
								.validate()) {
									return false;
						}
					}
				}
				
				if(0 === exhgRtPrimCdObj.length) { //환율우대
							   
					opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: '오류',
						message: '환율우대를 선택하셔야 합니다.',
						callback: null
					});
					return false;
				} else {
					
					if('1' === exhgRtPrimCdObj.val()) { //[환율우대]해당있음 선택 시
						
						if (!jForm.add(new hana.JNumber('환율우대 해당있음 값',formObj.exhgRtPrim1).range(5,100,'1'))
								.validate()) {
									return false;
						}
					}
				}
				
				if(0 < trscDvCdObj.length) { //거래구분
					
					if('1' === trscDvCdObj.val() || '3' === trscDvCdObj.val()) { //[거래구분]외화송금 보내실 때 (원화기준) 선택 시
						
						trscAmtObj.val(trscAmt2Obj.val()); //[거래금액]원화
					} else {
						
						trscAmtObj.val(trscAmt1Obj.val()); //[거래금액]외화
					}
				}

				if(0 < exhgRtPrimCdObj.length) { //환율우대
					
					if('1' === exhgRtPrimCdObj.val()) { //[환율우대]해당있음 선택 시
						
						exhgRtPrimObj.val(exhgRtPrim1Obj.val()); //[환율우대]해당있음 값
					}
				}
				
				if(isDebugEnabled) {
					
					console.log($j('form').serialize());
				}
				
				$j('input[name=isTest]').val(isTest);

				var hanaAjax = new hana.JHanaAjax('', true, true);
				hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + subUrl + bankCa28, formObj, true, pbk.common.popup.calculator.frcDeal.getResult, 'UTF-8');
			}, // submit -End
			
			/**
			 * 외환매매 계산 결과
			 * pbk.common.popup.calculator.frcDeal.getResult
			 */
			getResult : function(res, arg) {
				
				var data = eval('('+res.responseText+')');
				
				if(isDebugEnabled) {
					
					console.log(res.responseText);
					console.log(data);
				}
				
				if(data){
					
					//if('success' === data.outHm.calcRslt) {

						var curDvCd = data.inHm.curDvCd; //통화구분
						var trscDvCd = data.inHm.trscDvCd; //거래구분
						var trscAmt = data.inHm.trscAmt; //거래금액
						var exhgRtBascCd = data.inHm.exhgRtBascCd; //환율기준
						var exhgRtBasc = data.inHm.exhgRtBasc; //환율기준 금액
						var exhgRtBascPoint = data.inHm.exhgRtBascPoint; //환율기준 금액
						var exhgRtPrimCd = data.inHm.exhgRtPrimCd; //환율우대
						var exhgRtPrim = data.inHm.exhgRtPrim; //환율우대율

						var idx = 0;
						var regDt = data.outRec[idx].regDt; // X(8), 등록일자
						var curCd = data.outRec[idx].curCd; // X(3), 통화코드
						var cntyNm = data.outRec[idx].cntyNm; // X(20), 국가명
						var pbldSqn = data.outRec[idx].pbldSqn; // 9(5), 고시회차
						var dealBascRt = data.outRec[idx].dealBascRt; // R(16), 매매기준율
						var ttBuyRt = data.outRec[idx].ttBuyRt; // R(16), 전신환매입율
						var acmnBuyRt = data.outRec[idx].acmnBuyRt; // R(16), 현찰매입율
						var tcNegoRt = data.outRec[idx].tcNegoRt; // R(16), 여행자수표매입율
						var ttSllRt = data.outRec[idx].ttSllRt; // R(16), 전신환매도율
						var acmnSllRt = data.outRec[idx].acmnSllRt; // R(16), 현찰매도율
						var tcSllRt = data.outRec[idx].tcSllRt; // R(16), 여행자수표매도율
						var usdBascExhgRt = data.outRec[idx].usdBascExhgRt; // R(16), 미화기준환율
						var usdCvsRt = data.outRec[idx].usdCvsRt; // R(16), 미화환산율
						var excmsRt = data.outRec[idx].excmsRt; // R(12), 환가료율
						var acmnBuyMrgnRt = data.outRec[idx].acmnBuyMrgnRt; // R(16), 현찰매입마진율
						var acmnSllMrgnRt = data.outRec[idx].acmnSllMrgnRt; // R(16), 현찰매도마진율
						var curUnitVlu = data.outRec[idx].curUnitVlu; // 9(6), 통화단위값
						
						var sExRate = data.clacHm.sExRate;
//						var dCurr = data.clacHm.dCurr;
//						var dPre = data.clacHm.dPre;
//						var tmpsmny = data.clacHm.tmpsmny;
//						var dblCUR2 = data.clacHm.dblCUR2;
//						var dblCUR3 = data.clacHm.dblCUR3;
//						var usexchpay = data.clacHm.usexchpay;
//						var sInternet = data.clacHm.sInternet;
//						var sInternet2 = data.clacHm.sInternet2;
//						var sInter = data.clacHm.sInter;
//						var sInter2 = data.clacHm.sInter2;

						var calcRslt = data.outHm.calcRslt; //계산결과
						var today = data.outHm.today; //기준일
						var tMoney = data.outHm.tMoney; //거래금액
						
						var afPrimExhgRt = data.outHm.afPrimExhgRt; //우대받은 후 환율
						var bfPrimExhgRt = data.outHm.bfPrimExhgRt; //우대받기 전 환율
						var afPrimBalKrwAmt = data.outHm.afPrimBalKrwAmt; //우대받은 후 남은 원화금액
						var bfPrimBalKrwAmt = data.outHm.bfPrimBalKrwAmt; //우대받기 전 남은 원화금액
						var afPrimKrwAmt = data.outHm.afPrimKrwAmt; //우대받은 후 원화금액
						var bfPrimKrwAmt = data.outHm.bfPrimKrwAmt; //우대받기 전 원화금액
						var dfrcKrwAmt = data.outHm.dfrcKrwAmt; //원화차액
						var bfPrimFrcAmt = data.outHm.bfPrimFrcAmt; //우대받기 전 외화금액
						var afPrimFrcAmt = data.outHm.afPrimFrcAmt; //우대받은 후 외화금액
						var dfrcFrcAmt = data.outHm.dfrcFrcAmt; //외화차액
						
						var wdrwKrwAmt = data.outHm.wdrwKrwAmt; //출금원화금액
//						var exhgRt2 = data.outHm.exhgRt2; //우대받기 전 환율
//						var exhgRt = data.outHm.exhgRt; //우대적용 된 환율(적용환율)
						var prtrKrwAmt = data.outHm.prtrKrwAmt; //우대받은원화금액
						var wdrwFrcAmt = data.outHm.wdrwFrcAmt; //입금외화금액
						var prtrFrcAmt = data.outHm.prtrFrcAmt; //우대받은외화금액
//						var balKrwAmt = data.outHm.balKrwAmt; //남은원화금액
						var rcvKrwAmt = data.outHm.rcvKrwAmt; //입금원화금액
						
						//외화를 사실 때 (외화기준)
						$j('#rslt001').text(cntyNm); // X(20), 국가명
						$j('#rslt002').text(curCd); // X(3), 통화코드
						$j('#rslt003').text(html.toMoney(tMoney)); //외화
						$j('#rslt004').text(curCd); // X(3), 통화코드
						$j('#rslt005').text(html.toMoney(afPrimKrwAmt) + '원'); //출금원화금액
						//$j('#rslt006').text(html.toDate(today)); //기준일
						$j('#rslt006').text(today); //기준일
						$j('#rslt007').text(cntyNm); //통화
						$j('#rslt008').text(curCd); //통화
						$j('#rslt009').text(curCd); //입금외화금액
						$j('#rslt010').text(html.toMoney(tMoney)); //입금외화금액
						$j('#rslt015').text('@' + html.toMoney(bfPrimExhgRt)); //우대받기 전 환율
						$j('#rslt012').text(exhgRtPrim + '%'); //환율우대율
						$j('#rslt011').text('@' + html.toMoney(afPrimExhgRt)); //우대적용 된 환율(적용환율)
						$j('#rslt013').text(html.toMoney(afPrimKrwAmt) + '원'); //출금원화금액
						$j('#rslt014').text(html.toMoney(dfrcKrwAmt) + '원'); //우대받은원화금액
						
						//외화를 사실 때 (원화기준)
						$j('#rslt101').text(html.toMoney(tMoney) + '원'); //출금원화금액
						$j('#rslt102').text(cntyNm); // X(20), 국가명
						$j('#rslt103').text(curCd); // X(3), 통화코드
						$j('#rslt104').text(html.toMoney(afPrimFrcAmt)); //외화
						$j('#rslt105').text(curCd); // X(3), 통화코드
						$j('#rslt107').text(cntyNm); //통화
						$j('#rslt108').text(curCd); //통화
						$j('#rslt112').text(curCd); //입금외화금액
						$j('#rslt109').text(html.toMoney(afPrimFrcAmt)); //출금원화금액
						$j('#rslt117').text('@' + html.toMoney(bfPrimExhgRt)); //우대받기 전 환율
						$j('#rslt111').text(exhgRtPrim + '%'); //환율우대율
						$j('#rslt110').text('@' + html.toMoney(afPrimExhgRt)); //우대적용 된 환율(적용환율)
						$j('#rslt113').text(html.toMoney(afPrimKrwAmt) + '원'); //입금외화금액
						$j('#rslt114').text(curCd); //우대받은금액
						$j('#rslt115').text(html.toMoney(dfrcFrcAmt)); //우대받은금액
						$j('#rslt116').text(html.toMoney(afPrimBalKrwAmt) + '원'); //남은원화금액

						//외화를 파실 때 (외화기준)
						$j('#rslt201').text(cntyNm); // X(20), 국가명
						$j('#rslt202').text(curCd); // X(3), 통화코드
						$j('#rslt203').text(html.toMoney(tMoney)); //출금외화금액
						$j('#rslt204').text(curCd); // X(3), 통화코드
						$j('#rslt205').text(html.toMoney(afPrimKrwAmt) + '원'); //입금원화금액
						$j('#rslt207').text(cntyNm); //통화
						$j('#rslt208').text(curCd); //통화
						$j('#rslt209').text(curCd); //출금외화금액
						$j('#rslt210').text(html.toMoney(tMoney)); //출금외화금액
						$j('#rslt215').text('@' + html.toMoney(bfPrimExhgRt)); //우대받기 전 환율
						$j('#rslt212').text(exhgRtPrim + '%'); //환율우대율
						$j('#rslt211').text('@' + html.toMoney(afPrimExhgRt)); //우대적용 된 환율(적용환율)
						$j('#rslt213').text(html.toMoney(afPrimKrwAmt) + '원'); //입금원화금액
						$j('#rslt214').text(html.toMoney(dfrcKrwAmt) + '원'); //우대받은원화금액
						
						//외화를 파실 때 (원화기준)
						$j('#rslt301').text(html.toMoney(tMoney) + '원'); //입금원화금액
						$j('#rslt302').text(cntyNm); // X(20), 국가명
						$j('#rslt303').text(curCd); // X(3), 통화코드
						$j('#rslt304').text(html.toMoney(afPrimFrcAmt)); //외화
						$j('#rslt305').text(curCd); // X(3), 통화코드
						$j('#rslt307').text(cntyNm); //통화
						$j('#rslt308').text(curCd); //통화
						$j('#rslt312').text(curCd); //출금외화금액
						$j('#rslt309').text(html.toMoney(afPrimFrcAmt)); //입금원화금액
						$j('#rslt317').text('@' + html.toMoney(bfPrimExhgRt)); //우대받기 전 환율
						$j('#rslt311').text(exhgRtPrim + '%'); //환율우대율
						$j('#rslt310').text('@' + html.toMoney(afPrimExhgRt)); //우대적용 된 환율(적용환율)
						$j('#rslt313').text(html.toMoney(afPrimKrwAmt) + '원'); //출금외화금액
						$j('#rslt314').text(curCd); //우대받은외화금액
						$j('#rslt315').text(html.toMoney(dfrcFrcAmt)); //우대받은외화금액
						$j('#rslt316').text(html.toMoney(afPrimBalKrwAmt) + '원'); //남은원화금액

						pbk.common.popup.calculator.frcDeal.change.view(trscDvCd); //외환매매 화면 세팅
						
						$j("#scrContents").scrollTop($j("#scrContents").height() + $j("#calScr").height()); //스크롤 하단으로...
					//}
				}
			} // getResult -End
		}, // frcDeal -End
		
		/**
		 * 외화수표
		 * pbk.common.popup.calculator.frcChk
		 */
		frcChk : {

			/**
			 * 외화수표 초기화
			 * pbk.common.popup.calculator.frcChk.init
			 */
			init : function() {
				
				pbk.common.popup.calculator.frcChk.change.view(); //외화수표 화면 세팅
				
				pbk.common.popup.calculator.common.change.curDv(); //공통 통화구분 선택
				pbk.common.popup.calculator.frcChk.change.trscDv(); //외화수표 거래구분 선택
				pbk.common.popup.calculator.frcChk.change.exhgRtBasc(); //외화수표 환율기준 선택
				pbk.common.popup.calculator.common.change.exhgRtPrim(); //공통 환율우대 선택
				
				pbk.common.popup.calculator.common.event.curDv(); //공통 통화구분 이벤트
				pbk.common.popup.calculator.frcChk.event.trscDv(); //외화수표 거래구분 이벤트
				pbk.common.popup.calculator.frcChk.event.setTrscAmt(); //외화수표 거래금액 이벤트
				pbk.common.popup.calculator.frcChk.event.exhgRtBasc(); //외화수표 환율기준 이벤트
				pbk.common.popup.calculator.common.event.exhgRtPrim(); //환율우대 이벤트
			}, // init -End
			
			/**
			 * 외화수표 선택
			 * pbk.common.popup.calculator.frcChk.change
			 */
			change : {

				/**
				 * 외화수표 화면 세팅
				 * pbk.common.popup.calculator.frcChk.change.view
				 */
				view : function(num) {

					if('0' === num){ //[거래구분]외화수표로 송금 보내실 때
						
						$j('#rslt096').removeClass('none'); //계산결과 타이틀
						$j('#rslt097').removeClass('none'); //계산결과 요약
						$j('#rslt098').removeClass('none'); //기준일
						$j('#rslt099').removeClass('none'); //계산결과 상세
						$j('#rslt197').addClass('none'); //계산결과 요약
						$j('#rslt199').addClass('none'); //계산결과 상세
					} else if('1' === num){ //[거래구분]외화수표를 교환하실 때
						
						$j('#rslt096').removeClass('none'); //계산결과 타이틀
						$j('#rslt097').addClass('none'); //계산결과 요약
						$j('#rslt098').removeClass('none'); //기준일
						$j('#rslt099').addClass('none'); //계산결과 상세
						$j('#rslt197').removeClass('none'); //계산결과 요약
						$j('#rslt199').removeClass('none'); //계산결과 상세
					} else {
						
						$j('#rslt096').addClass('none'); //계산결과 타이틀
						$j('#rslt097').addClass('none'); //계산결과 요약
						$j('#rslt098').addClass('none'); //기준일
						$j('#rslt099').addClass('none'); //계산결과 상세
						$j('#rslt197').addClass('none'); //계산결과 요약
						$j('#rslt199').addClass('none'); //계산결과 상세
					}
				}, // view -End
			
				/**
				 * 외화수표 거래구분 선택
				 * pbk.common.popup.calculator.frcChk.change.trscDv
				 */
				trscDv : function() {
					
					var trscDvCdObj = $j('input:radio[name=trscDvCd]:checked'); //거래구분
					var buyMethTrObj = $j('#buyMethTr'); //[거래금액]외화 tr
					
					if(0 < trscDvCdObj.length) { //거래구분
						
						if('1' === trscDvCdObj.val()) { //[거래구분]외화수표를 교환하실 때
							
							buyMethTrObj.removeClass('none'); //방법 활성화
						} else {
							
							buyMethTrObj.addClass('none'); //방법 비활성화
						}
					}
				}, // trscDv -End
				
				/**
				 * 외화수표 거래금액 세팅
				 * pbk.common.popup.calculator.frcChk.change.setTrscAmt
				 */
				setTrscAmt : function(num) {
					
					var trscAmt1Obj = $j('input[name=trscAmt1]'); //[거래금액]외화
					
					if(undefined === num || null === num || '' === num || '0' === num) {
						
						trscAmt1Obj.val('0'); //[거래금액]외화
					} else {
						
						trscAmt1Obj.val(num); //[거래금액]외화
					}
				}, // setTrscAmt -End
				
				/**
				 * 외화수표 환율기준 선택
				 * pbk.common.popup.calculator.frcChk.change.exhgRtBasc
				 */
				exhgRtBasc : function() {

					var exhgRtBascCdObj = $j('input:radio[name=exhgRtBascCd]:checked'); //환율기준
					var exhgRtBascObj = $j('input[name=exhgRtBasc]');//[환율기준]직접입력 값
					var exhgRtBascPointObj = $j('input[name=exhgRtBascPoint]');//[환율기준]직접입력 값
					var exhgRtBascDescObj = $j('#exhgRtBascDesc');
					var exhgRtPrimCdObj = $j('input:radio[name=exhgRtPrimCd]'); //환율우대
					var exhgRtPrimCd1Obj = $j('input:radio[name=exhgRtPrimCd]:checked'); //환율우대
					var exhgRtPrim1Obj = $j('select[name=exhgRtPrim1]'); //[환율우대]해당있음 값
					var exhgRtPrimObj = $j('input[name=exhgRtPrim]'); //[환율우대]해당있음 값
					
					if(0 < exhgRtBascCdObj.length) { //환율기준

						if('0' === exhgRtBascCdObj.val()) { //[환율기준]고시환율 선택 시
							
							exhgRtBascObj.attr('readonly' , true); //[환율기준]직접입력 값 비활성화
							exhgRtBascPointObj.attr('readonly' , true); //[환율기준]직접입력 값 비활성화
							
							exhgRtBascObj.addClass('disabled'); //[환율기준]직접입력 값 비활성화
							exhgRtBascPointObj.addClass('disabled'); //[환율기준]직접입력 값 비활성화
							exhgRtBascDescObj.addClass('none');
							
							exhgRtBascObj.val('0'); //[환율기준]직접입력 값 초기화
							exhgRtBascPointObj.val('00'); //[환율기준]직접입력 값 초기화
							
							exhgRtPrimCdObj.attr('disabled' , false); //환율우대 활성화
							
							exhgRtPrimCdObj.removeClass('disabled'); //환율우대 활성화
							
							if('1' === exhgRtPrimCd1Obj.val()) {
								
								exhgRtPrim1Obj.attr('disabled' , false); //[환율우대]해당있음 값 활성화
								
								exhgRtPrim1Obj.removeClass('disabled'); //[환율우대]해당있음 값 활성화
							} else {
								
								exhgRtPrim1Obj.attr('disabled' , true); //[환율우대]해당있음 값 비활성화
								
								exhgRtPrim1Obj.addClass('disabled'); //[환율우대]해당있음 값 비활성화
								
								exhgRtPrim1Obj.val('0'); //[환율우대]해당있음 값 초기화
								exhgRtPrimObj.val('0'); //[환율우대]해당있음 값 초기화
							}
						} else {
							
							exhgRtBascObj.attr('readonly' , false); //[환율기준]직접입력 값 비활성화
							exhgRtBascPointObj.attr('readonly' , false); //[환율기준]직접입력 값 비활성화
							
							exhgRtBascObj.removeClass('disabled'); //[환율기준]직접입력 값 비활성화
							exhgRtBascPointObj.removeClass('disabled'); //[환율기준]직접입력 값 비활성화
							exhgRtBascDescObj.removeClass('none');
							
							exhgRtPrimCdObj.attr('disabled' , true); //환율우대 비활성화
							
							exhgRtPrimCdObj.addClass('disabled'); //환율우대 비활성화
							
							$j('input:radio[name=exhgRtPrimCd]:radio[value="0"]').prop('checked',true); //[환율우대]해당업음 선택
							
							exhgRtPrim1Obj.attr('disabled' , true); //[환율우대]해당있음 값 비활성화
							
							exhgRtPrim1Obj.addClass('disabled'); //[환율우대]해당있음 값 비활성화
							
							exhgRtPrim1Obj.val('0'); //[환율우대]해당있음 값 초기화
							exhgRtPrimObj.val('0'); //[환율우대]해당있음 값 초기화
						}
					}
				} // exhgRtBasc -End				
			}, // change -End
			
			/**
			 * 외화수표 이벤트
			 * pbk.common.popup.calculator.frcChk.event
			 */
			event : {
				
				/**
				 * 외화수표 거래구분 이벤트
				 * pbk.common.popup.calculator.frcChk.event.trscDv
				 */
				trscDv : function() {
					
					var trscDvCdObj = $j('input:radio[name=trscDvCd]'); //거래구분
					
					trscDvCdObj.removeAttr('onclick').bind('click', function(){
	
						pbk.common.popup.calculator.frcChk.change.trscDv();
					});
				}, // trscDv -End
				
				/**
				 * 외화수표 거래금액 이벤트
				 * pbk.common.popup.calculator.frcChk.event.setTrscAmt
				 */
				setTrscAmt : function() {
					
					var setTrscAmt1 = $j('#setTrscAmt1');
					var setTrscAmt2 = $j('#setTrscAmt2');
					var setTrscAmt3 = $j('#setTrscAmt3');
					var setTrscAmt4 = $j('#setTrscAmt4');
					var setTrscAmt5 = $j('#setTrscAmt5');
					var setTrscAmt6 = $j('#setTrscAmt6');
					
					setTrscAmt1.removeAttr('onclick').bind('click', function(){
	
						pbk.common.popup.calculator.frcChk.change.setTrscAmt('10');
					});
					
					setTrscAmt2.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.frcChk.change.setTrscAmt('100');
					});
					
					setTrscAmt3.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.frcChk.change.setTrscAmt('500');
					});
					
					setTrscAmt4.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.frcChk.change.setTrscAmt('1,000');
					});
					
					setTrscAmt5.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.frcChk.change.setTrscAmt('10,000');
					});
					
					setTrscAmt6.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.frcChk.change.setTrscAmt();
					});
				}, // setTrscAmt -End
				
				/**
				 * 외화수표 환율기준 이벤트
				 * pbk.common.popup.calculator.frcChk.event.exhgRtBasc
				 */
				exhgRtBasc : function() {
					
					var exhgRtBascCdObj = $j('input:radio[name=exhgRtBascCd]'); //환율기준
					
					exhgRtBascCdObj.removeAttr('onclick').bind('click', function(){
	
						pbk.common.popup.calculator.frcChk.change.exhgRtBasc();
					});
				} // exhgRtBasc -End
			}, // event -End
		
			/**
			 * 외화수표 계산 요청
			 * pbk.common.popup.calculator.frcChk.submit
			 */
			submit : function(formObj) {
				
				var jForm = new hana.JForm(formObj);
				
				pbk.common.popup.calculator.frcChk.change.view(); //외화수표 화면 세팅
				
				var trscDvCdObj = $j('input:radio[name=trscDvCd]:checked'); //거래구분
				var trscAmtObj = $j('input[name=trscAmt]'); //거래금액
				var trscAmt1Obj = $j('input[name=trscAmt1]'); //[거래금액]외화
				var exhgRtBascCdObj = $j('input:radio[name=exhgRtBascCd]:checked'); //환율기준
				var exhgRtPrimCdObj = $j('input:radio[name=exhgRtPrimCd]:checked'); //환율우대
				var exhgRtPrimObj = $j('input[name=exhgRtPrim]'); //환율우대
				var exhgRtPrim1Obj = $j('select[name=exhgRtPrim1]'); //[환율우대]해당있음 값

				if (!jForm.add(new hana.JSelect('통화구분',formObj.curDvCd))
						.validate()) {
							return false;
				}

				if(0 === trscDvCdObj.length) { //거래구분

					opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: '오류',
						message: '거래구분을 선택하셔야 합니다.',
						callback: null
					});
					return false;
				} else {
					
					if (!jForm.add(new hana.JCurrency('거래금액',formObj.trscAmt1).rangeMoney(1,99999999999,'3'))
							.validate()) {
								return false;
					}
				}
				
				if(0 === exhgRtBascCdObj.length) { //환율기준
				
					opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: '오류',
						message: '환율기준을 선택하셔야 합니다.',
						callback: null
					});
					return false;
				} else {
					
					if('1' === exhgRtBascCdObj.val()) { //[환율기준]직접입력 선택 시
						
						if (!jForm.add(new hana.JCurrency('환율기준 직접입력 값',formObj.exhgRtBasc).rangeMoney(1,99999999999,'3'))
								.validate()) {
									return false;
						}
						
						if (!jForm.add(new hana.JCurrency('환율기준 직접입력 값',formObj.exhgRtBascPoint).rangeMoney(0,99,'1'))
								.validate()) {
									return false;
						}
						
						exhgRtPrimObj.val('0'); //[환율우대]해당있음 값
					} else {
						
						if(0 === exhgRtPrimCdObj.length) { //환율우대
							   
							opb.common.layerpopup.openMessage_fnc({
								isConfirm: false,
								title: '오류',
								message: '환율우대를 선택하셔야 합니다.',
								callback: null
							});
							return false;
						} else {
							
							if('1' === exhgRtPrimCdObj.val()) { //[환율우대]해당있음 선택 시

								if (!jForm.add(new hana.JNumber('환율우대 해당있음 값',formObj.exhgRtPrim1).range(5,100,'1'))
										.validate()) {
											return false;
								}
								
								exhgRtPrimObj.val(exhgRtPrim1Obj.val()); //[환율우대]해당있음 값
							} else {
								
								exhgRtPrimObj.val('0'); //[환율우대]해당있음 값
							}
						}
					}
				}

				trscAmtObj.val(trscAmt1Obj.val()); //[거래금액]외화

				if(isDebugEnabled) {
					
					console.log($j('form').serialize());
				}
				
				$j('input[name=isTest]').val(isTest);

				var hanaAjax = new hana.JHanaAjax('', true, true);
				hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + subUrl + bankCa29, formObj, true, pbk.common.popup.calculator.frcChk.getResult, 'UTF-8');
			}, // submit -End
			
			/**
			 * 외화수표 계산 결과
			 * pbk.common.popup.calculator.frcChk.getResult
			 */
			getResult : function(res, arg) {
				
				var data = eval('('+res.responseText+')');
				
				if(isDebugEnabled) {
					
					console.log(res.responseText);
					console.log(data);
				}
				
				if(data){

					if('success' === data.outHm.calcRslt) {

						var curDvCd = data.inHm.curDvCd; //통화구분
						var trscDvCd = data.inHm.trscDvCd; //거래구분
						var trscAmt = data.inHm.trscAmt; //거래금액
						var exhgRtBascCd = data.inHm.exhgRtBascCd; //환율기준
						var exhgRtBasc = data.inHm.exhgRtBasc; //환율기준 금액
						var exhgRtBascPoint = data.inHm.exhgRtBascPoint; //환율기준 금액
						var exhgRtPrimCd = data.inHm.exhgRtPrimCd; //환율우대
						var exhgRtPrim = data.inHm.exhgRtPrim; //환율우대율

						var idx = 0;
						var regDt = data.outRec[idx].regDt; // X(8), 등록일자
						var curCd = data.outRec[idx].curCd; // X(3), 통화코드
						var cntyNm = data.outRec[idx].cntyNm; // X(20), 국가명
						var pbldSqn = data.outRec[idx].pbldSqn; // 9(5), 고시회차
						var dealBascRt = data.outRec[idx].dealBascRt; // R(16), 매매기준율
						var ttBuyRt = data.outRec[idx].ttBuyRt; // R(16), 전신환매입율
						var acmnBuyRt = data.outRec[idx].acmnBuyRt; // R(16), 현찰매입율
						var tcNegoRt = data.outRec[idx].tcNegoRt; // R(16), 여행자수표매입율
						var ttSllRt = data.outRec[idx].ttSllRt; // R(16), 전신환매도율
						var acmnSllRt = data.outRec[idx].acmnSllRt; // R(16), 현찰매도율
						var tcSllRt = data.outRec[idx].tcSllRt; // R(16), 여행자수표매도율
						var usdBascExhgRt = data.outRec[idx].usdBascExhgRt; // R(16), 미화기준환율
						var usdCvsRt = data.outRec[idx].usdCvsRt; // R(16), 미화환산율
						var excmsRt = data.outRec[idx].excmsRt; // R(12), 환가료율
						var acmnBuyMrgnRt = data.outRec[idx].acmnBuyMrgnRt; // R(16), 현찰매입마진율
						var acmnSllMrgnRt = data.outRec[idx].acmnSllMrgnRt; // R(16), 현찰매도마진율
						var curUnitVlu = data.outRec[idx].curUnitVlu; // 9(6), 통화단위값

						var rate = data.clacHm.rate; //우대환율
						var lR = data.clacHm.lR; //정상금액
						var sExRateW = data.clacHm.sExRateW; //전신환매입율
						var calcExRate = data.clacHm.calcExRate; //적용환율
						var dDolVST = data.clacHm.dDolVST; //수수료

						var calcRslt = data.outHm.calcRslt; //계산결과
						var today = data.outHm.today; //기준일
						var tMoney = data.outHm.tMoney; //외화금액
						var dA = data.outHm.dA; //우대받은후환율
						var sExRate = data.outHm.sExRate; //우대받기전환율
						var lS = data.outHm.lS; //원화금액
						var lT = data.outHm.lT; //우대받은원화금액
						var iSuSu = data.outHm.iSuSu; //수수료
						var lScharge = data.outHm.lScharge; //원화금액(수수료포함)

						$j('#rslt001').text(cntyNm); // X(20), 국가명
						$j('#rslt002').text(curCd); // X(3), 통화코드
						$j('#rslt003').text(html.toMoney(parseFloat(tMoney).toFixed(2))); //외화금액
						$j('#rslt004').text(curCd); // X(3), 통화코드
						$j('#rslt005').text(html.toMoney(lScharge) + '원'); //원화금액(수수료포함)
						//$j('#rslt006').text(html.toDate(today)); //기준일
						$j('#rslt006').text(today); //기준일
						$j('#rslt007').text(cntyNm); //통화
						$j('#rslt008').text(curCd); //통화
						$j('#rslt009').text(curCd); //외화금액
						$j('#rslt010').text(html.toMoney(parseFloat(tMoney).toFixed(2))); //외화금액
						$j('#rslt011').text('@' + html.toMoney(sExRate)); //우대받기전환율
						$j('#rslt012').text(exhgRtPrim + '%'); //환율우대율
						$j('#rslt013').text('@' + html.toMoney(dA)); //우대받은후환율
						$j('#rslt014').text(html.toMoney(lS) + '원'); //원화금액
						$j('#rslt015').text(html.toMoney(iSuSu) + '원'); //수수료
						$j('#rslt016').text(html.toMoney(lT) + '원'); //우대받은원화금액

						$j('#rslt101').text(cntyNm); // X(20), 국가명
						$j('#rslt102').text(curCd); // X(3), 통화코드
						$j('#rslt103').text(html.toMoney(parseFloat(tMoney).toFixed(2))); //외화
						$j('#rslt104').text(curCd); // X(3), 통화코드
						$j('#rslt105').text(html.toMoney(lScharge) + '원'); //원화금액(수수료포함)
						$j('#rslt107').text(cntyNm); //통화
						$j('#rslt108').text(curCd); //통화
						$j('#rslt109').text(curCd); //외화금액
						$j('#rslt110').text(html.toMoney(parseFloat(tMoney).toFixed(2))); //외화금액
						$j('#rslt111').text('@' + html.toMoney(sExRate)); //우대받기전환율
						$j('#rslt112').text(exhgRtPrim + '%'); //환율우대율
						$j('#rslt113').text('@' + html.toMoney(dA)); //우대받은후환율
						$j('#rslt114').text(html.toMoney(lS) + '원'); //원화금액
						$j('#rslt115').text(html.toMoney(iSuSu) + '원'); //수수료
						$j('#rslt116').text(html.toMoney(lT) + '원'); //우대받은원화금액

						pbk.common.popup.calculator.frcChk.change.view(trscDvCd); //외화수표 화면 세팅
						
						$j("#scrContents").scrollTop($j("#scrContents").height() + $j("#calScr").height()); //스크롤 하단으로...
					}
				}
			} // getResult -End
		}, // frcChk -End
		
		/**
		 * 수출입거래
		 * pbk.common.popup.calculator.eimpTrsc
		 */
		eimpTrsc : {
			
			/**
			 * 수출입거래 초기화
			 * pbk.common.popup.calculator.eimpTrsc.init
			 */
			init : function() {
				
				pbk.common.popup.calculator.eimpTrsc.change.view(); //수출입거래 화면 세팅
				
				pbk.common.popup.calculator.common.change.curDv2(); //공통 통화구분 선택
				
				pbk.common.popup.calculator.common.event.curDv2(); //공통 통화구분 이벤트
				pbk.common.popup.calculator.eimpTrsc.event.setTrscAmt(); //수출입거래 거래금액 이벤트
			}, // init -End
			
			/**
			 * 수출입거래 선택
			 * pbk.common.popup.calculator.eimpTrsc.change
			 */
			change : {

				/**
				 * 수출입거래 화면 세팅
				 * pbk.common.popup.calculator.eimpTrsc.change.view
				 */
				view : function(num) {

					if('0' === num){ //[거래구분]수출환어음 Nego
						
						$j('#rslt096').removeClass('none'); //계산결과 타이틀
						$j('#rslt097').removeClass('none'); //계산결과 요약
						$j('#rslt098').removeClass('none'); //기준일
						$j('#rslt099').removeClass('none'); //계산결과 상세
						$j('#rslt197').addClass('none'); //계산결과 요약
						$j('#rslt199').addClass('none'); //계산결과 상세
					} else if('1' === num){ //[거래구분]수입대금(수입신용장)결제
						
						$j('#rslt096').removeClass('none'); //계산결과 타이틀
						$j('#rslt097').addClass('none'); //계산결과 요약
						$j('#rslt098').removeClass('none'); //기준일
						$j('#rslt099').addClass('none'); //계산결과 상세
						$j('#rslt197').removeClass('none'); //계산결과 요약
						$j('#rslt199').removeClass('none'); //계산결과 상세
					} else {
						
						$j('#rslt096').addClass('none'); //계산결과 타이틀
						$j('#rslt097').addClass('none'); //계산결과 요약
						$j('#rslt098').addClass('none'); //기준일
						$j('#rslt099').addClass('none'); //계산결과 상세
						$j('#rslt197').addClass('none'); //계산결과 요약
						$j('#rslt199').addClass('none'); //계산결과 상세
					}
				}, // view -End
			
				/**
				 * 수출입거래 거래금액 세팅
				 * pbk.common.popup.calculator.eimpTrsc.change.setTrscAmt
				 */
				setTrscAmt : function(num) {
					
					var trscAmt1Obj = $j('input[name=trscAmt1]'); //[거래금액]외화
					
					if(undefined === num || null === num || '' === num || '0' === num) {
						
						trscAmt1Obj.val('0'); //[거래금액]외화
					} else {
						
						trscAmt1Obj.val(num); //[거래금액]외화
					}
				} // setTrscAmt -End
			}, // change -End
			
			/**
			 * 수출입거래 이벤트
			 * pbk.common.popup.calculator.eimpTrsc.event
			 */
			event : {

				/**
				 * 수출입거래 거래금액 이벤트
				 * pbk.common.popup.calculator.eimpTrsc.event.setTrscAmt
				 */
				setTrscAmt : function() {
					
					var setTrscAmt1 = $j('#setTrscAmt1');
					var setTrscAmt2 = $j('#setTrscAmt2');
					var setTrscAmt3 = $j('#setTrscAmt3');
					var setTrscAmt4 = $j('#setTrscAmt4');
					var setTrscAmt5 = $j('#setTrscAmt5');
					var setTrscAmt6 = $j('#setTrscAmt6');
					
					setTrscAmt1.removeAttr('onclick').bind('click', function(){
	
						pbk.common.popup.calculator.eimpTrsc.change.setTrscAmt('10');
					});
					
					setTrscAmt2.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.eimpTrsc.change.setTrscAmt('100');
					});
					
					setTrscAmt3.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.eimpTrsc.change.setTrscAmt('500');
					});
					
					setTrscAmt4.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.eimpTrsc.change.setTrscAmt('1,000');
					});
					
					setTrscAmt5.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.eimpTrsc.change.setTrscAmt('10,000');
					});
					
					setTrscAmt6.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.eimpTrsc.change.setTrscAmt();
					});
				} // setTrscAmt -End
			}, // event -End
		
			/**
			 * 수출입거래 계산 요청
			 * pbk.common.popup.calculator.eimpTrsc.submit
			 */
			submit : function(formObj) {
				
				var jForm = new hana.JForm(formObj);
				
				pbk.common.popup.calculator.eimpTrsc.change.view(); //수출입거래 화면 세팅
				
				var trscDvCdObj = $j('input:radio[name=trscDvCd]:checked'); //거래구분
				var trscAmtObj = $j('input[name=trscAmt]'); //거래금액
				var trscAmt1Obj = $j('input[name=trscAmt1]'); //[거래금액]외화

				if (!jForm.add(new hana.JSelect('통화구분',formObj.curDvCd))
						.validate()) {
							return false;
				}

				if(0 === trscDvCdObj.length) { //거래구분

					opb.common.layerpopup.openMessage_fnc({
						isConfirm: false,
						title: '오류',
						message: '거래구분을 선택하셔야 합니다.',
						callback: null
					});
					return false;
				} else {
					
					if (!jForm.add(new hana.JCurrency('거래금액',formObj.trscAmt1).rangeMoney(1,99999999999,'3'))
							.validate()) {
								return false;
					}
				}
				
				trscAmtObj.val(trscAmt1Obj.val()); //[거래금액]외화

				if(isDebugEnabled) {
					
					console.log($j('form').serialize());
				}
				
				$j('input[name=isTest]').val(isTest);

				var hanaAjax = new hana.JHanaAjax('', true, true);
				hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + subUrl + bankCa30, formObj, true, pbk.common.popup.calculator.eimpTrsc.getResult, 'UTF-8');
			}, // submit -End
			
			/**
			 * 수출입거래 계산 결과
			 * pbk.common.popup.calculator.eimpTrsc.getResult
			 */
			getResult : function(res, arg) {
				
				var data = eval('('+res.responseText+')');
				
				if(isDebugEnabled) {
					
					console.log(res.responseText);
					console.log(data);
				}
				
				if(data){
					
					if('success' === data.outHm.calcRslt) {

						var curDvCd = data.inHm.curDvCd; //통화구분
						var trscDvCd = data.inHm.trscDvCd; //거래구분
						var trscAmt = data.inHm.trscAmt; //거래금액
						
						var idx = 0;
						var regDt = data.outRec[idx].regDt; // X(8), 등록일자
						var curCd = data.outRec[idx].curCd; // X(3), 통화코드
						var cntyNm = data.outRec[idx].cntyNm; // X(20), 국가명
						var pbldSqn = data.outRec[idx].pbldSqn; // 9(5), 고시회차
						var dealBascRt = data.outRec[idx].dealBascRt; // R(16), 매매기준율
						var ttBuyRt = data.outRec[idx].ttBuyRt; // R(16), 전신환매입율
						var acmnBuyRt = data.outRec[idx].acmnBuyRt; // R(16), 현찰매입율
						var tcNegoRt = data.outRec[idx].tcNegoRt; // R(16), 여행자수표매입율
						var ttSllRt = data.outRec[idx].ttSllRt; // R(16), 전신환매도율
						var acmnSllRt = data.outRec[idx].acmnSllRt; // R(16), 현찰매도율
						var tcSllRt = data.outRec[idx].tcSllRt; // R(16), 여행자수표매도율
						var usdBascExhgRt = data.outRec[idx].usdBascExhgRt; // R(16), 미화기준환율
						var usdCvsRt = data.outRec[idx].usdCvsRt; // R(16), 미화환산율
						var excmsRt = data.outRec[idx].excmsRt; // R(12), 환가료율
						var acmnBuyMrgnRt = data.outRec[idx].acmnBuyMrgnRt; // R(16), 현찰매입마진율
						var acmnSllMrgnRt = data.outRec[idx].acmnSllMrgnRt; // R(16), 현찰매도마진율
						var curUnitVlu = data.outRec[idx].curUnitVlu; // 9(6), 통화단위값

						var tMoney2 = data.clacHm.tMoney2;
						
						var calcRslt = data.outHm.calcRslt; //계산결과
						var today = data.outHm.today; //기준일
						var exptExbl = data.outHm.exptExbl; //수출환어음 Nego
						var krwAmt = data.outHm.krwAmt; //원화환산 금액
						var exhgRt = data.outHm.exhgRt; //적용환율

						$j('#rslt001').text(cntyNm); // X(20), 국가명
						$j('#rslt002').text(curCd); // X(3), 통화코드
						$j('#rslt003').text(html.toMoney(exptExbl)); //수출환어음 Nego
						$j('#rslt004').text(curCd); // X(3), 통화코드
						$j('#rslt005').text(html.toMoney(krwAmt) + '원'); //원화환산 금액
						//$j('#rslt006').text(html.toDate(today)); //기준일
						$j('#rslt006').text(today); //기준일
						$j('#rslt007').text(curCd); // X(3), 통화코드
						$j('#rslt008').text(html.toMoney(exptExbl)); //수출환어음 Nego
						$j('#rslt009').text(html.toMoney(krwAmt) + '원'); //원화환산 금액
						$j('#rslt010').text(html.toMoney(exhgRt)); //적용환율
						
						$j('#rslt101').text(cntyNm); // X(20), 국가명
						$j('#rslt102').text(curCd); // X(3), 통화코드
						$j('#rslt103').text(html.toMoney(exptExbl)); //수출환어음 Nego
						$j('#rslt104').text(curCd); // X(3), 통화코드
						$j('#rslt105').text(html.toMoney(krwAmt) + '원'); //원화환산 금액
						$j('#rslt107').text(curCd); // X(3), 통화코드
						$j('#rslt108').text(html.toMoney(exptExbl)); //수출환어음 Nego
						$j('#rslt109').text(html.toMoney(krwAmt) + '원'); //원화환산 금액
						$j('#rslt110').text(html.toMoney(exhgRt)); //적용환율
						
						pbk.common.popup.calculator.eimpTrsc.change.view(trscDvCd); //수출입거래 화면 세팅
						
						$j("#scrContents").scrollTop($j("#scrContents").height() + $j("#calScr").height()); //스크롤 하단으로...
					}
				}
			} // getResult -End
		}, // eimpTrsc -End
		
		/**
		 * 매매기준율
		 * pbk.common.popup.calculator.dealBascRt
		 */
		dealBascRt : {
			
			/**
			 * 매매기준율 초기화
			 * pbk.common.popup.calculator.dealBascRt.init
			 */
			init : function() {
				
				pbk.common.popup.calculator.dealBascRt.change.view(); //매매기준율 화면 세팅
				
				pbk.common.popup.calculator.common.change.curDv(); //공통 통화구분 선택
				
				pbk.common.popup.calculator.common.event.curDv(); //공통 통화구분 이벤트
				pbk.common.popup.calculator.dealBascRt.event.setTrscAmt(); //매매기준율 거래금액 이벤트
			}, // init -End
			
			/**
			 * 매매기준율 선택
			 * pbk.common.popup.calculator.dealBascRt.change
			 */
			change : {

				/**
				 * 매매기준율 화면 세팅
				 * pbk.common.popup.calculator.dealBascRt.change.view
				 */
				view : function(num) {
					
					if('0' === num){ //[조회구분]매매기준율로 조회
						
						$j('#rslt096').removeClass('none'); //계산결과 타이틀
						$j('#rslt097').removeClass('none'); //계산결과 요약
						$j('#rslt098').removeClass('none'); //기준일
						$j('#rslt099').removeClass('none'); //계산결과 상세
					} else {
						
						$j('#rslt096').addClass('none'); //계산결과 타이틀
						$j('#rslt097').addClass('none'); //계산결과 요약
						$j('#rslt098').addClass('none'); //기준일
						$j('#rslt099').addClass('none'); //계산결과 상세
					}
				}, // view -End
			
				/**
				 * 매매기준율 거래금액 세팅
				 * pbk.common.popup.calculator.dealBascRt.change.setTrscAmt
				 */
				setTrscAmt : function(num) {
					
					var trscAmt1Obj = $j('input[name=trscAmt1]'); //[거래금액]외화
					
					if(undefined === num || null === num || '' === num || '0' === num) {
						
						trscAmt1Obj.val('0'); //[거래금액]외화
					} else {
						
						trscAmt1Obj.val(num); //[거래금액]외화
					}
				} // setTrscAmt -End
			}, // change -End
			
			/**
			 * 매매기준율 이벤트
			 * pbk.common.popup.calculator.dealBascRt.event
			 */
			event : {

				/**
				 * 매매기준율 거래금액 이벤트
				 * pbk.common.popup.calculator.dealBascRt.event.setTrscAmt
				 */
				setTrscAmt : function() {
					
					var setTrscAmt1 = $j('#setTrscAmt1');
					var setTrscAmt2 = $j('#setTrscAmt2');
					var setTrscAmt3 = $j('#setTrscAmt3');
					var setTrscAmt4 = $j('#setTrscAmt4');
					var setTrscAmt5 = $j('#setTrscAmt5');
					var setTrscAmt6 = $j('#setTrscAmt6');
					
					setTrscAmt1.removeAttr('onclick').bind('click', function(){
	
						pbk.common.popup.calculator.dealBascRt.change.setTrscAmt('10');
					});
					
					setTrscAmt2.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.dealBascRt.change.setTrscAmt('100');
					});
					
					setTrscAmt3.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.dealBascRt.change.setTrscAmt('500');
					});
					
					setTrscAmt4.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.dealBascRt.change.setTrscAmt('1,000');
					});
					
					setTrscAmt5.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.dealBascRt.change.setTrscAmt('10,000');
					});
					
					setTrscAmt6.removeAttr('onclick').bind('click', function(){
						
						pbk.common.popup.calculator.dealBascRt.change.setTrscAmt();
					});
				} // setTrscAmt -End
			}, // event -End
		
			/**
			 * 매매기준율 계산 요청
			 * pbk.common.popup.calculator.dealBascRt.submit
			 */
			submit : function(formObj) {
				
				var jForm = new hana.JForm(formObj);
				
				pbk.common.popup.calculator.dealBascRt.change.view(); //매매기준율 화면 세팅
				
				var trscAmtObj = $j('input[name=trscAmt]'); //거래금액
				var trscAmt1Obj = $j('input[name=trscAmt1]'); //[거래금액]외화

				if (!jForm.add(new hana.JSelect('통화구분',formObj.curDvCd))
						.validate()) {
							return false;
				}

				if (!jForm.add(new hana.JCurrency('거래금액',formObj.trscAmt1).rangeMoney(1,99999999999,'3'))
						.validate()) {
							return false;
				}
				
				trscAmtObj.val(trscAmt1Obj.val()); //[거래금액]외화

				if(isDebugEnabled) {
					
					console.log($j('form').serialize());
				}
				
				$j('input[name=isTest]').val(isTest);

				var hanaAjax = new hana.JHanaAjax('', true, true);
				hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + subUrl + bankCa31, formObj, true, pbk.common.popup.calculator.dealBascRt.getResult, 'UTF-8');
			}, // submit -End
			
			/**
			 * 매매기준율 계산 결과
			 * pbk.common.popup.calculator.dealBascRt.getResult
			 */
			getResult : function(res, arg) {
				
				var data = eval('('+res.responseText+')');
				
				if(isDebugEnabled) {
					
					console.log(res.responseText);
					console.log(data);
				}
				
				if(data){
					
					if('success' === data.outHm.calcRslt) {

						var curDvCd = data.inHm.curDvCd; //통화구분
						var trscAmt = data.inHm.trscAmt; //거래금액
						
						var idx = 0;
						var regDt = data.outRec[idx].regDt; // X(8), 등록일자
						var curCd = data.outRec[idx].curCd; // X(3), 통화코드
						var cntyNm = data.outRec[idx].cntyNm; // X(20), 국가명
						var pbldSqn = data.outRec[idx].pbldSqn; // 9(5), 고시회차
						var dealBascRt = data.outRec[idx].dealBascRt; // R(16), 매매기준율
						var ttBuyRt = data.outRec[idx].ttBuyRt; // R(16), 전신환매입율
						var acmnBuyRt = data.outRec[idx].acmnBuyRt; // R(16), 현찰매입율
						var tcNegoRt = data.outRec[idx].tcNegoRt; // R(16), 여행자수표매입율
						var ttSllRt = data.outRec[idx].ttSllRt; // R(16), 전신환매도율
						var acmnSllRt = data.outRec[idx].acmnSllRt; // R(16), 현찰매도율
						var tcSllRt = data.outRec[idx].tcSllRt; // R(16), 여행자수표매도율
						var usdBascExhgRt = data.outRec[idx].usdBascExhgRt; // R(16), 미화기준환율
						var usdCvsRt = data.outRec[idx].usdCvsRt; // R(16), 미화환산율
						var excmsRt = data.outRec[idx].excmsRt; // R(12), 환가료율
						var acmnBuyMrgnRt = data.outRec[idx].acmnBuyMrgnRt; // R(16), 현찰매입마진율
						var acmnSllMrgnRt = data.outRec[idx].acmnSllMrgnRt; // R(16), 현찰매도마진율
						var curUnitVlu = data.outRec[idx].curUnitVlu; // 9(6), 통화단위값

						var tMoney2 = data.clacHm.tMoney2;
						
						var calcRslt = data.outHm.calcRslt; //계산결과
						var today = data.outHm.today; //기준일
						var frcAmt = data.outHm.frcAmt; //외화금액
						var pdbr = data.outHm.pdbr; //현재 매매기준율 환율
						var pdbrkca = data.outHm.pdbrkca; //현재 매매기준율 원화환산금액
						var s1dbr = data.outHm.s1dbr; //1회차 매매기준율 환율
						var s1dbrkca = data.outHm.s1dbrkca; //1회차 매매기준율 원화환산금액
						var upFlctAmt = data.outHm.upFlctAmt; //상승변동금액
						var downFlctAmt = data.outHm.downFlctAmt; //하락변동금액

						$j('#rslt001').text(cntyNm); // X(20), 국가명
						$j('#rslt002').text(curCd); // X(3), 통화코드
						$j('#rslt003').text(html.toMoney(frcAmt)); //외화금액
						$j('#rslt004').text(curCd); // X(3), 통화코드
						$j('#rslt005').text(html.toMoney(pdbrkca) + '원'); //현재 매매기준율 원화환산금액
						//$j('#rslt006').text(html.toDate(today)); //기준일
						$j('#rslt006').text(today); //기준일
						$j('#rslt007').text(curCd); // X(3), 통화코드
						$j('#rslt008').text(html.toMoney(frcAmt)); //외화금액
						$j('#rslt009').text(html.toMoney(pdbr)); //현재 매매기준율 환율
						$j('#rslt010').text(html.toMoney(pdbrkca) + '원'); //현재 매매기준율 원화환산금액
						$j('#rslt011').text(html.toMoney(s1dbr)); //1회차 매매기준율 환율
						$j('#rslt012').text(html.toMoney(s1dbrkca) + '원'); //1회차 매매기준율 원화환산금액
						$j('#rslt014').text(html.toMoney(upFlctAmt) + '원'); //상승변동금액
						$j('#rslt016').text(html.toMoney(downFlctAmt) + '원'); //하락변동금액
						
						if(upFlctAmt === 0) {
							
							$j('#rslt013').addClass('none');
							$j('#rslt015').addClass('none');
							$j('#rslt017').removeClass('none');
						} else if(upFlctAmt < 0) {
							
							$j('#rslt013').addClass('none');
							$j('#rslt015').removeClass('none');
							$j('#rslt017').addClass('none');
						} else {

							$j('#rslt013').removeClass('none');
							$j('#rslt015').addClass('none');
							$j('#rslt017').addClass('none');
						}
						
						pbk.common.popup.calculator.dealBascRt.change.view('0'); //매매기준율 화면 세팅
						
						$j("#scrContents").scrollTop($j("#scrContents").height() + $j("#calScr").height()); //스크롤 하단으로...
					}
				}
			} // getResult -End
		}, // dealBascRt -End
		
		/**
		 * 교환비율
		 * pbk.common.popup.calculator.exchRto
		 */
		exchRto : {
			
			/**
			 * 교환비율 초기화
			 * pbk.common.popup.calculator.exchRto.init
			 */
			init : function() {
				
				pbk.common.popup.calculator.exchRto.change.view(); //교환비율 화면 세팅
				
				pbk.common.popup.calculator.exchRto.change.curDv(); //교환비율 통화구분 선택
				pbk.common.popup.calculator.exchRto.change.exchCurDvCd(); //교환비율 통화구분 선택
				
				pbk.common.popup.calculator.exchRto.event.curDv(); //교환비율 통화구분 이벤트
				pbk.common.popup.calculator.exchRto.event.exchCurDvCd(); //교환비율 통화구분 이벤트
			}, // init -End
			
			/**
			 * 교환비율 선택
			 * pbk.common.popup.calculator.exchRto.change
			 */
			change : {

				/**
				 * 교환비율 화면 세팅
				 * pbk.common.popup.calculator.exchRto.change.view
				 */
				view : function(num) {
					
					if('0' === num){ //조회구분

						$j('#rslt098').removeClass('none'); //계산결과 타이틀
						$j('#rslt099').removeClass('none'); //계산결과 요약
					} else {

						$j('#rslt098').addClass('none'); //계산결과 타이틀
						$j('#rslt099').addClass('none'); //계산결과 요약
					}
				}, // view -End
			
				/**
				 * 교환비율 통화구분 선택
				 * pbk.common.popup.calculator.exchRto.change.curDv
				 */
				curDv : function() {
					
					var curDvCdObj = $j('select[name=curDvCd]'); //통화구분
					var curDvCd1Obj = $j('#curDvCd1'); //통화구분

					curDvCd1Obj.text(curDvCdObj.val());
				}, // curDv -End
				
				/**
				 * 교환비율 통화구분 선택
				 * pbk.common.popup.calculator.exchRto.change.exchCurDvCd
				 */
				exchCurDvCd : function() {
					
					var exchCurDvCdObj = $j('select[name=exchCurDvCd]'); //통화구분
					var exchCurDvCd1Obj = $j('#exchCurDvCd1'); //통화구분

					exchCurDvCd1Obj.text(exchCurDvCdObj.val());
				} // exchCurDvCd -End
			}, // change -End
			
			/**
			 * 교환비율 이벤트
			 * pbk.common.popup.calculator.exchRto.event
			 */
			event : {

				/**
				 * 교환비율 통화구분 이벤트
				 * pbk.common.popup.calculator.exchRto.event.curDv
				 */
				curDv : function() {
					
					var curDvCdObj = $j('select[name=curDvCd]'); //통화구분
					
					curDvCdObj.removeAttr('onchange').bind('change', function(){

						pbk.common.popup.calculator.exchRto.change.curDv();
					});
				}, // curDv -End
				
				/**
				 * 교환비율 통화구분 이벤트
				 * pbk.common.popup.calculator.exchRto.event.exchCurDvCd
				 */
				exchCurDvCd : function() {
					
					var exchCurDvCdObj = $j('select[name=exchCurDvCd]'); //통화구분
					
					exchCurDvCdObj.removeAttr('onchange').bind('change', function(){

						pbk.common.popup.calculator.exchRto.change.exchCurDvCd();
					});
				} // exchCurDvCd -End
			}, // event -End
			
			/**
			 * 교환비율 계산 요청
			 * pbk.common.popup.calculator.exchRto.submit
			 */
			submit : function(formObj) {
				
				var jForm = new hana.JForm(formObj);
				
				pbk.common.popup.calculator.exchRto.change.view(); //교환비율 화면 세팅
				
				var curDvCdObj = $j('select[name=curDvCd]'); //통화구분
				var trscAmtObj = $j('input[name=trscAmt]'); //거래금액
				var trscAmt1Obj = $j('input[name=trscAmt1]'); //거래금액
				var trscAmt1PointObj = $j('input[name=trscAmt1Point]'); //거래금액
				var exchCurDvCdObj = $j('select[name=exchCurDvCd]'); //통화구분
				
				if (!jForm.add(new hana.JSelect('통화구분',formObj.curDvCd))
						.validate()) {
							return false;
				}

				if (!jForm.add(new hana.JCurrency('거래금액',formObj.trscAmt1).rangeMoney(1,99999999999,'3'))
						.validate()) {
							return false;
				}
				
				if (!jForm.add(new hana.JCurrency('거래금액',formObj.trscAmt1Point).rangeMoney(0,99,'1'))
						.validate()) {
							return false;
				}
				
				if (!jForm.add(new hana.JSelect('통화구분',formObj.exchCurDvCd))
						.validate()) {
							return false;
				}
				
				trscAmtObj.val(trscAmt1Obj.val() + '.' + trscAmt1PointObj.val()); //[거래금액]외화

				if(isDebugEnabled) {
					
					console.log($j('form').serialize());
				}
				
				$j('input[name=isTest]').val(isTest);

				var hanaAjax = new hana.JHanaAjax('', true, true);
				hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + subUrl + bankCa32, formObj, true, pbk.common.popup.calculator.exchRto.getResult, 'UTF-8');
			}, // submit -End
			
			/**
			 * 교환비율 계산 결과
			 * pbk.common.popup.calculator.exchRto.getResult
			 */
			getResult : function(res, arg) {
				
				var data = eval('('+res.responseText+')');
				
				if(isDebugEnabled) {
					
					console.log(res.responseText);
					console.log(data);
				}
				
				if(data){
					
					if('success' === data.outHm.calcRslt) {

						var curDvCd = data.inHm.curDvCd; //통화구분
						var trscAmt = data.inHm.trscAmt; //거래금액
						var exchCurDvCd = data.inHm.exchCurDvCd; //통화구분
						
						var idx = 0;
						var regDt = data.outRec[idx].regDt; // X(8), 등록일자
						var curCd = data.outRec[idx].curCd; // X(3), 통화코드
						var cntyNm = data.outRec[idx].cntyNm; // X(20), 국가명
						var pbldSqn = data.outRec[idx].pbldSqn; // 9(5), 고시회차
						var dealBascRt = data.outRec[idx].dealBascRt; // R(16), 매매기준율
						var ttBuyRt = data.outRec[idx].ttBuyRt; // R(16), 전신환매입율
						var acmnBuyRt = data.outRec[idx].acmnBuyRt; // R(16), 현찰매입율
						var tcNegoRt = data.outRec[idx].tcNegoRt; // R(16), 여행자수표매입율
						var ttSllRt = data.outRec[idx].ttSllRt; // R(16), 전신환매도율
						var acmnSllRt = data.outRec[idx].acmnSllRt; // R(16), 현찰매도율
						var tcSllRt = data.outRec[idx].tcSllRt; // R(16), 여행자수표매도율
						var usdBascExhgRt = data.outRec[idx].usdBascExhgRt; // R(16), 미화기준환율
						var usdCvsRt = data.outRec[idx].usdCvsRt; // R(16), 미화환산율
						var excmsRt = data.outRec[idx].excmsRt; // R(12), 환가료율
						var acmnBuyMrgnRt = data.outRec[idx].acmnBuyMrgnRt; // R(16), 현찰매입마진율
						var acmnSllMrgnRt = data.outRec[idx].acmnSllMrgnRt; // R(16), 현찰매도마진율
						var curUnitVlu = data.outRec[idx].curUnitVlu; // 9(6), 통화단위값

						var tMoney = data.clacHm.tMoney; //거래금액
						var tMoney2 = data.clacHm.tMoney2; //거래금액
						var usdCvsRt1 = data.clacHm.usdCvsRt1; // R(16), 미화환산율
						var usdCvsRt2 = data.clacHm.usdCvsRt2; // R(16), 미화환산율
						
						var calcRslt = data.outHm.calcRslt; //계산결과
						var today = data.outHm.today; //기준일
						var cntyNm1 = data.outHm.cntyNm1; // X(20), 국가명
						var cntyNm2 = data.outHm.cntyNm2; // X(20), 국가명
						var tMoney3 = data.outHm.tMoney3; //거래금액

						var tMoney4 = tMoney3.split('.');
						
						var exchTrscAmtObj = $j('input[name=exchTrscAmt]'); //거래금액
						var exchTrscAmtPointObj = $j('input[name=exchTrscAmtPoint]'); //거래금액
						
						exchTrscAmtObj.val(html.toMoney(tMoney4[0]));
						exchTrscAmtPointObj.val(tMoney4[1]);

						$j('#rslt001').text(cntyNm1); // X(20), 국가명
						$j('#rslt002').text(curDvCd); //통화구분
						$j('#rslt003').text(html.toMoney(tMoney)); //거래금액
						$j('#rslt004').text(curDvCd); //통화구분
						$j('#rslt005').text(cntyNm2); // X(20), 국가명
						$j('#rslt006').text(exchCurDvCd); //통화구분
						$j('#rslt007').text(html.toMoney(tMoney3)); //거래금액
						$j('#rslt008').text(exchCurDvCd); //통화구분

						pbk.common.popup.calculator.exchRto.change.view('0'); //교환비율 화면 세팅
					}
				}
			} // getResult -End
		} // exchRto -End
    }; // return -End

}(); // 금융계산기 팝업 -End

pbk.cms = {};
pbk.cms.fxd = {};
pbk.cms.fxd.rate = function() {
	
	return {
		
		/**
		 * 
		 * pbk.cms.fxd.rate.init
		 */
		init : function() {
			
			pbk.cms.fxd.rate.submit();
		}, // init -End
		
		/**
		 * 
		 * pbk.cms.fxd.rate.submit
		 */
		submit : function() {
			
			var formObj = form.createForm();
            //form.createHiddenField(formObj,'type',type, true);

			var hanaAjax = new hana.JHanaAjax('', true, true);
			hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + '/cms/fxd/wpfxd667_02i.do', formObj, true, pbk.cms.fxd.rate.getResult, 'UTF-8');
		}, // submit -End
		
		/**
		 * 
		 * pbk.cms.fxd.rate.getResult
		 */
		getResult : function(res, arg) {

			var data = eval('('+res.responseText+')');

			if(data){

				$j('#usdDealBascRt').text(data.outHm.usdDealBascRt); //USD달러(미국)
				$j('#eurDealBascRt').text(data.outHm.eurDealBascRt); //EUR유로(유럽연합)
				$j('#jpyDealBascRt').text(data.outHm.jpyDealBascRt); //JPY100엔
				$j('#cnyDealBascRt').text(data.outHm.cnyDealBascRt); //CNY위안(중국)
				$j('#pbldDtTm').text(data.outHm.pbldDtTm); //매매기준률 기준 시간
				
/*				
				업무 : 환율
				호출 URL : /cms/fxd/wpfxd667_02i.do
				결과값
				{"outHm":{"jpyDealBascRt":"1,088.08","eurDealBascRt":"1,333.65","usdDealBascRt":"1,160.00","cnyDealBascRt":"178.24","pbldDtTm":"2016-05-18 17:46:03"}}

				usdDealBascRt USD달러(미국)
				eurDealBascRt EUR유로(유럽연합)
				jpyDealBascRt JPY100엔
				cnyDealBascRt CNY위안(중국)
				pbldDtTm 매매기준률 기준 시간
*/
			};					
		} // getResult -End
	};
}();

pbk.cms.fxd.gold = function() {
	
	return {
		
		/**
		 * 
		 * pbk.cms.fxd.gold.init
		 */
		init : function() {
			
			pbk.cms.fxd.gold.submit();
		}, // init -End
		
		/**
		 * 
		 * pbk.cms.fxd.gold.submit
		 */
		submit : function() {
			
			var formObj = form.createForm();
            //form.createHiddenField(formObj,'type',type, true);

			var hanaAjax = new hana.JHanaAjax('', true, true);
			hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + '/cms/fxd/wpfxd668_02i.do', formObj, true, pbk.cms.fxd.gold.getResult, 'UTF-8');
		}, // submit -End
		
		/**
		 * 
		 * pbk.cms.fxd.gold.getResult
		 */
		getResult : function(res, arg) {

			var data = eval('('+res.responseText+')');

			if(data){

				$j('#gdbDealBascPrc').text(data.outHm.gdbDealBascPrc); //국내금
				$j('#intlPbldMktPrc').text(data.outHm.intlPbldMktPrc); //국제금
				$j('#trscStrDt').text(data.outHm.trscStrDt); //매매기준률 기준일

/*
				업무 : 금시세
				호출 URL : /cms/fxd/wpfxd668_02i.do
				결과값
				{"outHm":{"gdbDealBascPrc":"47,572.11","trscStrDt":"2016-05-17","intlPbldMktPrc":"1,286.10"}}

				gdbDealBascPrc 국내금
				intlPbldMktPrc 국제금
				trscStrDt 매매기준률 기준일
*/				
			};
		} // getResult -End
	};
}();

pbk.cms.fxd.fund = function() {
	
	return {
		
		/**
		 * 
		 * pbk.cms.fxd.fund.goMenu
		 */
		goMenu : function(tab) {

			if('A' === tab.substring(0,1) || 'B' === tab.substring(0,1) || 'C' === tab.substring(0,1) || 'D' === tab.substring(0,1)) {

				$j('#A0').removeClass('on');
				$j('#A1').removeClass('on');
				$j('#A2').removeClass('on');
				$j('#A3').removeClass('on');
				$j('#A4').removeClass('on');
				$j('#A5').removeClass('on');
				
				$j('#B0').removeClass('on');
				$j('#B1').removeClass('on');
				$j('#B2').removeClass('on');
				$j('#B3').removeClass('on');
				$j('#B4').removeClass('on');
				$j('#B5').removeClass('on');
				
				$j('#C0').removeClass('on');
				$j('#C1').removeClass('on');
				$j('#C2').removeClass('on');
				$j('#C3').removeClass('on');
				$j('#C4').removeClass('on');
				$j('#C5').removeClass('on');
				
				$j('#D0').removeClass('on');
				$j('#D1').removeClass('on');
				$j('#D2').removeClass('on');
				$j('#D3').removeClass('on');
				$j('#D4').removeClass('on');
				$j('#D5').removeClass('on');
				
				$j('#'+tab.substring(0,1)+'0').addClass('on');
				$j('#'+tab).addClass('on');
				
				$j('#A10').css('display','none');
				$j('#A20').css('display','none');
				$j('#A30').css('display','none');
				$j('#A40').css('display','none');
				$j('#A50').css('display','none');
				
				$j('#B10').css('display','none');
				$j('#B20').css('display','none');
				$j('#B30').css('display','none');
				$j('#B40').css('display','none');
				$j('#B50').css('display','none');
				
				$j('#C10').css('display','none');
				$j('#C20').css('display','none');
				$j('#C30').css('display','none');
				$j('#C40').css('display','none');
				$j('#C50').css('display','none');
				
				$j('#D10').css('display','none');
				$j('#D20').css('display','none');
				$j('#D30').css('display','none');
				$j('#D40').css('display','none');
				$j('#D50').css('display','none');
				
				$j('#'+tab.substring(0,2)+'0').css('display','block');
			}
			
			if('E' === tab.substring(0,1)) {
				
				$j('#E1').removeClass('on');
				$j('#E2').removeClass('on');
				$j('#E3').removeClass('on');
				$j('#E4').removeClass('on');
				
				$j('#'+tab).addClass('on');
				
				$j('#E10').css('display','none');
				$j('#E20').css('display','none');
				$j('#E30').css('display','none');
				$j('#E40').css('display','none');
				
				$j('#'+tab.substring(0,2)+'0').css('display','block');
			}
		}, // init -End
		
		/**
		 * 
		 * pbk.cms.fxd.fund.init
		 */
		init : function(procDvCd, adtnDvCd, fundRvnRtTrmInqDvCd, bncerWrkgShpMclasCd, divition) {
			
			pbk.cms.fxd.fund.submit(procDvCd, adtnDvCd, fundRvnRtTrmInqDvCd, bncerWrkgShpMclasCd, divition);
		}, // init -End
		
		/**
		 * 
		 * pbk.cms.fxd.fund.submit
		 */
		submit : function(procDvCd, adtnDvCd, fundRvnRtTrmInqDvCd, bncerWrkgShpMclasCd, divition) {
			
			var formObj = form.createForm();
            form.createHiddenField(formObj,'procDvCd',procDvCd, true);
            form.createHiddenField(formObj,'adtnDvCd',adtnDvCd, true);
            form.createHiddenField(formObj,'fundRvnRtTrmInqDvCd',fundRvnRtTrmInqDvCd, true);
            form.createHiddenField(formObj,'bncerWrkgShpMclasCd',bncerWrkgShpMclasCd, true);
            form.createHiddenField(formObj,'divition',divition, true);

			var hanaAjax = new hana.JHanaAjax('', true, true);
			hanaAjax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + '/cms/fxd/wpfxd669_02i.do', formObj, true, pbk.cms.fxd.fund.getResult, 'UTF-8');
		}, // submit -End
		
		/**
		 * 
		 * pbk.cms.fxd.fund.getResult
		 */
		getResult : function(res, arg) {

			var data = eval('('+res.responseText+')');

			if(data){

/*				
				환율/금리/수익률/시세

				업무 : 수익률 높은 펀드 Best5
				호출 URL : /cms/fxd/wpfxd669_02i.do?procDvCd=001&adtnDvCd=111&fundRvnRtTrmInqDvCd=03&bncerWrkgShpMclasCd=00&divition=0
				procDvCd 001
				adtnDvCd 111:인터넷펀드, 112:전체펀드
				fundRvnRtTrmInqDvCd 03
				bncerWrkgShpMclasCd 00:전체, 01:주식형, 02:채권형, 03:혼합형, 04:기타
				divition 0:국내, 1:해외
				결과값
				{"outHm":{"listHm":[{"itntNtryPossYn":"Y","lvhTpPossYn":"Y","vltpOpenPossYn":"N","taxPrimPossYn":"N","afcoFundYn":"N","rduTaxtPrdDvCd":"00","saleChnlDvCd":"1","fundRskLevlDvCd":"5","fundBascPrc":833.41,"fundNo":"232106104503","fundPrdNm":"NH-CA 코리아 2배 레버리지 증권투자신탁(주식-파생형)Ae","wrkgShpDvCd":"06","fundSalePrdClasCd":"143","fundRvnRt":12.05,"dfrmTpOpenPossYn":"N","rsvgOpenPossYn":"Y","seq":1,"newPossYn":"","fundStgupOtxtBal":0.0,"fstStgupDt":"","plniEndDt":"","plniStrDt":""},{"itntNtryPossYn":"Y","lvhTpPossYn":"Y","vltpOpenPossYn":"N","taxPrimPossYn":"Y","afcoFundYn":"N","rduTaxtPrdDvCd":"00","saleChnlDvCd":"4","fundRskLevlDvCd":"5","fundBascPrc":776.32,"fundNo":"232106101758","fundPrdNm":"NH-CA 1.5배 레버리지 인덱스증권투자신탁(주식-파생형) C-e","wrkgShpDvCd":"06","fundSalePrdClasCd":"143","fundRvnRt":9.29,"dfrmTpOpenPossYn":"Y","rsvgOpenPossYn":"Y","seq":2,"newPossYn":"","fundStgupOtxtBal":0.0,"fstStgupDt":"","plniEndDt":"","plniStrDt":""},{"itntNtryPossYn":"Y","lvhTpPossYn":"Y","vltpOpenPossYn":"N","taxPrimPossYn":"Y","afcoFundYn":"N","rduTaxtPrdDvCd":"00","saleChnlDvCd":"4","fundRskLevlDvCd":"5","fundBascPrc":947.09,"fundNo":"209102101203","fundPrdNm":"신영마라톤증권투자신탁(주식) e형","wrkgShpDvCd":"02","fundSalePrdClasCd":"140","fundRvnRt":9.28,"dfrmTpOpenPossYn":"Y","rsvgOpenPossYn":"Y","seq":3,"newPossYn":"","fundStgupOtxtBal":0.0,"fstStgupDt":"","plniEndDt":"","plniStrDt":""},{"itntNtryPossYn":"Y","lvhTpPossYn":"Y","vltpOpenPossYn":"N","taxPrimPossYn":"Y","afcoFundYn":"Y","rduTaxtPrdDvCd":"00","saleChnlDvCd":"4","fundRskLevlDvCd":"5","fundBascPrc":874.93,"fundNo":"102106101755","fundPrdNm":"하나UBS 파워 1.5배 레버리지 인덱스증권(주식-파생형)C-e","wrkgShpDvCd":"06","fundSalePrdClasCd":"143","fundRvnRt":9.13,"dfrmTpOpenPossYn":"Y","rsvgOpenPossYn":"Y","seq":4,"newPossYn":"","fundStgupOtxtBal":0.0,"fstStgupDt":"","plniEndDt":"","plniStrDt":""},{"itntNtryPossYn":"Y","lvhTpPossYn":"Y","vltpOpenPossYn":"N","taxPrimPossYn":"Y","afcoFundYn":"N","rduTaxtPrdDvCd":"00","saleChnlDvCd":"1","fundRskLevlDvCd":"5","fundBascPrc":1071.47,"fundNo":"209102101577","fundPrdNm":"신영마라톤 증권 투자신탁A1(주식)","wrkgShpDvCd":"02","fundSalePrdClasCd":"140","fundRvnRt":7.93,"dfrmTpOpenPossYn":"Y","rsvgOpenPossYn":"Y","seq":5,"newPossYn":"","fundStgupOtxtBal":0.0,"fstStgupDt":"","plniEndDt":"","plniStrDt":""}]}}

				data.outHm.listHm[0].seq 순서
				data.outHm.listHm[0].fundNo 펀드번호
				data.outHm.listHm[0].fundPrdNm 펀드상품명
				data.outHm.listHm[0].fundRskLevlDvCd 펀드위험수준구분코드
				data.outHm.listHm[0].fundRvnRt 펀드수익율
				data.outHm.listHm[0].fundStgupOtxtBal 펀드설정원본잔액
				data.outHm.listHm[0].newPossYn 신규가능여부
				data.outHm.listHm[0].afcoFundYn 계열사펀드여부
				data.outHm.listHm[0].itntNtryPossYn 인터넷가입가능여부
				data.outHm.listHm[0].fstStgupDt 최초설정일자
				data.outHm.listHm[0].dfrmTpOpenPossYn 거치식개설가능여부
				data.outHm.listHm[0].vltpOpenPossYn 임의식개설가능여부
				data.outHm.listHm[0].rsvgOpenPossYn 적립식개설가능여부
				data.outHm.listHm[0].taxPrimPossYn 세금우대가능여부
				data.outHm.listHm[0].lvhTpPossYn 생계형가능여부
				data.outHm.listHm[0].wrkgShpDvCd 운용형태구분코드
				data.outHm.listHm[0].rduTaxtPrdDvCd 감면과세상품구분코드
				data.outHm.listHm[0].fundSalePrdClasCd 펀드판매상품분류코드
				data.outHm.listHm[0].fundBascPrc 펀드기준가
				data.outHm.listHm[0].plniStrDt 모집시작일자
				data.outHm.listHm[0].plniEndDt 모집종료일자
				data.outHm.listHm[0].saleChnlDvCd 판매채널구분코드
*/

/*				
				환율/금리/수익률/시세

				업무 : 월간 인기 판매 펀드
				호출 URL : /cms/fxd/wpfxd669_02i.do?procDvCd=001&adtnDvCd=121&fundRvnRtTrmInqDvCd=01&divition=0
				procDvCd 001
				adtnDvCd 121:인터넷펀드, 122:전체펀드
				fundRvnRtTrmInqDvCd 01
				divition 0:국내, 1:해외
				결과값
				{"outHm":{"listHm":[{"itntNtryPossYn":"Y","lvhTpPossYn":"Y","vltpOpenPossYn":"N","taxPrimPossYn":"Y","afcoFundYn":"N","rduTaxtPrdDvCd":"00","saleChnlDvCd":"1","fundRskLevlDvCd":"5","fundBascPrc":334.05,"fundNo":"105106103424","fundPrdNm":"삼성KOSPI200인버스인덱스증권투자신탁제1호(채권-파생형)A","wrkgShpDvCd":"06","fundSalePrdClasCd":"113","fundRvnRt":-5.59,"dfrmTpOpenPossYn":"Y","rsvgOpenPossYn":"Y","seq":1,"newPossYn":"","fundStgupOtxtBal":2.2369382453E10,"fstStgupDt":"","plniEndDt":"","plniStrDt":""},{"itntNtryPossYn":"Y","lvhTpPossYn":"Y","vltpOpenPossYn":"N","taxPrimPossYn":"Y","afcoFundYn":"N","rduTaxtPrdDvCd":"00","saleChnlDvCd":"1","fundRskLevlDvCd":"1","fundBascPrc":1002.23,"fundNo":"213101103697","fundPrdNm":"한화단기국공채증권투자신탁(채권)ClassA","wrkgShpDvCd":"01","fundSalePrdClasCd":"110","fundRvnRt":0.41,"dfrmTpOpenPossYn":"Y","rsvgOpenPossYn":"Y","seq":2,"newPossYn":"","fundStgupOtxtBal":9.453772379E9,"fstStgupDt":"","plniEndDt":"","plniStrDt":""},{"itntNtryPossYn":"Y","lvhTpPossYn":"Y","vltpOpenPossYn":"N","taxPrimPossYn":"Y","afcoFundYn":"N","rduTaxtPrdDvCd":"00","saleChnlDvCd":"4","fundRskLevlDvCd":"5","fundBascPrc":1097.15,"fundNo":"301102103411","fundPrdNm":"미래에셋스마트롱숏70증권자투자신탁1호(주식)ClassAe","wrkgShpDvCd":"02","fundSalePrdClasCd":"140","fundRvnRt":2.99,"dfrmTpOpenPossYn":"Y","rsvgOpenPossYn":"Y","seq":3,"newPossYn":"","fundStgupOtxtBal":3.1291299E9,"fstStgupDt":"","plniEndDt":"","plniStrDt":""},{"itntNtryPossYn":"Y","lvhTpPossYn":"Y","vltpOpenPossYn":"N","taxPrimPossYn":"N","afcoFundYn":"N","rduTaxtPrdDvCd":"00","saleChnlDvCd":"4","fundRskLevlDvCd":"2","fundBascPrc":1054.21,"fundNo":"232101104281","fundPrdNm":"NH-CA국채10년인덱스증권자투자신탁[채권]ClassCe","wrkgShpDvCd":"01","fundSalePrdClasCd":"110","fundRvnRt":2.19,"dfrmTpOpenPossYn":"Y","rsvgOpenPossYn":"Y","seq":4,"newPossYn":"","fundStgupOtxtBal":1.565311994E9,"fstStgupDt":"","plniEndDt":"","plniStrDt":""},{"itntNtryPossYn":"Y","lvhTpPossYn":"Y","vltpOpenPossYn":"N","taxPrimPossYn":"N","afcoFundYn":"N","rduTaxtPrdDvCd":"00","saleChnlDvCd":"4","fundRskLevlDvCd":"2","fundBascPrc":1020.5,"fundNo":"207101104291","fundPrdNm":"교보악사Tomorrow장기우량증권투자신탁K-1호(채권)ClassCE","wrkgShpDvCd":"01","fundSalePrdClasCd":"110","fundRvnRt":1.02,"dfrmTpOpenPossYn":"Y","rsvgOpenPossYn":"Y","seq":5,"newPossYn":"","fundStgupOtxtBal":1.164964466E9,"fstStgupDt":"","plniEndDt":"","plniStrDt":""},{"itntNtryPossYn":"Y","lvhTpPossYn":"Y","vltpOpenPossYn":"N","taxPrimPossYn":"N","afcoFundYn":"N","rduTaxtPrdDvCd":"00","saleChnlDvCd":"4","fundRskLevlDvCd":"4","fundBascPrc":1014.85,"fundNo":"301103104463","fundPrdNm":"미래에셋스마트롱숏50증권자투자신탁1호(주식혼합)ClassAe","wrkgShpDvCd":"03","fundSalePrdClasCd":"130","fundRvnRt":2.33,"dfrmTpOpenPossYn":"Y","rsvgOpenPossYn":"Y","seq":6,"newPossYn":"","fundStgupOtxtBal":7.45477509E8,"fstStgupDt":"","plniEndDt":"","plniStrDt":""},{"itntNtryPossYn":"Y","lvhTpPossYn":"Y","vltpOpenPossYn":"N","taxPrimPossYn":"N","afcoFundYn":"N","rduTaxtPrdDvCd":"00","saleChnlDvCd":"4","fundRskLevlDvCd":"3","fundBascPrc":1008.43,"fundNo":"301104104471","fundPrdNm":"미래에셋스마트롱숏30증권자투자신탁1호(채권혼합)ClassCe","wrkgShpDvCd":"04","fundSalePrdClasCd":"120","fundRvnRt":1.35,"dfrmTpOpenPossYn":"Y","rsvgOpenPossYn":"Y","seq":7,"newPossYn":"","fundStgupOtxtBal":7.11837046E8,"fstStgupDt":"","plniEndDt":"","plniStrDt":""},{"itntNtryPossYn":"Y","lvhTpPossYn":"Y","vltpOpenPossYn":"N","taxPrimPossYn":"Y","afcoFundYn":"N","rduTaxtPrdDvCd":"00","saleChnlDvCd":"4","fundRskLevlDvCd":"2","fundBascPrc":1011.4,"fundNo":"213101102947","fundPrdNm":"한화코리아밸류채권증권자투자신탁(채권)ClassC-e","wrkgShpDvCd":"01","fundSalePrdClasCd":"110","fundRvnRt":0.7,"dfrmTpOpenPossYn":"Y","rsvgOpenPossYn":"Y","seq":8,"newPossYn":"","fundStgupOtxtBal":2.72691935E8,"fstStgupDt":"","plniEndDt":"","plniStrDt":""},{"itntNtryPossYn":"Y","lvhTpPossYn":"Y","vltpOpenPossYn":"N","taxPrimPossYn":"Y","afcoFundYn":"N","rduTaxtPrdDvCd":"00","saleChnlDvCd":"4","fundRskLevlDvCd":"4","fundBascPrc":991.98,"fundNo":"363103103430","fundPrdNm":"트러스톤다이나믹코리아50증권자투자신탁(주식혼합)ClassCe","wrkgShpDvCd":"03","fundSalePrdClasCd":"130","fundRvnRt":2.17,"dfrmTpOpenPossYn":"Y","rsvgOpenPossYn":"Y","seq":9,"newPossYn":"","fundStgupOtxtBal":1.41695351E8,"fstStgupDt":"","plniEndDt":"","plniStrDt":""},{"itntNtryPossYn":"Y","lvhTpPossYn":"Y","vltpOpenPossYn":"N","taxPrimPossYn":"N","afcoFundYn":"N","rduTaxtPrdDvCd":"00","saleChnlDvCd":"4","fundRskLevlDvCd":"3","fundBascPrc":1014.04,"fundNo":"209104104560","fundPrdNm":"신영밸류고배당40증권자투자신탁[채권혼합]Ce","wrkgShpDvCd":"04","fundSalePrdClasCd":"140","fundRvnRt":2.61,"dfrmTpOpenPossYn":"Y","rsvgOpenPossYn":"Y","seq":10,"newPossYn":"","fundStgupOtxtBal":8.4526301E7,"fstStgupDt":"","plniEndDt":"","plniStrDt":""}]}}

				data.outHm.listHm[0].seq 순서
				data.outHm.listHm[0].fundNo 펀드번호
				data.outHm.listHm[0].fundPrdNm 펀드상품명
				data.outHm.listHm[0].fundRskLevlDvCd 펀드위험수준구분코드
				data.outHm.listHm[0].fundRvnRt 펀드수익율
				data.outHm.listHm[0].fundStgupOtxtBal 펀드설정원본잔액
				data.outHm.listHm[0].newPossYn 신규가능여부
				data.outHm.listHm[0].afcoFundYn 계열사펀드여부
				data.outHm.listHm[0].itntNtryPossYn 인터넷가입가능여부
				data.outHm.listHm[0].fstStgupDt 최초설정일자
				data.outHm.listHm[0].dfrmTpOpenPossYn 거치식개설가능여부
				data.outHm.listHm[0].vltpOpenPossYn 임의식개설가능여부
				data.outHm.listHm[0].rsvgOpenPossYn 적립식개설가능여부
				data.outHm.listHm[0].taxPrimPossYn 세금우대가능여부
				data.outHm.listHm[0].lvhTpPossYn 생계형가능여부
				data.outHm.listHm[0].wrkgShpDvCd 운용형태구분코드
				data.outHm.listHm[0].rduTaxtPrdDvCd 감면과세상품구분코드
				data.outHm.listHm[0].fundSalePrdClasCd 펀드판매상품분류코드
				data.outHm.listHm[0].fundBascPrc 펀드기준가
				data.outHm.listHm[0].plniStrDt 모집시작일자
				data.outHm.listHm[0].plniEndDt 모집종료일자
				data.outHm.listHm[0].saleChnlDvCd 판매채널구분코드
*/
			};
		} // getResult -End
	};
}();