using DAL.Model.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Dto.Common
{
    public class CityDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int CountryId { get; set; }
        public CountryDto Country { get; set; }
        public ICollection<GovernorateDto> Governorates { get; set; }
    }
}
