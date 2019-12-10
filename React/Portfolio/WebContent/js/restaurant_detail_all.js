
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

/**
 * 쿠키를 가져오는 메서드.
 * @param cname - 쿠키 이름.
 * @returns {string}  쿠키 값.
 */
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

/**
 * 쿠키를 세팅해주는 메서드.
 * @param cname - 쿠키이름
 * @param cvalue - 쿠키 값.
 */
function setCookie(cname, cvalue, until) {
  var cuntil = until || new Date(new Date().getTime() + 30 * 60 * 1000);
  $.cookie(cname, cvalue, {path: '/', expires: cuntil});
}

function getParameter(param) {
  var returnValue;
  var url = location.href;
  var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
  for (var i = 0; i < parameters.length; i++) {
    var varName = parameters[i].split('=')[0];
    if (varName.toUpperCase() == param.toUpperCase()) {
      returnValue = parameters[i].split('=')[1];
      return decodeURIComponent(returnValue);
    }
  }
}

function getParameter_target_url(url, param) {
  var returnValue;
  var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
  for (var i = 0; i < parameters.length; i++) {
    var varName = parameters[i].split('=')[0];
    if (varName.toUpperCase() == param.toUpperCase()) {
      returnValue = parameters[i].split('=')[1];
      return decodeURIComponent(returnValue);
    }
  }
}

/**
 * 원하는 일수를 ms 단위로 리턴해줌.
 * @param day - 날 수
 * @returns {integer} - 날 수의 ms 단위
 */
function getDays(day) {
  var days,
      oneDay = 24 * 60 * 60 * 1000;

  if (day) {
    days = oneDay * parseInt(day);
  } else {
    days = oneDay;
  }

  return days;
}

/**
 * 현재 언어 설정을 리턴 해주는 메서드.
 * @returns {string} - 언어 설정 값.
 */
function getLanguage() {
  return get_language();
}

/**
 * 언어 설정을 바꿔주는 메서드.
 * @param language - 언어 이름.
 */
function changeLanguage(language) {
  //language Cookie key
  var languageKey = "language";

  setCookie(languageKey, language);
}

/**
 * 디테일 페이지의 picture를 laze 로딩 시켜주는 메서드.
 */
function photoLazyLoading() {
  var review_area = $(".picture_item");

  review_area.lazyload({
    // effect : "fadeIn"
  });
}

function showLodingblackScreen() {
  //검은 레이어 배경과 로딩바
  var $black_screen = $(".black_screen"),
      $loading_bar = $(".loading_bar");

  $black_screen.show();
  $loading_bar.show();
}

function hideLodingblackScreen() {
  //검은 레이어 배경과 로딩바
  var $black_screen = $(".black_screen"),
      $loading_bar = $(".loading_bar");

  $black_screen.hide();
  $loading_bar.hide();
}

function delete_cookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function go_to_top(self) {
  $('html,body').animate({scrollTop: 0}, 500, function() {
    $(self).fadeOut();
  });
}

function off_scroll() {
  $(document).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e) {
    e.preventDefault();
    return;
  });
}

function on_scroll() {
  $(document).off(".disableScroll");
}

function str_cut(str, str_limit_length, prefix) {
  var prefix = prefix || "...";

  if (!str) {
    return "";
  }

  if (str.length > str_limit_length) {
    str = str.substring(0, str_limit_length - 1);
    str = str + prefix;
  }

  return str;
}

function go_to_app() {
  var is_android = false;
  var mobilewords = new Array("Android");
  for (var word in mobilewords) {
    if (navigator.userAgent.match(mobilewords[word]) != null) {
      is_android = true;
      location.href = "mangoplate://xn--main-ee6q572e";
      //setTimeout(function(){
      //    go_to_market();
      //}, 1500);
      break;
    }
  }

  var is_ios = false;
  var ios_words = new Array("iPhone", "iPod");
  for (var word in ios_words) {
    if (navigator.userAgent.match(ios_words[word]) != null) {
      is_ios = true;
      location.href = "mangoplate://xn--main-ee6q572e";
      //setTimeout(function(){
      //    go_to_market();
      //}, 1500);
      break;
    }
  }
}

function get_device_os_type() {
  var device_type = {
    "ios": false,
    "android": false,
    "androidChromeIntent": false,
    "androidChrome25over": false
  };

  if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    device_type.ios = true;
  } else if (navigator.userAgent.match(/Android/i)) {
    device_type.android = true;

    var chromeString = navigator.userAgent.match(/Chrome\/[0-9]*/g);

    // 크롬 중에 intent로만 호출되는 버전 확인.
    var supportsIntent = chromeString && chromeString[0].split('/')[1] >= 25;
    if (supportsIntent) {
      device_type.androidChromeIntent = true;
    }

    var is_matched = navigator.userAgent.match(/WebKit\/[^\ ]*/);

    if (is_matched) {
      device_type.androidChrome25over = parseFloat(is_matched[0].toLowerCase().substr(7)) > 537.22;
    } else {
      device_type.androidChrome25over = false;
    }

  }

  return device_type;
}

function go_to_app_restaurant(restaurant_uuid) {
  if (!restaurant_uuid) {
    return false;
  }

  var service_info = {
        "scheme_url": "mangoplate://restaurant_detail?restaurant_uuid=" + restaurant_uuid,
        "package": "com.mangoplate"
      },
      device_type_obj = get_device_os_type(),
      visited = (new Date()).getTime(),
      alreadyMoved = false;

  if (device_type_obj.androidChromeIntent) {
    // 안드로이드 크롬에서는 intent 만 동작하는 경우 처리.
    var intentUrl = "intent:" + service_info.scheme_url + "#Intent;package=" + service_info.package + ";end;";

    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = intentUrl;
  } else {
    window.location.href = service_info.scheme_url;
  }

  document.body.appendChild(iframe);

  // 뒤로가기 호출시 캐싱될 수도 있으므로 iframe을 삭제 한다.
  document.body.removeChild(iframe);
}

/**
 * 안드로이드 인지 아닌지 체크하는 함수.
 * @returns {boolean} - true : 안드로이드, false : 다른 OS
 * @private
 */
function _isAndroid() {
  var ua = navigator.userAgent.toLowerCase();

  return ua.indexOf("android") > -1;
}

/**
 * IOS 인지 아닌지 확인하는 메서드.
 * @returns {boolean} - true : IOS, false : 다른 OS
 * @private
 */
function _isIOS() {
  var iDevices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ],
      result = false;

  while (iDevices.length) {
    if (navigator.platform === iDevices.pop()) {
      result = true;
    }
  }

  return result;
}

function scroll_lock(not_fixed) {
  var css_property = {"overflow": "hidden"};

  if (is_mobile_viewport() && !not_fixed) {
    css_property['position'] = 'fixed';
  }

  $("body").css(css_property);
}

function unscroll_lock() {
  var css_property = {"overflow": "visible"};

  if (is_mobile_viewport()) {
    css_property['position'] = 'static';
  }

  $("body").css(css_property);
}

function scroll_toggle() {
  var now_overflow = $("body").css("overflow");

  if (now_overflow == "hidden") {
    unscroll_lock();
  } else {
    scroll_lock();
  }
};

function visible_black_screen() {
  $(".black_screen").fadeToggle();
};

function go_to_market(location, event) {
  if (event) {
    event.stopPropagation();
  }

  var iframe = document.createElement('iframe'),
      market_url_arr = {
        "android": "market://details?id=com.mangoplate",
        "ios": "https://itunes.apple.com/app/id628509224"
      };

  iframe.style.display = 'none';

  if (_isAndroid()) {
    var android_call_url;

    android_call_url = market_url_arr.android;
    window.location.href = android_call_url;

  } else if (_isIOS()) {
    window.location.href = market_url_arr.ios;
  } else {
    window.location.href = market_url_arr.android;
  }
}

function get_segment(index) {
  var pathname = window.location.pathname,
      pathname_arr = pathname.split("/");
  if (pathname_arr.length > 1) {
    pathname_arr = pathname_arr.slice(1, pathname.length);
  }
  if (index || index > -1) {
    return pathname_arr[index];
  } else {
    return pathname_arr;
  }
}

function scroll_event_able() {
  var $body = $("body"),
      check_events = $._data($body[0], "events"),
      event_array = ["touchmove", "scroll", "mousewheel"];

  $body.unbind(event_array.join(" "));
}

function scroll_event_disalbe() {
  var $body = $("body"),
      check_events = $._data($body[0], "events"),
      event_array = ["touchmove", "scroll", "mousewheel"];

  $body.on(event_array.join(" "), function(e) {
    e.preventDefault();
    e.stopPropagation();

    return false;
  });
}

function check_safari() {
  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
    return /safari/.test(navigator.userAgent.toLocaleLowerCase()) && !/crios/.test(navigator.userAgent.toLocaleLowerCase());
  } else {
    return /safari/.test(navigator.userAgent.toLocaleLowerCase());
  }
}

function referrer_params(exclude_param_arr) {
  exclude_param_arr = exclude_param_arr || [];

  var a_tag = document.createElement("a"),
      referrer_param_arr,
      referrer_param_str_prefix = "?",
      referrer_param_str;

  a_tag.href = document.referrer;

  referrer_param_str = a_tag.search.replace("?", "");
  referrer_param_arr = referrer_param_str.split("&");

  referrer_param_arr.forEach(function(item) {
    var temp_arr = item.split("=");

    if (exclude_param_arr.indexOf(temp_arr[0]) > -1) {
      referrer_param_arr = _.without(referrer_param_arr, temp_arr.join("="));
    }
  });

  referrer_param_str = referrer_param_str_prefix + referrer_param_arr.join("&");

  return referrer_param_str;
}

function get_utm_string(target) {
  var $target = target ? $(target) : {data: function(){}};
  var origin_param = "?utm_source=organic&utm_medium=organic&utm_campaign=organic";
  var utm_param;
  var utm_term;

  if (window.location.search.indexOf("utm_source") > -1) {
    utm_param = window.location.search;
  } else {
    if (document.referrer.indexOf("utm_source") > -1) {
      utm_param = referrer_params(["keyword", "page"]);
    } else {
      utm_param = origin_param;
    }
  }

  if (is_naver_app()) {
    utm_term = "NAVER_APP";
    common_ga(get_now_page_code(), utm_term);
  } else {
    utm_term = $target.data('event_term') || "organic";
  }

  utm_param = utm_param + '&utm_content=' + ($target.data('event_name') || "organic") + '&utm_term=' + utm_term;

  if (utm_param.indexOf("mangoplate.com") == -1) {
    utm_param = "&referrer=" + encodeURIComponent(utm_param.replace('?', '&'));
  }

  return utm_param;
}

function go_to_app_or_market(target, device_os) {
  var OS_STRING = {
    "IOS": "ios",
    "ANDROID": "android"
  };
  var utm_param;
  var link_promise;
  var store_link;

  if(!is_mobile_viewport()){
    var locale;
    var host_url = "https://www.mangoplate.com";

    if(OS_STRING.ANDROID === device_os){
      store_link = "https://play.google.com/store/apps/details?id=com.mangoplate";
    } else if(OS_STRING.IOS === device_os){
      store_link = "https://itunes.apple.com/kr/app/id628509224";
    } else {
      locale = get_locale();

      if(locale === "ko") {
        store_link = host_url;
      } else {
        store_link = host_url + "/" + locale;
      }
    }

    window.open(store_link);
    return false;
  } else {
    if(OS_STRING.ANDROID === device_os && _isIOS()){
      return false;
    } else if(OS_STRING.IOS === device_os && _isAndroid()){
      return false;
    }
  }

  utm_param = get_utm_string(target);
  window.mp20.branch_io_service.init();
  link_promise = window.mp20.branch_io_service.make_link(utm_param);

  link_promise.then(function(link) {

  });
}

function get_default_language() {
  return "kor";
}

function get_language() {
  var locale_and_language_map = {"ko": "kor", "en": "eng", "zh": "zho"};
  var locale = I18n.currentLocale();

  if(locale_and_language_map[locale]){
    return locale_and_language_map[locale];
  } else {
    return get_default_language();
  }
}

function get_locale() {
  return I18n.currentLocale();
}

function get_locale_url(url) {
  var isFullURL = url.indexOf('http://') > -1 || url.indexOf('https://') > -1;

  if (isFullURL) {
    return url;
  }

  if(I18n.defaultLocale === I18n.currentLocale()){
    return url
  } else {
    return "/" + I18n.currentLocale() + url;
  }
}

function get_device_type() {
  return "web";
}

function get_device_uuid() {
  var device_uuid_name = "mp_device_uuid";

  return getCookie(device_uuid_name);
}

function toggle_menu_layer() {
  if (window.mp20.push_status_server) {
    window.mp20.push_status_server.trigger_event(window.mp20.push_status_server.make_open_action("menu"));
  } else {
    toggle_menu_layer_logic();
  }
}

function toggle_menu_layer_logic() {
  var $menu_module = $(".menu_module");

  if ($menu_module.css("display") === "none") {
    $menu_module.fadeIn("fast");
    //scroll_event_disalbe();
  } else {
    $menu_module.fadeOut("fast");
    //scroll_event_able();
  }
}

function close_menu_layer(callback) {
  if (window.mp20.push_status_server) {
    window.history.back();

    if (typeof callback === "function") {
      callback();
    }

    //window.mp20.push_status_server.trigger_event(window.mp20.push_status_server.make_close_action("menu"));
  } else {
    var $menu_module = $(".menu_module");

    $menu_module.fadeOut("fast");
  }
  //var $menu_module = $(".menu_module");
  //
  //$menu_module.hide();
  //scroll_event_able();
}

function trim(str) {
  str = str.toString();
  return str.replace(/ /g, '');
}

function replaceAll(str, replace_str, target_str) {
  return str.split(replace_str).join(target_str);
}

function number_comma(str) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function mp20_stop_scroll() {
  var $body = $('body');

  $body.addClass('stop-scrolling');
  $body.bind('touchmove scroll', function(e) {
    e.preventDefault()
  });
}

function mp20_start_scroll() {
  var $body = $('body');

  $body.removeClass('stop-scrolling');
  $body.unbind('touchmove');
}

function is_mobile_viewport() {
  var client_width = document.documentElement.clientWidth;

  return (320 <= client_width) && (client_width < 769);
};

function img_error(element, src) {
  element.onerror = "";
  element.src = src;
  return true;
}

function is_mobile_device() {
  var check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

function get_common_ga_page_name(pg_name) {
  var is_app_param = "is_app";

  if (is_mobile_viewport()) {
    if (getParameter(is_app_param)) {
      pg_name = pg_name + "_APP";
    } else {
      pg_name = pg_name + "_MOBILE";
    }
  }

  return pg_name;
}

function common_ga(pg_name, event_name, event_label, evnet_value) {
  if (!pg_name) {
    pg_name = get_now_page_code();
  }

  pg_name = get_common_ga_page_name(pg_name);

  if(_.isNumber(event_label)){
    event_label = event_label.toString()
  }

  if (_.isObject(event_label)) {
    try {
      event_label = JSON.stringify(event_label)
    } catch (e) {
      event_label = undefined;
    }
  }

  ga('send', 'event', pg_name, event_name, event_label, evnet_value);
};

function common_ga_page(pg_name) {
  pg_name = get_common_ga_page_name(pg_name);

  ga('send', 'pageview', pg_name);
}

function get_image_size(name) {
  var image_size = {
    "small": "/256x256/",
    "normal": "/512x512/",
    "big": "/1024x1024/"
  };

  return image_size[name];
}

function get_recommand_class_and_message(action_value) {
  var recommend_list = [
    {
      "class_name": "bad",
      "msg": "별로"
    },
    {
      "class_name": "ok",
      "msg": "괜찮다"
    },
    {
      "class_name": "good",
      "msg": "맛있다"
    }
  ];

  return recommend_list[action_value];
}

function get_wannago_text(action_class) {
  return action_class === "not_wannago_btn"
    ? I18n.t("menu_name.mn_visited")
    : I18n.t("menu_name.mn_wannago");
}

function get_time_diff_date(target_date) {
  var today = new Date(),
      dateArray = target_date.split("-"),
      dateObj = new Date(dateArray[0], Number(dateArray[1]) - 1, dateArray[2]);

  return parseInt((today.getTime() - dateObj.getTime()) / 1000 / 60 / 60 / 24);
}

function get_common_params() {
  var common_param = {
    "language": getLanguage(),
    "device_uuid": get_device_uuid(),
    "device_type": get_device_type()
  };

  return common_param;
}

function get_region_text(common_code, region_code) {
  var type_name = "region_code";

  return get_commoncode_by_display_text(common_code, type_name, region_code);
}

/**
 * metro display_text를 가져오는 메서드.
 * @param common_code - commoncode_array
 * @param metro_code - metro code
 * @returns {string || undefined}
 */
function get_metro(common_code, metro_code) {
  var type_name = "metro_code";

  return get_commoncode_by_display_text(common_code, type_name, metro_code);
}

/**
 * sub_cuisine_code display_text를 가져오는 메서드.
 * @param common_code - commoncode_array
 * @param sub_cuisine_code - sub_cuisine_code
 * @returns {string} - cuisine code text
 */
function get_subcuisine(common_code, sub_cuisine_code) {
  var type_name = "subcusine_code";

  return get_commoncode_by_display_text(common_code, type_name, sub_cuisine_code);
}

/**
 * price code text를 가져오는 메서드.
 * @param common_code - common_code array
 * @param price_code - price_code
 * @returns {string} - price code text
 */
function get_price(common_code, price_code) {
  var type_name = "price_range_code";

  return get_commoncode_by_display_text(common_code, type_name, price_code);
}

/**
 * parking code text를 가져오는 메서드.
 * @param common_code - common code array
 * @param parking_code - parking code
 * @returns {string|undefined} - parking code text
 */
function get_parking(common_code, parking_code) {
  var type_name = "parking_option_code";

  return get_commoncode_by_display_text(common_code, type_name, parking_code);
}
/**
 * commoncode에서 display_text를 가져오는 메서드.
 * @param common_code - common_code Array
 * @param type_name - commoncode typeName
 * @param type_value - commoncode typeValue
 * @returns {string || undefined}
 */
function get_commoncode_by_display_text(common_code, type_name, type_value) {
  var metro_arr = _.where(common_code, {"type_name": type_name, "type_value": type_value}),
      metro_obj;

  metro_obj = metro_arr.length ? metro_arr[0] : {};

  return metro_obj.display_text || "";
}

function scroll_lock_for_gallery() {
  $("body").css("overflow", "hidden").css("position", "fixed");
}

function is_scroll_status() {
  var $body = $("body");

  return $body.css("overflow") === "hidden" && $body.css("position") === "fixed";
}

function unscroll_lock_for_gallery() {
  $("body").css("overflow", "visible").css("position", "static");
}

function get_ab_test_message(target, data_name, var_param) {
  var $target,
      return_data,
      type_str;

  if (target instanceof Event) {
    $target = $(target.currentTarget);
  } else {
    if (!(target instanceof $)) {
      $target = $(target);
    } else {
      $target = target;
    }
  }

  switch (var_param) {
    case 0:
      type_str = "_a";
      return_data = $target.data(data_name + type_str);
      break;
    case 1:
      type_str = "_b";
      return_data = $target.data(data_name + type_str);
      break;
  }

  return return_data;
}

function excute_ab_test_script(ab_script_array) {
  var var_params = getParameter("var");

  ab_script_array[parseInt(var_params ? var_params : 0)]();
}

function get_now_page_code() {
  var now_segment = get_segment(0),
      now_page_code,
      change_rule = {
        "SEARCH": "SEARCH_RESULT",
        "RESTAURANTS": "RESTAURANT",
        "TOP_LISTS": "TOP_LIST",
      };

  if (now_segment) {
    now_page_code = replaceAll(now_segment, "_", "");
    now_page_code = now_page_code.toUpperCase();
    now_page_code = change_rule[now_page_code] ? change_rule[now_page_code] : now_page_code;
  } else {
    now_page_code = "MAIN";
  }

  return "PG_" + now_page_code;
}

function reverse_str(str) {
  return str.split("").reverse().join("");
}

function insert_array_between(insert_index, plus_number, list, insert_data) {
  var one_more_index,
      origin_insert_index = insert_index,
      plus_number = plus_number || 0;

  _.each(list, function(item, index) {
    one_more_index = index + 1;

    if (!(one_more_index % insert_index)) {
      list.splice(index, 0, insert_data);
    }

    insert_index = insert_index + origin_insert_index + plus_number;
  });

  return list;
}

function get_between_number_arr(base_number, up_number, max_number) {
  var result_arr = [],
      now_number = base_number + up_number;

  for (; now_number < max_number; now_number = now_number + base_number + up_number) {
    result_arr.push(now_number);
  }

  return result_arr;
}

function get_og_meta_data() {
  var $meta = $("meta"),
      meta_content,
      meta_property,
      og_meta_list = [],
      $item;

  _.each($meta, function(item) {
    $item = $(item);
    meta_property = $item.attr("property");

    if (meta_property && meta_property.indexOf("og:") > -1) {
      meta_content = $item.attr("content");
      og_meta_list.push({
        "name": meta_property,
        "value": meta_content
      });
    }
  });

  return og_meta_list;
}

function convertUTCDateToLocalDate(date) {
  date = new Date(date);

  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate.toLocaleString();
}

function removeURLParameter(url, parameter) {
  //prefer to use l.search if you have a location/link object
  var urlparts = url.split('?');
  if (urlparts.length >= 2) {

    var prefix = encodeURIComponent(parameter) + '=';
    var pars = urlparts[1].split(/[&;]/g);

    //reverse iteration as may be destructive
    for (var i = pars.length; i-- > 0;) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    url = urlparts[0] + '?' + pars.join('&');
    return url;
  } else {
    return url;
  }
}

function hangul_Josa_generator(txt, josa) {
  var code = txt.charCodeAt(txt.length - 1) - 44032;
  var cho = 19, jung = 21, jong = 28;
  var i1, i2, code1, code2;

  // 원본 문구가 없을때는 빈 문자열 반환
  if (txt.length == 0) return '';

  // 한글이 아닐때
  if (code < 0 || code > 11171) return txt;

  if (code % 28 == 0) return txt + Josa.get(josa, false);
  else return txt + Josa.get(josa, true);
}

hangul_Josa_generator.get = function(josa, jong) {
  // jong : true면 받침있음, false면 받침없음

  if (josa == '을' || josa == '를') return (jong ? '을' : '를');
  if (josa == '이' || josa == '가') return (jong ? '이' : '가');
  if (josa == '은' || josa == '는') return (jong ? '은' : '는');
  if (josa == '와' || josa == '과') return (jong ? '와' : '과');

  // 알 수 없는 조사
  return '';
};

function is_naver_app() {
  return navigator.userAgent.indexOf('NAVER(inapp') > -1;
}

function is_kakao_app() {
  return navigator.userAgent.indexOf('KAKAOTALK') > -1;
}

function to_safe_keyword(keyword) {
  keyword = replaceAll(keyword, ".", "");
  return replaceAll(keyword, "/", "");
}

function go_to_search_page(keyword) {
  if (!keyword || keyword === "undefined") {
    alert(I18n.t('label.enter_the_keyword'));
    return false;
  }

  location.href = get_locale_url("/search/" + encodeURIComponent(to_safe_keyword(keyword)));
}

if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

function chunk(chunkSize, array) {
  return _.reduce(array, function(previous, current) {
    var chunk;
    if (previous.length === 0 ||
        previous[previous.length - 1].length === chunkSize) {
      chunk = [];   // 1
      previous.push(chunk);   // 2
    }
    else {
      chunk = previous[previous.length - 1];   // 3
    }
    chunk.push(current);   // 4
    return previous;   // 5
  }, []);   // 6
}

function get_picture_url_by_akamai(pic_domain, pic_key, width, height, ext) {
  if (!pic_domain || !pic_key) {
    return 'https://mp-seoul-image-production-s3.mangoplate.com/web/resources/kssf5eveeva_xlmy.jpg?fit=around|*:*&crop=*:*;*,*&output-format=jpg&output-quality=80';
  }
  var picture_url = pic_domain + "/" + pic_key;

  width = width || "*"
  height = height || "*"
  ext = ext || "jpg"

  var akamai_qs = _.template("?fit=around|{{width}}:{{height}}&crop={{width}}:{{height}};*,*&output-format={{ext}}&output-quality=80")

  akamai_qs = akamai_qs({
    width: width,
    height: height,
    ext: ext
  })

  picture_url += akamai_qs

  return picture_url;
}

function get_full_picture_url_by_akamai(picture_url, width, height, ext) {
  width = width || "*"
  height = height || "*"
  ext = ext || "jpg"

  var akamai_qs = _.template("?fit=around|{{width}}:{{height}}&crop={{width}}:{{height}};*,*&output-format={{ext}}&output-quality=80")

  akamai_qs = akamai_qs({
    width: width,
    height: height,
    ext: ext
  })

  picture_url += akamai_qs

  return picture_url;
}

function nameSpace(namespace) {
  var nsparts = namespace.split(".");
  var parent = window

  for (var i = 0; i < nsparts.length; i++) {
    var partname = nsparts[i];

    if (typeof parent[partname] === "undefined") {
      parent[partname] = {};
    }

    parent = parent[partname];
  }

  return parent;
}

function get_rating(rating) {
  if (!rating || !parseFloat(rating)) {
    return "";
  } else {
    return parseFloat(rating).toFixed(1);
  }
}

function get_expected_rating_class(is_official_rating) {
  return is_official_rating ? "" : "expected"
}

/**
 * Image의 onerror에 바인딩 해주는 메서드
 * 바인딩 할때 bind(this)로 this 바인드도 해줘야 한다
 */
function image_on_error(){
  this.src='https://mp-seoul-image-production-s3.mangoplate.com/web/resources/kssf5eveeva_xlmy.jpg?fit=around|*:*&crop=*:*;*,*&output-format=jpg&output-quality=80'
}

function is_foreign_restaurant(region_code){
  return region_code >= 100
}

function get_facebook_user_picture(user){
  var facebook_id = user.facebook_id;
  var picture_url = user.picture_url;

  if(facebook_id && picture_url === ""){
    return "https://graph.facebook.com/" + facebook_id + "/picture?type=large&w‌​idth=128&height=128";
  } else {
    return picture_url;
  }
}

function get_user_picture_url_by_akamai(picture_url, facebook_id, width, height) {
  if(facebook_id && picture_url) {
    return get_facebook_user_picture({
      facebook_id: facebook_id,
      picture_url: picture_url
    });
  } else {
    return get_full_picture_url_by_akamai(picture_url, width, height);
  }
}

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

function get_page_segment() {
  var locale_map_str = '{"ko":"kor","en":"eng","zh":"zho"}';
  var locale_map = JSON.parse(locale_map_str);
  var locale_list = _.keys(locale_map);
  var segment = get_segment(0);

  if (locale_list.indexOf(segment) > -1){
    return get_segment(1);
  }

  return segment;
}

function get_search_keyword() {
  var locale_map_str = '{"ko":"kor","en":"eng","zh":"zho"}';
  var locale_map = JSON.parse(locale_map_str);
  var locale_list = _.keys(locale_map);
  var segment = get_segment(0);

  if (locale_list.indexOf(segment) > -1){
    return get_segment(2);
  }

  return get_segment(1);
}

function get_display_platform() {
  return is_mobile_viewport()
    ? "DESKTOP"
    : "MOBILE";
}

function is_firefox() {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

function safe_json_parse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return [];
  }
}

function isJqueryInstance(instance) {
  return instance instanceof $;
}

function parse_json(str, default_value) {
  try {
    return JSON.parse(str);
  } catch(e) {
    return default_value;
  }
}

function findEl(selector) {
  return document.querySelector(selector);
}

function stringPXToNumber(str) {
  return parseInt(str.slice(0, str.length - 2), 10);
}

function moveArrayItem(array, fromIndex, toIndex) {
  array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);

  return array;
}

function is(instnace, klass) {
  return instnace instanceof klass;
}

function fileToBase64Encode(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      resolve(reader.result)
    };

    reader.onerror = function (error) {
      reject(error)
    };
  });
}

function throwOverrideMethodError(methodName) {
  throw new Error(methodName + ' is must override method');
}

function replaceAllLineBreakString(str, lineBreakString) {
  str = str || '';
  lineBreakString = lineBreakString || '<br/>';
  return str.replace(/(?:\r\n|\r|\n)/g, lineBreakString);
}

function escapeString(text) {
  var result = text.replace(/</g,"&lt;").replace(/>/g,"&gt;");
  return result;
}

function encodeReviewKey(actionValue) {
  return btoa(actionValue);
}

function decodeReviewKey(reviewKey) {
  return atob(reviewKey);
}
;
(function () {
  var CONSTANTS = (function () {
    var constants = {
      "SLACK_WEB_HOOK_URL": "https://hooks.slack.com/services/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",
      "COOKIE_NAME_ENABLED": "debug_impression"
    };

    return {
      get: function (name) {
        return _.clone(constants[name]);
      }
    };
  })();

  var AdImpressionNotifier = {
    send_message: function (line_item_id, ad_unit_path) {
      if ($.cookie(CONSTANTS.get('COOKIE_NAME_ENABLED')) !== '1') {
        return;
      }

      var log_text = "Line Item ID: " + line_item_id + "\nAD Unit Path: " + ad_unit_path;

      $.ajax(CONSTANTS.get("SLACK_WEB_HOOK_URL"), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "payload=" + encodeURIComponent(JSON.stringify({
          channel: "#web",
          username: "[WEB] DFP Impression Log",
          icon_emoji: ":kissing_heart:",
          attachments: [
            {
              "fallback": log_text,
              "title": "IMPRESSION",
              "text": log_text,
              "color": "#7CD197"
            }
          ]
        }))
      });
    },

    toggle: function() {
      var cookie_key = CONSTANTS.get('COOKIE_NAME_ENABLED');

      if($.cookie(cookie_key)) {
        $.removeCookie(cookie_key);
        alert("설정이 해제되었습니다.");
      } else {
        $.cookie(cookie_key, true);
        alert("설정이 완료되었습니다.");
      }
    }
  };

  window.AdImpressionNotifier = AdImpressionNotifier;
})();
/* == jquery mousewheel plugin == Version: 3.1.13, License: MIT License (MIT) */

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/* == malihu jquery custom scrollbar plugin == Version: 3.1.5, License: MIT License (MIT) */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"undefined"!=typeof module&&module.exports?module.exports=e:e(jQuery,window,document)}(function(e){!function(t){var o="function"==typeof define&&define.amd,a="undefined"!=typeof module&&module.exports,n="https:"==document.location.protocol?"https:":"http:",i="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";o||(a?require("jquery-mousewheel")(e):e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//"+i+"%3E%3C/script%3E"))),t()}(function(){var t,o="mCustomScrollbar",a="mCS",n=".mCustomScrollbar",i={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,documentTouchScroll:!0,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:"auto",autoUpdateTimeout:60},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},r=0,l={},s=window.attachEvent&&!window.addEventListener?1:0,c=!1,d=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],u={init:function(t){var t=e.extend(!0,{},i,t),o=f.call(this);if(t.live){var s=t.liveSelector||this.selector||n,c=e(s);if("off"===t.live)return void m(s);l[s]=setTimeout(function(){c.mCustomScrollbar(t),"once"===t.live&&c.length&&m(s)},500)}else m(s);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":p(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=g(t.scrollButtons.scrollType),h(t),e(o).each(function(){var o=e(this);if(!o.data(a)){o.data(a,{idx:++r,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:o.css("direction"),cbOffsets:null,trigger:null,poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}});var n=o.data(a),i=n.opt,l=o.data("mcs-axis"),s=o.data("mcs-scrollbar-position"),c=o.data("mcs-theme");l&&(i.axis=l),s&&(i.scrollbarPosition=s),c&&(i.theme=c,h(i)),v.call(this),n&&i.callbacks.onCreate&&"function"==typeof i.callbacks.onCreate&&i.callbacks.onCreate.call(this),e("#mCSB_"+n.idx+"_container img:not(."+d[2]+")").addClass(d[2]),u.update.call(null,o)}})},update:function(t,o){var n=t||f.call(this);return e(n).each(function(){var t=e(this);if(t.data(a)){var n=t.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container"),l=e("#mCSB_"+n.idx),s=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];if(!r.length)return;n.tweenRunning&&Q(t),o&&n&&i.callbacks.onBeforeUpdate&&"function"==typeof i.callbacks.onBeforeUpdate&&i.callbacks.onBeforeUpdate.call(this),t.hasClass(d[3])&&t.removeClass(d[3]),t.hasClass(d[4])&&t.removeClass(d[4]),l.css("max-height","none"),l.height()!==t.height()&&l.css("max-height",t.height()),_.call(this),"y"===i.axis||i.advanced.autoExpandHorizontalScroll||r.css("width",x(r)),n.overflowed=y.call(this),M.call(this),i.autoDraggerLength&&S.call(this),b.call(this),T.call(this);var c=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];"x"!==i.axis&&(n.overflowed[0]?s[0].height()>s[0].parent().height()?B.call(this):(G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}),n.contentReset.y=null):(B.call(this),"y"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[1]&&G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==i.axis&&(n.overflowed[1]?s[1].width()>s[1].parent().width()?B.call(this):(G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}),n.contentReset.x=null):(B.call(this),"x"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[0]&&G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),o&&n&&(2===o&&i.callbacks.onImageLoad&&"function"==typeof i.callbacks.onImageLoad?i.callbacks.onImageLoad.call(this):3===o&&i.callbacks.onSelectorChange&&"function"==typeof i.callbacks.onSelectorChange?i.callbacks.onSelectorChange.call(this):i.callbacks.onUpdate&&"function"==typeof i.callbacks.onUpdate&&i.callbacks.onUpdate.call(this)),N.call(this)}})},scrollTo:function(t,o){if("undefined"!=typeof t&&null!=t){var n=f.call(this);return e(n).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l={trigger:"external",scrollInertia:r.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},s=e.extend(!0,{},l,o),c=Y.call(this,t),d=s.scrollInertia>0&&s.scrollInertia<17?17:s.scrollInertia;c[0]=X.call(this,c[0],"y"),c[1]=X.call(this,c[1],"x"),s.moveDragger&&(c[0]*=i.scrollRatio.y,c[1]*=i.scrollRatio.x),s.dur=ne()?0:d,setTimeout(function(){null!==c[0]&&"undefined"!=typeof c[0]&&"x"!==r.axis&&i.overflowed[0]&&(s.dir="y",s.overwrite="all",G(n,c[0].toString(),s)),null!==c[1]&&"undefined"!=typeof c[1]&&"y"!==r.axis&&i.overflowed[1]&&(s.dir="x",s.overwrite="none",G(n,c[1].toString(),s))},s.timeout)}})}},stop:function(){var t=f.call(this);return e(t).each(function(){var t=e(this);t.data(a)&&Q(t)})},disable:function(t){var o=f.call(this);return e(o).each(function(){var o=e(this);if(o.data(a)){o.data(a);N.call(this,"remove"),k.call(this),t&&B.call(this),M.call(this,!0),o.addClass(d[3])}})},destroy:function(){var t=f.call(this);return e(t).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),c=e(".mCSB_"+i.idx+"_scrollbar");r.live&&m(r.liveSelector||e(t).selector),N.call(this,"remove"),k.call(this),B.call(this),n.removeData(a),$(this,"mcs"),c.remove(),s.find("img."+d[2]).removeClass(d[2]),l.replaceWith(s.contents()),n.removeClass(o+" _"+a+"_"+i.idx+" "+d[6]+" "+d[7]+" "+d[5]+" "+d[3]).addClass(d[4])}})}},f=function(){return"object"!=typeof e(this)||e(this).length<1?n:this},h=function(t){var o=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],a=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],n=["minimal","minimal-dark"],i=["minimal","minimal-dark"],r=["minimal","minimal-dark"];t.autoDraggerLength=e.inArray(t.theme,o)>-1?!1:t.autoDraggerLength,t.autoExpandScrollbar=e.inArray(t.theme,a)>-1?!1:t.autoExpandScrollbar,t.scrollButtons.enable=e.inArray(t.theme,n)>-1?!1:t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,i)>-1?!0:t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,r)>-1?"outside":t.scrollbarPosition},m=function(e){l[e]&&(clearTimeout(l[e]),$(l,e))},p=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},g=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},v=function(){var t=e(this),n=t.data(a),i=n.opt,r=i.autoExpandScrollbar?" "+d[1]+"_expand":"",l=["<div id='mCSB_"+n.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_vertical"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+n.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_horizontal"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],s="yx"===i.axis?"mCSB_vertical_horizontal":"x"===i.axis?"mCSB_horizontal":"mCSB_vertical",c="yx"===i.axis?l[0]+l[1]:"x"===i.axis?l[1]:l[0],u="yx"===i.axis?"<div id='mCSB_"+n.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",f=i.autoHideScrollbar?" "+d[6]:"",h="x"!==i.axis&&"rtl"===n.langDir?" "+d[7]:"";i.setWidth&&t.css("width",i.setWidth),i.setHeight&&t.css("height",i.setHeight),i.setLeft="y"!==i.axis&&"rtl"===n.langDir?"989999px":i.setLeft,t.addClass(o+" _"+a+"_"+n.idx+f+h).wrapInner("<div id='mCSB_"+n.idx+"' class='mCustomScrollBox mCS-"+i.theme+" "+s+"'><div id='mCSB_"+n.idx+"_container' class='mCSB_container' style='position:relative; top:"+i.setTop+"; left:"+i.setLeft+";' dir='"+n.langDir+"' /></div>");var m=e("#mCSB_"+n.idx),p=e("#mCSB_"+n.idx+"_container");"y"===i.axis||i.advanced.autoExpandHorizontalScroll||p.css("width",x(p)),"outside"===i.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),m.addClass("mCSB_outside").after(c)):(m.addClass("mCSB_inside").append(c),p.wrap(u)),w.call(this);var g=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},x=function(t){var o=[t[0].scrollWidth,Math.max.apply(Math,t.children().map(function(){return e(this).outerWidth(!0)}).get())],a=t.parent().width();return o[0]>a?o[0]:o[1]>a?o[1]:"100%"},_=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx+"_container");if(n.advanced.autoExpandHorizontalScroll&&"y"!==n.axis){i.css({width:"auto","min-width":0,"overflow-x":"scroll"});var r=Math.ceil(i[0].scrollWidth);3===n.advanced.autoExpandHorizontalScroll||2!==n.advanced.autoExpandHorizontalScroll&&r>i.parent().width()?i.css({width:r,"min-width":"100%","overflow-x":"inherit"}):i.css({"overflow-x":"inherit",position:"absolute"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(i[0].getBoundingClientRect().right+.4)-Math.floor(i[0].getBoundingClientRect().left),"min-width":"100%",position:"relative"}).unwrap()}},w=function(){var t=e(this),o=t.data(a),n=o.opt,i=e(".mCSB_"+o.idx+"_scrollbar:first"),r=oe(n.scrollButtons.tabindex)?"tabindex='"+n.scrollButtons.tabindex+"'":"",l=["<a href='#' class='"+d[13]+"' "+r+" />","<a href='#' class='"+d[14]+"' "+r+" />","<a href='#' class='"+d[15]+"' "+r+" />","<a href='#' class='"+d[16]+"' "+r+" />"],s=["x"===n.axis?l[2]:l[0],"x"===n.axis?l[3]:l[1],l[2],l[3]];n.scrollButtons.enable&&i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])},S=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[n.height()/i.outerHeight(!1),n.width()/i.outerWidth(!1)],c=[parseInt(r[0].css("min-height")),Math.round(l[0]*r[0].parent().height()),parseInt(r[1].css("min-width")),Math.round(l[1]*r[1].parent().width())],d=s&&c[1]<c[0]?c[0]:c[1],u=s&&c[3]<c[2]?c[2]:c[3];r[0].css({height:d,"max-height":r[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":c[0]+"px"}),r[1].css({width:u,"max-width":r[1].parent().width()-10})},b=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[i.outerHeight(!1)-n.height(),i.outerWidth(!1)-n.width()],s=[l[0]/(r[0].parent().height()-r[0].height()),l[1]/(r[1].parent().width()-r[1].width())];o.scrollRatio={y:s[0],x:s[1]}},C=function(e,t,o){var a=o?d[0]+"_expanded":"",n=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(d[0]+" "+a),n.toggleClass(d[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(d[0]),n.removeClass(d[1])):(e.addClass(d[0]),n.addClass(d[1])))},y=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=null==o.overflowed?i.height():i.outerHeight(!1),l=null==o.overflowed?i.width():i.outerWidth(!1),s=i[0].scrollHeight,c=i[0].scrollWidth;return s>r&&(r=s),c>l&&(l=c),[r>n.height(),l>n.width()]},B=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx),r=e("#mCSB_"+o.idx+"_container"),l=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(Q(t),("x"!==n.axis&&!o.overflowed[0]||"y"===n.axis&&o.overflowed[0])&&(l[0].add(r).css("top",0),G(t,"_resetY")),"y"!==n.axis&&!o.overflowed[1]||"x"===n.axis&&o.overflowed[1]){var s=dx=0;"rtl"===o.langDir&&(s=i.width()-r.outerWidth(!1),dx=Math.abs(s/o.scrollRatio.x)),r.css("left",s),l[1].css("left",dx),G(t,"_resetX")}},T=function(){function t(){r=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(r),W.call(o[0])):t()},100)}var o=e(this),n=o.data(a),i=n.opt;if(!n.bindEvents){if(I.call(this),i.contentTouchScroll&&D.call(this),E.call(this),i.mouseWheel.enable){var r;t()}P.call(this),U.call(this),i.advanced.autoScrollOnFocus&&H.call(this),i.scrollButtons.enable&&F.call(this),i.keyboard.enable&&q.call(this),n.bindEvents=!0}},k=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=".mCSB_"+o.idx+"_scrollbar",l=e("#mCSB_"+o.idx+",#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,"+r+" ."+d[12]+",#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal,"+r+">a"),s=e("#mCSB_"+o.idx+"_container");n.advanced.releaseDraggableSelectors&&l.add(e(n.advanced.releaseDraggableSelectors)),n.advanced.extraDraggableSelectors&&l.add(e(n.advanced.extraDraggableSelectors)),o.bindEvents&&(e(document).add(e(!A()||top.document)).unbind("."+i),l.each(function(){e(this).unbind("."+i)}),clearTimeout(t[0]._focusTimeout),$(t[0],"_focusTimeout"),clearTimeout(o.sequential.step),$(o.sequential,"step"),clearTimeout(s[0].onCompleteTimeout),$(s[0],"onCompleteTimeout"),o.bindEvents=!1)},M=function(t){var o=e(this),n=o.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container_wrapper"),l=r.length?r:e("#mCSB_"+n.idx+"_container"),s=[e("#mCSB_"+n.idx+"_scrollbar_vertical"),e("#mCSB_"+n.idx+"_scrollbar_horizontal")],c=[s[0].find(".mCSB_dragger"),s[1].find(".mCSB_dragger")];"x"!==i.axis&&(n.overflowed[0]&&!t?(s[0].add(c[0]).add(s[0].children("a")).css("display","block"),l.removeClass(d[8]+" "+d[10])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[0].css("display","none"),l.removeClass(d[10])):(s[0].css("display","none"),l.addClass(d[10])),l.addClass(d[8]))),"y"!==i.axis&&(n.overflowed[1]&&!t?(s[1].add(c[1]).add(s[1].children("a")).css("display","block"),l.removeClass(d[9]+" "+d[11])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[1].css("display","none"),l.removeClass(d[11])):(s[1].css("display","none"),l.addClass(d[11])),l.addClass(d[9]))),n.overflowed[0]||n.overflowed[1]?o.removeClass(d[5]):o.addClass(d[5])},O=function(t){var o=t.type,a=t.target.ownerDocument!==document&&null!==frameElement?[e(frameElement).offset().top,e(frameElement).offset().left]:null,n=A()&&t.target.ownerDocument!==top.document&&null!==frameElement?[e(t.view.frameElement).offset().top,e(t.view.frameElement).offset().left]:[0,0];switch(o){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return a?[t.originalEvent.pageY-a[0]+n[0],t.originalEvent.pageX-a[1]+n[1],!1]:[t.originalEvent.pageY,t.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var i=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],r=t.originalEvent.touches.length||t.originalEvent.changedTouches.length;return t.target.ownerDocument!==document?[i.screenY,i.screenX,r>1]:[i.pageY,i.pageX,r>1];default:return a?[t.pageY-a[0]+n[0],t.pageX-a[1]+n[1],!1]:[t.pageY,t.pageX,!1]}},I=function(){function t(e,t,a,n){if(h[0].idleTimer=d.scrollInertia<233?250:0,o.attr("id")===f[1])var i="x",s=(o[0].offsetLeft-t+n)*l.scrollRatio.x;else var i="y",s=(o[0].offsetTop-e+a)*l.scrollRatio.y;G(r,s.toString(),{dir:i,drag:!0})}var o,n,i,r=e(this),l=r.data(a),d=l.opt,u=a+"_"+l.idx,f=["mCSB_"+l.idx+"_dragger_vertical","mCSB_"+l.idx+"_dragger_horizontal"],h=e("#mCSB_"+l.idx+"_container"),m=e("#"+f[0]+",#"+f[1]),p=d.advanced.releaseDraggableSelectors?m.add(e(d.advanced.releaseDraggableSelectors)):m,g=d.advanced.extraDraggableSelectors?e(!A()||top.document).add(e(d.advanced.extraDraggableSelectors)):e(!A()||top.document);m.bind("contextmenu."+u,function(e){e.preventDefault()}).bind("mousedown."+u+" touchstart."+u+" pointerdown."+u+" MSPointerDown."+u,function(t){if(t.stopImmediatePropagation(),t.preventDefault(),ee(t)){c=!0,s&&(document.onselectstart=function(){return!1}),L.call(h,!1),Q(r),o=e(this);var a=o.offset(),l=O(t)[0]-a.top,u=O(t)[1]-a.left,f=o.height()+a.top,m=o.width()+a.left;f>l&&l>0&&m>u&&u>0&&(n=l,i=u),C(o,"active",d.autoExpandScrollbar)}}).bind("touchmove."+u,function(e){e.stopImmediatePropagation(),e.preventDefault();var a=o.offset(),r=O(e)[0]-a.top,l=O(e)[1]-a.left;t(n,i,r,l)}),e(document).add(g).bind("mousemove."+u+" pointermove."+u+" MSPointerMove."+u,function(e){if(o){var a=o.offset(),r=O(e)[0]-a.top,l=O(e)[1]-a.left;if(n===r&&i===l)return;t(n,i,r,l)}}).add(p).bind("mouseup."+u+" touchend."+u+" pointerup."+u+" MSPointerUp."+u,function(){o&&(C(o,"active",d.autoExpandScrollbar),o=null),c=!1,s&&(document.onselectstart=null),L.call(h,!0)})},D=function(){function o(e){if(!te(e)||c||O(e)[2])return void(t=0);t=1,b=0,C=0,d=1,y.removeClass("mCS_touch_action");var o=I.offset();u=O(e)[0]-o.top,f=O(e)[1]-o.left,z=[O(e)[0],O(e)[1]]}function n(e){if(te(e)&&!c&&!O(e)[2]&&(T.documentTouchScroll||e.preventDefault(),e.stopImmediatePropagation(),(!C||b)&&d)){g=K();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left,n="mcsLinearOut";if(E.push(o),W.push(a),z[2]=Math.abs(O(e)[0]-z[0]),z[3]=Math.abs(O(e)[1]-z[1]),B.overflowed[0])var i=D[0].parent().height()-D[0].height(),r=u-o>0&&o-u>-(i*B.scrollRatio.y)&&(2*z[3]<z[2]||"yx"===T.axis);if(B.overflowed[1])var l=D[1].parent().width()-D[1].width(),h=f-a>0&&a-f>-(l*B.scrollRatio.x)&&(2*z[2]<z[3]||"yx"===T.axis);r||h?(U||e.preventDefault(),b=1):(C=1,y.addClass("mCS_touch_action")),U&&e.preventDefault(),w="yx"===T.axis?[u-o,f-a]:"x"===T.axis?[null,f-a]:[u-o,null],I[0].idleTimer=250,B.overflowed[0]&&s(w[0],R,n,"y","all",!0),B.overflowed[1]&&s(w[1],R,n,"x",L,!0)}}function i(e){if(!te(e)||c||O(e)[2])return void(t=0);t=1,e.stopImmediatePropagation(),Q(y),p=K();var o=M.offset();h=O(e)[0]-o.top,m=O(e)[1]-o.left,E=[],W=[]}function r(e){if(te(e)&&!c&&!O(e)[2]){d=0,e.stopImmediatePropagation(),b=0,C=0,v=K();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left;if(!(v-g>30)){_=1e3/(v-p);var n="mcsEaseOut",i=2.5>_,r=i?[E[E.length-2],W[W.length-2]]:[0,0];x=i?[o-r[0],a-r[1]]:[o-h,a-m];var u=[Math.abs(x[0]),Math.abs(x[1])];_=i?[Math.abs(x[0]/4),Math.abs(x[1]/4)]:[_,_];var f=[Math.abs(I[0].offsetTop)-x[0]*l(u[0]/_[0],_[0]),Math.abs(I[0].offsetLeft)-x[1]*l(u[1]/_[1],_[1])];w="yx"===T.axis?[f[0],f[1]]:"x"===T.axis?[null,f[1]]:[f[0],null],S=[4*u[0]+T.scrollInertia,4*u[1]+T.scrollInertia];var y=parseInt(T.contentTouchScroll)||0;w[0]=u[0]>y?w[0]:0,w[1]=u[1]>y?w[1]:0,B.overflowed[0]&&s(w[0],S[0],n,"y",L,!1),B.overflowed[1]&&s(w[1],S[1],n,"x",L,!1)}}}function l(e,t){var o=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?o[0]:o[3]:e>60?t>3?o[3]:o[2]:e>30?t>8?o[1]:t>6?o[0]:t>4?t:o[2]:t>8?t:o[3]}function s(e,t,o,a,n,i){e&&G(y,e.toString(),{dur:t,scrollEasing:o,dir:a,overwrite:n,drag:i})}var d,u,f,h,m,p,g,v,x,_,w,S,b,C,y=e(this),B=y.data(a),T=B.opt,k=a+"_"+B.idx,M=e("#mCSB_"+B.idx),I=e("#mCSB_"+B.idx+"_container"),D=[e("#mCSB_"+B.idx+"_dragger_vertical"),e("#mCSB_"+B.idx+"_dragger_horizontal")],E=[],W=[],R=0,L="yx"===T.axis?"none":"all",z=[],P=I.find("iframe"),H=["touchstart."+k+" pointerdown."+k+" MSPointerDown."+k,"touchmove."+k+" pointermove."+k+" MSPointerMove."+k,"touchend."+k+" pointerup."+k+" MSPointerUp."+k],U=void 0!==document.body.style.touchAction&&""!==document.body.style.touchAction;I.bind(H[0],function(e){o(e)}).bind(H[1],function(e){n(e)}),M.bind(H[0],function(e){i(e)}).bind(H[2],function(e){r(e)}),P.length&&P.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(H[0],function(e){o(e),i(e)}).bind(H[1],function(e){n(e)}).bind(H[2],function(e){r(e)})})})},E=function(){function o(){return window.getSelection?window.getSelection().toString():document.selection&&"Control"!=document.selection.type?document.selection.createRange().text:0}function n(e,t,o){d.type=o&&i?"stepped":"stepless",d.scrollAmount=10,j(r,e,t,"mcsLinearOut",o?60:null)}var i,r=e(this),l=r.data(a),s=l.opt,d=l.sequential,u=a+"_"+l.idx,f=e("#mCSB_"+l.idx+"_container"),h=f.parent();f.bind("mousedown."+u,function(){t||i||(i=1,c=!0)}).add(document).bind("mousemove."+u,function(e){if(!t&&i&&o()){var a=f.offset(),r=O(e)[0]-a.top+f[0].offsetTop,c=O(e)[1]-a.left+f[0].offsetLeft;r>0&&r<h.height()&&c>0&&c<h.width()?d.step&&n("off",null,"stepped"):("x"!==s.axis&&l.overflowed[0]&&(0>r?n("on",38):r>h.height()&&n("on",40)),"y"!==s.axis&&l.overflowed[1]&&(0>c?n("on",37):c>h.width()&&n("on",39)))}}).bind("mouseup."+u+" dragend."+u,function(){t||(i&&(i=0,n("off",null)),c=!1)})},W=function(){function t(t,a){if(Q(o),!z(o,t.target)){var r="auto"!==i.mouseWheel.deltaFactor?parseInt(i.mouseWheel.deltaFactor):s&&t.deltaFactor<100?100:t.deltaFactor||100,d=i.scrollInertia;if("x"===i.axis||"x"===i.mouseWheel.axis)var u="x",f=[Math.round(r*n.scrollRatio.x),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.width()?.9*l.width():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetLeft),p=c[1][0].offsetLeft,g=c[1].parent().width()-c[1].width(),v="y"===i.mouseWheel.axis?t.deltaY||a:t.deltaX;else var u="y",f=[Math.round(r*n.scrollRatio.y),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.height()?.9*l.height():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetTop),p=c[0][0].offsetTop,g=c[0].parent().height()-c[0].height(),v=t.deltaY||a;"y"===u&&!n.overflowed[0]||"x"===u&&!n.overflowed[1]||((i.mouseWheel.invert||t.webkitDirectionInvertedFromDevice)&&(v=-v),i.mouseWheel.normalizeDelta&&(v=0>v?-1:1),(v>0&&0!==p||0>v&&p!==g||i.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),t.deltaFactor<5&&!i.mouseWheel.normalizeDelta&&(h=t.deltaFactor,d=17),G(o,(m-v*h).toString(),{dir:u,dur:d}))}}if(e(this).data(a)){var o=e(this),n=o.data(a),i=n.opt,r=a+"_"+n.idx,l=e("#mCSB_"+n.idx),c=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")],d=e("#mCSB_"+n.idx+"_container").find("iframe");d.length&&d.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind("mousewheel."+r,function(e,o){t(e,o)})})}),l.bind("mousewheel."+r,function(e,o){t(e,o)})}},R=new Object,A=function(t){var o=!1,a=!1,n=null;if(void 0===t?a="#empty":void 0!==e(t).attr("id")&&(a=e(t).attr("id")),a!==!1&&void 0!==R[a])return R[a];if(t){try{var i=t.contentDocument||t.contentWindow.document;n=i.body.innerHTML}catch(r){}o=null!==n}else{try{var i=top.document;n=i.body.innerHTML}catch(r){}o=null!==n}return a!==!1&&(R[a]=o),o},L=function(e){var t=this.find("iframe");if(t.length){var o=e?"auto":"none";t.css("pointer-events",o)}},z=function(t,o){var n=o.nodeName.toLowerCase(),i=t.data(a).opt.mouseWheel.disableOver,r=["select","textarea"];return e.inArray(n,i)>-1&&!(e.inArray(n,r)>-1&&!e(o).is(":focus"))},P=function(){var t,o=e(this),n=o.data(a),i=a+"_"+n.idx,r=e("#mCSB_"+n.idx+"_container"),l=r.parent(),s=e(".mCSB_"+n.idx+"_scrollbar ."+d[12]);s.bind("mousedown."+i+" touchstart."+i+" pointerdown."+i+" MSPointerDown."+i,function(o){c=!0,e(o.target).hasClass("mCSB_dragger")||(t=1)}).bind("touchend."+i+" pointerup."+i+" MSPointerUp."+i,function(){c=!1}).bind("click."+i,function(a){if(t&&(t=0,e(a.target).hasClass(d[12])||e(a.target).hasClass("mCSB_draggerRail"))){Q(o);var i=e(this),s=i.find(".mCSB_dragger");if(i.parent(".mCSB_scrollTools_horizontal").length>0){if(!n.overflowed[1])return;var c="x",u=a.pageX>s.offset().left?-1:1,f=Math.abs(r[0].offsetLeft)-u*(.9*l.width())}else{if(!n.overflowed[0])return;var c="y",u=a.pageY>s.offset().top?-1:1,f=Math.abs(r[0].offsetTop)-u*(.9*l.height())}G(o,f.toString(),{dir:c,scrollEasing:"mcsEaseInOut"})}})},H=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=e("#mCSB_"+o.idx+"_container"),l=r.parent();r.bind("focusin."+i,function(){var o=e(document.activeElement),a=r.find(".mCustomScrollBox").length,i=0;o.is(n.advanced.autoScrollOnFocus)&&(Q(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=a?(i+17)*a:0,t[0]._focusTimeout=setTimeout(function(){var e=[ae(o)[0],ae(o)[1]],a=[r[0].offsetTop,r[0].offsetLeft],s=[a[0]+e[0]>=0&&a[0]+e[0]<l.height()-o.outerHeight(!1),a[1]+e[1]>=0&&a[0]+e[1]<l.width()-o.outerWidth(!1)],c="yx"!==n.axis||s[0]||s[1]?"all":"none";"x"===n.axis||s[0]||G(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i}),"y"===n.axis||s[1]||G(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i})},t[0]._focusTimer))})},U=function(){var t=e(this),o=t.data(a),n=a+"_"+o.idx,i=e("#mCSB_"+o.idx+"_container").parent();i.bind("scroll."+n,function(){0===i.scrollTop()&&0===i.scrollLeft()||e(".mCSB_"+o.idx+"_scrollbar").css("visibility","hidden")})},F=function(){var t=e(this),o=t.data(a),n=o.opt,i=o.sequential,r=a+"_"+o.idx,l=".mCSB_"+o.idx+"_scrollbar",s=e(l+">a");s.bind("contextmenu."+r,function(e){e.preventDefault()}).bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r+" mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r+" mouseout."+r+" pointerout."+r+" MSPointerOut."+r+" click."+r,function(a){function r(e,o){i.scrollAmount=n.scrollButtons.scrollAmount,j(t,e,o)}if(a.preventDefault(),ee(a)){var l=e(this).attr("class");switch(i.type=n.scrollButtons.scrollType,a.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===i.type)return;c=!0,o.tweenRunning=!1,r("on",l);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===i.type)return;c=!1,i.dir&&r("off",l);break;case"click":if("stepped"!==i.type||o.tweenRunning)return;r("on",l)}}})},q=function(){function t(t){function a(e,t){r.type=i.keyboard.scrollType,r.scrollAmount=i.keyboard.scrollAmount,"stepped"===r.type&&n.tweenRunning||j(o,e,t)}switch(t.type){case"blur":n.tweenRunning&&r.dir&&a("off",null);break;case"keydown":case"keyup":var l=t.keyCode?t.keyCode:t.which,s="on";if("x"!==i.axis&&(38===l||40===l)||"y"!==i.axis&&(37===l||39===l)){if((38===l||40===l)&&!n.overflowed[0]||(37===l||39===l)&&!n.overflowed[1])return;"keyup"===t.type&&(s="off"),e(document.activeElement).is(u)||(t.preventDefault(),t.stopImmediatePropagation(),a(s,l))}else if(33===l||34===l){if((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type){Q(o);var f=34===l?-1:1;if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=Math.abs(c[0].offsetLeft)-f*(.9*d.width());else var h="y",m=Math.abs(c[0].offsetTop)-f*(.9*d.height());G(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}else if((35===l||36===l)&&!e(document.activeElement).is(u)&&((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type)){if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=35===l?Math.abs(d.width()-c.outerWidth(!1)):0;else var h="y",m=35===l?Math.abs(d.height()-c.outerHeight(!1)):0;G(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}}var o=e(this),n=o.data(a),i=n.opt,r=n.sequential,l=a+"_"+n.idx,s=e("#mCSB_"+n.idx),c=e("#mCSB_"+n.idx+"_container"),d=c.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']",f=c.find("iframe"),h=["blur."+l+" keydown."+l+" keyup."+l];f.length&&f.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(h[0],function(e){t(e)})})}),s.attr("tabindex","0").bind(h[0],function(e){t(e)})},j=function(t,o,n,i,r){function l(e){u.snapAmount&&(f.scrollAmount=u.snapAmount instanceof Array?"x"===f.dir[0]?u.snapAmount[1]:u.snapAmount[0]:u.snapAmount);var o="stepped"!==f.type,a=r?r:e?o?p/1.5:g:1e3/60,n=e?o?7.5:40:2.5,s=[Math.abs(h[0].offsetTop),Math.abs(h[0].offsetLeft)],d=[c.scrollRatio.y>10?10:c.scrollRatio.y,c.scrollRatio.x>10?10:c.scrollRatio.x],m="x"===f.dir[0]?s[1]+f.dir[1]*(d[1]*n):s[0]+f.dir[1]*(d[0]*n),v="x"===f.dir[0]?s[1]+f.dir[1]*parseInt(f.scrollAmount):s[0]+f.dir[1]*parseInt(f.scrollAmount),x="auto"!==f.scrollAmount?v:m,_=i?i:e?o?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",w=!!e;return e&&17>a&&(x="x"===f.dir[0]?s[1]:s[0]),G(t,x.toString(),{dir:f.dir[0],scrollEasing:_,dur:a,onComplete:w}),e?void(f.dir=!1):(clearTimeout(f.step),void(f.step=setTimeout(function(){l()},a)))}function s(){clearTimeout(f.step),$(f,"step"),Q(t)}var c=t.data(a),u=c.opt,f=c.sequential,h=e("#mCSB_"+c.idx+"_container"),m="stepped"===f.type,p=u.scrollInertia<26?26:u.scrollInertia,g=u.scrollInertia<1?17:u.scrollInertia;switch(o){case"on":if(f.dir=[n===d[16]||n===d[15]||39===n||37===n?"x":"y",n===d[13]||n===d[15]||38===n||37===n?-1:1],Q(t),oe(n)&&"stepped"===f.type)return;l(m);break;case"off":s(),(m||c.tweenRunning&&f.dir)&&l(!0)}},Y=function(t){var o=e(this).data(a).opt,n=[];return"function"==typeof t&&(t=t()),t instanceof Array?n=t.length>1?[t[0],t[1]]:"x"===o.axis?[null,t[0]]:[t[0],null]:(n[0]=t.y?t.y:t.x||"x"===o.axis?null:t,n[1]=t.x?t.x:t.y||"y"===o.axis?null:t),"function"==typeof n[0]&&(n[0]=n[0]()),"function"==typeof n[1]&&(n[1]=n[1]()),n},X=function(t,o){if(null!=t&&"undefined"!=typeof t){var n=e(this),i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx+"_container"),s=l.parent(),c=typeof t;o||(o="x"===r.axis?"x":"y");var d="x"===o?l.outerWidth(!1)-s.width():l.outerHeight(!1)-s.height(),f="x"===o?l[0].offsetLeft:l[0].offsetTop,h="x"===o?"left":"top";switch(c){case"function":return t();case"object":var m=t.jquery?t:e(t);if(!m.length)return;return"x"===o?ae(m)[1]:ae(m)[0];case"string":case"number":if(oe(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(d*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(f-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var p=f+parseInt(t.split("+=")[1]);return p>=0?0:Math.abs(p)}if(-1!==t.indexOf("px")&&oe(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(s.height()-l.outerHeight(!1));if("right"===t)return Math.abs(s.width()-l.outerWidth(!1));if("first"===t||"last"===t){var m=l.find(":"+t);return"x"===o?ae(m)[1]:ae(m)[0]}return e(t).length?"x"===o?ae(e(t))[1]:ae(e(t))[0]:(l.css(h,t),void u.update.call(null,n[0]))}}},N=function(t){function o(){return clearTimeout(f[0].autoUpdate),0===l.parents("html").length?void(l=null):void(f[0].autoUpdate=setTimeout(function(){return c.advanced.updateOnSelectorChange&&(s.poll.change.n=i(),s.poll.change.n!==s.poll.change.o)?(s.poll.change.o=s.poll.change.n,void r(3)):c.advanced.updateOnContentResize&&(s.poll.size.n=l[0].scrollHeight+l[0].scrollWidth+f[0].offsetHeight+l[0].offsetHeight+l[0].offsetWidth,s.poll.size.n!==s.poll.size.o)?(s.poll.size.o=s.poll.size.n,void r(1)):!c.advanced.updateOnImageLoad||"auto"===c.advanced.updateOnImageLoad&&"y"===c.axis||(s.poll.img.n=f.find("img").length,s.poll.img.n===s.poll.img.o)?void((c.advanced.updateOnSelectorChange||c.advanced.updateOnContentResize||c.advanced.updateOnImageLoad)&&o()):(s.poll.img.o=s.poll.img.n,void f.find("img").each(function(){n(this)}))},c.advanced.autoUpdateTimeout))}function n(t){function o(e,t){return function(){
return t.apply(e,arguments)}}function a(){this.onload=null,e(t).addClass(d[2]),r(2)}if(e(t).hasClass(d[2]))return void r();var n=new Image;n.onload=o(n,a),n.src=t.src}function i(){c.advanced.updateOnSelectorChange===!0&&(c.advanced.updateOnSelectorChange="*");var e=0,t=f.find(c.advanced.updateOnSelectorChange);return c.advanced.updateOnSelectorChange&&t.length>0&&t.each(function(){e+=this.offsetHeight+this.offsetWidth}),e}function r(e){clearTimeout(f[0].autoUpdate),u.update.call(null,l[0],e)}var l=e(this),s=l.data(a),c=s.opt,f=e("#mCSB_"+s.idx+"_container");return t?(clearTimeout(f[0].autoUpdate),void $(f[0],"autoUpdate")):void o()},V=function(e,t,o){return Math.round(e/t)*t-o},Q=function(t){var o=t.data(a),n=e("#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal");n.each(function(){Z.call(this)})},G=function(t,o,n){function i(e){return s&&c.callbacks[e]&&"function"==typeof c.callbacks[e]}function r(){return[c.callbacks.alwaysTriggerOffsets||w>=S[0]+y,c.callbacks.alwaysTriggerOffsets||-B>=w]}function l(){var e=[h[0].offsetTop,h[0].offsetLeft],o=[x[0].offsetTop,x[0].offsetLeft],a=[h.outerHeight(!1),h.outerWidth(!1)],i=[f.height(),f.width()];t[0].mcs={content:h,top:e[0],left:e[1],draggerTop:o[0],draggerLeft:o[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(a[0])-i[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(a[1])-i[1])),direction:n.dir}}var s=t.data(a),c=s.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:c.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},n=e.extend(d,n),u=[n.dur,n.drag?0:n.dur],f=e("#mCSB_"+s.idx),h=e("#mCSB_"+s.idx+"_container"),m=h.parent(),p=c.callbacks.onTotalScrollOffset?Y.call(t,c.callbacks.onTotalScrollOffset):[0,0],g=c.callbacks.onTotalScrollBackOffset?Y.call(t,c.callbacks.onTotalScrollBackOffset):[0,0];if(s.trigger=n.trigger,0===m.scrollTop()&&0===m.scrollLeft()||(e(".mCSB_"+s.idx+"_scrollbar").css("visibility","visible"),m.scrollTop(0).scrollLeft(0)),"_resetY"!==o||s.contentReset.y||(i("onOverflowYNone")&&c.callbacks.onOverflowYNone.call(t[0]),s.contentReset.y=1),"_resetX"!==o||s.contentReset.x||(i("onOverflowXNone")&&c.callbacks.onOverflowXNone.call(t[0]),s.contentReset.x=1),"_resetY"!==o&&"_resetX"!==o){if(!s.contentReset.y&&t[0].mcs||!s.overflowed[0]||(i("onOverflowY")&&c.callbacks.onOverflowY.call(t[0]),s.contentReset.x=null),!s.contentReset.x&&t[0].mcs||!s.overflowed[1]||(i("onOverflowX")&&c.callbacks.onOverflowX.call(t[0]),s.contentReset.x=null),c.snapAmount){var v=c.snapAmount instanceof Array?"x"===n.dir?c.snapAmount[1]:c.snapAmount[0]:c.snapAmount;o=V(o,v,c.snapOffset)}switch(n.dir){case"x":var x=e("#mCSB_"+s.idx+"_dragger_horizontal"),_="left",w=h[0].offsetLeft,S=[f.width()-h.outerWidth(!1),x.parent().width()-x.width()],b=[o,0===o?0:o/s.scrollRatio.x],y=p[1],B=g[1],T=y>0?y/s.scrollRatio.x:0,k=B>0?B/s.scrollRatio.x:0;break;case"y":var x=e("#mCSB_"+s.idx+"_dragger_vertical"),_="top",w=h[0].offsetTop,S=[f.height()-h.outerHeight(!1),x.parent().height()-x.height()],b=[o,0===o?0:o/s.scrollRatio.y],y=p[0],B=g[0],T=y>0?y/s.scrollRatio.y:0,k=B>0?B/s.scrollRatio.y:0}b[1]<0||0===b[0]&&0===b[1]?b=[0,0]:b[1]>=S[1]?b=[S[0],S[1]]:b[0]=-b[0],t[0].mcs||(l(),i("onInit")&&c.callbacks.onInit.call(t[0])),clearTimeout(h[0].onCompleteTimeout),J(x[0],_,Math.round(b[1]),u[1],n.scrollEasing),!s.tweenRunning&&(0===w&&b[0]>=0||w===S[0]&&b[0]<=S[0])||J(h[0],_,Math.round(b[0]),u[0],n.scrollEasing,n.overwrite,{onStart:function(){n.callbacks&&n.onStart&&!s.tweenRunning&&(i("onScrollStart")&&(l(),c.callbacks.onScrollStart.call(t[0])),s.tweenRunning=!0,C(x),s.cbOffsets=r())},onUpdate:function(){n.callbacks&&n.onUpdate&&i("whileScrolling")&&(l(),c.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(n.callbacks&&n.onComplete){"yx"===c.axis&&clearTimeout(h[0].onCompleteTimeout);var e=h[0].idleTimer||0;h[0].onCompleteTimeout=setTimeout(function(){i("onScroll")&&(l(),c.callbacks.onScroll.call(t[0])),i("onTotalScroll")&&b[1]>=S[1]-T&&s.cbOffsets[0]&&(l(),c.callbacks.onTotalScroll.call(t[0])),i("onTotalScrollBack")&&b[1]<=k&&s.cbOffsets[1]&&(l(),c.callbacks.onTotalScrollBack.call(t[0])),s.tweenRunning=!1,h[0].idleTimer=0,C(x,"hide")},e)}}})}},J=function(e,t,o,a,n,i,r){function l(){S.stop||(x||m.call(),x=K()-v,s(),x>=S.time&&(S.time=x>S.time?x+f-(x-S.time):x+f-1,S.time<x+1&&(S.time=x+1)),S.time<a?S.id=h(l):g.call())}function s(){a>0?(S.currVal=u(S.time,_,b,a,n),w[t]=Math.round(S.currVal)+"px"):w[t]=o+"px",p.call()}function c(){f=1e3/60,S.time=x+f,h=window.requestAnimationFrame?window.requestAnimationFrame:function(e){return s(),setTimeout(e,.01)},S.id=h(l)}function d(){null!=S.id&&(window.requestAnimationFrame?window.cancelAnimationFrame(S.id):clearTimeout(S.id),S.id=null)}function u(e,t,o,a,n){switch(n){case"linear":case"mcsLinear":return o*e/a+t;case"mcsLinearOut":return e/=a,e--,o*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=a/2,1>e?o/2*e*e+t:(e--,-o/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=a/2,1>e?o/2*Math.pow(2,10*(e-1))+t:(e--,o/2*(-Math.pow(2,-10*e)+2)+t);case"easeInOut":case"mcsEaseInOut":return e/=a/2,1>e?o/2*e*e*e+t:(e-=2,o/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=a,e--,-o*(e*e*e*e-1)+t;case"easeOutStrong":return o*(-Math.pow(2,-10*e/a)+1)+t;case"easeOut":case"mcsEaseOut":default:var i=(e/=a)*e,r=i*e;return t+o*(.499999999999997*r*i+-2.5*i*i+5.5*r+-6.5*i+4*e)}}e._mTween||(e._mTween={top:{},left:{}});var f,h,r=r||{},m=r.onStart||function(){},p=r.onUpdate||function(){},g=r.onComplete||function(){},v=K(),x=0,_=e.offsetTop,w=e.style,S=e._mTween[t];"left"===t&&(_=e.offsetLeft);var b=o-_;S.stop=0,"none"!==i&&d(),c()},K=function(){return window.performance&&window.performance.now?window.performance.now():window.performance&&window.performance.webkitNow?window.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},Z=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var t=["top","left"],o=0;o<t.length;o++){var a=t[o];e._mTween[a].id&&(window.requestAnimationFrame?window.cancelAnimationFrame(e._mTween[a].id):clearTimeout(e._mTween[a].id),e._mTween[a].id=null,e._mTween[a].stop=1)}},$=function(e,t){try{delete e[t]}catch(o){e[t]=null}},ee=function(e){return!(e.which&&1!==e.which)},te=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},oe=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},ae=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]},ne=function(){function e(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}var t=e();return t?document[t]:!1};e.fn[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o].defaults=i,window[o]=!0,e(window).bind("load",function(){e(n)[o](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var o,a,n=e(t),i=n.parents(".mCSB_container");if(i.length)return o=i.parent(),a=[i[0].offsetTop,i[0].offsetLeft],a[0]+ae(n)[0]>=0&&a[0]+ae(n)[0]<o.height()-n.outerHeight(!1)&&a[1]+ae(n)[1]>=0&&a[1]+ae(n)[1]<o.width()-n.outerWidth(!1)},mcsInSight:e.expr[":"].mcsInSight||function(t,o,a){var n,i,r,l,s=e(t),c=s.parents(".mCSB_container"),d="exact"===a[3]?[[1,0],[1,0]]:[[.9,.1],[.6,.4]];if(c.length)return n=[s.outerHeight(!1),s.outerWidth(!1)],r=[c[0].offsetTop+ae(s)[0],c[0].offsetLeft+ae(s)[1]],i=[c.parent()[0].offsetHeight,c.parent()[0].offsetWidth],l=[n[0]<i[0]?d[0]:d[1],n[1]<i[1]?d[0]:d[1]],r[0]-i[0]*l[0][0]<0&&r[0]+n[0]-i[0]*l[0][1]>=0&&r[1]-i[1]*l[1][0]<0&&r[1]+n[1]-i[1]*l[1][1]>=0},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var o=e(t).data(a);if(o)return o.overflowed[0]||o.overflowed[1]}})})})});
!function(){"use strict";function a(){this.defaults={scrollButtons:{enable:!0},axis:"yx"},$.mCustomScrollbar.defaults.scrollButtons=this.defaults.scrollButtons,$.mCustomScrollbar.defaults.axis=this.defaults.axis,this.$get=function(){return{defaults:this.defaults}}}function b(a,b,c,d){c.mCustomScrollbar("destroy");var e={};d.ngScrollbarsConfig&&(e=d.ngScrollbarsConfig);for(var f in a)if(a.hasOwnProperty(f))switch(f){case"scrollButtons":e.hasOwnProperty(f)||(b.scrollButtons=a[f]);break;case"axis":e.hasOwnProperty(f)||(b.axis=a[f]);break;default:e.hasOwnProperty(f)||(e[f]=a[f])}c.mCustomScrollbar(e)}function c(a){return{scope:{ngScrollbarsConfig:"=?",ngScrollbarsUpdate:"=?",element:"=?"},link:function(c,d,e){c.elem=d;var f=a.defaults,g=$.mCustomScrollbar.defaults;c.ngScrollbarsUpdate=function(){d.mCustomScrollbar.apply(d,arguments)},c.$watch("ngScrollbarsConfig",function(a,e){void 0!==a&&b(f,g,d,c)}),b(f,g,d,c)}}}angular.module("ngScrollbars",[]).provider("ScrollBars",a).directive("ngScrollbars",c),a.$inject=[],c.$inject=["ScrollBars"]}();
(function () {
  var Coordinate = function (lat, lon) {
    this._lat = lat || 0;
    this._lon = lon || 0;
  };

  Coordinate.prototype = {
    get lat() {
      return this._lat;
    },

    get lon() {
      return this._lon;
    },

    toString: function () {
      return '(' + this.lat + ', ' + this.lon + ')';
    }
  };

  window.Coordinate = Coordinate;
})();
(function(){
    window.onpageshow = function(event) {
      if (event.persisted) {
        window.location.reload()
      }
    };

    // "mp20App" Angular App Create.
    var mp20App = angular.module("mp20App", ['ngSanitize', 'ngScrollbars']);

    mp20App.run(["$rootScope", function($rootScope){
      $rootScope.page_locale = I18n.currentLocale();

      window.is_login = $rootScope.is_login = auth_service.is_auth(function(auth_info){
        var terms_agreements = auth_service.filter_terms_agreements(auth_info.terms_agreements);

        if(terms_agreements.length > 0){
          window.account_terms_layer.open(auth_info.user_info.member_uuid, terms_agreements, auth_info);
        }
      });
    }]);
})();
(function () {
  /**
   * page_history_service 네임 스페이스.
   * @type {Object}
   */
  var page_history_service = {};

  /**
   * page_history_service에서 사용할 각종 옵션 및 설정 사항.
   * @type {Object}
   */
  page_history_service.options = {
    "key": "mp_page_history",
    "target_element": $("body"),
    "max_count": 10
  };

  /**
   * localStorage에서 page history를 가져옴.
   * @return {Object || undefined}
   */
  page_history_service.get_page_history_from_localStorage = function () {
    return localStorage.getItem(this.options.key);
  };

  /**
   * localStorage에서 page history를 가져와서 JSON, 없으면 Array로 만들어 주는 메서드.
   * @return {JSON || Array}
   */
  page_history_service.get_page_history = function () {
    var page_history_str = this.get_page_history_from_localStorage(),
      page_history;

    if (page_history_str) {
      page_history = JSON.parse(page_history_str);
    } else {
      page_history = [];
    }

    return page_history;
  };

  /**
   * 데이터 저장시의 사용하는 구조를 만들어서 리턴해주는 메서드.
   * @param  {String} page_type [페이지 타입을 받음(get_segment(0))]
   * @param  {String} value     [페이지 값을 받음(get_segment(1))]
   * @return {Object}           [사용하는 구조로 리턴]
   */
  page_history_service.make_data_format = function (page_type, value) {
    return {
      "page_type": page_type,
      "value": value
    };
  };

  /**
   * localStorage에서 page history를 저장 하는 메서드.
   * 같은 값이 있으면 저장 하지 않고 없으면 저장.
   * @param  {String} restaurant_key [restaurant_key를 받음.]
   */
  page_history_service.set_page_history = function (restaurant_key) {
    var page_history = this.get_page_history();

    var temp_data = this.make_data_format("restaurants", restaurant_key);
    var is_same = _.where(page_history, temp_data);

    if (is_same.length) {
      page_history = this.remove_page_history(restaurant_key);
    }

    temp_data.visited_time = new Date();

    if (page_history.length >= this.options.max_count) {
      page_history = page_history.slice(1, page_history.length);
    }

    page_history.push(temp_data);
    localStorage.setItem(this.options.key, JSON.stringify(page_history));

  };

  /**
   *
   * @param restaurant_key
   */
  page_history_service.remove_page_history = function (restaurant_key) {
    var page_history = this.get_page_history(),
      remove_data = _.reject(page_history, function (data) {
        return data.value === restaurant_key;
      });

    localStorage.setItem(this.options.key, JSON.stringify(remove_data));

    return remove_data;
  };

  page_history_service.remove_all = function () {
    localStorage.setItem(this.options.key, "");
    this.update_count();
  };

  page_history_service.update_count = function (count) {
    var page_history_list = this.get_page_history();
    var page_history_count = page_history_list.length

    $(".user .count").html(page_history_count);
    $(".recent_view_counter").html(page_history_count);
  }


  //window 객체에 넣어줌.
  window.page_history_service = page_history_service;
})();
(function () {
  var auth_service = {},
    $dom = {};

  window.auth_service = auth_service;

  $dom.init = function () {
    this.mp_login_btn = $(".mp_login_btn");
    this.mp_mine_btn = $(".mp_mine_btn");
    this.mp_mine_btn_none = $(".mp_mine_btn_none");
    this.wannago_btn = $(".wannago_btn");
    this.user_picture = $(".user_picture");
    this.user_name = $(".header .user .user_name");
    this.user_picture_btn = $(".header .user .is_login_status_btn .thumb");
    this.login_area = $(".login_loading_area");
  };

  $dom.init();
  auth_service.is_error = false;
  auth_service.before_wannago = "before_wannago";

  auth_service.option = {
    "api_host": "https://stage.mangoplate.com",
    "api_subfix": ".js",
    "make_call_url": function (call_url, subfix) {
      var url_subfix = subfix || auth_service.option.api_subfix;

      return auth_service.option.api_host + call_url + url_subfix;
    },
    "save_auth_name": "mp_auth"
  };

  auth_service.is_auth = function (login_callback, not_login_callback) {
    var auth_info = this.get_auth_info() || {};
    var result;
    if (auth_info.access_token) {
      result = true;
      this.auth_token_verify(auth_info.access_token, login_callback, not_login_callback);
    } else {
      result = false;
    }
    return result;
  };

  auth_service.add_before_wannago = function () {
    var restaurantUUID = $.cookie(this.before_wannago);
    var dontWannagoActionTypes = [3, 4];

    if (!restaurantUUID) {
      return;
    }

    window.mp20.service.RestaurantSupplier.getRestaurant(restaurantUUID)
      .then(function (restaurant) {
        var isEmptyRestaurant = !restaurant;
        var isDontWannagoState = restaurant.action && dontWannagoActionTypes.indexOf(restaurant.action.action_type) > -1

        if (isEmptyRestaurant || isDontWannagoState) {
          throw new Error();
        }

        return mp20.wannago_http_service.wannago(restaurantUUID);
      })
      .then(function (wannago_info) {
        $(mp20.wannago_service.class_name + "[data-restaurant_uuid=" + restaurantUUID + "]").each(function (index, $el) {
          if (!wannago_info.error_code) {
            $(this).addClass(mp20.wannago_service.attr.selected_class);
            $(this).data(mp20.wannago_service.attr.action_id, wannago_info.action_id);
          }
        });

        auth_service.reset_before_wannago();
      })
      .catch(function () {

      });
  };

  auth_service.set_before_wannago = function (restaurant_uuid) {
    $.cookie(this.before_wannago, restaurant_uuid);
  };

  auth_service.reset_before_wannago = function () {
    $.removeCookie(this.before_wannago);
  };

  auth_service.auth_token_verify = function (access_token, login_callback, not_login_callback) {
    window.mp20.utils.HttpApi.checkVerifiedAccessToken(access_token)
      .then(function (info) {
        if (typeof info === "string") {
          info = JSON.parse(info);
        }

        if (info.error) {
          if (not_login_callback) {
            not_login_callback();
          }

          $dom.mp_login_btn.hide();

          if (!auth_service.is_error) {
            alert(I18n.t('label.session_expire'));
            auth_service.is_error = true;

            auth_service.logout();
          } else {
            window.location.replace("");
          }
        } else {
          auth_service.set_auth_info(info);
          auth_service.do_login_action(info);
          if (login_callback) {
            login_callback(info);
          }
        }
      })
  };

  auth_service.logout = function () {
    localStorage.removeItem(auth_service.option.save_auth_name);

    function setCookie(cName, cValue, cDay) {
      var expire = new Date();
      expire.setDate(expire.getDate() + cDay);
      cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
      if (typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
      document.cookie = cookies;
    }

    setCookie("mp_auth", "", -1);

//    window.location.replace("");
    window.location.reload(true);
  };

  auth_service.get_auth_info = function () {
    var auth_info = localStorage.getItem(auth_service.option.save_auth_name);

    if (auth_info) {
      auth_info = JSON.parse(auth_info);

      if (typeof auth_info !== "object") {
        auth_info = JSON.parse(auth_info);
      }
    }

    return auth_info;
  };

  auth_service.set_auth_info = function (auth_info) {
    if (typeof auth_info === "string") {
      setCookie("mp_auth", JSON.parse(auth_info).access_token);
    } else {
      setCookie("mp_auth", auth_info.access_token);
      auth_info = JSON.stringify(auth_info)
    }

    localStorage.setItem(auth_service.option.save_auth_name, auth_info);
  };

  auth_service.do_login_action = function (info) {
    if (typeof info !== "object") {
      info = JSON.parse(info)
    }
    var user_picture = info.user_info.picture_url || "https://mp-seoul-image-production-s3.mangoplate.com/web/resources/jmcmlp180qwkp1jj.png?fit=around|*:*&crop=*:*;*,*&output-format=jpg&output-quality=80",
      page_history_list;

//	  $dom.mp_mine_btn.attr("src", user_picture);

    $dom.user_picture_btn.css("background-image", "url('" + user_picture + "')");
    $dom.user_picture_btn.addClass("login");
    $dom.user_name.html(str_cut(info.user_info.nick_name, 12));

    $dom.mp_login_btn.remove();

    $dom.mp_mine_btn.show();
    $dom.mp_mine_btn_none.show();

    this.set_history_count();
  };

  auth_service.set_history_count = function () {
    page_history_service.update_count();
  };

  auth_service.check_policy_agreements = function (auth_info) {
    var nedd_property = ["private_info", "user_contract"],
      policy_agreements = auth_info.policy_agreements,
      is_verify = true;

    if (policy_agreements) {
      _.each(nedd_property, function (property) {
        var result = policy_agreements[property];

        if (!result) {
          is_verify = false;
        }
      })
    } else {
      is_verify = false;
    }

    return is_verify;
  };

  auth_service.do_not_login_action = function () {
    $dom.mp_login_btn.show();

    $dom.mp_mine_btn.remove();
    $dom.mp_mine_btn_none.remove();

    this.set_history_count();
  };

  auth_service.get_access_token = function () {
    return $.cookie("mp_auth");
  };

  auth_service.get_member_uuid = function () {
    var auth_info = this.get_auth_info();
    return auth_info ? auth_info.member_uuid : null;
  }

  auth_service.is_validated_access_token = function (access_token) {
    var auth_info = this.get_auth_info();
    if (!auth_info) {
      return false;
    }
    return auth_info.access_token === access_token;
  };

  auth_service.policy_agreements = function (member_uuid, access_token) {
    window.mp20.utils.HttpApi.policyAgreements(member_uuid, access_token, auth_service.policy_agreements_data)
      .then(function (data) {
        window.location.reload();
      });
  };

  auth_service.set_policy_agreements_data = function (data) {
    this.policy_agreements_data = data;
  };

  auth_service.show_login_loading_area = function () {
    $dom.login_area.show();
  };

  auth_service.hide_login_loading_area = function () {
    $dom.login_area.hide();
  };

  auth_service.filter_terms_agreements = function (terms_agreements) {
    return terms_agreements.filter(function (term) {
      return term.term.id !== "location";
    });
  }
})();
(function () {
  var FacebookSDK = (function () {
    var STATUS = {
      CONNECTED: 'connected',
      notAuthorized: 'not_authorized',
      unknown: 'unknown'
    };

    function initialize() {
      FB.init({
        appId: 476661545693695,
        xfbml: true,
        version: 'v2.9'
      });
    }

    function getLoginStatus() {
      return new Promise(function (resolve) {
        FB.getLoginStatus(resolve);
      });
    }

    function login(scope) {
      return new Promise(function (resolve) {
        FB.login(resolve, {
          scope: scope
        });
      })
    }

    function api(path) {
      return new Promise(function (resolve) {
        FB.api(path, resolve);
      })
    }

    initialize();

    return {
      STATUS: STATUS,
      getLoginStatus: getLoginStatus,
      login: login,
      api: api
    };
  })();

  var MPFacebookAuthenticator = (function () {
    var FACEBOOK_PERMISSION_SCOPE = 'email,user_birthday,user_friends';

    function FBLogin() {
      return FacebookSDK.login(FACEBOOK_PERMISSION_SCOPE)
        .then(function (loginRes) {
          var isConnected = loginRes.status === FacebookSDK.STATUS.CONNECTED;

          if (isConnected) {
            return loginRes.authResponse;
          } else {
            throw new Error();
          }
        });
    }

    function FBGetLoginStatus() {
      return FacebookSDK.getLoginStatus()
        .then(function (res) {
          var isConnected = res.status === FacebookSDK.STATUS.CONNECTED;

          if (isConnected) {
            return res.authResponse;
          } else {
            return FBLogin();
          }
        })
    }

    function getFirstStepByViewport() {
      if (is_mobile_viewport()) {
        return FBLogin();
      }

      return FBGetLoginStatus();
    }

    function shouldRedirectToHTTPS() {
      var uriManager = new window.mp20.service.URIManager();

      if (uriManager.isHTTPSURL()) {
        return false;
      }

      var isProductionSubDomain = uriManager.isProductionSubDomain();
      var isBetaSubDomain = uriManager.isBetaSubDomain();
      var isAlphaSubdomain = uriManager.isAlphaSubdomain();
      var isUnknownSubDomain = !(isProductionSubDomain || isBetaSubDomain || isAlphaSubdomain);

      if (isUnknownSubDomain) {
        return false;
      }

      uriManager.toHTTPS();
      if (uriManager.isProductionSubDomain()) {
        uriManager.setSubDomain(window.mp20.service.URIManager.PHASE_BY_SUB_DOMAIN.PRODUCTION);
      }

      alert(I18n.t('label.to_https_redirect'));
      uriManager.toRedirect();
      return true;
    }

    function signIn() {
      if (shouldRedirectToHTTPS()) {
        return;
      }

      auth_service.show_login_loading_area();

      getFirstStepByViewport()
        .then(function (authResponse) {
          return window.mp20.utils.HttpApi.signInByFacebook(authResponse.userID, authResponse.accessToken)
            .then(function (res) {
              if (res.error) {
                return signUp(authResponse);
              }

              return res;
            });
        })
        .then(function (res) {
          var termsAgreements = auth_service.filter_terms_agreements(res.terms_agreements);

          if (termsAgreements.length) {
            auth_service.hide_login_loading_area();
            window.account_terms_layer.open(res.user_info.member_uuid, termsAgreements, res);
          } else {
            auth_service.set_auth_info(res);
            window.location.reload();
          }
        })
        .catch(function (err) {
          if (err.message) {
            alert(err.message);
          }

          auth_service.hide_login_loading_area();
        });
    }

    function signUp(authInfo) {
      return FacebookSDK.api('/me?fields=birthday,email,first_name,last_name,locale')
        .then(function (userInfo) {
          return {
            userId: authInfo.userID,
            accessToken: authInfo.accessToken,
            firstName: userInfo.first_name,
            lastName: userInfo.last_name,
            email: userInfo.email,
            locale: userInfo.locale,
            birthday: userInfo.birthday,
          };
        })
        .then(function (FBUserInfo) {
          return window.mp20.utils.HttpApi.signUpByFacebook(FBUserInfo);
        })
        .then(function (res) {
          if (res.error) {
            throw new Error('MangoPlate Signup failed.');
          }

          return res;
        });
    }

    return {
      login: signIn
    }
  })();

  window.mp_facebook = MPFacebookAuthenticator;
})();
$(document).ready(function () {
  var mp_kakao = {};
  var constants = nameSpace("mp.module.constants");

  mp_kakao.option = {
    "loginSuccessCallback": function (authObj) {
      auth_service.show_login_loading_area();

      mp_kakao.auth_info = authObj;
      mp_kakao.get_me(mp_kakao.mp_login);
    },

    "loginFailCallback": function (err) {
      alert("카카오톡 로그인이 실패했습니다.");
    },

    "api_host": "https://stage.mangoplate.com",
    "api_subfix": ".json",
    "make_call_url": function (call_url) {
      return mp_kakao.option.api_host + call_url + mp_kakao.option.api_subfix;
    }
  };

  mp_kakao.mp_login = function (kakao_info) {
    var access_token = mp_kakao.auth_info.access_token;
    var kakao_id = kakao_info.id;
    var call_url = "/api/v5/account/login/by_kakao";

    $.ajax({
      "url": mp_kakao.option.make_call_url(call_url),
      "type": "post",
      "data": {
        "kakao_id": kakao_id,
        "kakao_access_token": access_token,
        "device_uuid": get_device_uuid(),
        "device_type": "web",
        "language": get_language()
      }
    }).done(function (auth_info) {
      if (auth_info.error) {
        mp_kakao.mp_join(kakao_info);
        return ;
      }

      var terms_agreements = auth_service.filter_terms_agreements(auth_info.terms_agreements);

      if (terms_agreements.length) {
        auth_service.hide_login_loading_area();
        window.account_terms_layer.open(auth_info.user_info.member_uuid, terms_agreements, auth_info);
      } else {
        auth_service.set_auth_info(auth_info);
        window.location.reload();
      }
    });
  };

  mp_kakao.mp_join = function (kakao_info) {
    var self = this;
    var call_url = "/api/v5/account/signup/by_kakao";
    var email = kakao_info.kaccount_email ? kakao_info.kaccount_email : '';

    $.ajax({
      "url": self.option.make_call_url(call_url),
      "type": "post",
      "data": {
        "kakao_id": kakao_info.id,
        "kakao_access_token": mp_kakao.auth_info.access_token,
        "device_type": "web",
        "language": get_language(),
        "first_name": kakao_info.properties.nickname,
        "last_name": "",
        "email": email,
        "country": "",
        "picture_url": kakao_info.properties.thumbnail_image,
        "birthday": "",
        "gender": ""
      }
    }).done(function (auth_info) {
      if (auth_info.error) {
        alert("가입 실패.");
        return ;
      }
      var terms_agreements = auth_service.filter_terms_agreements(auth_info.terms_agreements);

      window.account_terms_layer.open(auth_info.user_info.member_uuid, terms_agreements, auth_info);
    })
  }

  mp_kakao.login = function (successCallback, fallCallback) {
    Kakao.Auth.login({
      success: mp_kakao.option.loginSuccessCallback,
      fail: mp_kakao.option.loginFailCallback,
      throughTalk: false
    });
  };

  mp_kakao.get_me = function (successCallback) {
    var options = {
      "url": "/v1/user/me",
      "success": successCallback
    };

    return Kakao.API.request(options);
  };

  mp_kakao.checkLoadKakao = function () {
    var result = false;

    if (window.Kakao) {
      result = true;
    }

    return result;
  }

  Kakao.init("c7a58d638097e8cc349f7700b267b64f");
  window.mp_kakao = mp_kakao;
});
(function(){
    $(document).ready(function(){
        var $dom = {};
        var constants = nameSpace("mp.module.constants");
        var true_str = "true",
            false_str = "false",
            false_btn_src = get_full_picture_url_by_akamai("https://mp-seoul-image-production-s3.mangoplate.com/web/resources/24_jjq1lbdgzpdnp.png", undefined, undefined, "png"),
            true_btn_src = get_full_picture_url_by_akamai("https://mp-seoul-image-production-s3.mangoplate.com/web/resources/ojlwsg-0cpi1dz8p.png", undefined, undefined, "png"),
            account_terms_layer = {},
            terms_title_map ={
              "privacy": I18n.t("terms.privacy"),
              "privacy_short": I18n.t("terms.privacy_short"),
              "contract": I18n.t("terms.contract")
            },
            has_click_class = "ischecked",
            terms_item_template;

        account_terms_layer.open = function(member_uuid, terms_list, auth_info){
            common_ga_page("PG_AGREEMENT");

	          auth_service.hide_login_loading_area();
            mp_login_layer.close_layer();
            account_terms_layer.member_uuid = member_uuid;
            account_terms_layer.terms_list = terms_list;
            account_terms_layer.auth_info = auth_info;

            terms_list.forEach(function(terms_item) {
              terms_item = $.extend({}, terms_item, {
                title: I18n.t('login_popup.agree', {
                  title: terms_title_map[terms_item.term.id] || terms_item.term.title
                })
              });

              var $terms_item = $(account_terms_layer.build_terms_item_template(terms_item));

              if(terms_item.term.required === "required") {
                $terms_item.find('.required_message').show();
              }

              $dom.account_terms_items.append($terms_item);
            });

            $(".account_terms_layer").fadeIn('fast');
            scroll_lock();
        };

        account_terms_layer.build_terms_item_template = function(terms_data) {
          if (!terms_item_template) {
            terms_item_template = Handlebars.compile(account_terms_layer.get_terms_item_template_string());
          }

          return terms_item_template(terms_data);
        };

      account_terms_layer.get_terms_item_template_string = function () {
        return '<li class="account_terms_item">' +
          '        <p>' +
          '          <a href="' + get_locale_url('https://stage.mangoplate.com/api/terms/revisions/{{revisionID}}.html') + '" rel="nofollow" onclick="common_ga(\'PG_AGREEMENT\', \'CLICK_TERMS\', \'{{ term.id }}\')" target="_blank" class="mango_color_under_bar">' +
          '            {{ title }}' +
          '          </a>' +
          '' +
          '          <span class="required_message">(' + I18n.t('login_popup.required') + ')</span>' +
          '        </p>' +
          '        <button class="check_terms_btn" data-ischecked="false" data-term-id="{{ term.id }}" data-revision-id="{{ revisionID }}">' +
          '          <img src="https://mp-seoul-image-production-s3.mangoplate.com/web/resources/24_jjq1lbdgzpdnp.png?fit=around|:&crop=:;*,*&output-format=png&output-quality=80"' +
          '               alt="arrow"' +
          '               title=""' +
          '          />' +
          '        </button>' +
          '      </li>';
      }

        account_terms_layer.close = function(){
            $(".account_terms_layer").fadeOut('fast');
            $dom.account_terms_items.find(".account_terms_item").remove();
            $dom.all_terms_btn.find("img").attr("src", false_btn_src);
            $dom.all_terms_btn.data(has_click_class, false_str);
            $dom.account_terms_layer_ok_btn.prop("disabled", true);
            unscroll_lock();
        };

        $dom.init = function(){
            this.check_terms_btn = $(".check_terms_btn");
            this.account_terms_layer_ok_btn = $(".account_terms_layer_ok_btn");
            this.all_terms_btn = $(".all_terms_btn");
            this.close_btn = $(".close_btn");
            this.account_terms_layer = $(".account_terms_layer");
            this.account_terms_items = $(".account_terms_items");
        };

        $dom.init();

        $dom.close_btn.on("click", function(){
            account_terms_layer.close();
        });

        $dom.account_terms_items.on("click", ".check_terms_btn", function(e){
            if($(this).hasClass("all_terms_btn")){
                return false;
            }

            var is_checked = $(this).data(has_click_class);

            if(is_checked === true_str){
                $(this).find("img").attr("src", false_btn_src);
                $(this).data(has_click_class, false_str);

            } else {
                $(this).find("img").attr("src", true_btn_src);
                $(this).data(has_click_class, true_str);
            }

            var true_count = 0,
                check_terms_btn_list = $(".account_terms_items .check_terms_btn");

            check_terms_btn_list.each(function(i, e){
                if($(this).data(has_click_class) == true_str){
                    true_count++;
                }
            });

            if(check_terms_btn_list.length == true_count){
                $dom.all_terms_btn.find("img").attr("src", true_btn_src);
                $dom.all_terms_btn.data(has_click_class, true_str);
            } else {
                $dom.all_terms_btn.find("img").attr("src", false_btn_src);
                $dom.all_terms_btn.data(has_click_class, false_str);
            }

            required_check(account_terms_layer.terms_list);
        });

        $dom.account_terms_layer_ok_btn.on("click", function(){
            var terms_list = account_terms_layer.terms_list;
            var term_el_list = terms_list.map(function(revisionItem) {
              return $(".check_terms_btn[data-term-id="+revisionItem.term.id+"]");
            });

            required_check(terms_list);

            var revisionIDs = term_el_list
              .map(function (revisionItem) {
                if (revisionItem.data("ischecked") === true_str) {
                  return revisionItem.data("revision-id");
                }
              }).filter(function (revisionItem) {
                if (typeof(revisionItem) !== "undefined") {
                  return revisionItem
                }
              });

            var check_terms_map = {};

            term_el_list.forEach(function(revisionItem) {
              var term_id = revisionItem.data('term-id');

              check_terms_map[term_id] = revisionItem.data("ischecked") === true_str;
            });

            common_ga("PG_AGREEMENT", "CLICK_CONFIRM", JSON.stringify(check_terms_map));

          window.mp20.utils.HttpApi.termsAgreements(account_terms_layer.auth_info.access_token, account_terms_layer.member_uuid, revisionIDs.join(","))
            .then(function (res) {
              if (res.error) {
                alert("가입 실패");
                return;
              }

              auth_service.set_auth_info(account_terms_layer.auth_info);
              location.reload();
            })
        });

        $dom.all_terms_btn.on("click", function(){
            var check_terms_btn = $(".check_terms_btn");
            if(String($(this).data("ischecked")) == false_str){
                check_terms_btn.data(has_click_class, true_str);
                check_terms_btn.find("img").attr("src", true_btn_src);
            } else {
                check_terms_btn.data(has_click_class, false_str);
                check_terms_btn.find("img").attr("src", false_btn_src);
            }

            required_check(account_terms_layer.terms_list);
        });

        function get_policy_agreements_data(){
            var policy_agreements_data = {};

            policy_agreements_data.user_contract = $(".user_contract_btn").data(has_click_class);
            policy_agreements_data.private_info = $(".private_info_btn").data(has_click_class);
            policy_agreements_data.location_info = $(".location_info_btn").data(has_click_class);
            policy_agreements_data.newsletter = "false"

            return policy_agreements_data;
        }

        function required_check(terms_list) {
            var count = 0;

            var requiredItemList = terms_list.filter(function(requiredItem) {
                return requiredItem.term.required === "required";
            }).map(function(requiredItem) {
                return $(".check_terms_btn[data-term-id="+requiredItem.term.id+"]");
            });

            $.each(requiredItemList, function(){
                if(String($(this).data(has_click_class)) == false_str){
                    return false;
                } else {
                    count++;
                }
            });

            if (count !== requiredItemList.length) {
                $dom.account_terms_layer_ok_btn.prop("disabled", true);
            } else {
                $dom.account_terms_layer_ok_btn.prop("disabled", false);
            }
        }

        window.account_terms_layer = account_terms_layer;
    });

    $(document).ready(function(){
        var touchstartClick = "touchstart click";
        var login_layer = {},
            $pg_login = $(".pg-login"),
            $facebook_login_btn = $pg_login.find(".btn-login.facebook"),
            $kakaotalk_login_btn = $pg_login.find(".btn-login.kakaotalk"),
            $message = $pg_login.find(".message"),
            $closeBtnLogin = $(".close_btn_login");

        $facebook_login_btn.on("click", function eventCallback(e){
            e.preventDefault();
            mp_facebook.login();
        });

        $kakaotalk_login_btn.on("click", function eventCallback(e){
            e.preventDefault();
            mp_kakao.login();
        });


      $pg_login.on(touchstartClick, function(e){
          e.stopPropagation();

          if($(e.target).hasClass("pg-login")){
            e.preventDefault();
            login_layer.close_layer();
          }
        });

        login_layer.open_layer = function (description) {
          description = description || I18n.t('login_popup.login_message');
	        common_ga_page('PU_LOGIN');
	        login_layer._set_description(description);
          $pg_login.show();
        };

        login_layer._set_description = function (description) {
          $message.html(description);
        }

        login_layer.close_layer = function () {
          common_ga('PU_LOGIN', "CLICK_OUTSIDE_CANCEL");
          $pg_login.hide();
        };

        login_layer.not_closed_mode = function () {
          $pg_login.off(touchstartClick);
          $('.btn-nav-close').hide();
        }

        $closeBtnLogin.on("click", function(){
          login_layer.close_layer();
        });

        window.mp_login_layer = login_layer;
    });
})();
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//



;
(function(){
	var MP_CONSTANTS = {
		"EVENT": {
			"PAGE_HISTORY_OPEN": "open_page_history_layer"
		},
		"MANGOPICK_TYPE_CLASS":{
			"1": "picks_tag_restaurant",
			"2": "picks_tag_mangolist",
			"3": "picks_tag_story"
		},
		"ERROR_IMAGE":{
			"RESTAURANT": "https://mp-seoul-image-production-s3.mangoplate.com/web/resources/kssf5eveeva_xlmy.jpg",
			"USER": "https://mp-seoul-image-production-s3.mangoplate.com/web/resources/jmcmlp180qwkp1jj.png?fit=around|*:*&crop=*:*;*,*&output-format=jpg&output-quality=80"
		},
		"API": {
			"API_HOST": "https://stage.mangoplate.com",
			"COMMON_PARAMS": {
				"language": get_language(),
				"device_uuid": get_device_uuid(),
				"device_type": get_device_type()
			}
		},
		"SEARCH_PARAMS": {
			"ORDER_TYPES": {
				"RECOMMEND": 0,
				"DISTANCE": 1,
				"RATING": 2,
				"REVIEW": 3
			}
		},
		"VIEWPORT": {
			"MOBILE_MIN": 320,
			"MOBILE_MAX": 768,
			"DESKTOP_MIN": 769
		},
    "DEFAULT_LOCALE": "ko",
    "LOCALE_AND_LANGUAGE_MAP": {"kor": "ko", "eng": "en", "zho": "zho"},
		"TERMS_ID": {
			"LOCATION": "location"
		},
    "FILTER_NAMES": {
      "subcuisine_code": "subcuisine_codes",
      "metro_code": "metro_codes",
      "price_code": "price_codes",
      "cuisine_code":"cuisine_codes",
      "parking_available": "is_parking_available"
    },
    "DEFAULT_FILTER" : {
		  "subcuisine_codes": [],
      "metro_codes": [],
      "price_codes": [],
      "cuisine_codes": [],
      "is_parking_available": 0
    },
    "DEFAULT_SEARCH_ORDER_BY": "2",
	};

  var ns = nameSpace("mp.module");
  ns.constants = MP_CONSTANTS;
  angular.module("mp20App").constant("MP_CONSTANTS", MP_CONSTANTS);
})();
(function () {
  angular.module("mp20App").directive("keyupBind", keyup_bind);

  function keyup_bind() {
    return {
      restrict: "A",
      scope: {
        "callback": "&keyupBind"
      },
      link: function (scope, element) {
        var callback = scope.callback();

        //Firefix에서는 조합형 문자의 경우 keyup, keydown 이벤트가 발생이 안되어서 분기처리.
        if (is_firefox()) {
          var keyup_allow_keycode_list = [40, 38, 13];

          element.on("input", callback);
          element.on("keyup", function (e) {
            if (keyup_allow_keycode_list.indexOf(e.keyCode || e.which) > -1) {
              callback(e);
            }
          });
        } else {
          element.on("keyup", callback);
        }
      }
    };
  }
})();
(function(){
	mp20_util_service.$inject = ["MP_CONSTANTS", "$http", "$q"];
	angular.module("mp20App").factory("mp20_util_service", mp20_util_service);

	function mp20_util_service(MP_CONSTANTS, $http, $q){
		var mp20_util_service = {};

		/**
		 * API Call할때 공통으로 날아가야 하는 파라미터를 합쳐주는 메서드.
		 * @param params - 전송할 파라미터
		 * @returns {object} - 공통 파라미터 + 요청 파라미터 object
		 */
		mp20_util_service.make_params = function(params){
			params = params || {};
			var proxy = {};

			proxy = _.extend(proxy, MP_CONSTANTS.API.COMMON_PARAMS);
			proxy = _.extend(proxy, params);

			return proxy;
		};

		/**
		 * Promise Process를 공통 처리 할 수 있는 메서드.
		 * @param promise - 처리할 promise 객체
		 * @param successCallback - 성공시 호출되는 callback
		 * @param errorCallback - 실패치 호출되는 callback
		 */
		mp20_util_service.common_promise = function(promise, successCallback, errorCallback){
			errorCallback = errorCallback || function(err){
				console.error(err);
			};

			return promise.then(successCallback).catch(errorCallback);
		};

		/**
		 * start_index를 구할때 사용하는 메서드.
		 * @param page - 현재 페이지
		 * @returns {number} - start_index 값.
		 */
		mp20_util_service.get_start_index = function(page, request_count){
			request_count = request_count || 10;

			return (page - 1) * request_count;
		};

		/**
		 * Angular HTTP POST가 잘 동작하지 않기때문에 공통으로 사용할 목적으로 따로 만듬.
		 * @param url - Call URL
		 * @param params - 보낼 파라미터
		 * @returns {promise}
		 */
		mp20_util_service.http_post = function(url, params){
			params = $.param(params);

			return $http({
				method: 'POST',
				url: url,
				data: params,
				headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': auth_service.get_access_token()}
			});
		};

		/**
		 * Promise 공통 처리 메서드.
		 * @param call_url - 호출할 URL.
		 * @param method - 호출할 HTTP 메서드.
		 * @param param - 호출할때 포함 시킬 파라미터
		 * @returns {promise}
		 */
    mp20_util_service.call_api_promise = function (call_url, method, param) {
      var defer = $q.defer();
      var common_http;
      
      var getData = function (data) {
        return _.assign({
          'language': get_language(),
          'device_uuid': get_device_uuid(),
          'device_type': get_device_type(),
        }, data);
      };

      switch (method) {
        case "post":
          common_http = this.http_post(call_url, getData(param));
          break;

        case "get":
        default :
          common_http = $http.get(call_url, {
            "params": getData(param),
            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': auth_service.get_access_token()}
          });
          break;
      }

      common_http.then(function (data) {
        defer.resolve(data.data);
      }).catch(function (err) {
        defer.reject(err);
      });

      return defer.promise;
    };

		/**
		 * 망고픽 타입에 대한 클레스를 리턴해주는 메서드.
		 * @param type - 망고픽 타입 number
		 * @returns {string} - 망고픽 클레스
		 */
		mp20_util_service.get_mango_pick_type_class = function(type){
			return MP_CONSTANTS.MANGOPICK_TYPE_CLASS[type];
		};

		/**
		 * 현재 Viewport가 Mobile Viewport인지 체크하는 함수.
		 * @returns {boolean}
		 */
		mp20_util_service.is_mobile_viewport = function(){
			var client_width = document.documentElement.clientWidth;

			return (MP_CONSTANTS.VIEWPORT.MOBILE_MIN <= client_width) && (client_width < MP_CONSTANTS.VIEWPORT.DESKTOP_MIN);
		};

    /**
     * paste Event 객체를 받아서 text 값을 꺼내는 함수
     * @param $event - Angular Event Object
     * @returns {(string|undefined)}
     */
    mp20_util_service.get_paste_text = function ($event) {
      if ($event && $event.type === "paste") {
        var clipboardData = $event.originalEvent.clipboardData || window.clipboardData;

        return clipboardData ? clipboardData.getData('Text') : undefined;
      }

      return undefined;
    }

		mp20_util_service.get_wannago_text = get_wannago_text;

		return mp20_util_service;
	}
})();
(function(){
	mp20_restaurant_info_service.$inject = ["MP_CONSTANTS", "mp20_util_service", "$window"];
	angular.module("mp20App").factory("mp20_restaurant_info_service", mp20_restaurant_info_service);

	function mp20_restaurant_info_service(MP_CONSTANTS, mp20_util_service, $window){
		var mp20_restaurant_info_service = {};

		//action_value - 1
    mp20_restaurant_info_service.recommend_list = [
      {
        "class_name": "bad",
        "msg": I18n.t("label.bad")
      },
      {
        "class_name": "ok",
        "msg": I18n.t("label.okay")
      },
      {
        "class_name": "good",
        "msg": I18n.t("label.good")
      }
    ];

		mp20_restaurant_info_service.thumb_size = {
			"small": "/256x256/",
			"normal": "/512x512/",
			"big": "/1024x1024/"
		};

		mp20_restaurant_info_service.empty_image = "https://mp-seoul-image-production-s3.mangoplate.com/web/resources/jmcmlp180qwkp1jj.png?fit=around|*:*&crop=*:*;*,*&output-format=jpg&output-quality=80";

		mp20_restaurant_info_service.get_metro = get_metro;
		mp20_restaurant_info_service.get_subcuisine = get_subcuisine;
		mp20_restaurant_info_service.get_price = get_price;
		mp20_restaurant_info_service.get_parking = get_parking;
		mp20_restaurant_info_service.get_commoncode_by_display_text = get_commoncode_by_display_text;
		mp20_restaurant_info_service.is_what_action = is_what_action;
		mp20_restaurant_info_service.is_not_action_btn = is_not_action_btn;
		mp20_restaurant_info_service.get_background = get_background;
		mp20_restaurant_info_service.get_rating = get_rating;
		mp20_restaurant_info_service.from_date = from_date;
		mp20_restaurant_info_service.get_recommend = get_recommend;
		mp20_restaurant_info_service.get_user_picture = get_user_picture;
		mp20_restaurant_info_service.get_restaurant_meta = get_restaurant_meta;
		mp20_restaurant_info_service.get_recommend_class_name = get_recommend_class_name;
		mp20_restaurant_info_service.get_recommend_message = get_recommend_message;
		mp20_restaurant_info_service.get_user_background = get_user_background;
		mp20_restaurant_info_service.get_picture_url = get_picture_url;
		mp20_restaurant_info_service.diff_date_formatting = diff_date_formatting;
		mp20_restaurant_info_service.get_picture_url_by_akamai = $window.get_picture_url_by_akamai;
		mp20_restaurant_info_service.get_full_picture_url_by_akamai = $window.get_full_picture_url_by_akamai;

		/**
		 * metro display_text를 가져오는 메서드.
		 * @param common_code - commoncode_array
		 * @param metro_code - metro code
		 * @returns {string || undefined}
		 */
		function get_metro(common_code, metro_code) {
			var type_name = "metro_code";

			return get_commoncode_by_display_text(common_code, type_name, metro_code);
		}

		/**
		 * sub_cuisine_code display_text를 가져오는 메서드.
		 * @param common_code - commoncode_array
		 * @param sub_cuisine_code - sub_cuisine_code
		 * @returns {string} - cuisine code text
		 */
		function get_subcuisine(common_code, sub_cuisine_code) {
			var type_name = "subcusine_code";

			return get_commoncode_by_display_text(common_code, type_name, sub_cuisine_code);
		}

		/**
		 * price code text를 가져오는 메서드.
		 * @param common_code - common_code array
		 * @param price_code - price_code
		 * @returns {string} - price code text
		 */
		function get_price(common_code, price_code){
			var type_name = "price_range_code";

			return get_commoncode_by_display_text(common_code, type_name, price_code);
		}

		/**
		 * parking code text를 가져오는 메서드.
		 * @param common_code - common code array
		 * @param parking_code - parking code
		 * @returns {string|undefined} - parking code text
		 */
		function get_parking(common_code, parking_code){
			var type_name = "parking_option_code";

			return get_commoncode_by_display_text(common_code, type_name, parking_code);
		}
		/**
		 * commoncode에서 display_text를 가져오는 메서드.
		 * @param common_code - common_code Array
		 * @param type_name - commoncode typeName
		 * @param type_value - commoncode typeValue
		 * @returns {string || undefined}
		 */
		function get_commoncode_by_display_text(common_code, type_name, type_value) {
			var metro_arr = _.where(common_code, {"type_name": type_name, "type_value": type_value}),
							metro_obj;

			metro_obj = metro_arr.length ? metro_arr[0] : {};

			return metro_obj.display_text || "";
		}

		/**
		 * wannago action을 체크하기 위한 함수.
		 * @param action
		 * @returns {boolean}
		 */
		function is_what_action(action) {
			if (action) {
				return action.action_type == 4;
			} else {
				return false;
			}
		}

		/**
		 * wannago action을 체크하기 위한 함수.
		 * @param action
		 * @returns {boolean}
		 */
		function is_not_action_btn(action) {
			if (action) {
				return !(action.action_type == 4);
			} else {
				return false;
			}
		}

		/**
		 * background style을 리턴해주는 메서드.
		 * @param picture_url - background로 지정할 url.
		 * @returns {object}
		 */
		function get_background(picture_url){
			return {
				"background-image": 'url("'+picture_url+'"), url("https://mp-seoul-image-production-s3.mangoplate.com/web/resources/kssf5eveeva_xlmy.jpg")'
			}
		}

		function get_user_background(picture_url){
			return {
				"background-image": 'url("'+picture_url+'"), url("https://mp-seoul-image-production-s3.mangoplate.com/web/resources/jmcmlp180qwkp1jj.png?fit=around|*:*&crop=*:*;*,*&output-format=jpg&output-quality=80")'
			}
		}

		/**
		 * 레이팅을 소숫점이하 1자리로 맞춰주는 메서드.
		 * @param rating - 표시할 레이팅.
		 * @returns {float || ''}
		 */
		function get_rating(rating){
			if(!rating || !parseFloat(rating)){
				return "";
			} else {
				return parseFloat(rating).toFixed(1);
			}
		}

		/**
		 * 날짜를 기준으로 몇일 전인지 리턴해주는 메서드.
		 * @param date - 기준 날짜
		 */
		function from_date(date){
			return $.timeago(date);
		}

		function diff_date_formatting(target_date){
			return window.dateDiffFromNowToString(target_date);
		}

		function get_recommend(action_value){
			return mp20_restaurant_info_service.recommend_list[action_value - 1];
		}

		function get_user_picture(picture_url){
			var user_image = picture_url || this.empty_image;

			return {
				"background-image": "url('" + user_image + "')"
			}
		}

		function get_picture_url(restaurant_info, size){
			var picture_size = size ? mp20_restaurant_info_service.thumb_size[size] : "/";

			return restaurant_info.restaurant.pic_domain + picture_size + restaurant_info.restaurant.pic_key;
		}


		function get_restaurant_meta(restaurant_key){
			var call_url = MP_CONSTANTS.API.API_HOST + "/api/v2/web/restaurants/" + restaurant_key + "/meta.js";

			return mp20_util_service.call_api_promise(call_url, "get");
		}

		/**
		 * 리뷰의 recommend class name을 얻기위한 메서드.
		 * @param action_value - action_value
		 * @returns {string} - recommend class name
		 */
		function get_recommend_class_name(action_value){
			if(action_value < 0){
				return "";
			}

			return mp20_restaurant_info_service.recommend_list[action_value].class_name;
		}

    /**
     * 리뷰의 recommend message를 얻기 위한 메서드.
     * @param action_value - action value
     * @returns {string} - recommend message
     */
    function get_recommend_message(action_value) {
      if (action_value < 0) {
        return "";
      }

      return mp20_restaurant_info_service.recommend_list[action_value].msg;
    }

		return mp20_restaurant_info_service;
	}
})();
(function () {
	mp20_common_code_service.$inject = ["$q", "mp20_util_service", "MP_CONSTANTS"];
	angular.module("mp20App").factory("mp20_common_code_service", mp20_common_code_service);

	function mp20_common_code_service($q, mp20_util_service, MP_CONSTANTS) {
		var mp20_common_code_service = {};

		mp20_common_code_service.common_code = "";
		mp20_common_code_service.option = {
			"api_host": "https://stage.mangoplate.com",
			"call_url": "/api/common/codetable.js"
		};

		mp20_common_code_service.get_common_code = function () {
      if(this.common_code){
        var defer = $q.defer();

        defer.resolve(this.common_code);

        return defer.promise;
      } else {
        var call_url = MP_CONSTANTS.API.API_HOST + this.option.call_url;
        var params = mp20_util_service.make_params();
        var promise = mp20_util_service.call_api_promise(call_url, "GET", params);

        return promise.then(function(common_code){
          var common_code = {
            data: common_code
          };

          mp20_common_code_service.common_code = common_code;
          return common_code;
        });
      }
		};

		return mp20_common_code_service;
	}

})();
(function(){
	mp20_restaurant_http_service.$inject = ["MP_CONSTANTS", "mp20_util_service"];
	angular.module("mp20App").factory("mp20_restaurant_http_service", mp20_restaurant_http_service);

	function mp20_restaurant_http_service(MP_CONSTANTS, mp20_util_service){
		var mp20_restaurant_http_service = {};

		mp20_restaurant_http_service.api = {
			"get_restaurant_info": "/api/v5/restaurants/%restaurant_key%.json",
			"get_pictures": "/api/v1/web/restaurants/%restaurant_key%/pictures.js",
			"get_additional": "/api/v5/restaurants/%restaurant_uuid%/additional.json",
			"get_nearby_popular_restaurants": "/api/v5/restaurants/%restaurant_uuid%/nearby/popular_restaurants/as_top_list_item.json",
			"get_insta_official_picture": "/api/v5/restaurants/%restaurant_uuid%/insta/pictures/official.json",
			"get_insta_tagged_picture": "/api/v5/restaurants/%restaurant_uuid%/insta/pictures/tagged.json",
      "get_menu_picture": "/api/v5/restaurants/%restaurant_uuid%/menu_pictures.json",
		};

		mp20_restaurant_http_service.get_restaurant_info = function(restaurant_key){
			var call_url = MP_CONSTANTS.API.API_HOST + this.api.get_restaurant_info.replace("%restaurant_key%", restaurant_key),
					make_params = mp20_util_service.make_params();

			return mp20_util_service.call_api_promise(call_url, "get", make_params);
		};

		mp20_restaurant_http_service.get_pictures = function(restaurant_key){
			var call_url = MP_CONSTANTS.API.API_HOST + this.api.get_pictures.replace("%restaurant_key%", restaurant_key),
					make_params = mp20_util_service.make_params();

			return mp20_util_service.call_api_promise(call_url, "get", make_params);
		};

		mp20_restaurant_http_service.get_additional = function(restaurant_uuid, fields){
			var call_url = MP_CONSTANTS.API.API_HOST + this.api.get_additional.replace("%restaurant_uuid%", restaurant_uuid),
					params = mp20_util_service.make_params({
						"fields": fields
					});

			return mp20_util_service.call_api_promise(call_url, "get", params);
		};

		mp20_restaurant_http_service.get_nearby_popular_restaurants = function(restaurant_uuid){
			var call_url = MP_CONSTANTS.API.API_HOST + this.api.get_nearby_popular_restaurants.replace("%restaurant_uuid%", restaurant_uuid),
					params = mp20_util_service.make_params({
						"start_index": 0,
						"request_count": 4
					});

			return mp20_util_service.call_api_promise(call_url, "get", params);
		};

		mp20_restaurant_http_service.get_insta_official_picture = function(restaurant_uuid){
			var call_url = MP_CONSTANTS.API.API_HOST + this.api.get_insta_official_picture.replace("%restaurant_uuid%", restaurant_uuid);

			return mp20_util_service.call_api_promise(call_url, "get", {});
		};

		mp20_restaurant_http_service.get_insta_tagged_picture = function(restaurant_uuid){
			var call_url = MP_CONSTANTS.API.API_HOST + this.api.get_insta_tagged_picture.replace("%restaurant_uuid%", restaurant_uuid);

			return mp20_util_service.call_api_promise(call_url, "get", {});
		};

		mp20_restaurant_http_service.get_menu_picture = function(restaurant_uuid){
		  var call_url = MP_CONSTANTS.API.API_HOST + this.api.get_menu_picture.replace("%restaurant_uuid%", restaurant_uuid),
          params = mp20_util_service.make_params();

      return mp20_util_service.call_api_promise(call_url, "get", params);
    };

		return mp20_restaurant_http_service;
	}
})();
(function(){
	mp20_search_http_service.$inject = ["$http", "$q", "mp20_util_service", "MP_CONSTANTS"];
	angular.module("mp20App").factory("mp20_search_http_service", mp20_search_http_service);

	function mp20_search_http_service($http, $q, mp20_util_service, MP_CONSTANTS){
		var mp20_search_http_service = {};

		mp20_search_http_service.options = {
			"api_host": "https://mp-api-search.mangoplate.com",
			"search_by_keyword": "/api/v5/search/by_keyword.json",
			"search_by_keyword_count": "/api/v5/search/by_keyword/count.json",
			"suggest_keyword": "/api/v3/web/search/by_keyword/suggested.js",
			"suggest_keyword_temp": "/api/v3/web/search/by_keyword/suggested/temp.js",
			"recommend_popular_keyword" : "/api/v5/search/keyword/suggestion.json",
			"related_keyword" : "/api/v3/web/search/by_keyword/related_keywords.js",
			"summary_keyword" : "/api/v3/web/search/by_keyword/summary_keywords.js",
			"related_list": "/api/v3/web/search/by_keyword/related_list.js",
			"bounds_search": "/api/v1/web/search/nearby/map/bounds.json",
			"bounds_search_count": "/api/v1/web/search/nearby/map/bounds/count.js",
			"related_contents": "/api/v9/search/related_contents.json"
		};

		mp20_search_http_service.search_by_keyword = search_by_keyword;
		mp20_search_http_service.search_by_keyword_count = search_by_keyword_count;
		mp20_search_http_service.search_suggest_list = search_suggest_list;
		mp20_search_http_service.search_suggest_list_temp = search_suggest_list_temp;
		mp20_search_http_service.recommend_and_popular_keyword = recommend_and_popular_keyword;
		mp20_search_http_service.related_keyword = related_keyword;
		mp20_search_http_service.summary_keyword = summary_keyword;
		mp20_search_http_service.related_list = related_list;
		mp20_search_http_service.bounds_search = bounds_search;
		mp20_search_http_service.bounds_search_count = bounds_search_count;
		mp20_search_http_service.related_contents = related_contents;

		/**
		 * 키워드로 검색하는 메서드.
		 * @param keyword - 검색할 키워드.
		 * @returns {promise} - $q의 Promise 구현체.
		 */
		function search_by_keyword(keyword, params){
      var call_url = MP_CONSTANTS.API.API_HOST + this.options.search_by_keyword;
      params = mp20_util_service.make_params(params);

      return mp20_util_service.call_api_promise(call_url, "post", params);
		}

		/**
		 * 키워드로 검색한 결과의 count를 리턴해주는 메서드..
		 * @param keyword - 검색할 키워드.
		 * @returns {promise} - $q의 Promise 구현체.
		 */
    function search_by_keyword_count(keyword, params) {
      var params = params || {};

      var call_url = this.options.api_host + this.options.search_by_keyword_count;
      var request_params = {
        "keyword": keyword,
        "search_type": getParameter("search_type") || ""
      };

      request_params = $.extend(request_params, params);
      request_params = _.omit(request_params, 'request_count', 'start_index');
      request_params = mp20_util_service.make_params(request_params);

      return mp20_util_service.call_api_promise(call_url, "POST", request_params);
    }

		/**
		 * 입력한 키워드에 대한 suggest keyword를 가져오는 메서드.
		 * @param keyword - 검색 lkeyword
		 * @returns {promise} - suggest keyword가 담긴 promise 객체.
		 */
		function search_suggest_list(keyword, seq){
			var call_url = this.options.api_host + this.options.suggest_keyword;
      var params = mp20_util_service.make_params({
        'keyword': keyword,
        "seq": seq
      });

      return mp20_util_service.call_api_promise(call_url, "get", params);
		}

    /**
     * 추천검색어와 인기검색어를 가져오는 메서드.
     * @returns {promise}
     */
    function recommend_and_popular_keyword() {
      var call_url = this.options.api_host + this.options.recommend_popular_keyword;
      var params = mp20_util_service.make_params(params);

      return mp20_util_service.call_api_promise(call_url, "get", params);
    }

		/**
		 * 검색에 대한 연관 검색어를 가져오는 메서드.
		 * @returns {promise} - 연관 검색어를 가져오는 promise 객체.
		 */
		function related_keyword(params){
			var call_url = MP_CONSTANTS.API.API_HOST + this.options.related_keyword;

			params = mp20_util_service.make_params(params);

			return mp20_util_service.call_api_promise(call_url, "get", params);
		}

		/**
		 * related_list를 가져오는 메서드.
		 * @param keyword - 검색할 키워드
		 * @returns {promise} - related_list를 가져오는 promise 객체.
		 */
		function related_list(keyword){
      var call_url = MP_CONSTANTS.API.API_HOST + this.options.related_list;
      var params = mp20_util_service.make_params({
        "keyword": keyword
      });

      return mp20_util_service.call_api_promise(call_url, "GET", params)
		}

		function search_suggest_list_temp(){

		}

		function bounds_search(params){
			var call_url = MP_CONSTANTS.API.API_HOST + this.options.bounds_search;

			params = mp20_util_service.make_params(params);

			return mp20_util_service.call_api_promise(call_url, "get", params);
		}

		function bounds_search_count(params){
			var call_url = MP_CONSTANTS.API.API_HOST + this.options.bounds_search_count;

			params = mp20_util_service.make_params(params);

			return mp20_util_service.call_api_promise(call_url, "get", params);
		}

		function summary_keyword(params){
			var call_url = MP_CONSTANTS.API.API_HOST + this.options.summary_keyword;

			params = mp20_util_service.make_params(params);

			return mp20_util_service.call_api_promise(call_url, "get", params);
		}

		function related_contents(keyword) {
		  var call_url = MP_CONSTANTS.API.API_HOST + this.options.related_contents;
		  var params = mp20_util_service.make_params({
        keyword: keyword
      });

		  return mp20_util_service.call_api_promise(call_url, "get", params);
    }

		return mp20_search_http_service;
	}
})();
(function(){
	angular.module("mp20App").factory("mp20_search_util_service", mp20_search_util_service);

	function mp20_search_util_service(){
		var mp20_search_util_service = {};


		mp20_search_util_service.get_search_keyword_change_vo = function(keyword, key_code){
			return {
				"keyword": keyword || "",
				"key_code": key_code || ""
			}
		};

		return mp20_search_util_service;
	}
})();
(function(){
    /**
     * UTM 파라미터를 gennerating 해주는 유틸 객체.
     * @namespace utm_manager
     */
    var utm_manager = {

        /**
         * utm을 위한 파라미터를 Generate해주는 메서드.
         * @param platform_name - 공유 혹은 사용하는 source 이름.
         * @param target_url - 해당 파라미터를 붙일 URL
         * @param for_web_param - utm_term, utm_content 같은 web에서만 사용하는 파라미터를 넣어줄때 사용하는 파라미터.
         */
        generate_url: function(platform_name, target_url, for_web_param){
            var utm_obj = this.get_data_form(),
                result,
                utm_param;

            utm_obj.utm_source = platform_name || "organic";
            utm_obj.utm_medium = this.get_medium(target_url);
            utm_obj.utm_campaign = this.get_campaign(target_url);

            if(typeof for_web_param === "object"){
                $.extend(utm_obj, for_web_param);
            }

            utm_param = $.param(utm_obj);

            if(target_url){
                var a_tag = document.createElement("a");
                var pathname;

                a_tag.href = target_url;
                pathname = a_tag.pathname;

                if(pathname[0] !== "/"){
                  pathname = "/" + pathname;
                }

                target_url = a_tag.protocol + "//" + a_tag.host + pathname + "?" + utm_param;
                result = target_url;
                result = this.filter_url(result);
            } else {
                result = utm_param;
            }

            return result;
        },

        /**
         * utm의 기본 객체를 반환하는 메서드.
         * @returns {{utm_source: string, utm_medium: string, utm_campaign: string, utm_term: string, utm_content:
         *     string}}
         */
        get_data_form: function(){
            return {
                "utm_source": "organic",
                "utm_medium": "organic",
                "utm_campaign": "organic",
                "utm_term": "v1",
                "utm_content": "organic"
            }
        },

        /**
         * utm_medium을 리턴하는 메서드.
         * @returns {string}
         */
        get_medium: function(target_url){
            var result;

            if(target_url){
                var a_tag = this.make_a_tag(target_url);

                result = this.get_a_tag_by_segment(a_tag, 0);
            } else {
                result = get_segment(0);
            }

            return result;
        },

        /**
         * utm_campaign을 리턴하는 메서드.
         * @returns {string}
         */
        get_campaign: function(target_url){
            var result;

            if(target_url){
                var a_tag = this.make_a_tag(target_url);

                result = this.get_a_tag_by_segment(a_tag, 1);
            } else {
                result = get_segment(1);
            }

            return result;
        },

        get_utm_param: function(){
            var utm_param = this.get_data_form();

            utm_param.utm_source = getParameter("utm_source");
            utm_param.utm_medium = this.get_medium();
            utm_param.utm_campaign = this.get_campaign();

            return $.param(utm_param);
        },

        make_a_tag: function(url){
            var a_tag = document.createElement("a");
            a_tag.href = url;

            return a_tag;
        },

        get_a_tag_by_segment: function(a_tag, index){
            var pathname = a_tag.pathname,
                pathname_arr = pathname.split("/"),
                segment;

            if(pathname_arr.length > 1){
                pathname_arr = pathname_arr.slice(1, pathname.length);
            }
            if(index || index > -1){
                segment = pathname_arr[index];
            } else {
                segment = pathname_arr;
            }

            return segment;
        },
        
        el_by_for_web_param: function($el){
            return {
                "utm_term": $el.data("term") || "organic",
                "utm_content": $el.data("content") || "organic"
            }
        },

        filter_url: function(url){
            if(url.indexOf("ad-min.mangoplate.com") > -1 || url.indexOf("admin.mangoplate.com") > -1){
                url = removeURLParameter(url, "utm_referrer");
                url = removeURLParameter(url, "referrer");
            }

            return url;
        }
    };
    //
    //utm_manager.platform = {};
    //
    //utm_manager.platform['KAKAO'] = function(){
    //
    //};
    //
    //utm_manager.platform['FACEBOOK'] = function(){
    //
    //};
    //
    //utm_manager.platform['TWITTER'] = function(){
    //
    //};
    //
    //utm_manager.platform['BAND'] = function(){
    //
    //};
    //
    //utm_manager.platform['MAIL'] = function(){
    //
    //};

    /**
     * 전역 네임스페이스에 바인딩.
     */
    if (window.mp20){
        window.mp20.utm_manager = utm_manager;
    } else {
        window.mp20 = {};
        window.mp20.utm_manager = utm_manager;
    }
})();
(function(){
	/**
	 * push_status_server 네임스페이스.
	 * @namespace push_status_server
	 */
	var push_status_server = {},
					OPEN_TYPE = "OPEN",
					CLOSE_TYPE = "CLOSE";

	/**
	 * 이벤트 리스트가 담기는 객체 리터럴
	 * @type {object}
	 */
	push_status_server.events = {};
	push_status_server.current_name = [];

	/**
	 * popstate 이벤트를 받아주는 메서드.
	 */
	push_status_server.init = function(){

		$(window).on('popstate', function(event){
			var last_layer_name = push_status_server.current_name.splice(push_status_server.current_name.length - 1, 1);

			var close_action = this.make_close_action(last_layer_name.toString());
			this.trigger_event(close_action);
//			var state = event.originalEvent.state;

//			if(state === null){
//				window.history.back();
//			} else {
//				console.dir(state);
//			}
		}.bind(this));
	};

	/**
	 * 이벤트를 등록하는 메서드.
	 * @param name - 이벤트 이름.
	 * @param openCallback - Open시 발생할 Callback 함수.
	 * @param closeCallback - Close시 발생시킬 Callback 함수.
	 */
	push_status_server.add_event = function(name, openCallback, closeCallback){
		this.events[name] = {
			"event_name": name,
			"openCallback": openCallback,
			"closeCallback": closeCallback
		};
	};

	/**
	 * action을 전달받아서 Type에 맞는 메서드를 실행해주는 메서드.
	 * @param action - 이벤트 Action
	 */
	push_status_server.trigger_event = function(action, params){
		var target_event = this.events[action.event_name];

		if (target_event){
			switch (action.type){
				case OPEN_TYPE:
					this.trigger_open(target_event, params);
					break;
				case CLOSE_TYPE:
					this.trigger_close(target_event, params);
					break;
			}
		}
	};

	/**
	 * 레이어 Open시 실행하는 메서드.
	 * @param target_event - 이벤트 Target Object.
	 */
	push_status_server.trigger_open = function(target_event, params){
		var new_url;
		target_event.openCallback.apply(null, params);

		new_url =  window.location.protocol + "//" + window.location.host + window.location.pathname + "#open";
		push_status_server.current_name.push(target_event.event_name);
		history.pushState(this.make_open_action(target_event.event_name), null, new_url);
	};

	/**
	 * 레이어 Close시 발생하는 메서드.
	 * @param target_event - 이벤트 Target Object.
	 */
	push_status_server.trigger_close = function(target_event, params){
		target_event.closeCallback.apply(null, params);
	};

	/**
	 * Open, Close 규약을 위해 action을 만들어주는 메서드.
	 * @param event_name - 이벤트 이름.
	 * @param type - 이벤트 타입.
	 * @returns {{type: string, event_name: string}}
	 */
	push_status_server.make_action = function(event_name, type){
		return {
			"type": type,
			"event_name": event_name
		}
	};

	/**
	 * Open시 전달할 action을 만들어주는 메서드.
	 * @param event_name - 이벤트 이름.
	 * @returns {{type, event_name} | {type: string, event_name: string}}
	 */
	push_status_server.make_open_action = function(event_name){
		var type = "OPEN";

		return this.make_action(event_name, type);
	};

	/**
	 * Close시 전달할 action을 만들어주는 메서드.
	 * @param event_name - 이벤트이름
	 * @returns {{type, event_name} | {type: string, event_name: string}}
	 */
	push_status_server.make_close_action = function(event_name){
		var type = "CLOSE";

		return this.make_action(event_name, type);
	};

	push_status_server.init();

	/**
	 * 전역객체에 바인딩.
	 */
	if (window.mp20){
		window.mp20.push_status_server = push_status_server;
	} else {
		window.mp20 = {};
		window.mp20.push_status_server = push_status_server;
	}
})();
(function(){
	/**
	 * 네임스페이스
	 * @namespace band
	 */
	var band = {};

	/**
	 * band share 정보.
	 * @type {{method: string, param: string, a_store: string, g_store: string, a_proto: string, g_proto: string}}
	 */
	band.info = {
		method:'web2app',
		param:'create/post?text=',
		a_store:'itms-apps://itunes.apple.com/app/id542613198',
		g_store:'market://details?id=com.nhn.android.band',
		a_proto:'bandapp://',
		g_proto:'scheme=bandapp;package=com.nhn.android.band'
	};

	/**
	 * 밴드 공유 버튼 클레스.
	 * @type {string}
	 */
	band.class_name = ".band_share_btn";

	/**
	 * 밴드 공유를 위한 파라미터를 만들어서 share를 실행 해주는 메서드.
	 * @param message - 공유 메시지
	 * @param url - 공유 URL
	 */
	band.share = function(message, url, el_by_for_web_param){
		var platform_name = "BAND";

		if(!is_mobile_device()){
			alert("해당 기능은 망고플레이트 앱에서 사용하실 수 있습니다.");
			return false;
		}

		url = mp20.utm_manager.generate_url(platform_name, url, el_by_for_web_param);

		var lanunch_info = _.clone(band.info);
		lanunch_info.param += message + encodeURIComponent('\r\n') + encodeURIComponent(url);

		band.launch(lanunch_info);
	};

	/**
	 * 밴드 공유를 위해 앱을 런치하는 메서드.
	 * @param lanunch_info - 공유를 위해 앱을 런치할 정보를 담은 Object
	 */
	band.launch = function(lanunch_info){
		if(navigator.userAgent.match(/android/i)){
			// Android
			setTimeout(function(){ location.href = 'intent://' + lanunch_info.param + '#Intent;' + lanunch_info.g_proto + ';end'}, 100);
		} else if (navigator.userAgent.match(/(iphone)|(ipod)|(ipad)/i)){
			// Apple

			if(!check_safari()){
				setTimeout(function(){ location.href = lanunch_info.a_store; }, 200);
			}
			
			setTimeout(function(){ location.href = lanunch_info.a_proto + lanunch_info.param }, 100);
		}
	};

	/**
	 * 밴드 공유 버튼에 이벤트 바인딩
	 */
	$(document).on("click", band.class_name, function(e){
		var $band_share_btn = $(e.currentTarget),
				message = $band_share_btn.data("message") || "",
				is_not_script = $band_share_btn.data("not_script"),
				url = $band_share_btn.data("url") || window.location.href,
				el_by_for_web_param = mp20.utm_manager.el_by_for_web_param($band_share_btn);

		if(!is_not_script){
			band.share(message, url, el_by_for_web_param);
		}
	});

	/**
	 * 전역 네임스페이스에 바인딩.
	 */
	if(window.mp20){
		if(window.mp20.sns_share){
			window.mp20.sns_share.band = band;
		} else {
			window.mp20.sns_share = {};
			window.mp20.sns_share.band = band;
		}
	} else {
		window.mp20 = {};
		window.mp20.sns_share = {};
		window.mp20.sns_share.band = band;
	}
})();
(function(){
	/**
	 * 네임스페이스
	 * @namespace
	 */
	var mail = {};

	/**
	 * 메일 공유 버튼 클레스 이름
	 * @type {string}
	 */
	mail.class_name = ".mail_share_btn";

	/**
	 * 메일 공유 base 주소
	 * @type {string}
	 */
	mail.mailto_base = "mailto:?";

	/**
	 * 메일로 공유 해주는 메서드.
	 * @param title - 공유할 메일 제목
	 * @param message - 공유할 메일 내용
	 * @param url - 공유할 URL
	 */
	mail.share = function(title, message, url, el_by_for_web_param){
		var platform_name = "MAIL";

		window.location.href = this.mailto_base + "subject=" + encodeURIComponent(title) + "&body=" + encodeURIComponent(message) + "%0D%0A" + encodeURIComponent(mp20.utm_manager.generate_url(platform_name, url, el_by_for_web_param));
	};

	/**
	 * 메일 공유 버튼에 이벤트 바인딩.
	 */
	$(document).on("click", mail.class_name, function(e){
		var $mail_share_btn = $(e.currentTarget),
				title = $mail_share_btn.data("title"),
				message = $mail_share_btn.data("message"),
				url = $mail_share_btn.data("url") ||   window.location.href,
				el_by_for_web_param = mp20.utm_manager.el_by_for_web_param($mail_share_btn);

		mail.share(title, message, url, el_by_for_web_param);
	});

	/**
	 * 전역 네임스페이스에 바인딩.
	 */
	if(window.mp20){
		if(window.mp20.sns_share){
			window.mp20.sns_share.mail = mail;
		} else {
			window.mp20.sns_share = {};
			window.mp20.sns_share.mail = mail;
		}
	} else {
		window.mp20 = {};
		window.mp20.sns_share = {};
		window.mp20.sns_share.mail = mail;
	}
})();
(function(){
	/**
	 * 네임스페이스
	 * @namespace facebook
	 */
	var facebook = {};

	/**
	 * String Attribute
	 * @type {{url: string}}
	 */
	facebook.attr = {
		"url": "url"
	};

	/**
	 * facebook share button Class
	 * @type {string}
	 */
	facebook.class_name = ".facebook_share_btn";

	/**
	 * facebook share base URL
	 * @type {string}
	 */
	facebook.url = "http://www.facebook.com/sharer/sharer.php?u=";

	/**
	 * 페이스북 공유를 위해 공유 창을 띄우는 메서드.
	 * @param share_url - 창을 띄울 페이스북 공유 URL.
	 */
	facebook.share = function(share_url){
		window.open(share_url);
	};

	/**
	 * 페이스북 공유 버튼에 이벤트 바인딩.
	 */
	$(document).on("click", facebook.class_name, function(e){
		var $facebook_share_btn = $(e.currentTarget),
				url = $facebook_share_btn.data(facebook.attr.url) || window.location.href,
				platform_name = "FACEBOOK",
				share_url = facebook.url + mp20.utm_manager.generate_url(platform_name, url, mp20.utm_manager.el_by_for_web_param($facebook_share_btn));

		facebook.share(share_url);
	});

	/**
	 * 전역 네임스페이스에 바인딩.
	 */
	if(window.mp20){
		if(window.mp20.sns_share){
			window.mp20.sns_share.facebook = facebook;
		} else {
			window.mp20.sns_share = {};
			window.mp20.sns_share.facebook = facebook;
		}
	} else {
		window.mp20 = {};
		window.mp20.sns_share = {};
		window.mp20.sns_share.facebook = facebook;
	}
})();
(function(){
	/**
	 * 네임스페이스
	 * @namespace twitter
	 */
	var twitter = {};

	/**
	 * String Attribute
	 * @type {{url: string}}
	 */
	twitter.attr = {
		"url": "url",
		"message": "message",
		"replace_message": '%message%',
		"replace_url": "%url%"
	};

	/**
	 * twitter share button Class
	 * @type {string}
	 */
	twitter.class_name = ".twitter_share_btn";

	/**
	 * twitter share base URL
	 * @type {string}
	 */
	twitter.url = "https://twitter.com/intent/tweet?text=" + twitter.attr.replace_message + "&url=" + twitter.attr.replace_url;

	/**
	 * 트위터 공유를 위해 공유 창을 띄우는 메서드.
	 * @param share_url - 창을 띄울 페이스북 공유 URL.
	 */
	twitter.share = function(message, share_url, for_web_data){
		var platform_name = "TWITTER";

		share_url = mp20.utm_manager.generate_url(platform_name, share_url, for_web_data);

		message = encodeURIComponent(message) || "";

		share_url = encodeURIComponent(share_url) || "";

		share_url = twitter.url.replace(this.attr.replace_message, message).replace(this.attr.replace_url, share_url);
		window.open(share_url);
	};

	/**
	 * 트위터 공유 버튼에 이벤트 바인딩.
	 */
	$(document).on("click", twitter.class_name, function(e){
		var $twitter_share_btn = $(e.currentTarget),
				url = $twitter_share_btn.data(twitter.attr.url) || window.location.href,
				message = $twitter_share_btn.data(twitter.attr.message),
				for_web_data = window.mp20.utm_manager.el_by_for_web_param($twitter_share_btn);

		twitter.share(message, url, for_web_data);
	});

	/**
	 * 전역 네임스페이스에 바인딩.
	 */
	if (window.mp20){
		if (window.mp20.sns_share){
			window.mp20.sns_share.facebook = twitter;
		} else {
			window.mp20.sns_share = {};
			window.mp20.sns_share.facebook = twitter;
		}
	} else {
		window.mp20 = {};
		window.mp20.sns_share = {};
		window.mp20.sns_share.facebook = twitter;
	}
})();
(function () {
  /**
   * kakao SDK Init
   */
//	Kakao.init("c7a58d638097e8cc349f7700b267b64f");

  /**
   * 네임스페이스
   * @namespace kakao
   */
  var kakao = {};

  /**
   * kakaotalk share button class
   * @type {string}
   */
  kakao.class_name = ".kakaotalk_share_btn";

  /**
   * 사진이 없거나 크기가 클 경우 사용할 이미지.
   * @type {string[]}
   */
  kakao.empty_image = [
    "https://mp-seoul-image-production-s3.mangoplate.com/web/resources/ou_pzrjjkiovam6z.jpg",
    "https://d1jrqqyoo3n46w.cloudfront.net/web/resources/ghbqfvg-0zz2jr4n.jpg",
    "https://d1jrqqyoo3n46w.cloudfront.net/web/resources/rnv04dw2u3h6gxmb.jpg"
  ];

  /**
   * kakao share button image info
   * @type {{width: string, height: string}}
   */
  kakao.image = {
    "width": "300",
    "height": "200"
  };

  /**
   * kakao share button info
   * @type {{text: string}}
   */
  kakao.button = {
    "text": "웹에서 보기"
  };

  kakao.akamai_subfix = "fit=around|300:200&crop=600:400;*,*&output-format=jpg&output-quality=80";

  /**
   * 카카오톡 share 하기.
   * @param message - 공유 버튼에 나올 message
   * @param image - 공유 버튼에 나올 이미지
   * @param url - 공유 버튼 누를때 갈 Web URL
   */
  kakao.share = function (message, image, url, el_by_for_web_param, button_name) {
    var platform_name = "KAKAO";
    var share_url = mp20.utm_manager.generate_url(platform_name, url, el_by_for_web_param);
    var linkVO = new window.mp20.vo.KakaoTalkLinkVO(share_url, share_url);
    var contentVO = new window.mp20.vo.KakaoTalkContentVO(message.slice(0, 100), image, linkVO);
    var buttonVO = new window.mp20.vo.KakaoTalkButtonVO(button_name, linkVO);
    
    window.mp20.service.KakaoTalkShare.shareFeedMessage(contentVO, null, [buttonVO]); 
  };

  /**
   * 이미지를 akamai로 리사이징 해주는 메서드.
   * @param image - 이미지 URL.
   * @returns {string} - akamia로 리사이징한 이미지.
   */
  kakao.image_resize_by_akamai = function (image) {
    var query_string_divier;

    if (image.indexOf("?") > -1) {
      query_string_divier = "&";
    } else {
      query_string_divier = "?";
    }

    return image + query_string_divier + this.akamai_subfix;
  };

  /**
   * 카카오톡 공유 버튼 이벤트 바인딩.
   */
  $(document).on("click", kakao.class_name, function (e) {
    var $kakao_share_btn = $(e.currentTarget);
    var is_not_script = $kakao_share_btn.data("not_script");

    if (is_not_script) {
      return;
    }

    var message = $kakao_share_btn.data("message");
    var image = $kakao_share_btn.data("image");
    var button_name = $kakao_share_btn.data("button_name");
    var url = $kakao_share_btn.data("url") || window.location.href;
    var el_by_for_web_param = mp20.utm_manager.el_by_for_web_param($kakao_share_btn);

    kakao.share(message, image, url, el_by_for_web_param, button_name);
  });

  /**
   * 전역 네임스페이스에 바인딩.
   */
  if (window.mp20) {
    if (window.mp20.sns_share) {
      window.mp20.sns_share.kakao = kakao;
    } else {
      window.mp20.sns_share = {};
      window.mp20.sns_share.kakao = kakao;
    }
  } else {
    window.mp20 = {};
    window.mp20.sns_share = {};
    window.mp20.sns_share.kakao = kakao;
  }
})();
(function(){
	/**
	 * 네임스페이스
	 * @namespace layer
	 */
	var layer = {},
			page_name = "PU_SHARE";

	/**
	 * 공유 layer 클레스 string.
	 * @type {string}
	 */
	layer.layer_class = ".mp20_share_layer";

	/**
	 * layer wrap
	 * @type {jQuery|HTMLElement}
	 */
	layer.$el = $(layer.layer_class);

	/**
	 * share button의 class name
	 * @type {{kakaotalk: string, facebook: string, band: string, mail: string, twitter: string}}
	 */
	layer.btn_class = {
		"kakaotalk": ".kakaotalk_share_btn",
		"facebook": ".facebook_share_btn",
		"band": ".band_share_btn",
		"mail": ".mail_share_btn",
		"twitter": ".twitter_share_btn"
	};

	/**
	 * 내부에서 사용할 고정 string
	 * @type {{hide_class: string, show_class: string}}
	 */
	layer.attr = {
		"hide_class": "hide",
		"show_class": "show"
	};

	/**
	 * share_info에서 필수로 있어야 하는 key 리스트.
	 * @type {string[]}
	 */
	layer.data_list = ["message", "image", "url", "title"];

	layer.open = function(share_info){
		window.mp20.push_status_server.trigger_event(window.mp20.push_status_server.make_open_action("restaurant_together_share"), [share_info]);
	};

	/**
	 * share layer를 열어주는 메서드.
	 * share layer가 있는지 먼저 체크 후 없다면 다시 select해주고 다시 없다면 console에 오류를 표출하고 작동 중지.
	 * share_info에 필수 key가 있는지 검증 후 모두 있다면 share_info를 button에 bind해주고 open 시켜줌.
	 * @param share_info {object} - 공유할 정보가 담긴 object
	 */
	layer.open_logic = function(share_info){
		if(!layer.$el.length){
			layer.$el = $(layer.layer_class);

			if(!layer.$el.length){
				console.error("share layer가 없습니다.");
				return false;
			}
		}

		common_ga_page(page_name);
		layer.find_share_btn();
		layer.bind_event();

		var share_info_validate = layer.share_info_validation(share_info);

		if(share_info_validate){
			layer.bind_info(share_info);
			layer.$el.removeClass(layer.attr.hide_class);
		} else {
			console.error("share info를 확인해주세요.");
		}
	};


	layer.close = function(){
		window.mp20.push_status_server.trigger_event(window.mp20.push_status_server.make_close_action("restaurant_together_share"), []);
	};

	/**
	 * share_layer를 닫아주는 메서드.
	 */
	layer.close_logic = function(){
		common_ga(page_name, "CLICK_CLOSE_SHARE_POPUP");
		layer.$el.addClass(layer.attr.hide_class);
		layer.unbind_event();
		unscroll_lock();
	};

	/**
	 * share info를 share button에 바인딩 해주는 메서드.
	 * @param share_info {object} - 공유할 정보가 담긴 object
	 */
	layer.bind_info = function(share_info){
		var $share_btns = _.values(this.share_btn);

		_.each($share_btns, function($share_btn){
			this.bind_info_el(share_info, $share_btn);
		}.bind(this));
	};

	/**
	 * share_info를 버튼마다 바인딩해주는 메서드.
	 * @param share_info {object} - 공유할 정보가 담긴 object
	 * @param $share_btn {jQuery} - 정보를 바인딩할 elements
	 */
	layer.bind_info_el = function(share_info, $share_btn){
		_.each(this.data_list, function(data_name){
			$share_btn.data(data_name, share_info[data_name]);
		})
	};

	/**
	 * share_info에 필수 key들이 있는지 검증하는 메서드.
	 * @param share_info - 공유할 정보가 담긴 object
	 * @returns {boolean} - true : 검증 완료, false: 필수 key가 없는 info
	 */
	layer.share_info_validation = function(share_info){
		var validate = true;

		_.each(this.data_list, function(data_name){
			if(!share_info[data_name]){
				validate = false;
			}
		});

		return validate;
	};

	/**
	 * share button selecting 메서드.
	 */
	layer.find_share_btn = function(){
		/**
		 * share layer안에 있는 공유 버튼 리스트.
		 * @type {{$facebook: jQuery, $kakao_talk: jQuery, $band: jQuery, $mail: jQuery, $twitter: jQuery}}
		 */
		this.share_btn = {
			"$facebook": this.$el.find(this.btn_class.facebook),
			"$kakao_talk": this.$el.find(this.btn_class.kakaotalk),
			"$band": this.$el.find(this.btn_class.band),
			"$mail": this.$el.find(this.btn_class.mail),
			"$twitter": this.$el.find(this.btn_class.twitter)
		};
	};

	/**
	 * layer에 이벤트를 정해주는 메서드.
	 */
	layer.bind_event = function(){
		this.$el.bind("click", function(e){
			if($(e.target).hasClass(this.layer_class.replace(".", ""))){
				this.close();
			}
		}.bind(this));
	};

	/**
	* layer에 binding된 이벤트를 unbind해주는 메서드.
	*/
	layer.unbind_event = function(){
		this.$el.unbind("click");
	};

	window.mp20.push_status_server.add_event("restaurant_together_share", layer.open_logic, layer.close_logic);

	/**
	 * 전역 네임스페이스에 바인딩.
	 */
	if(window.mp20){
		if(window.mp20.sns_share){
			window.mp20.sns_share.layer = layer;
		} else {
			window.mp20.sns_share = {};
			window.mp20.sns_share.layer = layer;
		}
	} else {
		window.mp20 = {};
		window.mp20.sns_share = {};
		window.mp20.sns_share.layer = layer;
	}
})();







/*
 AngularJS v1.5.3
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/

(function(A,e,B){'use strict';function C(a){var c=[];v(c,e.noop).chars(a);return c.join("")}function h(a,c){var b={},d=a.split(","),l;for(l=0;l<d.length;l++)b[c?e.lowercase(d[l]):d[l]]=!0;return b}function D(a,c){null===a||a===B?a="":"string"!==typeof a&&(a=""+a);g.innerHTML=a;var b=5;do{if(0===b)throw w("uinput");b--;11>=document.documentMode&&n(g);a=g.innerHTML;g.innerHTML=a}while(a!==g.innerHTML);for(b=g.firstChild;b;){switch(b.nodeType){case 1:c.start(b.nodeName.toLowerCase(),E(b.attributes));
break;case 3:c.chars(b.textContent)}var d;if(!(d=b.firstChild)&&(1==b.nodeType&&c.end(b.nodeName.toLowerCase()),d=b.nextSibling,!d))for(;null==d;){b=b.parentNode;if(b===g)break;d=b.nextSibling;1==b.nodeType&&c.end(b.nodeName.toLowerCase())}b=d}for(;b=g.firstChild;)g.removeChild(b)}function E(a){for(var c={},b=0,d=a.length;b<d;b++){var l=a[b];c[l.name]=l.value}return c}function x(a){return a.replace(/&/g,"&amp;").replace(F,function(a){var b=a.charCodeAt(0);a=a.charCodeAt(1);return"&#"+(1024*(b-55296)+
(a-56320)+65536)+";"}).replace(G,function(a){return"&#"+a.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function v(a,c){var b=!1,d=e.bind(a,a.push);return{start:function(a,f){a=e.lowercase(a);!b&&H[a]&&(b=a);b||!0!==t[a]||(d("<"),d(a),e.forEach(f,function(b,f){var g=e.lowercase(f),h="img"===a&&"src"===g||"background"===g;!0!==I[g]||!0===y[g]&&!c(b,h)||(d(" "),d(f),d('="'),d(x(b)),d('"'))}),d(">"))},end:function(a){a=e.lowercase(a);b||!0!==t[a]||!0===z[a]||(d("</"),d(a),d(">"));a==
b&&(b=!1)},chars:function(a){b||d(x(a))}}}function n(a){if(a.nodeType===Node.ELEMENT_NODE)for(var c=a.attributes,b=0,d=c.length;b<d;b++){var e=c[b],f=e.name.toLowerCase();if("xmlns:ns1"===f||0===f.indexOf("ns1:"))a.removeAttributeNode(e),b--,d--}(c=a.firstChild)&&n(c);(c=a.nextSibling)&&n(c)}var w=e.$$minErr("$sanitize"),F=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,G=/([^\#-~ |!])/g,z=h("area,br,col,hr,img,wbr"),q=h("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),k=h("rp,rt"),u=e.extend({},k,q),q=e.extend({},
q,h("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul")),k=e.extend({},k,h("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),J=h("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan"),
H=h("script,style"),t=e.extend({},z,q,k,u),y=h("background,cite,href,longdesc,src,xlink:href"),u=h("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),k=h("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan",
!0),I=e.extend({},y,k,u),g;(function(a){if(a.document&&a.document.implementation)a=a.document.implementation.createHTMLDocument("inert");else throw w("noinert");var c=(a.documentElement||a.getDocumentElement()).getElementsByTagName("body");1===c.length?g=c[0]:(c=a.createElement("html"),g=a.createElement("body"),c.appendChild(g),a.appendChild(c))})(A);e.module("ngSanitize",[]).provider("$sanitize",function(){var a=!1;this.$get=["$$sanitizeUri",function(c){a&&e.extend(t,J);return function(a){var d=
[];D(a,v(d,function(a,b){return!/^unsafe:/.test(c(a,b))}));return d.join("")}}];this.enableSvg=function(c){return e.isDefined(c)?(a=c,this):a}});e.module("ngSanitize").filter("linky",["$sanitize",function(a){var c=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,b=/^mailto:/i,d=e.$$minErr("linky"),g=e.isString;return function(f,h,m){function k(a){a&&p.push(C(a))}function q(a,b){var c;p.push("<a ");e.isFunction(m)&&(m=m(a));if(e.isObject(m))for(c in m)p.push(c+
'="'+m[c]+'" ');else m={};!e.isDefined(h)||"target"in m||p.push('target="',h,'" ');p.push('href="',a.replace(/"/g,"&quot;"),'">');k(b);p.push("</a>")}if(null==f||""===f)return f;if(!g(f))throw d("notstring",f);for(var r=f,p=[],s,n;f=r.match(c);)s=f[0],f[2]||f[4]||(s=(f[3]?"http://":"mailto:")+s),n=f.index,k(r.substr(0,n)),q(s,f[0].replace(b,"")),r=r.substring(n+f[0].length);k(r);return a(p.join(""))}}])})(window,window.angular);
//# sourceMappingURL=angular-sanitize.min.js.map
;
(function(){
	/**
	 * Branch.Io 네임스페이스.
	 * @namespace
	 */
	var branch_io_service = {},
					branch;

	branch_io_service.PAGE_KEY = {
		"TOP_LIST": "TOP_LIST",
		"RESTAURANT": "RESTAURANT",
		"MANGO_POST": "POST",
    "EMAIL_VERIFICATION": "EMAIL_VERIFICATION",
    "PURCHASED_EAT_DEAL": "eat_deal_purchase",
    "RESERVATION_RESTAURANTS": "reservations",
    "RESERVATION_RESTAURANT": "reservation",
    "MY_RESERVATIONS": "my_reservations",
    "MY_RESERVATION": "my_reservation",
    "REVIEW_WRITING": "REVIEW_WRITING",
    "EAT_DEAL": "eat_deal"
	};

	branch_io_service.page_data = {};

	branch_io_service.set_page_data = {};

	/**
	 * 세팅 정보.
	 * @type {{branch_key: string, user_data: string}}
	 */
	branch_io_service.config = {
		"branch_key": "key_live_beeMcFpDWQgi7SKuIfO8hbmnvyac1zPZ",
		"IOS_url": "https://itunes.apple.com/kr/app/id628509224",
		"Android_url": "https://play.google.com/store/apps/details?id=com.mangoplate",
		"user_data": {}
	};

	/**
	 * 초기화 여부.
	 * @type {boolean}
	 */
	branch_io_service.is_init = false;

	/**
	 * 초기화 메서드.
	 * @returns {{object}}
	 */
	branch_io_service.init = function(page_key, page_data){
		if (this.is_init || !window.branch){
			return false;
		} else {
			branch = window.branch;
		}

		this.init_page_data_function();
		this.set_page_mapping_data(page_key, page_data);

		return branch.init(this.config.branch_key, {}, function(err, data){
			if (err){
				console.error(err);
				return;
			}

			this.config.user_data = data;
			this.is_init = true;
		}.bind(this));
	};

	/**
	 * 각 페이지 Mapping되는 DataSet을 만들어주는 메서드.
	 * @returns {object} - 해당 페이지에 Mapping되는 데이터.
	 */
	branch_io_service.set_page_mapping_data = function(page_key, page_data){
		var page_data_function = this["set_page_data"][page_key];

		if(typeof page_data_function === "function"){
			this.page_data = page_data_function(page_data);
		}
	};

  branch_io_service.make_data = function(destinationData, utm_url){
    var og_data = {
      "$desktop_url": window.location.href
    };

    var page_data = _.extend({}, destinationData, this.get_install_referrer(utm_url));
    return _.assign(og_data, page_data, {$deeplink_path: '', $android_deeplink_path: '', $ios_deeplink_path: ''});
  };

  branch_io_service.make_branch_link = function(data, callback){
    callback = callback || function(err, link){
      if (err){
        console.error(err);
        return false;
      }

      window.location.href = link;
    };

    branch.link({
      tags: [],
      channel: 'mp_web',
      feature: 'web_to_app_conversion',
      data: data
    }, callback);
  };

	/**
	 * DeepLink를 만들어서 반환하는 메서드.
	 */
  branch_io_service.make_link = function(utm_url){
    if(_isAndroid() && getParameter('utm_source') === 'pikicast') {
      window.location.href = 'https://play.google.com/store/apps/details?id=com.mangoplate'

      return new Promise();
    }

		return new Promise(function(resolve, reject){
		  var branch_data = this.make_data(this.page_data, utm_url);

		  this.make_branch_link(branch_data, function(err, link){
        if (err){
          console.error(err);
          reject(resolve);
          return false;
        }

        window.location.href = link;
      });
		}.bind(this));
	};

	branch_io_service.get_install_referrer = function(utm_install_referrer){
		return {
			"install_referrer": utm_install_referrer
		}
	};

	branch_io_service.init_page_data_function = function(){
		var this_set_page_data = this["set_page_data"];

		this_set_page_data[this.PAGE_KEY.TOP_LIST] = function(data){
			return {
				"destination": branch_io_service.PAGE_KEY.TOP_LIST,
				"extra": data
			};
		};

		this_set_page_data[this.PAGE_KEY.MANGO_POST] = function(data){
			return {
				"destination": branch_io_service.PAGE_KEY.MANGO_POST,
				"extra": data
			}
		};

		this_set_page_data[this.PAGE_KEY.RESTAURANT] = function(data){
			return {
				"destination": branch_io_service.PAGE_KEY.RESTAURANT,
				"extra": data
			}
		}

		this_set_page_data[this.PAGE_KEY.EMAIL_VERIFICATION] = function(data) {
		  return {
		    "destination": "signup/email_verification",
        "extra": data
      }
    }

    this_set_page_data[this.PAGE_KEY.PURCHASED_EAT_DEAL] = function (data) {
		  return {
        "destination": "eat_deal_purchase",
        "extra": data
      }
    }

    this_set_page_data[this.PAGE_KEY.RESERVATION_RESTAURANTS] = function (data) {
		  return {
        "destination": "reservations",
        "extra": data
      }
    }

    this_set_page_data[this.PAGE_KEY.RESERVATION_RESTAURANT] = function (data) {
      return {
        "destination": "reservation",
        "extra": data
      }
    }

    this_set_page_data[this.PAGE_KEY.MY_RESERVATION] = function (data) {
      return {
        "destination": "my_reservation",
        "extra": data
      }
    }

    this_set_page_data[this.PAGE_KEY.MY_RESERVATIONS] = function (data) {
      return {
        "destination": "my_reservations",
        "extra": data
      }
    }

    this_set_page_data[this.PAGE_KEY.REVIEW_WRITING] = function (data) {
      return {
        "destination": branch_io_service.PAGE_KEY.RESTAURANT,
        "extra": data
      }
    }

    this_set_page_data[this.PAGE_KEY.EAT_DEAL] = function (data) {
      return {
        "destination": branch_io_service.PAGE_KEY.EAT_DEAL,
        "extra": data
      }
    }
	};

	/**
	 * 전역 네임스페이스에 바인딩.
	 */
	if (window.mp20){
		window.mp20.branch_io_service = branch_io_service;
	} else {
		window.mp20 = {};
		window.mp20.branch_io_service = branch_io_service;
	}
})();
(function () {
  var bottom_sns_share_service = {
    hide_class: "down",

    init: function () {
      this.select_dom();
      this.toggle_btn_event_bind();
      this.scroll_event_bind();
    },

    select_dom: function () {
      this.$bottom_sns_share = $(".share-sns-another");
      this.$etc_btn = this.$bottom_sns_share.find(".etc-btn");
    },

    toggle_btn_event_bind: function () {
      this.$etc_btn.on("click", function () {
        var on_class = "slide";
        //$share_list = $bottom_sns_share.find(".share-list");

        common_ga(get_now_page_code(), "CLICK_SHARE_TOGGLE");

        if (this.$bottom_sns_share.hasClass(on_class)) {
          this.$bottom_sns_share.removeClass(on_class);
        } else {
          this.$bottom_sns_share.addClass(on_class);
        }
      }.bind(this));
    },

    scroll_event_bind: function () {
      var fade_speed = "fast";

      (function () {
        var prev_scroll = 0;
        var bottom_sns_share_height = this.$bottom_sns_share.outerHeight()

        var throttle = _.throttle(function (event) {
          var now_scroll = $(window).scrollTop();
          var last_scroll_position = $(document).outerHeight() - bottom_sns_share_height

          if (now_scroll < 30) {
            this.$bottom_sns_share.removeClass(this.hide_class);
            return false;
          }

          // 최대 스크롤 위치 여부
          if (now_scroll + window.innerHeight > last_scroll_position) {
            this.$bottom_sns_share.addClass(this.hide_class);
            return false;
          }

          if (prev_scroll > now_scroll || prev_scroll == now_scroll) {
            //Scroll Up
            this.$bottom_sns_share.removeClass(this.hide_class);
          } else if (prev_scroll < now_scroll) {
            //Scroll Down
            this.$bottom_sns_share.addClass(this.hide_class);
          }

          prev_scroll = now_scroll;
        }.bind(this), 200);

        $(window).scroll(throttle);
      }.bind(this))();
    }
  };

  /**
   * 전역객체에 바인딩.
   */
  if (window.mp20) {
    window.mp20.bottom_sns_share_service = bottom_sns_share_service;
  } else {
    window.mp20 = {};
    window.mp20.bottom_sns_share_service = bottom_sns_share_service;
  }

})();
(function(){
	var wannago_sign_popup = {};

	wannago_sign_popup.now_tab = "signin";
	wannago_sign_popup.select_tab_class = "selected";
	wannago_sign_popup.open_class = "on";
	wannago_sign_popup.popup_name = "PU_WANNAGO_LOGIN";

	wannago_sign_popup.tab_code = {
		"signin": "signin",
		"signup": "signup"
	};

	wannago_sign_popup.dom = {
		"popup": ".wannago_login_popup",
		"popup_main_image": ".wannago_login_popup_main_img",
		"popup_msg": ".wannago_login_popup_msg",
		"tabs": ".wannago_login_popup_main_tab .tab",
		"signin_tab": ".wannago_login_popup_signin",
		"signup_tab": ".wannago_login_popup_signup",
		"facebook_text": ".wannago_login_popup_facebook_text",
		"kakao_text": ".wannago_login_popup_kakao_text",
		"close_btn": ".close_btn",
		"wannago_login_popup_sign_wrap": ".wannago_login_popup_sign_wrap",
		"black_screen": ".black_screen",
		"facebook_btn": ".wannago_login_popup_sign.facebook",
		"kakao_btn": ".wannago_login_popup_sign.kakao"
	};

	var resources = {
    ko: {
      signin: {
        popup_msg: "로그인 해보세요<br />가고싶은 곳을 저장할 수 있어요",
        kakao_msg: "클릭 한 번이면 카카오톡 로그인",
        facebook_msg: "클릭 한 번이면 페이스북 로그인"
      },
      signup: {
        popup_msg: "회원가입 해보세요<br />가고싶은 곳을 저장할 수 있어요",
        kakao_msg: "클릭 한 번이면 카카오톡 회원가입",
        facebook_msg: "클릭 한 번이면 페이스북 회원가입"
      }
    },

    en: {
      signin: {
        popup_msg: "Sign in and you can save the places you 'wannago'!",
        kakao_msg: "Sign in via KakaoTalk with one click",
        facebook_msg: "Sign in via Facebook with one click"
      },
      signup: {
        popup_msg: "Sign up and you can save the places you 'wannago'!",
        kakao_msg: "Sign up via KakaoTalk with one click",
        facebook_msg: "Sign up via Facebook with one click"
      }
    }
  };

  var used_locale = resources[get_locale()];
	wannago_sign_popup.init = function(){
		this.bind_event();
	};

	wannago_sign_popup.tab_active_obj= {
		"signin": function(){
			var $popup = $(this.dom.popup),
					$image = $popup.find(this.dom.popup_main_image),
					$msg = $popup.find(this.dom.popup_msg),
					$signin_tab = $popup.find(this.dom.signin_tab),
					$kakao_text = $popup.find(this.dom.kakao_text),
					$facebook_text = $popup.find(this.dom.facebook_text),
					$wannago_login_popup_sign_wrap = $popup.find(this.dom.wannago_login_popup_sign_wrap);

			common_ga(get_now_page_code(), "CLICK_WANNAGO_LOG_IN");
			$image.attr("src", get_full_picture_url_by_akamai("https://mp-seoul-image-production-s3.mangoplate.com/web/resources/belwdh7sngu0nq9r.png", undefined, undefined, "png"));
			$msg.html(used_locale.signin.popup_msg);
			$signin_tab.addClass(this.select_tab_class);
			$kakao_text.html(used_locale.signin.kakao_msg);
			$facebook_text.html(used_locale.signin.facebook_msg);
			$wannago_login_popup_sign_wrap.removeClass("signup");
		},
		"signup": function(){
			var $popup = $(this.dom.popup),
					$image = $popup.find(this.dom.popup_main_image),
					$msg = $popup.find(this.dom.popup_msg),
					$signup_tab = $popup.find(this.dom.signup_tab),
					$kakao_text = $popup.find(this.dom.kakao_text),
					$facebook_text = $popup.find(this.dom.facebook_text),
					$wannago_login_popup_sign_wrap = $popup.find(this.dom.wannago_login_popup_sign_wrap);

			common_ga(get_now_page_code(), "CLICK_WANNAGO_SIGN_UP");
			$image.attr("src", "https://mp-seoul-image-production-s3.mangoplate.com/web/resources/zdqfzo8gcjmjec34.png");
			$msg.html(used_locale.signup.popup_msg);
			$signup_tab.addClass(this.select_tab_class);
			$kakao_text.html(used_locale.signup.kakao_msg);
			$facebook_text.html(used_locale.signup.facebook_msg);
			$wannago_login_popup_sign_wrap.addClass("signup");
		}
	};

	wannago_sign_popup.bind_event = function(){
		var $popup = $(this.dom.popup),
				$tabs = $popup.find(this.dom.tabs),
				$close_btn = $popup.find(this.dom.close_btn),
				$black_screen = $popup.next(this.dom.black_screen),
				$facebook_btn = $popup.find(this.dom.facebook_btn),
				$kakao_btn = $popup.find(this.dom.kakao_btn);

		$tabs.on("click", function(e){
			var $target = $(e.target),
					tab_name = $target.data("tab_name"),
					tab_function;

			if(this.now_tab === tab_name){return false;}

			this.now_tab = tab_name;

			tab_function = this.tab_active_obj[tab_name];

			if(typeof tab_function === "function"){
				$tabs.removeClass(this.select_tab_class);
				tab_function.bind(this)();
			}
		}.bind(this));

		$close_btn.on("click", function(){
			common_ga(get_now_page_code(), "CLICK_WANNAGO_CLOSE_BTN");
			this.close();
		}.bind(this));

		$black_screen.on("click", function(){
			common_ga(get_now_page_code(), "CLICK_WANNAGO_CLOSE_OTHER");
			this.close();
		}.bind(this));

		$facebook_btn.on("click", function(){
			switch (wannago_sign_popup.now_tab){
				case wannago_sign_popup.tab_code.signin:
						common_ga(get_now_page_code(), "CLICK_WANNAGO_LOG_IN_FACEBOOK");
					break;
				case wannago_sign_popup.tab_code.signup:
					common_ga(get_now_page_code(), "CLICK_WANNAGO_SIGN_UP_FACEBOOK");
					break;
			}

			mp_facebook.login();
		});

		$kakao_btn.on("click", function(){
			switch (wannago_sign_popup.now_tab){
				case wannago_sign_popup.tab_code.signin:
					common_ga(get_now_page_code(), "CLICK_WANNAGO_LOG_IN_KAKAO");
					break;
				case wannago_sign_popup.tab_code.signup:
					common_ga(get_now_page_code(), "CLICK_WANNAGO_SIGN_UP_KAKAO");
					break;
			}

			mp_kakao.login();
		});
	};

	wannago_sign_popup.open = function(){
		var $popup = $(this.dom.popup);

		common_ga_page(this.popup_name);
		$popup.addClass(this.open_class);
	};

	wannago_sign_popup.close = function(){
		var $popup = $(this.dom.popup);

		$popup.removeClass(this.open_class);
	};

	wannago_sign_popup.init();

	/**
	 * 전역객체에 바인딩.
	 */
	if(window.mp20){
		if(window.mp20.wannago_popup){
			window.mp20.wannago_popup.wannago_sign_popup = wannago_sign_popup;
		} else {
			window.mp20.wannago_popup = {};
			window.mp20.wannago_popup.wannago_sign_popup = wannago_sign_popup;
		}
	} else {
		window.mp20 = {};
		window.mp20.wannago_popup = {};
		window.mp20.wannago_sign_popup = wannago_sign_popup;
	}
})();
(function(){
	var wannago_go_app_popup = {};

	wannago_go_app_popup.open_class = "on";
	wannago_go_app_popup.popup_name = "PU_WANNAGO_MORE";

	wannago_go_app_popup.dom = {
		"popup": ".wannago_go_app_popup",
		"black_screen": ".black_screen",
		"close_btn": ".close_btn"
	};

	wannago_go_app_popup.open = function(){
		var $popup = $(this.dom.popup);

		$popup.addClass(this.open_class);
		common_ga_page(this.popup_name);
	};

	wannago_go_app_popup.close = function(){
		var $popup = $(this.dom.popup);

		$popup.removeClass(this.open_class);
	};

	wannago_go_app_popup.bind_event = function(){
		var $popup = $(this.dom.popup);

		$popup.find(this.dom.close_btn).on("click", function(){
			common_ga(get_now_page_code(), "CLICK_WANNAGO_CLOSE_BTN");
			this.close();
		}.bind(this));

		$popup.next(this.dom.black_screen).on("click", function(){
			common_ga(get_now_page_code(), "CLICK_WANNAGO_CLOSE_OTHER");
			this.close();
		}.bind(this));
	};

	wannago_go_app_popup.bind_event();

	/**
	 * 전역객체에 바인딩.
	 */
	if (window.mp20){
		if (window.mp20.wannago_popup){
			window.mp20.wannago_popup.wannago_go_app_popup = wannago_go_app_popup;
		} else {
			window.mp20.wannago_popup = {};
			window.mp20.wannago_popup.wannago_go_app_popup = wannago_go_app_popup;
		}
	} else {
		window.mp20 = {};
		window.mp20.wannago_popup = {};
		window.mp20.wannago_go_app_popup = wannago_go_app_popup;
	}
})();
(function () {
  var CookieStorage = (function () {
    return {
      get length() {
        return _.size($.cookie());
      },

      getItem: function (key) {
        if (!key) {
          return null;
        }

        return $.cookie(key) || null;
      },

      setItem: function (key, value, option) {
        if (!key) {
          return;
        }

        $.cookie(key, value, option);
      },

      removeItem: function (key) {
        $.removeCookie(key);
      },

      clear: function () {

      }
    };
  })();

  window.CookieStorage = CookieStorage;
})();
(function () {
  var AdSlotByAreaStorage = (function () {
    var storage = {};

    return {
      get: function (slotElementId) {
        return storage[slotElementId];
      },

      set: function (slotElementId, area) {
        storage[slotElementId] = area;
      }
    };
  })();

  window.AdSlotByAreaStorage = AdSlotByAreaStorage;
})();
(function () {
  var AdRepo = function (json) {
    this._records = _.map(json, function (e) {
      return new AdInventory(
        e.platform,
        e.page,
        e.inventory,
        e.tag,
        e.sizes,
        e.args
      );
    });
  };

  AdRepo.prototype = {
    find: function (platform, page, inventory) {
      return _.findWhere(this._records, {
        platform: platform,
        page: page,
        name: inventory
      });
    },

    where: function (condition) {
      var clause = {};
      var regex = {};

      _.each(condition, function (v, k) {
        if (!_.isRegExp(v)) {
          clause[k] = v;
        } else {
          regex[k] = v;
        }
      });

      return _.filter(this._records, function (e) {
        if (!_.every(clause, function (v, k) {
            return e[k] === v;
          })) {
          return false;
        } else if (!_.every(regex, function (v, k) {
            return e[k].match(v);
          })) {
          return false;
        }

        return true;
      });
    }
  };

  window.AdRepo = AdRepo;
})();
(function () {
  var AdInventory = function (platform, page, name, tag, sizes, args) {
    this._platform = platform;
    this._page = page;
    this._name = name;
    this._tag = tag;
    this._sizes = sizes;
    this._args = args || {};
  };

  AdInventory.prototype = {
    get platform() {
      return this._platform;
    },

    get page() {
      return this._page;
    },

    get name() {
      return this._name;
    },

    get tag() {
      return this._tag;
    },

    get sizes() {
      return this._sizes;
    },

    get display_type() {
      return this.arg_value('display_type', 'banner');
    },

    arg_value: function (name, default_value) {
      return this._args.hasOwnProperty(name) ? this._args[name].value : default_value;
    }
  };

  window.AdInventory = AdInventory;
})();
(function () {
  var AdAreaPool = function () {
    this._pool = {};
  };

  AdAreaPool.prototype = {
    add: function (area) {
      if (area.id in this._pool)
        return false;

      this._pool[area.id] = area;
      return true;
    },

    get: function (area_id) {
      return this._pool[area_id];
    },

    get areas() {
      return _.values(this._pool);
    }
  };

  window.AdAreaPool = AdAreaPool;
})();

(function () {
  var Placer = function () {

  };

  Placer.replace = function (position, $wrapper) {
    $(position).replaceWith($wrapper);
  };

  Placer.after = function (position, $wrapper) {
    $(position).after($wrapper);
  };

  window.AdPlacer = Placer;
})();

(function () {
  var AdRenderer = function () {
    this._area_pool = new AdAreaPool();
  };

  AdRenderer.area_id = function(inventory, index) {
    var id_elements = [inventory.platform, inventory.page, inventory.name];

    if (!_.isUndefined(index) && !_.isNull(index)) {
      id_elements.push(index);
    }

    return id_elements.join('-');
  };

  AdRenderer.area_content_id = function(inventory, index) {
    return AdRenderer.area_id(inventory, index) + '-content';
  };

  AdRenderer.prototype = {
    get areas() {
      return this._area_pool.areas;
    },

    find_area: function(inventory, index) {
      return this._area_pool.get(AdRenderer.area_id(inventory, index));
    },

    render: function (inventory, position, placer, index, class_names) {
      if(_.isNull(inventory) || _.isUndefined(inventory))
        return;

      class_names = !_.isUndefined(class_names) && !_.isNull(class_names) ? [].concat(class_names) : [];
      class_names.push(inventory.name);
      if (inventory.platform === 'web_mobile') {
        class_names.push('only-mobile');
      } else if (inventory.platform === 'web_desktop') {
        class_names.push('only-desktop');
      }

      var delegator;
      switch (inventory.arg_value('display_type', 'banner')) {
        case 'popup':
          delegator = AdPopup;
          break;

        case 'custom_photo':
          delegator = AdCustomPhoto;
          break;

        case 'banner':
        default:
          delegator = AdBanner;
          break;
      }

      var area = new delegator(
        inventory,
        index,
        class_names
      );

      this._area_pool.add(area);

      area.render(position, placer);
      return area;
    }
  };

  window.AdRenderer = AdRenderer;
})();
(function () {
  var Publisher = function (args) {
    args = args || {};

    window.googletag.cmd.push(function () {
      window.googletag.pubads().disableInitialLoad();
      window.googletag.pubads().enableSingleRequest();
      window.googletag.pubads().collapseEmptyDivs();

      if (args.hasOwnProperty('coordinate')) {
        window.googletag.pubads().setLocation(args.coordinate.lat, args.coordinate.lon);
      }

      window.googletag.enableServices();
    });
  };

  Publisher.prototype = {
    add_event_listener: function(event, fn) {
      window.googletag.cmd.push(function() {
        window.googletag.pubads().addEventListener("slotRenderEnded", function (event) {
          fn(event);
        });
      });
    },

    publish: function (areas) {
      window.googletag.cmd.push(function () {
        var slot;
        var slots = [];
        _.each(areas, function (area) {
          if (area.inventory.sizes) {
            var max_size = _.max(area.inventory.sizes, function(e) {
              return e[0];
            });
            var min_size = _.min(area.inventory.sizes, function(e) {
              return e[0];
            });

            var size = (document.documentElement.clientWidth >= 336) ? max_size : min_size;
            slot = window.googletag.defineSlot(
              area.inventory.tag,
              [size],
              area.content_id
            )
          } else {
            slot = window.googletag.defineOutOfPageSlot(
              area.inventory.tag,
              area.content_id
            );
          }

          if (slot) {
            AdSlotByAreaStorage.set(slot.getSlotElementId(), area);
            slot.addService(window.googletag.pubads());
            slots.push(slot);
            window.googletag.display(area.content_id);
          }

        }.bind(this));

        window.googletag.pubads().refresh(slots);
      }.bind(this));
    }
  };

  window.Publisher = Publisher;
})();

var AdSeries = function () {
  var AdSeries = function (a, b, count) {
    this.a = a;
    this.b = b;
    this.count = count;
  };

  AdSeries.prototype = {
    contains: function (value) {
      if (this.b === 0) {
        return this.a === value;
      }

      var matched = (value - this.a) % this.b === 0 && this.index(value) >= 0;
      if(_.isNull(this.count) || _.isUndefined(this.count))
        return matched;

      return matched && this.index(value) < this.count;
    },

    value: function (index) {
      return this.a + this.b * index;
    },

    index: function (value) {
      return (value - this.a) / this.b;
    },

    toArray: function (count) {
      count = count || this.count;

      var arr = [];
      for (var i = 0; i < count; i++) {
        arr.push(this.value(i));
      }
      return arr;
    }
  };

  return AdSeries;
}();

(function () {
  var AdMatcher = function () {
  };

  AdMatcher.is_match = function (inventory, index) {
    var start = inventory.arg_value('start', 0);
    var every = inventory.arg_value('every', 0);
    var series = new AdSeries(start, every);

    return AdMatcher.is_match_with(series, index);
  };

  AdMatcher.is_match_with = function (series, index) {
    return series.contains(index);
  };

  window.AdMatcher = AdMatcher;
})();
(function () {

  var AdRepeater = function () {
  };

  AdRepeater.repeat = function (inventories, collection, start_index, repeat_fn) {
    var index = start_index;
    _.each(collection, function (item) {
      _.each(inventories, function (i) {
        if(AdMatcher.is_match(i, index)) {
          repeat_fn(i, item, index);
        }
      });

      index++;
    });
  };

  window.AdRepeater = AdRepeater;
})();
(function () {
  var AdBanner = function (inventory, index, class_names) {
    this._inventory = inventory;
    this._index = index;
    this._class_names = !_.isUndefined(class_names) && !_.isNull(class_names) ? [].concat(class_names) : [];
  };

  AdBanner.prototype = {
    get inventory() {
      return this._inventory;
    },

    get id() {
      var id_elements = [this._inventory.platform, this._inventory.page, this._inventory.name];

      if (!_.isUndefined(this._index) && !_.isNull(this._index)) {
        id_elements.push(this._index);
      }

      return id_elements.join('-');
    },

    get content_id() {
      return this.id + '-content';
    },

    render: function (position, placer) {
      var $template = $('<div class="ad_wrap"><div class="content"></div></div>');
      $template.find('.content').attr('id', this.content_id);

      var $wrapper = $('<div class="ad_area"></div>');
      $wrapper
        .attr('id', this.id)
        .addClass(this._class_names.join(' '))
        .html($template);

      placer(position, $wrapper);
    },

    show: function (event) {

    }
  };

  window.AdBanner = AdBanner;
})();


(function () {
  var scrollCallback;

  function scrollLock() {
    $('body').css('overflow', 'hidden');

    scrollCallback = function () {
      window.scrollTo(0, 0);
    };
    $(document).bind('scroll', scrollCallback);
  }

  function scrollUnlock() {
    $('body').css('overflow', 'visible');
    $(document).unbind('scroll', scrollCallback);
  }

  var AdPopup = function (inventory, index, class_names) {
    this._inventory = inventory;
    this._index = index;
    this._class_names = !_.isUndefined(class_names) && !_.isNull(class_names) ? [].concat(class_names) : [];
  };

  AdPopup.closeAd = function () {
    scrollUnlock();
    $('.dfp_ad_front_popup').hide();
  };

  AdPopup.prototype = {
    get inventory() {
      return this._inventory;
    },

    get id() {
      var id_elements = [this._inventory.platform, this._inventory.page, this._inventory.name];

      if (!_.isUndefined(this._index) && !_.isNull(this._index)) {
        id_elements.push(this._index);
      }

      return id_elements.join('-');
    },

    get content_id() {
      return this.id + '-content';
    },

    render: function (position, placer) {
      var $wrapper = $('<div class="dfp_ad_front_popup">' +
        '  <div class="dfp_ad_front_banner_wrap">\n' +
        '    <div class="dfp_ad_front_banner_content">\n' +
        '      <div class="ad_area">\n' +
        '        <div class="ad_wrap"><div class="content"></div></div>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>');

      $wrapper.on('click', function () {
        AdPopup.closeAd();
      });

      $wrapper
        .addClass([this.inventory.platform, this.inventory.name].join('_'))
        .addClass(this._class_names.join(' '));

      $wrapper.find('.ad_area')
        .attr('id', this.id);

      $wrapper.find('.content').attr('id', this.content_id);

      placer(position, $wrapper);
    },

    show: function (event) {
      AdPopupManager.setCreativeID(event.creativeId);

      if (!AdPopupManager.isCanShowPopup()) {
        return;
      }

      var area = AdSlotByAreaStorage.get(event.slot.getSlotElementId());
      var $element = $('.dfp_ad_front_popup.' + area.inventory.platform + '_' + area.inventory.name);
      switch (area.inventory.arg_value('display', 'once')) {
        case 'every':
          this._fadeIn($element);
          break;

        case 'once':
        default:
          // 전면 팝업은 인벤토리에 관계 없이 세션당 1회 노출되어야 함
          if (window.sessionStorage) {
            if (!window.sessionStorage.getItem('ad_popup')) {
              this._fadeIn($element);
              window.sessionStorage.setItem('ad_popup', true);
            }
          } else {
            if ($.cookie('ad_popup') === undefined) {
              this._fadeIn($element);
              $.cookie('ad_popup', true, {path: '/'});
            }
          }
      }
    },

    _fadeIn: function ($element) {
      $element.fadeIn();
      scrollLock();
    }
  };

  window.AdPopup = AdPopup;
})();
(function () {
  var AdCustomPhoto = function (inventory, index, class_names) {
    this._inventory = inventory;
    this._index = index;
    this._class_names = !_.isUndefined(class_names) && !_.isNull(class_names) ? [].concat(class_names) : [];

    window.addEventListener('message', function (event) {
      if (event.data.img) {
        this._data = event.data;
      }
    }.bind(this));
  };

  var template = _.template('<div><div id="photo_viewer_ad">\n' +
    '<a class="photo_wrap" href="{{link_url}}" target="_blank" style="background-image: url({{img}});height: {{height}}px">\n' +
    '</a>\n' +
    '<a class="ad_detail_btn" href="{{link_url}}" target="_blank">더 알아보기<img class="ad_detail_btn_arrow" src="https://mp-seoul-image-production-s3.mangoplate.com/web/resources/phgvzdixyeycxuay.png" alt="text_arrow_img" />\n' +
    '</a>\n' +
    '</div></div>');

  function get_image_height(width_ratio, height_ratio) {
    var viewport_width = document.documentElement.clientWidth;
    return (viewport_width * height_ratio) / width_ratio;
  }

  AdCustomPhoto.prototype = {
    get inventory() {
      return this._inventory;
    },

    get id() {
      var id_elements = [this._inventory.platform, this._inventory.page, this._inventory.name];

      if (!_.isUndefined(this._index) && !_.isNull(this._index)) {
        id_elements.push(this._index);
      }

      return id_elements.join('-');
    },

    get content_id() {
      return this.id + '-content';
    },

    get $element() {
      return template({
        link_url: this._data.link_url,
        img: this._data.img,
        height: get_image_height(5,4)
      });
    },

    render: function (position, placer) {
      var $template = $('<div class="ad_wrap"><div class="content"></div></div>');
      $template.find('.content').attr('id', this.content_id);

      var $wrapper = $('<div class="ad_area"></div>');
      $wrapper
        .attr('id', this.id)
        .addClass(this._class_names.join(' '))
        .html($template);

      placer(position, $wrapper);
    }
  };

  window.AdCustomPhoto = AdCustomPhoto;
})();
(function () {
  var STORAGE_KEY = {
    BLOCKED_CREATIVE_ID: 'BlockedPopupCreativeID',
    BLOCKED_CREATIVE_DATE: 'BlockedPopupCreativeDate'
  };
  var Storage = window.localStorage
    ? window.localStorage
    : window.cookieStorage;
  var COOKIE_OPTION = {expires: 1000, path: '/'};

  var AdPopupManager = function (locale) {
    this._creativeID = null;
    this._locale = locale;
  };
  var ALLOW_LOCALE = ['ko'];

  AdPopupManager.prototype = {
    setCreativeID: function (creativeID) {
      this._creativeID = creativeID;
    },

    isCanShowPopup: function () {
      if (!this._creativeID) {
        return false;
      }

      if (!this._isAllowLocale()) {
        return false;
      }

      if (this._isSameBlockedCreativeID()) {
        return this._hasBlockedDate()
          ? this._isOverBlockedDate()
          : false
      }

      return true;
    },

    blockCreative: function () {
      this._setBlockedCreativeID();
      this._removeSameBlockedDate();
    },

    blockCreativeByToday: function () {
      this._setBlockedCreativeID();
      this._setSameBlockedDate();
    },

    clearAll: function() {
      this.clearLocalData();
      this.clearSession();
    },

    clearSession: function() {
      window.sessionStorage.removeItem('ad_popup');
    },

    clearLocalData: function() {
      this._removeSameBlockedDate();
      this._removeSameBlockedID();
    },

    _setBlockedCreativeID: function () {
      Storage.setItem(
        STORAGE_KEY.BLOCKED_CREATIVE_ID,
        this._creativeID,
        {expires: 1000, path: '/'}
      );
    },

    _setSameBlockedDate: function () {
      Storage.setItem(
        STORAGE_KEY.BLOCKED_CREATIVE_DATE,
        this._getTodayValue(),
        COOKIE_OPTION
      );
    },

    _removeSameBlockedDate: function () {
      Storage.removeItem(STORAGE_KEY.BLOCKED_CREATIVE_DATE);
    },

    _removeSameBlockedID: function() {
      Storage.removeItem(STORAGE_KEY.BLOCKED_CREATIVE_ID);
    },

    _getTodayValue: function () {
      var now = new Date();

      return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
    },

    _isSameBlockedCreativeID: function () {
      var blockedCreativeID = this._getBlockedCreativeID();

      return this._creativeID.toString() === (blockedCreativeID ? blockedCreativeID.toString() : null);
    },

    _getBlockedCreativeID: function () {
      return Storage.getItem(STORAGE_KEY.BLOCKED_CREATIVE_ID);
    },

    _isOverBlockedDate: function () {
      var blockedDate = this._getBlockedDate();

      return this._getTodayValue() > (blockedDate ? blockedDate.valueOf() : 0);
    },

    _getBlockedDate: function () {
      return Storage.getItem(STORAGE_KEY.BLOCKED_CREATIVE_DATE);
    },

    _hasBlockedDate: function () {
      return !!this._getBlockedDate()
    },

    _isAllowLocale: function () {
      return ALLOW_LOCALE.indexOf(this._locale) > -1;
    }
  };

  window.AdPopupManager = new AdPopupManager(I18n.locale);
})();
(function () {
  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];

  var AdManager = function () {
    this._repo = new AdRepo(parse_json($('#dfp_ads').html(), []));
    this._area_renderer = new AdRenderer();

    var args = {};
    var location = parse_json($('#location').html(), undefined);
    if (location !== undefined) {
      args['coordinate'] = new Coordinate(location.latitude, location.longitude);
    }

    this._publisher = new Publisher(args);

    this._is_previous_viewport_mobile = is_mobile_viewport();
    this._handle_window_resize();
    this._handle_ad_area();
    this._handle_impression();
  };

  var instance;
  AdManager.get_instance = function () {
    instance = instance ? instance : new AdManager();

    return instance;
  };

  AdManager.prototype = {
    get repo() {
      return this._repo;
    },

    get area_renderer() {
      return this._area_renderer;
    },

    publish: function () {
      this._render_placeholders();
      this._publisher.publish(this._areas_by_viewport());
    },

    _render_placeholders: function () {
      var areas = {};
      _.each($('.ad_placeholder').toArray(), function (e) {
        var $e = $(e);
        var area = this._area_renderer.render(
          this.repo.find($e.data('platform'), $e.data('page'), $e.data('inventory')),
          $e,
          AdPlacer.replace,
          undefined
        );
        areas[area.id] = area;
      }.bind(this));

      this._publisher.add_event_listener("slotRenderEnded", function (event) {
        var area = AdSlotByAreaStorage.get(event.slot.getSlotElementId());

        if (area.inventory.arg_value('display_type', undefined) === 'popup') {
          if (areas[area.id]) {
            areas[area.id].show(event);
          }
        }
      });
    },

    _areas_by_viewport: function () {
      if (is_mobile_viewport()) {
        return _.filter(this._area_renderer.areas, function (e) {
          return e.inventory.platform === 'web_mobile';
        });
      }

      return _.filter(this._area_renderer.areas, function (e) {
        return e.inventory.platform === 'web_desktop';
      });
    },

    _handle_window_resize: function () {
      var handle_resize = _.throttle(function () {
        if (this._is_previous_viewport_mobile !== is_mobile_viewport()) {
          this.publish();
          this._is_previous_viewport_mobile = is_mobile_viewport();
        }
      }.bind(this), 100);

      $(window).on('resize', handle_resize);
    },

    _handle_ad_area: function () {
      window.googletag.cmd.push(function () {
        window.googletag.pubads().addEventListener('slotRenderEnded', function (event) {
          var area = AdSlotByAreaStorage.get(event.slot.getSlotElementId());
          var $content = $('#' + area.content_id);

          if (!event.advertiserId) {
            $content.parents(".ad_area").hide();
            return;
          }

          if (area.inventory.display_type !== 'popup' && this._is_direct_ad($content)) {
            $content.parent().append('<div class="ad_badge"></div>');
          }
        }.bind(this));
      }.bind(this));
    },

    _handle_impression: function () {
      window.googletag.cmd.push(function () {
        window.googletag.pubads().addEventListener('impressionViewable', function (event) {
          var slot = event.slot;

          if (window.AdImpressionNotifier) {
            window.AdImpressionNotifier.send_message(slot.getResponseInformation().sourceAgnosticLineItemId,
              slot.getAdUnitPath());
          }
        });
      });
    },

    _is_direct_ad: function ($element) {
      return !$element.find('iframe').data('is-safeframe');
    }
  };

  window.AdManager = AdManager;
})();
(function () {
  /**
   * 전역객체에 바인딩.
   */
  if (!window.mp20) {
    window.mp20 = {};
  }

  window.mp20.vo = {};
  window.mp20.model = {};
  window.mp20.view = {
    templateBuilder: {},
    decorator: {}
  };
  window.mp20.controller = {};
  window.mp20.service = {};
  window.mp20.constants = {};
  window.mp20.utils = {};
  window.mp20.mapper = {};
  window.mp20.module = {};
})();
(function () {
  var constants = (function () {
    return {
      MANGO_API_HOST: 'https://stage.mangoplate.com',
      IMAGE_UPLOAD_HOST: 'https://image-upload.mangoplate.com',
      MANGO_ORIGIN: 'mangoplate.com',

      IMAGE_UPLOAD_API_KEY: 'OCPgtFnAx27bDWd0gS74Z5hmnv3KV1pJ7TPeykTc',

      MESSAGE_TYPE: {
        EAT_DEAL_PURCHASE_LOADED: 'EatDealPurchase/loaded',
        EAT_DEAL_PURCHASE_INIT: 'EatDealPurchase/init',
        EAT_DEAL_PURCHASE_RESULT: 'EatDealPurchase/result',
      },

      EAT_DEAL_RESULT_STATE: {
        SUCCESS: 'success',
        FAIL: 'fail',
      },

      EAT_DEAL_STATUS: {
        CAN_PURCHASE: 100,
        BEFORE_SALES: 510,
        OUT_OF_ORDER: 520,
        SALES_END: 530,
        EXCEEDED_INDIVIDUAL_HOLD_COUNT: 540
      },

      ANALYTIC_PAGE_NAME: {
        EAT_DEAL_DETAIL: 'PG_EATDEAL',
        EAT_DEAL_DETAIL_SHARE_LAYER: 'PU_EATDEAL_SHARE',
        EAT_DEAL_DETAIL_PICTURE_LAYER: 'PU_EATDEAL_PICTURE',
        EAT_DEAL_DETAIL_COMPLETE_LAYER: 'PU_EATDEAL_FINISH',
        EAT_DEAL_COLLECTION_DETAIL: 'PG_EATDEAL_COLLECTION',
        EAT_DEAL_COLLECTION_SHARE_LAYER: 'PU_SHARE_EATDEAL_COLLECTION',
        EAT_DEAL_CARD_VALIDATION: 'PG_CARD_VALIDATION',
        STORY: 'PG_MANGOPICKS'
      },

      EAT_DEAL_PURCHASE_ERROR_CODE: {
        BROWSER_BACK: 30100,
        NOT_MATCHED_PASS_CODE: 40124,
        EXPIRED_PASS_CODE: 40125,
        EXCEEDED_INDIVIDUAL_HOLD_COUNT: 40514,
        ONLY_BUY_EATDEAL_FOR_HOLIK: 40312
      },

      EAT_DEALS_AND_COUPONS_ITEM_TYPE: {
        EAT_DEAL: 'eat_deal',
        COUPON: 'coupon'
      },

      EAT_DEAL_DISCOUNT_TYPE: {
        NONE: 'none',
        PRICE: 'price',
        RATE: 'rate'
      },

      APP_MARKET_LINK: {
        ANDROID: 'https://play.google.com/store/apps/details?id=com.mangoplate',
        IOS: 'https://itunes.apple.com/app/id628509224'
      },

      RESTAURANT_RECOMMEND_TYPE: {
        NOT_RECOMMEND: 1,
        OK: 2,
        RECOMMEND: 3,
      },

      RESTAURANT_ACTION_TYPE: {
        REVIEW: 3
      },

      REVIEW_IMAGE_UPLOAD_ERROR_TYPE: {
        OVER_FILE_SIZE: 1,
        NOT_SUPPORT_FILE_EXTENSION: 2,
        MAX_PICTURE_COUNT: 3,
        UNKNOWN: 4
      },

      RELATED_CONTENT_TYPE: {
        MANGO_PICK: "mango_pick",
        TOP_LIST: "top_list",
        EAT_DEAL_COLLECTION: "eat_deal_collection"
      },

      REVIEW_PICTURE_UPLOADED_STATE: {
        NOT_UPLOADED: 'NOT_UPLOADED',
        UPLOADED: 'UPLOADED',
        READY: 'READY'
      },

      KAKAO_TALK_TEMPLATE_ID: {
        NORMAL_CONTENT: 13433
      },

      RELATED_EAT_DEAL_PAGE_TYPE: {
        EAT_DEAL_DETAIL: 'eat_deal_detail',
        EAT_DEAL_PURCHASE_CONFIRMED: 'eat_deal_purchase_confirmed'
      }
    };
  })();

  mp20.constants = constants;
})();
(function () {
  function Model() {
    this._listeners = [];
  }

  Model.prototype = {
    subscribe: function (listener) {
      this._listeners.push(listener);
    },

    _notify: function (data) {
      this._listeners.forEach(function (listener) {
        listener(data);
      });
    },

    getData: function () {
      throw new Error('getData is must override');
    }
  };

  window.mp20.model['Interface'] = Model;
})();
(function () {
  function HttpFetcher() {

  }

  HttpFetcher.prototype = {
    get: function (url, data, header, option) {
      return this._getPromise({
        url: url,
        method: 'GET',
        data: data,
      }, header, option);
    },

    post: function (url, data, header, option) {
      return this._getPromise({
        url: url,
        method: 'POST',
        data: data,
      }, header, option);
    },

    put: function (url, data, header, option) {
      return this._getPromise({
        url: url,
        method: 'PUT',
        data: data,
      }, header, option);
    },

    'delete': function (url, data, header, option) {
      return this._getPromise({
        url: url,
        method: 'DELETE',
        data: data,
      }, header, option);
    },

    _getPromise: function (config, headers, option) {
      option = option || {};
      var self = this;

      return new Promise(function (resolve, reject) {
        var defaultConfig = {
          success: function (data) {
            resolve(data);
          },

          error: function (err) {
            reject(err);
          },

          beforeSend: function (xhr) {
            self._setHeaderToRequest(xhr, headers, option);
          },
        };

        var baseParams = {};
        if (option.includeFileData) {
          baseParams = {
            contentType: false,
            processData: false,
          };
        }

        var params = _.assign(baseParams, defaultConfig, config);
        $.ajax(params);
      });
    },

    _setHeaderToRequest: function (xhr, headers, option) {
      for (var key in headers) {
        if (!headers.hasOwnProperty(key)) {
          continue;
        }

        if (option.includeFileData && key === 'Content-Type') {
          continue;
        }

        xhr.setRequestHeader(key, headers[key]);
      }
    },
  };

  window.mp20.utils['HttpFetcher'] = new HttpFetcher();
})();
(function () {
  var constants = window.mp20.constants;
  var httpFetcher = window.mp20.utils.HttpFetcher;
  var header = {
    Authorization: auth_service.get_access_token(),
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };
  var getApiUrl = function (path) {
    return constants.MANGO_API_HOST + path;
  };
  var getData = function (data) {
    return _.assign({
      'language': get_language(),
      'device_uuid': get_device_uuid(),
      'device_type': get_device_type(),
    }, data);
  };
  var restaurantAdditionalInfoType = {
    RELATED_MANGO_PICKS: 'related_mango_picks',
    RELATED_TOP_LIST: 'related_list',
    NEAR_BY_POPULAR_RESTAURANT: 'near_popular_restaurants',
  };

  function toFormData(data) {
    var formData = new FormData();

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    return formData;
  }

  function HttpApi() {

  }

  HttpApi.prototype = {
    get: function (url, data) {
      return httpFetcher.get(
        url,
        getData(data),
        header
      );
    },

    post: function (url, data) {
      return httpFetcher.post(
        url,
        getData(data),
        header
      );
    },

    searchByFilter: function (filter, orderBy, startIndex, requestCount) {
      return httpFetcher.post(
        getApiUrl('/api/v6/search/by_filter.json'),
        getData({
          filter: filter,
          order_by: orderBy,
          start_index: startIndex,
          request_count: requestCount,
        }),
        header
      );
    },

    getCommonCode: function () {
      return httpFetcher.get(
        getApiUrl('/api/common/codetable.js'),
        getData(),
        header
      );
    },

    getRestaurantsByKeys: function (restaurantKeys) {
      var restaurantKeysString = restaurantKeys.join(',');

      return httpFetcher.get(
        getApiUrl('/api/v2/web/recently_viewed/restaurants/by_restaurant_keys.json'),
        getData({
          restaurant_keys: restaurantKeysString,
        }),
        header
      );
    },

    wannago: function (restaurantUUID) {
      return httpFetcher.post(
        getApiUrl('/api/restaurant/action/create.json'),
        getData({
          action_type: 4,
          restaurant_uuid: restaurantUUID,
        }),
        header
      ).then(function (res) {
        if (res.error) {
          throw res.error;
        }

        return res;
      })
    },

    cancelWannago: function (actionID) {
      return httpFetcher.post(
        getApiUrl('/api/restaurant/action/delete.json'),
        getData({action_id: actionID}),
        header
      );
    },

    getWannagoRestaurants: function (memberUUID, startIndex, requestCount) {
      return httpFetcher.post(
        getApiUrl('/api/v5/consumers/' + memberUUID + '/wannago/restaurants.json'),
        getData({
          start_index: startIndex,
          request_count: requestCount,
        }),
        header
      );
    },

    getRestaurantByToplist: function (keyword, startIndex, requestCount) {
      return httpFetcher.get(
        getApiUrl('/api/v2/web/top_lists/' + keyword + '/restaurants.js'),
        getData({
          start_index: startIndex,
          request_count: requestCount,
        }),
        header
      );
    },

    getTopList: function (startIndex, requestCount) {
      return httpFetcher.get(
        getApiUrl('/api/v5/top_lists/list.json'),
        getData({
          start_index: startIndex,
          request_count: requestCount,
        }),
        header
      );
    },

    getTopListByKeyword: function (keyword, startIndex, requestCount) {
      return httpFetcher.get(
        getApiUrl('/api/v5/top_lists/list/search.json'),
        getData({
          keyword: keyword,
          start_index: startIndex,
          request_count: requestCount,
        }),
        header
      );
    },

    getMangoPickList: function (startIndex, requestCount) {
      return httpFetcher.get(
        getApiUrl('/api/v5/mango_picks/list.json'),
        getData({
          start_index: startIndex,
          request_count: requestCount,
        }),
        header
      );
    },

    checkVerifiedAccessToken: function (accessToken) {
      return httpFetcher.post(
        getApiUrl('/api/v5/account/verification/user.json'),
        getData(),
        {
          Authorization: accessToken,
        }
      );
    },

    policyAgreements: function (member_uuid, accessToken, policyAgreementsData) {
      return httpFetcher.post(
        getApiUrl('/api/v1/consumer/' + member_uuid + '/policy_agreements.json'),
        getData(policyAgreementsData),
        {
          Authorization: accessToken,
        }
      );
    },

    checkVerifiedVisaPremium: function (accessToken, userID) {
      return httpFetcher.get(
        getApiUrl('/api/v6/consumers/' + userID + '/visa_premium_validation.json'),
        getData(),
        {
          Authorization: accessToken,
        }
      );
    },

    validateVisaPremium: function (accessToken, userID, validationCode, eatDealID) {
      return httpFetcher.post(
        getApiUrl('/api/v6/consumers/' + userID + '/visa_premium_validation.json'),
        getData({
          validation_code: validationCode,
          eat_deal_id: eatDealID
        }),
        {
          Authorization: accessToken,
        }
      );
    },

    termsAgreements: function (accessToken, userID, revisionIDs) {
      return httpFetcher.post(
        getApiUrl('/api/terms/agreements.json'),
        getData({
          'userID': userID,
          'revisionIDs': revisionIDs,
        }),
        {
          Authorization: accessToken,
        }
      );
    },

    signInByFacebook: function (facebookID, facebookAccessToken) {
      return httpFetcher.post(
        getApiUrl('/api/v5/account/login/by_facebook.json'),
        getData({
          facebook_id: facebookID,
          facebook_access_token: facebookAccessToken
        })
      );
    },

    signUpByFacebook: function (FBUserInfo) {
      return httpFetcher.post(
        getApiUrl('/api/v5/account/signup/by_facebook.json'),
        getData({
          facebook_id: FBUserInfo.userId,
          facebook_access_token: FBUserInfo.accessToken,
          first_name: FBUserInfo.firstName,
          last_name: FBUserInfo.lastName,
          email: FBUserInfo.email,
          country: FBUserInfo.locale,
          picture_url: "",
          birthday: FBUserInfo.birthday,
        })
      );
    },

    getEatDeals: function (startIndex, requestCount) {
      return httpFetcher.get(
        getApiUrl('/api/v2/eat_deals.json'),
        getData({
          start_index: startIndex,
          request_count: requestCount,
        }),
        header
      );
    },

    getEatDealsFilterData: function () {
      return httpFetcher.post(
        getApiUrl('/api/v1/eat_deals/search/by_filter/count.json'),
        getData()
      );
    },

    getEatDealsByFilter: function (filter, startIndex, requestCount) {
      return httpFetcher.post(
        getApiUrl('/api/v2/eat_deals/search/by_filter.json'),
        getData({
          filter: JSON.stringify(filter),
          start_index: startIndex,
          request_count: requestCount,
          order_by: 0
        }),
        header
      );
    },

    uploadReviewPicture: function (base64EncodedPicture, pictureMimeType, restaurantID, userID) {
      var uriManager = new window.mp20.service.URIManager(constants.IMAGE_UPLOAD_HOST + '/upload-image');
      var key = restaurantID + '/' + userID + '_' + Date.now();
      uriManager.addQuery('key', key);
      uriManager.addQuery('content_type', pictureMimeType);

      // return new Promise(function (resolve) {
      //   httpFetcher.post(
      //     uriManager.get(),
      //     base64EncodedPicture,
      //     {
      //       'x-api-key': constants.IMAGE_UPLOAD_API_KEY
      //     }
      //   ).then(function (res) {
      //     setTimeout(function () {
      //       resolve(res);
      //     }, 3000);
      //   })
      // });

      return httpFetcher.post(
        uriManager.get(),
        base64EncodedPicture,
        {
          'x-api-key': constants.IMAGE_UPLOAD_API_KEY
        }
      );
    },

    getReview: function (restaurantKey, startIndex, requestCount, sortBy, actionValue) {
      var data = {
        start_index: startIndex,
        request_count: requestCount,
        sort_by: sortBy,
      };

      if (actionValue) {
        data.action_values = actionValue;
      }

      return httpFetcher.get(
        getApiUrl('/api/v5/restaurants/' + restaurantKey + '/reviews.json'),
        getData(data),
        header
      );
    },

    createReview: function (restaurantUUID, recommendValue, reviewText, pictureUrls) {
      return httpFetcher.post(
        getApiUrl('/api/v6/engagement/reviews/create.json'),
        getData({
          restaurant_uuid: restaurantUUID,
          action_type: mp20.constants.RESTAURANT_ACTION_TYPE.REVIEW,
          action_value: recommendValue,
          comment: reviewText,
          comment_image_urls: pictureUrls,
        }),
        header
      );
    },

    updateReview: function (reviewKey, restaurantUUID, recommendValue, reviewText, pictureUrls) {
      return httpFetcher.post(
        getApiUrl('/api/v6/engagement/reviews/update.json'),
        getData({
          comment_uuid: decodeReviewKey(reviewKey),
          restaurant_uuid: restaurantUUID,
          action_type: mp20.constants.RESTAURANT_ACTION_TYPE.REVIEW,
          action_value: recommendValue,
          comment: reviewText,
          comment_image_urls: pictureUrls,
        }),
        header
      );
    },

    deleteReview: function (reviewKey) {
      return httpFetcher.post(
        getApiUrl('/api/v6/engagement/reviews/delete.json'),
        getData({
          comment_uuid: decodeReviewKey(reviewKey)
        }),
        header
      );
    },

    getEatDealCollectionInfo: function (linkKey) {
      return httpFetcher.get(
        getApiUrl('/api/v1/eat_deal_collections/' + linkKey + '.json'),
        getData(),
        header
      );
    },

    getEatDealCollectionDeals: function (linkKey, startIndex, requestCount) {
      return httpFetcher.get(
        getApiUrl('/api/v2/eat_deal_collections/' + linkKey + '/eat_deals.json'),
        getData({
          start_index: startIndex,
          request_count: requestCount
        }),
        header
      );
    },

    getRecommendAndPopularKeyword: function () {
      return httpFetcher.get(
        getApiUrl('/api/v5/search/keyword/suggestion.json'),
        getData(),
        header
      );
    },

    getSuggestKeyword: function (keyword, seq) {
      return httpFetcher.get(
        getApiUrl('/api/v3/web/search/by_keyword/suggested.json'),
        getData({
          keyword: keyword,
          seq: seq
        }),
        header
      );
    },

    getRelatedEatDeals: function (eatDealId, pageType) {
      return httpFetcher.get(
        getApiUrl('/api/v1/eat_deals/' + eatDealId + '/related_eat_deals.json'),
        getData({
          page_type: pageType
        }),
        header
      );
    },

    getRelatedEatDealsByRestaurantKey: function (restaurantKey) {
      return httpFetcher.get(
        getApiUrl('/api/v8/restaurants/' + restaurantKey + '/eat_deals.json'),
        getData(),
        header
      );
    },

    getRestaurantAdditionalInfo: function (restaurantKey, fieldList) {
      return httpFetcher.get(
        getApiUrl('/api/v5/restaurants/' + restaurantKey + '/additional.json'),
        getData({
          fields: fieldList.join(','),
        }),
        header
      );
    },

    getRelatedStory: function (restaurantKey) {
      return this.getRestaurantAdditionalInfo(restaurantKey, [restaurantAdditionalInfoType.RELATED_MANGO_PICKS])
        .then(function (res) {
          return res.related_mango_picks;
        });
    },

    getNearByPopularRestaurant: function (restaurantKey) {
      return this.getRestaurantAdditionalInfo(restaurantKey, [restaurantAdditionalInfoType.NEAR_BY_POPULAR_RESTAURANT])
        .then(function (res) {
          return res.near_popular_restaurants;
        });
    },

    getRelatedTopList: function (restaurantKey) {
      return this.getRestaurantAdditionalInfo(restaurantKey, [restaurantAdditionalInfoType.RELATED_TOP_LIST])
        .then(function (res) {
          return res.related_list;
        });
    }
  };

  window.mp20.utils['HttpApi'] = new HttpApi();
})();
(function () {
  var KakaoTalkLinkVO = function (webURL, mobileWebURL, androidExecParams, iosExecParams) {
    this._webUrl = webURL || '';
    this._mobileWebUrl = mobileWebURL || '';
    this._androidExecParams = androidExecParams || '';
    this._iosExecParams = iosExecParams || '';
  };
  
  KakaoTalkLinkVO.prototype = {
    toJSON: function () {
      return {
        webUrl: this._webUrl,
        mobileWebUrl: this._mobileWebUrl,
        androidExecParams: this._androidExecParams,
        iosExecParams: this._iosExecParams,
      };
    },
  };
  
  window.mp20.vo['KakaoTalkLinkVO'] = KakaoTalkLinkVO;
})();
(function () {
  var KakaoTalkButtonVO = function (title, linkVO) {
    this._title = title;
    this._link = linkVO;
  };
  
  KakaoTalkButtonVO.prototype = {
    toJSON: function () {
      return {
        title: this._title,
        link: this._link.toJSON(),
      };
    },
  };
  
  window.mp20.vo['KakaoTalkButtonVO'] = KakaoTalkButtonVO;
})();
(function () {
  var KakaoTalkCommerceVO = function (regularPrice, discountPrice, discountRate, fixedDiscountPrice) {
    this._regularPrice = regularPrice || 0;
    this._discountPrice = discountPrice || 0;
    this._discountRate = discountRate || 0;
    this._fixedDiscountPrice = fixedDiscountPrice || 0;
  };
  
  KakaoTalkCommerceVO.prototype = {
    toJSON: function () {
      return {
        regularPrice: this._regularPrice,
        discountPrice: this._discountPrice,
        discountRate: this._discountRate,
        fixedDiscountPrice: this._fixedDiscountPrice,
      };
    },
  };
  
  window.mp20.vo['KakaoTalkCommerceVO'] = KakaoTalkCommerceVO;
})();
(function () {
  var LIMIT_TITLE_LENGTH = 100;
  
  var KakaoTalkContentVO = function (title, imageURL, kakaoLinkVO, imageWidth, imageHeight) {
    this._title = title ? title.slice(0, LIMIT_TITLE_LENGTH) : '';
    this._imageUrl = imageURL || '';
    this._link = kakaoLinkVO;
    this._imageWidth = imageWidth || '';
    this._imageHeight = imageHeight || '';
  };
  
  KakaoTalkContentVO.prototype = {
    toJSON: function () {
      var json = {
        title: this._title,
        imageUrl: this._imageUrl,
        link: this._link.toJSON(),
      };
      
      if (this._imageWidth) {
        json['imageWidth'] = this._imageWidth;
      }
      
      if (this._imageHeight) {
        json['imageHeight'] = this._imageHeight;
      }
      
      return json;
    },
  };
  
  window.mp20.vo['KakaoTalkContentVO'] = KakaoTalkContentVO;
})();
(function () {
  var KAKAO_MESSAGE_OBJECT_TYPE = {
    COMMERCE: 'commerce',
    FEED: 'feed',
  };

  var KakaoTalkShare = Object.create({
    shareCommerceMessage: function (contentVO, commerceVO, buttonVOList) {
      var data = {
        objectType: KAKAO_MESSAGE_OBJECT_TYPE.COMMERCE,
        content: contentVO.toJSON(),
        commerce: commerceVO.toJSON(),
        buttons: buttonVOList.map(function (buttonVO) {
          return buttonVO.toJSON();
        }),
      };

      this._defaultShare(data);
    },

    shareFeedMessage: function (contentVO, socialVO, buttonVOList) {
      var data = {
        objectType: KAKAO_MESSAGE_OBJECT_TYPE.FEED,
        content: contentVO.toJSON(),
        buttons: buttonVOList.map(function (buttonVO) {
          return buttonVO.toJSON();
        }),
      };

      if (socialVO) {
        data.social = socialVO.toJSON();
      }

      this._defaultShare(data);
    },

    shareScrapMessage: function (url) {
      Kakao.Link.sendScrap({
        requestUrl: url
      });
    },

    shareCustomTemplate: function (templateID, shareData) {
      Kakao.Link.sendCustom({
        templateId: templateID,
        templateArgs: {
          image: shareData.image,
          title: shareData.title,
          description: shareData.description,
          button_name: shareData.buttonName,
          url: shareData.url,
          resource: shareData.resource
        },
        installTalk: true
      });
    },

    shareStoryOrMyListTemplate: function (templateID, shareData) {
      Kakao.Link.sendCustom({
        templateId: templateID,
        templateArgs: {
          editor_image: shareData.editorImage,
          editor_name: shareData.editorName,
          view_count: shareData.viewCount,
          image: shareData.image,
          title: shareData.title,
          subtitle: shareData.subtitle,
          button_name: shareData.buttonName,
          exec_params: shareData.execParams,
          path: shareData.path
        },
        installTalk: true
      });
    },

    _defaultShare: function (data) {
      Kakao.Link.sendDefault(data);
    },
  });

  window.mp20.service['KakaoTalkShare'] = KakaoTalkShare;
})();
(function () {
  var httpApi = window.mp20.utils.HttpApi;
  var RESTAURANT_INFO_ELEMENT_ID = 'restaurant_info';

  function RestaurantSupplier() {
    this._restaurantCache = {};
  }

  RestaurantSupplier.prototype = {
    getRestaurant: function (restaurantKey) {
      if (!this._restaurantCache[restaurantKey]) {
        this._cacheRestaurant(restaurantKey, this._getRestaurant(restaurantKey));
      }

      return this._restaurantCache[restaurantKey];
    },

    getRestaurantByElement: function () {
      return new Promise(function (resolve) {
        var restaurant = this._getRestaurantByElement();

        if (!restaurant) {
          resolve();
          return;
        }

        var restaurantKey = restaurant.restaurant_key;
        this._cacheRestaurant(restaurantKey, restaurant);

        resolve(this.getRestaurant(restaurantKey));
      }.bind(this));
    },

    _cacheRestaurant: function (restaurantKey, restaurant) {
      this._restaurantCache[restaurantKey] = restaurant;
    },

    _getRestaurant: function (restaurantKey) {
      return new Promise(function (resolve) {
        var restaurantInfo = this._getRestaurantByElement();

        if (restaurantInfo) {
          resolve(restaurantInfo);
          return;
        }

        resolve(this._fetchRestaurantInfo(restaurantKey));
      }.bind(this));
    },

    _getRestaurantByElement: function () {
      var el = this._getRestaurantInfoElement();
      var restaurantInfo;

      if (!el) {
        return null;
      }

      try {
        restaurantInfo = JSON.parse(el.innerHTML);
      } catch (e) {
        restaurantInfo = null;
      }

      return restaurantInfo;
    },

    _getRestaurantInfoElement: function () {
      return document.getElementById(RESTAURANT_INFO_ELEMENT_ID);
    },

    _fetchRestaurantInfo: function (restaurantKey) {
      return httpApi.getRestaurantsByKeys(restaurantKey)
        .then(function (restaurants) {
          return restaurants[0];
        })
        .catch(function () {
          return {};
        });
    }
  };

  window.mp20.service['RestaurantSupplier'] = new RestaurantSupplier();
})();
(function () {
  var PROTOCOL = {
    HTTP: 'http',
    HTTPS: 'https'
  };

  var SUB_DOMAIN_BY_PHASE = {
    ALPHA: 'alpha-web',
    BETA: 'beta-web',
    PRODUCTION: 'www'
  };

  function URIManager(url) {
    this.url = URI(url || window.location.href);
  }

  URIManager.PHASE_BY_SUB_DOMAIN = SUB_DOMAIN_BY_PHASE;
  URIManager.prototype = {
    addQuery: function (key, value) {
      this.url.addQuery(key, value);
      return this;
    },

    removeQuery: function (keys) {
      this.url.removeQuery(keys);
      return this;
    },

    toHTTPS: function () {
      this.url.protocol(PROTOCOL.HTTPS);
      return this;
    },

    setSubDomain: function (subdomain) {
      this.url.subdomain(subdomain);
      return this;
    },

    get: function () {
      return this.url.toString();
    },

    getQuery: function () {
      return this.url.query();
    },

    getPath: function () {
      return this.url.path();
    },

    getResource: function () {
      return this.url.resource();
    },

    getProtocol: function () {
      return this.url.protocol();
    },

    getSubDomain: function () {
      return this.url.subdomain();
    },

    isSameProtocol: function (protocol) {
      return this.getProtocol() === protocol;
    },

    isSameSubDomain: function (subdomain) {
      return this.getSubDomain() === subdomain;
    },

    isHTTPURL: function () {
      return this.isSameProtocol(PROTOCOL.HTTP);
    },

    isHTTPSURL: function () {
      return this.isSameProtocol(PROTOCOL.HTTPS);
    },

    toRedirect: function () {
      window.location.href = this.get();
    },

    isAlphaSubdomain: function () {
      return this.isSameSubDomain(SUB_DOMAIN_BY_PHASE.ALPHA);
    },

    isBetaSubDomain: function () {
      return this.isSameSubDomain(SUB_DOMAIN_BY_PHASE.BETA);
    },

    isProductionSubDomain: function () {
      return this.isSameSubDomain(SUB_DOMAIN_BY_PHASE.PRODUCTION) || this.isSameSubDomain('');
    }
  };

  window.mp20.service['URIManager'] = URIManager;
})();
(function(){
	/**
	 * 네임스페이스 오브잭트.
	 * @namespace wannago_http_service
	 */
	var wannago_http_service = {};
	
	/**
	 * wannago 처리를 해주는 메서드.
	 * @param restaurant_uuid - wannago 해줄 식당의 uuid
	 * @returns {promise} - response를 담은 Promise 객체.
	 */
	wannago_http_service.wannago = function(restaurant_uuid){
	  return window.mp20.utils.HttpApi.wannago(restaurant_uuid);
	};

	/**
   * wannago를 cancel 처리 해주는 메서드.
	 * @param action_id - 캔슬할 wannago의 action_id
	 * @returns {promise} - response를 담은 Promise 객체.
	 */
	wannago_http_service.cancel_wannago = function(action_id){
    return window.mp20.utils.HttpApi.cancelWannago(action_id);
	};

	/**
	 * wannago 리스트를 가져오는 메서드.
	 * @param start_index - 가져오기 시작할 index
	 * @param request_count - 가져올 레코드 갯수.
	 * @returns {promise} - response를 담은 promise 객체.
	 */
	wannago_http_service.get_wannago_list = function(start_index, request_count){
    var auth_info = auth_service.get_auth_info();
    
		if (!auth_info) {
			return false;
		}

    return window.mp20.utils.HttpApi.getWannagoRestaurants(auth_info.member_uuid, start_index, request_count);
	};

	/**
	 * 전역객체에 바인딩.
	 */
	if(window.mp20){
		window.mp20.wannago_http_service = wannago_http_service;
	} else {
		window.mp20 = {};
		window.mp20.wannago_http_service = wannago_http_service;
	}
})();
(function(){
	/**
	 * Wannago 네임 스페이스
	 * @namespace wannago
	 */
	var wannago = {};

	wannago.list_request_count = 10;
	wannago.list_start_index = 0;
  wannago.SET_ACTION_TIMESTAMP_COOKIE_NAME = "mp_auth_last_action_timestamp";
  wannago.queue = {};

	/**
	 * wanngo 할때 사용하는 Attribute String 모음.
	 * @type {{action_id: string, restaurant_uuid: string, selected_class: string}}
	 */
	wannago.attr = {
		"action_id": "action_id",
		"restaurant_uuid": "restaurant_uuid",
		"selected_class": "selected",
		"not_wannago_btn_class": "not_wannago_btn"
	};

	wannago.action_type = {
	  wannago: 4,
    beenhere: 3,
  }

	wannago.action_types = [wannago.action_type.wannago, wannago.action_type.beenhere]

	/**
	 * wannago button의 class
	 * @type {string}
	 */
	wannago.class_name = ".wannago_btn";

  /**
   * 해당 id로 된 queue가 있는지 체크하는 메서드.
   * @param id
   * @return {boolean}
   */
	wannago.is_processing_id = function(id) {
	  return wannago.queue.hasOwnProperty(id);
  };

  /**
   * Wannago / cancel Wannago 작업을 하기전에 queue에 넣어주는 메서드.
   * @param id
   */
	wannago.process_start = function(id) {
	  if (wannago.queue[id]) {
	    return ;
    }

    wannago.queue[id] = true;
  };

  /**
   * wannago queue에서 해당 id를 지워주는 메서드.
   * @param id
   */
  wannago.process_end = function(id) {
    delete wannago.queue[id];
  }

	/**
	 * promise 처리를 공통으로 해주는 메서드.
	 * @param promise - 처리할 Promise
	 * @param success - 성공시 호출할 callback 함수.
	 */
	wannago.common_promise = function(promise, success){
		promise.then(success).catch(function(err){
			console.error(err);
		});
	};

	wannago.get_wannago_list = function(start_index, request_count){
		var list_wannago_promise = mp20.wannago_http_service.get_wannago_list(start_index, request_count);

		wannago.common_promise(list_wannago_promise, function success(wannago_list){

		});
	};

	wannago.get_wannago_count = function(){
		return $.cookie(this.attr.user_wannago_count) || 0;
	};

  wannago.set_wannago_btn = function (action, targetEl) {
    if (!action) {
      return;
    }

    var wannago_class = wannago.get_action_class(action);
    var $targetEl = $(targetEl);

    if ($targetEl.length) {
      $targetEl.addClass(wannago_class).data(wannago.attr.action_id, action.action_id);

      if (wannago_class === 'not_wannago_btn') {
        $targetEl.parent('.wannago_wrap').addClass('notPoint');
      }
    }
  }

	wannago.set_cookie_auth_last_action_timestamp = function(){
    var time_stamp = new Date().getTime();

    $.cookie(this.SET_ACTION_TIMESTAMP_COOKIE_NAME, time_stamp);
  };

	/**
	 * wannago button에 적용할 클레스를 리턴하는 메서드.
	 * @param action - action Object
	 * @returns {string} - 적용할 클레스.
	 */
	wannago.get_action_class = function(action){
		var return_class = "";

		if(action){
			if(parseInt(action.action_type) === wannago.action_type.wannago){
				return_class = "selected";
			} else if (parseInt(action.action_type) === wannago.action_type.beenhere){
				return_class = "not_wannago_btn";
			}
		}

		return return_class;
	};

	wannago.map_wannago_sync = function(){

	};

	/**
	 * Wannago Button Class에 이벤트 바인딩.
	 */
	$(document).on("click", wannago.class_name, function (e) {
    e.preventDefault();
    e.stopPropagation();
    handleClickWannago($(e.currentTarget))
  });

  function handleClickWannago($wannago_btn) {
      var action_id = $wannago_btn.data(wannago.attr.action_id);
      var page_name = $wannago_btn.data("page_name");
      var wannago_ga_event_name = $wannago_btn.data("wannago_ga_event_name");
      var restaurant_uuid = $wannago_btn.data(wannago.attr.restaurant_uuid);
      var $same_wannago_btn_list;

    if ($wannago_btn.hasClass(wannago.attr.not_wannago_btn_class)) {
      return false;
    }

    if (!window.is_login) {
      if (is_mobile_viewport()) {
        window.mp20.wannago_popup.wannago_sign_popup.open();
      } else {
        window.mp_login_layer.open_layer();
      }

      auth_service.set_before_wannago(restaurant_uuid);
      return false;
    }

    if (wannago.is_processing_id(restaurant_uuid)) {
      return;
    }
    wannago.process_start(restaurant_uuid);

    $same_wannago_btn_list = $(wannago.class_name + "[data-restaurant_uuid=" + restaurant_uuid + "]");

    /**
     * action_id가 있으면 cacenl_wannago를 하고
     * action_id가 없으면 wannago를 한다.
     */
    if (trim(action_id)) {
      //가고싶다 취소 처리.
      common_ga(page_name || get_now_page_code(), "CLICK_UNWANNAGO");
      var cancel_wannago_promise = mp20.wannago_http_service.cancel_wannago(action_id);

      $same_wannago_btn_list.each(function () {
        $(this).removeClass(wannago.attr.selected_class);
      });

      wannago.common_promise(cancel_wannago_promise, function (data) {
        $wannago_btn.data(wannago.attr.action_id, "");
        wannago.set_cookie_auth_last_action_timestamp();
        wannago.process_end(restaurant_uuid);
      });
    } else {
      //가고싶다 처리.
      common_ga(page_name || get_now_page_code(), wannago_ga_event_name || wannago_ga_event_name || "CLICK_WANNAGO");
      var wannago_promise = mp20.wannago_http_service.wannago(restaurant_uuid);

      $same_wannago_btn_list.each(function () {
        $(this).addClass(wannago.attr.selected_class);
      });

      wannago.common_promise(wannago_promise, function (wannago_info) {
        wannago.set_cookie_auth_last_action_timestamp();

        $(wannago.class_name + "[data-restaurant_uuid=" + restaurant_uuid + "]").each(function (index, $el) {
          $(this).data(wannago.attr.action_id, wannago_info.action_id);
        });

        $wannago_btn.data(wannago.attr.action_id, wannago_info.action_id);
        wannago.process_end(restaurant_uuid);
      });
    }
  }

	if(auth_service.get_auth_info()){
		auth_service.add_before_wannago();
	} else {
		auth_service.reset_before_wannago();
	}

	wannago.handleClickWannago = handleClickWannago;
	/**
	 * 전역객체에 바인딩.
	 */
	if(window.mp20){
		window.mp20.wannago_service = wannago;
	} else {
		window.mp20 = {};
		window.mp20.wannago_service = wannago;
	}
})();
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//





















































;
(function(){
	image_error.$inject = ["MP_CONSTANTS"];
	angular.module("mp20App").directive("imageError", image_error);

	function image_error(MP_CONSTANTS){
		return {
			link: function(scope, element, attrs) {
				var image_type = attrs.imageType.toUpperCase() || "RESTAURANT";

				if(!attrs.src){
					attrs.$set('src', MP_CONSTANTS.ERROR_IMAGE[image_type]);
				}

				element.bind('error', function() {
					$(element).attr("src", MP_CONSTANTS.ERROR_IMAGE[image_type]);
				});
			}
		};
	}
})();
angular.module("mp20App")
    .directive("imageTag", imageTag);

function imageTag() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      pictureUrl: "=",
      alt: "@",
      class_name: "@class"
    },
    templateUrl: "/assets/directive/image_tag.html.erb"
  }
}
;
(function(){
  function MapInterface(param, callback){
    this.implements = [window.mp20.naver_map, window.mp20.google_map];
    var locale = get_locale();
    var process_arr = this.get_process_arr(),
      process_function = process_arr[locale][typeof param];

    process_function(param, callback);
  }

  MapInterface.SERVICE_NAME = {
    NAVER: 'naver',
    GOOGLE: 'google'
  }

  MapInterface.prototype = {
    get_process_arr: function(){
      var process_arr_ko = [];
      var process_arr_foreign = [];

      process_arr_ko["object"] = function(inplementObject, callback){
        this.inplementObject = inplementObject;

        if(_.isFunction(callback)){
          callback(inplementObject);
        }
      }.bind(this);

      process_arr_ko["boolean"] = function(bool, callback){
        if(bool){
          // 상속 받을때.
        } else {
          // limit에 맞춰서 자동으로 로딩.
          var result_promise;

          var naver_instance = new window.mp20.naver_map();
          result_promise = naver_instance._get_script();

          result_promise.then(function(instance){
            this.inplementObject = instance;
            callback(instance);
          });
        }
      }.bind(this);

      process_arr_ko["undefined"] = function(){

      };


      process_arr_foreign["object"] = function(inplementObject, callback){
        this.inplementObject = inplementObject;

        if(_.isFunction(callback)){
          callback(inplementObject);
        }
      }.bind(this);

      process_arr_foreign["boolean"] = function(bool, callback){
        if(bool){
          // 상속 받을때.
        } else {
          var google_instance = new window.mp20.google_map(),
            google_promise = google_instance._get_script();

          google_promise.then(function(instance){
            this.inplementObject = instance;
            callback(instance);
          });
        }
      }.bind(this);

      process_arr_foreign["undefined"] = function(){

      };

      return {
        ko: process_arr_ko,
        en: process_arr_foreign,
        zh: process_arr_foreign
      };
    },

    get_service_name: function() {
      return this.inplementObject.service_name;
    },

    init: function(selector, marker_info, option){
      this.inplementObject._init(selector, marker_info, option);
    },

    make_map: function(selector, latlng){
      this.inplementObject._make_map(selector, latlng);
    },

    make_latlng: function(latlng){
      this.inplementObject._make_latlng(latlng);
    },

    add_marker: function(marker_info){
      this.inplementObject._add_marker(marker_info);
    },

    set_bounds: function(marker_info){
      this.inplementObject._set_bounds(marker_info);
    },

    set_info_window: function(){
      this.inplementObject._set_info_window();
    },

    make_info_window: function(){
      this.inplementObject._make_info_window();
    },

    make_info_obj: function(lat, lng, name, rating, official_rating_available, subcuisine, metro, action, restaurant_uuid, restaurant_key, review_count, wannago_count, picture_url){
      return this.inplementObject._make_info_obj(lat, lng, name, rating, official_rating_available, subcuisine, metro, action, restaurant_uuid, restaurant_key, review_count, wannago_count, picture_url);
    },

    hide_info_window: function(){
      this.inplementObject._hide_info_window();
    },

    hide_marker: function(){
      this.inplementObject._hide_marker();
    },

    bind_marker_click_event: function(marker, callback){
      this.inplementObject._bind_marker_click_event(marker, callback);
    },

    bind_map_event: function(event_name, callback, map){
      this.inplementObject._bind_map_event(event_name, callback, map);
    },

    use_api: function(callback){
      return this.inplementObject._use_api(callback);
    },

    parse_array: function(obj){
      return this.inplementObject._parse_array(obj);
    },

    create_static_map: function(selector, lat, lng, option){
      return this.inplementObject._create_static_map(selector, lat, lng, option);
    },

    resize_map: function(size){
      return this.inplementObject._resize_map(size);
    },

    get_bounds: function(){
      return this.inplementObject._get_bounds();
    },

    get_script: function(callback){
      this.inplementObject._get_script(callback);
    },

    set_center: function (lat, lng) {
      this.inplementObject.set_center(lat, lng);
    }
  };

  if (window.mp20){
    window.mp20.MapInterface = MapInterface;
  } else {
    window.mp20 = {};
    window.mp20.MapInterface = MapInterface;
  }
})();
(function() {
  var CONSTANTS = {
    STATIC_MAP_HOST: "https://naveropenapi.apigw.ntruss.com/map-static/v2/raster",
    STATIC_MAP_ZOOM_LEVEL: 16,
    STATIC_MAP_SCALE: 2,
    STATIC_MAP_KEY: "AIzaSyDa1oMWcI7Up7rw6bpbfE5BLGskPjB-4XM"
  };

  /**
   * 네임스페이스
   * @type {Object}
   */
  function GoogleMap() {
    this.service_name = 'google';
    /**
     * 초기화 함수.
     */
    this._init = function(selector, marker_info, option) {
      /**
       * 다음지도의 기본 정보 및 실제 객체들이 세팅 되는 객체.
       * @type {{zoom: number, marker_list: Array, map: null}}
       */
      this.info = {
        "zoom": 16,
        "marker_list": [],
        "info_window_list": [],
        "map": null,
        "info_window_template_id": "map_info_window_template",
        "marker_image": 'https://d1jrqqyoo3n46w.cloudfront.net/web/resources/4eewowfvvde0l9mz.png',
        "options": null
      };

      this.info_window_html = document.getElementById(this.info.info_window_template_id).innerHTML;
      option = option || {};
      this.info.marker_list = [];
      this.info.info_window_list = [];

      this.info.options = option;

      var latlng;

      if(Array.isArray(marker_info)) {
        latlng = marker_info[0];
      } else {
        latlng = marker_info;
      }

      if(!latlng) {
        latlng = {
          "lat": "37.4990328",
          "lng": "127.0357378"
        };
        this._make_map(selector, latlng);
        return false;
      }

      /**
       * info Window에서 사용 할 template 문법 재정의.
       * hello! {{ name }} 과 같은 형식으로 변경.
       */
      _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
      };

      this._make_map(selector, latlng);
      this._add_marker(this.info.map, marker_info, option.onMarkerClickCallback);

      if(marker_info.length > 1) {
        this._set_bounds(marker_info);
      }

			this._bind_map_click_evnet(this.info.map, function(){
				this._hide_info_window();
			}.bind(this));

      //drgg event bind
      if(typeof option.drag_event_function === "function") {
        this._bind_drag_event(option.drag_event_function);
      }
    };

    this._make_map = function(selector, option) {
      var container = document.querySelector(selector);

      this.info.map = new google.maps.Map(container, {
        center: {lat: parseFloat(option.lat), lng: parseFloat(option.lng)},
        scrollwheel: _.isUndefined(this.info.options.scrollWheel) ? true : this.info.options.scrollWheel,
        zoom: this.info.zoom,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: _.isUndefined(option.zoomControl) ? true : option.zoomControl,
        zoomControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT
        },
      });

      this.info.map.addListener('click', function() {
        common_ga(get_now_page_code(), "CLICK_MAP");
      });

      this.info.map.addListener('dragstart', function() {
        common_ga(get_now_page_code(), "CLICK_MAP_DRAG");
      });

      // TODO: Zoom Controller Add
    };

    this._make_latlng = function(latlng) {
      return {
        "lat": parseFloat(latlng.lat),
        "lng": parseFloat(latlng.lng)
      };
    };

    this._add_marker = function(map, marker_info, callback) {
      marker_info = this._parse_array(marker_info);

      _.each(marker_info, function(marker_i) {
        var marker = new google.maps.Marker({
          map: this.info.map,
          position: this._make_latlng(marker_i),
          icon: this.info.marker_image
        });

        this.info.marker_list.push(marker);

        if(!this.info.options.not_set_open_window) {
          this._bind_marker_click_event(marker, function () {
            if (_.isFunction(callback)) {
              callback();
            }

            this._set_info_window(marker_i, marker);
          }.bind(this));
        }

        marker.setMap(map);

        this.info.marker_list.push(marker);
      }.bind(this));
    };

    this._set_bounds = function(marker_info) {
      var bounds = new google.maps.LatLngBounds();

      marker_info = this._parse_array(marker_info);

      _.each(marker_info, function(item) {

        if(!(item instanceof google.maps.LatLng)) {
          item = this._make_latlng_google(item);
        }

        bounds.extend(item);
      }.bind(this));

      this.info.map.fitBounds(bounds);
    };

    this._set_info_window = function(info_obj, marker) {
      if (is_mobile_viewport()) {
        return false;
      }

      var info_window_compiled = _.template(this.info_window_html, {
        "imports": {
          "get_action_class": window.mp20.wannago_service.get_action_class,
          "get_action_id": function(action) {
            var action_id = "";

            if(action) {
              action_id = action.action_id;
            }

            return action_id;
          }
        }
      })(info_obj);

      var infowindow = new google.maps.InfoWindow({
        content: info_window_compiled,
        maxWidth: 500,
        maxheight: 140
      });
      this._hide_info_window();

      this.info.info_window_list.push(infowindow);

      infowindow.open(this.info.map, marker);
    };

    this._make_info_window = function() {

    };

    this._hide_info_window = function() {
      _.each(this.info.info_window_list, function(info_window) {
        info_window.close();
      });

      this.info.info_window_list = [];
    };

    this._make_info_obj = function(lat, lng, name, rating, official_rating_available, subcuisine, metro, action, restaurant_uuid, restaurant_key, review_count, wannago_count, picture_url) {
      if(rating) {
        rating = parseFloat(rating).toFixed(1);
      } else {
        rating = "";
      }

      return {
        "lat": lat,
        "lng": lng,
        "name": name,
        "rating": rating,
        "official_rating_available": official_rating_available,
        "action": action,
        "subcuisine": subcuisine,
        "metro": metro,
        "restaurant_uuid": restaurant_uuid,
        "restaurant_key": restaurant_key,
        "review_count": review_count,
        "wannago_count": wannago_count,
        "picture_url": picture_url
      };
    };

    this._hide_marker = function() {

    };

    this._bind_marker_click_event = function(marker, callback) {
      marker.addListener('click', function() {
        callback();
      });
    };

    this._use_api = function(callback) {
      var result;

      function google_map_limit_check() {
        return (!window.google);
      }

      if(google_map_limit_check()) {
        var map_class = ".map_wrap";

        $(".btn-map").hide();
        $(map_class).hide();
        return false;
      } else {
        result = callback();
      }

      return result;
    };

    this._parse_array = function(obj) {
      if(!Array.isArray(obj)) {
        obj = [obj];
      }

      return obj;
    };

    this._make_latlng_google = function(latlng) {
      return new google.maps.LatLng(latlng.lat, latlng.lng);
    };

    this._bind_drag_event = function(event_callback) {
      this.info.map.addListener("drag", event_callback);
    };

    this._resize_map = function() {
      google.maps.event.trigger(this.info.map, "resize");
    };

    this._get_bounds = function() {
      var bounds = this.info.map.getBounds(),
          sw = bounds.getSouthWest(),
          ne = bounds.getNorthEast(),
          swne = {};

      swne.sw = sw.lat() + ", " + sw.lng();
      swne.ne = ne.lat() + ", " + ne.lng();

      return swne;
    };

    this._bind_map_click_evnet = function(map, callback) {
      map.addListener("click", callback);
    }

    this._get_script = function(callback) {
      var script_url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDa1oMWcI7Up7rw6bpbfE5BLGskPjB-4XM";

      var promise = new Promise(function(resolve, reject) {
        if(window.google){
          resolve(new window.mp20.MapInterface(new window.mp20.google_map()));
        } else {
          $.getScript(script_url, function(data, textStatus, jqxhr) {
            if(parseInt(jqxhr.status) === 200) {
              var new_instance = new window.mp20.MapInterface(new window.mp20.google_map());
//						callback(new_instance);
              resolve(new_instance);
            } else {
              reject();
            }
          });
        }
      });

      return promise;
    };


    this._create_static_map = function(selector, lat, lng, option) {
      var $selector = $(selector);

      var google_static_map_address = this._get_static_map_image_url({
        width: option.width,
        height: option.height,
        lat: lat,
        lng: lng
      });
      var $img = $("<img class='static_map " + (option.class_name || '') + "' src='" + google_static_map_address + "' alt='google_map_image'/>");

      if (option.class_name) {
        $img.addClass(option.class_name);
      }

      $selector.append($img);

      return $selector;
    };

    this._get_static_map_image_url = function (params) {
      var url = "https://maps.googleapis.com/maps/api/staticmap?"
      url += "center=" + params.lat + "," + params.lng;
      url += "&zoom=" + CONSTANTS.STATIC_MAP_ZOOM_LEVEL;
      url += "&size=" + params.width + "x" + params.height
      url += "&scale=" + CONSTANTS.STATIC_MAP_SCALE;
      url += "&key=" + CONSTANTS.STATIC_MAP_KEY;

      return url;
    }

    /**
     * Map 객체에 Evnet를 바인딩 해주는 메서드
     * @param event_name - event name
     * @param callback - event callback function
     * @param map - event target map
     * @private
     */
    this._bind_map_event = function(event_name, callback, map){
      map = map || this.info.map;

      if(!map){
        return false;
      }

      if(map instanceof $) {
        // is Jquery Element
        // Static Map Case
        map.on(event_name, callback);
      } else {
        // is google map object
        map.addListener(event_name, callback);
      }
    }

    this.set_center = function (lat, lng) {
      var latlng = this._make_latlng({
        lat: lat,
        lng: lng
      });

      latlng = this._make_latlng_google(latlng);
      this.info.map.setCenter(latlng);
    }
  }


  if(window.mp20) {
    window.mp20.google_map = GoogleMap;
  } else {
    window.mp20 = {};
    window.mp20.google_map = GoogleMap;
  }

  GoogleMap.prototype = new window.mp20.MapInterface();
})();
(function(){
  var CONSTANTS = {
    STATIC_MAP_HOST: "https://naveropenapi.apigw.ntruss.com/map-static/v2/raster",
    STATIC_MAP_ZOOM_LEVEL: 15,
    STATIC_MAP_SCALE: 2
  };

  function NaverMap(){
    this.service_name = 'naver';
    this.markers = [];
    this.info_windows = [];
    this.option = {};

    /**
     * 초기화 메서드
     * @param selector - Map을 init할 Selector
     * @param marker_info - 표시할 Marker info
     * @param option - Map init시 사용할 option 값
     * @private
     */
    this._init = function(selector, marker_info, option){
      this.info_window_template = _.template($("#map_info_window_template").html());
      this.map = this._make_map(selector, option);
      this.option = option;

      if(!_.isEmpty(marker_info)){
        this._add_marker(marker_info, undefined, option.onMarkerClickCallback);
        this._set_bounds(marker_info);
      }

      this.bind_event();
      this._off_options(option, this.map);
    };

    /**
     * Naver MAP API Script를 Load하는 메서드
     * @returns {promise} - http status를 담은 Promise
     * @private
     */
    this._get_script = function(){
      var script_url = "//openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=vzt6er0j7l";

      function get_naver_script_promise(resolve, reject){
        function get_script(data, textStatus, jqxhr){
          var status_code = parseInt(jqxhr.status);
          var is_success_response = status_code >= 200 && status_code < 300;

          if(is_success_response){
            var new_instance = new window.mp20.MapInterface(new window.mp20.naver_map());
            resolve(new_instance);
          } else {
            reject();
          }
        }

        $.getScript(script_url, get_script);
      }

      return new Promise(get_naver_script_promise);
    };

    /**
     * map을 실제로 draw해주는 메서드
     * @param selector - darw할 DOM Element.
     * @param option
     * @private
     */
    this._make_map = function(selector, option){
      selector = document.querySelector(selector);

      var mapOptions = {
        center: new naver.maps.LatLng(option.lat, option.lng),
        zoom: 11,
        mapDataControl: false,
        scaleControl: _.isUndefined(option.scaleControl) ? true : option.scaleControl,
        zoomControl: _.isUndefined(option.zoomControl) ? true : option.zoomControl,
        scrollWheel: _.isUndefined(option.scrollWheel) ? true : option.scrollWheel,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.LARGE,
          position: naver.maps.Position.TOP_RIGHT
        }
      };

      return new naver.maps.Map(selector, mapOptions);
    };

    /**
     * LatLng 객체를 반환하는 메서드.
     * @param latlng
     */
    this._make_latlng = function(latlng){
      return new naver.maps.LatLng(latlng.lat, latlng.lng);
    };

    /**
     * 지도에 Marker를 추가하는 메서드.
     * @param marker_info - 마커 정보를 담은 객체.
     */
    this._add_marker = function(marker_info, map, callback) {
      marker_info = this._parse_array(marker_info);

      marker_info.forEach(function(marker_i) {
        var marker = new naver.maps.Marker({
          position: this._make_latlng(marker_i),
          map: map || this.map,
          icon: {
            url: "https://mp-seoul-image-production-s3.mangoplate.com/web/resources/ikpswdksy8bnweeq.png?fit=around|*:*&crop=*:*;*,*&output-format=png&output-quality=80",
            size: new naver.maps.Size(25, 35),
            origin: new naver.maps.Point(0, 0),
            scaledSize: new naver.maps.Size(25, 35)
          }
        });

        if(!this.option.not_set_open_window){
          this._bind_marker_click_event(marker, marker_i, callback);
        }

        this.markers.push(marker);
      }.bind(this));
    };

    /**
     * 마커에 클릭 이벤트를 바인딩 하는 메서드.
     * @param marker - 이벤트를 바인딩할 마커.
     * @param callback - click시 실행될 callback 함수.
     */
    this._bind_marker_click_event = function(marker, marker_info, callback) {
      var template = this.info_window_template(marker_info);

      var infowindow = new naver.maps.InfoWindow({
        content: template
      });

      this.info_windows.push(infowindow);

      naver.maps.Event.addListener(marker, "click", function(e) {
        if (_.isFunction(callback)) {
          callback();
        }

        if (is_mobile_viewport()) {
          return ;
        }

        if (infowindow.getMap()) {
          infowindow.close();
        } else {
          infowindow.open(this.map, marker);
        }
      }.bind(this));
    };

    /**
     * 맵을 마커가 모두 보이는 위치로 이동시켜주는 메서드.
     * @param marker_info - 마커 정보.
     * @private
     */
    this._set_bounds = function(marker_info) {
      if(!Array.isArray(marker_info)){
        this.map.setCenter(this._make_latlng(marker_info));
        return false;
      }

      var latlngArr = _.map(marker_info, function(marker_i){
        return [marker_i.lng, marker_i.lat];
      });
      var latlngArrCount = latlngArr.length;

      if(latlngArrCount > 1){
        this.map.fitBounds(latlngArr);
      } else if (latlngArrCount === 1) {
        this.map.setCenter(this._make_latlng(marker_info[0]));
      }
    };

    /**
     * info window를 모두 닫는 메서드.
     */
    this._hide_info_window = function(){
      _.each(this.info_windows, function(info_window){
        info_window.close();
      });
    };

    /**
     * 전체적인 이벤트를 바인딩 해주는 메서드
     */
    this.bind_event = function(){
      this._bind_map_click_evnet(this.map);


      if(this.option.drag_event_function){
        naver.maps.Event.addListener(this.map, "dragend", this.option.drag_event_function);
      }
    };

    /**
     * Map에 클릭 이벤트를 바인딩 해주는 메서드.
     * @param map - click event를 바인딩할 지도.
     */
    this._bind_map_click_evnet = function(map) {
      naver.maps.Event.addListener(map, "click", function(){
        this.info_windows.forEach(function(info_window) {
          info_window.close();
        });
      }.bind(this));
    };

    /**
     * 해당 객체를 Array로 wrap해주는 메서드.
     * @param obj - Array로 wrap할 값.
     * @returns {Array} - wrap한 Array.
     */
    this._parse_array = function(obj){
      if(!Array.isArray(obj)){
        obj = [obj];
      }

      return obj;
    };

    /**
     * API 사용시 호출하는 Proxy 함수.
     * @param callback
     * @returns {boolean}
     */
    this._use_api = function(callback){
      return callback();
    };

    this._make_info_obj = function(lat, lng, name, rating, official_rating_available, subcuisine, metro, action, restaurant_uuid, restaurant_key, review_count, wannago_count, picture_url) {
      if(rating) {
        rating = parseFloat(rating).toFixed(1);
      } else {
        rating = "";
      }

      return {
        "lat": lat,
        "lng": lng,
        "name": name,
        "rating": rating,
        "official_rating_available": official_rating_available,
        "action": action,
        "subcuisine": subcuisine,
        "metro": metro,
        "restaurant_uuid": restaurant_uuid,
        "restaurant_key": restaurant_key,
        "review_count": review_count,
        "wannago_count": wannago_count,
        "picture_url": picture_url || mp.module.constants.ERROR_IMAGE.RESTAURANT
      };
    };

    /**
     * Static Map Image Element를 append 해주는 method.
     * @param selector - 지도를 만들 Element
     * @param lat - lat
     * @param lng - lng
     * @param option
     * @private
     */
    this._create_static_map = function(selector, lat, lng, option){
      var $selector = $(selector);
      var naver_static_map_address = this._get_static_map_image_url({
        width: option.width,
        height: option.height,
        lat: lat,
        lng: lng
      });
      var $img = $("<img class='naver_static_map' src='" + naver_static_map_address + "' alt='naver_map_image' />");

      if (option.class_name) {
        $img.addClass(option.class_name);
      }

      $selector.append($img);

      return $selector;
    };

    this._get_static_map_image_url = function (params) {
      var url = CONSTANTS.STATIC_MAP_HOST + "?";
      url += "X-NCP-APIGW-API-KEY-ID=vzt6er0j7l";
      url += "&X-NCP-APIGW-API-KEY=rGndKFtWTmPVJk1HgKy15Yt3YdD8RB6XEin7RZFs";
      url += "&center=" + params.lng + "," + params.lat;
      url += "&level=" + CONSTANTS.STATIC_MAP_ZOOM_LEVEL;
      url += "&w=" + params.width;
      url += "&h=" + params.height;
      url += "&scale=" + CONSTANTS.STATIC_MAP_SCALE;
      url += "&baselayer=default";

      return url;
    }

    /**
     * Naver Map 객체에 Evnet를 바인딩 해주는 메서드
     * @param event_name - event name
     * @param callback - event callback function
     * @param map - event target map
     * @private
     */
    this._bind_map_event = function(event_name, callback, map){
      map = map || this.map;

      if(map){
        naver.maps.Event.addListener(map, event_name, callback);
      }
    };

    this._off_map_interation = function(map){
      map = map || this.map;

      if(!map){
        return false;
      }

      if(map.getOptions("draggable")){
        map.setOptions({
          draggable: false,
          pinchZoom: false,
          scrollWheel: false,
          keyboardShortcuts: false,
          disableDoubleTapZoom: true,
          disableDoubleClickZoom: true,
          disableTwoFingerTapZoom: true
        });
      }
    };

    this._off_options = function(off_options, map){
      map = map || this.map;

      for(var key in off_options){
        if(off_options.hasOwnProperty(key) && off_options[key] === false){
          map.setOptions(key, false);
        }
      }
    };

    this._get_bounds = function(map){
      map = map || this.map;

      var bounds = map.getBounds();

      return {
        sw: bounds._sw._lat + ", " +  bounds._sw._lng,
        ne: bounds._ne._lat + ", " + bounds._ne._lng
      }
    };

    this._resize_map = function(size){
      this.map.setSize(size);
    }

    this.set_center = function(lat, lng){
      var latlng = new naver.maps.LatLng(lat, lng);
      this.map.setCenter(latlng);
    };
  }

  /**
   * 전역객체에 바인딩.
   */
  if(window.mp20){
    window.mp20.naver_map = NaverMap;
  } else {
    window.mp20 = {};
    window.mp20.naver_map = NaverMap;
  }

  NaverMap.prototype = new window.mp20.MapInterface();

})();
(function(){
	mp20_restaurant_controller.$inject = ["$scope", "$rootScope", "mp20_util_service", "mp20_restaurant_http_service", "mp20_restaurant_info_service", "mp20_common_code_service", "$q", "$compile", "$sce", "mp20_gallery_service", "mp20_map_popup_service", "$window"];
	angular.module("mp20App").controller("mp20_restaurant_controller", mp20_restaurant_controller);

	function mp20_restaurant_controller($scope, $rootScope, mp20_util_service, mp20_restaurant_http_service, mp20_restaurant_info_service, mp20_common_code_service, $q, $compile, $sce, mp20_gallery_service, mp20_map_popup_service, $window){
		var visible_translate_btn = nameSpace('mp20.visible_translate_btn');

		/**
		 * ajax 호출 중인지 여부를 알려주는 변수.
		 * @type {boolean}
		 */
		$scope.ajaxing = false;

		$scope.no_insta = false;

		/**
		 * 식당 정보가 담기는 object
		 * @type {object}
		 */
		$scope.restaurant_info = null;

		/**
		 * 관련 키워드 $scope value
		 * @type {Array}
		 */
		$scope.keywords = [];

		/**
		 * near by popular restaurant list value
		 * @type {Array}
		 */
		$scope.nearby_popular_restaurant_list = [];

		/**
		 * 인스타그램 공식 사진 리스트.
		 * @type {Array}
		 */
		$scope.insta_offical_pictures = [];

		/**
		 * 인스타그램 tag로 검색한 사진 리스트.
		 * @type {Array}
		 */
		$scope.insta_tagged_pictures = [];

		/**
		 * instagram picture list value
		 * @type {Array}
		 */
		$scope.instagram_pictures = [];

		$scope.instagram_picture_list = [];

		$scope.restaurant_all_picture = [];

		$scope.restaurant_menu_picture = [];

		$scope.restaurant_picture_length = 5;
		$scope.menu_picture_length = 4;
		$scope.instagram_picture_length = 9;
		$scope.main_picture_limit = 5;

		$scope.picture_limit = 5;

		$scope.bottom_keyword_limit = 10;
		$scope.action_values = undefined;
		$scope.page_locale = $rootScope.page_locale;
		$scope.restaurant_wrap = "";

		$scope.thumb_size = mp20_restaurant_info_service.thumb_size;
		$scope.empty_image = mp20_restaurant_info_service.empty_image;
		$scope.recommend_list = mp20_restaurant_info_service.recommend_list;
		$scope.init = init;
		$scope.get_restaurant_info = get_restaurant_info;
		$scope.get_pictures = get_pictures;
		$scope.from_date = mp20_restaurant_info_service.diff_date_formatting;
		$scope.get_recommend_class_name = mp20_restaurant_info_service.get_recommend_class_name;
		$scope.get_recommend_message = mp20_restaurant_info_service.get_recommend_message;
		$scope.get_rating = mp20_restaurant_info_service.get_rating;
		$scope.get_background = mp20_restaurant_info_service.get_background;
		$scope.get_user_background = mp20_restaurant_info_service.get_user_background;
		$scope.get_picture_url_by_akamai = $window.get_picture_url_by_akamai;
		$scope.get_full_picture_url_by_akamai = $window.get_full_picture_url_by_akamai;
		$scope.get_user_picture_url_by_akamai = $window.get_user_picture_url_by_akamai;
		$scope.get_wannago_text = window.get_wannago_text;
		$scope.number_comma = window.number_comma;
		$scope.open_photo_viewer = open_photo_viewer;
		$scope.get_restaurant_wrap = get_restaurant_wrap;
		$scope.open_menu_picture = open_menu_picture;
		$scope.encodeURIComponent = window.encodeURIComponent;
		$scope.get_ab_test_message = get_ab_test_message;
		$scope.str_cut = window.str_cut;
    $scope.mp20_gallery_open = mp20_gallery_open;
    $scope.slickOnInit = slickOnInit;
    $scope.is_translate_btn_show = visible_translate_btn.is_show;
    $scope.$window = $window;
    var featuredPictureSlider = (function () {
      var $featuredPictureSlider = $('.list-photo_wrap');
      var currentViewport;
      var isInitializeSlider = false;
      var VIEWPORT = {
        MOBILE: 'mobile',
        DESKTOP: 'desktop'
      }

      function setCurrentViewport() {
        currentViewport = is_mobile_viewport() ? VIEWPORT.MOBILE : VIEWPORT.DESKTOP;
      }

      function init() {
        setCurrentViewport();

        if (currentViewport === VIEWPORT.DESKTOP) {
          initializeSlider();
        }

        bindResizeEvent();
      }

      function initializeSlider() {
        $featuredPictureSlider.owlCarousel({
          "pagination": false,
          'itemsDesktop': [1400, 4],
          'itemsDesktopSmall': [979, 3],
          'itemsMobile': [768, 2],
          'navigation': true,
          'navigationText': ['<button class="btn-nav prev"></button>', '<button class="btn-nav next"></button>'],
          "afterInit": function(){
            $(".btn-nav.prev").hide();
          },
          "afterMove": function() {
            if (this.currentItem) {
              $(".btn-nav.prev").show();
              $(".btn-nav.next").hide();
            } else {
              $(".btn-nav.prev").hide();
              $(".btn-nav.next").show();
            }
          }
        });
        isInitializeSlider = true;
      }

      function bindResizeEvent() {
        $(window).on('resize', _.throttle(handleResize, 100));
      }

      function handleResize() {
        setCurrentViewport();

        if (is_mobile_viewport()) {
          if (isInitializeSlider) {
            destroy();
          }
        } else {
          if (!isInitializeSlider) {
            initializeSlider();
          }
        }
      }

      function destroy() {
        var owlCarousel = $featuredPictureSlider.data('owlCarousel');
        owlCarousel.destroy();
        $featuredPictureSlider.removeClass("owl-carousel");
        isInitializeSlider = false;
      }

      return {
        init: init
      }
    })();

    angular.element(document).ready(function(){
      var featuredPictureCount = $(".list-photo").length;

      if (featuredPictureCount){
        featuredPictureSlider.init();
      }

      $scope.init();
    });

		/**
		 * 초기화 함수.
		 */
		function init(){
      var $page_wrapper = $scope.get_restaurant_wrap();

      $scope.get_restaurant_info()
        .then(function (restaurant) {
          if (!restaurant) {
            throw new Error('restaurant is not found');
          }

          $scope.restaurant_info = restaurant;

          if (restaurant.action) {
            window.mp20.wannago_service.set_wannago_btn(restaurant.action, $(".wannago_btn"));
          }

          //metro와 subcuisine 세팅.
          restaurant.metro_code_str = $page_wrapper.data("metro_str");
          restaurant.subcuisine_code_str = $page_wrapper.data("subcuisine_code_str");
          restaurant.price_code_str = $page_wrapper.data("price_str");
          restaurant.parking_code_str = $page_wrapper.data("parking_str");

          return restaurant;
        })
        .then(function(restaurant){
          if (is_foreign_restaurant(restaurant.region_code)) {
            var google_map = new mp20.google_map();

            google_map._get_script()
              .then(function (google_map) {
                static_map_maker(google_map);
              });
          } else {
            new window.mp20.MapInterface(false, set_map);
          }

          init_branch(restaurant.restaurant_uuid);

          function set_map(map_obj) {
            var mapInterface = window.mp20.MapInterface;

            bind_map_click_event();

            switch (map_obj.get_service_name()) {
              // TODO: service name 상수화
              case mapInterface.SERVICE_NAME.GOOGLE:
                static_map_maker(map_obj);
                return;

              case mapInterface.SERVICE_NAME.NAVER:
                break;
            }

            var is_mobile = is_mobile_viewport();
            var target_el = is_mobile ? '.Restaurant__InfoItemMapContainer' : ".map-container";
            var layer = document.createElement('div');
            layer.classList.add('map_layer');

            document.querySelector(target_el).appendChild(layer);
            map_obj.init(target_el, null, {
              lat: restaurant.latitude,
              lng: restaurant.longitude,
              draggable: false,
              zoomControl: false,
              scaleControl: false,
              "open_info_window_index": 0,
              "onMarkerClickCallback": function() {
                common_ga('PG_MAP', "CLICK_MARKER")
              }
            });
          }

          function static_map_maker(callback_map_obj) {
            callback_map_obj.use_api(function () {
              var $target = $(".Restaurant__InfoItemMapContainer");
              var is_mobile = is_mobile_viewport();
              var target_el = is_mobile ? $target : ".map-container";
              var options = {};

              if (is_mobile) {
                var targetWidth = $target.width();
                var height_radio = 0.281;

                options.width = targetWidth;
                options.height = parseInt(targetWidth * height_radio);
              } else {
                options.width = 400;
                options.height = 328;
              }

              callback_map_obj.create_static_map(target_el, restaurant.latitude, restaurant.longitude, options);
            });
          }
        });

      show_last_image();
		}

    function show_last_image(){
		  var $list_pictures = $(".list-photo");

      if ($list_pictures.length >= $scope.restaurant_picture_length) {
        $list_pictures.last().find(".last_image").show();
      }
    }

		function get_restaurant_info() {
      return window.mp20.service.RestaurantSupplier.getRestaurantByElement();
		}

    function slickOnInit(){
      $scope.refreshing = true;
      $scope.$apply();
      $scope.refreshing = false;
      $scope.$apply();
    };

    /**
		 * 레스토랑 사진들을 가져오는 메서드.
		 * @param restaurant_key - 레스토랑 key.
		 */
		function get_pictures(restaurant_key){
			var pictures_promise = mp20_restaurant_http_service.get_pictures(restaurant_key);

			mp20_util_service.common_promise(pictures_promise, function success(restaurant_pictures){
				if ($scope.restaurant_picture_length > restaurant_pictures.length){

				} else {
					$scope.restaurant_pictures = restaurant_pictures;
					$scope.restaurant_pictures_main = restaurant_pictures.slice(0, $scope.main_picture_limit);
				}
			});
		}

		function get_restaurant_wrap(){
			var restaurant_wrap;

			if ($scope.restaurant_wrap){
				restaurant_wrap = $scope.restaurant_wrap;
			} else {
				restaurant_wrap = $scope.restaurant_wrap = $('.pg-restaurant');
			}

			return restaurant_wrap;
		}

		/**
		 * picture Viewer를 열어주는 메서드.
		 * @param index - Open할 사진 index
		 */
		function open_photo_viewer(index, tab_name){
			var last_index = 4;
      var restaurant_key = $scope.restaurant_info.restaurant_key;
      var restaurant_uuid = $scope.restaurant_info.restaurant_uuid;
      var restaurant_name = $scope.restaurant_info.name;
      var restaurant_all_picture_promise;

      index = index || 0;

      if (is_mobile_device() && index >= last_index){
				return false;
			}

			if ($scope.picture_limit - 1 == index && is_mobile_viewport()){
				window.mp20_picture_gallery_open(restaurant_uuid, restaurant_name);
			} else {
				if (tab_name && is_mobile_viewport()){
					window.mp20_picture_gallery_open(restaurant_uuid, restaurant_name, "all");
				} else {
					restaurant_all_picture_promise = mp20_restaurant_http_service.get_pictures(restaurant_key);

					mp20_util_service.common_promise(restaurant_all_picture_promise, function success(picture_data){
						var restaurant_list = _.map(picture_data, function(restaurant){

							if (mp20_util_service.is_mobile_viewport()){
								restaurant.show_picture_url = restaurant.pic_domain + $scope.thumb_size.normal + restaurant.pic_key;
							} else {
								restaurant.show_picture_url = restaurant.pic_domain + $scope.thumb_size.big + restaurant.pic_key;
							}

							return restaurant;
						});
						restaurant_list = restaurant_list.concat($scope.instagram_picture_list);
						mp20_new_gallery.open_gallery(restaurant_list, index, {
							"restaurant_uuid": restaurant_uuid,
							"title": restaurant_name,
							"tab_name": tab_name,
							"type": "restaurant"
						});

					});
				}
			}
		}

		function make_gallery_options(restaurant_name, type) {
      return {
        "restaurant_name": restaurant_name,
        "type": type
      }
    }

		function mp20_gallery_open(index, is_last, type) {
      var restaurant_all_picture_promise;

      var gallery_option = make_gallery_options($scope.restaurant_info.name, 'restaurant');

      index = index || "0";

      if (is_last && is_mobile_viewport()) {
        index = parseInt(index) - 1;
      }

      if ($scope.restaurant_all_picture.length) {
        mp20_gallery_service.open_gallery($scope.restaurant_all_picture, index, gallery_option);
      } else {
        restaurant_all_picture_promise = mp20_restaurant_http_service.get_pictures($scope.restaurant_info.restaurant_key);

        mp20_util_service.common_promise(restaurant_all_picture_promise, function (picture_list) {
          $scope.restaurant_all_picture = picture_list.concat($scope.instagram_picture_list);
          mp20_gallery_service.open_gallery($scope.restaurant_all_picture, index, gallery_option);
        });
      }
    }

    function open_menu_picture(index) {
      var menu_picture_promise;
      var gallery_option = make_gallery_options(undefined, "menu");

      if($scope.restaurant_menu_picture.length) {
        mp20_gallery_service.open_gallery($scope.restaurant_menu_picture, index, gallery_option);
        return ;
      }

      menu_picture_promise = mp20_restaurant_http_service.get_menu_picture($scope.restaurant_info.restaurant_uuid);

      mp20_util_service.common_promise(menu_picture_promise, function (menu_picture_list) {
        $scope.restaurant_menu_picture = menu_picture_list;
        mp20_gallery_service.open_gallery(menu_picture_list, index, gallery_option);
      });
    }

		/**
		 * Branch.IO Init 및 데이터 전달.
		 */
		function init_branch(restaurant_uuid){
			window.mp20.branch_io_service.init(window.mp20.branch_io_service.PAGE_KEY.RESTAURANT, {
				"restaurant_uuid" : restaurant_uuid
			});
		}

		/**
		 * 지도에서 만들어지는 static map image가 자동으로 링크 걸리는걸 막아주고 Layer 지도를 띄워주는 메서드.
		 */
		function bind_map_click_event() {
		  var $selector;

      if (is_mobile_viewport()) {
        $selector = $(".Restaurant__InfoItemMapContainer").parent(".Restaurant__InfoItem");
      } else {
        $selector = $('.map-container')
      }

			$selector.on("click", function(){
				mp20_map_popup_service.open($scope.restaurant_info);
				return false;
			});
		}
	}
})();
/*!
 * clipboard.js v2.0.0
 * https://zenorocha.github.io/clipboard.js
 * 
 * Licensed MIT © Zeno Rocha
 */

!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ClipboardJS=e():t.ClipboardJS=e()}(this,function(){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=3)}([function(t,e,n){var o,r,i;!function(a,c){r=[t,n(7)],o=c,void 0!==(i="function"==typeof o?o.apply(e,r):o)&&(t.exports=i)}(0,function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(t){return t&&t.__esModule?t:{default:t}}(e),r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),a=function(){function t(e){n(this,t),this.resolveOptions(e),this.initSelection()}return i(t,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=t.action,this.container=t.container,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,o.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=(0,o.default)(this.target),this.copyText()}},{key:"copyText",value:function(){var t=void 0;try{t=document.execCommand(this.action)}catch(e){t=!1}this.handleResult(t)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=t,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==(void 0===t?"undefined":r(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),t}();t.exports=a})},function(t,e,n){function o(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!c.string(e))throw new TypeError("Second argument must be a String");if(!c.fn(n))throw new TypeError("Third argument must be a Function");if(c.node(t))return r(t,e,n);if(c.nodeList(t))return i(t,e,n);if(c.string(t))return a(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function r(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function i(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function a(t,e,n){return u(document.body,t,e,n)}var c=n(6),u=n(5);t.exports=o},function(t,e){function n(){}n.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function o(){r.off(t,o),e.apply(n,arguments)}var r=this;return o._=e,this.on(t,o,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,r=n.length;for(o;o<r;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],r=[];if(o&&e)for(var i=0,a=o.length;i<a;i++)o[i].fn!==e&&o[i].fn._!==e&&r.push(o[i]);return r.length?n[t]=r:delete n[t],this}},t.exports=n},function(t,e,n){var o,r,i;!function(a,c){r=[t,n(0),n(2),n(1)],o=c,void 0!==(i="function"==typeof o?o.apply(e,r):o)&&(t.exports=i)}(0,function(t,e,n,o){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}var l=r(e),s=r(n),f=r(o),d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),p=function(t){function e(t,n){i(this,e);var o=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return o.resolveOptions(n),o.listenClick(t),o}return c(e,t),h(e,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof t.action?t.action:this.defaultAction,this.target="function"==typeof t.target?t.target:this.defaultTarget,this.text="function"==typeof t.text?t.text:this.defaultText,this.container="object"===d(t.container)?t.container:document.body}},{key:"listenClick",value:function(t){var e=this;var a=document.querySelector(t);if(a){a.addEventListener('click', function(t){return e.onClick(t)})};}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new l.default({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return u("action",t)}},{key:"defaultTarget",value:function(t){var e=u("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return u("text",t)}},{key:"destroy",value:function(){}}],[{key:"isSupported",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],e="string"==typeof t?[t]:t,n=!!document.queryCommandSupported;return e.forEach(function(t){n=n&&!!document.queryCommandSupported(t)}),n}}]),e}(s.default);t.exports=p})},function(t,e){function n(t,e){for(;t&&t.nodeType!==o;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}var o=9;if("undefined"!=typeof Element&&!Element.prototype.matches){var r=Element.prototype;r.matches=r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector}t.exports=n},function(t,e,n){function o(t,e,n,o,r){var a=i.apply(this,arguments);return t.addEventListener(n,a,r),{destroy:function(){t.removeEventListener(n,a,r)}}}function r(t,e,n,r,i){return"function"==typeof t.addEventListener?o.apply(null,arguments):"function"==typeof n?o.bind(null,document).apply(null,arguments):("string"==typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,function(t){return o(t,e,n,r,i)}))}function i(t,e,n,o){return function(n){n.delegateTarget=a(n.target,e),n.delegateTarget&&o.call(t,n)}}var a=n(4);t.exports=r},function(t,e){e.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},e.nodeList=function(t){var n=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===n||"[object HTMLCollection]"===n)&&"length"in t&&(0===t.length||e.node(t[0]))},e.string=function(t){return"string"==typeof t||t instanceof String},e.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},function(t,e){function n(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var o=window.getSelection(),r=document.createRange();r.selectNodeContents(t),o.removeAllRanges(),o.addRange(r),e=o.toString()}return e}t.exports=n}])});
/*!
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2015 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.7
 *
 */


(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : false,
            appear          : null,
            load            : null,
            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute))
                        .on("error", function(){
                          var error =  $self.attr("data-error");

                          if($self.is("img")) {
                            $self.attr("src",error);
                          } else {
                            $self.css("background-image", "url('" + error + "')");
                          }
                        });
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);
/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */

!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(j(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(b,c,d){var e="DEPRECATED METHOD: "+c+"\n"+d+" AT \n";return function(){var c=new Error("get-stack-trace"),d=c&&c.stack?c.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=a.console&&(a.console.warn||a.console.log);return f&&f.call(a.console,e,d),b.apply(this,arguments)}}function i(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&la(d,c)}function j(a,b){return function(){return a.apply(b,arguments)}}function k(a,b){return typeof a==oa?a.apply(b?b[0]||d:d,b):a}function l(a,b){return a===d?b:a}function m(a,b,c){g(q(b),function(b){a.addEventListener(b,c,!1)})}function n(a,b,c){g(q(b),function(b){a.removeEventListener(b,c,!1)})}function o(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function p(a,b){return a.indexOf(b)>-1}function q(a){return a.trim().split(/\s+/g)}function r(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function s(a){return Array.prototype.slice.call(a,0)}function t(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];r(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function u(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ma.length;){if(c=ma[g],e=c?c+f:b,e in a)return e;g++}return d}function v(){return ua++}function w(b){var c=b.ownerDocument||b;return c.defaultView||c.parentWindow||a}function x(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){k(a.options.enable,[a])&&c.handler(b)},this.init()}function y(a){var b,c=a.options.inputClass;return new(b=c?c:xa?M:ya?P:wa?R:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&Ea&&d-e===0,g=b&(Ga|Ha)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=ra(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY);var j=F(b.deltaTime,b.deltaX,b.deltaY);b.overallVelocityX=j.x,b.overallVelocityY=j.y,b.overallVelocity=qa(j.x)>qa(j.y)?j.x:j.y,b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,b.maxPointers=c.prevInput?b.pointers.length>c.prevInput.maxPointers?b.pointers.length:c.prevInput.maxPointers:b.pointers.length,C(c,b);var k=a.element;o(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};b.eventType!==Ea&&f.eventType!==Ga||(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ha&&(i>Da||h.velocity===d)){var j=b.deltaX-h.deltaX,k=b.deltaY-h.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=qa(l.x)>qa(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:pa(a.pointers[c].clientX),clientY:pa(a.pointers[c].clientY)},c++;return{timeStamp:ra(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:pa(a[0].clientX),y:pa(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:pa(c/b),y:pa(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?Ia:qa(a)>=qa(b)?0>a?Ja:Ka:0>b?La:Ma}function H(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Ra)+I(a[1],a[0],Ra)}function K(a,b){return H(b[0],b[1],Ra)/H(a[0],a[1],Ra)}function L(){this.evEl=Ta,this.evWin=Ua,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Xa,this.evWin=Ya,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=$a,this.evWin=_a,this.started=!1,x.apply(this,arguments)}function O(a,b){var c=s(a.touches),d=s(a.changedTouches);return b&(Ga|Ha)&&(c=t(c.concat(d),"identifier",!0)),[c,d]}function P(){this.evTarget=bb,this.targetIds={},x.apply(this,arguments)}function Q(a,b){var c=s(a.touches),d=this.targetIds;if(b&(Ea|Fa)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=s(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return o(a.target,i)}),b===Ea)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ga|Ha)&&delete d[g[e].identifier],e++;return h.length?[t(f.concat(h),"identifier",!0),h]:void 0}function R(){x.apply(this,arguments);var a=j(this.handler,this);this.touch=new P(this.manager,a),this.mouse=new L(this.manager,a),this.primaryTouch=null,this.lastTouches=[]}function S(a,b){a&Ea?(this.primaryTouch=b.changedPointers[0].identifier,T.call(this,b)):a&(Ga|Ha)&&T.call(this,b)}function T(a){var b=a.changedPointers[0];if(b.identifier===this.primaryTouch){var c={x:b.clientX,y:b.clientY};this.lastTouches.push(c);var d=this.lastTouches,e=function(){var a=d.indexOf(c);a>-1&&d.splice(a,1)};setTimeout(e,cb)}}function U(a){for(var b=a.srcEvent.clientX,c=a.srcEvent.clientY,d=0;d<this.lastTouches.length;d++){var e=this.lastTouches[d],f=Math.abs(b-e.x),g=Math.abs(c-e.y);if(db>=f&&db>=g)return!0}return!1}function V(a,b){this.manager=a,this.set(b)}function W(a){if(p(a,jb))return jb;var b=p(a,kb),c=p(a,lb);return b&&c?jb:b||c?b?kb:lb:p(a,ib)?ib:hb}function X(){if(!fb)return!1;var b={},c=a.CSS&&a.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(d){b[d]=c?a.CSS.supports("touch-action",d):!0}),b}function Y(a){this.options=la({},this.defaults,a||{}),this.id=v(),this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=nb,this.simultaneous={},this.requireFail=[]}function Z(a){return a&sb?"cancel":a&qb?"end":a&pb?"move":a&ob?"start":""}function $(a){return a==Ma?"down":a==La?"up":a==Ja?"left":a==Ka?"right":""}function _(a,b){var c=b.manager;return c?c.get(a):a}function aa(){Y.apply(this,arguments)}function ba(){aa.apply(this,arguments),this.pX=null,this.pY=null}function ca(){aa.apply(this,arguments)}function da(){Y.apply(this,arguments),this._timer=null,this._input=null}function ea(){aa.apply(this,arguments)}function fa(){aa.apply(this,arguments)}function ga(){Y.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ha(a,b){return b=b||{},b.recognizers=l(b.recognizers,ha.defaults.preset),new ia(a,b)}function ia(a,b){this.options=la({},ha.defaults,b||{}),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=a,this.input=y(this),this.touchAction=new V(this,this.options.touchAction),ja(this,!0),g(this.options.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ja(a,b){var c=a.element;if(c.style){var d;g(a.options.cssProps,function(e,f){d=u(c.style,f),b?(a.oldCssProps[d]=c.style[d],c.style[d]=e):c.style[d]=a.oldCssProps[d]||""}),b||(a.oldCssProps={})}}function ka(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var la,ma=["","webkit","Moz","MS","ms","o"],na=b.createElement("div"),oa="function",pa=Math.round,qa=Math.abs,ra=Date.now;la="function"!=typeof Object.assign?function(a){if(a===d||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var e=arguments[c];if(e!==d&&null!==e)for(var f in e)e.hasOwnProperty(f)&&(b[f]=e[f])}return b}:Object.assign;var sa=h(function(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a},"extend","Use `assign`."),ta=h(function(a,b){return sa(a,b,!0)},"merge","Use `assign`."),ua=1,va=/mobile|tablet|ip(ad|hone|od)|android/i,wa="ontouchstart"in a,xa=u(a,"PointerEvent")!==d,ya=wa&&va.test(navigator.userAgent),za="touch",Aa="pen",Ba="mouse",Ca="kinect",Da=25,Ea=1,Fa=2,Ga=4,Ha=8,Ia=1,Ja=2,Ka=4,La=8,Ma=16,Na=Ja|Ka,Oa=La|Ma,Pa=Na|Oa,Qa=["x","y"],Ra=["clientX","clientY"];x.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(w(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(w(this.element),this.evWin,this.domHandler)}};var Sa={mousedown:Ea,mousemove:Fa,mouseup:Ga},Ta="mousedown",Ua="mousemove mouseup";i(L,x,{handler:function(a){var b=Sa[a.type];b&Ea&&0===a.button&&(this.pressed=!0),b&Fa&&1!==a.which&&(b=Ga),this.pressed&&(b&Ga&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:Ba,srcEvent:a}))}});var Va={pointerdown:Ea,pointermove:Fa,pointerup:Ga,pointercancel:Ha,pointerout:Ha},Wa={2:za,3:Aa,4:Ba,5:Ca},Xa="pointerdown",Ya="pointermove pointerup pointercancel";a.MSPointerEvent&&!a.PointerEvent&&(Xa="MSPointerDown",Ya="MSPointerMove MSPointerUp MSPointerCancel"),i(M,x,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Va[d],f=Wa[a.pointerType]||a.pointerType,g=f==za,h=r(b,a.pointerId,"pointerId");e&Ea&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ga|Ha)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Za={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},$a="touchstart",_a="touchstart touchmove touchend touchcancel";i(N,x,{handler:function(a){var b=Za[a.type];if(b===Ea&&(this.started=!0),this.started){var c=O.call(this,a,b);b&(Ga|Ha)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}}});var ab={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},bb="touchstart touchmove touchend touchcancel";i(P,x,{handler:function(a){var b=ab[a.type],c=Q.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}});var cb=2500,db=25;i(R,x,{handler:function(a,b,c){var d=c.pointerType==za,e=c.pointerType==Ba;if(!(e&&c.sourceCapabilities&&c.sourceCapabilities.firesTouchEvents)){if(d)S.call(this,b,c);else if(e&&U.call(this,c))return;this.callback(a,b,c)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var eb=u(na.style,"touchAction"),fb=eb!==d,gb="compute",hb="auto",ib="manipulation",jb="none",kb="pan-x",lb="pan-y",mb=X();V.prototype={set:function(a){a==gb&&(a=this.compute()),fb&&this.manager.element.style&&mb[a]&&(this.manager.element.style[eb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){k(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),W(a.join(" "))},preventDefaults:function(a){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=p(d,jb)&&!mb[jb],f=p(d,lb)&&!mb[lb],g=p(d,kb)&&!mb[kb];if(e){var h=1===a.pointers.length,i=a.distance<2,j=a.deltaTime<250;if(h&&i&&j)return}return g&&f?void 0:e||f&&c&Na||g&&c&Oa?this.preventSrc(b):void 0},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var nb=1,ob=2,pb=4,qb=8,rb=qb,sb=16,tb=32;Y.prototype={defaults:{},set:function(a){return la(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=_(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=_(a,this),-1===r(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=_(a,this);var b=r(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(b,a)}var c=this,d=this.state;qb>d&&b(c.options.event+Z(d)),b(c.options.event),a.additionalEvent&&b(a.additionalEvent),d>=qb&&b(c.options.event+Z(d))},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=tb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(tb|nb)))return!1;a++}return!0},recognize:function(a){var b=la({},a);return k(this.options.enable,[this,b])?(this.state&(rb|sb|tb)&&(this.state=nb),this.state=this.process(b),void(this.state&(ob|pb|qb|sb)&&this.tryEmit(b))):(this.reset(),void(this.state=tb))},process:function(a){},getTouchAction:function(){},reset:function(){}},i(aa,Y,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(ob|pb),e=this.attrTest(a);return d&&(c&Ha||!e)?b|sb:d||e?c&Ga?b|qb:b&ob?b|pb:ob:tb}}),i(ba,aa,{defaults:{event:"pan",threshold:10,pointers:1,direction:Pa},getTouchAction:function(){var a=this.options.direction,b=[];return a&Na&&b.push(lb),a&Oa&&b.push(kb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Na?(e=0===f?Ia:0>f?Ja:Ka,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ia:0>g?La:Ma,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return aa.prototype.attrTest.call(this,a)&&(this.state&ob||!(this.state&ob)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$(a.direction);b&&(a.additionalEvent=this.options.event+b),this._super.emit.call(this,a)}}),i(ca,aa,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ob)},emit:function(a){if(1!==a.scale){var b=a.scale<1?"in":"out";a.additionalEvent=this.options.event+b}this._super.emit.call(this,a)}}),i(da,Y,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[hb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ga|Ha)&&!f)this.reset();else if(a.eventType&Ea)this.reset(),this._timer=e(function(){this.state=rb,this.tryEmit()},b.time,this);else if(a.eventType&Ga)return rb;return tb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===rb&&(a&&a.eventType&Ga?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=ra(),this.manager.emit(this.options.event,this._input)))}}),i(ea,aa,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ob)}}),i(fa,aa,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Na|Oa,pointers:1},getTouchAction:function(){return ba.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Na|Oa)?b=a.overallVelocity:c&Na?b=a.overallVelocityX:c&Oa&&(b=a.overallVelocityY),this._super.attrTest.call(this,a)&&c&a.offsetDirection&&a.distance>this.options.threshold&&a.maxPointers==this.options.pointers&&qa(b)>this.options.velocity&&a.eventType&Ga},emit:function(a){var b=$(a.offsetDirection);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),i(ga,Y,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ib]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&Ea&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ga)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=rb,this.tryEmit()},b.interval,this),ob):rb}return tb},failTimeout:function(){return this._timer=e(function(){this.state=tb},this.options.interval,this),tb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==rb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ha.VERSION="2.0.8",ha.defaults={domEvents:!1,touchAction:gb,enable:!0,inputTarget:null,inputClass:null,preset:[[ea,{enable:!1}],[ca,{enable:!1},["rotate"]],[fa,{direction:Na}],[ba,{direction:Na},["swipe"]],[ga],[ga,{event:"doubletap",taps:2},["tap"]],[da]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ub=1,vb=2;ia.prototype={set:function(a){return la(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?vb:ub},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&rb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===vb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ob|pb|qb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Y)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;if(a=this.get(a)){var b=this.recognizers,c=r(b,a);-1!==c&&(b.splice(c,1),this.touchAction.update())}return this},on:function(a,b){if(a!==d&&b!==d){var c=this.handlers;return g(q(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this}},off:function(a,b){if(a!==d){var c=this.handlers;return g(q(a),function(a){b?c[a]&&c[a].splice(r(c[a],b),1):delete c[a]}),this}},emit:function(a,b){this.options.domEvents&&ka(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&ja(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},la(ha,{INPUT_START:Ea,INPUT_MOVE:Fa,INPUT_END:Ga,INPUT_CANCEL:Ha,STATE_POSSIBLE:nb,STATE_BEGAN:ob,STATE_CHANGED:pb,STATE_ENDED:qb,STATE_RECOGNIZED:rb,STATE_CANCELLED:sb,STATE_FAILED:tb,DIRECTION_NONE:Ia,DIRECTION_LEFT:Ja,DIRECTION_RIGHT:Ka,DIRECTION_UP:La,DIRECTION_DOWN:Ma,DIRECTION_HORIZONTAL:Na,DIRECTION_VERTICAL:Oa,DIRECTION_ALL:Pa,Manager:ia,Input:x,TouchAction:V,TouchInput:P,MouseInput:L,PointerEventInput:M,TouchMouseInput:R,SingleTouchInput:N,Recognizer:Y,AttrRecognizer:aa,Tap:ga,Pan:ba,Swipe:fa,Pinch:ca,Rotate:ea,Press:da,on:m,off:n,each:g,merge:ta,extend:sa,assign:la,inherit:i,bindFn:j,prefixed:u});var wb="undefined"!=typeof a?a:"undefined"!=typeof self?self:{};wb.Hammer=ha,"function"==typeof define&&define.amd?define(function(){return ha}):"undefined"!=typeof module&&module.exports?module.exports=ha:a[c]=ha}(window,document,"Hammer");
//# sourceMappingURL=hammer.min.js.map
;
(function(){
    /**
     * 네임스페이스.
     * @namespace clipboard
     */
    var clipboard = {};

    /**
     * copy button class name
     * @type {string}
     */
    clipboard.btn_class_name = ".share-link";

    /**
     * 초기화 여부 변수.
     * @type {boolean}
     */
    clipboard.is_init = false;

    /**
     * clipboard init Function.
     */
    clipboard.init = function(){
        if(this.is_init){
            return false;
        }

        this.is_init = true;

        var clipboard_instance = new ClipboardJS(clipboard.btn_class_name, {
            text: function(trigger) {
                return mp20.utm_manager.generate_url(getParameter("utm_source"), window.location.href, {
                    "utm_term": "v1",
                    "utm_content": $(clipboard.btn_class_name).data("content") || "CLICK_LINK_SHARE"
                })
            }
        });

        clipboard_instance.on('success', function(e) {
            //var $copy_btn = $(e.trigger);
            alert(I18n.t("label.copy_complate"));
            //카피 완료에 대한 어떤 액션.
        }.bind(this));

        clipboard_instance.on('error', function(e) {
            //alert(this.message.fail);
            prompt(I18n.t("label.copy_fail"), window.location.href);
        }.bind(this));
    };

    /**
     * 전역 객체에 바인딩.
     */
    if(window.mp20){
        window.mp20.clipboard = clipboard;
    } else {
        window.mp20 = {};
        window.mp20.clipboard = clipboard;
    }
})();
!function(){"use strict";function a(a,b){var c;for(c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function b(a){if(!this||this.find!==b.prototype.find)return new b(a);if(this.length=0,a)if("string"==typeof a&&(a=this.find(a)),a.nodeType||a===a.window)this.length=1,this[0]=a;else{var c=a.length;for(this.length=c;c;)c-=1,this[c]=a[c]}}b.extend=a,b.contains=function(a,b){do if(b=b.parentNode,b===a)return!0;while(b);return!1},b.parseJSON=function(a){return window.JSON&&JSON.parse(a)},a(b.prototype,{find:function(a){var c=this[0]||document;return"string"==typeof a&&(a=c.querySelectorAll?c.querySelectorAll(a):"#"===a.charAt(0)?c.getElementById(a.slice(1)):c.getElementsByTagName(a)),new b(a)},hasClass:function(a){return this[0]?new RegExp("(^|\\s+)"+a+"(\\s+|$)").test(this[0].className):!1},addClass:function(a){for(var b,c=this.length;c;){if(c-=1,b=this[c],!b.className)return b.className=a,this;if(this.hasClass(a))return this;b.className+=" "+a}return this},removeClass:function(a){for(var b,c=new RegExp("(^|\\s+)"+a+"(\\s+|$)"),d=this.length;d;)d-=1,b=this[d],b.className=b.className.replace(c," ");return this},on:function(a,b){for(var c,d,e=a.split(/\s+/);e.length;)for(a=e.shift(),c=this.length;c;)c-=1,d=this[c],d.addEventListener?d.addEventListener(a,b,!1):d.attachEvent&&d.attachEvent("on"+a,b);return this},off:function(a,b){for(var c,d,e=a.split(/\s+/);e.length;)for(a=e.shift(),c=this.length;c;)c-=1,d=this[c],d.removeEventListener?d.removeEventListener(a,b,!1):d.detachEvent&&d.detachEvent("on"+a,b);return this},empty:function(){for(var a,b=this.length;b;)for(b-=1,a=this[b];a.hasChildNodes();)a.removeChild(a.lastChild);return this},first:function(){return new b(this[0])}}),"function"==typeof define&&define.amd?define(function(){return b}):(window.blueimp=window.blueimp||{},window.blueimp.helper=b)}(),function(a){"use strict";"function"==typeof define&&define.amd?define(["./blueimp-helper"],a):(window.blueimp=window.blueimp||{},window.blueimp.Gallery=a(window.blueimp.helper||window.jQuery))}(function(a){"use strict";function b(a,c){return void 0===document.body.style.maxHeight?null:this&&this.options===b.prototype.options?a&&a.length?(this.list=a,this.num=a.length,this.initOptions(c),void this.initialize()):void this.console.log("blueimp Gallery: No or empty list provided as first argument.",a):new b(a,c)}return a.extend(b.prototype,{options:{container:"#blueimp-gallery",slidesContainer:"div",titleElement:"h3",displayClass:"blueimp-gallery-display",controlsClass:"blueimp-gallery-controls",singleClass:"blueimp-gallery-single",leftEdgeClass:"blueimp-gallery-left",rightEdgeClass:"blueimp-gallery-right",playingClass:"blueimp-gallery-playing",slideClass:"slide",slideLoadingClass:"slide-loading",slideErrorClass:"slide-error",slideContentClass:"slide-content",toggleClass:"toggle",prevClass:"prev",nextClass:"next",closeClass:"close",playPauseClass:"play-pause",typeProperty:"type",titleProperty:"title",urlProperty:"href",displayTransition:!0,clearSlides:!0,stretchImages:!1,toggleControlsOnReturn:!0,toggleSlideshowOnSpace:!0,enableKeyboardNavigation:!0,closeOnEscape:!0,closeOnSlideClick:!0,closeOnSwipeUpOrDown:!0,emulateTouchEvents:!0,stopTouchEventsPropagation:!1,hidePageScrollbars:!0,disableScroll:!0,carousel:!1,continuous:!0,unloadElements:!0,startSlideshow:!1,slideshowInterval:5e3,index:0,preloadRange:2,transitionSpeed:400,slideshowTransitionSpeed:void 0,event:void 0,onopen:void 0,onopened:void 0,onslide:void 0,onslideend:void 0,onslidecomplete:void 0,onclose:void 0,onclosed:void 0},carouselOptions:{hidePageScrollbars:!1,toggleControlsOnReturn:!1,toggleSlideshowOnSpace:!1,enableKeyboardNavigation:!1,closeOnEscape:!1,closeOnSlideClick:!1,closeOnSwipeUpOrDown:!1,disableScroll:!1,startSlideshow:!0},console:window.console&&"function"==typeof window.console.log?window.console:{log:function(){}},support:function(b){var c={touch:void 0!==window.ontouchstart||window.DocumentTouch&&document instanceof DocumentTouch},d={webkitTransition:{end:"webkitTransitionEnd",prefix:"-webkit-"},MozTransition:{end:"transitionend",prefix:"-moz-"},OTransition:{end:"otransitionend",prefix:"-o-"},transition:{end:"transitionend",prefix:""}},e=function(){var a,d,e=c.transition;document.body.appendChild(b),e&&(a=e.name.slice(0,-9)+"ransform",void 0!==b.style[a]&&(b.style[a]="translateZ(0)",d=window.getComputedStyle(b).getPropertyValue(e.prefix+"transform"),c.transform={prefix:e.prefix,name:a,translate:!0,translateZ:!!d&&"none"!==d})),void 0!==b.style.backgroundSize&&(c.backgroundSize={},b.style.backgroundSize="contain",c.backgroundSize.contain="contain"===window.getComputedStyle(b).getPropertyValue("background-size"),b.style.backgroundSize="cover",c.backgroundSize.cover="cover"===window.getComputedStyle(b).getPropertyValue("background-size")),document.body.removeChild(b)};return function(a,c){var d;for(d in c)if(c.hasOwnProperty(d)&&void 0!==b.style[d]){a.transition=c[d],a.transition.name=d;break}}(c,d),document.body?e():a(document).on("DOMContentLoaded",e),c}(document.createElement("div")),requestAnimationFrame:window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,initialize:function(){return this.initStartIndex(),this.initWidget()===!1?!1:(this.initEventListeners(),this.onslide(this.index),this.ontransitionend(),void(this.options.startSlideshow&&this.play()))},slide:function(a,b){window.clearTimeout(this.timeout);var c,d,e,f=this.index;if(f!==a&&1!==this.num){if(b||(b=this.options.transitionSpeed),this.support.transform){for(this.options.continuous||(a=this.circle(a)),c=Math.abs(f-a)/(f-a),this.options.continuous&&(d=c,c=-this.positions[this.circle(a)]/this.slideWidth,c!==d&&(a=-c*this.num+a)),e=Math.abs(f-a)-1;e;)e-=1,this.move(this.circle((a>f?a:f)-e-1),this.slideWidth*c,0);a=this.circle(a),this.move(f,this.slideWidth*c,b),this.move(a,0,b),this.options.continuous&&this.move(this.circle(a-c),-(this.slideWidth*c),0)}else a=this.circle(a),this.animate(f*-this.slideWidth,a*-this.slideWidth,b);this.onslide(a)}},getIndex:function(){return this.index},getNumber:function(){return this.num},prev:function(){(this.options.continuous||this.index)&&this.slide(this.index-1)},next:function(){(this.options.continuous||this.index<this.num-1)&&this.slide(this.index+1)},play:function(a){var b=this;window.clearTimeout(this.timeout),this.interval=a||this.options.slideshowInterval,this.elements[this.index]>1&&(this.timeout=this.setTimeout(!this.requestAnimationFrame&&this.slide||function(a,c){b.animationFrameId=b.requestAnimationFrame.call(window,function(){b.slide(a,c)})},[this.index+1,this.options.slideshowTransitionSpeed],this.interval)),this.container.addClass(this.options.playingClass)},pause:function(){window.clearTimeout(this.timeout),this.interval=null,this.container.removeClass(this.options.playingClass)},add:function(a){var b;for(a.concat||(a=Array.prototype.slice.call(a)),this.list.concat||(this.list=Array.prototype.slice.call(this.list)),this.list=this.list.concat(a),this.num=this.list.length,this.num>2&&null===this.options.continuous&&(this.options.continuous=!0,this.container.removeClass(this.options.leftEdgeClass)),this.container.removeClass(this.options.rightEdgeClass).removeClass(this.options.singleClass),b=this.num-a.length;b<this.num;b+=1)this.addSlide(b),this.positionSlide(b);this.positions.length=this.num,this.initSlides(!0)},resetSlides:function(){this.slidesContainer.empty(),this.unloadAllSlides(),this.slides=[]},handleClose:function(){var a=this.options;this.destroyEventListeners(),this.pause(),this.container[0].style.display="none",this.container.removeClass(a.displayClass).removeClass(a.singleClass).removeClass(a.leftEdgeClass).removeClass(a.rightEdgeClass),a.hidePageScrollbars&&(document.body.style.overflow=this.bodyOverflowStyle),this.options.clearSlides&&this.resetSlides(),this.options.onclosed&&this.options.onclosed.call(this)},close:function(){var a=this,b=function(c){c.target===a.container[0]&&(a.container.off(a.support.transition.end,b),a.handleClose())};this.options.onclose&&this.options.onclose.call(this),this.support.transition&&this.options.displayTransition?(this.container.on(this.support.transition.end,b),this.container.removeClass(this.options.displayClass)):this.handleClose()},circle:function(a){return(this.num+a%this.num)%this.num},move:function(a,b,c){this.translateX(a,b,c),this.positions[a]=b},translate:function(a,b,c,d){var e=this.slides[a].style,f=this.support.transition,g=this.support.transform;e[f.name+"Duration"]=d+"ms",e[g.name]="translate("+b+"px, "+c+"px)"+(g.translateZ?" translateZ(0)":"")},translateX:function(a,b,c){this.translate(a,b,0,c)},translateY:function(a,b,c){this.translate(a,0,b,c)},animate:function(a,b,c){if(!c)return void(this.slidesContainer[0].style.left=b+"px");var d=this,e=(new Date).getTime(),f=window.setInterval(function(){var g=(new Date).getTime()-e;return g>c?(d.slidesContainer[0].style.left=b+"px",d.ontransitionend(),void window.clearInterval(f)):void(d.slidesContainer[0].style.left=(b-a)*(Math.floor(g/c*100)/100)+a+"px")},4)},preventDefault:function(a){a.preventDefault?a.preventDefault():a.returnValue=!1},stopPropagation:function(a){a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},onresize:function(){this.initSlides(!0)},onmousedown:function(a){a.which&&1===a.which&&"VIDEO"!==a.target.nodeName&&(a.preventDefault(),(a.originalEvent||a).touches=[{pageX:a.pageX,pageY:a.pageY}],this.ontouchstart(a))},onmousemove:function(a){this.touchStart&&((a.originalEvent||a).touches=[{pageX:a.pageX,pageY:a.pageY}],this.ontouchmove(a))},onmouseup:function(a){this.touchStart&&(this.ontouchend(a),delete this.touchStart)},onmouseout:function(b){if(this.touchStart){var c=b.target,d=b.relatedTarget;(!d||d!==c&&!a.contains(c,d))&&this.onmouseup(b)}},ontouchstart:function(a){this.options.stopTouchEventsPropagation&&this.stopPropagation(a);var b=(a.originalEvent||a).touches[0];this.touchStart={x:b.pageX,y:b.pageY,time:Date.now()},this.isScrolling=void 0,this.touchDelta={}},ontouchmove:function(a){this.options.stopTouchEventsPropagation&&this.stopPropagation(a);var b,c,d=(a.originalEvent||a).touches[0],e=(a.originalEvent||a).scale,f=this.index;if(!(d.length>1||e&&1!==e))if(this.options.disableScroll&&a.preventDefault(),this.touchDelta={x:d.pageX-this.touchStart.x,y:d.pageY-this.touchStart.y},b=this.touchDelta.x,void 0===this.isScrolling&&(this.isScrolling=this.isScrolling||Math.abs(b)<Math.abs(this.touchDelta.y)),this.isScrolling)this.options.closeOnSwipeUpOrDown&&this.translateY(f,this.touchDelta.y+this.positions[f],0);else for(a.preventDefault(),window.clearTimeout(this.timeout),this.options.continuous?c=[this.circle(f+1),f,this.circle(f-1)]:(this.touchDelta.x=b/=!f&&b>0||f===this.num-1&&0>b?Math.abs(b)/this.slideWidth+1:1,c=[f],f&&c.push(f-1),f<this.num-1&&c.unshift(f+1));c.length;)f=c.pop(),this.translateX(f,b+this.positions[f],0)},ontouchend:function(a){this.options.stopTouchEventsPropagation&&this.stopPropagation(a);var b,c,d,e,f,g=this.index,h=this.options.transitionSpeed,i=this.slideWidth,j=Number(Date.now()-this.touchStart.time)<250,k=j&&Math.abs(this.touchDelta.x)>20||Math.abs(this.touchDelta.x)>i/2,l=!g&&this.touchDelta.x>0||g===this.num-1&&this.touchDelta.x<0,m=!k&&this.options.closeOnSwipeUpOrDown&&(j&&Math.abs(this.touchDelta.y)>20||Math.abs(this.touchDelta.y)>this.slideHeight/2);this.options.continuous&&(l=!1),b=this.touchDelta.x<0?-1:1,this.isScrolling?m?this.close():this.translateY(g,0,h):k&&!l?(c=g+b,d=g-b,e=i*b,f=-i*b,this.options.continuous?(this.move(this.circle(c),e,0),this.move(this.circle(g-2*b),f,0)):c>=0&&c<this.num&&this.move(c,e,0),this.move(g,this.positions[g]+e,h),this.move(this.circle(d),this.positions[this.circle(d)]+e,h),g=this.circle(d),this.onslide(g)):this.options.continuous?(this.move(this.circle(g-1),-i,h),this.move(g,0,h),this.move(this.circle(g+1),i,h)):(g&&this.move(g-1,-i,h),this.move(g,0,h),g<this.num-1&&this.move(g+1,i,h))},ontouchcancel:function(a){this.touchStart&&(this.ontouchend(a),delete this.touchStart)},ontransitionend:function(a){var b=this.slides[this.index];a&&b!==a.target||(this.interval&&this.play(),this.setTimeout(this.options.onslideend,[this.index,b]))},oncomplete:function(b){var c,d=b.target||b.srcElement,e=d&&d.parentNode;d&&e&&(c=this.getNodeIndex(e),a(e).removeClass(this.options.slideLoadingClass),"error"===b.type?(a(e).addClass(this.options.slideErrorClass),this.elements[c]=3):this.elements[c]=2,d.clientHeight>this.container[0].clientHeight&&(d.style.maxHeight=this.container[0].clientHeight),this.interval&&this.slides[this.index]===e&&this.play(),this.setTimeout(this.options.onslidecomplete,[c,e]))},onload:function(a){this.oncomplete(a)},onerror:function(a){this.oncomplete(a)},onkeydown:function(a){switch(a.which||a.keyCode){case 13:this.options.toggleControlsOnReturn&&(this.preventDefault(a),this.toggleControls());break;case 27:this.options.closeOnEscape&&(this.close(),a.stopImmediatePropagation());break;case 32:this.options.toggleSlideshowOnSpace&&(this.preventDefault(a),this.toggleSlideshow());break;case 37:this.options.enableKeyboardNavigation&&(this.preventDefault(a),this.prev());break;case 39:this.options.enableKeyboardNavigation&&(this.preventDefault(a),this.next())}},handleClick:function(b){var c=this.options,d=b.target||b.srcElement,e=d.parentNode,f=function(b){return a(d).hasClass(b)||a(e).hasClass(b)};f(c.toggleClass)?(this.preventDefault(b),this.toggleControls()):f(c.prevClass)?(this.preventDefault(b),this.prev()):f(c.nextClass)?(this.preventDefault(b),this.next()):f(c.closeClass)?(this.preventDefault(b),this.close()):f(c.playPauseClass)?(this.preventDefault(b),this.toggleSlideshow()):e===this.slidesContainer[0]?(this.preventDefault(b),c.closeOnSlideClick?this.close():this.toggleControls()):e.parentNode&&e.parentNode===this.slidesContainer[0]&&(this.preventDefault(b),this.toggleControls())},onclick:function(a){return this.options.emulateTouchEvents&&this.touchDelta&&(Math.abs(this.touchDelta.x)>20||Math.abs(this.touchDelta.y)>20)?void delete this.touchDelta:this.handleClick(a)},updateEdgeClasses:function(a){a?this.container.removeClass(this.options.leftEdgeClass):this.container.addClass(this.options.leftEdgeClass),a===this.num-1?this.container.addClass(this.options.rightEdgeClass):this.container.removeClass(this.options.rightEdgeClass)},handleSlide:function(a){this.options.continuous||this.updateEdgeClasses(a),this.loadElements(a),this.options.unloadElements&&this.unloadElements(a),this.setTitle(a)},onslide:function(a){this.index=a,this.handleSlide(a),this.setTimeout(this.options.onslide,[a,this.slides[a]])},setTitle:function(a){var b=this.slides[a].firstChild.title,c=this.titleElement;c.length&&(this.titleElement.empty(),b&&c[0].appendChild(document.createTextNode(b)))},setTimeout:function(a,b,c){var d=this;return a&&window.setTimeout(function(){a.apply(d,b||[])},c||0)},imageFactory:function(b,c){var d,e,f,g=this,h=this.imagePrototype.cloneNode(!1),i=b,j=this.options.stretchImages,k=function(b){if(!d){if(b={type:b.type,target:e},!e.parentNode)return g.setTimeout(k,[b]);d=!0,a(h).off("load error",k),j&&"load"===b.type&&(e.style.background='url("'+i+'") center no-repeat',e.style.backgroundSize=j),c(b)}};return"string"!=typeof i&&(i=this.getItemProperty(b,this.options.urlProperty),f=this.getItemProperty(b,this.options.titleProperty)),j===!0&&(j="contain"),j=this.support.backgroundSize&&this.support.backgroundSize[j]&&j,j?e=this.elementPrototype.cloneNode(!1):(e=h,h.draggable=!1),f&&(e.title=f),a(h).on("load error",k),h.src=i,e},createElement:function(b,c){var d=b&&this.getItemProperty(b,this.options.typeProperty),e=d&&this[d.split("/")[0]+"Factory"]||this.imageFactory,f=b&&e.call(this,b,c);return f||(f=this.elementPrototype.cloneNode(!1),this.setTimeout(c,[{type:"error",target:f}])),a(f).addClass(this.options.slideContentClass),f},loadElement:function(b){this.elements[b]||(this.slides[b].firstChild?this.elements[b]=a(this.slides[b]).hasClass(this.options.slideErrorClass)?3:2:(this.elements[b]=1,a(this.slides[b]).addClass(this.options.slideLoadingClass),this.slides[b].appendChild(this.createElement(this.list[b],this.proxyListener))))},loadElements:function(a){var b,c=Math.min(this.num,2*this.options.preloadRange+1),d=a;for(b=0;c>b;b+=1)d+=b*(b%2===0?-1:1),d=this.circle(d),this.loadElement(d)},unloadElements:function(a){var b,c;for(b in this.elements)this.elements.hasOwnProperty(b)&&(c=Math.abs(a-b),c>this.options.preloadRange&&c+this.options.preloadRange<this.num&&(this.unloadSlide(b),delete this.elements[b]))},addSlide:function(a){var b=this.slidePrototype.cloneNode(!1);b.setAttribute("data-index",a),this.slidesContainer[0].appendChild(b),this.slides.push(b)},positionSlide:function(a){var b=this.slides[a];b.style.width=this.slideWidth+"px",this.support.transform&&(b.style.left=a*-this.slideWidth+"px",this.move(a,this.index>a?-this.slideWidth:this.index<a?this.slideWidth:0,0))},initSlides:function(b){var c,d;for(b||(this.positions=[],this.positions.length=this.num,this.elements={},this.imagePrototype=document.createElement("img"),this.elementPrototype=document.createElement("div"),this.slidePrototype=document.createElement("div"),a(this.slidePrototype).addClass(this.options.slideClass),this.slides=this.slidesContainer[0].children,c=this.options.clearSlides||this.slides.length!==this.num),this.slideWidth=this.container[0].offsetWidth,this.slideHeight=this.container[0].offsetHeight,this.slidesContainer[0].style.width=this.num*this.slideWidth+"px",c&&this.resetSlides(),d=0;d<this.num;d+=1)c&&this.addSlide(d),this.positionSlide(d);this.options.continuous&&this.support.transform&&(this.move(this.circle(this.index-1),-this.slideWidth,0),this.move(this.circle(this.index+1),this.slideWidth,0)),this.support.transform||(this.slidesContainer[0].style.left=this.index*-this.slideWidth+"px")},unloadSlide:function(a){var b,c;b=this.slides[a],c=b.firstChild,null!==c&&b.removeChild(c)},unloadAllSlides:function(){var a,b;for(a=0,b=this.slides.length;b>a;a++)this.unloadSlide(a)},toggleControls:function(){var a=this.options.controlsClass;this.container.hasClass(a)?this.container.removeClass(a):this.container.addClass(a)},toggleSlideshow:function(){this.interval?this.pause():this.play()},getNodeIndex:function(a){return parseInt(a.getAttribute("data-index"),10)},getNestedProperty:function(a,b){return b.replace(/\[(?:'([^']+)'|"([^"]+)"|(\d+))\]|(?:(?:^|\.)([^\.\[]+))/g,function(b,c,d,e,f){var g=f||c||d||e&&parseInt(e,10);b&&a&&(a=a[g])}),a},getDataProperty:function(b,c){if(b.getAttribute){var d=b.getAttribute("data-"+c.replace(/([A-Z])/g,"-$1").toLowerCase());if("string"==typeof d){if(/^(true|false|null|-?\d+(\.\d+)?|\{[\s\S]*\}|\[[\s\S]*\])$/.test(d))try{return a.parseJSON(d)}catch(e){}return d}}},getItemProperty:function(a,b){var c=a[b];return void 0===c&&(c=this.getDataProperty(a,b),void 0===c&&(c=this.getNestedProperty(a,b))),c},initStartIndex:function(){var a,b=this.options.index,c=this.options.urlProperty;if(b&&"number"!=typeof b)for(a=0;a<this.num;a+=1)if(this.list[a]===b||this.getItemProperty(this.list[a],c)===this.getItemProperty(b,c)){b=a;break}this.index=this.circle(parseInt(b,10)||0)},initEventListeners:function(){var b=this,c=this.slidesContainer,d=function(a){var c=b.support.transition&&b.support.transition.end===a.type?"transitionend":a.type;b["on"+c](a)};a(window).on("resize",d),a(document.body).on("keydown",d),this.container.on("click",d),this.support.touch?c.on("touchstart touchmove touchend touchcancel",d):this.options.emulateTouchEvents&&this.support.transition&&c.on("mousedown mousemove mouseup mouseout",d),this.support.transition&&c.on(this.support.transition.end,d),this.proxyListener=d},destroyEventListeners:function(){var b=this.slidesContainer,c=this.proxyListener;a(window).off("resize",c),a(document.body).off("keydown",c),this.container.off("click",c),this.support.touch?b.off("touchstart touchmove touchend touchcancel",c):this.options.emulateTouchEvents&&this.support.transition&&b.off("mousedown mousemove mouseup mouseout",c),this.support.transition&&b.off(this.support.transition.end,c)},handleOpen:function(){this.options.onopened&&this.options.onopened.call(this)},initWidget:function(){var b=this,c=function(a){a.target===b.container[0]&&(b.container.off(b.support.transition.end,c),b.handleOpen())};return this.container=a(this.options.container),this.container.length?(this.slidesContainer=this.container.find(this.options.slidesContainer).first(),this.slidesContainer.length?(this.titleElement=this.container.find(this.options.titleElement).first(),1===this.num&&this.container.addClass(this.options.singleClass),this.options.onopen&&this.options.onopen.call(this),this.support.transition&&this.options.displayTransition?this.container.on(this.support.transition.end,c):this.handleOpen(),this.options.hidePageScrollbars&&(this.bodyOverflowStyle=document.body.style.overflow,document.body.style.overflow="hidden"),this.container[0].style.display="block",this.initSlides(),void this.container.addClass(this.options.displayClass)):(this.console.log("blueimp Gallery: Slides container not found.",this.options.slidesContainer),!1)):(this.console.log("blueimp Gallery: Widget container not found.",this.options.container),!1)},initOptions:function(b){this.options=a.extend({},this.options),(b&&b.carousel||this.options.carousel&&(!b||b.carousel!==!1))&&a.extend(this.options,this.carouselOptions),a.extend(this.options,b),this.num<3&&(this.options.continuous=this.options.continuous?null:!1),this.support.transition||(this.options.emulateTouchEvents=!1),this.options.event&&this.preventDefault(this.options.event)}}),b}),function(a){"use strict";"function"==typeof define&&define.amd?define(["./blueimp-helper","./blueimp-gallery"],a):a(window.blueimp.helper||window.jQuery,window.blueimp.Gallery)}(function(a,b){"use strict";a.extend(b.prototype.options,{fullScreen:!1});var c=b.prototype.initialize,d=b.prototype.close;return a.extend(b.prototype,{getFullScreenElement:function(){return document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement},requestFullScreen:function(a){a.requestFullscreen?a.requestFullscreen():a.webkitRequestFullscreen?a.webkitRequestFullscreen():a.mozRequestFullScreen?a.mozRequestFullScreen():a.msRequestFullscreen&&a.msRequestFullscreen()},exitFullScreen:function(){document.exitFullscreen?document.exitFullscreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen()},initialize:function(){c.call(this),this.options.fullScreen&&!this.getFullScreenElement()&&this.requestFullScreen(this.container[0])},close:function(){this.getFullScreenElement()===this.container[0]&&this.exitFullScreen(),d.call(this)}}),b}),function(a){"use strict";"function"==typeof define&&define.amd?define(["./blueimp-helper","./blueimp-gallery"],a):a(window.blueimp.helper||window.jQuery,window.blueimp.Gallery)}(function(a,b){"use strict";a.extend(b.prototype.options,{indicatorContainer:"ol",activeIndicatorClass:"active",thumbnailProperty:"thumbnail",thumbnailIndicators:!0});var c=b.prototype.initSlides,d=b.prototype.addSlide,e=b.prototype.resetSlides,f=b.prototype.handleClick,g=b.prototype.handleSlide,h=b.prototype.handleClose;return a.extend(b.prototype,{createIndicator:function(b){var c,d,e=this.indicatorPrototype.cloneNode(!1),f=this.getItemProperty(b,this.options.titleProperty),g=this.options.thumbnailProperty;return this.options.thumbnailIndicators&&(g&&(c=this.getItemProperty(b,g)),void 0===c&&(d=b.getElementsByTagName&&a(b).find("img")[0],d&&(c=d.src)),c&&(e.style.backgroundImage='url("'+c+'")')),f&&(e.title=f),e},addIndicator:function(a){if(this.indicatorContainer.length){var b=this.createIndicator(this.list[a]);b.setAttribute("data-index",a),this.indicatorContainer[0].appendChild(b),this.indicators.push(b)}},setActiveIndicator:function(b){this.indicators&&(this.activeIndicator&&this.activeIndicator.removeClass(this.options.activeIndicatorClass),this.activeIndicator=a(this.indicators[b]),this.activeIndicator.addClass(this.options.activeIndicatorClass))},initSlides:function(a){a||(this.indicatorContainer=this.container.find(this.options.indicatorContainer),this.indicatorContainer.length&&(this.indicatorPrototype=document.createElement("li"),this.indicators=this.indicatorContainer[0].children)),c.call(this,a)},addSlide:function(a){d.call(this,a),this.addIndicator(a)},resetSlides:function(){e.call(this),this.indicatorContainer.empty(),this.indicators=[]},handleClick:function(a){var b=a.target||a.srcElement,c=b.parentNode;if(c===this.indicatorContainer[0])this.preventDefault(a),this.slide(this.getNodeIndex(b));else{if(c.parentNode!==this.indicatorContainer[0])return f.call(this,a);this.preventDefault(a),this.slide(this.getNodeIndex(c))}},handleSlide:function(a){g.call(this,a),this.setActiveIndicator(a)},handleClose:function(){this.activeIndicator&&this.activeIndicator.removeClass(this.options.activeIndicatorClass),h.call(this)}}),b}),function(a){"use strict";"function"==typeof define&&define.amd?define(["./blueimp-helper","./blueimp-gallery"],a):a(window.blueimp.helper||window.jQuery,window.blueimp.Gallery)}(function(a,b){"use strict";a.extend(b.prototype.options,{videoContentClass:"video-content",videoLoadingClass:"video-loading",videoPlayingClass:"video-playing",videoPosterProperty:"poster",videoSourcesProperty:"sources"});var c=b.prototype.handleSlide;return a.extend(b.prototype,{handleSlide:function(a){c.call(this,a),this.playingVideo&&this.playingVideo.pause()},videoFactory:function(b,c,d){var e,f,g,h,i,j=this,k=this.options,l=this.elementPrototype.cloneNode(!1),m=a(l),n=[{type:"error",target:l}],o=d||document.createElement("video"),p=this.getItemProperty(b,k.urlProperty),q=this.getItemProperty(b,k.typeProperty),r=this.getItemProperty(b,k.titleProperty),s=this.getItemProperty(b,k.videoPosterProperty),t=this.getItemProperty(b,k.videoSourcesProperty);if(m.addClass(k.videoContentClass),r&&(l.title=r),o.canPlayType)if(p&&q&&o.canPlayType(q))o.src=p;else for(;t&&t.length;)if(f=t.shift(),p=this.getItemProperty(f,k.urlProperty),q=this.getItemProperty(f,k.typeProperty),p&&q&&o.canPlayType(q)){o.src=p;break}return s&&(o.poster=s,e=this.imagePrototype.cloneNode(!1),a(e).addClass(k.toggleClass),e.src=s,e.draggable=!1,l.appendChild(e)),g=document.createElement("a"),g.setAttribute("target","_blank"),d||g.setAttribute("download",r),g.href=p,o.src&&(o.controls=!0,(d||a(o)).on("error",function(){j.setTimeout(c,n)}).on("pause",function(){h=!1,m.removeClass(j.options.videoLoadingClass).removeClass(j.options.videoPlayingClass),i&&j.container.addClass(j.options.controlsClass),delete j.playingVideo,j.interval&&j.play()}).on("playing",function(){h=!1,m.removeClass(j.options.videoLoadingClass).addClass(j.options.videoPlayingClass),j.container.hasClass(j.options.controlsClass)?(i=!0,j.container.removeClass(j.options.controlsClass)):i=!1}).on("play",function(){window.clearTimeout(j.timeout),h=!0,m.addClass(j.options.videoLoadingClass),j.playingVideo=o}),a(g).on("click",function(a){j.preventDefault(a),h?o.pause():o.play()}),l.appendChild(d&&d.element||o)),l.appendChild(g),this.setTimeout(c,[{type:"load",target:l}]),l}}),b}),function(a){"use strict";"function"==typeof define&&define.amd?define(["./blueimp-helper","./blueimp-gallery-video"],a):a(window.blueimp.helper||window.jQuery,window.blueimp.Gallery)}(function(a,b){"use strict";if(!window.postMessage)return b;a.extend(b.prototype.options,{vimeoVideoIdProperty:"vimeo",vimeoPlayerUrl:"//player.vimeo.com/video/VIDEO_ID?api=1&player_id=PLAYER_ID",vimeoPlayerIdPrefix:"vimeo-player-",vimeoClickToPlay:!0});var c=b.prototype.textFactory||b.prototype.imageFactory,d=function(a,b,c,d){this.url=a,this.videoId=b,this.playerId=c,this.clickToPlay=d,this.element=document.createElement("div"),this.listeners={}},e=0;return a.extend(d.prototype,{canPlayType:function(){return!0},on:function(a,b){return this.listeners[a]=b,this},loadAPI:function(){for(var b,c,d=this,e="//"+("https"===location.protocol?"secure-":"")+"a.vimeocdn.com/js/froogaloop2.min.js",f=document.getElementsByTagName("script"),g=f.length,h=function(){!c&&d.playOnReady&&d.play(),c=!0};g;)if(g-=1,f[g].src===e){b=f[g];break}b||(b=document.createElement("script"),b.src=e),a(b).on("load",h),f[0].parentNode.insertBefore(b,f[0]),/loaded|complete/.test(b.readyState)&&h()},onReady:function(){var a=this;this.ready=!0,this.player.addEvent("play",function(){a.hasPlayed=!0,a.onPlaying()}),this.player.addEvent("pause",function(){a.onPause()}),this.player.addEvent("finish",function(){a.onPause()}),this.playOnReady&&this.play()},onPlaying:function(){this.playStatus<2&&(this.listeners.playing(),this.playStatus=2)},onPause:function(){this.listeners.pause(),delete this.playStatus},insertIframe:function(){var a=document.createElement("iframe");a.src=this.url.replace("VIDEO_ID",this.videoId).replace("PLAYER_ID",this.playerId),a.id=this.playerId,this.element.parentNode.replaceChild(a,this.element),this.element=a},play:function(){var a=this;this.playStatus||(this.listeners.play(),this.playStatus=1),this.ready?!this.hasPlayed&&(this.clickToPlay||window.navigator&&/iP(hone|od|ad)/.test(window.navigator.platform))?this.onPlaying():this.player.api("play"):(this.playOnReady=!0,window.$f?this.player||(this.insertIframe(),this.player=$f(this.element),this.player.addEvent("ready",function(){a.onReady()})):this.loadAPI())},pause:function(){this.ready?this.player.api("pause"):this.playStatus&&(delete this.playOnReady,this.listeners.pause(),delete this.playStatus)}}),a.extend(b.prototype,{VimeoPlayer:d,textFactory:function(a,b){var f=this.options,g=this.getItemProperty(a,f.vimeoVideoIdProperty);return g?(void 0===this.getItemProperty(a,f.urlProperty)&&(a[f.urlProperty]="//vimeo.com/"+g),e+=1,this.videoFactory(a,b,new d(f.vimeoPlayerUrl,g,f.vimeoPlayerIdPrefix+e,f.vimeoClickToPlay))):c.call(this,a,b)}}),b}),function(a){"use strict";"function"==typeof define&&define.amd?define(["./blueimp-helper","./blueimp-gallery-video"],a):a(window.blueimp.helper||window.jQuery,window.blueimp.Gallery)}(function(a,b){"use strict";if(!window.postMessage)return b;a.extend(b.prototype.options,{youTubeVideoIdProperty:"youtube",youTubePlayerVars:{wmode:"transparent"},youTubeClickToPlay:!0});var c=b.prototype.textFactory||b.prototype.imageFactory,d=function(a,b,c){this.videoId=a,this.playerVars=b,this.clickToPlay=c,this.element=document.createElement("div"),this.listeners={}};return a.extend(d.prototype,{canPlayType:function(){return!0},on:function(a,b){return this.listeners[a]=b,this},loadAPI:function(){var a,b=this,c=window.onYouTubeIframeAPIReady,d="//www.youtube.com/iframe_api",e=document.getElementsByTagName("script"),f=e.length;for(window.onYouTubeIframeAPIReady=function(){c&&c.apply(this),b.playOnReady&&b.play()};f;)if(f-=1,e[f].src===d)return;a=document.createElement("script"),a.src=d,e[0].parentNode.insertBefore(a,e[0])},onReady:function(){this.ready=!0,this.playOnReady&&this.play()},onPlaying:function(){this.playStatus<2&&(this.listeners.playing(),this.playStatus=2)},onPause:function(){b.prototype.setTimeout.call(this,this.checkSeek,null,2e3)},checkSeek:function(){(this.stateChange===YT.PlayerState.PAUSED||this.stateChange===YT.PlayerState.ENDED)&&(this.listeners.pause(),delete this.playStatus)},onStateChange:function(a){switch(a.data){case YT.PlayerState.PLAYING:this.hasPlayed=!0,this.onPlaying();break;case YT.PlayerState.PAUSED:case YT.PlayerState.ENDED:this.onPause()}this.stateChange=a.data},onError:function(a){this.listeners.error(a)},play:function(){var a=this;this.playStatus||(this.listeners.play(),this.playStatus=1),this.ready?!this.hasPlayed&&(this.clickToPlay||window.navigator&&/iP(hone|od|ad)/.test(window.navigator.platform))?this.onPlaying():this.player.playVideo():(this.playOnReady=!0,window.YT&&YT.Player?this.player||(this.player=new YT.Player(this.element,{videoId:this.videoId,playerVars:this.playerVars,events:{onReady:function(){a.onReady()
},onStateChange:function(b){a.onStateChange(b)},onError:function(b){a.onError(b)}}})):this.loadAPI())},pause:function(){this.ready?this.player.pauseVideo():this.playStatus&&(delete this.playOnReady,this.listeners.pause(),delete this.playStatus)}}),a.extend(b.prototype,{YouTubePlayer:d,textFactory:function(a,b){var e=this.options,f=this.getItemProperty(a,e.youTubeVideoIdProperty);return f?(void 0===this.getItemProperty(a,e.urlProperty)&&(a[e.urlProperty]="//www.youtube.com/watch?v="+f),void 0===this.getItemProperty(a,e.videoPosterProperty)&&(a[e.videoPosterProperty]="//img.youtube.com/vi/"+f+"/maxresdefault.jpg"),this.videoFactory(a,b,new d(f,e.youTubePlayerVars,e.youTubeClickToPlay))):c.call(this,a,b)}}),b});
/*
 * blueimp Gallery JS
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Swipe implementation based on
 * https://github.com/bradbirdsall/Swipe
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, window, document, DocumentTouch */


(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['./blueimp-helper'], factory);
    } else {
        // Browser globals:
        window.blueimp = window.blueimp || {};
        window.blueimp.Gallery = factory(
            window.blueimp.helper || window.jQuery
        );
    }
}(function ($) {
    'use strict';

    function Gallery(list, options) {
        if (document.body.style.maxHeight === undefined) {
            // document.body.style.maxHeight is undefined on IE6 and lower
            return null;
        }
        if (!this || this.options !== Gallery.prototype.options) {
            // Called as function instead of as constructor,
            // so we simply return a new instance:
            return new Gallery(list, options);
        }
        if (!list || !list.length) {
            this.console.log(
                'blueimp Gallery: No or empty list provided as first argument.',
                list
            );
            return;
        }
        this.list = list;
        this.num = list.length;
        this.initOptions(options);
        this.initialize();
    }

    $.extend(Gallery.prototype, {

        options: {
            // The Id, element or querySelector of the gallery widget:
            container: '#blueimp-gallery',
            // The tag name, Id, element or querySelector of the slides container:
            slidesContainer: '.slides',
            // The tag name, Id, element or querySelector of the title element:
            titleElement: 'h3',
            // The class to add when the gallery is visible:
            displayClass: 'blueimp-gallery-display',
            // The class to add when the gallery controls are visible:
            controlsClass: 'blueimp-gallery-controls',
            // The class to add when the gallery only displays one element:
            singleClass: 'blueimp-gallery-single',
            // The class to add when the left edge has been reached:
            leftEdgeClass: 'blueimp-gallery-left',
            // The class to add when the right edge has been reached:
            rightEdgeClass: 'blueimp-gallery-right',
            // The class to add when the automatic slideshow is active:
            playingClass: 'blueimp-gallery-playing',
            // The class for all slides:
            slideClass: 'slide',
            // The slide class for loading elements:
            slideLoadingClass: 'slide-loading',
            // The slide class for elements that failed to load:
            slideErrorClass: 'slide-error',
            // The class for the content element loaded into each slide:
            slideContentClass: 'slide-content',
            // The class for the "toggle" control:
            toggleClass: 'toggle',
            // The class for the "prev" control:
            prevClass: 'prev',
            // The class for the "next" control:
            nextClass: 'next',
            // The class for the "close" control:
            closeClass: 'close',
            // The class for the "play-pause" toggle control:
            playPauseClass: 'play-pause',
            // The list object property (or data attribute) with the object type:
            typeProperty: 'type',
            // The list object property (or data attribute) with the object title:
            titleProperty: 'title',
            // The list object property (or data attribute) with the object URL:
            urlProperty: 'href',
            // The gallery listens for transitionend events before triggering the
            // opened and closed events, unless the following option is set to false:
            displayTransition: true,
            // Defines if the gallery slides are cleared from the gallery modal,
            // or reused for the next gallery initialization:
            clearSlides: true,
            // Defines if images should be stretched to fill the available space,
            // while maintaining their aspect ratio (will only be enabled for browsers
            // supporting background-size="contain", which excludes IE < 9).
            // Set to "cover", to make images cover all available space (requires
            // support for background-size="cover", which excludes IE < 9):
            stretchImages: true,
            // Toggle the controls on pressing the Return key:
            toggleControlsOnReturn: true,
            // Toggle the automatic slideshow interval on pressing the Space key:
            toggleSlideshowOnSpace: true,
            // Navigate the gallery by pressing left and right on the keyboard:
            enableKeyboardNavigation: true,
            // Close the gallery on pressing the Esc key:
            closeOnEscape: false,
            // Close the gallery when clicking on an empty slide area:
            closeOnSlideClick: true,
            // Close the gallery by swiping up or down:
            closeOnSwipeUpOrDown: false,
            // Emulate touch events on mouse-pointer devices such as desktop browsers:
            emulateTouchEvents: true,
            // Stop touch events from bubbling up to ancestor elements of the Gallery:
            stopTouchEventsPropagation: false,
            // Hide the page scrollbars:
            hidePageScrollbars: true,
            // Stops any touches on the container from scrolling the page:
            disableScroll: true,
            // Carousel mode (shortcut for carousel specific options):
            carousel: false,
            // Allow continuous navigation, moving from last to first
            // and from first to last slide:
            continuous: true,
            // Remove elements outside of the preload range from the DOM:
            unloadElements: true,
            // Start with the automatic slideshow:
            startSlideshow: false,
            // Delay in milliseconds between slides for the automatic slideshow:
            slideshowInterval: 5000,
            // The starting index as integer.
            // Can also be an object of the given list,
            // or an equal object with the same url property:
            index: 0,
            // The number of elements to load around the current index:
            preloadRange: 2,
            // The transition speed between slide changes in milliseconds:
            transitionSpeed: 400,
            // The transition speed for automatic slide changes, set to an integer
            // greater 0 to override the default transition speed:
            slideshowTransitionSpeed: undefined,
            // The event object for which the default action will be canceled
            // on Gallery initialization (e.g. the click event to open the Gallery):
            event: undefined,
            // Callback function executed when the Gallery is initialized.
            // Is called with the gallery instance as "this" object:
            onopen: undefined,
            // Callback function executed when the Gallery has been initialized
            // and the initialization transition has been completed.
            // Is called with the gallery instance as "this" object:
            onopened: undefined,
            // Callback function executed on slide change.
            // Is called with the gallery instance as "this" object and the
            // current index and slide as arguments:
            onslide: undefined,
            // Callback function executed after the slide change transition.
            // Is called with the gallery instance as "this" object and the
            // current index and slide as arguments:
            onslideend: undefined,
            // Callback function executed on slide content load.
            // Is called with the gallery instance as "this" object and the
            // slide index and slide element as arguments:
            onslidecomplete: undefined,
            // Callback function executed when the Gallery is about to be closed.
            // Is called with the gallery instance as "this" object:
            onclose: undefined,
            // Callback function executed when the Gallery has been closed
            // and the closing transition has been completed.
            // Is called with the gallery instance as "this" object:
            onclosed: undefined
        },

        carouselOptions: {
            hidePageScrollbars: false,
            toggleControlsOnReturn: false,
            toggleSlideshowOnSpace: false,
            enableKeyboardNavigation: false,
            closeOnEscape: false,
            closeOnSlideClick: false,
            closeOnSwipeUpOrDown: false,
            disableScroll: false,
            startSlideshow: true
        },

        console: window.console && typeof window.console.log === 'function' ?
            window.console :
        {log: function () {}},

        // Detect touch, transition, transform and background-size support:
        support: (function (element) {
            var support = {
                    touch: window.ontouchstart !== undefined ||
                    (window.DocumentTouch && document instanceof DocumentTouch)
                },
                transitions = {
                    webkitTransition: {
                        end: 'webkitTransitionEnd',
                        prefix: '-webkit-'
                    },
                    MozTransition: {
                        end: 'transitionend',
                        prefix: '-moz-'
                    },
                    OTransition: {
                        end: 'otransitionend',
                        prefix: '-o-'
                    },
                    transition: {
                        end: 'transitionend',
                        prefix: ''
                    }
                },
                elementTests = function () {
                    var transition = support.transition,
                        prop,
                        translateZ;
                    document.body.appendChild(element);
                    if (transition) {
                        prop = transition.name.slice(0, -9) + 'ransform';
                        if (element.style[prop] !== undefined) {
                            element.style[prop] = 'translateZ(0)';
                            translateZ = window.getComputedStyle(element)
                                .getPropertyValue(transition.prefix + 'transform');
                            support.transform = {
                                prefix: transition.prefix,
                                name: prop,
                                translate: true,
                                translateZ: !!translateZ && translateZ !== 'none'
                            };
                        }
                    }
                    if (element.style.backgroundSize !== undefined) {
                        support.backgroundSize = {};
                        element.style.backgroundSize = 'contain';
                        support.backgroundSize.contain = window
                                .getComputedStyle(element)
                                .getPropertyValue('background-size') === 'contain';
                        element.style.backgroundSize = 'cover';
                        support.backgroundSize.cover = window
                                .getComputedStyle(element)
                                .getPropertyValue('background-size') === 'cover';
                    }
                    document.body.removeChild(element);
                };
            (function (support, transitions) {
                var prop;
                for (prop in transitions) {
                    if (transitions.hasOwnProperty(prop) &&
                        element.style[prop] !== undefined) {
                        support.transition = transitions[prop];
                        support.transition.name = prop;
                        break;
                    }
                }
            }(support, transitions));
            if (document.body) {
                elementTests();
            } else {
                $(document).on('DOMContentLoaded', elementTests);
            }
            return support;
            // Test element, has to be standard HTML and must not be hidden
            // for the CSS3 tests using window.getComputedStyle to be applicable:
        }(document.createElement('div'))),

        requestAnimationFrame: window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame,

        initialize: function () {
            this.initStartIndex();
            if (this.initWidget() === false) {
                return false;
            }
            this.initEventListeners();
            // Load the slide at the given index:
            this.onslide(this.index);
            // Manually trigger the slideend event for the initial slide:
            this.ontransitionend();
            // Start the automatic slideshow if applicable:
            if (this.options.startSlideshow) {
                this.play();
            }
        },

        slide: function (to, speed) {
            window.clearTimeout(this.timeout);
            var index = this.index,
                direction,
                naturalDirection,
                diff;
            if (index === to || this.num === 1) {
                return;
            }
            if (!speed) {
                speed = this.options.transitionSpeed;
            }
            if (this.support.transform) {
                if (!this.options.continuous) {
                    to = this.circle(to);
                }
                // 1: backward, -1: forward:
                direction = Math.abs(index - to) / (index - to);
                // Get the actual position of the slide:
                if (this.options.continuous) {
                    naturalDirection = direction;
                    direction = -this.positions[this.circle(to)] / this.slideWidth;
                    // If going forward but to < index, use to = slides.length + to
                    // If going backward but to > index, use to = -slides.length + to
                    if (direction !== naturalDirection) {
                        to = -direction * this.num + to;
                    }
                }
                diff = Math.abs(index - to) - 1;
                // Move all the slides between index and to in the right direction:
                while (diff) {
                    diff -= 1;
                    this.move(
                        this.circle((to > index ? to : index) - diff - 1),
                        this.slideWidth * direction,
                        0
                    );
                }
                to = this.circle(to);
                this.move(index, this.slideWidth * direction, speed);
                this.move(to, 0, speed);
                if (this.options.continuous) {
                    this.move(
                        this.circle(to - direction),
                        -(this.slideWidth * direction),
                        0
                    );
                }
            } else {
                to = this.circle(to);
                this.animate(index * -this.slideWidth, to * -this.slideWidth, speed);
            }
            this.onslide(to);
        },

        getIndex: function () {
            return this.index;
        },

        getNumber: function () {
            return this.num;
        },

        prev: function () {
            if (this.options.continuous || this.index) {
                this.slide(this.index - 1);
            }
        },

        next: function () {
            if (this.options.continuous || this.index < this.num - 1) {
                this.slide(this.index + 1);
            }
        },

        play: function (time) {
            var that = this;
            window.clearTimeout(this.timeout);
            this.interval = time || this.options.slideshowInterval;
            if (this.elements[this.index] > 1) {
                this.timeout = this.setTimeout(
                    (!this.requestAnimationFrame && this.slide) || function (to, speed) {
                        that.animationFrameId = that.requestAnimationFrame.call(
                            window,
                            function () {
                                that.slide(to, speed);
                            }
                        );
                    },
                    [this.index + 1, this.options.slideshowTransitionSpeed],
                    this.interval
                );
            }
            this.container.addClass(this.options.playingClass);
        },

        pause: function () {
            window.clearTimeout(this.timeout);
            this.interval = null;
            this.container.removeClass(this.options.playingClass);
        },

        add: function (list) {
            var i;
            if (!list.concat) {
                // Make a real array out of the list to add:
                list = Array.prototype.slice.call(list);
            }
            if (!this.list.concat) {
                // Make a real array out of the Gallery list:
                this.list = Array.prototype.slice.call(this.list);
            }
            this.list = this.list.concat(list);
            this.num = this.list.length;
            if (this.num > 2 && this.options.continuous === null) {
                this.options.continuous = true;
                this.container.removeClass(this.options.leftEdgeClass);
            }
            this.container
                .removeClass(this.options.rightEdgeClass)
                .removeClass(this.options.singleClass);
            for (i = this.num - list.length; i < this.num; i += 1) {
                this.addSlide(i);
                this.positionSlide(i);
            }
            this.positions.length = this.num;
            this.initSlides(true);
        },

        resetSlides: function () {
            this.slidesContainer.empty();
            this.unloadAllSlides();
            this.slides = [];
        },

        handleClose: function () {
            var options = this.options;
            this.destroyEventListeners();
            // Cancel the slideshow:
            this.pause();
            this.container[0].style.display = 'none';
            this.container
                .removeClass(options.displayClass)
                .removeClass(options.singleClass)
                .removeClass(options.leftEdgeClass)
                .removeClass(options.rightEdgeClass);
            if (options.hidePageScrollbars) {
                document.body.style.overflow = this.bodyOverflowStyle;
            }
            if (this.options.clearSlides) {
                this.resetSlides();
            }
            if (this.options.onclosed) {
                this.options.onclosed.call(this);
            }
        },

        close: function () {
            var that = this,
                closeHandler = function (event) {
                    if (event.target === that.container[0]) {
                        that.container.off(
                            that.support.transition.end,
                            closeHandler
                        );
                        that.handleClose();
                    }
                };
            if (this.options.onclose) {
                this.options.onclose.call(this);
            }
            if (this.support.transition && this.options.displayTransition) {
                this.container.on(
                    this.support.transition.end,
                    closeHandler
                );
                this.container.removeClass(this.options.displayClass);
            } else {
                this.handleClose();
            }
        },

        circle: function (index) {
            // Always return a number inside of the slides index range:
            return (this.num + (index % this.num)) % this.num;
        },

        move: function (index, dist, speed) {
            this.translateX(index, dist, speed);
            this.positions[index] = dist;
        },

        translate: function (index, x, y, speed) {
            var style = this.slides[index].style,
                transition = this.support.transition,
                transform = this.support.transform;
            style[transition.name + 'Duration'] = speed + 'ms';
            style[transform.name] = 'translate(' + x + 'px, ' + y + 'px)' +
                (transform.translateZ ? ' translateZ(0)' : '');
        },

        translateX: function (index, x, speed) {
            this.translate(index, x, 0, speed);
        },

        translateY: function (index, y, speed) {
            this.translate(index, 0, y, speed);
        },

        animate: function (from, to, speed) {
            if (!speed) {
                this.slidesContainer[0].style.left = to + 'px';
                return;
            }
            var that = this,
                start = new Date().getTime(),
                timer = window.setInterval(function () {
                    var timeElap = new Date().getTime() - start;
                    if (timeElap > speed) {
                        that.slidesContainer[0].style.left = to + 'px';
                        that.ontransitionend();
                        window.clearInterval(timer);
                        return;
                    }
                    that.slidesContainer[0].style.left = (((to - from) *
                        (Math.floor((timeElap / speed) * 100) / 100)) +
                        from) + 'px';
                }, 4);
        },

        preventDefault: function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },

        stopPropagation: function (event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        },

        onresize: function () {
            this.initSlides(true);
        },

        onmousedown: function (event) {
            // Trigger on clicks of the left mouse button only
            // and exclude video elements:
            if (event.which && event.which === 1 &&
                event.target.nodeName !== 'VIDEO') {
                // Preventing the default mousedown action is required
                // to make touch emulation work with Firefox:
                event.preventDefault();
                (event.originalEvent || event).touches = [{
                    pageX: event.pageX,
                    pageY: event.pageY
                }];
                this.ontouchstart(event);
            }
        },

        onmousemove: function (event) {
            if (this.touchStart) {
                (event.originalEvent || event).touches = [{
                    pageX: event.pageX,
                    pageY: event.pageY
                }];
                this.ontouchmove(event);
            }
        },

        onmouseup: function (event) {
            if (this.touchStart) {
                this.ontouchend(event);
                delete this.touchStart;
            }
        },

        onmouseout: function (event) {
            if (this.touchStart) {
                var target = event.target,
                    related = event.relatedTarget;
                if (!related || (related !== target &&
                    !$.contains(target, related))) {
                    this.onmouseup(event);
                }
            }
        },

        ontouchstart: function (event) {
            if (this.options.stopTouchEventsPropagation) {
                this.stopPropagation(event);
            }
            // jQuery doesn't copy touch event properties by default,
            // so we have to access the originalEvent object:
            var touches = (event.originalEvent || event).touches[0];
            this.touchStart = {
                // Remember the initial touch coordinates:
                x: touches.pageX,
                y: touches.pageY,
                // Store the time to determine touch duration:
                time: Date.now()
            };
            // Helper variable to detect scroll movement:
            this.isScrolling = undefined;
            // Reset delta values:
            this.touchDelta = {};
        },

        ontouchmove: function (event) {
            if (this.options.stopTouchEventsPropagation) {
                this.stopPropagation(event);
            }
            // jQuery doesn't copy touch event properties by default,
            // so we have to access the originalEvent object:
            var touches = (event.originalEvent || event).touches[0],
                scale = (event.originalEvent || event).scale,
                index = this.index,
                touchDeltaX,
                indices;
            // Ensure this is a one touch swipe and not, e.g. a pinch:
            if (touches.length > 1 || (scale && scale !== 1)) {
                return;
            }
            if (this.options.disableScroll) {
                event.preventDefault();
            }
            // Measure change in x and y coordinates:
            this.touchDelta = {
                x: touches.pageX - this.touchStart.x,
                y: touches.pageY - this.touchStart.y
            };
            touchDeltaX = this.touchDelta.x;
            // Detect if this is a vertical scroll movement (run only once per touch):
            if (this.isScrolling === undefined) {
                this.isScrolling = this.isScrolling ||
                    Math.abs(touchDeltaX) < Math.abs(this.touchDelta.y);
            }
            if (!this.isScrolling) {
                // Always prevent horizontal scroll:
                event.preventDefault();
                // Stop the slideshow:
                window.clearTimeout(this.timeout);
                if (this.options.continuous) {
                    indices = [
                        this.circle(index + 1),
                        index,
                        this.circle(index - 1)
                    ];
                } else {
                    // Increase resistance if first slide and sliding left
                    // or last slide and sliding right:
                    this.touchDelta.x = touchDeltaX =
                        touchDeltaX /
                        (((!index && touchDeltaX > 0) ||
                        (index === this.num - 1 && touchDeltaX < 0)) ?
                            (Math.abs(touchDeltaX) / this.slideWidth + 1) : 1);
                    indices = [index];
                    if (index) {
                        indices.push(index - 1);
                    }
                    if (index < this.num - 1) {
                        indices.unshift(index + 1);
                    }
                }
                while (indices.length) {
                    index = indices.pop();
                    this.translateX(index, touchDeltaX + this.positions[index], 0);
                }
            } else if (this.options.closeOnSwipeUpOrDown) {
                this.translateY(index, this.touchDelta.y + this.positions[index], 0);
            }
        },

        ontouchend: function (event) {
            if (this.options.stopTouchEventsPropagation) {
                this.stopPropagation(event);
            }
            var index = this.index,
                speed = this.options.transitionSpeed,
                slideWidth = this.slideWidth,
                isShortDuration = Number(Date.now() - this.touchStart.time) < 250,
            // Determine if slide attempt triggers next/prev slide:
                isValidSlide = (isShortDuration && Math.abs(this.touchDelta.x) > 20) ||
                    Math.abs(this.touchDelta.x) > slideWidth / 2,
            // Determine if slide attempt is past start or end:
                isPastBounds = (!index && this.touchDelta.x > 0) ||
                    (index === this.num - 1 && this.touchDelta.x < 0),
                isValidClose = !isValidSlide && this.options.closeOnSwipeUpOrDown &&
                    ((isShortDuration && Math.abs(this.touchDelta.y) > 20) ||
                    Math.abs(this.touchDelta.y) > this.slideHeight / 2),
                direction,
                indexForward,
                indexBackward,
                distanceForward,
                distanceBackward;
            if (this.options.continuous) {
                isPastBounds = false;
            }
            // Determine direction of swipe (true: right, false: left):
            direction = this.touchDelta.x < 0 ? -1 : 1;
            if (!this.isScrolling) {
                if (isValidSlide && !isPastBounds) {
                    indexForward = index + direction;
                    indexBackward = index - direction;
                    distanceForward = slideWidth * direction;
                    distanceBackward = -slideWidth * direction;
                    if (this.options.continuous) {
                        this.move(this.circle(indexForward), distanceForward, 0);
                        this.move(this.circle(index - 2 * direction), distanceBackward, 0);
                    } else if (indexForward >= 0 &&
                        indexForward < this.num) {
                        this.move(indexForward, distanceForward, 0);
                    }
                    this.move(index, this.positions[index] + distanceForward, speed);
                    this.move(
                        this.circle(indexBackward),
                        this.positions[this.circle(indexBackward)] + distanceForward,
                        speed
                    );
                    index = this.circle(indexBackward);
                    this.onslide(index);
                } else {
                    // Move back into position
                    if (this.options.continuous) {
                        this.move(this.circle(index - 1), -slideWidth, speed);
                        this.move(index, 0, speed);
                        this.move(this.circle(index + 1), slideWidth, speed);
                    } else {
                        if (index) {
                            this.move(index - 1, -slideWidth, speed);
                        }
                        this.move(index, 0, speed);
                        if (index < this.num - 1) {
                            this.move(index + 1, slideWidth, speed);
                        }
                    }
                }
            } else {
                if (isValidClose) {
                    this.close();
                } else {
                    // Move back into position
                    this.translateY(index, 0, speed);
                }
            }
        },

        ontouchcancel: function (event) {
            if (this.touchStart) {
                this.ontouchend(event);
                delete this.touchStart;
            }
        },

        ontransitionend: function (event) {
            var slide = this.slides[this.index];
            if (!event || slide === event.target) {
                if (this.interval) {
                    this.play();
                }
                this.setTimeout(
                    this.options.onslideend,
                    [this.index, slide]
                );
            }
        },

        oncomplete: function (event) {
            var target = event.target || event.srcElement,
                parent = target && target.parentNode,
                index;
            if (!target || !parent) {
                return;
            }
            index = this.getNodeIndex(parent);
            $(parent).removeClass(this.options.slideLoadingClass);
            if (event.type === 'error') {
                $(parent).addClass(this.options.slideErrorClass);
                this.elements[index] = 3; // Fail
            } else {
                this.elements[index] = 2; // Done
            }
            // Fix for IE7's lack of support for percentage max-height:
            if (target.clientHeight > this.container[0].clientHeight) {
                target.style.maxHeight = this.container[0].clientHeight;
            }
            if (this.interval && this.slides[this.index] === parent) {
                this.play();
            }
            this.setTimeout(
                this.options.onslidecomplete,
                [index, parent]
            );
        },

        onload: function (event) {
            this.oncomplete(event);
        },

        onerror: function (event) {
            this.oncomplete(event);
        },

        onkeydown: function (event) {
            switch (event.which || event.keyCode) {
                case 13: // Return
                    if (this.options.toggleControlsOnReturn) {
                        this.preventDefault(event);
                        this.toggleControls();
                    }
                    break;
                case 27: // Esc
                    if (this.options.closeOnEscape) {
                        this.close();
                        // prevent Esc from closing other things
                        event.stopImmediatePropagation();
                    }
                    break;
                case 32: // Space
                    if (this.options.toggleSlideshowOnSpace) {
                        this.preventDefault(event);
                        this.toggleSlideshow();
                    }
                    break;
                case 37: // Left
                    if (this.options.enableKeyboardNavigation) {
                        this.preventDefault(event);
                        this.prev();
                    }
                    break;
                case 39: // Right
                    if (this.options.enableKeyboardNavigation) {
                        this.preventDefault(event);
                        this.next();
                    }
                    break;
            }
        },

        handleClick: function (event) {
            var options = this.options,
                target = event.target || event.srcElement,
                parent = target.parentNode,
                isTarget = function (className) {
                    return $(target).hasClass(className) ||
                        $(parent).hasClass(className);
                };
            if (isTarget(options.toggleClass)) {
                // Click on "toggle" control
                this.preventDefault(event);
                this.toggleControls();
            } else if (isTarget(options.prevClass)) {
                // Click on "prev" control
                this.preventDefault(event);
                this.prev();
            } else if (isTarget(options.nextClass)) {
                // Click on "next" control
                this.preventDefault(event);
                this.next();
            } else if (isTarget(options.closeClass)) {
                // Click on "close" control
                this.preventDefault(event);
                this.close();
            } else if (isTarget(options.playPauseClass)) {
                // Click on "play-pause" control
                this.preventDefault(event);
                this.toggleSlideshow();
            } else if (parent === this.slidesContainer[0]) {
                // Click on slide background
                this.preventDefault(event);
                if (options.closeOnSlideClick) {
                    this.close();
                } else {
                    this.toggleControls();
                }
            } else if (parent.parentNode &&
                parent.parentNode === this.slidesContainer[0]) {
                // Click on displayed element
                this.preventDefault(event);
                this.toggleControls();
            }
        },

        onclick: function (event) {
            if (this.options.emulateTouchEvents &&
                this.touchDelta && (Math.abs(this.touchDelta.x) > 20 ||
                Math.abs(this.touchDelta.y) > 20)) {
                delete this.touchDelta;
                return;
            }
            return this.handleClick(event);
        },

        updateEdgeClasses: function (index) {
            if (!index) {
                this.container.addClass(this.options.leftEdgeClass);
            } else {
                this.container.removeClass(this.options.leftEdgeClass);
            }
            if (index === this.num - 1) {
                this.container.addClass(this.options.rightEdgeClass);
            } else {
                this.container.removeClass(this.options.rightEdgeClass);
            }
        },

        handleSlide: function (index) {
            if (!this.options.continuous) {
                this.updateEdgeClasses(index);
            }
            this.loadElements(index);
            if (this.options.unloadElements) {
                this.unloadElements(index);
            }
            this.setTitle(index);
        },

        onslide: function (index) {
            this.index = index;
            this.handleSlide(index);
            this.setTimeout(this.options.onslide, [index, this.slides[index]]);
        },

        setTitle: function (index) {
            var text = this.slides[index].firstChild.title,
                titleElement = this.titleElement;
            if (titleElement.length) {
                this.titleElement.empty();
                if (text) {
                    titleElement[0].appendChild(document.createTextNode(text));
                }
            }
        },

        setTimeout: function (func, args, wait) {
            var that = this;
            return func && window.setTimeout(function () {
                    func.apply(that, args || []);
                }, wait || 0);
        },

        imageFactory: function (obj, callback) {
            var that = this,
                img = this.imagePrototype.cloneNode(false),
                url = obj,
                backgroundSize = this.options.stretchImages,
                called,
                element,
                callbackWrapper = function (event) {
                    if (!called) {
                        event = {
                            type: event.type,
                            target: element
                        };
                        if (!element.parentNode) {
                            // Fix for IE7 firing the load event for
                            // cached images before the element could
                            // be added to the DOM:
                            return that.setTimeout(callbackWrapper, [event]);
                        }
                        called = true;
                        $(img).off('load error', callbackWrapper);
                        if (backgroundSize) {
                            if (event.type === 'load') {
                                element.style.background = 'url("' + url +
                                    '") center no-repeat';
                                element.style.backgroundSize = backgroundSize;
                            }
                        }
                        callback(event);
                    }
                },
                title;
            if (typeof url !== 'string') {
                url = this.getItemProperty(obj, this.options.urlProperty);
                title = this.getItemProperty(obj, this.options.titleProperty);
            }
            if (backgroundSize === true) {
                backgroundSize = 'cover';
            }
            backgroundSize = this.support.backgroundSize &&
                this.support.backgroundSize[backgroundSize] && backgroundSize;
            if (backgroundSize) {
                element = this.elementPrototype.cloneNode(false);
            } else {
                element = img;
                img.draggable = false;
            }
            if (title) {
                element.title = title;
            }
            $(img).on('load error', callbackWrapper);
            img.src = url;
            return element;
        },

        createElement: function (obj, callback) {
            var type = obj && this.getItemProperty(obj, this.options.typeProperty),
                factory = (type && this[type.split('/')[0] + 'Factory']) ||
                    this.imageFactory,
                element = obj && factory.call(this, obj, callback);
            if (!element) {
                element = this.elementPrototype.cloneNode(false);
                this.setTimeout(callback, [{
                    type: 'error',
                    target: element
                }]);
            }
            $(element).addClass(this.options.slideContentClass);
            return element;
        },

        loadElement: function (index) {
            if (!this.elements[index]) {
                if (this.slides[index].firstChild) {
                    this.elements[index] = $(this.slides[index])
                        .hasClass(this.options.slideErrorClass) ? 3 : 2;
                } else {
                    this.elements[index] = 1; // Loading
                    $(this.slides[index]).addClass(this.options.slideLoadingClass);
                    this.slides[index].appendChild(this.createElement(
                        this.list[index],
                        this.proxyListener
                    ));
                }
            }
        },

        loadElements: function (index) {
            var limit = Math.min(this.num, this.options.preloadRange * 2 + 1),
                j = index,
                i;
            for (i = 0; i < limit; i += 1) {
                // First load the current slide element (0),
                // then the next one (+1),
                // then the previous one (-2),
                // then the next after next (+2), etc.:
                j += i * (i % 2 === 0 ? -1 : 1);
                // Connect the ends of the list to load slide elements for
                // continuous navigation:
                j = this.circle(j);
                this.loadElement(j);
            }
        },

        unloadElements: function (index) {
            var i,
                diff;
            for (i in this.elements) {
                if (this.elements.hasOwnProperty(i)) {
                    diff = Math.abs(index - i);
                    if (diff > this.options.preloadRange &&
                        diff + this.options.preloadRange < this.num) {
                        this.unloadSlide(i);
                        delete this.elements[i];
                    }
                }
            }
        },

        addSlide: function (index) {
            var slide = this.slidePrototype.cloneNode(false);
            slide.setAttribute('data-index', index);
            this.slidesContainer[0].appendChild(slide);
            this.slides.push(slide);
        },

        positionSlide: function (index) {
            var slide = this.slides[index];
            slide.style.width = this.slideWidth + 'px';
            if (this.support.transform) {
                slide.style.left = (index * -this.slideWidth) + 'px';
                this.move(index, this.index > index ? -this.slideWidth :
                    (this.index < index ? this.slideWidth : 0), 0);
            }
        },

        initSlides: function (reload) {
            var clearSlides,
                i;
            if (!reload) {
                this.positions = [];
                this.positions.length = this.num;
                this.elements = {};
                this.imagePrototype = document.createElement('img');
                this.elementPrototype = document.createElement('div');
                this.slidePrototype = document.createElement('div');
                $(this.slidePrototype).addClass(this.options.slideClass);
                this.slides = this.slidesContainer[0].children;
                clearSlides = this.options.clearSlides ||
                    this.slides.length !== this.num;
            }
            this.slideWidth = this.container[0].offsetWidth;
            this.slideHeight = this.container[0].offsetHeight;
            this.slidesContainer[0].style.width =
                (this.num * this.slideWidth) + 'px';
            if (clearSlides) {
                this.resetSlides();
            }
            for (i = 0; i < this.num; i += 1) {
                if (clearSlides) {
                    this.addSlide(i);
                }
                this.positionSlide(i);
            }
            // Reposition the slides before and after the given index:
            if (this.options.continuous && this.support.transform) {
                this.move(this.circle(this.index - 1), -this.slideWidth, 0);
                this.move(this.circle(this.index + 1), this.slideWidth, 0);
            }
            if (!this.support.transform) {
                this.slidesContainer[0].style.left =
                    (this.index * -this.slideWidth) + 'px';
            }
        },

        unloadSlide: function (index) {
            var slide,
                firstChild;
            slide = this.slides[index];
            firstChild = slide.firstChild;
            if (firstChild !== null) {
                slide.removeChild(firstChild);
            }
        },

        unloadAllSlides: function () {
            var i,
                len;
            for (i = 0, len = this.slides.length; i < len; i++) {
                this.unloadSlide(i);
            }
        },

        toggleControls: function () {
            var controlsClass = this.options.controlsClass;
            if (this.container.hasClass(controlsClass)) {
                this.container.removeClass(controlsClass);
            } else {
                this.container.addClass(controlsClass);
            }
        },

        toggleSlideshow: function () {
            if (!this.interval) {
                this.play();
            } else {
                this.pause();
            }
        },

        getNodeIndex: function (element) {
            return parseInt(element.getAttribute('data-index'), 10);
        },

        getNestedProperty: function (obj, property) {
            property.replace(
                // Matches native JavaScript notation in a String,
                // e.g. '["doubleQuoteProp"].dotProp[2]'
                /\[(?:'([^']+)'|"([^"]+)"|(\d+))\]|(?:(?:^|\.)([^\.\[]+))/g,
                function (str, singleQuoteProp, doubleQuoteProp, arrayIndex, dotProp) {
                    var prop = dotProp || singleQuoteProp || doubleQuoteProp ||
                        (arrayIndex && parseInt(arrayIndex, 10));
                    if (str && obj) {
                        obj = obj[prop];
                    }
                }
            );
            return obj;
        },

        getDataProperty: function (obj, property) {
            if (obj.getAttribute) {
                var prop = obj.getAttribute('data-' +
                    property.replace(/([A-Z])/g, '-$1').toLowerCase());
                if (typeof prop === 'string') {
                    if (/^(true|false|null|-?\d+(\.\d+)?|\{[\s\S]*\}|\[[\s\S]*\])$/
                            .test(prop)) {
                        try {
                            return $.parseJSON(prop);
                        } catch (ignore) {}
                    }
                    return prop;
                }
            }
        },

        getItemProperty: function (obj, property) {
            var prop = obj[property];
            if (prop === undefined) {
                prop = this.getDataProperty(obj, property);
                if (prop === undefined) {
                    prop = this.getNestedProperty(obj, property);
                }
            }
            return prop;
        },

        initStartIndex: function () {
            var index = this.options.index,
                urlProperty = this.options.urlProperty,
                i;
            // Check if the index is given as a list object:
            if (index && typeof index !== 'number') {
                for (i = 0; i < this.num; i += 1) {
                    if (this.list[i] === index ||
                        this.getItemProperty(this.list[i], urlProperty) ===
                        this.getItemProperty(index, urlProperty)) {
                        index  = i;
                        break;
                    }
                }
            }
            // Make sure the index is in the list range:
            this.index = this.circle(parseInt(index, 10) || 0);
        },

        initEventListeners: function () {
            var that = this,
                slidesContainer = this.slidesContainer,
                proxyListener = function (event) {
                    var type = that.support.transition &&
                    that.support.transition.end === event.type ?
                        'transitionend' : event.type;
                    that['on' + type](event);
                };
            $(window).on('resize', proxyListener);
            $(document.body).on('keydown', proxyListener);
            this.container.on('click', proxyListener);
            if (this.support.touch) {
                slidesContainer
                    .on('touchstart touchmove touchend touchcancel', proxyListener);
            } else if (this.options.emulateTouchEvents &&
                this.support.transition) {
                slidesContainer
                    .on('mousedown mousemove mouseup mouseout', proxyListener);
            }
            if (this.support.transition) {
                slidesContainer.on(
                    this.support.transition.end,
                    proxyListener
                );
            }
            this.proxyListener = proxyListener;
        },

        destroyEventListeners: function () {
            var slidesContainer = this.slidesContainer,
                proxyListener = this.proxyListener;
            $(window).off('resize', proxyListener);
            $(document.body).off('keydown', proxyListener);
            this.container.off('click', proxyListener);
            if (this.support.touch) {
                slidesContainer
                    .off('touchstart touchmove touchend touchcancel', proxyListener);
            } else if (this.options.emulateTouchEvents &&
                this.support.transition) {
                slidesContainer
                    .off('mousedown mousemove mouseup mouseout', proxyListener);
            }
            if (this.support.transition) {
                slidesContainer.off(
                    this.support.transition.end,
                    proxyListener
                );
            }
        },

        handleOpen: function () {
            if (this.options.onopened) {
                this.options.onopened.call(this);
            }
        },

        initWidget: function () {
            var that = this,
                openHandler = function (event) {
                    if (event.target === that.container[0]) {
                        that.container.off(
                            that.support.transition.end,
                            openHandler
                        );
                        that.handleOpen();
                    }
                };
            this.container = $(this.options.container);
            if (!this.container.length) {
                this.console.log(
                    'blueimp Gallery: Widget container not found.',
                    this.options.container
                );
                return false;
            }
            this.slidesContainer = this.container.find(
                this.options.slidesContainer
            ).first();
            if (!this.slidesContainer.length) {
                this.console.log(
                    'blueimp Gallery: Slides container not found.',
                    this.options.slidesContainer
                );
                return false;
            }
            this.titleElement = this.container.find(
                this.options.titleElement
            ).first();
            if (this.num === 1) {
                this.container.addClass(this.options.singleClass);
            }
            if (this.options.onopen) {
                this.options.onopen.call(this);
            }
            if (this.support.transition && this.options.displayTransition) {
                this.container.on(
                    this.support.transition.end,
                    openHandler
                );
            } else {
                this.handleOpen();
            }
            if (this.options.hidePageScrollbars) {
                // Hide the page scrollbars:
                this.bodyOverflowStyle = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
            }
            this.container[0].style.display = 'block';
            this.initSlides();
            this.container.addClass(this.options.displayClass);
        },

        initOptions: function (options) {
            // Create a copy of the prototype options:
            this.options = $.extend({}, this.options);
            // Check if carousel mode is enabled:
            if ((options && options.carousel) ||
                (this.options.carousel && (!options || options.carousel !== false))) {
                $.extend(this.options, this.carouselOptions);
            }
            // Override any given options:
            $.extend(this.options, options);
            if (this.num < 3) {
                // 1 or 2 slides cannot be displayed continuous,
                // remember the original option by setting to null instead of false:
                this.options.continuous = this.options.continuous ? null : false;
            }
            if (!this.support.transition) {
                this.options.emulateTouchEvents = false;
            }
            if (this.options.event) {
                this.preventDefault(this.options.event);
            }
        }

    });

    return Gallery;
}));
(function(){
	mp20_picture_gallery.$inject = ["$scope", "mp20_picture_gallery_http_service"];
	angular.module("mp20App").controller("mp20_picture_gallery", mp20_picture_gallery);

	function mp20_picture_gallery($scope, mp20_picture_gallery_http_service){
		$scope.show_pictures_list = [];
		$scope.mp_restaurant_picture_list = [];
		$scope.instagram_picture_list = [];
		$scope.page = 1;
		$scope.thumbnail_size = "/256x256/";
		$scope.max_size = "/1024x1024/";

		$scope.init = init;
		$scope.open = open;
		$scope.close = close;
		$scope.get_restaurant_pictures = get_restaurant_pictures;
		$scope.get_instagram_pictures = get_instagram_pictures;
		$scope.get_all_pictures = get_all_pictures;
		$scope.get_params = get_params;
		$scope.select_tab = select_tab;
		$scope.get_background = get_background;
		$scope.get_restaurant_keyword = get_restaurant_keyword;
		$scope.get_instagram_pictures_for_hash = get_instagram_pictures_for_hash;
		$scope.value_init = value_init;
		$scope.set_stop_ajax = set_stop_ajax;
		$scope.show_picture_viewer = show_picture_viewer;
		$scope.get_restaurant_info = get_restaurant_info;
		$scope.now_tab = "";
		$scope.restaurant_uuid = "";
		$scope.restaurant_name = "";
		$scope.insta_offcial_picture_end = false;
		$scope.insta_picture_end = false;

		/**
		 * 갤러리에서 사용하는 탭 리스트를 정리한 value
		 * @type {{all: {tab_name: string, callback: Function}, mp: {tab_name: string, callback: Function}, insta: {tab_name: string, callback: Function}}}
		 */
		$scope.tab_list = {
			"all": {
				"tab_name": "all",
				"callback": function(){
					$scope.get_all_pictures();

					bind_infinite_scroll(200, function(){
						$scope.get_all_pictures();
					});
				},
				"get_background": {

				}
			},

			"mp": {
				"tab_name": "mp",
				"callback": function(){
					$scope.mp_restaurant_picture_list = [];
					$scope.get_restaurant_pictures();
					bind_infinite_scroll(200, $scope.get_restaurant_pictures);
				}
			},

			"insta": {
				"tab_name": "insta",
				"callback": function(){
					$scope.get_instagram_pictures();
					bind_infinite_scroll(200, $scope.get_instagram_pictures);
				}
			}
		};

		var source_type = "all",
				request_count = 21,
				picture_gallery_class = ".mp20_picture_gallery ",
				picture_gallery_scroll_area = ".photo_viewer_img_grid_container ";

		/**
		 * DOM Load 후 init 실행.
		 */
		angular.element(document).ready(function () {
			$scope.init();
		});

		/**
		 * 초기화를 위한 메서드.
		 * gallery wrap을 캐싱해준다.
		 */
		function init(){
			if(window.mp20.push_status_server){
				window.mp20.push_status_server.add_event("gallery", open_logic, close);
			}

			$scope.$picture_gallery = $(picture_gallery_class);
			$scope.$picture_gallery_scroll_area = $(picture_gallery_class + picture_gallery_scroll_area);
			$scope.value_init();
		}

		function get_restaurant_info(restaurant_uuid){
			mp20_picture_gallery_http_service.get_restaurant_info(restaurant_uuid).then(function(restaurant_info){
				$scope.mp_picture_count = restaurant_info.picture_count;
			}).catch(function(err){
				console.error(err);
			});
		}
		function bind_infinite_scroll(page_limit_px, callback){
			$scope.$picture_gallery_scroll_area.scroll(function() {
				var scrollPos = $(this).scrollTop(),
						scrollheight = $(this).height(),
						load_more_page_limit = page_limit_px || 400;

				if($scope.$picture_gallery_scroll_area.prop("scrollHeight") - (scrollPos + scrollheight)  < load_more_page_limit){
					callback();
				}
			});
		}

		function unbind_infinite_scroll(){
			$scope.$picture_gallery_scroll_area.unbind("scroll");
		}

		function value_init(){
			$scope.is_insta_id_existence = "";
			$scope.is_ajaxing = false;
			$scope.stop_ajax = false;
			$scope.show_picture_list = [];
			$scope.insta_next_url = "";
			$scope.is_mp_restaurant_complate = "";
		}

		/**
		 * gallery를 열어주는 메서드.
		 * @param restaurant_uuid - 보여줄 레스토랑의 restaurant_uuid
		 * @param restaurant_name - 보여줄 레스토랑의 restaurant_name
		 */
		function open(restaurant_uuid, restaurant_name, tab_name){
			window.mp20.push_status_server.trigger_event(window.mp20.push_status_server.make_open_action("gallery"), arguments);
		}

		function open_logic(restaurant_uuid, restaurant_name, tab_name){
			if(tab_name){
				$scope.stop_ajax = false;
				$scope.insta_offcial_picture_end = false;
			}

			tab_name = tab_name || "all";
			restaurant_name = restaurant_name.replace(/ /g,'');
			$scope.restaurant_uuid = restaurant_uuid;
			$scope.restaurant_name = restaurant_name;
			$scope.$picture_gallery.show();
			$scope.select_tab(tab_name);
			$scope.get_restaurant_info(restaurant_uuid);
			$scope.mp_restaurant_picture_list = [];

			scroll_lock_for_gallery();
			$("body").addClass("ovf_hidden");
		}
		window.mp20_picture_gallery_open = open;
		window.mp20_picture_gallery_close = close;
		window.mp20_picture_gallery_select_tab = select_tab;

		/**
		 * gallery를 닫아주는 메서드.
		 */
		function close(){
			$scope.$picture_gallery.hide();
			unscroll_lock_for_gallery();
//			$("body").removeClass("ovf_hidden");
		}

		function show_picture_viewer(pictures, index){
			if(Array.isArray(pictures)){
				var picture_list = pictures;
			} else {
				var background_obj = $scope.get_background(pictures, $scope.max_size),
								picture_url = /^url\((['"]?)(.*)\1\)$/.exec(background_obj["background-image"]);

				picture_url = picture_url ? picture_url[2] : "";
				picture_url = [picture_url];
			}

			mp20_new_gallery.open_gallery(picture_list || picture_url, index, {
				"from_gallery": true,
				"restaurant_uuid": mp20_new_gallery.restaurant_uuid,
				"type": "restaurant",
				"title": $scope.restaurant_name
			});

			$scope.close();
		}

		/**
		 * 모든 사진을 가져오는 메서드.
		 */
		function get_all_pictures(){
			if($scope.is_ajaxing){
				return false;
			}

			if($scope.is_mp_restaurant_complate){
				get_instagram_pictures();
			} else {
				$scope.is_ajaxing = true;

				var params = $.extend(get_params(), {"restaurant_uuid": $scope.restaurant_uuid});
				mp20_picture_gallery_http_service.get_restaurant_pictures(params).then(function(restaurant_pictures){
					if(restaurant_pictures.length < request_count){
						$scope.is_mp_restaurant_complate = true;
						$scope.page = 0;
						$scope.stop_ajax = false;
					}

					$scope.show_picture_list = $scope.show_picture_list.concat(restaurant_pictures);
					$scope.page = $scope.page + 1;
					$scope.is_ajaxing = false;

//					if($scope.page === 1 && $scope.is_mp_restaurant_complate){
//						$scope.get_all_pictures();
//					}
				});
			}
		}

		/**
		 * 현재 레스토랑의 사진들을 가져오는 메서드.
		 */
		function get_restaurant_pictures(callback){
			if($scope.is_ajaxing || $scope.stop_ajax){
				return false;
			}

			$scope.is_ajaxing = true;
			var params = $.extend(get_params(), {"restaurant_uuid": $scope.restaurant_uuid});

			mp20_picture_gallery_http_service.get_restaurant_pictures(params).then(function(restaurant_pictures){

				$scope.set_stop_ajax(restaurant_pictures.length);

				if(callback){
					callback(restaurant_pictures);
				}

				$scope.mp_restaurant_picture_list = picture_concat($scope.mp_restaurant_picture_list, restaurant_pictures);
				$scope.show_picture_list = $scope.mp_restaurant_picture_list;
				$scope.is_ajaxing = false;
			});

			$scope.page = $scope.page + 1;
		}

		/**
		 * 현재 레스토랑의 인스타그램 사진들을 가져오는 메서드.
		 */
		function get_instagram_pictures(){
			if($scope.is_ajaxing || $scope.stop_ajax){
				return false;
			}

			$scope.is_ajaxing = true;

			if($scope.insta_offcial_picture_end){
				var insta_tagged_picture_promise = mp20_picture_gallery_http_service.get_insta_tagged_picture($scope.restaurant_uuid);

				insta_tagged_picture_promise.then(function(insta_data){
					$scope.instagram_picture_list = $scope.instagram_picture_list.concat(insta_data.data);
					bind_show_picture_list(insta_data.data);
					$scope.is_ajaxing = false;
					$scope.insta_picture_end = true;
					$scope.stop_ajax = true;
				});
			} else {
				var insta_official_picture_promise = mp20_picture_gallery_http_service.get_insta_official_picture($scope.restaurant_uuid);
				insta_official_picture_promise.then(function(insta_data){
					bind_show_picture_list(insta_data.data);
					$scope.is_ajaxing = false;
					$scope.insta_offcial_picture_end = true;

					if(!insta_data.length){
						$scope.get_instagram_pictures();
					}
				});
			}
		}

		function get_insta_picture_logic(instagram_pictures){
			if(instagram_pictures.length > 0){
				bind_show_picture_list($scope.instagram_picture_list);

				$scope.is_insta_id_existence = true;
				$scope.is_ajaxing = false;
			} else {
				$scope.is_insta_id_existence = false;
				$scope.get_instagram_pictures_for_hash();
			}
		}

		function get_instagram_pictures_for_hash(){
			mp20_picture_gallery_http_service.get_instagram_pictures_for_hash(trim($scope.restaurant_name)).then(function(instagram_pictures){
				insta_data_setting(instagram_pictures);
			});
		}

		function set_stop_ajax(picture_length){
			if(picture_length < request_count){
				$scope.stop_ajax = true;
			}
		}

		function insta_data_setting(instagram_pictures){
			if(!_.isEmpty(instagram_pictures)){
				$scope.insta_next_url = instagram_pictures.pagination.next_url;
				$scope.instagram_picture_list = $scope.instagram_picture_list.concat(instagram_pictures.data);
				bind_show_picture_list(instagram_pictures.data);
				$scope.is_ajaxing = false;
			} else {
				$scope.insta_next_url =  "";
				$scope.instagram_picture_list = $scope.instagram_picture_list.concat([]);
				$scope.is_ajaxing = false;
			}
		}

		function picture_concat(target_arr, add_arr){
			target_arr = target_arr.concat(add_arr);
			return target_arr;
		}

		function bind_show_picture_list(target_arr){
			$scope.show_picture_list = $scope.show_picture_list.concat(target_arr);
		}

		/**
		 * 탭을 선택하면 해당 탭에 대한 callback을 실행 시켜주는 메서드.
		 * @param tab_name - 선택한 tab_name
		 */
		function select_tab(tab_name){
			unbind_infinite_scroll();
			$scope.value_init();

			if(tab_name === "insta"){
				ga('send', 'event', "PG_GALLERY_INSTA", "CLICK_INSTA_TAB", '', 1);
			}

			$scope.page = 1;
			var tab_obj = $scope.tab_list[tab_name];

			if(tab_obj){
				$scope.now_tab = tab_obj.tab_name;
				tab_obj.callback();
				$scope.show_loading = true;
			}
		}

		$scope.$watch("is_ajaxing", function(new_value){
			if(!new_value){
				$scope.show_loading = false;
			}
		});

		/**
		 * 사진들을 가져올때 전달할 공통 파라미터를 리턴해주는 메서드.
		 * @returns {{start_index: *, request_count: number, restaurant_uuid: *, source_type: string}}
		 */
		function get_params(){
			return {
				"start_index": get_start_index(),
				"request_count": request_count,
				"restaurant_uuid": $scope.restaurant_uuid,
				"source_type": source_type
			};
		}

		/**
		 * start index를 리턴해주는 메서드.
		 * @returns {number} - start index
		 */
		function get_start_index(){
			return ($scope.page - 1) * 10;
		}

		function get_background(picture, thumbnail_size){
			var picture_url,
							thumbnail_size = thumbnail_size || $scope.thumbnail_size;

			if($scope.now_tab === $scope.tab_list.mp.tab_name){
				picture_url = picture.pic_domain + thumbnail_size + picture.pic_key;
			} else if($scope.now_tab === $scope.tab_list.insta.tab_name){
				if(is_mobile_viewport()){
					picture_url = picture.images.low_resolution.url;
				} else {
					picture_url = picture.images.standard_resolution.url;
				}
			} else {
				if(picture.restaurant){
					picture_url = picture.pic_domain + thumbnail_size + picture.pic_key;
				} else {
					if(is_mobile_viewport()){
						picture_url = picture.images.low_resolution.url;
					} else {
						picture_url = picture.images.standard_resolution.url;
					}
				}
			}

			return {
				"background-image": "url('" + picture_url + "'), url('https://mp-seoul-image-production-s3.mangoplate.com/web/resources/kssf5eveeva_xlmy.jpg')"
			}
		}


		function get_restaurant_keyword(){
			mp20_picture_gallery_http_service.get_restaurant_keyword($scope.restaurant_uuid).then(function(info){
				console.dir(info);
			}).catch(function(err){
				console.dir(err);
			})
		}
	}
})();
(function(){
	mp20_picture_gallery_http_service.$inject = ["$http", "$q", "mp20_util_service"];
	angular.module("mp20App").factory("mp20_picture_gallery_http_service", mp20_picture_gallery_http_service);

	function mp20_picture_gallery_http_service($http, $q, mp20_util_service){
		var mp20_picture_gallery_http_service = {};

		mp20_picture_gallery_http_service.api_host = "https://stage.mangoplate.com";
		mp20_picture_gallery_http_service.api_url = {
			'get_restaurant_pictures': "/api/v5/restaurants/{restaurant_uuid}/pictures.json",
			'get_restaurant_info': "/api/v5/restaurants/{restaurant_uuid}/additional.json",
			"restaurant_info": "/api/v5/restaurants/{restaurant_uuid}.json",
			"get_insta_official_picture": "/api/v5/restaurants/%restaurant_uuid%/insta/pictures/official.json",
			"get_insta_tagged_picture": "/api/v5/restaurants/%restaurant_uuid%/insta/pictures/tagged.json"
		};

		mp20_picture_gallery_http_service.common_param = {
			"device_type": get_device_type(),
			"device_uuid": get_device_uuid(),
			"language": getLanguage()
		};

		/**
		 * 망고플레이트 사진을 가져올때 사용하는 메서드.
		 * @param param_obj - request_count, start_index, restaurant_uuid 등이 들어 있는 parameter object
		 * @returns {promise}
		 */
		mp20_picture_gallery_http_service.get_restaurant_pictures = function(param_obj){
			var defer = $q.defer(),
					call_url = this.api_host + this.api_url.get_restaurant_pictures;

			call_url = call_url.replace("{restaurant_uuid}", param_obj.restaurant_uuid);
			param_obj = $.extend(param_obj, this.common_param);

			$http.get(call_url, {
				"params": param_obj
			}).then(function(picture_list){
				defer.resolve(picture_list.data);
			}).catch(function(err){
				defer.reject(err);
			});

			return defer.promise;
		};

		/**
		 * 식당사진과 인스타그램 사진 모두 리턴해주는 메서드.
		 * @param param_obj - request_count, start_index, restaurant_uuid 등이 들어 있는 parameter object
		 * @returns {promise}
		 */
		mp20_picture_gallery_http_service.get_all_pictures = function(param_obj){
			return $q.all([this.get_restaurant_pictures(param_obj), this.get_instagram_pictures_for_restaurant(param_obj.restaurant_uuid)])
		};

		mp20_picture_gallery_http_service.get_restaurant_keyword = function(restaurant_uuid){

			var defer = $q.defer(),
					call_url = this.api_host + this.api_url.get_restaurant_info,
					params = $.extend(this.common_param, {
						"fields": "keywords"
					});

			call_url = call_url.replace("{restaurant_uuid}", restaurant_uuid);

			$http.get(call_url,{
				params: params
			}).then(function(picture_list){
				defer.resolve(picture_list);
			}).catch(function(err){
				defer.reject(err);
			});

			return defer.promise;
		};

		mp20_picture_gallery_http_service.get_restaurant_info = function(restaurant_uuid){
			var call_url = this.api_host + this.api_url.restaurant_info,
						defer = $q.defer();

			call_url = call_url.replace("{restaurant_uuid}", restaurant_uuid);

			$http.get(call_url, {
				params: {
					"language": getLanguage()
				}
			}).then(function(data){
				defer.resolve(data.data);
			}).catch(function(err){
				defer.reject(err);
			});

			return defer.promise;
		};

		/**
		 * 인스타 official 사진을 가져오는 메서드.
		 * @param restaurant_uuid - 가져올 식당의 레스토랑 UUID.
		 * @returns {promise} - official 사진 정보를 가지고 있는 promise 인스턴스.
		 */
		mp20_picture_gallery_http_service.get_insta_official_picture = function(restaurant_uuid){
			var call_url = this.api_host + this.api_url.get_insta_official_picture,
					common_param;

			call_url = call_url.replace("%restaurant_uuid%", restaurant_uuid);
			common_param = mp20_util_service.make_params();

			return mp20_util_service.call_api_promise(call_url, "get", common_param);
		};

		/**
		 * 인스타 tag로 사진을 가져오는 메서드.
		 * @param restaurant_uuid - 가져올 식당의 레스토랑 UUID.
		 * @returns {promise} - tag로 매칭된 사진을 담은 promise 인스턴스.
		 */
		mp20_picture_gallery_http_service.get_insta_tagged_picture = function(restaurant_uuid){
			var call_url = this.api_host + this.api_url.get_insta_tagged_picture,
					common_param;

			call_url = call_url.replace("%restaurant_uuid%", restaurant_uuid);
			common_param = mp20_util_service.make_params();

			return mp20_util_service.call_api_promise(call_url, "get", common_param);
		};

		return mp20_picture_gallery_http_service;
	}
})();
(function () {
  /**
   * Element의 Text를 replacer해주는 객체
   * @namespace
   */
  var text_replacer = (function () {
    /**
     * replace Text in Element
     * @param {jQuery} $el - target Element
     * @param {text} text
     */
    function replace($el, text) {
      $el.text(text);
    }

    /**
     * Public API
     */
    return {
      replace: replace
    };
  })();

  if (!window.mp20) {
    window.mp20 = {};
  }

  window.mp20.text_replacer = text_replacer;
})();
(function () {
  /**
   * translate API Base URL
   * @type {string}
   */
  var API_BASE_URL = "https://iglm69lej5.execute-api.ap-northeast-1.amazonaws.com/prod";

  /**
   * text 번역을 담당하는 객체
   * @namespace
   */
  var translator = (function () {
    /**
     * text 번역 Function
     * @param {string} q - 번역할 Text
     * @param {string} source - q의 언어셋
     * @param {string} target - 번역할 언어셋
     * @returns {promise}
     */
    function translate(q, source, target) {
      return _request_translate(q, source, target);
    }

    /**
     * 번역 요청 API
     * @param {string} q - 번역할 Text
     * @param {string} source - q의 언어셋
     * @param {string} target - 번역할 언어셋
     * @returns {promise}
     */
    function _request_translate(q, source, target) {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: API_BASE_URL + "/translate",
          method: "POST",
          data: JSON.stringify({
            q: q,
            source: source,
            target: target
          }),
          beforeSend: function (xhr) {
            xhr.setRequestHeader("x-api-key", "nbJUc1hoHv1lKRFyPXmF24XmrJYix8FL8O8fN00x");
            xhr.setRequestHeader("Content-Type", "application/json");
          },
          success: function (data) {
            resolve(data);
          },
          fail: function (err) {
            reject(err);
          }
        })
      });
    }

    /**
     * public API
     */
    return {
      translate: translate
    }
  })();

  /**
   * 전역객체에 바인딩.
   */
  if (!window.mp20) {
    window.mp20 = {};
  }

  window.mp20.translator = translator;
})();
(function () {
  /**
   * TranslateItem
   * @param {string} original_text
   * @param {string} translate_text
   * @constructor
   */
  function TranslateItem(original_text, translate_text) {
    this.original_text = original_text;
    this.translate_text = translate_text;
  }

  if (!window.mp20) {
    window.mp20 = {};
  }

  window.mp20.TranslateItem = TranslateItem;
})();
(function () {
  var TranslateItem = nameSpace("mp20.TranslateItem");

  /**
   * Translate Item Manager
   * @namespace
   */
  var translate_repository = (function () {
    /**
     * translate object repository
     * @type {object}
     * @private
     */
    var _repository = [];

    /**
     * Add translateItem
     * @param {string} original_text
     * @param {string} translate_text
     */
    function add(original_text, translate_text) {
      _repository.push(new TranslateItem(original_text, translate_text));
    }

    /**
     * get original text by original_text
     * @param {string} translate_text
     * @returns {string|undefined}
     */
    function get_original_text(translate_text) {
      var item = _repository.filter(function (item) {
        return item.translate_text === translate_text;
      })[0];

      return item ? item.original_text : undefined;
    }

    /**
     * get translate text by original_text
     * @param {string} original_text
     * @returns {string|undefined}
     */
    function get_translate_text(original_text) {
      var item = _repository.filter(function (item) {
        return item.original_text === original_text;
      })[0];

      return item ? item.translate_text : undefined;
    }

    /**
     * set translate text by original_text
     * @param {string} original_text
     * @param {string} translate_text
     */
    function set_translate_text(original_text, translate_text) {
      if(!_repository[original_text]) {
        add(original_text, translate_text);
        return ;
      }

      _repository[original_text].translate_text = translate_text;
    }

    /**
     * repository in original_text
     * @param {string} original_text
     * @returns {boolean}
     */
    function has(original_text) {
      return _repository.some(function (item) {
        return item.original_text === original_text && item.translate_text;
      })
    }

    /**
     * Public API
     */
    return {
      add: add,
      get_original_text: get_original_text,
      get_translate_text: get_translate_text,
      set_translate_text: set_translate_text,
      has: has
    };
  })();

  if (!window.mp20) {
    window.mp20 = {};
  }

  window.mp20.translate_repository = translate_repository;
})();
(function () {
  var translate_repository = nameSpace("mp20.translate_repository");
  var translator = nameSpace("mp20.translator");
  var text_replacer = nameSpace("mp20.text_replacer");

  var TRANSLATE_STATE = {
    ORIGINAL: 'ORIGINAL',
    TRANSLATE: 'TRANSLATE'
  };

  /**
   * Element Text translate
   * @namespace
   */
  var element_translator = (function () {
    /**
     * translate Text to target
     * @param text - translate target text
     * @param state - now state
     * @param source_language - now text language
     * @param target_language - translate target language
     * @returns {promise}
     */
    function translate(text, state, source_language, target_language) {
      return new Promise(function (resolve, reject) {
        switch (state) {
          case TRANSLATE_STATE.TRANSLATE:
            _handle_translate_state(text, resolve);
            break;

          case TRANSLATE_STATE.ORIGINAL:
          default:
            _handle_original_state(text, source_language, target_language, resolve, reject);
            break;
        }
      })
    }

    /**
     * original state to translate state handler
     * @param {string} text - translated text
     * @param {string} source_language - text source language
     * @param {string} target_language - text target language
     * @param {function} resolve - Promise resolve function
     * @param {function} reject - Promise reject function
     * @private
     */
    function _handle_original_state(text, source_language, target_language, resolve, reject) {
      var translated_text = translate_repository.get_translate_text(text);

      if (!text.trim()) {
        reject();
        return;
      }

      if (translated_text) {
        _process_original_state(text, translated_text, resolve);
        return;
      }

      // TODO: get_language()를 I18n.curentLocale()로 변경 예정
      translator
        .translate(text, source_language, target_language)
        .then(function (data) {
          _process_original_state(text, data.result, resolve);
        })
        .catch(function (err) {
          reject(err);
        });
    }

    /**
     * translate state to original state handler
     * @param {string} text - translated text
     * @param {function} resolve - Promise resolve function
     * @private
     */
    function _handle_translate_state(text, resolve) {
      resolve({
        state: TRANSLATE_STATE.ORIGINAL,
        text: translate_repository.get_original_text(text),
        btn_text: get_btn_text_by_state(TRANSLATE_STATE.ORIGINAL)
      });
    }

    /**
     * original to translate business logic
     * @param {string} original_text
     * @param {string} translate_text
     * @param {function} resolve
     * @private
     */
    function _process_original_state(original_text, translate_text, resolve) {
      translate_repository.set_translate_text(original_text, translate_text);

      resolve({
        state: TRANSLATE_STATE.TRANSLATE,
        text: translate_text,
        btn_text: get_btn_text_by_state(TRANSLATE_STATE.TRANSLATE)
      });
    }

    /**
     * get btn_text by translate state
     * @param state - target state
     * @return {string}
     */
    function get_btn_text_by_state(state) {
      switch (state) {
        case TRANSLATE_STATE.TRANSLATE:
          return I18n.t("label.lang_see_original");
        case TRANSLATE_STATE.ORIGINAL:
        default:
          return I18n.t("label.lang_see_translation");
        return;
      }
    }

    /**
     * Public API
     */
    return {
      translate: translate,
      get_btn_text_by_state: get_btn_text_by_state,
      TRANSLATE_STATE: TRANSLATE_STATE
    }
  })();

  if (!window.mp20) {
    window.mp20 = {};
  }

  window.mp20.element_translator = element_translator;
})();
(function () {
  var VISIBLE_LOCALE_MAP = {
    "en": ["kor"],
    "zh": ["kor"]
  };
  var member_uuid = auth_service.get_member_uuid();

  var visible_translate_btn = {
    is_show: function (page_locale, source_language, text, review_member_uuid) {
      if(!text || (member_uuid && member_uuid === review_member_uuid)) {
        return false;
      }

      return VISIBLE_LOCALE_MAP[page_locale] && text.trim()
        ? VISIBLE_LOCALE_MAP[page_locale].indexOf(source_language) > -1
        : false;
    }
  };

  if (!window.mp20) {
    window.mp20 = {};
  }

  window.mp20.visible_translate_btn = visible_translate_btn;
})();
(function () {
  var CONSTANTS = (function () {
    return {
      SHOW_LAYER_CLASS: 'AppDownloadLayer--Show',
      SHOW_BLACK_DEEM_LAYER_CLASS: 'AppDownloadLayer__BlackDeem--Show',
      PAGE_NAME: 'PU_DWN_RESTAURANT_COUPON',
      TYPE: {
        EAT_DEAL: 'EAT_DEAL',
        COUPON: 'COUPON',
        NORMAL: 'NORMAL'
      },
      TYPE_BY_MESSAGE: {
        EAT_DEAL: I18n.t('app_download_layer.eat_deal_description'),
        COUPON: I18n.t('app_download_layer.coupon_description'),
        NORMAL: I18n.t('app_download_layer.normal_description'),
      }
    }
  })();

  var defaultOption = {
    android: true,
    ios: true
  }

  var app_download_layer = {
    TYPE: CONSTANTS.TYPE,

    init: function () {
      this.layer = $('.AppDownloadLayer');
      this.message = $('.AppDownloadLayer__Description');
      this.black_deem = $('.AppDownloadLayer__BlackDeem');
      this.close_btn = $('.AppDownloadLayer__CloseBtn');
      this.ios_download_btn = $('.AppDownloadLayer__AppBtnIOS');
      this.android_download_btn = $('.AppDownloadLayer__AppBtnAndroid');

      this.bind_event();
    },

    bind_event: function () {
      this.black_deem.on('click', this.close_layer.bind(this));
      this.close_btn.on('click', this.close_layer.bind(this));

      this.ios_download_btn.on('click', function () {
        common_ga(CONSTANTS.PAGE_NAME, 'CLICK_IOS_STORE');
      });
      this.android_download_btn.on('click', function () {
        common_ga(CONSTANTS.PAGE_NAME, 'CLICK_ANDROID_STORE');
      });
    },

    open_layer: function (type, options) {
      options = _.assign({}, defaultOption, options);
      this.set_message(type);
      this._setContent(options);
      this.layer.addClass(CONSTANTS.SHOW_LAYER_CLASS);
      this.black_deem.addClass(CONSTANTS.SHOW_BLACK_DEEM_LAYER_CLASS);
      common_ga_page(CONSTANTS.PAGE_NAME);
    },

    _setContent: function(options) {
      if (options.android) {
        $('.AppDownloadLayer__ButtonList').show();
        $('.AppDownloadLayer__AppBtnAndroid').addClass('AppDownloadLayer__AppBtn--Show');
      } else {
        $('.AppDownloadLayer__PreparingMessageList').show();
        $('.AppDownloadLayer__PreparingMessage--Android').show();
      }

      if (options.ios) {
        $('.AppDownloadLayer__ButtonList').show();
        $('.AppDownloadLayer__AppBtnIOS').addClass('AppDownloadLayer__AppBtn--Show');
      } else {
        $('.AppDownloadLayer__PreparingMessageList').show();
        $('.AppDownloadLayer__PreparingMessage--IOS').show();
      }

      if (options.android && options.ios) {
        $('.AppDownloadLayer__PreparingMessageList').hide();
      }
    },

    close_layer: function () {
      this.layer.removeClass(CONSTANTS.SHOW_LAYER_CLASS);
      this.black_deem.removeClass(CONSTANTS.SHOW_BLACK_DEEM_LAYER_CLASS);
    },

    set_message: function (type) {
      this.message.html(CONSTANTS.TYPE_BY_MESSAGE[type]);
    }
  };

  $(document).ready(function () {
    app_download_layer.init();
  });

  window.mp20.app_download_layer = app_download_layer;
})();
(function () {
  function AkamaiImageConvertBuilder(image_src) {
    this.validation(image_src);
    this.set_image_src(image_src);
    this.build_strings = [];
  }

  AkamaiImageConvertBuilder.prototype = {
    validation: function (image_src) {
      if (!_.isString(image_src)) {
        throw new Error('image_src is not string type');
      }
    },

    set_image_src: function (image_src) {
      this.image_src = image_src;
    },

    resize: function (width, height) {
      if (!_.isNumber(width)) {
        throw new Error('width is not number type');
      }

      if (!_.isNumber(height)) {
        throw new Error('height is not number type');
      }

      this.add_build_string('resize=' + width + 'px:' + height + 'px');

      return this;
    },

    add_build_string: function (build_string) {
      this.build_strings.push(build_string);
    },

    get_url: function () {
      return this.build_strings.reduce(function (acc, build_string, index) {
        if (index === 0) {
          acc += '?';
        } else {
          acc += '&';
        }

        acc += build_string;

        return acc;
      }, this.image_src);
    },
  };

  window.mp20.AkamaiImageConvertBuilder = AkamaiImageConvertBuilder;
})();
(function (AkamaiImageConvertBuilder) {
  function Image(src, width, height) {
    this.validation(src, width, height);
    this.src = src;
    this.width = width;
    this.height = height;
  }

  Image.prototype = {
    validation: function (src, width, height) {
      if (!_.isString(src)) {
        throw new Error('src is not string type');
      }

      if (!_.isNumber(width)) {
        throw new Error('width is not number type');
      }

      if (!_.isNumber(height)) {
        throw new Error('height is not number type');
      }
    },

    to_akamai: function () {
      return new AkamaiImageConvertBuilder(this.src)
        .resize(this.width, this.height)
        .get_url();
    },
  };

  window.mp20.Image = Image;
})(window.mp20.AkamaiImageConvertBuilder);
(function (global, Image) {
  function ImageSizeByRatio(image_src, target_width) {
    this.validation(image_src, target_width);
    this.image_src = image_src;
    this.target_width = target_width;
  }

  ImageSizeByRatio.prototype = {
    validation: function (image_src, target_width) {
      if (!_.isString(image_src)) {
        throw new Error('image_src is not string type');
      }

      if (!_.isNumber(target_width)) {
        throw new Error('target_width is not number type');
      }
    },

    load: function () {
      return new Promise(function (resolve) {
        var img_el = document.createElement('img');
        img_el.src = this.image_src;
        img_el.onload = function () {
          var device_pixel_ratio = global.devicePixelRatio;
          var width = (img_el.naturalWidth || img_el.width);
          var height = (img_el.naturalHeight || img_el.height);
          var target_height = Math.round((height * this.target_width) / width);

          resolve(new Image(this.image_src, this.target_width * device_pixel_ratio, target_height * device_pixel_ratio));
        }.bind(this);
      }.bind(this));
    },
  };

  window.mp20.ImageSizeByRatio = ImageSizeByRatio;
})(window, window.mp20.Image);
(function () {
  function View() {

  }

  window.mp20.view['Interface'] = View;
})();
(function () {
  var storage = window.localStorage;

  var LocalStorage = (function () {
    return {
      get length() {
        return storage.length;
      },

      key: function (index) {
        return storage.key(index);
      },

      getItem: function (key) {
        return storage.getItem(key);
      },

      setItem: function (key, value) {
        storage.setItem(key, value);
      },

      removeItem: function (key) {
        storage.removeItem(key);
      },

      clear: function () {
        storage.clear();
      },

      isSupported: function () {
        var isSupport = false;

        try {
          var testKey = 'MP_TEST_KEY';
          var testValue = 'MP_TEST_KEY/value';

          storage.setItem(testKey, testValue);
          var isEqualGetedValue = testValue === storage.getItem(testKey);

          storage.removeItem(testKey);
          var isEmptyValue = storage.getItem(testKey) === null;

          return isEqualGetedValue && isEmptyValue;
        } catch (e) {
          isSupport = false;
        }

        return isSupport;
      }
    };
  })();

  window.mp20.utils['LocalStorage'] = LocalStorage;
})();
(function () {
  var STORAGE_KEY = 'INVISIBLE_TOOLTIPS';
  var STORAGE = window.mp20.utils.LocalStorage;

  function TooltipVisibilityService(page, name) {
    this._page = page;
    this._name = name;
  }

  TooltipVisibilityService.prototype = {
    canVisible: function () {
      return this._getInvisibles().indexOf(this._getKey()) === -1;
    },

    setInvisible: function () {
      var invisibles = this._getInvisibles();
      var key = this._getKey();

      if (this._isInvisibled(key)) {
        return;
      }

      invisibles.push(key);
      this._setValue(invisibles);
    },

    remove: function() {
      var invisibles = this._getInvisibles();
      var index = invisibles.indexOf(this._getKey());

      if (index === -1) {
        return ;
      }

      invisibles.splice(index, 1);

      this._setValue(invisibles);
    },

    _getInvisibles: function () {
      return safe_json_parse(STORAGE.getItem(STORAGE_KEY)) || [];
    },

    _getKey: function () {
      return this._page + '/' + this._name;
    },

    _setValue: function (invisibles) {
      STORAGE.setItem(STORAGE_KEY, JSON.stringify(invisibles));
    },

    _isInvisibled: function (key) {
      var invisibles = this._getInvisibles();

      return invisibles.indexOf(key) > -1;
    }
  };

  window.mp20.service['TooltipVisibilityService'] = TooltipVisibilityService;
})();
(function () {
  function TooltipTemplateBuilder(message, isNew) {
    this._shouldLoadTemplate();

    this._message = message;
    this._isNew = isNew;
  }

  TooltipTemplateBuilder.prototype = {
    _shouldLoadTemplate: function () {
      if (TooltipTemplateBuilder.template) {
        return;
      }

      var tempalteEl = document.getElementById('TooltipTemplate');

      if (!tempalteEl) {
        throw new Error('template is not found');
      }

      TooltipTemplateBuilder.template = Handlebars.compile(tempalteEl.innerHTML);
    },

    _parseTemplate: function () {
      return $(TooltipTemplateBuilder.template({
        message: this._message,
        isNew: this._isNew
      }));
    },

    build: function () {
      return this._parseTemplate();
    }
  };

  window.mp20.view.templateBuilder['TooltipTemplateBuilder'] = TooltipTemplateBuilder;
})();
(function () {
  function FadeSliderView($leftEl, $sliderEl) {
    this._$leftEl = $($leftEl);
    this._$sliderEl = $($sliderEl);
    this._scrollHandler = null;
    this._resizeHandler = null;
    this._setSpaceByBetweenPadding();
    this._bindEvent();
  }

  FadeSliderView.prototype = {
    _bindEvent: function () {
      this._scrollHandler = this._handleScrollSlider.bind(this);
      this._resizeHandler = this._handleResize.bind(this);

      this._$sliderEl.on('scroll', this._scrollHandler);
      $(window).on('resize', this._resizeHandler);
    },

    _unbindEvent: function () {
      this._$sliderEl.off('scroll', this._scrollHandler);
      this._$sliderEl.off('resize', this._resizeHandler);
      this._scrollHandler = null;
      this._resizeHandler = null;
    },

    _handleScrollSlider: function () {
      this._setOpacityByScrollLeft();
    },

    _handleResize: function() {
      this._setSpaceByBetweenPadding();
      this._setOpacityByScrollLeft();
    },

    _getSpaceByBetweenPadding: function () {
      var leftElWidth = this._$leftEl.width();
      var rightElPadding = stringPXToNumber(this._$sliderEl.css('padding-left'));

      return rightElPadding - leftElWidth;
    },

    _setSpaceByBetweenPadding: function() {
      this._betweenSpace = this._getSpaceByBetweenPadding();
    },

    _setOpacityByScrollLeft: function() {
      var scrollLeft = this._$sliderEl.scrollLeft();

      this._setOpacity(scrollLeft);
    },

    _setOpacity: function(scrollLeft) {
      this._$leftEl.css('opacity', this._getFadeOpacity(scrollLeft));
    },

    _getFadeOpacity: function (scrollLeft) {
      var fadeOpacity = 1 - (scrollLeft / this._betweenSpace);

      if (fadeOpacity >= 1) {
        return 1;
      }

      if (fadeOpacity <= 0) {
        return 0;
      }

      return fadeOpacity;
    },

    destory: function () {
      this._unbindEvent();
    },
  };

  window.mp20.view['FadeSliderView'] = FadeSliderView;
})();
(function () {
  var EllipsisTextView = function (selector, config) {
    this._$el = $(selector);
    this._config = config;

    this._ellipsis();

    if (config.responsive) {
      this._bindResizeEvent();
    }
  };

  EllipsisTextView.prototype = {
    _ellipsis: function () {
      this._$el.ellipsis(this._config);
    },

    _bindResizeEvent: function () {
      $(window).on('resize', this._handleResizeEvent.bind(this));
    },

    _handleResizeEvent: function () {
      this._ellipsis();
    },
  };

  window.mp20.view['EllipsisTextView'] = EllipsisTextView;
})();
(function () {
  var duration = 310;
  var durationClass = 'CenterSlider__Slider--Duration';
  
  function CenterSlider(selector) {
    if (!selector) {
      throw 'selector is empty';
    }
    
    var $selector = $(selector);
    
    if (!$selector.length) {
      throw 'selector is not found';
    }
    
    this.$selector = $selector;
    this.$container = null;
    this.itemLength = null;
    this.transformX = null;
    this.swiping = false;
    this.itemWidthList = [];
    this.currentIndex = 0;
    this.prevDeltaX = 0;
    
    this.toggleSliderClassToSelector();
    this.wrapContainer();
    this.setItemLength();
    this.setItemWidthList();
    this.setContainerWidth();
    this.appendArrow();
    this.moveSlider(this.currentIndex);
    this.bindPanEvent();
  }
  
  CenterSlider.prototype = {
    toggleSliderClassToSelector: function () {
      this.$selector.addClass('CenterSlider__Slider');
    },
    
    addDurationClassToSelector: function () {
      this.$selector.addClass(durationClass);
    },
  
    removeDurationClassToSelector: function() {
      this.$selector.removeClass(durationClass);
    },
    
    wrapContainer: function () {
      this.$selector.wrap('<div class="CenterSlider__Container"></div>');
      this.$container = this.$selector.parent();
    },
    
    setTransformX: function (x) {
      x = x || 0;
      
      var lastItemTransformX = (this.$selector.width() - this.$container.width()) * -1;
      
      if (x > 0 || x < lastItemTransformX) {
        return;
      }
      
      this.transformX = x;
      this.$selector.css('transform', 'translate(' + x + 'px, ' + '0)');
    },
    
    moveSlider: function () {
      this.toggleArrow();
      this.setTransformX(this.getTransformXByIndex(this.currentIndex));
      
      setTimeout(function () {
        this.removeDurationClassToSelector();
      }.bind(this), duration);
    },
    
    getTransformXByIndex: function (index) {
      if (this.isFirstIndex(index)) {
        this.setTransformX(0);
        return;
      }
      
      var offsetX = this.itemWidthList.slice(0, index).reduce(function (acc, val) {
        return acc + val;
      }, 0);
      var containerWidth = this.$container.width();
      var halfContainerWidth = containerWidth / 2;
      var itemWidth = this.itemWidthList[index];
      var halfItemWidth = itemWidth / 2;
      
      if (this.isLastIndex(index)) {
        return (offsetX * -1) + containerWidth - itemWidth;
      } else {
        return halfContainerWidth - offsetX - halfItemWidth;
      }
    },
    
    setItemWidthList: function () {
      this.$selector.children().each(function (i, el) {
        this.itemWidthList.push($(el).outerWidth(true));
      }.bind(this));
    },
    
    setItemLength: function () {
      this.itemLength = this.$selector.children().length;
    },
    
    getItemsWidth: function () {
      return this.itemWidthList.reduce(function (acc, val) {
        return acc + val;
      }, 0);
    },
    
    setContainerWidth: function () {
      this.$selector.css('width', this.getItemsWidth());
    },
    
    appendArrow: function () {
      this.$prev = $('<button class="CenterSlider__Arrow CenterSlider__Arrow--Prev"></button>');
      this.$next = $('<button class="CenterSlider__Arrow CenterSlider__Arrow--Next"></button>');
      this.$arrowWrap = $('<div></div>');
      this.$arrowWrap.append(this.$prev);
      this.$arrowWrap.append(this.$next);
      
      this.bindArrowEvent(this.$prev, this.$next);
      this.$container.append(this.$arrowWrap);
    },
    
    removeArrow: function () {
      this.$arrowWrap.remove();
    },
    
    bindArrowEvent: function ($prev, $next) {
      $prev.on('click', this.handleClickPrevArrow.bind(this));
      $next.on('click', this.handleClickNextArrow.bind(this));
    },
    
    movePrev: function () {
      if (this.isFirstIndex(this.currentIndex)) {
        return;
      }
      
      this.currentIndex = this.currentIndex - 1;
      this.addDurationClassToSelector();
      this.moveSlider();
    },
    
    moveNext: function () {
      if (this.isLastIndex(this.currentIndex)) {
        return;
      }
      
      this.currentIndex = this.currentIndex + 1;
      this.addDurationClassToSelector();
      this.moveSlider();
    },
    
    handleClickPrevArrow: function () {
      this.movePrev();
    },
    
    handleClickNextArrow: function () {
      this.moveNext();
    },
    
    isFirstIndex: function (index) {
      return index === 0;
    },
    
    isLastIndex: function (index) {
      return (this.itemLength - 1) === index;
    },
    
    toggleArrow: function () {
      var isFirstIndex = this.isFirstIndex(this.currentIndex);
      var isLastIndex = this.isLastIndex(this.currentIndex);
      var itemsWidth = this.getItemsWidth();
      var containerWidth = this.$container.width();
      
      if (containerWidth >= itemsWidth) {
        this.togglePrevArrowByFlag(false);
        this.toggleNextArrowByFlag(false);
        return;
      }
      
      if (this.itemLength === 1) {
        this.togglePrevArrowByFlag(false);
        this.toggleNextArrowByFlag(false);
        return;
      }
      
      if (isFirstIndex) {
        this.togglePrevArrowByFlag(false);
        this.toggleNextArrowByFlag(true);
        return;
      }
      
      if (isLastIndex) {
        this.togglePrevArrowByFlag(true);
        this.toggleNextArrowByFlag(false);
        return;
      }
      
      if (!isFirstIndex && !isLastIndex) {
        this.togglePrevArrowByFlag(true);
        this.toggleNextArrowByFlag(true);
        return;
      }
    },
    
    togglePrevArrowByFlag: function (flag) {
      this.$prev.toggle(flag);
    },
    
    toggleNextArrowByFlag: function (flag) {
      this.$next.toggle(flag);
    },
    
    resetSelector: function () {
      this.$selector.unwrap();
      this.$selector.css('width', 'auto');
      this.toggleSliderClassToSelector();
      this.setTransformX(0);
    },
    
    bindPanEvent: function () {
      this.panEventListner = new Hammer(this.$container[0]);
      this.panEventListner.on('pan', this.handlePanEvent.bind(this));
    },
    
    handlePanEvent: function (e) {
      var deltaX = e.deltaX;
      
      if (e.isFinal) {
        var centerAlignLength = Math.abs(this.transformX + ((this.$container.width() / 3) * -1));
        var isPrevArrow = deltaX > 0;
        var targetIndex;
        
        if (isPrevArrow) {
          if (this.currentIndex === 1) {
            this.movePrev();
            return;
          }
        } else {
          if (this.itemLength === this.currentIndex - 1) {
            this.moveNext();
            return;
          }
        }
        
        var acc = 0;
        for (var i = 0; i < this.itemWidthList.length; i++) {
          if (isPrevArrow) {
            if (this.currentIndex <= i) continue;
          } else {
            if (this.currentIndex >= i) continue;
          }
          
          acc = acc + this.itemWidthList[i];
          if (acc >= centerAlignLength) {
            targetIndex = i;
            break;
          }
        }
        
        if (targetIndex === undefined) {
          isPrevArrow ? this.movePrev() : this.moveNext();
        } else {
          this.currentIndex = targetIndex;
          this.addDurationClassToSelector();
          this.moveSlider();
        }
        
        this.prevDeltaX = 0;
        
        setTimeout(function () {
          this.swiping = false;
        }.bind(this), 100);
      } else {
        this.swiping = true;
        this.setTransformX(this.transformX + deltaX - this.prevDeltaX);
        this.prevDeltaX = deltaX;
      }
    },
    
    destory: function () {
      this.resetSelector();
      this.removeArrow();
    },
  };
  
  window.mp20.view.CenterSlider = CenterSlider;
})();
(function () {
  var $body = $('body');
  var DEFAULT_OPTIONS = {
    position: 'left',
    isNew: false,
    margin: 8
  };
  var CLASS_NAMES = {
    ANIMATION: 'ToolTip--Animated'
  };
  var ARROW_CLASS_NAMES = {
    left: 'ToolTip--Left',
  };

  function TooltipView(targetEl, message, options) {
    this._targetEl = $(targetEl);

    if (this._targetEl.length === 0) {
      this._targetEl = null;
      return ;
    }

    this._message = message;
    this._options = _.assign({}, DEFAULT_OPTIONS, options);
    this._tooltipVisiblityService = new window.mp20.service.TooltipVisibilityService('restaurant', 'reservation');

    this._toolTipElement = new window.mp20.view.templateBuilder.TooltipTemplateBuilder(this._message, this._options.isNew).build();
    this._bindEvent();
    this._targetOffset = this._getTargetOffset();
    this._setArrow();
    $body.append(this._toolTipElement);
  }

  TooltipView.prototype = {
    sholudOpen: function() {
      if (this._targetEl && this._tooltipVisiblityService.canVisible()) {
        this._render();
      }
    },

    _render: function () {
      this._applyAnimation();
      this._setPositionElement();
    },

    hide: function () {
      this._toolTipElement.hide();
      this._tooltipVisiblityService.setInvisible();
    },

    _bindEvent: function () {
      this._toolTipElement
        .find('.ToolTip__CloseButton')
        .on('click', this._handleClickCloseButton.bind(this));
    },

    _handleClickCloseButton: function () {
      this.hide();
    },

    _getTargetOffset: function () {
      return $(this._targetEl).offset();
    },

    _setArrow: function () {
      var arrrowClassName = ARROW_CLASS_NAMES[this._options.position];

      if (arrrowClassName) {
        this._toolTipElement.addClass(arrrowClassName);
      }
    },

    _setPositionElement: function () {
      this._toolTipElement.css({
        top: this._targetOffset.top,
        left: this._targetOffset.left - this._toolTipElement.width() - this._options.margin
      });
    },

    _applyAnimation: function () {
      this._toolTipElement.addClass(CLASS_NAMES.ANIMATION);
    }
  };

  window.mp20.view['TooltipView'] = TooltipView;
})();
(function () {
  var branchIoService = window.mp20.branch_io_service;

  var CLASS_NAMES = {
    OPEN: 'BottomConnectAppLayer--Open'
  };

  function BottomConnectAppLayerView(pageKey, pageData) {
    this._$connectAppLayer = $('.BottomConnectAppLayer');
    this._$content = this._$connectAppLayer.find('.BottomConnectAppLayer__Content');
    this._$message = this._$connectAppLayer.find('.BottomConnectAppLayer__Message');
    this._$connectButton = this._$connectAppLayer.find('.BottomConnectAppLayer__ConnectButton');

    this._pageKey = pageKey;
    this._pageData = pageData;

    this._bindEvent();
  }

  BottomConnectAppLayerView.prototype = {
    open: function (message, downloadMessage) {
      this._renderMessage(message, downloadMessage);
      this._$connectAppLayer.show();
      setTimeout(function () {
        this._$connectAppLayer.addClass(CLASS_NAMES.OPEN);
      }.bind(this), 0);
    },

    close: function () {
      this._$connectAppLayer.hide();
      this._$connectAppLayer.removeClass(CLASS_NAMES.OPEN);
    },

    _bindEvent: function () {
      this._$connectAppLayer
        .on('click', this._handleClickBlackDeem.bind(this));

      this._$connectButton
        .on('click', this._handleClickConnectButton.bind(this));

      this._$connectAppLayer.find('.BottomConnectAppLayer__CancelButton')
        .on('click', this._handleClickCloseButton.bind(this));
    },

    _renderMessage: function (message, downloadMessage) {
      this._$message.html(message);
      this._$connectButton.html(downloadMessage);
    },

    _handleClickBlackDeem: function (e) {
      if (e.target !== this._$connectAppLayer.get(0)) {
        return;
      }

      this.close();
    },

    _handleClickCloseButton: function () {
      this.close();
    },

    _handleClickConnectButton: function () {
      branchIoService.init();
      branchIoService.set_page_mapping_data(this._pageKey, this._pageData);

      branchIoService.make_link();
    }
  };

  window.mp20.view['BottomConnectAppLayerView'] = BottomConnectAppLayerView;
})();
(function () {
  var nearby_popular_restaurant_class_list = [
    'title',
    'thumb',
    'sample-review',
    'review-content',
    'user_name',
  ];
  var $more_review_bind = $('.more_review_bind');
  var $window = $(window);
  var scroll_event_list = [
    {
      'scroll_target': $('.RestaurantReviewList'),
      'event_name': 'SCROLL_RESTOINFO',
      'target_position': 'top',
      'is_tracking': false,
    },

    {
      'scroll_target': $('.RestaurantReviewList__ReviewList'),
      'event_name': 'SCROLL_ALLREVIEW',
      'target_position': 'bottom',
      'is_tracking': false,
    },

    {
      'scroll_target': $('.footer'),
      'event_name': 'SCROLL_ALLPAGE',
      'target_position': 'top',
      'is_tracking': false,
    },
  ];

  $(document).ready(function () {
    $('.lazy').lazyload({
      effect: 'fadeIn',
      threshold: 150,
    });

    $('.restaurant-detail .wannago_wrap').on('click', function () {
      window.mp20.wannago_service.handleClickWannago($(this).find('.wannago_btn'));
    });

    var reservationTooltipView = new window.mp20.view.TooltipView(
      '.RestaurantReservationButton',
      I18n.t('restaurant_detail.reservation_tooltip'),
      {isNew: true, margin: 21}
    );
    reservationTooltipView.sholudOpen();
    var mobileAppDownloadLayerView = new window.mp20.view.MobileAppDownloadLayerView();

    (function () {
      var $couponCard = $('.CouponCard');
      var $connect_mp_app = $('.connect-mp-app');
      var $connect_mp_app_close_btn = $('.connect-mp-app.map .btn.cancel');
      var $connect_mp_app_black_screen = $connect_mp_app.next('.black_screen');
      var $reservationActionButton = $('.RestaurantReservationButton__JS');
      var $restaurantReservationSection = $('.RestaurantReservationSection');

      if ($restaurantReservationSection.length && _isAndroid()) {
        $restaurantReservationSection.addClass('RestaurantReservationSection--Show');
      }

      if ($couponCard.length) {
        new window.mp20.view.EllipsisTextView('.CouponCard__Title', {
          lines: 2,
          responsive: true
        });

        var fadeSlider;
        var centerSlider;
        var bindSliderEvent = (function () {
          return function () {
            if (fadeSlider && centerSlider) {
              return;
            }

            if (is_mobile_viewport()) {
              if (fadeSlider) {
                return;
              }

              fadeSlider = new window.mp20.view.FadeSliderView($('.only-mobile .CouponIntroduce'), $('.only-mobile .CouponFadeSlider'));
            } else {
              if (centerSlider) {
                return;
              }

              centerSlider = new window.mp20.view.CenterSlider('.only-desktop .CouponFadeSlider');
            }
          };
        })();

        bindSliderEvent();
        $window.on('resize', bindSliderEvent);

        function open_connect_mp_app() {
          $connect_mp_app.css('bottom', 0);
          $connect_mp_app_black_screen.show();
          common_ga_page('PU_RESTAURANT_COUPON');
        }

        function close_connect_mp_app() {
          $connect_mp_app.css('bottom', '-100%');
          $connect_mp_app_black_screen.hide();
        }

        $couponCard.on('click', function (e) {
          e.preventDefault();

          if (!is_mobile_viewport() && centerSlider && centerSlider.swiping) {
            return;
          }

          var restaurantUUID = $(this).data('uuid');
          common_ga('PG_RESTAURANT', 'CLICK_RESTAURANT_COUPON', undefined, restaurantUUID);

          if (is_mobile_viewport()) {
            mobileAppDownloadLayerView.show(I18n.t('connect_app_banner.download_button_coupon_message'));
          } else {
            window.mp20.app_download_layer.open_layer(window.mp20.app_download_layer.TYPE.COUPON);
          }
        });

        $('.btn-shortcut-app').on('click', function () {
          common_ga('PU_RESTAURANT_COUPON', 'CLICK_APP_COUPON', undefined, $couponCard.data('uuid'));
        });

        $connect_mp_app_black_screen.on('click', close_connect_mp_app);
        $connect_mp_app_close_btn.on('click', close_connect_mp_app);
      }

      $('.review_writing_button').on('click', function () {
        var isLogined = auth_service.is_auth(
          function () {
            var key = $(this).data('restaurant_key');
            common_ga('PG_RESTAURANT', 'CLICK_REVIEW', {restaurant_key: key});
            window.location.href = get_locale_url('/reviews/new?restaurant_key=' + key);
          }.bind(this)
        );

        if (!isLogined) {
          window.mp_login_layer.open_layer(I18n.t('login_popup.review_message'));
        }
      });

      var $mobileSectionReservationButton = $($reservationActionButton.get(1));
      var connectAppLayerView = new window.mp20.view.BottomConnectAppLayerView(window.mp20.branch_io_service.PAGE_KEY.RESERVATION_RESTAURANT, {
        partner_restaurant_id: $mobileSectionReservationButton.data('partnerRestaurantId'),
        reservation_partner_id: $mobileSectionReservationButton.data('partnerId')
      });
      if ($reservationActionButton.length) {
        $reservationActionButton.on('click', function (e) {
          if (is_mobile_viewport()) {
            connectAppLayerView.open(
              I18n.t('banner.download_popup_filter_a'),
              I18n.t('connect_app_banner.download_button_reservation_message')
            );
          } else {
            window.mp20.app_download_layer.open_layer(window.mp20.app_download_layer.TYPE.NORMAL, {
              android: true,
              ios: false
            });

            reservationTooltipView.hide();
          }

          var restaurantUUID = $(this).data('restaurant_uuid');
          common_ga('PG_RESTAURANT', 'CLICK_RESERVATION', {restaurant_uuid: restaurantUUID})
        });
      }
    })();

    // review translate
    $('.list-reivews').on('click', '.translate_btn', function (event) {
      var $trigger_el = $(event.target);
      var $text_el = $trigger_el.siblings('.review_content');

      mp20.element_translator
        .translate($text_el.text(), $text_el.data('state'), $text_el.data('language'), I18n.currentLocale())
        .then(function (data) {
          $trigger_el.text(data.btn_text);
          $text_el
            .data('state', data.state)
            .text(data.text);
        });
    });

    $('.RestaurantOwnerSection__ConnectAd').on('click', function () {
      var restaurantUUID = $(this).data('uuid');
      common_ga('PG_RESTAURANT', 'CLICK_SALES_LOCAL', undefined, restaurantUUID);
    });

    AdManager.get_instance().publish();

    window.mp20.bottom_sns_share_service.init();

    $('.pic img').each(function () {
      $('<img src=\'' + $(this).attr('src') + '\'>')
        .on('error', function () {
          $(this).parent().remove();
        }.bind(this));
    });

    // 다음 지도 링크 동작 제거.
    $(document).on('click', '.btn-map a', function (e) {
      e.preventDefault();
    });

    $(document).on('click', '.review_content .review_highlight', function (e) {
      common_ga(get_now_page_code(), 'CLICK_HIGHLIGHT_KEYWORD');
    });

    $(document).on('mousedown', '.list-restaurant-item', bind_nearby_popular_restaurant_click_event);

    $more_review_bind.on('click', function () {
      var $this = $(this);

      if ($this.hasClass('short_review')) {
        if ($this.siblings('.long_review').length) {
          $this.siblings('.btn_review_expand').hide();
          $this.siblings('.long_review').show();
          $this.hide();
        }
      } else {
        $this.siblings('.short_review').hide();
        $this.siblings('.long_review').show();
        $this.hide();
      }
    });

    $window.on('scroll', function () {
      if (!is_mobile_viewport()) {
        if (scroll_event_list.length) {
          _.each(scroll_event_list, function (item, index) {
            // splice의 영향으로 item이 없는 케이스를 대응 하기 위한 조건문
            if (!item) {
              return;
            }

            var target_scroll,
              now_scroll = $window.scrollTop() + $window.height();

            if (item.target_position === 'top') {
              target_scroll = item.scroll_target.offset().top;
            } else {
              target_scroll = item.scroll_target.offset().top + item.scroll_target.height();
            }

            if (now_scroll > target_scroll) {
              common_ga(get_now_page_code(), item.event_name);
              scroll_event_list.splice(index, 1);
            }
          });
        }
      }
    });

  });

  function bind_nearby_popular_restaurant_click_event(e) {
    var $target = $(e.target),
      is_include_class = false,
      target_class_str = $target.attr('class'),
      target_class_arr = target_class_str.split(' ');

    _.each(target_class_arr, function (item) {
      if (is_include_class) {
        return false;
      }

      is_include_class = nearby_popular_restaurant_class_list.indexOf(item) > -1;
    });

    if (!is_include_class) {
      common_ga(get_now_page_code(), 'CLICK_NEAR_RESTAURANT_OTHER');
    }
  }
})();
(function(){
    $(document).ready(function(){
        window.mp20.clipboard.init();
    });
})();
/*!
 * Fotorama 4.6.4 | http://fotorama.io/license/
 */

fotoramaVersion="4.6.4",function(a,b,c,d,e){"use strict";function f(a){var b="bez_"+d.makeArray(arguments).join("_").replace(".","p");if("function"!=typeof d.easing[b]){var c=function(a,b){var c=[null,null],d=[null,null],e=[null,null],f=function(f,g){return e[g]=3*a[g],d[g]=3*(b[g]-a[g])-e[g],c[g]=1-e[g]-d[g],f*(e[g]+f*(d[g]+f*c[g]))},g=function(a){return e[0]+a*(2*d[0]+3*c[0]*a)},h=function(a){for(var b,c=a,d=0;++d<14&&(b=f(c,0)-a,!(Math.abs(b)<.001));)c-=b/g(c);return c};return function(a){return f(h(a),1)}};d.easing[b]=function(b,d,e,f,g){return f*c([a[0],a[1]],[a[2],a[3]])(d/g)+e}}return b}function g(){}function h(a,b,c){return Math.max(isNaN(b)?-1/0:b,Math.min(isNaN(c)?1/0:c,a))}function i(a){return a.match(/ma/)&&a.match(/-?\d+(?!d)/g)[a.match(/3d/)?12:4]}function j(a){return Ic?+i(a.css("transform")):+a.css("left").replace("px","")}function k(a){var b={};return Ic?b.transform="translate3d("+a+"px,0,0)":b.left=a,b}function l(a){return{"transition-duration":a+"ms"}}function m(a,b){return isNaN(a)?b:a}function n(a,b){return m(+String(a).replace(b||"px",""))}function o(a){return/%$/.test(a)?n(a,"%"):e}function p(a,b){return m(o(a)/100*b,n(a))}function q(a){return(!isNaN(n(a))||!isNaN(n(a,"%")))&&a}function r(a,b,c,d){return(a-(d||0))*(b+(c||0))}function s(a,b,c,d){return-Math.round(a/(b+(c||0))-(d||0))}function t(a){var b=a.data();if(!b.tEnd){var c=a[0],d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",msTransition:"MSTransitionEnd",transition:"transitionend"};T(c,d[uc.prefixed("transition")],function(a){b.tProp&&a.propertyName.match(b.tProp)&&b.onEndFn()}),b.tEnd=!0}}function u(a,b,c,d){var e,f=a.data();f&&(f.onEndFn=function(){e||(e=!0,clearTimeout(f.tT),c())},f.tProp=b,clearTimeout(f.tT),f.tT=setTimeout(function(){f.onEndFn()},1.5*d),t(a))}function v(a,b){if(a.length){var c=a.data();Ic?(a.css(l(0)),c.onEndFn=g,clearTimeout(c.tT)):a.stop();var d=w(b,function(){return j(a)});return a.css(k(d)),d}}function w(){for(var a,b=0,c=arguments.length;c>b&&(a=b?arguments[b]():arguments[b],"number"!=typeof a);b++);return a}function x(a,b){return Math.round(a+(b-a)/1.5)}function y(){return y.p=y.p||("https:"===c.protocol?"https://":"http://"),y.p}function z(a){var c=b.createElement("a");return c.href=a,c}function A(a,b){if("string"!=typeof a)return a;a=z(a);var c,d;if(a.host.match(/youtube\.com/)&&a.search){if(c=a.search.split("v=")[1]){var e=c.indexOf("&");-1!==e&&(c=c.substring(0,e)),d="youtube"}}else a.host.match(/youtube\.com|youtu\.be/)?(c=a.pathname.replace(/^\/(embed\/|v\/)?/,"").replace(/\/.*/,""),d="youtube"):a.host.match(/vimeo\.com/)&&(d="vimeo",c=a.pathname.replace(/^\/(video\/)?/,"").replace(/\/.*/,""));return c&&d||!b||(c=a.href,d="custom"),c?{id:c,type:d,s:a.search.replace(/^\?/,""),p:y()}:!1}function B(a,b,c){var e,f,g=a.video;return"youtube"===g.type?(f=y()+"img.youtube.com/vi/"+g.id+"/default.jpg",e=f.replace(/\/default.jpg$/,"/hqdefault.jpg"),a.thumbsReady=!0):"vimeo"===g.type?d.ajax({url:y()+"vimeo.com/api/v2/video/"+g.id+".json",dataType:"jsonp",success:function(d){a.thumbsReady=!0,C(b,{img:d[0].thumbnail_large,thumb:d[0].thumbnail_small},a.i,c)}}):a.thumbsReady=!0,{img:e,thumb:f}}function C(a,b,c,e){for(var f=0,g=a.length;g>f;f++){var h=a[f];if(h.i===c&&h.thumbsReady){var i={videoReady:!0};i[Xc]=i[Zc]=i[Yc]=!1,e.splice(f,1,d.extend({},h,i,b));break}}}function D(a){function b(a,b,e){var f=a.children("img").eq(0),g=a.attr("href"),h=a.attr("src"),i=f.attr("src"),j=b.video,k=e?A(g,j===!0):!1;k?g=!1:k=j,c(a,f,d.extend(b,{video:k,img:b.img||g||h||i,thumb:b.thumb||i||h||g}))}function c(a,b,c){var e=c.thumb&&c.img!==c.thumb,f=n(c.width||a.attr("width")),g=n(c.height||a.attr("height"));d.extend(c,{width:f,height:g,thumbratio:S(c.thumbratio||n(c.thumbwidth||b&&b.attr("width")||e||f)/n(c.thumbheight||b&&b.attr("height")||e||g))})}var e=[];return a.children().each(function(){var a=d(this),f=R(d.extend(a.data(),{id:a.attr("id")}));if(a.is("a, img"))b(a,f,!0);else{if(a.is(":empty"))return;c(a,null,d.extend(f,{html:this,_html:a.html()}))}e.push(f)}),e}function E(a){return 0===a.offsetWidth&&0===a.offsetHeight}function F(a){return!d.contains(b.documentElement,a)}function G(a,b,c,d){return G.i||(G.i=1,G.ii=[!0]),d=d||G.i,"undefined"==typeof G.ii[d]&&(G.ii[d]=!0),a()?b():G.ii[d]&&setTimeout(function(){G.ii[d]&&G(a,b,c,d)},c||100),G.i++}function H(a){c.replace(c.protocol+"//"+c.host+c.pathname.replace(/^\/?/,"/")+c.search+"#"+a)}function I(a,b,c,d){var e=a.data(),f=e.measures;if(f&&(!e.l||e.l.W!==f.width||e.l.H!==f.height||e.l.r!==f.ratio||e.l.w!==b.w||e.l.h!==b.h||e.l.m!==c||e.l.p!==d)){var g=f.width,i=f.height,j=b.w/b.h,k=f.ratio>=j,l="scaledown"===c,m="contain"===c,n="cover"===c,o=$(d);k&&(l||m)||!k&&n?(g=h(b.w,0,l?g:1/0),i=g/f.ratio):(k&&n||!k&&(l||m))&&(i=h(b.h,0,l?i:1/0),g=i*f.ratio),a.css({width:g,height:i,left:p(o.x,b.w-g),top:p(o.y,b.h-i)}),e.l={W:f.width,H:f.height,r:f.ratio,w:b.w,h:b.h,m:c,p:d}}return!0}function J(a,b){var c=a[0];c.styleSheet?c.styleSheet.cssText=b:a.html(b)}function K(a,b,c){return b===c?!1:b>=a?"left":a>=c?"right":"left right"}function L(a,b,c,d){if(!c)return!1;if(!isNaN(a))return a-(d?0:1);for(var e,f=0,g=b.length;g>f;f++){var h=b[f];if(h.id===a){e=f;break}}return e}function M(a,b,c){c=c||{},a.each(function(){var a,e=d(this),f=e.data();f.clickOn||(f.clickOn=!0,d.extend(cb(e,{onStart:function(b){a=b,(c.onStart||g).call(this,b)},onMove:c.onMove||g,onTouchEnd:c.onTouchEnd||g,onEnd:function(c){c.moved||b.call(this,a)}}),{noMove:!0}))})}function N(a,b){return'<div class="'+a+'">'+(b||"")+"</div>"}function O(a){for(var b=a.length;b;){var c=Math.floor(Math.random()*b--),d=a[b];a[b]=a[c],a[c]=d}return a}function P(a){return"[object Array]"==Object.prototype.toString.call(a)&&d.map(a,function(a){return d.extend({},a)})}function Q(a,b,c){a.scrollLeft(b||0).scrollTop(c||0)}function R(a){if(a){var b={};return d.each(a,function(a,c){b[a.toLowerCase()]=c}),b}}function S(a){if(a){var b=+a;return isNaN(b)?(b=a.split("/"),+b[0]/+b[1]||e):b}}function T(a,b,c,d){b&&(a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent("on"+b,c))}function U(a){return!!a.getAttribute("disabled")}function V(a){return{tabindex:-1*a+"",disabled:a}}function W(a,b){T(a,"keyup",function(c){U(a)||13==c.keyCode&&b.call(a,c)})}function X(a,b){T(a,"focus",a.onfocusin=function(c){b.call(a,c)},!0)}function Y(a,b){a.preventDefault?a.preventDefault():a.returnValue=!1,b&&a.stopPropagation&&a.stopPropagation()}function Z(a){return a?">":"<"}function $(a){return a=(a+"").split(/\s+/),{x:q(a[0])||bd,y:q(a[1])||bd}}function _(a,b){var c=a.data(),e=Math.round(b.pos),f=function(){c.sliding=!1,(b.onEnd||g)()};"undefined"!=typeof b.overPos&&b.overPos!==b.pos&&(e=b.overPos,f=function(){_(a,d.extend({},b,{overPos:b.pos,time:Math.max(Qc,b.time/2)}))});var h=d.extend(k(e),b.width&&{width:b.width});c.sliding=!0,Ic?(a.css(d.extend(l(b.time),h)),b.time>10?u(a,"transform",f,b.time):f()):a.stop().animate(h,b.time,_c,f)}function ab(a,b,c,e,f,h){var i="undefined"!=typeof h;if(i||(f.push(arguments),Array.prototype.push.call(arguments,f.length),!(f.length>1))){a=a||d(a),b=b||d(b);var j=a[0],k=b[0],l="crossfade"===e.method,m=function(){if(!m.done){m.done=!0;var a=(i||f.shift())&&f.shift();a&&ab.apply(this,a),(e.onEnd||g)(!!a)}},n=e.time/(h||1);c.removeClass(Rb+" "+Qb),a.stop().addClass(Rb),b.stop().addClass(Qb),l&&k&&a.fadeTo(0,0),a.fadeTo(l?n:0,1,l&&m),b.fadeTo(n,0,m),j&&l||k||m()}}function bb(a){var b=(a.touches||[])[0]||a;a._x=b.pageX,a._y=b.clientY,a._now=d.now()}function cb(a,c){function e(a){return m=d(a.target),u.checked=p=q=s=!1,k||u.flow||a.touches&&a.touches.length>1||a.which>1||ed&&ed.type!==a.type&&gd||(p=c.select&&m.is(c.select,t))?p:(o="touchstart"===a.type,q=m.is("a, a *",t),n=u.control,r=u.noMove||u.noSwipe||n?16:u.snap?0:4,bb(a),l=ed=a,fd=a.type.replace(/down|start/,"move").replace(/Down/,"Move"),(c.onStart||g).call(t,a,{control:n,$target:m}),k=u.flow=!0,void((!o||u.go)&&Y(a)))}function f(a){if(a.touches&&a.touches.length>1||Nc&&!a.isPrimary||fd!==a.type||!k)return k&&h(),void(c.onTouchEnd||g)();bb(a);var b=Math.abs(a._x-l._x),d=Math.abs(a._y-l._y),e=b-d,f=(u.go||u.x||e>=0)&&!u.noSwipe,i=0>e;o&&!u.checked?(k=f)&&Y(a):(Y(a),(c.onMove||g).call(t,a,{touch:o})),!s&&Math.sqrt(Math.pow(b,2)+Math.pow(d,2))>r&&(s=!0),u.checked=u.checked||f||i}function h(a){(c.onTouchEnd||g)();var b=k;u.control=k=!1,b&&(u.flow=!1),!b||q&&!u.checked||(a&&Y(a),gd=!0,clearTimeout(hd),hd=setTimeout(function(){gd=!1},1e3),(c.onEnd||g).call(t,{moved:s,$target:m,control:n,touch:o,startEvent:l,aborted:!a||"MSPointerCancel"===a.type}))}function i(){u.flow||setTimeout(function(){u.flow=!0},10)}function j(){u.flow&&setTimeout(function(){u.flow=!1},Pc)}var k,l,m,n,o,p,q,r,s,t=a[0],u={};return Nc?(T(t,"MSPointerDown",e),T(b,"MSPointerMove",f),T(b,"MSPointerCancel",h),T(b,"MSPointerUp",h)):(T(t,"touchstart",e),T(t,"touchmove",f),T(t,"touchend",h),T(b,"touchstart",i),T(b,"touchend",j),T(b,"touchcancel",j),Ec.on("scroll",j),a.on("mousedown",e),Fc.on("mousemove",f).on("mouseup",h)),a.on("click","a",function(a){u.checked&&Y(a)}),u}function db(a,b){function c(c,d){A=!0,j=l=c._x,q=c._now,p=[[q,j]],m=n=D.noMove||d?0:v(a,(b.getPos||g)()),(b.onStart||g).call(B,c)}function e(a,b){s=D.min,t=D.max,u=D.snap,w=a.altKey,A=z=!1,y=b.control,y||C.sliding||c(a)}function f(d,e){D.noSwipe||(A||c(d),l=d._x,p.push([d._now,l]),n=m-(j-l),o=K(n,s,t),s>=n?n=x(n,s):n>=t&&(n=x(n,t)),D.noMove||(a.css(k(n)),z||(z=!0,e.touch||Nc||a.addClass(ec)),(b.onMove||g).call(B,d,{pos:n,edge:o})))}function i(e){if(!D.noSwipe||!e.moved){A||c(e.startEvent,!0),e.touch||Nc||a.removeClass(ec),r=d.now();for(var f,i,j,k,o,q,v,x,y,z=r-Pc,C=null,E=Qc,F=b.friction,G=p.length-1;G>=0;G--){if(f=p[G][0],i=Math.abs(f-z),null===C||j>i)C=f,k=p[G][1];else if(C===z||i>j)break;j=i}v=h(n,s,t);var H=k-l,I=H>=0,J=r-C,K=J>Pc,L=!K&&n!==m&&v===n;u&&(v=h(Math[L?I?"floor":"ceil":"round"](n/u)*u,s,t),s=t=v),L&&(u||v===n)&&(y=-(H/J),E*=h(Math.abs(y),b.timeLow,b.timeHigh),o=Math.round(n+y*E/F),u||(v=o),(!I&&o>t||I&&s>o)&&(q=I?s:t,x=o-q,u||(v=q),x=h(v+.03*x,q-50,q+50),E=Math.abs((n-x)/(y/F)))),E*=w?10:1,(b.onEnd||g).call(B,d.extend(e,{moved:e.moved||K&&u,pos:n,newPos:v,overPos:x,time:E}))}}var j,l,m,n,o,p,q,r,s,t,u,w,y,z,A,B=a[0],C=a.data(),D={};return D=d.extend(cb(b.$wrap,d.extend({},b,{onStart:e,onMove:f,onEnd:i})),D)}function eb(a,b){var c,e,f,h=a[0],i={prevent:{}};return T(h,Oc,function(a){var h=a.wheelDeltaY||-1*a.deltaY||0,j=a.wheelDeltaX||-1*a.deltaX||0,k=Math.abs(j)&&!Math.abs(h),l=Z(0>j),m=e===l,n=d.now(),o=Pc>n-f;e=l,f=n,k&&i.ok&&(!i.prevent[l]||c)&&(Y(a,!0),c&&m&&o||(b.shift&&(c=!0,clearTimeout(i.t),i.t=setTimeout(function(){c=!1},Rc)),(b.onEnd||g)(a,b.shift?l:j)))}),i}function fb(){d.each(d.Fotorama.instances,function(a,b){b.index=a})}function gb(a){d.Fotorama.instances.push(a),fb()}function hb(a){d.Fotorama.instances.splice(a.index,1),fb()}var ib="fotorama",jb="fullscreen",kb=ib+"__wrap",lb=kb+"--css2",mb=kb+"--css3",nb=kb+"--video",ob=kb+"--fade",pb=kb+"--slide",qb=kb+"--no-controls",rb=kb+"--no-shadows",sb=kb+"--pan-y",tb=kb+"--rtl",ub=kb+"--only-active",vb=kb+"--no-captions",wb=kb+"--toggle-arrows",xb=ib+"__stage",yb=xb+"__frame",zb=yb+"--video",Ab=xb+"__shaft",Bb=ib+"__grab",Cb=ib+"__pointer",Db=ib+"__arr",Eb=Db+"--disabled",Fb=Db+"--prev",Gb=Db+"--next",Hb=ib+"__nav",Ib=Hb+"-wrap",Jb=Hb+"__shaft",Kb=Hb+"--dots",Lb=Hb+"--thumbs",Mb=Hb+"__frame",Nb=Mb+"--dot",Ob=Mb+"--thumb",Pb=ib+"__fade",Qb=Pb+"-front",Rb=Pb+"-rear",Sb=ib+"__shadow",Tb=Sb+"s",Ub=Tb+"--left",Vb=Tb+"--right",Wb=ib+"__active",Xb=ib+"__select",Yb=ib+"--hidden",Zb=ib+"--fullscreen",$b=ib+"__fullscreen-icon",_b=ib+"__error",ac=ib+"__loading",bc=ib+"__loaded",cc=bc+"--full",dc=bc+"--img",ec=ib+"__grabbing",fc=ib+"__img",gc=fc+"--full",hc=ib+"__dot",ic=ib+"__thumb",jc=ic+"-border",kc=ib+"__html",lc=ib+"__video",mc=lc+"-play",nc=lc+"-close",oc=ib+"__caption",pc=ib+"__caption__wrap",qc=ib+"__spinner",rc='" tabindex="0" role="button',sc=d&&d.fn.jquery.split(".");if(!sc||sc[0]<1||1==sc[0]&&sc[1]<8)throw"Fotorama requires jQuery 1.8 or later and will not run without it.";var tc={},uc=function(a,b,c){function d(a){r.cssText=a}function e(a,b){return typeof a===b}function f(a,b){return!!~(""+a).indexOf(b)}function g(a,b){for(var d in a){var e=a[d];if(!f(e,"-")&&r[e]!==c)return"pfx"==b?e:!0}return!1}function h(a,b,d){for(var f in a){var g=b[a[f]];if(g!==c)return d===!1?a[f]:e(g,"function")?g.bind(d||b):g}return!1}function i(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),f=(a+" "+u.join(d+" ")+d).split(" ");return e(b,"string")||e(b,"undefined")?g(f,b):(f=(a+" "+v.join(d+" ")+d).split(" "),h(f,b,c))}var j,k,l,m="2.6.2",n={},o=b.documentElement,p="modernizr",q=b.createElement(p),r=q.style,s=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),t="Webkit Moz O ms",u=t.split(" "),v=t.toLowerCase().split(" "),w={},x=[],y=x.slice,z=function(a,c,d,e){var f,g,h,i,j=b.createElement("div"),k=b.body,l=k||b.createElement("body");if(parseInt(d,10))for(;d--;)h=b.createElement("div"),h.id=e?e[d]:p+(d+1),j.appendChild(h);return f=["&#173;",'<style id="s',p,'">',a,"</style>"].join(""),j.id=p,(k?j:l).innerHTML+=f,l.appendChild(j),k||(l.style.background="",l.style.overflow="hidden",i=o.style.overflow,o.style.overflow="hidden",o.appendChild(l)),g=c(j,a),k?j.parentNode.removeChild(j):(l.parentNode.removeChild(l),o.style.overflow=i),!!g},A={}.hasOwnProperty;l=e(A,"undefined")||e(A.call,"undefined")?function(a,b){return b in a&&e(a.constructor.prototype[b],"undefined")}:function(a,b){return A.call(a,b)},Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError;var c=y.call(arguments,1),d=function(){if(this instanceof d){var e=function(){};e.prototype=b.prototype;var f=new e,g=b.apply(f,c.concat(y.call(arguments)));return Object(g)===g?g:f}return b.apply(a,c.concat(y.call(arguments)))};return d}),w.csstransforms3d=function(){var a=!!i("perspective");return a};for(var B in w)l(w,B)&&(k=B.toLowerCase(),n[k]=w[B](),x.push((n[k]?"":"no-")+k));return n.addTest=function(a,b){if("object"==typeof a)for(var d in a)l(a,d)&&n.addTest(d,a[d]);else{if(a=a.toLowerCase(),n[a]!==c)return n;b="function"==typeof b?b():b,"undefined"!=typeof enableClasses&&enableClasses&&(o.className+=" "+(b?"":"no-")+a),n[a]=b}return n},d(""),q=j=null,n._version=m,n._prefixes=s,n._domPrefixes=v,n._cssomPrefixes=u,n.testProp=function(a){return g([a])},n.testAllProps=i,n.testStyles=z,n.prefixed=function(a,b,c){return b?i(a,b,c):i(a,"pfx")},n}(a,b),vc={ok:!1,is:function(){return!1},request:function(){},cancel:function(){},event:"",prefix:""},wc="webkit moz o ms khtml".split(" ");if("undefined"!=typeof b.cancelFullScreen)vc.ok=!0;else for(var xc=0,yc=wc.length;yc>xc;xc++)if(vc.prefix=wc[xc],"undefined"!=typeof b[vc.prefix+"CancelFullScreen"]){vc.ok=!0;break}vc.ok&&(vc.event=vc.prefix+"fullscreenchange",vc.is=function(){switch(this.prefix){case"":return b.fullScreen;case"webkit":return b.webkitIsFullScreen;default:return b[this.prefix+"FullScreen"]}},vc.request=function(a){return""===this.prefix?a.requestFullScreen():a[this.prefix+"RequestFullScreen"]()},vc.cancel=function(){return""===this.prefix?b.cancelFullScreen():b[this.prefix+"CancelFullScreen"]()});var zc,Ac={lines:12,length:5,width:2,radius:7,corners:1,rotate:15,color:"rgba(128, 128, 128, .75)",hwaccel:!0},Bc={top:"auto",left:"auto",className:""};!function(a,b){zc=b()}(this,function(){function a(a,c){var d,e=b.createElement(a||"div");for(d in c)e[d]=c[d];return e}function c(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function d(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+c/d*100,g=Math.max(1-(1-a)/b*(100-f),a),h=m.substring(0,m.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return o[e]||(p.insertRule("@"+i+"keyframes "+e+"{0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}100%{opacity:"+g+"}}",p.cssRules.length),o[e]=1),e}function f(a,b){var c,d,f=a.style;for(b=b.charAt(0).toUpperCase()+b.slice(1),d=0;d<n.length;d++)if(c=n[d]+b,f[c]!==e)return c;return f[b]!==e?b:void 0}function g(a,b){for(var c in b)a.style[f(a,c)||c]=b[c];return a}function h(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)a[d]===e&&(a[d]=c[d])}return a}function i(a){for(var b={x:a.offsetLeft,y:a.offsetTop};a=a.offsetParent;)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}function j(a,b){return"string"==typeof a?a:a[b%a.length]}function k(a){return"undefined"==typeof this?new k(a):void(this.opts=h(a||{},k.defaults,q))}function l(){function b(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}p.addRule(".spin-vml","behavior:url(#default#VML)"),k.prototype.lines=function(a,d){function e(){return g(b("group",{coordsize:k+" "+k,coordorigin:-i+" "+-i}),{width:k,height:k})}function f(a,f,h){c(m,c(g(e(),{rotation:360/d.lines*a+"deg",left:~~f}),c(g(b("roundrect",{arcsize:d.corners}),{width:i,height:d.width,left:d.radius,top:-d.width>>1,filter:h}),b("fill",{color:j(d.color,a),opacity:d.opacity}),b("stroke",{opacity:0}))))}var h,i=d.length+d.width,k=2*i,l=2*-(d.width+d.length)+"px",m=g(e(),{position:"absolute",top:l,left:l});if(d.shadow)for(h=1;h<=d.lines;h++)f(h,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(h=1;h<=d.lines;h++)f(h);return c(a,m)},k.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var m,n=["webkit","Moz","ms","O"],o={},p=function(){var d=a("style",{type:"text/css"});return c(b.getElementsByTagName("head")[0],d),d.sheet||d.styleSheet}(),q={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"};k.defaults={},h(k.prototype,{spin:function(b){this.stop();var c,d,e=this,f=e.opts,h=e.el=g(a(0,{className:f.className}),{position:f.position,width:0,zIndex:f.zIndex}),j=f.radius+f.length+f.width;if(b&&(b.insertBefore(h,b.firstChild||null),d=i(b),c=i(h),g(h,{left:("auto"==f.left?d.x-c.x+(b.offsetWidth>>1):parseInt(f.left,10)+j)+"px",top:("auto"==f.top?d.y-c.y+(b.offsetHeight>>1):parseInt(f.top,10)+j)+"px"})),h.setAttribute("role","progressbar"),e.lines(h,e.opts),!m){var k,l=0,n=(f.lines-1)*(1-f.direction)/2,o=f.fps,p=o/f.speed,q=(1-f.opacity)/(p*f.trail/100),r=p/f.lines;!function s(){l++;for(var a=0;a<f.lines;a++)k=Math.max(1-(l+(f.lines-a)*r)%p*q,f.opacity),e.opacity(h,a*f.direction+n,k,f);e.timeout=e.el&&setTimeout(s,~~(1e3/o))}()}return e},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=e),this},lines:function(b,e){function f(b,c){return g(a(),{position:"absolute",width:e.length+e.width+"px",height:e.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/e.lines*i+e.rotate)+"deg) translate("+e.radius+"px,0)",borderRadius:(e.corners*e.width>>1)+"px"})}for(var h,i=0,k=(e.lines-1)*(1-e.direction)/2;i<e.lines;i++)h=g(a(),{position:"absolute",top:1+~(e.width/2)+"px",transform:e.hwaccel?"translate3d(0,0,0)":"",opacity:e.opacity,animation:m&&d(e.opacity,e.trail,k+i*e.direction,e.lines)+" "+1/e.speed+"s linear infinite"}),e.shadow&&c(h,g(f("#000","0 0 4px #000"),{top:"2px"})),c(b,c(h,f(j(e.color,i),"0 0 1px rgba(0,0,0,.1)")));return b},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}});var r=g(a("group"),{behavior:"url(#default#VML)"});return!f(r,"transform")&&r.adj?l():m=f(r,"animation"),k});var Cc,Dc,Ec=d(a),Fc=d(b),Gc="quirks"===c.hash.replace("#",""),Hc=uc.csstransforms3d,Ic=Hc&&!Gc,Jc=Hc||"CSS1Compat"===b.compatMode,Kc=vc.ok,Lc=navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i),Mc=!Ic||Lc,Nc=navigator.msPointerEnabled,Oc="onwheel"in b.createElement("div")?"wheel":b.onmousewheel!==e?"mousewheel":"DOMMouseScroll",Pc=250,Qc=300,Rc=1400,Sc=5e3,Tc=2,Uc=64,Vc=500,Wc=333,Xc="$stageFrame",Yc="$navDotFrame",Zc="$navThumbFrame",$c="auto",_c=f([.1,0,.25,1]),ad=99999,bd="50%",cd={width:null,minwidth:null,maxwidth:"100%",height:null,minheight:null,maxheight:null,ratio:null,margin:Tc,glimpse:0,fit:"contain",position:bd,thumbposition:bd,nav:"dots",navposition:"bottom",navwidth:null,thumbwidth:Uc,thumbheight:Uc,thumbmargin:Tc,thumbborderwidth:Tc,thumbfit:"cover",allowfullscreen:!1,transition:"slide",clicktransition:null,transitionduration:Qc,captions:!0,hash:!1,startindex:0,loop:!1,autoplay:!1,stopautoplayontouch:!0,keyboard:!1,arrows:!0,click:!0,swipe:!0,trackpad:!1,enableifsingleframe:!1,controlsonstart:!0,shuffle:!1,direction:"ltr",shadows:!0,spinner:null},dd={left:!0,right:!0,down:!1,up:!1,space:!1,home:!1,end:!1};G.stop=function(a){G.ii[a]=!1};var ed,fd,gd,hd;jQuery.Fotorama=function(a,e){function f(){d.each(yd,function(a,b){if(!b.i){b.i=me++;var c=A(b.video,!0);if(c){var d={};b.video=c,b.img||b.thumb?b.thumbsReady=!0:d=B(b,yd,ie),C(yd,{img:d.img,thumb:d.thumb},b.i,ie)}}})}function g(a){return Zd[a]||ie.fullScreen}function i(a){var b="keydown."+ib,c=ib+je,d="keydown."+c,f="resize."+c+" orientationchange."+c;a?(Fc.on(d,function(a){var b,c;Cd&&27===a.keyCode?(b=!0,md(Cd,!0,!0)):(ie.fullScreen||e.keyboard&&!ie.index)&&(27===a.keyCode?(b=!0,ie.cancelFullScreen()):a.shiftKey&&32===a.keyCode&&g("space")||37===a.keyCode&&g("left")||38===a.keyCode&&g("up")?c="<":32===a.keyCode&&g("space")||39===a.keyCode&&g("right")||40===a.keyCode&&g("down")?c=">":36===a.keyCode&&g("home")?c="<<":35===a.keyCode&&g("end")&&(c=">>")),(b||c)&&Y(a),c&&ie.show({index:c,slow:a.altKey,user:!0})}),ie.index||Fc.off(b).on(b,"textarea, input, select",function(a){!Dc.hasClass(jb)&&a.stopPropagation()}),Ec.on(f,ie.resize)):(Fc.off(d),Ec.off(f))}function j(b){b!==j.f&&(b?(a.html("").addClass(ib+" "+ke).append(qe).before(oe).before(pe),gb(ie)):(qe.detach(),oe.detach(),pe.detach(),a.html(ne.urtext).removeClass(ke),hb(ie)),i(b),j.f=b)}function m(){yd=ie.data=yd||P(e.data)||D(a),zd=ie.size=yd.length,!xd.ok&&e.shuffle&&O(yd),f(),Je=y(Je),zd&&j(!0)}function o(){var a=2>zd&&!e.enableifsingleframe||Cd;Me.noMove=a||Sd,Me.noSwipe=a||!e.swipe,!Wd&&se.toggleClass(Bb,!e.click&&!Me.noMove&&!Me.noSwipe),Nc&&qe.toggleClass(sb,!Me.noSwipe)}function t(a){a===!0&&(a=""),e.autoplay=Math.max(+a||Sc,1.5*Vd)}function u(){function a(a,c){b[a?"add":"remove"].push(c)}ie.options=e=R(e),Sd="crossfade"===e.transition||"dissolve"===e.transition,Md=e.loop&&(zd>2||Sd&&(!Wd||"slide"!==Wd)),Vd=+e.transitionduration||Qc,Yd="rtl"===e.direction,Zd=d.extend({},e.keyboard&&dd,e.keyboard);var b={add:[],remove:[]};zd>1||e.enableifsingleframe?(Nd=e.nav,Pd="top"===e.navposition,b.remove.push(Xb),we.toggle(!!e.arrows)):(Nd=!1,we.hide()),Rb(),Bd=new zc(d.extend(Ac,e.spinner,Bc,{direction:Yd?-1:1})),Gc(),Hc(),e.autoplay&&t(e.autoplay),Td=n(e.thumbwidth)||Uc,Ud=n(e.thumbheight)||Uc,Ne.ok=Pe.ok=e.trackpad&&!Mc,o(),ed(e,[Le]),Od="thumbs"===Nd,Od?(lc(zd,"navThumb"),Ad=Be,he=Zc,J(oe,d.Fotorama.jst.style({w:Td,h:Ud,b:e.thumbborderwidth,m:e.thumbmargin,s:je,q:!Jc})),ye.addClass(Lb).removeClass(Kb)):"dots"===Nd?(lc(zd,"navDot"),Ad=Ae,he=Yc,ye.addClass(Kb).removeClass(Lb)):(Nd=!1,ye.removeClass(Lb+" "+Kb)),Nd&&(Pd?xe.insertBefore(re):xe.insertAfter(re),wc.nav=!1,wc(Ad,ze,"nav")),Qd=e.allowfullscreen,Qd?(De.prependTo(re),Rd=Kc&&"native"===Qd):(De.detach(),Rd=!1),a(Sd,ob),a(!Sd,pb),a(!e.captions,vb),a(Yd,tb),a("always"!==e.arrows,wb),Xd=e.shadows&&!Mc,a(!Xd,rb),qe.addClass(b.add.join(" ")).removeClass(b.remove.join(" ")),Ke=d.extend({},e)}function x(a){return 0>a?(zd+a%zd)%zd:a>=zd?a%zd:a}function y(a){return h(a,0,zd-1)}function z(a){return Md?x(a):y(a)}function E(a){return a>0||Md?a-1:!1}function U(a){return zd-1>a||Md?a+1:!1}function $(){Me.min=Md?-1/0:-r(zd-1,Le.w,e.margin,Fd),Me.max=Md?1/0:-r(0,Le.w,e.margin,Fd),Me.snap=Le.w+e.margin}function bb(){Oe.min=Math.min(0,Le.nw-ze.width()),Oe.max=0,ze.toggleClass(Bb,!(Oe.noMove=Oe.min===Oe.max))}function cb(a,b,c){if("number"==typeof a){a=new Array(a);var e=!0}return d.each(a,function(a,d){if(e&&(d=a),"number"==typeof d){var f=yd[x(d)];if(f){var g="$"+b+"Frame",h=f[g];c.call(this,a,d,f,h,g,h&&h.data())}}})}function fb(a,b,c,d){(!$d||"*"===$d&&d===Ld)&&(a=q(e.width)||q(a)||Vc,b=q(e.height)||q(b)||Wc,ie.resize({width:a,ratio:e.ratio||c||a/b},0,d!==Ld&&"*"))}function Pb(a,b,c,f,g,h){cb(a,b,function(a,i,j,k,l,m){function n(a){var b=x(i);fd(a,{index:b,src:w,frame:yd[b]})}function o(){t.remove(),d.Fotorama.cache[w]="error",j.html&&"stage"===b||!y||y===w?(!w||j.html||r?"stage"===b&&(k.trigger("f:load").removeClass(ac+" "+_b).addClass(bc),n("load"),fb()):(k.trigger("f:error").removeClass(ac).addClass(_b),n("error")),m.state="error",!(zd>1&&yd[i]===j)||j.html||j.deleted||j.video||r||(j.deleted=!0,ie.splice(i,1))):(j[v]=w=y,Pb([i],b,c,f,g,!0))}function p(){d.Fotorama.measures[w]=u.measures=d.Fotorama.measures[w]||{width:s.width,height:s.height,ratio:s.width/s.height},fb(u.measures.width,u.measures.height,u.measures.ratio,i),t.off("load error").addClass(fc+(r?" "+gc:"")).prependTo(k),I(t,(d.isFunction(c)?c():c)||Le,f||j.fit||e.fit,g||j.position||e.position),d.Fotorama.cache[w]=m.state="loaded",setTimeout(function(){k.trigger("f:load").removeClass(ac+" "+_b).addClass(bc+" "+(r?cc:dc)),"stage"===b?n("load"):(j.thumbratio===$c||!j.thumbratio&&e.thumbratio===$c)&&(j.thumbratio=u.measures.ratio,vd())},0)}function q(){var a=10;G(function(){return!fe||!a--&&!Mc},function(){p()})}if(k){var r=ie.fullScreen&&j.full&&j.full!==j.img&&!m.$full&&"stage"===b;if(!m.$img||h||r){var s=new Image,t=d(s),u=t.data();m[r?"$full":"$img"]=t;var v="stage"===b?r?"full":"img":"thumb",w=j[v],y=r?null:j["stage"===b?"thumb":"img"];if("navThumb"===b&&(k=m.$wrap),!w)return void o();d.Fotorama.cache[w]?!function z(){"error"===d.Fotorama.cache[w]?o():"loaded"===d.Fotorama.cache[w]?setTimeout(q,0):setTimeout(z,100)}():(d.Fotorama.cache[w]="*",t.on("load",q).on("error",o)),m.state="",s.src=w}}})}function Qb(a){Ie.append(Bd.spin().el).appendTo(a)}function Rb(){Ie.detach(),Bd&&Bd.stop()}function Sb(){var a=Dd[Xc];a&&!a.data().state&&(Qb(a),a.on("f:load f:error",function(){a.off("f:load f:error"),Rb()}))}function ec(a){W(a,sd),X(a,function(){setTimeout(function(){Q(ye)},0),Rc({time:Vd,guessIndex:d(this).data().eq,minMax:Oe})})}function lc(a,b){cb(a,b,function(a,c,e,f,g,h){if(!f){f=e[g]=qe[g].clone(),h=f.data(),h.data=e;var i=f[0];"stage"===b?(e.html&&d('<div class="'+kc+'"></div>').append(e._html?d(e.html).removeAttr("id").html(e._html):e.html).appendTo(f),e.caption&&d(N(oc,N(pc,e.caption))).appendTo(f),e.video&&f.addClass(zb).append(Fe.clone()),X(i,function(){setTimeout(function(){Q(re)},0),pd({index:h.eq,user:!0})}),te=te.add(f)):"navDot"===b?(ec(i),Ae=Ae.add(f)):"navThumb"===b&&(ec(i),h.$wrap=f.children(":first"),Be=Be.add(f),e.video&&h.$wrap.append(Fe.clone()))}})}function sc(a,b,c,d){return a&&a.length&&I(a,b,c,d)}function tc(a){cb(a,"stage",function(a,b,c,f,g,h){if(f){var i=x(b),j=c.fit||e.fit,k=c.position||e.position;h.eq=i,Re[Xc][i]=f.css(d.extend({left:Sd?0:r(b,Le.w,e.margin,Fd)},Sd&&l(0))),F(f[0])&&(f.appendTo(se),md(c.$video)),sc(h.$img,Le,j,k),sc(h.$full,Le,j,k)}})}function uc(a,b){if("thumbs"===Nd&&!isNaN(a)){var c=-a,f=-a+Le.nw;Be.each(function(){var a=d(this),g=a.data(),h=g.eq,i=function(){return{h:Ud,w:g.w}},j=i(),k=yd[h]||{},l=k.thumbfit||e.thumbfit,m=k.thumbposition||e.thumbposition;j.w=g.w,g.l+g.w<c||g.l>f||sc(g.$img,j,l,m)||b&&Pb([h],"navThumb",i,l,m)})}}function wc(a,b,c){if(!wc[c]){var f="nav"===c&&Od,g=0;b.append(a.filter(function(){for(var a,b=d(this),c=b.data(),e=0,f=yd.length;f>e;e++)if(c.data===yd[e]){a=!0,c.eq=e;break}return a||b.remove()&&!1}).sort(function(a,b){return d(a).data().eq-d(b).data().eq}).each(function(){if(f){var a=d(this),b=a.data(),c=Math.round(Ud*b.data.thumbratio)||Td;b.l=g,b.w=c,a.css({width:c}),g+=c+e.thumbmargin}})),wc[c]=!0}}function xc(a){return a-Se>Le.w/3}function yc(a){return!(Md||Je+a&&Je-zd+a||Cd)}function Gc(){var a=yc(0),b=yc(1);ue.toggleClass(Eb,a).attr(V(a)),ve.toggleClass(Eb,b).attr(V(b))}function Hc(){Ne.ok&&(Ne.prevent={"<":yc(0),">":yc(1)})}function Lc(a){var b,c,d=a.data();return Od?(b=d.l,c=d.w):(b=a.position().left,c=a.width()),{c:b+c/2,min:-b+10*e.thumbmargin,max:-b+Le.w-c-10*e.thumbmargin}}function Oc(a){var b=Dd[he].data();_(Ce,{time:1.2*a,pos:b.l,width:b.w-2*e.thumbborderwidth})}function Rc(a){var b=yd[a.guessIndex][he];if(b){var c=Oe.min!==Oe.max,d=a.minMax||c&&Lc(Dd[he]),e=c&&(a.keep&&Rc.l?Rc.l:h((a.coo||Le.nw/2)-Lc(b).c,d.min,d.max)),f=c&&h(e,Oe.min,Oe.max),g=1.1*a.time;_(ze,{time:g,pos:f||0,onEnd:function(){uc(f,!0)}}),ld(ye,K(f,Oe.min,Oe.max)),Rc.l=e}}function Tc(){_c(he),Qe[he].push(Dd[he].addClass(Wb))}function _c(a){for(var b=Qe[a];b.length;)b.shift().removeClass(Wb)}function bd(a){var b=Re[a];d.each(Ed,function(a,c){delete b[x(c)]}),d.each(b,function(a,c){delete b[a],c.detach()})}function cd(a){Fd=Gd=Je;var b=Dd[Xc];b&&(_c(Xc),Qe[Xc].push(b.addClass(Wb)),a||ie.show.onEnd(!0),v(se,0,!0),bd(Xc),tc(Ed),$(),bb())}function ed(a,b){a&&d.each(b,function(b,c){c&&d.extend(c,{width:a.width||c.width,height:a.height,minwidth:a.minwidth,maxwidth:a.maxwidth,minheight:a.minheight,maxheight:a.maxheight,ratio:S(a.ratio)})})}function fd(b,c){a.trigger(ib+":"+b,[ie,c])}function gd(){clearTimeout(hd.t),fe=1,e.stopautoplayontouch?ie.stopAutoplay():ce=!0}function hd(){fe&&(e.stopautoplayontouch||(id(),jd()),hd.t=setTimeout(function(){fe=0},Qc+Pc))}function id(){ce=!(!Cd&&!de)}function jd(){if(clearTimeout(jd.t),G.stop(jd.w),!e.autoplay||ce)return void(ie.autoplay&&(ie.autoplay=!1,fd("stopautoplay")));ie.autoplay||(ie.autoplay=!0,fd("startautoplay"));var a=Je,b=Dd[Xc].data();jd.w=G(function(){return b.state||a!==Je},function(){jd.t=setTimeout(function(){if(!ce&&a===Je){var b=Kd,c=yd[b][Xc].data();jd.w=G(function(){return c.state||b!==Kd},function(){ce||b!==Kd||ie.show(Md?Z(!Yd):Kd)})}},e.autoplay)})}function kd(){ie.fullScreen&&(ie.fullScreen=!1,Kc&&vc.cancel(le),Dc.removeClass(jb),Cc.removeClass(jb),a.removeClass(Zb).insertAfter(pe),Le=d.extend({},ee),md(Cd,!0,!0),rd("x",!1),ie.resize(),Pb(Ed,"stage"),Q(Ec,ae,_d),fd("fullscreenexit"))}function ld(a,b){Xd&&(a.removeClass(Ub+" "+Vb),b&&!Cd&&a.addClass(b.replace(/^|\s/g," "+Tb+"--")))}function md(a,b,c){b&&(qe.removeClass(nb),Cd=!1,o()),a&&a!==Cd&&(a.remove(),fd("unloadvideo")),c&&(id(),jd())}function nd(a){qe.toggleClass(qb,a)}function od(a){if(!Me.flow){var b=a?a.pageX:od.x,c=b&&!yc(xc(b))&&e.click;od.p!==c&&re.toggleClass(Cb,c)&&(od.p=c,od.x=b)}}function pd(a){clearTimeout(pd.t),e.clicktransition&&e.clicktransition!==e.transition?setTimeout(function(){var b=e.transition;ie.setOptions({transition:e.clicktransition}),Wd=b,pd.t=setTimeout(function(){ie.show(a)},10)},0):ie.show(a)}function qd(a,b){var c=a.target,f=d(c);f.hasClass(mc)?ie.playVideo():c===Ee?ie.toggleFullScreen():Cd?c===He&&md(Cd,!0,!0):b?nd():e.click&&pd({index:a.shiftKey||Z(xc(a._x)),slow:a.altKey,user:!0})}function rd(a,b){Me[a]=Oe[a]=b}function sd(a){var b=d(this).data().eq;pd({index:b,slow:a.altKey,user:!0,coo:a._x-ye.offset().left})}function td(a){pd({index:we.index(this)?">":"<",slow:a.altKey,user:!0})}function ud(a){X(a,function(){setTimeout(function(){Q(re)},0),nd(!1)})}function vd(){if(m(),u(),!vd.i){vd.i=!0;var a=e.startindex;(a||e.hash&&c.hash)&&(Ld=L(a||c.hash.replace(/^#/,""),yd,0===ie.index||a,a)),Je=Fd=Gd=Hd=Ld=z(Ld)||0}if(zd){if(wd())return;Cd&&md(Cd,!0),Ed=[],bd(Xc),vd.ok=!0,ie.show({index:Je,time:0}),ie.resize()}else ie.destroy()}function wd(){return!wd.f===Yd?(wd.f=Yd,Je=zd-1-Je,ie.reverse(),!0):void 0}function xd(){xd.ok||(xd.ok=!0,fd("ready"))}Cc=d("html"),Dc=d("body");var yd,zd,Ad,Bd,Cd,Dd,Ed,Fd,Gd,Hd,Id,Jd,Kd,Ld,Md,Nd,Od,Pd,Qd,Rd,Sd,Td,Ud,Vd,Wd,Xd,Yd,Zd,$d,_d,ae,be,ce,de,ee,fe,ge,he,ie=this,je=d.now(),ke=ib+je,le=a[0],me=1,ne=a.data(),oe=d("<style></style>"),pe=d(N(Yb)),qe=d(N(kb)),re=d(N(xb)).appendTo(qe),se=(re[0],d(N(Ab)).appendTo(re)),te=d(),ue=d(N(Db+" "+Fb+rc)),ve=d(N(Db+" "+Gb+rc)),we=ue.add(ve).appendTo(re),xe=d(N(Ib)),ye=d(N(Hb)).appendTo(xe),ze=d(N(Jb)).appendTo(ye),Ae=d(),Be=d(),Ce=(se.data(),ze.data(),d(N(jc)).appendTo(ze)),De=d(N($b+rc)),Ee=De[0],Fe=d(N(mc)),Ge=d(N(nc)).appendTo(re),He=Ge[0],Ie=d(N(qc)),Je=!1,Ke={},Le={},Me={},Ne={},Oe={},Pe={},Qe={},Re={},Se=0,Te=[];
qe[Xc]=d(N(yb)),qe[Zc]=d(N(Mb+" "+Ob+rc,N(ic))),qe[Yc]=d(N(Mb+" "+Nb+rc,N(hc))),Qe[Xc]=[],Qe[Zc]=[],Qe[Yc]=[],Re[Xc]={},qe.addClass(Ic?mb:lb).toggleClass(qb,!e.controlsonstart),ne.fotorama=this,ie.startAutoplay=function(a){return ie.autoplay?this:(ce=de=!1,t(a||e.autoplay),jd(),this)},ie.stopAutoplay=function(){return ie.autoplay&&(ce=de=!0,jd()),this},ie.show=function(a){var b;"object"!=typeof a?(b=a,a={}):b=a.index,b=">"===b?Gd+1:"<"===b?Gd-1:"<<"===b?0:">>"===b?zd-1:b,b=isNaN(b)?L(b,yd,!0):b,b="undefined"==typeof b?Je||0:b,ie.activeIndex=Je=z(b),Id=E(Je),Jd=U(Je),Kd=x(Je+(Yd?-1:1)),Ed=[Je,Id,Jd],Gd=Md?b:Je;var c=Math.abs(Hd-Gd),d=w(a.time,function(){return Math.min(Vd*(1+(c-1)/12),2*Vd)}),f=a.overPos;a.slow&&(d*=10);var g=Dd;ie.activeFrame=Dd=yd[Je];var i=g===Dd&&!a.user;md(Cd,Dd.i!==yd[x(Fd)].i),lc(Ed,"stage"),tc(Mc?[Gd]:[Gd,E(Gd),U(Gd)]),rd("go",!0),i||fd("show",{user:a.user,time:d}),ce=!0;var j=ie.show.onEnd=function(b){if(!j.ok){if(j.ok=!0,b||cd(!0),i||fd("showend",{user:a.user}),!b&&Wd&&Wd!==e.transition)return ie.setOptions({transition:Wd}),void(Wd=!1);Sb(),Pb(Ed,"stage"),rd("go",!1),Hc(),od(),id(),jd()}};if(Sd){var k=Dd[Xc],l=Je!==Hd?yd[Hd][Xc]:null;ab(k,l,te,{time:d,method:e.transition,onEnd:j},Te)}else _(se,{pos:-r(Gd,Le.w,e.margin,Fd),overPos:f,time:d,onEnd:j});if(Gc(),Nd){Tc();var m=y(Je+h(Gd-Hd,-1,1));Rc({time:d,coo:m!==Je&&a.coo,guessIndex:"undefined"!=typeof a.coo?m:Je,keep:i}),Od&&Oc(d)}return be="undefined"!=typeof Hd&&Hd!==Je,Hd=Je,e.hash&&be&&!ie.eq&&H(Dd.id||Je+1),this},ie.requestFullScreen=function(){return Qd&&!ie.fullScreen&&(_d=Ec.scrollTop(),ae=Ec.scrollLeft(),Q(Ec),rd("x",!0),ee=d.extend({},Le),a.addClass(Zb).appendTo(Dc.addClass(jb)),Cc.addClass(jb),md(Cd,!0,!0),ie.fullScreen=!0,Rd&&vc.request(le),ie.resize(),Pb(Ed,"stage"),Sb(),fd("fullscreenenter")),this},ie.cancelFullScreen=function(){return Rd&&vc.is()?vc.cancel(b):kd(),this},ie.toggleFullScreen=function(){return ie[(ie.fullScreen?"cancel":"request")+"FullScreen"]()},T(b,vc.event,function(){!yd||vc.is()||Cd||kd()}),ie.resize=function(a){if(!yd)return this;var b=arguments[1]||0,c=arguments[2];ed(ie.fullScreen?{width:"100%",maxwidth:null,minwidth:null,height:"100%",maxheight:null,minheight:null}:R(a),[Le,c||ie.fullScreen||e]);var d=Le.width,f=Le.height,g=Le.ratio,i=Ec.height()-(Nd?ye.height():0);return q(d)&&(qe.addClass(ub).css({width:d,minWidth:Le.minwidth||0,maxWidth:Le.maxwidth||ad}),d=Le.W=Le.w=qe.width(),Le.nw=Nd&&p(e.navwidth,d)||d,e.glimpse&&(Le.w-=Math.round(2*(p(e.glimpse,d)||0))),se.css({width:Le.w,marginLeft:(Le.W-Le.w)/2}),f=p(f,i),f=f||g&&d/g,f&&(d=Math.round(d),f=Le.h=Math.round(h(f,p(Le.minheight,i),p(Le.maxheight,i))),re.stop().animate({width:d,height:f},b,function(){qe.removeClass(ub)}),cd(),Nd&&(ye.stop().animate({width:Le.nw},b),Rc({guessIndex:Je,time:b,keep:!0}),Od&&wc.nav&&Oc(b)),$d=c||!0,xd())),Se=re.offset().left,this},ie.setOptions=function(a){return d.extend(e,a),vd(),this},ie.shuffle=function(){return yd&&O(yd)&&vd(),this},ie.destroy=function(){return ie.cancelFullScreen(),ie.stopAutoplay(),yd=ie.data=null,j(),Ed=[],bd(Xc),vd.ok=!1,this},ie.playVideo=function(){var a=Dd,b=a.video,c=Je;return"object"==typeof b&&a.videoReady&&(Rd&&ie.fullScreen&&ie.cancelFullScreen(),G(function(){return!vc.is()||c!==Je},function(){c===Je&&(a.$video=a.$video||d(d.Fotorama.jst.video(b)),a.$video.appendTo(a[Xc]),qe.addClass(nb),Cd=a.$video,o(),we.blur(),De.blur(),fd("loadvideo"))})),this},ie.stopVideo=function(){return md(Cd,!0,!0),this},re.on("mousemove",od),Me=db(se,{onStart:gd,onMove:function(a,b){ld(re,b.edge)},onTouchEnd:hd,onEnd:function(a){ld(re);var b=(Nc&&!ge||a.touch)&&e.arrows&&"always"!==e.arrows;if(a.moved||b&&a.pos!==a.newPos&&!a.control){var c=s(a.newPos,Le.w,e.margin,Fd);ie.show({index:c,time:Sd?Vd:a.time,overPos:a.overPos,user:!0})}else a.aborted||a.control||qd(a.startEvent,b)},timeLow:1,timeHigh:1,friction:2,select:"."+Xb+", ."+Xb+" *",$wrap:re}),Oe=db(ze,{onStart:gd,onMove:function(a,b){ld(ye,b.edge)},onTouchEnd:hd,onEnd:function(a){function b(){Rc.l=a.newPos,id(),jd(),uc(a.newPos,!0)}if(a.moved)a.pos!==a.newPos?(ce=!0,_(ze,{time:a.time,pos:a.newPos,overPos:a.overPos,onEnd:b}),uc(a.newPos),Xd&&ld(ye,K(a.newPos,Oe.min,Oe.max))):b();else{var c=a.$target.closest("."+Mb,ze)[0];c&&sd.call(c,a.startEvent)}},timeLow:.5,timeHigh:2,friction:5,$wrap:ye}),Ne=eb(re,{shift:!0,onEnd:function(a,b){gd(),hd(),ie.show({index:b,slow:a.altKey})}}),Pe=eb(ye,{onEnd:function(a,b){gd(),hd();var c=v(ze)+.25*b;ze.css(k(h(c,Oe.min,Oe.max))),Xd&&ld(ye,K(c,Oe.min,Oe.max)),Pe.prevent={"<":c>=Oe.max,">":c<=Oe.min},clearTimeout(Pe.t),Pe.t=setTimeout(function(){Rc.l=c,uc(c,!0)},Pc),uc(c)}}),qe.hover(function(){setTimeout(function(){fe||nd(!(ge=!0))},0)},function(){ge&&nd(!(ge=!1))}),M(we,function(a){Y(a),td.call(this,a)},{onStart:function(){gd(),Me.control=!0},onTouchEnd:hd}),we.each(function(){W(this,function(a){td.call(this,a)}),ud(this)}),W(Ee,ie.toggleFullScreen),ud(Ee),d.each("load push pop shift unshift reverse sort splice".split(" "),function(a,b){ie[b]=function(){return yd=yd||[],"load"!==b?Array.prototype[b].apply(yd,arguments):arguments[0]&&"object"==typeof arguments[0]&&arguments[0].length&&(yd=P(arguments[0])),vd(),ie}}),vd()},d.fn.fotorama=function(b){return this.each(function(){var c=this,e=d(this),f=e.data(),g=f.fotorama;g?g.setOptions(b,!0):G(function(){return!E(c)},function(){f.urtext=e.html(),new d.Fotorama(e,d.extend({},cd,a.fotoramaDefaults,b,f))})})},d.Fotorama.instances=[],d.Fotorama.cache={},d.Fotorama.measures={},d=d||{},d.Fotorama=d.Fotorama||{},d.Fotorama.jst=d.Fotorama.jst||{},d.Fotorama.jst.style=function(a){{var b,c="";tc.escape}return c+=".fotorama"+(null==(b=a.s)?"":b)+" .fotorama__nav--thumbs .fotorama__nav__frame{\npadding:"+(null==(b=a.m)?"":b)+"px;\nheight:"+(null==(b=a.h)?"":b)+"px}\n.fotorama"+(null==(b=a.s)?"":b)+" .fotorama__thumb-border{\nheight:"+(null==(b=a.h-a.b*(a.q?0:2))?"":b)+"px;\nborder-width:"+(null==(b=a.b)?"":b)+"px;\nmargin-top:"+(null==(b=a.m)?"":b)+"px}"},d.Fotorama.jst.video=function(a){function b(){c+=d.call(arguments,"")}var c="",d=(tc.escape,Array.prototype.join);return c+='<div class="fotorama__video"><iframe src="',b(("youtube"==a.type?a.p+"youtube.com/embed/"+a.id+"?autoplay=1":"vimeo"==a.type?a.p+"player.vimeo.com/video/"+a.id+"?autoplay=1&badge=0":a.id)+(a.s&&"custom"!=a.type?"&"+a.s:"")),c+='" frameborder="0" allowfullscreen></iframe></div>\n'},d(function(){d("."+ib+':not([data-auto="false"])').fotorama()})}(window,document,location,"undefined"!=typeof jQuery&&jQuery);
(function () {
  mp20_gallery_controller.$inject = ["$scope", "mp20_gallery_service", "$timeout", "$rootScope", "mp20_restaurant_info_service"];
  angular.module("mp20App").controller("mp20_gallery_controller", mp20_gallery_controller);

  function mp20_gallery_controller($scope, mp20_gallery_service, $timeout, $rootScope, mp20_restaurant_info_service) {
    var mp20_gallery_id = "#mp20_gallery",
      gallery_target_id = mp20_gallery_id + " .picture_area",
      gallery_screen = mp20_gallery_id + " + .black_screen",
      close_btn = mp20_gallery_id + " .close_btn",
      gallery_pictures = [],
      open_class = "on",
      $gallery,
      $mp20_gallery,
      $black_screen,
      $close_btn,
      element_translator = nameSpace("mp20.element_translator"),
      visible_translate_btn = nameSpace("mp20.visible_translate_btn"),
      options = {
        "is_opend": false,
        "bind_resize": false
      };

    // URL: https://github.com/iominh/ng-scrollbars
    $scope.review_scrollbar_config = {
      autoHideScrollbar: true,
      theme: 'minimal-dark',
      advanced: {
        updateOnContentResize: true
      },
      scrollInertia: 0
    };


    /**
     * 보여줄 picture_list가 담기는 변수.
     * picture_list의 item에는 review도 들어있어야함.
     * @type {Array}
     */
    $scope.picture_list = [];

    /**
     * 현재 index를 나타내는 변수.
     * @type {number}
     */
    $scope.index = 0;
    $scope.picture_list_count = 0;

    $scope.now_page = undefined;
    $scope.is_menu_picture = false;
    $scope.restaurant_name = "";
    $scope.page_locale = $rootScope.page_locale;

    $scope.init = init;
    $scope.open_gallery = open_gallery;
    $scope.close_gallery = close_gallery;
    $scope.set_review = set_review;
    $scope.add_picture_list = add_picture_list;
    $scope.handle_translate_btn = handle_translate_btn;
    $scope.get_recommend_class_name = mp20_restaurant_info_service.get_recommend_class_name;
    $scope.get_recommend_message = mp20_restaurant_info_service.get_recommend_message;
    $scope.is_naver_source = mp20_gallery_service.is_naver_source;
    $scope.get_plaform_name = mp20_gallery_service.get_plaform_name;
    $scope.get_plaform_image = mp20_gallery_service.get_plaform_image;
    $scope.get_user_picture = mp20_gallery_service.get_user_picture;
    $scope.get_review_content = mp20_gallery_service.get_review_content;
    $scope.get_insta_content = mp20_gallery_service.get_insta_content;
    $scope.from_date = mp20_restaurant_info_service.diff_date_formatting;
    $scope.is_translate_btn_show = visible_translate_btn.is_show;
    $scope.translate_btn_text = element_translator.get_btn_text_by_state;
    $scope.show_picture = undefined;
    $scope.review_content = undefined;
    $scope.insta_content = undefined;

    /**
     * 갤러리 초기화 메서드.
     */
    function init() {
      set_gallery_element();
      export_gallery_method();
      bind_angular_event();

      $(document).on("click", ".fotorama__arr--prev", function () {
        common_ga(get_now_page_code(), "CLICK_GALLERY_LEFT");
      });

      $(document).on("click", ".fotorama__arr--next", function () {
        common_ga(get_now_page_code(), "CLICK_GALLERY_RIGHT");
      });
    }

    function get_gallery_object() {
      set_gallery_element();

      return $gallery.data("fotorama");
    }

    /**
     * 갤러리를 열어주는 메서드.
     * @param picture_list
     * @param start_index
     * @param start_options
     * @returns {boolean}
     */
    function open_gallery(picture_list, start_index, start_options) {
      if (options.is_opend) {
        return false;
      }

      picture_list = _.map(picture_list, _.clone);
      $scope.picture_list = mp20_gallery_service.transform_insta_data(picture_list);

      var ad_count = 0;
      if(is_mobile_viewport() && start_options.type === 'restaurant' ) {
        var adm = AdManager.get_instance();
        var inventory = adm.repo.find('web_mobile', 'restaurant', 'photoviewer');

        if (inventory) {
          var start = inventory.arg_value('start', 0);
          var every = inventory.arg_value('every', 0);
          var area = adm.area_renderer.find_area(inventory);

          if(area._data && area._data.img) {
            start_index = parseInt(start_index);
            var series = new AdSeries(start_index + start - every, every * 2, 2);

            for (var i = 0; i < $scope.picture_list.length; i++) {
              if (AdMatcher.is_match_with(series, i)) {
                if (start_index >= i)
                  start_index++;
              }
            }

            series = new AdSeries(start_index + start - every, every * 2, 2);
            for (i = 1; i < $scope.picture_list.length; i++) {
              if (AdMatcher.is_match_with(series, i)) {
                $scope.picture_list.splice(i, 0, {
                  ad: true,
                  link_url: area._data.link_url,
                  icon: area._data.icon,
                  title: area._data.title,
                  picture_url: area._data.img
                });
                ad_count++;
              }
            }
          }
        }
      }

      $scope.picture_list_count = $scope.picture_list.length - ad_count;

      gallery_pictures = JSON.parse(JSON.stringify($scope.picture_list));
      var data = get_splice_picture_list();
      var option = get_gallery_options();
      option = _.assign(option, {
        "data": data,
        "startindex": start_index
      });

      start_options = start_options || {};

      $scope.is_menu_picture = start_options.type === "menu"

      $scope.restaurant_name = start_options.restaurant_name;
      $mp20_gallery.addClass(open_class);

      set_gallery_element();
      on_gallery_event_bind();

      $gallery.fotorama(option);

      bind_gallery_resize_event();

      scroll_lock();
      options.is_opend = true;
    }

    /**
     * 갤러리를 닫아주는 메서드.
     */
    function close_gallery() {
      if (!options.is_opend) {
        return false;
      }
      common_ga(get_now_page_code(), "CLICK_GALLERY_CLOSE");
      var gallery_object = get_gallery_object();

      $mp20_gallery.removeClass(open_class);

      off_gallery_event_bind();
      unscroll_lock();
      gallery_object.destroy();

      $gallery.data("fotorama", "");
      options.is_opend = false;
      $scope.now_page = undefined;
    }

    /**
     * 갤러리에 필요한 이벤트를 바인딩 해주는 메서드.
     */
    function on_gallery_event_bind() {
      $gallery.on("fotorama:show", function (e, fotorama) {
        $timeout(function () {
          var diff_number;

          $scope.set_review(fotorama.activeIndex);
          $scope.review_content = $scope.get_review_content($scope.show_picture);
          $scope.insta_content = $scope.get_insta_content($scope.show_picture);

          if ((fotorama.size - 6 < fotorama.activeIndex) && (gallery_pictures.length > 0)) {
            fotorama.push.apply(fotorama, get_splice_picture_list());
          }

          if ($scope.now_page !== undefined) {
            diff_number = fotorama.activeIndex - $scope.now_page;

            if (diff_number !== 0) {
              common_ga(get_now_page_code(), "CLICK_GALLERY_COORD_" + diff_number.toString());

              if (!is_mobile_viewport()) {
                return false;
              }
            }
          }

          var ad_count=0;
          for(var i=0; i<fotorama.activeIndex; i++) {
            if(fotorama.data[i].hasOwnProperty('ad') && fotorama.data[i].ad === true) {
              ad_count++;
            }
          }
          $scope.now_page = fotorama.activeIndex+1 - ad_count;
        }, 0);
      });

      $black_screen.on("click", function () {
        close_gallery();
      });

      $close_btn.on("click", function () {
        close_gallery();
      });

      $(window).on("keyup", function (e) {
        if (parseInt(e.which) === 27) {
          // ESC 키를 눌렀을 경우.
          $scope.close_gallery();
        }
      });
    }

    /**
     * Gallery에 바인딩된 이벤트를 해제헤주는 메서드.
     */
    function off_gallery_event_bind() {
      $gallery.off("fotorama:show");
      $black_screen.off("click");
      $close_btn.off("click");
      $(window).off("keyup");
    }

    /**
     * 갤러리가 될 Element를 가져오는 메서드.
     * @returns {$}
     */
    function set_gallery_element() {
      if (!$gallery) {
        $gallery = $(gallery_target_id);
      }

      if (!$black_screen) {
        $black_screen = $(gallery_screen);
      }

      if (!$mp20_gallery) {
        $mp20_gallery = $(mp20_gallery_id);
      }

      if (!$close_btn) {
        $close_btn = $(close_btn);
      }

      return $gallery;
    }

    /**
     * 보여줄 리뷰를 세팅해주는 메서드.
     * @param index - 보여줄 리뷰의 index
     */
    function set_review(index) {
      $scope.show_picture = $scope.picture_list[index];

      $timeout(function () {
        $scope.updateScrollbar('scrollTo', 0);
      })
    }

    /**
     * Gallery Resize Event를 바인딩 해주는 메서드.
     *
     * throttle를 이용하여 resize 이벤트를 500ms 마다 발생하도록 변경.
     */
    function bind_gallery_resize_event() {
      if (options.bind_resize) {
        return false
      }

      var resize_throttle = _.throttle(function () {
        var gallery_object = get_gallery_object(),
          option = get_gallery_options();


        if (!gallery_object) {
          return false;
        }

        gallery_object.setOptions(option);
      }, 500);

      $(window).on("resize", resize_throttle);
      options.bind_resize = true;
    }

    /**
     * 사진을 추가해주는 메서드.
     * push를 array로 던지는게 아니고 object를 여러 파라미터로 던져주는 형태라 Apply로 함수를 호출.
     */
    function add_picture_list(picture_list) {
      var gallery_object = get_gallery_object();

      gallery_object.push.apply(gallery_object, picture_list);
    }

    /**
     * Angular Scope 밖으로 메서드를 노출시켜주는 메소드.
     */
    function export_gallery_method() {
      if (window.mp20.gallery) {
        window.mp20.gallery = {
          "open_gallery": open_gallery,
          "add_picture_list": add_picture_list
        };
      }
    }

    /**
     * Angular 전파 이벤트를 받아서 해당 메서드를 실행해주는 메서드.
     */
    function bind_angular_event() {
      $rootScope.$on("mp20:gallery:open_gallery", function (event, data) {
        $scope.open_gallery(data.picture_list, data.start_index, data.options);
      });

      $rootScope.$on("mp20:gallery:add_picture_list", function (event, picture_list) {
        $scope.add_picture_list(picture_list);
      });
    }

    /**
     * 갤러리에 적용할 옵션을 가져오는 메서드.
     * @returns {object} - 옵션 객체.
     */
    function get_gallery_options() {
      var init_width_height = mp20_gallery_service.get_init_image_size();

      var option = {
        width: init_width_height.width,
        height: init_width_height.height,
        arrows: 'always',
        keyboard: true,
        loop: false,
        click: false
      };

      if (is_mobile_viewport()) {
        option.nav = false;
      } else {
        option.nav = 'thumbs';
      }

      return option;
    }

    function get_splice_picture_list() {
      var splice_count = 15;

      return mp20_gallery_service.transform_picture_list(gallery_pictures.splice(0, splice_count));
    }

    function handle_translate_btn() {
      element_translator
        .translate($scope.review_content.comment, $scope.review_content.state, $scope.review_content.language, $scope.page_locale)
        .then(function(data) {
          $timeout(function(){
            $scope.review_content.state = data.state;
            $scope.review_content.comment = data.text;
          });
        });
    }

    $scope.init();
  }
})();
(function(){
	mp20_gallery_service.$inject = ["mp20_restaurant_info_service", "$rootScope"];
	angular.module("mp20App").factory("mp20_gallery_service", mp20_gallery_service);

	function mp20_gallery_service(mp20_restaurant_info_service, $rootScope){
		/**
		 * 네임스페이스.
		 * @namespace mp20_gallery_service
		 */
		var mp20_gallery_service = {};
    var element_translator = nameSpace("mp20.element_translator");

		/**
		 * 갤러리 init할때의 사진 사이즈를 가져오는 메서드.
		 * @returns {{width: number, height: number}}
		 */
		mp20_gallery_service.get_init_image_size = function(){
			var picture_area_right = 335,
					thumb_outter_height = 73,
					width,
					height;

			if(is_mobile_viewport()){
				width = document.documentElement.clientWidth;
				height = document.documentElement.clientHeight;
			} else {
				width = document.documentElement.clientWidth * (90 / 100) - picture_area_right;
				height = document.documentElement.clientHeight * (80 / 100) - thumb_outter_height;
			}

			return {
				"width": width,
				"height": height,
				"minwidth": width,
				"minheight": height
			}
		};

		/**
		 * 갤러리 라이브러리에 넣을 데이터 셋을 만들어주는 메서드.
		 * @param restaurant_info_list - 레스토랑 정보 데이터.
		 * @returns {array} - 갤러리 라이브러리에 넣을 데이터 셋
		 */
		mp20_gallery_service.transform_picture_list = function(restaurant_info_list){
			return _.map(restaurant_info_list, function(restaurant_info_item){
				var result_item;

				if(restaurant_info_item.pic_domain && restaurant_info_item.pic_key){
					restaurant_info_item = {
						"restaurant":restaurant_info_item
					};

					result_item = {
						img: mp20_restaurant_info_service.get_picture_url(restaurant_info_item, undefined),
						thumb: mp20_restaurant_info_service.get_picture_url_by_akamai(restaurant_info_item.restaurant.pic_domain, restaurant_info_item.restaurant.pic_key, 66, 68)
					};
				} else if(restaurant_info_item.images){
					// 인스타그램 이미지
					result_item = {
						img: restaurant_info_item.images.standard_resolution.url,
						thumb: restaurant_info_item.images.thumbnail.url
					}
				} else if(restaurant_info_item.hasOwnProperty('ad') && restaurant_info_item.ad === true) {
          result_item = {
            img: restaurant_info_item.picture_url,
            thumb: restaurant_info_item.picture_url,
            ad: true,
            html: _.template('<a href="{{link_url}}"></a>')({link_url: restaurant_info_item.link_url}),
            icon: restaurant_info_item.icon,
            title: restaurant_info_item.title
          }
        }

				return result_item;
			});
		};

		mp20_gallery_service.open_gallery = function(picture_list, start_index, options){
			$rootScope.$broadcast("mp20:gallery:open_gallery", {
				"picture_list": picture_list,
				"start_index": start_index,
				"options": options
			});
		};

		mp20_gallery_service.add_picture_list = function(picture_list){
			$rootScope.$broadcast("mp20:gallery:add_picture_list", picture_list);
		};

		mp20_gallery_service.is_naver_source = function(source){
			if(source){
				return source.indexOf("naver.com") > -1;
			}
		};

		/**
		 * 사진의 플랫폼 이름을 가져오는 메서드.
		 * @param source - descriptor
		 * @returns {string} - 이름.
		 */
		mp20_gallery_service.get_plaform_name = function(source){
			if(mp20_gallery_service.is_naver_source(source)){
				return "Naver";
			} else if (source){
				return "Instagram";
			} else {
				return "Mangoplate";
			}
		};

		/**
		 * 사진의 플랫폼 사진을 가져오는 메서드.
		 * @returns {string} - 사진 주소.
		 */
		mp20_gallery_service.get_plaform_image = function(source){
			if(mp20_gallery_service.is_naver_source(source)){
				return "https://mp-seoul-image-production-s3.mangoplate.com/web/resources/x1kolvhpa9efu_2k.png";
			} else if (source){
				return "https://mp-seoul-image-production-s3.mangoplate.com/web/resources/fye3rudxyxrlo-og.png";
			} else {
				return "https://d1jrqqyoo3n46w.cloudfront.net/web/resources/rc0yhrdt6iui1tz3.png";
			}
		};

		/**
		 * 리뷰 사람 사진을 가져오는 메서드.
		 * @param show_picture - picture 객체
		 * @returns {string} - picture url
		 */
		mp20_gallery_service.get_user_picture = function(show_picture){
			if(!show_picture){return "";}

			var user_picture;

      if(show_picture.user && show_picture.user.facebook_id){
        user_picture = get_facebook_user_picture(show_picture.user);
      } else if(show_picture.user && !show_picture.images){
				user_picture = show_picture.user.picture_url || "https://mp-seoul-image-production-s3.mangoplate.com/web/resources/jmcmlp180qwkp1jj.png?fit=around|*:*&crop=*:*;*,*&output-format=jpg&output-quality=80";
			} else {
				if(show_picture.images){
					user_picture = mp20_gallery_service.get_plaform_image(show_picture.link);
				} else {
					user_picture = mp20_gallery_service.get_plaform_image(show_picture.short_description);
				}
			}

			return user_picture;
		};

		/**
		 * review content를 타입에 따라 리턴해주는 메서드.
		 * @param show_picture
		 * @returns {{comment: string, type: string}}
		 */
		mp20_gallery_service.get_review_content = function(show_picture){
			var content_obj = {
				"comment": "",
				"type": ""
			};
			var comment;

			if(!show_picture){return content_obj;}

			if(show_picture.comment){
				comment = show_picture.comment.comment;
				content_obj.type = "review";
			} else if(show_picture.review){
				comment = show_picture.review.comment;
				content_obj.type = "review";
			} else {
				if(mp20_gallery_service.is_naver_source(show_picture.short_description)){
					content_obj.type = "naver";
				} else {
					if(show_picture.short_description){
						if(show_picture.short_description.indexOf("instagram") > -1){
							content_obj.type = "insta";
						}
					} else {
						content_obj.type = "mp";
					}
				}

				comment = show_picture.short_description;
			}

			content_obj.comment = comment;
			content_obj.language = show_picture.review ? show_picture.review.language : I18n.defaultLocale;
			content_obj.state = element_translator.TRANSLATE_STATE.ORIGINAL;
			content_obj.member_uuid = show_picture.user ? show_picture.user.member_uuid : null;

			return content_obj;
		};

		/**
		 * offical 인스타 데이터를 Gallery에 호환 가능한 포맷으로 바꿔주는 메서드.
		 * @param picture_list - 변경할 사진 리스트.
		 * @returns {picture_list} - 변경된 사진 리스트.
		 */
		mp20_gallery_service.transform_insta_data = function(picture_list){
			_.each(picture_list, function(item){
				if(item.link){
					item.short_description = item.link;
				}
			});

			return picture_list;
		};

		/**
		 * 인스타그램 사진일때 보여줄 콘텐츠를 가져오는 메서드.
		 * @param show_picture - 사진 정보가 들어있는 Object
		 * @returns {string} - Content 정보.
		 */
		mp20_gallery_service.get_insta_content = function(show_picture){
			var insta_content = "",
					short_description;

			if(!show_picture){return "";}

			if(short_description = show_picture.short_description){
				if(short_description.indexOf("instagram.com") > -1){
					insta_content = short_description;
				} else {
					insta_content = "@" + short_description;
				}
			}

			return insta_content;
		};

		window.mp20.mp20_gallery_service = mp20_gallery_service;
		return mp20_gallery_service;
	}
})();



(function(){
	mp20_map_popup_controller.$inject = ["$scope", "mp20_map_popup_service", "mp20_common_code_service", "mp20_util_service", "$timeout"];
	angular.module("mp20App").controller("mp20_map_popup_controller", mp20_map_popup_controller);

	function mp20_map_popup_controller($scope, mp20_map_popup_service, mp20_common_code_service, mp20_util_service, $timeout){
		var config = {
			"wrap": ".mp20_map_popup",
			"map_area": ".mp20_map_popup .map_area",
			"open_class": "open"
		};
		var map;

		$scope.restaurant = {};
		$scope.is_set_map = false;
		$scope.is_open = false;

		$scope.open = open;
		$scope.close = close;
		$scope.set_map = set_map;

		/**
		 * 초기화 메서드.
		 * mp20_map_popup_service에서 BroadCase해주는 메시지를 subscribe을 걸어줌.
		 */
		function init(){
			$scope.$on(mp20_map_popup_service.EVENT_NAME.OPEN, function(event, restaurant){
				$scope.open(restaurant);
			});

			$scope.$on(mp20_map_popup_service.EVENT_NAME.CLOSE, close);
		}

		/**
		 * Popup Open
		 */
		function open(restaurant) {
			common_ga(get_now_page_code(), is_mobile_viewport() ? "CLICK_MAP" : "CLICK_MAP_EXPAND");
			add_open_class();

      $timeout(function() {
        $scope.restaurant = restaurant;
        $scope.is_open = true;
        $scope.set_map(restaurant);
      });
    }

		/**
		 * Popup Close
		 */
		function close(){
      $scope.restaurant = {};
			$scope.is_open = false;
			remove_open_class();
		}

		function add_open_class(){
			$(config.wrap).addClass(config.open_class);
		}

		function remove_open_class(){
			$(config.wrap).removeClass(config.open_class);
		}

		/**
		 * Map을 만들어주는 메서드.
		 * @param restaurant
		 */
		function set_map(restaurant){
			var restaurant_data = [],
					common_code_promise = mp20_common_code_service.get_common_code();

			if($scope.is_set_map && map){
			  map.inplementObject.set_center(restaurant.latitude, restaurant.longitude);
			  return false;
			}

			mp20_util_service.common_promise(common_code_promise, function(common_code){
				common_code = common_code.data;
        var picture = restaurant.pictures.length ? restaurant.pictures[0] : undefined;
        var picture_url = "";

        if(picture) {
          picture_url = get_full_picture_url_by_akamai(picture.pic_domain + "/" + picture.pic_key, 105, 105);
        }

        if(is_foreign_restaurant(restaurant.region_code)){
          var google_map = new mp20.google_map();

          google_map._get_script()
                    .then(function(google_map) {
                      set_map_callback(google_map);
                    });
        } else {
          new window.mp20.MapInterface(false, set_map_callback);
        }

        function set_map_callback(map_obj){
          restaurant_data.push(map_obj.make_info_obj(
              restaurant.latitude,
              restaurant.longitude,
              restaurant.name,
              restaurant.rating,
              restaurant.official_rating_available,
              get_subcuisine(common_code, restaurant.subcusine_code),
              get_metro(common_code, restaurant.metro_code),
              restaurant.action,
              restaurant.restaurant_uuid,
              restaurant.restaurant_key,
              restaurant.review_count,
              restaurant.wannago_count,
              picture_url
          ));

          map_obj.init(config.map_area, restaurant_data, {
            "scroll_wheel": true,
            "open_info_window_index": 0,
            "onMarkerClickCallback": function() {
              common_ga('PG_MAP', "CLICK_MARKER")
            }
          });

          map = map_obj;

          $scope.is_set_map = true;
        }
			});
		}

		init();
	}
})();
(function () {
  function ReviewDeleteController() {

  }

  ReviewDeleteController.prototype = {
    deleteReview: function (reviewKey) {
      if (!reviewKey) {
        throw new Error('reviewKey is empty');
      }

      return window.mp20.utils.HttpApi.deleteReview(reviewKey)
        .then(function (res) {
          if (res.error) {
            throw res.error;
          }

          return res;
        });
    }
  };

  window.mp20.controller['ReviewDeleteController'] = ReviewDeleteController;
})();
(function () {
  var GA_PAGE_NAME = 'PU_REVIEW_REMOVE';
  function ReviewDeleteConfirmLayer(reviewController) {
    window.mp20.view.Interface.call(this);
    this._$layer = $(".ReviewDeleteConfirmLayer");
    this._$deleteButton = this._$layer.find('.ReviewDeleteConfirmLayer__DeleteButton');
    this._$cancelButton = this._$layer.find('.ReviewDeleteConfirmLayer__CancelButton');
    this._reviewController = reviewController;
    this._reviewKey = null;

    this._bindEvent();
  }

  ReviewDeleteConfirmLayer.prototype = Object.create(window.mp20.view.Interface.prototype, {
    show: {
      value: function (reviewKey, restaurantKey) {
        if (!reviewKey) {
          this.close();
          throw new Error('reviewKey is empty variable');
        }

        common_ga_page(GA_PAGE_NAME);
        this._setReviewkey(reviewKey);
        this._setRestaurantKey(restaurantKey);
        this._$layer.fadeIn('fast');
      }
    },

    hide: {
      value: function () {
        this._setReviewkey(null);
        this._setRestaurantKey(null);
        this._$layer.fadeOut('fast');
      }
    },

    _setReviewkey: {
      value: function (actionID) {
        this._reviewKey = actionID;
      }
    },

    _setRestaurantKey: {
      value: function (restaurantKey) {
        this._restaurantKey = restaurantKey;
      }
    },

    _bindEvent: {
      value: function () {
        this._$deleteButton.on('click', this._handleClickDeleteButton.bind(this));
        this._$cancelButton.on('click', this._handleClickCancelButton.bind(this));
      }
    },

    _handleClickDeleteButton: {
      value: function () {
        if (!this._reviewKey) {
          throw new Error('reviewKey is empty');
        }

        common_ga(GA_PAGE_NAME, 'CLICK_REMOVE', {review_key: this._reviewKey, restaurant_key: this._restaurantKey});

        this._reviewController
          .deleteReview(this._reviewKey)
          .then(this._handleSuccessDeleteReview.bind(this))
          .catch(this._handleFailDeleteReview.bind(this));
      }
    },

    _handleClickCancelButton: {
      value: function () {
        this.hide();
      }
    },

    _handleSuccessDeleteReview: {
      value: function (res) {
        this.hide();
        window.location.reload(true);
      }
    },

    _handleFailDeleteReview: {
      value: function (e) {
        this.hide();
      }
    }
  });

  ReviewDeleteConfirmLayer.prototype.constructor = ReviewDeleteConfirmLayer;

  window.mp20.view['ReviewDeleteConfirmLayer'] = new ReviewDeleteConfirmLayer(new window.mp20.controller.ReviewDeleteController());
})();
(function(){
	angular.module("mp20App").directive("mp20MapPopup", mp20MapPopup);

	function mp20MapPopup(){
		return {
			templateUrl: "/assets/directive/mp20_map_popup.html",
			link: function(){

			},
			controller: "mp20_map_popup_controller"
		};
	}
})();
(function(){
	mp20_map_popup_service.$inject = ["$rootScope"];
	angular.module("mp20App").factory("mp20_map_popup_service", mp20_map_popup_service);

	function mp20_map_popup_service($rootScope){
		var mp20_map_popup_service = {};

		mp20_map_popup_service.EVENT_NAME = {
			"OPEN": "OPEN_MAP_POPUP",
			"CLOSE": "CLOSE_MAP_POPUP"
		};

		mp20_map_popup_service.open = function(restaurant){
			$rootScope.$broadcast(this.EVENT_NAME.OPEN, restaurant);
		};

		mp20_map_popup_service.close = function(){
			$rootScope.$broadcast(this.EVENT_NAME.CLOSE, {});
		};

		return mp20_map_popup_service;
	}
})();
(function(){
	$(document).ready(function(){
		var $restaurant_share_button = $(".restaurant_share_button"),
				close_btn = ".restaurant_share_button .close_btn",
				active_btn_class = ".active_btn",
				on_class = "on",
				is_on = false;

		function on(){
			common_ga(get_now_page_code(), "CLICK_SHARE_FLOAT_OPEN");
			$restaurant_share_button.addClass(on_class);
			$restaurant_share_button.find(active_btn_class).addClass(on_class);
		}

		function off(){
			$restaurant_share_button.removeClass(on_class);
			$restaurant_share_button.find(active_btn_class).removeClass(on_class);
		}

		$restaurant_share_button.on("mouseenter", function(){
			if(!is_on){
				on();
				is_on = true;
			}
		});

		$restaurant_share_button.find(".toggle_btn").on("click", function(){
			if(is_on){
				common_ga(get_now_page_code(), "CLICK_SHARE_FLOAT_CLOSE");
				off();
				is_on = false;
			} else {
				on();
				is_on = true;
			}
		});

		$restaurant_share_button.next(".black_screen").on("click", function(){
			common_ga(get_now_page_code(), "CLICK_SHARE_FLOAT_CLOSE_OUTSIDE");
			off();
			is_on = false;
		});
	});
})();
(function () {
  var CLASS_NAMES_BY_STATE = {
    SHOW: 'connect-mp-app--Show'
  };

  function MobileAppDownloadLayerView() {
    this._$mobileAppDownloadLayer = $('.connect-mp-app');
    this._$closeButton = this._$mobileAppDownloadLayer.find('.btn.cancel');
    this._$blackDeem = this._$mobileAppDownloadLayer.next('.black_screen');
    this._$actionButton = this._$mobileAppDownloadLayer.find('.btn-shortcut-app');
    this._actionButtonCallback = null;

    this._bindEvent();
  }

  MobileAppDownloadLayerView.prototype = {
    _bindEvent: function () {
      this._$closeButton.on('click', this.hide.bind(this));
      this._$blackDeem.on('click', this.hide.bind(this));
      this._$actionButton.on('click', this._handleClickActionButton.bind(this));
    },

    _handleClickActionButton: function() {
      if (this._actionButtonCallback) {
        this._actionButtonCallback();
      } else {
        go_to_app_or_market();
      }
    },

    _setButtonMessage: function (buttonMessage) {
      this._$actionButton.html(buttonMessage);
    },

    show: function (buttonMessage, callback, actionButtonCallback) {
      this._setButtonMessage(buttonMessage);
      this._$mobileAppDownloadLayer.addClass(CLASS_NAMES_BY_STATE.SHOW);
      this._$blackDeem.show();
      this._actionButtonCallback = actionButtonCallback;

      if (_.isFunction(callback)) {
        callback();
      }
    },

    hide: function (callback) {
      this._$mobileAppDownloadLayer.removeClass(CLASS_NAMES_BY_STATE.SHOW);
      this._$blackDeem.hide();
      this._setButtonMessage('');
      this._actionButtonCallback = null;

      if (_.isFunction(callback)) {
        callback();
      }
    }
  };

  window.mp20.view['MobileAppDownloadLayerView'] = MobileAppDownloadLayerView;
})();
(function () {
  var EAT_DEAL_DISCOUNT_TYPE = window.mp20.constants.EAT_DEAL_DISCOUNT_TYPE;
  var EAT_DEAL_STATUS = window.mp20.constants.EAT_DEAL_STATUS;

  function EatDealVO(data) {
    this._eatDealId = data['eat_deal_id'];
    this._restaurantName = data['title'];
    this._title = data['description'];
    this._description = data['detail'];
    this._pictureURL = data['picture_url'];
    this._badgePictureUrl = data['badge_picture_url'];
    this._canUseImmediately = data['can_use_immediately'];
    this._discountRate = data['discount_rate'];
    this._displayOrder = data['display_order'];
    this._maxSalesCount = data['max_sales_count'];
    this._originalPrice = data['original_price'];
    this._salesPrice = data['sales_price'];
    this._discountPrice = data['discount_price'];
    this._usageEndDate = data['usage_end_date'];
    this._usageStartDate = data['usage_start_date'];
    this._availableSalesCount = data['available_sales_count'];
    this._showAvailableSalesCount = data['show_available_sales_count'];
    this._restaurantUUID = data['restaurant_uuid'];
    this._restaurantKey = data['restaurant_key'];
    this._pictures = data['pictures'];
    this._individualAvailableSalesCount = data['individual_available_sales_count'];
    this._sections = data['sections'];
    this._isRestockSubscriptionRegistered = data['is_restock_subscription_registered'];
    this._status = data['status'];
    this._visa_premium_validation_enabled = data['visa_premium_validation_enabled'];
    this._is_holic_only = data['is_holic_only'];
  };

  EatDealVO.prototype = {
    getEatDealId: function () {
      return this._eatDealId;
    },

    getRestaurantName: function () {
      return this._restaurantName;
    },

    getTitle: function () {
      return this._title;
    },

    getDescription: function () {
      return this._description || '';
    },

    getDescriptionHTML: function (lineBreakString) {
      return this.getDescription()
        .replace(/(?:\r\n|\r|\n)/g, lineBreakString);
    },

    getDescriptionHTMLLimitLine: function (lineBreakString, lineCount) {
      return this.getDescriptionHTML(lineBreakString).split(lineBreakString, lineCount).join(lineBreakString)
    },

    getPictureURL: function () {
      return this._pictureURL;
    },

    getBadgePictureUrl: function () {
      return this._badgePictureUrl;
    },

    getCanUseImmediately: function () {
      return this._canUseImmediately;
    },

    getDiscountRate: function () {
      return this._discountRate;
    },

    getDisplayOrder: function () {
      return this._displayOrder;
    },

    getMaxSalesCount: function () {
      return this._maxSalesCount;
    },

    getOriginalPrice: function () {
      return this._originalPrice;
    },

    getSalesPrice: function () {
      return this._salesPrice;
    },

    getDiscountPrice: function () {
      return this._discountPrice;
    },

    getUsageEndDate: function () {
      return this._usageEndDate;
    },

    getUsageExpirationDays: function () {
      return this._usageExpirationDays;
    },

    getUsagePeriodType: function () {
      return this._usagePeriodType;
    },

    getUsageStartDate: function () {
      return this._usageStartDate;
    },

    getAvailableSalesCount: function () {
      return this._availableSalesCount;
    },

    getShowAvailableSalesCount: function () {
      return this._showAvailableSalesCount;
    },

    getRestaurantUUID: function () {
      return this._restaurantUUID;
    },

    getRestaurantKey: function() {
      return this._restaurantKey;
    },

    getPictures: function () {
      return this._pictures;
    },

    getIndividualAvailableSalesCount: function () {
      return this._individualAvailableSalesCount;
    },

    getSections: function () {
      return this._sections;
    },

    getIsRestockSubscriptionRegistered: function() {
      return this._isRestockSubscriptionRegistered;
    },

    getStatus: function () {
      return this._status;
    },

    getVisaPremiumValidationEnabled: function () {
      return this._visa_premium_validation_enabled
    },

    getIsHolicOnly: function () {
      return this._is_holic_only
    },

    getDiscountType: function () {
      var discountPrice = this.getDiscountPrice();

      if (discountPrice <= 0) {
        return EAT_DEAL_DISCOUNT_TYPE.NONE;
      }

      var discountRate = this.getDiscountRate();
      if (discountRate && discountRate > 0) {
        return EAT_DEAL_DISCOUNT_TYPE.RATE;
      }

      if (discountPrice > 0) {
        return EAT_DEAL_DISCOUNT_TYPE.PRICE;
      }
    },

    isSoldOut: function () {
      return this.getStatus() === EAT_DEAL_STATUS.OUT_OF_ORDER;
    },

    isSalesEnd: function () {
      return this.getStatus() === EAT_DEAL_STATUS.SALES_END;
    },

    isExceededIndividualHoldCount: function () {
      return this.getStatus() === EAT_DEAL_STATUS.EXCEEDED_INDIVIDUAL_HOLD_COUNT;
    }
  };

  EatDealVO.EAT_DEAL_DISCOUNT_TYPE = EAT_DEAL_DISCOUNT_TYPE;
  EatDealVO.EAT_DEAL_STATUS = EAT_DEAL_STATUS;

  window.mp20.vo['EatDealVO'] = EatDealVO;
})();
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//




















































