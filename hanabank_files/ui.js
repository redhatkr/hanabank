jQuery(document).ready(function () {

    /* Event Link */
    function tableEventEnd() {
        var dim = '<div class="dim"><span class="hid">이벤트 종료 링크 이동 방지</span></div>';
        jQuery('.tblView .cont').prepend(dim)
    }

    jQuery(window).on('load', function () {
        tableEventEnd();
    });


    /* skip focus  */
    jQuery('#skip a').on('click', function () {
        var skip_target = jQuery(this).attr('href');
        jQuery(skip_target).attr('tabindex', '0').focus();
    });

    jQuery('#contents ,#gnb , #util').on('focusleave', function () {
        jQuery(this).removeAttr('tabindex');
    });

    /* gnb_moreView  */
    var $moreView = jQuery('#gnb .smenu'),
        $moreViewWrap = jQuery('#gnb .smenu dl');
    jQuery(document).on('mouseover focus', '.smenu .menuView', viewMenu2);
    jQuery(document).on('mouseenter focus', '.smenu', viewMenu2);
    jQuery(document).on('mouseleave blur', '#gnb .smenu', hideMenu2);

    function viewMenu2() {
        $moreViewWrap.stop().animate({ height: '220px' }, 100);
        $moreView.addClass('on');
    };
    function hideMenu2() {
        $moreViewWrap.stop().animate({ height: '0' }, 0);
        $moreView.removeClass('on');
    };

    /* location  */
    jQuery('.locate > li').on('mouseenter focusin', function () {
        jQuery(this).addClass('on');
    });
    jQuery('.locate > li').on('mouseleave focusout', function () {
        jQuery(this).removeClass('on');
    });

    /* tab menu*/
    jQuery(".tabMenu li a").click(function () {
        jQuery(".tabMenu li").removeClass('on');
        //jQuery(this).parents().addClass('on').siblings().removeClass('on');
        jQuery(this).parents().addClass('on');
    });

    /* faq */
    jQuery('.faqList li > a').attr('title', '질문에 대한 답변 보이기');
    jQuery('.faqList li > a').click(function () {
        if (jQuery(this).parent().hasClass('')) {
            jQuery('.faqList li > a').removeAttr('title', '질문에 대한 답변 보이기');
            jQuery(this).next('.faqList li .answer').animate({ marginTop: '27px', marginBottom: '19px' }, 200).css({ 'height': 'auto', 'overflow': 'visible' });
            jQuery(this).prop('title', '질문에 대한 답변 숨기기').parent().addClass('on').siblings().removeClass('on').children('.faqList li .answer').animate({ marginTop: '0', marginBottom: '0' }).css({ 'margin-top': '0', 'margin-bottom': '0', 'height': '0', 'overflow': 'hidden' });
        } else {
            jQuery(this).next('.faqList li .answer').animate({ marginTop: '0', marginBottom: '0' }, 200).css({ 'margin-top': '0', 'margin-bottom': '0', 'height': '0', 'overflow': 'hidden' });
            jQuery(this).prop('title', '질문에 대한 답변 보이기').parent().removeClass('on');
        }
        return false;
    });

    /* smart app_nwallet */
    jQuery(".nwalletUse .playList li").click(function () {
        jQuery(this).addClass('on').siblings().removeClass('on');
    });

    /* main */
    jQuery('.pbkMain .link li a.language').prop('title', '하위메뉴 보이기');
    jQuery('.pbkMain .link li a.language').bind('click keyup', function () {
        if (jQuery(this).parent().hasClass('')) {
            jQuery(this).prop('title', '하위메뉴 숨기기').parent().addClass('on').siblings().removeClass('on');
        } else {
            jQuery(this).prop('title', '하위메뉴 보이기').parent().removeClass('on');
        }
        return false;
    });

    jQuery('.pbkMain .link li ul li a').keyup(function () {
        jQuery(this).parent().addClass('on').siblings().removeClass('on');
    });

    jQuery('.pbkMain .mainSection li h2 a').bind('mouseenter focusin', function () {
        jQuery("#container").css("z-index", "11");
        jQuery(this).parent().parent().addClass('on').siblings().removeClass('on');
        jQuery('.pbkMain .link li').removeClass('on');
        jQuery('.pbkMain #footer').addClass('hidden');
        jQuery('.utility').removeClass('hidden');
        jQuery('.noticeBox').removeClass('hidden');
        jQuery('.floatNotice').removeClass('hidden');
        fn_topUtilSet(jQuery(this).parents("li").index());
        jQuery(".pbkMain .mainSection li.on").mouseleave(function () {
            jQuery("#container").css("z-index", "10");
            jQuery(".members_ico").show();
            fn_topUtilSet(5);
            jQuery(".pbkMain .mainSection li").removeClass("on");
            jQuery(document).mouseup();
        });
    });
    //
    var fn_topUtilSet = function (len) {
        if (len == 3) {
            jQuery(".members_ico").hide();
            jQuery(".utility").hide();
            jQuery(".link").find("li").show();
        } else if (len == 1) {
            jQuery(".link").find("li").eq(2).hide();
            jQuery(".link").find("li").eq(3).hide();
            jQuery(".link").find("li").eq(4).hide();
            jQuery(".utility").show();
        } else {
            jQuery(".utility").show();
            jQuery(".link").find("li").show();
        }
    }
    jQuery(".sideZone").bind("click", function () {
        fn_topUtilSet(5);
        jQuery(".pbkMain .mainSection li").removeClass("on");
        jQuery(document).mouseup();
    });
    jQuery('.pbkMain .mainSection li + li + li + li h2 a').bind('mouseenter focusin', function () {
        jQuery('.utility').addClass('hidden');
        jQuery('.noticeBox').addClass('hidden');
        jQuery('.floatNotice').addClass('hidden');
    });

    if (jQuery('.onlineprd').hasClass('online')) {
        jQuery('.onlineprd').attr('title', '온라인 가입상품으로 정렬 선택됨');
    } else {
        jQuery('.onlineprd').attr('title', '온라인 가입상품으로 정렬 해제됨');
    }

    if (jQuery('.bestrate').hasClass('online')) {
        jQuery('.bestrate').attr('title', '최고 금리순으로 정렬 선택됨');
    } else {
        jQuery('.bestrate').attr('title', '최고 금리순으로 정렬 해제됨');
    }

    if (jQuery('.accWeb').hasClass('online')) {
        jQuery('.accWeb').attr('title', '출시순으로 정렬 선택됨');
    } else {
        jQuery('.accWeb').attr('title', '출시순으로 정렬 해제됨');
    }

    jQuery('.pbkMain .mainSection li h2 a').click(function () {
        if (jQuery(this).parent().parent().hasClass("on")) {
            parent.document.location = jQuery(this).attr("href");
            return;
        }
    });

    jQuery(document).mouseup(function (e) {
        //		var container = jQuery("#contents");
        //		if( container.has(e.target).length === 0)
        //jQuery('.pbkMain .mainSection li').removeClass('on');
        var colorOn = jQuery('.pbkMain .mainSection li + li + li + li');
        if (colorOn.hasClass('on')) {
            jQuery('.pbkMain #footer').addClass('hidden');
            jQuery('.utility').addClass('hidden');
            jQuery('.noticeBox').addClass('hidden');
            jQuery('.floatNotice').addClass('hidden');
        } else {
            jQuery('.pbkMain #footer').removeClass('hidden');
            jQuery('.utility').removeClass('hidden');
            jQuery('.noticeBox').removeClass('hidden');
            jQuery('.floatNotice').removeClass('hidden');
        }
        var colorOn2 = jQuery('.pbkMain .mainSection li');
        if (colorOn2.hasClass('on')) {
            jQuery('.pbkMain #footer').addClass('hidden');
        } else {
            jQuery('.pbkMain #footer').removeClass('hidden');
            jQuery('.utility').removeClass('hidden');
            jQuery('.noticeBox').removeClass('hidden');
            jQuery('.floatNotice').removeClass('hidden');
        }
        if (jQuery("#contents > li.on").index() == 1) fn_topUtilSet(1);
        else if (jQuery("#contents > li.on").index() == 3) fn_topUtilSet(3);
        //		var jQuerylogin = jQuery('.mainSection li.login');
        //		if(jQuerylogin.hasClass('on')) {
        //			} else {
        //			jQuery('.pbkMain .link li').removeClass('on');	
        //		}		
    });

    //	jQuery(document).mouseup(function (e){
    //		jQuery('.utility').removeClass('hidden');
    //		jQuery('.noticeBox').removeClass('hidden');
    //	});

    jQuery('.pbkMain .mainSection li .detail ul li a').keyup(function () {
        jQuery(this).parent().parent().parent().parent().addClass('on').siblings().removeClass('on');
    });

    jQuery('.pbkMain .mainSection li .detail .banner a').keyup(function () {
        jQuery(this).parent().parent().parent().addClass('on').siblings().removeClass('on');
    });

    jQuery('.pbkMain .mainSection li .detail button').keyup(function () {
        jQuery(this).parent().parent().addClass('on').siblings().removeClass('on');
    });

    jQuery('.pbkMain #footer').keyup(function () {
        jQuery('.pbkMain .mainSection li').removeClass('on');
    });

    jQuery('.pbkMain #header ul li ul li a').keyup(function () {
        //jQuery('.pbkMain .mainSection li').removeClass('on');
        jQuery(this).parent().parent().parent().addClass('on');
    });

    jQuery('.floatNotice a.title').click(function () {
        jQuery('.noticeLayer').addClass('on');
    });

    /* tipGuide */
    jQuery('.tipClose button').on('click', function () {
        jQuery('#tipWrap').removeClass('on');
        jQuery('body').removeClass('fixed');
    });

    jQuery(".btnClose").click(function () {
        jQuery(".layerWrap").removeClass('on');
        jQuery(".articleLayer").removeClass('on');
        jQuery('body').removeClass('fixed');
        jQuery('.noticeLayer').addClass('off');
        jQuery('.noticeLayer').removeClass('on');
    });

    /* product hide & show */
    jQuery('.viewBankMenu .mallMenuBtn').click(function () {
        jQuery('#mallMenu').toggleClass('on');
        jQuery(this).toggleClass('on');
    });
    jQuery('#mallMenu .btnClose').click(function () {
        jQuery('#mallMenu').toggleClass('on');
        jQuery('.viewBankMenu .mallMenuBtn').toggleClass('on');
    });


});


/* layer popup common */
function layerPop(layerPopVal) {
    jQuery('#' + layerPopVal).addClass('on');
    jQuery('body').addClass('fixed');
}

/* text fade out */
function OnEnter(field) { if (field.value == field.defaultValue) { field.value = ""; } }
function OnExit(field) { if (field.value == "") { field.value = field.defaultValue; } }

function OnEnter2(field) { if (field.value == '상품명') { field.value = ""; } }
function OnExit2(field) { if (field.value == "") { field.value = '상품명'; } }

/* open window center */
function open_window(name, url, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable) {
    toolbar_str = toolbar ? 'yes' : 'no';
    menubar_str = menubar ? 'yes' : 'no';
    statusbar_str = statusbar ? 'yes' : 'no';
    scrollbar_str = scrollbar ? 'yes' : 'no';
    resizable_str = resizable ? 'yes' : 'no';
    var windowLeft = (screen.width - width) / 2;
    var windowTop = (screen.height - height) / 2;
    window.open(url, name, 'left=' + windowLeft + ',top=' + windowTop + ',width=' + width + ',height=' + height + ',toolbar=' + toolbar_str + ',menubar=' + menubar_str + ',status=' + statusbar_str + ',scrollbars=' + scrollbar_str + ',resizable=' + resizable_str);
}

/* hide layer */
function hide(id) {
    jQuery('#' + id).removeClass('on');
}

/* today close */
function setCookie(name, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}
function closeWin() {
    if (document.notice_form.todayClose.checked) {
        setCookie("maindiv", "done", 1);
    }
    document.getElementById("layerPopup").style.visibility = "hidden";
}

/* print */
var app = {
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
    }
}
function hana_openWindow(b, c, d) {
    window.open(b, c, d).focus()
}
function print_hana(target, dep1, dep2, dep3, tk) {
    hana_openWindow('/cont/adm/print/index.jsp?target=' + target + '&dep1=' + dep1 + '&dep2=' + dep2 + '&dep3=' + dep3 + '&tk=' + tk, 'print', 'width=760, height=700, menubar=no, resizable=no, location=no, status=no, toolbar=no ,scrollbars=yes');
}

/* customer_ban */
function fn_openLpop() {
    document.getElementById("customer_layerPopup").style.visibility = "visible";
    document.getElementById("customer_layerPopup").style.display = "block";
    jQuery(".popDim").show();
}

function fn_closeLpop() {
    document.getElementById("customer_layerPopup").style.visibility = "hidden";
    document.getElementById("customer_layerPopup").style.display = "none";
    jQuery(".popDim").hide();
}

jQuery(document).ready(function () {

    jQuery(".join_btn_01").click(function () {
        jQuery(".join_pop_01").show();
    });
    jQuery(".join_btn_02").click(function () {
        jQuery(".join_pop_02").show();
    });

    jQuery("#btn_popup03").click(function () {
        jQuery(".join_pop_03").show();
        jQuery("#haiBanking").attr("src", "/haibanking/index.html");
    });

    jQuery(".pop-close01").click(function () {
        jQuery(".join_pop_01").hide();
    });

    jQuery(".pop-close02").click(function () {
        jQuery(".join_pop_02").hide();
    });

    jQuery(".pop-close03").click(function () {
        jQuery(".join_pop_03").hide();
        jQuery("#haiBanking").attr("src", "");
    });
});


jQuery(window).load(function () {
    /* Smart Branch [S] */
    function smart_brn_fn() {
        var smart_brn_menu = jQuery('.slideMenuDiv2 .subon_select a').text().replace(/(\s+)/g, '');
        var junbupText;

        if (smart_brn_menu == '프리미엄직장인론') {
        // if (smart_brn_menu == '프리미엄직장인론' || smart_brn_menu == '전문직클럽대출' || smart_brn_menu == '닥터클럽대출-골드') {
			/**
			* @2022-06-19 공인식 업데이트
			* - 상품 상세 영역이 공통화되어 있으므로 금리 변경에 따른 2개 상품은 본 조건 처리에서 제외합니다.
			* - 대상 상품: 전문직클럽대출, 닥터클럽대출-골드
			*/
            jQuery('.screening_number li').eq(1).text('본 공시내용의 유효기간 : 2021.08.25 ~ 2024.08.24'); // 유효기간
            jQuery('.screening_number li').eq(2).text('기준일 : 2021년 8월 27일'); // 기준일

            /* 준법번호 */
            if (smart_brn_menu == '프리미엄직장인론') { // 프리미엄직장인론
                junbupText = '준법감시인 심의필 제2021-상품-1612호(2021.08.25)';
            } else if (smart_brn_menu == '전문직클럽대출') { // 전문직 클럽대출
                junbupText = '준법감시인 심의필 제2021-상품-1615호(2021.08.25)';
            } else if (smart_brn_menu == '닥터클럽대출-골드') { // 닥터클럽대출-골드
                junbupText = '준법감시인 심의필 제2021-상품-1620호(2021.08.25)';
            }
            jQuery('.screening_number li').eq(0).text(junbupText);
        }

        /* 상세 영역 버튼명 변경 및 삭제 */
        var targetBtn01 = jQuery('.produ-loan2_btm .loan2_issue .btn_s01');
        var targetBtn02 = jQuery('.produ-loan2_btm .loan2_issue .btn_s02');

        /* '중도금' 텍스트가 들어간 버튼이 아닐 경우에 실행하기(상세 버튼) */
        if (targetBtn01.text().indexOf('중도금') < 0) {
            targetBtn01.text('한도알아보기');
        }

        if (targetBtn02.text().indexOf('중도금') < 0) {
            targetBtn02.hide();
        }
        /* //'중도금' 텍스트가 들어간 버튼이 아닐 경우에 실행하기(상세 버튼) */

        /* '중도금' 텍스트가 들어간 버튼일 경우에 실행(상세 버튼) */
        if (targetBtn02.text().indexOf('중도금') > -1) {
            targetBtn02.last().text('한도알아보기');
        }

        jQuery('#mainMenuItem-A').text('대출 알아보기 (신규)'); // '대출상품안내/신청' 명칭 변경
        jQuery('#mainMenuItem-B').text('대출 알아보기 (증액)'); // '대출한도증액신청' 명칭 변경
        /* '중도금' 텍스트가 들어간 버튼일 경우에 실행(좌측 메뉴) */
        if (jQuery('#subMenu2-A').text().indexOf('중도금') > -1) {
            jQuery('#subMenu2-A').text('한도알아보기');
        }
    }

    if (jQuery('.efamily_wrap').length) {
        setTimeout(function () {
            smart_brn_fn();
        }, 0);

        jQuery(document).on('click', '#slideDiv2 a', function () {
            var smart_brn_compliance = jQuery('.screening_number').html();

            var smart_brn_interval = setInterval(function () {
                if (smart_brn_compliance != jQuery('.screening_number').html()) {
                    smart_brn_fn();
                    clearInterval(smart_brn_interval);
                }
            }, 100);
        });
    }
    /* //Smart Branch [E] */

    // 담보대출 2건 대출중단 안내문구 추가 
    /* var stopIds = [1444830, 1445168];
      var targetArea = jQuery(".wrap-product-list .product-list");
      var innerHtml = '<span class="credit-loan-notice color02">';
          innerHtml +=    '일시판매중지(2022.02.14 부터)<br>';
          innerHtml +=    '※ 판매 재개시 재공지 드리겠습니다.';
          innerHtml += '</span>';

      targetArea.find("li").each(function(i){
          var _this = jQuery(this);
          stopIds.forEach(function(v,i){
              if( _this.find("a").length ){
                  if(  _this.find("a").attr("href").indexOf(v) > -1 ){
                      _this.find(".product-tit").append(innerHtml); 
                  }
              }
          });
      }); */
    /* 상품&가입 페이지 목록 금리 히든처리 220525 / 1479088:하나의 정기예금 
    var stopIds = [1445172];
    var targetArea = jQuery(".wrap-product-list .product-list");
    var detail = jQuery(".wrap-product-list .product-list").find('.desc-detail')

    var datail_Year = new Date().getFullYear();
    var datail_month = new Date().getMonth() + 1;
    datail_month = datail_month < 10 ? '0' + datail_month : datail_month;
    var datail_day = new Date().getDate();
    datail_day = datail_day < 10 ? '0' + datail_day : datail_day;
    var datail_hours = new Date().getHours();
    datail_hours = datail_hours < 10 ? '0' + datail_hours : datail_hours;
    var datail_minutes = new Date().getMinutes();
    datail_minutes = datail_minutes < 10 ? '0' + datail_minutes : datail_minutes;
    var result = datail_Year + datail_month + datail_day + datail_hours + datail_minutes;

    //  왼쪽시간 부터 && 오른쪽 시간까지 활성화 (타이머)
    if (result > '202205261055' && result < '202205261100') {
        targetArea.find("li").each(function (i) {
            var _this = jQuery(this);
            stopIds.forEach(function (v, i) {
                if (_this.find("a").length) {
                    if (_this.find("a").attr("href").indexOf(v) > -1) {
                        _this.find(detail).css({ 'display': 'none', })
                    }
                }
            });
        });
    }*/


    /* 신탁 링크 수정 */
    var trustArea = jQuery(".wrap-product-list .product-list");
    var changeIds = ["1479338"];
    trustArea.find(".item.type3").each(function (i) {
        var _this = jQuery(this);
        changeIds.forEach(function (w, i) {
            if (_this.find("a").length) {
                if (_this.find("a").attr("href").indexOf(w) > -1) {
                    _this.find("a").prop("href", "https://m.kebhana.com/cont/hidden/livingtrust/index.html");
                }
            }
        });
    });








});