/**
 * @ngdoc function
 * @name connectuiApp.delivery:PipelineDeliveryModule
 * @description
 * # PipelineDeliveryModule
 * Module of the connectuiApp.delivery
 */
(function() {
    'use strict';
    angular.module('connectuiApp.delivery', [
		'nw.core'
	]).run(function(moduleHelper) {
		moduleHelper.getModuleConfig('delivery');
	});
})();