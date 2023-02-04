using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.Common
{
    public class Country : AppModelBase
    {

        [Required]
        public string Name { get; set; }
        public string Code { get; set; }
        public string Currency { get; set; }
        public int? AttachmentId { get; set; }
        [ForeignKey(nameof(AttachmentId))]
        public Attachment Attachment { get; set; }

    }
}
