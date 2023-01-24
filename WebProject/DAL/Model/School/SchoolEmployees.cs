using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.School
{
    public class SchoolEmployees : AppModelBase
    {
        public string UserID { get; set; }
        public int SchoolID { get; set; }
        public int EmployeeTypeID { get; set; }
        [DataType("decimal(16 ,3)")]
        public decimal Salary { get; set; }= Decimal.Zero;
        public bool IsAdmin { get; set; } = false;

    }
}
