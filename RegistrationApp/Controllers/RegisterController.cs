﻿using RegistrationApp.Models;
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
                    isDOBFriday=true    //TO DO
                };

                //Return status created + response data (Normally also returns the path to created object.)
                return Created("", registered);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        //Testing
        // GET
        // ..api/Register
        [ResponseType(typeof(IEnumerable<applicant>))]
        public IHttpActionResult Get()
        {
            var applicants = db.applicant;
            return Ok(applicants);
        }
    }
}
