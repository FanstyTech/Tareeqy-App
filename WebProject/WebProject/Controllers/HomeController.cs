using MangeData.Interface;
using DAL.Dto;
using DAL.Dto.User;
using DAL.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WebProject.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MangeData.Interface.Message;

namespace WebProject.Controllers
{
 
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private IMessageRepository _messageRepository;
        private readonly IUserRepository _userRepository;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public HomeController(ILogger<HomeController> logger, IMessageRepository messageRepository, IUserRepository userRepository, SignInManager<ApplicationUser> signInManager)
        {
            _logger = logger;
            _messageRepository = messageRepository;
            _userRepository = userRepository;
            _signInManager = signInManager;
        }
        [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme + "," +
        JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Index(string Id = "eceb52ee-0edb-4428-b223-440c6672ad44")
        {
            ViewBag.UserId = Id;    
            return View(_messageRepository.GetAllMessageByUserId(Id, User.Identity.Name).Result);
        }      
       
        public IActionResult Privacy()
        {
            return View();
        }
       
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
