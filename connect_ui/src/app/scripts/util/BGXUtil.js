/**
 * @ngdoc service
 * @name connectuiApp.util:BGXUtil
 * @description
 * # RoleService
 * Service in the connectuiApp.util
 */
 (function(){
	'use strict';
	 
	angular.module('connectuiApp.util')
		.service('BGXUtil', BGXUtil);
	   
	BGXUtil.$inject = ['logger','$state']; 
	
	/* @ngInject */
	function BGXUtil(logger,$state) {
		// AngularJS will instantiate a singleton by calling "new" on this function	
			 
		var service = {			
			handleResponse:handleResponse,
			goToListPage:goToListPage
			
		};
			
		return service;
		 
		 function handleResponse(response, page){
				switch (response.errorCode) {
					case 'success': 
						logger.success("Success : "+page+" - Action Completed Successfully");
						break;
					case 'error':
						logger.error("Error: "+page+" - "+ response.errorMessage);
						break;
					case 'warning':
						logger.warning("Warning: "+page+" - "+response.errorMessage);
						break;
					default:
						//logger.warning("Warning: uhun...");
						break;
				}
			}
			function goToListPage(response,listState) {
				if (response.errorCode === 'success') {
					$state.go(listState);
				}
			}
		
		
	 }	 
 })();