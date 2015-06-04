(function() {
    'use strict';

    angular
        .module('connectuiApp.nominationperiod')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }
	 
	function getStates() {
        return [
			{
				state: 'root.nominationperiod',				
				config: {
					url: '',
					abstract: true
				}
			},
			{
				state: 'root.nominationperiod.list',
				config: {
					url: '/nominationperiod/list',
					views: {
						'container@': {
							templateUrl: 'scripts/nominationperiod/list.html',
							controller: 'NominationPeriodController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'Manage Nomination Periods',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Nomination',
						group: 'nomination'
                    }
				}
			},
			{
                state: 'root.nominationperiod.state',
                config: {
                    url: '/nominationperiod/state',
					views: {
						'container@': {							
							controller: 'NominationPeriodController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'Nomination State',
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