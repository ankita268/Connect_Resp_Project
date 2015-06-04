/**
 * @ngdoc service
 * @name connectuiApp.role:ProgramService
 * @description
 * # ProgramService
 * Service in the connectuiApp.program
 */
 (function(){
	'use strict';
	 
	angular.module('connectuiApp.program')
		.service('ProgramService', ProgramService);
	   
	ProgramService.$inject = ['$q','$http','logger','$state','HTTPUtil']; 
	
	/* @ngInject */
	function ProgramService($q, $http, logger,$state,HTTPUtil) { 
		// AngularJS will instantiate a singleton by calling "new" on this function	
			 
		var service = {			
			saveDocument: saveDocument,
			getObject: getObject,
			getList: getList,
		};
		return service;
 
		function getObject(src) { 
		    return HTTPUtil.get(src);
		}
		function getList(src) { 
		    return HTTPUtil.get(src);
		}
		
		/*   ajax call  for file */
		function ajaxCallWithFile(src){
			var deffered = $q.defer();
			//Not working with headers: {'Content-Type': 'multipart/form-data'},
			 $http({
			        method: 'POST',
			        url: src.url,
			        params:src.params,
			        data:src.data,
			        headers: {'Content-Type': undefined},
			        transformRequest: function(data, headersGetterFunction) {
			                        return data;
			         }
			     })
			    .success(function(response, status) {   
			    	   if (angular.isObject(response))
						{
			    		   deffered.resolve(response);
						}
						else
						{
							deffered.reject(response);	
						}	
			     }).error(function(response, status, headers, config){
						logger.error('Err in during ajax call :'+status);
						deffered.reject(status);
					});;
			 return deffered.promise; 
	   } 
		function saveDocument(src,isDocUpload) { 
			if(isDocUpload=='true'){
				return ajaxCallWithFile(src);
			}else{
				return HTTPUtil.get(src);
			}
			
		}
	 
	 }	 
 })();