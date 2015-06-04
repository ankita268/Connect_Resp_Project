/**
 * @ngdoc function
 * @name connectuiApp.role:RoleModule
 * @description
 * # RoleModule
 * Module of the connectuiApp.role
 */
(function() {
    'use strict';
    angular.module('connectuiApp.nominationperiod', [
		'nw.core','ngSanitize'
	]).run(function(moduleHelper) {
		moduleHelper.getModuleConfig('nominationperiod'); 
	});
})();