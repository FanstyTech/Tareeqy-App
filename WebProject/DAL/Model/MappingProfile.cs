using AutoMapper;
using DAL.Dto.Message;
using DAL.Dto.User;

using DAL.Model.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Model.Common;
using DAL.Dto.Common;
using DAL.SeedData.Agreement;
using DAL.SeedData.Comon;
using DAL.Dto.Agreement;
using DAL.Dto.School;
using DAL.Model.School;

namespace DAL.Model
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<ApplicationUser, UserDataDto>();
            CreateMap<UserDataDto, ApplicationUser>();

            CreateMap<Connection, UserConnectionDto>();
            CreateMap<UserConnectionDto, Connection>();

            CreateMap<DAL.Model.Message.Message, MessageDto>();
            CreateMap<MessageDto, DAL.Model.Message.Message>();


            #region Agreement
            CreateMap<AgreementDto, DAL.Model.Agreement.Agreement>();
            CreateMap<DAL.Model.Agreement.Agreement, AgreementDto>();
            #endregion

            #region common
            CreateMap<CountryDto, Country>();
            CreateMap<Country, CountryDto>();

            CreateMap<CurrencyDto, Currency>();
            CreateMap<Currency, CurrencyDto>();

            CreateMap<AttachmentDto, Attachment>();
            CreateMap<Attachment, AttachmentDto>();

            CreateMap<CityDto, City>();
            CreateMap<City, CityDto>();

            CreateMap<GovernorateDto, Governorate>();
            CreateMap<Governorate, GovernorateDto>();
            #endregion

            #region school
            CreateMap<SchoolProfileDto, SchoolProfile>();
            CreateMap<SchoolProfile, SchoolProfileDto>();
            #endregion  
        }
    }
}
