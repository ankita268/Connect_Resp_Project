/* jshint -W117, -W030 */
describe('RoleController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('connectuiApp.role');
        bard.inject('$controller', '$log', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('RoleController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Roles controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Roles', function() {
                expect(controller.title).to.equal('Roles');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});