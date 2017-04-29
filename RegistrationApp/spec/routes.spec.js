describe("Testing routes...", function () {
    var $route, $rootScope, $location, $httpBackend;

    beforeEach(function () {
        module("RegisterApp");

        inject(function ($injector) {
            $route = $injector.get('$route');
            $rootScope = $injector.get('$rootScope');
            $location = $injector.get('$location');
            $httpBackend = $injector.get('$httpBackend');

            $httpBackend.when('GET', '<registry-form></registry-form>').respond('register');
        })
    })

    //tests
    it("should navigate to register form..", function () {
        // navigate using $apply to safely run the $digest cycle
        $rootScope.$apply(function () {
            $location.path('/register');
        });

        expect($location.path()).toBe('/register');
        expect($route.current.template).toBe('<registry-form></registry-form>');
    })

    it("should redirect to register form..", function () {
        $rootScope.$apply(function () {
            $location.path('/testing');
        });

        expect($location.path()).toBe('/register');
        expect($route.current.template).toBe('<registry-form></registry-form>');
    })
})