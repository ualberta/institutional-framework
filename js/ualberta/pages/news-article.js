$(document).ready(function() {

	// Check the image size, and float it if it's small
  var img = $(".image-caption-container:first img");
  if(img.length) {
	  $("<img/>") // Make in memory copy of image to avoid css issues
	      .attr("src", $(img).attr("src"))
	      .load(function() { 
	          if(this.width < 700) {
	            $('.frame').css({
	              'float':        'right',
	              'width':        '50%',
	              'margin-left':  '1em'
	            });
	          }
	      });
  }
  
  // Grab links from the article for related links
  var storyLinks = $('article .story p a');
  
  if(storyLinks.length) {
    storyLinks.each(function() {
      $('#related-links').append('<li><a href="'+$(this).attr('href')+'">'+$(this).html()+'</a></li>');
    });
  }
  
	// Fetch Top Stories
	// --------------------
	var newsEl = $('#top-stories');
	
	$.getJSON('/Services/NewsService.svc/headlines?format=json&callback=?',
	    function(data) {
	        newsEl.removeClass('loading');
	        for(var i=0; i < data.length; i++)
	        {
	            newsEl.append('<li class="news-row"><a href="'+data[i].link+'">'+data[i].title+'</a></li>');
	        }
	    }
	);
	
	// Fix Videos (Temporary, needs to be fixed)
	// ------------------
	$('.story iframe').css('width', '100%');
	
});