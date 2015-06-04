/**
 * @ngdoc service
 * @name connectuiApp.util:HTTPUtil
 * @description
 * # RoleService
 * Service in the connectuiApp.util
 */
 (function(){
	'use strict';
	angular.module('connectuiApp.util')
		.service('HTTPUtil', HTTPUtil);
	   
	HTTPUtil.$inject = ['$q','$http']; 
	
	/* @ngInject */
	function HTTPUtil($q, $http) {
		// AngularJS will instantiate a singleton by calling "new" on this function	
			 
		var service = {			
				get:get
		};
		return service;
		/* Private function area */
		function get(src){
			var deffered = $q.defer();
			
			
			$http({method: src.method, url: src.url, timeout: src.timeout, params:src.params,data:src.data})
			.success(function(response, status, headers, config) {
				if (angular.isObject(response))
				{
					
					deffered.resolve(response);									
				}
				else
				{
					deffered.reject(response);	
				}				
			})
			.error(function(response, status, headers, config){				 
				deffered.reject(status);
			});
			return deffered.promise; 
		}
		
		
	 }	 
 })();