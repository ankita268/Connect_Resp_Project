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
	.directive('customPopover', function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {			
			scope.orderList=[			
					{"id": 1, "sortBy": "name", "dir":"Asc", "text": 'Role Name By Ascending' },
                    { "id": 2, "sortBy": "name", "dir":"Desc", "text": 'Role Name By Descending' },
                    { "id": 3, "sortBy": "type", "dir":"Asc", "text": 'Role Type By Ascending' },
                    { "id": 4, "sortBy": "type", "dir":"Desc", "text": 'Role Type By Descending' },
                    { "id": 5, "sortBy": "accessLevel", "dir":"Asc", "text": 'Access Level By Ascending' },
					{ "id": 6, "sortBy": "accessLevel", "dir":"Desc", "text": 'Access Level By Descending' },
					{ "id": 7, "sortBy": "usersCount", "dir":"Asc", "text": 'Users By Ascending' },
					{ "id": 8, "sortBy": "usersCount", "dir":"Desc", "text": 'Users By Descending' },
					{ "id": 9, "sortBy": "groupCount", "dir":"Asc", "text": 'Group By Ascending' },
					{ "id": 10,"sortBy": "groupCount", "dir":"Desc", "text": 'Group By Descending' }
					];
				
				var popOverContent=  "<a class=\"modal-title fa fa-close pull-right font18 pad5 mobileShow\" ng-click=\"closeSortPopover()\"></a>"
								 +"<h6 class=\"mobileShow\">&nbsp;</h6>"
								 +" <div class=\"customTab\" > "
								 +"<ul ng-repeat=\"list in orderList\">"
								 +"	<li id=\"temp{{list.id}} \"  class=\"iconWidth\">"		
								 +"<span> <i class=\"glyphicon glyphicon-ok green\" ng-show=\"autoScroll\" ></i> </span>"						 
								 +"<div ng-click=\"autoScroll = !autoScroll;getSelectedValue(autoScroll,list.dir,list.sortBy)\" class=\"btn\" > "
								 +"<span ng-show=\"!autoScroll\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{{ list.text }}"
								 +"</div>"
								 +"</li>"
								 +"</ul>" 
								 +" </div> ";
				var html =popOverContent
				popOverContent = $compile(html)(scope);  
				//ajax call for serverside sorting
				scope.getSelectedValue=function(autoScroll,dir,selectedVal){
						scope.vm.sort(selectedVal,dir);
				}
				
				scope.closeSortPopover = function(){
					 $(el).popover('hide');
				}
				
				var options = {
                    content: popOverContent,
                    placement: "bottom",
                    html: true
                };
                $(el).popover(options);	
				  
        }
    };
});
	
})();