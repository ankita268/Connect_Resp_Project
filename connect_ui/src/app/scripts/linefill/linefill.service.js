/**
 * @ngdoc service
 * @name connectuiApp.linefill:LinefillService
 * @description
 * # connectuiApp.linefill:LinefillService
 * Service in the connectuiApp.linefill
 */
 (function(){
	'use strict';
	 
	angular.module('connectuiApp.linefill')
		.service('LinefillService', LinefillService);
	   
	LinefillService.$inject = ['$q','$http','logger','HTTPUtil'];
	
	/* @ngInject */
	function LinefillService($q, $http, logger,HTTPUtil) {
		// AngularJS will instantiate a singleton by calling "new" on this function	
			 
		var service = {			
			getFilterList:getFilterList,
			update: update,
			getLinefill:getLinefill,
		};
			
		return service;
		
		/* Service functions */
		function update(src){
			return HTTPUtil.get(src);
		}
		function getFilterList(src) { 
			return HTTPUtil.get(src);
		}
		function getLinefill(src) { 
			return HTTPUtil.get(src);
		}
		
		
		
		
	 }	 
 })();