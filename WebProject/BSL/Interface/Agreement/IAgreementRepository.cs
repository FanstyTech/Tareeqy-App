using DAL.Dto.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MangeData.Interface.Agreement
{
    public interface IAgreementRepository
    {
        Task<List<SelectDto>> GetAgreementForSelect(GetForSelectFilterDto input);
    }
}
