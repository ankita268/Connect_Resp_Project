/**
 * @ngdoc function
 * @name connectuiApp.linefill:LinefillController
 * @description
 * # LinefillController
 * Controller of the connectuiApp.linefill
 */
(function() {
	'use strict';
	
	angular.module('connectuiApp.linefill')
	.controller('LinefillController', LinefillController);

	LinefillController.$inject = ['$scope', '$compile', '$sce', '$state', 'logger', 'moduleHelper', 'DTInstances','$rootScope','$stateParams','BGXUtil', 'LinefillService', '$parse'];
 
	/* @ngInject */
	function LinefillController($scope, $compile, $sce, $state, logger, moduleHelperProvider, dtInstances,$rootScope,$stateParams,BGXUtil,linefillService,$parse) {
		
		/* jshint validthis: true */
		var vm = this;	
		var moduleTableConfig = [];
		var moduleConfig = [];
		var datasourceConfig = [];
		var httpConfig = [];
		
		vm.title = $state.current.title;
		vm.dtOptions = [];
		vm.linefillTableInstance = [];
		vm.filter = [];	
		vm.currentUserType="";
		vm.linefillEditModel={};
		vm.linefillFields = [];
		init();
		vm.search = search;
		vm.download = download;
		vm.update = update;
		vm.submit = submit;
		vm.dtInstanceCallback = dtInstanceCallback;
		vm.loadStateParams = loadStateParams;
		/*vm.test = test;*/
		
		/* ///////////////// Function Area /////////////////// */
		
		
		function submit() {
			var editData = {
                    method: datasourceConfig.edit.method,
                    url: datasourceConfig.edit.url,
                    timeout: httpConfig.timeout,
                    data: vm.linefillEditModel
              };

			 linefillService.update(editData).then(function(response) {
                	BGXUtil.handleResponse(response,vm.title);
                	BGXUtil.goToListPage(response,'root.linefill.list');  
                }, function(error) {
                    logger.error("Linefill is not updated ", error);
                });
             
		}
		
		function loadStateParams() {
			  var dataObj = {
                    "periodYear": vm.periodYear,
                    "periodMonth": vm.periodMonth,
                    "shipperNumber" :vm.shipperNumber
                };
                var viewDoc = {
                    method: datasourceConfig.view.method,
                    url: datasourceConfig.view.url,
                    timeout: httpConfig.timeout,
                    data: dataObj
                };
                linefillService.getLinefill(viewDoc).then(function(response) {
                if ((response.errorCode == 'success')) {
                	vm.linefillEditModel = response.result;      
                }else{
                	logger.error("LineFill not found");
                }

            }, function(error) {
                logger.error("Error while fetching LineFill ", error);
            });
			
			
			//vm.linefillEditModel = $state.params.linefillEditModel;
		}
		
		function search(selectedItems) {
			moduleTableConfig.ajax.data.filter = angular.toJson(selectedItems);
		}
		
		function update(period, currentLinefill, newLinefill, shipperName, shipperNumber) {
			angular.extend(vm.linefillEditModel, { 
					"period": period,
					"currentLinefill": currentLinefill,
					"newLinefill": newLinefill,
					"shipperName": shipperName,
					"shipperNumber": shipperNumber
			});
			$state.go('root.linefill.edit', {linefillEditModel:vm.linefillEditModel});
		}
		
		function download(period,shipper){
			document.getElementById("linefillForm").action = '../core/linefill/downloadPdf';
            document.getElementById('periodExportID').value = period;
            document.getElementById('shippernumberExportID').value = shipper;
            document.getElementById("linefillForm").submit();
		}
		
		/* compile datatable html for each row with angular */
		function tblEventCreatedRow(row, data, index) {
			$compile(angular.element(row).contents())($scope);
		}		
		
		function dtInstanceCallback(dtInstance){
			vm.linefillTableInstance = dtInstance;
		}
				
		function init() {
			moduleConfig = moduleHelperProvider.getTableConfig('linefill');
			datasourceConfig = moduleHelperProvider.getDataSource('linefill');
			httpConfig = moduleHelperProvider.getHttpConfig();
			moduleTableConfig = moduleConfig.list; 
			
			vm.currentUserType = $rootScope.globals.currentUser.usertype;
			vm.linefillFields = moduleConfig.edit;
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
						return "<i class=\"fa fa-file-pdf-o font20 pdfIconColor cursor\" ng-click=\"vm.download('"+row.periodYear+"','"+row.shipperNumber+"')\"></i>";						
					}
				});
				
				if(vm.currentUserType==='Internal'){
					columns.splice(1,0,{
						"mData":"shipperName",		
						"sTitle":"Shipper"
					});
					
					columns.splice(1,0,{
						"mData":"period",	
						"sTitle":"Period",
						"render":function (data, type, row) {
							return "<a href=\"#\" class=\"ng-scope\" ui-sref=\"root.linefill.edit({year:'"+row.periodYear+"',month:'"+row.periodMonth+"', shipperNumber:'"+row.shipperNumber+"'})\">"+row.period+"</a>";
							 
						}
					});
				}
				else {
					columns.splice(1,0,{
						"mData":"period",	
						"sTitle":"Period",
						"render":function (data, type, row) {		
							return "<a href=\"#\" class=\"ng-scope\" ui-sref=\"root.linefill.edit({year:'"+row.periodYear+"',month:'"+row.periodMonth+"', shipperNumber:'"+row.shipperNumber+"'})\">"+row.period+"</a>";
							
						}
					});
				}
			}
			
			moduleTableConfig.createdRow = tblEventCreatedRow;
			vm.dtOptions = moduleTableConfig;
			return vm.dtOptions; 
		}
		
		function getFilterDataList(){
			_.each(vm.filter, function(value, key, list){	
				var filterType= value.name; 
				
					linefillService.getFilterList(datasourceConfig[value.name]).then(function(response) {
						  if(value.options.field)
						  {
							 value.data = _.pluck(response.aoData, value.options.field);
						  }else{
							  value.data =  response.aoData;
						  }
						  
						 if (value.options && value.options.fromData){ 
							 value.options.fromData=value.data;
						 }
						 if (value.options && value.options.toData){ 
							 value.options.toData=value.data;
						 }
						 
						 
					},function(error) {
						logger.error("Error: Loading  Filter Data"+value.name, error);
					});
				
				
			});
		}
		
	} /* close controller */
	
})();
