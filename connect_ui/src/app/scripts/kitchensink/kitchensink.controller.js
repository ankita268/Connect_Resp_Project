/**
 * @ngdoc function
 * @name connectuiApp.kitchensink:BookController
 * @description
 * # KitchenSinkController
 * Controller of the connectuiApp.kitchensink
 */
(function() {
	'use strict';
	
	angular.module('connectuiApp.kitchensink')
			.controller('KitchenSinkController', KitchenSinkController);
			
	angular.module('connectuiApp.kitchensink')
			.controller('ModalInstanceCtrl', ModalInstanceCtrl);		
	

	KitchenSinkController.$inject = ['$scope', 'BookService', 'logger', 'moduleHelper', 'DTInstances','moduleconfigs','$modal', '$log'];
	/* @ngInject */
	function KitchenSinkController($scope, bookservice, logger, moduleHelperProvider, dtInstances,moduleconfigs,$modal,$log) {
		/* jshint validthis: true */
		var vm = this;	
		var moduleTableConfig = moduleHelperProvider.getTableConfig('kitchensink');
		vm.title='KitchenSink';
		vm.busyMessage='Loading...'
		vm.books = [];
		
		//======= Carousel  starts==========
			$scope.myInterval = 5000;
			  var slides = $scope.slides = [];
			  $scope.addSlide = function() {
				var newWidth2 = 600 + slides.length + 1;
				slides.push({
				  image: 'http://placekitten.com/' + newWidth2 + '/300',
				  text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
					['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
				});
			  };
			  for (var i=0; i<4; i++) {
				$scope.addSlide();
			  }
		
		//======= Carousel  Ends==========
					
			
		//======= Model starts==========
		
		  vm.items = ['item1', 'item2', 'item3'];

		 vm.openModel = function (size) {

			var modalInstance = $modal.open({
			  templateUrl: 'myModalContent.html',
			  controller: 'ModalInstanceCtrl',
			  size: size,
			  resolve: {
				items: function () {
				  return vm.items;
				}
			  }
			});

			modalInstance.result.then(function (selectedItem) {
			  $scope.selected = selectedItem;
			}, function () {
			  $log.info('Modal dismissed at: ' + new Date());
			});
		  };
		
		//======= Model Ends==========
		
		//======= Typeahead Code starts==========
		
		vm.selected = undefined;
		vm.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
		
		//======= Typeahead Code Ends==========
		
		//<!-- Tooltip Code Start-->
		$scope.dynamicTooltip = 'Hello, World!';
		$scope.dynamicTooltipText = 'dynamic';
		$scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';
		//<!-- Tooltip Code Ends-->
		
		//<!-- Timepicker Code Starts-->
		$scope.mytime = new Date();

		  $scope.hstep = 1;
		  $scope.mstep = 15;

		  $scope.options = {
			hstep: [1, 2, 3],
			mstep: [1, 5, 10, 15, 25, 30]
		  };

		  $scope.ismeridian = true;
		  $scope.toggleMode = function() {
			$scope.ismeridian = ! $scope.ismeridian;
		  };

		  $scope.update = function() {
			var d = new Date();
			d.setHours( 14 );
			d.setMinutes( 0 );
			$scope.mytime = d;
		  };

		  $scope.changed = function () {
			$log.log('Time changed to: ' + $scope.mytime);
		  };

		  $scope.clear = function() {
			$scope.mytime = null;
		  };
		//<!-- Timepicker Code Ends-->
		
		//<!-- Tabs Code start-->
		 $scope.tabs = [
				{ title:'Dynamic Title 1', content:'Dynamic content 1' },
			  ];

			  $scope.alertMe = function() {
				setTimeout(function() {
				  $window.alert('You\'ve selected the alert tab!');
				});
			  };
		//<!-- Tabs Code Ends-->
		
		//<!-- Rating Code Start-->
		  $scope.rate = 7;
		  $scope.max = 10;
		  $scope.isReadonly = false;

		  $scope.hoveringOver = function(value) {
			$scope.overStar = value;
			$scope.percent = 100 * (value / $scope.max);
		  };

		  $scope.ratingStates = [
			{stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
			{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
			{stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
			{stateOn: 'glyphicon-heart'},
			{stateOff: 'glyphicon-off'}
		  ];
		//<!-- Rating Code Ends-->
		
		//<!-- Progressbar Code Start-->
		
		vm.max = 200;

		  vm.random = function() {
			var value = Math.floor((Math.random() * 100) + 1);
			var type;

			if (value < 25) {
			  type = 'success';
			} else if (value < 50) {
			  type = 'info';
			} else if (value < 75) {
			  type = 'warning';
			} else {
			  type = 'danger';
			}

			vm.showWarning = (type === 'danger' || type === 'warning');

			vm.dynamic = value;
			vm.type = type;
		  };
		  vm.random();

		  vm.randomStacked = function() {
			vm.stacked = [];
			var types = ['success', 'info', 'warning', 'danger'];

			for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
				var index = Math.floor((Math.random() * 4));
				vm.stacked.push({
				  value: Math.floor((Math.random() * 30) + 1),
				  type: types[index]
				});
			}
		  };
		  vm.randomStacked();

		//<!-- Progressbar Code Ends-->
		
		//<!-- Popover Code Start-->
		
		vm.dynamicPopover = 'Hello, World!';
		vm.dynamicPopoverTitle = 'Title';
	
	    //<!-- Popover Code Ends-->
		
		//Pagination Code start
		  vm.totalItems = 64;
		  vm.currentPage = 4;

		  vm.setPage = function (pageNo) {
			vm.currentPage = pageNo;
		  };

		  vm.pageChanged = function() {
			$log.log('Page changed to: ' + vm.currentPage);
		  };

		  vm.maxSize = 5;
		  vm.bigTotalItems = 175;
		  vm.bigCurrentPage = 1;
		//Pagination Code Ends
		
		//<!-- Dropdown Code start-->
		
			vm.items = [
				'The first choice!',
				'And another choice for you.',
				'but wait! A third!'
			  ];

			  vm.status = {
				isopen: false
			  };

			  vm.toggled = function(open) {
				$log.log('Dropdown is now: ', open);
			  };

			  vm.toggleDropdown = function($event) {
				$event.preventDefault();
				$event.stopPropagation();
				vm.status.isopen = !vm.status.isopen;
			  };
		
		//<!-- Dropdown Code Ends-->
		
		 // Datepicker Code start-->
		 $scope.today = function() {
			$scope.dt = new Date();
		  };
		  $scope.today();

		  $scope.clear = function () {
			$scope.dt = null;
		  };

		  // Disable weekend selection
		  $scope.disabled = function(date, mode) {
			return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		  };

		  $scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		  };
		  $scope.toggleMin();

		  $scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		  };

		  $scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		  };

		  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		  $scope.format = $scope.formats[0];
		 // Datepicker Code Ends-->
		 
		 // Collapse Code start =======================================
			vm.isCollapsed = false;
		  // Collapse Code Ends =======================================
			 
	
		 // Buttons Code start =======================================
		 vm.singleModel = 1;

		  vm.radioModel = 'Middle';

		  vm.checkModel = {
			left: false,
			middle: true,
			right: false
		  };
		// Buttons Code Ends =======================================
		
		// Alerts Code start =======================================
		 vm.alerts = [
			{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
			{ type: 'success', msg: 'Well done! You successfully read this important alert message.' }
		  ];
		  
		  vm.closeAlert = function(index) {
			vm.alerts.splice(index, 1);
		  };
		// Alerts Code Ends =======================================
		
		// Accordion Code start =======================================
		 vm.oneAtATime = true;
		 vm.groups = [
			{
			  title: 'Tab-1',
			  content: 'Tab content 1'
			},
			{
			  title: 'Tab-2',
			  content: 'Tab content 2'
			}
		  ];

		  vm.items = ['Item 1', 'Item 2', 'Item 3'];

		  vm.addItem = function() {
			var newItemNo = vm.items.length + 1;
			vm.items.push('Item ' + newItemNo);
		  };

		  vm.status = {
			isFirstOpen: true,
			isFirstDisabled: false
		  };
		
		// Accordion Code Ends =======================================
		
		
			
	}
	
	ModalInstanceCtrl.$inject = ['$scope', '$modalInstance','items'];
	/* @ngInject */
	function ModalInstanceCtrl($scope, $modalInstance, items) {
		
		  $scope.items = items;
		  
		  $scope.selected = {
			item: $scope.items[0]
		  };

		  $scope.ok = function () {
			$modalInstance.close($scope.selected.item);
		  };

		  $scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		  };
	
	}
	
})();