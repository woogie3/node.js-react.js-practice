!function(){var t={iu:"https://certify.alexametrics.com/atrk.gif?",
ver:"20130128",
opts:{atrk_acct:"",domain:"",dynamic:!1},
opt_out_class:"__aoc",
opted_out:function(){return"true"===t.gbc(t.opt_out_class)},
opt_out_setup:function(){this.register_opt_out_listener(".__alx_opt_out_class",
function(n){"function"==typeof n.preventDefault&&n.preventDefault(),t.sbc(t.opt_out_class,"true",31536e4)}),
this.register_opt_out_listener(".__alx_opt_in_class",function(n){"function"==typeof n.preventDefault&&n.preventDefault(),t.sbc(t.opt_out_class,"true",1)})},
register_opt_out_listener:function(t,n){for(var e=document.querySelectorAll(t),r=0;
r<e.length;
r++){var o=e[r];
"function"==typeof o.addEventListener?o.addEventListener("click",n):"function"==typeof o.attachEvent&&o.attachEvent("onclick",n)}},
fired:function(){return void 0===window._atrk_fired&&(window._atrk_fired=!1), 
    window._atrk_fired},
    params:{frame_height:function(){return t.frame("innerHeight","clientHeight")},
    frame_width:function(){return t.frame("innerWidth","clientWidth")},
    iframe:function(){try{return window!=window.top?1:0}catch(t){return 0}},
    title:function(){return this.ue(document?document.title:"")},
    time:function(){var t=new Date;
return t.getTime()+"&time_zone_offset="+t.getTimezoneOffset()},
screen_params:function(){try{return screen.width+"x"+screen.height+"x"+screen.colorDepth}catch(t){}return""},
java_enabled:function(){return navigator&&void 0!==navigator.javaEnabled?navigator.javaEnabled()?"1":"0":""},
cookie_enabled:function(){return navigator&&void 0!==navigator.cookieEnabled?navigator.cookieEnabled?"1":"0":""},
ref_url:function(){return"string"==typeof document.referrer?t.ue(document.referrer):""},
host_url:function(){return"string"==typeof window.location.href?t.ue(window.location.href):""},
random_number:function(){return Math.round(21474836747*Math.random())},
sess_cookie:function(){return t.gc("__asc",t.user_cookie_v,"sess_cookie",1800)},
user_cookie:function(){return t.gc("__auc",t.user_cookie_v,"user_cookie",31622400)},
dynamic:function(){return this.opts.dynamic.toString()},
domain:function(){return"string"==typeof this.opts.domain?this.opts.domain:""},
account:function(){return"string"==typeof this.opts.atrk_acct?this.opts.atrk_acct:""},
jsv:function(){return this.ver},
user_lang:function(){return window.navigator.userLanguage||window.navigator.language}},
frame:function(t,n){if(void 0!==window[t])return window[t];
if(void 0!==window.document[n])return window.document[n];
try{return window.document.getElementsByTagName("body")[0][n]}catch(t){return"-"}},r:function(){return(65536*(1+Math.random())|0).toString(16).substring(1)},muc:function(){return this.r()+this.r()+(new Date).getTime().toString(16)+this.r()+this.r()},gc:function(t,n,e,r){var o="",i=0;
try{o=this.gbc(t)}catch(t){}return null!=o&&0!=o.length||(o=n,i=1),this.sbc(t,o,r),o+"&"+e+"_flag="+i},ue:function(t){try{return encodeURIComponent(t)}catch(n){return escape(t)}},gbc:function(t){var n,e=document.cookie,r=t+"=",o=e.indexOf(";"+r);
if(-1==o){if(0!=(o=e.indexOf(r)))return null}else o+=2;
return-1==(n=e.indexOf(";",o))&&(n=e.length),this.ue(e.substring(o+r.length,n))},sbc:function(t,n,e){var r=new Date,o=this.dom();
r.setTime(r.getTime()+1e3*e),document.cookie=t+"="+escape(n)+(e?"; expires="+r.toGMTString():"")+(o&&o.length>0?"; domain=."+o:"")+"; path=/"},dom:function(){if("string"==typeof this.opts.domain)return this.opts.domain;
var t=window.location.host;
return"www."==t.substr(0,4)?t.substr(4):t},gen_url:function(){try{var t=this;
return this.iu+this.map(this.params,function(n,e){return n+"="+e.call(t)}).join("&")}catch(t){return this.iu}},map:function(t,n){var e=[];
for(var r in t)t.hasOwnProperty(r)&&e.push(n.call(this,r,t[r]));
return e},cloudfront:{url:"http://cloudfront-labs.amazonaws.com/x.png",fire:function(){"http:"==location.protocol&&((new Image).src=t.cloudfront.url)}},user_cookie_v:"",fire:function(t){if(this.user_cookie_v=this.muc(),this.map(t,function(t,n){this.opts[t]=n}),this.opt_out_setup(),!this.opted_out()&&!this.fired()){window._atrk_fired=!0;
var n=new Image(1,1);
n.alt="alexametrics",n.src=this.gen_url(),this.cloudfront.fire()}}};
window.atrk=function(){t.fire(_atrk_opts)},"undefined"!=typeof _atrk_opts&&void 0!==_atrk_opts.dynamic&&_atrk_opts.dynamic&&atrk()}();
