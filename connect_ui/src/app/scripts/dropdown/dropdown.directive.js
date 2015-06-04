/**
 * @ngdoc function
 * @name connectuiApp.commondropdown:CommonDirective
 * @description
 * # bgxDropdown
 * Directive of the connectuiApp.commondropdown
 */
(function(){
"use strict";


angular.module('connectuiApp.dropdown').directive('bgxDropdown', bgxDropdown);
	function bgxDropdown($parse){
      return {
        restrict: 'A',
        priority: 100,
        transclude: true,
        scope: {
            themodel: '=ngModel',
            thearray: '@ngOptions',
    		thechange: '&ngChange',
            defaultval: '@bsSelectbox'
        },
		link: linkFunc,
        controller: CreateRoleController,
        controllerAs: 'vm',
        template:
            '<div class="bgx-selectbox btn-group">' +
            '<button class="btn dropdown-toggle" data-toggle="dropdown" type="button">' +
            '{{display}} ' +
            '<span class="caret"></span>' +
            '</button>' +
            '<ul class="dropdown-menu">' +
            '<li ng-show="defaultval">' +
            '<a href="javascript:" ng-click="change(false)"> <span>{{defaultval}}</span> </a>' +
            '</li>' +
            '<li ng-show="defaultval" class="divider"></li>' +
            '<li ng-repeat="itm in elements" ng-class="{active:itm.value==themodel}">' +
            '<a href="javascript:" ng-click="change(itm)">' +
            '<span>{{itm.label}}</span>' +
            '</a>' +
            '</li>' +
            '</ul>' +
            '<div style="display:none;" class="bgx-selectbox-transclude" ng-transclude></div>' +
            '</div>',
        
        replace: true
    };
	
	function linkFunc(scope, element, attrs) {
		
            scope.vm.display = '--';
            scope.vm.elements = [];
            attrs.$observe('bsSelectbox', function (value) {
                if (value) scope.vm.display = value;
            });
            attrs.$observe('ngOptions', function (value, element) {
                if (angular.isDefined(value)) {
                    var match, loc = {};
                    var NG_OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/;
                    if (match = value.match(NG_OPTIONS_REGEXP)) {
                        var displayFn = $parse(match[2] || match[1]),
                            valueName = match[4] || match[6],
                            valueFn = $parse(match[2] ? match[1] : valueName),
                            valuesFn = $parse(match[7]);
						scope.vm.$watch(function(){ return valuesFn(scope.vm.$parent); }, function(newVal) {
							var collection = newVal || [];
							scope.vm.elements = [];
							angular.forEach(collection, function (value, key) {
								loc[valueName] = collection[key];
								scope.vm.elements.push({
									'label': displayFn(scope.vm.$parent, loc),
									'value': valueFn(scope.vm.$parent, loc)
								});
							});
							scope.vm.setdefault();
						});
                    }
                }
            });
            scope.vm.$watch('themodel', function (newval, oldval) {
                scope.vm.setdefault();
				if(angular.isFunction(scope.vm.thechange) && (newval != oldval)) {
					scope.vm.thechange();
				}
            });
            scope.vm.setdefault = function () {
                angular.forEach(scope.vm.elements, function (value, key) {
                    if (value.value == scope.vm.themodel) scope.vm.display = value.label;
                });
            }
            scope.vm.change = function (itm) {
                if (!itm) {
                    scope.vm.display = scope.vm.defaultval;
                    scope.vm.themodel = "";
                } else {
                    scope.vm.display = itm.label;
                    scope.vm.themodel = itm.value;
                }
            }
            var elements = element.find(".bgx-selectbox-transclude").children();
            if (angular.isObject(elements) && elements.length) {
                    angular.forEach(elements, function (value, key) {
                        scope.vm.elements.push({
                            'label': value.innerText,
                            'value': value.value
                        });
                    });
                    scope.vm.setdefault();
            }
        }
}
})();