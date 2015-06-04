(function() {
    'use strict';

    angular
        .module('connectuiApp.footer')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
			{
				state: 'root.footer',
                config: {
					url: '',
                    abstract: true,
					views: {
						'footer': {
							templateUrl: 'scripts/footer/footer.html',                    
							controller: 'FooterController',
							controllerAs: 'vm'
						}
					}
                }				
			}
        ];
    }
})();