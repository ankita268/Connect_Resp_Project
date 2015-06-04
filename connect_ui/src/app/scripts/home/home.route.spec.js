/* jshint -W117, -W030 */
describe('home routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/home/home.html';

        beforeEach(function() {
            module('connectuiApp.home', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state home to url /home ', function() {
            expect($state.href('home', {})).to.equal('/home');
        });

        it('should map /home route to home View template', function () {
            expect($state.get('home').templateUrl).to.equal(view);
        });

        it('of home should work with $state.go', function () {
            $state.go('home');
            $rootScope.$apply();
            expect($state.is('home'));
        });
    });
});