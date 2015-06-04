(function() {
    'use strict';

    angular
        .module('connectuiApp.role')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }
	
	function getStates() {
        return [
			{
				state: 'root.role',				
				config: {
					url: '',
					abstract: true
				}
			},
			{
				state: 'root.role.list',
				config: {
					url: '/role/list',
					views: {
						'container@': {
							templateUrl: 'scripts/role/role.html',
							controller: 'RoleController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'Role',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Role',
						group: 'role'
                    }
				}
			},
			{
                state: 'root.role.add',
                config: {
                    url: '/role/add',
					views: {
						'container@': {
							templateUrl: 'scripts/role/add.html',
							controller: 'RoleController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'Role Add',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Role',
						group: 'role'
                    }
                }
            },
			{
                state: 'root.role.edit',
                config: {
                    url: '/role/edit/:role_id',
					views: {
						'container@': {
							templateUrl: 'scripts/role/edit.html',
							controller: 'RoleController',
							controllerAs: 'vm',								
						}
					}, 					
                    title: 'Role Edit',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Role',
						group: 'role'
                    }
                }
            },
			{
                state: 'root.role.view',
                config: {
                    url: '/role/view/:role_id',
					views: {
						'container@': {
							templateUrl: 'scripts/role/view.html',
							controller: 'RoleController',
							controllerAs: 'vm',								
						}
					}, 					
                    title: 'Role Edit',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Role',
						group: 'role'
                    }
                }
            }
           
        ];
    }
})();