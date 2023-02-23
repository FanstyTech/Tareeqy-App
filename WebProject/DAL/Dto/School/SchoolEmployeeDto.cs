using DAL.Model.School;
using DAL.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DAL.Enum.Enums;
using Microsoft.AspNetCore.Http;

namespace DAL.Dto.School
{
    public class SchoolEmployeeDto
    {
        public int? Id { get; set; }
        public decimal Salary { get; set; } = Decimal.Zero;
        public SchoolEmployeeTypeEnum SchoolUserType { get; set; }
        public DateTime? DateOfHiring { get; set; }
        public string? UserId { get; set; }
        public string Email { get; set; }
        public string NickName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? IdNum { get; set; }
        public string? PhoneNumber { get; set; }
        public GenderEnum Gender { get; set; }
        public bool IsActive { get; set; }
        public int SchoolProfileId { get; set; }

        public string? DateOfHiringString { get; set; }
        public string? DateOfBirthString { get; set; }
        public string? RegisterDateString { get; set; }
        public IFormFile? File { get; set; }

    }
}
