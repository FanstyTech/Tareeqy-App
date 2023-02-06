using AutoMapper;
using Constant;
using DAL.Context;
using DAL.Dto.Common;
using DAL.Model.Common;
using MangeData.Interface.Common;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
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
                string filePath = Path.Combine(_env.WebRootPath, "FileUpload", obj.AttatchmentTypeId.ToString(), file.Name);
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

                var exsistFile = await _context.Attachments.Where(c => c.PrimeryTableId == obj.PrimeryTableId && c.AttatchmentTypeId == obj.AttatchmentTypeId).ToListAsync();
                if (exsistFile.Count > 0)
                {
                    foreach (var item in exsistFile.Select(c => Path.Combine(_env.WebRootPath, "FileUpload", c.Name).ToString()))
                    {
                        if (System.IO.File.Exists(item))
                        {
                            System.IO.File.Delete(item);
                        }
                    }
                    _context.Attachments.RemoveRange(exsistFile);
                }

                foreach (var file in obj.Files)
                {

                    // Get file extension
                    string type = System.IO.Path.GetExtension(file.FileName);
                    string name = file.FileName;
                    string fileName = Guid.NewGuid().ToString() + type;


                    string rootPath = Path.Combine(_env.WebRootPath, "FileUpload", obj.AttatchmentTypeId.ToString(), fileName);

                    // If directory does not exist, create one
                    if (!Directory.Exists(rootPath))
                        Directory.CreateDirectory(rootPath);

                    string filePath = Path.Combine(rootPath, fileName);


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
