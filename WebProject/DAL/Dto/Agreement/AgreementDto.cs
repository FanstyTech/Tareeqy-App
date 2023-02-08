using DAL.Dto.Common;
using DAL.Model.Common;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DAL.Enum.Enums;

namespace DAL.Dto.Agreement
{
    public class AgreementDto
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; }
        public DurationTypeEnum DurationType { get; set; }
        public decimal Price { get; set; }
        public int CurrencyId { get; set; }
        public CurrencyDto Currency { get; set; }
    }
}
