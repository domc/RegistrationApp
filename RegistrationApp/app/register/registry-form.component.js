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
                      self.registeredApplicantName = "";
                      self.classFriday = "";
                      self.formContainer = "";
                  });
              }
          }
      }]
  });