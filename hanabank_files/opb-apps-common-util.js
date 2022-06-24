/************************************************************************************************
 * @file opb-apps-common-util.js
 * @since 2012. 12. 17.
 * @author 오범석
 * 
 * @filelocation 일부 업무에서 공통적(2개이상)으로 사용하는 업무 스크립트 
 * 
 * @fileoverview 기타 등등.
 *
 * @dependencies pbk
 * 
 * @warn 수정 시 반드시 관리자와 상의하세요. 
 * 
 * <pre>
 * ==============================================================================================
 * 변경이력:
 * DATE                AUTHOR        DESCRIPTION
 * ----------------------------------------------------------------------------------------------
 * 2012.12.17          오범석        최초작성
 * </pre>
 ************************************************************************************************/

/**
* 구 은행코드가 검출되면 신은행코드로 다시 select 한다.
* 
* @use /js/transfer/account/wpdep411_01t_01.js
* @use /js/transfer/autotrans/wpdep414_43t.js
*/
opb.apps.common.util.setComboNewBnkCdFromOldBnkCd_fnc = function(combo, old_bank_code)
{
	try
	{
	    var _form_obj = form.createForm([{id:'oldBnkCd', value :old_bank_code}] );
	
	    var _hana_ajax = new hana.JHanaAjax('', true, true);
	    _hana_ajax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + '/common/getNewBnkCdFromOldBnkCd.do', _form_obj, true,
	        function(res, args) {
	            var _data = eval('(' + res.responseText + ')');
	            combo.value = _data.newBnkCd;
	        }//[end] callback
	        , 'EUC-KR');
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.apps.common.util.setComboNewBnkCdFromOldBnkCd_fnc]');
	}	
};

/**
 * 전자통장 통장사본인쇄
 * 
 * @use /jsp/inquiry/account/wpdep406_17p.jsp
 * @use /jsp/inquiry/account/wpdep406_18p.jsp
 * @use /jsp/inquiry/account/wpdep406_20p.jsp
 */
opb.apps.common.util.openPrintBankbookCopy_fnc = function(acct_no, subject, new_date, buss_br_nm, temp, psbk_iss_shp_cd, type_cd, atcnm, prd_cd, expi_dt) 
{
	try
	{
	    var _url = opb.base.APPLICATION_CONTEXT_ROOT + '/inquiry/account/wpdep406_21p.do';
	
	    /* 상품코드가 없을 경우 0으로 설정  */
	    if(opb.common.util.isEmpty_fnc(prd_cd))
	    {
	    	prd_cd = '0';
	    }
	
	    /* 만기일이 없을 경우 0으로 설정   */
	    if(opb.common.util.isEmpty_fnc(expi_dt))
	    {
	    	expi_dt = '0';
	    }

	    /* 파라미터로 전송할 폼을 만든다.  */
	    var _form_obj = form.createForm([{id:'acctNo', value:acct_no}, 
	                                    {id:'acctSubjNm', value:subject}, 
	                                    {id:'newDt', value:new_date},
	                                    {id:'bussBrNm', value:buss_br_nm},
	                                    {id:'temp', value:temp},
	                                    {id:'psbkIssShpCd', value:psbk_iss_shp_cd},
	                                    {id:'typCd', value:type_cd},
	                                    {id:'atcnm', value:atcnm},
	                                    {id:'prdCd1', value:prd_cd},
	                                    {id:'expiDt1', value:expi_dt}
	                                   ]);
	    
	    opb.common.layerpopup.openLayer_fnc(_url, 'bankBookCopyLayer', null, _form_obj);
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.apps.common.util.openPrintBankbookCopy_fnc]');
	}
};

/**		
 * 일시장애공지 팝업
 * 
 * @use /jsp/foreign/change/wpfxd452_01t.jsp
 * @use /jsp/inquiry/account/wpdep406_40i.jsp
 * @use /jsp/inquiry/account/wpdep406_42i_01.jsp
 * @use /jsp/open/test/transfer/account/wpdep411_01t_01.jsp
 * @use /jsp/transfer/account/wpdep411_01t_01.jsp
 * @use /jsp/transfer/account/wpdep412_01t_01.jsp
 * @use /jsp/transfer/account/wpdep416_01t_01.jsp
 * @use /jsp/transfer/autotrans/wpdep414_02t.jsp		
 */		
opb.apps.common.util.openObstacleNotice_fnc = function()
{
	try
	{
	    var _url = opb.base.APPLICATION_CONTEXT_ROOT + '/common/popup/error-temp_popup.do';		
	    opb.common.layerpopup.openLayer_fnc(_url, 'errorTempPopup', null, null);
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.apps.common.util.openObstacleNotice_fnc]');
	}
};


/**
 * 약관/특약 등의 내용 파일을 다운로드 이미지
 * 
 * @use /jsp/common/include_agree_cust_info.jsp
 * @use /jsp/deposit/common/include_agree_cust_info.jsp
 * @use /jsp/myhana/addition/wpcus403_45i_01.jsp
 * @use /jsp/myhana/personal/wpcus401_32t.jsp
 */
opb.apps.common.util.CREDIT_INFOMATION_IMG = 'wpcus_down.pdf';

/**
 * 약관/특약 등의 내용 파일을 다운로드 한다.
 * 
 * @author Jiho Park
 * @since 2009. 02. 25
 * 
 * @use /jsp/common/include_agree_cust_info.jsp
 * @use /jsp/deposit/common/include_agree_cust_info.jsp
 * @use /jsp/myhana/addition/wpcus403_45i_01.jsp
 * @use /jsp/myhana/personal/wpcus401_32t.jsp
 */
opb.apps.common.util.downloadFiles_fnc = function(file_name, form_obj)
{
	try
	{
		var _base_dir = opb.base.IMG_SVR_DOMAIN + '/resource/data/banking/deposit/';
		var _open_window = window.open(_base_dir + file_name, '', 'width=600, height=400, screenX=-100, screenY=-100, left=-10, top=-10 resizable=1');
		
		/* 자동로그아웃시간 연장 (20130306 자동으로 연장시키는 방법 사용 안함) */
//		opb.common.util.auto_logout_timer.renewAutoLogoutTime_fnc();
		
		if(form_obj != undefined && form_obj != null)
		{
		
			form_obj.isDownCREDIT_INFOMATION.value = 'Y';
		}
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.apps.common.util.downloadFiles_fnc]');
	}
};

/**
 * 개인정보변경 화면으로 이동 한다.
 */
opb.apps.common.util.goPersonInfoModifyForm_fnc = function()
{
	
	try
	{
		opb.common.layerpopup.openMessage_fnc({
		  	isConfirm: true , 
		  	title: '페이지 이동 안내 알림',
		  	message: '개인정보변경 페이지로 이동합니다.',
		  	callback: function(e){
		  		if (e == true){	// 확인버튼 클릭시 
		  			//location.href = opb.base.APPLICATION_CONTEXT_ROOT + '/myhana/personal/wpcus401_01i.do';
		  			opb.common.util.goMenu_fnc('/myhana/personal/wpcus401_01i.do');
		  		}
		  	}
		});
		
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.apps.common.util.goPersonInfoModifyForm_fnc]');
	}
};

/**
 * 휴대폰 본인인증 공유 폼 오브젝트 (전역으로 선언)
 */
opb.apps.common.util.authPhoneForm_obj = null;

/**
 * 휴대폰 본인인증 팝업 오픈
 *
 * @param {Object} form_obj document.form
 * @param {Object} is_num3enc_yn 뒤 네자리가 암호회 되어있는지 여부 
 */
opb.apps.common.util.openAuthPhoneNumber_fnc = function(form_obj, is_num3enc_yn)
{
	try
	{
		opb.apps.common.util.authPhoneForm_obj = form_obj;
		var _opb_host = window.location.protocol + '//' + window.location.host;
		 
		form.createHiddenField(form_obj,'returnUrlSuccess', _opb_host + opb.base.APPLICATION_CONTEXT_ROOT + '/common/popup/authMbphSuccess.do', false);
		form.createHiddenField(form_obj,'returnUrlError', _opb_host + opb.base.APPLICATION_CONTEXT_ROOT + '/common/popup/authMbphError.do', false);
		
		var _url = '/common/popup/authMbphCipherData.do';
		if(is_num3enc_yn != null && is_num3enc_yn != undefined && is_num3enc_yn == 'Y')
		{
			_url = '/common/popup/authMbphCipherDataEncrypt.do';
		}
		
		
		var _hana_ajax = new hana.JHanaAjax('', true, true);
		_hana_ajax.ajaxSubmit(opb.base.APPLICATION_CONTEXT_ROOT + _url, form_obj, true,
			function(res, option)
			{
				var _data = eval('(' + res.responseText + ')');
				var _popup_url = 'https://check.namecheck.co.kr/hanabank2/checkplus.cb?m=checkplusSerivceHpAuth&EncodeData=';
				window.open(_popup_url + _data.cipherData , 'HANA_POPUP_authMbphCipherData' , 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no, width=450, height=450, left=100, top=100');
			});
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.apps.common.util.openAuthPhoneNumber_fnc]');
	}
};

/**
 * 휴대폰 본인인증 결과 알림창을 오픈한다.
 * 
 * @param result 휴대폰 본인인증 결과 값(성공:success)
 */
opb.apps.common.util.openAlertMobileAuthResult_fnc = function(result)
{
	try
	{
		if('success' == result)
		{
			/* 휴대폰 본인인증 성공  */
			opb.apps.common.util.authPhoneForm_obj.mbphAuthYn.value = 'Y';
			opb.common.layerpopup.openAlert_fnc('본인인증 성공','휴대폰 본인인증을 완료 하였습니다.');
		}
		else
		{
			/* 휴대폰 본인인증 실패  */
			opb.apps.common.util.authPhoneForm_obj.mbphAuthYn.value = 'N';
			opb.common.layerpopup.openAlert_fnc('본인인증 실패','휴대폰 본인인증에 실패 하였습니다.');
		}
	}
	catch(e)
	{
		alert(location.href + '\n\n' + e + '\n[ERROR opb.apps.common.util.openAlertMobileAuthResult_fnc]');
	}
};

/**
 * 은행코드가 하나은행인지 확인
 * 하나은행(081) 및 구.외환은행(005) 포함
 */
opb.apps.common.util.isKEBHANA = function(bankCode) {
	
	if(bankCode == '81' || bankCode == '081' || bankCode == '5' || bankCode == '05' || bankCode == '005') {
		return true;
	}else {
		return false;
	}
	
};