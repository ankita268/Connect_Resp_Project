/**
* @desc popover controller
* @example <div bgx-popover></div>
*/
(function() {
	'use strict';
	
	angular.module('connectuiApp.filter')
    .controller('FilterController', FilterController);
	
	FilterController.$inject = ['$scope', '$element', '$cookieStore', '$cookies', 'logger'];
	/* @ngInject */
	function FilterController($scope, $element, $cookieStore, $cookies, logger,$http) {
		var vm = this;
		
		vm.module = $scope.module;
		vm.filterTab = $scope.filter;
		vm.placement = $scope.placement;
		vm.filter = [];
		vm.selectedValues = [];
		vm.from = [];
		vm.to = [];
		vm.text = [];
		vm.setSelectedTab = setSelectedTab;
		vm.setSelectedValue = setSelectedValue;		
		vm.close = close;
		vm.removefilter = removefilter;
		vm.isSelected = isSelected;
		vm.getValues = getValues;		
		vm.isSearch = isSearch;
		vm.activeTabClass = activeTabClass;
		vm.searchAndClose = searchAndClose;
		vm.setMonthRange=setMonthRange;
		init();
		
		
		/* Functions area*/
		function init(){
			vm.filter = _.first(vm.filterTab);
			vm.search = $scope.search;
			vm.applyFilterClass = $scope.applyFilterClass;
			restoreFilters();	
		}
		function restoreFilters() {
			if ($cookieStore.get(vm.module) && !_.isEmpty($cookieStore.get(vm.module))) {
				$element.removeClass("fa fa-search font18 pad10 cursor").addClass("fa fa-search font18 pad10 cursor green");
				
				vm.selectedValues = $cookieStore.get(vm.module);
				
				_.each(vm.selectedValues, function(value, key, list){					
					if (s(value.key).startsWith("from_")) {
						vm.from[s(value.key).strRight("_").value()]=value.value;
					}
					if (s(value.key).startsWith("to_")) {
						vm.to[s(value.key).strRight("_").value()]=value.value;
					}
					if (s(value.key).startsWith("txt_")) {
						vm.text[s(value.key).strRight("_").value()]=value.value;
					}
				}, vm);
				
			}
			else {
				$element.removeClass("fa fa-search font18 pad10 cursor green").addClass("fa fa-search font18 pad10 cursor");
			}
		}
		
		function activeTabClass(tab){
			return vm.filter===tab ? "fa fa-angle-right pull-right font18" : "";
		}
		
		function setSelectedTab(type, value, tab) {			
			vm.filter = tab;
		}
		
		function setMonthRange(option,value) {
			if(value==null || value==undefined || value==''){
				vm.filter.options.fromData = vm.filter.data;
				vm.filter.options.toData = vm.filter.data;
			}else{
				if(option=='from'){
					if(vm.filter.options.fromData.indexOf(value)!=-1){
						vm.filter.options.toData = vm.filter.options.fromData.slice((vm.filter.options.fromData.indexOf(value)),vm.filter.options.fromData.length);
					}
				}else if(option=='to'){
					if(vm.filter.options.toData.indexOf(value)!=-1){
						vm.filter.options.fromData = vm.filter.data.slice(0,vm.filter.data.indexOf(value)+1);
					}
				}
			}
			
			
		}
		function setSelectedValue(type, name, option, list, value) {			
			if(type=='monthselect'){
				setMonthRange(option,value);			 
			}
			var element = getElement(type, name, option, value);
			
			if (type == 'list' && option == 'false'){
				removeKeyElement(element);
			}
			
			if (!isSelected(name, value)) {
				if (type == 'list') {
					addElement(element);
				}
				else if (type == 'text' || type == 'monthselect'){
					if (isKeyExists(element.key, element)){
						removeKeyElement(element);
					}
					addElement(element);
				}
				if (type == 'text') if (!_.isEmpty(element.value)) vm.search(vm.selectedValues);
			}
			else {
				if (type == 'list') {
					removeElement(element);
				}
				else if (type == 'text' && type == 'monthselect') {
					if (isKeyExists(element.key, element)){
						removeKeyElement(element);
					}
					addElement(element);					
				}
			}
			
			if (type == 'text') vm.searchAndClose(vm.selectedValues);
		}		
		
		function getElement(type, name, option, value) {
			var element = {
				key: name,
				value: value
			};		
			
			if (type == 'monthselect') {
				element = {
					key: option+'_'+name,
					value: value
				};
			}
			
			if (type == 'text') {
				element = {
						key: 'txt_'+name,
						value: value
				};
			}
			return element;
			
		}
		
		function close(){
			$element.popover('hide');
		}
		
		function searchAndClose(selectedValues){
			$element.popover('hide');
			var textObj = {};
			
			/* consider text box value if exists */
			if (!_.isEmpty(vm.filterTab)) {
				if (_.find(vm.filterTab, function(object){ 
					if (object.type==='text') {
						textObj = object;
						return true;
					}
				})) {
					if(!s(vm.text[textObj.name]).isBlank()) {
						var element = getElement(textObj.type, textObj.name, textObj.option, vm.text[textObj.name]);
						if (isKeyExists(element.key, element)){
							removeKeyElement(element);
						}
						addElement(element);	
					}
				}
			}
			
			if (!_.isEmpty(selectedValues)) {
				$cookieStore.put(vm.module, selectedValues);
				if ($cookieStore.get(vm.module) && !_.isEmpty($cookieStore.get(vm.module))) {
					$element.removeClass("fa fa-search font18 pad10 cursor").addClass("fa fa-search font18 pad10 cursor green");				
				}
				else {
					$element.removeClass("fa fa-search font18 pad10 cursor green").addClass("fa fa-search font18 pad10 cursor");
				}
				
				vm.search(selectedValues);
			}
			else {
				$cookieStore.put(vm.module, selectedValues);
				$element.removeClass("fa fa-search font18 pad10 cursor green").addClass("fa fa-search font18 pad10 cursor");
				logger.info('Filter values are not available, displaying default records');
				vm.search(selectedValues);
			}
		}
		
		
		function removefilter(name, key, type, value){
			var removedList = _.reject(vm.selectedValues, function(object){ 
				if (type === 'list'){
					if (object.key == key && object.value == value) {
						return true;
					}
				}
				else {	
					if (object.key == key) {
						return true;
					}
				}
			});
			
			vm.selectedValues = removedList;
			
			if(type==='text'){
				vm.text[name]='';
			}	
			if (type==='monthselect'){
				if (key === ('from_'+name)) vm.from[name]='';
				if (key === ('to_'+name)) vm.to[name]='';
			}
			
			searchAndClose(vm.selectedValues);
			
		}
		
		function removeElement(element){
			var removedList = _.reject(vm.selectedValues, function(object){ 
				if (object.key == element.key && object.value == element.value) {
					return true;
				}
			});
			vm.selectedValues = removedList;
		}
		
		function removeKeyElement(element){
			var removedList = _.reject(vm.selectedValues, function(object){ 
				if (object.key == element.key) {
					return true;
				}
			});
			vm.selectedValues = removedList;
		}
		
		function addElement(element){
			if (!_.isEmpty(element.value)) vm.selectedValues.push(element);
		}
		
		function isSelected(name, item){			
			var result = false;
			_.find(vm.selectedValues, function(object){ 
				if (object.key == name && object.value == item) {
					result = true;
					return true;
				}
			});			
			return result;
		}
		
		function isKeyExists(name, item){			
			var result = false;
			_.find(vm.selectedValues, function(object){ 
				if (object.key == name) {
					result = true;
					return true;
				}
			});			
			return result;
		}
		
		function getValues(name) {
			var result = [];
			_.each(vm.selectedValues, function(value, key, list){
				if (key == name) {
					result.push(value.value);
				}
			});			
			return result;
		}

		function isSearch(flag) {
			var result = false;
			if (flag == 'true') result=true;		
			return result;
		}
	}
})();
