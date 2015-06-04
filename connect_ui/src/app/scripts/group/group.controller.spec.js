/* jshint -W117, -W030 */
describe('GroupController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('connectuiApp.group');
        bard.inject('$controller', '$log', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('GroupController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Groups controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Groups', function() {
                expect(controller.title).to.equal('Groups');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});