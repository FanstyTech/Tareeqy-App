using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.Message
{
    public class Notification : AppModelBase
    {
     
        public string ToUserId { get; set; }
        [ForeignKey(nameof(ToUserId))]
        public ApplicationUser ToUser { get; set; }


        public string FromUserId { get; set; }
        [ForeignKey(nameof(FromUserId))]
        public ApplicationUser FromUser { get; set; }
        public int PrimeryTableId { get; set; }

        public string NotificationText { get; set; }
        public int MyProperty { get; set; }

        public int NotificationTypeId { get; set; }    




        


    }
}
