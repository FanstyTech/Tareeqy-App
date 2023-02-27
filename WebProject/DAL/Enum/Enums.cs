using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Enum
{
    public class Enums
    {
        public enum AttatchmentTypeEnum
        {
            UserPhoto,
            CountryFlag,
            SchoolLogo
        }
        public enum SchoolEmployeeTypeEnum
        {
            Admin = 1,
            Trainer = 2,
            FinancialManager = 3
        }
        public enum GenderEnum
        {
            Female = 1,
            Male = 2
        }
        public enum DurationTypeEnum
        {
            Year,
            Month,
            Day,
            Hour
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
