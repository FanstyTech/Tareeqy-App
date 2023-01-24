using Constant;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using MangeData.Interface.Product;
using DAL.Dto.Product;

namespace WebProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductsController : Controller
    {
        private readonly IProductsRepository _ProductsRepository;

        public ProductsController(IProductsRepository ProductsRepository, IMapper mapper)
        {
            _ProductsRepository = ProductsRepository;
        }

        [HttpGet("GetAll")]
        public async Task<ResponseActions> GetAll()
        {
            try
            {
                var data = await _ProductsRepository.GetAll();
                return new ResponseActions()
                {
                    code = Utils.Success,
                    message = "Sucsses",
                    status = true,
                    data = data
                };
            }
            catch (Exception e)
            {

                return new ResponseActions
                {
                    code = Utils.BadRequest,
                    status = false,
                    message = e.Message,
                    data = { }
                };
            }
        }


        [HttpPost("Save")]
        public async Task<ResponseActions> Save([FromBody] ProductsDto dto)
        {
            try
            {
                await _ProductsRepository.Save(dto);
                return new ResponseActions()
                {
                    code = Utils.Success,
                    message = "Sucsses",
                    status = true,
                    data = { }
                };
            }
            catch (Exception e)
            {
                return new ResponseActions
                {
                    code = Utils.BadRequest,
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
                await _ProductsRepository.Delete(Id);
                return new ResponseActions()
                {
                    code = Utils.Success,
                    message = "Sucsses",
                    status = true,
                    data = { }
                };
            }
            catch (Exception e)
            {
                return new ResponseActions
                {
                    code = Utils.BadRequest,
                    status = false,
                    message = e.Message,
                    data = { }
                };
            }
        }
    }
}
