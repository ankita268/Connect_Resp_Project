/* jshint -W117, -W030 */
describe('menu routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/menu/menu.html';

        beforeEach(function() {
            module('connectuiApp.menu', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state menu to url /menu ', function() {
            expect($state.href('menu', {})).to.equal('/menu');
        });

        it('should map /menu route to menu View template', function () {
            expect($state.get('menu').templateUrl).to.equal(view);
        });

        it('of menu should work with $state.go', function () {
            $state.go('menu');
            $rootScope.$apply();
            expect($state.is('menu'));
        });
    });
});