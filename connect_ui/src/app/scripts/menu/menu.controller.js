/**
 * @ngdoc function
 * @name connectuiApp.menu:MenuController
 * @description
 * # MenuController
 * Controller of the connectuiApp.menu
 */
(function() {
	'use strict';
	
	angular.module('connectuiApp.menu')
	.controller('MenuController', MenuController);
		
	MenuController.$inject = ['$scope', 'logger', 'moduleHelper', 'MenuService','$location'];
	
	/* @ngInject */
	function MenuController($scope, logger, moduleHelperProvider, menuService,$location) {
		/* jshint validthis: true */		
		var vm = this;		
		var moduleDataSource = moduleHelperProvider.getDataSource('menu');
		var httpConfig = moduleHelperProvider.getHttpConfig();
		var list = moduleDataSource.list;
		var list = {
			method: list.method,
			url: list.url,
			timeout: httpConfig.timeout
		};
		
		/* Scope Variables */
		vm.menus = [];
		vm.menuClass=menuClass;
		
		getMenuData();
		
		/* ///////////////// Function Area /////////////////// */
		function getMenuData() {
			menuService.getList(list).then(function(data) {	
				vm.menus = data;
				return vm.menus;
			},function(error) {
				logger.error("Footer Data not available", error);
			});
		}
		
		function menuClass(page) {
			var tmPage = page.substring(2);
		    var current = $location.path().substring(1);
		    return tmPage === current ? "menuActive" : "";
		};
		
	}	
})();