describe("Testing routes...", function () {
    var $route, $rootScope, $location;

    beforeEach(function () {
        module("RegisterApp");

        inject(function ($injector) {
            $route = $injector.get('$route');
            $rootScope = $injector.get('$rootScope');
            $location = $injector.get('$location');
        })
    })

    //tests
    it("should navigate to register form..", function () {
        // navigate using $apply to safely run the $digest cycle
        // Use $apply instead of $digest as it wraps your code inside a try/catch besides also calling $digest
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