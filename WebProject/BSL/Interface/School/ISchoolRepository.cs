using DAL.Dto.Common;
using DAL.Dto.School;
using DAL.Model.School;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MangeData.Interface.School
{
    public interface ISchoolRepository
    {
        Task<int> SaveSchoolProfile(SchoolProfileDto obj);
        Task<List<SchoolProfileDto>> GetAllSchoolProfile();
        Task<SchoolProfileDto> GetSchoolProfileById(int Id);
        Task DeleteSchoolProfileByIds(List<int> Ids);
        Task<int> SaveSchoolEmployee(SchoolEmployeeDto obj);
        Task<List<SchoolEmployeeDto>> GetAllSchoolEmployee(int? SchoolProfileId);
        Task<SchoolEmployee> GetSchoolEmployeeById(int Id);
        Task DeleteSchoolEmployeeeByIds(List<int> Ids);
        Task<List<SchoolWorkingTimeDto>> GetSchoolWorkingTime(int SchoolProfileId);
        Task<List<SchoolWorkingTimeDto>> SaveSchoolWorkingTime(List<SchoolWorkingTimeDto> lst);


        // Student 
        Task<List<SelectDto>> GetLicenseTypeForSelect();

    }
}
