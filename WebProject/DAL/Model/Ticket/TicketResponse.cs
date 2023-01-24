using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.Ticket
{
    public class TicketResponse
    {
        public int TicketNumber { get; set; }
        public int UserNumber { get; set; }
        public List<Attachment> Attachments { get; set; }
        public string Response { get; set; }

        public TicketResponse()
        {
            Attachments = new List<Attachment>();
        }
    }

}
