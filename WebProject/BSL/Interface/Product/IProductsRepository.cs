using DAL.Dto.Product;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MangeData.Interface.Product
{
    public interface IProductsRepository
    {
        Task<List<ProductsDto>> GetAll();
        Task Save(ProductsDto dto);
        Task Delete(int Id);

    }
}
