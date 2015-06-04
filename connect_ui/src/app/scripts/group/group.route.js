(function() {
    'use strict';

    angular
        .module('connectuiApp.group')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }
	
	function getStates() {
        return [
			{
				state: 'root.group',				
				config: {
					url: '',
					abstract: true
				}
			},
			{
				state: 'root.group.list',
				config: {
					url: '/group/list',
					views: {
						'container@': {
							templateUrl: 'scripts/group/group.html',
							controller: 'GroupController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'Group',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Group',
						group: 'group'
                    }
				}
			},
			{
                state: 'root.group.add',
                config: {
                    url: '/group/add',
					views: {
						'container@': {
							templateUrl: 'scripts/group/add.html',
							controller: 'GroupController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'group Add',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> group',
						group: 'group'
                    }
                }
            },
			{
                state: 'root.group.edit',
                config: {
                    url: '/group/edit',
					views: {
						'container@': {
							templateUrl: 'scripts/group/edit.html',
							controller: 'GroupController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'group Edit',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> group',
						group: 'group'
                    }
                }
            }
        ];
    }
})();