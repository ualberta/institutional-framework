$(document).ready(function() {
		var winHeight = $(window).height();
		var headHeight = $('header').height();
		var footerHeight = $('footer').height();
		var bodyMinHeight = winHeight-(headHeight+footerHeight+20);
		$('.content-wrapper').css('min-height', bodyMinHeight+'px');
		$('.heading-link').tooltip();
}); 