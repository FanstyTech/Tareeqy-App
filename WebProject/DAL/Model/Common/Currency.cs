﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.Common
{
    public class Currency : AppModelBase
    {

        public string Name { get; set; }
        public string CurrencySymbol { get; set; }
        public ICollection<Country> Countries { get; set; }

    }
}
