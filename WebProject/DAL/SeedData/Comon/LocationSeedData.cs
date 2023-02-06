using DAL.Model.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.SeedData.Comon
{
    public class LocationSeedData
    {
        public LocationSeedData(ModelBuilder builder)
        {
            List<Country> countryLst = new List<Country>() {
                new Country { Id = 1, Name="فلسطين",Code="00972",CurrencyId= 1, IsActive=true },
                new Country { Id = 2,Name="الاردن",Code="00962",CurrencyId= 4, IsActive=true}
            };
            List<City> cityLst = new List<City>() {
                new City { Id = 1, CountryId = 1 , Name="غزة", IsActive=true },
                new City { Id = 2, CountryId = 1 , Name="بيت لحم", IsActive=true },
                new City { Id = 3, CountryId = 1 , Name="بئر السبع", IsActive=true },
                new City { Id = 4, CountryId = 1 , Name="القدس", IsActive=true },
                new City { Id = 5, CountryId = 1 , Name="رام الله", IsActive=true },
            };
            List<Governorate> governorateLst = new List<Governorate>() {
                new Governorate { Id = 1, CityId = 1 , Name="غزة", IsActive=true },
                new Governorate { Id = 2, CityId = 1 , Name="الوسطى", IsActive=true },
                new Governorate { Id = 3, CityId = 1 , Name="شمال", IsActive=true },
                new Governorate { Id = 4, CityId = 1 , Name="جنوب", IsActive=true },
            };

            builder.Entity<Country>().HasData(countryLst);
            builder.Entity<City>().HasData(cityLst);
            builder.Entity<Governorate>().HasData(governorateLst);

        }
    }
}
