﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.Common
{
    public class Governorate : AppModelBase
    {
        public string Name { get; set; }
        public int CityId { get; set; }
        [ForeignKey(nameof(CityId))]
        public City City { get; set; }
    }
}
