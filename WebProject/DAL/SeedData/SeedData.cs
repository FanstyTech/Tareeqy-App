using DAL.SeedData.Comon;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.SeedData
{
    public class SeedData
    {
        public SeedData(ModelBuilder builder)
        {
            #region common seed data
            new CurrencySeedData(builder);
            #endregion

            #region user seed data
            new UserSeedData(builder);
            #endregion
        }
    }
}
