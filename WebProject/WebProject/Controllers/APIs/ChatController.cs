using MangeData.Interface;
using Constant;
using DAL.Dto;
using DAL.Dto.User;
using ManageSignalR.Hubs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Dto.Message;
using MangeData.Interface.Message;
using System.Net;

namespace WebProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]

    public class ChatController : ControllerBase
    {
        private IHubContext<ChatHub> _hub;
        private IMessageRepository _messageRepository;

        public ChatController(IHubContext<ChatHub> hub, IMessageRepository messageRepository)
        {
            _hub = hub;
            _messageRepository = messageRepository;
        }
        /// <summary>
        /// get test method
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpPost("SendMessage")]
        public async Task<ResponseActions<object>> SendMessage([FromBody] MessageDto obj)
        {

            obj.FromUserName = User.Identity.Name;

            //Save message and get user connection data
            var lst = await _messageRepository.SaveMessage(obj);
            //Send message for all users connection 
            foreach (var connection in lst)
            {
                if (!string.IsNullOrEmpty(connection.ConnectionKey))
                    await _hub.Clients.Client(connection.ConnectionKey).SendAsync("ReceiveMessage", connection.UserName, obj.MessageText);
            }
            return new ResponseActions<object>()
            {
                code = HttpStatusCode.OK,
                message = "Sucsses",
                status = true,
                data = { }
            };
        }

        [HttpGet("send/graph2")]
        public IActionResult GetTest2()
        {
            var result = _hub.Clients.All.SendAsync("chartStatus2", 10);
            return Ok(new { Status = "Send To Graph 2 Completed" });
        }

    }
}
