(function() {
    'use strict';

    angular
        .module('connectuiApp.kitchensink')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'root.kitchensink',
                config: {
                    url: '/kitchensink',
					views: {
						'container@': {
							templateUrl: 'scripts/kitchensink/kitchensink.html',
							controller: 'KitchenSinkController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'KitchenSink',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> KitchenSink',
						group: 'kitchensink'
                    }
                }
            }
        ];
    }
})();