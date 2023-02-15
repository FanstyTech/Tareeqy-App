using DAL.Dto.School;
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
        Task DeleteSchoolProfileById(List<int> Ids);

    }
}
