/**
 * @ngdoc service
 * @name connectuiApp.book:BookService
 * @description
 * # BookService
 * Service in the connectuiApp.book
 */
 (function(){
	'use strict';
	 
	angular.module('connectuiApp.kitchensink')
		.service('KitchenSinkService', KitchenSinkService);
	  
	KitchenSinkService.$inject = ['$q','$http','logger'];
	
	/* @ngInject */
	function KitchenSinkService($q, $http, logger) {
		// AngularJS will instantiate a singleton by calling "new" on this function	
			
		var service = {			
			getList: getList
		};
			
		return service;
		
		////////////////////////////////////////////////////
		function getList(src, method) { 
			var deffered = $q.defer();
			var src = src;		
			
			$http({method: method, url: src, timeout: 5000})
			.success(function(response, status, headers, config) {
				if (angular.isObject(response))
				{
					deffered.resolve(response);					
				}
				else
				{
					deffered.reject(data);	
				}				
			})
			.error(function(response, status, headers, config){
				logger.error('Err in loading Books:'+status);
				deffered.reject(status);
			});
			return deffered.promise; 
		}			
	 }	 
 })();