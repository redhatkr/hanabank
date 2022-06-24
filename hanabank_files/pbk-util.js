var securityPasswdCheck = function(){
    return true;
};

if(!pbk.web) pbk.web={};
if(!pbk.web.util) pbk.web.util={};

var showListCnt     = 15;

/**
 * 뱅크사인용 글로벌 변수 
 */
var bankSignFormObj;
var bankSignJson;
var bankSignCallBack;
if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
  }
var bankSignNonceURL  = window.location.origin + "/wizvera/delfino/svc/delfino_nonce.jsp";
var bankSignNonce = null;

/************************** 마이메뉴 시작 **************************/ 
pbk.web.mymenu = function(){

    var showMenuLinkObj = null;

    return {

        /*마이메뉴 목록 가져오기*/
        showMyMenu : function(){
            var url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/mymenu/wpcus420_02p.do";
            var hanaAjax = new hana.JHanaAjax('', true, true);
            hanaAjax.ajaxSubmit( url, null, true, pbk.web.mymenu.addShowMyMenuFn, 'euc-kr' );
            
        },

        /*마이메뉴목록 가져오기 callback 함수*/
        addShowMyMenuFn : function( res, option ){
            // Json타입으로 변환
            var _data           = eval('(' + res.responseText + ')');
            var myMenuContent   = document.getElementById("myMenuContent");
            var divCnt          = 1;
            var afterAdd        = false; 
            var acctNoList      = _data.userMenuList;
            if(acctNoList != null && acctNoList.length>0){
            	
                var myMenuContentSub = document.createElement('div');
                var myMenuContentSubUl = document.createElement('ul');
                if (opb.common.util.getBrowserInfo().MSIE) {
                	
                    if(acctNoList.length<=5){
                    	
                        myMenuContentSub.className = 'mymenu wid200';
                        //myMenuContentSub.className = 'mymenu';
                        myMenuContentSubUl.className= 'myMList first';
                    }else{
                    	
                        myMenuContentSub.className = 'mymenu pdl25 pdr40 wid200';
                    	//myMenuContentSub.className = 'mymenu pdl25 pdr40 wid100';
                        myMenuContentSubUl.className= 'myMList first';
                    }
                } else {
                    if(acctNoList.length<=5){
                        myMenuContentSub.setAttribute('class', 'mymenu wid200');
                        myMenuContentSubUl.setAttribute('class', 'myMList first');
                    }else{
                    	
                        myMenuContentSub.setAttribute('class', 'mymenu pdl25 pdr40 wid200');
                        myMenuContentSubUl.setAttribute('class', 'myMList first');
                    }
                }
                for(var i = 0; i < acctNoList.length; i++) {
                	
                    afterAdd = true;

                    var myMenuContentSubLi = document.createElement('li');

                    //var myMenuContentSubLiA = document.createElement('a');
                    //myMenuContentSubLiA.setAttribute('href', 'javascript:pbk.web.util.goMenu(\"'+acctNoList[i].urlAdr+'\")');
                    //이미지 사용안함(span으로 변경)
                    /*var myMenuContentSubLiImg = document.createElement('img');
                    myMenuContentSubLiImg.setAttribute('src', pbk.web.mymenu.returnMenuTitle(acctNoList[i].menuCd, "IMG"));
                    myMenuContentSubLiImg.setAttribute('alt', pbk.web.mymenu.returnMenuTitle(acctNoList[i].menuCd, "TITLE"));*/
                    
                    var myMenuContentSubLiSpan = document.createElement('span');
                   // myMenuContentSubLiSpan.setAttribute('class', 'b va_b');
                    myMenuContentSubLiSpan.innerHTML = pbk.web.mymenu.returnMenuTitle(acctNoList[i].menuCd, "TITLE");
                    /**추가(메뉴이름 이미지대신 span으로 처리) start**/ 
                    var myMenuContentSubLiA = document.createElement('a');
                    //myMenuContentSubLiA.setAttribute('href', 'javascript:pbk.web.util.goMenu(\"'+acctNoList[i].urlAdr+'\"); opb.common.layerpopup.closeLayer_fnc(\"PopMenuManage\");');
                    myMenuContentSubLiA.setAttribute('href', '#//HanaBank');
                    myMenuContentSubLiA.setAttribute('id', acctNoList[i].menuNo);
                    var js = "pbk.web.util.goMenu('"+acctNoList[i].urlAdr+"'); opb.common.layerpopup.closeLayer_fnc(\'PopMyMunu\');";
                    myMenuContentSubLiA.onclick = new Function(js);
                    myMenuContentSubLiA.innerHTML = "&nbsp;"+acctNoList[i].menuNm+"";
                    /**추가 End**/
                    myMenuContentSubLi.appendChild(myMenuContentSubLiSpan);
                    myMenuContentSubLi.appendChild(myMenuContentSubLiA);
                    //myMenuContentSubLi.appendChild(myMenuContentSubLiA);            		

                    myMenuContentSubUl.appendChild(myMenuContentSubLi);
                    if(i%5==5-1){
                        myMenuContentSub.appendChild(myMenuContentSubUl);
                        myMenuContent.appendChild(myMenuContentSub);

                        myMenuContentSubUl = null;
                        myMenuContentSubUl = document.createElement('ul');

                        myMenuContentSub = null;
                        myMenuContentSub = document.createElement('div');

                        if (opb.common.util.getBrowserInfo().MSIE) {
                            if(acctNoList.length>5&& acctNoList.length<=10){
                                myMenuContentSubUl.className = 'myMList';
                                myMenuContentSub.className = 'mymenu wid200';
                            }else{
                                if(divCnt==1){
                                    myMenuContentSubUl.className = 'myMList';
                                    myMenuContentSub.className = 'mymenu pdr40 wid200';
                                }else{
                                    myMenuContentSubUl.className = 'myMList';
                                    myMenuContentSub.className = 'mymenu wid200';
                                }
                            }
                        } else {
                            if(acctNoList.length>5&& acctNoList.length<=10){
                                myMenuContentSubUl.setAttribute('class', 'myMList');
                                myMenuContentSub.setAttribute('class', 'mymenu wid200');
                            }else{
                                if(divCnt==1){
                                    myMenuContentSubUl.setAttribute('class', 'myMList');
                                    myMenuContentSub.setAttribute('class', 'mymenu pdr40 wid200');
                                }else{
                                    myMenuContentSubUl.setAttribute('class', 'myMList');
                                    myMenuContentSub.setAttribute('class', 'mymenu wid200');
                                }
                            }
                        }

                        afterAdd = false;
                        divCnt++;
                    }

                    if(i==acctNoList.length-1 && afterAdd){
                        myMenuContentSub.appendChild(myMenuContentSubUl);
                        myMenuContent.appendChild(myMenuContentSub);
                    }
                }
            }
        },

        /*메뉴 타이틀 가져오기*/
        returnMenuTitle : function(menuCd, type){
            var menuTitle       = "";
            var menuTitleImg    = "";


            if(menuCd=="11"){
                menuTitle = "조회";
//                menuTitleImg = "/resource/img/btn/btn_my_menu02.gif";
            }else if(menuCd=="12"){
                menuTitle = "이체";
//                menuTitleImg = "/resource/img/btn/btn_my_menu03.gif";
            }else if(menuCd=="13"){
                menuTitle = "공과금";
//                menuTitleImg = "/resource/img/btn/btn_my_menu04.gif";
            }else if(menuCd=="14"){
                menuTitle = "예금";
//                menuTitleImg = "/resource/img/btn/btn_my_menu11.gif";
            }else if(menuCd=="15"){
                menuTitle = "펀드";
//                menuTitleImg = "/resource/img/btn/btn_my_menu09.gif";
            }else if(menuCd=="16"){
                menuTitle = "카드";
//                menuTitleImg = "/resource/img/btn/btn_my_menu10.gif";
            }else if(menuCd=="17"){
                menuTitle = "대출";
//                menuTitleImg = "/resource/img/btn/btn_my_menu01.gif";
            }else if(menuCd=="18"){
                menuTitle = "외환";
//                menuTitleImg = "/resource/img/btn/btn_my_menu05.gif";
            }else if(menuCd=="19"){
                menuTitle = "보험";
//                menuTitleImg = "/resource/img/btn/btn_my_menu08.gif";
            }else if(menuCd=="20"){
                menuTitle = "개인";
//                menuTitleImg = "/resource/img/btn/btn_my_menu06.gif";
            }else if(menuCd=="21"){
            	menuTitle = "인증";
//                menuTitleImg = "/resource/img/btn/btn_my_menu06.gif";
            }else{
                menuTitle = "조회";
//                menuTitleImg = "/resource/img/btn/btn_my_menu02.gif";
            }

            if(type==undefined || type==null || type==""){
                return menuTitle;
            }else if(type=="TITLE"){
                return menuTitle;
            }else if(type=="IMG"){
                return menuTitleImg;
            }else{
                return menuTitle;
            }
        },

        /*메뉴설정 마이메뉴목록 가져오기*/
        goMyMenu : function(){
            var url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/mymenu/wpcus420_02p.do";
            var hanaAjax = new hana.JHanaAjax('', true, true);
            hanaAjax.ajaxSubmit( url, null, true, pbk.web.mymenu.addMyMenuFn, 'euc-kr' );
        },

        /*메뉴설정 마이메뉴목록 가져오기 callback 함수*/
        addMyMenuFn : function( res, option ){
            // Json타입으로 변환
            var _data = eval('(' + res.responseText + ')');
            var myMenuSel = document.getElementById("mymenu");

            var acctNoList = _data.userMenuList;
            
            var menuCd;
            var menuTitle;
            
            if(acctNoList != null && acctNoList.length>0){
                for(var i = 0; i < acctNoList.length; i++) {
                	
                	menuCd = acctNoList[i].menuCd;
                	
                	if(menuCd=="11"){
                        menuTitle = "조회";
                    }else if(menuCd=="12"){
                        menuTitle = "이체";
                    }else if(menuCd=="13"){
                        menuTitle = "공과금";
                    }else if(menuCd=="14"){
                        menuTitle = "예금";
                    }else if(menuCd=="15"){
                        menuTitle = "펀드";
                    }else if(menuCd=="16"){
                        menuTitle = "카드";
                    }else if(menuCd=="17"){
                        menuTitle = "대출";
                    }else if(menuCd=="18"){
                        menuTitle = "외환";
                    }else if(menuCd=="19"){
                        menuTitle = "보험";
                    }else if(menuCd=="20"){
                        menuTitle = "개인";
                    }else if(menuCd=="20"){
                    	menuTitle = "인증";
                    }else{
                        menuTitle = "예금";
                    }
                	
                    myMenuSel.options[i] = new Option("["+menuTitle+"] "+acctNoList[i].menuNm ,acctNoList[i].menuNo);
                    
                    $j("#totMenuOpt"+acctNoList[i].menuNo).remove();
                    
                    /*var myMenuContentSubLiImg = document.createElement('img');
                    myMenuContentSubLiImg.setAttribute('src', pbk.web.mymenu.returnMenuTitle(acctNoList[i].menuCd, "IMG"));*/
                }
            }
        },

        /*마이메뉴 설정*/
        myMenuSubmit : function(){
            var myMenuSel   = document.getElementById("mymenu");
            var menulist    = "";
            for(var i=0; i<myMenuSel.length;i++){
                menulist+=myMenuSel[i].value+",";
            }
            if(menulist.length>0){
            	if(myMenuSel.length>15){
            		opb.common.layerpopup.openMessage_fnc({
                        isConfirm: false,
                        title: '마이메뉴 설정',
                        message: '마이메뉴 설정은 15개까지 가능합니다.'
                    });
                    return;
            	}else{
            		menulist = menulist.substring(0,menulist.length-1);
            	}
                
            }else{
            	opb.common.layerpopup.openMessage_fnc({
                    isConfirm: false,
                    title: '마이메뉴 설정',
                    message: '최소 하나이상의 마이메뉴를 설정하셔야 합니다.'
                });
                return;
            }

            var formObj = form.createForm([{id:'menulist', value :menulist}] );

            var url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/mymenu/wpcus420_03p.do";
            var hanaAjax = new hana.JHanaAjax('', true, true);
            hanaAjax.ajaxSubmit( url, formObj, true, pbk.web.mymenu.completeMyMenuSubmit, 'euc-kr' );

        },

        /*마이메뉴 설정 callback함수*/
        completeMyMenuSubmit : function(){
              pbk.web.mymenu.showMenu(document.getElementById('myMenuBtnHref'));
              opb.common.layerpopup.closeLayer_fnc('PopMenuManage');
        },

        /**
          * 마이메뉴 추가/제거
          */
         choiceMenu : function(type) {
            var addValue    = new Array();
            var addText     = new Array();
            var addLen      = 0;

            var totmenu     = document.getElementById("totmenu");
            var mymenu      = document.getElementById("mymenu");

            if(totmenu.length==0 && type=="ADD"){
            	opb.common.layerpopup.openMessage_fnc({
                    isConfirm: false,
                    title: '마이메뉴 설정',
                    message: '추가할 전체메뉴가 존재하지 않습니다.'
                });
                return;
            }

            if(mymenu.length==0 && type=="REMOVE"){
            	opb.common.layerpopup.openMessage_fnc({
                    isConfirm: false,
                    title: '마이메뉴 설정',
                    message: '등록된 마이메뉴가 존재하지 않습니다.'
                });
                return;
            }

            if(type=="ADD"){
                for(var i=totmenu.length-1; i>=0;i--){
                    if(totmenu[i].selected){
                        addValue[addLen]    = totmenu[i].value;
                        addText[addLen]     = totmenu[i].text;
                        addLen++;
                        totmenu[i] = null;
                    }
                }

                for(var j=addLen-1; j>=0;j--){
                    mymenu.options[mymenu.length] = new Option(addText[j], addValue[j]);
                }
            }else{
                for(var i=mymenu.length-1; i>=0;i--){
                    if(mymenu[i].selected){
                        addValue[addLen]    = mymenu[i].value;
                        addText[addLen]     = mymenu[i].text;
                        addLen++;
                        mymenu[i] = null;
                    }
                }

                for(var j=addLen-1; j>=0;j--){
                    totmenu.options[totmenu.length] = new Option(addText[j], addValue[j]);
                }
            }

            if(addLen==0){
            	opb.common.layerpopup.openMessage_fnc({
                    isConfirm: false,
                    title: '마이메뉴 설정',
                    message: '데이터를 선택하시기 바랍니다.'
                });
                return;
            }
         },

         /**
          * 메뉴 위로 이동
          */
         fnMenuMoveUp : function(oMenu) {
            var i=0;
            for (i=0; i<oMenu.length; i++) {
                if (pbk.web.mymenu.Menulist_isSelected(oMenu, i)) {
                    if (i==0) return;
                    pbk.web.mymenu.Menulist_upMenu(oMenu, i);
                }
            }
         },


         /**
          * 메뉴 아래로 이동
          */
         fnMenuMoveDown : function(oMenu) {
            var i=0;
            for (i=oMenu.length-1; i>=0; i--) {
                if (pbk.web.mymenu.Menulist_isSelected(oMenu, i)) {
                    if (i==oMenu.length-1) return;
                    pbk.web.mymenu.Menulist_downMenu(oMenu, i);
                }
            }
         },


         Menulist_downMenu : function(oMenu, index) {
            if (index < 0) return;
            if (index == oMenu.length-1) {
                return; // 더 이상 아래로 이동할 수 없을때
            }
            pbk.web.mymenu.Menulist_moveMenu(oMenu, index, 1);
         },


         Menulist_upMenu : function(oMenu, index) {
            if (index < 0) return;
            if (index == 0) {
                return; // 더 이상 위로 이동할 수 없을때
            }
            pbk.web.mymenu.Menulist_downMenu(oMenu, index-1);
         },


         Menulist_isSelected : function(oMenu, idx) {
            return (oMenu.options[idx].selected==true);
         },


         Menulist_moveMenu : function(oMenu, index, distance) {
            var tmpOption = new Option(oMenu.options[index].text, oMenu.options[index].value, false,
            oMenu.options[index].selected);
            for (var i=index; i<index+distance; i++) {
                oMenu.options[i].text = oMenu.options[i+1].text;
                oMenu.options[i].value = oMenu.options[i+1].value;
                oMenu.options[i].selected = oMenu.options[i+1].selected;
            }
            oMenu.options[index+distance] = tmpOption;
         },

         /**
         * 마이메뉴설정 보여줌.
         */
        showMenuSet : function(linkObj, type) {
            var sortcd = "1";
            if(type==undefined || type==null || type == ""){
                sortcd = "1";
            }else{
                sortcd = type; 
            }
            
            var url="/myhana/mymenu/wpcus420_01p.do?sortCd="+sortcd;
			url = opb.base.APPLICATION_CONTEXT_ROOT + url;
			opb.common.layerpopup.openLayer_fnc(url, 'PopMenuManage', null, 'PopMyMunu', 'btnMyMenu');
			opb.common.layerpopup.closeLayer_fnc('PopMyMunu');
        },

        /**
         * 마이메뉴 보여줌.
         */
        showMenu : function(linkObj, gubun) {
        	if("" != gubun && "2" == gubun){
        		opb.common.layerpopup.closeLayer_fnc('PopMenuManage');
        	}
            pbk.web.mymenu.showMenuLinkObj = linkObj;
            var url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/mymenu/wpcus420_05p.do";
            var hanaAjax = new hana.JHanaAjax('', true, true);
            hanaAjax.ajaxSubmit( url, null, true, pbk.web.mymenu.realShowMenu, 'euc-kr' );
        },

        /**
         * 마이메뉴 보여줌.
         */
        realShowMenu : function(res, option ) {
            var _data = eval('(' + res.responseText + ')');
            var nResult = _data.nResult;
            
            var gubun = 'a'; 
            if(nResult<=5){
            	gubun = 'a';
            }else if(nResult>5 && nResult<= 10){
            	gubun = 'b';
            }else if(nResult>10){
            	gubun = 'c';
            } 
            
            var url="/myhana/mymenu/wpcus420_04p.do?gubun="+gubun;
			url = opb.base.APPLICATION_CONTEXT_ROOT + url;
			opb.common.layerpopup.openLayer_fnc(url, 'PopMyMunu', 'topMenu', null, 'myMenuBtnHref');
            

        },

        /*메뉴설정 마이메뉴목록 가져오기*/
        goMainMyMenu : function(){
            var url = opb.base.APPLICATION_CONTEXT_ROOT + "/myhana/mymenu/wpcus420_02p.do";
            var hanaAjax = new hana.JHanaAjax('', true, true);
            hanaAjax.ajaxSubmit( url, null, true, pbk.web.mymenu.chkMainMyMenuFn, 'euc-kr' );
        },

        /*메뉴설정 마이메뉴목록 가져오기 callback 함수*/
        chkMainMyMenuFn : function( res, option ){
            // Json타입으로 변환
            var _data = eval('(' + res.responseText + ')');

            var acctNoList = _data.userMenuList;
            if(acctNoList != null && acctNoList.length>0){
                for(var i = 0; i < acctNoList.length; i++) {
                    try{
                        document.getElementById("MAINMENU"+acctNoList[i].menuNo).style.display="";
                    }catch(e){}
                }
            }
        }

    };
}();

/************************** 마이메뉴 끝 **************************/




/************************** 한글 유틸리티 시작 **************************/
var HangulUtils = function() {
    var WHANG_SUNG_HANGUL = ['가', '각', '간', '갇', '갈', '갉', '갊', '감',
            '갑', '값', '갓', '갔', '강', '갖', '갗', '같', '갚', '갛', '개', '객', '갠',
            '갤', '갬', '갭', '갯', '갰', '갱', '갸', '갹', '갼', '걀', '걋', '걍', '걔',
            '걘', '걜', '거', '걱', '건', '걷', '걸', '걺', '검', '겁', '것', '겄', '겅',
            '겆', '겉', '겊', '겋', '게', '겐', '겔', '겜', '겝', '겟', '겠', '겡', '겨',
            '격', '겪', '견', '겯', '결', '겸', '겹', '겻', '겼', '경', '곁', '계', '곈',
            '곌', '곕', '곗', '고', '곡', '곤', '곧', '골', '곪', '곬', '곯', '곰', '곱',
            '곳', '공', '곶', '과', '곽', '관', '괄', '괆', '괌', '괍', '괏', '광', '괘',
            '괜', '괠', '괩', '괬', '괭', '괴', '괵', '괸', '괼', '굄', '굅', '굇', '굉',
            '교', '굔', '굘', '굡', '굣', '구', '국', '군', '굳', '굴', '굵', '굶', '굻',
            '굼', '굽', '굿', '궁', '궂', '궈', '궉', '권', '궐', '궜', '궝', '궤', '궷',
            '귀', '귁', '귄', '귈', '귐', '귑', '귓', '규', '균', '귤', '그', '극', '근',
            '귿', '글', '긁', '금', '급', '긋', '긍', '긔', '기', '긱', '긴', '긷', '길',
            '긺', '김', '깁', '깃', '깅', '깆', '깊', '까', '깍', '깎', '깐', '깔', '깖',
            '깜', '깝', '깟', '깠', '깡', '깥', '깨', '깩', '깬', '깰', '깸', '깹', '깻',
            '깼', '깽', '꺄', '꺅', '꺌', '꺼', '꺽', '꺾', '껀', '껄', '껌', '껍', '껏',
            '껐', '껑', '께', '껙', '껜', '껨', '껫', '껭', '껴', '껸', '껼', '꼇', '꼈',
            '꼍', '꼐', '꼬', '꼭', '꼰', '꼲', '꼴', '꼼', '꼽', '꼿', '꽁', '꽂', '꽃',
            '꽈', '꽉', '꽐', '꽜', '꽝', '꽤', '꽥', '꽹', '꾀', '꾄', '꾈', '꾐', '꾑',
            '꾕', '꾜', '꾸', '꾹', '꾼', '꿀', '꿇', '꿈', '꿉', '꿋', '꿍', '꿎', '꿔',
            '꿜', '꿨', '꿩', '꿰', '꿱', '꿴', '꿸', '뀀', '뀁', '뀄', '뀌', '뀐', '뀔',
            '뀜', '뀝', '뀨', '끄', '끅', '끈', '끊', '끌', '끎', '끓', '끔', '끕', '끗',
            '끙', '끝', '끼', '끽', '낀', '낄', '낌', '낍', '낏', '낑', '나', '낙', '낚',
            '난', '낟', '날', '낡', '낢', '남', '납', '낫', '났', '낭', '낮', '낯', '낱',
            '낳', '내', '낵', '낸', '낼', '냄', '냅', '냇', '냈', '냉', '냐', '냑', '냔',
            '냘', '냠', '냥', '너', '넉', '넋', '넌', '널', '넒', '넓', '넘', '넙', '넛',
            '넜', '넝', '넣', '네', '넥', '넨', '넬', '넴', '넵', '넷', '넸', '넹', '녀',
            '녁', '년', '녈', '념', '녑', '녔', '녕', '녘', '녜', '녠', '노', '녹', '논',
            '놀', '놂', '놈', '놉', '놋', '농', '높', '놓', '놔', '놘', '놜', '놨', '뇌',
            '뇐', '뇔', '뇜', '뇝', '뇟', '뇨', '뇩', '뇬', '뇰', '뇹', '뇻', '뇽', '누',
            '눅', '눈', '눋', '눌', '눔', '눕', '눗', '눙', '눠', '눴', '눼', '뉘', '뉜',
            '뉠', '뉨', '뉩', '뉴', '뉵', '뉼', '늄', '늅', '늉', '느', '늑', '는', '늘',
            '늙', '늚', '늠', '늡', '늣', '능', '늦', '늪', '늬', '늰', '늴', '니', '닉',
            '닌', '닐', '닒', '님', '닙', '닛', '닝', '닢', '다', '닥', '닦', '단', '닫',
            '달', '닭', '닮', '닯', '닳', '담', '답', '닷', '닸', '당', '닺', '닻', '닿',
            '대', '댁', '댄', '댈', '댐', '댑', '댓', '댔', '댕', '댜', '더', '덕', '덖',
            '던', '덛', '덜', '덞', '덟', '덤', '덥', '덧', '덩', '덫', '덮', '데', '덱',
            '덴', '델', '뎀', '뎁', '뎃', '뎄', '뎅', '뎌', '뎐', '뎔', '뎠', '뎡', '뎨',
            '뎬', '도', '독', '돈', '돋', '돌', '돎', '돐', '돔', '돕', '돗', '동', '돛',
            '돝', '돠', '돤', '돨', '돼', '됐', '되', '된', '될', '됨', '됩', '됫', '됴',
            '두', '둑', '둔', '둘', '둠', '둡', '둣', '둥', '둬', '뒀', '뒈', '뒝', '뒤',
            '뒨', '뒬', '뒵', '뒷', '뒹', '듀', '듄', '듈', '듐', '듕', '드', '득', '든',
            '듣', '들', '듦', '듬', '듭', '듯', '등', '듸', '디', '딕', '딘', '딛', '딜',
            '딤', '딥', '딧', '딨', '딩', '딪', '따', '딱', '딴', '딸', '땀', '땁', '땃',
            '땄', '땅', '땋', '때', '땍', '땐', '땔', '땜', '땝', '땟', '땠', '땡', '떠',
            '떡', '떤', '떨', '떪', '떫', '떰', '떱', '떳', '떴', '떵', '떻', '떼', '떽',
            '뗀', '뗄', '뗌', '뗍', '뗏', '뗐', '뗑', '뗘', '뗬', '또', '똑', '똔', '똘',
            '똥', '똬', '똴', '뙈', '뙤', '뙨', '뚜', '뚝', '뚠', '뚤', '뚫', '뚬', '뚱',
            '뛔', '뛰', '뛴', '뛸', '뜀', '뜁', '뜅', '뜨', '뜩', '뜬', '뜯', '뜰', '뜸',
            '뜹', '뜻', '띄', '띈', '띌', '띔', '띕', '띠', '띤', '띨', '띰', '띱', '띳',
            '띵', '라', '락', '란', '랄', '람', '랍', '랏', '랐', '랑', '랒', '랖', '랗',
            '래', '랙', '랜', '랠', '램', '랩', '랫', '랬', '랭', '랴', '략', '랸', '럇',
            '량', '러', '럭', '런', '럴', '럼', '럽', '럿', '렀', '렁', '렇', '레', '렉',
            '렌', '렐', '렘', '렙', '렛', '렝', '려', '력', '련', '렬', '렴', '렵', '렷',
            '렸', '령', '례', '롄', '롑', '롓', '로', '록', '론', '롤', '롬', '롭', '롯',
            '롱', '롸', '롼', '뢍', '뢨', '뢰', '뢴', '뢸', '룀', '룁', '룃', '룅', '료',
            '룐', '룔', '룝', '룟', '룡', '루', '룩', '룬', '룰', '룸', '룹', '룻', '룽',
            '뤄', '뤘', '뤠', '뤼', '뤽', '륀', '륄', '륌', '륏', '륑', '류', '륙', '륜',
            '률', '륨', '륩', '륫', '륭', '르', '륵', '른', '를', '름', '릅', '릇', '릉',
            '릊', '릍', '릎', '리', '릭', '린', '릴', '림', '립', '릿', '링', '마', '막',
            '만', '많', '맏', '말', '맑', '맒', '맘', '맙', '맛', '망', '맞', '맡', '맣',
            '매', '맥', '맨', '맬', '맴', '맵', '맷', '맸', '맹', '맺', '먀', '먁', '먈',
            '먕', '머', '먹', '먼', '멀', '멂', '멈', '멉', '멋', '멍', '멎', '멓', '메',
            '멕', '멘', '멜', '멤', '멥', '멧', '멨', '멩', '며', '멱', '면', '멸', '몃',
            '몄', '명', '몇', '몌', '모', '목', '몫', '몬', '몰', '몲', '몸', '몹', '못',
            '몽', '뫄', '뫈', '뫘', '뫙', '뫼', '묀', '묄', '묍', '묏', '묑', '묘', '묜',
            '묠', '묩', '묫', '무', '묵', '묶', '문', '묻', '물', '묽', '묾', '뭄', '뭅',
            '뭇', '뭉', '뭍', '뭏', '뭐', '뭔', '뭘', '뭡', '뭣', '뭬', '뮈', '뮌', '뮐',
            '뮤', '뮨', '뮬', '뮴', '뮷', '므', '믄', '믈', '믐', '믓', '미', '믹', '민',
            '믿', '밀', '밂', '밈', '밉', '밋', '밌', '밍', '및', '밑', '바', '박', '밖',
            '밗', '반', '받', '발', '밝', '밞', '밟', '밤', '밥', '밧', '방', '밭', '배',
            '백', '밴', '밸', '뱀', '뱁', '뱃', '뱄', '뱅', '뱉', '뱌', '뱍', '뱐', '뱝',
            '버', '벅', '번', '벋', '벌', '벎', '범', '법', '벗', '벙', '벚', '베', '벡',
            '벤', '벧', '벨', '벰', '벱', '벳', '벴', '벵', '벼', '벽', '변', '별', '볍',
            '볏', '볐', '병', '볕', '볘', '볜', '보', '복', '볶', '본', '볼', '봄', '봅',
            '봇', '봉', '봐', '봔', '봤', '봬', '뵀', '뵈', '뵉', '뵌', '뵐', '뵘', '뵙',
            '뵤', '뵨', '부', '북', '분', '붇', '불', '붉', '붊', '붐', '붑', '붓', '붕',
            '붙', '붚', '붜', '붤', '붰', '붸', '뷔', '뷕', '뷘', '뷜', '뷩', '뷰', '뷴',
            '뷸', '븀', '븃', '븅', '브', '븍', '븐', '블', '븜', '븝', '븟', '비', '빅',
            '빈', '빌', '빎', '빔', '빕', '빗', '빙', '빚', '빛', '빠', '빡', '빤', '빨',
            '빪', '빰', '빱', '빳', '빴', '빵', '빻', '빼', '빽', '뺀', '뺄', '뺌', '뺍',
            '뺏', '뺐', '뺑', '뺘', '뺙', '뺨', '뻐', '뻑', '뻔', '뻗', '뻘', '뻠', '뻣',
            '뻤', '뻥', '뻬', '뼁', '뼈', '뼉', '뼘', '뼙', '뼛', '뼜', '뼝', '뽀', '뽁',
            '뽄', '뽈', '뽐', '뽑', '뽕', '뾔', '뾰', '뿅', '뿌', '뿍', '뿐', '뿔', '뿜',
            '뿟', '뿡', '쀼', '쁑', '쁘', '쁜', '쁠', '쁨', '쁩', '삐', '삑', '삔', '삘',
            '삠', '삡', '삣', '삥', '사', '삭', '삯', '산', '삳', '살', '삵', '삶', '삼',
            '삽', '삿', '샀', '상', '샅', '새', '색', '샌', '샐', '샘', '샙', '샛', '샜',
            '생', '샤', '샥', '샨', '샬', '샴', '샵', '샷', '샹', '섀', '섄', '섈', '섐',
            '섕', '서', '석', '섞', '섟', '선', '섣', '설', '섦', '섧', '섬', '섭', '섯',
            '섰', '성', '섶', '세', '섹', '센', '셀', '셈', '셉', '셋', '셌', '셍', '셔',
            '셕', '션', '셜', '셤', '셥', '셧', '셨', '셩', '셰', '셴', '셸', '솅', '소',
            '속', '솎', '손', '솔', '솖', '솜', '솝', '솟', '송', '솥', '솨', '솩', '솬',
            '솰', '솽', '쇄', '쇈', '쇌', '쇔', '쇗', '쇘', '쇠', '쇤', '쇨', '쇰', '쇱',
            '쇳', '쇼', '쇽', '숀', '숄', '숌', '숍', '숏', '숑', '수', '숙', '순', '숟',
            '술', '숨', '숩', '숫', '숭', '숯', '숱', '숲', '숴', '쉈', '쉐', '쉑', '쉔',
            '쉘', '쉠', '쉥', '쉬', '쉭', '쉰', '쉴', '쉼', '쉽', '쉿', '슁', '슈', '슉',
            '슐', '슘', '슛', '슝', '스', '슥', '슨', '슬', '슭', '슴', '습', '슷', '승',
            '시', '식', '신', '싣', '실', '싫', '심', '십', '싯', '싱', '싶', '싸', '싹',
            '싻', '싼', '쌀', '쌈', '쌉', '쌌', '쌍', '쌓', '쌔', '쌕', '쌘', '쌜', '쌤',
            '쌥', '쌨', '쌩', '썅', '써', '썩', '썬', '썰', '썲', '썸', '썹', '썼', '썽',
            '쎄', '쎈', '쎌', '쏀', '쏘', '쏙', '쏜', '쏟', '쏠', '쏢', '쏨', '쏩', '쏭',
            '쏴', '쏵', '쏸', '쐈', '쐐', '쐤', '쐬', '쐰', '쐴', '쐼', '쐽', '쑈', '쑤',
            '쑥', '쑨', '쑬', '쑴', '쑵', '쑹', '쒀', '쒔', '쒜', '쒸', '쒼', '쓩', '쓰',
            '쓱', '쓴', '쓸', '쓺', '쓿', '씀', '씁', '씌', '씐', '씔', '씜', '씨', '씩',
            '씬', '씰', '씸', '씹', '씻', '씽', '아', '악', '안', '앉', '않', '알', '앍',
            '앎', '앓', '암', '압', '앗', '았', '앙', '앝', '앞', '애', '액', '앤', '앨',
            '앰', '앱', '앳', '앴', '앵', '야', '약', '얀', '얄', '얇', '얌', '얍', '얏',
            '양', '얕', '얗', '얘', '얜', '얠', '얩', '어', '억', '언', '얹', '얻', '얼',
            '얽', '얾', '엄', '업', '없', '엇', '었', '엉', '엊', '엌', '엎', '에', '엑',
            '엔', '엘', '엠', '엡', '엣', '엥', '여', '역', '엮', '연', '열', '엶', '엷',
            '염', '엽', '엾', '엿', '였', '영', '옅', '옆', '옇', '예', '옌', '옐', '옘',
            '옙', '옛', '옜', '오', '옥', '온', '올', '옭', '옮', '옰', '옳', '옴', '옵',
            '옷', '옹', '옻', '와', '왁', '완', '왈', '왐', '왑', '왓', '왔', '왕', '왜',
            '왝', '왠', '왬', '왯', '왱', '외', '왹', '왼', '욀', '욈', '욉', '욋', '욍',
            '요', '욕', '욘', '욜', '욤', '욥', '욧', '용', '우', '욱', '운', '울', '욹',
            '욺', '움', '웁', '웃', '웅', '워', '웍', '원', '월', '웜', '웝', '웠', '웡',
            '웨', '웩', '웬', '웰', '웸', '웹', '웽', '위', '윅', '윈', '윌', '윔', '윕',
            '윗', '윙', '유', '육', '윤', '율', '윰', '윱', '윳', '융', '윷', '으', '윽',
            '은', '을', '읊', '음', '읍', '읏', '응', '읒', '읓', '읔', '읕', '읖', '읗',
            '의', '읜', '읠', '읨', '읫', '이', '익', '인', '일', '읽', '읾', '잃', '임',
            '입', '잇', '있', '잉', '잊', '잎', '자', '작', '잔', '잖', '잗', '잘', '잚',
            '잠', '잡', '잣', '잤', '장', '잦', '재', '잭', '잰', '잴', '잼', '잽', '잿',
            '쟀', '쟁', '쟈', '쟉', '쟌', '쟎', '쟐', '쟘', '쟝', '쟤', '쟨', '쟬', '저',
            '적', '전', '절', '젊', '점', '접', '젓', '정', '젖', '제', '젝', '젠', '젤',
            '젬', '젭', '젯', '젱', '져', '젼', '졀', '졈', '졉', '졌', '졍', '졔', '조',
            '족', '존', '졸', '졺', '좀', '좁', '좃', '종', '좆', '좇', '좋', '좌', '좍',
            '좔', '좝', '좟', '좡', '좨', '좼', '좽', '죄', '죈', '죌', '죔', '죕', '죗',
            '죙', '죠', '죡', '죤', '죵', '주', '죽', '준', '줄', '줅', '줆', '줌', '줍',
            '줏', '중', '줘', '줬', '줴', '쥐', '쥑', '쥔', '쥘', '쥠', '쥡', '쥣', '쥬',
            '쥰', '쥴', '쥼', '즈', '즉', '즌', '즐', '즘', '즙', '즛', '증', '지', '직',
            '진', '짇', '질', '짊', '짐', '집', '짓', '징', '짖', '짙', '짚', '짜', '짝',
            '짠', '짢', '짤', '짧', '짬', '짭', '짯', '짰', '짱', '째', '짹', '짼', '쨀',
            '쨈', '쨉', '쨋', '쨌', '쨍', '쨔', '쨘', '쨩', '쩌', '쩍', '쩐', '쩔', '쩜',
            '쩝', '쩟', '쩠', '쩡', '쩨', '쩽', '쪄', '쪘', '쪼', '쪽', '쫀', '쫄', '쫌',
            '쫍', '쫏', '쫑', '쫓', '쫘', '쫙', '쫠', '쫬', '쫴', '쬈', '쬐', '쬔', '쬘',
            '쬠', '쬡', '쭁', '쭈', '쭉', '쭌', '쭐', '쭘', '쭙', '쭝', '쭤', '쭸', '쭹',
            '쮜', '쮸', '쯔', '쯤', '쯧', '쯩', '찌', '찍', '찐', '찔', '찜', '찝', '찡',
            '찢', '찧', '차', '착', '찬', '찮', '찰', '참', '찹', '찻', '찼', '창', '찾',
            '채', '책', '챈', '챌', '챔', '챕', '챗', '챘', '챙', '챠', '챤', '챦', '챨',
            '챰', '챵', '처', '척', '천', '철', '첨', '첩', '첫', '첬', '청', '체', '첵',
            '첸', '첼', '쳄', '쳅', '쳇', '쳉', '쳐', '쳔', '쳤', '쳬', '쳰', '촁', '초',
            '촉', '촌', '촐', '촘', '촙', '촛', '총', '촤', '촨', '촬', '촹', '최', '쵠',
            '쵤', '쵬', '쵭', '쵯', '쵱', '쵸', '춈', '추', '축', '춘', '출', '춤', '춥',
            '춧', '충', '춰', '췄', '췌', '췐', '취', '췬', '췰', '췸', '췹', '췻', '췽',
            '츄', '츈', '츌', '츔', '츙', '츠', '측', '츤', '츨', '츰', '츱', '츳', '층',
            '치', '칙', '친', '칟', '칠', '칡', '침', '칩', '칫', '칭', '카', '칵', '칸',
            '칼', '캄', '캅', '캇', '캉', '캐', '캑', '캔', '캘', '캠', '캡', '캣', '캤',
            '캥', '캬', '캭', '컁', '커', '컥', '컨', '컫', '컬', '컴', '컵', '컷', '컸',
            '컹', '케', '켁', '켄', '켈', '켐', '켑', '켓', '켕', '켜', '켠', '켤', '켬',
            '켭', '켯', '켰', '켱', '켸', '코', '콕', '콘', '콜', '콤', '콥', '콧', '콩',
            '콰', '콱', '콴', '콸', '쾀', '쾅', '쾌', '쾡', '쾨', '쾰', '쿄', '쿠', '쿡',
            '쿤', '쿨', '쿰', '쿱', '쿳', '쿵', '쿼', '퀀', '퀄', '퀑', '퀘', '퀭', '퀴',
            '퀵', '퀸', '퀼', '큄', '큅', '큇', '큉', '큐', '큔', '큘', '큠', '크', '큭',
            '큰', '클', '큼', '큽', '킁', '키', '킥', '킨', '킬', '킴', '킵', '킷', '킹',
            '타', '탁', '탄', '탈', '탉', '탐', '탑', '탓', '탔', '탕', '태', '택', '탠',
            '탤', '탬', '탭', '탯', '탰', '탱', '탸', '턍', '터', '턱', '턴', '털', '턺',
            '텀', '텁', '텃', '텄', '텅', '테', '텍', '텐', '텔', '템', '텝', '텟', '텡',
            '텨', '텬', '텼', '톄', '톈', '토', '톡', '톤', '톨', '톰', '톱', '톳', '통',
            '톺', '톼', '퇀', '퇘', '퇴', '퇸', '툇', '툉', '툐', '투', '툭', '툰', '툴',
            '툼', '툽', '툿', '퉁', '퉈', '퉜', '퉤', '튀', '튁', '튄', '튈', '튐', '튑',
            '튕', '튜', '튠', '튤', '튬', '튱', '트', '특', '튼', '튿', '틀', '틂', '틈',
            '틉', '틋', '틔', '틘', '틜', '틤', '틥', '티', '틱', '틴', '틸', '팀', '팁',
            '팃', '팅', '파', '팍', '팎', '판', '팔', '팖', '팜', '팝', '팟', '팠', '팡',
            '팥', '패', '팩', '팬', '팰', '팸', '팹', '팻', '팼', '팽', '퍄', '퍅', '퍼',
            '퍽', '펀', '펄', '펌', '펍', '펏', '펐', '펑', '페', '펙', '펜', '펠', '펨',
            '펩', '펫', '펭', '펴', '편', '펼', '폄', '폅', '폈', '평', '폐', '폘', '폡',
            '폣', '포', '폭', '폰', '폴', '폼', '폽', '폿', '퐁', '퐈', '퐝', '푀', '푄',
            '표', '푠', '푤', '푭', '푯', '푸', '푹', '푼', '푿', '풀', '풂', '품', '풉',
            '풋', '풍', '풔', '풩', '퓌', '퓐', '퓔', '퓜', '퓟', '퓨', '퓬', '퓰', '퓸',
            '퓻', '퓽', '프', '픈', '플', '픔', '픕', '픗', '피', '픽', '핀', '필', '핌',
            '핍', '핏', '핑', '하', '학', '한', '할', '핥', '함', '합', '핫', '항', '해',
            '핵', '핸', '핼', '햄', '햅', '햇', '했', '행', '햐', '향', '허', '헉', '헌',
            '헐', '헒', '험', '헙', '헛', '헝', '헤', '헥', '헨', '헬', '헴', '헵', '헷',
            '헹', '혀', '혁', '현', '혈', '혐', '협', '혓', '혔', '형', '혜', '혠', '혤',
            '혭', '호', '혹', '혼', '홀', '홅', '홈', '홉', '홋', '홍', '홑', '화', '확',
            '환', '활', '홧', '황', '홰', '홱', '홴', '횃', '횅', '회', '획', '횐', '횔',
            '횝', '횟', '횡', '효', '횬', '횰', '횹', '횻', '후', '훅', '훈', '훌', '훑',
            '훔', '훗', '훙', '훠', '훤', '훨', '훰', '훵', '훼', '훽', '휀', '휄', '휑',
            '휘', '휙', '휜', '휠', '휨', '휩', '휫', '휭', '휴', '휵', '휸', '휼', '흄',
            '흇', '흉', '흐', '흑', '흔', '흖', '흗', '흘', '흙', '흠', '흡', '흣', '흥',
            '흩', '희', '흰', '흴', '흼', '흽', '힁', '히', '힉', '힌', '힐', '힘', '힙',
            '힛', '힝'];

    return {
        checkWhanSungHangul : function(_str) {
            if(_str != null && _str != undefined && _str.length > 0) {
                for(var i = 0; i < _str.length; i++) {
                    var tmpChar = _str.charAt(i);

                    var regExp = new RegExp("^[가-힝]+$", "g");
                    var matches = regExp.exec(tmpChar);

                    if (matches != null) {
                        var isWhanSungHangul = false;
                        for(var k = 0; k < WHANG_SUNG_HANGUL.length; k++) {
                            if(WHANG_SUNG_HANGUL[k] == tmpChar) {
                                isWhanSungHangul = true;
                                break;
                            }
                        }
                        if(isWhanSungHangul == false) {
                            return {isWhanSung : false, errorChar : tmpChar};
                        }
                    }
                }
                return {isWhanSung : true};
            }

            return {isWhanSung : false, errorChar : ''};
        }
    };
}();
/************************** 한글 유틸리티 끝 **************************/




/************************** 웹 유틸리티 시작 **************************/
/**
 * 페이지 단순이동 함수
 * @param {Object} url
 */
pbk.web.util.goMenu = function(url, data, contentUrl) {
	//console.log(url);
	//console.log(contentUrl);
	// 현재 GNB ID와 요청 루트 패스가 같으면 Ajax 호출
	// /contents, /portal, /css 일경우 Ajax 호출 제외
	if(url.indexOf('/contents/') != 0 && url.indexOf('/cont/') != 0
			/*&& url.indexOf('/portal/') != 0 && url.indexOf('/csc/') != 0*/
			&& url.indexOf('/index.do') == -1 && url.indexOf('/login.do') == -1) {
		
		if((typeof menuManager != 'undefined') && url.indexOf("/"+menuManager.gnbId) == 0) {
			pbk.web.util.goAjaxMenu(url, data, null);
			return;
		} else {

			// 심플대응
			var locPathname = document.location.pathname;
			if(locPathname == url.substring(0, url.indexOf("/", 1))+"/index.do") {
				pbk.web.util.goAjaxMenu(url, data, null);
				return;
			}
			// 확장자 .do 이면 index.do로..
			var ext = url.slice(url.indexOf(".")+1);
			if(ext.indexOf("?") > -1) {
				ext = ext.substring(0, ext.indexOf("?"));
			}
			if(ext == "do") {
				contentUrl = url;
				url = contentUrl.substring(0, url.indexOf("/", 1))+"/index.do";
			}
		}
	}
	
	if(url == contentUrl) {
		contentUrl = null;
	}

	try {
		opb.common.layerpopup.openLoading_fnc();
		$j(window).unload(function() {
			try
			{
				opb.common.layerpopup.closeLoading_fnc();
			}
			catch(e){}
		});
		
	    if((data == undefined || data == null) && (contentUrl == undefined || contentUrl == null)) {
	    	//console.log(url);
			location.href = url;
	    } else {
	        hana.JHanaUtils.form.createFormSubmit(data, url, contentUrl);
	    }
	}catch(e) {
		alert(location.href + '\n\n' + e + '\n[ERROR pbk.web.util.goMenu]');
		opb.common.layerpopup.closeLoading_fnc();
	}
	
};

/**
 * LNB ajax 메뉴 이동
 * @param {String} url
 * @param {String} _menuNo
 * @param {Object} data
 * @param {String} contentUrl
 * @param {String} hostLnbMenuNo 메인LNB인지 판단할 메뉴No 
 */
pbk.web.util.goLnbMenu = function(url, _menuNo, data, contentUrl, hostLnbMenuNo) {

	// 현재 GNB ID와 요청 루트 패스가 같으면 Ajax 호출
	// /contents, /portal, /css 일경우 Ajax 호출 제외
	if(url.indexOf('/contents/') != 0 && url.indexOf('/cont/') != 0
			&& url.indexOf('/index.do') == -1 && url.indexOf('/login.do') == -1) {
		
		try {
			var _menuidinfo = "";
			var isHostLnb = false;
			if (typeof _menuNo != 'undefined' && '' != _menuNo) _menuidinfo = _menuNo;
			else _menuidinfo = $j(event.srcElement).attr('menuidinfo');
			//
			$j('.depth1 > li').each(function(idx, el){
				$j(el).removeClass("on");
				var elLnbMenuNo = $j(el).find('a').attr('menuidinfo');
				if (_menuidinfo ==  elLnbMenuNo) {
					$j(el).addClass("on");
				}
				if (!isHostLnb && typeof hostLnbMenuNo != 'undefined' && hostLnbMenuNo ==  elLnbMenuNo) {
					isHostLnb = true;
				}
			});
			// default는 기본메인LNB영역임.
			if (typeof hostLnbMenuNo == 'undefined' || hostLnbMenuNo == null || hostLnbMenuNo == '') {
				isHostLnb = true;
			}
			
		} catch(e) {}
		//
		if (!isHostLnb) pbk.web.util.goRefreshMenu(url, data, null);
		else pbk.web.util.goAjaxMenu(url, data, null);

		return;
	}
	
	if(url == contentUrl) {
		contentUrl = null;
	}

	try {
		opb.common.layerpopup.openLoading_fnc();
		$j(window).unload(function() {
			try {
				opb.common.layerpopup.closeLoading_fnc();
			} catch(e){}
		});
		
	    if((data == undefined || data == null) && (contentUrl == undefined || contentUrl == null)) {
			location.href = url;
	    } else {
	        hana.JHanaUtils.form.createFormSubmit(data, url, contentUrl);
	    }
	}catch(e) {
		alert(location.href + '\n\n' + e + '\n[ERROR pbk.web.util.goMenu]');
		opb.common.layerpopup.closeLoading_fnc();
	}
	
};

/**
 * XSS 체크
 * @param {String} keyword
 */
pbk.web.util.fnXssReplace = function(keyword){
	keyword = keyword.replace(/\"/g, "");
//	keyword = keyword.replace(/&/g, "&%38;");
	keyword = keyword.replace(/#/g, "&#35;");
	keyword = keyword.replace(/</g, "&lt;");
	keyword = keyword.replace(/>/g, "&gt;");
	keyword = keyword.replace(/\(/g, "&#40;");
	keyword = keyword.replace(/\)/g, "&#41;");
	keyword = keyword.replace(/\{/g, "");
	keyword = keyword.replace(/\}/g, "");
	keyword = keyword.replace(/\[/g, "");
	keyword = keyword.replace(/\]/g, "");
	keyword = keyword.replace(/\'/g, "");
//	keyword = keyword.replace(/&%38;/g, "&#38;");
	return keyword;
}

/**
 * GNB 메뉴 페이지 단순이동 함수
 * @param {Object} url
 */
pbk.web.util.goGnbMenu = function(url, data, contentUrl) {

	//XSS체크
	url = pbk.web.util.fnXssReplace(url);

	// 현재 GNB ID와 요청 루트 패스가 같으면 Ajax 호출
	// /contents, /portal, /css 일경우 Ajax 호출 제외
	if(url.indexOf('/contents/') != 0 && url.indexOf('/cont/') != 0
			/*&& url.indexOf('/portal/') != 0 && url.indexOf('/csc/') != 0*/
			&& url.indexOf('/index.do') == -1 && url.indexOf('/login.do') == -1) {
		
		if((typeof menuManager != 'undefined') && url.indexOf("/"+menuManager.gnbId) == 0) {
			pbk.web.util.goAjaxMenu(url, data, null);
			return;
		} else {
			// 확장자 .do 이면 index.do로..
			var ext = url.slice(url.indexOf(".")+1);
			if(ext.indexOf("?") > -1) {
				ext = ext.substring(0, ext.indexOf("?"));
			}
			if(ext == "do") {
				contentUrl = url;
				url = contentUrl.substring(0, url.indexOf("/", 1))+"/index.do";
			}
		}
	}
	
	if(url == contentUrl) {
		contentUrl = null;
	}

	try {
		opb.common.layerpopup.openLoading_fnc();
		$j(window).unload(function() {
			try
			{
				opb.common.layerpopup.closeLoading_fnc();
			}
			catch(e){}
		});
		
	    if((data == undefined || data == null) && (contentUrl == undefined || contentUrl == null)) {
    		location.href = url;
	    } else {
	        hana.JHanaUtils.form.createFormSubmit(data, url, contentUrl);
	    }
	}catch(e) {
		alert(location.href + '\n\n' + e + '\n[ERROR pbk.web.util.goMenu]');
		opb.common.layerpopup.closeLoading_fnc();
	}
	
};

/**
 * 컨텐츠 페이지 단순이동 함수
 * @param {Object} url
 * @param {Object} data 
 * @param {Object} contentUrl
 */
pbk.web.util.goRefreshMenu = function(url, data, contentUrl) {

	if(url.indexOf('/contents/') != 0 && url.indexOf('/cont/') != 0 && url.indexOf('/index.do') == -1 && url.indexOf('/login.do') == -1) {
					
		// 확장자 .do 이면 index.do로..
		var ext = url.slice(url.indexOf(".")+1);
		
		if(ext.indexOf("?") > -1) {
			ext = ext.substring(0, ext.indexOf("?"));
		}
		
		if(ext == "do") {
			contentUrl = url;
			
			if(url.indexOf('/common/join/') == -1 ){
				url = contentUrl.substring(0, url.indexOf("/", 1))+"/index.do";
			}else{
				url = contentUrl.substring(0, url.lastIndexOf("/"))+"/index.do";
			}
		}

	}
	
	if(url == contentUrl) {
		contentUrl = null;
	}

	try {
		opb.common.layerpopup.openLoading_fnc();
		$j(window).unload(function() {
			try
			{
				opb.common.layerpopup.closeLoading_fnc();
			}
			catch(e){}
		});
		
	    if((data == undefined || data == null) && (contentUrl == undefined || contentUrl == null)) {
    		location.href = url;
	    } else {
	        hana.JHanaUtils.form.createFormSubmit(data, url, contentUrl);
	    }
		
	}catch(e) {
		alert(location.href + '\n\n' + e + '\n[ERROR pbk.web.util.goMenu]');
		opb.common.layerpopup.closeLoading_fnc();
	}
		
};


/**
 * 페이지 Ajax이동 함수
 * @param {Object} url
 */
pbk.web.util.goAjaxMenu = function(url, data, formObj, callback) {

    var virtualForm = formObj || document.createElement('form');

    virtualForm.method = 'post';
	virtualForm.acceptCharset = 'UTF-8';

    if( data != null){
        for (var i = 0; i < data.length; i++){
            hana.JHanaUtils.form.createHiddenField(virtualForm, data[i].id, data[i].value, true);
        }
    }

	opb.common.layerpopup.openLoading_fnc();
	
	var hanaAjax = new hana.JHanaAjax("HANA_CONTENTS_DIV", true);
	hanaAjax.ajaxCommSubmitCallback(url, virtualForm, function(success) {

		if(success) {
			
			if(callback) {
				callback();
			}
			
			opb.common.layerpopup.closeLoading_fnc();
		}
	}, null, true);
	
};

/**
 * IE 브라우저 체크
 */
pbk.web.util.checkIEBrowser = function() {
	
	//var agent = navigator.userAgent.toLowerCase();
	if(!opb.common.util.getBrowserInfo().MSIE) {
		
		opb.common.layerpopup.openAlert_fnc('알림', '본 사이트는 Microsoft Internet Explorer 계열만 &lt;br &gt;사용 가능합니다.');
//		opb.common.layerpopup.openMessage_fnc({
//            isConfirm: false,
//            title: '알림',
//            message: '본 사이트는 Microsoft Internet Explorer 계열만 &lt;br &gt;사용 가능합니다.'
//        });
		
		return false;
	}
	
	return true;

};

var console = window.console||{log:function(){}};
/**
 * javascript 동적 호출
 */
pbk.web.util._doAjax = function(script, callback){

	//alert(script);
	$j.ajax({
		url: script,
		dataType: 'script',
		crossDomain: true,
		context: document.body,
		success: function(responseText) {
		
			try {
				$j.globalEval(responseText);
			} catch ( e ) {
				alert('javascript load error!!['+script+']');
			}
			callback();
		}
	});

};

pbk.web.util._loadScripts = function(aryScriptUrls, index, callback) {

	$j.getScript(aryScriptUrls[index], function() {

		if(index+1 <= aryScriptUrls.length-1) {
			pbk.web.util._loadScripts(aryScriptUrls, index+1, callback);
		} else {

			if(callback) {
				$j(document).ready(function(){
					callback();
				});
			}
			
			jQuery.holdReady(false);
			
		}
	});
	
};

pbk.web.util._loadScripts2 = function(aryScriptUrls, index, callback) {

	
	pbk.web.util._doAjax(aryScriptUrls[index], function() {

		//alert('callback'+index);
		if(index+1 <= aryScriptUrls.length-1) {
			pbk.web.util._loadScripts2(aryScriptUrls, index+1, callback);
		} else {

			if(callback) {
				$j(document).ready(function(){
					callback();
				});
			}
			//alert('false');
			jQuery.holdReady(false);			
			
		}
	});

};

pbk.web.util.prototype = {
	scriptArrays : null
};

pbk.web.util.loadScripts2 = function(aryScriptUrls, callback) {

	jQuery.holdReady(true);

	pbk.web.util._loadScripts(aryScriptUrls, 0, callback);
};

pbk.web.util.loadScripts = function(aryScriptUrls, callback) {

	if(!aryScriptUrls) {
		
		if(callback) {
			$j(document).ready(function(){
				callback();
			});
			
			return;
		}
	}
	
	//alert('loadScripts');
	jQuery.holdReady(true);

	pbk.web.util._loadScripts2(aryScriptUrls, 0, callback);
};

/**
 * 통합헤더 해당 페이지로 리다이렉트전 체크
 * 로그인후 라면 linkUrl,linkUrlName 도 같이 넘겨 받아 로그아웃후 해당페이지로 이동한다.
 */
pbk.web.util.Re_clientCheck = function(obj,linkUrl,linkUrlName) {

    if (!opb.common.util.getBrowserInfo().MSIE) {
		alert("본 사이트는 Microsoft Internet Explorer 계열만 사용 가능합니다."); 
		return false;
	}else{
		if(linkUrl==undefined || linkUrl==null) window.location = obj.href;
		else opb.common.util.goLogoutLinkPage_fnc(linkUrl,linkUrlName);
			
	}

};

/**
 * 팝업 인쇄 함수
 */
pbk.web.util.popPrint = function(printID, sizeW, sizeH, scroll){
    if(sizeW == undefined) sizeW = 645;
    if(sizeH == undefined) sizeH = 420;
    if(scroll == undefined) scroll = "yes";
    var target = "popupPrint";

    sizeW = Number(sizeW) + 25;
    sizeH = Number(sizeH);
    var nLeft = screen.width/2 - sizeW/2 ;
    var nTop  = screen.height/2- sizeH/2 ;
    var winObj = "";

    var option= ",toolbar=no,menubar=no,location=no,scrollbars="+scroll+",status=no,resizable=no";

    winObj = window.open("/common/layerPrint.do?printID="+printID, target, "left=" + nLeft + ",top=" +  nTop + ",width=" + sizeW + ",height=" + sizeH  + option );

    if(winObj == null || winObj == undefined) {
        alert("팝업차단을 해제해 주세요.");
        return false;
    }
    winObj.blur();//크롬에서 focus()만 호출할경우 작동하지 않아서 blur()를 먼저 호출한후 focus()호출하도록 수정함.
    winObj.focus();//팝업이 이미 열려있는경우 앞으로 나오도록 한다.
};

/************************** 웹 유틸리티 끝 **************************/





/************************** 키보드보안 관련 시작 **************************/
/**
 * 키보드 보안 암호화 처리
 * @param {Object} formObj
 */
pbk.web.util.makeEncKey = function(formObj) {
	//키보드보안 암호화
	
	try{
		if(!isTransKey) {

			//값이없다면....return 처리함.2016.01.20
			//hana.JHanaUtils.form.createHiddenField(formObj, "hid_key_data", $j("#hid_key_data").val());
			var hid_key_data_value = $j("#hid_key_data").val();
			if(hid_key_data_value == undefined || hid_key_data_value == ""){
				DrawHiddenElements(formObj);
				hid_key_data_value = formObj.hid_key_data.value;
				
				if(hid_key_data_value == undefined || hid_key_data_value == "" ) return;
				
			} else {
				hana.JHanaUtils.form.createHiddenField(formObj, "hid_key_data", $j("#hid_key_data").val());
			}
			
			
			//DrawHiddenElements(formObj);
			//document.getElementById("hid_key_data").value = GetEncDataFun(cert, "", "");
			
						
			/*var encFieldCnt = 0;
			var fieldCnt = 0;
			var cipherEncText = "";
			var e2eEle = "";
			
			for(var i=0;i<document.forms.length;i++)
		    fieldCnt += document.forms[i].elements.length;
			
			var name = new Array(fieldCnt);
			var value = new Array(fieldCnt);
			
			for(var i=0;i<document.forms.length;i++)
			{
				for (var j=0;j < document.forms[i].elements.length;j++)
				{  
					if(document.forms[i].elements[j].tagName == "INPUT" && document.forms[i].elements[j].type == "password") {
			    		name[encFieldCnt] = "E2E_" + document.forms[i].elements[j].name;
			        	//value[encFieldCnt] = GetEncDataFun("", document.forms[i].name, document.forms[i].elements[j].name);
			    		value[encFieldCnt] = document.getElementsByName("E2E_"+document.forms[i].elements[j].name).value;
								
								
						e2eEle = findElementByName(document.forms[i], name[encFieldCnt]);
						if( e2eEle == null ) {
								var newEle = document.createElement("input");
								newEle.type = "hidden";
								newEle.name = name[encFieldCnt];
								newEle.value = value[encFieldCnt];
								document.forms[i].appendChild(newEle);
						}
						else {
								e2eEle.value = value[encFieldCnt];
						}
					
						encFieldCnt++;
			    	}
			    	else if (document.forms[i].elements[j].tagName == "INPUT" && document.forms[i].elements[j].type == "text" && document.forms[i].elements[j].getAttribute('enc')=="on") {
				       	name[encFieldCnt] = "E2E_" + document.forms[i].elements[j].name;
//				        value[encFieldCnt] = GetEncDataFun("", document.forms[i].name, document.forms[i].elements[j].name);
				       	value[encFieldCnt] = document.getElementsByName("E2E_"+document.forms[i].elements[j].name).value;
									
						e2eEle = findElementByName(document.forms[i], name[encFieldCnt]);
						if( e2eEle == null ) {
								var newEle = document.createElement("input");
								newEle.type = "hidden";
								newEle.name = name[encFieldCnt];
								newEle.value = value[encFieldCnt];
								document.forms[i].appendChild(newEle);
						}
						else {
								e2eEle.value = value[encFieldCnt];
						}
					
				        encFieldCnt++;        		
			    	}  	
	
				}
			}
			
			for (i = 0; i < encFieldCnt; i++)
			{		
				if (typeof(value[i]) != "undefined")
				{
					cipherEncText += name[i];
					cipherEncText += "=";			
					cipherEncText += value[i];
					cipherEncText += "%TK%";
				}
			}*/
			var cipherEncText = "";
			$j("input[type=text]").each(function(){
				if($j(this).attr("enc")=="on" && $j("#E2E_"+this.id).size() > 0){
					cipherEncText += $j("#E2E_"+this.id).attr("id");
					cipherEncText += "=";
					cipherEncText += $j("#E2E_"+this.id).val();
					cipherEncText += "%TK%";
				}
			});
			
			$j("input[type=password]").each(function(){
				if($j("#E2E_"+this.id).size() > 0){
					cipherEncText += $j("#E2E_"+this.id).attr("id");
					cipherEncText += "=";
					cipherEncText += $j("#E2E_"+this.id).val();
					cipherEncText += "%TK%";
				}
			});
			
			//document.getElementById("hid_enc_data").value = cipherEncText;
			hana.JHanaUtils.form.createHiddenField(formObj, "hid_enc_data", cipherEncText);
			hana.JHanaUtils.form.createHiddenField(formObj, "hid_use_enckey", "true");
		}
	}catch(e){
	}
	return;
};

/************************** 키보드보안 관련 끝 **************************/




/************************** 공인인증서 관련 시작 **************************/
/**
 * 인증서 창을 띄움 - 로그인 처럼 서명값이 필요가 없는 경우
 * @param {Object} signPlain 서명할 원본
 * @param {Object} callBackFnc 정상 callback 함수명
 * @param {Object} errCallBackFnc 오류 callbank 함수명
 */
pbk.web.util.showCertNoSign = function(signPlain, callBackFnc, errCallBackFnc, formObj) {
	//키보드 보안 사용
	pbk.web.util.makeEncKey(formObj);
	
	/*
	// 2012-11-13 lawsn OPB 추가사항 추가
	// 2012-11-14 lawsn Script 오류로 우선 주석처리
	XecureWeb.SetUITarget(document.getElementById(opb.base.MASK_WRAP_DIV));
	
//	alert(XecureWeb.SignDataCMS);
    XecureWeb.SignDataCMS (
    		XecureWeb.mXgateAddress, 
    		XecureWeb.mCAList, 
    		signPlain, 
    		256, 
    		"", 
    		XecureWeb.mLimitPassword, 
    		callBackFnc, 
    		errCallBackFnc);
    
//    XecureWeb.Sign_with_vid_user (XecureWeb.mXgateAddress, XecureWeb.mCAList, signPlain, 256, "", XecureWeb.mLimitPassword, callBackFnc, errCallBackFnc);
*/
    
    Delfino.sign(signPlain, callBackFnc, {cacheCertFilter:false, cacheCert:false, encoding:'euckr'});
};

 /**
  * 인증서 창을 띄움 - 타기관 및 타행 인증서 등록시 사용 하는 함수 
  * @param {Object} signPlain 서명할 원본
  * @param {Object} callBackFnc 정상 callback 함수명
  * @param {Object} errCallBackFnc 오류 callbank 함수명
  */
pbk.web.util.showCertNoSignOther = function(signPlain, callBackFnc, errCallBackFnc, formObj, svrCert, registrationBtn) {
	
	//키보드 보안 사용
	pbk.web.util.makeEncKey(formObj);
	
	// 2012-11-14 lawsn Script 오류로 우선 주석처리
	//XecureWeb.SetUITarget(document.getElementById(opb.base.CONTENTS_DIV));
	/*
	XecureWeb.SetUITarget(registrationBtn);
	
	
	XecureWeb.SignDataWithVID_Serial (XecureWeb.mXgateAddress,
										XecureWeb.mCAList,
										null,
										null,
										signPlain,
										256+16,
										"",
										XecureWeb.mLimitPassword,
										null,
										svrCert,
										callBackFnc,
										errCallBackFnc);
	 */
	
	Delfino.sign(signPlain, callBackFnc, {cacheCertFilter:false, cacheCert:false, encoding:'euckr'});
};

/**
 * 인증서 창을 띄움 - 당행등록여부와 상관없이 인증서 검증 시 사용 하는 함수 
 * @param {Object} signPlain 서명할 원본
 * @param {Object} callBackFnc 정상 callback 함수명
 * @param {Object} errCallBackFnc 오류 callbank 함수명
 */
pbk.web.util.showCertNoSignByFree = function(signPlain, callBackFnc, errCallBackFnc, formObj, svrCert, registrationBtn) {
	
	//키보드 보안 사용
	pbk.web.util.makeEncKey(formObj);
	
	// 2012-11-14 lawsn Script 오류로 우선 주석처리
	//XecureWeb.SetUITarget(document.getElementById(opb.base.CONTENTS_DIV));
	// XecureWeb.SetUITarget(registrationBtn);
	
	/*
	XecureWeb.SignDataWithVID_Serial (XecureWeb.mXgateAddress,
										XecureWeb.mCAList,
										null,
										null,
										signPlain,
										256+16,
										"",
										XecureWeb.mLimitPassword,
										null,
										svrCert,
										callBackFnc,
										errCallBackFnc);
	 */
	
	Delfino.sign(signPlain, 
				 function(result) {
					// 취소
					if(result.status==0) return;
			    	// 정상
			        if(result.status==1){
						callBackFnc.call(this, result);
				    // 오류
			      	} else {
			        }
				 }, 
				 {cacheCertFilter:false, cacheCert:false, encoding:'euckr'});
};

/**
 * 인증서 창을 띄움 - 당행등록여부와 상관없이 인증서 검증과 전자서명을 동시에 실행.
 * @param {Object} signPlain 서명할 원본
 * @param {Object} callBackFnc 정상 callback 함수명
 * @param {Object} errCallBackFnc 오류 callbank 함수명
 * @param {String} provider 전자서명을 할 인증서 선택. ex>'delfino' 공동인증서, 'fincert' 금융인증서, 값이없으면 선택가능(default)
 */
pbk.web.util.showCertWithSignByFree = function(signPlain, callBackFnc, errCallBackFnc, formObj, svrCert, registrationBtn, provider) {
    
    //키보드 보안 사용
    pbk.web.util.makeEncKey(formObj);
    
    var signData = getSignedData(formObj, '');
    
    // 2012-11-14 lawsn Script 오류로 우선 주석처리
    //XecureWeb.SetUITarget(document.getElementById(opb.base.CONTENTS_DIV));
    // XecureWeb.SetUITarget(registrationBtn);
    
    /*
    XecureWeb.SignDataWithVID_Serial (XecureWeb.mXgateAddress,
                                        XecureWeb.mCAList,
                                        null,
                                        null,
                                        signPlain,
                                        256+16,
                                        "",
                                        XecureWeb.mLimitPassword,
                                        null,
                                        svrCert,
                                        callBackFnc,
                                        errCallBackFnc);
     */
    
    var certOpt = {cacheCertFilter:false, cacheCert:false, encoding:'euckr'};
	if(provider != null && provider != undefined ){
		certOpt.provider = provider;
	}
    
    Delfino.sign(signData, 
                 function(result) {
                    // 취소
                    if(result.status==0) return;
                    // 정상
                    if(result.status==1){
                        callBackFnc.call(this, result);
                    // 오류
                    } else {
                    }
                 }, 
                 certOpt );
};

/**
 * 공인인증서 제출 시 모듈 호출
 * 전자서명 부분을 인증서 창에 보여주지 않는 모듈로 호출한다.
 * @param {Object} url 전자서명 URL
 * @param {Object} formObj 제출 폼
 * @param {Object} nohtml 조건 (yes:전자서명 값 출력안함,other:타인인증서사용)
 * @param {Object} callBackFnc 정상처리 콜백
 * @param {Object} errCallBackFnc 에러처리 콜백
 * @param {String} provider 전자서명을 할 인증서 선택. ex>'delfino' 공동인증서, 'fincert' 금융인증서, 값이없으면 선택가능(default)
 */
pbk.web.util.showCertWithHTMLSign = function(url, formObj, nohtml, callBackFnc, errCallBackFnc, provider) {

    var signData = '';
    
    /* 공인인증서 DIV 가 생성될 위치 지정 */
    // XecureWeb.SetUITarget(document.getElementById(opb.base.CONTENTS_DIV));
    
	/* 키보드 보안 값 저장  */
	pbk.web.util.makeEncKey(formObj);
	
	signData = getSignedData(formObj, '');
	
	//{cacheCertFilter:false, cacheCert:false, encoding:'euckr'}
	var certOpt = {cacheCertFilter:false, cacheCert:false, encoding:'euckr'};
	if(provider != null && provider != undefined ){
		certOpt.provider = provider;
	}
	
	//뱅크사인증서를 사용하면 return;
	if(pbk.web.util.showBankSign(formObj, callBackFnc, signData, url)) return;
	
	/* CASE 1 
	 * nohtml == 'other'
	 * 인증서 시리얼과 무관하게 타인 인증서를 제출하려고 할때
	 * (ex.14세미만의 사용자가  부모의 인증서를 가지고 신용정보 동의를 얻으려고 할때)
	 * 입력받은 주민등록번호와 인증서의 VID값 검증이 필요하므로 callback result.signData가 아닌 result를 넘겨주어 
	 * callBack함수에서 해당 값을 추출하여 셋팅하도록한다.
	 *
	 */
//    if((_CERT_SERIAL_ == undefined || _CERT_SERIAL_ == '') || nohtml == 'other') {
	if('other' == nohtml) {
    	Delfino.sign(signData, 
    				 function(result) {
						// 취소
			    		if(result.status==0) return;
				    	// 정상
				        if(result.status==1){
							callBackFnc.call(this, result);
					    // 오류
				      	} else {
				        }
    				 },
    				 certOpt );
    	
//    	Delfino.sign(signData, callBackFnc.apply(this, result.signData), {resetCertificate:true, cacheCert:true});
        
	} 
	/* CASE 1 
     * 인증서 시리얼이 없는 경우.. 아마 오픈뱅킹의 소프트포럼모듈을 사용할때 생겨난 로직을 추측.
     * 현재 로직에서 굳이 나눌필요가 없는것으로 판단되나... 이미 나눠진상태로 개발되었으므로 기존 로직에 맞게 수정한다.
     * 
     * CASE 2
     * 가장 일반적인 경우로, 전자서명이 필요한 화면에 인증서를 제출하는 경우.
     * 
     * callBack 함수에 result.signData 값만 넘겨주는 형태로 전자서명값만 전달한다.
     *
     */
	else {
    	
        if(_CERT_SERIAL_ != undefined && _CERT_SERIAL_ != ''){
    	/* 인증서가 있는 위치 설정_ 현재 의미없는 로직. 왜하는지 파악할 필요가 있음.  */
        	var cert_storage = '';
        	if(_SOFO_LOCATION_ != '') {
        		cert_storage = _SOFO_LOCATION_;
        	} else {
        		if(_CERT_LOCATION_ == 'HDD') {
        			cert_storage = '1';
        		} else if(_CERT_LOCATION_ == 'USB') {
        			cert_storage = '101';
        		} else {
        			cert_storage = '1';
        		}
        	}
        }

    	Delfino.sign(signData, 
    				 function(result) {
    					// 취소
			    		if(result.status==0) return;
				    	// 정상
				        if(result.status==1){
	    					callBackFnc.call(this, result.signData);
					    // 오류
				      	} else {
				        }
    				 }, 
    				 certOpt );

    	//Delfino.sign(signData, callBackFnc.apply(this, result.signData), {cacheCert:true}); 
    }
    
};

/**
 * 공인인증서 제출 시 모듈 호출
 * 전자서명 부분을 인증서 창에 보여주지 않는 모듈로 호출한다.금융결제원 제출용 거래(전자어음, 전자채권 등)
 * @param {Object} url 전자서명 URL
 * @param {Object} formObj 제출 폼
 * @param {Object} nohtml 조건 (yes:전자서명 값 출력안함,other:타인인증서사용)
 * @param {Object} callBackFnc 정상처리 콜백
 * @param {Object} errCallBackFnc 에러처리 콜백
 */
pbk.web.util.showCertWithElecSign = function(url, formObj, nohtml, callBackFnc, errCallBackFnc) {

    var signData = '';
    
    /* 공인인증서 DIV 가 생성될 위치 지정 */
    // XecureWeb.SetUITarget(document.getElementById(opb.base.CONTENTS_DIV));
    
	/* 키보드 보안 값 저장  */
	pbk.web.util.makeEncKey(formObj);
	
	
	signData = getSignedData(formObj, '');
	
	/* 전자서명을 처리하는 URL 인지 확인  */
//	if(opb.base.signUrl_map.keys().include(url)) {
//        signData = getSignedData(formObj, '');
//        
//    } else {
//    	opb.common.layerpopup.openMessage_fnc({
//			isConfirm: false,
//			title: '오류',
//			message: '전자서명이 필요한 페이지가 아닙니다.',
//			callback: null
//		});
//		return;
//    }
//	
//	if(signData == '') {
//		opb.common.layerpopup.openMessage_fnc({
//			isConfirm: false,
//			title: '오류',
//			message: '전자서명 데이터 생성에 실패하였습니다.',
//			callback: null
//		});
//		return;
//	}
	
//	/* CASE 1 
//	 * nohtml == 'other'
//	 * 인증서 시리얼과 무관하게 타인 인증서를 제출하려고 할때
//	 * (ex.14세미만의 사용자가  부모의 인증서를 가지고 신용정보 동의를 얻으려고 할때)
//	 * 
//	 * CASE 2
//	 * 인증서 시리얼이 없는 경우
//	 */
//    if((_CERT_SERIAL_ == undefined || _CERT_SERIAL_ == '')
//    		|| nohtml == 'other') {
//    	
//        XecureWeb.SignDataCMS (
//        		XecureWeb.mXgateAddress, 
//        		XecureWeb.mCAList, 
//        		signData, 
//        		768, 
//        		'', 
//        		XecureWeb.mLimitPassword, 
//        		callBackFnc, 
//        		errCallBackFnc);
//        
//    /* 인증서 시리얼이 있는 경우  */
//    } else {
//    	
//    	/* 인증서가 있는 위치 설정  */
//    	var cert_storage = '';
//    	if(_SOFO_LOCATION_ != '') {
//    		cert_storage = _SOFO_LOCATION_;
//    	} else {
//    		if(_CERT_LOCATION_ == 'HDD') {
//    			cert_storage = '1';
//    		} else if(_CERT_LOCATION_ == 'USB') {
//    			cert_storage = '101';
//    		} else {
//    			cert_storage = '1';
//    		}
//    	}
//
//        XecureWeb.SignDataCMSWithSerial (
//            XecureWeb.mXgateAddress,
//            XecureWeb.mCAList,
//            _CERT_SERIAL_,
//            cert_storage,
//            signData,
//            768,
//            '',
//            XecureWeb.mLimitPassword,
//            callBackFnc);
//    	
//    }
	
	/* CASE 1 
	 * nohtml == 'other'
	 * 인증서 시리얼과 무관하게 타인 인증서를 제출하려고 할때
	 * (ex.14세미만의 사용자가  부모의 인증서를 가지고 신용정보 동의를 얻으려고 할때)
	 * 
	 * CASE 2
	 * 인증서 시리얼이 없는 경우
	 */
    if((_CERT_SERIAL_ == undefined || _CERT_SERIAL_ == '') || nohtml == 'other') {
    	Delfino.sign(signData, 
    				 function(result) {
						// 취소
			    		if(result.status==0) return;
				    	// 정상
				        if(result.status==1){
							callBackFnc.call(this, result.signData);
					    // 오류
				      	} else {
				        }
    				 }, 
    				 {signType:"signedData", cacheCertFilter:false, cacheCert:false, encoding:'euckr'});
    	
    	//Delfino.sign(signData, callBackFnc.apply(this, result.signData), {resetCertificate:true, cacheCert:true});
        
    /* 인증서 시리얼이 있는 경우  */
    } else {
    	
    	/* 인증서가 있는 위치 설정  */
    	var cert_storage = '';
    	if(_SOFO_LOCATION_ != '') {
    		cert_storage = _SOFO_LOCATION_;
    	} else {
    		if(_CERT_LOCATION_ == 'HDD') {
    			cert_storage = '1';
    		} else if(_CERT_LOCATION_ == 'USB') {
    			cert_storage = '101';
    		} else {
    			cert_storage = '1';
    		}
    	}

    	Delfino.sign(signData, 
    				 function(result) {
    					// 취소
			    		if(result.status==0) return;
				    	// 정상
				        if(result.status==1){
	    					callBackFnc.call(this, result.signData);
					    // 오류
				      	} else {
				        }
    				 }, 
    				 {signType:"signedData", cacheCertFilter:false, cacheCert:false, encoding:'euckr'});

    	//Delfino.sign(signData, callBackFnc.apply(this, result.signData), {cacheCert:true}); 
    }
    
};

/**
 * 공인인증서 제출 시 모듈 호출
 * 전자서명 부분을 인증서 창에 보여주지 않는 모듈로 호출한다.
 * @param {Object} url 전자서명 URL
 * @param {Object} formObj 제출 폼
 * @param {Object} nohtml 조건 (yes:전자서명 값 출력안함,other:타인인증서사용)
 * @param {Object} callBackFnc 정상처리 콜백
 * @param {Object} errCallBackFnc 에러처리 콜백
 */
//pbk.web.util.showCertWithHTMLSign2 = function(url, formObj, nohtml, callBackFnc, errCallBackFnc) {
//
//    var signData = '';
//    
//    /* 공인인증서 DIV 가 생성될 위치 지정 */
//    XecureWeb.SetUITarget(document.getElementById(opb.base.CONTENTS_DIV));
//    
//	/* 키보드 보안 값 저장  */
//	pbk.web.util.makeEncKey(formObj);
//	
//	
//	signData = getSignedData(formObj, '');
//	
//	/* 전자서명을 처리하는 URL 인지 확인  */
////	if(opb.base.signUrl_map.keys().include(url)) {
////        signData = getSignedData(formObj, '');
////        
////    } else {
////    	opb.common.layerpopup.openMessage_fnc({
////			isConfirm: false,
////			title: '오류',
////			message: '전자서명이 필요한 페이지가 아닙니다.',
////			callback: null
////		});
////		return;
////    }
////	
////	if(signData == '') {
////		opb.common.layerpopup.openMessage_fnc({
////			isConfirm: false,
////			title: '오류',
////			message: '전자서명 데이터 생성에 실패하였습니다.',
////			callback: null
////		});
////		return;
////	}
//	
//	/* CASE 1 
//	 * nohtml == 'other'
//	 * 인증서 시리얼과 무관하게 타인 인증서를 제출하려고 할때
//	 * (ex.14세미만의 사용자가  부모의 인증서를 가지고 신용정보 동의를 얻으려고 할때)
//	 * 
//	 * CASE 2
//	 * 인증서 시리얼이 없는 경우
//	 */
//    if((_CERT_SERIAL_ == undefined || _CERT_SERIAL_ == '')
//    		|| nohtml == 'other') {
//    	
//        XecureWeb.SignDataCMS (
//        		XecureWeb.mXgateAddress, 
//        		XecureWeb.mCAList, 
//        		signData, 
//        		256, 
//        		'', 
//        		XecureWeb.mLimitPassword, 
//        		callBackFnc, 
//        		errCallBackFnc);
//        
//    /* 인증서 시리얼이 있는 경우  */
//    } else {
//    	
//    	/* 인증서가 있는 위치 설정  */
//    	var cert_storage = '';
//    	if(_SOFO_LOCATION_ != '') {
//    		cert_storage = _SOFO_LOCATION_;
//    	} else {
//    		if(_CERT_LOCATION_ == 'HDD') {
//    			cert_storage = '1';
//    		} else if(_CERT_LOCATION_ == 'USB') {
//    			cert_storage = '101';
//    		} else {
//    			cert_storage = '1';
//    		}
//    	}
//
//        XecureWeb.SignDataCMSWithSerial (
//            XecureWeb.mXgateAddress,
//            XecureWeb.mCAList,
//            _CERT_SERIAL_,
//            cert_storage,
//            signData,
//            256,
//            '',
//            XecureWeb.mLimitPassword,
//            callBackFnc);
//    	
//    }
//};

/**
 * 인증서 창을 띄움 - 화면에 전자서명 원본을 보여줄 경우
 * @param {Object} signPlain 서명 원문
 * @param {Object} serial 인증서 시리얼
 * @param {Object} location 인증서 저장위치
 * @param {Object} callBackFnc
 * @param {Object} errCallBackFnc
 * @deprecated 전자서명 HTML 보여주는 부분을 제거한다.
 */
//pbk.web.util.showCertWithHTMLSign_backup = function(url, formObj, nohtml, callBackFnc, errCallBackFnc) {
//    var signData = "";
//    
//    // 공인인증서 DIV 가 생성될 위치 지정
//    XecureWeb.SetUITarget(document.getElementById(opb.base.CONTENTS_DIV));
//    
//	//키보드 보안 사용
//	pbk.web.util.makeEncKey(formObj);
//	
//	signData = getSignedData(formObj, "");
//	
////	if(opb.base.signUrl_map.keys().include(url)) {
////        signData = getSignedData(formObj, "");
////    } else {
////    	opb.common.layerpopup.openMessage_fnc({
////			isConfirm: false,
////			title: '오류',
////			message: '전자서명이 필요한 페이지가 아닙니다.',
////			callback: null
////		});
////		return;
////    }
////	
////	if(signData == "") {
////		opb.common.layerpopup.openMessage_fnc({
////			isConfirm: false,
////			title: '오류',
////			message: '전자서명 데이터 생성에 실패하였습니다.',
////			callback: null
////		});
////		return;
////	}
//	
//
//    /*  2013-02-07 전자서명값을 보여주는 부분은 이미지만 보여준다.  *********************************************************************************
//	var sign_html_template = "";
//    sign_html_template += "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">";
//    sign_html_template += "<html xmlns=\"http://www.w3.org/1999/xhtml\">";
//    sign_html_template += " <head>";
//    sign_html_template += "  <title> 하나은행 오픈뱅킹</title>";
//    sign_html_template += " <meta http-equiv=\"Content-Type\" content=\"text/html; charset=euc_kr\" />";
//    sign_html_template += " </head>";
//
//    sign_html_template += " <body style=\"position: relative; margin:0px; padding:0px; font-family:Dotum, 돋움, 굴림, Gulim, verdana, Tahoma sans-serif; font-size:75%; color:#414141; height:100%;\">";
//    sign_html_template += " <div style=\"overflow:auto; overflow-x:hidden; width:400px; height:150px;\">";
//    sign_html_template += "     <table summary=\"내가입력한 내용보기\" style=\"width:100%; background:#fff;\">";
//    sign_html_template += "     <caption style=\"display:none;\">내가입력한 정보</caption>";
//    sign_html_template += "         <colgroup>";
//    sign_html_template += "             <col style=\"width:180px;\" />  <col style=\"*\" />";
//    sign_html_template += "         </colgroup>";
//    sign_html_template += "         <tbody>";
//    sign_html_template += "             <tr>";
//    sign_html_template += "                 <th scope=\"col\" colspan=\"2\" style=\"text-align:center; padding:8px 0 6px 0; border-bottom:1px solid #e1e1e1;\"><img src=\"https://stg.img.hanabank.com:8109/resource/img/common/img_ologo.gif\" alt=\"하나은행 오픈뱅킹\" /></th>";
//    sign_html_template += "             </tr>";
//    sign_html_template += "             <tr>";
//    sign_html_template += "                 <th scope=\"col\" colspan=\"2\" style=\"font-size:11px; background:#d75676; text-align:center; padding:8px 0 6px 0; color:#fff; font-weight:normal; border-bottom:1px solid #e1e1e1;\">내용을 확인하신 후 인증서 암호를 입력하시면 전자서명이 제출됩니다.</th>";
//    sign_html_template += "             </tr>";
//
//    var row = signData.split("&");
//    for(var i=0; i < row.length; i++) {
//        if(!hana.validation.isNull(row[i])) {
//            var col = (row[i]).split("=");
//            if(!hana.validation.isNull(col[0])) {
//				
//				if(col[1].length < 50) {
//				sign_html_template += "  <tr>";
//                sign_html_template += "  <th scope='row' style=\"font-size:11px; border-bottom:1px solid #e1e1e1; text-align:left; padding:6px 0 6px 5px;\"><span style=\"padding-left:16px; background:url('/resource/img/comm/tit_bul3.gif') no-repeat left 4px;\">" + col[0].substr(0, col[0].indexOf("[")) + "</span></th>";
//                sign_html_template += "  <td style=\"font-size:11px; font-weight:bold; border-bottom:1px solid #e1e1e1; text-align:left;\">:<span style=\"padding-left:8px; font-weight:normal;\">"+col[1]+"</span></td>";
//                sign_html_template += "  </tr>";	
//				} else {
//				sign_html_template += "  <tr>";
//                sign_html_template += "  <td scope='row' colspan='2' style=\"font-size:11px; border-bottom:1px solid #e1e1e1; text-align:left; padding:6px 0px 2px 5px;\"><span style=\"padding-left:16px; background:url('/resource/img/comm/tit_bul3.gif') no-repeat left 4px; font-weight:bold;\">" + col[0].substr(0, col[0].indexOf("[")) + "</span> <br />";
//                sign_html_template += "  <p style=\"padding:0px 5px 0px 5px; text-align:justify; line-height:1.4;\">"+col[1]+"</p></td>";
//                sign_html_template += "  </tr>";
//				}
//                
//            }
//        }
//    }
//    sign_html_template += "        </tbody>";
//    sign_html_template += "    </table>";
//    sign_html_template += "    </div>";
//    sign_html_template += "</body>";
//    sign_html_template += "</html>";
//    ********************************************************************************************************************************************/
//
//    /* 2013-02-07 전자서명값을 보여주는 부분은 이미지만 보여준다. */
//	var signimg = opb.base.IMG_SVR_DOMAIN + '/resource/img/hanabank_open_r.jpg';
//	var sign_html_template = '<table border="0"><tr><td><img style="width:366px; height:116px" id="banner" src="' + signimg + '">';
//    
//	var cert_storage = "";
//	if(_SOFO_LOCATION_ != "") {
//		cert_storage = _SOFO_LOCATION_;
//	} else {
//		if(_CERT_LOCATION_ == "HDD") {
//			cert_storage = "1";
//		} else if(_CERT_LOCATION_ == "USB") {
//			cert_storage = "101";
//		} else {
//			cert_storage = "1";
//		}
//	}
//	
//	
////	if(_CERT_SERIAL_.indexOf("|") > -1) {
////		_CERT_SERIAL_= _CERT_SERIAL_.substring(0, _CERT_SERIAL_.length - 1).toLowerCase();
////	}
//	
//    if(_CERT_SERIAL_ == undefined || _CERT_SERIAL_ == "") {
//        //인증서 시리얼이 없는 경우
//        XecureWeb.SignDataCMSWithHTMLEx (
//            XecureWeb.mXgateAddress,
//            XecureWeb.mCAList,
//            sign_html_template,
//            signData,
//            "",
//            256,
//            "",
//            XecureWeb.mLimitPassword,
//            callBackFnc,
//            errCallBackFnc);
//    } else {
//        if(nohtml == "yes") {
//            //인증서 시리얼이 있는 경우 NO HTML
//            XecureWeb.SignDataCMSWithSerial (
//                XecureWeb.mXgateAddress,
//                XecureWeb.mCAList,
//                _CERT_SERIAL_,
//                cert_storage,
//                signData,
//                256,
//                "",
//                XecureWeb.mLimitPassword,
//                callBackFnc);
//        }else if(nohtml == "other"){
//        	
//        	//인증서 시리얼과 무관하게 타인 인증서를 제출하려고 할때 ( ex.14세미만의 사용자가  부모의 인증서를 가지고 신용정보 동의를 얻으려고 할때)
//            XecureWeb.SignDataCMSWithHTMLEx (
//                XecureWeb.mXgateAddress,
//                XecureWeb.mCAList,
//                sign_html_template,
//                signData,
//                "",
//                256,
//                "",
//                XecureWeb.mLimitPassword,
//                callBackFnc,
//                errCallBackFnc);
//        	
//        }else {
//            //인증서 시리얼이 있는 경우 HTML
//            XecureWeb.SignDataCMSWithHTMLExAndSerial (
//                XecureWeb.mXgateAddress,
//                XecureWeb.mCAList,
//                _CERT_SERIAL_,
//                cert_storage,
//                sign_html_template,
//                signData,
//                "",
//                256,
//                "",
//                XecureWeb.mLimitPassword,
//                callBackFnc,
//                errCallBackFnc);
//        }
//
//    }
//};

/************************** 공인인증서 관련 끝 **************************/

/***뱅크사인 인증서 관련 시작 ***/
pbk.web.util.initBankSign = function()
{
    opb.base.useBankSign = false;
    
    bankSignFormObj = null;
    bankSignJson = null;
    bankSignCallBack = null;
};

pbk.web.util.initBankSignField = function()
{
    document.getElementById('ML_businessTypeCode').value = "";
    document.getElementById('ML_originalText').value = "";
    document.getElementById('ML_originalMessage').value = "";
    
};


pbk.web.util.bankSignCallBack = function(result)
{
    opb.base.useBankSign = true;
    bankSignJson = result;
    bankSignNonce = null;
    
    bankSignCallBack.call(this, result.signDoc);
};

pbk.web.util.addBankSignField = function(formObj)
{   
    if(bankSignJson == null) return;
    
    pbk.web.util.initBankSignField();
    
    form.createHiddenField(formObj,'signed_msg', bankSignJson.signDoc, false);
    form.createHiddenField(formObj,'isBankSignCert', opb.base.LGIN_CERT_METH_CD, false);
    form.createHiddenField(formObj,'vidR', bankSignJson.vidR, false);
    form.createHiddenField(formObj,'certificationType', bankSignJson.certificationType, false);
};

pbk.web.util.showBankSign = function(formObj, callBackFnc, signData, url){
    
    bankSignCallBack = null;
    //뱅크사인 인증서 사용중이고, 제출이 필요한 URL이면...
    if("F" == opb.base.LGIN_CERT_METH_CD && opb.base.bankSignUrl_map.keys().include(url)){
        
        bankSignCallBack = callBackFnc;
       
        document.getElementById('ML_businessTypeCode').value = "03";
        document.getElementById('ML_originalText').value = pbk.web.util.bankSignAddNonce(signData);
        document.getElementById('ML_originalMessage').value = pbk.web.util.getBankSignedData(formObj, '');
//        document.getElementById('ML_originalMessage').value = util.replaceAll(signData ,"&" ,"<BR/>");
        
        openBankSign();                 // Dialog open 함수
        
        return true;
    }else
        form.createHiddenField(formObj,'isBankSignCert', '2', false);
    
    return false;
};

pbk.web.util.bankSignAddNonce = function(data)
{
    var nonce = bankSignNonce || pbk.web.util.bankSignGetNonce();
    
    if(data.length>0) data +="&";
    data += "bankSignNonce=" + encodeURIComponent(nonce);
    
    return data;
};

pbk.web.util.bankSignGetNonce = function()
{
    var response = "";
    jQuery.ajax({
        url: bankSignNonceURL,
        async: false,
        dataType: "text",
        cache: false,
        success: function(data) {
            response = data;
        }
    });
    response = response.replace(/^\s*/, "").replace(/\s*$/, "");
    
    bankSignNonce = response;
    
    return response;
    
};

/*
 * 뱅크사인앱에서 보여주기위한-즉,고객에서 보여지는- 전자서명 데이터이므로 조금 더 깔끔하게 정리.
 */
pbk.web.util.getBankSignedData= function(form, eraseObjNames)
{

    if(form == null)
        return "";

    var eObjs = null;

    if(typeof(eraseObjNames)=="string") {
        eObjs = eraseObjNames.split(",");
    } else {
        eObjs = eraseObjNames;
    }

    var strResult = "";
    var $form = $j(form);
    $form.find("input[data-signid], input[name='ebondData']").each(function(idx, el) {
        
        var _signid = $j(el).data("signid");
        var _val = $j(el).val();
        var _id = $j(el).attr("id");
        var _name = $j(el).attr("name");
        var _type = $j(el).attr("type");

        if(_name == null || _name == '' || typeof _name == 'undefined') {
            return;         
        } else {

            // 기업결재 전자서명일 경우엔 value만 넣는다.
            if(_name == "ebondData") {
                strResult += _val;
                return;
            }
            
        }

        if(_signid == null || _signid == '' || typeof _signid == 'undefined') {
            return;
        }

        if(_name=="filedata") return;

        // 20090413 전사암호화 필드 제외 (아래에 제외한 필드에 포함되지만..)
        if(_name=="password") return;
        if(_name=="pw") return;
        if(_name=="acctPw") return;
        if(_name=="paymAcctPw") return;
        if(_name=="wdrwAcctPw") return;
        if(_name=="ognTrscWdrwAcctPw") return;
        if(_name=="updBfPw") return;
        if(_name=="updAfPw") return;
        if(_name=="secPwd1_card") return;
        if(_name=="secPwd2_card") return;

        //////////////////////////
        //add to smgrl 2004/07/16
        if(eObjs!=null){

            for(var j=0; j<eObjs.length; j++){
                if(_name == eObjs[j]){
                    return;
                }
            }

        }

        //제외한 컨트롤 지정 (AS-IS 남기승)
        if ( ((_type == "button") || (_type == "reset") || (_type == "submit") || (_type == "password"))) return;
        if ( ((_type == "radio") || (_type == "checkbox")) && (el.checked!=true) ) return;
        if ( _id == "*" ) return;

        if (_type == "select-one") {
            var sel = el.selectedIndex;
            if(sel < 0)
                return;
            else
                _val = el.options[sel].value;
        }

        //add to smgrl 2004/06/29
        if(_type == "select-multiple") {

            for(var j=0;j < el.options.length;j++){
                if(el.options[j].selected==true){
                    if(strResult!="") strResult += "<BR/>";
                    strResult += _name;
                    strResult += " : ";
                    strResult += el.options[j].value;
                }
            }
            return;
        }

        // element.id를 키로 서명값저장, element.id와 value가 있을 경우에만 저장
        if (_signid && null != _signid && _signid != "" && _val && null != _val && _val != "") {
            if (strResult!="") strResult += "<BR/>";
            
            strResult += _signid+" : ";

            // 20091028 전자서명데이터중 약정서는 escape로 치환
            if(_name.indexOf("signAgreeContents") == 0) {
                _val = escape(_val);
            } else {
                _val = hana.JHanaUtils.form.removeFormatChar(el, _val);
            }
            strResult += _val;
        }

    });
    
    return strResult;
};

/***뱅크사인 인증서 관련 끝 ***/


/**
* 공인인증서용 지정PC 알림 및 보안카드 OTP 사용자 거래불가 팝업
* 
* 2012.12.26  나 기 민       
*/        
pbk.web.util.commonInfoPopup = function(_url, objTitle)
{	
	var url = opb.base.APPLICATION_CONTEXT_ROOT + _url;
	
	var data = hana.JHanaUtils.cookie.getCookie(objTitle);
	if(data != "Y"){
		opb.common.layerpopup.openLayer_fnc(url, objTitle, null, null, null);     
	}        		   	        
};

pbk.web.util.commonInfoPopup.checkbox = function(form)
{
	if(form.today.checked == true){
		hana.JHanaUtils.cookie.setCookie('commonInfoPopup', 'Y', hana.JHanaUtils.cookie.getExpDate(1,0,0),'/',window.location.hostname);
	}
	opb.common.layerpopup.closeLayer_fnc('commonInfoPopup');
};
