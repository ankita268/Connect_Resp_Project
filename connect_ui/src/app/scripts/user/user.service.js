(function(){
	'use strict';	 
	angular.module('connectuiApp.user')
		.service('UserService', UserService);
		
	UserService.$inject = ['logger','appContext'];
	
	/* @ngInject */
	function UserService(logger,appContext) {
		
		var service = {
			encode: encode,
			decode: decode
		};
		
		return service;
		
		///////////////////////////////////////
		
		
	}
})();