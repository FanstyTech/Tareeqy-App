using DAL.Model.Common;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Model.Agreement;
namespace DAL.Model.School
{
    public class SchoolProfile : AppModelBase
    {
        public string NameL { get; set; }
        public string NameF { get; set; }
        public string LicensedOperatorNumber { get; set; }
        public string? Bio { get; set; }


        public string Address { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public string SchoolIdentificationKey { get; set; }
        // Social Links
        public string? ContactNumber { get; set; }
        public string? WhatsAppNumber { get; set; }
        public string? FacebookPageURL { get; set; }
        public string? InstagramPageURL { get; set; }
        public string? TwitterPageURL { get; set; }
        public string? LinkedinPageURL { get; set; }
        // Agreement Details
        public DateTime? AgreementStartDate { get; set; }
        public DateTime? AgreementEndDate { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal? AgreementPrice { get; set; }
        public int? AgreementId { get; set; }
        [ForeignKey(nameof(AgreementId))]
        public DAL.Model.Agreement.Agreement Agreement { get; set; }

        // Address Details
        public int? CountryId { get; set; }
        [ForeignKey(nameof(CountryId))]
        public Country Country { get; set; }
        public int? GovernorateId { get; set; }
        [ForeignKey(nameof(CountryId))]
        public Governorate Governorate { get; set; }
        public int? CityId { get; set; }
        [ForeignKey(nameof(CountryId))]
        public City City { get; set; }
        public int? CurrencyId { get; set; }
        [ForeignKey(nameof(CurrencyId))]
        public Currency Currency { get; set; }
        public ICollection<SchoolEmployee> SchoolEmployees { get; set; }
        public string GenerateSchoolIdentificationKey()
        {
            if (string.IsNullOrEmpty(NameF) || NameF.Length < 2)
            {
                return string.Empty;
            }

            return NameF.Substring(0, 2).ToUpper();
        }
    }
}
