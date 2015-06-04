/* jshint -W117, -W030 */
describe('header routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/header/header.html';

        beforeEach(function() {
            module('connectuiApp.header', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state header to url /header ', function() {
            expect($state.href('header', {})).to.equal('/header');
        });

        it('should map /header route to header View template', function () {
            expect($state.get('header').templateUrl).to.equal(view);
        });

        it('of header should work with $state.go', function () {
            $state.go('header');
            $rootScope.$apply();
            expect($state.is('header'));
        });
    });
});