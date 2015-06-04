/**
 * @ngdoc service
 * @name connectuiApp.statement:StatementService
 * @description
 * # connectuiApp.statement:StatementService
 * Service in the connectuiApp.statement
 */
 (function(){
	'use strict';
	 
	angular.module('connectuiApp.statement')
		.service('StatementService', StatementService);
	   
	StatementService.$inject = ['$q','$http','logger'];
	
	/* @ngInject */
	function StatementService($q, $http, logger) {
		// AngularJS will instantiate a singleton by calling "new" on this function	
			 
		var service = {			
			getFilterList:getFilterList,
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
				logger.error('Err in loading Statements:'+status);
				deffered.reject(status);
			});
			return deffered.promise; 
		}

		
		function get(src){
			var deffered = $q.defer();
			
			$http({method: src.method, url: src.url, timeout: src.timeout, params:src.data})
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
				logger.error('Err in add Statements :'+status);
				deffered.reject(status);
			});
			return deffered.promise; 
		}
		
		////////////////////////////////////////////////////
		function getFilterList(src) { 
			return get(src);
		}
	 }	 
 })();