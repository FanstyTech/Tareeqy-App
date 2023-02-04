using Constant;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System;
using MangeData.Interface.Common;
using DAL.Dto.Common;

namespace WebProject.Controllers.APIs.Common
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly ICountryRepository _countryRepository;
        public CountryController(ICountryRepository countryRepository)
        {
            _countryRepository = countryRepository;
        }
        [HttpGet("GetAll")]
        public async Task<ResponseActions> GetAll()
        {
            try
            {
                var data = await _countryRepository.GetAll();
                return new ResponseActions()
                {
                    code = HttpStatusCode.OK,
                    message = "Sucsses",
                    status = true,
                    data = data
                };
            }
            catch (Exception e)
            {

                return new ResponseActions
                {
                    code = HttpStatusCode.BadRequest,
                    status = false,
                    message = e.Message,
                    data = { }
                };
            }
        }

        [HttpGet("GetById")]
        public async Task<ResponseActions> GetById(int Id)
        {
            try
            {
                var data = await _countryRepository.GetById(Id);
                return new ResponseActions()
                {
                    code = HttpStatusCode.OK,
                    message = "Sucsses",
                    status = true,
                    data = data
                };
            }
            catch (Exception e)
            {

                return new ResponseActions
                {
                    code = HttpStatusCode.BadRequest,
                    status = false,
                    message = e.Message,
                    data = { }
                };
            }
        }

        [HttpPost("Save")]
        public async Task<ResponseActions> Save([FromForm] CountryDto obj)
        {
            try
            {
                var data = await _countryRepository.Save(obj);
                return new ResponseActions()
                {
                    code = HttpStatusCode.OK,
                    message = "Sucsses",
                    status = true,
                    data = data
                };
            }
            catch (Exception e)
            {

                return new ResponseActions
                {
                    code = HttpStatusCode.BadRequest,
                    status = false,
                    message = e.Message,
                    data = { }
                };
            }
        }

        [HttpDelete("Delete")]
        public async Task<ResponseActions> Delete(int Id)
        {
            try
            {
                await _countryRepository.Delete(Id);
                return new ResponseActions()
                {
                    code = HttpStatusCode.OK,
                    message = "Sucsses",
                    status = true,
                    data = { }
                };
            }
            catch (Exception e)
            {

                return new ResponseActions
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
