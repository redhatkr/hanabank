/*INISEAL:[d1q3fppsDYx%2FGpRW5T%2FSWYbOV70%3D%0A]*/
var item = new Array();
var myAppItem = new Array();
var footerSetTimeoutMemory;
var myAppCnt = 0;
var myAppPage = 1;
var myAppPageEa = 15;
var myAppPageTotalCnt = 0;
var myAppReady = false;
var $IE6 = typeof document.addEventListener !== 'function' && !window.XMLHttpRequest;
var $IE7 = navigator.userAgent.indexOf("MSIE 7.0") != -1 ? true : false;
var stageMode = null;
var loginChk = null;
var loginCustNm = null;
var loginCustEngNm = null;
var LA_custom01 = null;
var LA_custom02 = null;
var resizeMemory = null;
var pageMemory = null;

function purge(d) {}

function fn_setReturnPageUrl(url) {
    if (url == "clearPageMem") {
        pageMemory = null;
    } else {
        pageMemory = url;
    }
}

function fn_getReturnPageUrl() {
    return pageMemory;
}

function fn_targetScroll(target) {
    if (jQuery(target).length > 0) {
        jQuery(document).scrollTop(jQuery(target).offset().top - 10);
    }
}

function fn_log(msg) {
    if (typeof console != "undefined") {
        console.log(msg);
    }
}
/*
function fn_viewLogin(appcd) {
    appcd = hanaCommon.common.undefinedChk(appcd, "") != "" ? "?appcd=" + appcd : "";
    var returnUrl = "";
    if (app.viewPoint == "main") {
        returnUrl = hanaAppProperty.contextPath + "/index.jsp" + appcd;
    } else {
        returnUrl = hanaAppProperty.contextPath + "/app_" + app.viewPoint + ".jsp" + appcd;
    }
    if (app.viewPoint == "cate") {
        returnUrl += (appcd != "" ? "^" + app.categoryNum : "?num=" + app.categoryNum);
    }
    hanaCommon.login.appLogin(returnUrl);
}
*/
function fn_viewLoginAlertChk(appcd) {
    app.modalLayerShow("layerConfirm1", "해당 서비스는 로그인을 하신 후 이용이 가능합니다. <br> 로그인을 하시겠습니까?", "fn_viewLogin('" + appcd + "');");
}

function fn_wallpaperInstall(appcd, appname) {
    if ($IE7) {
        if (!confirm("인터넷 익스플로러 7은 브라우저의 버그로 인하여 바로가기 아이콘 정상적으로 작동하지 않을 수 있습니다. \n 재부팅 후에는 정상 작동합니다.")) {
            return;
        }
    }
    var limit_char = /[~!\#$^&*\=+|:;?"<,.>']/;
    var tmpAppname = "";
    for (var i = 0; i < appname.length; i++) {
        var data = appname.charAt(i);
        tmpAppname += data.replace(limit_char, "");
    }
    fn_goPage(hanaAppProperty.contextPath + "/include/download.jsp?appcd=" + appcd + "&appname=" + encodeURIComponent(tmpAppname));
}

function fn_goTotalSearch(target) {
    var params = app.getParam(window.location.href);
    var word = "";
    if (jQuery(target).val() == "" || jQuery(target).val() == "검색어를 입력하세요" || jQuery(target).val() == "검색어를 입력해주세요") {
        word = encodeURIComponent("나의 소원적금");
    } else {
        word = encodeURIComponent(jQuery(target).val());
        word = word.replace(/%26/gi, "");
    }
	/*
    var url = location.href.split("#")[0].split("?")[0];
    url = url.replace("nhana/index.jsp");
    if (url.substring(url.length - 1, url.length) == "/") {
        url += "nhana/index.jsp";
    }
    url += "?query=" + word;
    location.href = url;
*/
	location.href="/nhana/Se/SeAll/nsearch_total.jsp?query=" + word;
}

/*
function fn_goTotalSearch2(target) {
    var s_str = jQuery(target).val();
    if ("" == s_str || null == s_str || s_str.indexOf("검색어를 입력하세요") > -1) s_str = "소원";
    modal.modalOpen('?appcd=SeAll', s_str);
}
*/
function parentMoveUrl(url) {
    if (document.getElementById("appFundIframe") != null) {
        document.getElementById("appFundIframe").src = url;
    } else if (parent.document.getElementById("appFundIframe") != null) {
        parent.document.getElementById("appFundIframe").src = url;
    } else {
        parent.parent.document.getElementById("appFundIframe").src = url;
    }
}
/*
function fn_login(url, mode, gubun) {
    var msg1 = "현재 오픈된 모든 APP을 닫고, <br/> 해당 페이지로 이동합니다.";
    var msg2 = "현재 선택하신 서비스 페이지로 이동합니다.";
    if (modal.viewMode.length > 0) {
        if (mode == "script"||"B") {
            app.modalLayerShow("layerConfirm", msg1, url);
        } else if (mode == "data1") {
            hanaJQuery.login.commIndexSubmit(null, url, gubun);
        } else if (mode == "data2") {
            hanaJQuery.login.commIndexSubmit(null, url, gubun);
        } else if (mode == "data3") {
            hanaJQuery.login.commSubmit(null, url, gubun);
        } else {
            fn_goPage(url);
        }
    } else {
        if (mode == "script"||"B") {
            app.modalLayerShow("layerConfirm", msg2, url);
        } else if (mode == "data1") {
            hanaJQuery.login.commIndexSubmit(null, url, gubun);
        } else if (mode == "data2") {
            hanaJQuery.login.commIndexSubmit(null, url, gubun);
        } else if (mode == "data3") {
            hanaJQuery.login.commSubmit(null, url, gubun);
        } else {
            fn_goPage(url);
        }
    }
}
*/

//URL 방식으로 교체
// 자바스크립트 URL 일경우 기본 "fn_goPage" 함수로 이동함
function fn_login(url1, url2, gubun) {
	if (loginChk == "false") {
		var msg2 = "해당 서비스는 로그인을 하신 후 이용이 가능합니다. <br> 로그인을 하시겠습니까?";
		if(gubun=="sinyoung"){
			msg2 = '당행 인터넷뱅킹 회원이시면 "예"를<br />당행 인터넷뱅킹 비회원이시면 "아니오"를<br />선택하세요.';
			app.modalLayerShow("layerConfirm2", msg2, url1, url2);
		}else{
			app.modalLayerShow("layerConfirm", msg2, url1);
		}
	} else {
		fn_goPage(url1);
	}
}
//2012.04.12 상품클릭시 로그인

/* 개편 수정 2014.02.12*/
function fn_Product(url, mode, gubun) {
	if("trans"==gubun){
		var msg = "상품전환을 위한  페이지로 <br/> 이동하시겠습니까?";
		app.modalLayerShow("layerConfirm", msg, url);
	}else{
		var msg = "상품가입을 위한  페이지로 <br/> 이동하시겠습니까?";
		app.modalLayerShow("layerConfirm", msg, url);
	}

	//fn_goPage(url);
	/*
	var msg = "현재 선택하신 서비스 페이지로 <br/> 이동하시겠습니까?";
	app.modalLayerShow("layerConfirm", msg, url);
	*/
	/*
	var msg1 = "상품가입을 위한  페이지로 <br/> 이동하시겠습니까?";
    var msg2 = "현재 선택하신 서비스 페이지로 이동합니다.";
    if (modal.viewMode.length > 0) {
        if (mode == "script") {
            app.modalLayerShow("layerConfirm", msg1, url);
        } else if (mode == "data1") {
            hanaJQuery.login.commIndexSubmit(null, url, gubun);
        } else if (mode == "data2") {
            hanaJQuery.login.commIndexSubmit(null, url, gubun);
        } else if (mode == "data3") {
            hanaJQuery.login.commSubmit(null, url, gubun);
        } else {
            fn_goPage(url);
        }
    } else {
        if (mode == "script") {
            app.modalLayerShow("layerConfirm", msg2, url);
        } else if (mode == "data1") {
            hanaJQuery.login.commIndexSubmit(null, url, gubun);
        } else if (mode == "data2") {
            hanaJQuery.login.commIndexSubmit(null, url, gubun);
        } else if (mode == "data3") {
            hanaJQuery.login.commSubmit(null, url, gubun);
        } else {
            fn_goPage(url);
        }
    }*/
}
//2012.03.08 페이지이동 컨펌창 

/*
function fn_movepage_conf(url, gubun) {
    var msg1 = "대출상담 신청을 위해서는 콜센터 <br/> 홈페이지로 페이지가 이동됩니다."; //파워검색대출 상품상담
    var msg = "";
    if ("loan" == gubun) msg = msg1;
    initDiv = '<div id="alert_layer_wrap"><!--[if IE 6]><iframe id="alert_layer_iframe" frameborder="0"></iframe><![endif]--><div id="alert_layer_overlay"></div></div>';
    initDiv += '<div id="alert_layer_window" class="alert_box05_wrap">';
    initDiv += '<span class="box_close"><a href="javascript:(app.alertModalLayerClose())"><img src="/resource_app/images/common/box_close.png" alt="닫기" /></a></span>';
    initDiv += '<table class="tc_table">';
    initDiv += '<tr>';
    initDiv += '<td class="ts_top_left"></td>';
    initDiv += '<td class="ts_top_middle"></td>';
    initDiv += '<td class="ts_top_right"></td>';
    initDiv += '</tr>';
    initDiv += '<tr>';
    initDiv += '<td class="ts_middle_left"></td>';
    initDiv += '<td class="ts_middle_middle"><p class="layerComment">' + msg + '</p></td>';
    initDiv += '<td class="ts_middle_right"></td>';
    initDiv += '</tr>';
    initDiv += '<tr>';
    initDiv += '<td class="ts_bottom_leftL"></td>';
    initDiv += '<td class="ts_bottom_middleL"><a href="javascript:void(0)" onclick="app.alertModalLayerClose();window.open(\'' + url + '\')"><img src="/resource_app/images/common/btn_c_yes.png" alt="예" /></a>';
    initDiv += '<a href="javascript:void(0)" onclick="app.alertModalLayerClose();"><img src="/resource_app/images/common/btn_c_no.png" alt="아니오" /></a></td>';
    initDiv += '<td class="ts_bottom_rightL"></td>';
    initDiv += '</tr>';
    initDiv += '</table>';
    initDiv += '</div>';
    jQuery("#wrap").append(initDiv);
}

// 파워상품검색리스트에서 대출상품중 새창으로 이동하는 상품일 경우 20121204


function fn_Gopage_Move(url, gubun) {
    var msg1 = "대출신청을 위해서 <br/> 새창으로 페이지가 이동됩니다."; //파워검색대출 상품상담
    var msg = "";
    if ("loan" == gubun) msg = msg1;
    initDiv = '<div id="alert_layer_wrap"><!--[if IE 6]><iframe id="alert_layer_iframe" frameborder="0"></iframe><![endif]--><div id="alert_layer_overlay"></div></div>';
    initDiv += '<div id="alert_layer_window" class="alert_box05_wrap">';
    initDiv += '<span class="box_close"><a href="javascript:(app.alertModalLayerClose())"><img src="/resource_app/images/common/box_close.png" alt="닫기" /></a></span>';
    initDiv += '<table class="tc_table">';
    initDiv += '<tr>';
    initDiv += '<td class="ts_top_left"></td>';
    initDiv += '<td class="ts_top_middle"></td>';
    initDiv += '<td class="ts_top_right"></td>';
    initDiv += '</tr>';
    initDiv += '<tr>';
    initDiv += '<td class="ts_middle_left"></td>';
    initDiv += '<td class="ts_middle_middle"><p class="layerComment">' + msg + '</p></td>';
    initDiv += '<td class="ts_middle_right"></td>';
    initDiv += '</tr>';
    initDiv += '<tr>';
    initDiv += '<td class="ts_bottom_leftL"></td>';
    initDiv += '<td class="ts_bottom_middleL"><a href="javascript:void(0)" onclick="app.alertModalLayerClose();window.open(\'' + url + '\')"><img src="/resource_app/images/common/btn_c_yes.png" alt="예" /></a>';
    initDiv += '<a href="javascript:void(0)" onclick="app.alertModalLayerClose();"><img src="/resource_app/images/common/btn_c_no.png" alt="아니오" /></a></td>';
    initDiv += '<td class="ts_bottom_rightL"></td>';
    initDiv += '</tr>';
    initDiv += '</table>';
    initDiv += '</div>';
    jQuery("#wrap").append(initDiv);
}

function fn_chzero() {
    window.open('http://hanabank.chzero.com/top.jsp', 'MapSearch', 'width=876,height=605, toolbar=0, location=0, menubar=0, status=0');
}
*/
function fn_arrayUnique(arr1, arr2) {
    var tempArr = new Array();
    var returnArr = jQuery.map(jQuery.merge(arr1, arr2), function (obj, i) {
        for (k = 0; k < tempArr.length; k++) {
            if (obj.appcd == tempArr[k]) {
                return null;
            }
        }
        tempArr[tempArr.length] = obj.appcd;
        return obj;
    });
    return returnArr;
}

function fn_selectBoxSeleted(id, val) {
    jQuery("#" + id).val(val).attr("selected", "selected");
    var type = jQuery(":input:radio[name=liveChtType]:checked").val();
    if (type == 'TEXT' || type == "VIDEO") {
        fn_chat(type);
    } else if (type == 'AUDIO') {
        if (call_agent.sel_kind.value == 00) {
            app.modalLayerShow("layerAlert", "상담하실 업무분야를 선택해 주세요.");
            return;
        }
        window.open('/efamily/consult/cust_consult_pop.do?sel_kind=' + call_agent.sel_kind.value + '', 'pop', 'width=480, height=447, menubar=no, resizable=no, location=no, status=yes, toolbar=no');
    }
    app.modalLayerClose('div_chat');
}
function Re_chatSet() { 
	var this_url = document.location.href;
	window.location.href= "/common/login.do?loginRedirectUrl="+this_url;
	
}
function fn_chat(type) {
    d = new Date();
    if (loginChk == "false") {
       // app.modalLayerShow("layerConfirm1", "해당 서비스는 로그인을 하신 후 이용이 가능합니다. <br> 로그인을 하시겠습니까?", "fn_viewLogin();");
        app.modalLayerShow("layerConfirm1", "해당 서비스는 로그인을 하신 후 이용이 가능합니다. <br> 로그인을 하시겠습니까?", "Re_chatSet();");
    } else {
        if (call_agent.sel_kind.value == 00) {
            app.modalLayerShow("layerAlert", "상담하실 업무분야를 선택해 주세요.");
            return;
        }
        document.call_agent.call_type.value = type;
        window.open('/efamily/consult/chat_advice_pop.do?sel_kind=' + call_agent.sel_kind.value + '', 'pop', 'width=480, height=447, menubar=no, resizable=no, location=no, status=yes, toolbar=no');
    }
}

function fn_printArea(target) {
    fn_openWindow('/appstage/include/print.html?target=' + target, 'print', 'width=759, height=610, menubar=no, resizable=no, location=no, status=no, toolbar=no ,scrollbars=no');
}
// 금융상품에서 사용하는 프린트 함수 20120914 한충수
function print_Finance(target) {
    fn_openWindow('/nhana/com/finance_print.html?target=' + target, 'print', 'width=626, height=685, menubar=no, resizable=no, location=no, status=no, toolbar=no ,scrollbars=no');
}

function setPng24(obj) {
    obj.width = obj.height = 1;
    obj.className = obj.className.replace(/\bpng24\b/i, '');
    obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + obj.src + "',sizingMethod='image');"
    obj.src = '';
    return '';
}
var hanaCommon = {
	/*
    myAppData: {
        "myAppId": "#myapp_area"
    },
    myAppPosition: function () {
    },
    setMyAppList: function (mode) {
    },
    addMyApp: function (appcd) {
        var params = "appCd" + appcd;
        if (loginChk == "false") {
            app.modalLayerShow("layerConfirm1", "My App 추가는 로그인 이후에 가능합니다. </br> 로그인 하시겠습니까? ", "fn_viewLogin();");
            return;
        }
        if (!myAppReady) {
            app.modalLayerShow("layerAlert", "My App 정보를 로딩중입니다. 다시 한번 시도해주십시오.");
            return;
        }
        for (i = 0; i < myAppItem.length; i++) {
            if (myAppItem[i].appcd == appcd) {
                app.modalLayerShow("layerAlert", "이미 MyApps에 추가된 App입니다.");
                return;
            }
        }
        hanaJQuery.myapp.procMyAppId(null, 'app_reg', appcd);
        myAppCnt = 0;
        app.myAppList = null;
        main.getAppList();
        hanaCommon.setMyAppList();
        if (app.viewPoint != "main") {
            app.modalLayerShow("layerConfirm1", "MyApps에 성공적으로 추가되었습니다. <br> 메인화면으로 이동하시겠습니까?", "fn_goPage('" + hanaAppProperty.baseUrl.baseUrlAppIndex + "');");
        } else {
            app.modalLayerShow("layerAlert", "MyApps에 성공적으로 추가되었습니다.");
        }
		
    },
    removeMyApp: function (appcd) {
        var params = "appCd" + appcd;
        hanaJQuery.myapp.procMyAppId(null, 'app_del', appcd);
        myAppCnt = 0;
        app.myAppList = null;
        main.getAppList();
        hanaCommon.setMyAppList();
    },
    myAppCloseEventAdd: function (appcd) {
        jQuery("ul.myapp_list > li a").eq(-1).hover(function () {
            jQuery(this).append('<span class="btn_close"><a href="javascript:hanaCommon.removeMyApp(\'' + appcd + '\');"  ><img src="/resource_app/images/common/app_close.png" alt="삭제" /></a></span>');
        }, function () {
            jQuery(this).children(".btn_close").remove();
        });
    },
    fullScreenAppChange: function (url, params, firstYn, flag) {
    },
    modalBubbleToggle1: function () {
    },
    modalBubbleToggle2: function () {
    },
    sFieldOnFocus: function () {
        jQuery("#category").hide();
        jQuery("#category_list").hide();
    },
    sFieldOnBlur: function () {
        jQuery("#category").show();
        jQuery("#category_list").hide();
    },
    btnSearchOnFocus: function () {
        jQuery("#category").hide();
        jQuery("#category_list").hide();
    },
    documentScrollTop: function () {
        window.scrollTo(0, 0);
    },
    castScrollTop: function () {
        hanaCommon.documentScrollTop();
        jQuery("div.cast_contents").scrollTop(0);
    },
    productScrollTop: function () {
        jQuery("#product_app_contents", parent.document).scrollTop(0);
    },
    chengeContentsGubun: function (url, params, callback) {
        if (stageMode == 'newstore' || stageMode == 'wish') {
            jQuery(hanaAppProperty.containerWrap).changeContent(url, params, function () {
                jQuery(window).resize();
            });
        } else {
            jQuery(hanaAppProperty.container).changeContent(url, params, function () {
                jQuery(window).resize();
            });
        }
    },
    newStoreWishAddEvent: function () {
        jQuery(window).resize().unbind();
        jQuery(window).resize(function () {
            if (jQuery("#wishWrap").length > 0) {
                var $container = jQuery("#containerWrap");
                var $nWishContainer = jQuery("#wishCont");
                var h = parseInt(jQuery(window).height());
                var w = parseInt(jQuery(window).width());
                $container.css('height', (jQuery(window).height() <= 724 ? 540 : jQuery(window).height() - 185));
                jQuery("#containerWrap , #wishMain").css('width', jQuery(window).width() <= 1003 ? '1003px' : jQuery(window).width());
                hanaCommon.login.timeSet.timesetPosition();
                $nWishContainer.css('top', (($container.height() / 2) - Math.floor($nWishContainer.outerHeight() / 2)) + 'px');
            }
        });
        jQuery(window).resize();
    },
    goConfirmPage: function (msg, url) {
        app.modalLayerShow("layerConfirm", msg, "fn_goPage('" + url + "');");
    },
    initAppRun: function () {
        var params = app.getParam(window.location.href);
        if (jQuery.cookie('hanan_eventZone_activeYn') != "N" && app.viewPoint == "main") {
            modal.eventFlag = true;
        }
        if (params["appcd"] != null) {
            if (params["appcd"].indexOf("^") != -1) {
                params["appcd"] = params["appcd"].split("^")[0];
            }
            var options = app.getAppInfo(params["appcd"]);
            if (options == null) {
                app.modalLayerShow('layerAlert', '존재하지 않는 APP 입니다.');
                return;
            }
            if (options.appkind == "Ba" && options.appcd != "ScFin0003") {
                if (options.appblank == "1") {
                    window.open(options.appurl, "", "All=no  location=yes  directories=yes  resizable=yes  status=yes  toolbar=yes memubar=yes  All=yes");
                } else {
                    setTimeout(options.appurl.replace("javascript:", ""), 10);
                }
            } else if (options.appkind == "Fu") {
                location.href = options.appurl;
            } else if (params["appcd"].substring(0, 5) == "SePro") {
                modal.modalOpen("?appcd=" + params["appcd"] + "&tab=" + params["tab"]);
            } else {
                if (params["link"] == null) {
                    modal.modalOpen("?appcd=" + params["appcd"]);
                } else {
                    modal.modalOpen(params["link"].replace("%2F", "/") + "?appcd=" + params["appcd"]);
                }
            }
        } else if (params["appkind"] != null) {
            if (params["appkind"] == "Pr" && params["link"] != null) {
                modal.modalOpen(params["link"].replace("%2F", "/") + "?appkind=Pr");
            }
        } else {
            modal.eventFlag = false;
            if (jQuery.cookie('hanan_eventZone_activeYn') != "N" && app.viewPoint == "main") {
                hanaCommon.eventZoneToggle();
            }
        }
    },
	*/
    eventZoneToggle: function () {},
    cookieEventZoneActiveYn: function () {
	}
};
var main = {
	/*
    getAppList: function () {
        if (myAppCnt > 0) {
            return;
        }
        if (app.myAppList == null) {
            app.getMyAppList();
        }
        app.myAppList = fn_arrayUnique(app.myAppList, []);
        myAppItem = null;
        myAppItem = app.myAppList;
        myAppCnt = myAppItem.length;
        myAppPageTotalCnt = Math.ceil(myAppCnt / myAppPageEa);
        myAppReady = true;
        hanaCommon.setMyAppList();

	},
    getNewsList: function () {
        var url = hanaAppProperty.contextPath + "/Ca/CaNew/CaNew0001/news.xml";
        jQuery.ajax({
            type: "POST",
            url: url + "?getTime=" + (new Date()).getTime(),
            dataType: "xml",
            success: function (xml) {
                var newsDiv = "";
                if (jQuery(xml).find("root").find("info").length > 0) {
                    jQuery(xml).find("root").find("info").each(function () {
                        var cattitle = jQuery(this).find("cattitle").text();
                        var path = jQuery(this).find("path").text();
                        var date = jQuery(this).find("date").text();
                        newsDiv += '<li><a href="javascript:modal.modalOpen(\'' + path + '?appcd=CaNew\');">' + hanaCommon.common.cutString(cattitle, 16) + '<span class="date">' + date + '</span></a></li>';
                    });
                }
                jQuery('#hanaNews').html(newsDiv);
                newsDiv = null;
            },
            error: function (x, error) {
                app.fn_ajaxError(x, error);
                x = null;
                error = null;
            }
        });
    }
	*/
};
var app = {
    viewPoint: "stage",
    ajaxYn: false,
    categoryNum: null,
    fn_ajaxError: function (x, error) {
        if (x.status == "404") {
            alert("존재하지 않는 페이지 입니다.");
        } else if (x.status == "200") {} else {}
        x = null;
        error = null;
    },
    loadingImg: function () {
        hanaCommon.common.loading.loadingImgViewOff();
        jQuery('#viewLoading').ajaxStart(function () {
            hanaCommon.common.loading.loadingImgViewOn();
            if (loginChk == "true") {
                appTimer.startTimer();
            }
        }).ajaxStop(function () {
            hanaCommon.common.loading.loadingImgViewOffDelay();
        }).ajaxError(function () {
            hanaCommon.common.loading.loadingImgViewOffDelay();
        }).ajaxComplete(function () {
            hanaCommon.common.loading.loadingImgViewOffDelay();
        })
    },
    getParam: function (url) {
        var paramString = "param";
        var returns = new Array();
        var urlValue = url;
        if (urlValue.indexOf("?") > -1) {
            var getParam = urlValue.substr(urlValue.indexOf("?") + 1);
            var parsedValue = getParam.split("&");
            returns["url"] = urlValue.substring(0, urlValue.indexOf("?"));
            for (var i = 0; i < parsedValue.length; i++) {
                var aParam = parsedValue[i].split("=");
                var idx = aParam[0];
                returns[idx] = aParam[1];
            }
        }
        return returns;
    },
    modalSearchLayerShow: function (productArray, productKind) {
        if (productKind == "정기예금" || productKind == "정기적금") {
            interestRateYn = true;
        } else {
            interestRateYn = false;
        }
        if (productKind == "대출" || productKind == "보험" || productKind == "펀드") {
            var compareHtmlUrl = "";
            if (productKind == "대출") {
                compareHtmlUrl = "/nhana/Se/SePro/compare_loan.html";
            } else if (productKind == "보험") {
                compareHtmlUrl = "/nhana/Se/SePro/compare_insurance.html";
            } else if (productKind == "펀드") {
                compareHtmlUrl = "/nhana/Se/SePro/compare_fund.html";
            }
            jQuery.ajax({
                url: compareHtmlUrl,
                success: function (html) {
                    var objHtml = jQuery("body").append(html).css("visibility", "hidden");
                    bindCompareData(productArray);
                    objHtml.css("visibility", "visible");
                }
            });
        } else {
            var initDiv = '';
            var arrItemName = new Array("상품개요", "가입대상", "가입기간", "가입금액", "적립방법", "이자지급방법", "금리", "우대금리", "수수료우대", "절세혜택", "소득공제", "예금자보호", "가입/등록");
            var arrSize = arrItemName.length;
            var size = productArray.length;
            initDiv += '<div style="position:absolute; top:0; left:0; width:100%; height:100%; background:#000; opacity:0.01; filter: alpha(opacity = 1); z-index:9998;" id="rsmo"></div>';
            initDiv += '<table id="searchPopup" style="top: 15%; width:700px;" class="tc_table w700">';
            initDiv += '<tbody>';
            initDiv += '<tr>';
            initDiv += '<td class="ts_top_left"></td>';
            initDiv += '<td class="ts_top_middle"></td>';
            initDiv += '<td class="ts_top_right"></td>';
            initDiv += '</tr>';
            initDiv += '<tr>';
            initDiv += '<td class="ts_middle_left"></td>';
            initDiv += '<td class="ts_middle_middle">';
            initDiv += '<div class="mb10">';
            initDiv += '<div class="tbl_s_heading posR mb7">';
            initDiv += '<p><img alt="비교항목설정" src="/resource_app/images/common/app_stitle19_heading.gif"></p>';
            initDiv += '<div class="popup_close" onclick="app.modalSearchLayerClose();" >';
            initDiv += '<img height="25" width="20" style="position:absolute; top:-22px; right:-26px;" alt="닫기" src="/resource_app/images/app/popup_close.png" onclick="app.modalSearchLayerClose();">';
            initDiv += '</div>';
            initDiv += '</div>';
            initDiv += '<div class="mb10 f_left bradius">';
            initDiv += '<div class="privacy_top01">';
            initDiv += '<ul class="power_item">';
            initDiv += '<li><input type="checkbox" id="power_item1" value="power_item_contents1" checked="checked" onclick="app.modalSearchCheckEvent()" class="nb"><label for="power_item01"> 상품개요</label></li>';
            initDiv += '<li><input type="checkbox" id="power_item2" value="power_item_contents2" checked="checked" onclick="app.modalSearchCheckEvent()"class="nb"><label for="power_item02"> 가입대상</label></li>';
            initDiv += '<li><input type="checkbox" id="power_item3" value="power_item_contents3" checked="checked" onclick="app.modalSearchCheckEvent()"class="nb"><label for="power_item03"> 가입기간</label></li>';
            initDiv += '<li><input type="checkbox" id="power_item4" value="power_item_contents4" checked="checked" onclick="app.modalSearchCheckEvent()"class="nb"><label for="power_item04"> 가입금액</label></li>';
            initDiv += '<li><input type="checkbox" id="power_item5" value="power_item_contents5" onclick="app.modalSearchCheckEvent()"class="nb"><label for="power_item05"> 적립방법</label></li>';
            initDiv += '<li><input type="checkbox" id="power_item6" value="power_item_contents6" onclick="app.modalSearchCheckEvent()"class="nb"><label for="power_item06"> 이자지급방법</label></li>';
            if (interestRateYn == true) {
                initDiv += '<li><input type="checkbox" id="power_item7" value="power_item_contents7" checked="checked" onclick="app.modalSearchCheckEvent()"class="nb"><label for="power_item07"> 금리</label></li>';
            }
            initDiv += '<li><input type="checkbox" id="power_item8" value="power_item_contents8" checked="checked" onclick="app.modalSearchCheckEvent()"class="nb"><label for="power_item08"> 우대금리</label></li>';
            initDiv += '<li><input type="checkbox" id="power_item9" value="power_item_contents9" onclick="app.modalSearchCheckEvent()"class="nb"><label for="power_item09"> 수수료우대</label></li>';
            initDiv += '<li><input type="checkbox" id="power_item10" value="power_item_contents10" onclick="app.modalSearchCheckEvent()"class="nb"><label for="power_item10"> 절세혜택</label></li>';
            initDiv += '<li><input type="checkbox" id="power_item11" value="power_item_contents11" onclick="app.modalSearchCheckEvent()"class="nb"><label for="power_item11"> 소득공제</label></li>';
            initDiv += '<li><input type="checkbox" id="power_item12" value="power_item_contents12" onclick="app.modalSearchCheckEvent()"class="nb"><label for="power_item12"> 예금자 보호</label></li>';
            initDiv += '</ul>';
            initDiv += '</div>';
            initDiv += '</div>';
            initDiv += '<div class="btn_right mb30"><a href="javascript:app.modalSearchCheckClear();"><img src="/resource_app/images/common/button_checkout.gif" alt="선택해제"></a></div>';
            initDiv += '<table cellspacing="0" cellpadding="0" border="0" summary="Power상품 검색" class="dataTblType1 tcenter">';
            initDiv += '<caption>Power상품 검색</caption>';
            if (productArray == null || size == 0) {
                initDiv += '<colgroup>';
                initDiv += '<col width="100">';
                initDiv += '<col width="*">';
                initDiv += '</colgroup>';
                initDiv += '<thead>';
                initDiv += '<tr>';
                initDiv += '<th scope="row" class="pd5">상품명</th>';
                initDiv += '<th scope="col" class="b_right noBr"> </th>';
                initDiv += '</tr>';
                initDiv += '</thead>';
                initDiv += '<tbody>';
                var arrCnt = 0;
                for (var i = 0; i < arrSize; i++) {
                    if (interestRateYn != true && i == 6) {
                        return;
                    }
                    arrCnt = i + 1;
                    initDiv += '<tr id="power_item_contents' + arrCnt + '"';
                    if (i == 4 || i == 5 || i == 8 || i == 9 || i == 10 || i == 11) {
                        initDiv += ' style="display:none;">';
                    } else {
                        initDiv += ' >';
                    }
                    if (i == 6) {
                        if (interestRateYn == true) {
                            initDiv += '<td class="txt_red">';
                        }
                    } else if (i == 8 || i == 9 || i == 10 || i == 11) {
                        initDiv += '<td class="td_type02">';
                    } else {
                        initDiv += '<td>';
                    }
                    initDiv += arrItemName[i];
                    initDiv += '</td>';
                    if (i == 6) {
                        if (interestRateYn == true) {
                            initDiv += '<td class="b_right noBr txt_red">&nbsp;</td>';
                        }
                    } else if (i == 8 || i == 9 || i == 10 || i == 11) {
                        initDiv += '<td class="b_right noBr td_type02">&nbsp;</td>';
                    } else {
                        initDiv += '<td class="b_right noBr">&nbsp;</td>';
                    }
                }
                initDiv += '</tbody>';
            } else {
                initDiv += '<colgroup>';
                initDiv += '<col width="100">';
                for (var i = 0; i < size; i++) {
                    initDiv += '<col width="*">';
                }
                initDiv += '</colgroup>';
                initDiv += '<thead>';
                initDiv += '<tr>';
                initDiv += '<th scope="row" class="pd5">상품명</th>';
                for (var i = 0; i < size; i++) {
                    if (i == (size - 1)) {
                        initDiv += '<th scope="col" class="b_right noBr">';
                        if (productArray[i][0] != null && productArray[i][0] != "") {
                            initDiv += '<a href="' + productArray[i][14] + '">' + productArray[i][0] + '</a>';
                        } else {
                            initDiv += '&nbsp;';
                        }
                    } else {
                        initDiv += '<th scope="col">';
                        if (productArray[i][0] != null && productArray[i][0] != "") {
                            initDiv += '<a href="' + productArray[i][14] + '">' + productArray[i][0] + '</a>';
                        } else {
                            initDiv += '&nbsp;';
                        }
                    }
                }
                initDiv += '</tr>';
                initDiv += '</thead>';
                initDiv += '<tbody>';
                initDiv += '<tr id="power_item_contents1">';
                initDiv += '<td>상품개요</td>';
                var len, strValue;
                for (var i = 0; i < size; i++) {
                    if (i == (size - 1)) {
                        initDiv += '<td class="b_right noBr tleft">';
                        if (productArray[i][1] != null && productArray[i][1] != "") {
                            strValue = productArray[i][1];
                            len = strValue.length;
                            if (len > 48) {
                                productArray[i][1] = strValue.substring(0, 48);
                                productArray[i][1] += "...";
                            } else {
                                productArray[i][1] = strValue;
                            }
                            initDiv += productArray[i][1];
                        } else {
                            initDiv += '&nbsp;';
                        }
                        initDiv += '</td>';
                    } else {
                        initDiv += '<td class="tleft" >';
                        if (productArray[i][1] != null && productArray[i][1] != "") {
                            initDiv += productArray[i][1];
                        } else {
                            initDiv += '&nbsp;';
                        }
                        initDiv += '</td>';
                    }
                }
                initDiv += '</tr>';
                arrCnt = 0;
                for (var i = 1; i < arrSize - 1; i++) {
                    if (interestRateYn == false && i == 6) {
                        continue;
                    }
                    arrCnt = i + 1;
                    initDiv += '<tr id="power_item_contents' + arrCnt + '"';
                    if (i == 4 || i == 5 || i == 8 || i == 9 || i == 10 || i == 11) {
                        initDiv += ' style="display:none;">';
                    } else {
                        initDiv += ' >';
                    }
                    if (i == 6) {
                        if (interestRateYn == true) {
                            initDiv += '<td class="txt_red">';
                        }
                    } else if (i == 8 || i == 9 || i == 10 || i == 11) {
                        initDiv += '<td class="td_type02">';
                    } else {
                        initDiv += '<td>';
                    }
                    initDiv += arrItemName[i];
                    initDiv += '</td>';
                    for (var j = 0; j < size; j++) {
                        if (j == (size - 1)) {
                            if (i == 6) {
                                if (interestRateYn == true) {
                                    initDiv += '<td class="b_right noBr txt_red">';
                                }
                            } else if (i == 8 || i == 9 || i == 10 || i == 11) {
                                initDiv += '<td class="b_right noBr td_type02">';
                            } else {
                                initDiv += '<td class="b_right noBr">';
                            }
                            if (productArray[j][arrCnt] != null && productArray[j][arrCnt] != "") {
                                initDiv += productArray[j][arrCnt];
                            } else {
                                initDiv += '&nbsp;';
                            }
                            initDiv += '</td>';
                        } else {
                            if (i == 6) {
                                if (interestRateYn == true) {
                                    initDiv += '<td class="txt_red">';
                                }
                            } else if (i == 8 || i == 9 || i == 10 || i == 11) {
                                initDiv += '<td class="td_type02">';
                            } else {
                                initDiv += '<td>';
                            }
                            if (productArray[j][arrCnt] != null && productArray[j][arrCnt] != "") {
                                initDiv += productArray[j][arrCnt];
                            } else {
                                initDiv += '&nbsp;';
                            }
                            initDiv += '</td>';
                        }
                    }
                    initDiv += '</tr>';
                }
                initDiv += '<tr id="power_item_contents13">';
                initDiv += '<td>가입/등록</td>';
                for (var i = 0; i < size; i++) {
                    if (i == (size - 1)) {
                        initDiv += '<td class="b_right noBr">';
                        if (productArray[i][13] != null && productArray[i][13] != "") {
                            initDiv += '<a href="' + productArray[i][13] + '"><img src="/resource_app/images/common/button_joining.gif" alt="가입하기"></a>';
                        } else {
                            initDiv += '&nbsp;';
                        }
                        initDiv += '</td>';
                    } else {
                        initDiv += '<td>';
                        if (productArray[i][13] != null && productArray[i][13] != "") {
                            initDiv += '<a href="' + productArray[i][13] + '"><img src="/resource_app/images/common/button_joining.gif" alt="가입하기"></a>';
                        } else {
                            initDiv += '&nbsp;';
                        }
                        initDiv += '</td>';
                    }
                }
                initDiv += '</tr>';
                initDiv += '</tbody>';
            }
            initDiv += '</table>';
            initDiv += '</div>';
            initDiv += '</td>';
            initDiv += '<td class="ts_middle_right"></td>';
            initDiv += '</tr>';
            initDiv += '<tr>';
            initDiv += '<td class="ts_bottom_left"></td>';
            initDiv += '<td class="ts_bottom_middle"><img alt="#" src="/resource_app/images/app/copyright.png"></td>';
            initDiv += '<td class="ts_bottom_right"></td>';
            initDiv += '</tr>';
            initDiv += '</tbody>';
            initDiv += '</table>';
            jQuery("body").append(initDiv);
            initDiv = null;
        }
    },
    modalSearchLayerShow_fMall: function (productArray, productKind) {
		var popOpen_coor = parseInt(jQuery(window).scrollTop())+95;
        if (productKind == "정기예금" || productKind == "정기적금") {
            interestRateYn = true;
        } else {
            interestRateYn = false;
        }
        if (productKind == "대출" || productKind == "보험" || productKind == "펀드") {
            var compareHtmlUrl = "";
            if (productKind == "대출") {
                compareHtmlUrl = "/nhana/finmall/compare_loan_new.html";
            } else if (productKind == "보험") {
                compareHtmlUrl = "/nhana/finmall/compare_insurance_new.html";
            } else if (productKind == "펀드") {
                compareHtmlUrl = "/nhana/finmall/compare_fund_new.html";
            }
            jQuery.ajax({
                url: compareHtmlUrl,
                success: function (html) {
                    var objHtml = jQuery("body").append(html).css("visibility", "hidden");
                    bindCompareData(productArray);
                    objHtml.css("visibility", "visible");
                }
            });
        } else {
			var all_wrap = parseInt(jQuery("#bottom").css("height")) + parseInt(jQuery("#Finacs_Warp").css("height"));
            var initDiv = '';
            var arrItemName = new Array("상품개요", "가입대상", "가입기간", "가입금액", "적립방법", "이자지급방법", "금리", "우대금리", "수수료우대", "절세혜택", "소득공제", "예금자보호", "가입/등록");
            var arrSize = arrItemName.length;
            var size = productArray.length;
            initDiv += '<div style="position:absolute; top:0; left:0; width:100%; height:'+all_wrap+'; background:#000; opacity:0.01; filter: alpha(opacity = 1); z-index:9998;" id="rsmo"></div>';
            initDiv += '<div class="pop_ty01 w700" style="width: 700px; top:'+popOpen_coor+'px;"><h4>비교하기</h4><h5>비교항목설정</h5><p>비교항목을 선택하시면 해당 항목의 정보를 비교해 보실 수 있습니다.</p>';
            initDiv += '<div class="cont_box">';
            initDiv += '<ul class="power_item">';
			initDiv += '<li><input id="power_item1" class="nb" onclick="app.modalSearchCheckEvent_fMall()" value="power_item_contents1" checked disabled type="checkbox"><label for="power_item01"> 상품개요</label></li>';
			initDiv += '<li><input id="power_item2" class="nb" onclick="app.modalSearchCheckEvent_fMall()" value="power_item_contents2" checked disabled type="checkbox"><label for="power_item02"> 가입대상</label></li>';
			initDiv += '<li><input id="power_item3" class="nb" onclick="app.modalSearchCheckEvent_fMall()" value="power_item_contents3" checked disabled type="checkbox"><label for="power_item03"> 가입기간</label></li>';
			initDiv += '<li><input id="power_item4" class="nb" onclick="app.modalSearchCheckEvent_fMall()" value="power_item_contents4" checked disabled type="checkbox"><label for="power_item04"> 가입금액</label></li>';
			initDiv += '<li><input id="power_item5" class="nb" onclick="app.modalSearchCheckEvent_fMall()" value="power_item_contents5" type="checkbox"><label for="power_item05"> 적립방법</label></li>';
			initDiv += '<li><input id="power_item6" class="nb" onclick="app.modalSearchCheckEvent_fMall()" value="power_item_contents6" type="checkbox"><label for="power_item06"> 이자지급방법</label></li>';
			initDiv += '<li><input id="power_item8" class="nb" onclick="app.modalSearchCheckEvent_fMall()" value="power_item_contents8" checked disabled type="checkbox"><label for="power_item08"> 우대금리</label></li>';
			initDiv += '<li><input id="power_item9" class="nb" onclick="app.modalSearchCheckEvent_fMall()" value="power_item_contents9" type="checkbox"><label for="power_item09"> 수수료우대</label></li>';
			//2014.12.31 삭제 initDiv += '<li><input id="power_item10" class="nb" onclick="app.modalSearchCheckEvent_fMall()" value="power_item_contents10" type="checkbox"><label for="power_item10"> 절세혜택</label></li>';
			initDiv += '<li><input id="power_item11" class="nb" onclick="app.modalSearchCheckEvent_fMall()" value="power_item_contents11" type="checkbox"><label for="power_item11"> 소득공제</label></li>';
			initDiv += '<li><input id="power_item12" class="nb" onclick="app.modalSearchCheckEvent_fMall()" value="power_item_contents12" type="checkbox"><label for="power_item12"> 예금자 보호</label></li>';
			initDiv += '</ul>';
			initDiv += '</div>';
			initDiv += '<div class="cont_btn"><span class="f_btn other5"><a href="javascript:app.modalSearchCheckClear_fMall();">선택해제</a></span></div>';
			initDiv += '<div class="ftbl_div pop">';
			initDiv += '<table class="tbl_col01 pop" style="width:702px;" summary="Power상품 검색">';
			initDiv += '<caption>Power상품 검색</caption>';
            if (productArray == null || size == 0) {
                initDiv += '<colgroup>';
                initDiv += '<col width="100">';
                initDiv += '<col width="*">';
                initDiv += '</colgroup>';
                initDiv += '<thead>';
                initDiv += '<tr>';
                initDiv += '<th scope="row" class="b-tnone pd5">상품명</th>';
                initDiv += '<th scope="col" class="b-tnone b_right noBr"> </th>';
                initDiv += '</tr>';
                initDiv += '</thead>';
                initDiv += '<tbody>';
                var arrCnt = 0;
                for (var i = 0; i < arrSize; i++) {
                    if (interestRateYn != true && i == 6) {
                        return;
                    }
                    arrCnt = i + 1;
                    initDiv += '<tr id="power_item_contents' + arrCnt + '"';
                    if (i == 4 || i == 5 || i == 8 || i == 9 || i == 10 || i == 11) {
                        initDiv += ' style="display:none;">';
                    } else {
                        initDiv += ' >';
                    }
                    if (i == 6) {
                        if (interestRateYn == true) {
                            initDiv += '<td class="txt_red">';
                        }
                    } else if (i == 8 || i == 9 || i == 10 || i == 11) {
                        initDiv += '<td class="td_type02">';
                    } else {
                        initDiv += '<td>';
                    }
                    initDiv += arrItemName[i];
                    initDiv += '</td>';
                    if (i == 6) {
                        if (interestRateYn == true) {
                            initDiv += '<td class="b_right noBr txt_red">&nbsp;</td>';
                        }
                    } else if (i == 8 || i == 9 || i == 10 || i == 11) {
                        initDiv += '<td class="b_right noBr td_type02">&nbsp;</td>';
                    } else {
                        initDiv += '<td class="b_right noBr">&nbsp;</td>';
                    }
                }
                initDiv += '</tbody>';
            } else {
                initDiv += '<colgroup>';
                initDiv += '<col width="10%">';
				var popTd_w = "90%";
				if(size==2) popTd_w = "45%";
				if(size==3) popTd_w = "30%";
                for (var i = 0; i < size; i++) {
                    initDiv += '<col width="'+popTd_w+'">';
                }
                initDiv += '</colgroup>';
                initDiv += '<thead>';
                initDiv += '<tr>';
                initDiv += '<th class="b-tnone pd5" scope="row">상품명</th>';
                for (var i = 0; i < size; i++) {
                    if (i == (size - 1)) {
                        initDiv += '<th class="b-tnone pd5" scope="col" sizcache="72" sizset="283">';
                        if (productArray[i][0] != null && productArray[i][0] != "") {
                            initDiv += '<a href="' + productArray[i][14] + '">' + productArray[i][0] + '</a>';
                        } else {
                            initDiv += '&nbsp;';
                        }
                    } else {
                        initDiv += '<th class="b-tnone pd5" scope="col">';
                        if (productArray[i][0] != null && productArray[i][0] != "") {
                            initDiv += '<a href="' + productArray[i][14] + '">' + productArray[i][0] + '</a>';
                        } else {
                            initDiv += '&nbsp;';
                        }
                    }
                }
                initDiv += '</th></tr>';
                initDiv += '</thead>';
                initDiv += '<tbody>';
                initDiv += '<tr id="power_item_contents1">';
                initDiv += '<td>상품개요</td>';
                var len, strValue;
                for (var i = 0; i < size; i++) {
                    if (i == (size - 1)) {
                        initDiv += '<td class="b_right noBr tleft">';
                        if (productArray[i][1] != null && productArray[i][1] != "") {
                            strValue = productArray[i][1];
                            len = strValue.length;
                            if (len > 48) {
                                productArray[i][1] = strValue.substring(0, 48);
                                productArray[i][1] += "...";
                            } else {
                                productArray[i][1] = strValue;
                            }
                            initDiv += productArray[i][1];
                        } else {
                            initDiv += '&nbsp;';
                        }
                        initDiv += '</td>';
                    } else {
                        initDiv += '<td class="tleft" >';
                        if (productArray[i][1] != null && productArray[i][1] != "") {
                            initDiv += productArray[i][1];
                        } else {
                            initDiv += '&nbsp;';
                        }
                        initDiv += '</td>';
                    }
                }
                initDiv += '</tr>';
                arrCnt = 0;
                for (var i = 1; i < arrSize - 1; i++) {
                    if (interestRateYn == false && i == 6) {
                        continue;
                    }
                    arrCnt = i + 1;
                    initDiv += '<tr id="power_item_contents' + arrCnt + '"';
                    if (i == 4 || i == 5 || i == 8 || i == 9 || i == 10 || i == 11) {
                        initDiv += ' style="display:none;">';
                    } else {
                        initDiv += ' >';
                    }
                    if (i == 6) {
                        if (interestRateYn == true) {
                            initDiv += '<td class="txt_red">';
                        }
                    } else if (i == 8 || i == 9 || i == 10 || i == 11) {
                        initDiv += '<td class="td_type02">';
                    } else {
                        initDiv += '<td>';
                    }
                    initDiv += arrItemName[i];
                    initDiv += '</td>';
                    for (var j = 0; j < size; j++) {
                        if (j == (size - 1)) {
                            if (i == 6) {
                                if (interestRateYn == true) {
                                    initDiv += '<td class="b_right noBr txt_red">';
                                }
                            } else if (i == 8 || i == 9 || i == 10 || i == 11) {
                                initDiv += '<td class="b_right noBr td_type02">';
                            } else {
                                initDiv += '<td class="b_right noBr">';
                            }
                            if (productArray[j][arrCnt] != null && productArray[j][arrCnt] != "") {
                                initDiv += productArray[j][arrCnt];
                            } else {
                                initDiv += '&nbsp;';
                            }
                            initDiv += '</td>';
                        } else {
                            if (i == 6) {
                                if (interestRateYn == true) {
                                    initDiv += '<td class="txt_red">';
                                }
                            } else if (i == 8 || i == 9 || i == 10 || i == 11) {
                                initDiv += '<td class="td_type02">';
                            } else {
                                initDiv += '<td>';
                            }
                            if (productArray[j][arrCnt] != null && productArray[j][arrCnt] != "") {
                                initDiv += productArray[j][arrCnt];
                            } else {
                                initDiv += '&nbsp;';
                            }
                            initDiv += '</td>';
                        }
                    }
                    initDiv += '</tr>';
                }
                initDiv += '<tr id="power_item_contents13">';
                initDiv += '<td>가입/등록</td>';
                for (var i = 0; i < size; i++) {
                    if (i == (size - 1)) {
                        initDiv += '<td class="b_right noBr">';
                        if (productArray[i][13] != null && productArray[i][13] != "") {
                            initDiv += '<span class="f_btn other3"><a href="' + productArray[i][13] + '">가입하기</a></span>';
                        } else {
                            initDiv += '&nbsp;';
                        }
                        initDiv += '</td>';
                    } else {
                        initDiv += '<td>';
                        if (productArray[i][13] != null && productArray[i][13] != "") {
                            initDiv += '<span class="f_btn other3"><a href="' + productArray[i][13] + '">가입하기</a></span>';
                        } else {
                            initDiv += '&nbsp;';
                        }
                        initDiv += '</td>';
                    }
                }
                initDiv += '</tr>';
                initDiv += '</tbody>';
            }
            initDiv += '</table>';
            initDiv += '</div>';
            initDiv += '<div class="pop_footer">';
			initDiv += '<p>COPYRIGHT(C) 2013 HANABANK. ALL RIGHTS RESERVED.</p>';
			initDiv += '</div>';
			initDiv += '<div class="pop_close"><a href="javascript:fn_compPopClose()"><img src="/resource_app/images/common/btn_popclose.gif" alt="팝업 닫기" /></a></div>';
			initDiv += '</div>';
            jQuery("body").append(initDiv);
            initDiv = null;
        }
    },
    modalLayerShow: function (mode, content, param1, param2) {
        var w = 0;
        var h = 0;
        var initDiv = "";
        var $selectBox = null;
        if (mode == "login") {
            initDiv = '<div id="layer_wrap"><!--[if IE 6]><iframe id="layer_iframe" frameborder="0"></iframe><![endif]--><div id="layer_overlay"></div></div>';
            jQuery("#wrap").append(initDiv);
            $selectBox = jQuery("#loginBox");
        } else if (mode == "quickService") {
            initDiv = '<div id="layer_wrap"><!--[if IE 6]><iframe id="layer_iframe" frameborder="0"></iframe><![endif]--><div id="layer_overlay"></div></div>';
            jQuery("#wrap").append(initDiv);
            $selectBox = jQuery("#quickService");
        } else if (mode == "backgroundSite") {
            initDiv = '<div id="layer_wrap"><!--[if IE 6]><iframe id="layer_iframe" frameborder="0"></iframe><![endif]--><div id="layer_overlay"></div></div>';
            jQuery("#wrap").append(initDiv);
            $selectBox = jQuery("#backgroundSite");
            if (jQuery(".BSWarp").children().length < 1) {
                var initHtml = "";
                jQuery.ajax({
                    type: "POST",
                    url: "/nhana/com/SiteAllV2.jsp",
                    dataType: "html",
                    success: function (html) {
                        initHtml = html;
                        jQuery(".BSWarp").append(initHtml);
                    },
                    error: function (x, error) {}
                });
            }
        } else if (mode == "layerConfirm") {
            initDiv = '<div id="alert_layer_wrap"><!--[if IE 6]><iframe id="alert_layer_iframe" frameborder="0"></iframe><![endif]--><div id="alert_layer_overlay"></div></div>';
            initDiv += '<div id="alert_layer_window" class="alert_box05_wrap layerComp">';
            initDiv += '<span class="box_close"><a href="javascript:app.alertModalLayerClose();"><img src="/resource_app/images/common/layer_pop/comp_close.gif" alt="닫기"></a></span>';
            initDiv += '<p class="layerComment">' + content + '</p>';
            initDiv += '<div class="Compum">';	
			initDiv += '<span class="fan_btn btst_1" style="width:70px;"><a href="javascript:fn_goPage(\'' + param1 + '\')">예</a></span>';
            initDiv += '<span class="fan_btn btst_1" style="width:70px;"><a href="javascript:app.alertModalLayerClose();">아니오</a></span>';
            initDiv += '</div>';
            initDiv += '</div>';
            jQuery("body").append(initDiv);
            $selectBox = jQuery("#alert_layer_window");
        } else if (mode == "layerConfirm1") {
            initDiv = '<div id="alert_layer_wrap"><!--[if IE 6]><iframe id="alert_layer_iframe" frameborder="0"></iframe><![endif]--><div id="alert_layer_overlay"></div></div>';
            initDiv += '<div id="alert_layer_window" class="alert_box05_wrap layerComp">';
            initDiv += '<span class="box_close"><a href="javascript:app.alertModalLayerClose();"><img src="/resource_app/images/common/layer_pop/comp_close.gif" alt="닫기"></a></span>';
            initDiv += '<p class="layerComment">' + content + '</p>';
            initDiv += '<div class="Compum">';			
            initDiv += '<span class="fan_btn btst_1" style="width:70px;"><a href="javascript:app.alertModalLayerClose();' + param1 + '">예</a></span>';
            initDiv += '<span class="fan_btn btst_1" style="width:70px;"><a href="javascript:app.alertModalLayerClose();">아니오</a></span>';
            initDiv += '</div>';
            initDiv += '</div>';
            jQuery("#wrap").append(initDiv);
            $selectBox = jQuery("#alert_layer_window");
        } else if (mode == "layerConfirm2") {
            initDiv = '<div id="alert_layer_wrap"><!--[if IE 6]><iframe id="alert_layer_iframe" frameborder="0"></iframe><![endif]--><div id="alert_layer_overlay"></div></div>';
            initDiv += '<div id="alert_layer_window" class="alert_box05_wrap layerComp">';
            initDiv += '<span class="box_close"><a href="javascript:app.alertModalLayerClose();"><img src="/resource_app/images/common/layer_pop/comp_close.gif" alt="닫기"></a></span>';
            initDiv += '<p class="layerComment">' + content + '</p>';
            initDiv += '<div class="Compum">';	
			initDiv += '<span class="fan_btn btst_1" style="width:70px;"><a href="javascript:fn_goPage(\'' + param1 + '\')">예</a></span>';
            initDiv += '<span class="fan_btn btst_1" style="width:70px;"><a href="javascript:fn_goPage(\'' + param2 + '\')">아니오</a></span>';
            initDiv += '</div>';
            initDiv += '</div>';
            jQuery("body").append(initDiv);
            $selectBox = jQuery("#alert_layer_window");
        } else if (mode == "layerAlert") {
            initDiv = '<div id="alert_layer_wrap"><!--[if IE 6]><iframe id="alert_layer_iframe" frameborder="0"></iframe><![endif]--><div id="alert_layer_overlay"></div></div>';
            initDiv += '<div id="alert_layer_window" class="alert_box05_wrap layerComp">';
            initDiv += '<span class="box_close"><a href="javascript:app.alertModalLayerClose();"><img src="/resource_app/images/common/layer_pop/comp_close.gif" alt="닫기"></a></span>';
            initDiv += '<p class="layerComment">' + content + '</p>';
            initDiv += '<div class="Compum">';			
            initDiv += '<span class="fan_btn btst_1" style="width:70px;"><a href="javascript:app.alertModalLayerClose()">확인</a></span>';
            initDiv += '</div>';
            initDiv += '</div>';
            jQuery("body").append(initDiv);
            $selectBox = jQuery("#alert_layer_window");
        } else {
            initDiv = '<div id="layer_wrap"><!--[if IE 6]><iframe id="layer_iframe" frameborder="0"></iframe><![endif]--><div id="layer_overlay"></div></div>';
            jQuery("#wrap").append(initDiv);
            $selectBox = jQuery("#" + mode);
            jQuery("body").append($selectBox);
        }
        $selectBox.show().css('margin', '0px 0px 0px 0px').css('top', ((jQuery(window).height() / 2) + jQuery(document).scrollTop() - Math.floor($selectBox.outerHeight() / 2)) + 'px').css('left', ((jQuery(window).width() / 2) - Math.floor($selectBox.outerWidth() / 2)) + 'px');
        initDiv = null;
        if ($IE6) {
            hanaCommon.common.ieResizeLayer("#layer_wrap");
            hanaCommon.common.ieResizeLayer("#alert_layer_wrap");
            hanaCommon.common.ieScrollLayer("#layer_wrap");
            hanaCommon.common.ieScrollLayer("#alert_layer_wrap");
        }
    },
    modalLayerClose: function (mode) {
        jQuery("#layer_wrap").remove();
        if (mode == "quickService") {
            jQuery("#quickService").hide();
        } else if (mode == "loginBox") {
            jQuery("#loginBox").css("visibility", "hidden");
        } else if (mode == "backgroundSite") {
            jQuery("#backgroundSite").hide();
        } else {
            jQuery("body").append(jQuery("#" + mode));
            jQuery("#" + mode).hide();
        }
    },

    //하나카툰->파워검색펀드이동 임시 추가 12.03.09
    modalLayerOpen_fund: function (skword) {
        modal.modalClose();
        modal.modalClose('Se');
        setTimeout("modal.modalOpen('/n/Se/SePro/power_search_fund.jsp?appcd=SePro&appkind=Se&tab=fund&Ctype=B&cid=new_site_FProduct&oid=bt_Fund&skword=" + skword + "');", 1000);
    },

    alertModalLayerClose: function (mode) {
        jQuery("#alert_layer_wrap").remove();
        jQuery("#alert_layer_window").remove();
    },
    alertMangoModalLayerClose: function () {
        app.alertModalLayerClose();
        fn_viewLogin("ScInf0001");
    },
    modalSearchLayerClose: function () {
        jQuery("#searchPopup,#rsmo").remove();
    },
    modalSearchCheckEvent: function () {
        var itemTRId, selector1, selector2;
        var size = jQuery(".power_item input:checkbox").length;
        itemTRId = "power_item_contents";
        for (var i = 1; i <= size; i++) {
            selector1 = "#" + itemTRId + i;
            jQuery(selector1).hide();
        }
        for (var i = 0; i < size; i++) {
            if (jQuery(".power_item input:checkbox")[i].checked == true) {
                itemTRId = jQuery(".power_item input:checkbox")[i].value;
                selector2 = "#" + itemTRId;
                jQuery(selector2).show();
            }
        }
    },
	modalSearchCheckEvent_fMall: function () {
		jQuery(".power_item input:checkbox").each(function(i){
			jQuery("#"+jQuery(this).val()).hide();
			if(jQuery(this).attr("checked")) jQuery("#"+jQuery(this).val()).show();
		});
    },
    modalSearchCheckClear: function () {
        var itemTRId, selector;
        var size = jQuery(".power_item input:checkbox").length;
        itemTRId = "power_item_contents";
        for (var i = 1; i <= size; i++) {
            selector = "#" + itemTRId + i;
            jQuery(selector).hide();
        }
        for (var i = 0; i < size; i++) {
            jQuery(".power_item input:checkbox")[i].checked = false;
        }
        jQuery(".power_item input:checkbox")[0].checked = true;
        jQuery(".power_item input:checkbox")[1].checked = true;
        jQuery(".power_item input:checkbox")[2].checked = true;
        jQuery(".power_item input:checkbox")[3].checked = true;
        jQuery(".power_item input:checkbox")[6].checked = true;
        jQuery(".power_item input:checkbox")[7].checked = true;
        jQuery("#power_item_contents1").show();
        jQuery("#power_item_contents2").show();
        jQuery("#power_item_contents3").show();
        jQuery("#power_item_contents4").show();
        jQuery("#power_item_contents7").show();
        jQuery("#power_item_contents8").show();
    },
	modalSearchCheckClear_fMall: function () {
		jQuery(".power_item input:checkbox").each(function(i){
			jQuery("#"+jQuery(this).val()).hide();
			if(jQuery(this).attr("disabled")) jQuery("#"+jQuery(this).val()).show();
			else jQuery(this).attr("checked", false);
		});
    },
    myAppList: null,
    getMyAppList: function (mode, params) {
        app.myAppList = new Array();
        try {
            if (loginChk == "false") {
                return;
            }
        } catch (e) {
            return;
        }
        var url = hanaAppProperty.actionUrl.getMyAppList;
        jQuery.ajax({
            type: "POST",
            url: url + "?getTime=" + (new Date()).getTime(),
            data: params,
            dataType: "xml",
            async: false,
            success: function (xml) {
                var k = 0;
                var rtnmsg = jQuery(xml).find("rtnmsg").text();
                var rtncode = jQuery(xml).find("rtncode").text();
                if (jQuery(xml).find("root").find("appInfo").length > 0) {
                    jQuery(xml).find("root").find("appInfo").each(function () {
                        var appcd = jQuery(this).find("appcd").text();
                        var url = "";
                        if (appcd.substring(0, 2) == "Sc" || appcd.substring(0, 2) == "Ca" || appcd.substring(0, 2) == "Se") {
                            var tempObj = app.getAppInfo(appcd, "Y");
                            if (tempObj != null) {
                                app.myAppList[k++] = tempObj;
                            }
                        }
                    });
                }
            },
            error: function (x, error) {
                if (x.status == "201") {} else {
                    app.fn_ajaxError(x, error);
                }
                x = null;
                error = null;
            }
        });
    },
    specialMyAppList: null,
    getSpecialMyAppList: function () {
        app.specialMyAppList = new Array();
        var url = hanaAppProperty.actionUrl.getSpecialMyAppList;
        jQuery.ajax({
            type: "POST",
            url: url + "?getTime=" + (new Date()).getTime(),
            dataType: "xml",
            async: false,
            success: function (xml) {
                var k = 0;
                if (jQuery(xml).find("root").find("appInfo").length > 0) {
                    jQuery(xml).find("root").find("appInfo").each(function () {
                        var xmlObj = jQuery(this);
                        var appcode = xmlObj.find("appcode").text();
                        var url = "";
                        options = {
                            appcd: xmlObj.find("appcode").text(),
                            appkind: xmlObj.find("appkind").text(),
                            appecrm: xmlObj.find("appecrm").text(),
                            appname: xmlObj.find("appname").text(),
                            appicon: xmlObj.find("appicon").text(),
                            myappicon: xmlObj.find("myappicon").text(),
                            appblank: xmlObj.find("appblank").text(),
                            appurl: xmlObj.find("appurl").text(),
                            apptag: xmlObj.find("apptag").text(),
                            agaptitle: xmlObj.find("agaptitle").text(),
                            urlfilepath: xmlObj.find("urlfilepath").text(),
                            snstitle: xmlObj.find("snstitle").text(),
                            snsimage: xmlObj.find("snsimage").text(),
                            relation_app: xmlObj.find("relation_app").text(),
                            myAppYn: "N"
                        };
                        app.specialMyAppList[k++] = options;
                    });
                }
            },
            error: function (x, error) {
                app.fn_ajaxError(x, error);
                x = null;
                error = null;
            }
        });
    },
    getAppInfo: function (appcd, mode) {
		/*
        var url = "";
        var appkind = appcd.substring(0, 2);
        if (appkind == "Sc") {
            url = hanaAppProperty.contextPath + "/" + appcd.substring(0, 2) + "/" + appcd.substring(0, 5) + "/" + appcd + "/list.xml";
        } else if (appkind == "Ca") {
            var appCategory = appcd.substring(0, 5);
            if (appCategory == "CaNew" || appCategory == "CaEve") {
                url = hanaAppProperty.contextPath + "/" + appcd.substring(0, 2) + "/" + appcd.substring(0, 5) + "/list.xml";
            } else {
                url = hanaAppProperty.contextPath + "/" + appcd.substring(0, 2) + "/" + appcd.substring(0, 5) + "/" + appcd.substring(0, 9) + "/list.xml";
            }
        } else if (appkind == "Se") {
            url = hanaAppProperty.contextPath + "/" + appcd.substring(0, 2) + "/" + appcd.substring(0, 5) + "/list.xml";
        } else if (appkind == "Pr") {
            url = hanaAppProperty.contextPath + "/" + appcd.substring(0, 2) + "/" + appcd.substring(0, 5) + "/" + appcd.substring(0, 9) + "/list.xml";
        }
        if (url == "") {
            return null;
        }
        var options = {};
        jQuery.ajax({
            type: "POST",
            url: url + "?getTime=" + (new Date()).getTime(),
            dataType: "xml",
            async: false,
            success: function (xml) {
                var xmlObj = jQuery(xml).find("root").find("info");
                options = {
                    appcd: xmlObj.find("appcode").text(),
                    appkind: xmlObj.find("appkind").text(),
                    appecrm: xmlObj.find("appecrm").text(),
                    appname: xmlObj.find("appname").text(),
                    appicon: xmlObj.find("appicon").text(),
                    myappicon: xmlObj.find("myappicon").text(),
                    appblank: xmlObj.find("appblank").text(),
                    appurl: xmlObj.find("appurl").text(),
                    apptag: xmlObj.find("apptag").text(),
                    agaptitle: xmlObj.find("agaptitle").text(),
                    urlfilepath: xmlObj.find("urlfilepath").text(),
                    snstitle: xmlObj.find("snstitle").text(),
                    snsimage: xmlObj.find("snsimage").text(),
                    relation_app: xmlObj.find("relation_app").text(),
                    myAppYn: mode
                };
            },
            error: function (x, error) {
                if (x.status == "404") {
                    options = null;
                } else {
                    alert(' 시스템관리자에게 문의하세요!. ');
                }
            }
        })
        return options;
		*/
    },
    getCastMenu: function (appcd, fundstyle, tag) {
		/*
        var appCategory = appcd.substring(0, 5);
        var url = "";
        if (appCategory == "CaNew" || appCategory == "CaEve") {
            url = hanaAppProperty.contextPath + "/" + appcd.substring(0, 2) + "/" + appcd.substring(0, 5) + "/menu_admin.xml";
        } else {
            url = hanaAppProperty.contextPath + "/" + appcd.substring(0, 2) + "/" + appcd.substring(0, 5) + "/" + appcd.substring(0, 9) + "/menu_admin.xml";
        }
        fundstyle = fundstyle == null ? "N" : fundstyle;
        var getNum = 0;
        if (jQuery('#last_modal_container').length > 0) {
            getNum = 1;
        }
        jQuery.ajax({
            type: "POST",
            url: url + "?_temp=" + (new Date()).getTime(),
            dataType: "xml",
            success: function (xml) {
                if (jQuery(xml).find("root").find("topinfo").length > 0) {
                    var k = 0;
                    var pointLi = 0;
                    var div = "";
                    var parentyn = "";
                    var appcode = "";
                    var title = "";
                    var linkurl = "";
                    var targetmode = "";
                    var on_li = "";
                    jQuery(xml).find("root").find("topinfo").each(function (index) {
                        parentyn = jQuery(this).find("parentyn").text();
                        appcode = jQuery(this).find("pappcode").text();
                        title = jQuery(this).find("ptitle").text();
                        linkurl = jQuery(this).find("plinkurl").text();
                        targetmode = jQuery(this).find("ptargetmode").text();
                        if (appcd == appcode) {
                            pointLi = k;
                        }
                        div += '<ul class="r_menu01 ' + (getNum == 0 ? "app_lnb_r_menu_0" : "app_lnb_r_menu_1") + ' ">';
                        div += '<li class="menu_off">';
                        var app_lnb_menuTitle = (getNum == 0 ? "app_lnb_menuTitle_0" : "app_lnb_menuTitle_1");
                        if (parentyn == "Y") {
                            div += '<h3 class="r_menu_head"><a href="#" class="menuTitle ' + app_lnb_menuTitle + ' " >' + title + '</a></h3>';
                        } else {
                            if (targetmode == "Y") {
                                div += '<h3 class="r_menu_head"><a href="' + linkurl + '" target="_blank" class="' + app_lnb_menuTitle + '" >' + title + '</a></h3>';
                            } else if (linkurl.indexOf("javascript") != -1) {
                                div += '<h3 class="r_menu_head"><a href="' + linkurl + '" class="' + app_lnb_menuTitle + '" >' + title + '</a></h3>';
                            } else {
                                div += '<h3 class="r_menu_head"><a href="javascript:jQuery(hanaAppProperty.appWindow).changeCastContent(\'' + linkurl + '\' , \'\' , \'\' , \'' + fundstyle + '\')" class="' + app_lnb_menuTitle + '" >' + title + '</a></h3>';
                            }
                        }
                        if (parentyn == "Y") {
                            div += '<ul>';
                            if (jQuery(this).find("childinfo").length > 0) {
                                jQuery(this).find("childinfo").each(function (cIndex) {
                                    fn_log("ctitle = " + jQuery(this).find("title").text());
                                    on_li = "";
                                    if (jQuery(this).find("appcode").text() == appcd) {
                                        pointLi = k;
                                        on_li = ' class="on_li" ';
                                    } else if (cIndex == 0 && index == 0 && appcd.length == 9) {
                                        on_li = ' class="on_li" ';
                                    }
                                    if (jQuery(this).find("targetmode").text() == "Y") {
                                        div += '<li><a href="' + jQuery(this).find("linkurl").text() + '" target="_blank" ' + on_li + ' >' + jQuery(this).find("title").text() + '</a></li>';
                                    } else if (jQuery(this).find("linkurl").text().indexOf("javascript") != -1) {
                                        div += '<li><a href="' + jQuery(this).find("linkurl").text() + '" ' + on_li + ' >' + jQuery(this).find("title").text() + '</a></li>';
                                    } else {
                                        div += '<li><a href="javascript:jQuery(hanaAppProperty.appWindow).changeCastContent(\'' + jQuery(this).find("linkurl").text() + '\' , \'\' , \'\' , \'' + fundstyle + '\')" ' + on_li + ' >' + jQuery(this).find("title").text() + '</a></li>';
                                    }
                                });
                            }
                            div += '</ul>';
                        }
                        div += '</li>';
                        div += '</ul>';
                        k++;
                    });
                    var $app_lnb = null;
                    if (jQuery('div.app_lnb').length > 1) {
                        fn_log("tab2");
                        $app_lnb = jQuery(jQuery('div.app_lnb').get(1));
                    } else {
                        fn_log("tab1");
                        $app_lnb = jQuery('div.app_lnb');
                    }
                    purge($app_lnb);
                    $app_lnb.html(div);
                    jQuery(".app_lnb_r_menu_" + getNum + " > li > ul").hide();
                    jQuery(".app_lnb_r_menu_" + getNum).eq(pointLi).find("> li > ul ").show();
                    if (jQuery(".app_lnb_r_menu_" + getNum).eq(pointLi).find("> li > h3 ").height() > 19) {
                        jQuery(".app_lnb_r_menu_" + getNum).eq(pointLi).find("> li").removeClass().addClass("menu_on2");
                    } else {
                        jQuery(".app_lnb_r_menu_" + getNum).eq(pointLi).find("> li").removeClass().addClass("menu_on");
                    }
                    jQuery('.app_lnb_r_menu_' + getNum).find("li").click(function (event) {
                        jQuery('.app_lnb_r_menu_' + getNum).find("li > a").removeClass("on_li");
                        jQuery(this).find("> a").addClass("on_li");
                        event.stopPropagation();
                        event.stopImmediatePropagation();
                    });
                    jQuery(".app_lnb_menuTitle_" + getNum).click(function (event) {
                        jQuery(".app_lnb_r_menu_" + getNum + " > li > ul").hide();
                        jQuery(this).parent().parent().find("ul").show();
                        if (jQuery(this).parent().parent().find("ul").length == 0) {
                            jQuery('.app_lnb_r_menu_' + getNum).find("li > a").removeClass("on_li");
                        }
                        jQuery(".app_lnb_r_menu_" + getNum + " > li").removeClass().addClass("menu_off");
                        if (jQuery(this).height() > 19) {
                            jQuery(this).parent().parent().removeClass("menu_off").addClass("menu_on2");
                        } else {
                            jQuery(this).parent().parent().removeClass("menu_off").addClass("menu_on");
                        }
                        event.stopPropagation();
                        event.stopImmediatePropagation();
                    });
                    div = null;
                }
            },
            error: function (x, error) {
                alert(x.status + ' 시스템관리자에게 문의하세요. ' + error.message);
            }
        });
        if (tag != null && tag != "") {
            jQuery.ajax({
                type: "POST",
                url: hanaAppProperty.contextPath + "/Se/SeAll/search_relate_app.jsp?_temp=" + (new Date()).getTime(),
                data: "ap_code=" + tag.split(",").join("|"),
                dataType: "xml",
                success: function (xml) {
                    var div = "";
                    var $appLnb = jQuery('div.app_lnb').length > 1 ? jQuery(jQuery('div.app_lnb').get(1)) : jQuery('div.app_lnb');
                    if (jQuery(xml).find("root").find("dataset").find("data").length > 0) {
                        var i = 0;
                        div += "<div class=\"relation_app\"><h3>연관 Application</h3><ul>";
                        jQuery(xml).find("root").find("dataset").find("data").each(function (idx) {
                            if (jQuery(this).find("ap_code").text() == appcd.substring(0, 9)) {
                                return true;
                            }
                            if (i > 2) {
                                return false;
                            }
                            var ap_blank = jQuery(this).find("ap_blank").text() == "F" ? "_self" : "_blank";
                            var ap_type = jQuery(this).find("ap_type").text();
                            if (ap_type == "바로가기") {
                                div += "<li><a href=\"" + jQuery(this).find("ap_url").text() + "\" target=\"" + ap_blank + "\" >" + jQuery(this).find("TITLE").text() + "</a></li>";
                            } else if (ap_type == "전체화면") {
                                div += "<li><a href=\"javascript:hanaCommon.fullScreenAppChange('" + jQuery(this).find("ap_url").text() + "','','Y',false);\">" + jQuery(this).find("TITLE").text() + "</a></li>";
                            } else {
                                if (jQuery('#last_modal_wrapper').length > 0 || jQuery(this).find("ap_code").text().substring(0, 2) == "Se") {
                                    div += "<li><a href=\"javascript:modal.modalAllClose('?appcd=" + jQuery(this).find("ap_code").text() + "',null,null,null);\">" + jQuery(this).find("TITLE").text() + "</a></li>";
                                } else {
                                    div += "<li><a href=\"javascript:modal.modalOpen('?appcd=" + jQuery(this).find("ap_code").text() + "',null,null,null);\">" + jQuery(this).find("TITLE").text() + "</a></li>";
                                }
                            }
                            i++;
                        });
                        div += "</ul></div>";
                        if (i > 0) {
                            $appLnb.append(div);
                        }
                    }
                    div = null;
                    $appLnb = null;
                },
                error: function (x, error) {
                    fn_log(x.status + ' 시스템관리자에게 문의하세요. ' + error.message);
                }
            });
        }
		*/
    },
    shareTwitter: function (title, url) {
        var twitterTitle, preText, postText, hashTag;
        preText = "[Hana N Store]";
        hashTag = "#hanabank";
        postText = " 그 외 재미있고 알찬 app이 가득~ 지금 방문해보시겠어요?";
        twitterTitle = preText;
        twitterTitle += title;
        twitterTitle += postText;
        twitterTitle += hashTag;
        var Z = 550,
            h = 450;
        var c = screen.height;
        var b = screen.width;
        var a = Math.round((b / 2) - (Z / 2));
        var g = 0;
        if (c > h) {
            g = Math.round((c / 2) - (h / 2));
        }
        var twitUrl = 'http://twitter.com/share?text=' + encodeURIComponent(twitterTitle) + '&url=' + encodeURIComponent(url);
        var d = window.open(twitUrl, "twitter_tweet", "left=" + a + ",top=" + g + ",width=" + Z + ",height=" + h + ",personalbar=no,toolbar=no,scrollbars=yes,location=yes,resizable=yes");
        if (d) {
            d.focus();
        }
    },
    shareFacebook: function (facebookTitle, title, url, image_src) {
        var facebookSummary, preText, postText;
        preText = "[Hana N Store]";
        postText = " 그 외 재미있고 알찬 app이 가득~ 지금 방문해보시겠어요?";
        facebookSummary = preText;
        facebookSummary += title;
        facebookSummary += postText;
        var sUrl = "http://www.facebook.com/sharer.php";
        var Z = 550,
            h = 450;
        var c = screen.height;
        var b = screen.width;
        var a = Math.round((b / 2) - (Z / 2));
        var g = 0;
        if (c > h) {
            g = Math.round((c / 2) - (h / 2));
        }
        sUrl += "?s=100";
        sUrl += "&p[title]=" + encodeURIComponent(facebookTitle);
        sUrl += "&p[summary]=" + encodeURIComponent(facebookSummary);
        sUrl += "&p[url]=" + encodeURIComponent(url);
        sUrl += "&p[images][0]=" + encodeURIComponent(image_src);
        var d = window.open(sUrl, "facebook_share", "left=" + a + ",top=" + g + ",width=" + Z + ",height=" + h + ",personalbar=no,toolbar=no,scrollbars=yes,location=yes,resizable=yes");
        if (d) {
            d.focus();
        }
    },
    shareMetoday: function (title, hashTag, url) {
    },
    shareTwitterPreText: function (preText, title, url) {
        var twitterTitle, preText, postText, hashTag;
        hashTag = "##HanaNstore";
        postText = " 그 외 재미있고 알찬 app이 가득~ 지금 방문해보시겠어요?";
        twitterTitle = preText;
        twitterTitle += title;
        twitterTitle += postText;
        twitterTitle += hashTag;
        var Z = 550,
            h = 450;
        var c = screen.height;
        var b = screen.width;
        var a = Math.round((b / 2) - (Z / 2));
        var g = 0;
        if (c > h) {
            g = Math.round((c / 2) - (h / 2));
        }
        var twitUrl = 'http://twitter.com/share?text=' + encodeURIComponent(twitterTitle) + '&url=' + encodeURIComponent(url);
        var d = window.open(twitUrl, "twitter_tweet", "left=" + a + ",top=" + g + ",width=" + Z + ",height=" + h + ",personalbar=no,toolbar=no,scrollbars=yes,location=yes,resizable=yes");
        if (d) {
            d.focus();
        }
    },
    shareMetodayPreText: function (preText, title, hashTag, url) {
    },
	
    getCategoryName: function (appcode) {
        var rtnStr = "",
            category = "",
            appkind = "";
        try {
            if (fn_isTrim(appcode) != null && fn_isTrim(appcode) != "") {
                var iLen = appcode.length;
                if (iLen >= 5) {
                    category = appcode.substring(2, 5);
                    appkind = appcode.substring(0, 2);
                    if ("Sc" == appkind) {
                        if (category == "Fin") rtnStr = "금융서비스";
                        else if (category == "Inf") rtnStr = "추천상품";
                        else if (category == "Lif") rtnStr = "정보마당";
                        else if (category == "Hel") rtnStr = "안내 DESK";
                        else if (category == "Eve") rtnStr = "이벤트";
                        else if (category == "Fun") rtnStr = "재미로 해..";
                        else if (category == "Ban") rtnStr = "뱅킹거래";
                    } else if ("Ca" == appkind) {
                        rtnStr = "금융정보";
                    } else if ("Se" == appkind) {
                        rtnStr = "검색";
                    } else if ("Pr" == appkind) {
                        rtnStr = "펀드";
                    }
                }
            }
            category = null;
            appkind = null;
            return rtnStr;
        } finally {
            rtnStr = null;
        }
    }
};
var appCookie = {
    fn_productWindowChange: function (appname, appurl) {
        jQuery(hanaAppProperty.productWindow).changeCastContent(options.appurl, '', function () {
            if (jQuery(".aside").length > 0) {
                fn_financeGraph();
                appCookie.fn_todayView(appname, appurl);
                appCookie.fn_toDayProductCookie();
            }
        });
    },
    fn_toDayProductCookie: function () {
        var sHtml = "";
        var today_view1 = jQuery.cookie('today_view1');
        var today_view2 = jQuery.cookie('today_view2');
        var today_view3 = jQuery.cookie('today_view3');
        var today_view4 = jQuery.cookie('today_view4');
        var today_view5 = jQuery.cookie('today_view5');
        if (today_view1 == false) {
            today_view1 = "";
        }
        if (today_view2 == false) {
            today_view2 = "";
        }
        if (today_view3 == false) {
            today_view3 = "";
        }
        if (today_view4 == false) {
            today_view4 = "";
        }
        if (today_view5 == false) {
            today_view5 = "";
        }
        sHtml = "<a href=\"javascript:modal.modalOpen('" + jQuery.cookie('today_view1_url') + "?appkind=Pr','" + jQuery.cookie('today_view1') + "');\">" + today_view1 + "</a>";
        jQuery("#view1").html(sHtml);
        sHtml = "<a href=\"javascript:modal.modalOpen('" + jQuery.cookie('today_view2_url') + "?appkind=Pr','" + jQuery.cookie('today_view2') + "');\">" + today_view2 + "</a>";
        jQuery("#view2").html(sHtml);
        sHtml = "<a href=\"javascript:modal.modalOpen('" + jQuery.cookie('today_view3_url') + "?appkind=Pr','" + jQuery.cookie('today_view3') + "');\">" + today_view3 + "</a>";
        jQuery("#view3").html(sHtml);
        sHtml = "<a href=\"javascript:modal.modalOpen('" + jQuery.cookie('today_view4_url') + "?appkind=Pr','" + jQuery.cookie('today_view4') + "');\">" + today_view4 + "</a>";
        jQuery("#view4").html(sHtml);
        sHtml = "<a href=\"javascript:modal.modalOpen('" + jQuery.cookie('today_view5_url') + "?appkind=Pr','" + jQuery.cookie('today_view5') + "');\">" + today_view5 + "</a>";
        jQuery("#view5").html(sHtml);
    },
    fn_todayView: function (view, url) {
        var sHtml = "";
        if (jQuery.cookie('today_view1') == false || jQuery.cookie('today_view1') == view) {
            jQuery.cookie('today_view1', view, {
                expires: 7,
                path: '/',
                secure: 0
            });
            jQuery.cookie('today_view1_url', url, {
                expires: 7,
                path: '/',
                secure: 0
            });
            sHtml = "<a href=\"javascript:appCookie.fn_productWindowChange('" + jQuery.cookie('today_view1_url') + " ','" + jQuery.cookie('today_view1') + "' )\" >" + jQuery.cookie('today_view1') + "</a>";
            jQuery("#view1").html(sHtml);
        } else if (jQuery.cookie('today_view2') == false || jQuery.cookie('today_view2') == view) {
            jQuery.cookie('today_view2', view, {
                expires: 7,
                path: '/',
                secure: 0
            });
            jQuery.cookie('today_view2_url', url, {
                expires: 7,
                path: '/',
                secure: 0
            });
            sHtml = "<a href=\"javascript:appCookie.fn_productWindowChange('" + jQuery.cookie('today_view2_url') + "','" + jQuery.cookie('today_view2') + "' )\" >" + jQuery.cookie('today_view2') + "</a>";
            jQuery("#view2").html(sHtml);
        } else if (jQuery.cookie('today_view3') == false || jQuery.cookie('today_view3') == view) {
            jQuery.cookie('today_view3', view, {
                expires: 7,
                path: '/',
                secure: 0
            });
            jQuery.cookie('today_view3_url', url, {
                expires: 7,
                path: '/',
                secure: 0
            });
            sHtml = "<a href=\"javascript:appCookie.fn_productWindowChange('" + jQuery.cookie('today_view3_url') + "','" + jQuery.cookie('today_view3') + "' )\" >" + jQuery.cookie('today_view3') + "</a>";
            jQuery("#view3").html(sHtml);
        } else if (jQuery.cookie('today_view4') == false || jQuery.cookie('today_view4') == view) {
            jQuery.cookie('today_view4', view, {
                expires: 7,
                path: '/',
                secure: 0
            });
            jQuery.cookie('today_view4_url', url, {
                expires: 7,
                path: '/',
                secure: 0
            });
            sHtml = "<a href=\"javascript:appCookie.fn_productWindowChange('" + jQuery.cookie('today_view4_url') + "','" + jQuery.cookie('today_view4') + "' )\" >" + jQuery.cookie('today_view4') + "</a>";
            jQuery("#view4").html(sHtml);
        } else if (jQuery.cookie('today_view5') == false || jQuery.cookie('today_view5') == view) {
            jQuery.cookie('today_view5', view, {
                expires: 7,
                path: '/',
                secure: 0
            });
            jQuery.cookie('today_view5_url', url, {
                expires: 7,
                path: '/',
                secure: 0
            });
            sHtml = "<a href=\"javascript:appCookie.fn_productWindowChange('" + jQuery.cookie('today_view5_url') + "','" + jQuery.cookie('today_view5') + "' )\" >" + jQuery.cookie('today_view5') + "</a>";
            jQuery("#view5").html(sHtml);
        }
        if (jQuery.cookie('today_view1') != false && jQuery.cookie('today_view2') != false && jQuery.cookie('today_view3') != false && jQuery.cookie('today_view4') != false && jQuery.cookie('today_view5') != false) {
            if (jQuery.cookie('today_view1') != view && jQuery.cookie('today_view2') != view && jQuery.cookie('today_view3') != view && jQuery.cookie('today_view4') != view && jQuery.cookie('today_view5') != view) {
                if (jQuery.cookie('today_view1') != view) {
                    jQuery.cookie('today_view1', jQuery.cookie('today_view2'), {
                        expires: 7,
                        path: '/',
                        secure: 0
                    });
                    jQuery.cookie('today_view1_url', jQuery.cookie('today_view2_url'), {
                        expires: 7,
                        path: '/',
                        secure: 0
                    });
                    sHtml = "<a href=\"javascript:appCookie.fn_productWindowChange('" + jQuery.cookie('today_view1_url') + "','" + jQuery.cookie('today_view1') + "' )\" >" + jQuery.cookie('today_view1') + "</a>";
                    jQuery("#view1").html(sHtml);
                }
                if (jQuery.cookie('today_view2') != view) {
                    jQuery.cookie('today_view2', jQuery.cookie('today_view3'), {
                        expires: 7,
                        path: '/',
                        secure: 0
                    });
                    jQuery.cookie('today_view2_url', jQuery.cookie('today_view3_url'), {
                        expires: 7,
                        path: '/',
                        secure: 0
                    });
                    sHtml = "<a href=\"javascript:appCookie.fn_productWindowChange('" + jQuery.cookie('today_view2_url') + "','" + jQuery.cookie('today_view2') + "' )\" >" + jQuery.cookie('today_view2') + "</a>";
                    jQuery("#view2").html(sHtml);
                }
                if (jQuery.cookie('t oday_view3') != view) {
                    jQuery.cookie('today_view3', jQuery.cookie('today_view4'), {
                        expires: 7,
                        path: '/',
                        secure: 0
                    });
                    jQuery.cookie('today_view3_url', jQuery.cookie('today_view4_url'), {
                        expires: 7,
                        path: '/',
                        secure: 0
                    });
                    sHtml = "<a href=\"javascript:appCookie.fn_productWindowChange('" + jQuery.cookie('today_view3_url') + "','" + jQuery.cookie('today_view3') + "' )\" >" + jQuery.cookie('today_view3') + "</a>";
                    jQuery("#view3").html(sHtml);
                }
                if (jQuery.cookie('today_view4') != view) {
                    jQuery.cookie('today_view4', jQuery.cookie('today_view5'), {
                        expires: 7,
                        path: '/',
                        secure: 0
                    });
                    jQuery.cookie('today_view4_url', jQuery.cookie('today_view5_url'), {
                        expires: 7,
                        path: '/',
                        secure: 0
                    });
                    sHtml = "<a href=\"javascript:appCookie.fn_productWindowChange('" + jQuery.cookie('today_view4_url') + "','" + jQuery.cookie('today_view4') + "' )\" >" + jQuery.cookie('today_view4') + "</a>";
                    jQuery("#view4").html(sHtml);
                }
                if (jQuery.cookie('today_view5') != view) {
                    jQuery.cookie('today_view5', view, {
                        expires: 7,
                        path: '/',
                        secure: 0
                    });
                    jQuery.cookie('today_view5_url', url, {
                        expires: 7,
                        path: '/',
                        secure: 0
                    });
                    sHtml = "<a href=\"javascript:appCookie.fn_productWindowChange('" + jQuery.cookie('today_view5_url') + "','" + jQuery.cookie('today_view5') + "' )\" >" + jQuery.cookie('today_view5') + "</a>";
                    jQuery("#view5").html(sHtml);
                }
            }
        }
    }
};
hanaCommon.login = {
    loginMsg: {
        appMainLogoutConfrimMsg: "하나은행 초기화면으로 이동하여 자동로그아웃 됩니다. <br /> 로그아웃 하시겠습니까?"
    },
    appLogin: function (returnUrl) {
        location.href = "/common/login.do?loginRedirectUrl=" + returnUrl;
    },
    appLogout: function () {
        loginChk = "false";
        hanaJQuery.logout.submitBankLogout();
    },
    appMainLogoutConfrim: function () {
        app.modalLayerShow("layerConfirm", this.loginMsg.appMainLogoutConfrimMsg, "hanaCommon.login.appMainLogout();");
    },
    appMainLogout: function () {
        loginChk = "false";
        hanaJQuery.logout.submitLogout4Main();
    }
};
hanaCommon.login.timeSet = {
    wrapId: '#interLoginDiv',
    defaultPositionId: '#interPosition',
    timesetPosition: function () {
	/*
        if (jQuery(this.wrapId).length > 0 && jQuery(this.defaultPositionId).length > 0) {
            jQuery(this.wrapId).show();
            jQuery(this.wrapId).css("left", jQuery(this.defaultPositionId).offset().left - 4);
        }
	*/
    }
};
hanaCommon.common = {
    getAppCodePath: function (appcd, mode, str) {
        if (fn_isTrim(appcd) == null || fn_isTrim(appcd) == "") {
            return;
        }
        var url = "";
        var len = appcd.length;
        if (len == 5) {
            url = hanaAppProperty.contextPath + "/" + appcd.substring(0, 2) + "/" + appcd + "/";
        } else if (len == 9) {
            url = hanaAppProperty.contextPath + "/" + appcd.substring(0, 2) + "/" + appcd.substring(0, 5) + "/" + appcd + "/";
        } else if (len == 11) {
            url = hanaAppProperty.contextPath + "/" + appcd.substring(0, 2) + "/" + appcd.substring(0, 5) + "/" + appcd.substring(0, 9) + "/" + appcd + "/";
        } else if (len == 13) {
            url = hanaAppProperty.contextPath + "/" + appcd.substring(0, 2) + "/" + appcd.substring(0, 5) + "/" + appcd.substring(0, 9) + "/" + appcd.substring(0, 11) + "/" + appcd + "/";
        } else if (len == 15) {
            url = hanaAppProperty.contextPath + "/" + appcd.substring(0, 2) + "/" + appcd.substring(0, 5) + "/" + appcd.substring(0, 9) + "/" + appcd.substring(0, 11) + "/" + appcd.substring(0, 13) + "/" + appcd + "/";
        } else if (len == 17) {
            url = hanaAppProperty.contextPath + "/" + appcd.substring(0, 2) + "/" + appcd.substring(0, 5) + "/" + appcd.substring(0, 9) + "/" + appcd.substring(0, 11) + "/" + appcd.substring(0, 13) + "/" + appcd.substring(0, 15) + "/" + appcd + "/";
        } else if (len == 19) {
            url = hanaAppProperty.contextPath + "/" + appcd.substring(0, 2) + "/" + appcd.substring(0, 5) + "/" + appcd.substring(0, 9) + "/" + appcd.substring(0, 11) + "/" + appcd.substring(0, 13) + "/" + appcd.substring(0, 15) + "/" + appcd.substring(0, 17) + "/" + appcd + "/";
        }
        if (url != "" && mode != null) {
            url = "L" + mode ? url + str : str + url;
        }
        return url;
    },
    addOverEvent: function (target, val1, val2) {
        jQuery(target).mouseenter(function (e) {
            this.src = this.src.replace(val1, val2);
        }).mouseleave(function (e) {
            this.src = this.src.replace(val2, val1);
        });
    },

    ieResizeLayer: function (target) {
        if (jQuery(target).length > 0) {
            jQuery(target).css("height", jQuery(window).height());
            jQuery(target).css("width", jQuery(window).width());
        }
    },
    ieScrollLayer: function (target) {
        fn_log("target => " + target);
        if (jQuery(target).length > 0) {
            jQuery(target).css("height", jQuery(window).height());
            if (jQuery(document).height() <= (jQuery(target).height() + jQuery(document).scrollTop())) {
                jQuery(target).css('top', (jQuery(document).height() - jQuery(target).height()) + 'px');
            } else {
                jQuery(target).css('top', (jQuery(document).scrollTop()) + 'px');
            }
        }
    },
    undefinedChk: function (obj, val) {
        if (typeof obj == undefined) {
            return val;
        } else if (obj == "undefined") {
            return val;
        } else if (obj == undefined) {
            return val;
        } else {
            return obj;
        }
    },
    cutString: function (str, length) {
        var len, rtnValue;
        try {
            if (str == null || str == "") {
                rtnValue = "";
            } else {
                len = str.length;
                if (len > length) {
                    rtnValue = str.substring(0, length);
                    rtnValue += "...";
                } else {
                    rtnValue = str;
                }
            }
            len = null;
            return rtnValue;
        } finally {
            rtnValue = null;
        }
    },
    catListToggle: function () {
        var tmpOffset = jQuery(".selectCategory").offset();
        jQuery("#catList").css("top", tmpOffset.top + 18).css("left", tmpOffset.left + 6);
        jQuery("#catList").toggle();
    },
    noCashUrl: function (url) {
        if (url.indexOf("?") != -1) {
            return url + "&getTime=" + (new Date()).getTime()
        } else {
            return url + "?getTime=" + (new Date()).getTime()
        }
    }
};
hanaCommon.common.loading = {
    viewLoadingId: "#viewLoading",
    view_loading_wrap: "#view_loading_wrap",
    viewLoadingDelayTime: 500,
    loadingImgViewOn: function () {
        jQuery("#interLoginDiv").css("z-index", 900001);
        jQuery(this.viewLoadingId).show();
        jQuery(this.view_loading_wrap).show();
    },
    loadingImgViewOff: function () {
        jQuery("#interLoginDiv").css("z-index", 100000);
        jQuery(this.viewLoadingId).hide();
        jQuery(this.view_loading_wrap).hide();
    },
    loadingImgViewOffDelay: function (options) {
        options = options || {};
        var deleyTime = options.deleyTime || this.viewLoadingDelayTime;
        setTimeout("hanaCommon.common.loading.loadingImgViewOff()", deleyTime);
        options = null;
        deleyTime = null;
    }
};
hanaCommon.common.event = {
    mainBgScrollResizeEvent: function () {
        if (jQuery(document).height() <= (jQuery(".mainBg").outerHeight() + jQuery(document).scrollTop() + 70)) {
            jQuery(".mainBg").css('top', (jQuery(document).height() - jQuery(".mainBg").outerHeight() - 120) + 'px');
        } else {
            jQuery(".mainBg").css('top', (jQuery(document).scrollTop() - 70) + 'px');
        }
    },
    footerGroupToggle: function (target, defalut, targetH) {
        if (jQuery(target).css("display") == "none") {
            return;
        }
        if (app.viewPoint == "main") {
            var defalut = jQuery(defalut).offset();
            jQuery(target).css("top", defalut.top - targetH).css("left", defalut.left);
        }
    },
    addCommonResizeEvent: function () {
        hanaCommon.login.timeSet.timesetPosition();
        if ($IE6) {
            hanaCommon.common.ieResizeLayer("#view_loading_wrap");
            hanaCommon.common.ieResizeLayer("#layer_wrap");
            hanaCommon.common.ieResizeLayer("#alert_layer_wrap");
            hanaCommon.common.event.mainBgScrollResizeEvent();
            jQuery("#wrap").css("width", jQuery(window).width() <= 1024 ? 1024 : "100%");
        }
        $alert_layer_wrap = null;
        $layer_wrap = null;
    },
    addCommonScrollEvent: function () {
        if ($IE6) {
            hanaCommon.common.ieScrollLayer("#viewLoading");
            hanaCommon.common.ieScrollLayer("#view_loading_wrap");
            hanaCommon.common.ieScrollLayer("#layer_wrap");
            hanaCommon.common.ieScrollLayer("#alert_layer_wrap");
            hanaCommon.common.event.mainBgScrollResizeEvent();
        }
        $alert_layer_wrap = null;
        $layer_wrap = null;
    },
    addEventStore: function () {
        jQuery(window).resize().unbind();
        jQuery(window).scroll().unbind();
        jQuery(window).resize(function () {
            if ($IE6) {
                if (jQuery("#eventZone").css("height") == "162px") {
                    jQuery("#container").css("height", "1030px");
                } else {
                    jQuery("#container").css("height", "1030px");
                }
            }
            hanaCommon.common.event.addCommonResizeEvent();
        });
        jQuery(window).scroll(function () {
            hanaCommon.common.event.addCommonScrollEvent();
        });
        jQuery(window).resize().scroll();
    },
    addEventCate: function () {
        jQuery(window).resize().unbind();
        jQuery(window).scroll().unbind();
        jQuery(window).resize(function () {
            hanaCommon.common.event.addCommonResizeEvent();
        });
        jQuery(window).scroll(function () {
            hanaCommon.common.event.addCommonScrollEvent();
        });
        jQuery(window).resize().scroll();
    },
    addEventWishMain: function () {
        jQuery(window).resize().unbind();
        jQuery(window).scroll().unbind();
        jQuery(window).resize(function () {
            var $container = jQuery("#containerWrap");
            var $wishMain = jQuery("#wishMain");
            var h = parseInt(jQuery(window).height());
            var w = parseInt(jQuery(window).width());
            $container.css('height', (parseInt(h) - 184 <= 580) ? '580px' : parseInt(h) - 184);
            if (w <= 1024) {
                $wishMain.css('width', '1024px');
            } else {
                $wishMain.css('width', w);
            }
            $wishMain.css('height', $container.css('height'));
            jQuery("#wishMainWrap").css('top', (($container.height() / 2) - Math.floor(jQuery("#wishMainWrap").outerHeight() / 2)) + 'px');
            hanaCommon.common.event.addCommonResizeEvent();
        });
        jQuery(window).scroll(function () {
            hanaCommon.common.event.addCommonScrollEvent();
        });
        jQuery(window).resize().scroll();
    },
    addEventWish: function () {
        jQuery(window).resize().unbind();
        jQuery(window).scroll().unbind();
        jQuery(window).resize(function () {
            var $container = stageMode == 'wish' ? jQuery("#containerWrap") : jQuery("#container");
            var $nWishContainer = jQuery("#wishMenuWrap");
            var h = parseInt(jQuery(window).height());
            $container.css('height', (parseInt(h) - 185 <= 560) ? '560px' : parseInt(h) - 185);
            if (jQuery(window).width() <= 1003) {
                jQuery("#wishMain , #containerWrap ").css('width', '1003px');
            } else {
                jQuery("#wishMain , #containerWrap ").css('width', jQuery(window).width());
            }
            jQuery("#wishMain").css('height', $container.css('height'));
            $nWishContainer.css('top', (($container.height() / 2) - Math.floor($nWishContainer.outerHeight() / 2)) + 'px');
            $container = null;
            $wishWrap = null;
            hanaCommon.common.event.addCommonResizeEvent();
        });
        jQuery(window).scroll(function () {
            hanaCommon.common.event.addCommonScrollEvent();
        });
        jQuery(window).resize().scroll();
    }
};
hanaCommon.common.motion = {};
hanaCommon.common.motion.slide = {
    data: {
        intval: null,
        num: 0,
        maxLength: 0,
        target: "",
        targetDot: "",
        onDotPath: "/resource_app/images/nstore/nstore_/dot_on.gif",
        offDotPath: "/resource_app/images/nstore/nstore_/dot_off.gif"
    },
    init: function (target, targetDot, maxLength, onDotPath, offDotPath) {
        this.data.target = target;
        this.data.targetDot = targetDot;
        this.data.maxLength = maxLength
        this.data.onDotPath = onDotPath || "/resource_app/images/nstore/nstore_/dot_on.gif";
        this.data.offDotPath = offDotPath || "/resource_app/images/nstore/nstore_/dot_off.gif";
        this.slideShow();
    },
    slideShow: function () {
        jQuery(this.data.target).hide();
        jQuery(this.data.target + ":first").show();
        this.data.intval = setInterval('hanaCommon.common.motion.slide.gallery()', 4000);
    },
    showGallery: function (galleryNum) {
        clearInterval(this.data.intval);
        if (this.data.num == galleryNum) {
            this.data.num = galleryNum;
            return;
        } else if (galleryNum != null) {
            var currNum = this.data.num;
            var jQCurrent = jQuery(this.data.target + ":eq(" + currNum + ")");
            var jQAnchorCurrent = jQuery(this.data.targetDot + ":eq(" + currNum + ")");
            this.data.num = galleryNum;
            var jQNext = jQuery(this.data.target + ":eq(" + this.data.num + ")");
            var jQAnchorNext = jQuery(this.data.targetDot + ":eq(" + this.data.num + ")");
            jQNext.show();
            jQAnchorNext.attr("src", this.data.onDotPath);
            jQCurrent.hide();
            jQAnchorCurrent.attr("src", this.data.offDotPath);
            currNum = null;
            jQCurrent = null;
            jQAnchorCurrent = null;
            jQNext = null;
            jQAnchorNext = null;
        }
    },
    startInterval: function () {
        this.data.intval = setInterval('hanaCommon.common.motion.slide.gallery()', 4000);
    },
    gallery: function () {
        var current = this.data.target + ":eq(" + this.data.num + ")";
        var anchorCurrent = this.data.targetDot + ":eq(" + this.data.num + ")";
        var jQCurrent = jQuery(current);
        var jQAnchorCurrent = jQuery(anchorCurrent);
        this.data.num++;
        if (this.data.num == this.data.maxLength) {
            this.data.num = 0;
        }
        var next = this.data.target + ":eq(" + this.data.num + ")";
        var anchorNext = this.data.targetDot + ":eq(" + this.data.num + ")";
        var jQNext = jQuery(next);
        var jQAnchorNext = jQuery(anchorNext);
        jQNext.show();
        jQAnchorNext.attr("src", this.data.onDotPath);
        jQCurrent.hide();
        jQAnchorCurrent.attr("src", this.data.offDotPath);
        current = null;
        anchorCurrent = null;
        jQCurrent = null;
        jQAnchorCurrent = null;
        next = null;
        anchorNext = null;
        jQNext = null;
        jQAnchorNext = null;
    }
};
hanaCommon.common.motion.slide2 = {
    data: {
        intval: null,
        num: 0,
        maxLength: 0,
        target: "",
        targetDot: "",
        onDotPath: "/resource_app/images/hanan/dot_on.gif",
        offDotPath: "/resource_app/images/hanan/dot_off.gif"
    },
    init: function (target, targetDot, maxLength, onDotPath, offDotPath) {
        this.data.target = target;
        this.data.targetDot = targetDot;
        this.data.maxLength = maxLength
        this.data.onDotPath = onDotPath || "/resource_app/images/hanan/dot_on.gif";
        this.data.offDotPath = offDotPath || "/resource_app/images/hanan/dot_off.gif";
        this.slideShow();
    },
    slideShow: function () {
        jQuery(this.data.target).hide();
        jQuery(this.data.target + ":first").show();
        this.data.intval = setInterval('hanaCommon.common.motion.slide2.gallery()', 4000);
    },
    showGallery: function (galleryNum) {
        clearInterval(this.data.intval);
        if (this.data.num == galleryNum) {
            this.data.num = galleryNum;
            return;
        } else if (galleryNum != null) {
            var currNum = this.data.num;
            var jQCurrent = jQuery(this.data.target + ":eq(" + currNum + ")");
            var jQAnchorCurrent = jQuery(this.data.targetDot + ":eq(" + currNum + ")");
            this.data.num = galleryNum;
            var jQNext = jQuery(this.data.target + ":eq(" + this.data.num + ")");
            var jQAnchorNext = jQuery(this.data.targetDot + ":eq(" + this.data.num + ")");
            jQNext.show();
            jQAnchorNext.attr("src", this.data.onDotPath);
            jQCurrent.hide();
            jQAnchorCurrent.attr("src", this.data.offDotPath);
            currNum = null;
            jQCurrent = null;
            jQAnchorCurrent = null;
            jQNext = null;
            jQAnchorNext = null;
        }
    },
    startInterval: function () {
        this.data.intval = setInterval('hanaCommon.common.motion.slide2.gallery()', 4000);
    },
    gallery: function () {
        var current = this.data.target + ":eq(" + this.data.num + ")";
        var anchorCurrent = this.data.targetDot + ":eq(" + this.data.num + ")";
        var jQCurrent = jQuery(current);
        var jQAnchorCurrent = jQuery(anchorCurrent);
        this.data.num++;
        if (this.data.num == this.data.maxLength) {
            this.data.num = 0;
        }
        var next = this.data.target + ":eq(" + this.data.num + ")";
        var anchorNext = this.data.targetDot + ":eq(" + this.data.num + ")";
        var jQNext = jQuery(next);
        var jQAnchorNext = jQuery(anchorNext);
        jQNext.show();
        jQAnchorNext.attr("src", this.data.onDotPath);
        jQCurrent.hide();
        jQAnchorCurrent.attr("src", this.data.offDotPath);
        current = null;
        anchorCurrent = null;
        jQCurrent = null;
        jQAnchorCurrent = null;
        next = null;
        anchorNext = null;
        jQNext = null;
        jQAnchorNext = null;
    }
};
var appTimer = {
    startTime: null,
    setTimeMemory: null,
    warningWIndowChk: true,
    startTimer: function () {
        if (jQuery("#logoutTimeDiv").css("display") != "none") {
            app.modalLayerClose("logoutTimeDiv");
        }
        appTimer.warningWIndowChk = true;
        if (appTimer.setTimeMemory) {
            clearTimeout(appTimer.setTimeMemory);
        }
        appTimer.startTime = new Date();
        appTimer.autoTimer();
    },
    autoTimer: function () {
        var sTime = appTimer.startTime.getTime();
        var nTime = (new Date()).getTime();
        var time = (600 - Math.floor((-(sTime - nTime)) * 0.001));
        if (time <= 0) {
            loginChk = "false";
            clearTimeout(appTimer.setTimeMemory);
            hanaCommon.login.appLogout();
            return;
        }
        var time1 = parseInt((time % 3600) / 60);
        var time2 = time % 60;
        time1 = time1 + "";
        time2 = time2 + "";
        if (time == 60 && appTimer.warningWIndowChk) {
            app.modalLayerShow("logoutTimeDiv");
            appTimer.warningWIndowChk = false;
        }
        if (jQuery("#logoutTimeDiv").css("display") != "none") {
            jQuery("#alertMinutes").html(time2);
        }
        jQuery("#timeLi2").html(time1);
        jQuery("#timeLi3").html((time2.length < 2 ? 0 : time2.substring(0, 1)));
        jQuery("#timeLi4").html((time2.length < 2 ? time2 : time2.substring(1, 2)));
        appTimer.setTimeMemory = setTimeout(appTimer.autoTimer, 1000);
    },
    touchAjax: function () {
        jQuery.ajax({
            type: "POST",
            url: "http://" + location.host + '/common/restartTimer.do',
            dataType: "html",
            success: function (data) {
                appTimer.startTimer();
            },
            error: function (x, error) {
                fn_log(" touchAjax =>>>>>>>>> " + error.message);
                fn_log(" touchAjax =>>>>>>>>> " + x.status);
            }
        });
    },
    warningClose: function () {
        app.modalLayerClose("logoutTimeDiv");
        appTimer.warningWIndowChk = false;
    }
};
jQuery.fn.changeContent = function (url, params, callback) {
    if (url == null || url == "" || url.replace(/ /gi, "") == "") {
        alert("올바른 URL을 입력해 주세요");
        return;
    }
    obj = jQuery(this);
    jQuery.ajax({
        type: "POST",
        url: hanaCommon.common.noCashUrl(url),
        data: params,
        success: function (data) {
            purge(obj);
            obj.html(data);
            try {
                if (params.height != null) {
                    obj.css("height", params.height);
                }
            } catch (e) {}
            if (callback) {
                callback();
            }
            obj = null;
            callback = null;
        },
        error: function (x, error) {
            app.fn_ajaxError(x, error);
        }
    });
}
jQuery.fn.changeCastContent = function (url, params, callback, fundstyle) {
    if (params != null && params != undefined) {
        if (params["setPageMem"] != "" && params["setPageMem"] != null && params["setPageMem"] != undefined && params["setPageMem"] != "1") {
            fn_setReturnPageUrl(url.substring(0, url.lastIndexOf("/")) + "/index,1,list," + params["setPageMem"] + ".jsp");
        } else if (fn_getReturnPageUrl() != null && params["getPageMem"] != null && params["getPageMem"] != undefined) {
            url = fn_getReturnPageUrl();
        }
    }
    var flag = false;
    hanaCommon.castScrollTop();
    if (url == null || url == "" || url.replace(/ /gi, "") == "") {
        alert("올바른 URL을 입력해 주세요");
        return;
    }
    if (fundstyle != null) {
        if (fundstyle == "Y") {
            document.getElementById("appFundIframe").src = url;
            return;
        }
    }
    var obj = jQuery(this);
    if (url.substring(url.length - 1, url.length) == "/") {
        url += "index.html";
        flag = true;
    }
    jQuery.ajax({
        type: "POST",
        url: hanaCommon.common.noCashUrl(url),
        data: params,
        success: function (data) {
            purge(obj);
            obj.html("");
            if (data.indexOf("<!-- cast contents -->") > -1) {
                obj.html(data.substring(data.indexOf("<!-- cast contents -->"), data.indexOf("<!--// cast contents -->") - 1));
            } else {
                obj.html(data);
            }
            modal.modalPosition('resize');
            setTimeout("modal.modalPosition();", 2000);
            setTimeout("modal.modalPosition();", 4000);
            setTimeout("modal.modalPosition();", 6000);
            setTimeout("modal.modalPosition();", 8000);
            setTimeout("modal.modalPosition();", 10000);
            if (callback) {
                callback();
            }
            obj = null;
            callback = null;
        },
        error: function (x, error) {
            if (x.status == "404" && flag) {
                obj.changeCastContent(url.replace('index.html', 'index.jsp'), params, callback, fundstyle);
            } else {
                app.fn_ajaxError(x, error);
            }
        }
    });
};
jQuery.fn.changeCastModal = function (appcd, flag) {
    hanaCommon.castScrollTop();
    var url = "";
    flag = (flag || false);
    if (appcd == null || appcd == "" || appcd.replace(/ /gi, "") == "") {
        alert("올바른 APP CODE를 입력해 주세요");
        return;
    }
    if (!flag) {
        app.modalLayerShow("layerConfirm", "현재 실행중인 App이 종료됩니다. <br> 선택하신 App을 실행하시겠습니까?", "javascript:jQuery(hanaAppProperty.appWindow).changeCastModal('" + appcd + "',true);");
        return;
    }
    app.getCastMenu(appcd);
    var options = app.getAppInfo(appcd);
    if (options.agaptitle != null) {
        jQuery('#app_header > h2').children().remove();
        jQuery('#app_header > h2').append("<img src='" + options.agaptitle + "' alt='" + options.appname + "' />");
    }
    if (appcd.length == 9) {
        url = hanaAppProperty.contextPath + "/" + appcd.substring(0, 2) + "/" + appcd.substring(0, 5) + "/" + appcd + "/";
    } else if (appcd.length == 11) {
        url = hanaAppProperty.contextPath + "/" + appcd.substring(0, 2) + "/" + appcd.substring(0, 5) + "/" + appcd.substring(0, 9) + "/" + appcd + "/";
    } else if (appcd.length == 13) {
        url = hanaAppProperty.contextPath + "/" + appcd.substring(0, 2) + "/" + appcd.substring(0, 5) + "/" + appcd.substring(0, 9) + "/" + appcd.substring(0, 11) + "/" + appcd + "/";
    } else if (appcd.length == 15) {
        url = hanaAppProperty.contextPath + "/" + appcd.substring(0, 2) + "/" + appcd.substring(0, 5) + "/" + appcd.substring(0, 9) + "/" + appcd.substring(0, 11) + "/" + appcd.substring(0, 13) + "/" + appcd + "/";
    }
    obj = jQuery(this);
    jQuery.ajax({
        type: "POST",
        url: hanaCommon.common.noCashUrl(url),
        success: function (data) {
            purge(obj);
            obj.html(data);
            jQuery('div.cast_contents').css("height", jQuery('#app_body').height() - 70);
            hanaCommon.castScrollTop();
            obj = null;
            callback = null;
        },
        error: function (x, error) {
            app.fn_ajaxError(x, error);
        }
    });
}

function getBrowserInfo() {
    var result = {};
    var appName = navigator.appName
    var userAgent = navigator.userAgent
    var platform = navigator.platform
    var OS;
    var BrowserName;
    var BrowserVersion;
    if (platform.toLowerCase().indexOf('win32') != -1) {
        OS = 'window';
    }
    if (OS == 'window') {
        OS = 'win9x';
        if (userAgent.indexOf('Windows 98') != -1 || userAgent.indexOf('Win98') != -1) {
            OS = 'window98';
        }
        if (userAgent.indexOf('Windows ME') != -1) {
            OS = 'winME';
        }
        if (userAgent.indexOf('Windows NT 5.0') != -1) {
            OS = 'win2000';
        }
        if (userAgent.indexOf('Windows NT 5.1') != -1) {
            OS = 'winXP';
        }
        if (userAgent.indexOf('Windows NT 6.0') != -1) {
            OS = 'winVista';
        }
        if (userAgent.indexOf('Windows NT 6.1') != -1) {
            OS = 'win7';
        }
    }
    if (userAgent.indexOf('Mac') != -1) {
        OS = 'Mac';
    }
    if (userAgent.indexOf('Linux') != -1 || userAgent.indexOf('x86_64') != -1 || userAgent.indexOf('ia_64 ME') != -1 || userAgent.indexOf('ppc_64') != -1) {
        OS = 'linux64';
    }
    if ((userAgent.indexOf('Linux') != -1) && ((userAgent.toLowerCase().indexOf('i386') != -1) || (userAgent.toLowerCase().indexOf('i686') != -1))) {
        OS = 'linux32';
    }
    if (appName == 'Microsoft Internet Explorer') {
        BrowserName = 'IE';
        BrowserVersion = userAgent.substring(userAgent.indexOf('MSIE'));
        BrowserVersion = BrowserVersion.substring(BrowserVersion.indexOf(' ') + 1, BrowserVersion.indexOf(';'));
    }
    if (userAgent.indexOf('Firefox') != -1) {
        BrowserName = 'Firefox';
        BrowserVersion = userAgent.substring(userAgent.indexOf('Firefox'));
        if (BrowserVersion.indexOf(" ") > -1) BrowserVersion = BrowserVersion.substring(BrowserVersion.indexOf('/') + 1, BrowserVersion.indexOf(' '));
        else BrowserVersion = BrowserVersion.substring(BrowserVersion.indexOf('/') + 1);
    }
    if (userAgent.indexOf('Opera') != -1) {
        BrowserName = 'Opera';
        BrowserVersion = userAgent.substring(userAgent.indexOf('Version'));
        BrowserVersion = BrowserVersion.substring(BrowserVersion.indexOf('/') + 1);
    }
    if (userAgent.indexOf('Chrome') != -1) {
        BrowserName = 'Chrome';
        BrowserVersion = userAgent.substring(userAgent.indexOf('Chrome'));
        BrowserVersion = BrowserVersion.substring(BrowserVersion.indexOf('/') + 1, BrowserVersion.indexOf(' '));
    }
    if (userAgent.indexOf('Safari') != -1 && userAgent.indexOf('Chrome') == -1) {
        BrowserName = 'Safari';
        BrowserVersion = userAgent.substring(userAgent.indexOf('Version'));
        BrowserVersion = BrowserVersion.substring(BrowserVersion.indexOf('/') + 1, BrowserVersion.indexOf(' '));
    }
    result["OS"] = OS;
    result["BrowserName"] = BrowserName;
    result["BrowserVersion"] = parseFloat(BrowserVersion);
    return result;
}

function isNavigator4OpenBank() {
    var brInfo = getBrowserInfo();
    if (brInfo["OS"].indexOf("win") > -1) {
        if (brInfo["BrowserName"].indexOf("IE") > -1) {
            if (brInfo["BrowserVersion"] >= 6) {
                return false;
            }
        } else if (brInfo["BrowserName"].indexOf("Firefox") > -1) {
            if (brInfo["BrowserVersion"] >= 3.5) {
                return true;
            }
        } else if (brInfo["BrowserName"].indexOf("Chrome") > -1) {
            if (brInfo["BrowserVersion"] >= 5) {
                return true;
            }
        } else if (brInfo["BrowserName"].indexOf("Safari") > -1) {
            if (brInfo["BrowserVersion"] >= 4) {
                return true;
            }
        } else if (brInfo["BrowserName"].indexOf("Opera") > -1) {
            if (brInfo["BrowserVersion"] >= 9.8) {
                return true;
            }
        }
    } else if (brInfo["OS"].indexOf("Mac") > -1) {
        if (brInfo["BrowserName"].indexOf("Safari") > -1) {
            if (brInfo["BrowserVersion"] >= 4) {
                return true;
            }
        } else if (brInfo["BrowserName"].indexOf("Firefox") > -1) {
            if (brInfo["BrowserVersion"] >= 3.5) {
                return true;
            }
        } else if (brInfo["BrowserName"].indexOf("Chrome") > -1) {
            if (brInfo["BrowserVersion"] >= 5) {
                return true;
            }
        } else if (brInfo["BrowserName"].indexOf("Opera") > -1) {
            if (brInfo["BrowserVersion"] >= 9.8) {
                return true;
            }
        }
    } else if (brInfo["OS"].indexOf("linux") > -1) {
        return true;
    } else {
        return false;
    }
    return false;
}

function clientCheck() {
    if (isNavigator4OpenBank()) {
        window.location.replace("https://open.hanabank.com");
    }
    else {
        window.location.replace("/common/login.do");
    }
}
/*
function myapp_appLogin() { 
	var myapp_appLogin = location.href ="/common/login.do?loginRedirectUrl=/appstage/index.jsp";
}
function myapp_set_OK() {
	if (loginChk == "false") {
		app.modalLayerShow("layerConfirm",
		"My App 추가는 로그인 이후에 가능합니다. <br>로그인 하시겠습니까?", "/common/login.do?loginRedirectUrl=/appstage/index.jsp");
	} else {
		myapp_openC();
	}
}
*/
function save_consult() { //예적금
	jQuery("#sel_kind").val("02"); 
	var save_consult = window.open('/efamily/consult/cust_consult_pop.do?sel_kind=02','hanabank','width=500,height=744, toolbar=0, location=0, menubar=0, status=0'); 
} 
function cust_consult_p() { //대출
	jQuery("#sel_kind").val("03"); 
	var cust_consult_p = window.open('/efamily/consult/cust_consult_pop.do?sel_kind=03','hanabank','width=500,height=744, toolbar=0, location=0, menubar=0, status=0'); 
} 
function exch_consult() { //외환
	jQuery("#sel_kind").val("04"); 
	var exch_consult = window.open('/efamily/consult/cust_consult_pop.do?sel_kind=04','hanabank','width=500,height=744, toolbar=0, location=0, menubar=0, status=0'); 
}
function fund_consult() { //펀드
	jQuery("#sel_kind").val("05"); 
	var fund_consult = window.open('/efamily/consult/cust_consult_pop.do?sel_kind=05','hanabank','width=500,height=744, toolbar=0, location=0, menubar=0, status=0'); 
}
function phon_consult() { //모바일,폰
	jQuery("#sel_kind").val("06"); 
	var phon_consult = window.open('/efamily/consult/cust_consult_pop.do?sel_kind=06','hanabank','width=500,height=744, toolbar=0, location=0, menubar=0, status=0'); 
}
function cbsc_consult() { //기업뱅킹
	jQuery("#sel_kind").val("07"); 
	var cbsc_consult = window.open('/efamily/consult/cust_consult_pop.do?sel_kind=07','hanabank','width=500,height=744, toolbar=0, location=0, menubar=0, status=0'); 
}

function calcHeight () {
	/*
	//20141224 크로스브라우징 관련 수정됨 한충수
	var iframe = (document.getElementById('the_height') || false)
	,	iframeDocument = (iframe.contentWindow.document || false)
	;

	if (!iframe || !iframeDocument) {return;}

	var resizing = setInterval (function () {
		iframe.height = iframeDocument.documentElement.scrollHeight;
	
	},500);
	*/
	jQuery("#the_height").css("display","none");
	if (isNavigator4OpenBank()) {
		initDiv1 = '<div style="border:3px solid #00aca0;background:#fff;text-align:center; padding:50px 0;">';
		initDiv1 += '<p style="font-size:14px; font-weight:bold;">본 서비스는 Microsoft Internet Explorer 계열만 사용 가능 합니다.</p>';
		initDiv1 += '</div>';
		jQuery("#the_height").before(initDiv1);
	} else {
		jQuery("#the_height").css("display","block");
		var iframe = (document.getElementById('the_height') || false)
		,	iframeDocument = (iframe.contentWindow.document || false)
		;
		if (!iframe || !iframeDocument) {return;}
		var resizing = setInterval (function () {
			iframe.height = iframeDocument.documentElement.scrollHeight;
		
		},500);
	}

}

//펀드상품상세 규약서 텍스트를 집합투자규약 으로 변경
jQuery(document).ready(function(){
	jQuery(".fin_footer_box .f_btn a:contains('규약서')").text("집합투자규약");
	jQuery(".lnb > li").eq(-1).css("margin-bottom","-1px");
	jQuery(".tright .fan_btn a:contains('프린트')").text("인쇄");
});
function event_LoginURL() { 
	var event_LoginURL = location.href ="/nhana/customer/customer05/customer0502/CaEve0003/index.jsp";
}
function event_ChakURL() {
	if (loginChk == "false") {
		app.modalLayerShow("layerConfirm",
		"이벤트 당첨자 조회는 로그인 이후에 가능합니다.<br>로그인 하시겠습니까?", "/common/login.do?loginRedirectUrl=/nhana/customer/customer05/customer0502/CaEve0003/index.jsp");
	} else {
		event_LoginURL();
	}
}
// blank 메뉴를 클릭시 아이프레임으로 페이지 리턴하여 Pv함
function Repv_eCRM(cid) { 
	var fUrl=cid;
	jQuery("iframe#mpop").attr("src", fUrl);
}

//20140901 상품상세에서 쿠키로 건넴
fn_todayView_ = function (name, url) {
	if (jQuery.cookie('today_view1') == false || jQuery.cookie('today_view1') == name) {
		jQuery.cookie('today_view1', name);
		jQuery.cookie('today_url1', url);
	} else if (jQuery.cookie('today_view2') == false || jQuery.cookie('today_view2') == name) {
		jQuery.cookie('today_view2', name);
		jQuery.cookie('today_url2', url);
	} else if (jQuery.cookie('today_view3') == false || jQuery.cookie('today_view3') == name) {
		jQuery.cookie('today_view3', name);
		jQuery.cookie('today_url3', url);
	} else if (jQuery.cookie('today_view4') == false || jQuery.cookie('today_view4') == name) {
		jQuery.cookie('today_view4', name);
		jQuery.cookie('today_url4', url);
	} else if (jQuery.cookie('today_view5') == false || jQuery.cookie('today_view5') == name) {
		jQuery.cookie('today_view5', name);
		jQuery.cookie('today_url5', url);
	}
	if (jQuery.cookie('today_view1') != false && jQuery.cookie('today_view2') != false && jQuery.cookie('today_view3') != false && jQuery.cookie('today_view4') != false && jQuery.cookie('today_view5') != false) {
		if (jQuery.cookie('today_view1') != name && jQuery.cookie('today_view2') != name && jQuery.cookie('today_view3') != name && jQuery.cookie('today_view4') != name && jQuery.cookie('today_view5') != name) {
			if (jQuery.cookie('today_view1') != name) {
				jQuery.cookie('today_view1', jQuery.cookie('today_view2'));
				jQuery.cookie('today_url1', jQuery.cookie('today_url2'));
			}
			if (jQuery.cookie('today_view2') != name) {
				jQuery.cookie('today_view2', jQuery.cookie('today_view3'));
				jQuery.cookie('today_url2', jQuery.cookie('today_url3'));
			}
			if (jQuery.cookie('today_view3') != name) {
				jQuery.cookie('today_view3', jQuery.cookie('today_view4'));
				jQuery.cookie('today_url3', jQuery.cookie('today_url4'));
			}
			if (jQuery.cookie('today_view4') != name) {
				jQuery.cookie('today_view4', jQuery.cookie('today_view5'));
				jQuery.cookie('today_url4', jQuery.cookie('today_url5'));
			}
			if (jQuery.cookie('today_view5') != name) {
				jQuery.cookie('today_view5', name);
				jQuery.cookie('today_url5', url);
			}
		}
	}
}
//2015.03.19 GNB 통합인크루드 확대
	function TM_util_link01(){
		fn_goGNBpage('http://www.hanabank.com/contents/ion_main/banner/refer/app_refer21.html'); Re_PageSet('UT_2Dp','UTLGo_b');
	}
	function TM_util_link02(){
		fn_goGNBpage('http://www.hanabank.com/contents/ion_main/banner/refer/app_refer20.html'); Re_PageSet('UT_2Dp','UTLGo_c');
	}
	function TM_util_link03(){
		fn_goGNBpage('http://www.hanabank.com/contents/ion_main/banner/refer/app_refer19.html'); Re_PageSet('UT_2Dp','UTLGo_d');
	}
	function SiteAllV() {
		app.modalLayerShow('backgroundSite');
	}
	function go_search(){
		var keyword = jQuery("#search_f").val();
		if(keyword=="") keyword = "";
		location.href="/nhana/Se/SeAll/nsearch_total.jsp?query="+keyword;
	}

