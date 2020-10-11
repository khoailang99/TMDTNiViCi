using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TMDTNiViCi.Model.Dao;
using TMDTNiViCi.Model.EF;

namespace TMDTNiViCi.Areas.admin.Controllers
{
    public class SpecificationController : Controller
    {
        ProductDao productDao = new ProductDao();
        CategoryDao categoryDao = new CategoryDao();
        SpecificationDao specificationDao = new SpecificationDao();

        // GET: admin/Specification
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult InsertSpecificationsSC(List<Product_Specifications> specificationListParam) // Thêm tskt
        {
            var SExists = specificationDao.SpecificationsInsertedDao(specificationListParam.First().ProductID);
            foreach (var ps in specificationListParam)
            {
                if (SExists)
                {
                    if (!specificationDao.UpdateSpecificationDao(ps))
                    {
                        return Json(false, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    if (!specificationDao.InsertSpecificationDao(ps))
                    {
                        return Json(false, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}