//let ctrl = require("../app/register/registry-form.component");

// First argument to 'describe' (which is defined by Jasmine) is the testing module that will
// appear in test reports. The second argument is a callback containing the individual tests.

/*describe("registryFormControllerFunctions", function () {
    // The 'it' function of Jasmine defined an individual test. The first argument is
    // a description of the test that's appended to the module name. Because a module name
    // is typically a noun, like the name of the function being tested, the description for
    // an individual test is typically written in an action-data format. 

    it("calculates age from DoB", function () {
        // Invoke the unit being tested as necessary
        var DoB = '2007-01-01';
        //var result = ctrl.getAge(DoB);
        var result = getAge(DoB);

        // Check the results; "expect" and toEqual are Jasmine methods.
        expect(result).toEqual(10);
        done();
    });
});*/

// Suite
describe('Testing RegistryFormController', function () {   
    beforeEach(module('RegisterApp'));
    beforeEach(module('registryForm'));

    var $controller;
    var RegisterService;
    var filter;

    beforeEach(inject(function ($componentController, $injector, $filter) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = $componentController('registryForm');
        RegisterService = $injector.get('Register');
        filter=$filter("date");
    }));

    // Test (spec)
    describe('should calculate age', function () {
        it('returns apllicants age', function () {
            //var controller = $controller('RegistryFormController', { Applicant: registerService.IApplicantResource, $indexedDB: indexedDB, $filter: filter });
            var DoB = '2007-01-01';
            var result = $controller.getAge(DoB);
            expect(result).toEqual(10);

            DoB = '2005-01-01';
            result = $controller.getAge(DoB);
            expect(result).toEqual(12);
        });
    });
});