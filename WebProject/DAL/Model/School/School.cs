using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.School
{
    [Table("School")]
    public class School : AppModelBase
    {
        
        [Required]
        public string Name { get; set; }
        
        public int License_Number { get; set; }
        public int Country { get; set; }
        public int Governorate { get; set; }
        public int City { get; set; }
        [DataType("decimal(16,10)")]
        public Decimal? MapLet { get; set; }
        [DataType("decimal(16,10)")]
        public Decimal? MapLong { get; set; }
        public string PhoneNumber { get; set; }
        public string FacebookLink { get; set; }
        public string InstgramLink { get; set; }
        public string TwitterLink { get; set; }
        public int AggreementId { get; set; }

        public DateTime? AggreementStartDate { get; set; }
        public DateTime? AggreementEndDate { get; set; }
        public int CurrencyId { get; set; }
        public string SchoolKey { get; set; }

    }
}
