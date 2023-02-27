using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.School
{
    public class LicenseType : AppModelBase
    {
        public string Name { get; set; }
        [DataType("decimal(16 ,3)")]
        public decimal Cost { get; set; }
    }
}
