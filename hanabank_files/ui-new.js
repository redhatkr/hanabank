
//[S]2019-03-19 수정
/* all btn toggle */
var toggleBtn = function () {
	//[S]2019-03-21 추가
	jQuery('.btn-language > a').each(function(){
		jQuery(this).attr('aria-expanded','false');
	});
	jQuery('.family-wrap > a').each(function(){
		jQuery(this).attr('aria-expanded','false');
	});
	//[E]2019-03-21 추가
	jQuery(document).on('click','.hana-body a,.hana-body button', function (e) {
		var btnName = jQuery(this).find('.btn').text();
		var toggleCont = jQuery(this).parent('')
		var target = e.target || e.srcElement;
		if (jQuery(this).find('.btn').length > 0) {
			jQuery(this).toggleClass('tG');
			e.preventDefault();
			if (toggleCont.hasClass('btn-language') || toggleCont.hasClass('family-wrap')){
				if (jQuery(this).hasClass('tG')){
					toggleCont.addClass('active');
					//[S]2019-03-21 수정
					jQuery(this).attr({
						'title':btnName +' 리스트 닫기',
						'aria-expanded':'true'
					});
					//[E]2019-03-21 수정
				}else{
					toggleCont.removeClass('active');
					//[S]2019-03-21 수정
					jQuery(this).attr({
						'title':btnName +' 리스트 열기',
						'aria-expanded':'false'
					});
					//[E]2019-03-21 수정
				}
			}else{
				if (jQuery(this).parent('').hasClass('active')) {
					jQuery(this).parent('').removeClass('active')
					if(jQuery(target).is('.all-menu > a')) {
						allMenuDim.close();
					}
					if(jQuery(target).is('.btn-notice')) {
						myhanaChangeHeight.close();
					}
					//[S]2019-03-21 수정
					if(jQuery(target).is('.btn-language > a')) {
						jQuery('.btn-language > a').attr({
							'title':btnName +' 리스트 열기',
							'aria-expanded':'false'
						});
					}
					//[E]2019-03-21 수정

					if(jQuery(target).is('.family-wrap > a')) {
						//[S]2019-03-21 수정
						jQuery('.family-wrap > a').attr({
							'title':btnName +' 리스트 열기',
							'aria-expanded':'false'
						});
					}//[E]2019-03-21 수정
				} else {
					jQuery(this).parent('').addClass('active')
					if(jQuery(target).is('.all-menu > a')) {
						allMenuDim.open();
					}
					if(jQuery(target).is('.btn-notice')) {
						myhanaChangeHeight.open();
					}
					if(jQuery(target).is('.btn-language > a')) {
						//[S]2019-03-21 수정
						jQuery('.btn-language > a').attr({
							'title':btnName +' 리스트 닫기',
							'aria-expanded':'true'
						});//[E]2019-03-21 수정
					}

					if(jQuery(target).is('.family-wrap > a')) {
						//[S]2019-03-21 수정
						jQuery('.family-wrap > a').attr({
							'title':btnName +' 리스트 닫기',
							'aria-expanded':'true'
						});
						//[E]2019-03-21 수정
					}
				}			
			}
		}
	})
//[E]2019-03-19 수정
	
	jQuery(document).on('click','.btn-layer-close', function (e) {
		var toggleCont = jQuery(this).parent('')
		e.preventDefault();
		toggleCont.parent('').removeClass('active')
		toggleCont.parent('').find('.tG').removeClass('tG').focus();
	})

}

/* myhana alarm tab */
var myhanaChangeHeight = {
	open : function (){
		var contNoticeH = jQuery('.myhana-top-welcome .layer-notice-area').innerHeight();
		var changeTop = jQuery('.hana-myhana .myhana-visual .visual-content .my-all-asset');
		changeTop.css('margin-top', contNoticeH + 40);
	},
	close : function (){
		var changeTop = jQuery('.hana-myhana .myhana-visual .visual-content .my-all-asset');
		changeTop.css('margin-top', 70);
	}
}

/* all menu */
var toggleBtnHide = function () {
	var toggleCont = jQuery('.my-menu > a,.all-menu > a,.btn-language > a')
	toggleCont.parent('').removeClass('active')
	//[S]2019-03-19 추가
	if(toggleCont.is('.btn-language > a')) {
		var btnName = jQuery('.btn-language > a').find('.btn').text();
		//[S]2019-03-21 수정
		jQuery('.btn-language > a').attr({
			'title':btnName +' 리스트 열기',
			'aria-expanded':'false'
		});
		//[E]2019-03-21 수정
	}
	//[E]2019-03-19 추가
	allMenuDim.close();
}

var allMenuDim = {
	open : function (){
		var dimmedLayer = jQuery('.all-menu')
		dimmedLayer.each(function () {
			jQuery('#wrap').append('<div class="allmenuDim"></div>')

		});
	},
	close : function (){
		var dimmedLayer = jQuery('.all-menu')
		dimmedLayer.each(function () {
			jQuery('#wrap').find('.allmenuDim').remove()
		});
	}
}

var allMenuAction = function (){
	var allMenuDepth3 = function () {
		var lnbDep1 = jQuery('.all-menu .depth2 > li')
		lnbDep1.each(function (){
			if (jQuery(this).find('.depth3').length > 0) {
				jQuery(this).addClass('depIn')
			}
		})
		if (lnbDep1.find('.depth3').length > 0) {
			lnbDep1.find('>a').on('click',function (e) {
				e.preventDefault(e);
				if(jQuery(this).parent('').hasClass('on')){
					jQuery(this).parent('').removeClass('on')
				} else {
					jQuery(this).parent('').addClass('on')
				}
			})
		}
	}();

	var allMenuDepth4 = function () {
		var lnbDep2 = jQuery('.all-menu .depth3 > li')
		lnbDep2.each(function (){
			if (jQuery(this).find('.depth4').length > 0) {
				jQuery(this).addClass('depIn')
			}
		})
		if (lnbDep2.find('.depth4').length > 0) {
			lnbDep2.find('>a').on('click',function (e) {
				e.preventDefault(e);
				if(jQuery(this).parent('').hasClass('on')){
					jQuery(this).parent('').removeClass('on')
				} else {
					jQuery(this).parent('').addClass('on')
				}
			})
		}
	}();
}

/* lnb */
var lnbDepth1 = function () {
	var lnbDep1 = jQuery('#lnb .depth1 > li')
	if (lnbDep1.find('.depth2').length > 0) {
		lnbDep1.find('>a').on('click',function (e) {
			e.preventDefault(e);
		})
	}
}

var lnbDepth2 = function () {
	var lnbDep2 = jQuery('#lnb .depth2 > li')
	if (lnbDep2.find('.depth3').length > 0) {
		lnbDep2.find('>a').on('click',function (e) {
			e.preventDefault(e);
		})
	}
}

var lnbAction = function (){
	jQuery('#lnb .depth1 > li > a').click(function () {
		if (!jQuery(this).parent().hasClass('on')) {
			if(jQuery(this).attr("onclick") != undefined){
				jQuery("#lnb .depth3 > li").removeClass("on");
				jQuery("#lnb .depth2 > li").removeClass("on");
			}
			jQuery(this).parent().addClass('on').siblings().removeClass('on');
		}
	});

	jQuery('#lnb .depth2 > li > a').click(function () {
		if (!jQuery(this).parent().hasClass('on')) {
			if(jQuery(this).attr("onclick") != undefined){
				jQuery("#lnb .depth3 > li").removeClass("on");
				jQuery("#lnb .depth2 > li").removeClass("on");
			}
			jQuery(this).parent().addClass('on').siblings().removeClass('on');
		}
	});
	jQuery('#lnb .depth3 > li > a').click(function () {
		if (!jQuery(this).parent().hasClass('on')) {
			if(jQuery(this).attr("onclick") != undefined){
				jQuery("#lnb .depth3 > li").removeClass("on");
				jQuery("#lnb .depth2 > li").removeClass("on");
			}
			jQuery(this).parent().addClass('on').siblings().removeClass('on');
			jQuery(this).parent().parent().parent().addClass("on").siblings().removeClass("on");
		}
	});
}

/* gnb */
var gnbAction = function () {
	var gnbDep1 = jQuery('#gnb .depth1 > li')
	var gnbDep2 = jQuery('#gnb .depth2 > li')
	gnbDep1.on('mouseenter focusin',function () {
		gnbDep1.removeClass('on');
		jQuery(this).addClass('on');
		toggleBtnHide();
	});
	gnbDep2.on('mouseenter focusin',function () {
		gnbDep2.removeClass('on');
		jQuery(this).addClass('on');
	});
	gnbDep1.on('mouseleave focusout',function () {
		jQuery(this).removeClass('on');
	});
	gnbDep2.on('mouseleave focusout',function () {
		jQuery(this).removeClass('on');
	});
	// jQuery('#gnb .depth2 > li:nth-of-type(7n+1)').addClass('clear-left')
	gnbDep2.each(function () {
		if (jQuery(this).find('.depth3').length > 0) {
			jQuery(this).find('>a').addClass('depthin')
		}

	})
}

var gnbCloseAction  = function () {
	var gnbDep1 = jQuery('#gnb .depth1 > li')
	gnbDep1.removeClass('on');

}


/* utilbar */
var utilAction = function () {
	var utilBar = jQuery('#util > .util')
	var utilOpener = jQuery('.btn-sidebar')
	var utilOpener2 = jQuery('.mymenu-area')
	var utilOpener3 = jQuery('.mybox-area')
	var kebGo = jQuery('.keb-go')


	utilOpener.click(function (e) {
		utilBar.toggleClass('open')
		/*웹접근성조치-유틸바메뉴열기/닫기, 2018-03-13*/
		if(utilBar.hasClass("open")) jQuery(".btn-sidebar").find("span").text("유틸 메뉴 닫기");
		else jQuery(".btn-sidebar").find("span").text("유틸 메뉴 열기");
		e.preventDefault(e);
		utilOpener2.removeClass('inactive')
		utilOpener3.removeClass('active')
		jQuery('.mymenu-area').find('.pop').removeClass('show');
		utilOpener3.find('.title').addClass('unBind')
	})
	utilOpener2.find('.title').click(function (e) {
		e.preventDefault(e);
		if (utilBar.hasClass('open')) {
			if (!jQuery('.mymenu-area').find('.pop').hasClass('show')) {
				if (!utilOpener2.hasClass('inactive')) {
					jQuery('.mymenu-area').find('.pop').addClass('show');
				}
			} else {
				jQuery('.mymenu-area').find('.pop').removeClass('show');
			}
		}
		if (!utilBar.hasClass('open')) {
			utilBar.addClass('open')
		}
		utilOpener2.removeClass('inactive')
		utilOpener3.removeClass('active')
		utilOpener3.find('.title').addClass('unBind')
	})
	utilOpener3.find('.title').click(function (e) {
		jQuery('.mymenu-area').find('.pop').removeClass('show');
		if (utilBar.hasClass('afl')) {
			utilBar.addClass('open')
		}
		if (utilBar.hasClass('open')) {
			utilOpener2.addClass('inactive')
			utilOpener3.addClass('active')
			if(jQuery(this).hasClass('unBind')){
				e.preventDefault(e);
			}
			if (!jQuery(this).hasClass('aflogin')){
				utilOpener3.find('.title').removeClass('unBind')
			}
		}
	})
	kebGo.find('.title').click(function (e) {
		if (utilBar.hasClass('open')) {
			e.preventDefault(e);
			kebGo.find('.pop').toggleClass('show')
		}
	})

	var utilHeight = jQuery('#util > .util .util-layout').outerHeight();
	jQuery(window).on('scroll resize', function (){
		var windowHeight = jQuery(window).height();
		var windowScrollTop = jQuery(window).scrollTop();
		if (windowHeight > utilHeight) {
			if (windowScrollTop >= 139) {
				utilBar.css({
					'top':windowScrollTop - 139 +'px'
				})
			} else {
				utilBar.css({
					'top':0
				})
			}
		} else {
			utilBar.css({
				'top':0
			})
		}
	})
}

/* faq & agree */
var uiToggle  = function () {
	faqList = jQuery('.faq-cert-list');
	faqList.find('a').click(function(e) {
		e.preventDefault();
		faqList.find('dt').removeClass('active')
		jQuery(this).parent('').addClass('active');
	});
	
	/* 접근성 수정 시작 */
	agreeList = jQuery('.terms-condition-agree, .koa-terms-condition-agree').not('.only1');
	agreeListOnly1 = jQuery('.terms-condition-agree.only1, .koa-terms-condition-agree.only1');

	var agreeValidation = function () {
		var inputLength = agreeList.find('.t-label input:checked').length;
		var inputAllLength = agreeList.find('.t-label input').length;
		if (inputLength == inputAllLength) {
			agreeAll.find('.chg-text').text('전체해제');
			agreeAll.find('label').addClass('agall');
			agreeAll.find('input').prop('checked',true).addClass('inpck');
		}
	}
	agreeList.find('dt > a').click(function(e) {
		e.preventDefault();
		if (jQuery(this).parent('').hasClass('active')) {
			jQuery(this).parent('').removeClass('active');
			jQuery(this).parent('').parent('').find('dd').removeAttr("tabIndex").css("display","none");
		} else {
			agreeList.find('dt').removeClass('active');
			agreeList.find('dd').removeAttr("tabIndex").css("display","none");
			jQuery(this).parent('').addClass('active');
			jQuery(this).parent('').find('.t-label').show();
			jQuery(this).parent('').find('.t-link').hide();
			jQuery(this).parent('').find('input').prop('checked',true).addClass('inpck');
			jQuery(this).parent('').parent('').find('.t-label').find('.chg-text').text('동의함');
			jQuery(this).parent('').parent('').find('dd').attr("tabIndex", 0).css("display","block");
		}
		agreeValidation();
	});
	
	agreeAll = agreeList.find('.agree-all');
	agreeAll.find('.check-style-type input').attr("role","button");	

	agreeAll.find('.check-style-type input').click(function () {
		if (!jQuery(this).prop('checked')) {	
			agreeList.find('.t-label').hide();
			agreeList.find('.t-link').show();
			agreeList.find('dl input').prop('checked',false).removeClass('inpck');
			agreeList.find('dl input').parent('').find('.chg-text').text('동의안함');
			//agreeList.find('dl input').prop('disabled',false).removeClass('inpck');			
			jQuery(this).parent('').find('.chg-text').text('전체동의');
			jQuery(this).parent('').find('label').removeClass('agall');			
		} else {	
			agreeList.find('.t-label').show();
			agreeList.find('.t-link').hide();
			agreeList.find('dl input').prop('checked',true).addClass('inpck');
			agreeList.find('dl input').parent('').find('.chg-text').text('동의함');
			//agreeList.find('dl input').prop('disabled',true).addClass('inpck');	
			jQuery(this).parent('').find('.chg-text').text('전체해제');
			jQuery(this).parent('').find('label').addClass('agall');			
		}
	});
	
	//agreeAll.find('.check-style-type span').attr("tabIndex", 0);	
	//agreeAll.find('.check-style-type input').unbind("keydown");

	agreeAll.find('.check-style-type input').keydown(function (e) {
		if (e.keyCode == 13) {
			agreeAllInput = agreeAll.find('.check-style-type input');
			if (jQuery(agreeAllInput).is(':checked')) {				
				agreeList.find('.t-label').hide();
				agreeList.find('.t-link').show();
				agreeList.find('dl input').prop('checked',false).removeClass('inpck');
				agreeList.find('dl input').parent('').find('.chg-text').text('동의안함');
				//agreeList.find('dl input').prop('disabled',false).removeClass('inpck').css("display","block");
				jQuery(agreeAllInput).prop('checked',false);
				jQuery(agreeAllInput).removeClass('inpck');
				jQuery(agreeAllInput).parent('').find('.chg-text').text('전체동의');
				jQuery(agreeAllInput).parent('').find('label').removeClass('agall');
			} else  {
				agreeList.find('.t-label').show();
				agreeList.find('.t-link').hide();
				agreeList.find('dl input').prop('checked',true).addClass('inpck');
				agreeList.find('dl input').parent('').find('.chg-text').text('동의함');
				//agreeList.find('dl input').prop('disabled',true).addClass('inpck').css("display","none");
				jQuery(agreeAllInput).prop('checked',true)
				jQuery(agreeAllInput).addClass('inpck');
				jQuery(agreeAllInput).parent('').find('.chg-text').text('전체해제');
				jQuery(agreeAllInput).parent('').find('label').addClass('agall');
			}
		}
	});
		
	agreeList.find('dl input').attr("role","button");

	agreeList.find('dl input').change(function() {
		var inputLength = agreeList.find('.t-label input:checked').length;
		var inputAllLength = agreeList.find('.t-label input').length;
		if (inputLength == inputAllLength) {
			agreeAll.find('.chg-text').text('전체해제');
			agreeAll.find('label').addClass('agall');
			agreeAll.find('input').prop('checked',true).addClass('inpck');
		} else {
			agreeAll.find('.chg-text').text('전체동의');
			agreeAll.find('label').removeClass('agall');
			agreeAll.find('input').prop('checked',false).removeClass('inpck');
		}
		if(jQuery(this).prop("checked")) {
			jQuery(this).click().prop('checked',true).addClass('inpck');
			jQuery(this).parent('').find(".chg-text").text('동의함');
		} else {
			jQuery(this).click().prop('checked',false).removeClass('inpck');
			jQuery(this).parent('').find(".chg-text").text('동의안함');
		}
	});

	//agreeList.find('dl input').unbind("keydown");

	agreeList.find('dl input').keydown(function(e) {
		if (e.keyCode == 13) {
			if(jQuery(this).prop('checked')) {
				jQuery(this).click().prop('checked',false).removeClass('inpck');
				jQuery(this).parent('').find('.chg-text').text('동의안함');
			} else {
				jQuery(this).click().prop('checked',true).addClass('inpck');
				jQuery(this).parent('').find('.chg-text').text('동의함');
			}
		}
	});

	//agreeList.find('.t-label label').click(function (){
		//if (jQuery(this).parent('').find('input').prop('checked',true)) {
			//jQuery(this).parent('').find('.chg-text').text('동의함');
			//jQuery(this).prev('input').prop('disabled',true)
		//}
		//agreeValidation();
	//});

	agreeListOnly1.find('a').click(function(e) {
		if (!jQuery(this).parent('').parent('').hasClass('no-dd')) {
			e.preventDefault();
		}
		if (jQuery(this).parent('').hasClass('active')) {
			jQuery(this).parent('').removeClass('active');
			jQuery(this).find('.chg-text').text('내용보기');
		} else {
			agreeList.find('dt').removeClass('active');
			jQuery(this).parent('').addClass('active');
			jQuery(this).find('.chg-text').text('내용닫기');
		}
	});			
	/* 접근성 수정 끝 */

}

var accessInfoList = function (){
	accessList = jQuery('.layer-access-info li.item');
	accessList.find('a').click(function(e) {
		e.preventDefault();
		if (jQuery(this).parent('').hasClass('active')) {
			jQuery(this).parent('').removeClass('active');
		} else {
			accessList.removeClass('active');
			jQuery(this).parent('').addClass('active');
		}
	})
}


/* tab & tab-content */
var tabContentView = function () {
	var btnTab = jQuery('.tabmenu-area .tab-menu a');
	var contTab = jQuery('.tabmenu-area .tab-content');

	btnTab.click(function (e){
		e.preventDefault();

		//tab
		btnTab.parent('').removeClass('active');
		jQuery(this).parent('').addClass('active');
		btnTab.removeAttr('title','');
		jQuery(this).attr('title','current tab');

		//content
		contTab.removeClass('active')
		jQuery(this.hash).addClass('active')
	});
}

/* input validation */
var inputValidation = function () {
	var valInput = jQuery('.input-focus-wrap input[type="text"],.input-focus-wrap input[type="tel"],.input-focus-wrap input[type="password"],.input-focus-wrap select');
	jQuery(document).on('focusin keypress keydown','.input-focus-wrap input[type="text"],.input-focus-wrap input[type="tel"],.input-focus-wrap input[type="password"],.input-focus-wrap select', function () {
		if (jQuery(this).val().length >= 0) {
			jQuery(this).addClass('valIn2');
			jQuery(this).removeClass('valIn');
		} else {
			jQuery(this).removeClass('valIn')
			jQuery(this).removeClass('valIn2')
		}
	})
	jQuery(document).on('focusout','.input-focus-wrap input[type="text"],.input-focus-wrap input[type="tel"],.input-focus-wrap input[type="password"],.input-focus-wrap select', function () {
		if (jQuery(this).val().length > 0 || jQuery(this).text().length > 0) {
			jQuery(this).addClass('valIn');
			jQuery(this).removeClass('valIn2');
		} else {
			jQuery(this).removeClass('valIn');
			jQuery(this).removeClass('valIn2');
		}
	})
}

/* checkbox & radio */
var chkCHK = function () {
	var checkboxUI = jQuery('.check-style-type input[type="checkbox"]');
	var radioUI = jQuery('.radio-style-type input');
	jQuery(document).on('click','.check-style-type input[type="checkbox"]', function () {
		if (jQuery(this).prop('checked') == true ){
			jQuery(this).addClass('inpck')
		}else {
			jQuery(this).removeClass('inpck')
		}
	})
	checkboxUI.each(function (){
		if (jQuery(this).prop('checked') == true ){
			jQuery(this).addClass('inpck')
		} else {
			jQuery(this).removeClass('inpck')
		}
	})
	jQuery(document).on('click','.radio-style-type input', function () {
		var radioUIName = jQuery(this).attr('name')
		jQuery('body').find('input[name="'+ radioUIName +'"]').removeClass('inpck');
		jQuery(this).addClass('inpck')

	})
	radioUI.focusin(function (){
		var radioUIName = jQuery(this).attr('name')
		jQuery('body').find('input[name="'+ radioUIName +'"]').removeClass('inpck');
		jQuery(this).addClass('inpck')
	})
	radioUI.each(function (){
		if (jQuery(this).prop('checked') == true ){
			jQuery(this).addClass('inpck')
		}
	});
}

/* check ajax loading (developer only use)*/
var chkReLoad = function () {
	var checkboxUI = jQuery('.check-style-type input[type="checkbox"]');
	var radioUI = jQuery('.radio-style-type input');
	checkboxUI.each(function (){
		if (jQuery(this).prop('checked') == true ){
			jQuery(this).addClass('inpck')
		} else {
			jQuery(this).removeClass('inpck')
		}
	})
	radioUI.each(function (){
		if (jQuery(this).prop('checked') == true ){
			jQuery(this).addClass('inpck')
		}
	});
}

/* select custom box (developer only use)*/
var selectLayer = function (){
	selectBox = jQuery('.select-layer-type .selected-box');
	selectBox.click(function(e) {
		e.preventDefault();
		jQuery(this).parent('').toggleClass('open');
	})
}


/* myhana report calendar */
var toggleCalendar = function () {
	var btn = jQuery('.show-calendar-type > a');

	btn.click(function (e){
		e.preventDefault();

		if(0 == jQuery(btn).index(this)){
			btn.parent('').parent('').parent('').removeClass('active1, active2')
			jQuery(this).parent('').parent('').parent('').addClass('active1')
		}else if(1 == jQuery(btn).index(this)){
			btn.parent('').parent('').parent('').removeClass('active1, active1')
			jQuery(this).parent('').parent('').parent('').addClass('active2')
		}
	})
}


/* mall table toggle */
var agreetoggle = function () {
	jQuery(document).on('click','.agree-option-wrap .check-style-type > input[type="checkbox"].openBtn', function (){
		if (jQuery(this).attr('checked'),true ){
			jQuery(this).parent('').parent('').parent('').toggleClass('active')
		}
	})
}
var rTabAction = function (){
	jQuery(document).on('click','.r-tab .onBtn', function (){
		if (jQuery(this).hasClass('inpck')){
			jQuery(this).parent().parent().parent().addClass('active')
		}
	});
	jQuery(document).on('click','.r-tab .offBtn', function (){
		if (jQuery(this).hasClass('inpck')){
			jQuery(this).parent().parent().parent().removeClass('active')
		}
	})
}

/* mybox rating star */
var rateStar = function () {
	var rateCont = jQuery('.rate-img.rate-check')
	jQuery(document).on('click','.rate-img.rate-check a', function (e) {
		e.preventDefault();
		var rateImg = jQuery(this).parents('.rate-wrap').find('i b')
		if(jQuery(this).hasClass('per20')) {
			rateImg.css('width','20%')
		}
		if(jQuery(this).hasClass('per40')) {
			rateImg.css('width','40%')
		}
		if(jQuery(this).hasClass('per60')) {
			rateImg.css('width','60%')
		}
		if(jQuery(this).hasClass('per80')) {
			rateImg.css('width','80%')
		}
		if(jQuery(this).hasClass('per100')) {
			rateImg.css('width','100%')
		}
	})
}

/*
 * 자산현황 숨기기 버튼 / 2018-11-20
 */
var priceAllView = function(){
	cookiedata = document.cookie;
	if(jQuery(".price-hide-wrap").length){
		jQuery(".price-hide-wrap").each(function(){
			if($("total-asset-div") != null) $("total-asset-div").style.display = "block";
			if($("total-asset-div1") != null) $("total-asset-div1").style.display = "block";
			
			//기본값 자산합계 숨기기 -2019.05.21
			var cookiId = jQuery(this).attr("id"); 
			if(getCookie(cookiId) == "Y"){
				jQuery(this).removeClass("close").addClass("open");	//자산표시중(순 자산 숨기기 버튼)
				$j("#btn_state_open").text("숨기기"); 
				$j("#btn_state_close").text("");
			}else{
				jQuery(this).removeClass("open").addClass("close");	//자산미표시중(순 자산 보이기 버튼)
				$j("#btn_state_open").text("");
				$j("#btn_state_close").text("보이기");
			}
		});
	}
	
	var $priceAllView = jQuery(".price-hide-wrap .btn-price") 
	$priceAllView.on("click",function(){
		var priceId = jQuery(this).closest(".price-hide-wrap").attr("id");
		var todayDate = new Date();
		todayDate.setDate(todayDate.getDate() + Number(1000));
		
		if(jQuery(this).closest(".price-hide-wrap").hasClass("open")){
			//순 자산 숨기기 버튼 클릭
    		document.cookie = priceId + "=" + escape("N") + "; path=/; expires=" + todayDate.toGMTString() + ";";
 			jQuery(this).closest(".price-hide-wrap").removeClass("open").addClass("close"); //자산미표시중(순 자산 보이기 버튼)
 			$j("#btn_state_open").text("");
 			$j("#btn_state_close").text("보이기");
		}else{
			//순 자산 보이기 버튼 클릭
    		document.cookie = priceId + "=" + escape("Y") + "; path=/; expires=" + todayDate.toGMTString() + ";";
 			jQuery(this).closest(".price-hide-wrap").removeClass("close").addClass("open");//자산표시중(순 자산 숨기기 버튼)
 			$j("#btn_state_open").text("숨기기");
 			$j("#btn_state_close").text("");

		}
		
		return false;
	});
}


/*
 * 2021.09.29 추가 : renewal 2021 웹 접근성 처리
 */
var accessValidate = function(el) {
	el.each(function() {
		if(jQuery(this).attr('title') === undefined) {
			var innerText = jQuery(this).text()
			var textTrim = innerText.replace(/[\s\d]*/g, "");

			jQuery(this).attr('title', textTrim);
			
			if(jQuery(this).attr('target') === '_blank') {
				jQuery(this).attr('title', jQuery(this).attr('title') + ' 새 창에서열기');
			}
			
			if(jQuery(this).hasClass('btn--del')) {
				jQuery(this).attr('title', '입력내용 삭제')
			}
			
			if(jQuery(this).find('img').length) {
				var thisTitle = jQuery(this).attr('title');
				var imgAlt = jQuery(this).find('img').attr('alt');
				var newTitle = jQuery.trim(thisTitle) + " " + imgAlt
				
				if(jQuery(this).attr('title') === "") {
					jQuery(this).attr('title', imgAlt)
				}
				
				if(!thisTitle === imgAlt) {
					jQuery(this).attr('title', newTitle);						
				}
			}
			
			if(!!jQuery(this).attr('placeholder')) {
				var placeHolder = jQuery(this).attr('placeholder');

				jQuery(this).attr('title', placeHolder)
			}
		}
	})
}

/**
 * 패스워드 input에 커서표시
 */
var cursorHandle=null;
var cursorHandle2=null;

function cursorPlay(cursorObject){
	
    if(cursorObject.indexOf('secPwd2') != -1){
        if(cursorHandle2==null){
            cursorHandle2=setInterval(function(){ jQuery(cursorObject).toggleClass('bg_cursor'); }, 1000);
        }
        
    }else{
        if(cursorHandle==null){
            cursorHandle=setInterval(function(){ jQuery(cursorObject).toggleClass('bg_cursor'); }, 1000);
        }
    }
}

function cursorStop(cursorObject){
	if(cursorObject.indexOf('secPwd2') != -1){
	    clearInterval(cursorHandle2);
        cursorHandle2=null;
	}else{ 
	    clearInterval(cursorHandle);
	    cursorHandle=null;
	}
}

//function startCursor(){
//    startCursor('paymAcctPw');
//}

function startCursor(cursorObject){
    
    if(cursorObject == null || cursorObject == undefined)
        cursorObject = '#paymAcctPw';
    
    cursorPlay(cursorObject);
    
    jQuery(cursorObject).on('focus', function(e){
        cursorStop(cursorObject);
        $j(cursorObject).removeClass('bg_cursor');
    });
    jQuery(cursorObject).on('blur', function(e){
        var txtVal=jQuery(this).val();
        var txtLeng=txtVal.length;
        
        var limtLeng = 4;
        if(cursorObject.indexOf("OTP") != -1) limtLeng = 6;
        else if(cursorObject.indexOf("secPwd") != -1) limtLeng = 2; 
        else limtLeng = 4;

        if(txtLeng<limtLeng){
            cursorPlay(cursorObject);
         }else if(txtLeng==limtLeng){
                cursorStop(cursorObject);
        }
    });
}


jQuery(document).ready(function() {
	toggleBtn();
    allMenuAction();
    lnbDepth1();
    lnbDepth2();
    lnbAction();
    gnbAction();
    utilAction();
	uiToggle();
    accessInfoList();
    tabContentView();
    inputValidation();
    chkCHK();
    toggleCalendar();
    agreetoggle();
    rTabAction();
    rateStar();
	
	// 2021.09.29 추가 : renewal 2021 웹 접근성 처리 호출 
	accessValidate(jQuery('#header.renewal2021 a, #header.renewal2021 input, #header.renewal2021 button'));
	accessValidate(jQuery('#footer.renewal2021 a, #footer.renewal2021 input, #footer.renewal2021 button'));
	accessValidate(jQuery('.bank-transfer a, .bank-transfer input, .bank-transfer button, .bank-transfer label'));
	accessValidate(jQuery('.transfer-complete a, .transfer-complete button, .transfer-complete label'));
	accessValidate(jQuery('.myinfo_wrap a, .myinfo_wrap button, .myinfo_wrap label'));
});