angular.
  module('registryForm').
  component('registryForm', {
      templateUrl: 'app/register/registry-form.template.html',
      controller: ['Register', '$indexedDB', function RegistryFormController(Register, $indexedDB) {
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
                      var applicant = {
                          'Name': this.Name,
                          'LastName': this.LastName,
                          'Address': this.Address,
                          'DateOfBirth': this.DateOfBirth
                      };                      

                      //Save data to local MYSQL database
                      Register.save(applicant, function (applicantResponse, ResponseHeaders) {
                          //Save status of DOB(Friday?) in indexedDB
                          applicant.isDobFriday = applicantResponse.isDOBFriday;

                          //Save data to indexedDB after the applicant is successfully stored in DB
                          self.saveToIndexedDB(applicant);
                      }, function (httpResponse) {
                          console.log(httpResponse.status + " " + httpResponse.statusText);
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
          self.saveToIndexedDB = function (applicant) {
              $indexedDB.openStore('applicants', function (store) {
                  store.clear().then(function () {
                      //console.log("Cleared indexedDB");
                  });

                  store.insert(applicant).then(function (e) {
                      //console.log("Inserted the applicant into indexedDB");
                  });

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
                      //console.log("Cleared indexedDB");
                  });
              });
          }
      }]
  });