using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.QustionExam
{
    internal class SchoolQuesOption : AppModelBase
    {
        
        public int SchoolId { get; set; }
        public int OptionNomber { get; set; }
        public bool IsCorrect { get; set; }=false;

    }
}
