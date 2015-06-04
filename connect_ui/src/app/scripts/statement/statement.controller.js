/**
 * @ngdoc function
 * @name connectuiApp.statement:StatementController
 * @description
 * # StatementController
 * Controller of the connectuiApp.statement
 */
(function() {
	'use strict';
	
	angular.module('connectuiApp.statement')
	.controller('StatementController', StatementController);

	StatementController.$inject = ['$scope', '$state', '$compile', '$sce', 'logger', 'moduleHelper', 'DTInstances','$rootScope','StatementService','$parse'];
 
	/* @ngInject */
	function StatementController($scope, $state, $compile, $sce, logger, moduleHelperProvider, dtInstances,$rootScope,statementService,$parse) {
		
		/* jshint validthis: true */
		var vm = this;	
		var moduleTableConfig = [];
		var moduleConfig = [];
		var datasourceConfig = [];
		var httpConfig = [];
		
		vm.title = $state.current.title;
		vm.dtOptions = [];
		vm.statementTableInstance = [];
		vm.filter = [];	
		vm.currentUserType="";
		
		init();
		
		vm.search = search;
		vm.download = download;
		vm.dtInstanceCallback = dtInstanceCallback;
		
		/* ///////////////// Function Area /////////////////// */
		
		function search(selectedItems) {
			moduleTableConfig.ajax.data.filter = angular.toJson(selectedItems);
		}
		
		function getList() {		
			var checkIfColumnExist=false;
			var columns = moduleTableConfig.aoColumns;
			_.each(columns, function(value, key, list){	
				if (value.sTitle == '<i class=\"fa fa-download font18 cursor\"></i>'){
					checkIfColumnExist=true;
					return checkIfColumnExist;
				}				
			});
			
			if(!checkIfColumnExist){
				columns.splice(0,0,{
					"mData":"downloadLink",	
					"sTitle":"<i class=\"fa fa-download font18 cursor\"></i>",
					"className": "dt-body-center dt-head-center",
					"sWidth":"40",
					"render":function (data, type, row) {
						return "<i class=\"fa fa-file-pdf-o font20 pdfIconColor cursor\" ng-click=\"vm.download('"+row.period+"','"+row.shipperNumber+"')\"></i>";						
					}
				});
				
				if(vm.currentUserType==='Internal'){
					columns.push({
						"mData":"shipperName",		
						"sTitle":"Shipper"
					});
				}
			}
			
			moduleTableConfig.createdRow = tblEventCreatedRow;
			vm.dtOptions = moduleTableConfig;
			return vm.dtOptions;
		}
		
		/* compile datatable html for each row with angular */
		function tblEventCreatedRow(row, data, index) {
			$compile(angular.element(row).contents())($scope);
		}
		
		function download(period,shipper){
			 document.getElementById("statementForm").action = '../core/statement/downloadPdf';
             document.getElementById('periodExportID').value = period;
             document.getElementById('shippernumberExportID').value = shipper;
             document.getElementById("statementForm").submit();
		}
		
		function dtInstanceCallback(dtInstance){
			vm.statementTableInstance = dtInstance;
		}
		
		
		function init() {
			moduleConfig = moduleHelperProvider.getTableConfig('statement');
			datasourceConfig = moduleHelperProvider.getDataSource('statement');
			httpConfig = moduleHelperProvider.getHttpConfig();
			moduleTableConfig = moduleConfig.list; 
			vm.currentUserType=$rootScope.globals.currentUser.usertype;
			var filterList = moduleConfig.filter;
			_.each(filterList, function(value, key, list){	
				if(vm.currentUserType==='Internal'){
						vm.filter.push(value);
				}	
				else if(vm.currentUserType==='Shipper'){
					if(value.name!='shipper')
						vm.filter.push(value);
				}
			});
			var element = [{
					key: 'type',
					value: 'Unlock'
				}];
			
			moduleTableConfig.ajax.data.filter = angular.toJson(element);
			getFilterDataList();
			getList(); 
		}
		
		function getFilterDataList(){ 
			_.each(vm.filter, function(value, key, list){
				statementService.getFilterList(datasourceConfig[value.name]).then(function(response) {
					  if(value.options.field)
					  {
						 value.data = _.pluck(response, value.options.field);
					  }else{
						  value.data =  response;
					  }
					  
					 if (value.options && value.options.fromData){ 
						 value.options.fromData=value.data;
					 }
					 if (value.options && value.options.toData){ 
						 value.options.toData=value.data;
					 }
					 
				},function(error) {
					logger.error("Error: Loading Linefill Filter "+value.name, error);
				});
			});
		}
		
		
	} /* close controller */
	
})();
