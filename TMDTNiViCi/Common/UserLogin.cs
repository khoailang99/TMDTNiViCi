using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMDTNiViCi.Common
{
    [Serializable]
    public class UserLogin
    {
        public int UserID { get; set; }
        public string AccountName { get; set; }
    }
}