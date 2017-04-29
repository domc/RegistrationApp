var registerService;
(function (registerService) {
    RegisterApp
        .factory('Register', ['$resource', function ($resource) {
            // Return the resource,
            return $resource('/api/Register/');
        }]);
})(registerService || (registerService = {}));
