/* jshint -W117, -W030 */
describe('footer routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/footer/footer.html';

        beforeEach(function() {
            module('connectuiApp.footer', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state footer to url /footer ', function() {
            expect($state.href('footer', {})).to.equal('/footer');
        });

        it('should map /footer route to footer View template', function () {
            expect($state.get('footer').templateUrl).to.equal(view);
        });

        it('of footer should work with $state.go', function () {
            $state.go('footer');
            $rootScope.$apply();
            expect($state.is('footer'));
        });
    });
});