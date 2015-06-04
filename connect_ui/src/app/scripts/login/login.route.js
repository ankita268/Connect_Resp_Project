(function() {
    'use strict';

    angular
        .module('connectuiApp.login')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
			{
                state: 'root.login',
                config: {
                    url: '/',									
					views: {
						'container@': {
						  templateUrl: 'scripts/login/login.html',
						  controller: 'MainController',
						  controllerAs: 'vm'					  
						}
					},					
                    title: 'Login',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Login'
                    }
                }
            }		
        ];
    }
})();