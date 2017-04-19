angular.
  module('registryForm').
  component('registryForm', {
      templateUrl: 'app/register/registry-form.template.html',
      controller: ['Register', function RegistryFormController(Register) {          
          var self = this;
          self.registeredApplicantName = "";
          self.formContainer = "";

          self.saveApplicant = function (formValidationCheck) {
              if (formValidationCheck) {
                  var applicantsAge = self.getAge(this.DateOfBirth);
                  if (applicantsAge >= 21) {
                      var applicant = {
                          'Name': this.Name,
                          'LastName': this.LastName,
                          'Address': this.Address,
                          'DateOfBirth': this.DateOfBirth
                      };
                      Register.save(applicant, function (applicant, ResponseHeaders) {
                          self.registeredApplicantName = applicant.FullName;
                          self.registeredApplicantDob = applicant.isDOBFriday;
                          self.formContainer = "formContainer";
                          if (applicant.isDOBFriday) {
                              self.classFriday = "classFriday";
                          }
                          else {
                              self.classFriday = "";
                          }
                      }, function (httpResponse) {
                          console.log(httpResponse.status + " " + httpResponse.statusText);
                          self.clearAll();
                      });
                  }
                  else {
                      self.clearAll();
                      alert("You cannot register at this site!")
                  }
              }
              else {
                  self.clearAll();
              }
          }

          self.clearAll = function () {
              self.registeredApplicantName = "";
              self.classFriday = "";
              self.formContainer = "";
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
      }]
  });