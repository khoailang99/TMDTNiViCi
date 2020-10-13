using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TMDTNiViCi.Model.Dao;
using TMDTNiViCi.Model.EF;

namespace TMDTNiViCi.Areas.admin.Controllers
{
    public class SupplierController : Controller
    {
        SupplierDao supplierDao = new SupplierDao();
        // GET: admin/Supplier
        public ActionResult Index()
        {
            return View();
        }

        public Supplier GetSupplierSC(int id)
        {
            return supplierDao.GetSupplierDao(id);
        }
    }
}