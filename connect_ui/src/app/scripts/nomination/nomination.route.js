(function() {
    'use strict';

    angular
        .module('connectuiApp.nomination')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }
	
	function getStates() {
        return [
			{
				state: 'root.nomination',				
				config: {
					url: '',
					abstract: true
				}
			},
			{
				state: 'root.nomination.list',
				config: {
					url: '/nomination/list',
					views: {
						'container@': {
							templateUrl: 'scripts/nomination/list.html',
							controller: 'NominationController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'Nomination',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Nomination',
						group: 'nomination'
                    }
				}
			},
			{
                state: 'root.nomination.add',
                config: {
                    url: '/nomination/add',
					views: {
						'container@': {
							templateUrl: 'scripts/nomination/add.html',
							controller: 'NominationController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'Nomination Add',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Nomination',
						group: 'nomination'
                    }
                }
            },
			{
                state: 'root.nomination.edit',
                config: {
                    url: '/nomination/edit/:id',
					views: {
						'container@': {
							templateUrl: 'scripts/nomination/edit.html',
							controller: 'NominationController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'Nomination - Edit',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Nomination',
						group: 'nomination'
                    }
                }
            },
            {
                state: 'root.nomination.view',
                config: {
                    url: '/nomination/view/:id',
					views: {
						'container@': {
							templateUrl: 'scripts/nomination/view.html',
							controller: 'NominationController',
							controllerAs: 'vm',								
						}
					}, 					
                    title: 'Nomination - View',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Nomination',
						group: 'nomination'
                    }
                }
            },
            {
                state: 'root.nomination.download',
                config: {
                    url: '/nomination/download',
					views: {
						'container@': {							
							controller: 'NominationController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'Nomination Download',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Nomination',
						group: 'nomination'
                    }
                }
            }
        ];
    }
})();