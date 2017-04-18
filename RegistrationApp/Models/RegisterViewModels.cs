using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RegistrationApp.Models
{
    public class RegisterViewModel
    {
        [Required]
        [StringLength(255, ErrorMessage = "The name entered is too long")]
        public string Name { get; set; }
        [Required]
        [StringLength(255, ErrorMessage = "The name entered is too long")]
        public string LastName { get; set; }
        [Required]
        [StringLength(255, ErrorMessage = "The address entered is too long")]
        public string Address { get; set; }
        [Required]
        public System.DateTime DateOfBirth { get; set; }
    }

    public class ApplicantRegistered
    {
        public string FullName { get; set; }
        public bool isDOBFriday { get; set; }
    }
}