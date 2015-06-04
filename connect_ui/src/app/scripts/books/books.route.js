(function() {
    'use strict';

    angular
        .module('connectuiApp.book')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
			{
				state: 'root.book',				
				config: {
					url: '',
					abstract: true
				}
			},
            {
                state: 'root.book.list',
                config: {
                    url: '/book/list',
					views: {
						'container@': {
							templateUrl: 'scripts/books/books.html',
							controller: 'BookController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'Book',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Book',
						group: 'book'
                    }
                }
            },
			{
                state: 'root.book.add',
                config: {
                    url: '/book/add',
					views: {
						'container@': {
							templateUrl: 'scripts/books/add.html',
							controller: 'BookController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'Book Add',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Book - Create',
						group: 'book'
                    }
                }
            }
        ];
    }
})();