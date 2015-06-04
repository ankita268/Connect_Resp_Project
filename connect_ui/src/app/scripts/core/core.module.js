(function() {
	'use strict';
	
	angular.module('nw.core', [
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'ngMessages',
		'ui.router',
		'ui.bootstrap',
		'datatables',		
		'blocks.exception',
		'blocks.logger',
		'blocks.router',		
		'blocks.module',
		'blocks.httpinterceptor',
		'blocks.filters',
		'ngplus',
		'angular-underscore',
		'underscore.string',		
		'formly', 
		'formlyBootstrap',
		'angular.filter',
		'bootstrap.fileField'
	]).run(function(moduleHelper) {
		moduleHelper.init();
	});
})();
