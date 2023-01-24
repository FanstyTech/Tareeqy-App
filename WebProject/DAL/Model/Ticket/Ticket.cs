using Microsoft.Identity.Client.Utils.Windows;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using static DAL.Enum.Enums;

namespace DAL.Model.Ticket
{
    public class Ticket : AppModelBase
    {
        public string TicketNumber { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public int UserNumber { get; set; }
        public  InputSourceEnum InputSource{ get; set; }
        public TicketTypeEnum TicketType { get; set; }
        public TicketStatusEnum TicketStatus { get; set; }
        public List<Attachment> Attachments { get; set; }

        //public Ticket()
        //{
        //    TicketNumber = GenerateCode();

        //}


    }
}
