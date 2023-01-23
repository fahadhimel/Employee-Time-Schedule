using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Santo_Api_All.Models
{
    public class Login
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string PhoneNo { get; set; }
        public string Password { get; set; }
        public int IsActive { get; set; }
    }
}

