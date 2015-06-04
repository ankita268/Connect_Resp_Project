/* jshint -W117, -W030 */
describe('role routes', function () {
    describe('state', function () {
        var controller;
        var view = 'scripts/role/role.html';

        beforeEach(function() {
            module('connectuiApp.role', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state role to url /role ', function() {
            expect($state.href('role', {})).to.equal('/role');
        });

        it('should map /role route to role View template', function () {
            expect($state.get('role').templateUrl).to.equal(view);
        });

        it('of role should work with $state.go', function () {
            $state.go('role');
            $rootScope.$apply();
            expect($state.is('role'));
        });
    });
});