angular.
    module('registryForm').
    component('registryForm', {
        templateUrl: 'app/register/registry-form.template.html',
        controller: ['Register', '$indexedDB', "$filter", function RegistryFormController(Applicant: IApplicantResource, $indexedDB, $filter) {
            var self = this;

            //Max date value for datepicker.
            self.maxDate = new Date();

            //Registered user(s) retrieved from indexedDB, empty by default
            self.registeredApplicant = [];


            //Form submission
            self.saveApplicant = function (formValidationCheck) {
                if (formValidationCheck) {
                    var applicantsAge = self.getAge(this.DateOfBirth);
                    if (applicantsAge >= 21) {
                        //Prepare data for db
                        var parsedDate = $filter('date')(this.DateOfBirth, "yyyy-MM-dd");

                        let newApplicant: IApplicant = new Applicant({
                            Name: this.Name,
                            LastName: this.LastName,
                            Address: this.Address,
                            DateOfBirth: parsedDate
                        });

                        //Save data to local MYSQL database
                        Applicant.save(newApplicant, function (applicantResponse, ResponseHeaders) {
                            //Save data to indexedDB after the applicant is successfully stored in DB
                            let isDobFriday = applicantResponse.isDOBFriday;
                            let DateOfCreation = new Date();
                            self.saveToIndexedDB(newApplicant, DateOfCreation, isDobFriday);
                        }, function (httpResponse) {
                            self.deleteDataFromIndexedDB();
                        });
                    }
                    else {
                        //If applicant is under 21 years old, deny registration.
                        alert("You cannot register at this site!");
                        self.deleteDataFromIndexedDB();
                    }
                }
                else {
                    self.deleteDataFromIndexedDB();
                }
            }

            self.getAge = function (dateOfBirth) {
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

            //Saving applicants data in indexedDB
            self.saveToIndexedDB = function (applicant: IApplicant, DateOfCreation: Date, isDobFriday: boolean) {
                $indexedDB.openStore('applicants', function (store) {
                    store.clear();
                    store.insert(applicant);
                    store.insert({ "DateOfCreation": DateOfCreation });
                    store.insert({ "isDobFriday": isDobFriday });

                    store.getAll().then(function (registeredUsers) {
                        self.registeredApplicant = registeredUsers;
                    });
                });
            }

            //Get applicant's data from indexedDB
            self.getDataFromIndexedDB = function () {
                $indexedDB.openStore('applicants', function (store) {
                    store.getAll().then(function (registeredUsers) {
                        self.registeredApplicant = registeredUsers;
                    });
                });
            }
            //Check for data in indexedDB
            this.getDataFromIndexedDB();

            //Delete applicant currently saved in indexedDB
            self.deleteDataFromIndexedDB = function () {
                $indexedDB.openStore('applicants', function (store) {
                    store.clear().then(function () {
                        self.registeredApplicant = [];
                    });
                });
            }
        }]
    });