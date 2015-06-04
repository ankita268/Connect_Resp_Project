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
		.service('NominationService', NominationService);
	   
	NominationService.$inject = ['$q','$http','logger'];
	
	/* @ngInject */
	function NominationService($q, $http, logger) {
		// AngularJS will instantiate a singleton by calling "new" on this function	
			  
		var service = {			
			getList: getList,
			createNomination: createNomination,
			editNomination: editNomination,
			isExistNomination:isExistNomination,
			commonAjaxCall:commonAjaxCall,
			uploadXls:uploadXls,
			getPeriodList:getPeriodList,
			getReceiptLocationList:getReceiptLocationList,
			getDeliveryLocationList:getDeliveryLocationList,
			getShipperList:getShipperList,
			viewNomination:viewNomination,
			changelog:changelog,
			updateNomination:updateNomination,
			singleViewNomination:singleViewNomination
		};
			
		return service;
		
		/* Private function area */
		
		function getList(src) { 
			return listNominationCall(src);
		}		
				
		function commonAjaxCall(src){
			var deffered = $q.defer();
			
			$http({method: src.method, url: src.url, timeout: src.timeout, data:src.data})
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
				deffered.reject(status);
			});
			return deffered.promise; 
		}
		
		function singleViewNomination(src){
			var deffered = $q.defer();
			
			$http({method: src.method, url: src.url, timeout: src.timeout, data:src.data})
			.success(function(response, status, headers, config) {				
				if (angular.isObject(response))
				{	
					deffered.resolve(response.result);					
				}
				else
				{
					deffered.reject(data);	
				}				
			})
			.error(function(response, status, headers, config){				
				deffered.reject(status);
			});
			return deffered.promise; 
		}
		function listNominationCall(src){
			var deffered = $q.defer();
			
			$http({method: src.method, url: src.url, timeout: src.timeout, data:src.data})
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
				deffered.reject(status);
			});
			return deffered.promise; 
		}
		
		
		////////////////////////////// //////////////////////		
		function createNomination(src) {
			var deffered = $q.defer();
			
			$http({method: src.method, url: src.url, timeout: src.timeout, data:src.data})
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
				deffered.reject(status);
			});
			return deffered.promise; 
		}
		
		/* File upload  ajax call */
		function uploadXls(src) { 
			var formData=new FormData();
			formData.append("file",src.file);
			 $http({
			        method: 'POST',
			        url: src.url,
			        headers: {'Content-Type': undefined},
			        data: formData,
			        transformRequest: function(data, headersGetterFunction) {
			                        return data;
			        }
			     })
			    .success(function(data, status) {   
			    	   logger.success("Nomination uploaded successfully.");
			     })
			     .error(function(response, status, headers, config){
						logger.error('Nomination upload Failed.');
			     });
		}
		
		function updateNomination(src){
			var deffered = $q.defer();
			
			$http({method: src.method, url: src.url, timeout: src.timeout, data:src.data})
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
				logger.error('Err in Nomination :'+status);
				deffered.reject(status);
			});
			return deffered.promise; 
		}
		
		/////////////////////////Edit Nomination///////////////////////////
		function editNomination(src) {
			return commonAjaxCall(src);
		}	
		/////////////////////////View Nomination///////////////////////////
		function viewNomination(src) {
			return commonAjaxCall(src);
		}	
		///////////////////////check Nomination exist////////////////////////////
		function isExistNomination(src) { 
			return commonAjaxCall(src);
		}	
		///////////////////////Get Period List/////////////////////////////
		function getPeriodList(src) { 
			return commonAjaxCall(src);
		}		
		///////////////////////Get Receipt Location List/////////////////////////////
		function getReceiptLocationList(src) { 
			return commonAjaxCall(src);
		}
		///////////////////////Get Delivery Location List/////////////////////////////
		function getDeliveryLocationList(src) { 
			return commonAjaxCall(src);
		}
		///////////////////////Get Delivery Location List/////////////////////////////
		function getShipperList(src) { 
			return commonAjaxCall(src);
		}
		
		/////////////////////////change nomination log/////////////////////////		
		function changelog(src) {
			return commonAjaxCall(src);
		}	
	 }	 
 })();