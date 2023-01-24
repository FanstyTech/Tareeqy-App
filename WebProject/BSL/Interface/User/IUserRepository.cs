using DAL.Dto;
using DAL.Dto.User;
using DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MangeData.Interface
{
    public interface IUserRepository
    {
        Task<UserDataDto> Login(LoginDto obj);
        Task<UserDataDto> CreateAccount(CreateAccountDto newuser);
        Task<List<UserConnectionDto>> GetUserConnection(string toUserId, string fromUserName);
        void SaveUserConnection(UserConnectionDto dto);
        ApplicationUser  GetUserFromName (string name);
    
    }
}
