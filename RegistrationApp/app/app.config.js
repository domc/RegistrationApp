var app;
(function (app) {
    var config;
    (function (config) {
        "use strict";
        function routes($routeProvider, $locationProvider, $indexedDBProvider) {
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
        routes.$inject = ["$routeProvider", "$locationProvider", "$indexedDBProvider"];
        RegisterApp
            .config(routes);
    })(config = app.config || (app.config = {}));
})(app || (app = {}));
