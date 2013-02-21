$(document).ready(function() {
	var winHeight = $(window).height();
	var headHeight = $('header').height();
	var footerHeight = $('footer').height();
	var bodyMinHeight = winHeight-(headHeight+footerHeight+20);
	$('.content-wrapper').css('min-height', bodyMinHeight+'px');
	$('.heading-link').tooltip();

	var navTitle = $('#main-nav .navigation-toggle span');
	$('#main-nav .main-navigation').on('show', function() {
		navTitle.html('Hide Navigation');
	});
	$('#main-nav .main-navigation').on('hide', function() {
		navTitle.html('Show Navigation');
	});

	var sectionNavTitle = $('.section-nav .navigation-toggle span');
	$('.leftnav').on('show', function() {
		sectionNavTitle.html('Hide Section Navigation');
	});
	$('.leftnav').on('hide', function() {
		sectionNavTitle.html('Show Section Navigation');
	});

	$('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });
}); 