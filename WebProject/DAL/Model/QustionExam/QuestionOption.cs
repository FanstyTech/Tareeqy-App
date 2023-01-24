using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.QustionExam
{
    internal class QuestionOption : AppModelBase
    {
      
        public string OptionText { get; set; }
        public bool IsCorrect { get; set; } = false;
        public bool IsDefault { get; set; } = true;

    }
}
