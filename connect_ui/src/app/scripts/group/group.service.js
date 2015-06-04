/**
 * @ngdoc service
 * @name connectuiApp.group:GroupService
 * @description
 * # GroupService
 * Service in the connectuiApp.group
 */
 (function(){
	'use strict';
	 
	angular.module('connectuiApp.group')
		.service('GroupService', GroupService);
	  
	GroupService.$inject = ['$q','$http','logger'];
	
	/* @ngInject */
	function GroupService($q, $http, logger) {
		// AngularJS will instantiate a singleton by calling "new" on this function	
			
		var service = {			
			getList: getList,
			addGroup: addGroup
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
				logger.error('Err in loading Groups:'+status);
				deffered.reject(status);
			});
			return deffered.promise; 
		}

		////////////////////////////////////////////////////
		function addGroup(src) { 
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
				logger.error('Err in loading Books:'+status);
				deffered.reject(status);
			});
			return deffered.promise; 
		}		
	 }	 
 })();