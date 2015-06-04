/**
 * @ngdoc function
 * @name connectuiApp.role:RoleModule
 * @description
 * # RoleModule
 * Module of the connectuiApp.role
 */
(function() {
    'use strict';
    angular.module('connectuiApp.nomination', [
		'nw.core','formly', 'formlyBootstrap'
	]).run(function(moduleHelper) {
		moduleHelper.getModuleConfig('nomination');
	});
})();