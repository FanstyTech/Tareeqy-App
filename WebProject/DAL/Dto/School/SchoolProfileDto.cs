using DAL.Dto.Agreement;
using DAL.Dto.Common;
using DAL.Model.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
#nullable disable

namespace DAL.Dto.School
{
    public class SchoolProfileDto
    {
        public int? Id { get; set; }
        public string? NameL { get; set; }
        public string? NameF { get; set; }
        public string? LicensedOperatorNumber { get; set; }
        public string? Bio { get; set; }

        public string Address { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public string? SchoolIdentificationKey { get; set; }
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
        public decimal? AgreementPrice { get; set; }
        public int? AgreementId { get; set; }

        // Address Details
        public int? CountryId { get; set; }
        //public Country Country { get; set; }
        public int? GovernorateId { get; set; }
        public int? CityId { get; set; }
        public int? CurrencyId { get; set; }
        public bool IsActive { get; set; }


        public CountryDto? Country { get; set; }
        public GovernorateDto? Governorate { get; set; }
        public CityDto? City { get; set; }
        public CurrencyDto? Currency { get; set; }
        public AgreementDto? Agreement { get; set; }

        public IFormFile? File { get; set; }
    }
}
