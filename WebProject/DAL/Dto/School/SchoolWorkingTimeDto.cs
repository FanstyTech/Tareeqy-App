using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DAL.Enum.Enums;

namespace DAL.Dto.School
{
    public class SchoolWorkingTimeDto
    {
        public int? Id { get; set; }
        public DayEnum Day { get; set; }
        public string DayName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool? IsSelected { get; set; }
        public int SchoolProfileId { get; set; }
    }
}
