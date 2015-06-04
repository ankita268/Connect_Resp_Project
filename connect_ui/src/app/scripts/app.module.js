/**
 * @ngdoc overview
 * @name connectuiApp
 * @description
 * # connectuiApp
 *
 * Main module of the application.
 */
(function () {
    'use strict';

    angular.module('connectuiApp', [
		'nw.core', 
		'connectuiApp.filter',
		'connectuiApp.sorting',
		'connectuiApp.dropdown',
		'connectuiApp.header',
		'connectuiApp.menu',
		'connectuiApp.footer',		
		'connectuiApp.home',
		'connectuiApp.book',
		'connectuiApp.role',
		'connectuiApp.kitchensink',
		'connectuiApp.nomination',
		'connectuiApp.nominationperiod',
		'connectuiApp.statement',
		'connectuiApp.group',
		'connectuiApp.program',
		'connectuiApp.linefill',
		'connectuiApp.delivery',
		'connectuiApp.util'
    ]);

})();