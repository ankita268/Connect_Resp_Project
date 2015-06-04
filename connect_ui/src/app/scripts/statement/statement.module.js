/**
 * @ngdoc function
 * @name connectuiApp.statement: Statement
 * @description
 * # Statement
 * Module of the connectuiApp.statement
 */
(function() {
    'use strict';
    angular.module('connectuiApp.statement', [
		'nw.core'
	]).run(function(moduleHelper) {
		moduleHelper.getModuleConfig('statement');
	});
})();