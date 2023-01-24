using MangeData.Interface;
using Constant;
using DAL.Context;
using DAL.Dto.Product;
using DAL.Model;
using DAL.Model.Message;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DAL.Model.Product;

using MangeData.Interface.Product;


namespace MangeData.SQLRepository.Product
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProductsRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

   

        public async Task<List<ProductsDto>> GetAll()
        {
            return await _context.Products.Select(c => _mapper.Map<ProductsDto>(c)).ToListAsync();
        }

        public async Task Save(ProductsDto dto)
        {
            if (dto.Id.HasValue)
            {
                Products el = _mapper.Map<Products>(dto);
                Products obj = _context.Products.FirstOrDefault(c => c.Id == dto.Id.Value);
                
				obj.ProductName = el.ProductName;
				obj.ProductPrice = el.ProductPrice;
               
                _context.Products.Update(obj);
                _context.SaveChanges();

            }
            else
            {
                await _context.Products.AddAsync(_mapper.Map<Products>(dto));
                await _context.SaveChangesAsync();
            }
        }
        
        public async Task Delete(int Id)
        {
            Products obj = _context.Products.FirstOrDefault(c => c.Id == Id);

            obj.IsDeleted = true;
            obj.DeletionTime = DateTime.Now;

            _context.Products.Update(obj);
            _context.SaveChanges();
        }

       
    }
}
