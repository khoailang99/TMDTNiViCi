using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TMDTNiViCi.Areas.admin.Models;
using TMDTNiViCi.Common;
using TMDTNiViCi.Model.EF;
using TMDTNiViCi.Model.Dao;

namespace TMDTNiViCi.Areas.admin.Controllers
{
    public class LoginController : Controller
    {
        // GET: admin/Login
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var dao = new UserDao();
                var result = dao.Login(model.AccountName, model.PassWord);
                if (result)
                {
                    var user = dao.GetUserByAccountName(model.AccountName);
                    var userSession = new UserLogin();
                    userSession.UserID = user.ID;
                    userSession.AccountName = user.AccountName;
                    Session.Add(CommonConstants.USER_SESSION, userSession);
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ModelState.AddModelError("", "Sai tài khoản hoặc mật khẩu!");
                }

            }
            return View("Index");
        }
    }
}