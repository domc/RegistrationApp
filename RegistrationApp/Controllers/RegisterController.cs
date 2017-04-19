using RegistrationApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace RegistrationApp.Controllers
{
    public class RegisterController : ApiController
    {
        indexeddbEntities db = new indexeddbEntities();

        // POST
        // ..api/Register/
        [ResponseType(typeof(ApplicantRegistered))]
        public IHttpActionResult Post(RegisterViewModel registrationForm)
        {
            if (ModelState.IsValid)
            {
                //temporary fix (md-datepicker sends wrong value)
                registrationForm.DateOfBirth=registrationForm.DateOfBirth.AddHours(2);

                //Create entry in DB
                applicant applicant = new applicant
                {
                    Name=registrationForm.Name,
                    LastName=registrationForm.LastName,
                    Address=registrationForm.Address,
                    DateOfBirth=registrationForm.DateOfBirth,
                    DateOfCreation=DateTime.Now
                };

                db.applicant.Add(applicant);
                db.SaveChanges();

                //Set up return model
                ApplicantRegistered registered = new ApplicantRegistered
                {
                    FullName = registrationForm.Name + " " + registrationForm.LastName,
                    isDOBFriday= ((int)registrationForm.DateOfBirth.DayOfWeek == 5) ? true : false //true if DOB is friday
                };

                //Return status created + response data (Normally also returns the path to created object (CreatedAtRoute).)
                return Created("", registered);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        /*Testing
        // GET
        // ..api/Register
        [ResponseType(typeof(IEnumerable<applicant>))]
        public IHttpActionResult Get()
        {
            //Set up return model(list)
            var registeredApplicants = from regApplicant in db.applicant
                          select new RegisterViewModel()
                          {
                              Name=regApplicant.Name,
                              LastName=regApplicant.LastName,
                              Address=regApplicant.Address,
                              DateOfBirth=regApplicant.DateOfBirth
                          };

            return Ok(registeredApplicants);
        }*/
    }
}
