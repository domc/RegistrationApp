namespace app.config {
    "use strict";

    function config($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider, $indexedDBProvider) {
        $routeProvider.
            when('/register', {
                template: '<registry-form></registry-form>'
            }).
            otherwise({
                redirectTo: "/register"
            });

        $locationProvider.hashPrefix('!');

        $indexedDBProvider.
            connection('RegistrationIndexedDB').
            upgradeDatabase(1, function (event, db, tx) {
                var objStore = db.createObjectStore('applicants', { keyPath: 'ssn', autoIncrement: true });
            });
    }

    config.$inject = ["$routeProvider", "$locationProvider", "$indexedDBProvider"]

    RegisterApp.config(config);
}