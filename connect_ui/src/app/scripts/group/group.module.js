/**
 * @ngdoc function
 * @name connectuiApp.group:GroupModule
 * @description
 * # GroupModule
 * Module of the connectuiApp.group
 */
(function() {
    'use strict';
    angular.module('connectuiApp.group', [
		'nw.core'
	]).run(function(moduleHelper) {
		moduleHelper.getModuleConfig('group');
	});
})();