/**
 * @ngdoc function
 * @name connectuiApp.delivery:DeliveryController
 * @description
 * # DeliveryController
 * Controller of the connectuiApp.delivery
 */
(function() {
	'use strict';
	
	angular.module('connectuiApp.delivery')
	.controller('DeliveryController', DeliveryController)
	
	DeliveryController.$inject = ['$scope', '$compile', 'logger', 'moduleHelper', 'DeliveryService', '$rootScope', '$state', 'BGXUtil'];

	/* @ngInject */
	function DeliveryController($scope, $compile, logger, moduleHelperProvider, deliveryService, $rootScope,  $state, BGXUtil) {
		
		/* jshint validthis: true */
		var vm = this;	
		var datasourceConfig = [];
		var httpConfig = [];
		var moduleTableConfig = [];
		var moduleConfig = [];
			
		/* Scope variables */
		vm.title = $state.current.title;
		vm.filter = [];
		vm.deliveryViewModel = {};
		vm.deliveryTableInstance = [];
		vm.table = {};
		vm.colspan;
		vm.deliveryViewFields = [];
		
		init();
		
		vm.download = download;
		vm.getPeriodData = getPeriodData;
		vm.submit = submit;
		vm.cancel = cancel;
		vm.getFilterDataList = getFilterDataList;
		vm.dtInstanceCallback = dtInstanceCallback;
		vm.search = search;
		vm.getData = getData;
		vm.applyTypeClass = applyTypeClass;
		
		
		/* ///////////////// Function Area /////////////////// */
		function cancel() {
			$state.go('root.delivery.view', {year:vm.deliveryViewModel.periodYear,month:vm.deliveryViewModel.periodMonth,id:vm.deliveryViewModel.carrierID});
		}
		
		function submit() {
			if(!vm.deliveryEditForm.$valid){
				logger.error('Error : '+vm.title+' - Please enter valid data');
			}
			else
			{
				var list = {
					method: datasourceConfig.update.method,
					url: datasourceConfig.update.url,
					timeout: httpConfig.timeout,
					data: vm.deliveryViewModel
				};

				deliveryService.update(list).then(function(response) {
					BGXUtil.handleResponse(response, vm.title);
					if (response.errorCode === 'success') {
						$state.go('root.delivery.view', {year:vm.deliveryViewModel.periodYear,month:vm.deliveryViewModel.periodMonth,id:vm.deliveryViewModel.carrierID});
					}
				},function(error) {
					logger.error('Error : '+vm.title+' - while submit data.', error);
				});
			}
		}
		
		function getData(mode) {
			vm.table = moduleConfig.view;
			vm.deliveryViewFields = moduleConfig.edit;
			
			angular.extend(vm.deliveryViewModel, {
					'periodYear': $state.params.year,
					'periodMonth': $state.params.month,
					'carrierID': $state.params.id
			});
			
			getPeriodData(vm.deliveryViewModel, mode)
		}

		function getPeriodData(deliveryViewModel, mode) {
			var list = {
				method: datasourceConfig.view.method,
				url: datasourceConfig.view.url,
				timeout: httpConfig.timeout,
				data: deliveryViewModel
			};
			
			deliveryService.getView(list).then(function(response) {
				if (response.errorCode === 'success') {
					deliveryViewModel.dataList = response.result.dataList;
					deliveryViewModel.period = response.result.period;
					deliveryViewModel.carrier = response.result.carrier;
				}
				else
				{
					BGXUtil.handleResponse(response, vm.title);
				}
			},function(error) {
				logger.error('Error : '+vm.title+' - while getting data for '+mode+'.', error);
			});
			return false;
		}
	
		function search(selectedItems) {
			moduleTableConfig.ajax.data.filter = angular.toJson(selectedItems);
		}
		
		function download(periodYear, periodMonth, carrierID) {
			document.getElementById('deliveryForm').action = datasourceConfig.downloadPDF.url;
			document.getElementById('exportPeriodYear').value = periodYear;
			document.getElementById('exportPeriodMonth').value = periodMonth;
			document.getElementById('exportCarrierID').value = carrierID;
			document.getElementById('deliveryForm').submit();
		}
		
		/********** Private Function Area *****************/
		function init() {
			moduleConfig = moduleHelperProvider.getTableConfig('delivery');
			datasourceConfig = moduleHelperProvider.getDataSource('delivery');
			httpConfig = moduleHelperProvider.getHttpConfig();
			moduleTableConfig = moduleConfig.list;
			vm.currentUserType = $rootScope.globals.currentUser.usertype;
			
			getDeliveryList();
		}

		function getDeliveryList() {
			var checkIfPeriodColumnExist=false;
			var checkIfIconColumnExist=false;
			var checkIfCarrierColumnExist=false;
			var columns = moduleTableConfig.aoColumns;
			_.each(columns, function(value, key, list){	
				if (value.sTitle == 'Period'){
					checkIfPeriodColumnExist=true;
				}
				if (value.mData == 'icon'){
					checkIfIconColumnExist=true;
				}
				if(value.mData == 'carrier'){
					checkIfCarrierColumnExist=true;
				}
			});
			
			if(!checkIfIconColumnExist){				
				columns.splice(0,0,{
					'mData':'icon',		
					'sTitle':'<i class=\"fa fa-download font18\"></i>',
					'sWidth':'50',
					'className': 'dt-body-center dt-head-center',
					'render':function (data, type, row) {
						return "<i class=\"fa fa-file-pdf-o font20 pdfIconColor cursor\" ng-click=\"vm.download('"+row.periodYear+"','"+row.periodMonth+"','"+row.carrierID+"')\"></i>";	
					}
				});
			}
			
			var width = vm.currentUserType == 'Internal' ? '200' : '0';
			if(!checkIfPeriodColumnExist){	
				columns.splice(1,0,{
					'mData':'period',		
					'sTitle':'Period',
					'sWidth':width,
					'render':function (data, type, row) {
						return "<a href=\"#\" class=\"ng-scope\" ui-sref=\"root.delivery.view({year:'"+row.periodYear+"',month:'"+row.periodMonth+"', id:'"+row.carrierID+"'})\">"+row.period+"</a>";
					}
				});
			}
			
			if(vm.currentUserType==='Internal' && !checkIfCarrierColumnExist) {
				columns.push({
					'mData':'carrier',	
					'sTitle':'Carrier'
				});
			}
			
			moduleTableConfig.createdRow = tblEventCreatedRow;
			vm.dtOptions = moduleTableConfig;
			colReorder: {
	            order: [ 6,1,2,3,4,5 ]
	        }
			
			return vm.dtOptions;					
		}
		
		function getFilterDataList(){
			var filterList = moduleConfig.filter;
			
			_.each(filterList, function(value, key, list){	
				if(vm.currentUserType==='Internal'){
						vm.filter.push(value);
				}else if(vm.currentUserType==='Carrier'){
					if(value.name != 'carrier')
						vm.filter.push(value);
				}
			});
			
			_.each(vm.filter, function(value, key, list) {
				var filterType= value.name;
				deliveryService.getFilterList(datasourceConfig[filterType]).then(function(response) {
					if (response.errorCode === 'success') {
						value.data =  response.aoData;					  
						if (value.options && value.options.fromData){ 
							value.options.fromData=value.data;
						}
						if (value.options && value.options.toData){ 
							value.options.toData=value.data;
						}
					}
					else
					{
						BGXUtil.handleResponse(response, vm.title); 
					}
				},function(error) {
					logger.error('Error : '+vm.title+' - while getting '+filterType+' list for filter popover.', error);
				});
			});
		}
		
		function applyTypeClass(options) {
			var result = null;
			switch(options.type) {
				case 'numeric': 
					result='numeric'; 
					break;
			}
			return result;
		}
		
		function dtInstanceCallback(dtInstance) {
			vm.deliveryTableInstance = dtInstance;
		}

		/* compile datatable html for each row with angular */
		function tblEventCreatedRow(row, data, index) {
			$compile(angular.element(row).contents())($scope);
		}
	}/* close controller */
	
})();
