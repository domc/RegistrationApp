RegisterApp.
  config(['$locationProvider', '$routeProvider', '$indexedDBProvider',
    function config($locationProvider, $routeProvider, $indexedDBProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
          when('/register', {
              template: '<registry-form></registry-form>'
          }).
          otherwise('/register');

        $indexedDBProvider.
            connection('RegistrationIndexedDB').
            upgradeDatabase(1, function(event, db, tx){
                var objStore = db.createObjectStore('applicants', { keyPath: 'ssn', autoIncrement: true });
      });
    }
  ]);