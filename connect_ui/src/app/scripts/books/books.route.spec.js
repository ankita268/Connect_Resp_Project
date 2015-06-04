/* jshint -W117, -W030 */
describe('book routes', function () {
    describe('state', function () {
        var controller;
        var view = 'scripts/books/book.html';

        beforeEach(function() {
            module('connectuiApp.book', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        it('should map state book to url /book ', function() {
            expect($state.href('book', {})).to.equal('/book');
        });

        it('should map /book route to book View template', function () {
            expect($state.get('book').templateUrl).to.equal(view);
        });

        it('of book should work with $state.go', function () {
            $state.go('book');
            $rootScope.$apply();
            expect($state.is('book'));
        });
    });
});