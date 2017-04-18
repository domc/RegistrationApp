angular.
  module('registryForm').
  component('registryForm', {
      templateUrl: 'app/register/registry-form.template.html',
      controller: ['Register', function RegistryFormController(Register) {
          this.saveApplicant = function (formValidationCheck) {
              if (formValidationCheck) {
                  var applicant = {
                      'Name': this.Name,
                      'LastName': this.LastName,
                      'Address': this.Address,
                      'DateOfBirth': this.DateOfBirth
                  };
                  Register.save(applicant, function (applicant, ResponseHeaders, statusCode, statusText) {
                      alert(statusCode + " " + statusText);
                  }, function (httpResponse) {
                      alert(httpResponse.status + " " + httpResponse.statusText);
                  });
              }
          }
      }]
  });