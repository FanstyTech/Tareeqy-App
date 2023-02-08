using Constant;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System;
using MangeData.Interface.Common;
using DAL.Dto.Common;
using MangeData.SQLRepository.Common;

namespace WebProject.Controllers.APIs.Common
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationRepository _locationRepository;
        public LocationController(ILocationRepository locationRepository)
        {
            _locationRepository = locationRepository;
        }
        [HttpGet("GetAllCountry")]
        public async Task<ResponseActions> GetAllCountry()
        {
            try
            {
                var data = await _locationRepository.GetAllCountry();
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

        [HttpGet("GetCountryById")]
        public async Task<ResponseActions> GetCountryById(int Id)
        {
            try
            {
                var data = await _locationRepository.GetCountryById(Id);
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

        [HttpPost("SaveCountry")]
        public async Task<ResponseActions> SaveCountry([FromForm] CountryDto obj)
        {
            try
            {
                //throw new Exception("حدثت مشكلة ما");
                var data = await _locationRepository.SaveCountry(obj);
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

        [HttpPost("DeleteCountry")]
        public async Task<ResponseActions> DeleteCountry(List<int> Ids)
        {
            try
            {
                await _locationRepository.DeleteCountry(Ids);
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


        [HttpPost("GetCountryForSelect")]
        public async Task<ResponseActions> GetCountryForSelect([FromBody] GetForSelectFilterDto obj)
        {
            try
            {
                var data = await _locationRepository.GetCountryForSelect(obj);
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

        [HttpPost("GetCityForSelect")]
        public async Task<ResponseActions> GetCityForSelect([FromBody] GetForSelectFilterDto obj)
        {
            try
            {
                var data = await _locationRepository.GetCityForSelect(obj);
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

        [HttpPost("GetGovernorateForSelect")]
        public async Task<ResponseActions> GetGovernorateForSelect([FromBody] GetForSelectFilterDto obj)
        {
            try
            {
                var data = await _locationRepository.GetGovernorateForSelect(obj);
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


    }
}
