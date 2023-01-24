using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.QustionExam
{
    internal class Question : AppModelBase
    {
     
        public string QuestionText { get; set; }
        public string SubSectionType { get; set; }
        public bool IsDefault { get; set; } = true;


    }
}
