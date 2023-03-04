using Constant;
using MangeData.Interface.School;
using MangeData.SQLRepository.School;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using System;
using DAL.Dto.School;
using System.Collections.Generic;
using DAL.Dto.Common;

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

        [HttpGet("GetAllSchoolProfile")]
        public async Task<ResponseActions<List<SchoolProfileDto>>> GetAllSchoolProfile()
        {
            try
            {
                var data = await _schoolRepository.GetAllSchoolProfile();
                return new ResponseActions<List<SchoolProfileDto>>()
                {
                    code = HttpStatusCode.OK,
                    message = "Sucsses",
                    status = true,
                    data = data
                };
            }
            catch (Exception e)
            {

                return new ResponseActions<List<SchoolProfileDto>>
                {
                    code = HttpStatusCode.BadRequest,
                    status = false,
                    message = e.Message,
                    data = null
                };
            }
        }

        [HttpGet("GetSchoolProfileById")]
        public async Task<ResponseActions<SchoolProfileDto>> GetSchoolProfileById(int Id)
        {
            try
            {
                var data = await _schoolRepository.GetSchoolProfileById(Id);
                return new ResponseActions<SchoolProfileDto>()
                {
                    code = HttpStatusCode.OK,
                    message = "Sucsses",
                    status = true,
                    data = data
                };
            }
            catch (Exception e)
            {

                return new ResponseActions<SchoolProfileDto>
                {
                    code = HttpStatusCode.BadRequest,
                    status = false,
                    message = e.Message,
                    data = null
                };
            }
        }

        [HttpPost("DeleteSchoolProfileByIds")]
        public async Task<ResponseActions<object>> DeleteSchoolProfileByIds(List<int> Ids)
        {
            try
            {
                await _schoolRepository.DeleteSchoolProfileByIds(Ids);
                return new ResponseActions<object>()
                {
                    code = HttpStatusCode.OK,
                    message = "Sucsses",
                    status = true,
                    data = { }
                };
            }
            catch (Exception e)
            {

                return new ResponseActions<object>
                {
                    code = HttpStatusCode.BadRequest,
                    status = false,
                    message = e.Message,
                    data = { }
                };
            }
        }

        [HttpPost("SaveSchoolEmployee")]
        public async Task<ResponseActions<int?>> SaveSchoolEmployee([FromForm] SchoolEmployeeDto obj)
        {
            try
            {
                var data = await _schoolRepository.SaveSchoolEmployee(obj);
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

        [HttpGet("GetAllSchoolEmployee")]
        public async Task<ResponseActions<List<SchoolEmployeeDto>>> GetAllSchoolEmployee(int? SchoolProfileId)
        {
            try
            {
                var data = await _schoolRepository.GetAllSchoolEmployee(SchoolProfileId);
                return new ResponseActions<List<SchoolEmployeeDto>>()
                {
                    code = HttpStatusCode.OK,
                    message = "Sucsses",
                    status = true,
                    data = data
                };
            }
            catch (Exception e)
            {

                return new ResponseActions<List<SchoolEmployeeDto>>
                {
                    code = HttpStatusCode.BadRequest,
                    status = false,
                    message = e.Message,
                    data = null
                };
            }
        }

        [HttpPost("DeleteSchoolEmployeeeByIds")]
        public async Task<ResponseActions<object>> DeleteSchoolEmployeeeByIds(List<int> Ids)
        {
            try
            {
                await _schoolRepository.DeleteSchoolEmployeeeByIds(Ids);
                return new ResponseActions<object>()
                {
                    code = HttpStatusCode.OK,
                    message = "Sucsses",
                    status = true,
                    data = { }
                };
            }
            catch (Exception e)
            {

                return new ResponseActions<object>
                {
                    code = HttpStatusCode.BadRequest,
                    status = false,
                    message = e.Message,
                    data = { }
                };
            }
        }

        [HttpGet("GetSchoolWorkingTime")]
        public async Task<ResponseActions<List<SchoolWorkingTimeDto>>> GetSchoolWorkingTime(int SchoolProfileId)
        {
            try
            {
                var data = await _schoolRepository.GetSchoolWorkingTime(SchoolProfileId);
                return new ResponseActions<List<SchoolWorkingTimeDto>>()
                {
                    code = HttpStatusCode.OK,
                    message = "Sucsses",
                    status = true,
                    data = data
                };
            }
            catch (Exception e)
            {

                return new ResponseActions<List<SchoolWorkingTimeDto>>
                {
                    code = HttpStatusCode.BadRequest,
                    status = false,
                    message = e.Message,
                    data = null
                };
            }
        }

        [HttpPost("SaveSchoolWorkingTime")]
        public async Task<ResponseActions<List<SchoolWorkingTimeDto>>> SaveSchoolWorkingTime([FromBody] List<SchoolWorkingTimeDto> lst)
        {
            try
            {
                var data = await _schoolRepository.SaveSchoolWorkingTime(lst);
                return new ResponseActions<List<SchoolWorkingTimeDto>>()
                {
                    code = HttpStatusCode.OK,
                    message = "Sucsses",
                    status = true,
                    data = data
                };
            }
            catch (Exception e)
            {

                return new ResponseActions<List<SchoolWorkingTimeDto>>
                {
                    code = HttpStatusCode.BadRequest,
                    status = false,
                    message = e.Message,
                    data = null
                };
            }
        }



        // Student
        [HttpGet("GetLicenseTypeForSelect")]
        public async Task<ResponseActions<List<SelectDto>>> GetLicenseTypeForSelect()
        {
            try
            {
                var data = await _schoolRepository.GetLicenseTypeForSelect();
                return new ResponseActions<List<SelectDto>>()
                {
                    code = HttpStatusCode.OK,
                    message = "Sucsses",
                    status = true,
                    data = data
                };
            }
            catch (Exception e)
            {

                return new ResponseActions<List<SelectDto>>
                {
                    code = HttpStatusCode.BadRequest,
                    status = false,
                    message = e.Message,
                    data = null
                };
            }
        }


        [HttpPost("SaveSchooStudent")]
        public async Task<ResponseActions<int?>> SaveSchooStudent([FromForm] SchoolStudentDto obj)
        {
            try
            {
                var data = await _schoolRepository.SaveSchooStudent(obj);
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

        [HttpGet("GetAllSchoolStudent")]
        public async Task<ResponseActions<List<SchoolStudentDto>>> GetAllSchoolStudent(int? SchoolProfileId)
        {
            try
            {
                var data = await _schoolRepository.GetAllSchoolStudent(SchoolProfileId);
                return new ResponseActions<List<SchoolStudentDto>>()
                {
                    code = HttpStatusCode.OK,
                    message = "Sucsses",
                    status = true,
                    data = data
                };
            }
            catch (Exception e)
            {

                return new ResponseActions<List<SchoolStudentDto>>
                {
                    code = HttpStatusCode.BadRequest,
                    status = false,
                    message = e.Message,
                    data = null
                };
            }
        }

        [HttpPost("DeleteSchoolStudentByIds")]
        public async Task<ResponseActions<object>> DeleteSchoolStudentByIds(List<int> Ids)
        {
            try
            {
                await _schoolRepository.DeleteSchoolStudentByIds(Ids);
                return new ResponseActions<object>()
                {
                    code = HttpStatusCode.OK,
                    message = "Sucsses",
                    status = true,
                    data = { }
                };
            }
            catch (Exception e)
            {

                return new ResponseActions<object>
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
