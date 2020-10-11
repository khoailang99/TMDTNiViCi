using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TMDTNiViCi.Model.Dao;
using TMDTNiViCi.Model.EF;

namespace TMDTNiViCi.Areas.admin.Controllers
{
    public class CategoryController : Controller
    {
        CategoryDao categoryDao = new CategoryDao();
        // GET: admin/Category
        public ActionResult Index()
        {
            return View(categoryDao.GetCategoriesPTDao(95, null));
        }

        public ProductCategory GetProductTypeCC(int PCId)
        {
            return categoryDao.GetProductTypeDao(PCId);
        }

        public List<ProductCategory> GetAllProdTypesAndCategoriesCC(bool boolGetAllProdTypes)
        {
            return categoryDao.GetAllProdTypesAndCategoriesDao(boolGetAllProdTypes);
        }

        public List<ProductCategory> GetCategoriesCC(int PCId, string selectedCategories = null)
        {
            return categoryDao.GetCategoriesPTDao(PCId, selectedCategories);
        }
    }
}