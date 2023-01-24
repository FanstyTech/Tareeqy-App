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

// namespace here !
using DAL.Model.Product;
namespace DAL.Context
{
    public class ApplicationDbContext  : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options) :base(options)
        {


        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            new UserSeedData(builder);
          

        }
        // public DbSet<ModelNamedel> ModelNames { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Connection> Connections { get; set; }
   
    }
}

