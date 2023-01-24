using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.Common
{
    public class Attachment:AppModelBase
    {
        public int PrimeryTableId { get; set; }
        public string ContentType { get; set; }
        public int AttatchmentTypeId { get; set; }

        public string Extension { get; set; }
        public string Name { get; set; }
        public string OriginalName { get; set; }

    }

}
