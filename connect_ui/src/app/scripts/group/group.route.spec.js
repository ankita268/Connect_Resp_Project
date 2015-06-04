/* jshint -W117, -W030 */
describe('group routes', function () {
    describe('state', function () {
        var controller;
        var view = 'scripts/group/group.html';

        beforeEach(function() {
            module('connectuiApp.group', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state group to url /group ', function() {
            expect($state.href('group', {})).to.equal('/group');
        });

        it('should map /group route to group View template', function () {
            expect($state.get('group').templateUrl).to.equal(view);
        });

        it('of group should work with $state.go', function () {
            $state.go('group');
            $rootScope.$apply();
            expect($state.is('group'));
        });
    });
});