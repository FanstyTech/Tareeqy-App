using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.GeneralSections
{
    [Table("GeneralSections")]
    public class GeneralSection : AppModelBase
    {
       
        public string Name { get; set; }
        public string Description { get; set; }
        public int Att_Image { get; set; }
    }
}
