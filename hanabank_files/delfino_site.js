//-----------------------------------------------------------------------------------------------------------------------
// * 고객사 전용(공통함수 필요시 추가해서 사용)
// * 작성일 : 2015-07-07
//-----------------------------------------------------------------------------------------------------------------------

/**
 * 인증서 필터링 설정값
 * CERT_Accept_Koscom
 * CERT_Accept_YesSign
 */
/*
var CERT_Accept_Koscom_sample
    = "1.2.410.200004.5.1.1.7|"  //증권전산, 법인, 상호연동
    + "1.2.410.200004.5.1.1.9|"  //증권전산, 개인, 용도제한(개인)*
    + "1.2.410.200004.5.1.1.5|"  //증권전산, 개인, 상호연동
    + "1.2.410.200004.5.2.1.2|"  //정보인증, 개인, 상호연동
    + "1.2.410.200004.5.2.1.1|"  //정보인증, 법인, 상호연동
    + "1.2.410.200004.5.3.1.9|"  //전산원,   개인, 상호연동
    + "1.2.410.200004.5.3.1.2|"  //전산원,   법인, 상호연동
    + "1.2.410.200004.5.4.1.1|"  //전자인증, 개인, 상호연동
    + "1.2.410.200004.5.4.1.2|"  //전자인증, 법인, 상호연동
    + "1.2.410.200005.1.1.1|"    //금결원,  개인, 상호연동
    + "1.2.410.200005.1.1.5|"    //금결원,  법인, 상호연동
    + "1.2.410.200012.1.1.1|"    //무역정보, 개인, 상호연동
    + "1.2.410.200012.1.1.3|"    //무역정보, 법인, 상호연동
;

var CERT_Accept_YesSign_sample
    = "1.2.410.200005.1.1.1|"    //금결원, 개인, 상호연동
    + "1.2.410.200005.1.1.2|"    //금결원, 법인, 용도제한(은행/보험/카드)
    + "1.2.410.200005.1.1.4|"    //금결원, 개인, 용도제한(은행/보험/카드)
    + "1.2.410.200005.1.1.5|"    //금결원, 법인, 상호연동
    + "1.2.410.200005.1.1.6.1|"  //금결원, 법인, 용도제한(기업뱅킹)
    + "1.2.410.200004.5.4.1.1|"  //전자인증, 개인, 상호연동
    + "1.2.410.200004.5.4.1.2|"  //전자인증, 법인, 상호연동
    + "1.2.410.200004.5.1.1.7|"  //증권전산, 법인, 상호연동
    + "1.2.410.200004.5.1.1.5|"  //증권전산, 개인, 상호연동
;
*/

if (DC_platformInfo.Mobile && Delfino.getModule()!="G4" ) {
    var notice = DC_platformInfo.type + " " + DC_browserInfo.name  + "(" + DC_browserInfo.version + ") 으로 접속하셨습니다\n";
    notice += "Delfino " + Delfino.getModule() + "가 지원하지 않은 환경입니다.\n\n";
    notice += "Delfino G4(html5)로 설정하시겠습니까?";
    if (confirm(notice)) Delfino.setModule("G4");
} else if (Delfino.getModule()=="G4" && !Delfino.isSupportedG4()) {
    var notice = DC_platformInfo.type + " " + DC_browserInfo.name  + "(" + DC_browserInfo.version + ") 으로 접속하셨습니다\n";
    notice += "Delfino G4(html5)가 지원하지 않은 환경입니다.\n\n";
    notice += "Delfino G3(non-Plugin)으로 설정하시겠습니까?";
    if (confirm(notice)) Delfino.setModule("G3");
}


function DC_disableBrowser(message) {
    if (jQuery("#dc_overlay") != null && jQuery("#dc_overlay").length > 0) return;
    var overlayHtml = '<div id="dc_overlay" style="z-index:100000;position:fixed; width:100%; height:100%;top:0px; left:0px; background-color: #000000; opacity: 0.2; filter: alpha(opacity=30);">';
    //if (message && DC_processingImageUrl) {
    //    overlayHtml += '<div style="z-index:111111;position:fixed;top:40%; height:100%;width:100%;">' + '<div style="margin: 0 auto; padding: 5px; width:315px; height:146px; vertical-align:middle; font-weight:bold; text-align: center;">' + "</div>";
    //} else if (DC_processingImageUrl) {
        overlayHtml += '<div style="z-index:111111;position:fixed;top:40%; height:100%;width:100%;">' + '<div style="margin: 0 auto; padding: 5px; width:315px; height:146px; vertical-align:middle; font-weight:bold; text-align: center;">' + "</div>";
    //}
    overlayHtml += "</div>";
    jQuery("body").append(overlayHtml);
}

/*
 * IE인 경우에는, ajax통신 대신 JSONP 통신으로 처리함. 2016.07.07
 */
if (DC_browserInfo.MSIE) {
    delfino.conf.handler.supportSync = false;
}

/*
 * 선택설치 이동 팝업처리. 2017.10.11
 */
function SITE_goInstallPage(){
	alert("인증서 보안프로그램 설치가 필요합니다.\n브라우저 설정에서 팝업이 차단 된 경우 설치가 진행되지 않으니, '팝업차단'을 해제해주십시오.");
	window.open("/wizvera/delfino/install/install_mini.html?url=close","installPop","width=550,height=360");
}
window.DCrypto.goInstallPage = SITE_goInstallPage;