/************************************************************************************************
 * @file opb-core-prototype.js
 * @since 2012. 11. 26.
 * @author 오범석
 * 
 * @filelocation 모든 페이지에서 공통적으로 include 하는 top 페이지 에서 사용 선언
 * 
 * @fileoverview JavaScript 내장객체에 대한 protptype property 구현.
 * 
 * @warn 수정 시 반드시 관리자와 상의하세요.
 * @note prototype.js 파일과 관련없음.
 * 
 * <pre>
 * ==============================================================================================
 * 변경이력:
 * DATE                AUTHOR        DESCRIPTION
 * ----------------------------------------------------------------------------------------------
 * 2012.11.26          오범석        최초작성
 * </pre>
 ************************************************************************************************/

/**
 * <pre>
 * ===================================================================================
 * Array 내장객체
 * ===================================================================================
 * </pre>
 */
/**
 * 인자값과 동일한 값을 가지는 배열의 값을 검색하여 첫번째 인자 index를 반환한다.
 * 
 * @param 비교값
 * @return 있을경우 배열의 index, 없을경우 -1
 */
Array.prototype.indexOf = function(c)
{
	for ( var b = 0, a = this.length; b < a; b++)
	{
		if (this[b] == c)
		{
			return b;
		}
	}
	return -1;
};

/**
 * 인자값과 동일한 값을 가지는 배열의 값이 있을경우 첫번째 인자를 배열에서 제거한다.
 * 
 * @param 비교값
 * @return 제거 후 배열
 */
Array.prototype.remove = function(b)
{
	var a = this.indexOf(b);
	if (a != -1)
	{
		this.splice(a, 1);
	}
	return this;
};

/**
 * <pre>
 * ===================================================================================
 * Number 내장객체
 * ===================================================================================
 * </pre>
 */
/**
 * 인자로 받은 2개의 숫자와 비교하여 포함되면 this 숫자 반환, 미포함되면 가장가까운 숫자 반환
 * 
 * @param b 범위 start or end
 * @param a 범위 start or end
 * @return 포함일 경우 this 숫자, 미포함일 경우 가장가까운 숫자
 */
Number.prototype.constrain = function(b, a)
{
	return Math.min(Math.max(this, b), a);
};

/**
 * <pre>
 * ===================================================================================
 * String 내장객체
 * ===================================================================================
 * </pre>
 */
/**
 * 문자를 지정한 길이만큼 지정한 문자로 좌측 패딩 처리한다.
 * 
 * @param d 문자열
 * @param b 패딩할 길이
 * @param c 패딩할 문자
 * @return left padding 결과문자열
 */
String.leftPad = function(d, b, c)
{
	var a = String(d);
	if (!c)
	{
		c = ' ';
	}
	while (a.length < b)
	{
		a = c + a;
	}
	return a;
};

/**
 * 문자열의 앞뒤 공백문자를 제거한다.
 * 
 * @return 앞뒤 공백문자가 제게된 문자열
 */
String.prototype.trim = function()
{
	var r = /^\s+|\s+$/g;
	return function()
	{
		return this.replace(r, '');
	};
}();

/**
 * <pre>
 * ===================================================================================
 * Date 내장객체
 * ===================================================================================
 * </pre>
 */
/* 일 add 를 위한 상수 */
Date.DAY = 'd';
/* 월 add 를 위한 상수 */
Date.MONTH = 'mo';
/* 년 add 를 위한 상수 */
Date.YEAR = 'y';

/**
 * date object 를 복사한다.
 * 
 * @return clone date object
 */
Date.prototype.clone = function()
{
	return new Date(this.getTime());
};

/**
 * this Date의 월을 반환한다.
 * 
 * @return this Date 월
 */
Date.prototype.getFullMonth = function()
{
	return this.getMonth() + 1;
};

/**
 * this Date 월의 마지막주를 반환한다.
 * 
 * @return this Date 마지막 주
 */
Date.prototype.getMaxWeek = function()
{
	var e = this.getFirstDateOfMonth();
	return Math.ceil((e.getDay() + 1 + this.getDaysInMonth()) / 7);
};

/**
 * 2월의 윤년 여부를 확인
 * 
 * @return true:윤년
 */
Date.prototype.isLeapYear = function()
{
	var a = this.getFullYear();
	return !!((a & 3) == 0 && (a % 100 || (a % 400 == 0 && a)));
};

/**
 * 월의 1일을 date object로 반환한다.
 * 
 * @return 해당월 1일 date object
 */
Date.prototype.getFirstDateOfMonth = function()
{
	return new Date(this.getFullYear(), this.getMonth(), 1);
};

/**
 * 월의 마지막일을 date object로 반환한다.
 * 
 * @return 해당월 마지막일 date object
 */
Date.prototype.getLastDateOfMonth = function()
{
	return new Date(this.getFullYear(), this.getMonth(), this.getDaysInMonth());
};

/**
 * 월의 마지막일을 반환한다.
 * 
 * @return 해당월 마지막일
 */
Date.prototype.getDaysInMonth = function()
{
	var a = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
	return function()
	{
		var b = this.getMonth();
		return b == 1 && this.isLeapYear() ? 29 : a[b];
	};
}();

/**
 * date object에 지정한 년/월/일 중 하나를 더한다.
 * 
 * @param b 년:y:Date.YEAR, 월:mo:Date.MONTH, 일:d:Date.DAY
 * @param c 더할 년 or 월 or 일 수
 * @return 년/월/일을 더한 date object
 */
Date.prototype.add = function(b, c)
{
	var e = this.clone();
	if (!b || c === 0)
	{
		return e;
	}
	switch (b.toLowerCase())
	{
	case Date.DAY:
		e.setDate(this.getDate() + c);
		break;
	case Date.MONTH:
		var a = this.getDate();
		if (a > 28)
		{
			a = Math.min(a, this.getFirstDateOfMonth().add(Date.MONTH, c).getLastDateOfMonth().getDate());
		}
		e.setDate(a);
		e.setMonth(this.getMonth() + c);
		break;
	case Date.YEAR:
		e.setFullYear(this.getFullYear() + c);
		break;
	}
	return e;
};

/**
 * Date를 format 적용한 문자열로 반환한다.
 * 
 * @param f Date format (default:yyyy-MM-dd)
 * @return format 적용한 문자열
 */
Date.prototype.format = function(f)
{
	if ((typeof f) != 'string' || f == '')
	{
		f = 'yyyy-MM-dd';
	}

	f = f.replace(/yyyy/g, this.getFullYear());
	f = f.replace(/Y/g, this.getFullYear());

	f = f.replace(/MM/g, String.leftPad(this.getFullMonth(), 2, '0'));
	f = f.replace(/m/g, String.leftPad(this.getFullMonth(), 2, '0'));

	f = f.replace(/dd/g, String.leftPad(this.getDate(), 2, '0'));
	f = f.replace(/d/g, String.leftPad(this.getDate(), 2, '0'));

	f = f.replace(/hh/g, String.leftPad(this.getHours(), 2, '0'));
	f = f.replace(/H/g, String.leftPad(this.getHours(), 2, '0'));

	// f = f.replace(/mm/g, (this.getMinutes() < 10 ? '0' : '') + this.getMinutes());
	f = f.replace(/i/g, String.leftPad(this.getMinutes(), 2, '0'));

	f = f.replace(/ss/g, String.leftPad(this.getSeconds(), 2, '0'));
	f = f.replace(/s/g, String.leftPad(this.getSeconds(), 2, '0'));

	return f;
};

/**
 * String 날짜를 받아서 포맷으로 파싱하여 new Date로 반환한다.
 * 
 * @param d 날짜 문자열
 * @param g 포맷
 * @return new Date
 */
Date.parseDate = function(d, g)
{
	var _c = new Date();
	var _year = _c.getFullYear();
	var _month = _c.getMonth() + 1;
	var _date = _c.getDate();
	var _hour = _c.getHours();
	var _minute = _c.getMinutes();
	var _second = _c.getSeconds();
	
	try
	{
	
		var _f = g.toString();
		var _s = d.toString().replace(/[^\d]/g, '');
		
		if(_f.length == 0 || _s.length == 0)
		{
			return new Date();
		}
		
		while (_f.length > 0)
		{
			var _l = 0;
			if (_f.substring(0, 1) == 'Y')
			{
				_l = 4;
				_year = _s.substring(0, 4);
			}
			else if (_f.substring(0, 1) == 'm')
			{
				_l = 2;
				_month = _s.substring(0, 2);
			}
			else if (_f.substring(0, 1) == 'd')
			{
				_l = 2;
				_date = _s.substring(0, 2);
			}
			else if (_f.substring(0, 1) == 'H')
			{
				_l = 2;
				_hour = _s.substring(0, 2);
			}
			else if (_f.substring(0, 1) == 'i')
			{
				_l = 2;
				_minute = _s.substring(0, 2);
			}
			else if (_f.substring(0, 1) == 's')
			{
				_l = 2;
				_second = _s.substring(0, 2);
			}
			
			if(_l > 0 && _s.length < _l)
			{
				throw 'Date Value & Format miss match.';
			}
			
			_s = _s.substring(_l, _s.length);
			_f = _f.substring(1, _f.length);
		}
	}
	catch (e)
	{
		// parseDate ERROR. Return current date.
//		alert(location.href + '\n\n' + e + '\n[ERROR Date.parseDate]');
		return new Date();
	}

	return new Date(_year, _month - 1, _date, _hour, _minute, _second);
};

/**
 * date object 의 timezone 값을 반환한다.
 * 
 * @return timezone string
 */
Date.prototype.getTimezone = function()
{
	return this.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, "$1$2").replace(/[^A-Z]/g, "");
};

/* format과 동일한 함수를 dateFormat에 할당 . AS-IS 코드 호환 처리 */
Date.prototype.dateFormat = Date.prototype.format;

/* 오페라에서 setMonth, setDate 동작 변경 */
if (navigator.userAgent.indexOf('Opera') != -1)
{
	Date.prototype._xMonth = Date.prototype.setMonth;

	Date.prototype._xDate = Date.prototype.setDate;

	Date.prototype.setMonth = function(a)
	{
		if (a <= -1)
		{
			var d = Math.ceil(-a), c = Math.ceil(d / 12), b = (d % 12) ? 12 - d % 12 : 0;
			this.setFullYear(this.getFullYear() - c);
			return this._xMonth(b);
		}
		else
		{
			return this._xMonth(a);
		}
	};

	Date.prototype.setDate = function(a)
	{
		return this.setTime(this.getTime() - (this.getDate() - a) * 86400000);
	};
}
