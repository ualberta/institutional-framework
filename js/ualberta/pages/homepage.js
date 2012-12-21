(function($){$.extend({jGFeed:function(url,fnk,num,key){if(url==null){return false;}var gurl="http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q="+url;if(num!=null){gurl+="&num="+num;}if(key!=null){gurl+="&key="+key;}$.getJSON(gurl,function(data){if(typeof fnk=="function"){fnk.call(this,data.responseData.feed);}else{return false;}});}});})(jQuery);
/*
$.jGFeed('http://www.ualbertablog.ca/feeds/posts/default?alt=rss',
  function(feeds){
    // Check for errors
    if(!feeds){
      $('#colloquy-blog ol').append('<li>Error retrieving blog feed. <a href="http://www.ualbertablog.ca/">View Colloquy Blog</a></li>');
      return false;
    }
    // do whatever you want with feeds here
    for(var i=0; i<feeds.entries.length; i++){
      var entry = feeds.entries[i];
      // Entry title
      $('#colloquy-blog ol').append('<li><a href="'+entry.link+'">'+entry.title+'</a></li>');
    }
  }, 5);
*/
// Fetch News
// --------------------
var newsEl = $('#news').find('data-list');

$.getJSON('http://www.news.ualberta.ca/scripts/newsheadlines2.aspx?callback=?',
    function(data) {
        newsEl.removeClass('loading');
        for(var i=0; i < data.items.length; i++)
        {
            newsEl.append('<li class="news-row"><div class="news-description"><h4><a href="'+data.items[i].Link+'">'+data.items[i].Headline+'</a></h4><p class="news-teaser">'+data.items[i].Teaser+'</p></div></li>');
        }
        newsEl.append('<li class="news-row bottom-row"><a href="http://ualberta-beta.ualberta.ca/news.aspx">Read more news</a></li>');
    }
);