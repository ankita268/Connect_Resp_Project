(function() {
    'use strict';

    angular
        .module('connectuiApp.menu')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'root.menu',
                config: {
					url: '',
                    abstract: true,
					views: {
						'menu': {
							templateUrl: 'scripts/menu/menu.html',                    
							controller: 'MenuController',
							controllerAs: 'vm'
						}
					}
                }
            }
        ];
    }
})();