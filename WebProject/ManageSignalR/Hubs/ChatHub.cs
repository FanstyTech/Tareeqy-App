using MangeData.Interface;
using DAL.Dto.Message;
using DAL.Dto.User;
using ManageSignalR.Hubs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MangeData.Interface.Message;

namespace ManageSignalR.Hubs
{
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme + "," +
         JwtBearerDefaults.AuthenticationScheme)]
    public class ChatHub :  Hub
    {
        private IMessageRepository _messageRepository;
        private IUserRepository _userRepository;
        public ChatHub(IMessageRepository messageRepository, IUserRepository userRepository)
        {
            _messageRepository = messageRepository;
            _userRepository = userRepository;
        }
        public async Task SendMessage(string toUserId, string messageText)
        {


            var fromUserName = Context.User.Identity.Name;

            //Save message and get user connection data
            MessageDto dto = new MessageDto { ToUserId = toUserId, MessageText = messageText, FromUserName = fromUserName };
            var lst = await _messageRepository.SaveMessage(dto);
            // send message for all users connection 
            foreach (var connection in lst) { 
            
                if(!string.IsNullOrEmpty(connection.ConnectionKey))
                    await Clients.Client(connection.ConnectionKey).SendAsync("ReceiveMessage", connection.UserName, messageText);
            }

        }

        public override Task OnConnectedAsync()
        {
            SaveUserConnection(true);
            return base.OnConnectedAsync();
        }


        public override Task OnDisconnectedAsync(Exception exception)
        {
            SaveUserConnection(false);
            return base.OnDisconnectedAsync(exception);
        }
      
        private void SaveUserConnection (bool IsConnected= false)
        {
            var fromUserName = Context.User.Identity.Name;
            _userRepository.SaveUserConnection(new UserConnectionDto { ConnectionKey = Context.ConnectionId, IsConnected = IsConnected, UserName = fromUserName });

        }

    }
}
