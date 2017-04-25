//module app.factories {
RegisterApp
    .factory('Register', ['$resource', function ($resource) {
        // Return the resource,
        return $resource('/api/Register/');
    }]);
//} 
//# sourceMappingURL=registerService.js.map