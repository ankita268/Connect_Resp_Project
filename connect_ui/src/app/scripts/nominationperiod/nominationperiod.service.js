/**
 * @ngdoc service
 * @name connectuiApp.role:RoleService
 * @description
 * # RoleService
 * Service in the connectuiApp.role
 */
 (function(){
	'use strict';
	 
	angular.module('connectuiApp.role')
		.service('NominationPeriodService', NominationPeriodService);
	   
	NominationPeriodService.$inject = ['$q','$http','logger'];
	
	/* @ngInject */
	function NominationPeriodService($q, $http, logger) {
		
		var service = {			
			commonAjaxCall:commonAjaxCall,			
			state:state,
			periodList:periodList
		};
			
		return service;
		
		//ajax call
		function commonAjaxCall(src){
			var deffered = $q.defer();
			
			$http({method: src.method, url: src.url, timeout: src.timeout, data:src.data})
			.success(function(response, status, headers, config) {
				if (angular.isObject(response))	{
					deffered.resolve(response.aoData);					
				}else{
					deffered.reject(data);	
				}				
			})
			.error(function(response, status, headers, config){
				logger.error('Err in Nomination :'+status);
				deffered.reject(status);
			});
			return deffered.promise; 
		}
		
		/////////////////////////change nomination period status/////////////////////////		
		function state(src) {
			return commonAjaxCall(src);
		}
		function periodList(src) {
			return commonAjaxCall(src);
		}
		
	 }	 
 })();