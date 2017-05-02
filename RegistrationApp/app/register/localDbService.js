var localDbService;
(function (localDbService_1) {
    var localDbService = (function () {
        function localDbService($indexedDB) {
            this.deleteDataFromIndexedDB = function () {
                this.indexedDBprovider.openStore('applicants', function (store) {
                    store.clear();
                });
            };
            this.getDataFromIndexedDB = function () {
                return this.indexedDBprovider.openStore('applicants', function (store) {
                    return store.getAll().then(function (registeredUsers) {
                        return registeredUsers;
                    });
                });
            };
            this.saveToIndexedDB = function (data) {
                this.indexedDBprovider.openStore('applicants', function (store) {
                    store.insert(data);
                });
            };
            this.indexedDBprovider = $indexedDB;
        }
        localDbService.$inject = ['$indexedDB'];
        return localDbService;
    }());
    localDbService_1.localDbService = localDbService;
    RegisterApp.
        service('localDB', localDbService);
})(localDbService || (localDbService = {}));
