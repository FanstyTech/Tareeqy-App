using MangeData.Interface;
using Constant;
using DAL.Context;
using DAL.Dto;
using DAL.Dto.User;
using DAL.Model;
using DAL.Model.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Services;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using System.Reflection;

namespace MangeData.SQLRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly JWTServices _jWTServices;
        private readonly IMapper _mapper;
        public UserRepository(ApplicationDbContext context, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IMapper mapper, IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _jWTServices = new JWTServices(configuration, userManager);
            _signInManager = signInManager;
            _mapper = mapper;
        }


        public async Task<UserDataDto> CreateAccount(CreateAccountDto newuser)
        {

            ApplicationUser applicationUser = await _userManager.FindByEmailAsync(newuser.Email).ConfigureAwait(false);
            if (applicationUser != null)
                throw new Exception(Utils.EmailExists);

            //if (!Utils.IsValidPass(newuser.Password))
            //    throw new Exception(Utils.InCorrectPassword);

            var user = new ApplicationUser
            {
                Email = newuser.Email,
                UserName = newuser.Email,
                NickName = newuser.NickName,
                RegisterDate = DateTime.Now,
                DateOfBirth = newuser.DateOfBirth,
                IdNum = newuser.IdNum,
                UserType = newuser.UserType,
                Gender = newuser.Gender,
                IsActive = newuser.IsActive,
                PhoneNumber = newuser.PhoneNumber,
            };
            var res = await _userManager.CreateAsync(user, newuser.Password);
            await _signInManager.SignInAsync(user, isPersistent: false);
            UserDataDto dataDto = new UserDataDto
            {
                Email = user.Email,
                Id = user.Id,
                NickName = user.NickName
            };
            return dataDto;


        }



        public async Task<UserDataDto> Login(LoginDto obj)
        {

            Microsoft.AspNetCore.Identity.SignInResult res = await _signInManager.
                   PasswordSignInAsync(obj.Email, obj.Password, isPersistent: false, false);
            if (res.Succeeded)
            {
                ApplicationUser user = await _userManager.FindByEmailAsync(obj.Email);
                var token = await _jWTServices.GenerateTokenKey(user);
                user.TokenKey = token;
                await _userManager.UpdateAsync(user);

                var dataDto = _mapper.Map<UserDataDto>(user);



                //dataDto = new UserDataDto
                //{
                //    Email = user.Email,
                //    Id = user.Id,
                //    NickName = user.NickName
                //};
                return dataDto;
            }
            throw new Exception(Utils.InCorrectMessage);
        }




        public async Task<List<UserConnectionDto>> GetUserConnection(string toUserId, string fromUserName)
        {
            ApplicationUser user = _userManager.FindByNameAsync(fromUserName).Result;


            if (user != null)
            {

                var cons = await _context.Connections
                    .Where(c => (c.IsConnected == true && c.UserId == toUserId) || (c.IsConnected == true && c.UserId == user.Id))
                    .Include(c => c.User)
                    .Select(c => new UserConnectionDto
                    {
                        IsConnected = c.IsConnected,
                        ConnectionKey = c.ConnectionKey,
                        UserId = c.UserId,
                        UserName = c.User.NickName
                    }).Distinct().ToListAsync();


                return cons;
            }
            return null;
        }
        public void SaveUserConnection(UserConnectionDto dto)
        {
            ApplicationUser user = _userManager.FindByNameAsync(dto.UserName).Result;

            if (user != null)
            {
                if (dto.IsConnected)
                {
                    dto.UserId = user.Id;
                    _context.Add(_mapper.Map<Connection>(dto));
                    _context.SaveChanges();

                }
                else
                {
                    var connection = _context.Connections
                                    .Where(_c => _c.UserId == user.Id && _c.ConnectionKey == dto.ConnectionKey && _c.IsConnected == true).FirstOrDefault();
                    if (connection != null)
                    {
                        connection.IsConnected = false;
                        _context.Update(connection);
                        _context.SaveChanges();
                    }

                }


            }


        }

        public ApplicationUser GetUserFromName(string name)
        {
            return _userManager.FindByNameAsync(name).Result;
        }

        public async Task UpdateAccount(CreateAccountDto newuser)
        {
            //_context.Users.AsNoTracking().FirstOrDefault(c=>c.Id == newuser.UserId)
            var oldUser = await _userManager.FindByIdAsync(newuser.UserId);
            oldUser.PhoneNumber = newuser.PhoneNumber;
            oldUser.IdNum = newuser.IdNum;
            oldUser.Email = newuser.Email;
            oldUser.DateOfBirth = newuser.DateOfBirth;
            oldUser.Gender = newuser.Gender;
            oldUser.NickName = newuser.NickName;

            await _userManager.UpdateAsync(oldUser);

        }
    }
}
