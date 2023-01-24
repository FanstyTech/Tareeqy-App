using DAL.Dto.Message;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageSignalR.Hubs
{
    public interface IChatClient
    {
        Task SendMessage(string toUserId, string messageText);

    }
}
