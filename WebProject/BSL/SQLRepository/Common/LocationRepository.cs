using AutoMapper;
using Constant;
using DAL.Context;
using DAL.Dto.Common;
using DAL.Model.Common;
using MangeData.Interface.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DAL.Enum.Enums;

namespace MangeData.SQLRepository.Common
{
    public class LocationRepository : ILocationRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IAttachmentRepository _attachmentRepository;
        public LocationRepository(ApplicationDbContext context, IMapper mapper, IAttachmentRepository attachmentRepository)
        {
            _context = context;
            _mapper = mapper;
            _attachmentRepository = attachmentRepository;
        }


        public async Task DeleteCountry(List<int> Ids)
        {
            var Countries = await _context.Countries.Where(c => Ids.Contains(c.Id)).ToListAsync();
            Countries.ForEach(c =>
            {
                c.IsDeleted = true;
                c.DeletionTime = DateTime.Now;
            });
            _context.Countries.UpdateRange(Countries);
            _context.SaveChanges();
        }

        public async Task<List<CountryDto>> GetAllCountry()
        {
            var dbList = await _context.Countries.Include(c => c.Currency).Select(c => _mapper.Map<CountryDto>(c)).ToListAsync();
            return dbList;
        }

        public async Task<CountryDto> GetCountryById(int Id)
        {
            var oldCountry = await _context.Countries.Include(c => c.Currency).AsNoTracking().FirstOrDefaultAsync(c => c.Id == Id);
            return _mapper.Map<CountryDto>(oldCountry);
        }

        public async Task<int> SaveCountry(CountryDto obj)
        {
            if (!obj.Id.HasValue)
                return await CreateCountry(_mapper.Map<Country>(obj), obj.File);
            else
                return await UpdateCountry(_mapper.Map<Country>(obj), obj.File);
        }

        private async Task<int> CreateCountry(Country obj, IFormFile file)
        {
            // Begin context transaction
            using var trans = _context.Database.BeginTransaction();

            try
            {
                await _context.Countries.AddAsync(obj);
                await _context.SaveChangesAsync();
                await _attachmentRepository.SaveAttachment(new AttachmentDto { Files = new List<IFormFile> { file }, AttatchmentTypeId = AttatchmentTypeEnum.CountryFlag, PrimeryTableId = obj.Id });
                trans.Commit();

            }
            catch (Exception ex)
            {
                trans.Rollback();
                throw new Exception(ex.Message);
            }
            return obj.Id;

        }

        private async Task<int> UpdateCountry(Country obj, IFormFile file)
        {

            // Begin context transaction
            using var trans = _context.Database.BeginTransaction();

            try
            {
                var oldCountry = await GetCountryById(obj.Id);
                var country = _mapper.Map<Country>(oldCountry);

                country.Name = obj.Name;
                country.Code = obj.Code;
                country.Currency = obj.Currency;
                country.IsActive = obj.IsActive;

                _context.Countries.Update(country);
                _context.SaveChanges();

                if (file != null)
                {
                    await _attachmentRepository.SaveAttachment(new AttachmentDto { Files = new List<IFormFile> { file }, AttatchmentTypeId = AttatchmentTypeEnum.CountryFlag, PrimeryTableId = obj.Id });
                }
                trans.Commit();

            }
            catch (Exception ex)
            {
                trans.Rollback();
                throw new Exception(ex.Message);
            }
            return obj.Id;
        }

        public async Task<List<SelectDto>> GetCityForSelect(GetForSelectFilterDto input)
        {
            return await _context.Cities
                        .WhereIf(input.MasterId.HasValue, c => c.CountryId == input.MasterId)
                        .Select(c => new SelectDto
                        {
                            Id = c.Id,
                            Label = c.Name,
                        }).ToListAsync();
        }

        public async Task<List<SelectDto>> GetCountryForSelect(GetForSelectFilterDto input)
        {
            return await _context.Countries
                       .Select(c => new SelectDto
                       {
                           Id = c.Id,
                           Label = c.Name,
                       }).ToListAsync();
        }

        public async Task<List<SelectDto>> GetGovernorateForSelect(GetForSelectFilterDto input)
        {
            return await _context.Governorates
                        .WhereIf(input.MasterId.HasValue && input.MasterId.Value > 0, c => c.CityId == input.MasterId)
                        .Select(c => new SelectDto
                        {
                            Id = c.Id,
                            Label = c.Name,
                        }).ToListAsync();
        }


    }
}
