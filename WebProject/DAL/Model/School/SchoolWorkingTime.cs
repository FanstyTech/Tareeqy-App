using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DAL.Enum.Enums;

namespace DAL.Model.School
{
    public class SchoolWorkingTime : AppModelBase
    {
        public DayEnum Day { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int SchoolProfileId { get; set; }
        [ForeignKey(nameof(SchoolProfileId))]
        public SchoolProfile SchoolProfile { get; set; }
    }
}
