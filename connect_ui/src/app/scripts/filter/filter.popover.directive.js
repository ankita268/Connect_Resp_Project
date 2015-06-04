/**
* @desc popover directive
* @example <div bgx-popover></div>
*/
(function() {
	'use strict';
	
	angular.module('connectuiApp.filter')
    .directive('bgxFilterPopover', bgxFilterPopOver);
	
	bgxFilterPopOver.$inject = ['$compile'];

	function bgxFilterPopOver($compile) {
		
		/* tab template */
		var tabList = '<a class="modal-title fa fa-close pull-right font18 pad5 mobileShow" ng-click="vm.close()"></a>'
						+'<h6 class="mobileShow">&nbsp;</h6>'
						+'<div class="col-xs-4 customTab col30p">'
						+'<ul>'
						+'<li ng-repeat="tab in vm.filterTab">'
						+'<a ng-click="vm.setSelectedTab(tab.type, tab.name, tab)">{{ tab.displayName }}</a>'
						+'<i ng-class="vm.activeTabClass(tab)"></i>'
						+'</li>'
						+'</ul>'
						+'</div>';		
		
		var directive = {
			restrict: 'A',
			transclude: true,
			link: link,
			template: "<span ng-transclude></span>",
			controller: 'FilterController',
			controllerAs: 'vm',
			scope: {
			  filter: '=',
			  search: '=',
			  placement: '@',
			  module: '@',
			  applyFilterClass:"="
			}
		};		
		
		return directive;
		
		/* Function Area */
		function link(scope, element, attrs){
			var popOverContent;					
			var vm = scope.vm;
		
			if (vm.filter) {
				var html = getTemplate();
				popOverContent = $compile(html)(scope);
			}
					
			var options = {
				content: popOverContent,
				placement: scope.placement?scope.placement:'bottom',
				html: true
			};
			
			$(element).popover(options);
		}
		
		/* Private functions */
		function getTemplate() {
			var template = tabList;
			template = template 
			+'<div class="col-xs-8 pad10 customTabContent col70p" >'
			+'	<div ng-switch on="vm.filter.type">'
			+'		<ul ng-switch-when="list" >'
			+'			<input class="marTop10" ng-show="vm.isSearch(vm.filter.options.search)" type="text" ng-model="txt_vm.filter.type">'			
			+'			<li ng-repeat="item in vm.filter.data | filter: txt_vm.filter.type" class="h25">'
			+'			<span class="iconWidth"><i ng-show="vm.isSelected(vm.filter.name, item)" class="fa fa-check"></i></span>'
			+'				<a ng-click="vm.setSelectedValue(vm.filter.type, vm.filter.name, vm.filter.options.multiselect, vm.filter.data, item)" class="btn padLeft0">'
			+'				&nbsp{{ item }}'
			+'				</a>'
			+'			</li>'
			+'		</ul>'
			+'		<ul ng-switch-when="text" class="padLeft0">'
			+'			<li>'
			+'			<input type="text" class="form-control marTop10" ng-model="vm.text[vm.filter.name]" ng-keydown="$event.which === 13 && vm.setSelectedValue(vm.filter.type, vm.filter.name, vm.filter.options, vm.filter.data, vm.text[vm.filter.name])">'
			+'			</li>'
			+'		</ul>'
			+'		<ul ng-switch-when="monthselect" class="padLeft0">'
			+'			<li>'
			+'				<div class="form-group">'
		    +'  				<label for="from_vm.filter.name">From</label>'
		    +'  				<select class="form-control" ng-model="vm.from[vm.filter.name]" ng-options="item for item in vm.filter.options.fromData" ng-change="vm.setSelectedValue(vm.filter.type, vm.filter.name, vm.filter.options.from, vm.filter.data, vm.from[vm.filter.name])" >'
		    +'						<option value="">Select Month | Year</option>'			
		    +'					</select>'
		    +'					<label for="from_vm.filter.name">To</label>'
		    +'  				<select class="form-control" ng-model="vm.to[vm.filter.name]" ng-options="item for item in vm.filter.options.toData" ng-change="vm.setSelectedValue(vm.filter.type, vm.filter.name, vm.filter.options.to, vm.filter.data, vm.to[vm.filter.name])">'
		    +'						<option value="">Select Month | Year</option>'						
		    +'					</select>'
		    +'				</div>'
			+'			</li>'
			+'		</ul>'
			+'	</div>'
			+'</div>'
			+'<div class="float_left col-xs-12 borderTop1 pad10 overFlowy maxHeight95">'		
			+'	<ul class="padLeft0">'
			+'		<li class="lineH18 displayTableRow" ng-repeat="tab in vm.filterTab" ng-show="filteredSelectedValues.length > 0">'
			+'		<b class="textAlignLeft float_left">{{tab.displayName}}:&nbsp</b>'
			+'		<span class="float_left" ng-repeat="object in filteredSelectedValues = (vm.selectedValues | filter: {key:tab.name})">{{ object.value }}<a class="close font12" ng-click="vm.removefilter(tab.name, object.key, tab.type, object.value)">X</a>&nbsp;</span>'
			+'		</li>'
			+'	</ul>'
			+'</div>'
			+'<div class="float_left col-xs-12 padBtm10 padLeft10">'
			+'	<button class="btn btn-primary" ng-click="vm.searchAndClose(vm.selectedValues)">Apply</button>'
			+'</div>';
			
			return template;
		}
	}
})();
