/**
 * @ngdoc function
 * @name connectuiApp.linefill: Linefill
 * @description
 * # Linefill
 * Module of the connectuiApp.linefill
 */
(function() {
    'use strict';
    angular.module('connectuiApp.linefill', [
		'nw.core'
	]).run(function(moduleHelper) {
		moduleHelper.getModuleConfig('linefill');
	});
})();