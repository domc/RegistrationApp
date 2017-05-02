import regService = require("registerService");

namespace RegistryFormComponent {
    "use strict";

    class RegistryFormController {
    	public maxDate: Date;
        public registeredApplicant: any;
        private Applicant: regService.IApplicantResource;
        private $filter: ng.IFilterProvider;
        private $indexedDB: any;
        private localDB: any;

    	public static $inject = [
            'Register',
            '$indexedDB',
            "$filter",
            'localDB'
        ];

        constructor(Applicant: regService.IApplicantResource, $indexedDB, $filter: ng.IFilterProvider, localDB) {
            this.Applicant = Applicant;
            this.$filter = $filter;
            this.$indexedDB = $indexedDB;
            this.localDB = localDB;

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

                    let newApplicant: regService.IApplicant = new this.Applicant({
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

                        //Clear indexedDB
                        this.deleteDataFromIndexedDB();

                        //Save current applicant
                        let arrToSave = [newApplicant, { "DateOfCreation": DateOfCreation }, { "isDobFriday": isDobFriday }];
                        this.localDB.saveToIndexedDB(arrToSave);

                        //Refresh view
                        this.getDataFromIndexedDB();
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

        private getAge = function (dateOfBirth: string): number {
            var dob = new Date(dateOfBirth);
            var today = new Date();
            var age = today.getFullYear() - dob.getFullYear();
            var monthdifference = today.getMonth() - dob.getMonth();
            if (monthdifference < 0) {
                age--;
            }
            else if (monthdifference == 0) {
                if (today.getDate() - dob.getDate() < 0) {
                    age--;
                }
            }
            return age;
        }

        //Get applicant's data from indexedDB
        private getDataFromIndexedDB = function (): void {            
            this.localDB.getDataFromIndexedDB().then((data) => {
                this.registeredApplicant = data;
            });
        }

        //Delete applicant currently saved in indexedDB
        public deleteDataFromIndexedDB = function (): void {
            this.localDB.deleteDataFromIndexedDB();
            this.registeredApplicant = [];
        };
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