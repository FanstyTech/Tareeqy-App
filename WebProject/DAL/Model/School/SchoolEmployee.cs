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
    public class SchoolEmployee : AppModelBase
    {

        [DataType("decimal(16 ,3)")]
        public decimal Salary { get; set; } = Decimal.Zero;
        public SchoolEmployeeTypeEnum SchoolUserType { get; set; }
        public DateTime? DateOfHiring { get; set; }
        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }
        public int SchoolProfileId { get; set; }
        [ForeignKey(nameof(SchoolProfileId))]
        public SchoolProfile SchoolProfile { get; set; }
    }
}
