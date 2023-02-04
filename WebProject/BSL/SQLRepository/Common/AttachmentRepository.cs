using AutoMapper;
using Constant;
using DAL.Context;
using DAL.Dto.Common;
using DAL.Model.Common;
using MangeData.Interface.Common;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

namespace MangeData.SQLRepository.Common
{
    public class AttachmentRepository : IAttachmentRepository
    {
        private readonly IHostingEnvironment _env;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public AttachmentRepository(IHostingEnvironment env, IMapper mapper, ApplicationDbContext context)
        {
            _env = env;
            _mapper = mapper;
            _context = context;
        }

        public AttachmentDownloadDto AttachmentDownload(AttachmentDto obj)
        {
            AttachmentDownloadDto fileContent = new AttachmentDownloadDto();
            try
            {
                var file = _context.Attachments.FirstOrDefault(c => c.PrimeryTableId == obj.PrimeryTableId && c.AttatchmentTypeId == obj.AttatchmentTypeId);
                string filePath = Path.Combine(_env.WebRootPath, "FileUpload", file.Name);
                using var stream = new MemoryStream(System.IO.File.ReadAllBytes(filePath).ToArray());
                fileContent.ContentType = file.ContentType;
                fileContent.FileContent = stream.ToArray();
                fileContent.FileName = file.OriginalName;
            }
            catch
            {
            }
            return fileContent;
        }

        public async Task SaveAttachment(AttachmentDto obj)
        {
            // save file
            List<Attachment> files = new List<Attachment>();

            if (obj.Files != null)
            {
                foreach (var file in obj.Files)
                {

                    // Get file extension
                    string type = System.IO.Path.GetExtension(file.FileName);
                    string name = file.FileName;
                    string fileName = Guid.NewGuid().ToString() + type;
                    string filePath = Path.Combine(_env.WebRootPath, "FileUpload", fileName);
                    using (FileStream FS = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(FS);
                        //Close the File Stream
                        FS.Close();
                    }
                    var Attachment = new Attachment
                    {
                        ContentType = file.ContentType,
                        FileSize = Utils.SizeSuffix(file.Length),
                        Name = fileName,
                        OriginalName = name,
                        CreationTime = DateTime.Now,
                        PrimeryTableId = obj.PrimeryTableId.Value,
                        Extension = type,
                        AttatchmentTypeId = obj.AttatchmentTypeId.Value,

                    };
                    files.Add(Attachment);
                }

            }
            await _context.Attachments.AddRangeAsync(files);
            await _context.SaveChangesAsync();
        }
    }
}
