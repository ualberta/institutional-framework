$(document).ready(function() {
		var winHeight = $(window).height();
		var headHeight = $('header').height();
		var footerHeight = $('footer').height();
		var bodyMinHeight = winHeight-(headHeight+footerHeight+20);
		$('.content-wrapper').css('min-height', bodyMinHeight+'px');
		$('.content-container.container').css('min-height', $('.sidebar').height()+'px');
		$('.heading-link').tooltip();
		
		var globalNav = $('#main-nav');
		
		globalNav.find('.navigation-toggle').click(function() {
		  globalNav.find('.main-navigation').toggleClass('in');
		});
  
    $('.start').removeClass('start');
    
    $('body').on('click touchcancel.dropdown.data-api touchleave.dropdown.data-api touchmove.dropdown.data-api touchend.dropdown.data-api touchstart.dropdown.data-api', '.quick-links', function (e) { e.stopPropagation(); });
}); 