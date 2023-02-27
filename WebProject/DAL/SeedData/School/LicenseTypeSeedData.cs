using DAL.Model.School;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.SeedData.School
{
    public class LicenseTypeSeedData
    {
        public LicenseTypeSeedData(ModelBuilder builder)
        {
            List<LicenseType> list = new List<LicenseType>() {
                new LicenseType
                {
                    Id= 1,
                    Name ="ملاكي شفوي",
                    Cost =700,
                    IsActive= true,
                },
                new LicenseType
                {
                    Id= 2,
                    Name ="ملاكي تحريري ",
                    Cost =800,
                    IsActive= true,
                },
                new LicenseType
                {
                    Id= 3,
                    Name ="تجاري شفوي",
                    Cost =900,
                    IsActive= true,
                },
                new LicenseType
                {
                    Id= 4,
                    Name ="تجاري تحريري",
                    Cost =900,
                    IsActive= true,
                },

            };
            builder.Entity<LicenseType>().HasData(list);
        }
    }
}
