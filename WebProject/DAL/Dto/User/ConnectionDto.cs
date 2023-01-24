using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Dto.User
{
    public class UserConnectionDto
    {
        public string ConnectionKey { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public bool IsConnected { get; set; }
    }
}
