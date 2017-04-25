var app;
(function (app) {
    var config;
    (function (config_1) {
        "use strict";
        function config($routeProvider, $locationProvider, $indexedDBProvider) {
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
        config.$inject = ["$routeProvider", "$locationProvider", "$indexedDBProvider"];
        RegisterApp.config(config);
    })(config = app.config || (app.config = {}));
})(app || (app = {}));
//# sourceMappingURL=app.config.js.map