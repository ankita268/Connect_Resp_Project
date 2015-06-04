(function() {
    'use strict';

    angular
        .module('blocks.httpinterceptor')
        .factory('httpErrorsInterceptor', httpErrorsInterceptor);

    httpErrorsInterceptor.$inject = ['$q', 'logger'];

    /* @ngInject */
    function httpErrorsInterceptor(logger) {

    	var message = '';
    	return function(promise) {
    		return promise.then(successHandler, errorHandler);
    	}
        
        function successHandler(response){
        	return response;
        }
        
        function errorHandler(response) {
        	var config = response.config;
        	if (!config.bypassErrorInterceptor) {
        		
        		switch(response.status) {
	        		case "404": 
	        			message = "Page Not Found";
	        			break;
	        		case "500":
	        			message = "Internal Server Error";
	        			break;
	        		case "501":
	        			message = "Not Implemented";
	        			break;
	        		case "503":
	        			message = "Server - Service unavailable";
	        			break;
	        		case "401":
	        			message = "Unauthorized Resource Request";
	        			break;
	        		case "408":
	        			message = "Request timeout";
	        			break;
        		}
        		
        		logger.error("HTTP Error: "+response.status+" "+message);
        	}
        	return $q.reject(response);
        }
    }
})();