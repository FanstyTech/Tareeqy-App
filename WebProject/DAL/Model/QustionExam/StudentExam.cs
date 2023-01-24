using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.QustionExam
{
    internal class StudentExam : AppModelBase
    {
     
        public int ExamId { get; set; }
        public int StudentId { get; set; }
        public int ExamResult { get; set; } = 0;
        public int QuestionNumber { get; set; } = 30;
        public int CorrectAnswerNumber { get; set; } = 0;

    }
}
