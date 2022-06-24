/*INISEAL:[7o2mufpIqt2dEof0qLDdGtU986U%3D%0A]*/
var DATE_SEPERATOR = "-",
    NO_SEPERATOR = "-";

function fn_goPage(b) {
    document.location.href = b
}
function fn_openWindow(b, c, d) {
    c = fn_replaceStr(c, " ", "");
    window.open(b, c, d).focus()
}
function fn_centerOpenWindow(b, c, d, e, f) {
    var g = "width=" + d;
    g += ",height=" + e;
    var h = "";
    h = f == "" ? g + ", left=" + (screen.width - d) / 2 + ",top=" + (screen.height - e) / 2 : f + ", " + g + ", left=" + (screen.width - d) / 2 + ",top=" + (screen.height - e) / 2;
    window.open(b, c, h)
}

function fn_popup(b, c, d, e) {
    c = c;
    d = d;
    if (window.navigator.userAgent.indexOf("SV1") != -1 || window.navigator.userAgent.indexOf("MSIE 7") != -1) {
        c += 8;
        d += 10
    }
    e == "0" ? window.open(b, "", "toolbar=0,menubar=0,scrollbars=no,resizable=no,width=" + c + ",height=" + d + ";") : window.open(b, "", "toolbar=0,menubar=0,scrollbars=yes,resizable=no,width=" + c + ",height=" + d + ";")
}

function fn_windowModal(b, c, d, e) {
    if (e != "yes") e = "no";
    return window.showModalDialog(b, self, "dialogWidth=" + c + "px;dialogHeight=" + d + "px;status=no;resizable=no;help=no;scroll=" + e)
}
function fn_popupAll(b, c, d, e, f, g, h, k, l, m, n) {
    d = "width=" + d;
    d += ",height=" + e;
    d += ",left=" + f;
    d += ",top=" + g;
    d += ",scrollbars=" + h;
    d += ",toolbar=" + k;
    d += ",status=" + l;
    d += ",resizable=" + m;
    d += ",menubar=" + n;
    window.open(b, c, d).focus()
}
function fn_alert(b) {
    b.length >= 1 && alert(b)
}
function fn_alertConfirm(b) {
    return confirm(b) == 1 ? 1 : 0
}

function fn_alertFocus(b, c) {
    c != "" && fn_alert(c);
    b.focus();
    b.type == "text" && b.value.length >= 1 && b.select()
}
function fn_showErrMessage(b) {
    if (b.length >= 1) {
        shwoMessage = fn_replaceStr(b, "<||>", "\n");
        fn_alert(shwoMessage)
    }
}
function fn_chkLen(b, c) {
    if (b.value.length == c) return true;
    return false
}
function fn_chkLenMoveFocus(b, c, d) {
    b.value.length == c && fn_setFocus(d)
}
function fn_setFocus(b) {
    b.focus()
}

function fn_chkLenByByte(b, c) {
    if (fn_getLenByByte(b.value) <= c) return true;
    b.focus();
    fn_alert("\uc774 \ud56d\ubaa9\uc740 \uc601\ubb38 " + c + "\uc790 (\ud55c\uae00\uc740 " + Math.floor(c / 3) + "\uc790) \uae4c\uc9c0\ub9cc \ud5c8\uc6a9\ud569\ub2c8\ub2e4.");
    return false
}

function fn_chkLenByByteMinMax(b, c, d) {
    var e = fn_getLenByByte(b.value);
    if (e <= c) {
        b.focus();
        fn_alert("\uc774 \ud56d\ubaa9\uc740 \uc601\ubb38 " + c + "\uc790 (\ud55c\uae00\uc740 " + Math.floor(c / 3) + "\uc790) \uc774\uc0c1\uc744 \uc801\uc5b4\uc8fc\uc138\uc694.");
        return false
    } else if (e >= d) {
        b.focus();
        fn_alert("\uc774 \ud56d\ubaa9\uc740 \uc601\ubb38 " + d + "\uc790 (\ud55c\uae00\uc740 " + Math.floor(d / 3) + "\uc790) \uae4c\uc9c0\ub9cc \ud5c8\uc6a9\ud569\ub2c8\ub2e4.");
        return false
    } else return true
}

function fn_chkLenByByteMinMaxMsg(b, c, d, e) {
    var f = fn_getLenByByte(b.value);
    if (f <= c) {
        b.focus();
        fn_alert(e + " \uc601\ubb38 " + c + "\uc790 (\ud55c\uae00\uc740 " + Math.floor(c / 3) + "\uc790) \uc774\uc0c1\uc744 \uc801\uc5b4\uc8fc\uc138\uc694.");
        return false
    } else if (f >= d) {
        b.focus();
        fn_alert(e + " \uc601\ubb38 " + d + "\uc790 (\ud55c\uae00\uc740 " + Math.floor(d / 3) + "\uc790) \uae4c\uc9c0\ub9cc \ud5c8\uc6a9\ud569\ub2c8\ub2e4.");
        return false
    } else return true
}

function fn_getLenByByte(b) {
    for (var c = 0, d = 0; d < b.length; d++) {
        var e = escape(b.charAt(d));
        if (e.length == 1) c++;
        else if (e.indexOf("%u") != -1) c += 3;
        else e.indexOf("%") != -1 && c++
    }
    return c
}
function fn_disableObject(b) {
    switch (b.type) {
    case "checkbox":
        b.disabled = true;
        break;
    case "text":
        b.readOnly = true;
        b.style.backgroundColor = "#E9F8F2";
        b.style.color = "#555555"
    }
}

function fn_enableObject(b) {
    switch (b.type) {
    case "checkbox":
        b.disabled = false;
        break;
    case "text":
        b.readOnly = false;
        b.style.backgroundColor = "#ffffff";
        b.style.color = "#000000"
    }
}
function fn_disableManyObjects() {
    var b;
    b = fn_disableManyObjects.arguments;
    for (i = 0; i < b.length; i++) b[i] != "" && fn_disableObject(b[i])
}
function fn_enableManyObjects() {
    var b;
    b = fn_enableManyObjects.arguments;
    for (i = 0; i < b.length; i++) b[i] != "" && fn_enableObject(b[i])
}

function fc_chk_byte_textarea(b, c) {
    var d = b.value,
        e = d.length,
        f = 0,
        g = 0,
        h = 0,
        k = "";
    f = "";
    for (f = 0; f < e; f++) {
        k = d.charAt(f);
        if (escape(k).length > 4) g += 3;
        else g++;
        if (g <= c) h = f + 1
    }
    if (g > c) {
        alert("\uc785\ub825\uc81c\ud55c \uae00\uc790\uc218\ub97c \ucd08\uacfc\ud558\uc600\uc2b5\ub2c8\ub2e4.");
        f = d.substr(0, h);
        b.value = f
    }
    b.focus()
}

function fn_togleCheckAll(b, c) {
    if (b.type == "checkbox") b.checked ? fn_setAllCheckboxCheck(c) : fn_setAllCheckboxCancel(c);
    else if (b.type == "hidden") if (b.value == "Y") {
        fn_setAllCheckboxCancel(c);
        b.value = "N"
    } else {
        fn_setAllCheckboxCheck(c);
        b.value = "Y"
    }
}
function fn_setAllCheckboxCancel(b) {
    if (b != null) {
        var c = b.length;
        if (c > 1) for (var d = 0; d < c; d++) b[d].checked = false;
        else b.checked = false
    }
}
function fn_setAllCheckboxCheck(b) {
    if (b != null) {
        var c = b.length;
        if (c > 1) for (var d = 0; d < c; d++) b[d].checked = true;
        else b.checked = true
    }
}

function fn_isChecked(b) {
    var c = b.length,
        d = 0;
    if (c > 1) for (var e = 0; e < c; e++) b[e].checked && d++;
    else b.checked && d++;
    if (d == 0) {
        fn_alert("\uc120\ud0dd\ub41c \uac12\uc774 \uc5c6\uc2b5\ub2c8\ub2e4");
        return false
    }
    return true
}
function fn_isCheckedStr(b) {
    var c = b.length,
        d = 0;
    if (c > 1) for (var e = 0; e < c; e++) b[e].checked && d++;
    else b.checked && d++;
    if (d == 0) return false;
    return true
}

function fn_isCheckedOnlyOne(b) {
    var c = b.length;
    if (c > 1) {
        for (var d = 0, e = 0; e < c; e++) b[e].checked && d++;
        if (d > 1) {
            fn_alert("\ud558\ub098\ub9cc \uc120\ud0dd\ud558\uc2ed\uc2dc\uc624");
            return false
        }
    }
    return true
}
function fn_isCheckedOnlyOne1(b) {
    var c = b.length;
    if (c > 1) {
        for (var d = 0, e = 0; e < c; e++) b[e].checked && d++;
        if (d > 1) {
            fn_alert("\ud55c\ub300\ub9cc \uc120\ud0dd\ud574 \uc8fc\uc138\uc694.");
            return false
        }
    }
    return true
}
function fn_isNull(b) {
    if (fn_isTrim(b.value) == null || fn_isTrim(b.value) == "") return true;
    return false
}

function fn_isEmpty(b) {
    if (b.value == null || b.value.replace(/ /gi, "") == "") return true;
    return false
}
function fn_removeSpaces(b) {
    var c = "";
    if (b.length == 0) return c;
    for (var d = 0; d < b.length; d++) if (b.charAt(d) != " ") c += b.charAt(d);
    return c
}
function fn_isTrim(b) {
    for (var c, d = b.length, e = 0, f = 0; f < d; f++) {
        c = b.charAt(f);
        if (c == " " || c == "\n" || c == "\r") e++;
        else break
    }
    var g = 0;
    for (f = d - 1; f >= 0; f--) {
        c = b.charAt(f);
        if (c == " " || c == "\n" || c == "\r") g++;
        else break
    }
    return d - g == 0 ? "" : b.substring(e, d - g)
}

function fn_replaceStr(b, c, d) {
    var e = 0;
    for (e = b.indexOf(c); e != -1;) {
        pre_str = b.substring(0, e);
        post_str = b.substring(e + c.length, b.length);
        b = pre_str + d + post_str;
        e = b.indexOf(c)
    }
    return b
}
function fn_containsChars(b, c) {
    for (var d = 0; d < b.value.length; d++) if (c.indexOf(b.value.charAt(d)) != -1) return true;
    return false
}
function fn_containsCharsOnly(b, c) {
    for (var d = 0; d < b.value.length; d++) if (c.indexOf(b.value.charAt(d)) == -1) return false;
    return true
}

function fn_isKorean(b) {
    if (b.value.length * 2 == fn_getLenByByte(b)) return true;
    return false
}
function fn_isAlphabet(b) {
    return fn_containsCharsOnly(b, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
}
function fn_isUpperCase(b) {
    return fn_containsCharsOnly(b, "ABCDEFGHIJKLMNOPQRSTUVWXYZ")
}
function fn_isLowerCase(b) {
    return fn_containsCharsOnly(b, "abcdefghijklmnopqrstuvwxyz")
}
function fn_isNumber(b) {
    return fn_containsCharsOnly(b, "0123456789")
}

function fn_isAlphaNum(b) {
    return fn_containsCharsOnly(b, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
}
function fn_isFileName(b) {
    return fn_containsCharsOnly(b, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_.")
}
function fn_isNumDash(b) {
    return fn_containsCharsOnly(b, "-0123456789")
}
function fn_isNumComma(b) {
    return fn_containsCharsOnly(b, ",0123456789")
}
function fn_isNumPeriod(b) {
    return fn_containsCharsOnly(b, ".0123456789")
}

function fn_isMoney(b) {
    return fn_containsCharsOnly(b, "-.,0123456789")
}
function fn_isValidEmail(b) {
    if (fn_isEmpty(b)) return false;
    if (!fn_isEmailAddr(b)) {
        fn_alertFocus(b, "\uc798\ubabb\ub41c \ud615\uc2dd\uc758 \uc774\uba54\uc77c \uc8fc\uc18c\uc785\ub2c8\ub2e4");
        return false
    }
    return true
}
function fn_isEmailAddr(b) {
    return /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/.test(b.value) ? true : false
}

function fn_isNumberMessage(b) {
    if (!fn_isNumber(b)) {
        fn_alertFocus(b, "\uc22b\uc790\ub9cc \uc785\ub825\ud558\uc2ed\uc2dc\uc624");
        return false
    }
    return true
}
function fn_stringEllipsis(b, c) {
    var d = "";
    return d = b.length <= c ? b : b.substring(0, c) + "..."
}
function fn_chkFieldIsNull(b, c, d) {
    if (b.value == "") {
        alert(c + "\uc744(\ub97c) \uc785\ub825\ud574\uc8fc\uc138\uc694");
        b.focus();
        return false
    }
    if (d > 0) return fn_chkLenByByte(b, d, c);
    return true
}

function fn_striingTokenizer(b, c, d) {
    var e = 0;
    d = Array(d);
    var f = 0;
    for (i = 0; i < c.length; i++) {
        if (b.indexOf(c.charAt(i)) >= 0) {
            d[f] = c.substring(e, i);
            e = i + 1;
            f++
        }
        if (i == c.length - 1) d[f] = c.substring(e, i + 1)
    }
    return d
}
function fn_chkLenByByte(b, c) {
    if (fn_isLength(b.value) <= c) return true;
    b.focus();
    alert("\uc774 \ud56d\ubaa9\uc740 \uc601\ubb38 " + c + "\uc790 (\ud55c\uae00\uc740 " + Math.floor(c / 2) + "\uc790) \uae4c\uc9c0\ub9cc \ud5c8\uc6a9\ud569\ub2c8\ub2e4.");
    return false
}

function fn_isLength(b) {
    var c = 0;
    for (i = 0; i < b.length; i++) {
        ch = b.charAt(i);
        c += ch == "\n" || ch >= "\u314f" && ch <= "\ud788" || ch >= "\u3131" && ch <= "\u314e" ? 2 : 1
    }
    return c
}
function fn_addComma(b) {
    if (fn_isEmpty(b)) b.value = "0";
    if (fn_isMoney(b)) {
        b.value = fn_parseInt(fn_removeComma(b.value), 10);
        for (var c = "", d = fn_reverse(b.value), e = 0; e < d.length; e += 3) {
            c += d.substr(e, 3);
            if (e + 3 < b.value.length) c += ","
        }
        b.value = fn_reverse(c)
    } else {
        fn_alertFocus(b, "\uc22b\uc790\ub9cc \uc785\ub825\ud558\uc2ed\uc2dc\uc624.");
        b.value = ""
    }
}

function fn_reverse(b) {
    for (var c = "", d = 0; d < b.length; d++) c = b.substr(d, 1) + c;
    return c
}
function fn_strAddComma(b) {
    var c = /([0-9])([0-9][0-9][0-9][,.])/;
    b = (b + "").split(".");
    b[0] += ".";
    do b[0] = b[0].replace(c, "$1,$2");
    while (c.test(b[0]));
    return b.length > 1 ? b.join("") : b[0].split(".")[0]
}
function fn_removeComma(b) {
    return b.replace(/,/gi, "")
}
function fn_removeDash(b) {
    return b.replace(/-/gi, "")
}
function fn_removePeriod(b) {
    return fn_replaceStr(b, ".", "")
}
function fn_removeDash(b) {
    return fn_replaceStr(b, "-", "")
}

function fn_parseInt(b) {
    return parseInt(b, 10)
}
function fn_lpad(b, c, d) {
    b = String(b);
    var e = "",
        f = b.length;
    if (f < c) {
        for (var g = 0; g < c - f; g++) e += d;
        e += b
    } else e = b;
    return e
}

function fn_parseInterger(b) {
    var c = 0;
    if (fn_isMoney(b)) if (fn_removeComma(fn_isTrim(b.value)) == "") {
        fn_alert("\uc785\ub825\ud55c \uac12\uc744 \ud655\uc778\ud574 \uc8fc\uc2ed\uc2dc\uc624.");
        b.focus()
    } else {
        c = fn_removeComma(fn_isTrim(b.value));
        return fn_parseInt(c, 10)
    } else {
        fn_alert("\uc785\ub825\ud55c \uac12\uc744 \ud655\uc778\ud574 \uc8fc\uc2ed\uc2dc\uc624.");
        b.focus()
    }
    return 0
}

function fn_isDate(b) {
    str = fn_removeSpaces(b.value);
    str = fn_removeDash(b.value);
    if (!fn_isNumDash(b)) {
        b.value = "";
        b.type == "hidden" ? fn_alert("\ub0a0\uc9dc\ub294 YYYYMMDD\uc758 \ud615\uc2dd\uc73c\ub85c \uc785\ub825\ud558\uc2ed\uc2dc\uc624") : fn_alertFocus(b, "\ub0a0\uc9dc\ub294 YYYYMMDD\uc758 \ud615\uc2dd\uc73c\ub85c \uc785\ub825\ud558\uc2ed\uc2dc\uc624");
        return false
    }
    if (str.length != 8) {
        b.value = "";
        b.type == "hidden" ? fn_alert("\ub0a0\uc9dc\ub294 YYYYMMDD\uc758 \ud615\uc2dd\uc73c\ub85c \uc785\ub825\ud558\uc2ed\uc2dc\uc624") : fn_alertFocus(b, "\ub0a0\uc9dc\ub294 YYYYMMDD\uc758 \ud615\uc2dd\uc73c\ub85c \uc785\ub825\ud558\uc2ed\uc2dc\uc624");
        return false
    }
    var c = str.substring(0, 4),
        d = str.substring(4, 6),
        e = str.substring(6, 8);
    if (fn_parseInt(c) >= 1900 && fn_isMonth(d) && fn_isDay(c, d, e)) return true;
    else {
        b.value = "";
        b.type == "hidden" ? fn_alert("\ub0a0\uc9dc\ub294 YYYYMMDD\uc758 \ud615\uc2dd\uc73c\ub85c \uc785\ub825\ud558\uc2ed\uc2dc\uc624") : fn_alertFocus(b, "\ub0a0\uc9dc\ub294 YYYYMMDD\uc758 \ud615\uc2dd\uc73c\ub85c \uc785\ub825\ud558\uc2ed\uc2dc\uc624");
        return false
    }
}

function fn_isDateSixLength(b) {
    str = fn_removeSpaces(b.value);
    str = fn_removePeriod(b.value);
    if (!fn_isNumPeriod(b)) {
        fn_alertFocus(b, "\ub0a0\uc9dc\ub294 YYMMDD\uc758 \ud615\uc2dd\uc73c\ub85c \uc785\ub825\ud558\uc2ed\uc2dc\uc624");
        return false
    }
    if (str.length != 6) {
        fn_alertFocus(b, "\ub0a0\uc9dc\ub294 YYMMDD\uc758 \ud615\uc2dd\uc73c\ub85c \uc785\ub825\ud558\uc2ed\uc2dc\uc624");
        return false
    }
    str.substring(0, 2);
    var c = str.substring(2, 4),
        d = str.substring(4);
    if (fn_isMonth(c) && fn_isDay2(d)) return true;
    else {
        fn_alertFocus(b, "\ub0a0\uc9dc\ub294 YYMMDD\uc758 \ud615\uc2dd\uc73c\ub85c \uc785\ub825\ud558\uc2ed\uc2dc\uc624");
        return false
    }
}
function fn_isMonth(b) {
    if (b.length > 2) return false;
    b = fn_parseInt(b);
    if (b <= 0 || b > 12) return false;
    return true
}
function fn_isDay(b, c, d) {
    if (d.length > 2) return false;
    b = fn_parseInt(b, 10);
    c = fn_parseInt(c, 10);
    d = fn_parseInt(d, 10);
    if (d <= 0 || d > fn_getEndDay(b, c)) return false;
    return true
}
function fn_isDay2(b) {
    if (b.length > 2) return false;
    b = fn_parseInt(b, 10);
    if (b <= 0 || b > 31) return false;
    return true
}

function fn_getEndDay(b, c) {
    return c == 1 || c == 3 || c == 5 || c == 7 || c == 8 || c == 10 || c == 12 ? 31 : c == 2 ? b % 4 == 0 && b / 4 % 200 != 0 ? 29 : 28 : 30
}

function fn_addDateSeperator(b) {
    if (fn_isEmpty(b)) return false;
    if (!fn_isDate(b)) return false;
    var c = fn_removePeriod(b.value);
    if (c.length != 8) {
        b.value = "";
        b.type == "hidden" ? fn_alert("\ub0a0\uc9dc\ub294 YYYYMMDD\uc758 \ud615\uc2dd\uc73c\ub85c \uc785\ub825\ud558\uc2ed\uc2dc\uc624") : fn_alertFocus(b, "\ub0a0\uc9dc\ub294 YYYYMMDD\uc758 \ud615\uc2dd\uc73c\ub85c \uc785\ub825\ud558\uc2ed\uc2dc\uc624");
        return false
    }
    c = c.replace(/([0-9][0-9][0-9][0-9])([0-9][0-9])([0-9][0-9])/, "$1" + DATE_SEPERATOR + "$2" + DATE_SEPERATOR + "$3");
    b.value = c;
    return true
}
function fn_getDaysBetween(b, c) {
    var d = fn_removeDash(b.value);
    d = new Date(d.substr(0, 4), fn_parseInt(d.substr(4, 2)) - 1, fn_parseInt(d.substr(6)));
    var e = fn_removeDash(c.value);
    e = new Date(e.substr(0, 4), fn_parseInt(e.substr(4, 2)) - 1, fn_parseInt(e.substr(6)));
    d = d.getTime();
    e = e.getTime();
    return Math.floor((e - d) / 864E5)
}

function fn_getDaysToToday(b) {
    b = fn_removeDash(b.value);
    b = new Date(b.substr(0, 4), fn_parseInt(b.substr(4, 2)) - 1, fn_parseInt(b.substr(6)));
    b = b.getTime();
    var c = new Date;
    c = c.getTime();
    return Math.floor((c - b) / 864E5)
}
function fn_isAfterToday(b) {
    if (fn_isEmpty(b)) return false;
    if (!fn_isDate(b)) return false;
    if (fn_getDaysToToday(b) > 0) {
        fn_alertFocus(b, "\uc624\ub298\uc774\ud6c4\uc758 \ub0a0\uc9dc\ub97c \uc785\ub825\ud558\uc154\uc57c \ud569\ub2c8\ub2e4");
        b.value = "";
        return false
    }
    return true
}

function fn_isSequentialDate(b, c, d) {
    if (fn_isEmpty(b)) return false;
    if (fn_isEmpty(c)) return false;
    if (!fn_isDate(b)) return false;
    if (!fn_isDate(c)) return false;
    c = fn_getDaysBetween(b, c);
    if (c < 0) {
        fn_alertFocus(b, "\ub0a0\uc9dc\ub97c \ubc14\ub974\uac8c \uc785\ub825\ud558\uc154\uc57c \ud569\ub2c8\ub2e4");
        return false
    }
    if (!d && c == 0) {
        fn_alert("2");
        fn_alertFocus(b, "\ub0a0\uc9dc\ub97c \ubc14\ub974\uac8c \uc785\ub825\ud558\uc154\uc57c \ud569\ub2c8\ub2e4");
        return false
    }
    return true
}

function fn_isDateAdd(b, c, d) {
    var e = new Date(b.getTime()),
        f = b.getFullYear(),
        g = b.getMonth() + 1;
    switch (c) {
    case "Y":
        e.setFullYear(f + d);
        break;
    case "M":
        e.setFullYear(f + Math.floor((g + d) / 12));
        e.setMonth((g + d) % 12 - 1);
        break;
    case "D":
        e = new Date(b.getTime() + d * 24 * 3600 * 1E3)
    }
    return e
}
function fn_getStrToDate(b) {
    var c, d, e, f = 0,
        g = 0,
        h = 0;
    c = b.substring(0, 4);
    d = b.substring(4, 6);
    e = b.substring(6, 8);
    if (b.length > 8) {
        f = b.substring(8, 10);
        g = b.substring(10, 12);
        h = b.substring(12, 14)
    }
    return new Date(c, d - 1, e, f, g, h)
}

function fn_getDateFormat(b, c) {
    var d = c;
    d = d.replace(/YYYY/i, fn_lpad(b.getFullYear(), 4, "0"));
    d = d.replace(/MM/i, fn_lpad(b.getMonth() + 1, 2, "0"));
    d = d.replace(/DD/i, fn_lpad(b.getDate(), 2, "0"));
    d = d.replace(/HH/i, fn_lpad(b.getHours(), 2, "0"));
    d = d.replace(/MI/i, fn_lpad(b.getMinutes(), 2, "0"));
    return d = d.replace(/SS/i, fn_lpad(b.getSeconds(), 2, "0"))
}

function fn_date2str(b, c) {
    return (fn_lpad(b.getFullYear(), 4, "0") + fn_lpad(b.getMonth() + 1, 2, "0") + fn_lpad(b.getDate(), 2, "0") + fn_lpad(b.getHours(), 2, "0") + fn_lpad(b.getMinutes(), 2, "0") + fn_lpad(b.getSeconds(), 2, "0")).substring(0, c)
}
function fn_str2date(b) {
    var c, d, e, f = 0,
        g = 0,
        h = 0;
    c = fn_parseInt(b.substring(0, 4));
    d = b.substring(4, 6);
    e = b.substring(6, 8);
    if (b.length > 8) {
        f = fn_parseInt(b.substring(8, 10));
        g = fn_parseInt(b.substring(10, 12));
        h = fn_parseInt(b.substring(12, 14))
    }
    return new Date(c, d - 1, e, f, g, h)
}

function fn_getApplyPeriod(b, c, d, e, f) {
    var g = fn_getStrToDate(c.value);
    f = fn_isDateAdd(g, "D", -1 * f);
    b.value = fn_getDateFormat(f, "YYYYMMDD");
    d.value = fn_getDateFormat(f, "YYYY-MM-DD");
    c.value = fn_getDateFormat(g, "YYYYMMDD");
    e.value = fn_getDateFormat(g, "YYYY-MM-DD")
}
function fn_getDayOfWeek() {
    return ["\uc77c", "\uc6d4", "\ud654", "\uc218", "\ubaa9", "\uae08", "\ud1a0"][(new Date).getDay()]
}

function fn_showDateTimeCalendar(b, c) {
    window.open("/common/popCalendar.jsp?type=datetime&dateField=" + b + "&timeField=" + c, "Calendar", "width=220,height=295,status=no,resizable=no,top=" + (screen.height / 2 - 147.5) + ",left=" + (screen.width / 2 - 110))
}
function fn_showDateCalendar(b) {
    window.open("/common/popCalendar.jsp?type=date&dateField=" + b, "Calendar", "width=200,height=250,status=no,resizable=no,top=" + (screen.height / 2 - 147.5) + ",left=" + (screen.width / 2 - 110))
}

function fn_isValidJumin(b) {
    if (fn_isEmpty(b)) return false;
    var c = b.value;
    if (c.length != 13) return false;
    b = Array(6);
    var d = Array(7),
        e = 0,
        f = 0,
        g = c.substring(0, 6);
    if (fn_isMonth(g.substring(2, 4))) {
        if (!fn_isDay2(g.substring(4, 6))) return false
    } else return false;
    c = c.substring(6, 13);
    for (var h = 1; h < 7; h++) {
        b[h] = g.substring(h - 1, h);
        d[h] = c.substring(h - 1, h);
        f = h < 3 ? Number(d[h]) * (h + 7) : Number(d[h]) * ((h + 9) % 10);
        e = e + Number(b[h]) * (h + 1) + f
    }
    d[7] = c.substring(6, 7);
    return Number(d[7]) != (11 - e % 11) % 10 ? false : true
}

function fn_isValidSaupja(b) {
    var c, d, e, f;
    if (b.length != 10) return false;
    for (i = c = 0; i < 7; i++) c += b.substring(i, i + 1) * "137137135".substring(i, i + 1);
    c = c % 10;
    d = b.substring(7, 8) * "137137135".substring(7, 8) % 10;
    e = b.substring(8, 9) * "137137135".substring(8, 9);
    f = Math.round(e / 10 - 0.5);
    c = (10 - (c + d + f + (e - f * 10)) % 10) % 10;
    if (b.substring(9, 10) != c) return false;
    return true
}

function fn_isValidBeopinStr(b) {
    var c = fn_removeDash(b);
    if (b == null || b.replace(/ /gi, "") == "") return false;
    if (c.length != 13) return false;
    b = "";
    for (var d = 0; d < c.length; d++) if ("0123456789".indexOf(c.charAt(d)) >= 0) b += c.charAt(d);
    c = b.substring(12, 13);
    var e = 0,
        f = 0;
    for (e = e = d = 0; e < 12; e++) {
        f = b.substring(e, e + 1) * "121212121212".charAt(e);
        d += f > 9 ? f % 10 : f
    }
    e = d % 10;
    e = e > 0 ? 10 - e : 0;
    return c == e ? true : false
}

function fn_isValidBeopin(b) {
    if (fn_isEmpty(b)) return false;
    var c = fn_removeDash(b.value);
    if (c.length != 10) return fn_alertFocus(b, "\uc62c\ubc14\ub978 \ubc95\uc778\ub4f1\ub85d\ubc88\ud638\uac00 \uc544\ub2d9\ub2c8\ub2e4.");
    c = removeChar(b.value, "-");
    var d = "";
    if (!(b.value.length < 1)) {
        for (var e = 0; e < c.length; e++) if ("0123456789".indexOf(c.charAt(e)) >= 0) d += c.charAt(e);
        e = d.substring(12, 13);
        var f = 0,
            g = 0,
            h = 0;
        for (f = f = 0; f < 12; f++) {
            g = d.substring(f, f + 1) * "121212121212".charAt(f);
            h += g > 9 ? g % 10 : g
        }
        f = h % 10;
        f = f > 0 ? 10 - f : 0;
        if (e == f) b.value = c.substring(0, 7) + "-" + c.substring(7, 13);
        else fn_alertFocus(b, "\uc62c\ubc14\ub978 \ubc95\uc778\ub4f1\ub85d\ubc88\ud638\uac00 \uc544\ub2d9\ub2c8\ub2e4.")
    }
}
function fn_isValidAccountPassword(b) {
    if (!fn_isEmpty(b)) if (IsNumer(b)) numstr.length != 4 && fn_alertFocus(b, "\ube44\ubc00\ubc88\ud638\ub294 4\uc790\ub9ac\uc785\ub2c8\ub2e4.");
    else fn_alertFocus(b, "\uc22b\uc790\ub9cc \uc785\ub825\ud558\uc2ed\uc2dc\uc624.")
}

function fn_checkSsn(b, c) {
    if (b.length != 6) return false;
    if (c.length != 7) return false;
    sGender = c.substring(0, 1);
    sYear = b.substring(0, 2);
    if (sGender >= 1 && sGender <= 4) if (fn_chksumID(b, c) == false) {
        fn_alert("\uc8fc\ubbfc\ubc88\ud638\ub97c \uc815\ud655\ud788 \uc785\ub825\ud574\uc8fc\uc138\uc694.");
        return false
    } else return true;
    else return sGender >= 5 && sGender <= 8 ? fn_checkNo(b, c) == false ? false : true : false
}

function fn_chksumID(b, c) {
    var d = /^[0-9]+$/,
        e, f, g, h, k, l, m, n, p, o, q, t, r;
    if (d.test(b) && d.test(c)) {
        d = parseFloat(c.substring(6, 7));
        e = parseFloat(b.substring(0, 1)) * 2;
        f = parseFloat(b.substring(1, 2)) * 3;
        g = parseFloat(b.substring(2, 3)) * 4;
        h = parseFloat(b.substring(3, 4)) * 5;
        k = parseFloat(b.substring(4, 5)) * 6;
        l = parseFloat(b.substring(5, 6)) * 7;
        m = parseFloat(c.substring(0, 1)) * 8;
        n = parseFloat(c.substring(1, 2)) * 9;
        p = parseFloat(c.substring(2, 3)) * 2;
        o = parseFloat(c.substring(3, 4)) * 3;
        q = parseFloat(c.substring(4, 5)) * 4;
        t = parseFloat(c.substring(5, 6)) * 5;
        r = 0;
        r = e + f + g + h + k + l + m + n + p + o + q + t + r;
        e = r % 11;
        e = 11 - e;
        e = e % 10;
        return e != d ? false : true
    } else return false
}

function fn_validRegNo(b) {
    a = new String(b);
    if (a == "") return false;
    if (a.length != 6) return false;
    intYear = fn_parseInt(a.substring(0, 2), 10);
    intMonth = fn_parseInt(a.substring(2, 4), 10);
    intDay = fn_parseInt(a.substring(4, 6), 10);
    if (intMonth < 0 || intMonth > 12) return false;
    switch (intMonth) {
    case 2:
        if (intDay < 0 || intDay > 29) return false;
    case 4:
        if (intDay < 0 || intDay > 30) return false;
    case 6:
        if (intDay < 0 || intDay > 30) return false;
    case 9:
        if (intDay < 0 || intDay > 30) return false;
    case 11:
        if (intDay < 0 || intDay > 30) return false;
    default:
        if (intDay < 0 || intDay > 31) return false
    }
    return true
}

function fn_checkNo(b, c) {
    var d = b + c;
    if (d == "") {
        fn_alert("\uc678\uad6d\uc778\ubc88\ud638\ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694");
        return false
    }
    if (d.charAt(6) == "5" || d.charAt(6) == "6") birthYear = "19";
    else if (d.charAt(6) == "7" || d.charAt(6) == "8") birthYear = "20";
    else if (d.charAt(6) == "9" || d.charAt(6) == "0") birthYear = "18";
    else {
        fn_alert("\uc678\uad6d\uc778\ubc88\ud638\ub97c \uc815\ud655\ud788 \uc785\ub825\ud574\uc8fc\uc138\uc694");
        return false
    }
    return fn_fgnNoChksum(d) == false ? false : true
}

function fn_fgnNoChksum(b) {
    var c = 0;
    c = 0;
    buf = Array(13);
    for (i = 0; i < 13; i++) buf[i] = fn_parseInt(b.charAt(i));
    c = buf[7] * 10 + buf[8];
    if (c % 2 != 0) return false;
    if (buf[11] != 6 && buf[11] != 7 && buf[11] != 8 && buf[11] != 9) return false;
    multipliers = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    for (c = i = 0; i < 12; i++) c += buf[i] *= multipliers[i];
    c = 11 - c % 11;
    if (c >= 10) c -= 10;
    c += 2;
    if (c >= 10) c -= 10;
    return c != buf[12] ? false : true
}

function fn_addSeperatorToAccountNo(b) {
    if (!fn_isEmpty(b)) if (fn_isNumDash(b)) {
        var c = fn_removeDash(b.value);
        if (c.length != 11) fn_alertFocus(b, "\uacc4\uc88c\ubc88\ud638\ub294 11\uc790\ub9ac\uc785\ub2c8\ub2e4");
        else {
            c = c.replace(/([0-9][0-9][0-9])([0-9][0-9])([0-9][0-9][0-9][0-9][0-9][0-9])/, "$1-$2-$3");
            b.value = c
        }
    } else fn_alertFocus(b, "\uc22b\uc790\ub9cc \uc785\ub825\ud558\uc2ed\uc2dc\uc624.")
}

function fn_addSeperatorToJuminNo(b) {
    if (!fn_isEmpty(b)) {
        if (!fn_isNumDash(b)) {
            fn_alertFocus(b, "\uc22b\uc790\ub9cc \uc785\ub825\ud558\uc2ed\uc2dc\uc624.");
            return false
        }
        if (!fn_isValidJumin(b)) return false;
        var c = fn_removeDash(b.value);
        c = c.replace(/([0-9][0-9][0-9][0-9][0-9][0-9])([0-9][0-9][0-9][0-9][0-9][0-9][0-9])/, "$1-$2");
        b.value = c
    }
}

function fn_addSeperatorToSaupjaNo(b) {
    if (!fn_isEmpty(b)) {
        if (!fn_isNumDash(b)) {
            fn_alertFocus(b, "\uc22b\uc790\ub9cc \uc785\ub825\ud558\uc2ed\uc2dc\uc624.");
            return false
        }
        if (!fn_isValidSaupja(b)) return false;
        var c = fn_removeDash(b.value);
        c = c.replace(/([0-9][0-9][0-9])([0-9][0-9])([0-9][0-9][0-9][0-9][0-9])/, "$1-$2-$3");
        b.value = c
    }
}

function fn_addSeperatorToSilmyungNo(b) {
    if (!fn_isEmpty(b)) {
        var c = fn_removeDash(b.value);
        if (c.length == 10) fn_addSeperatorToSaupjaNo(b);
        else c.length == 13 ? fn_addSeperatorToJuminNo(b) : fn_alertFocus(b, "\uc798\ubabb\ub41c \ud615\uc2dd\uc758 \uc2e4\uba85\ubc88\ud638\uc785\ub2c8\ub2e4")
    }
}

function fn_checkSilmyungNo(b, c) {
    var d = b.value + c.value;
    if (!fn_isEmpty(d)) if (d.length == 10) fn_addSeperatorToSaupjaNo(d);
    else d.length == 13 ? fn_addSeperatorToJuminNo(d) : fn_alertFocus(d, "\uc798\ubabb\ub41c \ud615\uc2dd\uc758 \uc2e4\uba85\ubc88\ud638\uc785\ub2c8\ub2e4")
}

function fn_addSeperatorToCardNo(b) {
    if (!fn_isEmpty(b)) {
        if (!fn_isNumDash(b)) {
            b.value = b.value.substr(0, b.value.length - 1);
            fn_alertFocus(b, "\uc22b\uc790\ub9cc \uc785\ub825\ud558\uc2ed\uc2dc\uc624.");
            return false
        }
        var c = fn_removeDash(b.value);
        if (c.length != 16) fn_alertFocus(b, "\uce74\ub4dc\ubc88\ud638\ub294 16\uc790\ub9ac\uc785\ub2c8\ub2e4");
        else {
            c = b.value;
            var d = /([0-9][0-9][0-9][0-9])([0-9])/;
            do c = c.replace(d, "$1-$2");
            while (d.test(c));
            b.value = c
        }
    }
}

function fn_checkNum(b) {
    if (!fn_isEmpty(b)) if (fn_isNumber(b) == false) {
        fn_alertFocus(b, "\uc22b\uc790\ub9cc \uc785\ub825\ud558\uc2ed\uc2dc\uc624.");
        return false
    }
}
function fn_searchAddress(b, c, d, e, f) {
    window.open("/include/addr_search.asp?form=" + b + "&zip1=" + c + "&zip2=" + d + "&address=" + e + "&addrdetail=" + f, "popupAddress", "width=450,height=303,scrollbars=1,toolbar=0,status=0,resizable=0,menubar=0,left=" + screen.width / 5 + ",top=" + screen.height / 4).focus()
}

function fn_regform(b) {
    var c = b.elements.length,
        d, e, f;
    for (d = 0; d < c; d++) if (typeof b.elements[d].tag != "undefined") {
        f = b.elements[d].tag.split("||", 3);
        if (f[0] == "C") e = eval(f[1]);
        else if (f[0] == "M" || f[0] == "O" && b.elements[d].value.length > 0) {
            e = RegExp(f[1], "gi");
            e = b.elements[d].value.match(e)
        }
        if (!e) {
            b.elements[d].select();
            fn_alert(f[2]);
            return false
        }
    }
    return true
}

function fn_uploadImage(b, c, d) {
    window.open("/include/image_upload.asp?category=" + b + "&formname=" + c + "&txtname=" + d, "ImageUpload", "width=450,height=250,scrollbars=0,toolbar=0,status=0,resizable=0,menubar=0,left=" + screen.width / 5 + ",top=" + screen.height / 4).focus()
}
function fn_stringFilter(b) {
    s = b.value;
    filteredValues = " !@@#$%^&*()_+|=-'?><{}[],./\uff03\uff06\uff0a\uff20\u203b\u2606\u2605\u25cb\u25cf";
    var c, d = "";
    for (c = 0; c < s.length; c++) {
        var e = s.charAt(c);
        if (filteredValues.indexOf(e) == -1) d += e
    }
    b.value = d
}

function fn_stringFilterAlert(b) {
    s = fn_getFileNameExtension(b.value);
    filteredValues = " !@@#$%^&*()+|='?><{}[],/\uff03\uff06\uff0a\uff20\u203b\u2606\u2605\u25cb\u25cf";
    for (b = 0; b < s.length; b++) {
        var c = s.charAt(b);
        if (filteredValues.indexOf(c) != -1) return false
    }
    return true
}

function fn_eMailList(b) {
    var c;
    splitMail = "chol.com/dreamwiz.com/empal.com/freechal.com/hanmail.net/hanmir.com/hitel.net/hotmail.com/intizen.com/korea.com/lycos.co.kr/nate.com/naver.com/netian.com/netsgo.com/orgio.net/paran.com/simmani.com/weppy.com/yahoo.co.kr".split("/");
    splitUrl = "chol.com/dreamwiz.com/empal.com/freechal.com/hanmail.net/hanmir.com/hitel.net/hotmail.com/intizen.com/korea.com/lycos.co.kr/nate.com/naver.com/netian.com/netsgo.com/orgio.net/paran.com/simmani.com/weppy.com/yahoo.co.kr".split("/");
    for (var d = 0; d < splitUrl.length; d++) {
        c = b == splitUrl[d] ? " selected " : "";
        document.writeln("<option value='" + splitUrl[d] + "'" + c + ">" + splitMail[d] + "</option>")
    }
}

function fn_return_eMailList(b) {
    var c, d = "";
    splitMail = "chol.com/dreamwiz.com/empal.com/freechal.com/hanmail.net/hanmir.com/hitel.net/hotmail.com/intizen.com/korea.com/lycos.co.kr/nate.com/naver.com/netian.com/netsgo.com/orgio.net/paran.com/simmani.com/weppy.com/yahoo.co.kr".split("/");
    splitUrl = "chol.com/dreamwiz.com/empal.com/freechal.com/hanmail.net/hanmir.com/hitel.net/hotmail.com/intizen.com/korea.com/lycos.co.kr/nate.com/naver.com/netian.com/netsgo.com/orgio.net/paran.com/simmani.com/weppy.com/yahoo.co.kr".split("/");
    for (var e = 0; e < splitUrl.length; e++) {
        c = b == splitUrl[e] ? " selected " : "";
        d = d + "<option value='" + splitUrl[e] + "'" + c + ">" + splitMail[e] + "</option>"
    }
    return d
}
function fn_eMailInsert(b) {
    var c = b.emailAddrSelect.value;
    if (c == "etc") {
        document.form1.emailAddr.style.backgroundColor = "";
        document.form1.emailAddr.readOnly = false;
        document.form1.emailAddr.value = ""
    } else {
        document.form1.emailAddr.style.backgroundColor = "#EFEFEF";
        document.form1.emailAddr.readOnly = true;
        b.emailAddr.value = c
    }
}

function fn_moveFocus(b, c, d) {
    c.value.length == b && d.focus()
}
function fn_dateAdd(b, c, d) {
    return fn_isDateAdd(d, b.toUpperCase(), c)
}
function fn_dateFormat(b, c) {
    return fn_getDateFormat(b, c)
}
function fn_applyPeriod(b, c, d, e, f) {
    var g = fn_str2date(c.value);
    f = fn_dateAdd("d", -1 * f, g);
    b.value = fn_getDateFormat(f, "YYYYMMDD");
    d.value = fn_getDateFormat(f, "YYYY-MM-DD");
    c.value = fn_getDateFormat(g, "YYYYMMDD");
    e.value = fn_getDateFormat(g, "YYYY-MM-DD")
}

function fn_monthday(b, c, d) {
    selectedmonth = c.selectedIndex;
    selectedday = d.selectedIndex;
    b = b.value;
    switch (selectedmonth) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
        b = 31;
        break;
    case 1:
        b = b % 4 == 0 && b % 100 != 0 || b % 400 == 0 ? 29 : 28;
        break;
    default:
        b = 30
    }
    for (i = 0; i < d.length; i++) d.options[i] = null;
    for (i = d.length = 0; i < b; i++) d.options[i] = selectedday == i ? new Option(fn_lpad(String(i + 1), 2, "0"), String(i + 1), true, true) : new Option(fn_lpad(String(i + 1), 2, "0"), String(i + 1), false, false)
}

function fn_checkedImageType(b) {
    if (!/\.(gif|jpg)/.test(b)) {
        fn_alert("\ub4f1\ub85d \uac00\ub2a5\ud55c \uc774\ubbf8\uc9c0 \ud30c\uc77c\uc740 JPG, GIF Type\ub9cc \uac00\ub2a5\ud569\ub2c8\ub2e4.");
        return false
    }
    return true
}
function fn_checkedXlsType(b) {
    var c = /\.(xlsx)/;
    if (!/\.(xls)/.test(b) && !c.test(b)) {
        fn_alert("\ub4f1\ub85d \uac00\ub2a5\ud55c \uc774\ubbf8\uc9c0 \ud30c\uc77c\uc740 xls, xlsx Type\ub9cc \uac00\ub2a5\ud569\ub2c8\ub2e4.");
        return false
    }
    return true
}

function fn_checkExcelFileType(b) {
    if (!/\.xls/.test(b)) {
        fn_alert("\ub4f1\ub85d \uac00\ub2a5\ud55c \ud30c\uc77c\uc740 " + fileType + " Type\ub9cc \uac00\ub2a5\ud569\ub2c8\ub2e4.");
        return false
    }
    return true
}

function fn_validation_object(b, c) {
    var d;
    minlength = b.minlength;
    target_text = b.value;
    target_text = fn_replace_empty_string(target_text);
    if (minlength != null) if (new Number(minlength) > target_text.length) {
        fn_alert("\ud574\ub2f9\ud56d\ubaa9\uc740 " + minlength + "\uae00\uc790 \uc774\uc0c1 \uc785\ub825\ud558\uc5ec\uc57c \ud569\ub2c8\ub2e4.");
        b.value = "";
        b.focus();
        return false
    }
    if (c != null) switch (c) {
    case "kor":
        d = 1;
        l1 = target_text.length;
        for (i = 0; i < l1; i++) {
            test_string = target_text.substring(i, i + 1);
            test_string_code = test_string.charCodeAt(0);
            if (test_string_code > 44031 && test_string_code < 63087) d = 1;
            else {
                d = 2;
                break
            }
        }
        if (d == 2) {
            fn_alert("\ud574\ub2f9 \uc785\ub825\ub780\uc740 \ud55c\uae00\ub9cc \uc785\ub825\ud560\uc218 \uc788\uc2b5\ub2c8\ub2e4.");
            b.value = "";
            b.focus();
            return false
        }
        break;
    case "eng":
        d = 1;
        l1 = target_text.length;
        for (i = 0; i < l1; i++) {
            test_string = target_text.substring(i, i + 1);
            test_string_code = test_string.charCodeAt(0);
            if (test_string_code > 64 && test_string_code < 91 || test_string_code > 96 && test_string_code < 123) d = 1;
            else {
                d = 2;
                break
            }
        }
        if (d == 2) {
            fn_alert("\ud574\ub2f9 \uc785\ub825\ub780\uc740 \uc601\uc5b4\ub9cc \uc785\ub825\ud560\uc218 \uc788\uc2b5\ub2c8\ub2e4.");
            b.value = "";
            b.focus();
            return false
        }
        break;
    case "num":
        target_text = b.value;
        l1 = target_text.length;
        for (i = 0; i < l1; i++) {
            test_string = target_text.substring(i, i + 1);
            test_string_code = test_string.charCodeAt(0);
            if (!(test_string_code > 47 && test_string_code < 58)) {
                d = 2;
                break
            }
        }
        if (d == 2) {
            fn_alert("\ud574\ub2f9 \uc785\ub825\ub780\uc740 \uc22b\uc790\ub9cc \uc785\ub825\ud560\uc218 \uc788\uc2b5\ub2c8\ub2e4.");
            b.value = "";
            b.focus();
            return false
        }
        break;
    case "engnum":
        d = 1;
        l1 = target_text.length;
        for (i = 0; i < l1; i++) {
            test_string = target_text.substring(i, i + 1);
            test_string_code = test_string.charCodeAt(0);
            if (test_string_code > 64 && test_string_code < 91 || test_string_code > 96 && test_string_code < 123 || test_string_code > 47 && test_string_code < 58) d = 1;
            else if (test_string_code == 45) d = 1;
            else {
                d = 2;
                break
            }
        }
        if (d == 2) {
            fn_alert("\ud574\ub2f9 \uc785\ub825\ub780\uc740 \uc601\uc5b4\uc640 \uc22b\uc790\ub9cc \uc785\ub825\ud560\uc218 \uc788\uc2b5\ub2c8\ub2e4.");
            b.value = "";
            b.focus();
            return false
        }
        break;
    case "kornum":
        d = 1;
        l1 = target_text.length;
        for (i = 0; i < l1; i++) {
            test_string = target_text.substring(i, i + 1);
            test_string_code = test_string.charCodeAt(0);
            if (test_string_code > 47 && test_string_code < 58 || test_string_code > 44031 && test_string_code < 63087) d = 1;
            else {
                d = 2;
                break
            }
        }
        if (d == 2) {
            fn_alert("\ud574\ub2f9 \uc785\ub825\ub780\uc740 \ud55c\uae00\uacfc \uc22b\uc790\ub9cc \uc785\ub825\ud560\uc218 \uc788\uc2b5\ub2c8\ub2e4.");
            b.value = "";
            b.focus();
            return false
        }
        break;
    case "engkor":
        d = 1;
        l1 = target_text.length;
        for (i = 0; i < l1; i++) {
            test_string = target_text.substring(i, i + 1);
            test_string_code = test_string.charCodeAt(0);
            if (test_string_code > 64 && test_string_code < 91 || test_string_code > 96 && test_string_code < 123 || test_string_code > 44031 && test_string_code < 63087) d = 1;
            else {
                d = 2;
                break
            }
        }
        if (d == 2) {
            fn_alert("\ud574\ub2f9 \uc785\ub825\ub780\uc740 \ud55c\uae00\uacfc \uc601\uc5b4\ub9cc \uc785\ub825\ud560\uc218 \uc788\uc2b5\ub2c8\ub2e4.");
            b.value = "";
            b.focus();
            return false
        }
    }
    return true
}
function fn_replace_empty_string(b) {
    for (; b.indexOf(" ") != "-1";) b = b.replace(" ", "");
    return b
}

function fn_get_radio_value(b) {
    if (b != "") {
        select_obj = b;
        if (select_obj != null) if (select_obj.length != null) {
            l1 = select_obj.length;
            r_value = "";
            for (i = 0; i < l1; i++) if (select_obj.item(i).checked) {
                r_value = select_obj.item(i).value;
                break
            }
            return r_value == "0" ? true : r_value != "" ? r_value : false
        } else return select_obj.checked ? select_obj.value : false;
        else return false
    }
}

function fn_onChkMemberId(b, c, d) {
    var e = document.forms[b];
    if (fn_isNull(e.elements[c])) {
        fn_alert("\uc0ac\uc6a9\ud560 \uc544\uc774\ub514\ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694.\nID\ub294 4~12\uc790\uc758 \uc601\ubb38\uacfc \uc22b\uc790\ub97c \uc0ac\uc6a9\ud558\uc2e4 \uc218 \uc788\uc2b5\ub2c8\ub2e4.");
        e.elements[c].focus()
    } else if (e.elements[c].value.length < 4 || e.elements[c].value.length > 12) {
        fn_alert("\uc544\uc774\ub514\ub294 4~12\uc790\uc758 \uc601\ubb38\uacfc \uc22b\uc790\ub97c \uc0ac\uc6a9\ud558\uc2e4 \uc218 \uc788\uc2b5\ub2c8\ub2e4.");
        e.elements[c].focus()
    } else {
        fn_CenterOpenWindow("/member.im?cmd=checkDuplicateID&forms=" + b + "&memberId=" + c + "&passwd=" + d + "&memberIdChk=" + e.elements[c].value, "newWin", "420", "300", "toolbar=no,scrollbars=no");
        e.elements[c].value = ""
    }
}
function fn_getFileExtension(b) {
    var c = -1;
    c = b.lastIndexOf(".");
    var d = "";
    return d = c != -1 ? b.substring(c + 1, b.len) : ""
}
function fn_getFileNameExtension(b) {
    var c = -1;
    c = b.lastIndexOf("\\");
    var d = "";
    return d = c != -1 ? b.substring(c + 1, b.len) : ""
}

function fn_getFileSize(b) {
    var c = 0;
    if (navigator.appName.indexOf("Netscape") != -1) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
        } catch (d) {
            fn_alert("signed.applets.codebase_principal_support\ub97c \uc124\uc815\ud574\uc8fc\uc138\uc694!\n" + d);
            return -1
        }
        try {
            var e = Components.classes["@@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
            e.initWithPath(b);
            c = e.fileSize
        } catch (f) {
            fn_alert("\uc5d0\ub7ec \ubc1c\uc0dd:" + f)
        }
    } else if (navigator.appName.indexOf("Microsoft") != -1) if (navigator.userAgent.indexOf("MSIE") > 0 && navigator.appVersion.indexOf("MSIE 7.") > 0) {
        document.all.FileUp.disabled = false;
        c = (new ActiveXObject("Scripting.FileSystemObject")).GetFile(b).size
    } else {
        c = new Image;
        c.dynsrc = b;
        c = c.fileSize
    }
    return c
}
function fn_checkFileSize(b, c) {
    var d = fn_getFileSize(b.value),
        e = fn_parseInt(c) * 1024;
    if (d >= e) return -1;
    return d
}

function fn_fileCheck(b, c) {
    if (b == null || b == "") return true;
    for (var d = fn_getFileExtension(b).toLowerCase(), e = 0; e < c.length; e++) if (d == c[e]) return true;
    return false
}
function fn_addDate(b) {
    this.setDate(this.getDate() + b * 1)
}
function fn_onSelect(b) {
    var c = new Date;
    Date.prototype.addDate = fn_addDate;
    c.addDate(-b);
    b = c.getFullYear();
    var d = c.getMonth() + 1;
    c = c.getDate();
    return b + String(fn_padZero(d, 2)) + String(fn_padZero(c, 2))
}

function fn_onSelect1(b) {
    var c = new Date;
    Date.prototype.addDate = fn_addDate;
    c.addDate(+b);
    b = c.getFullYear();
    var d = c.getMonth() + 1;
    c = c.getDate();
    return b + String(fn_padZero(d, 2)) + String(fn_padZero(c, 2))
}
function fn_padZero(b, c) {
    var d = c - ("" + b).length;
    if (typeof b == "number" && d > 0) {
        for (var e = "", f = 0; f < d; f++) e += "0";
        return e + b
    } else return b
}
function fn_onToday() {
    var b = new Date,
        c = b.getFullYear(),
        d = b.getMonth() + 1;
    b = b.getDate();
    return c + String(fn_padZero(d, 2)) + String(fn_padZero(b, 2))
}

function fn_setNoDate(b, c, d) {
    if (d == "0") {
        b.value = "";
        c.value = ""
    } else if (d == "-1") {
        b.value = fn_onToday();
        c.value = "20991231"
    } else {
        c.value = fn_onToday();
        b.value = fn_onSelect(d)
    }
}
function fn_setNoDate1(b, c) {
    if (c == "0") {
        b.startSearchDate.value = "";
        b.endSearchDate.value = ""
    } else {
        b.endSearchDate.value = fn_onSelect1(c);
        b.startSearchDate.value = fn_onToday()
    }
}

function fn_setNoDate2(b, c) {
    var d = "",
        e = "";
    e = d = "";
    if (c == "0") {
        b.startSearchDate.value = fn_onToday();
        b.endSearchDate.value = fn_onToday()
    } else {
        b.endSearchDate.value = fn_onToday();
        b.startSearchDate.value = fn_onSelect(c)
    }
    b.year_start.value = b.startSearchDate.value.substring(0, 4);
    d = b.startSearchDate.value.substring(4, 6);
    e = b.startSearchDate.value.substring(6, 8);
    if (d < 10) d = d.substring(1, 2);
    if (e < 10) e = e.substring(1, 2);
    b.month_start.value = d;
    b.day_start.value = e;
    b.year_end.value = b.endSearchDate.value.substring(0, 4);
    d = b.endSearchDate.value.substring(4, 6);
    e = b.endSearchDate.value.substring(6, 8);
    if (d < 10) d = d.substring(1, 2);
    if (e < 10) e = e.substring(1, 2);
    b.month_end.value = d;
    b.day_end.value = e
}
function fn_setNoDateMyPage(b, c) {
    if (c == "0") {
        b.startDt.value = fn_onToday();
        b.endDt.value = fn_onToday()
    } else if (c == "00") {
        b.endDt.value = "";
        b.startDt.value = ""
    } else {
        b.endDt.value = fn_onToday();
        b.startDt.value = fn_onSelect(c)
    }
}
function fn_goContentsLogin() {}

function fn_addOption(b, c, d) {
    if (b) {
        NewOption = new Option;
        NewOption.value = c;
        NewOption.text = d;
        b.add(NewOption)
    }
    return true
}
function fn_addOptions(b, c, d, e) {
    fn_allRemoveOption(b);
    e != "" && fn_addOption(b, "", e);
    for (i = 0; c.length > i; i++) fn_addOption(b, c[i], d[i]);
    b.selectedIndex = 0
}
function fn_allRemoveOption(b) {
    if (b) for (i = 0; b.length != 0;) b.options[0] = null
}

function fn_validationDatecheckOne(b) {
    var c = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        d = new Date;
    d.getYear();
    d.getMonth();
    d.getDate();
    d = [12, 31];
    var e = ["\uc6d4\uc77c", "\uc77c\uc790"],
        f = [],
        g = b.value;
    if (g.length != 8) {
        fn_alert("\uc720\ud6a8\ud558\uc9c0 \uc54a\uc740 \ub0a0\uc9dc\ud3ec\ub9f7\uc785\ub2c8\ub2e4\nYYYYMMDD \ud615\uc2dd\uc73c\ub85c \ub123\uc5b4\uc8fc\uc138\uc694");
        return false
    } else {
        var h = fn_parseInt(g.substring(0, 4));
        f[0] = fn_parseInt(g.substring(4, 6));
        f[1] = fn_parseInt(g.substring(6, 8));
        var k = fn_cday(h);
        if (f[0] == "02") if (k < f[1]) {
            fn_alert(k + "\uc77c\uc774 \ub9c8\uc9c0\ub9c9 \uc77c \uc785\ub2c8\ub2e4.");
            b.value = h + g.substring(4, 6) + k;
            b.focus();
            return false
        }
        for (var l in f) if (f[l] < 0 || f[l] > d[l]) {
            fn_alert(e[l] + "\ub97c \uc81c\ub300\ub85c \uc785\ub825\ud574 \uc8fc\uc138\uc694");
            b.value = "";
            b.focus();
            return false
        }
        if (c[f[0] - 1] < f[1]) {
            fn_alert("\uc77c\uc790\uc758 \ubc94\uc704\uac00 \ud2c0\ub9bd\ub2c8\ub2e4.");
            b.value = "";
            b.focus();
            return false
        }
    }
    return true
}

function fn_validationDatecheck(b, c) {
    if (fn_isNull(b)) {
        fn_alert("\uac80\uc0c9 \uc2dc\uc791\uc77c\uc790\ub97c \uc785\ub825\ud574 \uc8fc\uc138\uc694.");
        b.focus();
        return false
    }
    if (fn_isNull(c)) {
        fn_alert("\uac80\uc0c9 \uc885\ub8cc\uc77c\uc790\ub97c \uc785\ub825\ud574 \uc8fc\uc138\uc694.");
        c.focus();
        return false
    }
    var d = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        e = new Date;
    e.getYear();
    e.getMonth();
    e.getDate();
    e = [12, 31];
    var f = ["\uc6d4\uc77c", "\uc77c\uc790"],
        g = [],
        h = b.value;
    if (h.length != 8) {
        fn_alert("\ub0a0\uc9dc \ud615\uc2dd\uc774 \uc62c\ubc14\ub974\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");
        b.value = "";
        b.focus();
        return false
    } else {
        var k = fn_parseInt(h.substring(0, 4));
        g[0] = fn_parseInt(h.substring(4, 6));
        g[1] = fn_parseInt(h.substring(6, 8));
        var l = fn_cday(k);
        if (g[0] == "02") if (l < g[1]) {
            fn_alert(l + "\uc77c\uc774 \ub9c8\uc9c0\ub9c9 \uc77c \uc785\ub2c8\ub2e4.");
            b.value = k + h.substring(4, 6) + l;
            b.focus();
            return false
        }
        for (var m in g) if (g[m] < 0 || g[m] > e[m]) {
            fn_alert(f[m] + "\ub97c \uc81c\ub300\ub85c \uc785\ub825\ud574 \uc8fc\uc138\uc694");
            b.value = "";
            b.focus();
            return false
        }
        if (d[g[0] - 1] < g[1]) {
            fn_alert(" (a[0]-1) >>>" + (g[0] - 1));
            fn_alert("\uc77c\uc790\uc758 \ubc94\uc704\uac00 \ud2c0\ub9bd\ub2c8\ub2e4.");
            b.value = "";
            b.focus();
            return false
        }
    }
    h = [];
    k = c.value;
    if (k.length != 8) {
        fn_alert("\ub0a0\uc9dc \ud615\uc2dd\uc774 \uc62c\ubc14\ub974\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");
        c.value = "";
        c.focus();
        return false
    } else {
        l = fn_parseInt(k.substring(0, 4));
        h[0] = fn_parseInt(k.substring(4, 6));
        h[1] = fn_parseInt(k.substring(6, 8));
        var n = fn_cday(l);
        if (g[0] == "02") if (n < h[1]) {
            fn_alert(n + "\uc77c\uc774 \ub9c8\uc9c0\ub9c9 \uc77c \uc785\ub2c8\ub2e4.");
            c.value = l + k.substring(4, 6) + n;
            c.focus();
            return false
        }
        for (m in h) if (h[m] < 0 || h[m] > e[m]) {
            fn_alert(f[m] + "\ub97c \uc81c\ub300\ub85c \uc785\ub825\ud574 \uc8fc\uc138\uc694");
            c.value = "";
            c.focus();
            return false
        }
        if (d[h[0] - 1] < h[1]) {
            fn_alert("\uc77c\uc790\uc758 \ubc94\uc704\uac00 \ud2c0\ub9bd\ub2c8\ub2e4.");
            c.value = "";
            c.focus();
            return false
        }
    }
    if (b.value > c.value) {
        fn_alert("\uac80\uc0c9 \uc2dc\uc791\uc77c\uc774 \uc885\ub8cc\uc77c\ubcf4\ub2e4 \ud07d\ub2c8\ub2e4.");
        return false
    }
    return true
}

function fn_cday(b) {
    return daynum = b % 4 == 0 ? b % 100 == 0 ? b % 400 == 0 ? 29 : 28 : 29 : 28
}
function ObjectWrite(b) {
    document.write(b.text)
}
function fn_setSelectBox(b, c) {
    for (var d = 0; d < b.options.length; d++) if (b.options[d].value == c) {
        b.options[d].selected = true;
        break
    }
}
function fn_checkAll(b, c, d) {
    if (d == 0) alert("\uc120\ud0dd\ud560 \uc0ac\ud56d\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.");
    else if (c.length == undefined) c.checked = b.checked == true ? true : false;
    else b.checked == true ? fn_checkT(c) : fn_checkF(c)
}

function fn_checkT(b) {
    if (b.length == undefined) b.checked = true;
    else for (i = 0; i < b.length; i++) b[i].checked = true
}
function fn_checkF(b) {
    if (b.length == undefined) b.checked = false;
    else for (i = 0; i < b.length; i++) b[i].checked = false
}
function fn_chkVal(b) {
    var c = false,
        d = "";
    if (b != null) if (b.length == undefined) {
        c = b.checked;
        d = b.value
    } else for (j = 0; j < b.length; j++) if (b[j].checked) {
        c = true;
        d = b[j].value
    }
    if (c != true) alert("\ub300\uc0c1\uc744 \uc120\ud0dd\ud558\uc138\uc694.");
    else return d
}

function fn_checkObjValidation(b, c) {
    var d = true;
    for (i = 0; i < c.length; i++) if (c[i].checked == false) {
        d = false;
        break
    }
    b.checked = d ? true : false
}
function fn_setRadio(b, c) {
    for (var d = 0; d < b.length; d++) if (b[d].value == c) {
        b[d].checked = true;
        break
    }
}
function fn_getSelectedVal(b) {
    return b.options[b.selectedIndex].value
}
function fn_winClose() {
    self.close()
}

function fn_errInitModalWinPopup(b, c) {
    var d = {};
    d.errorCode = b;
    d.errorMsg = c;
    d.initFunction = fn_winClose;
    var e = "dialogWidth=420px; dialogHeight=302px; center: Yes; ";
    e += "help: No; resizable: No; status: No; scroll: No ";
    fn_clearProgressLayer();
    window.showModalDialog("/common/errModalPopup.jsp", d, e)
}
function fn_clearProgressLayer() {
    try {
        var b = parent.document.getElementById("progressBackgroundArea");
        if (b) b.innerHTML = "";
        var c = parent.document.getElementById("progressArea");
        if (c) c.innerHTML = ""
    } catch (d) {}
}

function fn_putComma(b) {
    var c = new String,
        d = new String,
        e = 0,
        f = 0,
        g = 0;
    f = 0;
    c = b.toString();
    d = "";
    f = c.indexOf(".", 1);
    if (f == -1) {
        g = c.length - (c.charAt(0) == "0" ? 1 : 0);
        for (e = 1; e <= c.length; e++) {
            f = e - Math.floor(e / 3) * 3;
            d = (f == 0 && e < g ? "," : "") + c.charAt(c.length - e) + d
        }
    } else {
        g = f - (c.charAt(0) == "-" ? 1 : 0);
        for (e = 1; e <= f; e++) d = (e == 0 && e < g ? "," : "") + c.charAt(f - e) + d;
        for (e = f; e < f + 3; e++) d += c.charAt(e)
    }
    return d
}
function fn_trim(b) {
    return fn_replace(b, " ", "")
}

function fn_getRadioValue(b) {
    if (b == null) return "";
    if (b[0] == null) {
        if (b.checked == true) return b.value
    } else for (var c = 0; c < b.length; c++) if (b[c].checked == true) return b[c].value;
    return ""
}
function fn_replace(b, c, d) {
    var e, f, g;
    e = b.length;
    g = "";
    for (f = 0; f < e; f++) g += b.charAt(f) != c ? b.charAt(f) : d;
    return g
}

function fn_getSelectValue(b) {
    var c = [],
        d = 0;
    if (b == null) return c;
    if (b.options == null) return c;
    if (b.options[0] == null) {
        if (b.options.selected == true) c[d] = b.options.value
    } else for (var e = 0; e < b.options.length; e++) if (b.options[e].selected == true) {
        c[d] = b.options[e].value;
        d++
    }
    return c
}
function fn_inputCheckNum() {
    if (event.keyCode < 48 || event.keyCode > 57) {
        if (event.keyCode == 13) return true;
        event.returnValue = false
    }
}

function fn_inputCheckNumComma() {
    if (event.keyCode < 48 || event.keyCode > 57) {
        if (event.keyCode == 13 || event.keyCode == 46) return true;
        event.returnValue = false
    }
}
function fn_nextFocus(b, c, d) {
    b.value.length >= d && c.focus()
}
function addTD(b, c) {
    var d;
    if (b && b.tagName == "TR") {
        d = [];
        for (var e = 0; e < c; e++) {
            d[e] = document.createElement("td");
            b.appendChild(d[e])
        }
        return d
    }
}
function addTdFeild(b, c) {
    for (var d = b.length, e = 0; e < d; e++) addField(b[e], c[e])
}
function addField(b, c) {
    (typeof b != "string" ? b : $(b)).innerHTML += c
}

function addTdAttribute(b, c, d) {
    for (var e = 0; e < c.length; e++) c[e].setAttribute(b, d[e])
}
function fn_delTR(b, c) {
    for (var d = document.getElementById("InTableTbody_01"), e = document.getElementsByName(c), f = e.length, g = 0, h = "F", k = 0; k < f; k++) if (e[g].checked) {
        h = "T";
        d.removeChild(e[g].parentNode.parentNode)
    } else++g;
    h == "F" && alert("\uc120\ud0dd\ub41c \ud56d\ubaa9\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.")
}

function addOptionsByJSon(b, c, d) {
    allRemoveOption(b);
    d != "" && addOption(b, "", d);
    for (var e = "", f = 0; f < c.length; f++) {
        e = c[f].text;
        if (e != "") {
            if (e == "ALLDATA") e = "- \uc804\uccb4 -";
            else if (e == "NONAME") e = "\uba85\uce6d\uc5c6\uc74c";
            addOption(b, c[f].value, e)
        }
    }
    if (d != "" && b.length == 1) {
        allRemoveOption(b);
        addOption(b, "", "-\ud574\ub2f9\uac12\uc774 \uc5c6\uc2b5\ub2c8\ub2e4-")
    }
    b.selectedIndex = 0;
    return true
}
function allRemoveOption(b) {
    if (b) {
        for (j = b.length - 1; j >= 0; j--) b.options[j] = null;
        b.selectedIndex = 0
    }
    return true
}

function addOption(b, c, d) {
    if ($.browser.msie) {
        if (b) {
            var e = new Option;
            e.value = c;
            e.text = d;
            b.add(e)
        }
    } else if (b) {
        e = new Option;
        e.value = c;
        e.text = d;
        b.appendChild(e)
    }
    return true
}
function fn_comModalWinPopup(b) {
    var c = {};
    c.msg = b;
    b = "dialogWidth=336px; dialogHeight=210px; center: Yes; ";
    b += "help: No; resizable: No; status: No; scroll: No ";
    window.showModalDialog("/common/popMsg.jsp", c, b)
}

function $kthAjaxCall(b, c, d, e, f, g, h, k, l, m, n) {
    var p = "",
        o = "";
    m = m ? m : "POST";
    n = n ? n : "xml";
    l = l ? l : "\uc2dc\uc2a4\ud15c \uc624\ub958 \ubc1c\uc0dd";
    k = k ? k : d + "\uc2e4\ud328 \ud588\uc2b5\ub2c8\ub2e4.";
    h = h ? h : d + "\uc131\uacf5 \ud588\uc2b5\ub2c8\ub2e4.";
    if (b == "" || c == "") {
        alert("URL \uacfc DATA \ub294 \ud544\uc218\uc785\ub2c8\ub2e4.");
        return false
    }
    $.ajax({
        type: m,
        url: b,
        data: c,
        dataType: n,
        success: function (q) {
            $(q).find("Response").each(function () {
                o = $(this).find("result").text();
                p = $(this).find("msg").text()
            });
            if (o == "0") {
                alert(h);
                e != null && e != "" && e()
            } else if (o != "1") {
                alert(p);
                f != null && f != "" && f()
            } else {
                alert(k);
                g != null && g != "" && g()
            }
        },
        error: function () {
            alert(l)
        }
    })
}
function fn_goUrlPost(b, c) {
    b.method = "POST";
    b.action = c;
    b.submit()
}
function fn_goUrlGet(b, c) {
    location.href = b + c
}

function fn_dateChk(b, c) {
    var d = fn_onToday();
    if (!fn_isNull(b.startDt) || !fn_isNull(b.endDt)) if (!fn_isSequentialDate(b.startDt, b.endDt, d)) {
        alert(c + " \uc885\ub8cc\uc77c\uc774 \uc2dc\uc791\uc77c\ubcf4\ub2e4 \ube60\ub985\ub2c8\ub2e4.");
        b.startDt.focus();
        return false
    }
    return true
}
function fn_LoginPage(b) {
    document.location.href = b
}

function fn_goLoingByNoSession() {
    fn_alert("\uc138\uc158\uc774 \ub354 \uc774\uc0c1 \uc720\ud6a8\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. \ub85c\uadf8\uc778 \ud398\uc774\uc9c0\ub85c \uc774\ub3d9\ud569\ub2c8\ub2e4.");
    document.location.href = "/login.im"
}
var isNS = navigator.appName == "Netscape" ? 1 : 0,
    EnableRightClick = 0;
if (isNS) document.captureEvents(Event.MOUSEDOWN || Event.MOUSEUP);

function fn_mischandler() {
    return EnableRightClick == 1 ? true : false
}

function fn_mousehandler(b) {
    if (EnableRightClick == 1) return true;
    b = isNS ? b : event;
    b = isNS ? b.which : b.button;
    if (b == 2 || b == 3) return false
}
function fn_keyhandler(b) {
    if ((isNS ? b : window.event).keyCode == 96) EnableRightClick = 1
}
function roundXL(b, c) {
    if (c >= 0) return parseFloat(b.toFixed(c));
    c = Math.pow(10, c);
    return parseFloat((Math.round(b * c) / c).toFixed(0));
}
function fn_containsQ(value, chars) {
    for (var inx = 0; inx < value.length; inx++) {
        if (chars.indexOf(value.charAt(inx)) != -1) return true;
    }
    return false;
}
var _eNomixTargetDiv;

function fn_start(_urlcode) {
    var _ele = document.createElement("script");
    _ele.setAttribute("type", "text/javascript");
    _ele.setAttribute("src", "http://61.78.74.226:8080/enomix/Check/?szMethodName=MakeJs&site_id=hanabank&group_id=AGGR00000000000002&urlcode=" + _urlcode);
    document.body.appendChild(_ele);
    _eNomixTargetDiv = document.body;
    window.onscroll = function () {
        var _fScrollTopVal = document.body.scrollTop;
        if (_fScrollTopVal == 0) {
            _fScrollTopVal = document.documentElement.scrollTop;
        }
        if (document.body.scrollHeight > _fScrollTopVal) {
            var _float_banner_1 = document.getElementById("splayer");
            var _float_banner_2 = document.getElementById("fplayer");
            if (_float_banner_1 && _float_banner_2) {
                _float_banner_1.style.top = _fScrollTopVal + "px";
                _float_banner_2.style.top = _fScrollTopVal + "px";
            }
        }
    }
}

function fn_end() {
    if (typeof stopChattingEvent == 'function') {
        if (stopChattingEvent) stopChattingEvent();
    }
    var _spectra_scripts = document.body.getElementsByTagName("SCRIPT");
    for (var _idx = 0; _idx < _spectra_scripts.length; _idx++) {
        if (_spectra_scripts.item(_idx).getAttribute("src")) {
            if (_spectra_scripts.item(_idx).getAttribute("src").indexOf("enomix") > -1) {
                if (_eNomixTargetDiv) {
                    _eNomixTargetDiv.removeChild(_spectra_scripts.item(_idx))
                }
            }
        }
    }
    if (typeof stopChattingEvent == 'function') {
        if (stopChattingEvent) stopChattingEvent();
    }
    return false;
}

function go_myhana() {
    location.href = "/myhana/subindex.do?menuItemId=wpcus401_13i";
}

function addCart(loginYn, prdCd, prdDvCd, fncPrdNm, subUrl, prdImgPath, fncPrdCtt) {
    var loginYn, prdCd, prdDvCd, fncPrdNm, subUrl, prdImgPath, fncPrdCtt;
    fncPrdCtt = fncPrdCtt.replace(/<[^>]+>/g, "");
    if (loginYn == 'true') {
        var subUrl = subUrl;
        var newFormObj = "<form><input type='hidden' id='prdCd' name='prdCd' value='" + prdCd + "'><input type='hidden' id='prdDvCd' name='prdDvCd' value='" + prdDvCd + "'></form>";
        jQ.ajax({
            type: "POST",
            url: "/mkt/dpm/dpm_ASel.do",
            dataType: "json",
            success: function (xhr, textStatus, res) {
                var data = eval('(' + res.responseText + ')');
                var isFindcode = false;
                var totalCnt = data.myConcernArray.length;
                for (var i = 0; i < totalCnt; i++) {
                    if (data.myConcernArray[i].prdCd != null && data.myConcernArray[i].prdCd == prdCd) {
                        isFindcode = true;
                        break;
                    }
                }
                if (isFindcode) {
                    app.modalLayerShow("layerAlert", "<strong>'" + fncPrdNm + "'</strong>은/는 이미 등록된 상품입니다.");
                    return;
                } else {
                    var newFormObj = "<form><input type='hidden' id='prdCd' name='prdCd' value='" + prdCd + "'/><input type='hidden' id='prdDvCd' name='prdDvCd' value='" + prdDvCd + "'/><input type='hidden' id='prdImgPath' name='prdImgPath' value='" + prdImgPath + "'/><input type='hidden' id='fncPrdNm' name='fncPrdNm' value='" + fncPrdNm + "'/><input type='hidden' id='fncPrdCtt' name='fncPrdCtt' value='" + fncPrdCtt + "'/><input type='hidden' id='urlAdr' name='urlAdr' value='" + subUrl + "'/></form>";
                    var url = '/mkt/dpm/dpm_AIns.do';
                    var newFormObj = jQ(newFormObj).serialize();
                    var data = 'ajax=true';
                    data += '&' + newFormObj;
                    data += "&requestTarget=popup-temp";
                    jQ.ajax({
                        type: "POST",
                        url: "/mkt/dpm/dpm_AIns.do",
                        data: data,
                        dataType: "html",
                        success: function (html) {
                            var AIns_ajax = jQ(html).find("#hiddenPrdNm").find("strong").html();
                            fn_log('AIns.do에 넘어간 값=' + data);
                            fn_log('AIns.do에서 돌아온 값=' + html);
                            app.modalLayerShow("layerConfirm1", "<strong>" + fncPrdNm + "</strong>이 관심상품으로 등록 되었습니다.<br />관심상품 목록을 보러 가시겠습니까?", "go_myhana();", "javascript:app.alertModalLayerClose();");
                            fn_log('관심상품이 등록되었습니다.');
                        },
                        error: function (data, status, err) {
                            app.modalLayerShow("layerAlert", "정상적으로 상품을 등록할 수 없습니다. 관리자에게 문의하시기 바랍니다.", "javascript:app.alertModalLayerClose();", "");
                        }
                    });
                }
            },
            error: function (xhr, textStatus, errorThrow) {
                app.modalLayerShow("layerAlert", "정상적으로 상품을 등록할 수 없습니다. 관리자에게 문의하시기 바랍니다.", "javascript:app.alertModalLayerClose();");
            }
        });
    } else {
        app.modalLayerShow("layerConfirm1", "관심상품 등록은 로그인을 하신 후 이용이 가능합니다. <br> 로그인을 하시겠습니까?", "fn_goPage('/common/login.do?loginRedirectUrl=" + urlText + "');");
    }
}