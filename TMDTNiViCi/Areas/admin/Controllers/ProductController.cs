using Microsoft.Ajax.Utilities;
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
        ProductDao prodDao = new ProductDao();
        ProductDetailsModel prodDetails = new ProductDetailsModel();

        PromotionController promotionCtl = new PromotionController();
        SupplierController supplierCtl = new SupplierController();
        CategoryController categoryCtl = new CategoryController();
        

        char delimiter = char.Parse(",");
        string mulImgFileName = "";

        public ActionResult Index()
        {
            ViewBag.CategoryID = categoryCtl.GetAllProdTypesAndCategoriesCC(true);
            ViewBag.Supplier = new SelectList(prodDao.GetSuppliersDao(), "ID", "Name", null);
            ViewData["VDProductList"] = prodDao.GetProductListDao(8, 0);
            ViewData["VDTotalProduct"] = prodDao.GetTotalProductDao();
            return View();
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
            if (product.ID > 0)
            {
                return prodDao.Update(product);
            }
            return prodDao.Insert(product);
        }

        // Lấy tất cả sản phẩm từ DB
        public ActionResult GetProductList(int numbProd, int pageNumb)
        {
            ViewData["VDProductList"] = prodDao.GetProductListDao(numbProd, pageNumb);
            return PartialView("~/Areas/admin/Views/Product/PVProductList.cshtml", ViewData["VDProductList"]);
        }

        // Lấy danh mục sản phẩm và các thông số kĩ thuật từ DB
        public IEnumerable<CategorySpecificationModel> GetCategorySpecificationsPC(int PCId, int ProdId)
        {
            CategorySpecificationModel[] listCS = new CategorySpecificationModel[]{
                new CategorySpecificationModel{CSCategory = categoryCtl.GetCategoriesCC(PCId), PCS_PS_Model = prodDao.Get_PCS_PS_Dao(PCId,ProdId)}
            };

            return listCS;
        }

        // Lấy Partial View chứa các danh mục của sản phẩm và các thông số kĩ thuật
        [HttpGet]
        public ActionResult GetPVCategorySpecificationsPC(string PCId, int ProdId)
        {
            ViewData["VDCS"] = this.GetCategorySpecificationsPC(Int32.Parse(PCId), ProdId);
            return PartialView("~/Areas/admin/Views/Product/PVSpecification.cshtml", ViewData["VDCS"]);
        }

        public ActionResult GetPVProductDetails(int prodId) // Xem thông tin sản phẩm
        {
            List<String> images = new List<string>();

            var prod = prodDao.GetProductDao(prodId);

            images.Add(prod.Image);
            prod.MoreImages.Split(delimiter).ForEach(delegate (String photoName) {
                images.Add(prod.Image.Replace(prod.Image.Split(char.Parse("/")).Last(), photoName));
            });

            prodDetails.mainImages = images;
            prodDetails.product = prod;
            prodDetails.supplier = supplierCtl.GetSupplierSC(prod.SupplierID ?? default (int));
            prodDetails.productCategories = categoryCtl.GetCategoriesCC(prod.CategoryID, prod.Category);
            prodDetails.pmtDetail_PmtPackage_Models = promotionCtl.Get_PmtDetail_PmtPackage_PC(prod.PromotionPackageID ?? default (int));
            prodDetails.PCS_PS_Model = prodDao.Get_PCS_PS_Dao(prod.CategoryID, prod.ID);

            List<ProductDetailsModel> listProd = new List<ProductDetailsModel>();
            listProd.Add(prodDetails);
            ViewData["VDProdDetail"] = listProd;
            return PartialView("~/Areas/admin/Views/Product/PVProductDetails.cshtml", ViewData["VDProdDetail"]);
        }

       [HttpGet]
        public ActionResult ProductUpdates(int id) // Sửa thông tin sản phẩm
        {
            var selectedPro = prodDao.GetProductDao(id);
            setViewBag(selectedPro.CategoryID);
            setViewData(selectedPro.CategoryID, id);
            return View("~/Areas/admin/Views/Product/Create.cshtml", selectedPro);
        }

        
        public void DeleteProduct(int prodId) // Xóa sản phẩm
        {
    
        }

        public bool UploadFiles() // Cập nhật các file ảnh đc tải lên từ máy người dùng
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

        public void setViewBag(int PCId)
        {
            ViewBag.SelectedC = PCId;
            ViewBag.CategoryID = categoryCtl.GetAllProdTypesAndCategoriesCC(true);
            ViewBag.SupplierID = new SelectList(prodDao.GetSuppliersDao(), "ID", "Name", null);
            ViewBag.PromotionPackageID = new SelectList(prodDao.GetPromotionPackagesDao(), "ID", "Name", null);
            ViewBag.CreatedBy = new SelectList(prodDao.GetCreatorDao(), "ID", "FullName", null);
        }

        public void setViewData(int PCId, int ProdId)
        {
            ViewData["VDCS"] = this.GetCategorySpecificationsPC(PCId, ProdId);
        }
    }
}