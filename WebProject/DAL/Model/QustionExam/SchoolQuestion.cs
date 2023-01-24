using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.Qustions_Exams
{
    internal class SchoolQuestion : AppModelBase
    {
        
        public int QuestionId { get; set;}
        public int SchoolId { get; set; }
        public string ModifiedQuestionText { get; set; }


    }
}
