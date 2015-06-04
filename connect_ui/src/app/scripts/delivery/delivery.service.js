/**
 * @ngdoc service
 * @name connectuiApp.delivery:DeliveryService
 * @description
 * # DeliveryService
 * Service in the connectuiApp.delivery
 */
 (function(){
	'use strict';
	 
	angular.module('connectuiApp.delivery')
		.service('DeliveryService', DeliveryService);
	   
	DeliveryService.$inject = ['$q','$http','logger'];
	
	/* @ngInject */
	function DeliveryService($q, $http, logger) {
		// AngularJS will instantiate a singleton by calling "new" on this function	
		var service = {			
			getList: getList,
			getFilterList:getFilterList,
			getView:getView,
			update:update
		};
			
		return service;
		
		////////////////////////////////////////////////////
		function update(src) { 
			return get(src);
		}
		
		function getView(src) { 
			return get(src);
		}
		
		function getList(src) { 
			return get(src);
		}
		
		function getFilterList(src) { 
			return get(src);
		}
		
		function get(src){
			var deffered = $q.defer();
			
			$http({method: src.method, url: src.url, timeout: src.timeout, data:src.data, params:src.params})
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
				logger.error('Err in Pipeline Delivery :'+status);
				deffered.reject(status);
			});
			return deffered.promise;
		}
	 }	 
 })();