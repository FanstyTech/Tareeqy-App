using DAL.Dto.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MangeData.Interface.Common
{
    public interface IAttachmentRepository
    {
        Task SaveAttachment(AttachmentDto obj);
        AttachmentDownloadDto AttachmentDownload(AttachmentDto obj);

    }
}
