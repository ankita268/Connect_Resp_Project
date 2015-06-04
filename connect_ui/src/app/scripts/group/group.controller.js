/**
 * @ngdoc function
 * @name connectuiApp.group:GroupController
 * @description
 * # GroupController
 * Controller of the connectuiApp.group
 */
(function() {
	'use strict';
	
	angular.module('connectuiApp.group')
	.controller('GroupController', GroupController);

	GroupController.$inject = ['$scope', '$compile', 'logger','$filter', 'moduleHelper', 'DTInstances', 'DTOptionsBuilder', 'DTColumnBuilder', 'GroupService'];

	/* @ngInject */
	function GroupController($scope, $compile, logger, $filter, moduleHelperProvider, dtInstances, dtOptionsBuilder, dtColumnBuilder,GroupService) {
		
		/* jshint validthis: true */
		var vm = this;	
		var groupListConfig = [];
		var httpConfig = [];
				
		/* Scope variables */
		vm.title='Group';		
		vm.groups = [];
		vm.dtOptions = [];
		vm.groupTableInstance = [];
		vm.filter = [];
		vm.sorting = [];
		vm.selectedItemsValue = [];
		
		//(key,value) pair for roletype array
		vm.grouptypelist = [{
				'label': 'Internal',
				'value': 'Internal'
			},{
				'label': 'External',
				'value': 'External'
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
		
		var rowGroupingconfig = {
				drawCallback: function(settings){
					    var api = this.api();
			            var rows = api.rows( {page:'current'} ).nodes();
			            var last=null;
			           
			            api.column(2, {page:'current'} ).data().each( function ( group, i ) {
				 	           if ( last !== group ) {
				                    $(rows).eq( i ).before(
				                        '<tr class="group appTitle"><td colspan="6">'+group+'</td></tr>'
				                    );
				                    last = group;
				                }
			            });
				}
		};
  
		init();
		
		vm.search = search;
		vm.sort = sort;
		vm.add = add;
		vm.update = update;
		vm.assign = assign;
		vm.submit=submit;
		vm.onCheck=onCheck;
		vm.dtInstanceCallback = dtInstanceCallback;
		
		/* ///////////////// Function Area /////////////////// */
		
		function search(selectedItems) {
			vm.selectedItemsValue = selectedItems;
			groupListConfig.ajax.data.filter = angular.toJson(selectedItems);
		}
		
		function applyFilterClass(){
			if(vm.selectedItemsValue.length==0)
				return "fa fa-search font18 pad10 cursor";
			else
				return "fa fa-search font18 pad10 cursor green";
		}
		
		/* Start - AJAX call for server-side sorting */ 
		function sort(selectedItems){			
			groupListConfig.ajax.data.sort = angular.toJson(selectedItems);
		}
		/* End - AJAX call for server-side sorting */ 
		
		function add() {
			logger.info("Group : add button clicked");
		}
		
		function update() {
			logger.info("Group : update button clicked");
		}
		
		function assign(data) {
			logger.info("Under Development - Planned");
		}
		
		/********** Private Function Area *****************/
		function init() {
			var groupModuleConfig = moduleHelperProvider.getTableConfig('group');
			httpConfig = moduleHelperProvider.getHttpConfig();
			//angular.extend(groupModuleConfig.list, rowGroupingconfig);
			groupListConfig = groupModuleConfig.list; 
			vm.filter = groupModuleConfig.filter;
			vm.sorting = groupModuleConfig.sorting;
			getGroupList();
		}
		
		function getGroupList() {			
			var checkIfColumnExist=false;
			var columns = groupListConfig.aoColumns;
			_.each(columns, function(value, key, list){	
				if (value.sTitle == 'Creation Date'){
					checkIfColumnExist=true;
					return checkIfColumnExist;
				}				
			});
						
			if(!checkIfColumnExist){
				columns.push({
					"mData":"null",		
					"sTitle":"Creation Date",
					"className": "dt-body-center dt-head-center",
					"render":function (data, type, row) {
						var cdate=new Date(row.createddatetime);
						return $filter('date')(cdate,'MM/dd/yyyy hh:mm:ss'); 
					}
				},{
					"mData":"null",		
					"sTitle":"Last Modified",
					"className": "dt-body-center dt-head-center",
					"render":function (data, type, row) {
						var mdate=new Date(row.modifieddatetime);
						return $filter('date')(mdate,'MM/dd/yyyy hh:mm:ss'); 
					}
				},{
					"mData":"null",		
					"sTitle":"Users",
					"className": "dt-body-center dt-head-center",
					"render":function (data, type, row) {
						var html = '<i type="button" class="cursor fa fa-user-plus font16" ng-click="vm.assign(data)">';						
						if(row.usersCount=='0'){							
							return html; 
						}
						else return row.usersCount;
					}
				});				
			}			
			groupListConfig.createdRow = tblEventCreatedRow;
			vm.dtOptions = groupListConfig;
			return vm.dtOptions;					
		}
		
		function dtInstanceCallback(dtInstance){
			vm.groupTableInstance = dtInstance;
		}
		
		/* compile datatable html for each row with angular */
		function tblEventCreatedRow(row, data, index) {
			$compile(angular.element(row).contents())($scope);
		}
	
		//code for add new role(form submit)
		function submit(isValid){		
		
				var dataObj = {		
					"roleName" : btoa(vm.roleName),
					"roleDescription" : btoa(vm.roleDescription),
					"roletype" : btoa(vm.roletype),
					"accesslevel" : btoa(vm.accesslevel),
					"status" : btoa(vm.status)
					};
				var list = {
					method: 'POST',
					url: '../core/createrole',
					timeout: httpConfig.timeout,
					data:dataObj	
				};
		
			GroupService.addRole(list).then(function(data) {	
				vm.createRole = data;
			},function(error) {
				logger.error("create role error ", error);
			});
			vm.cancel=function(){
				vm.roleName='';
				vm.roleDescription='';
				vm.roletype='';
				vm.accesslvel='';
				vm.status='';
			}
				
		}
		
		//get selected assignment(checkbox) value
		function onCheck(todo){
			if(todo.id){
				
			}
		}		
	}/* close controller */
})();
