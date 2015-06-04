/**
* @desc popover directive
* @example <div bgx-popover></div>
*/
(function() {
	'use strict';
	
	angular.module('connectuiApp.sorting')
    .directive('bgxSortingPopover', bgxSortingPopOver);
	
	bgxSortingPopOver.$inject = ['$compile'];

	function bgxSortingPopOver($compile) {
		
		/* tab template */
		var sortingTpl = '<a class="modal-title fa fa-close pull-right font18 pad5 mobileShow" ng-click="vm.close()"></a>'
						+'<h6 class="mobileShow">&nbsp;</h6>'
						+'<div class="customTab1">'
						+'<ul ng-repeat="list in vm.sorting" class="padLeft0">'
						+'<li>'
						+'<span class="iconWidth"><i ng-show="vm.isSelected(list.sort, list.dir)" class="fa fa-check" ></i></span>'
						+'<div ng-click="vm.setSelectedValue(list.dir,list.sort)" class="btn padLeft0" >'
						+'&nbsp;{{ list.text }}'
						+'</div>'						
						+'</li>'
						+'</ul>' 
						+'</div>';	
		
		var directive = {
			restrict: 'A',
			transclude: true,
			link: link,
			template: "<span ng-transclude></span>",
			controller: 'SortingController',
			controllerAs: 'vm',
			scope: {
			  sorting: '=',
			  title: '@',
			  sort: '='
			}
		};		
		
		return directive;
		
		/* Function Area */
		function link(scope, element, attrs){
			var popOverContent;					
			var vm = scope.vm;
			
			if (vm.sorting) {
				var html = sortingTpl;
				popOverContent = $compile(html)(scope);
			}
					
			var options = {
				content: popOverContent,
				placement: "bottom",
				html: true,
				title: vm.title
			};
			$(element).popover(options);
		}
	}
})();