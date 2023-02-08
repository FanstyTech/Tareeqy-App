using DAL.Model.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Dto.Common
{
    public class GovernorateDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int CityId { get; set; }
        public CityDto City { get; set; }
    }
}
