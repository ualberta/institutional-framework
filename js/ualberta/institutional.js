$(document).ready(function() {
		var winHeight = $(window).height();
		var headHeight = $('header').height();
		var footerHeight = $('footer').height();
		var bodyMinHeight = winHeight-(headHeight+footerHeight+20);
		$('.content-wrapper').css('min-height', bodyMinHeight+'px');
		$('.heading-link').tooltip();
		
		var globalNav = $('#main-nav');
		
		globalNav.find('.navigation-toggle').click(function() {
		  globalNav.find('.main-navigation').toggleClass('in');
		});
		
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
  
    $('.start').removeClass('start');
}); 