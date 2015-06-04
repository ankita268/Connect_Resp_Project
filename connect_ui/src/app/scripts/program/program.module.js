/**
 * @ngdoc function
 * @name connectuiApp.role:RoleModule
 * @description
 * # RoleModule
 * Module of the connectuiApp.role
 */
(function() {
    'use strict';
    angular.module('connectuiApp.program', [
		'nw.core'
	]).run(function(moduleHelper) {
		moduleHelper.getModuleConfig('program');
	});
})();