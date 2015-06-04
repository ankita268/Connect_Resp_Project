(function() {
    'use strict';

    angular
        .module('connectuiApp.program')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }
	
	function getStates() {
        return [
			{
				state: 'root.program',				
				config: {
					url: '',
					abstract: true
				}
			},
			{
				state: 'root.program.list',
				config: {
					url: '/program/list',
					views: {
						'container@': {
							templateUrl: 'scripts/program/list.html',
							controller: 'ProgramController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'Program',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Program',
						group: 'program'
                    }
				}
			},
			{
				state: 'root.program.addnewurl',
				config: {
					url: '/program/addnewurl',
					views: {
						'container@': {
							templateUrl: 'scripts/program/add.html',
							controller: 'ProgramController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'Program - Add New URL',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Program',
						group: 'program'
                    }
				}
			},,
			{
				state: 'root.program.uploadfile',
				config: {
					url: '/program/uploadfile',
					views: {
						'container@': {
							templateUrl: 'scripts/program/uploadfile.html',
							controller: 'ProgramController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'Program - Upload Document',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Program',
						group: 'program'
                    }
				}
			},{
				state: 'root.program.editDocument',
				config: {
					url: '/program/editDocument/:id',
					views: {
						'container@': {
							templateUrl: 'scripts/program/edit.html',
							controller: 'ProgramController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'Program - Edit Document',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Program',
						group: 'program'
                    }
				}
			},
			{
				state: 'root.program.view',
				config: {
					url: '/program/view/:id',
					views: {
						'container@': {
							templateUrl: 'scripts/program/view.html',
							controller: 'ProgramController',
							controllerAs: 'vm',					  
						}
					},                    
                    title: 'Program - View Document',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Program',
						group: 'program'
                    }
				}
			}
           
        ];
    }
})();