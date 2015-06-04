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
			'ProgramDialogController', ProgramDialogController);

	ProgramDialogController.$inject = ['moduleHelper', '$modalInstance', 'documentId', 'ProgramService','BGXUtil' ];

	/* @ngInject */
	function ProgramDialogController(moduleHelperProvider, $modalInstance, documentId, ProgramService,BGXUtil) {

		var vm = this;	
		vm.title="Program";
		vm.deleteDocument = deleteDocument;		
		var datasourceConfig = [];
		vm.close = close;
		/*close modal panel*/
		function close() {
			$modalInstance.close();
		}

		function deleteDocument() {
			datasourceConfig = moduleHelperProvider.getDataSource('program');
	    	var dataObj = {
                    "id": documentId
                }
                var list = {
                    method: datasourceConfig.deleteDocument.method,
                    url: datasourceConfig.deleteDocument.url,
                    timeout: 5000,
                    data: dataObj
                };

                ProgramService.getObject(list).then(function(response) {
                	BGXUtil.handleResponse(response,vm.title);
                	BGXUtil.goToListPage(response,'root.program.list'); 
                	vm.close();
                }, function(error) {
                    logger.error("Document is not deleted", error);
                    vm.close();
                });
           
   }

	}/* close controller */
})();