/**
 * @ngdoc function
 * @name connectuiApp.nomination:NominationController
 * @description
 * # NominationController
 * Controller of the connectuiApp.nomination
 */
(function() {
	'use strict';
	
	angular.module('connectuiApp.nomination')
	.controller('NominationController', NominationController);

	NominationController.$inject = ['$scope', '$compile', 'logger', 'moduleHelper', 'NominationService', '$stateParams','$rootScope', '$modal','$location','$sce','$state'];

	/* @ngInject */
	function NominationController($scope, $compile, logger, moduleHelperProvider, nominationService, $stateParams,$rootScope, $modal,$location,$sce,$state) {
		
		/* jshint validthis: true */
		var vm = this;	
		var nominationListConfig = [];
		var nominationModuleConfig = [];
		var datasourceConfig = [];
		var httpConfig = [];
				
		vm.id = $stateParams.id;// id for edit and view nomination
		
		/* Scope variables */
		vm.title = $state.current.title;		
		vm.nominations = [];		
		vm.nominationFields = [];
		vm.filter = [];
		
		///Filter values
		vm.shippers = [];
		vm.periods = [];
		
		vm.selectedItemsValue = [];
		vm.downloadXlsValue;
		vm.currentUserType="";
		vm.nominationModel=[];
		vm.table= {};
		
		vm.totalItems = 0;
		vm.maxSize = 5;
		vm.currentPage = 1;
		vm.itemsPerPage = 20;

		init();
		
		vm.search = search;
		vm.getFilterDataList=getFilterDataList;
		vm.add = add;
		vm.update = update;
		vm.assign = assign;
		vm.create = create;
		vm.onCheck = onCheck;
		vm.downloadXls = downloadXls;
		vm.getViewNomination = getViewNomination;
		vm.getCreateNominationConfig = getCreateNominationConfig;
		vm.nominationAccpet = nominationAccpet;
		vm.nominationReject = nominationReject;
		vm.applyTypeClass = applyTypeClass;
		vm.getEditNominationConfig=getEditNominationConfig;
		vm.pageChange = pageChange;
		vm.redirectToViewPage=redirectToViewPage;		
		
		
		/* ///////////////// Function Area /////////////////// */
		
		function search(selectedItems) {
			vm.selectedItemsValue = selectedItems;
			vm.currentPage = 1;
			getList();
		}
				
		function add() {
			logger.info(vm.title+" Nomination : add button clicked");
		}
		
		function create(nomination){
			if(vm.nominationCreateform.$valid){
				var list = {
						method: datasourceConfig.create.method,
						url: datasourceConfig.create.url,
						timeout: httpConfig.timeout,
						data: vm.nominationModel
					};
				nominationService.createNomination(list).then(function(response) {	
					if(response.success==='true'){
						logger.success(vm.title+" Nomination successfully created.");
						$state.go('root.nomination.list');
					}else{
						logger.error(vm.title+" Fail to create new nomination.");
					}	
				},function(error) {
					logger.error(vm.title+" create nomination error ", error);
				});
			}else{
				if(nomination.period && nomination.receiptLocation){
					logger.error(vm.title+" Input values are not in correct format.");
					return false;
				}					
				logger.error(vm.title+" Please fill required fields");
			}
		}
		
		function update() {
			if(vm.nominationEditform.$valid){
				var list = {
						method: datasourceConfig.update.method,
						url: datasourceConfig.update.url,
						timeout: httpConfig.timeout,
						data: vm.nominationModel
					};
				nominationService.updateNomination(list).then(function(response) {	
					if(response.success==='true'){
						logger.success(vm.title+ " Nomination successfully updated");
						$state.go('root.nomination.view');
					}else{
						logger.error(vm.title+ " Nomination not able to updated");
					}	
				},function(error) {
					logger.error(vm.title+ " update nomination error ", error);
				});
			}
		}
		
		/* common method for accept reject nomination*/
		function acceptReject(nominationModel,url){		
		 var list = {
				method: 'POST',
				url: url,
				timeout: httpConfig.timeout,
				data:vm.nominationModel	
			};
			nominationService.viewNomination(list).then(function(response) {
			 if(response!=null & response!=undefined){
					logger.success(vm.title+ " Status successfully changed.");
					return response;
			 }else{
					logger.error(vm.title+ " Not able to change status.");
			 }
		 },function(error) {
				logger.error(vm.title+ " error occured while changing status  ", error);
			});
		  }
		  /* nomination accepted*/
		  function nominationAccpet(nominationModel){
			  acceptReject(vm.nominationModel, datasourceConfig.accept.url);
		  }
		  /* nomination rejected*/
		  function nominationReject(nominationModel){
			  acceptReject(vm.nominationModel, datasourceConfig.reject.url);
		  }
		function redirectToViewPage(nomination){
			$state.go('root.nomination.view');
		}

		function assign(data) {
			logger.info(vm.title+ " Under Development - Planned");
		}
		
		function pageChange() {
			getList();
		}
	
		/********** Private Function Area *****************/
		function init() {
			nominationModuleConfig = moduleHelperProvider.getTableConfig('nomination');
			datasourceConfig = moduleHelperProvider.getDataSource('nomination');
			httpConfig = moduleHelperProvider.getHttpConfig();

			vm.currentUserType=$rootScope.globals.currentUser.usertype;
			vm.table = nominationModuleConfig.list;
			vm.filter = nominationModuleConfig.filter;
			vm.nominationViewFields = nominationModuleConfig.view;
			
			addShipperFilter();
			getList();
			getFilterDataList();
		}
		
		function getList(){
			var list = {
				method: datasourceConfig.list.method,
				url: datasourceConfig.list.url,
				timeout: httpConfig.timeout,
				data: {
						filter: vm.selectedItemsValue,
						currentPage: vm.currentPage,
						pageSize: vm.itemsPerPage
				}
			};
			nominationService.getList(list).then(function(response) {	
				vm.data = response.aoData;
				vm.totalItems =response.total;
			},function(error) {
				logger.error(vm.title+ " Nomination List not received ", error);
			});
		}
		
		function getDropDownList(src,obj){
			nominationService.getPeriodList(src).then(function(response) {
				var options=[{name:"Select",value:null}];
				_.each(response, function(value, key, list){
					options.push({name:value.key,value:value.value});
				});
				obj.templateOptions.options=options;
			},function(error) {
				logger.error(vm.title+ " Error while getting nomination dropdown values.", error);
			});
		}
		
		function getDropDownValue(src,obj){
			nominationService.getPeriodList(src).then(function(response) {
				var options=[{name:"Select",value:null}];
				_.each(response, function(value, key, list){
					 if( angular.equals(src.url,datasourceConfig.period.url) ) {
						 options.push({name:value.period,value:value.period});	 
					 }else{
						 options.push({name:value,value:value});
					 }
				});
				obj.templateOptions.options=options;
			},function(error) {
				logger.error(vm.title+ " Error while getting nomination dropdown values.", error);
			});
		}
		
		function getCreateNominationConfig(){
			vm.title='Nomination - New';
			vm.nominationFields = nominationModuleConfig.create;
			var checkIfFieldExist=false;
			_.each(vm.nominationFields, function(value, key, list){	
				if (value.key == 'shipper'){
					checkIfFieldExist=true;
					return checkIfFieldExist;
				}				
			});
			if(vm.currentUserType==='Internal' && !checkIfFieldExist){
				vm.nominationFields.splice(2,0,{
					"key": "shipper",
					"type": "horizontalSelect",
					"templateOptions": {
					  "label": "Shipper",
					  "placeholder": "Last Name",
					  "valueProp": "value",
					  "options": []
					}
				  });
			}
			_.each(vm.nominationFields, function(value, key, list){
				if(value.key==='period'){
					getDropDownValue(datasourceConfig.period,value);
				}
				else if(value.key==='receiptLocation'){
					getDropDownList(datasourceConfig.receiptLocation,value);
				}
				else if(value.key==='deliveryLocation'){
					getDropDownList(datasourceConfig.deliveryLocation,value);
				}
				else if(value.key==='shipper'){
					getDropDownValue(datasourceConfig.shipper,value);
				}
				else if(value.key==='commitedBPD' || value.key==='uncommitedBPD' || value.key==='lineFill' || value.key==='deliveredBarrelsPerDay'){
					value.templateOptions.pattern="^[1-9][0-9]{0,2}(?:,?[0-9]{3}){0,3}(?:\.[0-9]{1,2})?$";
				}
			});	
			vm.nominationModel={id: "Auto Generated",period:null,receiptLocation:null,status: "New",deliveryLocation:null,shipper:null};
		}
		
		function getEditNominationConfig(){
			vm.title = $state.current.title;	
			vm.nominationFields = nominationModuleConfig.edit;
			var checkIfFieldExist=false;
			_.each(vm.nominationFields, function(value, key, list){	
				if (value.key == 'shipper'){
					checkIfFieldExist=true;
					return checkIfFieldExist;
				}				
			});
			if(vm.currentUserType==='Internal' && !checkIfFieldExist){
				vm.nominationFields.splice(2,0,{
					"key": "shipper",
					"type": "horizontalDisplayField",
					"templateOptions": {
					  "label": "Shipper"
					}
				  });
			}
			_.each(vm.nominationFields, function(value, key, list){
				if(value.key==='period'){
					getDropDownList(datasourceConfig.period,value);
				}
				else if(value.key==='receiptLocation'){
					getDropDownList(datasourceConfig.receiptLocation,value);
				}
				else if(value.key==='deliveryLocation'){
					getDropDownList(datasourceConfig.deliveryLocation,value);
				}
				else if(value.key==='shipper'){
					getDropDownList(datasourceConfig.shipper,value);
				}
				else if(value.key==='commitedBPD' || value.key==='uncommitedBPD' || value.key==='lineFill' || value.key==='deliveredBarrelsPerDay'){
					value.templateOptions.pattern="^[1-9][0-9]{0,2}(?:,?[0-9]{3}){0,3}(?:\.[0-9]{1,2})?$";
				}
				//getDropDownList(datasourceConfig[value.key],value);
				
			});	
			getViewNomination(vm.id);
		}
		/* Add shipper filter in filterlist*/
		function addShipperFilter(){
			if(!checkShipperExistinArray("shipper")){
				vm.filter.push(
						{"name":"shipper","displayName":"Shipper",	"type":"list", "options":{ "multiselect":"true", "search":"true" }, "data": []}
					);
				}
		}
		
		function getFilterDataList(){
			_.each(vm.filter, function(value, key, list){
				var filterType= value.name;
				
				nominationService.commonAjaxCall(datasourceConfig[value.name]).then(function(response) {
					
					if(filterType==='period')
					{
					 value.data = _.pluck(response, value.options.field);
					 value.options.fromData=value.data;
					 value.options.toData=value.data;
					}else{
						//value.data = response.aoData;
						value.data = response;
						handleResponse(response);
					}
					
				},function(error) {
					logger.error(vm.title+ " Error in nominationation filter. ", error);
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
		
		/*Check if shipper already exist in filter list */
		function checkShipperExistinArray(name) {
		    return $.grep(vm.filter, function (n, i) {
		        return(n.name == name);
		    })[0];
		}
		
		function onCheck(todo){
			logger.info(vm.title+ "  Under Development - Planned");
		}	
		//download Xls file from nomation list
		function downloadXls(){		
			document.getElementById("downloadForm").action = datasourceConfig.download.url;            
            document.getElementById("downloadForm").submit();
		}
		
		//code for view nomination		
		function getViewNomination(id){		
			var dataObj = {		
					"id" : vm.id
				};
			var list = {
					method: datasourceConfig.view.method,
					url: datasourceConfig.view.url,
					timeout: httpConfig.timeout,
					data: dataObj
				};
		
			nominationService.singleViewNomination(list).then(function(response) {				
				vm.nominationModel=response;				
				},function(error) {
					logger.error(vm.title+ " error occured while view nomination ", error);
				});
		}
		//Modal panel to display viewchangelog
		  vm.openChanheLogPanel = function (size,id) {
		    var modalInstance = $modal.open({		     
		      templateUrl: 'scripts/nomination/changelog.html',
		      controller: 'NominationChangeLogController',
		      controllerAs: 'vm',
		      size: size,
		      resolve: {
		        changeId: function () {
		        	return vm.nominationModel;
		        }
		      }
		    });
				
		    modalInstance.result.then(function (selectedItem) {
		    	if(selectedItem!=null & selectedItem!=undefined){
		    		vm.selected = selectedItem;
		    	}
		    }, function () {});
		  };	  
		
		
		  function applyTypeClass(options){
			var result = null;
			switch(options.type) {
				case 'numeric': 
					result='numeric'; 
					break;
			}
			
			return result;
		  }
		  
		//Modal panel to display viewchangelog
		  vm.openUploadNomination = function (size,id) {
		    var modalInstance = $modal.open({		     
		      templateUrl: 'scripts/nomination/upload.html',
		      controller: 'NominationUploadController',
		      controllerAs: 'vm',
		      size: size,
		      resolve: {
		        
		      }
		    });
				
		    modalInstance.result.then(function (selectedItem) {
		      vm.selected = selectedItem;
		    }, function () {});
		  };
		  
		  
	}/* close controller */
	
})();
