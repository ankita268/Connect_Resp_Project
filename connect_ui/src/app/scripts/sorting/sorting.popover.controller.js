/**
* @desc popover controller
* @example <div bgx-popover></div>
*/
(function() {
	'use strict';
	
	angular.module('connectuiApp.sorting')
    .controller('SortingController', SortingController);
	
	SortingController.$inject = ['$scope', '$element', 'logger'];
	/* @ngInject */
	function SortingController($scope, $element, logger) {
		var vm = this;		
	
		vm.sorting = [];
		vm.selectedValues = [];		
		
		vm.setSelectedValue = setSelectedValue;		
		vm.close = close;
		vm.isSelected = isSelected;
	
		init();
		
		/* Functions area*/
		function init(){
			vm.sorting = $scope.sorting;
			vm.sort = $scope.sort;
		}
		
		function setSelectedValue(dir, sort) {
			var element = {
				sort: sort,
				dir: dir
			};			
			if (!isKeyExists(element) && !isSelected(element.sort, element.dir)) {
				addElement(element);
				vm.sort(vm.selectedValues);
			}
			else if (isSelected(element.sort, element.dir)){
				removeElement(element);
				vm.sort(vm.selectedValues);
			}
		}		
		
		function close(){
			$element.popover('hide');
		}
		
		function isSelected(sort, dir){			
			var result = false;
			_.find(vm.selectedValues, function(object){ 
				if (object.sort == sort && object.dir == dir) {
					result = true;
					return true;
				}
			});			
			return result;
		}
		
		function addElement(element){
			if (!_.isEmpty(element.sort)) vm.selectedValues.push(element);
		}
		
		function removeElement(element){
			var removedList = _.reject(vm.selectedValues, function(object){ 
				if (object.sort == element.sort && object.dir == element.dir) {
					return true;
				}
			});
			vm.selectedValues = removedList;
		}
		function isKeyExists(item){			
			var result = false;
			_.find(vm.selectedValues, function(object){ 
				if (object.sort == item.sort) {
					result = true;
					return true;
				}
			});			
			return result;
		}
	}
})();