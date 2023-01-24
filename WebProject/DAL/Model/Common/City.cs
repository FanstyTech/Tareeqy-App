using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.Common
{
    internal class City : AppModelBase
    {
        [Required]
        public string Name { get; set; }

        public string ProvinceName  { get; set; }
    
        
    
    }
}
