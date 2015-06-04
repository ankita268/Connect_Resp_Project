/**
 * @ngdoc service
 * @name connectuiApp.header:HeaderService
 * @description
 * # HeaderService
 * Service in the connectuiApp.header
 */
 (function(){
	'use strict';
	 
	angular.module('connectuiApp.header')
		.service('HeaderService', HeaderService);
	  
	HeaderService.$inject = ['$q','$http','logger'];
	
	/* @ngInject */
	function HeaderService($q, $http, logger) {
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
				logger.error('Err in loading headers:'+status);
				deffered.reject(status);
			});
			return deffered.promise; 
		}			
	 }	 
 })();