﻿using Constant;
using MangeData.Interface.Common;
using MangeData.SQLRepository.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using System;
using DAL.Dto.Common;
using System.Collections.Generic;

namespace WebProject.Controllers.APIs.Common
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrencyController : ControllerBase
    {
        public readonly ICurrencyRepository _currencyRepository;
        public CurrencyController(ICurrencyRepository currencyRepository)
        {
            _currencyRepository = currencyRepository;
        }

        [HttpGet("GetForSelect")]
        public async Task<ResponseActions<List<SelectDto>>> GetForSelect()
        {
            try
            {
                var data = await _currencyRepository.GetForSelect();
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
                    data = { }
                };
            }
        }
    }
}
