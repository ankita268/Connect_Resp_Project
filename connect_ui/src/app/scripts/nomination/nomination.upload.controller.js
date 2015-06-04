/**
 * @ngdoc function
 * @name connectuiApp.nomination:NominationUploadInstanceCtrl
 * @description
 * # NominationUploadInstanceCtrl
 * Controller of the connectuiApp.nomination
 */
(function() {
	'use strict';

	angular.module('connectuiApp.nomination').controller(
			'NominationUploadController', NominationUploadController);

	NominationUploadController.$inject = [ '$scope', '$modalInstance','logger','NominationService'];

	/* @ngInject */
	function NominationUploadController($scope, $modalInstance,logger,nominationService) {

		var vm = this;		
		vm.changeId = '';		
		vm.changeLogList = [];

		vm.upload = upload;
		vm.cancel = cancel;
		
		function upload() {
			
			var uplodedNomFile=document.querySelector('#documentFile');
			 if(uplodedNomFile.value==""){
				 logger.error("Please select file to upload.");
			 }
			 else{
				 var dataObj = {							
							"type":'file',
							"name":uplodedNomFile.value.replace(/^.*[\\\/]/, '')
					}
				 
				 var list = {
							method: 'POST',
							url: '../core/nomination/uploadXls',
							timeout: '',
							file: uplodedNomFile.files[0],
							headers:{
				                'Content-type': 'multipart/form-data'
					        }
						};
				 
				 nominationService.uploadXls(list);
				 $modalInstance.close();
			 }
		}
		
		function cancel(){
			$modalInstance.close();
		}

	}/* close controller */
})();