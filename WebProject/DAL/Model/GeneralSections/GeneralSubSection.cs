using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.GeneralSections
{
    internal class GeneralSubSection : AppModelBase
    {
     
        public string Name { get; set; }

        public string SubSection { get; set; }   
        public string Description { get; set; }

        public int Att_Image { get; set; }

    }
}
