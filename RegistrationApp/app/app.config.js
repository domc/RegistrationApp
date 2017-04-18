RegisterApp.
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
          when('/register', {
              template: '<p>Inside registry form.</p>'
          }).
          otherwise('/register');
    }
  ]);