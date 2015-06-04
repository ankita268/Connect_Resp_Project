/**
 * @ngdoc function
 * @name connectuiApp.login:MainController
 * @description
 * # MainController
 * Controller of the connectuiApp.login
 */
(function() {
	'use strict';
	
	angular.module('connectuiApp.login')
	.controller('MainController', MainController);
	
	MainController.$inject = ['$rootScope', '$scope', '$location','logger','AuthenticationService','$http','Base64Service','moduleHelper'];
	/* @ngInject */
	function MainController($rootScope, $scope, $location, logger, AuthenticationService, $http, Base64Service, moduleHelperProvider) {
		$scope.logout = function () {
			logger.info("Logout requested");
			$scope.$emit('event:logoutRequest');

			$location.path("/");
		};

		$scope.login = function (credentials) {
			logger.info("Login requested");
		
			// set the basic authentication header that will be parsed in the next request and used to authenticate
			$http.defaults.headers.common['Authorization'] = 'Basic ' + Base64Service.encode(credentials.email + ':' + credentials.password);

			AuthenticationService.login().then(
				function success() {
					//	$rootScope.user = localStorageService.get('localStorageUser');
					logger.info("You have been successfully logged in.");
											
					$location.path('/home');					
				},
				function error() {
					//$rootScope.errors.push({ code: "LOGIN_FAILED", message: "Oooooops something went wrong, please try again" });
					logger.info("Oooooops something went wrong, please try again");
				});

			
		};
	}
})();