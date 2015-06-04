(function() {
    'use strict';

    angular
        .module('connectuiApp.statement')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }
	
	function getStates() {
        return [
			{
				state: 'root.statement',				
				config: {
					url: '',
					abstract: true
				}
			},
			{
				state: 'root.statement.list',
				config: {
					url: '/statement/list',
					views: {
						'container@': {
							templateUrl: 'scripts/statement/list.html',
							controller: 'StatementController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'Shipper Statement',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Shipper Statement',
						group: 'statement'
                    }
				}
		}];
    }
})();