/*****************************************************************************
 * 파일명 : pbk-common-cashbag.js
 * 작성일 : 2008. 04. 19
 * 작성자 : ej
 * 설   명 : pbk-common.js 를 기능별 분리. * 
 * ===========================================================================
 * 변경이력:하나 OCB 포인트사용추가함.
 * DATE				AUTHOR		DESCRIPTION
 * ---------------------------------------------------------------------------
 * 변경 이력은 이곳에 추가 합니다.
 *****************************************************************************/

/**
 * 이체정보에 필요한 공통script를 정의
 * Geunwon, Mo
 */
pbk.common.cashbag = function() {
    return{
        /**
         * 하나캐쉬백 조회
         */
        showHanaCashbag : function(formObjId,divId){
//            formObj = $(formObjId);
//            
//            if (formObj.isHanaCashbag.checked == true) {
//                formObj.isHanaCashbag.value = 'Y';
//                
//                var divObj = $(divId);
//
//                // 하나캐쉬백 포인트 가져 오기
//                var url = opb.base.APPLICATION_CONTEXT_ROOT  + "/common/comSpendableCashbagPointAction.do";
//                var hanaAjax = new hana.JHanaAjax(divId, true, true);
//                var codeForm = form.createForm([{id:'formObjId',value: formObjId},{id:'divId',value: divId}]);
//                
//                if (formObj._trscAfRmndPint.value == -1){
//                    hanaAjax.ajaxSubmit( url, codeForm, true, pbk.common.cashbag.showHanaPoint, 'euc-kr' );
//                } else {
//                    pbk.common.cashbag.showHanaPointWithoutInvoke(formObjId,divId);   
//                }
//            
//            } else {
//                $(divId).style.display= "none";
//                
//                formObj.isHanaCashbag.value = 'N';
//                formObj.trscAfRmndPint.value = "";
//                $(divId).innerHTML = "";
//            }
           formObj = $(formObjId);
           
           if (formObj.isHanaCashbag.checked == true) {
               formObj.isHanaCashbag.value = 'Y';
               
               var divObj = $(divId);

               // 하나캐쉬백 포인트 가져 오기
               var url = opb.base.APPLICATION_CONTEXT_ROOT  + "/common/comSpendablePointAction.do";
               var hanaAjax = new hana.JHanaAjax(divId, true, true);
               var codeForm = form.createForm([{id:'formObjId',value: formObjId},{id:'divId',value: divId}]);
               
               if (formObj._trscAfRmndPint.value == -1){
                   hanaAjax.ajaxSubmit( url, codeForm, true, pbk.common.cashbag.showHanaPoint, 'euc-kr' );
               } else {
                   pbk.common.cashbag.showHanaPointWithoutInvoke(formObjId,divId);   
               }
           
           } else {
               $(divId).style.display= "none";
               
               formObj.isHanaCashbag.value = 'N';
               formObj.trscAfRmndPint.value = "";
               $j('#fullPointHidden').val("");
               $(divId).innerHTML = "";
           } 
        },
        
        showHanaPoint : function( res, option ){
        
            // Return 데이터 Json타입 체크
            //opb.common.ajax.parseAjaxData_fnc(res, true);

            // Json타입으로 변환
            var _data = eval('(' + res.responseText + ')');
			
			formObj = $(_data.formObjId);
			
			if (parseInt(_data.trscAfRmndPint,10) == 0){
				opb.common.layerpopup.openMessage_fnc({
	                isConfirm: false,
	                title    : '포인트 안내',
	                message  : '포인트잔액이 0원입니다. 포인트를 사용하실 수 없습니다.',
	                callback : function(e)  {
	                    if (e){     // 확인버튼 클릭시
                        	formObj.isHanaCashbag.checked = false;
							formObj.isHanaCashbag.disabled = true;
							return;
	                    }
	                }
	            });
				formObj.isHanaCashbag.checked = false;
				formObj.isHanaCashbag.disabled = true;
				$j('#fullPointHidden').val("");
				return;
			}
            
            formObj.trscAfRmndPint.value = _data.trscAfRmndPint;
            formObj._trscAfRmndPint.value = _data.trscAfRmndPint;
            $j('#fullPointHidden').val(_data.trscAfRmndPint);
            $(_data.divId).innerHTML = "이용가능 포인트 : " + opb.common.util.changeFormatCurrency_fnc(_data.trscAfRmndPint.toString())  + ' point';//real
            $(_data.divId).style.display= "inline";
            
        },
        
        showHanaPointWithoutInvoke : function(formObjId,divId){
            formObj = $(formObjId);
           
            formObj.trscAfRmndPint.value = formObj._trscAfRmndPint.value;
            $j('#fullPointHidden').val(formObj._trscAfRmndPint.value);
            $(divId).innerHTML = "이용가능 포인트 : " + opb.common.util.changeFormatCurrency_fnc(formObj._trscAfRmndPint.value.toString())  + ' point';//real
            $(divId).style.display= "inline";
        },
        
        
        
        
        /*
         * 하나포인트 & 하나OCB포인트 사용조회
         */
        
        showPintPrdLclas : function(formObjId,divId,pintPrdLclasCd,btnObj,thisObj){
         formObj = $(formObjId);
                  
         //alert(pintPrdLclasCd);
         
         
         
         /*
          * 포인트 조회업무 장애시 임시조치로 막을 경우에 적용함.
          * pintPrdLclasCd : '01' 하나포인트
          * pintPrdLclasCd : '02' 하나OCB포인트
	      * pintPrdLclasCd : '03' 하나머니
          * pintPrdLclasCd : '04' 하나멤버스쿠폰
          */
         
         /*********************************
         if (pintPrdLclasCd == "02") {
        	 
             var divObj = $(divId);
             var pintPrdLclasCdObj = $(pintPrdLclasCd);
        	 formObj.pintPrdLclasCd.value = pintPrdLclasCd;
        	 
				pbk.extJS.messageBox.infoMsgBox({
	                isConfirm: false,
	                title    : '포인트 안내',
	                message  : '현재 하나카드사의 포인트시스템 점검중으로 <br />하나OCB포인트 거래 사용이 지연되고있습니다.',
	                callback : function(e)  {
	                    if (e){     // 확인버튼 클릭시
	                        $(divId).style.display= "none";
		                    $(divId).innerHTML = "";
		                	formObj.pintPrdLclasCd[1].checked = false;
		    				formObj.pintPrdLclasCd[1].disabled = true;
							return;
	                    }
	                }
	            });
				return;
				
         }else if (pintPrdLclasCd == "01") {
        	 
         **********************/
         
        	if (pintPrdLclasCd == "01" || pintPrdLclasCd == "02" || pintPrdLclasCd == "03") {
        	 formObj.isHanaCashbag.value = 'Y';
        	 formObj.pintPrdLclasCd.value = pintPrdLclasCd;
        	 
        	 // 예적금 신규가입시 카드포인트 사용변수 세팅
        	 if ((divId == "hanaCashbag_1") || (divId == "hanaCashbag_2") || (divId == "hanaCashbag_3")) {
        		 formObj.cshbProcYn.value = 'Y';
        	 }

             if( formObj.mbshCponSeqNo != undefined){
                 formObj.mbshCponSeqNo.value = '';
             }
             
             var divObj = $(divId);
             var pintPrdLclasCdObj = $(pintPrdLclasCd);

             // 하나 포인트 or 하나 OCB포인트 가져 오기
             var url = opb.base.APPLICATION_CONTEXT_ROOT  + "/common/comSpendablePointAction.do";
             var hanaAjax = new hana.JHanaAjax(divId, true, true);
             var codeForm = form.createForm([{id:'formObjId',value: formObjId},{id:'divId',value: divId},{id:'pintPrdLclasCd',value: pintPrdLclasCd}]);
             
             if ((formObj._trscAfRmndPint.value == -1) || (formObj._trscAfRmndPint.value > 0)){ 
                 hanaAjax.ajaxSubmit( url, codeForm, true, function(res, option){
                     // Return 데이터 Json타입 체크
                     // opb.common.ajax.parseAjaxData_fnc(res, true);

                     // Json타입으로 변환
                     var _data = eval('(' + res.responseText + ')');
                     
           			//formObj = $(_data.formObjId);
                     	formObj = document.forms[_data.formObjId];
           			
                     	// 하나OCB포인트 회원이 아닐경우 처리 
                   	if (_data.OCB_ERR_CD == 'BEBK98000') {
           				opb.common.layerpopup.openMessage_fnc({
           			        isConfirm: false,
           			        title    : '포인트 안내',
           			        message  : _data.OCB_ERR_MSG,
           			        callback : function(e)  {
           			            if (e){     // 확인버튼 클릭시
           			            	// alert(_data.pintPrdLclasCd);
           			            	formObj.pintPrdLclasCd[1].checked = false;  // 하나OCB포인트 레디오박스를 초기화 시킨다.							
//           							formObj.pintPrdLclasCd[1].disabled = true;  // 하나OCB포인트 레디오박스를 비활성화 시킨다.			        		
           			            }
           			        },
           			        clickObj : btnObj
           			    });
           				$(_data.divId).style.display= "none";
           			    $(_data.divId).innerHTML = "";
           			    formObj.isHanaCashbag.value = 'N';
           			    formObj.useCashBagPoint.value = '';
           			    formObj.trscAfRmndPint.value = "";
           			    $j('#fullPointHidden').val("");
           			    if (thisObj != undefined && thisObj != null && thisObj != '') {
           			    	pbk.common.cashbag.checkCashbackToggleDeposit(thisObj);
           			    }
           				return;
                   	}
                   	else if (parseInt(_data.trscAfRmndPint,10) == 0){ // 일반적인 포인트 조회값이 0 일경우 처리
                   		var titleNm ;
        				var msg;
        		    	if (_data.pintPrdLclasCd == "03") {
        		    		titleNm = "하나머니 안내";
        		    		msg = "하나머니 잔액이 0원입니다. 하나머니를 사용하실 수 없습니다.";
        		    	}else{
        		    		titleNm = "포인트 안내";
        		    		msg = "포인트잔액이 0원입니다. 포인트를 사용하실 수 없습니다.";
        		    	}
        		    	
				   		opb.common.layerpopup.openMessage_fnc({
		   					isConfirm: false,
		   					title		: titleNm,
		   					message		: msg,
		   					callback	: function(e)  {
				   				/*var addIdx = 0;
				   				if (formObj.pintPrdLclasCd != undefined && formObj.pintPrdLclasCd.length == 3) {
				   					addIdx = 1;
				   				}
	   							if (pintPrdLclasCd == "01") {
	   								formObj.pintPrdLclasCd[0+addIdx].checked = false;  // 하나포인트 레디오박스를 초기화 시킨다.
	   								if (addIdx == 1) {
	   									formObj.pintPrdLclasCd[0].checked = true;  // 디폴트 checked.	
	   								}
	   							}
	   							else if (pintPrdLclasCd == "02") {
	   								formObj.pintPrdLclasCd[1+addIdx].checked = false;  // 하나OCB포인트 레디오박스를 초기화 시킨다.	
	   								if (addIdx == 1) {
	   									formObj.pintPrdLclasCd[0].checked = true;  // 디폴트 checked.	
	   								}						
	   							}
	   							else if (pintPrdLclasCd == "03") {
	   								formObj.pintPrdLclasCd[0].checked = false;  // 하나OCB포인트 레디오박스를 초기화 시킨다.	
	   							}*/
		   						
		   						//선택된 라디오박스를 초기화 시킨다.
		   						$j('input[name="pintPrdLclasCd"]:checked').attr("checked", false);
		   					},
		   					clickObj : btnObj
		   				});
		   				$(_data.divId).style.display= 'none';
		   				$(_data.divId).innerHTML = '';
		   				formObj.isHanaCashbag.value = 'N';
		   				formObj.trscAfRmndPint.value = '';
		   				$j('#fullPointHidden').val("");
		   				if((typeof formObj.useCashBagPoint) != 'undefined') {
		   					formObj.useCashBagPoint.value = '';
		   				}
		   				if (thisObj != undefined && thisObj != null && thisObj != '') {
           			    	pbk.common.cashbag.checkCashbackToggleDeposit(thisObj);
           			    }
		   				return;
           			}
                     
                     formObj.trscAfRmndPint.value = _data.trscAfRmndPint;
                     formObj._trscAfRmndPint.value = _data.trscAfRmndPint;
                     $j('#fullPointHidden').val(_data.trscAfRmndPint);
                     
                     if (_data.pintPrdLclasCd == "01") {
                   	  $(_data.divId).innerHTML = "(이용가능포인트 : " + opb.common.util.changeFormatCurrency_fnc(_data.trscAfRmndPint.toString())  + ' point)';//real
                     } else {
                   	  $(_data.divId).innerHTML = "(이용가능포인트 : " + opb.common.util.changeFormatCurrency_fnc(_data.trscAfRmndPint.toString())  + ' point)';//real  
                     }          
                     $(_data.divId).style.display= "inline";
                     if (thisObj != undefined && thisObj != null && thisObj != '') {
    			    	pbk.common.cashbag.checkCashbackToggleDeposit(thisObj);
    			    }
                 }, 'euc-kr' );
                 
                 
             } else {
                 pbk.common.cashbag.showPintPrdLclasWithoutInvoke(formObjId,divId,pintPrdLclasCd);   
             }             

         } else {
             $(divId).style.display= "none";
             $(divId).innerHTML = "";
             formObj.isHanaCashbag.value = 'N';
             formObj.useCashBagPoint.value = '';
             formObj.trscAfRmndPint.value = "";
             $j('#fullPointHidden').val("");
             formObj.pintPrdLclasCd[0].checked = false;  // 하나포인트 체크박스를 초기화 시킨다.
             formObj.pintPrdLclasCd[1].checked = false;  // 하나OCB포인트 체크박스를 초기화 시킨다.
             formObj.pintPrdLclasCd[2].checked = false;  // 하나머니 체크박스를 초기화 시킨다.
         } 

      },
      
      showPintPrd : function( res, option ){
      
          // Return 데이터 Json타입 체크
          // opb.common.ajax.parseAjaxData_fnc(res, true);

          // Json타입으로 변환
          var _data = eval('(' + res.responseText + ')');
          
			//formObj = $(_data.formObjId); 
          	formObj = document.forms[_data.formObjId];
			
          	// 하나OCB포인트 회원이 아닐경우 처리 
        	if (_data.OCB_ERR_CD == 'BEBK98000') {
				opb.common.layerpopup.openMessage_fnc({
			        isConfirm: false,
			        title    : '포인트 안내',
			        message  : _data.OCB_ERR_MSG,
			        callback : function(e)  {
			            if (e){     // 확인버튼 클릭시
			            	// alert(_data.pintPrdLclasCd);
			            	formObj.pintPrdLclasCd[1].checked = false;  // 하나OCB포인트 레디오박스를 초기화 시킨다.							
							formObj.pintPrdLclasCd[1].disabled = true;  // 하나OCB포인트 레디오박스를 비활성화 시킨다.			        		
			            }
			        }
			    });
				$(_data.divId).style.display= "none";
			    $(_data.divId).innerHTML = "";
			    formObj.isHanaCashbag.value = 'N';
			    formObj.useCashBagPoint.value = '';
			    formObj.trscAfRmndPint.value = "";
			    $j('#fullPointHidden').val("");
				return;
        	}
        	else if (parseInt(_data.trscAfRmndPint,10) == 0){ // 일반적인 포인트 조회값이 0 일경우 처리

        		var titleNm ;
        		var msg;
            	if (_data.pintPrdLclasCd == "03") {
            		titleNm = "하나머니 안내";
            		msg = "하나머니 잔액이 0원입니다. 하나머니를 사용하실 수 없습니다.";
            	}else{
            		titleNm = "포인트 안내";
            		msg = "포인트잔액이 0원입니다. 포인트를 사용하실 수 없습니다.";
            	}
            	
        		opb.common.layerpopup.openMessage_fnc({
			        isConfirm: false,
			        title    : titleNm,
			        message  : msg,
			        callback : function(e)  {
			            if (e){     // 확인버튼 클릭시
			            	// alert(_data.pintPrdLclasCd);
			            	if (_data.pintPrdLclasCd == "01") {
			            		formObj.pintPrdLclasCd[0].checked = false;  // 하나포인트 레디오박스를 초기화 시킨다.
			            		formObj.pintPrdLclasCd[0].disabled = true;  // 하나포인트 레디오박스를 비활성화 시킨다.
			            	}else if(_data.pintPrdLclasCd == "02"){
			            		formObj.pintPrdLclasCd[1].checked = false;  // 하나OCB포인트 레디오박스를 초기화 시킨다.							
			            		formObj.pintPrdLclasCd[1].disabled = true;  // 하나OCB포인트 레디오박스를 비활성화 시킨다.			        		
			            	}else if(_data.pintPrdLclasCd == "03"){
			            		if(formObj.pintPrdLclasCd[2] != undefined){
				            		formObj.pintPrdLclasCd[2].checked = false;  // 하나머니 레디오박스를 초기화 시킨다.							
									formObj.pintPrdLclasCd[2].disabled = true;  // 하나머니 레디오박스를 비활성화 시킨다.			        		
			            		}else if(formObj.pintPrdLclasCd != undefined){
				            		formObj.pintPrdLclasCd.checked = false;  
				            		formObj.pintPrdLclasCd.disabled = true;  	
			            		}
			            	}
			            }
			        }
			    });
				$(_data.divId).style.display= "none";
			    $(_data.divId).innerHTML = "";
			    formObj.isHanaCashbag.value = 'N';
			    formObj.useCashBagPoint.value = '';
			    formObj.trscAfRmndPint.value = "";
			    $j('#fullPointHidden').val("");
				return;
			}
          
          formObj.trscAfRmndPint.value = _data.trscAfRmndPint;
          formObj._trscAfRmndPint.value = _data.trscAfRmndPint;
          $j('#fullPointHidden').val(data._trscAfRmndPint);
          
          if (_data.pintPrdLclasCd == "01") {
        	  $(_data.divId).innerHTML = "이용가능포인트 : " + opb.common.util.changeFormatCurrency_fnc(_data.trscAfRmndPint.toString())  + ' point';//real
          }else if(_data.pintPrdLclasCd == "03"){
        	  $(_data.divId).innerHTML = "이용가능머니 : " + pbk.formatCommas(_data.trscAfRmndPint.toString())  + ' 머니';//real
          } else {
        	  $(_data.divId).innerHTML = "이용가능포인트 : " + opb.common.util.changeFormatCurrency_fnc(_data.trscAfRmndPint.toString())  + ' point';//real  
          }          
          $(_data.divId).style.display= "inline";
      },
      
      showPintPrdLclasWithoutInvoke : function(formObjId,divId,pintPrdLclasCd){
          formObj = $(formObjId);

          formObj.trscAfRmndPint.value = formObj._trscAfRmndPint.value;
          $j('#fullPointHidden').val(formObj._trscAfRmndPint.value);
          
          if (pintPrdLclasCd == "01") {
        	  $(divId).innerHTML = "이용가능 포인트 : " + opb.common.util.changeFormatCurrency_fnc(formObj._trscAfRmndPint.value.toString())  + ' point';//real
          }else if(pintPrdLclasCd == "03"){
        	  $(divId).innerHTML = "이용가능 머니 : " + pbk.formatCommas(formObj._trscAfRmndPint.value.toString())  + ' 머니';//real  
          } else {
        	  //$(divId).innerHTML = "이용가능 하나OCB 포인트(OK캐쉬백포인트 포함): " + opb.common.util.changeFormatCurrency_fnc(formObj._trscAfRmndPint.value.toString())  + ' point';//real
        	  $(divId).innerHTML = "이용가능 포인트 : " + opb.common.util.changeFormatCurrency_fnc(formObj._trscAfRmndPint.value.toString())  + ' point';//real
          }          
          
          $(divId).style.display= "inline";
      },
      
      
      /*
       * 하나포인트 레디오박스 토글 (대출이자납입, 대출상환)
       */
      checkCashbackToggle : function (radio){
          if( radio.checked){
        	  if ($('cshbAmt') != undefined) {
        		  $('cshbAmt').disabled = false;
        	  }
        	  if ($('cshbUseAmt') != undefined) {
        		  $('cshbUseAmt').disabled = false;
        	  }
          } else {
        	  if ($('cshbAmt') != undefined) {
        		  $('cshbAmt').disabled = true;
        	  }
        	  if ($('cshbUseAmt') != undefined) {
        		  $('cshbUseAmt').disabled = true;
        	  }
          }
       },

      /*
      * 하나포인트 레디오박스 토글 (예적금/신규가입, 연금신탁신규가입)
      */
     checkCashbackToggleDeposit : function (radio){

    	  if(radio.checked){
    		  if ($('isHanaCashbag') != undefined && $('isHanaCashbag').value != 'Y') {
        		  return;
        	  }
    		   if ($('cshbAmt') != undefined) {
    			   $('cshbAmt').disabled = false;
    		   }
    		   if ($('cshbUseAmt') != undefined) {
    			   $('cshbUseAmt').disabled = false;
    		   }
    	   } else {
    		   if ($('cshbAmt') != undefined) {
    			   $('cshbAmt').disabled = true;
    		   }
    		   if ($('cshbUseAmt') != undefined) {
    			   $('cshbUseAmt').disabled = true;
    		   }
    	   }
     },
     
     /*
      * 쿠폰번호 세팅
      */
      setCouponNo : function (couponNo){
             $('mbshCponSeqNo').value = couponNo;
             pbk.extJS.newPopup.close('hanaMembersCouponListPopup');
     },
     
     /*
     * 쿠폰번호 세팅
     */
     setCouponNo2 : function (formObj){
            $('mbshCponSeqNo').value = radiobox.getCheckedValue(formObj.couponNo);
            pbk.extJS.newPopup.close('hanaMembersCouponListPopup');
    }
        
    }//end of return;
}();   

