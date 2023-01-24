using DAL.Model.User;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model
{
    public class ApplicationUser :IdentityUser
    {
        public string NickName { get; set; }
        public string TokenKey { get; set; }
        public DateTime RegisterDate { get; set; }
        public ApplicationUser()
        {
            RegisterDate = new DateTime();
        }
        public ApplicationUserType UserType { get; set; }
        public bool  IsActive { get; set; }
        public ICollection<Connection> Connections { get; set; }



    }

    public enum ApplicationUserType
    {
        Admin = 0, 
        Customer =1,
    }
}
