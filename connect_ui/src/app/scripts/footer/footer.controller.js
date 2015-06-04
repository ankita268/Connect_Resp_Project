/**
 * @ngdoc function
 * @name connectuiApp.footer:FooterController
 * @description
 * # FooterController
 * Controller of the connectuiApp.footer
 */
(function() {
	'use strict';
	
	angular.module('connectuiApp.footer')
	.controller('FooterController', FooterController);
	
	FooterController.$inject = ['$scope', 'logger', 'moduleHelper', 'FooterService'];
	
	/* @ngInject */
	function FooterController($scope, logger, moduleHelperProvider, footerService) {
		/* jshint validthis: true */		
		var vm = this;	
		var moduleDataSource = moduleHelperProvider.getDataSource('footer');
		var httpConfig = moduleHelperProvider.getHttpConfig();
		var list = moduleDataSource.list;
		var list = {
			method: list.method,
			url: list.url,
			timeout: httpConfig.timeout
		};
		
		/* Scope variables */
		vm.footers = [];
		
		getFooterData();
		
		/* ///////////////// Function Area /////////////////// */
		function getFooterData() {
			footerService.getList(list).then(function(data) {	
				vm.footers = data;
				return vm.footers;
			},function(error) {
				logger.error("Footer Data not available", error);
			});
		}		
	}
})();