using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.User
{
    public class Employee_Types
    {
        [Key]
        public int TypeId { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
    }
}
