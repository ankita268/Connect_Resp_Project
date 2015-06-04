/**
 * @ngdoc function
 * @name connectuiApp.nominationperiod:NominationPeriodController
 * @description
 * # NominationPeriodController
 * Controller of the nominationperiod
 */
(function() {
	'use strict';
	
	angular.module('connectuiApp.nominationperiod')
	.controller('NominationPeriodController', NominationPeriodController);

	NominationPeriodController.$inject = ['$scope', '$compile', 'logger', 'moduleHelper', 'DTInstances', 'DTOptionsBuilder', 'DTColumnBuilder', 'NominationPeriodService', '$stateParams','$rootScope', '$modal','$location', '$sce', '$state'];

	/* @ngInject */
	function NominationPeriodController($scope, $compile, logger, moduleHelperProvider, dtInstances, dtOptionsBuilder, dtColumnBuilder, nominationPeriodService, $stateParams,$rootScope, $modal,$location, $sce, $state) {
		
		/* jshint validthis: true */
		var vm = this;	
		var nominationListConfig = [];
		var nominationModuleConfig = [];
		var datasourceConfig = [];
		var httpConfig = [];
				
		/* Scope variables */		
		vm.title = $state.current.title;
		vm.dtOptions = [];
		vm.tableInstance = [];
		vm.filter = [];
		vm.selectedItemsValue = [];		
		vm.currentUserType="";
		vm.model=[];
		
		
		
		init();
		
		vm.search = search;	
		vm.state=state;
		vm.dtInstanceCallback = dtInstanceCallback;	
		vm.getFilterDataList=getFilterDataList;
		
		/* ///////////////// Function Area /////////////////// */		
		function search(selectedItems) {
			vm.selectedItemsValue = selectedItems;
			nominationListConfig.ajax.data.filter = angular.toJson(selectedItems);			
		}
		
	
		/********** Private Function Area *****************/
		function init() {
			nominationModuleConfig = moduleHelperProvider.getTableConfig('nominationperiod');
			datasourceConfig = moduleHelperProvider.getDataSource('nominationperiod');
			vm.currentUserType=$rootScope.globals.currentUser.usertype;			
			httpConfig = moduleHelperProvider.getHttpConfig()
			
			nominationListConfig = nominationModuleConfig.list; 
			vm.filter = nominationModuleConfig.filter;
			vm.nominationViewFields = nominationModuleConfig.view;
			getFilterDataList();
			getList();
		}
		
		function getFilterDataList(){
			_.each(vm.filter, function(value, key, list){	
				var filterType= value.name;
				nominationPeriodService.periodList(datasourceConfig[filterType]).then(function(response) {
				
					if(filterType==='period'){	 
						 value.data = _.pluck(response, value.options.field);
						 value.options.fromData=value.data;
						 value.options.toData=value.data;
					 }else{
						//value.data = response.aoData;
					 	 value.data = response;
						 handleResponse(response);
					 }
				},function(error) {
					logger.error(vm.title+ " Error: Loading  Filter Data.", error);
				});
				
			});
		}
		
		function handleResponse(response){
			switch (response.errorCode) {
				case 'success': 
					logger.success(vm.title+ " Action Completed Successfully");
					break;
				case 'error':
					logger.error(vm.title+ " Error: ", response.errorMessage);
					break;
				case 'warning':
					logger.warning(vm.title+ " Warning: ", response.errorMessage);
					break;
				
			}
		}
		//get manage nomination period list
		function getList() {			
			var checkIfColumnExist=false;	
			var columns = nominationListConfig.aoColumns;
			_.find(columns, function(value, key, list){ 
					if (value.sTitle == 'Action'){
						checkIfColumnExist=true;
						return checkIfColumnExist;
					}
			});	
			
			if(!checkIfColumnExist){
				columns.splice(0,0,{
					"mData":"action",		
					"sTitle":"Action",
					"sWidth":"50",
					"render":function (data, type, row) {
						var html;						
						if(row.currentstatus==="Unlock")
							html='<span class="fa fa-lock liteGray padLeft10 cursor" ng-click="vm.state(\'' + row.currentstatus + '\',\'' + row.currentstatus + '\')"></span>';
						else
							html='<span class="fa fa-unlock liteGray padLeft10 cursor" ng-click="vm.state(\'' + row.id + '\',\'' + row.currentstatus + '\')"></span>';
						return html;
					}
				});				
			}
			nominationListConfig.createdRow = tblEventCreatedRow;
			vm.dtOptions = nominationListConfig;
			return vm.dtOptions;					
		}
		
		//change state based on id and current status
		function state(id,currentstatus){
			var list = {
					method: datasourceConfig.list.method,
					url: datasourceConfig.state.url,
					timeout: httpConfig.timeout,
					data: {						
						id:id,
						status:currentstatus
					}
				};		
			nominationPeriodService.state(list).then(function(response) {
				if(response!=null & response!=undefined){
					vm.nominationPeriodModel=response;
					logger.success(vm.title+ " Status successfully changed.");									
					vm.tableInstance.reloadData();
				}				
			},function(error) {
				logger.error(vm.title+ " State not able to chagne ", error);
			});
		}
	
		/* compile datatable html for each row with angular */
		function tblEventCreatedRow(row, data, index) {
			$compile(angular.element(row).contents())($scope);
		}
	
		function dtInstanceCallback(dtInstance){
			vm.tableInstance = dtInstance;
		}
		
	}/* close controller */
})();
