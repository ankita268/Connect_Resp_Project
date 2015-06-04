/* jshint -W117, -W030 */
describe('MenuController', function() {
    var controller;

    beforeEach(function() {
        bard.appModule('connectuiApp.menu');
        bard.inject('$controller', '$log', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('MenuController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Menu controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function() {
            it('should have title of Menu', function() {
                expect(controller.title).to.equal('Menu');
            });

            it('should have logged "Activated"', function() {
                expect($log.info.logs).to.match(/Activated/);
            });
        });
    });
});