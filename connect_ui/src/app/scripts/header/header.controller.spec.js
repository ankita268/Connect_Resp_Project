/* jshint -W117, -W030 */
describe('HeaderController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('connectuiApp.header');
        bard.inject('$controller', '$log', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('HeaderController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Header controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Header', function() {
                expect(controller.title).to.equal('Header');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});