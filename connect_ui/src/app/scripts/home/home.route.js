(function() {
    'use strict';

    angular
        .module('connectuiApp.home')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {		
        return [
            {
                state: 'root.home',
                config: {
                    url: '/home',									
					views: {
						'container@': {
						  templateUrl: 'scripts/home/home.html',
						  controller: 'HomeController',
						  controllerAs: 'vm'					  
						}
					},					
                    title: 'Home',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Home',
						group: 'home'
                    }
                }
            }
        ];
    }
})();