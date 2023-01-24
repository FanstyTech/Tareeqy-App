using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DAL.Enum.Enums;

namespace DAL.Model.School
{
    public class Schoollicense
    {
        public licenseTypeEnum MyProperty { get; set; }
        [DataType("decimal(16,3)")]
        public decimal Cost { get; set; } = decimal.Zero;
    }
}
