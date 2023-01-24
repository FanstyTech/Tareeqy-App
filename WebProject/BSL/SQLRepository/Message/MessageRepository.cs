using MangeData.Interface;
using Constant;
using DAL.Context;
using DAL.Dto;
using DAL.Dto.Message;
using DAL.Dto.User;
using DAL.Model;
using DAL.Model.Message;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MangeData.Interface.Message;

namespace MangeData.SQLRepository
{
    public class MessageRepository : IMessageRepository
    {
        private readonly ApplicationDbContext _context;
        private IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public MessageRepository(ApplicationDbContext context, IUserRepository userRepository, IMapper mapper)
        {
            _context = context;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<List<MessageDto>> GetAllMessageByUserId(string SenderUserId, string ReceiveUserName)
        {
            ApplicationUser ReceiveUser = _userRepository.GetUserFromName(ReceiveUserName);

            return await _context.Messages.Where( c => (c.FromUserId == SenderUserId && c.ToUserId == ReceiveUser.Id) 
                                                    || ( c.FromUserId == ReceiveUser.Id && c.ToUserId == SenderUserId) )
                            .Include(c=>c.FromUser).Include(c =>c.ToUser)
                            .Select(c => new MessageDto { FromUserName  = c.FromUser.NickName, MessageText = c.MessageText}).ToListAsync();        
        }

        public async Task<List<NotificationDto>> GetAllNotify()
        {
            return await _context.Notifications.Select(c => new NotificationDto { MessageText = c.NotificationText, ToUserId = c.ToUserId}).ToListAsync();
        }

        public async Task<List<UserConnectionDto>> SaveMessage(MessageDto obj)
        {
            // Get user connection data
            List<UserConnectionDto> lst = await _userRepository.GetUserConnection(obj.ToUserId, obj.FromUserName);
            obj.FromUserId = lst.Where(c=> c.UserId != obj.ToUserId).FirstOrDefault().UserId;
      
            // Save new message
            await _context.Messages.AddAsync(_mapper.Map<Message>(obj));
            await _context.SaveChangesAsync();

            return lst;
        }

        public async Task SaveNotify(NotificationDto obj)
        {
            var notify = new Notification()
            {
                NotificationText = obj.MessageText,
                ToUserId = obj.ToUserId,
            };
           await _context.Notifications.AddAsync(notify);
           await _context.SaveChangesAsync();
        }
    }
}
