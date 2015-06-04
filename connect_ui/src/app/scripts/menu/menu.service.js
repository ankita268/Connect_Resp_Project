/**
 * @ngdoc service
 * @name connectuiApp.menu:MenuService
 * @description
 * # MenuService
 * Service in the connectuiApp.menu
 */
 (function(){
	'use strict';
	 
	angular.module('connectuiApp.menu')
		.service('MenuService', MenuService);
	  
	MenuService.$inject = ['$q','$http','logger'];
	
	/* @ngInject */
	function MenuService($q, $http, logger) {
		// AngularJS will instantiate a singleton by calling "new" on this function	
			
		var service = {			
			getList: getList
		};
			
		return service;
		
		////////////////////////////////////////////////////
		function getList(src) { 
			var deffered = $q.defer();
			var src = src;		
			
			$http({method: src.method, url: src.url, timeout: src.timeout})			
			.success(function(response, status, menus, config) {
				if (angular.isObject(response))
				{
					deffered.resolve(response.aoData);					
				}
				else
				{
					deffered.reject(data);	
				}				
			})
			.error(function(response, status, menus, config){
				logger.error('Err in loading Books:'+status);
				deffered.reject(status);
			});
			return deffered.promise; 
		}			
	 }	 
 })();