var app;
(function (app) {
    var components;
    (function (components) {
        "use strict";
        var RegistryFormController = (function () {
            function RegistryFormController(Applicant, $indexedDB, $filter) {
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
                                _this.saveToIndexedDB(newApplicant_1, DateOfCreation, isDobFriday);
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
                };
                this.saveToIndexedDB = function (applicant, DateOfCreation, isDobFriday) {
                    var _this = this;
                    this.$indexedDB.openStore('applicants', function (store) {
                        store.clear();
                        store.insert(applicant);
                        store.insert({ "DateOfCreation": DateOfCreation });
                        store.insert({ "isDobFriday": isDobFriday });
                        store.getAll().then(function (registeredUsers) {
                            _this.registeredApplicant = registeredUsers;
                        });
                    });
                };
                //Get applicant's data from indexedDB
                this.getDataFromIndexedDB = function () {
                    var _this = this;
                    this.$indexedDB.openStore('applicants', function (store) {
                        store.getAll().then(function (registeredUsers) {
                            _this.registeredApplicant = registeredUsers;
                        });
                    });
                };
                //Delete applicant currently saved in indexedDB
                this.deleteDataFromIndexedDB = function () {
                    var _this = this;
                    this.$indexedDB.openStore('applicants', function (store) {
                        store.clear().then(function () {
                            _this.registeredApplicant = [];
                        });
                    });
                };
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
            RegistryFormController.$inject = [
                'Register',
                '$indexedDB',
                "$filter"
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
    })(components = app.components || (app.components = {}));
})(app || (app = {}));
//# sourceMappingURL=registry-form.component.js.map