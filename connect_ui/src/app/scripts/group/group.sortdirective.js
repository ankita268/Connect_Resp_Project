/**
 * @ngdoc function
 * @name connectuiApp.group:GroupSortDirective
 * @description
 * # GroupSortDirective
 * Controller of the connectuiApp.group
 */
(function() {
	'use strict';
	
	
	angular.module('connectuiApp.group')
	.directive('customPopover', function ($compile) {
		//vmrool is view model directive
		var vmrole = this;
		
    return {
        restrict: 'A',
        link: linkSortDirective
    };
	
	function linkSortDirective(vmrole, el, attrs) {
		vmrole.chagnge = chagnge;
		vmrole.getSelectedValue=getSelectedValue;
		vmrole.isfoundGroup=isfoundGroup;
		
			vmrole.orderList=[			
						{"id": 1, "sortBy": "name", "dir":"Asc", "text": 'Role Name By Ascending' },
						{ "id": 2, "sortBy": "name", "dir":"Desc", "text": 'Role Name By Descending' },
						{ "id": 3, "sortBy": "type", "dir":"Asc", "text": 'Role Type By Ascending' },
						{ "id": 4, "sortBy": "type", "dir":"Desc", "text": 'Role Type By Descending' },
						{ "id": 5, "sortBy": "accessLevel", "dir":"Asc", "text": 'Access Level By Ascending' },
						{ "id": 6, "sortBy": "accessLevel", "dir":"Desc", "text": 'Access Level By Descending' },
						{ "id": 7, "sortBy": "usersCount", "dir":"Asc", "text": 'Users By Ascending' },
						{ "id": 8, "sortBy": "usersCount", "dir":"Desc", "text": 'Users By Descending' },
						{ "id": 9, "sortBy": "groupCount", "dir":"Asc", "text": 'Group By Ascending' },
						{ "id": 10,"sortBy": "groupCount", "dir":"Desc", "text": 'Group By Descending' },
						{ "id": 11, "sortBy": "status", "dir":"Asc", "text": 'Status By Ascending' },
						{ "id": 12,"sortBy": "status", "dir":"Desc", "text": 'Status By Descending' }
					];
				vmrole.setselectedorder=[];
				var popOverContent=  " <div > "
									 +" <ul ng-repeat=\"list in orderList\">"
									 +"		<li  >"
									 +"			<div ng-click=\"autoScroll = !autoScroll;getSelectedValue(list.id,autoScroll,list.sortBy,list.dir)\" class=\"btn\" >"
									 +" 			<i id=\"temp{{list.id}} \" ng-class=\"{'glyphicon glyphicon-ok': \autoScroll, 'icon-autoscroll-disabled': !autoScroll}\"></i> "
									 +"				{{ list.text }}</div>"
									 +"		</li>"
									 +"		</ul>" 
									 +" </div> ";
				var html =popOverContent
				popOverContent = $compile(html)(vmrole);  
				//ajax call for serverside sorting
				function getSelectedValue(id,autoScroll,selectedVal,dir){						
						vmrole.chagnge(id,selectedVal,dir);						
						vmrole.vm.sortRole(autoScroll,selectedVal,dir);
				}
				
				//push selected element in json array
				function chagnge(id,selectedVal,dir){
					vmrole.setselectedorder.push({
					"id" : id,
					"sortBy" : selectedVal,
					"dir" : dir
					});
					
					return vmrole.isfoundGroup(id,selectedVal,dir);
				}
				//isfoundGroup check for selected element found in json array
				// return boolean
				function isfoundGroup(id,selectedVal,dir){
					var hasMatch =false;
					for (var index = 0; index < vmrole.setselectedorder.length; ++index) {
						 if(vmrole.setselectedorder[index].sortBy == selectedVal && vmrole.setselectedorder[index].dir!==dir){
							   angular.element("#temp"+id).style.display = 'inline';
							   angular.element("#temp"+vmrole.setselectedorder[index].id).style.display = 'none';
							   hasMatch = true;
							   break;
						 }
					}
					return hasMatch;
				}			
			
				var options = {
                    content: popOverContent,
                    placement: "bottom",
                    html: true
                    //title: vmrole.title
                };
                $(el).popover(options);	
				  
        }
});
	
})();