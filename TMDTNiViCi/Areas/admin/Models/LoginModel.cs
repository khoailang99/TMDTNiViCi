using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TMDTNiViCi.Areas.admin.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Mời bạn nhập tên tài khoản")]
        public string AccountName { get; set; }

        [Required(ErrorMessage = "Mời bạn nhập mật khẩu")]
        public string PassWord { get; set; }

        public bool RememberMe { get; set; }
    }
}