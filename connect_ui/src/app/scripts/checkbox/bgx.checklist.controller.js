/**
 * @ngdoc function
 * @name connectuiApp.checklist-model:ChecklistCtrl
 * @description
 * # ChecklistCtrl
 * Controller of the connectuiApp.checklist-model
 */
(function(){
	
angular.module("connectuiApp.checklist-model").controller('ChecklistCtrl', ChecklistCtrl);
ChecklistCtrl.$inject = ['$scope'];
function ChecklistCtrl($scope)
{
  $scope.addItem = function() {
    $scope.items.push({id: $scope.items.length, text: 'item '+$scope.items.length});
  };

  $scope.removeItem = function() {
    $scope.items.pop();
  };  

  $scope.changeItems = function() {
    //$scope.items[0].id = 123;
    $scope.items[0].text = 'item 123';
    $scope.items1[0] = 'item 123';
  };    

  $scope.reorder = function() {
    var t = $scope.items[2];
    $scope.items[2] = $scope.items[3];
    $scope.items[3] = t;
  };

  $scope.check = function() {
    $scope.user.values1 = [1,4];
  };   
}
});