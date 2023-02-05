using AutoMapper;
using DAL.Context;
using DAL.Dto.Common;
using DAL.Model.Common;
using DAL.Model.Message;
using MangeData.Interface;
using MangeData.Interface.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MangeData.SQLRepository.Common
{
    public class CountryRepository : ICountryRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IAttachmentRepository _attachmentRepository;
        public CountryRepository(ApplicationDbContext context, IMapper mapper, IAttachmentRepository attachmentRepository)
        {
            _context = context;
            _mapper = mapper;
            _attachmentRepository = attachmentRepository;
        }

        public async Task Delete(List<int> Ids)
        {
            var Countries = await _context.Countries.Where(c => Ids.Contains(c.Id)).ToListAsync();

            _context.Countries.RemoveRange(Countries);
            _context.SaveChanges();
        }

        public async Task<List<CountryDto>> GetAll()
        {
            var dbList = await _context.Countries.Include(c => c.Currency).Select(c => _mapper.Map<CountryDto>(c)).ToListAsync();
            return dbList;
        }

        public async Task<CountryDto> GetById(int Id)
        {
            var oldCountry = await _context.Countries.Include(c => c.Currency).AsNoTracking().FirstOrDefaultAsync(c => c.Id == Id);
            return _mapper.Map<CountryDto>(oldCountry);
        }

        public async Task<int> Save(CountryDto obj)
        {
            if (!obj.Id.HasValue)
                return await Create(_mapper.Map<Country>(obj), obj.File);
            else
                return await Update(_mapper.Map<Country>(obj), obj.File);
        }

        private async Task<int> Create(Country obj, IFormFile file)
        {
            // Begin context transaction
            using var trans = _context.Database.BeginTransaction();

            try
            {
                await _context.Countries.AddAsync(obj);
                await _context.SaveChangesAsync();
                await _attachmentRepository.SaveAttachment(new AttachmentDto { Files = new List<IFormFile> { file }, AttatchmentTypeId = 1, PrimeryTableId = obj.Id });
                trans.Commit();

            }
            catch (Exception ex)
            {
                trans.Rollback();
                throw new Exception(ex.Message);
            }
            return obj.Id;

        }

        private async Task<int> Update(Country obj, IFormFile file)
        {

            // Begin context transaction
            using var trans = _context.Database.BeginTransaction();

            try
            {
                var oldCountry = await GetById(obj.Id);
                var country = _mapper.Map<Country>(oldCountry);

                country.Name = obj.Name;
                country.Code = obj.Code;
                country.Currency = obj.Currency;
                country.IsActive = obj.IsActive;

                _context.Countries.Update(country);
                _context.SaveChanges();

                if (file != null)
                {
                    await _attachmentRepository.SaveAttachment(new AttachmentDto { Files = new List<IFormFile> { file }, AttatchmentTypeId = 1, PrimeryTableId = obj.Id });
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
    }
}
