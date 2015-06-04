/**
 * @ngdoc function
 * @name connectuiApp.book:BookModule
 * @description
 * # BookModule
 * Module of the connectuiApp.book
 */
(function() {
    'use strict';
    angular.module('connectuiApp.book', [
		'nw.core'
	]).run(function(moduleHelper) {
		moduleHelper.getModuleConfig('book');
	});
})();