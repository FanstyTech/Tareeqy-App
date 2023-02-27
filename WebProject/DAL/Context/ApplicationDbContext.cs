using DAL.Model;
using DAL.Model.Message;
using DAL.Model.User;
using DAL.SeedData;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Model.Common;
using DAL.Model.Agreement;
using DAL.Model.School;
using System.Reflection.Emit;

namespace DAL.Context
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {


        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<SchoolProfile>()
                            .HasOne(c => c.Country)
                            .WithMany()
                            .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<SchoolProfile>()
                     .HasOne(c => c.City)
                     .WithMany()
                     .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<SchoolProfile>()
                     .HasOne(c => c.Governorate)
                     .WithMany()
                     .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<SchoolProfile>()
                     .HasOne(c => c.Currency)
                     .WithMany()
                     .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Agreement>(b =>
            {
                b.HasQueryFilter(x => !x.IsDeleted);
            });
            builder.Entity<Currency>(b =>
            {
                b.HasQueryFilter(x => !x.IsDeleted);
            });
            builder.Entity<Country>(b =>
            {
                b.HasQueryFilter(x => !x.IsDeleted);
            });
            builder.Entity<City>(b =>
            {
                b.HasQueryFilter(x => !x.IsDeleted);
            });
            builder.Entity<Governorate>(b =>
            {
                b.HasQueryFilter(x => !x.IsDeleted);
            });
            builder.Entity<SchoolEmployee>(b =>
            {
                b.HasQueryFilter(x => !x.IsDeleted);
            });
            builder.Entity<SchoolProfile>(b =>
            {
                b.HasQueryFilter(x => !x.IsDeleted);
            });
            builder.Entity<SchoolWorkingTime>(b =>
            {
                b.HasQueryFilter(x => !x.IsDeleted);
            });
            builder.Entity<SchoolStudent>(b =>
            {
                b.HasQueryFilter(x => !x.IsDeleted);
            });
            builder.Entity<LicenseType>(b =>
            {
                b.HasQueryFilter(x => !x.IsDeleted);
            });
            // initialize seed data
            new DAL.SeedData.SeedData(builder);

        }
        // public DbSet<ModelNamedel> ModelNames { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Connection> Connections { get; set; }

        #region Common
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Governorate> Governorates { get; set; }
        #endregion

        #region Agreement
        public DbSet<Agreement> Agreements { get; set; }
        #endregion

        #region School
        public DbSet<SchoolProfile> SchoolProfiles { get; set; }
        public DbSet<SchoolEmployee> SchoolEmployees { get; set; }
        public DbSet<SchoolWorkingTime> SchoolWorkingTimes { get; set; }
        public DbSet<LicenseType> LicenseTypes { get; set; }
        public DbSet<SchoolStudent> SchoolStudents { get; set; }
        #endregion


    }
}

