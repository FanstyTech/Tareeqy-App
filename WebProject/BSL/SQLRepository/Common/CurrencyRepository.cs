using DAL.Context;
using DAL.Dto.Common;
using MangeData.Interface.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MangeData.SQLRepository.Common
{
    public class CurrencyRepository : ICurrencyRepository
    {
        private readonly ApplicationDbContext _context;
        public CurrencyRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<SelectDto>> GetForSelect()
        {
            return await _context.Currencies.Select(c => new SelectDto
            {
                Id = c.Id,
                Label = c.Name,
            }).ToListAsync();
        }
    }
}
