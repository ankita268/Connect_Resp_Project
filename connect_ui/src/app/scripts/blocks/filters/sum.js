(function() {
    'use strict';

    angular.module('blocks.filters')
    .filter('sumByKey', sumOfKeyValues);
    
    function sumOfKeyValues() {
	    return function (data, key) {
	        if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
	            return 0;
	        }

	        var sum = 0;
	        for (var i = data.length - 1; i >= 0; i--) {
	            var value = data[i][key] ? data[i][key] : 0;
	        	sum += parseFloat(value);
	        }

	        return sum;
	    };
	}
})();