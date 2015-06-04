/**
 * @ngdoc function
 * @name connectuiApp.footer:FooterModule
 * @description
 * # FooterModule
 * Module of the connectuiApp.footer
 */
(function() {
    'use strict';
    angular.module('connectuiApp.footer', [
		'nw.core'
	]).run(function(moduleHelper) {
		moduleHelper.getModuleConfig('footer');
	});;
})();