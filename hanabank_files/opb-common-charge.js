/*****************************************************************************
 * 파일명 : opb-common-charge.js
 * 작성일 : 2015-11-11
 * 작성자 : 오범석
 * 설  명 : 수수료 납부 관련
 * ===========================================================================
 * 변경이력:
 * DATE             AUTHOR      DESCRIPTION
 * ---------------------------------------------------------------------------
 * 변경 이력은 이곳에 추가 합니다.
 *****************************************************************************/

pbk.common.charge = function() {
	
	/** 수수료 면제조회 팝업 아이디 */
	var myFreeChargePopupId = 'popupInquiryFreeFeeList';
	
	/** 하나멤버스 쿠폰 목록 팝업 아이디 */
	var membersCouponPopupId = 'hanaMembersCouponListPopup';
	
	var chkVitualCommaKeyInterval = null;
	
	var self = this;
	
	return {

		// [START] 커스텀태그에서 지정하는 변수 선언 (with Default Value) //
		/** 포인트상품대분류코드 */
		pointCdNm : '',
		/** 포인트 출력 div (prefix) id */
		printPointPrefixId : '',
		/** 포인트 사용 여부 */
		usePointNm : '',
		/** 포인트 사용 가능 금액 */
		amountUsablePointNm : '',
		/** 멤버쉽쿠폰일련번호 */
		mbshCponSeqNo : '',
		/** 캐쉬백처리여부 (예적금에서 사용) */
		cshbProcYn : '',
		/** 캐쉬백처리여부 (공과금에서 사용) */
		cshbUseYn : '',
		/** 사용포인트입력 아이디 */
		inputId : '',
		// [E N D] 커스텀태그에서 지정하는 변수 선언 (with Default Value) //
		
		/**
		 * 수수료 면제조회 팝업 <br/>
		 * <pre>수수료 출금계좌에 대한 조회</pre>
		 * @param {String} acctId 계좌
		 */
	    openPopMyFreeCharge : function(acctId, backID) {
	    	var $jAcct = $j('#' + acctId);
	    	if(opb.common.util.isEmpty_fnc($jAcct.val())) {
               	opb.common.layerpopup.openMessage_fnc({
                    isConfirm	: false,
                    title		: '선택',
                    message		: '출금계좌를 선택하신 뒤 면제조회버튼을 눌러주시기 바랍니다.',
                    clickObj	: backID
                });
                return;
	    	}
	    	
	    	var oSendForm = form.createForm([{id:'acctNo', value: $jAcct.val()}]);
			var url = opb.base.APPLICATION_CONTEXT_ROOT + '/transfer/inquiry/wpdep415_37p.do';			
			opb.common.layerpopup.openLayer_fnc(url, myFreeChargePopupId,  null, oSendForm, backID);
	    }, //[end]pbk.common.charge.openPopMyFreeCharge

	    /**
	     * 수수료/포인트 수단 선택에 따른 초기화
	     */
	    initCharge : function() {
	    	$j('[id^="' + pbk.common.charge.printPointPrefixId + '"]').hide();
	    	$j('#' + pbk.common.charge.amountUsablePointNm).val('');
			$j('#' + pbk.common.charge.mbshCponSeqNo).val(''); 	// 멤버쉽쿠폰 초기화
	    	$j('#' + pbk.common.charge.usePointNm).val('N'); 	// 포인트 사용 설정
	    	$j('#' + pbk.common.charge.cshbProcYn).val('N'); 	// 예적금 신규가입시 카드포인트 사용 설정
	    	$j('#' + pbk.common.charge.cshbUseYn).val('N'); 	//  공과금  카드포인트 사용 설정
	    	$j('#' + pbk.common.charge.inputId).attr('disabled', 'disabled'); // 사용포인트입력 아이디
	    }, //[end]pbk.common.charge.initCharge
	    
	    /**
	     * 포인트 사용조회
	     * @param {String} formId 폼객체 아이디
	     * @param {String} divId 포인트출력 아이디
	     * @param {String} pintPrdLclasCd 포인트상품대분류코드
	     * @param {Object} backID 클릭객체(or 아이디)
	     */
	    inquiryUsablePoint : function(formId, divId, pintPrdLclasCd, backID) {
			
	    	// 조회 전 영역 초기화
	    	pbk.common.charge.initCharge();
	    	
			var _point = $j('#_' + pbk.common.charge.amountUsablePointNm + pintPrdLclasCd).val();
			
			if(_point == 0) {
				// 이전 조회값이 0 이면 안내 및 포인트 사용 설정 제거
				pbk.common.charge.alertZeroPoint(backID, pintPrdLclasCd);
				return;
			}else if(_point != -1) {
				// 이전 조회값이 있으므로 재조회 하지 않고, 그대로 출력
				$j('#' + divId).show();
		    	// 포인트 사용 설정
		    	$j('#' + pbk.common.charge.usePointNm).val('Y');
				// 예적금 신규가입시 카드포인트 사용 설정
		    	$j('#' + pbk.common.charge.cshbProcYn).val('Y');
				// 공과금 카드포인트 사용 설정
		    	$j('#' + pbk.common.charge.cshbUseYn).val('Y');
		    	// 사용포인트입력 아이디
		    	$j('#' + pbk.common.charge.inputId).removeAttr('disabled');
		    	// 포인트 가용금액
		    	$j('#' + pbk.common.charge.amountUsablePointNm).val(_point);
				return;
			}
			
			// 하나 포인트 or 하나 OCB포인트 or 하나머니 가져 오기
			var oSendForm = form.createForm([ {
				id : 'formObjId',
				value : formId
			}, {
				id : 'divId',
				value : divId
			}, {
				id : 'pintPrdLclasCd',
				value : pintPrdLclasCd
			} ]);
			
			var url = opb.base.APPLICATION_CONTEXT_ROOT + '/common/comSpendablePointAction.do';
			var hanaAjax = new hana.JHanaAjax(divId, true, true);
			hanaAjax.ajaxSubmit(url, oSendForm, true, function(res, option) {

				// Json타입으로 변환
				var _data = eval('(' + res.responseText + ')');
				
				// 하나OCB포인트 회원이 아닐경우 처리
				if (_data.OCB_ERR_CD == 'BEBK98000') {
					opb.common.layerpopup.openMessage_fnc({
						isConfirm : false,
						title : '포인트 안내',
						message : _data.OCB_ERR_MSG,
						callback : function(e) {
					    	if($j('#' + pbk.common.charge.pointCdNm + pintPrdLclasCd).attr('checked') == 'checked') {
					    		$j('#' + pbk.common.charge.pointCdNm + pintPrdLclasCd).removeAttr('checked');
					    	}
					    	// 더이상 조회하지 못하도록 처리
					    	$j('#' + pbk.common.charge.pointCdNm + pintPrdLclasCd).attr('disabled', 'disabled');
						},
						clickObj : backID
					});
					return;
				//하나머니 일 경우만 에러처리 한다 (ComSpendablePointAction.java)
				}else if(_data.OCB_ERR_CD != '' && _data.OCB_ERR_CD != null){
					opb.common.layerpopup.openMessage_fnc({
						isConfirm : false,
						title : '하나머니 안내',
						message : _data.OCB_ERR_MSG,
						callback : function(e) {
				    		// 라디오 체크를 출금계좌로 처리
				    		$j('input[id^="' + pbk.common.charge.pointCdNm + '"]').removeAttr('checked');
				    		$j('#' + pbk.common.charge.pointCdNm + '00').attr('checked', 'checked'); //출금계좌 선택처리. 강결합?
						},
						clickObj : backID
					});
					return;
				// 일반적인 포인트 조회값이 0 일경우 처리
				}else if (parseInt(_data.trscAfRmndPint, 10) == 0) {
					pbk.common.charge.alertZeroPoint(backID, pintPrdLclasCd);
					return;
				}
				
				$j('#' + pbk.common.charge.amountUsablePointNm).val(_data.trscAfRmndPint);
				$j('#_' + pbk.common.charge.amountUsablePointNm + pintPrdLclasCd).val(_data.trscAfRmndPint);

				$j('#' + divId).html(function() {
					var _h = [];
					_h[_h.length] = '(이용가능머니 : ';
					_h[_h.length] = opb.common.util.changeFormatCurrency_fnc(_data.trscAfRmndPint.toString());
					_h[_h.length] = ' 머니)';
					return _h.join('');
				}).show();
				
				// 하나머니가 아닌 경우 포인트로 표현.. DAY2 이후 포인트 제거로 제거해도 됨..??
				if (_data.pintPrdLclasCd != '03') {
					$j('#' + divId).html(function() {
						var _h = [];
						_h[_h.length] = '(이용가능포인트 : ';
						_h[_h.length] = opb.common.util.changeFormatCurrency_fnc(_data.trscAfRmndPint.toString());
						_h[_h.length] = ' point)';
						return _h.join('');
					}).show();
				}
				
		    	// 포인트 사용 설정
		    	$j('#' + pbk.common.charge.usePointNm).val('Y');

				// 예적금 신규가입시 카드포인트 사용 설정
		    	$j('#' + pbk.common.charge.cshbProcYn).val('Y');

				// 공과금 카드포인트 사용 설정
		    	$j('#' + pbk.common.charge.cshbUseYn).val('Y');
		    	
		    	// 사용포인트입력 아이디
		    	$j('#' + pbk.common.charge.inputId).removeAttr('disabled');

			}, 'euc-kr');

		}, //[end]pbk.common.charge.inquiryUsablePoint

		/**
         * 가상키페드 클릭시 금액형태 표시
         */
        chkVitualCommaKey : function(formObj, obj){
        	
        	if(!opb.common.util.getBrowserInfo().MSIE) {
    			
        		if(chkVitualCommaKeyInterval != null) {
        			clearInterval(chkVitualCommaKeyInterval);
        			chkVitualCommaKeyInterval = null;
        		}
        		
    			chkVitualCommaKeyInterval = setInterval(function() {
    				input.toMoney(obj);
    				
    				var $objLayout = $j("#Tk_"+obj.id+"_layoutSingle");
    				var tkVisibility = $objLayout.css("visibility");
    				
   					//console.log(tkVisibility +":"+ "visible"+":"+(tkVisibility != undefined && tkVisibility != "visible"));
    				if(tkVisibility != undefined && tkVisibility != "visible" && (typeof $objLayout.find('img').attr('data-load-cnt') == "undefined")) {
		        		if(chkVitualCommaKeyInterval != null) {
		        			clearInterval(chkVitualCommaKeyInterval);
		        			chkVitualCommaKeyInterval = null;
		        		}
    				}
    				
    			}, 300);
        	}
        },
        
		/**
		 * 포인트(하나머니) 잔액이 0(Zero) 일경우 안내
		 * @param {Object} backID 클릭객체(or 아이디)
	     * @param {String} pintPrdLclasCd 포인트상품대분류코드
		 */
		alertZeroPoint : function(backID, pintPrdLclasCd) {
			var titleNm = '하나머니 안내';
			var msg = '하나머니 잔액이 0원입니다. 하나머니를 사용하실 수 없습니다.';
			
			// 하나머니가 아닌 경우 포인트로 표현.. DAY2 이후 포인트 제거로 제거해도 됨..??
			if (pintPrdLclasCd && pintPrdLclasCd != '03') {
				titleNm = '포인트 안내';
				msg = '포인트잔액이 0원입니다. 포인트를 사용하실 수 없습니다.';
			}

			opb.common.layerpopup.openMessage_fnc({
				isConfirm : false,
				title : titleNm,
				message : msg,
				callback : function(e) {
		    		// 라디오 체크를 출금계좌로 처리
		    		$j('input[id^="' + pbk.common.charge.pointCdNm + '"]').removeAttr('checked');
		    		$j('#' + pbk.common.charge.pointCdNm + '00').attr('checked', 'checked'); //출금계좌 선택처리. 강결합?
				},
				clickObj : backID
			});
		}, //[end]pbk.common.charge.alertZeroPoint
	    
	    /**
	     * 하나멤버스쿠폰 조회 팝업 호출
	     * @param {String} formId 폼객체 아이디
	     * @param {String} divId 포인트출력 아이디
	     * @param {String} pintPrdLclasCd 포인트상품대분류코드
	     * @param {Object} backID 클릭객체(or 아이디)
	     */
	    openPopMembersCoupon : function(formId, divId, pintPrdLclasCd, backID) {
	    	
	    	// 하나멤버스쿠폰 라디오가 선택이 안되었을 때 선택처리
	    	if($j('#' + pbk.common.charge.pointCdNm + pintPrdLclasCd).attr('checked') != 'checked') {
	    		$j('#' + pbk.common.charge.pointCdNm + pintPrdLclasCd).attr('checked', 'checked');
	    	}
	    	
			var url = opb.base.APPLICATION_CONTEXT_ROOT + '/common/comSpendablePointAction.do';
			var oSendForm = form.createForm([ {
				id : 'formObjId',
				value : formId
			}, {
				id : 'divId',
				value : divId
			}, {
				id : 'pintPrdLclasCd',
				value : pintPrdLclasCd
			} ]);

			opb.common.layerpopup.openLayer_fnc(url, membersCouponPopupId, null, oSendForm, backID);	    	
	    }, //[end]pbk.common.charge.openPopMembersCoupon
	    
		/**
		 * 쿠폰번호를 직접 선택하여 결정
		 * @param {String} couponNo 하나멤버스쿠폰번호
		 * @param {String} mbshCponSeqNoId 하나멤버스쿠폰 폼파라미터 아이디
		 */
		setSelectedCoupon : function(couponNo, mbshCponSeqNoId) {
			if(opb.common.util.isEmpty_fnc(mbshCponSeqNoId)) {
				mbshCponSeqNoId = pbk.common.charge.mbshCponSeqNo;
			}

			if(opb.common.util.isEmpty_fnc(couponNo)) {
	    		// 라디오 체크를 출금계좌로 처리
	    		$j('input[id^="' + pbk.common.charge.pointCdNm + '"]').removeAttr('checked');
	    		$j('#' + pbk.common.charge.pointCdNm + '00').attr('checked', 'checked');
			}else {
				$j('#' + mbshCponSeqNoId).val(couponNo);
			}
			// close popup
			opb.common.layerpopup.closeLayer_fnc(membersCouponPopupId);
			
		}, //[end]pbk.common.charge.setSelectedCoupon

		/**
		 * 쿠폰선택 후 확인을 통해 결정
		 * @param {String} radioNm 쿠폰선택 라디오 명
		 * @param {String} mbshCponSeqNoId 하나멤버스쿠폰 폼파라미터 아이디
		 */
		confirmCoupon : function(radioNm, mbshCponSeqNoId) {
			
			var couponNo = $j('input[name="' + radioNm + '"]:checked').val();
			pbk.common.charge.setSelectedCoupon(couponNo, mbshCponSeqNoId);
			
		}, //[end]pbk.common.charge.confirmCoupon
	    
		empty : null //, 에러 방지용 선언
		
	}//end of return;
}();
