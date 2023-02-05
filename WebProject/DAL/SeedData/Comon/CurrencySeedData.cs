using DAL.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.SeedData.Comon
{
    public class CurrencySeedData
    {
        public CurrencySeedData(ModelBuilder builder)
        {
            List<DAL.Model.Common.Currency> list = new List<DAL.Model.Common.Currency>() {
                new Model.Common.Currency
                {
                    Id= 1,
                    Name ="شيكل",
                    CurrencySymbol ="₪",
                    IsActive= true,
                },
                new Model.Common.Currency
                {
                    Id= 2,
                    Name ="دولار",
                    CurrencySymbol ="$",
                    IsActive= true,
                },
                new Model.Common.Currency
                {
                    Id= 3,
                    Name ="يورو",
                    CurrencySymbol ="€",
                    IsActive= true,
                },
            };
            builder.Entity<DAL.Model.Common.Currency>().HasData(list);

        }
    }
}
