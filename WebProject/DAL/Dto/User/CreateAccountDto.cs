using DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DAL.Enum.Enums;

namespace DAL.Dto.User
{
    public class CreateAccountDto
    {
        public string NickName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? IdNum { get; set; }
        public string? PhoneNumber { get; set; }
        public GenderEnum Gender { get; set; }
        public ApplicationUserType UserType { get; set; }

        public string? UserId { get; set; }

    }
}
