using DAL.SeedData.School;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DAL.Enum.Enums;

namespace DAL.Model.School
{
    public class SchoolStudent : AppModelBase
    {
        [DataType("decimal(16 ,3)")]
        public decimal Cost { get; set; } = decimal.Zero;
        public int licenseTypeId { get; set; }
        [ForeignKey(nameof(licenseTypeId))]
        public LicenseType licenseType { get; set; }
        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }
        public int SchoolProfileId { get; set; }
        [ForeignKey(nameof(SchoolProfileId))]
        public SchoolProfile SchoolProfile { get; set; }
    }
}
