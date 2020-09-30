using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TMDTNiViCi.Areas.admin.Models;
using TMDTNiViCi.Model.Dao;
using TMDTNiViCi.Model.EF;
using TMDTNiViCi.Model.Models;

namespace TMDTNiViCi.Areas.admin.Controllers
{
    public class ProductController : Controller
    {
        ProductDao dao = new ProductDao();
        char delimiter = char.Parse(",");
        string mulImgFileName = "";

        // Phần hiển thị tất cả sản phẩm
        public ActionResult Index()
        {
            ViewBag.CategoryID = PCGetProductType(0);
            ViewBag.Supplier = new SelectList(dao.GetSuppliersDao(), "ID", "Name", null);
            ViewData["VDProductList"] = dao.GetProductListDao(8, 0);
            ViewData["VDTotalProduct"] = dao.GetTotalProductDao();
            return View();
        }

        public ActionResult GetProductList(int numbProd, int pageNumb)
        {
            ViewData["VDProductList"] = dao.GetProductListDao(numbProd, pageNumb);
            return PartialView("~/Areas/admin/Views/Product/PVProductList.cshtml", ViewData["VDProductList"]);
        }

        // Sửa thông tin sản phẩm
        [HttpGet]
        public ActionResult ProductUpdates(int id)
        {
            var selectedPro = dao.GetProductDao(id);
            setViewBag(selectedPro.CategoryID);
            setViewData(selectedPro.CategoryID, id);
            return View("~/Areas/admin/Views/Product/Create.cshtml", selectedPro);
        }

        // Phần thêm sản phẩm
        public List<ProductCategory> PCGetProductType(int PCId)
        {
            List<ProductCategory> productCategoryListDb = dao.GetProductTypeDao(PCId);
            if (PCId > 0)
            {
                return productCategoryListDb;
            }
            List<ProductCategory> pcFirstLevel = new List<ProductCategory>();
            List<ProductCategory> pcSecondLevel = new List<ProductCategory>();
            List<ProductCategory> pcListSorted = new List<ProductCategory>();
            int relationshipNumb = 0;
            foreach (var pc in productCategoryListDb)
            {
                relationshipNumb = pc.Relationship.Split(delimiter).Length;
                if (relationshipNumb > 5)
                {
                    break;
                }
                switch (relationshipNumb)
                {
                    case 3:
                        pcFirstLevel.Add(pc);
                        break;
                    case 4:
                        pcSecondLevel.Add(pc);
                        break;
                    default:
                        break;
                }
            }
            productCategoryListDb.RemoveRange(0, pcFirstLevel.Count() + pcSecondLevel.Count());
            foreach (var pcfl in pcFirstLevel)
            {
                pcListSorted.Add(pcfl);
                foreach (var pcsl in pcSecondLevel)
                {
                    if (pcsl.ParentID == pcfl.ID)
                    {
                        pcListSorted.Add(pcsl);
                        foreach (var pctl in productCategoryListDb)
                        {
                            if (pctl.ParentID == pcsl.ID)
                            {
                                pcListSorted.Add(pctl);
                            }
                        }
                    }
                }
            }
            return pcListSorted;
        }

        [HttpGet]
        public ActionResult Create()
        {
            setViewBag(0);
            return View();
        }

        [HttpPost, ValidateInput(false)]
        public long Create(Product product)
        {
            if(product.ID > 0)
            {
                return dao.Update(product);
            }
            return dao.Insert(product);
        }

        [HttpGet]
        public ActionResult GetSpecificationsPC(string PCId, int ProdId)
        {
            ViewData["VDCS"] = this.GetCategorySpecifications(Int32.Parse(PCId), ProdId);
            return PartialView("~/Areas/admin/Views/Product/PVSpecification.cshtml", ViewData["VDCS"]);
        }

        [HttpPost]
        public JsonResult AddSpecificationsPC(List<Product_Specifications> specificationListParam)
        {
            var PSExists = dao.SpecificationsInserted(specificationListParam.First().ProductID); 
            foreach (var ps in specificationListParam)
            {
                if(PSExists)
                {
                    if (!dao.UpdateSpecification(ps))
                    {
                        return Json(false, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    if (!dao.InsertSpecification(ps))
                    {
                        return Json(false, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public bool UploadFiles()
        {
            string directoryPath = Request["directoryPath"];
            HttpFileCollectionBase files = Request.Files;
            for (int i = 0; i < files.Count; i++)
            {
                HttpPostedFileBase file = files[i];
                string fname;
                if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                {
                    string[] testfiles = file.FileName.Split(new char[] { '\\' });
                    fname = testfiles[testfiles.Length - 1];
                }
                else
                {
                    fname = file.FileName;
                    mulImgFileName += fname + ",";
                }
                // Get the complete folder path and store the file inside it.      
                fname = Path.Combine(Server.MapPath("~" + directoryPath), fname);
                file.SaveAs(fname);
            }
            return true;
        }

        public IEnumerable<CategorySpecificationModel> GetCategorySpecifications(int PCId, int ProdId)
        {
            int parentCategoryID = 0;
            List<ProductCategory> prodCategories = new List<ProductCategory>();
            foreach (var pc in this.PCGetProductType(0))
            {
                if (pc.ParentID == PCId && pc.IsCategory > 0 || pc.ParentID == parentCategoryID && pc.IsCategory > 0)
                {
                    prodCategories.Add(pc);
                    parentCategoryID = (pc.ParentID == PCId) ? pc.ID : parentCategoryID;
                }
            }

            CategorySpecificationModel[] listCS = new CategorySpecificationModel[]{
                new CategorySpecificationModel{CSCategory = prodCategories, PCS_PS_Model = dao.Get_PCS_PS_Dao(PCId,ProdId)}
            };

            return listCS;
        }

        public void setViewBag(int PCId)
        {
            ViewBag.SelectedC = PCId;
            ViewBag.CategoryID = PCGetProductType(PCId);
            ViewBag.SupplierID = new SelectList(dao.GetSuppliersDao(), "ID", "Name", null);
            ViewBag.PromotionPackageID = new SelectList(dao.GetPromotionPackagesDao(), "ID", "Name", null);
            ViewBag.CreatedBy = new SelectList(dao.GetCreatorDao(), "ID", "FullName", null);
        }

        public void setViewData(int PCId, int ProdId)
        {
            ViewData["VDCS"] = this.GetCategorySpecifications(PCId, ProdId);
        }
    }
}