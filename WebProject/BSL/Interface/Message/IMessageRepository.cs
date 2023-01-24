using DAL.Dto.Message;
using DAL.Dto.User;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MangeData.Interface.Message
{
    public interface IMessageRepository
    {
        Task SaveNotify(NotificationDto obj);
        Task<List<UserConnectionDto>> SaveMessage(MessageDto obj);
        Task<List<NotificationDto>> GetAllNotify();
        Task<List<MessageDto>> GetAllMessageByUserId(string SenderUserId, string ReceiveUserName);
    
    }
}
