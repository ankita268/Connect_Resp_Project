/**
 * @ngdoc function
 * @name connectuiApp.book:BookController
 * @description
 * # BookController
 * Controller of the connectuiApp.book
 */
(function() {
	'use strict';
	
	angular.module('connectuiApp.book')
			.controller('BookController', BookController);
			
	BookController.$inject = ['$scope', 'BookService', 'logger', 'moduleHelper', 'DTInstances'];
	/* @ngInject */
	function BookController($scope, bookservice, logger, moduleHelperProvider, dtInstances) {
		/* jshint validthis: true */
		var vm = this;	
		var moduleTableConfig = moduleHelperProvider.getTableConfig('book');
		vm.title='Book';
		vm.busyMessage='Loading...'
		vm.books = [];
		vm.book = {
			"firstName":"4444444",
			"lastName":"ssssssssss",
			"name":"test",
			"status":"Rejected",
			"type":"unlock"
		};
		$scope.shipTos = ['322710', '322711', '322712','322713', '322714', '322715','322716', '322717', '322718','322719'];
		vm.sites = ['62518', '62517', '62516'];
		vm.edateOption = ['Recent', 'Effective Date Range'];
		vm.bookTableInstance = {};
		
		vm.selectedItemsValue = [];
		/* Loading books list module. */
		
		var rowGroupingconfig = {
				drawCallback: function(settings){
					    var api = this.api();
			            var rows = api.rows( {page:'current'} ).nodes();
			            var last=null;
			           
			            api.column(3, {page:'current'} ).data().each( function ( group, i ) {
				 	           if ( last !== group ) {
				                    $(rows).eq( i ).before(
				                        '<tr class="group appTitle"><td colspan="6">'+group+'</td></tr>'
				                    );
				                    last = group;
				                }
			            });
				}
		};
		
		angular.extend(moduleTableConfig.list, rowGroupingconfig);
		var bookTableConfig = moduleTableConfig.list;
		vm.filter = moduleTableConfig.filter;
		vm.bookFields = moduleTableConfig.create;
		vm.dtOptions = bookTableConfig;	
		vm.search = search;
		vm.dtInstanceCallback = dtInstanceCallback;
		
		vm.refresh = function() {
			vm.bookTableInstance.reloadData();
		}
		
		vm.submit = function(book) {
			console.log('Submit', book);
		}
		
		function dtInstanceCallback(dtInstance){
			vm.bookTableInstance = dtInstance;
		}
		function search(selectedItems){
			vm.selectedItemsValue = selectedItems;
			console.log('ctrl:', selectedItems);
		}
	}
})();