/**
 * @ngdoc function
 * @name connectuiApp.menu:HeaderModule
 * @description
 * # HomeModule
 * Module of the connectuiApp.menu
 */
(function() {
    'use strict';
    angular.module('connectuiApp.menu', [
		'nw.core'
	]).run(function(moduleHelper) {
		moduleHelper.getModuleConfig('menu');
	});;
})();