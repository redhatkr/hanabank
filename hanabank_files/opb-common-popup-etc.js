try {
    if(null == pbk.common.popup || undefined == pbk.common.popup) {
         pbk.common.popup = {};
    }
} catch (e) {
    pbk.common.popup = {};
}

/**
 * 환경설정 팝업
 */
pbk.common.popup.environmentSetting = function() {
    
    var popupId = 'environmentSettingPopup';

    return {
        
        /**
         * 환경설정 팝업 열기
         * @param chnlSvcCd 채널 서비스 코드 
         */
        openPop : function(chnlSvcCd) {
            var virtualForm = document.createElement('form');
            form.createHiddenField(virtualForm, 'chnlSvcCd', chnlSvcCd);

            var url = '/b2b/popup/environment_setting.do';
            pbk.extJS.popup.open(url, popupId, 650, null, virtualForm);
        },

        /**
         * 환경설정 팝업 닫기
         */
        closePop : function() {
            pbk.extJS.popup.close(popupId);
        },

        /**
         * 디렉토리 설정
         */
        directorySetting : function() {
            $('directoryOpenId').click();
            $('filePath').value = $F('directoryOpenId');
        },

        /**
         * 환경설정 저장
         */
        save : function(formObj) {
            if($('fileAutSave').checked == true) {
                form.createHiddenField(formObj, 'fileAutSaveYn', 'Y');
            } else {
                form.createHiddenField(formObj, 'fileAutSaveYn', 'N');
            }
            
            var url = '/b2b/popup/environment_setting_save.do';
            var hanaAjax = new hana.JHanaAjax(hanaEnvironmentSettingContentDiv, true, true);
            hanaAjax.ajaxCommSubmitCallback(opb.base.APPLICATION_CONTEXT_ROOT + url, formObj, function(boolObj) {
                if(boolObj == true) {
                    hana.JHanaUtils.message.alert('환경설정', '환경설정 정보를 저장 했습니다.');
                    pbk.extJS.popup.close(popupId); 
                }
            });
        }
    }; // return -End

}(); // 환결성정 팝업 -End

