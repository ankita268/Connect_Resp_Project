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
		.service('RoleService', RoleService);
	   
	RoleService.$inject = ['$q','$http','logger'];
	
	/* @ngInject */
	function RoleService($q, $http, logger) {
		// AngularJS will instantiate a singleton by calling "new" on this function	
			 
		var service = {			
			getList: getList,
			addRole: addRole,
			editRole: editRole,
			isExistRole:isExistRole,
			commonAjaxCall:commonAjaxCall
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
				logger.error('Err in loading Roles:'+status);
				deffered.reject(status);
			});
			return deffered.promise; 
		}

		
		function commonAjaxCall(src){
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
				logger.error('Err in add role :'+status);
				deffered.reject(status);
			});
			return deffered.promise; 
		}
		////////////////////////////// //////////////////////
		function addRole(src) { 
			return commonAjaxCall(src);
		}
		
		/////////////////////////Edit role///////////////////////////
		function editRole(src) {
			return commonAjaxCall(src);
		}	
		
		///////////////////////check role exist////////////////////////////
		function isExistRole(src) { 
			return commonAjaxCall(src);
		}	
	 }	 
 })();