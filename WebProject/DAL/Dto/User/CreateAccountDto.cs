using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Dto.User
{
    public class CreateAccountDto
    {
        public string NickName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
