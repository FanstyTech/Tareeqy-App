using MangeData.Interface;
using Constant;
using DAL.Dto;
using DAL.Dto.User;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL.Model;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.Net;

namespace WebProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;



        public UserController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
        }

        [HttpPost("Login")]
        public async Task<ResponseActions<UserDataDto>> Login([FromBody] LoginDto login)
        {
            try
            {

                UserDataDto data = await _userRepository.Login(login);
                return new ResponseActions<UserDataDto>()
                {
                    code = HttpStatusCode.OK,
                    message = "Sucsses",
                    status = true,
                    data = data
                };
            }
            catch (Exception e)
            {

                return new ResponseActions<UserDataDto>
                {
                    code = HttpStatusCode.BadRequest,
                    status = false,
                    message = e.Message,
                    data = { }
                };
            }
        }
        [Authorize]
        [HttpGet("GetData")]
        public async Task<ResponseActions<List<String>>> GetData()
        {
            try
            {

                var data = new List<String>() { "husam", "mohammed" };
                return new ResponseActions<List<String>>()
                {
                    code = HttpStatusCode.OK,
                    message = "Sucsses",
                    status = true,
                    data = data
                };
            }
            catch (Exception e)
            {

                return new ResponseActions<List<String>>
                {
                    code = HttpStatusCode.BadRequest,
                    status = false,
                    message = e.Message,
                    data = { }
                };
            }
        }
        [HttpPost("CreateAccount")]

        public async Task<ResponseActions<UserDataDto>> CreateAccount(CreateAccountDto obj)
        {

            try
            {
                UserDataDto data = await _userRepository.CreateAccount(obj);
                return new ResponseActions<UserDataDto>()
                {
                    code = HttpStatusCode.OK,
                    message = "Sucsses",
                    status = true,
                    data = data
                };

            }
            catch (Exception e)
            {
                return new ResponseActions<UserDataDto>
                {
                    code = HttpStatusCode.BadRequest,
                    status = false,
                    message = e.Message,
                    data = { }
                };
            }

        }

    }
}
