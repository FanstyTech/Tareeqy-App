using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Dto.Message
{
    public class NotificationDto
    {
        public string ToUserId { get; set; }
        public string MessageText { get; set; }
    }
}
