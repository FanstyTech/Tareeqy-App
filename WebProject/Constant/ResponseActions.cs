using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Constant
{
    public class ResponseActions
    {
        public HttpStatusCode code { get; set; }
        public string message { get; set; }
        public bool status { get; set; }
        public object data { get; set; }
    }
}
