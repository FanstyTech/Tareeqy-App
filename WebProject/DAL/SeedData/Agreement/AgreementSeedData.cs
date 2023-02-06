using DAL.Model.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.SeedData.Agreement
{
    public class AgreementSeedData
    {
        public AgreementSeedData(ModelBuilder builder)
        {
            List<DAL.Model.Agreement.Agreement> agreementLst = new List<Model.Agreement.Agreement>
            {
                new Model.Agreement.Agreement
                {
                    Id = 1,
                    Duration = 1,
                    DurationType = Enum.Enums.DurationTypeEnum.Year,
                    Description = "افتراضي",
                    Title  = "افتراضي",
                    Price = 100,
                    CurrencyId = 1,
                    IsActive = true,
                }
            };
            builder.Entity<DAL.Model.Agreement.Agreement>().HasData(agreementLst);

        }
    }
}
