using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DAL.Enum.Enums;

namespace DAL.Model.Agreement
{
    public class Agreement : AppModelBase
    {

        public int Title { get; set; }
        public  string Details { get; set; }
        [DataType("decimal(16 ,3)")]
        public decimal Cost { get; set; } = Decimal.Zero;

        public int Duration { get; set; }
        public DurationTypeEnum Duration_Type { get; set; }

        public int Att_SoftCopy { get; set; }

    }
}
