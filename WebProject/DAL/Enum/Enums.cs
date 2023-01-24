using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Enum
{
    public class Enums
    {
        public enum DurationTypeEnum
        {
            Year,
            Month,
            Day,
            Hour
        }
        public enum licenseTypeEnum
        {
            Oral_staff,
            oral_commercial,
            editorial_staff,
            editorial_commercial
        }
        public enum DayEnum
        {
            Saturday,
            Sunday,
            Monday,
            Tuesday,
            Wednesday,
            Thursday,
            Friday
        }
        public enum InputSourceEnum
        {
            Mobile,
            Web
        }
        public enum TicketStatusEnum
        {
            Closed,
            InProgress,
            NotProcessed
        }
        public enum TicketTypeEnum
        {
            TechnicalIssue,
            Inquiry,
            Complaint
        }
    }
}
