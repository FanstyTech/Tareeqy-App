using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Dto.Common
{
    public class CountryDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int? AttachmentId { get; set; }
        public bool IsActive { get; set; }
        public int CurrencyId { get; set; }
        public CurrencyDto Currency { get; set; }
        public ICollection<CityDto> Cities { get; set; }
        public IFormFile File { get; set; }


    }
}
