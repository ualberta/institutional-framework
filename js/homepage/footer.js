	var UAlberta = UAlberta || {};
	UAlberta.Sitecore = UAlberta.Sitecore || {};
	
	UAlberta.Sitecore.GlobalSearch = (function ($) {
	
	    function KeyValue(key, value) {
	        this.key = key;
	        this.value = value;
	    }
	
	    function search(options) {
	
	        options.query = escape(jQuery(options.selector).val());
	
	        var params = [];
	        params.push(new KeyValue("cx", options.googleId));
	        params.push(new KeyValue("q", options.query));
	        params.push(new KeyValue("cof", "FORID%3A11#1150"));
	
	        var resultUrl = options.resultUrl;
	
	        for (var ndx in params) {
	            var param = params[ndx];
	            if (param && param.key && param.value) {
	                resultUrl = updateQueryString(param.key, param.value, resultUrl);
	            }
	        }
	
	        window.location.href = resultUrl;
	        return false;
	
	    };
	
	    function updateQueryString(key, value, url) {
	        if (!url) url = window.location.href;
	        var re = new RegExp("([?|&])" + key + "=.*?(&|#|$)", "gi");
	
	        if (url.match(re)) {
	            if (value) return url.replace(re, '$1' + key + "=" + value + '$2');
	            else return url.replace(re, '$2');
	        } else {
	            if (value) {
	                var separator = url.indexOf('?') !== -1 ? '&' : '?',
	                    hash = url.split('#');
	                url = hash[0] + separator + key + '=' + value;
	                if (hash[1]) url += '#' + hash[1];
	                return url;
	            } else return url;
	        }
	    }
	
	    function init(customOptions) {
	        var options = {};
	        options.selector = '.search-query';
	        options.btnSelector = '.global-search-btn';
	        options.googleId = '';
	        options.query = '';
	        options.resultUrl = '';
	
	        //override defaults.
	        options = $.extend({}, options, customOptions);
	
	
	        if (!options.resultUrl || !options.selector || !options.googleId) {
	            //if missing a required value, dont attach handler.
	            return;
	        }
	
	        $(options.selector).keydown(function (a) {
	            if (a.keyCode == 13 || window.event.keyCode == 13 || a.which == 13) {
	                a.preventDefault();
	                return search(options);
	            }
	
	        });
	
	        $(options.btnSelector).click(function (a) {
	            a.preventDefault();
	            return search(options);
	        });
	
	    }
	
	    return {
	        init: init
	    }
    })(jQuery);
  
    (function($) {
      $(document).ready(function() {
    
      // collapser
      $('.collapse').collapse();
      
      
      $("#explore-bar").flexslider({
      	animation: "slide",
        itemWidth: 93,
        minItems: 3,
        maxItems: 7,
        itemMargin: 0,
        controlNav: false,
        slideshow: false,
        animationLoop: true,
        prevText: "",
        nextText: "",
        touch: true
      });
      
      $("#fma-carousel").flexslider();
      
           
      $(".twitter-feed").tweet({
        count: 3,
        username: "UAlberta",
        loading_text: "loading",
        template: "{text} {time}<br/>{reply_action} {retweet_action} {favorite_action}"
      });
      
      // Fetch News
      // --------------------
      var newsEl = $('#news').find('.data-list');
      
      $.getJSON('//www.news.ualberta.ca/Services/NewsService.svc/headlines?format=json&callback=?',
          function(data) {
              newsEl.removeClass('loading');
              for(var i=0; i < data.length; i++)
              {
                  newsEl.append('<li class="news-row"><div class="news-description"><h4><a href="'+data[i].link+'">'+data[i].title+'</a></h4><p class="news-teaser">'+data[i].description+'</p></div></li>');
              }
              newsEl.append('<li class="news-row bottom-row"><a href="http://news.ualberta.ca/">Read more news</a></li>');
          }
      );
      
			// Fetch Notices
			// --------------------
			var noticeEl = $('#notice-list');
			
			noticeEl.load('/~publicas/uofa/notices.html', function() {
				noticeEl.removeClass('loading');
			});
      
      // Colloquy Blog
      // --------------------
      (function($){$.extend({jGFeed:function(url,fnk,num,key){if(url==null){return false;}var gurl="http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q="+url;if(num!=null){gurl+="&num="+num;}if(key!=null){gurl+="&key="+key;}$.getJSON(gurl,function(data){if(typeof fnk=="function"){fnk.call(this,data.responseData.feed);}else{return false;}});}});})(jQuery);
      
      var blogEl = $('#colloquy-blog').find('.data-list');
      
      $.jGFeed('http://www.ualbertablog.ca/feeds/posts/default?alt=rss',
        function(feeds){
          blogEl.removeClass('loading');
          if(!feeds){
            blogEl.append('<li>Error retrieving blog feed.</li>');
            return false;
          }

          for(var i=0; i<feeds.entries.length; i++) {
            var entry = feeds.entries[i];
            blogEl.append('<li><a href="'+entry.link+'">'+entry.title+'</a></li>');
          }
          blogEl.append('<li class="bottom-row"><a href="http://www.ualbertablog.ca/">Read the Colloquy Blog</a></li>');
          
       }, 5);
      
			// Video Modal
			// -------------------
			$(document).on("click", ".video-modal-link", function () {
			  var videoSrc = $(this).attr('href');
			  // no modal for mobile
			  if($(window).width() < 500) {
			    window.location = videoSrc;
			  }
			  $('#videoModal iframe').attr('src', videoSrc);
			  $('#videoModal .modal-header h3').text($(this).data('title'));
			});
			
			$('#videoModal').bind('hidden', function () {
			  $('#videoModal iframe').attr('src', '');
			});
			
			var options ={};
			options.selector = '.search-query'; 
			options.googleId = '006931257102525869171:dkneho8bkag'; 
			options.resultUrl = 'http://www.uofa.ualberta.ca/searchresults.aspx';
			options.btnSelector = '.global-search-btn';
			UAlberta.Sitecore.GlobalSearch.init(options);
			
			});
    })(jQuery);
    
    // Download, e-mail address, and external link tracking.
    $("a").click(function() {
    	var strAnchorHref = this.href;
        
    	if ((strAnchorHref != undefined) && (strAnchorHref != null) && (strAnchorHref != "")) {
            // Track downloads.
            var strExtension = strAnchorHref.substr((strAnchorHref.lastIndexOf('.') + 1));
            switch(strExtension) {
    			case 'doc':
    			case 'docx':
    			case 'docm':
    			case 'dot':
    			case 'dotx':
    			case 'dotm':
    			case 'xps':
    			case 'rtf':
    			case 'txt':
    			case 'xls':
    			case 'xlsx':
    			case 'xlsm':
    			case 'xlt':
    			case 'xltx':
    			case 'xltm':
    			case 'csv':
    			case 'ppt':
    			case 'pptx':
    			case 'pptm':
    			case 'pot':
    			case 'potx':
    			case 'potm':
    			case 'pdf':
    			case 'zip':
    				_gaq.push(['default._trackEvent', 'downloads', strAnchorHref, location.href, 0, false]);
    				_gaq.push(['rollup._trackEvent', 'downloads', strAnchorHref, location.href, 0, false]);
    				break;
    			default:
    				// Track e-mail address and external link clicks.
    				var intMailto = strAnchorHref.indexOf("mailto:");
    				var intExternalLink = strAnchorHref.indexOf('ualberta.ca');
    				var intJavascriptLink = strAnchorHref.indexOf('javascript');
    				
    				if (intMailto >= 0) {
    					_gaq.push(['default._trackEvent', 'e-mail clicks', strAnchorHref.substring(7), location.href, 0, false]);
    					_gaq.push(['rollup._trackEvent', 'e-mail clicks', strAnchorHref.substring(7), location.href, 0, false]);
    				}			
    				else if ((intExternalLink == -1) && (intJavascriptLink == -1)) {
    					_gaq.push(['default._trackEvent', 'external link clicks', strAnchorHref, location.href, 0, false]);
    					_gaq.push(['rollup._trackEvent', 'external link clicks', strAnchorHref, location.href, 0, false]);
    				}
    				break;
            }
        }
    });
    
    // The next four functions extract a utm cookie string and other information that is set by Google Analytics.  They were originally written by the Google Analytics team in urchin.js.
    // This function extracts the appropriate utm cookie string from a cookie.
    function uds_get_utm_value(l,n,s) {
    	if (!l || l=="" || !n || n=="" || !s || s=="") return "-";
    	var i, j, k, utm="-";
    	i=l.indexOf(n);
    	k=n.indexOf("=")+1;
    	
    	if (i > -1) {
    		j=l.indexOf(s,i);
    		if (j < 0) {
    			 j=l.length;
    			 }
    		utm=l.substring((i+k),j);
    		 }
    	return utm;
    }
    
    // This function extracts the "visit count" value from the _utma cookie.
    function uds_get_visit_count(utma) {
    	var i, vc='-';
    	
    	if (utma != '-') {
    		i = utma.lastIndexOf(".");
    		i++;
    		vc = utma.substring(i);
    	}
    	
    	return vc;
    }
    
    // This function extracts the "pageview count" value from the _utmb cookie.
    function uds_get_pageview_count(utmb,utmc) {
    	var i, j, pc='-'; 
    	
    	if (utmb != '-' && utmc != '-'){
    		utmc=utmc+'.';
    		i=utmc.length;
    		j=utmb.indexOf(".", i);
    		pc=utmb.substring(i,j);
    	}
    	
    	return pc;
    }
    
    // This function parses the utmz cookie for attribution information.
    function uds_uGC(l,n,s) {
    	if (!l || l=="" || !n || n=="" || !s || s=="")
    		return "-";
    		
    	var i,i2,i3,c="-";
    	i=l.indexOf(n);
    	i3=n.indexOf("=")+1;
    	
    	if (i > -1) {
    		i2=l.indexOf(s,i); if (i2 < 0) { i2=l.length; }
    		c=l.substring((i+i3),i2);
    	}
    	
    	return c;
    }
    
    // parseUri 1.2.2
    // (c) Steven Levithan <stevenlevithan.com>
    // MIT License
    function uds_parseUri (str) {
    	var	o   = uds_parseUri.options,
    		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
    		uri = {},
    		i   = 14;
    
    	while (i--) uri[o.key[i]] = m[i] || "";
    
    	uri[o.q.name] = {};
    	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    		if ($1) uri[o.q.name][$1] = $2;
    	});
    
    	return uri;
    };
    uds_parseUri.options = {
    	strictMode: false,
    	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
    	q:   {
    		name:   "queryKey",
    		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    	},
    	parser: {
    		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    	}
    };
    
    // Not every browsers has an indexOf prototype function for arrays.
    // Source: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
            "use strict";
            if (this == null) {
                throw new TypeError();
            }
            var t = Object(this);
            var len = t.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = 0;
            if (arguments.length > 0) {
                n = Number(arguments[1]);
                if (n != n) { // shortcut for verifying if it's NaN
                    n = 0;
                } else if (n != 0 && n != Infinity && n != -Infinity) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            if (n >= len) {
                return -1;
            }
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
            for (; k < len; k++) {
                if (k in t && t[k] === searchElement) {
                    return k;
                }
            }
            return -1;
        }
    }
    
    // The next two cookie functions are borrowed from http://www.w3schools.com/js/js_cookies.asp.
    function uds_getCookie(c_name) {
    	var i,x,y,ARRcookies=document.cookie.split(";");
    	
    	for (i=0;i<ARRcookies.length;i++) {
    		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    		x=x.replace(/^\s+|\s+$/g,"");
    		
    		if (x==c_name) {
    			return unescape(y);
    		}
    	}
    }
    
    function uds_setCookie(c_name,value,exdays) {
    	var exdate=new Date();
    	exdate.setDate(exdate.getDate() + exdays);
    	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString())+"; domain=.ualberta.ca; path=/";
    	document.cookie = c_name + "=" + c_value;
    }
    
    // Check to see if two sites are the same.
    function uds_sameSites(strFirstSite, strSecondSite) {
    	var boolSameSite = false;
    		
    	if (strFirstSite == strSecondSite) {
    		boolSameSite = true;
    	}
    	else {
    		if ((strFirstSite.substring(0,3) == "www") && (strSecondSite.substring(0,3) != "www")) {
    			if (strFirstSite.substring(4, strFirstSite.length) == strSecondSite) {
    				boolSameSite = true;
    			}
    		}
    		else if ((strFirstSite.substring(0,3) != "www") && (strSecondSite.substring(0,3) == "www")) {
    			if (strFirstSite == strSecondSite.substring(4, location.hostname.length)) {
    				boolSameSite = true;
    			}
    		}
    	}
    	
    	return boolSameSite;
    };
    
    // This function removes any UTM tracking parameters after the # in the URL.  UTM tracking parameters can be part of campaign tagging or cross-domain linking.
    function uds_cleanHashParameters() {
    	var strHashParameters = location.hash;
    
    	// Test to see if there is a # in the URL.	
    	if ((strHashParameters != null) && (strHashParameters != undefined) && (strHashParameters != "") && (strHashParameters.indexOf("#") != -1)) {
    		// Remove the # from the variable.
    		strHashParameters = strHashParameters.substring(1,strHashParameters.length);
    		
    		// Hash parameters are broken into an array.
    		var strHashParametersArray = strHashParameters.split("&");
    		
    		// Loop through the array and don't add utm parameters to the new hash string.
    		var strNewHash = "#";
    		for (i=0; i < strHashParametersArray.length; i++) {
    			if ((strHashParametersArray[i].substring(0,3) != "utm") && (strHashParametersArray[i].substring(0,5) != "__utm")) {
    				if (strNewHash == "#")
    					strNewHash += strHashParametersArray[i];
    				else
    					strNewHash += "&" + strHashParametersArray[i];
    			}
    		}
    		
    		// Replace the current location hash with the newly generated one.
    		location.hash = strNewHash;
    	}
    }
    
    // This function sets GA custom variable 1, 2, 3, and 4 to contain marketing and attribution information.
    function uds_setCustomVariables() {
    	// Access the Google Analytics tracker by older synchronous syntax in order to retrieve and set the custom variables.
    	var pageTracker = _gat._getTrackerByName('default');
    
    	// Stores the default visitor state in an empty custom variable 1.
    	var strCustomVariable1 = pageTracker._getVisitorCustomVar(1);
    	
    	if ((strCustomVariable1 == null) || (strCustomVariable1 == undefined) || (strCustomVariable1 == "")) {	
    		_gaq.push(['default._setCustomVar', 1, 'visitor type', 'visitor', 1]);
    		_gaq.push(['default._trackEvent', 'custom variables', 'custom variable 1', 'visitor', 0, true]);
    		_gaq.push(['rollup._trackEvent', 'custom variables', 'custom variable 1', 'visitor', 0, true]);
    		_kmq.push(['set', {'Visitor type':'visitor'}]);
    	}
    	
    	// Retrieves utma, utmb, utmc, the visit count, and the pageview count.
    	// var strUtma = uds_get_utm_value(document.cookie, '__utma=', ';');
    	// var strUtmb = uds_get_utm_value(document.cookie, '__utmb=', ';');
    	// var strUtmc = uds_get_utm_value(document.cookie, '__utmc=', ';');
    	// var intVisitCount = uds_get_visit_count(strUtma);
    	// var intPageviewCount = uds_get_pageview_count(strUtmb, strUtmc);
    	
    	// Separates the campaign-tracking cookie and populates a variable with each piece of campaign info. 
    	var strUtmz = uds_uGC(document.cookie, '__utmz=', ';');
    	var strSource  = uds_uGC(strUtmz, 'utmcsr=', '|');
    	var strMedium  = uds_uGC(strUtmz, 'utmcmd=', '|');
    	var strTerm    = uds_uGC(strUtmz, 'utmctr=', '|');
    	var strCampaign = uds_uGC(strUtmz, 'utmccn=', '|');
    	var strContent = uds_uGC(strUtmz, 'utmcct=', '|');
    	var gclid   = uds_uGC(strUtmz, 'utmgclid=', '|');
    	var strAttributionString = "";
    
    	// Adwords visits with autotagging need manual attribution.
    	if (gclid != "-") { 
    		strSource = 'google';
    		strMedium = 'cpc';
    	}
    	
    	// Stores the first known non-paid visit attribution in custom variable 2.
    	if ((strMedium != "cpc") && (strMedium != "(none)")) {
    		var strCustomVariable2 = pageTracker._getVisitorCustomVar(2);
    		
    		if ((strCustomVariable2 == null) || (strCustomVariable2 == undefined) || (strCustomVariable2 == "")) {
    			strAttributionString = unescape("source = " + strSource + ", medium = " + strMedium + ", term = " + strTerm + ", campaign = " + strCampaign + ", content = " + strContent);
    			_gaq.push(['default._setCustomVar', 2, 'first non-paid visit', strAttributionString, 1]);
    			_gaq.push(['default._trackEvent', 'custom variables', 'custom variable 2', strAttributionString, 0, true]);
    			_gaq.push(['rollup._trackEvent', 'custom variables', 'custom variable 2', strAttributionString, 0, true]);
    			_kmq.push(['set', {'First non-paid visit':strAttributionString}]);
    		}
    	}
    	
    	// Stores the first known paid visit attribution in custom variable 3.
    	else if (strMedium == "cpc") {
    		var strCustomVariable3 = pageTracker._getVisitorCustomVar(3);
    		
    		if ((strCustomVariable3 == null) || (strCustomVariable3 == undefined) || (strCustomVariable3 == "")) {	
    			strAttributionString = unescape("source = " + strSource + ", medium = cpc, term = " + strTerm + ", campaign = " + strCampaign + ", content = " + strContent);
    			_gaq.push(['default._setCustomVar', 3, 'first paid visit', strAttributionString, 1]);
    			_gaq.push(['default._trackEvent', 'custom variables', 'custom variable 3', strAttributionString, 0, true]);
    			_gaq.push(['rollup._trackEvent', 'custom variables', 'custom variable 3', strAttributionString, 0, true]);
    			_kmq.push(['set', {'First paid visit':strAttributionString}]);
    		}
    	}
    	
    	// Stores the last known internal ualberta.ca referral in custom variable 4.
    	var strReferrerHostname = uds_parseUri(document.referrer).host;
    	var strIgnoredReferrerArray = ["www.gandalf.ualberta.ca", "gandalf.ualberta.ca"];
    	
    	if ((strReferrerHostname != null) && (strReferrerHostname != undefined) && (strReferrerHostname != "") && (strIgnoredReferrerArray.indexOf(strReferrerHostname) == -1) && (strReferrerHostname.indexOf("ualberta.ca") >= 0)) {
    		// Check to make sure the same site, with or without www, does not become the last known internal referral.
    		var boolSameSite = uds_sameSites(strReferrerHostname, location.hostname);
    		
    		// If all the checks passed, go ahead and set custom variable 4.
    		if (boolSameSite == false) {
    			_gaq.push(['default._setCustomVar', 4, 'last internal referral', strReferrerHostname, 1]);
    			_gaq.push(['default._trackEvent', 'custom variables', 'custom variable 4', strReferrerHostname, 0, true]);
    			_gaq.push(['rollup._trackEvent', 'custom variables', 'custom variable 4', strReferrerHostname, 0, true]);
    			_kmq.push(['set', {'Last internal referral':strReferrerHostname}]);
    		}
    	}
    }
    
    // Add current site to UofAsites cookie.
    var uds_strSitesArray = [];
    var uds_strSitesArrayReversed = [];
    
    function uds_setSitesCookie() {
    	var boolSameSite = false;
    	
    	// Retrieve cookie and store in array.
    	var strSitesCookie = uds_getCookie("UofAsites");
    
    	if ((strSitesCookie != null) && (strSitesCookie != undefined) && (strSitesCookie != "")) {
    		uds_strSitesArray = strSitesCookie.split(',');
    	}
    	
    	// Check to make sure the same site as the previous page, with or without www, does not get set to the UofAsites cookie.
    	if (uds_strSitesArray.length > 0) {
    		boolSameSite = uds_sameSites(uds_strSitesArray[uds_strSitesArray.length - 1], location.hostname);
    	}
    	
    	// If all the checks passed, update the sites array.
    	if (boolSameSite == false) {
    		uds_strSitesArray.push(location.hostname);
    		_gaq.push(['rollup._trackEvent', 'visit site flow', location.hostname, '', 0, true]);
    		
    		// Sites array is arbitrarily capped at 10.
    		while (uds_strSitesArray.length >= 10) {
    			uds_strSitesArray.splice(0,1);	
    		}
    		
    		// Write cookie.
    		uds_setCookie("UofAsites", uds_strSitesArray, 365);
    	}
    	
    	uds_strSitesArrayReversed = uds_strSitesArray.slice(0).reverse();
    }
    
    // Add a unique id to every link that does not have one.
    function uds_allLinksID() {
    	// Get an array of all anchor elements.
    	var allLinksArray = document.getElementsByTagName("a");
    	
    	if ((allLinksArray != null) && (allLinksArray != undefined) && (allLinksArray != "")) {
    		// Loop through the elements and conditionally add an id.
    		for (var i = 0; i < allLinksArray.length; i++) {
    			if ((allLinksArray[i].id == null) || (allLinksArray[i].id == undefined) || (allLinksArray[i].id == "")) {		
    				// Common link attributes: class, name, title, and rel.
    				var linkClass = allLinksArray[i].getAttribute("class");
    				var linkName = allLinksArray[i].name;
    				var linkTitle = allLinksArray[i].title;
    				var linkRel = allLinksArray[i].rel;
    				
    				if ((linkClass != null) && (linkClass != undefined) && (linkClass != "")) {
    					allLinksArray[i].id = linkClass + "_" + i;
    				}
    				else if ((linkName != null) && (linkName != undefined) && (linkName != "")) {
    					allLinksArray[i].id = linkName + "_" + i;
    				}
    				else if ((linkTitle != null) && (linkTitle != undefined) && (linkTitle != "")) {
    					allLinksArray[i].id = linkTitle + "_" + i;
    				}
    				else if ((linkRel != null) && (linkRel != undefined) && (linkRel != "")) {
    					allLinksArray[i].id = linkRel + "_" + i;
    				}
    				// If nothing else, we create a unique id from the href and the counter.
    				else {
    					allLinksArray[i].id = allLinksArray[i].href + "_" + i;
    				}
    			}
    		}
    	}
    }
    
    // Sends all visited sites to Google Analytics and Kiss Metrics.
    function uds_sendSites() {
    	if (uds_strSitesArrayReversed.length > 0) {
    		var strSite = uds_strSitesArrayReversed.pop();
    		_gaq.push(['rollup._trackEvent', 'visitor goal flow', strSite, '', 0, true]);
    		setTimeout("uds_sendSites()", 100);
    	}
    	else {
    		_gaq.push(['rollup._trackEvent', 'visitor goal flow', 'application complete', '', 0, true]);
    		_kmq.push(['record', 'Application complete']);
    		_kmq.push(['set', {'Visitor site flow':uds_strSitesArray}]);
    	}
    }
    
    // Begin custom code
    _gaq.push(uds_cleanHashParameters);
    _gaq.push(uds_setCustomVariables);
    _gaq.push(uds_setSitesCookie);
    // _gaq.push(uds_allLinksID);
    // End custom code

    // Begin Crazy Egg code
    setTimeout(function(){var a=document.createElement("script");
    var b=document.getElementsByTagName("script")[0];
    a.src=document.location.protocol+"//dnn506yrbagrg.cloudfront.net/pages/scripts/0012/7135.js?"+Math.floor(new Date().getTime()/3600000);
    a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b)}, 1);
    // End Crazy Egg code

    window.onload = function() {
    	var _uofafinishedtimestamp = (new Date()).getTime();
    	var _uofaloadtime = _uofafinishedtimestamp - _uofapreloadtimestamp;
    	_gaq.push(['timing._trackPageview', location.pathname + '?load=end']);
    	_gaq.push(['timing._trackEvent', 'page loaded', location.href, '', _uofaloadtime, true]);
    };
    
    // JavaScript Document
    // click tracking
    // record the click
    function clickTrack(c) {
    	var fullPath = "/click/" + c;
    	// check for items that will be flagged as internal
    	// 3 items will flag internal: Apps, Bear Tracks, eClass
    	var internal = new RegExp("(/click/blade/Apps@UAlberta|/click/blade/eClass|/click/blade/Bear Tracks)");
    	if (internal.test(fullPath) == true) {
    		_gaq.push(
    		['rollup._setCustomVar',1,'visitor type','internal',1],
    		['rollup._trackEvent','Click','Internal',fullPath,0,true]);
    		//alert ('Flag internal');
    	}
    	//alert (fullPath);
    	_gaq.push(
    	['default._trackPageview',fullPath]);
    }
    //blade
    $('.ga_ualberta_blade a').click(function() {
    	var c = "blade/" + $(this).text();
    	clickTrack(c);
    });
    
    $('.ga_ualberta_masthead ul li a').click(function() {
    	var c = "Audience/" + $(this).text();
    	clickTrack(c);
    });
    
    $('.ga_ualberta_main-nav a').click(function() {
    	var c = "MainNav/" + $(this).text();
    	clickTrack(c);
    });
    
    $('.ga_ualberta_fma a').click(function() {
    	var c = "Feature/" + $(this).attr("href");
    	clickTrack(c);
    });
    
    $('a .ga_ualberta_fma_next').click(function() {
    	alert('Feature Next');
    });
    
    $('a .ga_ualberta_fma_prev').click(function() {
    	alert('Feature Previous');
    });
    
    $('.ga_ualberta_why-ualberta a').click(function() {
    	var whyText = $(this).text();
    	if (whyText.length > 1) {
    		var whyClick = $(this).text();
    	} else {
    		var whyClick = $(this).attr("href");
    	}
    	var c = "WhyUAlberta/" + whyClick;
    	clickTrack(c);
    });
    
    $('.ga_ualberta_news a').click(function() {
    	var c = "News/" + $(this).text();
    	clickTrack(c);
    });
    
    $('.ga_ualberta_campus-notices a').click(function() {
    	var c = "Notices/" + $(this).text();
    	clickTrack(c);
    });
    
    $('.ga_ualberta_colloquy-blog a').click(function() {
    	var c = "Blog/" + $(this).text();
    	clickTrack(c);
    });
    
    $('.ga_ualberta_keep-in-touch a').click(function() {
    	var c = "KeepInTouch/" + $(this).attr("href");
    	clickTrack(c);
    });
    
    $('.ga_ualberta_explore a').click(function() {
    	var c = "Explore/" + $(this).text();
    	clickTrack(c);
    });
    
    $('.ga_ualberta_footer a').click(function() {
    	var c = "Footer/" + $(this).text();
    	clickTrack(c);
    });
    
    //scroll tracking
    var IsDuplicateScrollEvent = 0;
     
            $(document).ready(function () {
                SetupGoogleAnalyticsTrackEvents();
            });
     
            function SetupGoogleAnalyticsTrackEvents()
            {
                TrackEventsForMinimumPageScroll();
            }
     
            function TrackEventsForMinimumPageScroll()
            {
               $(window).scroll(function(){
                 var scrollPercent = GetScrollPercent();
                
                 if(scrollPercent > 90)
                 {
                   if(IsDuplicateScrollEvent == 0)
                   { 
                     IsDuplicateScrollEvent = 1;
                    //alert("Page Scrolled to 90% in " + document.location.href);
                     TrackEvent("Content Engagement", "Scrolled To 90%", document.location.href);
                   }
                 }
               }); 
            }
     
            function GetScrollPercent()
            {
                 var bottom = $(window).height() + $(window).scrollTop();
                 var height = $(document).height();
     
                 return Math.round(100*bottom/height);
            }
                                     
            function TrackEvent(Category, Action, Label)
            {
               _gaq.push(
    			['default._trackEvent','Content','Scroll','UAlberta.ca 90%',0,false]
    			);
            }