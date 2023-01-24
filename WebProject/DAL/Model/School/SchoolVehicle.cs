using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.School
{
    internal class SchoolVehicle : AppModelBase
    {
        public int VehicleNumber { get; set; }
        
        public int SchoolNumber { get; set; }
        public string VehicleType { get; set; }

    }
}
