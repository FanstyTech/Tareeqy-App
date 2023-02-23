using DAL.Model.User;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DAL.Enum.Enums;

namespace DAL.Model
{
    public class ApplicationUser : IdentityUser
    {
        public string NickName { get; set; }
        public string TokenKey { get; set; }
        public DateTime RegisterDate { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? IdNum { get; set; }
        public string? PhoneNumber { get; set; }
        public GenderEnum Gender { get; set; }
        public ApplicationUserType UserType { get; set; }
        public bool IsActive { get; set; }
        public ICollection<Connection> Connections { get; set; }


        public ApplicationUser()
        {
            RegisterDate = new DateTime();
        }
    }
    public enum ApplicationUserType
    {
        Admin = 0,
        Client = 1,
    }
}
