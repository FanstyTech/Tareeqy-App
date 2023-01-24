using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DAL.Enum.Enums;

namespace DAL.Model.Common
{
    public class Calendar : AppModelBase
    {
        public DayEnum DayName { get; set; }
        public TimeSpan SummerStartTime { get; set; } = new TimeSpan(7, 0, 0);
        public TimeSpan SummerEndTime { get; set; } = new TimeSpan(16, 0, 0);
        public TimeSpan WinterStartTime { get; set; } = new TimeSpan(7, 0, 0);
        public TimeSpan WinterEndTime { get; set; } = new TimeSpan(17, 0, 0);
        public bool IsHoliday { get; set; } = false;
    }
}
