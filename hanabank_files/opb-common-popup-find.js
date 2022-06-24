try {
    if(null == pbk.common.popup || undefined == pbk.common.popup) {
         pbk.common.popup = {};
    }
} catch (e) {
    pbk.common.popup = {};
}

/**
 * 공통 - 검색 팝업 - 판구매업체검색
 * 구매카드대출, 매담대/e안심팩토링, 구매자금대출, 미래대/공공구매론 만 사용
 *
 * 전자어음, 전자채권 <- 확인필요
 */
pbk.common.popup.findEnterprise = function() {

    var popupDetailDiv ="popupDetailDiv";

    /**
     * 상품 구분값
     * @see pbk.b2bConst
     */
    var prdctDv = null;

    /**
     * popup url과 list url
     */
    var url = {
        popup : "",
        list : ""
    };


    /**
     * 검색된 업체중 선택 한 업체에 대한 내역을 가지고 있는 adapter Interface object 입니다.
     */
    var enprInfo = {
        //구매카드대출, 매담대/e안심팩토링, 구매자금대출, 미래대/공공구매론
        custNm : "",    //업체명
        rsbzRegNo : "", //사업자번호
        rsbzRegNo2 : "", //변환 된 사업자번호(000-00-00000)
        cenrEntrCd : "", //중심업체코드
        cmtmBussBrNo : "", // 영업점번호
        cmtmBussBrNm : "",  // 약정영업점명

        //구매카드
        entrNm : "",    //업체명
        entrCd : "",    //업체코드
        pchCrdMestNo : ""  //가맹점번호, 카드번호
    };

    /**
     * validate 에서 에러가 발생했는지 확인하는 flag
     */
    var hasErrors = false;
    var errMsg = null;

    /**
     * public
     */
    return {

        /**
         * 초기화 시킵니다.
         */
        init : function(){
            hasErrors = false;
            errMsg = null;

            url = {};

            enprInfo = {};
        },

        /**
         * 상품 구분값 에 따른 업체검색 url set
         * @param dv
         */
        setUrlByPrdctDv : function(dv){
            switch(dv){
				/**
                 * 구매카드 검색 부
                 */ 
                //구매카드 중심업체 검색
                case pbk.b2bConst.pcard_main :
                    url.popup = "/b2b/popup/pcard_main_company_inquiry_pop.do";
                    url.list = "/b2b/popup/pcard_main_list.do";
                    break;
                //구매카드 협력업체 검색
                case pbk.b2bConst.pcard_join :
                    url.popup = "/b2b/popup/pcard_join_company_inquiry_pop.do";
                    url.list = "/b2b/popup/pcard_join_list.do";
                    break;
                //벤더가맹점 검색
                case pbk.b2bConst.pcard_vender :
                    url.popup = "/b2b/popup/vender_company_inquiry_pop.do";
                    url.list = "/b2b/popup/vender_list.do";
                    break;
                    
                /**
                 * 구매기업 검색 부
                 */ 
                //구매카드대출 구매업체 검색
                case pbk.b2bConst.cardloan_buy :
                    url.popup = "/b2b/popup/buy_company_inquiry_pop.do";
                    url.list = "/b2b/popup/cardloan_buy_list.do";
                    break;
                //구매자금대출 구매업체 검색
                case pbk.b2bConst.ploan_buy :               
                    url.popup = "/b2b/popup/buy_company_inquiry_pop2.do";
                    url.list = "/b2b/popup/ploan_buy_list.do";
                    break;
                //B2B(MP연계) 구매업체 검색
                case pbk.b2bConst.b2b_buy :               
                    url.popup = "/b2b/popup/buy_company_inquiry_pop.do";
                    url.list = "/b2b/popup/b2b_buy_list.do";
                    break;
                //매담대 중심 구매업체 검색
                case pbk.b2bConst.cloan_main :
                    url.popup = "/b2b/popup/cloan_main_company_inquiry_pop.do";
                    url.list = "/b2b/popup/cloan_main_list.do";
                    break;
                //매담대 구매기업(협력업체) 검색
                case pbk.b2bConst.cloan_buy :
                    url.popup = "/b2b/popup/buy_company_inquiry_pop.do";
                    url.list = "/b2b/popup/cloan_sell_list.do"; //sell 과 list 페이지가 동일해서 sell 을 같이 씀.
                    break;
                //미래대 구매기업 검색
                case pbk.b2bConst.nloan_buy : 
                    url.popup = "/b2b/popup/buy_company_inquiry_pop.do";
                    url.list = "/b2b/popup/nloan_sell_list.do"; //sell 과 list 페이지가 동일해서 sell 을 같이 씀.
                    break;      
                //전체 상품 구매기업 검색
                case pbk.b2bConst.all_buy :
                    url.popup = "/b2b/popup/buy_company_inquiry_pop.do";
                    url.list = "/b2b/popup/all_buy_list.do";
                    break;
                
                /**
                 * 판매기업 검색 부
                 */ 
                //구매카드대출 판매기업 검색
                case pbk.b2bConst.cardloan_sell :
                     url.popup = "/b2b/popup/sell_company_inquiry_pop.do";
                     url.list = "/b2b/popup/cardloan_sell_list.do";
                     break;
                //구매자금대출 판매기업 검색
                case pbk.b2bConst.ploan_sell :
                    url.popup = "/b2b/popup/sell_company_inquiry_pop.do";
                    url.list = "/b2b/popup/ploan_sell_list.do";
                    break;
                //B2B(MP연계) 판매기업 검색
                case pbk.b2bConst.b2b_sell :
                    url.popup = "/b2b/popup/sell_company_inquiry_pop.do";
                    url.list = "/b2b/popup/b2b_sell_list.do";
                    break;
                //매담대 판매기업(협력업체) 검색
                case pbk.b2bConst.cloan_sell :
                    url.popup = "/b2b/popup/sell_company_inquiry_pop.do";
                    url.list = "/b2b/popup/cloan_sell_list.do";
                    break;
                //미래대 판매기업 검색
                case pbk.b2bConst.nloan_sell : 
                    url.popup = "/b2b/popup/sell_company_inquiry_pop.do";
                    url.list = "/b2b/popup/nloan_sell_list.do";
                    break;
                //전체 상품 판매기업 검색
                case pbk.b2bConst.all_sell :
                    url.popup = "/b2b/popup/sell_company_inquiry_pop.do";
                    url.list = "/b2b/popup/all_sell_list.do";
            }
        },


        /**
         * Return Key일 경우 서브밋을 한다.
         * @param {Object} event 이벤트
         * @param {Object} obj 오브젝트
         * @param {Object} form 폼 오브젝트
         */
        actionKeyDown: function(event,form){
            if (pbk.isReturnKey(event.keyCode)) {
                this.submitPop(form);
            }
        },
        
		 /**
         * 팝업을 열기 전에 validate 합니다.
         */
        validate : function(configObj){
            if(configObj.cenrEntrCd){
                var cenrEntrCdVal = document.getElementById(configObj.cenrEntrCd).value;

                if( prdctDv == pbk.b2bConst.pcard_join ){
                    if(!cenrEntrCdVal){
                        hasErrors = true;
                        errMsg = "주계약 업체(업체코드)를 선택해 주세요";
                    }
                }

                if(configObj.validate){
                    if(!cenrEntrCdVal){
                        hasErrors = true;
                        errMsg = "주계약 업체(업체코드)를 선택해 주세요";
                    }
                }
            }    
        },
		
		/**
         * 판구매업체 검색창을 연다.
         * @param {String} popupId
         * @param {Object} 설정 config
         */
        openPop :  function(popupId, configObj) {
			
            //값 초기화
            this.init();

            //팝업 Id 설정
            prdctDv = popupId;

            //validation
            this.validate(configObj);

            if( hasErrors ){
                message.alert("입력오류", errMsg);
                return;
            }

            this.setUrlByPrdctDv(prdctDv);

            if(!url.popup && !url.list){
                message.alert('알림', '기업검색에 등록 안된 상품입니다.');
                return;
            }

            //config obj를 enprInfo 에 적용합니다.
            Ext.apply(enprInfo, configObj);

            //기업검색시 사용 할 중심업체코드 설정
            if(configObj.cenrEntrCd){
                enprInfo.formObj = enprInfo.formObj || form.createForm();
                var cenrEntrCdVal = document.getElementById(configObj.cenrEntrCd).value;
                form.createHiddenField(enprInfo.formObj, "cenrEntrCd", cenrEntrCdVal);
            }
            
			//팝업 오픈 후 입력란에 focus 설정
			pbk.extJS.popup.event.show = function(){
				Form.focusFirstElement('searchEnterpriseForm');
			};
			
            pbk.extJS.popup.open(opb.base.APPLICATION_CONTEXT_ROOT + url.popup, prdctDv, 480, null, enprInfo.formObj);
        },
		
		
        /**
         * 판구매업체 결과페이지를 연다
         */
        submitPop : function(formObj){
			
			 //벤더가맹점 검색 시 기업명 필수임..
            if( prdctDv == pbk.b2bConst.pcard_vender ){
                if (!new hana.JText('기업명', $("custNm")).filter().validate()) {
                    return;
                }
            }
            //구매카드 협력업체 및 중심업체 검색 시 기업명 필수 아님 ( 있어도 되고 없어도 되고 )
            else if( prdctDv == pbk.b2bConst.pcard_main || prdctDv == pbk.b2bConst.pcard_join ){
                if (!new hana.JText('기업명', $("custNm")).nullable().filter().validate()) {
                    return;
                }
            }
            //매담대 중심업체 검색 시 벤더가맹점 검색 시 기업명 필수임..
            else if( prdctDv == pbk.b2bConst.cloan_main || prdctDv == pbk.b2bConst.pcard_vender ){
                if (!new hana.JText('기업명', $("custNm")).nullable().filter().validate()) {
                    return;
                }

                if (!new hana.JText('사업자번호', $('rsbzRegNo')).nullable().isBizNo().validate()) {
                    return;
                }

                var custNm = $F("custNm").trim();
                var rsbzRegNo = $F("rsbzRegNo").trim();

                if( !custNm && !rsbzRegNo ){
                    message.alert('입력오류','기업명 또는 사업자번호 둘 중 하나는 필수로 입력 해주셔야 합니다.');
                    return;
                }
            }
			//그 이외의 협력업체 검색
			 else{
                if (!new hana.JText('기업명', $("custNm")).nullable().filter().validate()) {
                    return;
                }

                if (!new hana.JText('사업자번호', $('rsbzRegNo')).nullable().isBizNo().validate()) {
                    return;
                }
            }

            var hanaAjax = new hana.JHanaAjax(popupDetailDiv, true, true);
            hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + url.list, formObj );
        },
        
        /**
         * 판구매업체 결과페이지를 연다
         */
        submitPop2 : function(formObj){
// 
                if (!new hana.JText('기업명', $("custNm")).nullable().filter().validate()) {
                    return;
                }

                if (!new hana.JText('사업자번호', $('rsbzRegNo')).nullable().isBizNo().validate()) {
                    return;
                }

                var custNm = $F("custNm").trim();
                var rsbzRegNo = $F("rsbzRegNo").trim();

                if( !custNm && !rsbzRegNo ){
                    message.alert('입력오류','기업명 또는 사업자번호 둘 중 하나는 필수로 입력 해주셔야 합닌다.');
                    return;
                }
               
            
            var hanaAjax = new hana.JHanaAjax(popupDetailDiv, true, true);
            hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + url.list, formObj );
        },
        
        /**
         * 판구매업체 검색창을 닫는다.
         */
        closePop : function(){
            pbk.extJS.popup.close(prdctDv);
        },

		
        /**
         * 판구매업체 검색 내용을 설정한다.
         * @param {String} checknm 구매업체명 + 사업자등록번호 + 구매업체코드
         */
        setInfo : function(checkObj) {
            
            if (checkObj) {
                // checkStr을 parse 하고 obj 에 지정해줍니다.
                this.parse(checkObj);

                this.closePop();
            }else{
                message.alert("에러","업체를 선택해 주세요");
            }
        },
		
		/**
         * 체크된 Object 에서 설정 된 enprInfo에 property 를 가져와서 값을 내려줍니다.
         */
        parse : function(checkObj){

                for (var property in enprInfo) {
                    var objId = enprInfo[property];
                    if (objId) {
                        var checkPropery = checkObj.getAttribute(property);
                        if (checkPropery) {
                            document.getElementById(objId).value = checkPropery;
                            enprInfo[property] = checkPropery;
                        }
                    }
                }            
        	},
			
        setContract: function(selObj) {
            var selOptionVal = selObj.options[selObj.selectedIndex].value;
            if(selOptionVal){
                var ar = selOptionVal.split('|');

                $('cenrEntrCd').value = ar[0];
                
                var formObj = form.createForm([
                    {id:'cenrEntrCd',value:ar[0]},
                    {id:'cmtmPrdKindCd',value:ar[1]},
                    {id:'selEntrCd',value:selOptionVal}
                ]);

                var hanaAjax = new hana.JHanaAjax("selEntrCdArea", true, false);
                hanaAjax.ajaxCommSubmit(opb.base.APPLICATION_CONTEXT_ROOT + "/b2b/buy/credit/cloan/wpb2b495_51t.do", formObj);

            }else{
                $('cenrEntrCd').value = "";
                $('cmtmPrdKindCd').value = "";
                
                if($('cmtmPrdKindCdShow'))
                    $('cmtmPrdKindCdShow').value = "";
            }
        }
    };
}();


/**
 * 지급점지로번호검색 팝업
 */
pbk.common.popup.findGiroNum = function(){
    var popupId = "giroNumPopup";

    var giriNumObj = null;

    return{
        /**
         * 지급점지로번호검색 팝업 열기
         * @param bizNumId 사업자 번호 
         */
        openPop : function(bizNumId, giroNumId){
            var bizNumObj = document.getElementById(bizNumId);
            giriNumObj = document.getElementById(giroNumId);

            if(!new hana.JNumber("검색 사업자번호", bizNumObj).limitLength(10,10).validate()){
                return;
            }

            var formObj = form.createForm([{id:"contEntrBzRegNo1", value:bizNumObj.value},
                                           {id:"contEntrBzRegNo2", value:bizNumObj.value}
                                          ]);

            pbk.extJS.popup.open(opb.base.APPLICATION_CONTEXT_ROOT + "/b2b/common/popup/gironum_inquiry_pop.do", popupId, 650, null, formObj);
        },

        /**
         * 지급점지로번호검색 검색창을 닫는다.
         */
        closePop : function(){
            pbk.extJS.popup.close(popupId);
        },

        /**
         * 지급점지로번호검색 검색 내용을 설정한다.
         * @param {String} checkStr 지로번호?
         */
        setInfo : function(checkStr) {
            if (null != checkStr && "" != checkStr) {

                giriNumObj.value = checkStr;

                this.closePop();
            }else{
                message.alert("에러","지급점을 선택해 주세요");
            }
        }
    };
}();

