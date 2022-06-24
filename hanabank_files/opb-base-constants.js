/************************************************************************************************
 * @file opb-base-constants.js
 * @since 2012. 11. 20.
 * @author 오범석
 * 
 * @filelocation 모든 페이지에서 공통적으로 include 하는 top 페이지 에서 사용 선언
 * 
 * @fileoverview 오픈뱅킹에서 JavaScript 상수가 필요한 경우 이곳에 변수를 만들고 사용, 값은 변경 될수 없다.
 * 
 * @warn 수정 시 반드시 관리자와 상의하세요.  
 * 
 * <pre>
 * ==============================================================================================
 * 변경이력:
 * DATE                AUTHOR        DESCRIPTION
 * ----------------------------------------------------------------------------------------------
 * 2012.11.08          오범석        최초작성
 * </pre>
 ************************************************************************************************/

/**
 * <pre>
 * ===================================================================================
 * for (domain +) Context Root
 * ===================================================================================
 * </pre>
 */
opb.base.APPLICATION_CONTEXT_ROOT = '';

/**
 * <pre>
 * ===================================================================================
 * for 이미지 서버
 * ===================================================================================
 * </pre>
 */
opb.base.IMG_SVR_DOMAIN = '';

/**
 * <pre>
 * ===================================================================================
 * for index.jsp 의 FRAME
 * ===================================================================================
 * </pre>
 */
//opb.base.SECURE_FRAME = 'hanaSecureframe'; /* index.jsp frameset(보안 프레임) name *//* ???? 'HANA_SECURE_FRAME' 로 변경할것 */

opb.base.MAIN_FRAME = 'hanaMainframe'; /* index.jsp의 frameset(내용 프레임) name *//* ???? 'HANA_MAIN_FRAME' 으로 변경할것 */

/**
 * <pre>
 * ===================================================================================
 * for 모든 페이지의 기본 구조에 대한 DIV
 * - 값 변경시 해당 value 값이 하드코딩된 모든 페이지가 같이 바뀌어야 한다.
 * ===================================================================================
 * </pre>
 */
opb.base.MASK_WRAP_DIV = 'HANA_MASK_WRAP_DIV'; /* 최상단 WRAP 레이어 */

//opb.base.SKIP_NAVI_DIV = 'HANA_SKIP_NAVI_DIV'; /* 본문 skip 레이어 */

//opb.base.WRAP_DIV = 'HANA_WRAP_DIV'; /* 본문 WRAP 레이어 */

//opb.base.HEAD_DIV = 'HANA_HEAD_DIV'; /* top 레이어 */

//opb.base.LNB_DIV = 'HANA_LNB_DIV'; /* LEFT 메뉴 부분 레이어 */

opb.base.CONTENTS_DIV = 'HANA_CONTENTS_DIV'; /* Contents 부분 레이어 */

//opb.base.FOOTER_DIV = 'HANA_FOOTER_DIV'; /* bottom 레이어 */

/** 
 * <pre>
 * ===================================================================================
 * for 전역적으로 사용하는 변수
 * ===================================================================================
 * </pre>
 */
opb.base.SYSTEM_TODAY = null; /* 현재시간. 서버시간으로 변경됨  */

opb.base.SYSTEM_LOCAL_SECONDS = 0;

opb.base.INSTALL_SECURITY_MODULE_URL = '/common/installSecurityModule.jsp'; /* 모듈 설치 페이지 URL */

var opbBaseIsRunPartDeploy = null;
opb.base.partDeployCondFirst = '';
opb.base.partDeployCondSecond = '';

opb.base.LGIN_CERT_METH_CD = "0"; /* 로그인매체구분 1,2,F */
opb.base.useBankSign = false; /* 뱅크사인인증서 사용여부 */


/**
 * <pre>
 * ===================================================================================
 * for 오류 정의
 * ===================================================================================
 * </pre>
 */
/* ---------------- 암호화 오류 정의 - start ---------------- */
opb.base.shttpStatus_map[900] = "암호화 오류|암호화 세션이 초기화 되었습니다. 현재 브라우저를 닫고, 새로 접속하시기 바랍니다.";
opb.base.shttpStatus_map[901] = "암호화 오류|암호화된 Master Secret 이 도착하지 않았습니다. 네트워크 환경을 확인하세요.";
opb.base.shttpStatus_map[902] = "암호화 오류|암호화된 Master Secret 을 복호화 하는 도중 오류가 발생했습니다. 현재 브라우저를 닫고, 새로 접속하시기 바랍니다.";
opb.base.shttpStatus_map[903] = "암호화 오류|보안 시퀀스가 존재하지 않아 페이지를 표시할 수 없습니다. 현재 브라우저를 닫고, 새로 접속하시기 바랍니다.";
opb.base.shttpStatus_map[904] = "암호화 오류|보안 시퀀스가 일치하지 않아 페이지를 표시할 수 없습니다. 현재 브라우저를 닫고, 새로 접속하시기 바랍니다.";
opb.base.shttpStatus_map[905] = "암호화 오류|서버에서 메시지 복호화 도중 오류가 발생했습니다. 현재 브라우저를 닫고, 새로 접속하시기 바랍니다.";
opb.base.shttpStatus_map[906] = "암호화 오류|요청하고자 하는 데이터의 길이가 한계치를 넘어섰습니다. 파일 업로드를 시도 중이라면 용량이 작은 파일을 업로드 하세요.";
opb.base.shttpStatus_map[907] = "암호화 오류|메시지 복호화를 위한 Cipher-Parity 헤더가 도착하지 않았습니다. 네트워크 환경을 확인하세요.";
opb.base.shttpStatus_map[908] = "암호화 오류|잘못된 파라메터 입력입니다. 네트워크 환경을 확인하세요.";
opb.base.shttpStatus_map[909] = "암호화 오류|서버에 등록되지 않은 호스트 주소 입니다. 올바른 도메인을 사용하세요.";
opb.base.shttpStatus_map[910] = "암호화 오류|보안 세션과 WAS 세션의 동기화 확인에 실패했습니다. 현재 브라우저를 닫고, 새로 접속하시기 바랍니다.";
opb.base.shttpStatus_map[911] = "암호화 오류|인증서 목록에 존재하지 않는 호스트 입니다. 올바른 도메인을 사용하세요.";
/* ---------------- 암호화 오류 정의 - end ---------------- */

/* ---------------- 공인인증 오류 정의 - start ---------------- */
opb.base.shttpStatus_map[921] = "공인인증 오류|인증서 정책이 존재하지 않는 페이지 입니다. 현재 브라우저를 닫고, 새로 접속하시기 바랍니다.";
opb.base.shttpStatus_map[922] = "공인인증 오류|인증서 제출이 필요한 페이지 입니다. 현재 브라우저를 닫고, 새로 접속하시기 바랍니다.";
opb.base.shttpStatus_map[923] = "공인인증 오류|올바른 형식의 인증서가 아닙니다. X.509 표준 인증서만 사용 가능합니다.";
opb.base.shttpStatus_map[924] = "공인인증 오류|개인키 소유여부 확인을 위한 서명 데이터가 들어오지 않았습니다. 네트워크 환경을 확인하세요.";
opb.base.shttpStatus_map[925] = "공인인증 오류|개인키 소유여부 확인(서명 검증)에 실패했습니다. 현재 브라우저를 닫고, 새로 접속하시기 바랍니다.";
opb.base.shttpStatus_map[926] = "공인인증 오류|인증서 본인 확인에 필요한 VID Random 값이 들어오지 않았습니다. 네트워크 환경을 확인하세요.";
opb.base.shttpStatus_map[927] = "공인인증 오류|인증서 본인 확인 기능을 제공하지 않는 인증서 입니다. 인증서를 재발급 받아 사용하십시오.";
opb.base.shttpStatus_map[928] = "공인인증 오류|인증서 본인 확인에 실패했습니다. 본인 주민번호(또는 사업자번호)와 일치하는 인증서만 사용 가능합니다.";
opb.base.shttpStatus_map[929] = "공인인증 오류|낮은 버전의 인증서는 허용하지 않습니다. 인증서를 재발급 받아 사용하십시오.";
opb.base.shttpStatus_map[930] = "공인인증 오류|인증서가 아직 유효하지 않습니다. 잠시 후 이용하시기 바랍니다.";
opb.base.shttpStatus_map[931] = "공인인증 오류|인증서가 만료되어 더 이상 사용할 수 없습니다. 인증서를 재발급 받아 사용하십시오.";
opb.base.shttpStatus_map[932] = "공인인증 오류|신뢰된 인증기관(CA) 에서 발급한 인증서가 아닙니다. 관리자에게 문의하세요.";
opb.base.shttpStatus_map[933] = "공인인증 오류|인증서 서명 검증에 실패했습니다. 현재 브라우저를 닫고, 새로 접속하시기 바랍니다.";
opb.base.shttpStatus_map[934] = "공인인증 오류|인증서 경로 검증에 실패했습니다. 인증서를 재발급 받아 사용하십시오.";
opb.base.shttpStatus_map[935] = "공인인증 오류|인증서 상호 연동 정책(OID) 에 부합하지 않는 인증서입니다.";
opb.base.shttpStatus_map[936] = "공인인증 오류|인증서 상호 연동 정책(OID) 검증에 실패했습니다.";
opb.base.shttpStatus_map[937] = "공인인증 오류|본 페이지 사용에 적합한 용도(KeyUsage)의 인증서가 아닙니다.";
opb.base.shttpStatus_map[938] = "공인인증 오류|인증서가 폐기되어 더 이상 사용할 수 없습니다. 인증서를 재발급 받아 사용하십시오.";
opb.base.shttpStatus_map[939] = "공인인증 오류|인증서가 효력정지 되어 현재는 사용할 수 없습니다. 효력 회복 후 사용 가능합니다.";
opb.base.shttpStatus_map[940] = "공인인증 오류|인증서 상태(폐기 여부) 확인에 실패했습니다. 관리자에게 문의하세요.";
opb.base.shttpStatus_map[949] = "공인인증 오류|인증서 검증 과정 중에 내부 서버 오류가 발생했습니다. 관리자에게 문의하세요.";
/* ---------------- 공인인증 오류 정의 - end ---------------- */

/* ---------------- 전자서명 오류 정의 - start ---------------- */
opb.base.shttpStatus_map[951] = "전자서명 오류|전자서명 데이터 제출이 필요한 페이지 입니다. 현재 브라우저를 닫고, 새로 접속하시기 바랍니다.";
opb.base.shttpStatus_map[952] = "전자서명 오류|클라이언트에서 보낸 전자서명 검증에 실패했습니다. 관리자에게 문의하세요.";
opb.base.shttpStatus_map[953] = "전자서명 오류|서버 측 전자서명에 실패했습니다. 관리자에게 문의하세요.";
opb.base.shttpStatus_map[954] = "전자서명 오류|전자서명 값을 저장하는 도중 오류가 발생했습니다. 관리자에게 문의하세요.";
/* ---------------- 전자서명 오류 정의 - end ---------------- */

/* ---------------- E2E 관련 오류 정의 - start ---------------- */
opb.base.shttpStatus_map[851] = "E2E 보안 오류|보안 세션(SEED)값이 유효하지 않습니다.<br/>현재 브라우저를 닫고, 새로 접속하시기 바랍니다.";
opb.base.shttpStatus_map[852] = "E2E 보안 오류|등록되지 않은 파트너 코드입니다.";
opb.base.shttpStatus_map[853] = "E2E 보안 오류|입력된 파트너 코드가 올바르지 않습니다.";
opb.base.shttpStatus_map[854] = "E2E 보안 오류|이 요청은 Seed 를 폐기 후에 요청할 수 있습니다.";
opb.base.shttpStatus_map[855] = "E2E 보안 오류|클라이언트에서 보낸 SEED 정보가 올바르지 않습니다.<br/>잠시 후 다시 거래하여 주십시요.";
/* ---------------- E2E 관련 오류 정의 - end ---------------- */

/* ---------------- 기타 오류 정의 - start ---------------- */
opb.base.shttpStatus_map[800] = "공인인증 오류|타행/타기관 인증서 등록이 필요합니다.<br/>&nbsp;<img src=\"/resource/images/common/bu_arrow_red.gif\"  alt=\"\"/><a href=\"/certify/wpcer463_01t.do\");\"><span class=\"t_red_1\">인증서 타행/타기관 등록하기</span> 바로가기</strong></a>";
opb.base.shttpStatus_map[999] = "보안모듈 오류|보안모듈에 오류가 있을 수 있습니다. 이체거래인 경우는 반드시 [이체결과]와 [거래내역]을 확인하여 주시기 바랍니다."; /* 999 */
opb.base.shttpStatus_map[1001] = "공인인증 오류|죄송합니다. 제출하신 인증서는 폐기되어 사용할 수 없는 인증서입니다. 현재 사용가능한 인증서를 제출하시거나 ID/Password로 로그인 하신후 인증서를 발급 받은후에 사용하시기 바랍니다."; /* 당행오류-인증서폐기-개인뱅킹 */
opb.base.shttpStatus_map[1002] = "공인인증 오류|죄송합니다. 제출하신 인증서는 폐기되어 사용할 수 없는 인증서입니다. 현재 사용가능한 인증서를 제출하시거나 ID/Password로 로그인 하신후 인증서를 발급 받은후에 사용하시기 바랍니다."; /* 당행오류-인증서폐기-기업뱅킹 */
opb.base.shttpStatus_map[1003] = "공인인증 오류|죄송합니다. 제출하신 인증서는 폐기되어 사용할 수 없는 인증서입니다. 현재 사용가능한 인증서를 제출하시거나 인증서를 발급 받은후에 사용하시기 바랍니다."; /* 당행오류-인증서폐기-HanaCBS */
opb.base.shttpStatus_map[1004] = "공인인증 오류|죄송합니다. 제출하신 인증서는 효력정지되어 사용할 수 없는 인증서입니다. 현재 사용가능한 인증서를 제출하시거나 인증서를 효력회복 하신후에 사용하시기 바랍니다."; /* 당행오류-인증서효력정지-개인뱅킹 */
opb.base.shttpStatus_map[1005] = "공인인증 오류|죄송합니다. 제출하신 인증서는 효력정지되어 사용할 수 없는 인증서입니다. 현재 사용가능한 인증서를 제출하시거나 인증서를 효력회복 하신후에 사용하시기 바랍니다."; /* 당행오류-인증서효력정지-기업뱅킹 */
opb.base.shttpStatus_map[1006] = "공인인증 오류|죄송합니다. 제출하신 인증서는 효력정지되어 사용할 수 없는 인증서입니다. 현재 사용가능한 인증서를 제출하시거나 인증서를 효력회복 하신후에 사용하시기 바랍니다."; /* 당행오류-인증서효력정지-HanaCBS */
opb.base.shttpStatus_map[1010] = "공인인증 오류|죄송합니다. 제출하신 공인인증서는 고객원장에 등록되어 있지 않습니다. 1588-1111로 문의하여 주십시오.";
opb.base.shttpStatus_map[1021] = "공인인증 오류|제출하신 인증서는 개인뱅킹 고객이 아닙니다.";
opb.base.shttpStatus_map[1022] = "공인인증 오류|제출하신 인증서는 기업뱅킹 고객이 아닙니다.";
opb.base.shttpStatus_map[1023] = "공인인증 오류|제출하신 인증서는 HanaCBS 고객이 아닙니다.";
opb.base.shttpStatus_map[1031] = "공인인증 오류|죄송합니다. 자행 발급 공인인증서는 타행/타기관 등록을 할 수 없습니다.";
opb.base.shttpStatus_map[1032] = "공인인증 오류|죄송합니다. 제출하신 인증서와 입력한 사용자ID가 일치하지 않습니다.";
opb.base.shttpStatus_map[1033] = "공인인증 오류|죄송합니다. 선택한 저장매체 값이 없습니다.";
opb.base.shttpStatus_map[1034] = "공인인증 오류|죄송합니다. 제출한 스마트카드 시리얼번호 값이 없습니다.";
opb.base.shttpStatus_map[1035] = "공인인증 오류|죄송합니다. 주민(사업자)등록번호가 일치하지 않습니다. 제출하신 공인인증서가 고객님의 인증서가 맞는지 확인하시기 바랍니다.";
opb.base.shttpStatus_map[1036] = "공인인증 오류|죄송합니다. 사용자 ID가 일치하지 않습니다. 로그인 한 사용자 ID가 일치하지 않습니다.<br />제출하신 공인인증서가 고객님의 인증서가 맞는지 확인하시기 바랍니다.";
opb.base.shttpStatus_map[1037] = "공인인증 오류|죄송합니다. 로그인 세션이 없습니다. 다시 로그인 하시기 바랍니다.";
opb.base.shttpStatus_map[1038] = "공인인증 오류|죄송합니다. 인증서 정책 검증과정에서 오류가 발생했습니다 (인증서구분-1038)";
opb.base.shttpStatus_map[1039] = "공인인증 오류|죄송합니다. 인증서 정책 검증과정에서 오류가 발생했습니다 (1039)";
opb.base.shttpStatus_map[1040] = "공인인증 오류|당행 CBS(구 CBS프리미엄)에 등록된 공인인증서로 기업뱅킹에서 인증서를 제출하셨습니다. <br /> 등록된 공인인증서를  확인하십시오.";
opb.base.shttpStatus_map[1041] = "공인인증 오류|당행 기업뱅킹(구 CBS라이트)에 등록된 공인인증서로 CBS뱅킹에서 인증서를 제출하셨습니다. <br /> 등록된 공인인증서를  확인하십시오.";
opb.base.shttpStatus_map[999999] = "공인인증 오류|죄송합니다. 하나대투증권에 등록된 공인인증서검증에 실패하였습니다."; /* 하나 대투 공인인증 오류 */
/* ---------------- 기타 오류 정의 - end ---------------- */


/**
 * <pre>
 * ===================================================================================
 * for 전자서명 URL
 * ===================================================================================
 * </pre>
 */
opb.base.signUrl_map['/transfer/account/wpdep411_04t.do'] 		= '개인뱅킹 - 이체 - 계좌이체 - 일반이체 - STEP03';
opb.base.signUrl_map['/transfer/reserve/wpdep413_03t.do'] 		= '개인뱅킹 - 이체 - 예약이체 - 일반 예약 이체 - Step 3';
opb.base.signUrl_map['/transfer/autotrans/wpdep414_08p.do'] 	= '개인뱅킹 - 이체 - 자동이체 - 조회/변경/취소 - 자동이체일시정지 실행';
opb.base.signUrl_map['/transfer/autotrans/wpdep414_47t.do'] 	= '개인뱅킹 - 이체 - 자동이체 - 자동이체등록 - 계좌이체 - STEP 3';
opb.base.signUrl_map['/transfer/autotrans/wpdep414_51t.do'] 	= '개인뱅킹 - 이체 - 자동이체 - 자동이체등록 - 대출 - STEP 3';
opb.base.signUrl_map['/transfer/autotrans/wpdep414_55t.do'] 	= '개인뱅킹 - 이체 - 자동이체 - 자동이체등록  - 펀드 - STEP 3';
opb.base.signUrl_map['/transfer/autotrans/wpdep414_59t.do'] 	= '개인뱅킹 - 이체 - 자동이체 - 자동이체등록  - 적금 - STEP 3';
opb.base.signUrl_map['/transfer/account/wpdep412_03t.do'] 		= '개인뱅킹 - 이체 - 간편이체 - STEP 3';
opb.base.signUrl_map['/transfer/account/wpdep411_74t.do'] 		= '개인뱅킹 - 이체 - 2채널인증이체 - 서비스가입 - STEP 3';
opb.base.signUrl_map['/transfer/account/wpdep411_78t.do'] 		= '개인뱅킹 - 이체 - 2채널인증이체 - 서비스재등록 - STEP 3';
opb.base.signUrl_map['/transfer/account/wpdep411_80t.do'] 		= '개인뱅킹 - 이체 - 2채널인증이체 - 휴대폰분실등록 - STEP 2';
opb.base.signUrl_map['/transfer/inquiry/wpdep415_04i_06.do'] 	= '개인뱅킹 - 이체 - 예약이체 - 예약이체내역 - 취소 STEP 3 ';
opb.base.signUrl_map['/common/acctPwCheckSec.do'] 				= '본인 출금계좌비밀번호 확인 (인증서제출)';
opb.base.signUrl_map['/common/custInfoAgree.do'] 				= '개인뱅킹 - 개인정보수집이용동의 등록';
opb.base.signUrl_map['/common/custInfoAgreeAnonym.do'] 			= '개인뱅킹 - 개인정보수집이용동의 등록(14세미만 법정대리인 등록 or 조회회원가입)';
opb.base.signUrl_map['/common/join/wpcom460_07t.do'] 			= '개인뱅킹 - 로그인 - 하나은행 조회원가입 _ STEP3';
opb.base.signUrl_map['/ebpp/giro/wpads419_03t.do'] 				= '지로요금 - 조회납부 - STEP03';
opb.base.signUrl_map['/ebpp/giro/wpads419_12t.do'] 				= '지로요금 - 입력납부 STEP4';
opb.base.signUrl_map['/ebpp/giro/wpads419_34t.do'] 				= '지로요금 - 예약납부조회/취소 STEP3';
opb.base.signUrl_map['/ebpp/giro/wpads419_24t.do'] 				= '지로요금 - STEP3';
opb.base.signUrl_map['/ebpp/tax/wpads420_56t.do'] 				= '지방세 - 조회납부 - 선택납부';
opb.base.signUrl_map['/ebpp/tax/wpads420_58t.do'] 				= '지방세 - 조회납부 - 전체납부';
opb.base.signUrl_map['/ebpp/tax/wpads420_63t.do'] 				= '지방세 - 1건납부';
opb.base.signUrl_map['/transfer/autotrans/wpdep414_05t.do'] 	= '개인뱅킹 - 이체 - 자동이체 - 조회/변경/취소(지로간자동이체) - STEP 3';
opb.base.signUrl_map['/transfer/autotrans/wpdep414_05t_01.do'] 	= '개인뱅킹 - 이체 - 자동이체 - 조회/변경/취소(계좌간자동이체) - STEP 3';
opb.base.signUrl_map['/transfer/autotrans/wpdep414_05t_02.do'] 	= '개인뱅킹 - 이체 - 자동이체 - 조회/변경/취소(아파트 자동이체 취소) - STEP 3';
opb.base.signUrl_map['/myhana/personal/wpcus401_04t.do'] 		= '개인뱅킹 - 개인정보조회/변경 - 개인정보조회/변경 - step3 ';
opb.base.signUrl_map['/myhana/personal/wpcus401_04t_01.do'] 	= '개인뱅킹 - 개인정보조회/변경 - 개인정보조회/변경 - step3 ';
opb.base.signUrl_map['/deposit/savings/wpdep428_109t.do'] 		= '예금/신탁 - 예금가입/해지 - 하나e플러스통장전환  - STEP3';
opb.base.signUrl_map['/deposit/savings/wpdep428_74t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 하나e플러스정기예금  - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep428_14t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 하나e플러스 적금  - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep438_16t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 하나 MMDA형 정기예금 - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep438_12t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 나의 소원 적금 - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep438_20t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 바보의 나눔 적금  - 가입완료';
opb.base.signUrl_map['/fund/transfer/wpfnd432_04t.do'] 		    = '개인뱅킹 - 펀드 - 펀드추가입금 - STEP4';
opb.base.signUrl_map['/fund/repurchase/wpfnd431_05t.do'] 		= '개인뱅킹 - 펀드 - 펀드 환매 - STEP4';
opb.base.signUrl_map['/loan/repay/wplon445_04t.do'] 			= '개인뱅킹 - 대출 - 이자예상조회/이자납입 - STEP3';
opb.base.signUrl_map['/card/wpccd446_03t.do'] 					= '개인뱅킹 - 카드 - 이용동의 - Step2';
opb.base.signUrl_map['/myhana/banking/wpcus402_66t.do'] 		= '정보 관리- OTP타기관등록 - STEP02';
opb.base.signUrl_map['/myhana/personal/wpcus401_33t.do'] 		= '정보관리 - 개인정보조회/변경 - 개인정보수집이용동의 등록 ';
/* 장차법 개발 시 추가 START */
opb.base.signUrl_map['/myhana/aloss/wpcus405_14t.do'] 			= '개인뱅킹 - 개인서비스관리 - 분실신고 - 통장/인감 ';
opb.base.signUrl_map['/myhana/loss/wpcus405_02t.do'] 			= '개인뱅킹 - 개인서비스관리 - 분실신고 - 자기앞수표 ';
opb.base.signUrl_map['/myhana/loss/wpcus405_06t.do'] 			= '개인뱅킹 - 개인서비스관리 - 분실신고 - (자물쇠)/OTP카드 ';
opb.base.signUrl_map['/myhana/loss/wpcus405_10t.do'] 			= '개인뱅킹 - 개인서비스관리 - 분실신고 - 자물쇠/(OTP카드) ';
opb.base.signUrl_map['/myhana/loss/wpcus405_12t.do'] 			= '개인뱅킹 - 개인서비스관리 - 분실신고 - 전자화폐 ';
opb.base.signUrl_map['/myhana/loss/wpcus405_14t.do'] 			= '개인뱅킹 - 개인서비스관리 - 분실신고 - 통장/인감 ';
opb.base.signUrl_map['/myhana/loss/wpcus405_16t.do'] 			= '개인뱅킹 - 개인서비스관리 - 분실신고 - 현금IC카드/직불 ';
opb.base.signUrl_map['/myhana/banking/wpcus402_04t.do'] 		= '개인뱅킹 - 개인서비스관리 - 뱅킹정보관리 - 출금계좌해제 ';
opb.base.signUrl_map['/myhana/banking/wpcus402_07t.do'] 		= '개인뱅킹 - 개인서비스관리 - 뱅킹정보관리 - 빠른조회관리 ';
opb.base.signUrl_map['/myhana/banking/wpcus402_10t.do'] 		= '개인뱅킹 - 개인서비스관리 - 뱅킹정보관리 - 전자금융금지계좌등록 ';
opb.base.signUrl_map['/myhana/banking/wpcus402_50t.do'] 		= '개인뱅킹 - 개인서비스관리 - 뱅킹정보관리 - 개인전용계좌지정/해제 ';
opb.base.signUrl_map['/myhana/banking/wpcus402_17t.do'] 		= '개인뱅킹 - 개인서비스관리 - 뱅킹정보관리 - 이체한도변경 ';
opb.base.signUrl_map['/myhana/banking/wpcus402_19t.do'] 		= '개인뱅킹 - 개인서비스관리 - 뱅킹정보관리 - 이용자비밀번호변경 ';
opb.base.signUrl_map['/myhana/banking/wpcus402_22t.do'] 		= '개인뱅킹 - 개인서비스관리 - 뱅킹정보관리 - 계좌비밀번호변경 ';
opb.base.signUrl_map['/myhana/banking/wpcus402_47t_01.do'] 		= '개인뱅킹 - 개인서비스관리 - 뱅킹정보관리 - 인터넷뱅킹해제 ';
opb.base.signUrl_map['/myhana/banking/wpcus402_28t.do'] 		= '뱅킹 정보 관리- 서비스이용신청/해지 - 이체거래 잠금 ';
opb.base.signUrl_map['/myhana/banking/wpcus402_31t.do'] 		= '뱅킹 정보 관리- 서비스이용신청/해지 - 장기 미사용 이체 제한 해제 ';
opb.base.signUrl_map['/myhana/banking/wpcus402_36t.do'] 		= '뱅킹 정보 관리- 서비스이용신청/해지 - 해외 ip 차단 신청/ 조회 - STEP02 ';
opb.base.signUrl_map['/myhana/banking/wpcus402_68t.do'] 		= '뱅킹 정보 관리- 서비스이용신청/해지 - 해지계좌 조회금지신청  - STEP02 ';
opb.base.signUrl_map['/myhana/banking/wpcus402_84t.do'] 		= '뱅킹 정보 관리- OTP타기관등록/해지 - 이용등록해지 STEP04 - SMS인증 ';
opb.base.signUrl_map['/myhana/banking/wpcus402_84t_01.do'] 		= '뱅킹 정보 관리- OTP타기관등록/해지 - 이용등록해지 STEP04 - 보안매체인증 ';
opb.base.signUrl_map['/myhana/banking/wpcus402_87t.do'] 		= '뱅킹 정보 관리- OTP타기관등록/해지 - 등록실행 - SMS인증 ';
opb.base.signUrl_map['/myhana/banking/wpcus402_87t_01.do'] 		= '뱅킹 정보 관리- OTP타기관등록/해지 - 등록실행 - 보안매체 ';
opb.base.signUrl_map['/myhana/banking/wpcus402_39t.do'] 		= '뱅킹정보관리 - BIGPOT 스윙서비스변경/해지 - 스윙기준금액변경 - 변경하기(STEP03) ';
opb.base.signUrl_map['/myhana/banking/wpcus402_41t.do'] 		= '뱅킹정보관리 - BIGPOT 스윙서비스변경/해지 - 스윙서비스해지 - 계좌해지(STEP02) ';
opb.base.signUrl_map['/myhana/prevent/wpcus402_56t.do'] 		= '전자금융사기예방서비스 - PC사전지정 - 서비스 최초 신청 STEP4 ';
opb.base.signUrl_map['/myhana/prevent/wpcus402_59t.do'] 		= '전자금융사기예방서비스 - PC사전지정 - 서비스 추가 신청 STEP3 ';
opb.base.signUrl_map['/myhana/prevent/wpcus402_64t.do'] 		= '전자금융사기예방서비스 - PC사전지정 - 서비스 조회/해지 STEP3 ';
opb.base.signUrl_map['/myhana/prevent/wpcus402_76t_04.do'] 		= '전자금융사기예방서비스 - 안심거래 서비스 - 서비스 신청(step3) ';
opb.base.signUrl_map['/myhana/prevent/wpcus411_89t.do'] 		= '전자금융사기예방서비스 - 안심이체 - 서비스 신청(step3) ';
opb.base.signUrl_map['/myhana/addition/wpcus403_49t.do'] 		= '개인신용정보제공 이용동의(안내및신청STEP3) ';
opb.base.signUrl_map['/myhana/addition/wpcus403_29t.do'] 		= '부가서비스 - 신용정보활용동의철회 - 예금 - 신용정보동의철회안내및신청 step3 ';
opb.base.signUrl_map['/myhana/addition/wpcus403_29t_01.do'] 	= '부가서비스 - 신용정보활용동의철회 - 상품 - 신용정보동의철회안내및신청 step3 ';
opb.base.signUrl_map['/myhana/addition/wpcus403_29t_02.do'] 	= '부가서비스 - 신용정보활용동의철회 - 신용카드 - 신용정보동의철회안내및신청 step3 ';
opb.base.signUrl_map['/myhana/addition/wpcus403_42i_00.do'] 	= '부가서비스 - 신용정보제공사실 조회 ';
opb.base.signUrl_map['/myhana/addition/wpcus403_09t.do'] 		= '통지서비스신청/관리 - SMS알리미서비스 - 계좌거래내역통보STEP4 ';
opb.base.signUrl_map['/myhana/addition/wpcus403_44t.do'] 		= '통지서비스신청/관리 - SMS알리미서비스 - 수수료 결제계좌변경STEP2 ';
opb.base.signUrl_map['/myhana/addition/wpcus403_63t.do'] 		= '통지서비스신청/관리 - SMS알리미서비스 - 계좌거래내역통보해지STEP3 ';
opb.base.signUrl_map['/myhana/addition/wpcus403_20t.do'] 		= '통지서비스신청/관리 - SMS알리미서비스 - 펀드수익률STEP3 ';
opb.base.signUrl_map['/myhana/addition/wpcus403_71t.do'] 		= '통지서비스신청/관리 - SMS알리미서비스 - 미납수수료납부STEP2 ';
opb.base.signUrl_map['/myhana/addition/wpcus403_05t.do'] 		= '통지서비스신청/관리 - e-mail알리미서비스STEP3 ';
opb.base.signUrl_map['/myhana/addition/wpcus403_24t.do'] 		= '통지서비스신청/관리 - 전화수신거부STEP2 ';
opb.base.signUrl_map['/ebpp/pension/wpads425_29t.do'] 			= '연금/보험금 - 통합징수보험료 - 납부 STEP3';
opb.base.signUrl_map['/ebpp/pension/wpads425_33t.do'] 			= '연금/보험금 - 통합징수보험료 - 납부내역 조회/취소 STEP2';
opb.base.signUrl_map['/ebpp/pension/wpads425_03t.do'] 			= '연금/보험금 - 국민연금 - 납부 STEP3';
opb.base.signUrl_map['/ebpp/pension/wpads425_07t.do'] 			= '연금/보험금 - 국민연금 - 납부내역조회/취소 STEP3';
opb.base.signUrl_map['/ebpp/pension/wpads425_10t.do'] 			= '연금/보험금 - 고용/산재보험 - 조회납부 STEP3';
opb.base.signUrl_map['/ebpp/pension/wpads425_14t.do'] 			= '연금/보험금 - 고용/산재보험 - 입력납부 STEP3';
opb.base.signUrl_map['/ebpp/nation/wpads426_03t.do'] 			= '기금 및 기타국고 - 납부 STEP3';
opb.base.signUrl_map['/ebpp/registpay/wpads427_04t.do'] 		= '대학등록금 - 납부 STEP4';
opb.base.signUrl_map['/ebpp/tax/wpads421_03t.do'] 				= '국세 - 조회납부 - STEP3';
opb.base.signUrl_map['/ebpp/tax/wpads421_07t.do'] 				= '국세 - 입력납부 - STEP3';
opb.base.signUrl_map['/ebpp/fine/wpads424_23t.do'] 				= '범칙금/벌과금 - 검찰청벌과금 STEP3';
opb.base.signUrl_map['/ebpp/fine/wpads424_27t.do'] 				= '범칙금/벌과금 - 검찰청벌과금 본납벌과금 STEP3';
opb.base.signUrl_map['/ebpp/fine/wpads424_31t.do'] 				= '범칙금/벌과금 - 검찰청벌과금 납부내역 STEP3';
opb.base.signUrl_map['/ebpp/fine/wpads424_03t.do'] 				= '범칙금/벌과금 - 교통범칙금납부  과태료 STEP3';
opb.base.signUrl_map['/ebpp/fine/wpads424_06t.do'] 				= '범칙금/벌과금 - 교통범칙금납부  범칙금 STEP3';
opb.base.signUrl_map['/ebpp/life/wpads423_03t.do'] 				= '생활요금/부담금 - KT통신요금 납부 STEP3';
opb.base.signUrl_map['/ebpp/life/wpads423_07t.do'] 				= '생활요금/부담금 - KT통신요금 납부 내역조회/취소 STEP3';
opb.base.signUrl_map['/ebpp/life/wpads423_10t.do'] 				= '생활요금/부담금 - 전기요금 납부 STEP3';
opb.base.signUrl_map['/ebpp/life/wpads423_25t.do'] 				= '생활요금/부담금 - 기타지역상하수도요금 STEP3';
opb.base.signUrl_map['/ebpp/life/wpads423_30t.do'] 				= '생활요금/부담금 - 기타지역상하수도요금 납부 내역조회/취소 STEP3';
opb.base.signUrl_map['/ebpp/life/wpads423_15t.do'] 				= '생활요금/부담금 - 서울시상하수도요금납부 Step3';
opb.base.signUrl_map['/ebpp/life/wpads423_20t.do'] 				= '생활요금/부담금 - 대전시상하수도요금 STEP3';
opb.base.signUrl_map['/ebpp/life/wpads423_42t.do'] 				= '생활요금/부담금 - 서울시 환경개선부담금 요금납부 STEP3';
opb.base.signUrl_map['/ebpp/life/wpads423_34t.do'] 				= '생활요금/부담금 - 기타지역 환경개선부담금 요금납부 STEP3';
opb.base.signUrl_map['/ebpp/life/wpads423_38t.do'] 				= '생활요금/부담금 - 기타지역 환경개선부담금 납부취소 STEP3';
opb.base.signUrl_map['/fund/regist/wpfnd430_10t.do']			= '펀드/fund - 신규가입/fund/regist - 가입 - STEP5';
opb.base.signUrl_map['/fund/regist/wpfnd430_28t.do']			= '펀드/fund - 신규가입/fund/regist - 가입 - STEP5';
opb.base.signUrl_map['/fund/regist/wpfnd430_53t_01.do'] 		= '개인뱅킹 - 펀드 - 신규가입 - 신규가입';
opb.base.signUrl_map['/fund/regist/wpfnd430_53t_02.do'] 		= '개인뱅킹 - 펀드 - 신규가입 - 신규예약';
opb.base.signUrl_map['/fund/reservereg/wpfnd430_16t.do'] 		= '펀드/fund - 신규가입 - 예약 - STEP5';
opb.base.signUrl_map['/fund/reservereg/wpfnd430_33t.do'] 		= '펀드/fund - 신규가입 - 예약 - STEP5';
opb.base.signUrl_map['/fund/regist/wpfnd430_19t.do']			= '펀드 - 신규가입 - 신규등록 조회/취소 - STEP3';
opb.base.signUrl_map['/fund/regist/wpfnd430_19t_01.do'] 		= '펀드 - 신규가입 - 신규등록 조회/취소 - STEP3';
opb.base.signUrl_map['/foreign/send/wpfxd451_04t.do'] 			= '외환 - 해외송금/이체 - 해외송금 - STEP3';
opb.base.signUrl_map['/foreign/send/wpfxd451_75t.do'] 			= '외환 - 해외송금/이체 - 3분 해외송금 - STEP3';
opb.base.signUrl_map['/foreign/send/wpfxd451_24t.do'] 			= '외환 - 해외송금/이체 - 해외송금내역조회/변경(해외송금) - STEP3';
opb.base.signUrl_map['/foreign/send/wpfxd451_78t.do'] 			= '외환 - 해외송금/이체 - 해외송금내역조회/변경(3분송금) - STEP3';
opb.base.signUrl_map['/foreign/send/wpfxd451_39t.do'] 			= '외환 - 해외송금/이체 - 거래은행지정 - STEP3'; 
opb.base.signUrl_map['/foreign/send/wpfxd451_49t.do'] 			= '외환 - 해외송금/이체 - 당행간외화이체 - STEP3';
opb.base.signUrl_map['/foreign/change/wpfxd452_04t.do'] 		= '외환 - 환전 - 인터넷환전 - STEP4';
opb.base.signUrl_map['/fund/regist/wpfnd430_65t.do'] 			= '펀드 - 연금펀드 종목전환 - STEP3';
opb.base.signUrl_map['/deposit/savings/wpdep438_44t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 오! 필승 코리아 적금 2012  - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep428_128t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 주택청약종합저축  - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep428_83t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 고단위플러스-금리확정형  - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep428_83t_01.do'] 	= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 고단위플러스-금리연동형  - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep428_177t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 하나 369 정기예금  - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep438_36t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 하나 리틀빅 정기예금  - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep428_163t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 하나빅팟정기예금  - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep428_06t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 와인처럼적금  - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep435_06t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 생막걸리하나적금  - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep439_16t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 하나재형저축 - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep439_38t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 주거래 정기예금 - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep428_87t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - CD연동정기예금 - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep432_36t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 꿈나무적금 - STEP04';
opb.base.signUrl_map['/deposit/savings/wpdep433_44t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 필승 코리아 적금 2014 - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep435_120t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 늘하나 적금 - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep435_44t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 순천만정원 사랑 적금 - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep435_120t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 나이스 샷 골프 적금 - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep439_47t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 함께하는 사랑 적금 - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep438_04t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 씨크릿 적금 - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep428_106t.do'] 		= '예금/신탁 - 예금가입/해지 - 계좌해지 - STEP04';
opb.base.signUrl_map['/deposit/pension/wptru429_07t.do'] 		= '예금/신탁 - 연금신탁가입/해지 - 신규가입 - 채권형 제1호 - 가입완료';
opb.base.signUrl_map['/deposit/pension/wptru429_11t.do'] 		= '예금/신탁 - 연금신탁가입/해지 - 신규가입 - 안정형 제1호 - 가입완료';
opb.base.signUrl_map['/deposit/pension/wptru429_14t.do'] 		= '예금/신탁 - 연금신탁가입/해지 - 계좌해지 - STEP03';
opb.base.signUrl_map['/deposit/retirement/wptru430_25t.do'] 	= '예금/신탁 - 개인형퇴직연금제도(IRP) - 신규가입 - STEP 5';
opb.base.signUrl_map['/deposit/retirement/wptru430_29p_05.do'] 	= '예금/신탁 - 개인형퇴직연금제도(IRP) - 운용하실 상품선택(수익증권) -STEP5(인증서 제출)';
opb.base.signUrl_map['/transfer/account/wpdep411_28t.do'] 		= '이체-계좌이체-적금/신탁/청약납입 STEP 3';
opb.base.signUrl_map['/deposit/savings/wpdep439_11p_01.do'] 	= '소비 재테크 서비스 - 신청(JSON)';
opb.base.signUrl_map['/deposit/savings/wpdep439_12p_01.do'] 	= '소비 재테크 서비스 - 해지(JSON)';
opb.base.signUrl_map['/fund/repurchase/wpfnd431_05t.do'] 		= '펀드 - 환매예상조회/환매 STEP#3';
opb.base.signUrl_map['/fund/repurchase/wpfnd431_09t.do'] 		= '펀드 - 환매신청취소-2단계';
opb.base.signUrl_map['/fund/transfer/wpfnd432_04t.do'] 			= '펀드 - 펀드조회/추가입금 - 보유계좌조회/추가입금 - 3단계';
opb.base.signUrl_map['/fund/transfer/wpfnd432_13t.do'] 			= '펀드 - 추가입금 - 펀드적립기간변경 - 완료';
opb.base.signUrl_map['/fund/notice/wpfnd498_03t.do'] 			= '펀드 - 펀드서비스 신청/해제 - 투자보고 서비스 신청/해제 -완료';
opb.base.signUrl_map['/fund/notice/wpfnd498_06t.do'] 			= '펀드 - 펀드서비스 신청/해제 - 운영/자산보관관리보고서 통보신청 -완료';
opb.base.signUrl_map['/common/join/wpcom460_19t.do'] 			= '이용자 비밀번호오류 - 제한해제/변경 - STEP 3';
opb.base.signUrl_map['/fund/transfer/wpfnd432_16t.do'] 			= '펀드 - 펀드조회/추가입금 - 추가입금취소 - Step3';
opb.base.signUrl_map['/transfer/reserve/wpdep413_11t.do'] 		= '이체 - 예약이체 - 펀드 예약 이체 - Step 3';
opb.base.signUrl_map['/loan/repay/wplon445_11t.do'] 			= '대출 - 대출상환/이자납입 - 원금상환예상조회/원금상환 - STEP3';
opb.base.signUrl_map['/loan/repay/wplon445_16t.do'] 			= '대출 - 대출상환/이자납입 - 한도대출 약정해지 - STEP4';
opb.base.signUrl_map['/loan/service/wplon452_03t.do'] 			= '대출 - 대출서비스신청/해제 - 대출정보통지서비스신청 - STEP2';
opb.base.signUrl_map['/common/creditInfoAgree.do'] 				= '대출 - 예금담보대출 - 개인신용정보의 제공이용 및 조회 동의 ';
opb.base.signUrl_map['/common/creditInfoAgreeFree.do'] 			= '대출 - 예금담보대출 - 개인신용정보의 제공이용 및 조회 동의';
opb.base.signUrl_map['/loan/internet/wplon446_05t.do'] 			= '대출 - 예금담보대출 - 예금담보대출(고정방식4단계)';
opb.base.signUrl_map['/loan/internet/wplon446_08t.do'] 			= '대출 - 예금담보대출 - 예금담보대출(고정방식3단계)';
opb.base.signUrl_map['/loan/internet/wplon446_09t.do'] 			= '대출 - 예금담보대출 - 예금담보대출(고정방식4단계)';
opb.base.signUrl_map['/loan/internet/wplon446_13t.do'] 			= '대출 - 예금담보대출 - 와인처럼 담보대출 - STEP4';
opb.base.signUrl_map['/loan/internet/wplon446_16t.do'] 			= '대출 - 예금담보대출 - 예금담보대출 한도변경 ( 3단계)';
opb.base.signUrl_map['/loan/internet/wplon446_17t.do'] 			= '대출 - 예금담보대출 - 예금담보대출 한도변경 ( 4단계)';
opb.base.signUrl_map['/loan/internet/wplon446_18t.do'] 			= '대출 - 예금담보대출 - 예금담보대출 한도변경 ( 5단계)';
opb.base.signUrl_map['/loan/internet/wplon446_26t.do'] 			= '대출 - 예금담보대출 - 예금담보대출 해지 ( 4단계)';
opb.base.signUrl_map['/loan/offset/wplon446_35t.do'] 			= '대출 - 예금담보대출 - 예금담보대출해지(상계) - STEP4';
opb.base.signUrl_map['/loan/pledge/wplon454_03t.do'] 			= '대출 - 질권설정예정계좌등록 - 질권설정예정계좌등록 ( 3단계)';
opb.base.signUrl_map['/loan/mortgateone/wplon453_06t.do'] 		= '대출 - 원클릭모기지 - 인터넷신청 - STEP3';
opb.base.signUrl_map['/loan/mortgateonewplon453_08t.do'] 		= '대출 - 원클릭모기지 - 목록조회결과(비로그인)';
opb.base.signUrl_map['/loan/mortgateonewplon453_10t.do'] 		= '대출 - 원클릭모기지 - 상담 정보 입력 - STEP2';
opb.base.signUrl_map['/loan/mortgateone/wplon453_14t.do'] 		= '대출 - 원클릭모기지 - 약정의뢰 - STEP2';
opb.base.signUrl_map['/loan/mortgateone/SaveSignValue_01.do'] 	= '대출 - 원클릭모기지 - 대출신청 - 약정거래 DB저장';
opb.base.signUrl_map['/loan/homenlease/wplon456_05t.do'] 		= '대출 - 원클릭전세론 - 인터넷신청 STEP04';
opb.base.signUrl_map['/loan/homenlease/wplon456_07i_1.do'] 		= '대출 - 원클릭전세론 - 목록조회결과';
opb.base.signUrl_map['/loan/homenlease/wplon456_09t.do'] 		= '대출 - 원클릭전세론 - 상담 정보 입력 - STEP2';
opb.base.signUrl_map['/loan/homenlease/wplon456_11t.do'] 		= '대출 - 원클릭전세론 - 약정의뢰 - STEP2';
opb.base.signUrl_map['/loan/nest/wplon456_19t.do'] 				= '대출 - 아낌e-보금자리론 - 약정의뢰 - STEP2';
opb.base.signUrl_map['/loan/increase/wplon457_02t.do'] 			= '대출 - 사이버대출 - 대출한도증액신청 - STEP2';
opb.base.signUrl_map['/loan/increase/wplon457_04t.do'] 			= '대출 - 사이버대출 - 대출한도증액신청 - STEP4';
opb.base.signUrl_map['/loan/increase/wplon457_06t.do'] 			= '대출 - 사이버대출 - 대출한도증액신청 - 대출약정및실행 - STEP2';
opb.base.signUrl_map['/loan/academy/SaveSignValue.do'] 			= '대출 - 사이버대출 - 대출한도증액신청 - 약정거래 DB저장';
opb.base.signUrl_map['/loan/credit/wplon467_31t.do'] 			= '대출 - 내집마련 디딤돌대출 - 대출신청 - STEP2';
opb.base.signUrl_map['/loan/credit/wplon467_33t.do'] 			= '대출 - 내집마련 디딤돌대출 - 대출신청 - STEP4';
opb.base.signUrl_map['/loan/efamily/wplon451_96t.do'] 			= '대출 - 원큐대출 - 대출신청 - STEP2';
opb.base.signUrl_map['/loan/efamily/wplon451_98t.do'] 			= '대출 - 원큐대출 - 대출신청 - STEP4';
opb.base.signUrl_map['/loan/apart/wplon449_21b1.do'] 			= '대출 - 무보증대출 - 무보증대출신청';
opb.base.signUrl_map['/loan/guarantee/wplon449_03t.do'] 		= '대출 - 무보증대출 - 대출자격심사';
opb.base.signUrl_map['/loan/guarantee/wplon449_12t.do'] 		= '대출 - 무보증대출 - 무보증대출신청 - STEP03(개인신용정보 제공/활용동의)';
opb.base.signUrl_map['/loan/apart/wplon450_90p_01.do'] 			= '대출 - 무보증대출 - 대출신청결과확인';
opb.base.signUrl_map['/loan/credit/wplon470_30b1_17.do'] 		= '대출 - 신용대출 - 대출신청 - STEP01(개인신용정보 제공/활용동의)';
opb.base.signUrl_map['/loan/credit/wplon470_30b1_18.do'] 		= '대출 - 신용대출 - 대출신청 - STEP01(개인신용정보 제공/활용동의)';
opb.base.signUrl_map['/loan/credit/wplon470_30b_02.do'] 		= '대출 - 신용대출 - 대출신청 - STEP01(개인신용정보 제공/활용동의)(비로그인)';
opb.base.signUrl_map['/loan/credit/wplon470_31t.do'] 			= '대출 - 신용대출 - 대출신청 - STEP02';
opb.base.signUrl_map['/loan/credit/wplon470_33t.do'] 			= '대출 - 신용대출 - 대출신청 - STEP04';
opb.base.signUrl_map['/loan/credit/wplon470_35t.do'] 			= '대출 - 신용대출 - 대출약정및실행 - STEP02';
opb.base.signUrl_map['/loan/credit/SaveSignValue.do'] 			= '대출 - 신용대출 - 대출신청 - 약정거래 DB저장 ';
opb.base.signUrl_map['/loan/auto/wplon471_02t.do'] 				= '대출 - 1Q오토론 - 대출신청 - STEP03(로그인사용자)';
opb.base.signUrl_map['/loan/auto/wplon471_04t.do'] 				= '대출 - 1Q오토론 - 대출신청 - STEP05(로그인사용자)';
opb.base.signUrl_map['/loan/auto/wplon471_01b.do'] 				= '대출 - 1Q오토론 - 한도조회 및 신청하기 - STEP02(비로그인사용자)';
opb.base.signUrl_map['/loan/auto/wplon471_02b.do'] 				= '대출 - 1Q오토론 - 한도조회 및 신청하기 - STEP03(비로그인사용자)';
opb.base.signUrl_map['/loan/auto/wplon471_04b.do'] 				= '대출 - 1Q오토론 - 한도조회 및 신청하기 - STEP05(비로그인사용자)';
opb.base.signUrl_map['/loan/auto/wplon471_09t.do'] 				= '대출 - 1Q오토론 - 약정의뢰 - STEP02';
opb.base.signUrl_map['/loan/auto/wplon471_12t.do'] 				= '대출 - 1Q오토론 - 약정의뢰 - STEP01';
opb.base.signUrl_map['/card/prepay/wpccd436_13t.do'] 			= '카드 - 결제서비스 - 선결제';
opb.base.signUrl_map['/ebpp/law/wpads429_03t.do'] 				= '법원공과금 - 보관금 - 납부(STEP3)';
opb.base.signUrl_map['/ebpp/law/wpads429_08t.do'] 				= '법원공과금 - 송달료 - 납부(STEP3)';
opb.base.signUrl_map['/fund/pension/wpfnd900_03t.do'] 			= '펀드 - 펀드서비스 신청/해제 - 연금펀드수익률 보고서 -완료';
opb.base.signUrl_map['/transfer/account/wpdep416_03t.do'] 	    = '이체 - 계좌이체 - 다계좌이체 - STEP03';
opb.base.signUrl_map['/common/join/wpcom460_11p.do'] 	    	= 'ID찾기(팝업) 인터넷뱅킹회원 - 조회 - STEP03';
opb.base.signUrl_map['/ebpp/revinquiry/wpads428_03t.do'] 		= '예약납부조회/취소 - STEP3';
opb.base.signUrl_map['/app/mobile/app_smt15_101_02.do'] 		= '하나N Bank - 서비스 일시정지 등록/해제 - STEP03(일시정지등록)';
opb.base.signUrl_map['/app/mobile/app_smt15_101_03.do'] 		= '하나N Bank - 서비스 일시정지 등록/해제 - STEP03(일시정지해제)';
opb.base.signUrl_map['/portal/csc/voc/csc_p45.do'] 				= '전자민원창구 등록';
opb.base.signUrl_map['/csc/csc_p52.do'] 						= '펀드 판매관련 불편신고센터';
opb.base.signUrl_map['/transfer/autotrans/wpdep414_05t_03.do'] 	= '이체 - 자동이체 - 조회/변경/취소 - STEP02(다건해지)';
opb.base.signUrl_map['/foreign/paypal/wpfxd502_11t_01.do'] 		= '외환 - 글로벌 페이(PayPal) - 글로벌페이 송금 STEP01 - 약관동의 화면 이후';
opb.base.signUrl_map['/foreign/paypal/wpfxd502_13t.do'] 		= '외환 - 글로벌 페이(PayPal) - 이용신청 - STEP03';
opb.base.signUrl_map['/myhana/banking/wpcus510_02t.do'] 		= '마이하나 -  뱅킹정보관리 - 스마트폰뱅킹 가입신청 - 신청완료';
opb.base.signUrl_map['/ebpp/life/wpads423_55t.do'] 				= '생활요금/부담금 - 세외수입 요금납부 STEP3';
opb.base.signUrl_map['/ebpp/fine/wpads424_36t.do'] 				= '범칙금/벌과금  - 교통유발/주정차위반  요금납부 STEP3';
opb.base.signUrl_map['/deposit/savings/wpdep439_42t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 하나 행복 나눔 적금 - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep439_56t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 하나 난 할 수 있어 적금 - 가입완료';
opb.base.signUrl_map['/fund/notice/wpfnd498_10t.do'] 			= '개인뱅킹 - 펀드 - 펀드서비스신청/해제 - 목표수익률 도달서비스 신청/변경/해제';
opb.base.signUrl_map['/myhana/prevent/wpcus402_84t.do'] 	= '보안서비스 신청/관리 - 입금계좌지정서비스 - 서비스 가입 - STEP4';
opb.base.signUrl_map['/myhana/prevent/wpcus402_88t.do'] 	= '보안서비스 신청/관리 - 입금계좌지정서비스 - 조회 및 변경 - STEP4';
opb.base.signUrl_map['/myhana/prevent/wpcus402_101t.do'] 	= '개인뱅킹 - 이상징후감지에 따른 이체제한 해제-STEP02';
opb.base.signUrl_map['/myhana/addition/wpcus413_07t.do'] = '개인뱅킹 - myHana - 개인신용정보 -마케팅목적 이용제공 -STEP03';
opb.base.signUrl_map['/myhana/addition/wpcus413_10t.do'] = '개인뱅킹 - myHana - 개인신용정보 -마케팅목적 이용제공 철회 -STEP03';
opb.base.signUrl_map['/myhana/addition/wpcus413_10t_01.do'] = '개인뱅킹 - myHana - 개인신용정보 -마케팅목적 이용제공 철회 -STEP03';
opb.base.signUrl_map['/myhana/loss/wpcus405_21t.do'] 			= '개인뱅킹 - 개인서비스관리 - 분실신고 - 본인발급 수표 ';
opb.base.signUrl_map['/deposit/savings/wpdep439_63t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 애니팡 적금 - 가입완료';
opb.base.signUrl_map['/myhana/banking/wpcus511_04t.do'] 		= '개인뱅킹 - 마이하나 - 뱅킹정보관리 - 부가서비스신청/해지 - 내계좌 간편이체 서비스 신청 및 해지 완료 ';
opb.base.signUrl_map['/myhana/banking/wpcus512_04t.do'] 		= '개인뱅킹 - 마이하나 - 뱅킹정보관리 - 해외예금인출지정 - 등록/변경/해제 STEP04';
//opb.base.signUrl_map['/inquiry/account/wpdep410_12i.do'] 		= '조회 - 계좌조회 - 나의 소원적금 조회';
/* 장차법 개발 시 추가 E N D */

/* 오픈뱅킹통합 개발 시 추가 START */
//-------이체(transfer) 인증서 제출 url - start
opb.base.signUrl_map['/transfer/account/wpdep411_28t.do'] 		= '개인뱅킹 - 이체 - 자금이체 - 적금/신탁/청약납입 - STEP04'; 
opb.base.signUrl_map['/transfer/account/wpdep411_39t.do'] 		= '개인뱅킹 - 이체 - 계좌이체 - 펀드 자금 이체 - STEP04';
opb.base.signUrl_map['/transfer/account/wpdep411_33t.do'] 		= '개인뱅킹 - 이체 - 자금이체 - 중도금이체 - STEP 3';
opb.base.signUrl_map['/transfer/account/wpdep411_44t.do'] 		= '개인뱅킹 - 이체 - 자금이체 - 증권자금이체 - STEP 3';
opb.base.signUrl_map['/transfer/account/wpdep411_63t.do'] 		= '개인뱅킹 - 이체 - 자금이체 - 공무원연금납부 - STEP 3';
opb.base.signUrl_map['/transfer/file/wpdep412_08t.do'] 			= '개인뱅킹 - 이체 - 파일/그룹이체 - 파일이체조회/실행 - STEP 4 - 즉시 일반이체일경우';
opb.base.signUrl_map['/transfer/file/wpdep412_16t.do'] 			= '개인뱅킹 - 이체 - 파일/그룹이체 - 그룹이체 - STEP 3 - 즉시 일반이체일경우';
opb.base.signUrl_map['/transfer/reserve/wpdep413_07t.do'] 		= '개인뱅킹 - 이체 - 예약이체 - 적금/신탁 예약 이체 - STEP04';
opb.base.signUrl_map['/transfer/reserve/wpdep413_11t.do'] 		= '개인뱅킹 - 이체 - 예약이체 - 펀드 예약 이체 - STEP03';
opb.base.signUrl_map['/transfer/autotrans/wpdep414_64t.do'] 	= '개인뱅킹 - 이체 - 자동이체 - 아파트관리비자동이체 - STEP03';
opb.base.signUrl_map['/transfer/autotrans/wpdep414_70t.do'] 	= '개인뱅킹 - 이체 - 자동이체 - 전화요금자동납부 - STEP03';
opb.base.signUrl_map['/transfer/autotrans/wpdep414_75t.do'] 	= '개인뱅킹 - 이체 - 자동이체 - 이동통신요금자동납부 - STEP03';
opb.base.signUrl_map['/transfer/autotrans/wpdep414_80t.do'] 	= '개인뱅킹 - 이체 - 자동이체 - 전기요금/국민연금/국민건강보험료 자동납부 - STEP03';
opb.base.signUrl_map['/transfer/autotrans/wpdep414_84t.do'] 	= '개인뱅킹 - 이체 - 자동이체 - 카드대금자동납부 - STEP03';
opb.base.signUrl_map['/transfer/retire/wpdep417_03t.do'] 		= '개인뱅킹 - 이체 - 퇴직연금 - 부담금입금';
opb.base.signUrl_map['/transfer/give/wpdep418_03t.do'] 			= '개인뱅킹 - 이체- 기부 - 하나 The 나눔 이용 동의';
opb.base.signUrl_map['/transfer/give/wpdep418_06t.do'] 			= '개인뱅킹 - 이체- 기부 - 일시기부  - STEP 3';
opb.base.signUrl_map['/transfer/give/wpdep418_15t.do'] 			= '개인뱅킹 - 이체 - 기부 - 정기기부 - STEP 4 (완료)';
opb.base.signUrl_map['/transfer/give/wpdep418_08t_03.do'] 		= '개인뱅킹 - 이체- 기부 - 이체시 마다 기부 - 기부 - step03';
opb.base.signUrl_map['/transfer/give/wpdep418_08t_06.do'] 		= '개인뱅킹 - 이체- 기부 - 이체시 마다 기부 - 변경 - step03';
opb.base.signUrl_map['/transfer/give/wpdep418_08t_09.do'] 		= '개인뱅킹 - 이체- 기부 - 이체시 마다 기부 - 해지 - step03';
opb.base.signUrl_map['/transfer/give/wpdep418_11t.do'] 			= '개인뱅킹 - 이체- 기부 - 하나포인트기부  - STEP 3';
//-------이체(transfer) 인증서 제출 url - end
//-------카드(card) 인증서 제출 url - start
opb.base.signUrl_map['/card/payment/wpccd449_03t.do'] 			= '개인뱅킹 - 카드 - 현금카드결제 - 등록및 해제 - STEP03';
opb.base.signUrl_map['/card/payment/wpccd449_06t.do'] 			= '개인뱅킹 - 카드 - 현금카드결제  - 한도변경 - STEP03';
opb.base.signUrl_map['/card/revoke/wpccd448_03t.do'] 			= '개인뱅킹 - 카드 - M/S카드 해지거래  - STEP03';
opb.base.signUrl_map['/card/point/wpccd439_63t.do'] 			= '카드 - 포인트/마일리지 - 예스포인트전환 STEP3';
opb.base.signUrl_map['/card/point/wpccd439_76t.do'] 			= '카드 - 포인트/마일리지 - 예스포인트양도 탭 - 포인트양도신청 STEP3';
//-------카드(card) 인증서 제출 url - end
//-------외환(foreign) 인증서 제출 url - start
opb.base.signUrl_map['/foreign/send/wpfxd451_85t.do'] 			= '개인뱅킹 - 외환 - 해외송금/이체 - 아시아 우대 송금 - STEP04';
opb.base.signUrl_map['/foreign/send/wpfxd451_89t.do'] 			= '개인뱅킹 - 외환 - 해외송금/이체 - 아시아 우대 송금(몽골) - STEP04';
opb.base.signUrl_map['/foreign/send/wpfxd451_92t.do'] 			= '개인뱅킹 - 외환 - 해외송금/이체 - 아시아 우대 송금(베트남) - STEP04';
opb.base.signUrl_map['/foreign/send/wpfxd451_95t.do'] 			= '개인뱅킹 - 외환 - 해외송금/이체 - 아시아 우대 송금(중국) - STEP04';
opb.base.signUrl_map['/foreign/send/wpfxd451_98t.do'] 			= '개인뱅킹 - 외환 - 해외송금/이체 - 아시아 우대 송금(인도네시아) - STEP04';
opb.base.signUrl_map['/foreign/send/wpfxd451_101t.do'] 			= '개인뱅킹 - 외환 - 해외송금/이체 - 아시아 우대 송금(캄보디아) - STEP04';
opb.base.signUrl_map['/foreign/send/wpfxd451_104t.do'] 			= '개인뱅킹 - 외환 - 해외송금/이체 - 아시아 우대 송금(방글라데시) - STEP04';
opb.base.signUrl_map['/foreign/send/wpfxd451_107t.do'] 			= '개인뱅킹 - 외환 - 해외송금/이체 - 아시아 우대 송금(태국) - STEP04';
opb.base.signUrl_map['/foreign/send/wpfxd451_110t.do'] 			= '개인뱅킹 - 외환 - 해외송금/이체 - 아시아 우대 송금(우즈베키스탄) - STEP04';
opb.base.signUrl_map['/foreign/send/wpfxd451_113t.do'] 			= '개인뱅킹 - 외환 - 해외송금/이체 - 타행이체(금결원이체) - STEP03';
opb.base.signUrl_map['/foreign/reserve/wpfxd459_04t.do'] 		= '개인뱅킹 - 외환 - 환율예약이체 - 서비스 신청 - STEP03';
opb.base.signUrl_map['/foreign/reserve/wpfxd459_07t.do'] 		= '개인뱅킹 - 외환 - 환율예약이체 - 계좌변경 - STEP03';
opb.base.signUrl_map['/foreign/reserve/wpfxd459_10t.do'] 		= '개인뱅킹 - 외환 - 환율예약이체 - 서비스 해지 - STEP03';
opb.base.signUrl_map['/foreign/reserve/wpfxd459_13t.do'] 		= '개인뱅킹 - 외환 - 환율예약이체 - 이체신청 - STEP03';
opb.base.signUrl_map['/foreign/reserve/wpfxd459_17t.do'] 		= '개인뱅킹 - 외환 - 환율예약이체 - 조회/취소 - STEP03';
opb.base.signUrl_map['/foreign/change/wpfxd452_22t.do'] 		= '개인뱅킹 - 외환 - 환전 - 비로그인 환전';
opb.base.signUrl_map['/foreign/change/wpfxd452_25t.do'] 		= '개인뱅킹 - 외환 - 환전 - 비로그인 환전';
opb.base.signUrl_map['/foreign/change/wpfxd452_28i.do'] 		= '개인뱅킹 - 외환 - 환전 - 비로그인 환전내역조회';
opb.base.signUrl_map['/foreign/remit/oversea/wpfxd611_06t.do'] 	= '개인뱅킹 - 외환 - 외화송금 - 해외송금 - 해외즉시송금 - STEP03';
opb.base.signUrl_map['/foreign/remit/oversea/wpfxd611_27t.do'] 	= '개인뱅킹 - 외환 - 외화송금 - 해외송금 - 해외예약송금 - STEP04';
opb.base.signUrl_map['/foreign/remit/oversea/wpfxd611_34t.do'] 	= '개인뱅킹 - 외환 - 외화송금 - 해외송금 - 해외예약송금 조회/변경 - STEP02';
opb.base.signUrl_map['/foreign/remit/oversea/wpfxd611_47t.do'] 	= '개인뱅킹 - 외환 - 외화송금 - 해외송금 - 해외자동송금 - STEP04';
opb.base.signUrl_map['/foreign/remit/oversea/wpfxd611_54t.do'] 	= '개인뱅킹 - 외환 - 외화송금 - 해외송금 - 해외자동송금 조회/변경 - STEP02';
opb.base.signUrl_map['/foreign/remit/oversea/wpfxd611_64t.do'] 	= '개인뱅킹 - 외환 - 외화송금 - 해외송금 - 해외환율지정예약송금 - STEP04';
opb.base.signUrl_map['/foreign/remit/oversea/wpfxd611_74t.do'] 	= '개인뱅킹 - 외환 - 외화송금 - 해외송금 - 해외환율지정예약송금 조회/변경 - STEP02';
opb.base.signUrl_map['/foreign/remit/domestic/wpfxd612_03t.do'] = '개인뱅킹 - 외환 - 외화송금 - 국내송금 - 국내즉시송금 - STEP03';
//-------외환(foreign) 인증서 제출 url - end
//-------공과금 인증서 제출 url - start
opb.base.signUrl_map['/ebpp/myebpp/wpads418_28t.do'] 			= '개인뱅킹 - 공과금 - MY공과금 - 납부대상일괄조회 - STEP03';
opb.base.signUrl_map['/ebpp/tax/wpads422_09t.do'] 				= '개인뱅킹 - 공과금 - 관세 - 납부 - STEP03';
//-------공과금 인증서 제출 url - end
//-------개인정보 인증서 제출 url - start
opb.base.signUrl_map['/myhana/banking/wpcus402_99t.do'] 		= '인터넷뱅킹 - 개인정보 - 뱅킹정보관리 - 이체한도변경 - 해외고객 1일 이체한도 예외신청 STEP3';
opb.base.signUrl_map['/myhana/banking/wpcus402_92t.do'] 		= '인터넷뱅킹 - 개인정보 - 보안서비스 신청/관리 - 전자금융사기 예방 SMS - 신청 STEP3';
opb.base.signUrl_map['/myhana/banking/wpcus402_96t.do'] 		= '인터넷뱅킹 - 개인정보 - 보안서비스 신청/관리 - 전자금융사기 예방 SMS - 조회/해지 STEP3';
opb.base.signUrl_map['/myhana/banking/wpcus402_24t.do'] 		= '마이하나 - 뱅킹정보관리 - 계좌정보관리 - 계좌숨김해지 STEP2 탭';
opb.base.signUrl_map['/myhana/banking/wpcus513_02t.do'] 		= '마이하나 - 뱅킹정보관리 - 계좌정보관리 - 출금계좌등록 STEP2 탭';
opb.base.signUrl_map['/myhana/banking/wpcus402_142t.do'] 		= '마이하나 - 보안서비스 신청/관리 - 사고예방지정금액변경 STEP2';
opb.base.signUrl_map['/myhana/prevent/wpcus402_153t.do'] 		= '마이하나 - 보안서비스 신청/관리 - 피싱예방용환율이미지서비스 - 신청 STEP1 탭';
opb.base.signUrl_map['/myhana/prevent/wpcus402_155t.do'] 		= '마이하나 - 보안서비스 신청/관리 - 피싱예방용환율이미지서비스 - 신청내역조회변경 STEP1 탭';
opb.base.signUrl_map['/myhana/prevent/wpcus402_157t.do'] 		= '마이하나 - 보안서비스 신청/관리 - 피싱예방용환율이미지서비스 - 이용해지 STEP1 탭';
opb.base.signUrl_map['/myhana/banking/wpcus514_01t.do'] 		= '마이하나 - 뱅킹정보관리 - 비밀번호등록/변경 - 현금카드비밀번호등록 STEP1 탭';
opb.base.signUrl_map['/myhana/banking/wpcus402_163t.do'] 		= '마이하나 - 보안서비스 신청/관리 - 해외IP 차단신청 - 신청 STEP2 탭';
//-------개인정보 인증서 제출 url - end
//-------예금/신탁(deposit) 인증서 제출 url - start
opb.base.signUrl_map['/deposit/savings/wpdep428_193t.do'] 		= '인터넷뱅킹 - 예금/신탁 - 예금가입/해지 - 입출금통장 타상품 전환  - STEP03';
opb.base.signUrl_map['/deposit/trust/wpcoi430_12t_01.do'] 		= '인터넷뱅킹 - 예금/신탁 - 특정금전신탁 - 지급 - STEP 4';
opb.base.signUrl_map['/deposit/trust/wpcoi430_15t_01.do'] 		= '인터넷뱅킹 - 예금/신탁 - 특정금전신탁 - 지급예약 - STEP 4';
opb.base.signUrl_map['/deposit/interest/wpint100_03i.do'] 		= '인터넷뱅킹 - 예금/신탁 - 금리변경통지서비스 - 금리변경통지서비스  - STEP03';
opb.base.signUrl_map['/deposit/commontrust/wptru430_05t.do'] 	= '인터넷뱅킹 - 예금/신탁 - 공익신탁 - 신규가입 - STEP04';
opb.base.signUrl_map['/deposit/savings/wpdep428_102t.do'] 		= '인터넷뱅킹 - 인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 외화정기예금 - 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep439_32t.do'] 		= '인터넷뱅킹 - 인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 하나 모아드림 적립식 외화예금- 가입완료';
opb.base.signUrl_map['/deposit/savings/wpdep441_03t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신재형저축가입진행상태조회 - 취소완료';
opb.base.signUrl_map['/deposit/savings/wpdep442_05t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 저축성예금만기(후) 갱신 - 갱신STEP03';
opb.base.signUrl_map['/deposit/savings/wpdep443_04t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 저축성예금만기(전) 갱신 - 갱신STEP03';
opb.base.signUrl_map['/deposit/savings/wpdep443_08t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 저축성예금만기(전) 갱신 - 변경STEP03';
opb.base.signUrl_map['/deposit/savings/wpdep443_10t.do'] 		= '인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 저축성예금만기(전) 갱신 - 취소STEP02';
opb.base.signUrl_map['/deposit/savings/wpdep439_77t.do'] 		= '인터넷 뱅킹 - 인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 하나멤버스 적금 - STEP04';
opb.base.signUrl_map['/deposit/savings/wpdep439_67t.do'] 		= '인터넷 뱅킹 - 인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 행복Together 정기예금 - STEP04';
opb.base.signUrl_map['/deposit/savings/wpdep439_71t.do'] 		= '인터넷 뱅킹 - 인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 행복Together 적금 - STEP04';
opb.base.signUrl_map['/deposit/savings/wpdep438_53t.do'] 		= '인터넷 뱅킹 - 인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 셀프-기프팅(Self-Gifting)적금 - STEP04';
opb.base.signUrl_map['/deposit/savings/wpdep438_57t.do'] 		= '인터넷 뱅킹 - 인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 윙고 빙고 적금 - STEP04';
opb.base.signUrl_map['/deposit/savings/wpdep438_61t.do'] 		= '인터넷 뱅킹 - 인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 넘버엔월복리적금 - STEP04';
opb.base.signUrl_map['/deposit/savings/wpdep439_81t.do'] 		= '인터넷 뱅킹 - 인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 지마켓옥션 적금 - STEP04';
opb.base.signUrl_map['/deposit/savings/wpdep438_65t.do'] 		= '인터넷 뱅킹 - 인터넷 뱅킹 - 예금/신탁 - 예금가입/해지 - 신규가입 - 정기적금 - STEP04';
//-------예금/신탁(deposit) 인증서 제출url - end
//-------조회 제출 url - start
opb.base.signUrl_map['/inquiry/account/wpdep406_32t.do'] 		= '개인뱅킹 - 조회 - 계좌조회 - 휴면계좌';
opb.base.signUrl_map['/inquiry/account/wpdep409_05t.do'] 		= '개인뱅킹 - 조회 - 세제혜택상품한도조회  - 세제혜택상품한도변경STEP3';
//-------조회 제출 url - end
//-------기업결제 > 전자어음 인증서 제출 url - start
opb.base.signUrl_map['/b2b/sell/ebill/generateElecSignData.do'] = '개인뱅킹 - 기업결제 - 전자어음 - 배서/수령거부/반환 - 전자어음배서확인 - STEP02';
opb.base.signUrl_map['/b2b/sell/snew/wpb2b730_32i.do'] = '개인뱅킹 - 기업결제 - 전자어음 - 전자어음판매기업약정 - 전자어음판매기업약정등록 - STEP03';
//-------기업결제 > 전자어음 인증서 제출 url - end
//-------부가서비스 인증서 제출 url - start
opb.base.signUrl_map['/housingfund/bnd/wpads492_11t.do'] 				= '국민주택채권(국민주택채권매입 - 채권매입 - 국민주택채권 건별매입 STEP4)';
opb.base.signUrl_map['/housingfund/bnd/wpads492_45t.do'] 				= '국민주택채권(국민주택채권매입 - 채권매입 - 국민주택채권 대량매입 직접등록 STEP5)';
opb.base.signUrl_map['/housingfund/bnd/wpads492_62t.do'] 				= '국민주택채권(국민주택채권매입 - 매입내역정정 STEP3)';
opb.base.signUrl_map['/housingfund/bnd/wpads492_66t.do'] 				= '국민주택채권(국민주택채권매입 - 매입취소 STEP3)';
opb.base.signUrl_map['/housingfund/bnd/wpads492_69t.do'] 				= '국민주택채권(국민주택채권매입 - 중도상환 STEP3)';
opb.base.signUrl_map['/financeic/official/wpcus410_03t.do'] 		= '부가서비스 - 전자공무원증 - 전자공무원증 비밀번호 등록';
//-------부가서비스 인증서 제출 url - end
//-------펀드 인증서 제출 url - start
opb.base.signUrl_map['/fund/regist/wpfnd430_104t.do'] 			= '펀드 - 신규가입 - 소득공제 장기펀드 - STEP01';
opb.base.signUrl_map['/fund/regist/wpfnd430_106t.do'] 			= '펀드 - 신규가입 - 소득공제 장기펀드 - STEP03';
opb.base.signUrl_map['/fund/move/wpfnd434_03t.do'] 				= '펀드 - 판매사이동 - 계좌정보확인서 발급 - STEP02';
opb.base.signUrl_map['/fund/move/wpfnd434_06t.do'] 				= '펀드 - 판매사이동 - 계좌정보확인서 발급취소 - STEP02';
opb.base.signUrl_map['/fund/move/wpfnd434_53t_01.do'] 			= '펀드 - 판매사이동 - 이동 신청';
opb.base.signUrl_map['/fund/move/wpfnd434_13t.do'] 				= '펀드 - 판매사이동 - 이동 신청 - 신규가입STEP03';
opb.base.signUrl_map['/fund/move/wpfnd434_28t.do'] 				= '펀드 - 판매사이동 - 이동 신청 - 연금펀드2';

opb.base.signUrl_map['/fund/master/wpfnd436_02t.do'] 			= '펀드 - 투자의달인 - 서비스 이용 안내 - 서비스 이용 동의';
opb.base.signUrl_map['/fund/master/wpfnd436_15t.do'] 			= '펀드 - 투자의달인 - 서비스 이용 동의 철회 - 처리';
//-------펀드 인증서 제출 url - end
/* 오픈뱅킹통합 개발 시 추가 END */

/* 뱅크사인 인증서 제출 URL 설정 */
opb.base.bankSignUrl_map['/transfer/account/wpdep421_04t.do']            = '즉시이체';
opb.base.bankSignUrl_map['/transfer/account/wpdep421_04t_r.do']          = '계좌이체'; //2021.10.29 계좌이체 신규 URL추가
opb.base.bankSignUrl_map['/transfer/account/wpdep416_03t.do']            = '다계좌이체';
//opb.base.bankSignUrl_map['/transfer/autotrans/wpdep414_05t.do']            = '자동이체-조회/변경/취소-(지로)해지';
//opb.base.bankSignUrl_map['/transfer/autotrans/wpdep414_05t_01.do']            = '자동이체-조회/변경/취소-(계좌간)해지';
//opb.base.bankSignUrl_map['/transfer/autotrans/wpdep414_05t_02.do']            = '자동이체-조회/변경/취소-(아파트자동이체)해지';
opb.base.bankSignUrl_map['/transfer/autotrans/wpdep414_05t_03.do']            = '자동이체 취소';
opb.base.bankSignUrl_map['/transfer/autotrans/wpdep414_08p.do']            = '자동이체-조회/변경/취소-자동이체일시정지';
opb.base.bankSignUrl_map['/transfer/autotrans/wpdep414_47t.do']            = '자동이체-계좌간자동이체등록';
opb.base.bankSignUrl_map['/transfer/autotrans/wpdep414_51t.do']            = '자동이체-자동이체등록-대출';
opb.base.bankSignUrl_map['/transfer/autotrans/wpdep414_55t.do']            = '자동이체 - 자동이체등록  - 펀드';
opb.base.bankSignUrl_map['/transfer/autotrans/wpdep414_59t.do']            = '자동이체 - 자동이체등록  - 적금';
opb.base.bankSignUrl_map['/transfer/reserve/wpdep413_03t.do']            = '예약이체 - 일반예약이체';
opb.base.bankSignUrl_map['/transfer/reserve/wpdep413_07t.do']            = '예약이체 - 적금/신탁예약납입';
opb.base.bankSignUrl_map['/transfer/reserve/wpdep413_11t.do']            = '예약이체 - 펀드예약이체';
opb.base.bankSignUrl_map['/fund/regist/wpfnd430_10t.do']            = '펀드신규';
opb.base.bankSignUrl_map['/fund/regist/wpfnd430_42t.do']            = '해외펀드';
opb.base.bankSignUrl_map['/fund/regist/wpfnd430_16t.do']            = '예약신규';
opb.base.bankSignUrl_map['/fund/regist/wpfnd430_33t.do']            = '연금펀드예약';
opb.base.bankSignUrl_map['/loan/repay/wplon445_04t.do']            = '대출원금상환'; 
opb.base.bankSignUrl_map['/loan/repay/wplon445_11t.do']            = '대출이자납입'; 
opb.base.bankSignUrl_map['/foreign/send/wpfxd451_39t.do']            = '거래외국환지정';
opb.base.bankSignUrl_map['/foreign/remit/oversea/wpfxd611_06t.do']            = '인터넷 즉시 해외송금';
opb.base.bankSignUrl_map['/myhana/banking/wpcus513_03t.do']            = '출금계좌등록 및 삭제';
opb.base.bankSignUrl_map['/myhana/personal/wpcus401_04t.do']            = '고객정보관리';
opb.base.bankSignUrl_map['/fund/repurchase/wpfnd431_05t.do']            = '가입상품 해지';
opb.base.bankSignUrl_map['/fund/repurchase/wpfnd431_25t.do']            = '가입상품 해지';
opb.base.bankSignUrl_map['/deposit/savings/wpdep428_106t.do']            = '가입상품 해지';
opb.base.bankSignUrl_map['/transfer/inquiry/wpdep415_04i_06.do']            = '예약이체내역 - 취소';
opb.base.bankSignUrl_map['/deposit/savings/wpdep428_193t.do']            = '입출금통장 타상품 전환';
opb.base.bankSignUrl_map['/deposit/savings/wpdep428_109t.do']            = '하나e플러스통장전환';
opb.base.bankSignUrl_map['/deposit/savings/wpdep428_106t.do']            = '예금가입/해지 - 계좌해지';
opb.base.bankSignUrl_map['/fund/regist/wpfnd430_19t.do']            = '펀드 당일가입취소';
opb.base.bankSignUrl_map['/fund/repurchase/wpfnd431_09t.do']            = '펀드 환매등록조회취소';
opb.base.bankSignUrl_map['/fund/transfer/wpfnd432_04t.do']            = '펀드 추가입금';
opb.base.bankSignUrl_map['/fund/transfer/wpfnd432_16t.do']            = '펀드 추가입금취소';
opb.base.bankSignUrl_map['/loan/service/wplon452_03t.do']            = '대출정보통지서비스신청';
opb.base.bankSignUrl_map['/loan/repay/wplon445_16t.do']            = '한도대출 약정해지';
opb.base.bankSignUrl_map['/myhana/banking/wpcus513_03t.do']            = '출금계좌등록';
opb.base.bankSignUrl_map['/myhana/banking/wpcus402_04t.do']            = '출금계좌해제';
opb.base.bankSignUrl_map['/ebpp/tax/wpads420_56t.do']   = ' 통합 지방세 - 조회납부';
opb.base.bankSignUrl_map['/ebpp/tax/wpads420_58t.do']   = ' 통합 지방세 - 대량납부';
opb.base.bankSignUrl_map['/ebpp/tax/wpads420_63t.do']   = ' 통합 지방세 - 건별납부';
opb.base.bankSignUrl_map['/ebpp/tax/wpads421_13t.do']   = ' 국세 - 연대납부';
opb.base.bankSignUrl_map['/ebpp/tax/wpads421_23t_02.do']    = ' 국세 - 항만시설사용료 납부(다건)';
opb.base.bankSignUrl_map['/ebpp/tax/wpads421_23t_03.do']    = ' 국세 - 항만시설사용료 납부(단건)';
opb.base.bankSignUrl_map['/ebpp/tax/wpads421_33t_02.do']    = ' 국세 - 특허청수수료 STEP3 납부(다건) ';
opb.base.bankSignUrl_map['/ebpp/tax/wpads421_33t_03.do']    = ' 국세 - 특허청수수료 STEP3 납부(단건) ';
opb.base.bankSignUrl_map['/ebpp/tax/wpads421_43t_02.do']    = ' 국세 - 보훈대부원리금 STEP3 납부(다건)';
opb.base.bankSignUrl_map['/ebpp/tax/wpads421_43t_03.do']    = ' 국세 - 보훈대부원리금 STEP3 납부(단건)';
opb.base.bankSignUrl_map['/ebpp/tax/wpads421_03t.do']   = ' 국세 STEP3 조회납부';
opb.base.bankSignUrl_map['/ebpp/tax/wpads421_03t_01.do']    = ' 국세 STEP3 조회납부(다건)';
opb.base.bankSignUrl_map['/ebpp/tax/wpads421_07t.do']   = ' 국세 STEP3 입력납부';
opb.base.bankSignUrl_map['/ebpp/tax/wpads422_09t.do']   = ' 관세STEP3(기간별, 전체 미수납, 전자납부번호) - 납부';
opb.base.bankSignUrl_map['/ebpp/tax/wpads431_05t.do']   = ' 국세/관세 - 현금담보(관세청) - 납부';
opb.base.bankSignUrl_map['/ebpp/life/wpads423_03t.do']  = ' 생활요금/부담금 - KT통신요금 납부';
opb.base.bankSignUrl_map['/ebpp/life/wpads423_07t.do']  = ' 생활요금/부담금 - KT통신요금 납부 내역조회/취소';
opb.base.bankSignUrl_map['/ebpp/life/wpads423_10t.do']  = ' 생활요금/부담금 - 전기요금 납부';
opb.base.bankSignUrl_map['/ebpp/life/wpads423_25t.do']  = ' 생활요금/부담금 - 상하수도요금 STEP3';
opb.base.bankSignUrl_map['/ebpp/life/wpads423_30t.do']  = ' 생활요금/부담금 - 상하수도요금 - 납부취소';
opb.base.bankSignUrl_map['/ebpp/life/wpads423_15t.do']  = ' 생활요금/부담금 - 서울시상하수도요금  - 요금납부';
opb.base.bankSignUrl_map['/ebpp/life/wpads423_20t.do']  = ' 생활요금/부담금 - 대전시상하수도요금  - 요금납부';
opb.base.bankSignUrl_map['/ebpp/life/wpads423_42t.do']  = ' 생활요금/부담금 - 서울시 환경개선부담금 - 요금납부';
opb.base.bankSignUrl_map['/ebpp/life/wpads423_73t_02.do']   = ' 생활요금/부담금 - 아파트관리비 step03 납부(다건)';
opb.base.bankSignUrl_map['/ebpp/life/wpads423_73t_03.do']   = ' 생활요금/부담금 - 아파트관리비 step03 납부(단건)';
opb.base.bankSignUrl_map['/ebpp/life/wpads423_34t.do']  = ' 생활요금/부담금 - 기타지역 환경개선부담금';
opb.base.bankSignUrl_map['/ebpp/life/wpads423_38t.do']  = ' 생활요금/부담금 - 기타지역 환경개선부담금 납부취소';
opb.base.bankSignUrl_map['/ebpp/life/wpads423_55t.do']  = ' 생활요금/부담금 -  세외수입 요금납부';
opb.base.bankSignUrl_map['/ebpp/fine/wpads424_23t.do']  = ' 범칙금/벌과금 - 검찰청벌과금';
opb.base.bankSignUrl_map['/ebpp/fine/wpads424_27t.do']  = ' 범칙금/벌과금 - 검찰청벌과금 본납벌과금';
opb.base.bankSignUrl_map['/ebpp/fine/wpads424_31t.do']  = ' 검찰청 벌과금 납부 내역 조회 취소';
opb.base.bankSignUrl_map['/ebpp/fine/wpads424_03t.do']  = ' 범칙금/벌과금 - 교통범칙금납부 STEP3 과태료';
opb.base.bankSignUrl_map['/ebpp/fine/wpads424_06t.do']  = ' 범칙금/벌과금 - 교통범칙금납부 STEP3 범칙금';
opb.base.bankSignUrl_map['/ebpp/fine/wpads424_36t.do']  = ' 범칙금/벌과금  - 교통유발/주정차위반 - 요금납부';
opb.base.bankSignUrl_map['/ebpp/giro/wpads419_03t.do']  = ' 지로요금 - 조회납부';
opb.base.bankSignUrl_map['/ebpp/giro/wpads419_12t.do']  = ' 지로요금 - 입력납부';
opb.base.bankSignUrl_map['/ebpp/giro/wpads419_24t.do']  = ' 지로요금 - 지로납부 취소';
opb.base.bankSignUrl_map['/ebpp/pension/wpads425_03t.do']   = ' 연금/보험금 - 국민연금';
opb.base.bankSignUrl_map['/ebpp/pension/wpads425_07t.do']   = ' 연금/보험금 - 국민연금 납부취소';
opb.base.bankSignUrl_map['/ebpp/pension/wpads425_10t.do']   = ' 연금/보험금 - 고용/산재보험 - 조회납부';
opb.base.bankSignUrl_map['/ebpp/pension/wpads425_14t.do']   = ' 연금/보험금 - 고용/산재보험 - 입력납부';
opb.base.bankSignUrl_map['/ebpp/pension/wpads425_29t.do']   = ' 연금/보험금 - 통합징수보험료 - 납부';
opb.base.bankSignUrl_map['/ebpp/pension/wpads425_33t.do']   = ' 연금/보험금 - 통합징수보험료 - 납부취소';
opb.base.bankSignUrl_map['/ebpp/nation/wpads426_03t.do']    = ' 국고및기금 - 기금/연금';
opb.base.bankSignUrl_map['/ebpp/registpay/wpads427_04t.do'] = ' 대학등록금 - 납부';
opb.base.bankSignUrl_map['/ebpp/myebpp/wpads418_28t.do']    = ' my공과금 - 공과금 등록/납부 - 납부대상 일괄납부';
opb.base.bankSignUrl_map['/ebpp/law/wpads429_03t.do']   = ' 법원공과금 - 보관금 - 납부';
opb.base.bankSignUrl_map['/ebpp/law/wpads429_08t.do']   = ' 법원공과금 - 송달료 - 납부';
opb.base.bankSignUrl_map['/ebpp/law/wpads429_23t.do']   = ' 전자공탁 - 과세정보  - 등록';
opb.base.bankSignUrl_map['/ebpp/revinquiry/wpads428_03t.do']    = ' 공과금 - 예약납부조회/취소';
opb.base.bankSignUrl_map['/ebpp/edu/wpads430_03t.do']   = ' 지로/공과금 - 교원연금 - 납부';

/* 유량제어 관련 URL 설정 */
//로그인
opb.base.netFunnelUrl_map['/common/pbkLoginSubmit.do'] = 'pbkLogin';
opb.base.netFunnelUrl_map['/common/pbkCertLoginSubmit.do'] = 'pbkLogin';
opb.base.netFunnelUrl_map['/common/pbkBankSignLoginSubmit.do'] = 'pbkLogin';
//거래내역조회
opb.base.netFunnelUrl_map['/inquiry/account/wpdep406_72i_n.do'] = 'pbkInqTran';
opb.base.netFunnelUrl_map['/inquiry/account/wpdep406_72i_05_n.do'] = 'pbkInqTran';
//이체 
//opb.base.netFunnelUrl_map['/transfer/account/wpdep421_02t_01.do'] = 'pbkTransfer';
//opb.base.netFunnelUrl_map['/transfer/account/wpdep421_03t.do'] = 'pbkTransfer';
//opb.base.netFunnelUrl_map['/transfer/account/wpdep421_04t.do'] = 'pbkTransfer';
//opb.base.netFunnelUrl_map['/transfer/account/wpdep421_04t_noCert.do'] = 'pbkTransfer';
//opb.base.netFunnelUrl_map['/transfer/account/wpdep421_04t_noCertNoSecCard.do'] = 'pbkTransfer';
//예적금
opb.base.netFunnelUrl_map['/deposit/savings/wpdep479_68t_01.do'] = 'pbkJoinGoods';	//하나더적금
opb.base.netFunnelUrl_map['/deposit/savings/wpdep479_69t.do'] = 'pbkJoinGoods';	//하나더적금
opb.base.netFunnelUrl_map['/deposit/savings/wpdep479_70t.do'] = 'pbkJoinGoods';	//하나더적금
opb.base.netFunnelUrl_map['/deposit/savings/wpdep479_71t.do'] = 'pbkJoinGoods';	//하나더적금

opb.base.netFunnelUrl_map['/deposit/savings/wpdep490_01t_01.do'] = 'pbkJoinGoods';	//하나더예금 
opb.base.netFunnelUrl_map['/deposit/savings/wpdep490_02t.do'] = 'pbkJoinGoods';	//하나더예금
opb.base.netFunnelUrl_map['/deposit/savings/wpdep490_03t.do'] = 'pbkJoinGoods';	//하나더예금
opb.base.netFunnelUrl_map['/deposit/savings/wpdep490_04t.do'] = 'pbkJoinGoods';	//하나더예금

opb.base.netFunnelUrl_map['/inquiry/account/wpdep406_65i.do'] = 'pbkAcctList';	//계좌조회

/**
 * <pre>
 * ===================================================================================
 * for password 필드 초기화할 에러코드
 * ===================================================================================
 * </pre>
 */
opb.base.passwordFieldClear_map['OCOM16218'] = 'OCOM16218'; // OTP 비밀번호 1회 오류
opb.base.passwordFieldClear_map['OCOM16219'] = 'OCOM16219'; // OTP 비밀번호 2회 오류
opb.base.passwordFieldClear_map['OCOM16220'] = 'OCOM16220'; // OTP 비밀번호 3회 오류
opb.base.passwordFieldClear_map['OCOM16221'] = 'OCOM16221'; // OTP 비밀번호 4회 오류
opb.base.passwordFieldClear_map['OCOM16222'] = 'OCOM16222'; // OTP 비밀번호 5회 오류
opb.base.passwordFieldClear_map['OCOM16223'] = 'OCOM16223'; // OTP 비밀번호 6회 오류
opb.base.passwordFieldClear_map['OCOM16224'] = 'OCOM16224'; // OTP 비밀번호 7회 오류
opb.base.passwordFieldClear_map['OCOM16225'] = 'OCOM16225'; // OTP 비밀번호 8회 오류
opb.base.passwordFieldClear_map['OCOM16226'] = 'OCOM16226'; // OTP 비밀번호 9회 오류
opb.base.passwordFieldClear_map['OCOM16227'] = 'OCOM16227'; // OTP 비밀번호 오류횟수 초과
opb.base.passwordFieldClear_map['BCOM15794'] = 'BCOM15794'; // OTP 입력횟수 초과
opb.base.passwordFieldClear_map['BCOM16810'] = 'BCOM16810'; // OTP 인증실패
opb.base.passwordFieldClear_map['OCOM02617'] = 'OCOM02617'; // 비밀번호 일치 하지 않음 2번더 입력 가
opb.base.passwordFieldClear_map['OCOM02618'] = 'OCOM02618'; // 비밀번호 일치 하지 않음 1번더 입력 가
opb.base.passwordFieldClear_map['OCOM06367'] = 'OCOM06367'; // 비밀번호 오류회수 초과
opb.base.passwordFieldClear_map['OCOM15861'] = 'OCOM15861'; // 입금계좌번호 오류
