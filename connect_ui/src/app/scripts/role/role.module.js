/**
 * @ngdoc function
 * @name connectuiApp.role:RoleModule
 * @description
 * # RoleModule
 * Module of the connectuiApp.role
 */
(function() {
    'use strict';
    angular.module('connectuiApp.role', [
		'nw.core'
	]).run(function(moduleHelper) {
		moduleHelper.getModuleConfig('role');
	});
})();