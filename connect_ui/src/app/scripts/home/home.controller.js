/**
 * @ngdoc function
 * @name connectuiApp.home:HomeController
 * @description
 * # HomeController
 * Controller of the connectuiApp.home
 */
(function() {
	'use strict';
	
	angular.module('connectuiApp.home')
	.controller('HomeController', HomeController);
	
	HomeController.$inject = ['$scope', 'logger'];
	
	/* @ngInject */
	function HomeController($scope, logger) {
		/* jshint validthis: true */	
		var vm = this;	
		vm.title='Home';
		vm.busyMessage='Loading...';
	}
})();