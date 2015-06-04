/**
 * @ngdoc function
 * @name connectuiApp.nomination:ChangeLoglInstanceCtrl
 * @description
 * # ChangeLoglInstanceCtrl
 * Controller of the connectuiApp.nomination
 */
(function() {
	'use strict';

	angular.module('connectuiApp.nomination').controller(
			'NominationChangeLogController', NominationChangeLogController);

	NominationChangeLogController.$inject = [ '$scope', 'moduleHelper', '$modalInstance', 'changeId', 'NominationService' ];

	/* @ngInject */
	function NominationChangeLogController($scope, moduleHelperProvider, $modalInstance, changeId, NominationService) {

		var vm = this;		
		vm.changeId = changeId;		
		vm.changeLogList = [];
		var datasourceConfig = [];
		
		init();
		vm.close = close;
		/*close modal panel*/
		function close() {
			$modalInstance.close();
		}

		/*retrive nomination change log data based on id*/
		function init() {
			datasourceConfig = moduleHelperProvider.getDataSource('nomination');
			
			var list = {
				method : datasourceConfig.changelog.method,
				url :  datasourceConfig.changelog.url,
				timeout : '',
				data : changeId
			};
			NominationService.changelog(list).then(function(response) {
				vm.changeLogList = response;
			}, function(error) {
				logger.error("view nomination error ", error);
			});
		}

	}/* close controller */
})();