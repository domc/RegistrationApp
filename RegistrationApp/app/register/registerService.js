RegisterApp.factory('Register', ['$resource', function ($resource) {
        return $resource('/api/Register/');
    }]);
