using DAL.Context;
using DAL.Dto.Common;
using MangeData.Interface.Agreement;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MangeData.SQLRepository.Agreement
{
    public class AgreementRepository : IAgreementRepository
    {
        public readonly ApplicationDbContext _context;
        public AgreementRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<SelectDto>> GetAgreementForSelect(GetForSelectFilterDto input)
        {
            return await _context.Agreements
            .Select(c => new SelectDto
            {
                Id = c.Id,
                Label = c.Title,
                Value = c.Price.ToString(),
            }).ToListAsync();
        }
    }
}
