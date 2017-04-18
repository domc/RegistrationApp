RegisterApp.
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
          when('/register', {
              template: '<registry-form></registry-form>'
          }).
          otherwise('/register');
    }
  ]);