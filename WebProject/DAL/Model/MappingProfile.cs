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

            CreateMap<CountryDto, Country>();
            CreateMap<Country, CountryDto>();

            CreateMap<AttachmentDto, Attachment>();
            CreateMap<Attachment, AttachmentDto>();

        }
    }
}
