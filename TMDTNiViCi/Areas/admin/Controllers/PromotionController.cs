using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TMDTNiViCi.Model.Dao;
using TMDTNiViCi.Model.Models;

namespace TMDTNiViCi.Areas.admin.Controllers
{
    public class PromotionController : Controller
    {
        PromotionDao promotionDao = new PromotionDao();
        // GET: admin/Promotion
        public ActionResult Index()
        {
            return View();
        }

        public List<PmtDetail_PmtPackage_Model> Get_PmtDetail_PmtPackage_PC(int pmtPackageId)
        {
            return promotionDao.Get_PmtDetail_PmtPackage_Dao(pmtPackageId);
        }
    }
}