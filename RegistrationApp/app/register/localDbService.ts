module localDbService {
    export interface ILocalDbServiceService {
        deleteDataFromIndexedDB(): void;
        getDataFromIndexedDB(): any;
        saveToIndexedDB(data: any): void;
    }

    export class localDbService implements ILocalDbServiceService {
        static $inject = ['$indexedDB'];
        private indexedDBprovider: ng.IServiceProvider;

        constructor($indexedDB: ng.IServiceProvider) {
            this.indexedDBprovider = $indexedDB;
        }

        public deleteDataFromIndexedDB = function (): void {
            this.indexedDBprovider.openStore('applicants', (store) => {
                store.clear();
            });
        }

        public getDataFromIndexedDB = function (): any {
            return this.indexedDBprovider.openStore('applicants', (store) => {
                return store.getAll().then((registeredUsers) => {
                    return registeredUsers;
                });
            });
        }

        public saveToIndexedDB = function (data): void {
            this.indexedDBprovider.openStore('applicants', (store) => {
                store.insert(data);
            });
        }
    }
    RegisterApp.
        service('localDB', localDbService)
}