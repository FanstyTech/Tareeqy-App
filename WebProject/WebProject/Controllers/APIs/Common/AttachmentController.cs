using DAL.Dto.Common;
using MangeData.Interface.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebProject.Controllers.APIs.Common
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttachmentController : ControllerBase
    {
        private readonly IAttachmentRepository _attachmentRepository;

        public AttachmentController(IAttachmentRepository attachmentRepository)
        {
            _attachmentRepository = attachmentRepository;
        }
        [HttpGet("AttachmentDownload")]
        public async Task<IActionResult> AttachmentDownload(int PrimeryTableId, int AttatchmentTypeId)
        {
            var file = _attachmentRepository.AttachmentDownload(new AttachmentDto { AttatchmentTypeId = AttatchmentTypeId, PrimeryTableId = PrimeryTableId });
            return File(file.FileContent, file.ContentType, file.FileName);
        }

    }
}
