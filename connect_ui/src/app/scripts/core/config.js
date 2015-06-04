(function () {
    'use strict';

    var core = angular.module('nw.core');

    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];
    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 0;
        toastr.options.extendedTimeOut = 0;
        toastr.options.tapToDismiss = false;
        toastr.options.positionClass = 'toast-top-full-width';
        toastr.options.closeButton = true;
    }

    var config = {
        appErrorPrefix: '[THPP - Pipeline Error] ',
        appTitle: 'THPP - Pipeline'
    };
	
	core.value('config', config);
	
	core.config(configure);

    configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider'];
    /* @ngInject */
    function configure($logProvider, routerHelperProvider, exceptionHandlerProvider) {
       
    	if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({docTitle: config.appTitle + ': '});
    }
    
    
    /* Http decorator and interceptor configurations */
    core.config(httpConfiguration);
    
    httpConfiguration.$inject = ['$provide', '$httpProvider'];
    
    function httpConfiguration ($provide, $httpProvider) {
    	
    	/* Use this when action based authorization needs to be implemented */
		//$httpProvider.responseInterceptors.push('authInterceptor');
        $httpProvider.interceptors.push('httpErrorsInterceptor');    	
    }
    
    /* formly configuration */
    core.config(formlyConfiguration);
    
    formlyConfiguration.$inject = ['formlyConfigProvider']
    
    function formlyConfiguration(formlyConfigProvider) {

        /*
        formlyConfigProvider.setWrapper([{
            template: [
                       '<div class="formly-template-wrapper form-group"',
                       'ng-class="{\'has-error\': options.validation.errorExistsAndShouldBeVisible}">',
                       '<label for="{{::id}}">{{options.templateOptions.label}} {{options.templateOptions.required ? \'*\' : \'\'}}</label>',
                       '<formly-transclude></formly-transclude>',
                       '<div class="validation"',
                       'ng-if="options.validation.errorExistsAndShouldBeVisible"',
                       'ng-messages="options.formControl.$error"',
                       'ng-messages-include="scripts/core/validation.html">',
                       '<div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">',
                       '{{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}',
                       '</div>',
                       '</div>',
                       '</div>'
                     ].join(' ')
          }]);
          */
         
         formlyConfigProvider.setWrapper({
            name: 'horizontalBootstrapLabel',
            template: [
              '<label for="{{::id}}" class="col-sm-4 control-label fontNormal">',
                '{{options.templateOptions.label}} {{options.templateOptions.required ? \'*\' : \'\'}}',
              '</label>',
              '<div class="col-sm-8">',
                '<formly-transclude></formly-transclude>',
                '<div class="validation"',
                'ng-if="options.validation.errorExistsAndShouldBeVisible"',
                'ng-messages="options.formControl.$error"',
                'ng-messages-include="scripts/core/validation.html">',
                '<div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">',
                '{{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}',
                '</div>',
                '</div>',
              '</div>'
            ].join(' ')
          });
        
        formlyConfigProvider.setType([{
            name: 'input',
            templateUrl: 'scripts/core/input-template.html',
            overwriteOk: true
          },{
	          name: 'horizontalInput',
	          extends: 'input',
	          wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']
          },{
              name: 'horizontalSelect',
              extends: 'select',
              wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']
          },{
        	name: 'horizontalDisplayField',
            template: [
				'<div for="{{::id}}" class="col-sm-4 padLeft0 labelTextRight">',
				'{{to.label}}',
				'</div>',
				'<label for="{{::id}}" class="col-sm-8 control-label padTop0 marBtm15 labelRight txtLeft">',
				'{{model[options.key] || to.placeholder }}',
				'</label>',
            ].join(' ')
        },{
        	name: 'horizontalDisplayFieldWithColour',
        	template: [
       				'<div for="{{::id}}" class="col-sm-4 padLeft0 labelTextRight">',
       				'{{to.label}}',
       				'</div>',
       				'<div for="{{::id}}" class="col-sm-8 padTop0 marBtm15 labelRight ">',
       				'<button type="button" class="btn btn-primary btn-xs {{model[options.key] | lowercase}} borderNone txtLeft">{{model[options.key]}}</button>',
       				'&nbsp<i class="fa fa-{{model[options.data.relatedKey]}} font18 darkGray"></i>',       				
       				'</div>',
             ].join(' ')
        },{
        	name: 'horizontalToggleField',
            template: [
				"<div for='{{::id}}' class='col-sm-4 control-label padLeft0 padTop3'>",
				"{{to.label}}",
				"</div>",
				"<div class='col-sm-8 labelRight'>",
				"	<div class='btn-group btn-toggle'>",
				"		<label ng-click=\"model[options.key] = !model[options.key]\" ng-class=\"(model[options.key])? 'btn btn-xs btn-default onOff' : 'btn btn-xs btn-default' \">{{options.data.option1}}</label>",
				"		<label ng-click=\"model[options.key] = !model[options.key]\" ng-class=\"!(model[options.key])? 'btn btn-xs btn-default onOff' : 'btn btn-xs btn-default' \">{{options.data.option2}}</label>",
				"	</div>",
				"</div>"
            ].join(' ')
        }]);
    }

})();