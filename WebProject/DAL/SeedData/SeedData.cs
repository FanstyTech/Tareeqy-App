using DAL.SeedData.Agreement;
using DAL.SeedData.Comon;
using DAL.SeedData.School;
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
            new LocationSeedData(builder);
            new AttachmentSeedData(builder);
            new AgreementSeedData(builder);
            #endregion

            #region user seed data
            new UserSeedData(builder);
            #endregion
            #region school seed data
            new LicenseTypeSeedData(builder);
            #endregion

        }
    }
}
