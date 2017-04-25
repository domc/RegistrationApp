module app.components {
    "use strict";

    export class RegistryFormController {
    	public maxDate: Date;
        public registeredApplicant: any;
        private Applicant: IApplicantResource;
        private $filter: ng.IFilterProvider;
        private $indexedDB: any;

    	public static $inject = [
            'Register',
            '$indexedDB',
            "$filter"
        ];

        constructor(Applicant: IApplicantResource, $indexedDB, $filter: ng.IFilterProvider) {
            this.Applicant = Applicant;
            this.$filter = $filter;
            this.$indexedDB = $indexedDB;

            //Max date value for datepicker.
            this.maxDate = new Date();

            //Registered user(s) retrieved from indexedDB, empty by default
            this.registeredApplicant = [];

            //Check for data in indexedDB
            this.getDataFromIndexedDB();
        }

        public saveApplicant = function (formValidationCheck: boolean): void {
            if (formValidationCheck) {
                let applicantsAge = this.getAge(this.DateOfBirth);
                if (applicantsAge >= 21) {
                    //Prepare data for db
                    let parsedDate = this.$filter('date')(this.DateOfBirth, "yyyy-MM-dd");

                    let newApplicant: IApplicant = new this.Applicant({
                        Name: this.Name,
                        LastName: this.LastName,
                        Address: this.Address,
                        DateOfBirth: parsedDate
                    });

                    //Save data to local MYSQL database
                    this.Applicant.save(newApplicant, (applicantResponse, ResponseHeaders) => {
                        //Save data to indexedDB after the applicant is successfully stored in DB
                        let isDobFriday = applicantResponse.isDOBFriday;
                        let DateOfCreation = new Date();
                        this.saveToIndexedDB(newApplicant, DateOfCreation, isDobFriday);
                    }, () => {
                        this.deleteDataFromIndexedDB();
                    });
                }
                else {
                    //If applicant is under 21 years old, deny registration.
                    alert("You cannot register at this site!");
                    this.deleteDataFromIndexedDB();
                }
            }
            else {
                this.deleteDataFromIndexedDB();
            }
        }

        private getAge = function (dateOfBirth: Date): number {
            var today = new Date();
            var age = today.getFullYear() - dateOfBirth.getFullYear();
            var monthdifference = today.getMonth() - dateOfBirth.getMonth();
            if (monthdifference < 0) {
                age--;
            }
            else if (monthdifference == 0) {
                if (today.getDate() - dateOfBirth.getDate() < 0) {
                    age--;
                }
            }
            return age;
        }

        private saveToIndexedDB = function (applicant: IApplicant, DateOfCreation: Date, isDobFriday: boolean): void {
            this.$indexedDB.openStore('applicants', (store) => {
                store.clear();
                store.insert(applicant);
                store.insert({ "DateOfCreation": DateOfCreation });
                store.insert({ "isDobFriday": isDobFriday });

                store.getAll().then((registeredUsers) => {
                    this.registeredApplicant = registeredUsers;
                });
            });
        }

        //Get applicant's data from indexedDB
        private getDataFromIndexedDB = function (): void {
            this.$indexedDB.openStore('applicants', (store) => {
                store.getAll().then((registeredUsers) => {
                    this.registeredApplicant = registeredUsers;
                });
            });
        }

        //Delete applicant currently saved in indexedDB
        public deleteDataFromIndexedDB = function (): void {
            this.$indexedDB.openStore('applicants', (store) => {
                store.clear().then(() => {
                    this.registeredApplicant = [];
                });
            });
        }
    }

    class RegistryForm implements ng.IComponentOptions {

        public controller: any;
        public templateUrl: string;

        constructor() {
            this.controller = RegistryFormController;
            this.templateUrl = 'app/register/registry-form.template.html';
        }

    }

    angular.module('registryForm').component('registryForm', new RegistryForm());
}