﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model.Common
{
    public class Advertisements
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int SchoolNumber { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

}
