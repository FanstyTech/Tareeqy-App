﻿using AutoMapper;
using Constant;
using DAL.Context;
using DAL.Dto.Common;
using DAL.Dto.School;
using DAL.Dto.User;
using DAL.Model.Common;
using DAL.Model.School;
using MangeData.Interface;
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
        private readonly IUserRepository _userRepository;

        public SchoolRepository(ApplicationDbContext context, IAttachmentRepository attachmentRepository, IMapper mapper, IUserRepository userRepository)
        {
            _context = context;
            _attachmentRepository = attachmentRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public async Task DeleteSchoolProfileByIds(List<int> Ids)
        {
            var schoolProfiles = await _context.SchoolProfiles.Where(c => Ids.Contains(c.Id)).ToListAsync();
            schoolProfiles.ForEach(c =>
            {
                c.IsDeleted = true;
                c.DeletionTime = DateTime.Now;
            });
            _context.SchoolProfiles.UpdateRange(schoolProfiles);
            _context.SaveChanges();
        }

        public async Task<List<SchoolProfileDto>> GetAllSchoolProfile()
        {
            var dbList = await _context.SchoolProfiles.Include(c => c.Currency)
                .Include(c => c.Country)
                .Include(c => c.Governorate)
                .Include(c => c.City)
                .Include(c => c.Agreement)
                .Select(c => _mapper.Map<SchoolProfileDto>(c)).ToListAsync();
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
            SchoolProfile sd = _mapper.Map<SchoolProfile>(obj);
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
                obj.SchoolIdentificationKey = obj.GenerateSchoolIdentificationKey();
                obj.CreationTime = DateTime.Now;

                await _context.SchoolProfiles.AddAsync(obj);
                await _context.SaveChangesAsync();
                if (file != null)
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


        public async Task<List<SchoolEmployeeDto>> GetAllSchoolEmployee(int? SchoolProfileId)
        {
            return await _context.SchoolEmployees
                                .Include(c => c.User)
                                .WhereIf(SchoolProfileId.HasValue, c => c.SchoolProfileId == SchoolProfileId)
                                .Select(c => new SchoolEmployeeDto
                                {
                                    DateOfBirth = c.User.DateOfBirth,
                                    DateOfHiring = c.DateOfHiring,
                                    Email = c.User.Email,
                                    Gender = c.User.Gender,
                                    IdNum = c.User.IdNum,
                                    NickName = c.User.NickName,
                                    PhoneNumber = c.User.PhoneNumber,
                                    Salary = c.Salary,
                                    IsActive = c.User.IsActive,
                                    SchoolProfileId = c.SchoolProfileId,
                                    SchoolUserType = c.SchoolUserType,
                                    Id = c.Id,
                                    UserId = c.UserId,
                                    DateOfBirthString = c.User.DateOfBirth.Value.ToShortDateString(),
                                    DateOfHiringString = c.DateOfHiring.Value.ToShortDateString(),
                                    RegisterDateString = c.User.RegisterDate.ToShortDateString(),
                                }).ToListAsync();
        }
        public async Task<int> SaveSchoolEmployee(SchoolEmployeeDto obj)
        {
            int result = 0;
            if (obj.Id.HasValue)
                result = await UpdateSchoolEmployee(obj);
            else
                result = await CreateSchoolEmployee(obj);

            return result;
        }
        private async Task<int> CreateSchoolEmployee(SchoolEmployeeDto obj)
        {
            // Begin context transaction
            using var trans = _context.Database.BeginTransaction();

            try
            {
                CreateAccountDto newuser = new CreateAccountDto()
                {
                    Email = obj.Email,
                    NickName = obj.NickName,
                    PhoneNumber = obj.PhoneNumber,
                    DateOfBirth = obj.DateOfBirth,
                    Gender = obj.Gender,
                    IsActive = obj.IsActive,
                    UserType = DAL.Model.ApplicationUserType.Client,
                    IdNum = obj.IdNum,
                    Password = obj.Email
                };

                var UserData = await _userRepository.CreateAccount(newuser);

                SchoolEmployee schoolEmployee = new SchoolEmployee()
                {
                    CreationTime = DateTime.Now,
                    DateOfHiring = obj.DateOfHiring,
                    IsActive = obj.IsActive,
                    Salary = obj.Salary,
                    SchoolProfileId = obj.SchoolProfileId,
                    UserId = UserData.Id,
                    SchoolUserType = obj.SchoolUserType
                };

                await _context.SchoolEmployees.AddAsync(schoolEmployee);
                await _context.SaveChangesAsync();
                obj.Id = schoolEmployee.Id;
                if (obj.File != null)
                    await _attachmentRepository.SaveAttachment(new AttachmentDto { Files = new List<IFormFile> { obj.File }, AttatchmentTypeId = AttatchmentTypeEnum.UserPhoto, PrimeryTableId = obj.Id });
                trans.Commit();

            }
            catch (Exception ex)
            {
                trans.Rollback();
                throw new Exception(ex.Message);
            }
            return obj.Id.Value;
        }
        private async Task<int> UpdateSchoolEmployee(SchoolEmployeeDto obj)
        {
            // Begin context transaction
            using var trans = _context.Database.BeginTransaction();

            try
            {

                CreateAccountDto newuser = new CreateAccountDto()
                {
                    Email = obj.Email,
                    NickName = obj.NickName,
                    PhoneNumber = obj.PhoneNumber,
                    DateOfBirth = obj.DateOfBirth,
                    Gender = obj.Gender,
                    IsActive = obj.IsActive,
                    IdNum = obj.IdNum,
                    UserId = obj.UserId,
                };
                await _userRepository.UpdateAccount(newuser);

                var oldEmployee = await _context.SchoolEmployees.AsNoTracking().FirstOrDefaultAsync(c => c.Id == obj.Id); //await GetSchoolEmployeeById(obj.Id.Value);
                oldEmployee.DateOfHiring = obj.DateOfHiring;
                oldEmployee.IsActive = obj.IsActive;
                oldEmployee.Salary = obj.Salary;
                oldEmployee.SchoolUserType = obj.SchoolUserType;
                _context.SchoolEmployees.Update(oldEmployee);
                await _context.SaveChangesAsync();

                if (obj.File != null)
                    await _attachmentRepository.SaveAttachment(new AttachmentDto { Files = new List<IFormFile> { obj.File }, AttatchmentTypeId = AttatchmentTypeEnum.UserPhoto, PrimeryTableId = obj.Id });
                trans.Commit();

            }
            catch (Exception ex)
            {
                trans.Rollback();
                throw new Exception(ex.Message);
            }
            return obj.Id.Value;
        }

        public async Task<SchoolEmployee> GetSchoolEmployeeById(int Id)
        {
            return await _context.SchoolEmployees.Include(c => c.User).AsNoTracking().FirstOrDefaultAsync(c => c.Id == Id);
        }

        public async Task DeleteSchoolEmployeeeByIds(List<int> Ids)
        {
            var schoolEmployees = await _context.SchoolEmployees.Where(c => Ids.Contains(c.Id)).ToListAsync();
            schoolEmployees.ForEach(c =>
            {
                c.IsDeleted = true;
                c.DeletionTime = DateTime.Now;
            });
            _context.SchoolEmployees.UpdateRange(schoolEmployees);
            _context.SaveChanges();
        }

        public async Task<List<SchoolWorkingTimeDto>> GetSchoolWorkingTime(int SchoolProfileId)
        {

            var schoolWorkingTimes = await _context.SchoolWorkingTimes.Where(c => c.SchoolProfileId == SchoolProfileId).ToListAsync();

            List<DayEnum> days = Enum.GetValues(typeof(DayEnum))
                          .Cast<DayEnum>()
                          .ToList();

            DateTime DefualtStartTime = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 7, 0, 0);
            DateTime DefualtEndTime = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 17, 0, 0);
            var dbLst =
                    (from day in days
                     join workingTime in schoolWorkingTimes
                     on day equals workingTime.Day into workJoinResult
                     from workItem in workJoinResult.DefaultIfEmpty()
                     select new SchoolWorkingTimeDto
                     {
                         Day = day,
                         DayName = day.ToString(),
                         StartTime = workItem?.StartTime == null ? DefualtStartTime : workItem.StartTime,
                         EndTime = workItem?.EndTime == null ? DefualtEndTime : workItem.EndTime,
                         IsSelected = workItem?.Id != null ? true : false,
                         Id = null,
                         SchoolProfileId = SchoolProfileId
                     }).ToList();
            return dbLst;
        }

        public async Task<List<SchoolWorkingTimeDto>> SaveSchoolWorkingTime(List<SchoolWorkingTimeDto> lst)
        {

            int SchoolProfileId = lst.FirstOrDefault().SchoolProfileId;
            // Get All Scool Working Time 
            var schoolWorkingTimes = await _context.SchoolWorkingTimes.Where(c => c.SchoolProfileId == SchoolProfileId).ToListAsync();

            var workingLst = lst.Where(c => c.IsSelected == true);

            if (schoolWorkingTimes.Any())
            {
                _context.RemoveRange(schoolWorkingTimes);
                _context.SaveChanges();
            }

            if (workingLst.Any())
            {
                var working = _mapper.Map<List<SchoolWorkingTime>>(workingLst);
                await _context.AddRangeAsync(working);
                await _context.SaveChangesAsync();
            }
            return await GetSchoolWorkingTime(SchoolProfileId);
        }

        // Student
        public async Task<List<SelectDto>> GetLicenseTypeForSelect()
        {
            return await _context.LicenseTypes.Select(c => new SelectDto
            {
                Id = c.Id,
                Label = c.Name,
                Value = c.Cost.ToString(),
            }).ToListAsync();
        }
        public async Task<int> SaveSchooStudent(SchoolStudentDto obj)
        {
            int result = 0;
            if (obj.Id.HasValue)
                result = await UpdateSchoolStudent(obj);
            else
                result = await CreateSchoolStudent(obj);

            return result;
        }
        private async Task<int> CreateSchoolStudent(SchoolStudentDto obj)
        {
            // Begin context transaction
            using var trans = _context.Database.BeginTransaction();

            try
            {
                CreateAccountDto newuser = new CreateAccountDto()
                {
                    Email = obj.Email,
                    NickName = obj.NickName,
                    PhoneNumber = obj.PhoneNumber,
                    DateOfBirth = obj.DateOfBirth,
                    Gender = obj.Gender,
                    IsActive = obj.IsActive,
                    UserType = DAL.Model.ApplicationUserType.Client,
                    IdNum = obj.IdNum,
                    Password = obj.Email
                };

                var UserData = await _userRepository.CreateAccount(newuser);

                SchoolStudent schoolStudent = new SchoolStudent()
                {
                    CreationTime = DateTime.Now,
                    IsActive = obj.IsActive,
                    Cost = obj.Cost,
                    SchoolProfileId = obj.SchoolProfileId,
                    UserId = UserData.Id,
                    LicenseTypeId = obj.LicenseTypeId.Value
                };

                await _context.SchoolStudents.AddAsync(schoolStudent);
                await _context.SaveChangesAsync();
                obj.Id = schoolStudent.Id;
                if (obj.File != null)
                    await _attachmentRepository.SaveAttachment(new AttachmentDto { Files = new List<IFormFile> { obj.File }, AttatchmentTypeId = AttatchmentTypeEnum.UserPhoto, PrimeryTableId = obj.Id });
                trans.Commit();

            }
            catch (Exception ex)
            {
                trans.Rollback();
                throw new Exception(ex.Message);
            }
            return obj.Id.Value;
        }
        private async Task<int> UpdateSchoolStudent(SchoolStudentDto obj)
        {
            // Begin context transaction
            using var trans = _context.Database.BeginTransaction();

            try
            {

                CreateAccountDto newuser = new CreateAccountDto()
                {
                    Email = obj.Email,
                    NickName = obj.NickName,
                    PhoneNumber = obj.PhoneNumber,
                    DateOfBirth = obj.DateOfBirth,
                    Gender = obj.Gender,
                    IsActive = obj.IsActive,
                    IdNum = obj.IdNum,
                    UserId = obj.UserId,
                };
                await _userRepository.UpdateAccount(newuser);

                var oldStudent = await _context.SchoolStudents.AsNoTracking().FirstOrDefaultAsync(c => c.Id == obj.Id); //await GetSchoolEmployeeById(obj.Id.Value);
                oldStudent.IsActive = obj.IsActive;
                oldStudent.Cost = obj.Cost;
                oldStudent.LicenseTypeId = obj.LicenseTypeId.Value;
                _context.SchoolStudents.Update(oldStudent);
                await _context.SaveChangesAsync();

                if (obj.File != null)
                    await _attachmentRepository.SaveAttachment(new AttachmentDto { Files = new List<IFormFile> { obj.File }, AttatchmentTypeId = AttatchmentTypeEnum.UserPhoto, PrimeryTableId = obj.Id });
                trans.Commit();

            }
            catch (Exception ex)
            {
                trans.Rollback();
                throw new Exception(ex.Message);
            }
            return obj.Id.Value;
        }
        public async Task<List<SchoolStudentDto>> GetAllSchoolStudent(int? SchoolProfileId)
        {
            return await _context.SchoolStudents
                              .Include(c => c.User)
                              .WhereIf(SchoolProfileId.HasValue, c => c.SchoolProfileId == SchoolProfileId)
                              .Select(c => new SchoolStudentDto
                              {
                                  DateOfBirth = c.User.DateOfBirth,
                                  Email = c.User.Email,
                                  Gender = c.User.Gender,
                                  IdNum = c.User.IdNum,
                                  NickName = c.User.NickName,
                                  PhoneNumber = c.User.PhoneNumber,
                                  Cost = c.Cost,
                                  IsActive = c.User.IsActive,
                                  SchoolProfileId = c.SchoolProfileId,
                                  LicenseTypeId = c.LicenseTypeId,
                                  Id = c.Id,
                                  UserId = c.UserId,
                                  DateOfBirthString = c.User.DateOfBirth.Value.ToShortDateString(),
                                  RegisterDateString = c.User.RegisterDate.ToShortDateString(),
                              }).ToListAsync();
        }
        public async Task<SchoolStudent> GetSchoolStudentById(int Id)
        {
            return await _context.SchoolStudents.Include(c => c.User).AsNoTracking().FirstOrDefaultAsync(c => c.Id == Id);
        }
        public async Task DeleteSchoolStudentByIds(List<int> Ids)
        {
            var schoolStudents = await _context.SchoolStudents.Where(c => Ids.Contains(c.Id)).ToListAsync();
            schoolStudents.ForEach(c =>
            {
                c.IsDeleted = true;
                c.DeletionTime = DateTime.Now;
            });
            _context.SchoolStudents.UpdateRange(schoolStudents);
            _context.SaveChanges();
        }
    }
}
