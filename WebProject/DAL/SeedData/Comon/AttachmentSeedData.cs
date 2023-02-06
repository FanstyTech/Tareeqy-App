using DAL.Model.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.SeedData.Comon
{
    public class AttachmentSeedData
    {
        public AttachmentSeedData(ModelBuilder builder)
        {
            List<Attachment> attachmentLst = new List<Attachment>() {
               new Attachment {
                   // palestine flag
                   Id = 1,
                   AttatchmentTypeId = Enum.Enums.AttatchmentTypeEnum.CountryFlag,
                   ContentType = "image/png",
                   Extension = ".png",
                   Name = "62d277a3-3bf5-4daf-ae23-a733d2049233.png",
                   OriginalName = "palestine_flag.png",
                   FileSize ="1.8 KB",
                   PrimeryTableId = 1
               },
               new Attachment {
                   // jordan flag
                   Id = 2,
                   AttatchmentTypeId = Enum.Enums.AttatchmentTypeEnum.CountryFlag,
                   ContentType = "image/png",
                   Extension = ".png",
                   Name = "a98f0359-a4f3-49e6-a618-a93541d54874.png",
                   OriginalName = "jordan_flag.png",
                   FileSize ="1.8 KB",
                   PrimeryTableId = 2
               },
            };

            builder.Entity<Attachment>().HasData(attachmentLst);

        }
    }
}
