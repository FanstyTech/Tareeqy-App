using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.School
{
    public class SchoolSchedule :AppModelBase
    {
        public int SchoolId { get; set; }
        public int CalendarId { get; set; }
        public TimeSpan SummerStartTime { get; set; }
        public TimeSpan SummerEndTime { get; set; }
        public TimeSpan WinterStartTime { get; set; }
        public TimeSpan WinterEndTime { get; set; }
        public bool IsHoliday { get; set; } = false;
    }
}
