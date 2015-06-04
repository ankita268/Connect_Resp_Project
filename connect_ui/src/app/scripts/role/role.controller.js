/**
 * @ngdoc function
 * @name connectuiApp.role:RoleController
 * @description
 * # RoleController
 * Controller of the connectuiApp.role
 */
(function() {
	'use strict';
	
	angular.module('connectuiApp.role')
	.controller('RoleController', RoleController);

	RoleController.$inject = ['$scope', '$compile', 'logger', 'moduleHelper', 'DTInstances', 'DTOptionsBuilder', 'DTColumnBuilder', 'RoleService', '$stateParams', '$state'];
 
	/* @ngInject */
	function RoleController($scope, $compile, logger, moduleHelperProvider, dtInstances, dtOptionsBuilder, dtColumnBuilder, RoleService, $stateParams, $state) {
		
		/* jshint validthis: true */
		var vm = this;	
		var roleListConfig = [];
		var httpConfig = []; 
		var datasourceConfig = [];
		
		vm.role_id = $stateParams.role_id;//role id for edit and view role
		vm.title = $state.current.title;
		/* Scope variables */
		//vm.title='Role';		
		vm.roles = [];
		vm.dtOptions = [];
		vm.roleTableInstance = [];
		vm.filter = [];
		vm.sorting = [];
		vm.roleExist='';
		vm.selectedItemsValue = [];
		
		vm.checkedboxEdit = []; //array which hold assignment values while click on edit
		vm.checkedboxView = []; //array which hold assignment values while click on view
		var assignmentArr = []; //assignment array
		
		//(key,value) pair for roletype array
		vm.roletypelist = [{
				'label': 'Internal',
				'value': 'Internal'
			},{
				'label': 'External',
				'value': 'External'
			}];
			
	//(key,value) pair for access level array			
		vm.roleAccessLevelist = [{
				'label': 'SCHEDULERS',
				'value': 'SCHEDULERS'
			}, {
				'label': 'PRODUCERS',
				'value': 'PRODUCERS'
			},{
				'label': 'ALL',
				'value': 'ALL'
			}, {
				'label': 'SHIPPERS',
				'value': 'SHIPPERS'
			} , {
				'label': 'CARRIERS',
				'value': 'CARRIERS'
			}];
		//(key,value) pair for status type array			
		vm.statustype = [{
				'label': 'Inactive',
				'value': 'Inactive'
			},{
				'label': 'New',
				'value': 'New'
			},{
				'label': 'Active',
				'value': 'Active'
			}, {
				'label': 'In Preparation',
				'value': 'In Preparation'
			}];
		//Start assignment content
		//array to key,value pair of checkbox
		vm.roles = [
			{id: 1, text: 'Lorem ipsum dolor sit amet-1'},
			{id: 2, text: 'Lorem ipsum dolor sit amet-2'},
			{id: 3, text: 'Lorem ipsum dolor sit amet-3'},
			{id: 4, text: 'Lorem ipsum dolor sit amet-4'}
		  ];
		
		
		
		init();
		
		vm.search = search;
		vm.sort = sort;
		vm.add = add;
		vm.update = update;
		vm.assign = assign;
		vm.submit=submit;
		vm.onCheck=onCheck;
		vm.cancel=cancel;
		vm.isChecked=isChecked;//checked box while edit role
		vm.editRole=editRole;
		vm.isExistRole=isExistRole;
		vm.getEditRole=getEditRole;
		vm.getViewRole=getViewRole;
		vm.dtInstanceCallback = dtInstanceCallback;
		
		/* ///////////////// Function Area /////////////////// */
		
		function search(selectedItems) {
			vm.selectedItemsValue = selectedItems;
			roleListConfig.ajax.data.filter = angular.toJson(selectedItems);
			//vm.roleTableInstance.reloadData();
		}
		
		function applyFilterClass(){
			if(vm.selectedItemsValue.length==0)
				return "fa fa-search font18 pad10 cursor";
			else
				return "fa fa-search font18 pad10 cursor green";
		}
		
		/* Start - AJAX call for server-side sorting */ 
		function sort(selectedItems){			
			roleListConfig.ajax.data.sort = angular.toJson(selectedItems);
		}
		/* End - AJAX call for server-side sorting */ 
		
		function add() {
			logger.info(vm.title+ "Role : add button clicked");
		}
		
		function update() {
			logger.info(vm.title+ "Role : update button clicked");
		}
		
		function assign(data) {
			logger.info(vm.title+ "Under Development - Planned");
		}
		
		/********** Private Function Area *****************/
		function init() {
			var roleModuleConfig = moduleHelperProvider.getTableConfig('role');
			httpConfig = moduleHelperProvider.getHttpConfig()
			roleListConfig = roleModuleConfig.list; 
			datasourceConfig = moduleHelperProvider.getDataSource('role');
			vm.filter = roleModuleConfig.filter;
			vm.sorting = roleModuleConfig.sorting;
			getRoleList();
		}
		
		function getRoleList() {			
			var checkIfColumnExist=false;
			var columns = roleListConfig.aoColumns;
			_.each(columns, function(value, key, list){	
				if (value.sTitle == 'Role Name'){
					checkIfColumnExist=true;
					return checkIfColumnExist;
				}
			});
					 	
			if(!checkIfColumnExist){				
				columns.splice(0,0,{
					"mData":"name",		
					"sTitle":"Role Name",
					"render":function (data, type, row) {
						/*return '<a href="#" class="ng-scope" ui-sref="root.role.view({role_id: '+row.id+'})" >'+row.name+'</a>';*/
						return '<a  class="ng-scope" href="role/'+row.id+'" >'+row.name+'</a>'; 
					}
				});
			}
			roleListConfig.createdRow = tblEventCreatedRow;
			vm.dtOptions = roleListConfig;
			colReorder: {
	            order: [ 6,1,2,3,4,5 ]
	        }
			
			return vm.dtOptions;					
		}
		
		function dtInstanceCallback(dtInstance){
			vm.roleTableInstance = dtInstance;
		}
		
		/* compile datatable html for each row with angular */
		function tblEventCreatedRow(row, data, index) {
			$compile(angular.element(row).contents())($scope);
		}
		
		//code for add new role(form submit)
		function submit(){	
			 //vm.$broadcast('show-errors-check-validity');
			 if (vm.addRoleForm.$valid) {
				var dataObj = {		
					"roleName" : btoa(vm.roleName),
					"roleDescription" : btoa(vm.roleDescription),
					"roletype" : btoa(vm.roletype),
					"accesslevel" : btoa(vm.accesslevel),
					"status" : btoa(vm.status),
					"assignment":btoa(assignmentArr)
				};
				var list = {
					method: datasourceConfig.add.method,
					url: datasourceConfig.add.url,
					timeout: httpConfig.timeout,
					data:dataObj	
				};
		
				RoleService.addRole(list).then(function(response) {	
					vm.createRole = response;				
				},function(error) {
					logger.error(vm.title+ "create role error ", error);
				});
			 }else{
				 return;
			 }
		}
		///Clear existing model value
		function cancel(){
				//vm.$broadcast('show-errors-reset');
				vm.roleName='';
				vm.comment='';
				vm.roletype='';
				vm.accesslevel='';
				vm.status='';
			}
		//get selected assignment(checkbox) value
		function onCheck(role){
			if(role.id){				
				assignmentArr.push(role.text);				
			}else{
				removeExistingItem(assignmentArr,role.text);				
			}
		}	
		
		//code for edit role(form submit)
		function getEditRole(id){
			vm.roleName='Shipper1';
			vm.comment='Shipper1 desc';
			vm.roletype='Internal';
			vm.accesslevel='SCHEDULERS';
			vm.status='Active';			
			vm.checkedboxEdit = [1,4];
		}
		
		//code for view role		
		function getViewRole(id){	
			vm.roleName='Shipper1';
			vm.comment='Shipper1 desc';
			vm.roletype='Internal';
			vm.accesslevel='SCHEDULERS';
			vm.status='Active';
			vm.checkedboxView = [
				{id: 1, text: 'Lorem ipsum dolor sit amet-1'},
				{id: 4, text: 'Lorem ipsum dolor sit amet-4'}
			  ];
		}
		 
		// take value from model once checked(Checkbox)
		function isChecked(id){
		      var match = false;
		      vm.checkedboxEdit.forEach(function(element){
				    //Object.keys(element).forEach(function(key){
				    	 if(vm.checkedboxEdit[element] == id.id){
					          match = true;
					     }
				  //  });
				});
		      return match;
		  }
	 
		//code for edit role(form submit)
		function editRole(){	
			 //vm.$broadcast('show-errors-check-validity');
			 if (vm.editRoleForm.$valid) {
				var dataObj = {		
					"roleName" : btoa(vm.roleName),
					"roleDescription" : btoa(vm.roleDescription),
					"roletype" : btoa(vm.roletype),
					"accesslevel" : btoa(vm.accesslevel),
					"status" : btoa(vm.status),
					"assignment":btoa(assignmentArr)
				};
				var list = {
					method: datasourceConfig.update.post,
					url: datasourceConfig.update.url,
					timeout: httpConfig.timeout,
					data:dataObj	
				};
		
			RoleService.editRole(list).then(function(response) {	
				vm.editRole = response;				
			},function(error) {
				logger.error(vm.title+ "create role error ", error);
			});
			 }else{			 
				 return;
			 }
		}
		///check for rolename exist in the list
		function isExistRole(roleName){
			 if (roleName) {
					var dataObj = {		
					"roleName" : btoa(vm.roleName)
					};
					var list = {
						method: datasourceConfig.isExistRolename.method,
						url: datasourceConfig.isExistRolename.url,
						timeout: httpConfig.timeout,
						data:dataObj	
					};
			
				RoleService.isExistRole(list).then(function(response) {
					vm.roleExist=response;
					return vm.roleExist;				
				},function(error) {
					logger.error(vm.title+ "Error while checking for roleName existance.", error);
				});
			 }
			 return false;
		}
	
		//remove duplicate assignment from array
		function removeExistingItem(array, itemToRemove) {		   
			array.forEach(function(element){
			    Object.keys(element).forEach(function(key){
			    	 if (array[key] === itemToRemove) {
				            // Remove array item at current index
				            array.splice(key, 1);
				            key--;
				        }
			    });
			});
		    return array;
		}
	} /* close controller */
	
})();
