using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TMDTNiViCi.Model.Dao;
using TMDTNiViCi.Model.EF;

namespace TMDTNiViCi.Areas.admin.Controllers
{
    public class UserController : Controller
    {
        UserDao userDao = new UserDao();
        // GET: admin/User
        public ActionResult Index()
        {
            return View();
        }

        public ApplicationUser GetAUserInfoUC(int id)
        {
            return userDao.GetAUserInfoDao(id);
        }
    }
}