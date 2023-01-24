using MangeData.Interface;
using DAL.Dto;
using DAL.Dto.User;
using DAL.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MangeData.Interface.Message;

namespace WebProject.Controllers
{
    public class AccountController : Controller
    {
        private IMessageRepository _messageRepository;
        private readonly IUserRepository _userRepository;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountController( IMessageRepository messageRepository, IUserRepository userRepository, SignInManager<ApplicationUser> signInManager)
        {
            _messageRepository = messageRepository;
            _userRepository = userRepository;
            _signInManager = signInManager;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult CreateAccount()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateAccount(CreateAccountDto obj)
        {
            try
            {
                await _userRepository.CreateAccount(obj);
                return RedirectToAction(nameof(Index), "Home");
            }
            catch (Exception e)
            {
                return View(obj);
            }

        }
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginDto obj)
        {
            try
            {
                var response  =  await _userRepository.Login(obj);

                var jsonToken = new JwtSecurityTokenHandler().ReadToken(response.TokenKey) as JwtSecurityToken;
                var username = jsonToken.Claims.FirstOrDefault(m => m.Type == ClaimTypes.Name).Value;
                var claims = new Claim[]
                {
                    new Claim(ClaimTypes.Name, response.UserName),
                };
                var claimsIdentity = new ClaimsIdentity(claims, /*Explicit*/CookieAuthenticationDefaults.AuthenticationScheme);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));



                return RedirectToAction(nameof(Index),"Home");


            }
            catch (Exception e)
            {
                return View(obj);
            }
        }
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Login");
        }
    }
}
