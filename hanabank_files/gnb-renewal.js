jQuery(document).ready(function() {
	var hostAddr = window.location.hostname; 
	var imgDir = "https://image.kebhana.com";				// 운영

	if(hostAddr.indexOf("dev11") > -1) {
		imgDir = "https://dev11-image.kebhana.com:18380";	// 개발
	} else if(hostAddr.indexOf("stg11") > -1) {
		imgDir = "https://stg11-image.kebhana.com:18380";	// 품질
	}

	// 2021.08.31 추가 : GNB 영역 - 상단 로그인정보
	jQuery('#header.renewal2021 .language a').click(function() {	// *다국어선택 셀렉트박스 클릭 시
		if(!jQuery(this).hasClass('open')) {
			jQuery(this).addClass('open');
			jQuery(this).children('img').attr('src', imgDir + '/pbk/resource/simple/img/renewal/icon-20-arrow-top-000.png');
			jQuery(this).children('img').attr('alt', '닫기');
			jQuery(this).siblings('.language__select').slideDown(500);
		} else {
			jQuery(this).removeClass('open');
			jQuery(this).children('img').attr('src', imgDir + '/pbk/resource/simple/img/renewal/icon-20-arrow-down-000.png');
			jQuery(this).children('img').attr('alt', '열기');
			jQuery(this).siblings('.language__select').slideUp(500);
		}
	});

	jQuery('#header.renewal2021 .user .symbol').click(function() {	// *피싱방지 이미지 클릭 시 피싱방지 설정정보 출력 or 설정 페이지 이동
		if (jQuery('#header.renewal2021 .tooltip').length > 0) {
			jQuery('#header.renewal2021 .tooltip').slideToggle(500);
		} else {
			pbk.web.util.goRefreshMenu('/myhana/prevent/wpcus402_151t.do');
		}
	});

	// 2021.08.31 추가 : GNB 영역 - 메뉴
	jQuery('.gnb.renewal2021 .depth1 > li > a').on('mouseover focus', function() {	// *대메뉴 포커싱 되었을 경우, 하위메뉴 보이기
		jQuery('.gnb.renewal2021 .depth1 > li').removeClass('active')
		jQuery('.submenu').hide();
		jQuery('.gnb.renewal2021').find('.submenu--bg').hide();
		jQuery(this).parent().addClass('active');

		if(jQuery(this).siblings('.submenu').length) {
			var thisHeight = jQuery(this).parent().find('.submenu').height();

			jQuery(this).siblings('.submenu').show();			
			jQuery('.gnb.renewal2021').find('.submenu--bg').show();

			jQuery('.gnb.renewal2021').find('.submenu--bg').stop().animate({'height' : thisHeight - 30}, 0, function() {
				jQuery('.gnb.renewal2021').find('.submenu--bg').stop().animate({'height' : thisHeight}, 300)
			});
		}

		jQuery(this).parents('#header.renewal2021').find('.tooltip').slideUp(500);			// 피싱방지 설정정보 툴팁
		jQuery(this).parents('#header.renewal2021').find('.language__select').slideUp(500);	// 다국어선택
		jQuery(this).parents('#header.renewal2021').find('.mymenu').slideUp(500);			// 나의메뉴
		jQuery(this).parents('#header.renewal2021').find('.search_area').slideUp(500);		// 검색
	});

	jQuery('.gnb.renewal2021 .depth1 > li').on('mouseleave', function() {	// *대메뉴 포커싱 아웃 되었을 경우, 하위메뉴 숨기기
		jQuery(this).removeClass('active');
		jQuery(this).find('.submenu').hide();
		jQuery('.gnb.renewal2021').find('.submenu--bg').hide();
		jQuery('.gnb.renewal2021').find('.submenu--bg').height('442px');

		if(jQuery(this).siblings('li').hasClass('active')){
			var thisHeight = jQuery(this).siblings('.active').find('.submenu').height();

			jQuery(this).siblings('.submenu').show();			
			jQuery('.gnb.renewal2021').find('.submenu--bg').show();

			jQuery('.gnb.renewal2021').find('.submenu--bg').stop().animate({'height' : thisHeight - 30}, 0, function() {
				jQuery('.gnb.renewal2021').find('.submenu--bg').stop().animate({'height' : thisHeight}, 300)
			})
		}
	});

	jQuery('.gnb.renewal2021 .depth1 > li:last-child').on('focusout', function() {
		jQuery(this).removeClass('active');
	});

	// 2021.10.27 추가 : GNB 영역 - 대메뉴 접근성 추가
	jQuery('.gnb.renewal2021 .depth2 > li:last-child .depth2__upper > a').on('focusout', function() {
		var $thisEl = jQuery(this);

		if($thisEl.siblings('.depth3').length){
			$thisEl.siblings('.depth3').children('li').last().find('a').on('focusout', function() {
				jQuery(this).parents('.depth1').find('li').removeClass('active');
				jQuery(this).parents('.submenu').hide();

				jQuery('.gnb.renewal2021').find('.submenu--bg').hide();
				jQuery('.gnb.renewal2021').find('.submenu--bg').height('442px');
			})
		}else{
			jQuery(this).parents('.depth1').find('li').removeClass('active');
			jQuery(this).parents('.submenu').hide();

			jQuery('.gnb.renewal2021').find('.submenu--bg').hide();
			jQuery('.gnb.renewal2021').find('.submenu--bg').height('442px');
		}
	});

	// 2021.08.31 추가 : GNB 영역 - 나의메뉴
	jQuery('#header.renewal2021 .mymenu_btn > a').on('click', function() {	// *나의메뉴 버튼 클릭 시
		jQuery('.mymenu').toggle();
	});

	jQuery('#header.renewal2021 .mymenu > li > a').click(function() {	// *나의 메뉴 탭 클릭 시
		jQuery(this).parent().addClass('active').siblings().removeClass('active');
	});

	// 2021.09.02 추가 : GNB 영역 - 검색
	jQuery('#header.renewal2021 .search_btn > a').click(function() {	// *검색 버튼 클릭 시, 검색영역 보이기
		if(!jQuery(this).hasClass('active')) {
			jQuery(this).addClass('active');

			jQuery('#header.renewal2021 .search_area').slideDown(500);
		} else {			
			jQuery(this).removeClass('active');

			jQuery('#header.renewal2021 .search_area input').val('');
			jQuery('#header.renewal2021 .search_area .btn--del').hide();
			jQuery('#header.renewal2021 .search_area .btn--search').attr("disabled", true);

			jQuery('#header.renewal2021 .search_area').slideUp(500);
		}
	});

	jQuery('#header.renewal2021 .search_area input').keyup(function() {	// *검색 입력칸 keyup, 입력데이터 삭제버튼 및 placeholder 처리
		if (jQuery(this).val() == '') {
			jQuery(this).parent().siblings('.btn_area').find('.btn--search').attr("disabled", true);
			jQuery(this).siblings('.btn--del').hide();
		} else {
			jQuery(this).parent().siblings('.btn_area').find('.btn--search').attr("disabled", false);
			jQuery(this).siblings('.btn--del').show();
			jQuery(this).attr('placeholder', '검색어를 입력해 주세요.');
		}
	}).focus(function() {
		jQuery(this).attr('placeholder', '');
	}).blur(function() {		
		jQuery(this).attr('placeholder', '검색어를 입력해 주세요.');
	});
	
	jQuery('#header.renewal2021 .search_area .btn--del').click(function() {	// *검색 데이터 삭제 버튼 클릭 시
		jQuery(this).siblings('input').val('');
		jQuery(this).siblings('input').focus();

		jQuery('#header.renewal2021 .search_area .btn--search').attr("disabled", true);

		jQuery(this).hide();
	});

	// 2021.09.09 추가 : GNB 영역 - divide line interaction
	jQuery('.divide--line').animate({'width':'100%'}, 3000, 'swing');
	
	// 2021.09.02 추가 : GNB 영역 - 전체메뉴
	jQuery('#header.renewal2021 .allmenu_btn > a').click(function() {	// *전체메뉴 버튼 클릭 시
		jQuery('.allmenu_container').show();
		jQuery('html, body').css({'overflow' : 'hidden'});
	});

	jQuery('.allmenu_container .allmenu .close_btn').click(function() {	// *전체메뉴 닫기 버튼 클릭 시
		jQuery('.allmenu_container').hide();
		jQuery('html, body').css({'overflow' : 'auto'});
	});

	jQuery('.menu__list .depth1 > li').click(function(e) {	// *전체메뉴 depth1 메뉴 클릭 시, depth2 메뉴 보이기
		if(jQuery(this).parent('.depth1').hasClass('first-depth')){
			var textVal = jQuery(this).children('a').text().trim();
			var linkURL = jQuery(this).children('a').attr('href');

			if(linkURL != "#//HanaBank"){
				location.href = linkURL;
				return false;
			}
			
			return false;
		}else{
			e.stopPropagation();

			jQuery(this).parent('.depth1').find('.depth2').toggle();
			jQuery(this).parent('.depth1').children('li').children('a').children('.btn--collapse').toggleClass('close');
			
			if(jQuery(this).parent('.depth1').children('li').children('a').children('.btn--collapse').hasClass('close')) {
				jQuery(this).parent('.depth1').children('li').children('a').children('.btn--collapse').attr('title','닫기');
			} else {
				jQuery(this).parent('.depth1').children('li').children('a').children('.btn--collapse').attr('title','열기');
			}
		}
	});

	jQuery('.menu__list .depth2 > li').click(function(e) {	// *전체메뉴 depth2 메뉴 클릭 시, depth3 메뉴 보이기
		e.stopPropagation();

		jQuery(this).find('.depth3').toggle();
		jQuery(this).children('a').children('.btn--collapse').toggleClass('close');
		
		if(jQuery(this).children('a').children('.btn--collapse').hasClass('close')) {
			jQuery(this).children('a').children('.btn--collapse').attr('title','닫기');
		} else {
			jQuery(this).children('a').children('.btn--collapse').attr('title','열기');
		}
	});

	jQuery('.menu__list .depth3 > li').click(function(e) {	// *전체메뉴 depth3 메뉴 클릭 시, depth4 메뉴 보이기
		e.stopPropagation();

		jQuery(this).find('.depth4').toggle();
		jQuery(this).siblings().find('.depth4').hide();
		jQuery(this).addClass('active').siblings().removeClass('active');
		jQuery(this).children('a').children('.btn--collapse').toggleClass('close');
		jQuery(this).siblings().children('a').children('.btn--collapse').removeClass('close');
	});

	jQuery('.menu__list .depth4 > li').click(function(e) {
		e.stopPropagation();
	});
	
	// 2021.09.06 추가 : GNB 영역 - 전체메뉴 (검색) 
	jQuery('.search__result').hide();
	
	jQuery('.allmenu_container .searchwrap input').focus(function() {	// *전체메뉴 검색 input 포커싱
		jQuery('.searchwrap').addClass('focus');
	});

	jQuery('.allmenu_container .searchwrap input').keyup(function() {	// *전체메뉴 검색 input 입력 시
		var value = jQuery(this).val();
		
		if(!value == '') {
			jQuery(this).siblings('.btn--del').show();				
		} else {
			jQuery(this).siblings('.btn--del').hide();	
		}
		
		var results = jQuery('.allmenu_container .depth2 a:contains("' + value + '")');
		
		jQuery('.search__result li').remove();

		results.each(function (index, item) {
			var li = jQuery(item).clone();
			jQuery('.search__result').append(li);
		});

		jQuery('.search__result a').wrap("<li></li>");
		
		jQuery('.search__result a').each(function() {
			var t = jQuery(this).text();
			jQuery(this).html(t.replace(value, "<strong>" + value + "</strong>"))
		})

		if(!results.length) {
			var emptyLi = '<li class="result--empty"><span>검색 결과가 없습니다.</span></li>'
			jQuery('.search__result').append(emptyLi);
		}

		if(jQuery('.search__result li').length > 0) {
			jQuery('.search__result').show();
		} else {				
			jQuery('.search__result').hide();
		}
		
		if(value == '') {
			jQuery('.search__result li').remove();
			jQuery('.search__result').hide();
		};
	});
	
	jQuery('.allmenu_container .searchwrap .btn--del').click(function() {	// *전체메뉴 검색 데이터 삭제 버튼 클릭 시
		jQuery(this).siblings('input').val('');
		jQuery('.search__result li').remove();
		jQuery('.search__result').hide();
		jQuery(this).hide();
	});
	
	jQuery(document).click(function(e) {
		if(!jQuery('#header.renewal2021 .user .symbol').has(e.target).length) {
			jQuery('#header.renewal2021 .tooltip').slideUp(500);
		}

		if(!jQuery('#header.renewal2021 .language').has(e.target).length) {
			jQuery('#header.renewal2021 .language a').removeClass('open');
			jQuery('#header.renewal2021 .language a').children('img').attr('src', imgDir + '/pbk/resource/simple/img/renewal/icon-20-arrow-down-000.png');
			jQuery('#header.renewal2021 .language a').children('img').attr('alt', '열기')
			jQuery('#header.renewal2021 .language a').siblings('.language__select').slideUp(500);
		}

		if(!jQuery('#header.renewal2021 .mymenu_btn').has(e.target).length) {
			jQuery('#header.renewal2021 .mymenu').hide();
		}
		
		if(!jQuery('#header.renewal2021 .search_btn').has(e.target).length) {
			jQuery('#header.renewal2021 .search_btn a').removeClass('active');

			jQuery('#header.renewal2021 .search_area input').val('');
			jQuery('#header.renewal2021 .search_area .btn--del').hide();
			jQuery('#header.renewal2021 .search_area .btn--search').attr("disabled", true);

			jQuery('#header.renewal2021 .search_area').slideUp(500);
		}

		if(!jQuery('.allmenu_container .searchwrap').has(e.target).length) {
			jQuery('.search__result li').remove();
			jQuery('.searchwrap').removeClass('focus');

			jQuery('.searchwrap').find('input').val('');
			jQuery('.searchwrap').find('.btn--del').hide();

			jQuery('.search__result').hide();
		}

		if(!jQuery('#header.renewal2021 .search_area').has(e.target).length) {
			jQuery('#header.renewal2021 .search_area input').val('');
		}
	});
});