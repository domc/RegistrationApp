// Suite
describe('Testing RegistryFormController', function () {   
    beforeEach(module('RegisterApp'));
    beforeEach(module('registryForm'));

    var $controller;
    var RegisterService;
    var filter;

    // Preparation for the tests
    beforeEach(inject(function ($componentController, $injector, $filter) {
        $controller = $componentController('registryForm');
        RegisterService = $injector.get('Register');
        filter=$filter("date");
    }));

    // Test (spec)
    describe('should calculate age', function () {
        it('returns apllicants age', function () {
            var DoB = '2007-01-01';
            var result = $controller.getAge(DoB);
            expect(result).toEqual(10);
        });
    });
});