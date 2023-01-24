using DAL.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.SeedData
{
    public class UserSeedData
    {
       
        public UserSeedData(ModelBuilder builder )
        {

            string ADMIN_ID = "02174cf0–9412–4cfe-afbf-59f706d72cf6";
            string ADMIN_ROLE_ID = "341743f0-asd2–42de-afbf-59kmkkmk72cf6";
            string VISITOR_ROLE_ID = "341743f0-asd2–42de-afbf-59kvvkmk72cf6";


            ApplicationUser user =
                    new ApplicationUser
                    {
                        Id = ADMIN_ID,
                        Email = "admin@admin.com",
                        UserName = "admin@admin.com",
                        NickName = "Admin",
                        UserType = ApplicationUserType.Admin,
                        IsActive = true,
                        PhoneNumber = "",
                    };
            //set user password
            PasswordHasher<ApplicationUser> ph = new PasswordHasher<ApplicationUser>();
            user.PasswordHash = ph.HashPassword(user, "P@ssw0rd");

            //seed user
            builder.Entity<ApplicationUser>().HasData(user);


            //seed Role
            builder.Entity<IdentityRole>().HasData(
                  new IdentityRole
                  {
                      Id = VISITOR_ROLE_ID,
                      Name = "Visitor",
                      NormalizedName = "VISITOR"
                  },
                  new IdentityRole
                  {
                      Id= ADMIN_ROLE_ID,
                      Name = "Administrator",
                      NormalizedName = "ADMINISTRATOR"
                  });

            //set user role to admin
            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                RoleId = ADMIN_ROLE_ID,
                UserId = ADMIN_ID
            });


        }
    }
}
