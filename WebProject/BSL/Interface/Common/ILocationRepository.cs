using DAL.Dto.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MangeData.Interface.Common
{
    public interface ILocationRepository
    {
        Task<List<CountryDto>> GetAllCountry();
        Task<CountryDto> GetCountryById(int Id);
        Task<int> SaveCountry(CountryDto obj);
        Task DeleteCountry(List<int> Ids);
        Task<List<SelectDto>> GetCityForSelect(GetForSelectFilterDto input);
        Task<List<SelectDto>> GetGovernorateForSelect(GetForSelectFilterDto input);
        Task<List<SelectDto>> GetCountryForSelect(GetForSelectFilterDto input);
    }
}
