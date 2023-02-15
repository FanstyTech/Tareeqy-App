using Constant;
using MangeData.Interface.School;
using MangeData.SQLRepository.School;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using System;
using DAL.Dto.School;

namespace WebProject.Controllers.APIs.School
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolController : ControllerBase
    {
        private readonly ISchoolRepository _schoolRepository;
        public SchoolController(ISchoolRepository schoolRepository)
        {
            _schoolRepository = schoolRepository;
        }

        [HttpPost("SaveSchoolProfile")]
        public async Task<ResponseActions<int?>> SaveSchoolProfile([FromForm] SchoolProfileDto obj)
        {
            try
            {
                var data = await _schoolRepository.SaveSchoolProfile(obj);
                return new ResponseActions<int?>()
                {
                    code = HttpStatusCode.OK,
                    message = "Sucsses",
                    status = true,
                    data = data
                };
            }
            catch (Exception e)
            {

                return new ResponseActions<int?>
                {
                    code = HttpStatusCode.BadRequest,
                    status = false,
                    message = e.Message,
                    data = null
                };
            }
        }
    }
}
