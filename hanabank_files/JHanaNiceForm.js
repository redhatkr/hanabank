/*#############################################################
Name: Niceforms
Version: 1.0
Author: Lucian Slatineanu
URL: http://www.badboy.ro/

Feel free to use and modify but please provide credits.
#############################################################*/

/*****************************************************************************
* 파일명 : JHanaNiceForm.js
* 작성일 : 2008. 2. 12
* 작성자 : ork
* 설   명 : general HTML element 를 파싱을 통해서 element 에 동적으로 CSS를 적용한다.
*
* Dependency  : prototype.js
* ===========================================================================
* 변경이력:
* DATE             AUTHOR        DESCRIPTION
* ---------------------------------------------------------------------------
* 2007.1.      Lucian Slatineanu       1.0 release
* 2008.2.12    Oh,Ryunkyong     클로져 개념을 도입하여 public method init을 통해서만 사용할 수 있도록 수정.
* 2008.2.26    Oh,Ryunkyong     replaceTexts() 스타일만 변경하도록 수정
* 2008.2.27    Oh,Ryunkyong     keyword - 2008.02.27 ork  : css 관련 변경
* 2008.5.06    Kim,Sangjun      text, password 필드만을 위한 js 로 수정
* 2008.5.13    Oh,Ryunkyong     acctdollar, engnumext, bizno filter 추가
* 2008.12.18   오륜경           20081218-1 입력가능한지 여부를 파싱한다.
* 2009.02.16   오륜경           emailaddr filter 추가
* 2009.03.02   오륜경           acctNm filter 추가
* 2009.03.03   Kim,Jun          acctLen,acctdollarLen filter 추가(acct maxlength 체크시 ',' 자리수 제외한 길이 체크)
* 2009.07.01   Geunwon,Mo       20090701-1 engkornumspace 영어,한글,숫자,공백만 허용 필터 추가
* 2011.05.25	양균수		 	 IE외에 타브라우져에서도 호출가능하도록 호출방식 변경.
* 								 (ex> objForm.niceClass -> objForm.getAttribute("niceClass") )
* 2015.09.30	남기승			niceClass 속성 HTML5 대응 data-nice-class으로 변경
* 									ex) objForm.getAttribute("niceClass") -> $j(objForm).data("niceClass")
* 변경 이력은 이곳에 추가 합니다.
*****************************************************************************/



hana.JHanaNiceForms = {

	/**
	 * className 정의 Array
	 * @param obj
	 * @param length
	 */
	classNameArr : [ "cal", "num", "nokor", "eng", "engnum", "acct", "acctdollar", "engnumext", "bizno", "onlykor", "emailaddr", "acctNm", "engkor", "engkornum", "engkornumext", "engkornumspace", "tel" ],

	/**
	 * className 값 별로 정의 된 control
	 * 추가 설정 및 변경은 여기서 합니다.
	 */
	ControlMap : {
		/* 날짜 */
		"cal" : function(obj)
		{
			//alert(obj);
			hana.JHanaNiceForms.setDisableIME(obj);
			/*
			$j(obj).keydown( function(evt)
			{
				hana.JHanaNiceForms.numFilter(evt);
				hana.JHanaNiceForms.makeDateStr(obj);
			});
			*/
			hana.JHanaNiceForms.afterFilter(obj, '[`0-9]');
			$j(obj).keyup( function()
			{
				hana.JHanaNiceForms.makeDateStr(obj);
			});
			hana.JHanaNiceForms.setMaxLength(obj, 10);
		},

		/* 숫자만 */
		"num" : function(obj, length, extChars)
		{
			hana.JHanaNiceForms.setDisableIME(obj);
			/*
			$j(obj).keydown( function(evt)
			{
				hana.JHanaNiceForms.numFilter(evt);
			});
			*/
			hana.JHanaNiceForms.afterFilter(obj, '[`0-9]', extChars);
			hana.JHanaNiceForms.setMaxLength(obj, length);
		},

		/* 한글방지 */
		"nokor" : function(obj, length)
		{
			hana.JHanaNiceForms.mozillaForceKeyup($j(obj).attr('id'));
			hana.JHanaNiceForms.setDisableIME(obj);

			hana.JHanaNiceForms.nokorFilter(obj);
			
			hana.JHanaNiceForms.setMaxLength(obj, length);
		},

		/* 영어만 */
		"eng" : function(obj, length, extChars)
		{
			hana.JHanaNiceForms.setDisableIME(obj);
			/*
			$j(obj).keydown( function(evt)
			{
				hana.JHanaNiceForms.engFilter(evt);
			});
			*/
			hana.JHanaNiceForms.afterFilter(obj, '[`a-zA-Z]', extChars);
			
			hana.JHanaNiceForms.setMaxLength(obj, length);
		},

		/* 영어, 숫자  */
		"engnum" : function(obj, length, extChars)
		{
			hana.JHanaNiceForms.setDisableIME(obj);
			/*
			$j(obj).keydown( function(evt)
			{
				hana.JHanaNiceForms.engNumFilter(evt);
			});
			*/
			hana.JHanaNiceForms.afterFilter(obj, '[`0-9a-zA-Z]', extChars);
			
			hana.JHanaNiceForms.setMaxLength(obj, length);
		},

		/* 화폐(원) */
		"acct" : function(obj, length)
		{
			hana.JHanaNiceForms.setDisableIME(obj);
			obj.setStyle( {
				"text-align" : "right"
			});
			/*
			$j(obj).keydown( function(jevent)
			{
				hana.JHanaNiceForms.numFilter(jevent, obj);
			});
			*/
			hana.JHanaNiceForms.afterFilter(obj, '[`0-9]');
			
			$j(obj).keyup( function(jevent)
			{
				hana.JHanaUtils.input.toMoney(obj);
			});

			/* length 에 ',' 자리수 더해준다. */
			if (length && parseInt(length, 10) > 3)
			{
				length = parseInt(length, 10);
				length = length + parseInt((length - 1) / 3, 10);
			}

			hana.JHanaNiceForms.setMaxLength(obj, length);
		},

		/* 화폐(달러) */
		"acctdollar" : function(obj, length)
		{
			hana.JHanaNiceForms.setDisableIME(obj);
			obj.setStyle( {
				"text-align" : "right"
			});
			$j(obj).keydown( function(evt)
			{
				hana.JHanaNiceForms.dollarFilter(evt, obj);
				hana.JHanaUtils.input.toMoney(obj);
			});
			Event.observe(obj, "focusout", function()
			{
				hana.JHanaUtils.input.toDollarMoney(obj);
			}, false);

			/* length 에 ',' 자리수 더해준다. */
			if (length && parseInt(length, 10) > 3)
			{
				length = parseInt(length, 10);
				length = length + parseInt((length - 1) / 3, 10);
			}

			hana.JHanaNiceForms.setMaxLength(obj, length);
		},

		/* 영어+숫자+ -,.() 만 입력 가능 */
		"engnumext" : function(obj, length, extChars)
		{
			hana.JHanaNiceForms.setDisableIME(obj);
			
			if(extChars == undefined) {
				extChars = ['-', '_', ' ', '(', ')'];
			}
			/*
			$j(obj).keydown( function(evt)
			{
				hana.JHanaNiceForms.engNumExtFilter(evt, extChars);
			});
			*/
			hana.JHanaNiceForms.afterFilter(obj, '[`0-9a-zA-Z]', extChars);

			$j(obj).keyup( function()
			{
				hana.JHanaNiceForms.removeKo_fnc(obj);
			});
			hana.JHanaNiceForms.setMaxLength(obj, length);
		},

		/*  사업자번호 000-00-00000 */
		"bizno" : function(obj)
		{
			hana.JHanaNiceForms.setDisableIME(obj);
			/*
			$j(obj).keydown( function(evt)
			{
				hana.JHanaNiceForms.numFilter(evt);
				//hana.JHanaNiceForms.makeBizNoStr(obj);
			});
			*/
			hana.JHanaNiceForms.afterFilter(obj, '[`0-9]');				
			$j(obj).keyup( function()
			{
				hana.JHanaNiceForms.makeBizNoStr(obj);
			});
			hana.JHanaNiceForms.setMaxLength(obj, 12);
		},

		/* 한글만 입력 */
		"onlykor" : function(obj, length, extChars)
		{
			hana.JHanaNiceForms.setActiveIME(obj);
			/*
			$j(obj).keydown( function(evt)
			{
				hana.JHanaNiceForms.onlykorFilter(evt);
			});
			*/
			hana.JHanaNiceForms.afterFilter(obj, '[`ㄱ-힣]', extChars);
/*			
			$j(obj).keyup( function(evt)
			{
				hana.JHanaNiceForms.onlykorFilter(evt);
			});
*/			
			hana.JHanaNiceForms.setMaxLength(obj, length);
		},

		/* 영어+숫자+ -,_,.,~ 만 입력 가능 */
		"emailaddr" : function(obj, length)
		{
			hana.JHanaNiceForms.setDisableIME(obj);
			/*
			$j(obj).keydown( function(evt)
			{
				hana.JHanaNiceForms.eMailAddrFilter(evt);
			});
			*/
			hana.JHanaNiceForms.afterFilter(obj, '[`0-9a-zA-Z]', ['.', '-', '_']);
			
			hana.JHanaNiceForms.setMaxLength(obj, length);
		},

		/* 영어+한글+숫자+ -,_,(,) 만 입력 가능 */
		"acctNm" : function(obj, length, extChars)
		{
			
			if(extChars == undefined) {
				extChars = ['-', '_', '(', ')'];
			}
			
			hana.JHanaNiceForms.setActiveIME(obj);
			/*
			$j(obj).keydown( function(evt)
			{
				hana.JHanaNiceForms.acctNmFilter(evt);
			});
			*/
			hana.JHanaNiceForms.afterFilter(obj, '[`0-9a-zA-Zㄱ-힣]', extChars);
			
			hana.JHanaNiceForms.setMaxLength(obj, length);
		},

		/* 영어+한글 ~ 만 입력가능 */
		"engkor" : function(obj, length, extChars)
		{
			hana.JHanaNiceForms.setActiveIME(obj);
			/*
			$j(obj).keydown( function(evt)
			{
				hana.JHanaNiceForms.engkorFilter(evt);
			});
			*/
			hana.JHanaNiceForms.afterFilter(obj, '[`a-zA-Zㄱ-힣]', extChars);
			
			hana.JHanaNiceForms.setMaxLength(obj, length);
		},

		/* 영어+한글 숫자 만 입력가능 */
		"engkornum" : function(obj, length, extChars)
		{
			hana.JHanaNiceForms.setActiveIME(obj);
			/*
			$j(obj).keydown( function(evt)
			{
				hana.JHanaNiceForms.engkornumFilter(evt);
			});
			*/
			hana.JHanaNiceForms.afterFilter(obj, '[`0-9a-zA-Zㄱ-힣]', extChars);
			
			hana.JHanaNiceForms.setMaxLength(obj, length);
		},

		/* 영어+한글+숫자+ -,_,(,) 만 입력 가능  */
		"engkornumext" : function(obj, length, extChars)
		{
			if(extChars == undefined) {
				extChars = ['-', '_', '(', ')'];
			}
			
			hana.JHanaNiceForms.setActiveIME(obj);
			/*
			$j(obj).keydown( function(evt)
			{
				hana.JHanaNiceForms.acctNmFilter(evt);
			});
			*/
			hana.JHanaNiceForms.afterFilter(obj, '[`0-9a-zA-Zㄱ-힣]', extChars);
			
			hana.JHanaNiceForms.setMaxLength(obj, length);
		},

		/* 영어+ -,_,(,) 만 입력 가능 - 추가 유민재 2009.04.14 */
		"engext" : function(obj, length, extChars)
		{
			if(extChars == undefined) {
				extChars = ['-', '_', '(', ')'];
			}
			
			hana.JHanaNiceForms.setDisableIME(obj);
			/*
			$j(obj).keydown( function(evt)
			{
				hana.JHanaNiceForms.engExtFilter(evt);
			});
			*/
			hana.JHanaNiceForms.afterFilter(obj, '[`a-zA-Z]', extChars);
			
			hana.JHanaNiceForms.setMaxLength(obj, length);
		},

		/* 영어,한글,숫자,스페이스 허용, 20090701-1 */
		"engkornumspace" : function(obj, length, extChars)
		{
			hana.JHanaNiceForms.setActiveIME(obj);
			/*
			$j(obj).keydown( function(evt)
			{
				hana.JHanaNiceForms.engKorNumSpaceFilter(evt);
			});
			*/
			hana.JHanaNiceForms.afterFilter(obj, '[`0-9a-zA-Zㄱ-힣]', [' '].concat(extChars));
			
			hana.JHanaNiceForms.setMaxLength(obj, length);
		},

		/* 전화번호, 숫자 - 만 입력 가능 */
		"tel" : function(obj)
		{
			hana.JHanaNiceForms.setDisableIME(obj);
			/*
			$j(obj).keydown( function(evt)
			{
				hana.JHanaNiceForms.telFilter(evt);
			});
			*/
			hana.JHanaNiceForms.afterFilter(obj, '[`0-9]', ['-']);
			
			$j(obj).keyup( function()
			{
				hana.JHanaNiceForms.removeKo_fnc(obj);
			});

			hana.JHanaNiceForms.setMaxLength(obj, 13);
		}

	},

	/**
	 * maxlength 지정
	 * focus 이동
	 * @param obj
	 * @param length
	 */
	setMaxLength : function(obj, length)
	{
		if (length)
		{
			if (opb.common.util.isEmpty_fnc($j(obj).attr('maxlength')))
			{
				$j(obj).attr('maxlength', length);
			}
		}
	},

	/**
	 * 한글입력일때 추가 확인
	 * @param e
	 */
	afterFilter : function(obj, strReqExp, arrExt)
	{
		
			$j(obj).keyup( function(e)
			{
				var evt = e || window.event;

				var isTarget = false;
				if (typeof evt.target != 'undefined')
				{
					isTarget = true;
				}
				
				var regTemp = new RegExp(strReqExp);
				var strValue = (isTarget) ? evt.target.value : evt.srcElement.value;
				
				if(strValue != null && strValue != '') {
					
					//var tmpChar = strValue.substring(strValue.length - 1);
					var len = strValue.length;
					var removeChars = [];
					var breakIdx = 0;
					for(var i = len-1; i > -1; i--) {
						
						var tChar = strValue.charAt(i);
						if(arrExt != null && arrExt != '' && arrExt.indexOf(tChar) > -1) {
							continue;
						}

						if(breakIdx++ > 10) {
							break;
						}
						if(!regTemp.test(tChar) ){
							removeChars[removeChars.length] = tChar;
						}
					}
					
					if(removeChars.length > 0) {
						for(var i = 0; i < removeChars.length; i++) {
							strValue = strValue.replace(removeChars[i], '');
						}
					
						if (isTarget)
						{
							evt.target.value = strValue;	//strValue.substring(0, strValue.length - 1);
						}
						else
						{
							evt.srcElement.value = strValue;	//strValue.substring(0, strValue.length - 1);
						}
					}
/*					
					while(!regTemp.test(tmpChar)) {
						
						if(arrExt != null && arrExt != '' && arrExt.indexOf(tmpChar) > -1) {
							return;
						}
						
						strValue = strValue.substring(0, strValue.length - 1);
						if (isTarget)
						{
							evt.target.value = strValue;	//strValue.substring(0, strValue.length - 1);
						}
						else
						{
							evt.srcElement.value = strValue;	//strValue.substring(0, strValue.length - 1);
						}

						//strValue = (isTarget) ? evt.target.value : evt.srcElement.value;
						if(strValue == null && strValue == '') {
							return;
						}
						tmpChar = strValue.substring(strValue.length - 1);
						if(tmpChar == '') {
							return;
						}
					}
*/					
				}
			});
			
	},

	
	/**
	 * 오직 숫자만 입력 가능합니다.
	 * @param e
	 */
	numFilter : function(e)
	{
		var evt = e || window.event;
		var kCode = evt.which || evt.keyCode;

		//if(!(hana.JHanaNiceForms._os_is_linux && hana.JHanaNiceForms._browser_is_opera))
		//{
			/* backspace ,tab(9),enter(13),shift(16),end(35),home(36),방향키(좌(37),상(38),우(49),하(40)),delete(46) 등등.. */
			var controlKeys = new Array(Event.KEY_BACKSPACE, Event.KEY_TAB, Event.KEY_RETURN, Event.KEY_ESC, Event.KEY_ESC, Event.KEY_LEFT, Event.KEY_UP, Event.KEY_RIGHT, Event.KEY_DOWN, Event.KEY_DELETE, Event.KEY_HOME, Event.KEY_END, Event.KEY_PAGEUP, Event.KEY_PAGEDOWN);
	
			/* 조작키이면 종료 */
			if (controlKeys.include(kCode)) { return; }
	
			var keyCode = parseInt(kCode);
			/* SHIFT 이면 리턴 */
			if (evt.shiftKey)
			{
				Event.stop(evt);
				return false;
			}
	
			/*  48 ~ 57 (상단 숫자 키코드), 96 ~ 105 (우측 숫자 키코드) 범위가 아니면 event false  */
			if (!(keyCode >= 48 && keyCode <= 57) && !(keyCode >= 96 && keyCode <= 105))
			{
				Event.stop(evt);
				return false;
			}
		//}
	},

	/**
	 * 영어와 숫자만 입력가능함.
	 * @param {Object} e
	 */
	engNumFilter : function(e)
	{
		var evt = e || window.event; /* 파이어폭스가 아니면 window.event 를 할당 하고 파이어폭스이면 evt 할당 */
		var _event_obj = evt.srcElement || evt.target; /* firefox 는 target 에서 나온다 */
		var kCode = evt.which || evt.keyCode;
		var keyCodeNO = parseInt(kCode); /* 숫자로 비교하기 위해 */
		var sKey = String.fromCharCode(kCode);

		hana.JHanaNiceForms.debugKey(evt);

		//if(!(hana.JHanaNiceForms._os_is_linux && hana.JHanaNiceForms._browser_is_opera))
		//{
			/* backspace ,tab(9),enter(13),shift(16),end(35),home(36),방향키(좌(37),상(38),우(49),하(40)),delete(46) 등등.. */
			var controlKeys = new Array(Event.KEY_BACKSPACE, Event.KEY_TAB, Event.KEY_RETURN, Event.KEY_ESC, Event.KEY_ESC, Event.KEY_LEFT, Event.KEY_UP, Event.KEY_RIGHT, Event.KEY_DOWN, Event.KEY_DELETE, Event.KEY_HOME, Event.KEY_END, Event.KEY_PAGEUP, Event.KEY_PAGEDOWN);
	
			/* 조작키이면 종료 */
			if (controlKeys.include(kCode) || evt.shiftKey == undefined) { return; }
	
			/* 쉬프트 + 영문이 아니면 리턴 */
			var reTemp1 = new RegExp('[a-zA-Z]');
			if (evt.shiftKey && !reTemp1.test(sKey))
			{
				evt.returnValue = false;
				evt.keyCode = 0;
				evt.which = 0;
				Event.stop(evt);
				return false;
			}
	
			/*우측 숫자판의 '0' 의 키값 추가함. 2009.02.11 김상준  */
			var filter = '[`0-9a-zA-Z]';
			var re = new RegExp(filter);
			if (!re.test(sKey))
			{
				Event.stop(evt);
				return false;
			}
			
		//}
	},
	
	/**
	 * #.## 만 입력가능합니다.
	 * @param {Object} e
	 */
	dollarFilter : function(e)
	{
		var evt = e || window.event;
		var kCode = evt.which || evt.keyCode;

		//if(!(hana.JHanaNiceForms._os_is_linux && hana.JHanaNiceForms._browser_is_opera))
		//{
			/* backspace ,tab(9),enter(13),shift(16),end(35),home(36),방향키(좌(37),상(38),우(49),하(40)),delete(46) 등등.. */
			var controlKeys = new Array(Event.KEY_BACKSPACE, Event.KEY_TAB, Event.KEY_RETURN, Event.KEY_ESC, Event.KEY_ESC, Event.KEY_LEFT, Event.KEY_UP, Event.KEY_RIGHT, Event.KEY_DOWN, Event.KEY_DELETE, Event.KEY_HOME, Event.KEY_END, Event.KEY_PAGEUP, Event.KEY_PAGEDOWN);
	
			/* 조작키이면 종료 */
			if (controlKeys.include(kCode)) { return; }
	
			var keyCode = parseInt(kCode);
	
			/* SHIFT 이면 리턴 */
			if (evt.shiftKey)
			{
				Event.stop(evt);
				return false;
			}
	
			/* 48 ~ 57 (상단 숫자 키코드), 96 ~ 105 (우측 숫자 키코드) 범위가 아니면 event false 소숫점 190 == . */
			if (!(keyCode >= 48 && keyCode <= 57) && !(keyCode >= 96 && keyCode <= 105) && keyCode != 190 && keyCode != 110)
			{
				Event.stop(evt);
				return false;
			}
		//}
	},

	/**
	 * 영문/숫자 ( , . ) - 만 입력가능합니다.
	 * @param {Object} e
	 */
	engNumExtFilter : function(e)
	{
		var evt = e || window.event;
		var kCode = evt.which || evt.keyCode;

		//if(!(hana.JHanaNiceForms._os_is_linux && hana.JHanaNiceForms._browser_is_opera))
		//{
			/* backspace ,tab(9),enter(13),shift(16),end(35),home(36),방향키(좌(37),상(38),우(49),하(40)),delete(46) 등등.. */
			var controlKeys = new Array(Event.KEY_BACKSPACE, Event.KEY_TAB, Event.KEY_RETURN, Event.KEY_ESC, Event.KEY_ESC, Event.KEY_LEFT, Event.KEY_UP, Event.KEY_RIGHT, Event.KEY_DOWN, Event.KEY_DELETE, Event.KEY_HOME, Event.KEY_END, Event.KEY_PAGEUP, Event.KEY_PAGEDOWN);
	
			/* 조작키이면 종료 */
			if (controlKeys.include(kCode)) { return; }
	
			var keyCode = parseInt(kCode);
	
			var sKey = String.fromCharCode(kCode);
	
			/* SHIFT 이면서 ( ) 가 아니거나 SHIFT이면서 영문이 아니면 return */
			var reTemp = new RegExp('[`0-9a-zA-Z]');
			var reTemp1 = new RegExp('[A-Z]');
	
			/* shift 눌린 상태에서 숫자키코드라면(특수문자가 찍힘) pass : () */
			if ((evt.shiftKey && (('' + keyCode == '57') || ('' + keyCode == '48'))))
			{
				/* ignored */
			}
			else if (evt.shiftKey && !reTemp1.test(sKey))
			{
				Event.stop(evt);
				return false;
			}
			else
			{
				/* 스페이스(공백)은 허용 */
				if (('' + keyCode != '32'))
				{
					/* ¾(.) ¼(,) ½(-) */
					var re = new RegExp('[`0-9a-zA-Z¾¼½]');
					if (!re.test(sKey))
					{
						Event.stop(evt);
						return false;
					}
				}
			}
		//}
	},

	/**
	 * 영어, 공백만 입력가능합니다.
	 * @param {Object} e
	 */
	engExtFilter : function(e)
	{
		var evt = e || window.event;
		var kCode = evt.which || evt.keyCode;

		//if(!(hana.JHanaNiceForms._os_is_linux && hana.JHanaNiceForms._browser_is_opera))
		//{
			/* backspace ,tab(9),enter(13),shift(16),end(35),home(36),방향키(좌(37),상(38),우(49),하(40)),delete(46) 등등.. */
			var controlKeys = new Array(Event.KEY_BACKSPACE, Event.KEY_TAB, Event.KEY_RETURN, Event.KEY_ESC, Event.KEY_ESC, Event.KEY_LEFT, Event.KEY_UP, Event.KEY_RIGHT, Event.KEY_DOWN, Event.KEY_DELETE, Event.KEY_HOME, Event.KEY_END, Event.KEY_PAGEUP, Event.KEY_PAGEDOWN);
	
			/* 조작키이면 종료 */
			if (controlKeys.include(kCode)) { return; }
	
			var keyCode = parseInt(kCode);
	
			var sKey = String.fromCharCode(kCode);
			/* SHIFT 이면서 ( ) 가 아니거나 SHIFT이면서 영문이 아니면 return */
			var reTemp = new RegExp('[`a-zA-Z]');
			var reTemp1 = new RegExp('[A-Z]');
			if ((evt.shiftKey && (('' + keyCode == '57') || ('' + keyCode == '48'))))
			{
				/* ignored */
			}
			else if (evt.shiftKey && !reTemp1.test(sKey))
			{
				Event.stop(evt);
				return false;
			}
			else
			{
				var filter = '[`a-zA-Z]';
				var re = new RegExp(filter);
				if (('' + keyCode != '32'))
				{
					/* 스페이스(공백)은 허용 */
	
					if (!re.test(sKey))
					{
						Event.stop(evt);
						return false;
					}
				}
			}
		//}
	},
	
	/**
	 * 숫자 만 입력가능하다.
	 * @param {Object} e
	 */
	bizNoFilter : function(e)
	{
		var evt = e || window.event;
		var kCode = evt.which || evt.keyCode;

		//if(!(hana.JHanaNiceForms._os_is_linux && hana.JHanaNiceForms._browser_is_opera))
		//{
			/* backspace ,tab(9),enter(13),shift(16),end(35),home(36),방향키(좌(37),상(38),우(49),하(40)),delete(46) 등등.. */
			var controlKeys = new Array(Event.KEY_BACKSPACE, Event.KEY_TAB, Event.KEY_RETURN, Event.KEY_ESC, Event.KEY_ESC, Event.KEY_LEFT, Event.KEY_UP, Event.KEY_RIGHT, Event.KEY_DOWN, Event.KEY_DELETE, Event.KEY_HOME, Event.KEY_END, Event.KEY_PAGEUP, Event.KEY_PAGEDOWN);
	
			/* 조작키이면 종료 */
			if (controlKeys.include(kCode)) { return; }
	
			var sKey = String.fromCharCode(kCode);
			/* SHIFT 이면 리턴 */
			if (evt.shiftKey)
			{
				Event.stop(evt);
				return false;
			}
	
			/* ½(-)  */
			var filter = '[`0-9½]';
			var re = new RegExp(filter);
			if (!re.test(sKey))
			{
				Event.stop(evt);
				return false;
			}
		//}
	},
	
	/**
	 * 오직 영어만 입력 가능합니다.
	 * @param e
	 */
	engFilter : function(e)
	{
		var evt = e || window.event;
		var kCode = evt.which || evt.keyCode;

		//if(!(hana.JHanaNiceForms._os_is_linux && hana.JHanaNiceForms._browser_is_opera))
		//{
			/* backspace ,tab(9),enter(13),shift(16),end(35),home(36),방향키(좌(37),상(38),우(49),하(40)),delete(46) 등등.. */
			var controlKeys = new Array(Event.KEY_BACKSPACE, Event.KEY_TAB, Event.KEY_RETURN, Event.KEY_ESC, Event.KEY_ESC, Event.KEY_LEFT, Event.KEY_UP, Event.KEY_RIGHT, Event.KEY_DOWN, Event.KEY_DELETE, Event.KEY_HOME, Event.KEY_END, Event.KEY_PAGEUP, Event.KEY_PAGEDOWN);
	
			/* 조작키이면 종료 */
			if (controlKeys.include(kCode)) { return; }
	
			var keyCode = parseInt(kCode);
			var sKey = String.fromCharCode(kCode);
	
			/* SHIFT 이면서 영문이 아니면 return */
			var reTemp = new RegExp('[a-zA-Z]');
			if ((evt.shiftKey && !(reTemp.test(sKey))))
			{
				Event.stop(evt);
				return false;
			}
			if (!reTemp.test(sKey))
			{
				Event.stop(evt);
				return false;
			}
		//}
	},

	/**
	 * 오직 한글만 입력 가능합니다................
	 * @param e
	 */
	onlykorFilter : function(e)
	{

		var evt = e || window.event;
		var kCode = evt.which || evt.keyCode;

		//if((hana.JHanaNiceForms._os_is_linux && hana.JHanaNiceForms._browser_is_opera))
		//{
			/* backspace ,tab(9),enter(13),shift(16),end(35),home(36),방향키(좌(37),상(38),우(49),하(40)),delete(46) 등등.. */
			var controlKeys = new Array(Event.KEY_BACKSPACE, Event.KEY_TAB, Event.KEY_RETURN, Event.KEY_ESC, Event.KEY_ESC, Event.KEY_LEFT, Event.KEY_UP, Event.KEY_RIGHT, Event.KEY_DOWN, Event.KEY_DELETE, Event.KEY_HOME, Event.KEY_END, Event.KEY_PAGEUP, Event.KEY_PAGEDOWN);
	
			/* 조작키이면 종료 */
			if (controlKeys.include(kCode)) { return; }
	
			var sKey = String.fromCharCode(kCode);

			if ('' + parseInt(kCode) == '229')
			{
				/* 한글이면  pass */
			} else {
				Event.stop(evt);
				return false;
			}
		//}
	},

	/**
	 * 오직 한글 과 영문만 입력 가능합니다.
	 * @param e
	 */
	engkorFilter : function(e)
	{
		var evt = e || window.event;
		var kCode = evt.which || evt.keyCode;

		//if(!(hana.JHanaNiceForms._os_is_linux && hana.JHanaNiceForms._browser_is_opera))
		//{
			/* backspace ,tab(9),enter(13),shift(16),end(35),home(36),방향키(좌(37),상(38),우(49),하(40)),delete(46) 등등.. */
			var controlKeys = new Array(Event.KEY_BACKSPACE, Event.KEY_TAB, Event.KEY_RETURN, Event.KEY_ESC, Event.KEY_ESC, Event.KEY_LEFT, Event.KEY_UP, Event.KEY_RIGHT, Event.KEY_DOWN, Event.KEY_DELETE, Event.KEY_HOME, Event.KEY_END, Event.KEY_PAGEUP, Event.KEY_PAGEDOWN);
	
			/* 조작키이면 종료 */
			if (controlKeys.include(kCode)) { return; }
	
			var keyCode = parseInt(kCode);
			var sKey = String.fromCharCode(kCode);
	
			if (('' + parseInt(kCode) == '229'))
			{
				/* 한글이면  pass */
				return;
			}

			/* SHIFT 이면서 영문이 아니면 return */
			var reTemp = new RegExp('[a-zA-Z]');
			if ((evt.shiftKey && !(reTemp.test(sKey))))
			{
				Event.stop(evt);
				return false;
			}
			if (!reTemp.test(sKey))
			{
				Event.stop(evt);
				return false;
			}

		//}
	},

	/**
	 * 영문/숫자 .  - _ ~ 만 입력가능합니다.
	 * @param {Object} e
	 */
	eMailAddrFilter : function(e)
	{
		var evt = e || window.event; /* 파이어폭스가 아니면 window.event 를 할당 하고 파이어폭스이면 evt 할당 */
		var kCode = evt.which || evt.keyCode;

		hana.JHanaNiceForms.debugKey(evt);

		//if(!(hana.JHanaNiceForms._os_is_linux && hana.JHanaNiceForms._browser_is_opera))
		//{
			/* backspace ,tab(9),enter(13),shift(16),end(35),home(36),방향키(좌(37),상(38),우(49),하(40)),delete(46) 등등.. */
			var controlKeys = new Array(Event.KEY_BACKSPACE, Event.KEY_TAB, Event.KEY_RETURN, Event.KEY_ESC, Event.KEY_ESC, Event.KEY_LEFT, Event.KEY_UP, Event.KEY_RIGHT, Event.KEY_DOWN, Event.KEY_DELETE, Event.KEY_HOME, Event.KEY_END, Event.KEY_PAGEUP, Event.KEY_PAGEDOWN);
	
			/* 조작키이면 종료 */
			if (controlKeys.include(kCode)) { return; }
	
			var keyCode = parseInt(kCode);
	
			var sKey = String.fromCharCode(kCode);
	
			/* SHIFT 이면서 ( ) 가 아니거나 SHIFT이면서 영문이 아니면 return */
			var reTemp = new RegExp('[`0-9a-zA-Z]');
			var reTemp1 = new RegExp('[A-Z]');
			if ((evt.shiftKey && (('' + keyCode == '192') || ('' + keyCode == '189'))))
			{
				/* ignored */
			}
			else if (evt.shiftKey && !reTemp1.test(sKey))
			{
				Event.stop(evt);
				return false;
			}
			else
			{
				/* ¾(.) ½(-) */
				var filter = '[`0-9a-zA-Z¾½]';
				var re = new RegExp(filter);
				if (!re.test(sKey))
				{
					Event.stop(evt);
					return false;
				}
			}
		//}
	},

	/**
	 * 영어+한글+숫자+ -,_,(,) 만 입력 가능
	 * @param {Object} e
	 */
	acctNmFilter : function(e)
	{
		var evt = e || window.event;
		var kCode = evt.which || evt.keyCode;

		//if(!(hana.JHanaNiceForms._os_is_linux && hana.JHanaNiceForms._browser_is_opera))
		//{
			/* backspace ,tab(9),enter(13),shift(16),end(35),home(36),방향키(좌(37),상(38),우(49),하(40)),delete(46) 등등.. */
			var controlKeys = new Array(Event.KEY_BACKSPACE, Event.KEY_TAB, Event.KEY_RETURN, Event.KEY_ESC, Event.KEY_ESC, Event.KEY_LEFT, Event.KEY_UP, Event.KEY_RIGHT, Event.KEY_DOWN, Event.KEY_DELETE, Event.KEY_HOME, Event.KEY_END, Event.KEY_PAGEUP, Event.KEY_PAGEDOWN);
	
			/* 조작키이면 종료 */
			if (controlKeys.include(kCode)) { return; }
	
			var keyCode = parseInt(kCode);
			var sKey = String.fromCharCode(kCode);
	
			if (('' + parseInt(kCode) == '229'))
			{
				/* 한글이면  pass */
				return;
			}
			
			var reTemp = new RegExp('[`0-9a-zA-Zㄱ-힝]');
			var reTemp1 = new RegExp('[`09a-zA-Zㄱ-힝]');
	
			if ((evt.shiftKey && ('' + keyCode == '189')))
			{
				/* ignored */
			}
			else if (evt.shiftKey && !reTemp1.test(sKey))
			{
				Event.stop(evt);
				return false;
			}
			else
			{
				var filter = '[`0-9a-zA-Zㄱ-힝½]';
				var re = new RegExp(filter);
				if (!re.test(sKey))
				{
					Event.stop(evt);
					return false;
				}
	
			}
		//}
	},

	/**
	 * 오직 한글 과 영문 숫자만 입력 가능합니다.
	 * @param e
	 */
	engkornumFilter : function(e)
	{
		var evt = e || window.event;
		var kCode = evt.which || evt.keyCode;

		hana.JHanaNiceForms.debugKey(evt);

		//if(!(hana.JHanaNiceForms._os_is_linux && hana.JHanaNiceForms._browser_is_opera))
		//{
			/* backspace ,tab(9),enter(13),shift(16),end(35),home(36),방향키(좌(37),상(38),우(49),하(40)),delete(46) 등등.. */
			var controlKeys = new Array(Event.KEY_BACKSPACE, Event.KEY_TAB, Event.KEY_RETURN, Event.KEY_ESC, Event.KEY_ESC, Event.KEY_LEFT, Event.KEY_UP, Event.KEY_RIGHT, Event.KEY_DOWN, Event.KEY_DELETE, Event.KEY_HOME, Event.KEY_END, Event.KEY_PAGEUP, Event.KEY_PAGEDOWN);
	
			/* 조작키이면 */
			if (controlKeys.include(kCode)) { return; }
	
			var sKey = String.fromCharCode(kCode);
	
			if (('' + parseInt(kCode) == '229'))
			{
				/* 한글이면  pass */
				return;
			}
			else
			{
				/* 한글 입력이 아니라면 허용된 값만 체크 */
	
				var reg01 = new RegExp('[a-zA-Z]');
				if (evt.shiftKey && !reg01.test(sKey))
				{
					/* shift 가 눌러진 상태에서 숫자키를 누르면 문자는 특수문자지만 key code 는 숫자일때와 같으므로 숫자 외의 허용된 문자만 체크*/
					Event.stop(evt);
					return false;
				}
	
				var reg02 = new RegExp('[0-9a-zA-Z]');
				if (!reg02.test(sKey))
				{
					Event.stop(evt);
					return false;
				}
			}
		//}
	},

	/**
	 * 영문,한글,숫자,공백 허용, 20090701-1
	 * @param {Object} e
	 */
	engKorNumSpaceFilter : function(e)
	{
		var evt = e || window.event;
		var kCode = evt.which || evt.keyCode;

		//if(!(hana.JHanaNiceForms._os_is_linux && hana.JHanaNiceForms._browser_is_opera))
		//{
			/* backspace ,tab(9),enter(13),shift(16),end(35),home(36),방향키(좌(37),상(38),우(49),하(40)),delete(46) 등등.. */
			var controlKeys = new Array(Event.KEY_BACKSPACE, Event.KEY_TAB, Event.KEY_RETURN, Event.KEY_ESC, Event.KEY_ESC, Event.KEY_LEFT, Event.KEY_UP, Event.KEY_RIGHT, Event.KEY_DOWN, Event.KEY_DELETE, Event.KEY_HOME, Event.KEY_END, Event.KEY_PAGEUP, Event.KEY_PAGEDOWN);
	
			/* 조작키이면 종료 */
			if (controlKeys.include(kCode)) { return; }
	
			var keyCode = parseInt(kCode);
	
			var sKey = String.fromCharCode(kCode);
	
			if (('' + parseInt(kCode) == '229'))
			{
				/* 한글이면  pass */
				return;
			}
			
			var filter1 = '[a-zA-Z]';
			var re1 = new RegExp(filter1);
			if (evt.shiftKey && !re1.test(sKey))
			{ /* 쉬프트를 누르고 영문 대문자가 아니면 리턴 */
				Event.stop(evt);
				return false;
			}
			var filter2 = '[`0-9a-zA-Z]';
			var re2 = new RegExp(filter2);
			if (('' + keyCode != '32'))
			{
				/* 스페이스(공백)은 허용  */
				if (evt.shiftKey && !re2.test(sKey))
				{
					Event.stop(evt);
					return false;
				}
				else if (!re2.test(sKey))
				{
					Event.stop(evt);
					return false;
				}
			}
		//}
	},

	/**
	 * 숫자 - 만 입력가능합니다.
	 * @param {Object} e
	 */
	telFilter : function(e)
	{
		var evt = e || window.event; /* 파이어폭스가 아니면 window.event 를 할당 하고 파이어폭스이면 evt 할당 */
		var _event_obj = evt.srcElement || evt.target; /* firefox 는 target 에서 나온다 */
		var kCode = evt.which || evt.keyCode;
		var keyCodeNO = parseInt(kCode); /* 숫자로 비교하기 위해 */
		var sKey = String.fromCharCode(kCode);

		hana.JHanaNiceForms.debugKey(evt);

		//if(!(hana.JHanaNiceForms._os_is_linux && hana.JHanaNiceForms._browser_is_opera))
		//{
			/* backspace ,tab(9),enter(13),shift(16),end(35),home(36),방향키(좌(37),상(38),우(49),하(40)),delete(46) 등등.. */
			var controlKeys = new Array(Event.KEY_BACKSPACE, Event.KEY_TAB, Event.KEY_RETURN, Event.KEY_ESC, Event.KEY_ESC, Event.KEY_LEFT, Event.KEY_UP, Event.KEY_RIGHT, Event.KEY_DOWN, Event.KEY_DELETE, Event.KEY_HOME, Event.KEY_END, Event.KEY_PAGEUP, Event.KEY_PAGEDOWN);
	
			/* 조작키이면 종료 */
			if (controlKeys.include(kCode)) { return; }
	
	
			/* SHIFT 이면 리턴, 쉬프트 누른 상태에서 0~9, - 에 대한 입력을 막는다. */
			if (evt.shiftKey)
			{
				Event.stop(evt);
				return false;
			}
			
			/* 48 ~ 57 (상단 숫자 키코드), 96 ~ 105 (우측 숫자 키코드), 109(우측키패드의 -) 범위라면 pass */
			if ((keyCodeNO >= 48 && keyCodeNO <= 57) || (keyCodeNO >= 96 && keyCodeNO <= 105) || keyCodeNO == 109)
			{
				/* pass */
			}
			else if (keyCodeNO == 173)
			{
				/* 파이어폭스 에서  '-'(상단키패드) 값이 다른 브라우저와 다르게 173 이 나옴 pass */
			}
			else
			{
				var reg = new RegExp('[0-9½]');
				if (!reg.test(sKey))
				{
					Event.stop(evt);
					return false;
				}	
			}
		//}
			
		/**
		 * 최종적으로 정규식 처리 : start
		 * - 파폭의 경우 한글일 경우 keyCode 가 0 이면서 sKey 가 '' 로 보임 그러나 sKey 는 null, undefined, '' 그 무엇도 아니므로 체크 를 하지 못하고 넘어가게 된다. 이 부분은 softforum 쪽 문제로 보임
		 */
		var _s = _event_obj.value;

		/* 한글을 '' 로 치환 */
		var _reg_02 = new RegExp("[ㄱ-힣]", "gi");
		_s = _s.replace(_reg_02, "");
		
		/* '--' 을 '-' 로 치환 */
		var _reg_03 = new RegExp("-{2}", "gi");
		_s = _s.replace(_reg_03, "-");

		/* 입력값이  1개이면서 숫자가 아니면*/
		if(_s.length == 1)
		{
			var _reg_01 = new RegExp("[^0-9]", "gi");
			_s = _s.replace(_reg_01, "");
		}

		_event_obj.value = _s;
		/**
		 * 최종적으로 정규식 처리 : end
		 */
	},
	
	/**
	 * 한글을 제거한다.
	 */
	removeKo_fnc : function(obj)
	{
		/* 최종적으로 한글을 '' 로 치환 */
		var _ko_remove_reg = new RegExp("[ㄱ-힣]", "gi");
		var _ko_removed_s = "";
		_ko_removed_s = obj.value;
		_ko_removed_s = _ko_removed_s.replace(_ko_remove_reg, "");
		obj.value = _ko_removed_s;
	},
	
	/**
	 * 한글입력방지
	 * @param {Object} e
	 */
	nokorFilter : function(obj)
	{
		
		$j(obj).keyup( function(e)
		{
			var regTemp = new RegExp('[ㄱ-힣]');
			var strValue = obj.value;
			
			/* 한글을 '' 로 치환 */
			if(regTemp.test(strValue) ){
				
				var regExpHg = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
				if(jQuery.browser.mozilla) {
				
					var msg = '한글은 입력하실 수 없습니다.';
					var msgFlag = true;
					$j("[id^='opbLayerMessage']").find('.contBox01').each(function() {
						if(msg == $j(this).text()) {
							msgFlag = false;
						}
					});
					
					if(e.which == undefined && msgFlag) {
						opb.common.layerpopup.openMessage_fnc({ 
				        	isConfirm: false,
				        	title: '입력오류',
				        	clickObj : obj,
				        	message: msg,
				        	callback : function() {
								strValue = obj.value;
								strValue = strValue.replace(new RegExp("[ㄱ-힣]", "gi"), "");
								obj.value = strValue;
				        	}
				        });
					}
					
				} else {
					strValue = obj.value.replace(regExpHg, "");
                	obj.value = strValue;
				}

			}
		});

	},

	debugKey : function(event_obj)
	{

		if ($j("#debug_keycode").length > 0 || $j("#debug_strkeycode").length > 0)
		{
			try
			{
				if ($j("#debug_keycode").length > 0)
				{
					$j("#debug_keycode").text("[init]");
				}
				if ($j("#debug_strkeycode").length > 0)
				{
					$j("#debug_strkeycode").text("[init]");
				}
	
				var _obj = event_obj.srcElement || event_obj.target; /* firefox 는 target 에서 나온다 */
	
				if (_obj.getAttribute("isdebugkeycode") == 'true')
				{
					var _keycode = event_obj.which || event_obj.keyCode;
					if ($j("#debug_keycode").length > 0)
					{
						$j("#debug_keycode").text(_keycode);
					}
					if ($j("#debug_strkeycode").length > 0)
					{
						$j("#debug_strkeycode").text(String.fromCharCode(parseInt(_keycode)));
					}
				}
			}
			catch(e)
			{
				if ($j("#debug_keycode").length > 0)
				{
					$j("#debug_keycode").text("[error]");
				}
				if ($j("#debug_strkeycode").length > 0)
				{
					$j("#debug_strkeycode").text(e);
				}	
			}
		}
	},

	/**
	 * 날짜 입력값을 만듭니다.
	 * @param obj
	 */
	makeDateStr : function(obj)
	{
		var re = /([0-9]{4})([0-9]{1})/;
		if (re.test(obj.value))
		{
			obj.value = obj.value.replace(re, "$1-$2");
		}

		var re = /([0-9]{4})-([0-9]{2})([0-9]{1})/;
		if (re.test(obj.value))
		{
			obj.value = obj.value.replace(re, "$1-$2-$3");
		}
	},

	/**
	 * 사업자번호 입력값을 만듭니다.
	 * @param obj
	 */
	makeBizNoStr : function(obj)
	{
		var re = /([0-9]{3})([0-9]{1})/;

		if (obj.value.length == 4 && re.test(obj.value))
		{
			obj.value = obj.value.replace(re, "$1-$2");
		}

		var re = /([0-9]{3})-([0-9]{2})([0-9]{1})/;
		if (obj.value.length > 6 && re.test(obj.value))
		{
			obj.value = obj.value.replace(re, "$1-$2-$3");
		}
	},

	/**
	 * text 필드에 효과를 줍니다. 효과를 변경하고 싶은 경우 이 함수를 수정합니다.
	 * @param obj
	 */
	giveEffect : function(obj)
	{
		Event.observe(obj, "blur", function()
		{
			hana.JHanaNiceForms.textBlurFunc(obj);
		}, false);
		Event.observe(obj, "focus", function()
		{
			hana.JHanaNiceForms.textFocusFunc(obj);
		}, false);
	},

	/**
	 * keydown 이벤트로 엔터키 가 눌렸을 경우 submit을 막습니다.
	 * 기존 obj에 keydown 이벤트가 걸려있는경우 기존 이벤트 수행 후 순차적으로 BlockEnterFunc을 수행합니다.
	 * @param obj
	 */
	preventEnter : function(obj)
	{
		$j(obj).keydown( function(event)
		{
			hana.JHanaNiceForms.textBlockEnterFunc(event);
		});
	},

	/**
	 * IME(Input Method Editor) 상태를 disabled 시킵니다.
	 * IE 에서만 사용 가능합니다.
	 * IME를 사용할수 없게 합니다. 한영키를 눌러도 한글로 변환하지 않고 영문만 입력 가능합니다.
	 * 아이디와 비밀번호는 한글이 허용되지 않으므로 이런 경우 사용할 수 있습니다.
	 * @param obj
	 */
	setDisableIME : function(obj)
	{
		if (Prototype.Browser.IE)
		{
			obj.style.imeMode = "disabled";
		}
	},

	/**
	 * IME(Input Method Editor) 상태를 active 시킵니다.
	 * IE 에서만 사용 가능합니다.
	 * IME가 활성화 된 상태입니다. 값을 입력하면 기본적으로 한글이 입력됩니다.
	 * @param obj
	 */
	setActiveIME : function(obj)
	{
		if (Prototype.Browser.IE)
		{
			obj.style.imeMode = "active";
		}
	},

	/**
	 * IME(Input Method Editor) 상태를 inactive 시킵니다.
	 * IE 에서만 사용 가능합니다.
	 * IME가 비활성화 된 상태입니다. 값을 입력하면 기본적으로 영문이 입력됩니다.
	 * @param obj\
	 */
	setInactiveIME : function(obj)
	{
		if (Prototype.Browser.IE)
		{
			obj.style.imeMode = "inactive";
		}
	},

	/**
	 * 엔터키가 입력 되었을 경우 이벤트를 stop 시킵니다.
	 * @param event
	 */
	textBlockEnterFunc : function(event)
	{
//		var keyCode;
//		var evt;
//		if (document.all && window.event != null )
//		{
//			evt = window.event;
//			keyCode = window.event.keyCode;
//		}
//		else
//		{
//			evt = event;
//			keyCode = event.which ? event.which : event.charCode;
//		}
		
		var evt = event;
		var keyCode = event.which ? event.which : event.charCode;
		
		if (keyCode == Event.KEY_RETURN)
		{
			Event.stop(evt);
		}
	},

	/**
	 * 원래 필드에 class 가 있는 경우 기존 class + " focus" 를 붙임.
	 * @param q
	 */
	textFocusFunc : function(obj)
	{
		if (!$j(obj).hasClass('in'))
		{
			$j(obj).addClass('in');
		}
	},

	/**
	 * 끝부분에 " focus" 가 존재 하면 삭제함.
	 * @param q
	 */
	textBlurFunc : function(obj)
	{
		$j(obj).removeClass('in');
	},

	getCurrentElementIndex : function(oForm, obj)
	{

		var matchIdx = 0;
		for ( var i = 0; i < oForm.elements.length; i++)
		{
			var oElement = oForm.elements[i];
			if (oElement == obj)
			{
				matchIdx = i;
				break;
			}
		}

		return matchIdx;
	}, /* [end] getCurrentElementIndex */

	nextFocusing : function(oForm, matchIdx)
	{
		var oNextElement = oForm.elements[matchIdx + 1];
		if (oNextElement == undefined || oNextElement == null) { return; }

		if (oNextElement.tagName == 'INPUT')
		{
			if ((oNextElement.type == 'text' || oNextElement.type == 'password'))
			{
				if (oNextElement.disabled == false)
				{
					try
					{
						oNextElement.focus();
					}
					catch (e)
					{
						/* ignore */
					}
				}
			}
			else if (oNextElement.type == "hidden")
			{
				hana.JHanaNiceForms.nextFocusing(oForm, (matchIdx + 1));
			}
		}
	}, /*[end] nextFocusing */

	/**
	 * 다음 input tag가 있는 곳으로 focus를 이동시킨다.
	 * 
	 * @param {Object} obj
	 */
	nextFocus : function(obj)
	{

		if (obj == null || obj == undefined) { return; }
		if (obj.value == null || obj.value == undefined || obj.value == "") { return; }
		if ((obj.maxLength == obj.value.length) == false) { return; }

		var oForm = obj.form;
		if (oForm == null) { return; }

		var _currentIndex = hana.JHanaNiceForms.getCurrentElementIndex(oForm, obj);
		hana.JHanaNiceForms.nextFocusing(oForm, _currentIndex);
	}, /* [end] nextFocus */

	_os_is_windows : false,
	_os_is_linux : false,
	_os_is_mac : false,
	
	_browser_is_ie : false,
	_browser_is_chrome : false,
	_browser_is_firefox : false,
	_browser_is_opera : false,
	_browser_is_safari : false,
	
	_browser_agent : navigator.userAgent,
	
	/**
	 * 초기화.
	 */
	init : function()
	{
		if(hana.JHanaNiceForms._browser_agent.match(/Windows/i) != null)
		{
			hana.JHanaNiceForms._os_is_windows = true;
		}
		else if(hana.JHanaNiceForms._browser_agent.match(/Linux/i) != null)
		{
			hana.JHanaNiceForms._os_is_linux = true;
		}
		else if(hana.JHanaNiceForms._browser_agent.match(/Macintosh/i) != null)
		{
			hana.JHanaNiceForms._os_is_mac = true;
		}
		
//		if(hana.JHanaNiceForms._browser_agent.match(/MSIE/i) != null)
		if(opb.common.util.getBrowserInfo().MSIE)
		{
			hana.JHanaNiceForms._browser_is_ie = true;
		}
		else if(hana.JHanaNiceForms._browser_agent.match(/Chrome/i) != null)
		{
			hana.JHanaNiceForms._browser_is_chrome = true;
		}
		else if(hana.JHanaNiceForms._browser_agent.match(/Firefox/i) != null)
		{
			hana.JHanaNiceForms._browser_is_firefox = true;
		}
		else if(hana.JHanaNiceForms._browser_agent.match(/Opera/i) != null)
		{
			hana.JHanaNiceForms._browser_is_opera = true;
		}
		else if(hana.JHanaNiceForms._browser_agent.match(/Safari/i) != null)
		{
			hana.JHanaNiceForms._browser_is_safari = true;
		}
		
		if (!document.getElementById) { return false; }

		/* forms 에서 text 필드와 password필드를 추출합니다. */
		try
		{
			hana.JHanaNiceForms.getElements();
		}
		catch (e)
		{
			alert("JHanaNiceForm.js init() : " + e.message);
		}
	},

	/* input type="text" 필드들의 array */
	texts : new Array(),

	/* input type="password" 필드들의 array */
	passwds : new Array(),

	/**
	 * forms 에서 text 필드와 password필드를 추출합니다.
	 */
	getElements : function()
	{
		$j.each(document.forms, function(idx, formObj)
		{
			hana.JHanaNiceForms.texts = Form.getInputs(formObj, "text");
			hana.JHanaNiceForms.passwds = Form.getInputs(formObj, "password");

			hana.JHanaNiceForms.controlTexts();
			hana.JHanaNiceForms.controlPasswords();
		});
	},

	/**
	 * text field 콘트롤
	 */
	controlTexts : function()
	{
		$j.each(hana.JHanaNiceForms.texts, function(idx, textObj)
		{
			//alert('texts:'+textObj.id+":"+textObj.getAttribute("isInit"));
			if (!textObj.getAttribute("isInit"))
			{
				/* className 에 따른 입력 값제한을 설정 합니다. */
				hana.JHanaNiceForms.setInputControl(textObj);

				/* keydown 이벤트로 엔터키 가 눌렸을 경우 submit을 막습니다. */
				hana.JHanaNiceForms.preventEnter(textObj);

			}

			textObj.setAttribute("isInit", true);
		});
	},

	/**
	 * password field 콘트롤
	 */
	controlPasswords : function()
	{
		$j.each(hana.JHanaNiceForms.passwds, function(idx, passwdObj)
		{
			if (!passwdObj.getAttribute("isInit"))
			{
				/* className 에 따른 입력 값제한을 설정 합니다.  */
				hana.JHanaNiceForms.setInputControl(passwdObj);

				/* keydown 이벤트로 엔터키 가 눌렸을 경우 submit을 막습니다. */
				hana.JHanaNiceForms.preventEnter(passwdObj);
			}

			passwdObj.setAttribute("isInit", true);
		});
	},

	/**
	 * className 에 따른 입력 값제한을 설정 합니다.
	 * @param obj
	 */
	setInputControl : function(obj)
	{

//		var classNm = obj.getAttribute("niceClass") || obj.className;
		var classNm = $j(obj).data("niceClass") || obj.className;

		if (classNm)
		{
			var extChar = null;
			var extCharArr = null;
			var idx = classNm.indexOf('[');
			if(idx > -1) {
				extChar = classNm.substring(idx+1, classNm.length -1);
				if(extChar != null && extChar.length > 0) {
					extCharArr = [];
					for(var i = 0; i < extChar.length; i++) {
						extCharArr[i] = extChar.charAt(i);
					}
				}
				classNm = classNm.substring(0, idx);
			}
			var length = classNm.replace(/[a-z]/ig, "");
			classNm = classNm.replace(/[0-9]/g, "");
			if (hana.JHanaNiceForms.classNameArr.include(classNm))
			{
				hana.JHanaNiceForms.ControlMap[classNm](obj, length, extCharArr);
			}
		}
	},
	mozillaForceKeyup : function(targetId) {

		var isIntervalRunning, target;
		if(jQuery.browser.mozilla) {
			isIntervalRunning = null;
			target = "#" + targetId;
			$j(target).bind('keydown', function(e) {
				var forceKeyup;
				if(e.which === 0 || e.which === 229) {
					forceKeyup = function() {
						return $j(target).trigger('keyup');
					};
					if(!isIntervalRunning) {
						return isIntervalRunning = setInterval(forceKeyup, 100);
					}
				}
			});
			
			return $j(target).bind('blur', function(e) {
				if(isIntervalRunning) {
					clearInterval(isIntervalRunning);
					
					return isIntervalRunning = null;
				}
			});
		}
	}
};

/* 첫페이지 인 경우 window의 load 이벤트 시 init 시킵니다. */
Event.observe(window, "load", hana.JHanaNiceForms.init, false);

