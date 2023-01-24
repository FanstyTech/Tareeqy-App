using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Dto.Message
{
    public class MessageDto
    {
        public int Id { get; set; }
        public string FromUserId { get; set; }
        public string FromUserName { get; set; }
        public string ToUserId { get; set; }
        public string ToUserName { get; set; }
        public string MessageText { get; set; }
        public bool IsReaded { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedOn { get; set; }
        
    }
}
