(function() {
    'use strict';

    angular
        .module('nw.core')
        .run(appRun);

	appRun.$inject = [ 'routerHelper'];	
		
    /* @ngInject */
    function appRun(routerHelper) {
        var otherwise = '/404';
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [
			{
				state: 'root',				
				config: {
					url: '',
					abstract: true,
					views: {
						'header': {
						  templateUrl: 'scripts/header/header.html',
						  controller: 'HeaderController',
						  controllerAs: 'vm'
						},
						'menu': {
						  templateUrl: 'scripts/menu/menu.html',
						  controller: 'MenuController',
						  controllerAs: 'vm'
						},
						'footer':{
						  templateUrl: 'scripts/footer/footer.html',
						  controller: 'FooterController',
						  controllerAs: 'vm'
						}
					}
				}
			},
			{
                state: 'root.404',
                config: {
                    url: '/404',
					views: {
						'container@': {
							 templateUrl: 'scripts/core/404.html'
						}
					},                   
                    title: '404',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Book',
						group: '404'
                    }
                }
            }
        ];
    }
})();