(function() {
    'use strict';
	
	angular.module('nw.core')
	.factory("authInterceptor",authorizationIterceptor);
		
	authorizationIterceptor.$inject = ['$q', '$templateCache', 'appconfigs','$location'];	
	 /* @ngInject */
	function authorizationIterceptor($q, $templateCache,appconfigs) {
		
		// Keep track which HTML templates have already been modified.
		var modifiedTemplates = {};        
			
		// Tests if there are any keep/omit attributes.
		var HAS_FLAGS_EXP = /data-(keep|omit)/;
		
		// Tests if the requested url is a html page.
		var IS_HTML_PAGE = /\.html$|\.html\?/i;    
		
		return interceptorPromise;
		
		///////////////////////////////////////

		function interceptorPromise(promise) {
			return promise.then(success,error);
		  
			///////////////////////////////////////////
			function success(response) {
			
				var activeProfile = appconfigs.userprofile;
				var url = response.config.url, 
				responseData = response.data;
					
					
				if (!modifiedTemplates[url] && IS_HTML_PAGE.test(url) &&	HAS_FLAGS_EXP.test(responseData))
				{
					// Create a DOM fragment from the response HTML.
					var template = $('<div>').append(responseData);
					var activeProfileAccess=[];			  
				
					$(activeProfile.features).each(function(index){
						var item = activeProfile.features[index];				
						 if(item.url==url){ 
							activeProfileAccess = item.access;					
						 }
					 });
					
					if(activeProfileAccess && activeProfileAccess.length>0){
					 // Find and parse the keep/omit attributes in the view.
					 template.find('[data-keep],[data-omit]').each(function() {
						var element = $(this),
							data = element.data(),
							keep = data.keep,
							features = keep || data.omit || '';				
							
						
						// Check if the user has all of the specified features.
						var hasFeature = _.all(features.split(','), function(feature) {									
						  return activeProfileAccess.indexOf(feature)>-1;
						});
						
						if (features.length && ((keep && !hasFeature) || (!keep && hasFeature))) {						
						  element.remove();					  
						} 
					  }); 
					}			   	 
				  
					// Set the modified template.
					response.data = template.html();
				  
					// Replace the template in the template cache, and mark the
					// template as modified.
					$templateCache.put(url, response.data);
					modifiedTemplates[url] = true;
				}				
				return response;
			}
			
			// Reject the response in case of an error.
			function error(response) {
				//Handle session Time-out event
				if (response.status === 401) {
					$location.path('/login');				
				}
				return $q.reject(response);				
			}
		};   
				  
	}
})();