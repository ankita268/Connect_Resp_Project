(function() {
    'use strict';

    angular
        .module('blocks.module')
        .provider('moduleHelper', moduleHelperProvider);

    /* @ngInject */
    function moduleHelperProvider() {
        /* jshint validthis:true */
    	var configs = [];
        var appKey = 'app';
    	var config = {
            docTitle: undefined,
            resolveAlways: {}
        };
		var http;
		var rootScope;
		var cookieStore;
		var appContext;
		
		var appconfig = {};
		var defaultUrl = "";
		var defaultHttpTimeout = 5000;
		
		function getAppConfig() {		
			var config = [];
			if (appconfig) {
				config = appconfig;
			}			
			
			return config;
		}
		
		function getLoggedInUserdetails(appContext){
			/* configuring module helper provider */
			http({method: 'POST', url: appContext+'/getUserProfile', cache: true, timeout: 5000})
			.success(function(response, status, headers, config) {
				if (angular.isObject(response))
				{					
					rootScope.globals = {
						currentUser: {
							username: response.currentuser,
							authdata: response.contenttypes,
							usertype: response.userType
						}
					};
 
					cookieStore.put('globals', rootScope.globals);
				}
						
			})
			.error(function(response, status, headers, config){
								
			});
		}
		
		function getConfig(key, url) {
			/* configuring module helper provider */
			http({method: 'GET', url: url, cache: true, timeout: 5000})
			//http({method: 'GET', url: 'core/resources/data/config.json', cache: true, timeout: 5000})
			.success(function(response, status, headers, config) {
				if (angular.isObject(response))
				{					
					angular.extend(appconfig, response.data);
					addConfigElement(key, response.data);
				}
							
			})
			.error(function(response, status, headers, config){
						
			});	
		}
		
		function addConfigElement(key, appconfig){
			if (isKeyExists(key)) removeKeyElement(key);
			
			if (!_.isEmpty(key)) {
				configs.push({
					key: key,
					configs: appconfig
				});
			}			
		}
		
		function getKeyElement(key) {			
			var result = {};
			_.find(configs, function(object){ 
				if (object.key == key) {
					result = object.configs;
					return true;
				}
			});			
			return result;
		}
		
		function isKeyExists(key){			
			var result = false;
			_.find(configs, function(object){ 
				if (object.key == key) {
					result = true;
					return true;
				}
			});			
			return result;
		}
		
		function removeKeyElement(key){
			var removedList = _.reject(configs, function(object){ 
				if (object.key == key) {
					return true;
				}
			});
			configs = removedList;
		}
		
		this.configure = function(cfg) {		
            angular.extend(config, cfg);
        };
		
		this.$get = ModuleHelper;
		
		ModuleHelper.$inject = ['$http', '$rootScope', '$cookieStore', 'logger', 'appContext'];
		
		function ModuleHelper($http, $rootScope, $cookieStore, logger, appContext) {				
			var service = {
				init: init,
				getModuleConfig: getModuleConfig,
				getDataSource: getDataSource,
				getTableConfig: getTableConfig,
				getHttpConfig: getHttpConfig,
				getUserProfile: getUserProfile
			};
			
			config();
			
			return service;
						
			////////////////////////////////////////////
			
			function getDataSource(moduleKey) {
				var datasource = {};
				if (isKeyExists(moduleKey)) datasource = getKeyElement(moduleKey).datasource;
				return datasource;
			}
			
			/* commenting this uitemplates are configured in routes
			function getTemplate(moduleKey) {
				var config = getAppConfig();				
				var module = (moduleKey)?config.uitemplates[moduleKey]:config.uitemplates;
				return module;
			}
			*/
			
			function getTableConfig(moduleKey) {
				var moduleconfig = {};
				if (isKeyExists(moduleKey)) moduleconfig = getKeyElement(moduleKey).moduleconfigs;							
				return moduleconfig;
			}
			
			function getHttpConfig() {
				var httpconfig = {};
				httpconfig = getKeyElement(appKey).httpconfig; 
				return httpconfig;
			}
			
			function getUserProfile() {
				var userprofile = {};
				userprofile = getKeyElement(appKey).userprofile; 
				return userprofile;
			}
			
			function init() {
				getLoggedInUserdetails(appContext);
				getConfig(appKey, appContext+'/resources/data/config.json');
			}
			
			function getModuleConfig(key){
				getConfig(key, appContext+'/resources/data/'+key+'.json');
			}
			
			function config() {
				http = $http;
				rootScope = $rootScope;
				cookieStore = $cookieStore;
				appContext = appContext;
			}
		}		
    }
})();