(function() {
    'use strict';

    angular
        .module('connectuiApp.header')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'root.header',
                config: {
					url: '',
                    abstract: true,
					views: {
						'header': {
							templateUrl: 'scripts/header/header.html',                    
							controller: 'HeaderController',
							controllerAs: 'vm'
						}
					}
                }
            }
        ];
    }
})();