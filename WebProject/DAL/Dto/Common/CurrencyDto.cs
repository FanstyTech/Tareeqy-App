using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Dto.Common
{
    public class CurrencyDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string CurrencySymbol { get; set; }
        public bool IsActive { get; set; }
    }
}
