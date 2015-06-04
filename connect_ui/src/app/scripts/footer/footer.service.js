/**
 * @ngdoc service
 * @name connectuiApp.footer:FooterService
 * @description
 * # FooterService
 * Service in the connectuiApp.footer
 */
 (function(){
	'use strict';
	 
	angular.module('connectuiApp.footer')
		.service('FooterService', FooterService);
	  
	FooterService.$inject = ['$q','$http','logger'];
	
	/* @ngInject */
	function FooterService($q, $http, logger) {
		// AngularJS will instantiate a singleton by calling "new" on this function	
			
		var service = {			
			getList: getList
		};
			
		return service;
		
		////////////////////////////////////////////////////
		function getList(src) { 
			var deffered = $q.defer();
			
			$http({method: src.method, url: src.url, timeout: src.timeout})
			.success(function(response, status, headers, config) {
				if (angular.isObject(response))
				{
					deffered.resolve(response.aoData);					
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