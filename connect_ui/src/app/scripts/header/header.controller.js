/**
 * @ngdoc function
 * @name connectuiApp.header:HeaderController
 * @description
 * # HeaderController
 * Controller of the connectuiApp.header
 */
(function() {
	'use strict';
	
	angular.module('connectuiApp.header')
	.controller('HeaderController', HeaderController);
	
	HeaderController.$inject = ['$scope', 'logger', 'moduleHelper', 'MenuService', '$rootScope', '$cookies', '$cookieStore'];
	
	/* @ngInject */
	function HeaderController($scope, logger, moduleHelperProvider, menuService, $rootScope, $cookies, $cookieStore) {
		/* jshint validthis: true */		
		var vm = this;	
		
		vm.currentUser=$rootScope.globals.currentUser.username;
		
		vm.logout = function() {
			_.each($cookies, function(value, key, list){
				$cookieStore.remove(key);
			}, vm);			
		};
		
	}	
	
})();