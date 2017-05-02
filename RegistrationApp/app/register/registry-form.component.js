"use strict";
var RegistryFormComponent;
(function (RegistryFormComponent) {
    "use strict";
    var RegistryFormController = (function () {
        function RegistryFormController(Applicant, $filter, localDB) {
            this.saveApplicant = function (formValidationCheck) {
                var _this = this;
                if (formValidationCheck) {
                    var applicantsAge = this.getAge(this.DateOfBirth);
                    if (applicantsAge >= 21) {
                        //Prepare data for db
                        var parsedDate = this.$filter('date')(this.DateOfBirth, "yyyy-MM-dd");
                        var newApplicant_1 = new this.Applicant({
                            Name: this.Name,
                            LastName: this.LastName,
                            Address: this.Address,
                            DateOfBirth: parsedDate
                        });
                        //Save data to local MYSQL database
                        this.Applicant.save(newApplicant_1, function (applicantResponse, ResponseHeaders) {
                            //Save data to indexedDB after the applicant is successfully stored in DB
                            var isDobFriday = applicantResponse.isDOBFriday;
                            var DateOfCreation = new Date();
                            //Clear indexedDB
                            _this.deleteDataFromIndexedDB();
                            //Save current applicant
                            var arrToSave = [newApplicant_1, { "DateOfCreation": DateOfCreation }, { "isDobFriday": isDobFriday }];
                            _this.localDB.saveToIndexedDB(arrToSave);
                            //Refresh view
                            _this.getDataFromIndexedDB();
                        }, function () {
                            _this.deleteDataFromIndexedDB();
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
            };
            this.getAge = function (dateOfBirth) {
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
            };
            //Get applicant's data from indexedDB
            this.getDataFromIndexedDB = function () {
                var _this = this;
                this.localDB.getDataFromIndexedDB().then(function (data) {
                    _this.registeredApplicant = data;
                });
            };
            //Delete applicant currently saved in indexedDB
            this.deleteDataFromIndexedDB = function () {
                this.localDB.deleteDataFromIndexedDB();
                this.registeredApplicant = [];
            };
            this.Applicant = Applicant;
            this.$filter = $filter;
            this.localDB = localDB;
            //Max date value for datepicker.
            this.maxDate = new Date();
            //Registered user(s) retrieved from indexedDB, empty by default
            this.registeredApplicant = [];
            //Check for data in indexedDB
            this.getDataFromIndexedDB();
        }
        RegistryFormController.$inject = [
            'Register',
            "$filter",
            'localDB'
        ];
        return RegistryFormController;
    }());
    var RegistryForm = (function () {
        function RegistryForm() {
            this.controller = RegistryFormController;
            this.templateUrl = 'app/register/registry-form.template.html';
        }
        return RegistryForm;
    }());
    angular.module('registryForm').component('registryForm', new RegistryForm());
})(RegistryFormComponent || (RegistryFormComponent = {}));
