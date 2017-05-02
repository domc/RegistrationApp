'use strict';

RegisterApp.
      service('localDB', ['$indexedDB',
        function ($indexedDB) {

            this.deleteDataFromIndexedDB = function () {
                $indexedDB.openStore('applicants', (store) => {
                    store.clear();
                });
            }

            this.getDataFromIndexedDB = function () {
                return $indexedDB.openStore('applicants', (store) => {
                    return store.getAll().then((registeredUsers) => {
                        return registeredUsers;
                    });
                });
            }

            this.saveToIndexedDB = function (data) {
                $indexedDB.openStore('applicants', (store) => {
                    store.insert(data).then(function () {
                    });
                });
            }
        }
  ]);