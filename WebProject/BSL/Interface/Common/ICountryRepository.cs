using DAL.Dto.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MangeData.Interface.Common
{
    public interface ICountryRepository
    {
        Task<List<CountryDto>> GetAll();
        Task<CountryDto> GetById(int Id);
        Task<int> Save(CountryDto obj);
        Task Delete(List<int> Ids);
    }
}
