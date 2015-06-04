/**
 * @ngdoc service
 * @name connectuiApp.login:AuthenticationService
 * @description
 * # AuthenticationService
 * Service in the connectuiApp.login
 */
(function(){

	'use strict';
	 
	angular.module('connectuiApp.login')
		.service('AuthenticationService', AuthenticationService);
	  
	AuthenticationService.$inject = ['$q','$http','logger','Base64Service'];
	
	/* @ngInject */
	function AuthenticationService($q, $http, logger, base64) {
		
		var service = {
			login: login,
			setCredential: setCredential,
			clearCredentials: clearCredentials
		};
		
		return service;
		
		///////////////////////////////////////////////////
		
		function login(username, password, callback) {
 
            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function () {
                var response;
                UserService.GetByUsername(username)
                    .then(function (user) {
                        if (user !== null && user.password === password) {
                            response = { success: true };
                        } else {
                            response = { success: false, message: 'Username or password is incorrect' };
                        }
                        callback(response);
                    });
            }, 1000);
 
            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });
 
        }
 
        function setCredential(username, password) {
            var authdata = base64.encode(username + ':' + password);
 
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };
 
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }
 
        function clearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        }
	}
	 
})();