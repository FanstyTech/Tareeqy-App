using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Dto
{
    public class UserDto
    {
        public int? Id { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        // admin --0 , vender --1 , customer --2
        public int UserType { get; set; }

        public string DOB { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }


    }
}
