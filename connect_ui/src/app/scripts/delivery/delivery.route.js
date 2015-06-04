(function() {
    'use strict';

    angular
        .module('connectuiApp.delivery')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }
	
	function getStates() {
        return [
			{
				state: 'root.delivery',				
				config: {
					url: '',
					abstract: true
				}
			},
			{
				state: 'root.delivery.list',
				config: {
					url: '/delivery/list',
					views: {
						'container@': {
							templateUrl: 'scripts/delivery/list.html',
							controller: 'DeliveryController',
							controllerAs: 'vm'			  
						}
					},                    
                    title: 'Pipeline Delivery',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Delivery',
						group: 'delivery'
                    }
				}
			},
			{
                state: 'root.delivery.view',
                config: {
                    url: '/delivery/view/:year/:month/:id',
					views: {
						'container@': {
							templateUrl: 'scripts/delivery/view.html',
							controller: 'DeliveryController',
							controllerAs: 'vm',								
						}
					}, 					
                    title: 'Pipeline Delivery - View',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Delivery',
						group: 'delivery'
                    }
                }
            },
			{
                state: 'root.delivery.edit',
                config: {
                	url: '/delivery/edit/:year/:month/:id',
					views: {
						'container@': {
							templateUrl: 'scripts/delivery/edit.html',
							controller: 'DeliveryController',
							controllerAs: 'vm',								
						}
					}, 					
                    title: 'Pipeline Delivery - Edit',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Delivery',
						group: 'delivery'
                    }
                }
            }
			
        ];
    }
})();