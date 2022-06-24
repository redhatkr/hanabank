/*****************************************************************************
 * 파일명 : JHanaUtils.js
 * 작성일 : 2008. 03.03
 * 작성자 : ork 
 * 설   명 : 일반적인 Util 에 대해 기술한다. (Static function 모음)
 * Dependency  : prototype.js , ext-base.js , ext-all.js, pbk-extJS.js (alert 메세지 출력을 위해)
 * 메세지효과를 위하여 ExtJs 아래 정의 되어야 합니다.
 * ===========================================================================
 * 변경이력:
 * DATE                AUTHOR        DESCRIPTION
 * ---------------------------------------------------------------------------
 * 2008.03.03   Oh,Ryunkyong     Initial
 * 2008.05.13   Oh,Ryunkyong    input.toBizNo() 추가, replaceDashFromObj() 추가
 * 2008.06.18   Kim,sangjun     updater 삭제
 * 2009.02.24   Lee,JeKyung     hana.JHanaUtils.window.popup.modal 추가
 * 2011.05.25	양균수		 	 IE외에 브라우져에서도 호출가능하도록 호출방식 변경.
 * 								 (ex> objForm.niceClass -> objForm.getAttribute("niceClass") ) 
 * 변경 이력은 이곳에 추가 합니다.
 *****************************************************************************/

JHanaMap = function(){
	this.map = new Object();
};

JHanaMap.prototype = {
		
		 put : function(key, value){
			 this.map[key] = value; 
		 },
		 
		 get : function(key){
			 return this.map[key];
		 },
		 
		 containsKey : function(key){
			 return key in this.map;
		 },
		 
		 containsValue : function(value){
			 
			 for(var prop in this.map) {
				 if(this.map[prop] == value) {
					 return true;
				 }
			 }
			 
			 return false;
		 },
		 
		 isEmpty : function(){
			 return (this.size() == 0);
		 },
		 
		 remove : function (key){
			 delete this.map[key];
		 },
		 
		 clear : function(){
			 for(var prop in this.map){
				 delete this.map[prop];
			 }
		 },
		 
		 keys : function(){
			 var keys = new Array();
			 for(var prop in this.map){
				 keys.push(prop);
			 }
		 },
		 
		 values : function(){
			 var values = new Array();
			 for(var prop in this.map){
				 values.push(this.map[prop]);
			 }
		 },
		 
		 size : function(){
			 var cnt = 0;
			 for(var prop in this.map){
				 cnt++;
			 }
			 
			 return cnt;
		 }
};

hana.JHanaUtils = function(){

    /**
     * SortableTable class가 생성 된 instance를 저장하는 변수
     */
    var sortMap = new JHanaMap();

     /**
      * toMoney 함수에서 내부적으로 사용
      * 입력 변수에 3 자리마다 콤마(,)를 붙여 반환한다.
      * @param field 콤마를 붙일 값
      */
     var formatCommas = function(numString) {
    	 var re = /,|\s+/g;
    	 numString = numString.replace(re, "");

    	 re = /(-?\d+)(\d{3})/;
    	 while (re.test(numString)) {
    		 numString = numString.replace(re, "$1,$2");
    	 }
    	 return numString;
     };

     /**
      * toKoreanFromMoney 에서 내부적으로 사용
      * 콤마(,)를 제거하여 반환한다.
      * @param {Object} numString 콤마를 제거할 값
      */
     var stripCommas = function(numString) {
    	 var re = /,/g;
    	 return numString.replace(re, "");
     };

    return {

        /**
         * 쿠키에 대한 function 모음
         */
        cookie: {
            /**
             * 쿠키에 저장된 값을 반환한다.
             * @param name 쿠키 이름
             * @return 쿠키 이름에 대한 값을 반환. 없는 경우에는 ""를 반환.
             */
             getCookie :  function(name) {
                var arg = name + "=";
                var alen = arg.length;
                var clen = document.cookie.length;
                var i = 0;
                while (i < clen) {
                    var j = i + alen;
                    if (document.cookie.substring(i, j) == arg) {
                        return hana.JHanaUtils.cookie.getCookieVal(j);
                    }
                    i = document.cookie.indexOf(" ", i) + 1;
                    if (i == 0) break;
                }
                return "";
            },


            /**
             * 쿠키를 저장한다.
             * @param name 쿠키 이름
             * @param value 쿠키 값
             * @param expires 쿠키의 유효 일
             * @param path
             * @param domain
             * @param secure
             */
             setCookie : function(name, value, expires, path, domain, secure) {
                if (!path) {
                    path = "/";
                }
                document.cookie = name + "=" + escape (value) +
                                ((expires) ? "; expires=" + expires : "") +
                                ((path) ? "; path=" + path : "") +
                                ((domain) ? "; domain=" + domain : "") +
                                ((secure) ? "; secure" : "");
            },


            /**
             * 쿠키를 삭제한다.
             * @param name 삭제할 쿠키 이름
             * @param path
             * @param domain
             */
            deleteCookie : function(name, path, domain) {
                if (!path)
                    path = "/";

                if (hana.JHanaUtils.cookie.getCookie(name)) {
                    document.cookie = name + "=" +
                        ((path) ? "; path=" + path : "") +
                        ((domain) ? "; domain=" + domain : "") +
                        "; expires=Thu, 01-Jan-1970 00:00:01 GMT";
                }
            },


            /**
             * 쿠키를 저장할 때 필요한 적합한 형식의 유효기간을 반환한다.
             * @param days 쿠키가 유효할 일 (예를 들어 3 일 동안 유효해야 하면 3을 입력)
             * @param hours 쿠키가 유효할 시간 (예를 들어 2 시간 동안 유효해야 하면 2를 입력)
             * @param minutes 쿠키가 유효할 분 (예를 들어 30 분 동안 유효해야 하면 30을 입력)
             */
            getExpDate : function(days, hours, minutes) {
                var expDate = new Date( );
                if (typeof days == "number" && typeof hours == "number" &&
                    typeof hours == "number") {
                    expDate.setDate(expDate.getDate( ) + parseInt(days));
                    expDate.setHours(expDate.getHours( ) + parseInt(hours));
                    expDate.setMinutes(expDate.getMinutes( ) +
                    parseInt(minutes));
                    return expDate.toGMTString( );
                }
            },

            /**
             * 쿠키 값을 읽을 때 사용하는 보조 함수
             * @param {Object} offset
             */
            getCookieVal :  function(offset) {
                var endstr = document.cookie.indexOf (";", offset);
                if (endstr == -1) {
                    endstr = document.cookie.length;
                }
                return unescape(document.cookie.substring(offset, endstr));
            }
        },

        html : {
            /**
             * div 영역내 폰트사이즈 attribute
             */
            divFontSize : {},
            /**
             * 폰트 사이즈
             */
            divFontNum : 12,
            
            
            /**
             * 당행(하나은행) 계좌 번호 형식의 포맷으로 변환한 문자열을 반환합니다.
             * @param {String} acctNo 계좌번호
             */
            toAcctNo : function(acctNo){
				
                if(acctNo == null ) return "";
                if(acctNo.length == 14){
                    return acctNo.substring(0, 3) + "-" + acctNo.substring(3, 9) + "-" + acctNo.substring(9, 14);
                }
                else if(acctNo.length == 12){
                    return acctNo.substring(0, 5) + "-" + acctNo.substring(5, 12);
                }
				else{
					return acctNo;
				}
            },
			
			/**
            * 사업자번호 형식의 포맷으로 변환한 문자열을 반환합니다.
            * @param {String} toBizNo 사업자번호
            */
           toBizNo : function(bizNo){
               if(bizNo == null ) return "";
               if(bizNo.length == 10){
                   return bizNo.substring(0, 3) + "-" + bizNo.substring(3, 5) + "-" + bizNo.substring(5, 10);
               }
               else if(bizNo.length == 13){
                   return bizNo.substring(3, 6) + "-" + bizNo.substring(6, 8) + "-" + bizNo.substring(8, 13);
               }
				else{
					return bizNo;
				}
           },

			/**
            * 카드번호 형식의 포맷으로 변환한 문자열을 반환합니다.
            * @param {String} toCardNo 사업자번호
            */
           toCardNo : function(cardNo){
               if(cardNo == null ) return "";
               if(cardNo.length == 16){
                   return cardNo.substring(0, 4) + "-" + cardNo.substring(4, 8) + "-" + cardNo.substring(8, 12) + "-" + cardNo.substring(12, 16);
               }
				else{
					return cardNo;
				}
           },            
            
            /**
             * 인자로 넘어온 value값을 Money 형식으로 변환해서 return 합니다.
             * @param val {String} 변환시킬 문자
             */
            toMoney : function(val){
            	 
                if(val == undefined){
                	return val;
                }

                val = val.toString();
                
                // 첫자리 0 삭제. 20090303jk
                for(var i=0; i<val.length; i++){
                    if(val.length > 1 && val.indexOf('0') == 0 && val.indexOf('.') != 1) val = val.substring(1);   
                    else break;
                }
                
                var indexOfPoint = val.indexOf(".");
                if (indexOfPoint == -1) {
                    val = opb.common.util.changeFormatCurrency_fnc(val);
                }else if(indexOfPoint == 0){
                    val = '0' + val.substring(indexOfPoint, val.length);
                } else {
                    val = opb.common.util.changeFormatCurrency_fnc(val.substring(0, indexOfPoint)) +
                                    val.substring(indexOfPoint, val.length);
                }
                return val;
            },

            /**
             * date format 입니다....
             */
            toDate : function(str){
                var formatedDate;
                if( str ){
                    str = str.replace(/[^\d]/g,"");
                    var dt;
                    if( str.length == 6 ){
                        dt = Date.parseDate(str, 'his');
                        formatedDate = dt.format("H:i:s");
                    }else if( str.length == 8 ){
                        dt = Date.parseDate(str, 'Ymd');
                        formatedDate = dt.format("Y-m-d");
                    }else if( str.length == 12 ){
                        dt = Date.parseDate(str, 'Ymdhi');
                        formatedDate = dt.format("Y-m-d H:i");
                    }else if( str.length == 14 ){
                        dt = Date.parseDate(str, 'Ymdhis');
                        formatedDate = dt.format("Y-m-d H:i:s");
                    }
                }

                return formatedDate;
            },

            /**
             * 맨 위로 scroll 을 올립니다.
             */
            scrollToTop : function(){
                $(opb.base.MASK_WRAP_DIV).scrollTo('HANA_TOP');
            }
			
			
			
        },

        viewport : {
            /**
             * ViewPort를 가져온다.
             */
            getViewport : function() {
                var w =0;
                var h =0;

                if(window.innerWidth) w=window.innerWidth;
                if(document.documentElement.clientWidth){
                    var w2 = document.documentElement.clientWidth;
                    if(!w || w2 && w2 < w) w=w2;
                }else if(document.body){
                    w=document.body.clientWidth;
                }

                if(window.innerHeight) h=window.innerHeight;
                if(document.documentElement.clientHeight) h=document.documentElement.clientHeight;
                else if(document.body) h=document.body.clientHeight;

                return [w,h];
            }
        },

        radio : {
            /**
             * 선택된 radio 버튼의 value 를 return 합니다.
             * 만약 value 가 없거만 선택 되지 않았으면 ""를 return 합니다.
             * @param radioObj {Object} radio 버튼 Obj
             */
            getCheckedValue : function (radioObj) {
                if(!radioObj){
                    return "";
                }
                var radioLength = radioObj.length;
                if(radioLength == undefined){
                    if(radioObj.checked){
                        return radioObj.value;
                    }
                    else{
                        return "";
                    }
                }

                for(var i = 0; i < radioLength; i++) {
                    if(radioObj[i].checked) {
                        return radioObj[i].value;
                    }
                }
                return "";
            },

            /**
             * newValue 값으로 radio 버튼을 선택 합니다.
             * 만약 radio 버튼 obj 가 없으면 아무것도 하지 않습니다.
             * 만약 해당 값이 없으면 radio 버튼의 check 를 unchecked 합니다.
             * @param radioObj
             * @param newValue
             */
            setCheckedValue : function(radioObj, newValue) {
                if(!radioObj)
                    return;
                var radioLength = radioObj.length;
                if(radioLength == undefined) {
                    radioObj.checked = (radioObj.value == newValue.toString());
                    return;
                }
                for(var i = 0; i < radioLength; i++) {
                    radioObj[i].checked = false;
                    if(radioObj[i].value == newValue.toString()) {
                        radioObj[i].checked = true;
                    }
                }
            },

            /**
             * 선택된 radio 버튼의 value 를 return 합니다.
             * 만약 value 가 없거만 선택 되지 않았으면 ""를 return 합니다.
             * @param radioObj {Object} radio 버튼 Obj
             */
            getCheckedObj : function (radioObj) {
                if(!radioObj){
                    return "";
                }
                var radioLength = radioObj.length;
                if(radioLength == undefined){
                    if(radioObj.checked){
                        return radioObj;
                    }
                    else{
                        return "";
                    }
                }

                for(var i = 0; i < radioLength; i++) {
                    if(radioObj[i].checked) {
                        return radioObj[i];
                    }
                }
                return null;
            }

        },

        input : {
            
            
        	/**
             * 숫자로 반환
             */
            toNumber : function( numStr ){
                return stripCommas(numStr);
            },
            
        	/**
             * , 숫자로 반환
             * @param numStr
             */
            toFormatMoney : function(numStr){
                return formatCommas(numStr);
            },
            /**
             * 텍스트 필드에 입력한 값에 3자리마다 콤마(,)를 붙인다.
             * 텍스트 필드에 아래를 기입한다. onkeyup="toMoney(this)"
             * @param field 텍스트 필드
             * @param isRemoveZero false 이면 첫자리 0을 삭제하지않는다.
             */
            toMoney : function(field, isRemoveZero) {
            	
            	if(isRemoveZero == undefined || isRemoveZero == true) {
	                // 첫자리 0 삭제. 20090303jk
	                for(var i=0; i<field.value.length; i++){
	                	if (field.value.length > 1 && field.value.indexOf('0') == 0 && field.value.indexOf('.') != 1)
	                		field.value = field.value.substring(1);   
	                    else break;
	                }
            	}
                
                var indexOfPoint = field.value.indexOf(".");
                if (indexOfPoint == -1) {
                    field.value = opb.common.util.changeFormatCurrency_fnc(field.value);
                }else if(indexOfPoint == 0){
                    field.value = '0' + field.value.substring(indexOfPoint, field.value.length);                    
                } else {
                    field.value = opb.common.util.changeFormatCurrency_fnc(field.value.substring(0, indexOfPoint)) +
                    field.value.substring(indexOfPoint, field.value.length);
                }
            },
            /**
             * , 달러 형식으로 반환
             * @param numStr
             */
            toFormatDollarMoney : function(numStr){
                var money = opb.common.util.stripCommas_fnc(numStr.toString().replace(/-|\s+/g, ""));
                
                if(money.length == 0) return '0.00';
                
                var moneySplit = money.split('.');     // 지수/소수부 분리.
                var pointMoney = '00';
                
                if(moneySplit.length > 1){             // 소수부 자릿수 2 자리로 맞춤.
                    pointMoney = moneySplit[1].length == 1 ? moneySplit[1]+'0' : moneySplit[1].substring(0,2);
                }
                return opb.common.util.changeFormatCurrency_fnc(moneySplit[0]) +'.'+ pointMoney;
            },    
            
            /**
             * , 은행코드 이미지url 맵핑
             * @param numStr
             */
            toBnkCdImgUrl : function(sutja){
            	var sutja_rd = '';
            	if(sutja == '005')	sutja_rd = "icon_bank01";
        		else if(sutja == '025')	sutja_rd = "icon_bank01";
        		else if(sutja == '033')	sutja_rd = "icon_bank01";
        		else if(sutja == '044')	sutja_rd = "icon_bank01";
        		else if(sutja == '080')	sutja_rd = "icon_bank01";
        		else if(sutja == '081')	sutja_rd = "icon_bank01";
        		else if(sutja == '082')	sutja_rd = "icon_bank01";
        		else if(sutja == '374')	sutja_rd = "icon_bank01";
        		else if(sutja == '039')	sutja_rd = "icon_bank02";
        		else if(sutja == '034')	sutja_rd = "icon_bank03";
        		else if(sutja == '364')	sutja_rd = "icon_bank03";
        		else if(sutja == '004')	sutja_rd = "icon_bank04";
        		else if(sutja == '006')	sutja_rd = "icon_bank04";
        		else if(sutja == '019')	sutja_rd = "icon_bank04";
        		else if(sutja == '029')	sutja_rd = "icon_bank04";
        		else if(sutja == '030')	sutja_rd = "icon_bank04";
        		else if(sutja == '078')	sutja_rd = "icon_bank04";
        		else if(sutja == '079')	sutja_rd = "icon_bank04";
        		else if(sutja == '003')	sutja_rd = "icon_bank05";
        		else if(sutja == '043')	sutja_rd = "icon_bank05";
        		else if(sutja == '010')	sutja_rd = "icon_bank06";
        		else if(sutja == '011')	sutja_rd = "icon_bank06";
        		else if(sutja == '012')	sutja_rd = "icon_bank06";
        		else if(sutja == '013')	sutja_rd = "icon_bank06";
        		else if(sutja == '014')	sutja_rd = "icon_bank06";
        		else if(sutja == '015')	sutja_rd = "icon_bank06";
        		else if(sutja == '016')	sutja_rd = "icon_bank06";
        		else if(sutja == '017')	sutja_rd = "icon_bank06";
        		else if(sutja == '018')	sutja_rd = "icon_bank06";
        		else if(sutja == '440')	sutja_rd = "icon_bank06";
        		else if(sutja == '031')	sutja_rd = "icon_bank07";
        		else if(sutja == '055')	sutja_rd = "icon_bank08";
        		else if(sutja == '032')	sutja_rd = "icon_bank09";
        		else if(sutja == '002')	sutja_rd = "icon_bank10";
        		else if(sutja == '050')	sutja_rd = "icon_bank11";
        		else if(sutja == '045')	sutja_rd = "icon_bank12";
        		else if(sutja == '046')	sutja_rd = "icon_bank12";
        		else if(sutja == '085')	sutja_rd = "icon_bank12";
        		else if(sutja == '086')	sutja_rd = "icon_bank12";
        		else if(sutja == '087')	sutja_rd = "icon_bank12";
        		else if(sutja == '007')	sutja_rd = "icon_bank13";
        		else if(sutja == '009')	sutja_rd = "icon_bank13";
        		else if(sutja == '369')	sutja_rd = "icon_bank13";
        		else if(sutja == '047')	sutja_rd = "icon_bank14";
        		else if(sutja == '048')	sutja_rd = "icon_bank14";
        		else if(sutja == '049')	sutja_rd = "icon_bank14";
        		else if(sutja == '021')	sutja_rd = "icon_bank15";
        		else if(sutja == '026')	sutja_rd = "icon_bank15";
        		else if(sutja == '028')	sutja_rd = "icon_bank15";
        		else if(sutja == '038')	sutja_rd = "icon_bank15";
        		else if(sutja == '040')	sutja_rd = "icon_bank15";
        		else if(sutja == '088')	sutja_rd = "icon_bank15";
        		else if(sutja == '106')	sutja_rd = "icon_bank15";
        		else if(sutja == '366')	sutja_rd = "icon_bank15";
        		else if(sutja == '438')	sutja_rd = "icon_bank15";
        		else if(sutja == '020')	sutja_rd = "icon_bank16";
        		else if(sutja == '022')	sutja_rd = "icon_bank16";
        		else if(sutja == '024')	sutja_rd = "icon_bank16";
        		else if(sutja == '083')	sutja_rd = "icon_bank16";
        		else if(sutja == '084')	sutja_rd = "icon_bank16";
        		else if(sutja == '071')	sutja_rd = "icon_bank17";
        		else if(sutja == '072')	sutja_rd = "icon_bank17";
        		else if(sutja == '073')	sutja_rd = "icon_bank17";
        		else if(sutja == '074')	sutja_rd = "icon_bank17";
        		else if(sutja == '075')	sutja_rd = "icon_bank17";
        		else if(sutja == '037')	sutja_rd = "icon_bank18";
        		else if(sutja == '372')	sutja_rd = "icon_bank18";
        		else if(sutja == '090')	sutja_rd = "icon_bank19";
        		else if(sutja == '089')	sutja_rd = "icon_bank20";
        		else if(sutja == '035')	sutja_rd = "icon_bank21";
        		else if(sutja == '373')	sutja_rd = "icon_bank21";
        		else if(sutja == '027')	sutja_rd = "icon_bank22";
        		else if(sutja == '036')	sutja_rd = "icon_bank22";
        		else if(sutja == '053')	sutja_rd = "icon_bank22";
        		else if(sutja == '370')	sutja_rd = "icon_bank22";
        		else if(sutja == '060')	sutja_rd = "icon_bank23";
        		else if(sutja == '054')	sutja_rd = "icon_bank24";
        		else if(sutja == '057')	sutja_rd = "icon_bank25";
        		else if(sutja == '023')	sutja_rd = "icon_bank26";
        		else if(sutja == '270')	sutja_rd = "icon_bank27";
        		else if(sutja == '261')	sutja_rd = "icon_bank28";
        		else if(sutja == '433')	sutja_rd = "icon_bank28";
        		else if(sutja == '436')	sutja_rd = "icon_bank28";
        		else if(sutja == '102')	sutja_rd = "icon_bank29";
        		else if(sutja == '267')	sutja_rd = "icon_bank29";
        		else if(sutja == '230')	sutja_rd = "icon_bank30";
        		else if(sutja == '238')	sutja_rd = "icon_bank30";
        		else if(sutja == '431')	sutja_rd = "icon_bank30";
        		else if(sutja == '279')	sutja_rd = "icon_bank31";
        		else if(sutja == '457')	sutja_rd = "icon_bank31";
        		else if(sutja == '209')	sutja_rd = "icon_bank32";
        		else if(sutja == '268')	sutja_rd = "icon_bank33";
        		else if(sutja == '287')	sutja_rd = "icon_bank33";
        		else if(sutja == '448')	sutja_rd = "icon_bank33";
        		else if(sutja == '290')	sutja_rd = "icon_bank34";
        		else if(sutja == '240')	sutja_rd = "icon_bank35";
        		else if(sutja == '365')	sutja_rd = "icon_bank35";
        		else if(sutja == '441')	sutja_rd = "icon_bank35";
        		else if(sutja == '452')	sutja_rd = "icon_bank35";
        		else if(sutja == '291')	sutja_rd = "icon_bank36";
        		else if(sutja == '278')	sutja_rd = "icon_bank37";
        		else if(sutja == '247')	sutja_rd = "icon_bank38";
        		else if(sutja == '289')	sutja_rd = "icon_bank38";
        		else if(sutja == '280')	sutja_rd = "icon_bank39";
        		else if(sutja == '264')	sutja_rd = "icon_bank40";
        		else if(sutja == '262')	sutja_rd = "icon_bank41";
        		else if(sutja == '243')	sutja_rd = "icon_bank42";
        		else if(sutja == '269')	sutja_rd = "icon_bank43";
        		else if(sutja == '218')	sutja_rd = "icon_bank44";
        		else if(sutja == '226')	sutja_rd = "icon_bank44";
        		else if(sutja == '265')	sutja_rd = "icon_bank45";
        		else if(sutja == '263')	sutja_rd = "icon_bank46";
        		else if(sutja == '292')	sutja_rd = "icon_bank47";
        		else if(sutja == '266')	sutja_rd = "icon_bank48";
        		else if(sutja == '064')	sutja_rd = "icon_bank49";
        		else if(sutja == '062')	sutja_rd = "icon_bank50";
        		else if(sutja == '063')	sutja_rd = "icon_bank51";
        		else if(sutja == '067')	sutja_rd = "icon_bank52";
        		else if(sutja == '061')	sutja_rd = "icon_bank53";
        		else if(sutja == '294')	sutja_rd = "icon_bank54";
        		else if(sutja == '227')	sutja_rd = "icon_bank55";
        		else if(sutja == '224')	sutja_rd = "icon_bank56";
        		else if(sutja == '288')	sutja_rd = "icon_bank57";
        		else if(sutja == '225')	sutja_rd = "icon_bank58";
        		else if(sutja == '271')	sutja_rd = "icon_bank59";
        		else if(sutja == '092')	sutja_rd = "icon_bank61";
                return sutja_rd;
            },
            
            /**
             * 텍스트 필드에 입력한 값에 뒤에 .00 포맷을 준다.
             * @param {Object} field 텍스트 필드
             */
            toDollarMoney : function (field){
			    var value = field.value;
			    var indexOfPoint = value.indexOf(".");
			    if (indexOfPoint ==0 ){
			        field.value = '0.00';
			    }
			    else if (indexOfPoint == -1) {		
			        if (value == ".00") {
			            field.value = value + '0.00';
			        } else if (value !=''){
						// 20081103 오륜경 , 0 으로 시작하는 숫자 처리 
				        var valueLength      = value.length;
						var tempValue = '';
						for (var i =0 ; i < valueLength; i++ ) {
							var chracter = value.charAt(i);						
							if (parseInt(chracter,10) > 0) {
								tempValue = tempValue + chracter;
							} else if (parseInt(chracter,10) == 0){
								if (parseInt(tempValue, 10) > 0) {
									tempValue = tempValue + '0';
								}
								else {
									tempValue = '';
								}
							} 
						}			
                        if(tempValue == '') tempValue = '0';
			            field.value = tempValue + '.00';
			        }
			
			    }
			    else {
			        var temp0 = parseFloat('0.' + value.substring(indexOfPoint + 1, value.length));
			        var fTemp = '';

			        if (temp0 != 0.0) {
						fTemp = '' + Math.round(temp0 * 100);
			            var inxTempPoint = fTemp.indexOf(".");
			            var tempFloatString = fTemp.substring(inxTempPoint + 1, fTemp.length);
			            if (tempFloatString.length < 2) {
			                fTemp = "0" + tempFloatString;
			            }
			        }
			        else {
			            fTemp = '00';
			        }
					// 20081103 오륜경 , 0 으로 시작하는 숫자 처리 
					var beforeIndexValue = value.substring(0, indexOfPoint);
					var valueLength      = beforeIndexValue.length;
					var tempValue = '';
					for (var i =0 ; i < valueLength; i++ ) {
						var chracter = beforeIndexValue.charAt(i);						
						if (parseInt(chracter,10) > 0) {
							tempValue = tempValue + chracter;
						} else if (parseInt(chracter,10) == 0){
							if (parseInt(tempValue, 10) > 0) {
								tempValue = tempValue + '0';
							}
							else {
								tempValue = '';
							}
						} 
					}	
                    if(tempValue == '') tempValue = '0';
			        field.value = tempValue + '.' + fTemp;
			    }

            },
            
            toHangul : function(num) {
            	var i, j = 0, k = 0;
				var han1 = new Array("", "일", "이", "삼", "사", "오", "육", "칠",
						"팔", "구");
				var han2 = new Array("", "만", "억", "조", "경", "해", "시", "양",
						"구", "간");
				var han3 = new Array("", "십", "백", "천");
				var result = "", hangul = num + "", pm = "";
				var str = new Array(), str2 = "";
				var strTmp = new Array();
				if (parseInt(num) == 0)
					return "영"; // 입력된 숫자가 0일 경우 처리
				if (hangul.substring(0, 1) == "-") { // 음수 처리
					pm = "Δ ";
					hangul = hangul.substring(1, hangul.length);
				}
				if (hangul.length > han2.length * 4)
					return "too much number"; // 범위를 넘는 숫자 처리 자리수 배열 han2에 자리수
												// 단위만 추가하면 범위가 늘어남.
				for (i = hangul.length; i > 0; i = i - 4) {
					str[j] = hangul.substring(i - 4, i); // 4자리씩 끊는다.
					for (k = str[j].length; k > 0; k--) {
						strTmp[k] = (str[j].substring(k - 1, k)) ? str[j]
								.substring(k - 1, k) : "";
						strTmp[k] = han1[parseInt(strTmp[k])];
						if (strTmp[k])
							strTmp[k] += han3[str[j].length - k];
						str2 = strTmp[k] + str2;
					}
					str[j] = str2;
					if (str[j])
						result = str[j] + han2[j] + result;
					// 4자리마다 한칸씩 띄워서 보여주는 부분. 우선은 주석처리
					// result = (str[j])? " "+str[j]+han2[j]+result : " " +
					// result;
					j++;
					str2 = "";
				}
				return pm + result; // 부호 + 숫자값
// var gab = _gab;
// var qu = gab.length / 4;
//            	var re		= gab.length % 4;
//
//            	var sutja	= "";
//            	var sutja_rd	= "";
//            	var sutja_jr	= "";
//
//            	var read	= "";
//
//
//            	for(i=0;i<gab.length;i++) { 
//            		sutja	= gab.substring(i,i+1);
//            		
//            		if(sutja == '1')	sutja_rd = "일";
//            		else if(sutja == '2')	sutja_rd = "이";
//            		else if(sutja == '3')	sutja_rd = "삼";
//            		else if(sutja == '4')	sutja_rd = "사";
//            		else if(sutja == '5')	sutja_rd = "오";
//            		else if(sutja == '6')	sutja_rd = "육";
//            		else if(sutja == '7')	sutja_rd = "칠";
//            		else if(sutja == '8')	sutja_rd = "팔";
//            		else if(sutja == '9')	sutja_rd = "구";
//            		else			sutja_rd = "";
//            		
//            		switch((gab.length - i -1) % 4 +1) {
//            			case(2):	sutja_jr = "십";break;
//            			case(3):	sutja_jr = "백";break;
//            			case(4):	sutja_jr = "천";break;
//            			default:	sutja_jr = "";
//            		}
//            		
//            		if(sutja_rd != "")	read	+= sutja_rd + sutja_jr;
//            		
//            		if((gab.length - i - 1) % 4 == 0) {
//            			switch((gab.length - i - 1) / 4) {
//            				case(1):	read += "만";break;
//            				case(2):	read += "억";break;
//            				case(3):	read += "조";break;
//            				default:	break;
//            			}
//            		}
//            	}
//            	return read;
            },
            
            
            
            /**
             * 숫자타입의 문자를 한글로 표현한다.
             * @param {String} numStr  Number type의 String
             * @param {String} targetDivId 한글로 표현될 DivId
             * @param {int} rangeLength 제한자릿수
             * @param {HTMLElemtnt} targetEl 에러시 초기화할 Element (optional)
             * @return {boolean} 제한자리를 통과했는지 여부
             *
             */
            toKoreanFromMoney : function (numStr,targetDivId,rangeLength, targetEl){
          
//                var arrayNum=new Array("","일","이","삼","사","오","육","칠","팔","구");
//                var arrayUnit=new Array("","십","백","천","만 ","십만 ","백만 ","천만 ",
//                                    "억 ","십억 ","백억 ","천억 ","조 ","십조 ","백조");
//                var arrayStr= new Array();
            
                var numStr = opb.common.util.stripCommas_fnc(numStr);
                var len = numStr.length;

                var isValid = true;
                // 제한 자릿수가 넘으면 리턴한다.
                if (len > rangeLength) {
                    // 오류메세지를 출력한다.
                    opb.common.layerpopup.openAlert_fnc("입력오류","범위를 초과하였습니다.");

                    if (targetEl) {
                        targetEl.value = "0";
                    }
                    isValid = false;
                }

                var hanStr = "";
                if (isValid) {
                	hanStr = hana.JHanaUtils.input.toHangul(numStr);
//                    for (i = 0; i < len; i++) {
//                        arrayStr[i] = numStr.substr(i, 1)
//                    }
//                    code = len;
//                    for (i = 0; i < len; i++) {
//                        code--;
//                        tmpUnit = "";
//                        if (arrayNum[arrayStr[i]] != "") {
//                            tmpUnit = arrayUnit[code];
//                            if (code > 4) {
//                                if ((Math.floor(code / 4) == Math.floor((code - 1) / 4) &&
//                                arrayNum[arrayStr[i + 1]] != "") ||
//                                (Math.floor(code / 4) == Math.floor((code - 2) / 4) &&
//                                arrayNum[arrayStr[i + 2]] != "")) {
//                                    tmpUnit = arrayUnit[code].substr(0, 1);
//                                }
//                            }
//                        }
//                        hanStr += arrayNum[arrayStr[i]] + tmpUnit;
//                    }
                }

                if (targetDivId && targetDivId != "") {
                    var oTargetDiv = $(targetDivId);
                    if (oTargetDiv) {
                        var oTextNode = new Object();
                        var oChildNode = new Object();
                        if (hanStr != "") {
                            oTextNode = document.createTextNode('(' + hanStr + '원)');
                            oChildNode = oTargetDiv.childNodes[0];
                        } else {
                            oTextNode = document.createTextNode(' ');
                            oChildNode = oTargetDiv.childNodes[0];
                        }
                        if (oTargetDiv.childNodes.length != 0) {
                            oTargetDiv.removeChild(oChildNode);
                        }
                        oTargetDiv.appendChild(oTextNode);
                    }
                }
                
				
				if (isValid == false){
					if (targetEl)	targetEl.value = '0';
				}else{
					if (targetEl)	targetEl.value = opb.common.util.changeFormatCurrency_fnc(targetEl.value); 
					
				}				
				
                return isValid;
            },
            
            toKoreanFromMoneyR : function (numStr,targetDivId,rangeLength, targetEl){

              var numStr = opb.common.util.stripCommas_fnc(numStr);
              var len = numStr.length;

              var isValid = true;
              // 제한 자릿수가 넘으면 리턴한다.
              if (len > rangeLength) {
                  // 오류메세지를 출력한다.
                  opb.common.layerpopup.openAlert_fnc("입력오류","범위를 초과하였습니다.");

                  if (targetEl) {
                      targetEl.value = "0";
                  }
                  isValid = false;
              }

              var hanStr = "";
              if (isValid) {
              	hanStr = hana.JHanaUtils.input.toHangul(numStr);

              }

              if (targetDivId && targetDivId != "") {
                  var oTargetDiv = $(targetDivId);
                  if (oTargetDiv) {
                      var oTextNode = new Object();
                      var oChildNode = new Object();
                      if (hanStr != "") {
                          oTextNode = document.createTextNode('' + hanStr + '원');
                          //oTextNode = '테스트' // X
                          oChildNode = oTargetDiv.childNodes[0];
                      } else {
                          oTextNode = document.createTextNode(' ');
                          oChildNode = oTargetDiv.childNodes[0];
                      }
                      if (oTargetDiv.childNodes.length != 0) {
                          oTargetDiv.removeChild(oChildNode);
                      }
                      oTargetDiv.appendChild(oTextNode);
                  }
              }
              
				
				if (isValid == false){
					if (targetEl)	targetEl.value = '0';
				}else{
					if (targetEl)	targetEl.value = opb.common.util.changeFormatCurrency_fnc(targetEl.value); 
					
				}				
				
              return isValid;
          },
          
			/**
             * 대쉬 '-' 를 제거한다.
             */
            stripDash : function(field) {
                var numString = field.value;
                var re = /-/g;
                return numString.replace(re, "");
            },

            /**
             * 콤마(,)를 제거하여 반환한다.
             * @param {Object} numString 콤마를 제거할 값
             */
            stripComma : function(field) {
                var numString = field.value;
                var re = /,/g;
                return numString.replace(re, "");
            },
            
            
            strCharByte : function(chStr) {
                if (chStr.substring(0, 2) == '%u') {
                    if (chStr.substring(2,4) == '00')
                        return 1;
                        else
                        return 2;        //한글
                    } else if (chStr.substring(0,1) == '%') {
                    if (parseInt(chStr.substring(1,3), 16) > 127)
                        return 2;        //한글
                    else
                        return 1;
                    } else {
                        return 1;
                }
            },

            /**
             * 입력값이 일정한 length 가 되면 focus를 이동 시킵니다.
             * ex : <input type="text" ..... onkeyup="input.autoShift(this, 'nextElId', 3);">
             * @param {Object} fromObj this
             * @param {String} toFld   포커스 이동 시킬 element id
             * @param {int} satisfyFldLen 포커스 이동 조건을 만족시킬 입력 길이
             */
            autoShift : function(fromObj, toFld, satisfyFldLen){
                if(fromObj.value.length == satisfyFldLen){
                    document.getElementById(toFld).focus();
//                    document.getElementById(toFld).select();
                }
            },
			
		    /**
		     * maxlength 지정
		     * focus 이동??
		     * @param obj
		     * @param length
		     */
		    setMaxLength : function (obj,length){
		        if( length ){
		            obj.maxLength = length;
		        }
			},
			
            /**
             * 입력받을 수 있는 값을 필터링한다.
             * ex : <input type="text" ..... onkeypress="filterKey('[0-9]', event)"> ; 숫자만 키입력이 가능한 text filed
             * ex : <input type="text" ..... onkeypress="filterKey('[0-9a-zA-Z]', event)"> ; 영문,숫자만 키입력이 가능한 text filed
             * @param filter : 필터링할 정규표현식 ex) '[0-9]':0~9의 값만 허용, '[a-zA-Z]':알파벳만 허용
             * @return
             */
            filterInputData : function(filter, e) {
                if (filter) {
                    var evt = e || window.event;
                    var kCode = evt.which || evt.keyCode;

                    /* backspace ,tab(9),enter(13),shift(16),end(35),home(36),방향키(좌(37),상(38),우(49),하(40)),delete(46) 등등..*/
                    var controlKeys = new Array(Event.KEY_BACKSPACE,Event.KEY_TAB,Event.KEY_RETURN,Event.KEY_ESC,Event.KEY_ESC,
                            Event.KEY_LEFT,Event.KEY_UP,Event.KEY_RIGHT,Event.KEY_DOWN,Event.KEY_DELETE,Event.KEY_HOME,
                            Event.KEY_END,Event.KEY_PAGEUP,Event.KEY_PAGEDOWN);

                    /* 조작키이면 종료 */
                    for (var i=0; i<controlKeys.length; i++) {
                        if (controlKeys[i] == kCode) return;
                    }

                    var sKey = String.fromCharCode(kCode);

                    var re = new RegExp(filter);
                    if (!re.test(sKey)) {
                        Event.stop(evt);
                    }
                    // 한글 체크
                    /*
                    var re = new RegExp('[\u3130-\u318f\uac00-\ud7af]');
                    if (re.test(sKey)) {
                        Event.stop(evt);
                    }
                    */
                }
            }            
        },

        checkbox : {
           
        	/**
             * 지정한 그룹의 체크박스중 한개 이상이 Checked 되어 있는지 확인합니다.
             * @param {Object} chkListName 체크박스 Name(ID아님)
             * @return {Boolean} 체크박스 선택유무
             */
            isGroupChecked: function(chkListName){
                var chkList = document.getElementsByName(chkListName);
                var isChecked =  false;
                for (var idx = 0; idx < chkList.length; idx++){
                    if (chkList[idx].checked){
                        isChecked = true;
                    }
                }

                return isChecked;
            },
            
            /**
             * 체크박스 일괄 체크 토글기능
             * @param {Boolean} isCheck 체크유무
             * @param {String} chkListName 체크박스 Name (ID아님)
             */
            setChkboxChecked: function(isCheck, chkListName){
                var chkAccountList = document.getElementsByName(chkListName);

                for (var idx = 0; idx < chkAccountList.length; idx++) {
                    chkAccountList[idx].checked = isCheck;
                }
            },

            /**
             * 체크박스 일괄 체크 토글기능
             * @param {String} checkbox 가 위치해 있는 formObjId
             * @param {String} toggle 기능을 수행 하는 checkbox id (NAME 아님)
             * @param {String} chkListName 체크박스 Name (ID아님)
             */
            toggleChkboxCheck: function(formObjId, checkId, chkListName){
                var isChecked = document.getElementById(checkId).checked;
				// NiceForm 의 이미지 치환 기능 삭제로 인해 comment (오륜경 comment)
//              var formObj = $(formObjId);
                // niceform 인 경우
//                if( formObj.className == "niceform"){
//                    for (var idx = 0; idx < hana.JHanaNiceForms.checkboxes.length; idx++) {
//
//                        if(hana.JHanaNiceForms.checkboxes[idx].name == chkListName) {
//                            //var tester = false;
//                            if (isChecked) {
//                                hana.JHanaNiceForms.checkboxes[idx].checked = isChecked;
////                                hana.JHanaNiceForms.checkboxLabels[idx].className = "chosen";     // NiceForm checkbox 제외라고 써놓고
//                            }
//                            else {
//                                hana.JHanaNiceForms.checkboxes[idx].checked = false;
////                               hana.JHanaNiceForms.checkboxLabels[idx].className = "";
//
//                            }
////                            hana.JHanaNiceForms.checkboxes[idx].checked = isChecked;
////                            hana.JHanaNiceForms.checkCheckboxes(idx, isChecked);
//                        }
//                    }
//                }else{
                    hana.JHanaUtils.checkbox.setChkboxChecked(isChecked,chkListName);
//                }
            },
            
            /**
             * 체크박스 일괄 체크 토글기능
             * @param {Boolean} isCheck 체크유무
             * @param {String} chkListName 체크박스 Name (ID아님)
             */
            setChkboxChecked: function(isCheck, chkListName){
                var chkAccountList = document.getElementsByName(chkListName);

                for (var idx = 0; idx < chkAccountList.length; idx++) {
                    chkAccountList[idx].checked = isCheck;
                }
            }            
            
        },

        selectbox : {
            /**
             * 이메일주소 도메인 직접입력 선택시 입력필드 활성화
             * @param {Object} selectObj selectBox Object
             * @param {String} fieldId InputField ID
             * @param {boolean} isCopy 도메인입력필드 복사여부
             */
            setEmailToggle: function(selectObj, fieldId, isCopy){
                // 직접입력 Value값
                var toggleMsg = '직접입력';
                var fieldObj = document.getElementById(fieldId);
				if(fieldObj != null && fieldObj != undefined){
               		fieldObj.value = '';
               	}
				//if (selectObj.value == toggleMsg || selectObj.value == "" ){
                if (selectObj.value == toggleMsg){
                    fieldObj.style.display = 'inline';
                    fieldObj.disabled = false;
                    fieldObj.focus();
                } else {
                	
                    fieldObj.disabled = true;
                	if(isCopy != null && isCopy != undefined && isCopy){
                		fieldObj.value = selectObj.value;
                	} else {
                		fieldObj.style.display = 'none';
                	}
                }
            },

            /**
             * 이메일주소 도메인 직접입력 선택시 입력필드 활성화
             * @param {Object} selectObj selectBox Object
             * @param {String} fieldId1 Email ID Field
             * @param {String} fieldId2 Email Domain Field
             */
            setEmailToggle2 : function(selectObj, fieldId1, fieldId2){
                
            	// 이메일주소없음 Value값
            	var toggleMsg = '이메일주소없음';
            	var fieldObj1 = document.getElementById(fieldId1);
            	var fieldObj2 = document.getElementById(fieldId2);
            	
            	if(selectObj.value != toggleMsg) {
            		this.setEmailToggle(selectObj, fieldId2);
            		if(fieldObj1.disabled) {
	            		fieldObj1.disabled = false;
	            		fieldObj1.focus();
            		}
            	} else {
            		if(fieldObj1 != null && fieldObj1 != undefined && fieldObj2 != null && fieldObj2 != undefined){
            			fieldObj1.value = '';
            			fieldObj2.value = '';
            		}
            		fieldObj1.disabled = true;
            		fieldObj2.style.display = 'none';
            	}
            },

            
            /*
             * SELECT의 OPTIOINS을 제거한다. 단, INDEX 0인 항목은 남겨둔다.
             *
             * @param {selectElement} optioins을 제거할 selectbox
             */
            clearOptions: function(selectElement) {
                if (selectElement.options.length > 1)
                    for (idx = selectElement.length - 1; idx > 0; idx--)
                        selectElement.options[idx] = null;
            },

            /*
             * SELECT에 OPTION을 추가한다.
             *
             * @param {selectElement} options을 채울 selectbox
             * @param {collection} option Collection
             */
            addOptions: function(selectElement, collection) {
                for (idx = 0; idx < collection.length; idx++) {
                    var optionElement = document.createElement("option");
                    var val = collection[idx];
                    optionElement.text = val;
                    optionElement.value = val;
                    selectElement.options.add(optionElement);
                }
            },

            /*
             * index가 0인 "선택" option을 "조회중..."으로 변경한다.
             */
            searchOnOptions: function(selectElement) {
                selectElement.disabled = true;
                selectElement.options[0].text = "조회중...";
            },

            /*
             * index가 0인 "선택" option을 "선택"으로 변경한다.
             */
            searchOffOptions: function(selectElement) {
                selectElement.options[0].text = "선택";
                selectElement.disabled = false;
            },

            /**
             * 레이어 밑에 컨트롤을 숨긴다.
             * @param {Object} layer_id
             */
            selectBoxHidden : function(layer_id)  {
                var ly = $(layer_id);

                // 레이어 좌표
                var ly_left  = ly.offsetLeft;
                var ly_top    = ly.offsetTop;
                var ly_right  = ly.offsetLeft + ly.offsetWidth;
                var ly_bottom = ly.offsetTop + ly.offsetHeight;

                // 셀렉트박스의 좌표
                var el;

                for (i=0; i<document.forms.length; i++) {
                    for (k=0; k<document.forms[i].length; k++) {
                        el = document.forms[i].elements[k];

                        if (el.type == "select-one") {
                            var el_left = el_top = 0;
                            var obj = el;
                            if (obj.offsetParent) {
                                while (obj.offsetParent) {
                                    el_left += obj.offsetLeft;
                                    el_top  += obj.offsetTop;
                                    obj = obj.offsetParent;
                                }
                            }
                            el_left  += el.clientLeft;
                            el_top    += el.clientTop;
                            el_right  = el_left + el.clientWidth;
                            el_bottom = el_top + el.clientHeight;

                            // 좌표를 따져 레이어가 셀렉트 박스를 침범했으면 셀렉트 박스를 hidden 시킴
                            if ( (el_left >= ly_left && el_top >= ly_top && el_left <= ly_right && el_top <= ly_bottom) ||
                                (el_right >= ly_left && el_right <= ly_right && el_top >= ly_top && el_top <= ly_bottom) ||
                                (el_left >= ly_left && el_bottom >= ly_top && el_right <= ly_right && el_bottom <= ly_bottom) ||
                                (el_left >= ly_left && el_left <= ly_right && el_bottom >= ly_top && el_bottom <= ly_bottom) )
                                el.style.visibility = 'hidden';
                        }
                    }
                }
            },

            /**
             * 감추어진 셀렉트 박스를 모두 보이게 함
             */
            selectBoxVisible : function () {
                for (i=0; i<document.forms.length; i++) {
                    for (k=0; k<document.forms[i].length; k++) {
                        el = document.forms[i].elements[k];
                        if (el.type == "select-one" && el.style.visibility == 'hidden')
                            el.style.visibility = 'visible';
                    }
                }
            }

        },

        form : {

			/**
			 * INPUT Element의 value에 format값을 제거 한다. 
			 * @author Jiho Park
			 * @since 2009.10.07
			 * @param {Object} oElement
			 */
			removeFormatChar: function(oElement, value) {
				var RE_DASH = /-/g;
				var RE_ACCT = /,/g;
				var L_TAG   = /</g; 
				var R_TAG   = />/g;

				if (!oElement.disabled && oElement.name) {
					var _value = value;
					
					if(value == null || value == '' || typeof value == 'undefined') {
						try {
							_value = $(oElement).getValue();
						}catch(e) {
							if(element.value) {
								_value = oElement.value;
							}
						} // 특정OS/BW에서 콤보객체의 getValue() 오류발생
					}

					if (_value != null && _value != undefined) {
						var _className = $j(oElement).data("niceClass") || oElement.className;

						if (_className != undefined && _className != null) {

							if (_className.indexOf("bizno") != -1) {
								_value = _value.replace(RE_DASH, "");

							} else if (_className.indexOf("cal") != -1) {
								_value = _value.replace(RE_DASH, "");

							} else if (_className.indexOf("acct") != -1 || _className.indexOf("acctdollar") != -1) {
								_value = _value.replace(RE_ACCT, "");
							}
						}
						
					}
					
					return _value;
				}
				
				return "";
			}, //[end] initElement

            /**
             * 이메일 주소 조합 input 만들기
             * @param {Object} formObj Hidden Field 추가할 Form
             * @param {String} fieldId 생성될 Hidden Field ID
             * @param {String} idId email id 입력 필드 id
             * @param {String} domain을 직접 입력 하는 필드 ID
             * @param {String} domain을 선택 하는 selectbox id
             */
            createEmailAddrField: function(formObj, emailId, idId,domainFieldId,domainSelectId) {
                var id = idId || 'email_01';
                var field = domainFieldId || 'email_02';
                var select = domainSelectId || 'email_03';

                var idObj = document.getElementById(id);
                var domainFieldObj = document.getElementById(field);
                var domainSelectObj = document.getElementById(select);
                var email = '';

                if(domainSelectObj.value  == '선택' || domainSelectObj.value  == '직접입력'){
                    email = idObj.value + '@' + domainFieldObj.value;
                }else{
                	
                	if (domainSelectObj.selectedIndex != 0 )	email = idObj.value + '@' + domainSelectObj.value;
                	else email = idObj.value + '@' + domainFieldObj.value;
                }
                
                hana.JHanaUtils.form.createHiddenField(formObj, emailId, email);
            },

            /**
             * 전화번호 조합 Input Obj 생성
             * @param {Object} formObj Hidden Field 추가할 Form
             * @param {String} fieldId 생성될 Hidden Field ID(조합된 전화번호용 Field)
             * @param {String} phoneNo1 지역번호 Field ID(휴대폰인 경우 사업자번호)
             * @param {String} phoneNo2 국번 Field ID
             * @param {String} phoneNo3 전화번호 Field ID
             */
            createTelNoField: function(formObj, fieldId, phoneNo1, phoneNo2, phoneNo3){
                var phoneNoObj1 = $(phoneNo1);
                var phoneNoObj2 = $(phoneNo2);
                var phoneNoObj3 = $(phoneNo3);
                var phoneNumber = '';

                if (phoneNoObj1 && phoneNoObj2 && phoneNoObj3) {
                    var phone1Value = phoneNoObj1.value.trim();
                    var phone2Value = phoneNoObj2.value.trim();
                    var phone3Value = phoneNoObj3.value.trim();

                    if (phone1Value != '' && phone2Value != '' && phone3Value != '') {
                        phoneNumber = phone1Value + phone2Value + phone3Value;
                    }
                }

                form.createHiddenField(formObj, fieldId, phoneNumber);
            },

            /**
             * 히든폼을 생성하여 지정한 Form에 추가합니다.
             * 만약 fieldId 에 해당하는 object 가 있을경우 존재하는 object의 value
             * value 가 들어갑니다.
             * @param {Object} formObj 폼 오브젝트
             * @param {Object} fieldId 필드 아이디
             * @param {Object} value 값
             * @param {boolean} form 에 같은 이름이 존재할 경우 중복 생성 허용여부 true : 허용, false : 허용안함 ( default : false )
             * @param {String} 전자서명 검증에 필요한 signid 값
             */
            createHiddenField: function(formObj, fieldId, value, isDuplicate , signid){
                var checkDuplicate = false;
                if( isDuplicate ){
                    checkDuplicate = isDuplicate;
                }

                if( formObj[fieldId] && !checkDuplicate ){
                    formObj[fieldId].value = value;
                }else{
                    var fieldObj = document.createElement('input');

                    fieldObj.type = 'hidden';
                    fieldObj.id = fieldId;
                    fieldObj.name = fieldId;
                    fieldObj.value = value;
                    
                    if (signid != undefined && signid != null){
                    	$j(fieldObj).attr('data-signid', signid);
                    }

                    formObj.appendChild(fieldObj);
                }
            },

            /**
            * 지정한 폼 내에 히든필드를 제거합니다.
            * @param {Object} formObj 폼 오브젝트
            * @param {String} fieldId 삭제할 히든필드의 ID
            */
            removeHiddenField: function(formObj, fieldId){
                /*if (formObj.childNodes) {
                    for (var idx = 0; idx < formObj.childNodes.length; idx++) {
                        if (formObj.childNodes[idx].id == fieldId) {
                            formObj.removeChild(formObj.childNodes[idx]);
                        }
                    }
                }*/
                
                // 2009년 04월 02일 이종민
                var elements = Form.getElements(formObj);
                elements.each(function(element) {
                    if(element.id == fieldId){
                        element.remove();
                    }
                });                
                
                
            },

            /**
             * Form을 생성하여 리턴합니다.
             * @param {Array} data 히든필드에 저장할 데이터 [{key: value}]
             * @return {Object} 히든필드 정보가 들어있는 form Object
             */
            createForm: function(data){
                var virtualForm = document.createElement('form');

                if (data != null && data != undefined) {
                    for (var i = 0; i < data.length; i++) {
                        // 기존 로직대로 중복 허용함.
                        hana.JHanaUtils.form.createHiddenField(virtualForm, data[i].id, data[i].value, true);
                    }
                }

                return virtualForm;
            },

            /**
            * grid에서 반환한 jsonStr을 이용해서 Form을 생성하여 리턴합니다.
            *
            * @param {jsonStr} grid에서 반환한 jsonStr "[{"trscDt":"45","trscBrNo":"245","trscBnkCd":"235"}]"
            * @return {Object} 히든필드 정보가 들어있는 form Object
            */
           createFormByJsonStr: function(jsonStr, formObj){
//               var virtualForm = formObj || document.createElement('form');
               var virtualForm = document.createElement('form');

               if(formObj){
                   var formHash = Form.serialize(formObj, true);

                   for(var formFieldName in formHash){
                       hana.JHanaUtils.form.createHiddenField(virtualForm, formFieldName, formHash[formFieldName], true);
                   }
               }

               var json = jsonStr.evalJSON();

               for (var i = 0, len = json.length; i < len; i++) {
                   var hash = new Hash(json[i]);
                   var keys = hash.keys();
                   for(var j = 0; j < keys.length; j++){
                       var key = keys[j];
						//alert(key+"---"+hash[key]);
                       hana.JHanaUtils.form.createHiddenField(virtualForm, key, hash[key], true);
                   }
               }

               return virtualForm;
           },
            
            /**
             * as-is에서 사용하던 createFormSubmit Fuction. 
             * Form을 생성하여 지정한 URL로 Submit 합니다.
             * @param {Config} data 히든필드에 저장할 데이터 [{key: value}]
             * @param {String} url Submit 할 URL
             * @param {String} contentUrl index 페이지로 이동할 경우 content 영역에 표시할 url
             */
             createFormSubmit: function(data, url, contentUrl, formObj, isParentTarget){            	 
                var virtualForm = formObj || document.createElement('form');

                virtualForm.method = 'post';
				virtualForm.acceptCharset = 'UTF-8';
                virtualForm.action = opb.base.APPLICATION_CONTEXT_ROOT + url;
                if((typeof isParentTarget) != 'undefined' && isParentTarget == true) {
                	virtualForm.target = "_parent";
                }

                if( data != null){
                    for (var i = 0; i < data.length; i++){
                        // 기존 로직대로 중복 허용함.
                        hana.JHanaUtils.form.createHiddenField(virtualForm, data[i].id, data[i].value, true);
                    }
                }

                if( contentUrl ){
                    hana.JHanaUtils.form.createHiddenField(virtualForm, "contentUrl", contentUrl);
                }

                document.body.appendChild(virtualForm);

                if(opb.common.util.getBrowserInfo().MSIE) {
                	document.charset = virtualForm.acceptCharset;
                }
                
                
                virtualForm.submit();
            },


            /**
             * 엑셀 다운로드를 위한 Form을 생성하여 지정한 URL로 Submit 합니다.
             * @param {Config} data 히든필드에 저장할 데이터 [{key: value}]
             * @param {String} url Submit 할 URL
             * @param {String} contentUrl index 페이지로 이동할 경우 content 영역에 표시할 url
             */
            createFormSubmitForExcelDown: function(data, url, contentUrl){

                this.createFormSubmit(data, url, contentUrl);

                // 페이지 이동 시 로딩바 close
                opb.common.layerpopup.closeLoading_fnc();
            },

            /**
             * form 속성을 json String 으로 변환해서 반환합니다.
             * @param {HTMLElement} form Element
             */
            toJsonStr : function(formObj){
                var HashForm = Form.serialize(formObj, true);

                var array = new Array();
                array.push(HashForm);

                return array.toJSON();
            }
        },

        date : {
            /**
             * 두 날짜 사이의 일수를 계산하여 반환한다.
             * @param date1 문자열 데이터로 '20041012' 형식
             * @param date2 문자열 데이터로 '20041012' 형식
             */
            daysBetween : function(date1, date2) {
                date1 = new Date(date1.substring(0, 4), date1.substring(4, 6)-1, date1.substring(6,8));
                date2 = new Date(date2.substring(0, 4), date2.substring(4, 6)-1, date2.substring(6,8)).add();
                var DSTAdjust = 0;
                var oneMinute = 1000 * 60;
                var oneDay = oneMinute * 60 * 24;
                date1.setHours(0);
                date1.setMinutes(0);
                date1.setSeconds(0);
                date2.setHours(0);
                date2.setMinutes(0);
                date2.setSeconds(0);
                DSTAdjust = (date2.getTimezoneOffset( ) -
                                 date1.getTimezoneOffset( )) * oneMinute;
                var diff = date2.getTime( ) - date1.getTime() - DSTAdjust;
                return Math.ceil(diff/oneDay);
            },


            /**
             * 현재시각을 time형식으로 반환
             */
            getCurrentTime : function(){
                return this.toTimeString(new Date());
            },

            /**
             * 자바스크립트 Date 객체를 Time 스트링으로 변환
             * parameter date: JavaScript Date Object
             */
             toTimeString : function(date) { //formatTime(date)
                var year  = date.getFullYear();
                var month = date.getMonth() + 1; // 1월=0,12월=11이므로 1 더함
                var day   = date.getDate();
                var hour  = date.getHours();
                var min   = date.getMinutes();

                if (("" + month).length == 1) { month = "0" + month; }
                if (("" + day).length   == 1) { day   = "0" + day;   }
                if (("" + hour).length  == 1) { hour  = "0" + hour;  }
                if (("" + min).length   == 1) { min   = "0" + min;   }

                return ("" + year + month + day + hour + min)
             },
            /**
            * 현재 年을 YYYY형식으로 리턴
            */
            getYear : function(){
               var todayNow = new Date();
               return todayNow.getFullYear();
            },

            /**
            * 현재 月을 MM형식으로 리턴
            */
            getMonth : function() {
               var todayNow = new Date();

               var month = todayNow.getMonth() + 1; // 1월=0,12월=11이므로 1 더함
               if (("" + month).length == 1) { month = "0" + month; }

               return month;
            },

            /**
            * 현재 日을 DD형식으로 리턴

            */
            getDay : function() {
               var todayNow = new Date();

               var day = todayNow.getDate();
               if (("" + day).length == 1) { day = "0" + day; }

               return day;
            },
			
			/**
			 * template_master 가 실행될때 로컬과 서버사이의 시간을 계산한다.
			 */
			initServerTime : function(){
				//오늘 날짜 전역변수가 선언된 경우
				if(opb.base.SYSTEM_TODAY){
					var sysDt = new Date(opb.base.SYSTEM_TODAY);
					var localdt = new Date();
					
					opb.base.SYSTEM_LOCAL_SECONDS = sysDt.valueOf() - localdt.valueOf();
				} else {
					opb.base.SYSTEM_LOCAL_SECONDS = 0;
				}
			},

            /**
             * YYYYMMDD 로 오늘 날짜 반환
             */
            getToday : function(format){
				//format 예제 : 'Ymd' -> 20080301
				//             'Y-m-d H:i:s' -> 2008-03-01 14:50:20
				var fmt = format || "Ymd";
                var localDt = new Date();
				
				// 서버와의 시간차를 가져와서 계산해서 내려준다.
				var calculatedDt = new Date(localDt.valueOf() + opb.base.SYSTEM_LOCAL_SECONDS);
				
				var today = calculatedDt.format(fmt);
				
				return today;
            },
			
			/**
             * 현재 시간 객체를 가져온다.
             */
            getDateObject : function(){
                var localDt = new Date();
				
				// 서버와의 시간차를 가져와서 계산해서 내려준다.
				var calculatedDt = new Date(localDt.valueOf() + opb.base.SYSTEM_LOCAL_SECONDS);
				
				return calculatedDt;
            },
			

            /**
             * 날짜를 구한다.
             * @param days
             */
            getDays : function( days ){
                var before = this.getToday();
                var date = new Date(before.substring(0,4),Number(before.substring(4,6))-1,Number(before.substring(6,8))+Number(days));
                var year=String(date.getFullYear());
                var month=String(date.getMonth()+1);
                var day=String(date.getDate());

                if(month.length==1) month = "0"+ month;
                if(day.length==1) day= "0" + day;

                return ''+year+''+month+''+day;
            },


            /**
             * 특정날짜의 요일을 구한다
             * @param date1
             */
            getDayOfWeek: function(date1){
                var d = new Date(date1.substring(0,4), date1.substring(4,6)-1, date1.substring(6,8));
                var ww = d.getDay();
                return ww;
            },

            /**
             * 특정날짜 더하기
             *
             * 사용법 : date.addDate('20041012', 'D', 3 )
             *
             * @param date1 문자열 데이터로 '20041012' 형식
             * @param type 문자열 데이터로 'Y','M','D' 형식
             * @param cnt 문자열 데이터로 '3' 형식
             */
            addDate : function(date1, type, cnt) {
				var dt = Date.parseDate(date1, "Ymd");
	            var addType = Date.DAY;
				if( type == 'Y' ){
					addType = Date.YEAR;	
				}
				if( type == 'M' ){
					addType = Date.MONTH;
				}
				if( type == 'D' ){
					addType = Date.DAY;
				}
				
				dt = dt.add(addType, new Number(cnt));
	            return dt.format('Ymd');
            },

            /**
             * date format 입니다....
             */
            formatDate : function(str){
                var formatedDate;
                if( str ){
                    str = str.replace(/[^\d]/g,"");
                    var dt;
					if (str.length == 6) {
						var yyyy = str.substring(0,4);
						var mm = str.substring(4,6);
						
						formatedDate = yyyy +'-'+ mm;
					} else if( str.length == 8 ){
                        dt = Date.parseDate(str, 'Ymd');
                        formatedDate = dt.format("Y-m-d");
                    } else if( str.length == 14 ){
                        dt = Date.parseDate(str, 'YmdHis');
                        formatedDate = dt.format("Y-m-d H:i:s");
                    } else if (str.length == 12 ) {
						dt = Date.parseDate(str, 'YmdHi');
                        formatedDate = dt.format("Y-m-d H:i");
					}
                }

                return formatedDate;
            }
        },

        message : {
            /**
             * 알림 alert 표시
             * errMsgBox 를 사용함.
             * @param {String} alert 에 표시할 title
             * @param {String} alert 에 표시할 msg
             */
            alert : function (title, msg){
            	 opb.common.layerpopup.openMessage_fnc({
                    title    : title,
                    message  : msg,
                    callback : null
                });
            },

            /**
             * 선택 confirm 표시
             * @param {String} alert 에 표시할 title
             * @param {String} alert 에 표시할 msg
             * @param {Function} callback 후 실행 할 함수
             */
            confirm : function (title, msg, func){
            	 opb.common.layerpopup.openMessage_fnc({
                    isConfirm: true,
                    title    : title,
                    message  : msg,
                    callback : func
                });
            }
        },
            
        sort : {
            /**
             * sort 기능을 init 합니다.
             * sort 기능 수행 시 반드시 init 를 수행 후 실행해야 합니다.
             * @param tblId {String} 테이블 ID
             * @param colArr column type 배열
             */
            initSort : function(tblId, colArr) {
                var sortInstance = new SortableTable(document.getElementById(tblId), colArr);
                sortMap.put(tblId, sortInstance);
                pbk.changeImageObject = null;
            },


            /**
             * sort 헨들러
             * @param type
             * @param actionObj
             */
            handleSort : function(type, actionObj, bDescending, tblId) {
                //pbk.changeSortImage(actionObj);

            	if(tblId == undefined || tblId == '') {
            		sortMap.values()[0].sort(type, bDescending );
            	} else {
            		sortMap.get(tblId).sort(type, bDescending );
            	}
            }
        },

        util : {
            /**
             * 주민번호 체크
             */
            juminCheck : function( juminNumber ){
                var return_check = false;

                var str = juminNumber;

                num = 0;

                num7 = 0;

                num13 = 0;

                totalnum = 0;

                chknum = 0;

                num7 = parseInt(str.substring(6,7),10) ;

                num  = parseInt(str.substring(0,1),10)   * 2 +

                        parseInt(str.substring(1,2),10)   * 3 +

                        parseInt(str.substring(2,3),10)   * 4 +

                        parseInt(str.substring(3,4),10)   * 5 +

                        parseInt(str.substring(4,5),10)   * 6 +

                        parseInt(str.substring(5,6),10)   * 7 +

                        parseInt(str.substring(6,7),10)   * 8 +

                        parseInt(str.substring(7,8),10)   * 9 +

                        parseInt(str.substring(8,9),10)   * 2 +

                        parseInt(str.substring(9,10),10)  * 3 +

                        parseInt(str.substring(10,11),10) * 4 +

                        parseInt(str.substring(11,12),10) * 5;

                num13 = parseInt(str.substring(12,13),10);
                totalnum = num % 11;

                chknum   = 11 - totalnum;

                if(chknum >= 10 ) chknum = chknum - 10;

                if((num13 == chknum) && ( num7 == 1 || num7 == 2 ||  num7 == 3 ||  num7 == 4 ||  num7 == 5 ||  num7 == 6))    {

                    return_check = true;

                } else {

                    if (num7 == 5 || num7 == 6){

                        return_check =  true;

                    }else{

                        return_check =  false;

                    }

                }

                return return_check;
            },
            
            /**
             * 입력받은 문자열 중 주민번호형식이 있는지 체크하여 검색된 문자열 return
             * contents : 입력항목의 value
             * type : 1 패턴체크만, 2 패턴및 검증 [기본은 패턴체크]
             */
            isStringWithJuminNo : function(contents, type){
            	var resultVal ="";
                var result = hana.JHanaUtils.util.checkJuminNoPattern(contents);
                if(result != null ){
                    
                    if(2 == type && !hana.JHanaUtils.util.isJuminNoValid(result[0]) ){
                    	resultVal = "";
                    }else{
                    	resultVal = result[0];
                    }
                }else{
                	resultVal = "";
                }
                
                return resultVal;
            },
 
            /**
             * 입력받은 문자열 중 주민번호형식(pattern)이 있는지 체크하여 배열값 리턴.
             */
            checkJuminNoPattern : function( contents ){
                var re = /(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))[- ]?[1-8][0-9]{6}/g;
                return contents.match(re);
            },
            
            /**
             * 입력받은 문자열이 주민번호가 맞는지 검증하여 true,false 리턴
             */
            isJuminNoValid : function( juminNo ){
                var strJumin = juminNo.replace("-","");
                strJumin = strJumin.replace(" ","");
                if(strJumin.length != 13)   return false;
                
                var checkBit = new Array(2,3,4,5,6,7,8,9,2,3,4,5);
                var num7 = strJumin.charAt(6);
                var num13 = strJumin.charAt(12);
                var total = 0;
                
                //주민번호 12자리를 키값으로 곱하여 합산.
                for(var i=0; i<checkBit.length; i++){
                    total += strJumin.charAt(i)*checkBit[i];
                }
                
                //내,외국인구분 > [1800년대 0:여자, 9:남자 내국인],[5~8 외국인],[1~4 90년대 00년대 내국인] 
                if(num7 > 4 && num7 < 9 )   total = (13-(total%11)) % 10;
                else                        total = (11-(total%11)) % 10;
                
                if(total == num13)  return true;
                else                return false;
            },

            /**
             * 이메일 체크
             * @param email
             */
            checkEmail : function( email ){
                var ascii;
                var j = 0;
                var k = 0;

                for( i = 0; i < email.length; i++) {
                    ascii = email.charCodeAt(i);
                     if (ascii == 64)  j++;   // 이메일에 @ 체크
                     if (ascii == 46)  k=1;   // 이메일에 . 체크
                    // 숫자인지 영문자인지 체크
                     if ( !((ascii >= 97 && ascii <= 122 ) || (ascii >= 64 && ascii <= 90 ) || (ascii >= 48 && ascii <= 57 ) || (ascii == 45) || (ascii == 46) || (ascii == 95) )) {
                    	 opb.common.layerpopup.openMessage_fnc({
                            title: '이메일 체크',
                            message: "이메일 주소는  A~Z,a~z,0~9,특수문자 ._- 만 입력 가능합니다."  
                        });
                        return false;
                    }
                }

                if ( !(j==1) ) {
                	opb.common.layerpopup.openMessage_fnc({
                            title: '이메일 체크',
                            message: "이메일에 @ 표시가 없거나 2개 이상입니다. 확인 후 재입력해주세요."
                        });
                    return false;
                }

                if ( !(k==1) ) {
                	opb.common.layerpopup.openMessage_fnc({
                            title: '이메일 체크',
                            message: "이메일에 . 표시가 없습니다. 확인 후 재입력해주세요."
                        });
                    return false;
                }

                if (ascii==46) {  // 맨 마지막 값이 . 이면
                	opb.common.layerpopup.openMessage_fnc({
                            title: '이메일 체크',
                            message: " . 표시 뒤에 글자가 없습니다. 확인 후 재입력해주세요."
                        });
                    return false;
                }

               return true ;
            },
			
			/**
             * 공백을 제거 한다.
             * @param strMsg
             */
            trim : function( stringToTrim ){
                return stringToTrim.replace(/(^\s*)|(\s*$)|($\s*)/g, "");
            },

            /**
             *
             * @param str1
             * @param str2
             */
            replaceAll : function( target, str1, str2 ){

                var temp_str = "";

                //target 이 null 일경우 에러 발생함. target 이 존재할 경우만 실행함 2009.02.19 김상준.
                if (target && this.trim( target ) != "" && str1 != str2)
                {
                    temp_str = this.trim( target );

                    while (temp_str.indexOf(str1) > -1)
                    {
                        temp_str = temp_str.replace(str1, str2);
                    }
                }
                return temp_str;
            },
			
            /**
             * 자릿수 만큼 공백을 0으로 채운다.
             *
             * @param nValue
             * @param len
             */
			prependZero : function(nvalue, len) {
		        while(nvalue.toString().length < len) {
		            nvalue = "0" + nvalue;
		        }
		        return nvalue;
			},

			
			/**
			 * 자릿수 만큼 공백을 왼쪽부터 str로 채운다.
			 * @param {Object} nvalue - 입력받은 문자열
			 * @param {Object} len - 문자열을 포함한 전체 길이
			 * @param {Object} str - 공백일 경우 치환할 문자열
			 */
			lPad : function(nvalue, len, str){
				if (nvalue != null && nvalue != '') {
					var newStr = '';
					if (nvalue.length < len) {
						for (var i = 0; i < len - nvalue.length; i++) {
							newStr = newStr + str
						}
						newStr = newStr + nvalue;
					}
					else {
						newStr = nvalue;
					}
					return newStr;
				} else {
					return "";
				}
			},
			
			/**
			 * 자릿수 만큼 공백을 오른쪽부터 str로 채운다.
			 * @param {Object} nvalue - 입력받은 문자열
			 * @param {Object} len - 문자열을 포함한 전체 길이
			 * @param {Object} str - 공백일 경우 치환할 문자열
			 */			
			rPad : function(nvalue, len, str){
				if (nvalue != null && nvalue != '') {
					var newStr = '';
					if (nvalue.length < len) {
						for (var i = 0; i < len - nvalue.length; i++) {
							newStr = newStr + str
						}
						newStr = nvalue + newStr;
					}
					else {
						newStr = nvalue;
					}
					return newStr;
				} else {
					return "";
				}
			},
			
			/**
			 * 자릿수 만큼 공백을 str로 채운다, 공백도  
			 * @param {Object} nvalue - 입력받은 문자열
			 * @param {Object} len - 문자열을 포함한 전체 길이
			 * @param {Object} str - 공백일 경우 치환할 문자열
			 */			
			rPadb : function(param, len, pad) {

			var j =0;
				for (var i = this.getByteLength(param); i<len; i++) {
					j++;
				 	param = param + pad;
				}

				return param;
			},
			
			/**
			 * 한글을 2byte 로 인식해서 길이를 구함
			 */
			getByteLength : function(value) {
			
				var byteLength = 0;
				
				for(var inx = 0; inx < value.length; inx++){
					var oneChar = escape(value.charAt(inx));
					if(oneChar.length == 1) byteLength ++;
					else if(oneChar.indexOf("%u") != -1) byteLength += 2;
					else if(oneChar.indexOf("%") != -1) byteLength += oneChar.length/3;
				}
				
				return byteLength;
			}		

        },


        /**
         * 그리드 설정 정보
         */
        gridConfig : {
            /**
             * 검색 조건
             */
            SearchCondition : "",
            /**
             * ??
             */
            ItemsetView : true,

            /**
             * 엑셀 업로드 팝업창
             */
            FILE_TYPE : {
                         "1":"Excel File(*.Xls)|*.xls|",
                         "2":"Excel File(*.csv)|*.csv|",
                         "3":"Text File(*.TXT)|*.txt|"
                        }
        },

        grid : {

            /**
             * 그리드 설정 정보를 init 합니다.
             */
            initConfig : function(){
                hana.JHanaUtils.gridConfig.SearchCondition = "";
                hana.JHanaUtils.gridConfig.ItemsetView = true;
            },

            /**
             * grid를 찾습니다.
             * @param grid
             */
            findGrid : function(grid, func){
                var gridObj = document.getElementById(grid);

                if( gridObj != null ){
                    return gridObj;
                }

                //개발 시 에만 사용함..
                opb.common.layerpopup.openAlert_fnc("오류", func + " : 호출 시 '"+grid+"' 에 해당하는 그리드를 찾을 수 없습니다.<br/> 그리드 ID 를 확인해 주세요!!");
            },

            /**
             * 삭제 수행
             * @param grid
             * @param baseColumn
             */
            deleteRows : function(gridObj, baseColumn) {
                var i;
                var nRecIdx;
                var nCol_idx = gridObj.GetItemIndexFromCaption(baseColumn);
                if (nCol_idx < 0) return;

                gridObj.BeginUpdate();

                try {
                    for(i=gridObj.RowCount-1; i>=0; i--) {
                        nRecIdx = gridObj.GetRecordFromRow(i);
                        if (gridObj.GetValue(nRecIdx, nCol_idx) == true) {
                            gridObj.DeleteRecord(nRecIdx);
                        }
                    }
                } finally {
                    gridObj.EndUpdate();
                }
            }
		},
		
		window: {
			submitForm : null,
			popUpDrmWindow : function(url,width,height,formObj,tileAction){
				 hana.JHanaUtils.window.submitForm = formObj;
				 var win=null;
				 var w=width;   // 팝업창 넓이
				 var h=height;   // 팝업창 높이  
				 var winl = (screen.width-w)/2;
				 var wint = (screen.height-h)/2;
				 var settings  ='height='+h+',';
				  settings +='width='+w+',';
				  settings +='top='+wint+',';
				  settings +='left='+winl+',';
				  settings +='scrollbars=no,';
				  settings +='resizable=no';
				 
				  var blank_url = document.location.protocol + "//" + document.location.host + "/markany_total/html/blank.html";
				 win=window.open(blank_url,"popupWindow",settings);

				 var submitForm = formObj;
				 var formId = null;
				 if (formObj==null || formObj == undefined){ 
					if ($('_FormDRMExta')==null || $('_FormDRMExta') == undefined) {										
					    submitForm = hana.JHanaUtils.form.createForm();
					    document.body.appendChild(submitForm);
						submitForm.id = '_FormDRMExta';	
					 	hana.JHanaUtils.form.createHiddenField($('_FormDRMExta'),'contentUrl',url); 
					} else {
						submitForm = $('_FormDRMExta');
						hana.JHanaUtils.form.removeHiddenField($('_FormDRMExta'),'contentUrl'); 
						hana.JHanaUtils.form.createHiddenField($('_FormDRMExta'),'contentUrl',url); 
					}
					formId = submitForm.id;
					hana.JHanaUtils.window.submitForm = submitForm;
					document.forms[formId].target = 'popupWindow';
					document.forms[formId].action = tileAction;
					document.forms[formId].submit();
				 } else {	
				    if (submitForm.id) {
						formId = submitForm.id;
					}
					else {
						submitForm.id = '_FormDRMExta';
						formId = submitForm.id;
					}	 	
				 	hana.JHanaUtils.form.removeHiddenField(submitForm,'contentUrl');
				 	hana.JHanaUtils.form.createHiddenField(submitForm,'contentUrl',url); 
					document.forms[formId].target = 'popupWindow';
					document.forms[formId].action = tileAction;
                    document.forms[formId].method = "post";
					document.forms[formId].submit();
				 }
				 hana.JHanaUtils.window.submitForm = null;
				 
				 if(parseInt(navigator.appVersion) >= 4){win.window.focus();}	
			},
			popup : {
				modal : {
			
			        /**
			         * window.showModalDialog 실행
			         * @param {config}
			         * 사용법 : hana.JHanaUtils.window.popup.modal.openPop({url:'/wizard/index.do',dialogWidth:'885px',dialogHeight:'633px'});
			         */		
					openPop : function(config){
						var defultConfigObj = {
							url				: "",				//주소
							popupModalDiv 	: "popupWindow", 	//모달창 이름
							dialogWidth 	: "300",			//가로
							dialogHeigth 	: "200",			//세로
							center			: "yes",			//위치
							status			: "no",				//
							scroll			: "no",				//
							resizable		: "no"				//
						};
						
						var configObj;
						
						configObj = Ext.apply({},config,defultConfigObj);
						var url = configObj.url;
						var configTemp = 'dialogWidth:'+configObj.dialogWidth;
							configTemp += ';dialogHeight:'+configObj.dialogHeight;
							configTemp += ';center:'+configObj.center;
							configTemp += ';status:'+configObj.status;
							configTemp += ';scroll:'+configObj.scroll;
							configTemp += ';resizable:'+configObj.resizable;
			
						window.showModalDialog(pbk.APPLICATION_CONTEXT_ROOT +url, configObj.popupModalDiv, configTemp);
						
					},
					
					closePopup : function(){
						window.close(this);
					}
					
				}
			}
			
		}
    }
}();


/********** shortname ***********/
var cookie    = hana.JHanaUtils.cookie;
var html      = hana.JHanaUtils.html;
var viewport  = hana.JHanaUtils.viewport;
var input     = hana.JHanaUtils.input;
var checkbox  = hana.JHanaUtils.checkbox;
var selectbox = hana.JHanaUtils.selectbox;
var radiobox  = hana.JHanaUtils.radio;
var form      = hana.JHanaUtils.form;
var date      = hana.JHanaUtils.date;
var sort      = hana.JHanaUtils.sort;
var grid      = hana.JHanaUtils.grid;
var util      = hana.JHanaUtils.util;
var windowutil = hana.JHanaUtils.window;