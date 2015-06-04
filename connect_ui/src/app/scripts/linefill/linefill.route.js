(function() {
    'use strict';

    angular
        .module('connectuiApp.linefill')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }
	
	function getStates() {
        return [
			{
				state: 'root.linefill',				
				config: {
					url: '',
					abstract: true
				}
			},
			{
				state: 'root.linefill.list',
				config: {
					url: '/linefill/list',
					views: {
						'container@': {
							templateUrl: 'scripts/linefill/list.html',
							controller: 'LinefillController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'Line Fill',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Line Fill',
						group: 'linefill'
                    }
				}
		},
		{
			state: 'root.linefill.edit',
			config: {
				url: '/linefill/edit/:year/:month/:shipperNumber',
				params: {'linefillEditModel': {}},
				views: {
					'container@': {
						templateUrl: 'scripts/linefill/edit.html',
						controller: 'LinefillController',
						controllerAs: 'vm',					  
					}
				},                    
                title: 'Line Fill - Edit',
                settings: {
                    nav: 1,
                    content: '<i class="fa fa-lock"></i> Line Fill',
					group: 'linefill'
                }
			}
		}
		];
    }
})();