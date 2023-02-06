using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DAL.Enum.Enums;

namespace DAL.Model.Common
{
    public class Attachment : AppModelBase
    {
        public int PrimeryTableId { get; set; }
        public string ContentType { get; set; }
        public AttatchmentTypeEnum AttatchmentTypeId { get; set; }
        public string Extension { get; set; }
        public string Name { get; set; }
        public string OriginalName { get; set; }
        public string FileSize { get; set; }

    }

}
