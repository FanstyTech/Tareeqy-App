using DAL.Enum;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Model.Message
{
    [Table(name: "Message")]
    public class Message : AppModelBase
    {
        public string FromUserId { get; set; }
        public string ToUserId { get; set; }

        [ForeignKey(nameof(FromUserId))]
        public ApplicationUser FromUser { get; set; }
        [ForeignKey(nameof(ToUserId))]
        public ApplicationUser ToUser { get; set; }
        public string MessageText { get; set; }

        public ChatMessageReadState ReadState { get; private set; }
        public ChatMessageReadState ReceiverReadState { get; private set; }

    }
}
