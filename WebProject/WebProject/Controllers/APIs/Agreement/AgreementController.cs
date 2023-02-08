using Constant;
using DAL.Dto.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using System;
using MangeData.Interface.Agreement;

namespace WebProject.Controllers.APIs.Agreement
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgreementController : ControllerBase
    {
        private readonly IAgreementRepository _agreementRepository;
        public AgreementController(IAgreementRepository agreementRepository)
        {
            _agreementRepository = agreementRepository;
        }
        [HttpPost("GetAgreementForSelect")]
        public async Task<ResponseActions> GetAgreementForSelect([FromForm] GetForSelectFilterDto obj)
        {
            try
            {
                var data = await _agreementRepository.GetAgreementForSelect(obj);
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
