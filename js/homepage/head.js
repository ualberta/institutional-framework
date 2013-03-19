// Start web optimizer code
var _vwo_code=(function(){
var account_id=36096,
settings_tolerance=2000,
library_tolerance=1500,
use_existing_jquery=false,
// DO NOT EDIT BELOW THIS LINE
f=false,d=document;return{use_existing_jquery:function(){return use_existing_jquery;},library_tolerance:function(){return library_tolerance;},finish:function(){if(!f){f=true;var a=d.getElementById('_vis_opt_path_hides');if(a)a.parentNode.removeChild(a);}},finished:function(){return f;},load:function(a){var b=d.createElement('script');b.src=a;b.type='text/javascript';b.innerText;b.onerror=function(){_vwo_code.finish();};d.getElementsByTagName('head')[0].appendChild(b);},init:function(){settings_timer=setTimeout('_vwo_code.finish()',settings_tolerance);this.load('//dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&r='+Math.random());var a=d.createElement('style'),b='body{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}',h=d.getElementsByTagName('head')[0];a.setAttribute('id','_vis_opt_path_hides');a.setAttribute('type','text/css');if(a.styleSheet)a.styleSheet.cssText=b;else a.appendChild(d.createTextNode(b));h.appendChild(a);return settings_timer;}};}());_vwo_settings_timer=_vwo_code.init();
// End web optimizer code

// Begin Kiss Metrics code
var _kmq = _kmq || [];
var _kmk = _kmk || '7144689afbf119479885dce1508584f0d51ffd59';
function _kms(u){
setTimeout(function(){
var d = document, f = d.getElementsByTagName('script')[0],
s = d.createElement('script');
s.type = 'text/javascript'; s.async = true; s.src = u;
f.parentNode.insertBefore(s, f);
}, 1);
}
_kms('//i.kissmetrics.com/i.js');
_kms('//doug1izaerwt3.cloudfront.net/' + _kmk + '.1.js');
// End Kiss Metrics code

// Begin Google Analytics code
var _gaq = _gaq || [];
_gaq.push(['default._setAccount', 'UA-341735-1']);
_gaq.push(['default._setDomainName', '.ualberta.ca']);
_gaq.push(['default._setAllowLinker', true]);
_gaq.push(['default._setAllowAnchor', true]);
_gaq.push(['default._setSiteSpeedSampleRate', 100]);
_gaq.push(['default._trackPageview']);
_gaq.push(['rollup._require', 'inpage_linkid', '//www.google-analytics.com/plugins/ga/inpage_linkid.js']);
_gaq.push(['rollup._setAccount', 'UA-12324208-1']);
_gaq.push(['rollup._setDomainName', '.ualberta.ca']);
_gaq.push(['rollup._setAllowLinker', true]);
_gaq.push(['rollup._setAllowAnchor', true]);
_gaq.push(['rollup._setSiteSpeedSampleRate', 100]);
_gaq.push(['rollup._trackPageview']);
_gaq.push(['timing._setAccount', 'UA-12324208-6']);
_gaq.push(['timing._setDomainName', '.ualberta.ca']);
_gaq.push(['timing._setAllowLinker', true]);
_gaq.push(['timing._setAllowAnchor', true]);
_gaq.push(['timing._setSiteSpeedSampleRate', 100]);
_gaq.push(['timing._trackPageview', location.pathname + '?load=start']);
(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
// End Google Analytics code