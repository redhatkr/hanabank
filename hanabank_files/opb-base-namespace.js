/************************************************************************************************
 * @file opb-base-namespace.js
 * @since 2012. 11. 20.
 * @author 오범석
 *
 * @filelocation 모든 페이지에서 공통적으로 include 하는 top 페이지 에서 사용 선언
 *
 * @fileoverview namespace 선언
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
 * master namespace
 * - namespace 로만 쓰이며 하위 에 function 을 두지 않는다.
 *
 * opb : 오픈뱅킹 최상위 namespace,  
 * ===================================================================================
 * </pre>
 */
var opb = {};

/**
 * <pre>
 * ===================================================================================
 * mega namespace
 * - namespace 로만 쓰이며 하위 에 function 을 두지 않는다.
 *
 * opb.base   : 기본 영역 root, top include 페이지 에서 사용 선언(필수), 모든 곳(js, jsp, html) 에서 사용할수 있다.
 * opb.core   : 코어 영역 root, top include 페이지 에서 사용 선언(필수), js(opb.common) 에서만 사용할수 있다.
 * opb.common : 공통 영역 root, top include 페이지 에서 사용 선언(필수), 모든 페이지 와 js(opb.util, opb.apps) 에서만 사용할수 있다.
 * opb.util   : 유틸 영역 root, 업무 페이지 에서 사용 선언, 모든 페이지 와 js(opb.apps) 에서만 사용할수 있다.
 * opb.apps   : 업무 영역 root, 업무 페이지 에서 사용 선언, 모든 페이지 에서만 사용할수 있다.
 * ===================================================================================
 * </pre>
 */
opb.base = {};
opb.core = {};
opb.common = {};
opb.util = {};
opb.apps = {};

/**
 * <pre>
 * ===================================================================================
 * 기본 영역 namespace
 * ===================================================================================
 * </pre>
 */
opb.base.shttpStatus_map = new Hash(); /* 오류정의.constants에서 상수정의  */
opb.base.signUrl_map = new Hash(); /* 전자서명 URL */
opb.base.passwordFieldClear_map = new Hash(); /* password 필드 초기화할 에러코드 */
opb.base.bankSignUrl_map = new Hash(); /* 뱅크사인 전자서명 URL_ 추후엔 전자서명 URL을 활용하는건 어떨까..어차피 안쓰일건데... */
opb.base.netFunnelUrl_map = new Hash(); /* 유량제어 적용 URL */

/**
 * <pre>
 * ===================================================================================
 * 코어 영역 namespace
 * ===================================================================================
 * </pre>
 */

/**
 * <pre>
 * ===================================================================================
 * 공통 영역 namespace
 * ===================================================================================
 * </pre>
 */
opb.common.layerpopup = {};
opb.common.util = {}; /* opb.common.xxx 와 같이 파일을 분리할수 없는것을 모아둔곳 */
opb.common.util.auto_logout_timer = {};
opb.common.ajax = {};

/**
 * <pre>
 * ===================================================================================
 * 유틸 영역 namespace
 * ===================================================================================
 * </pre>
 */
opb.util.calendar = {};

/**
 * <pre>
 * ===================================================================================
 * 업무 영역 namespace
 * - 업무에서 필요시 이곳에 Namespace를 선언 후 사용 할것
 * ===================================================================================
 * </pre>
 */
/* ---------------- 공통 업무, 화면 디자인을 가지는 요소이면서 2개 이상의 업무에서 쓰이는 경우 - start ---------------- */
opb.apps.common = {};
opb.apps.common.popup = {};
opb.apps.common.popup.adress = {};
opb.apps.common.popup.job = {};
opb.apps.common.util = {};
/* ---------------- 공통 업무, 화면 디자인을 가지는 요소이면서 2개 이상의 업무에서 쓰이는 경우 - end ---------------- */

/* ---------------- 업무별 - start ---------------- */
opb.apps.page = {};
opb.apps.page.transfer = {};
opb.apps.page.transfer.reserve = {};

opb.apps.page.fundmall = {}; /* 펀드몰 */
opb.apps.page.fundmall_chart = {}; /* 펀드몰 차트 */
/* ---------------- 업무별 - end ---------------- */




/*****************************************************************************
 * 하기 ASIS Namespace는 오픈뱅킹 Namespace로 변경되어야 한다.
 * 변경시 모든 업무 및 공통부분에 영향이 있다. (js, jsp, custom tag)
 *****************************************************************************/
/* ---------------- ASIS - start ---------------- */
var hana = {};
var pbk = {};

pbk.common = {};
pbk.banka = {};
pbk.card = {};
pbk.certify = {};
pbk.deposit = {};
pbk.ebpp = {};
pbk.foreign = {};
pbk.fund = {};
pbk.inquiry = {};
pbk.loan = {};
pbk.myhana = {};
pbk.transfer = {};
pbk.msn = {};
pbk.hse = {};
pbk.housingfund = {};
pbk.b2b = {};
pbk.global = {}; //글로벌뱅킹
pbk.kha = {}; //자산관리
pbk.pension = {}; //연금
pbk.cybrexh = {}; //사이버환전
pbk.koa = {}; // KOA 오픈뱅킹 

var obk = {};
/* ---------------- ASIS - end ---------------- */