/**
 * @ngdoc directive
 * @name connectuiApp.menu:directive
 * @description
 * # directive
 * directive in the connectuiApp.menu
 */
 (function(){
	'use strict';
	 
	angular.module('connectuiApp.menu')
	.directive('menuslider', MenuNavigation);
	  
	
	function MenuNavigation(){
		return {
		restrict: 'AE',
		link: function(scope, elem, attrs) {
			$('#slide-nav.navbar .container').append($('<div id="navbar-height-col"></div>'));
			var toggler = '.navbar-toggle';
			var pagewrapper = '#page-content';
			var navigationwrapper = '.navbar-header';
			var menuwidth = '100%'; // the menu inside the slide menu itself
			var slidewidth = '80%';
			var portraitSlidewidth = '0%';
			var menuneg = '-100%';
			var slideneg = '-80%';
			var $window = $(window);
		    elem.bind('click', function() {
					var selected = $(this).hasClass('slide-active');
					$('#slidemenu').stop().animate({
						left: selected ? menuneg : '0px'
					});
					$('#navbar-height-col').stop().animate({
						left: selected ? slideneg : '0px'
					});
					$(pagewrapper).stop().animate({
						left: selected ? '0px' : (($(window).width() > 480 && $(window).width() < 767)?portraitSlidewidth:slidewidth)
					});
					$(navigationwrapper).stop().animate({
						 left: selected ? '0px' : (($(window).width() > 480 && $(window).width() < 767)?portraitSlidewidth:slidewidth)
					});
					$(this).toggleClass('slide-active', !selected);
					
					$('#slidemenu').toggleClass('slide-active');
					
					$('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');
		    }),
			$(window).resize(function() {
				  var selected = '#slidemenu, #page-content, body, .navbar, .navbar-header';
				  if ($(window).width() > 767 && $('.navbar-toggle').is(':hidden')) {
						$(selected).removeClass('slide-active');
				  }
            })
		}
	  }
	}
 })();