/* global toastr:false, moment:false */
(function() {
    'use strict';
	
    angular
        .module('nw.core')
        .constant('toastr', toastr)
        .constant('moment', moment)
		.constant('appContext','core');

})();