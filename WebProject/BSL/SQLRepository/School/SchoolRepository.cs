using AutoMapper;
using Constant;
using DAL.Context;
using DAL.Dto.Common;
using DAL.Dto.School;
using DAL.Model.Common;
using DAL.Model.School;
using MangeData.Interface.Common;
using MangeData.Interface.School;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using static DAL.Enum.Enums;

namespace MangeData.SQLRepository.School
{
    public class SchoolRepository : ISchoolRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IAttachmentRepository _attachmentRepository;

        public SchoolRepository(ApplicationDbContext context, IAttachmentRepository attachmentRepository)
        {
            _context = context;
            _attachmentRepository = attachmentRepository;
        }

        public async Task DeleteSchoolProfileById(List<int> Ids)
        {
            var schoolProfiles = await _context.SchoolProfiles.Where(c => Ids.Contains(c.Id)).ToListAsync();
            _context.SchoolProfiles.RemoveRange(schoolProfiles);
            _context.SaveChanges();
        }

        public async Task<List<SchoolProfileDto>> GetAllSchoolProfile()
        {
            var dbList = await _context.SchoolProfiles.Include(c => c.Currency).Select(c => _mapper.Map<SchoolProfileDto>(c)).ToListAsync();
            return dbList;
        }

        public async Task<SchoolProfileDto> GetSchoolProfileById(int Id)
        {
            var schoolProfile = await _context.SchoolProfiles
                                     .AsNoTracking().FirstOrDefaultAsync(c => c.Id == Id);
            return _mapper.Map<SchoolProfileDto>(schoolProfile);
        }

        public async Task<int> SaveSchoolProfile(SchoolProfileDto obj)
        {
            if (!obj.Id.HasValue)
                return await CreateSchoolProfile(_mapper.Map<SchoolProfile>(obj), obj.File);
            else
                return await UpdateSchoolProfile(_mapper.Map<SchoolProfile>(obj), obj.File);

        }

        private async Task<int> CreateSchoolProfile(SchoolProfile obj, IFormFile file)
        {
            // Begin context transaction
            using var trans = _context.Database.BeginTransaction();

            try
            {
                await _context.SchoolProfiles.AddAsync(obj);
                await _context.SaveChangesAsync();
                await _attachmentRepository.SaveAttachment(new AttachmentDto { Files = new List<IFormFile> { file }, AttatchmentTypeId = AttatchmentTypeEnum.SchoolLogo, PrimeryTableId = obj.Id });
                trans.Commit();

            }
            catch (Exception ex)
            {
                trans.Rollback();
                throw new Exception(ex.Message);
            }
            return obj.Id;
        }
        private async Task<int> UpdateSchoolProfile(SchoolProfile obj, IFormFile file)
        {
            // Begin context transaction
            using var trans = _context.Database.BeginTransaction();

            try
            {
                var oldSchoolProfile = await GetSchoolProfileById(obj.Id);
                var schoolProfile = _mapper.Map<SchoolProfile>(oldSchoolProfile);
                schoolProfile = Utils.CopyNonNullProperties(obj, schoolProfile);
                _context.SchoolProfiles.Update(schoolProfile);
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




    }
}
