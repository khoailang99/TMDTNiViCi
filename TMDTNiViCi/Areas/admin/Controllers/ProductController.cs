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

        UserController userCtl = new UserController();
        PromotionController promotionCtl = new PromotionController();
        SupplierController supplierCtl = new SupplierController();
        CategoryController categoryCtl = new CategoryController();
        

        char delimiter = char.Parse(",");
        string mulImgFileName = "";
        int originalDisplayProdNumb = 8;
        int firstPage = 1;

        public ActionResult Index()
        {
            IQueryable<Product> products = prodDao.GetProductListDao("4/1", null); // 4: Lọc sản phẩm theo trạng thái, 1: trạng thái hiển thị
            ViewBag.CategoryID = categoryCtl.GetAllProdTypesAndCategoriesCC(true);
            ViewBag.Supplier = new SelectList(prodDao.GetSuppliersDao(), "ID", "Name", null);
            ViewData["VDProductList"] = products.Take(originalDisplayProdNumb * firstPage).OrderBy(prod => prod.ID).ToList();
            ViewData["VDNumbProdSatisFilterCond"] = products.Count();
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
            product.UpdatedDate = DateTime.Now;
            if (product.ID > 0)
            {
                return prodDao.Update(product);
            }

            product.CreatedDate = DateTime.Now;
            return prodDao.Insert(product);
        }

        // Lấy tất cả sản phẩm từ DB
        public ActionResult GetProductList(string firstFV, string filterValue, int numbProdDisplayed, int page)
        {
            IQueryable<Product> products = prodDao.GetProductListDao(firstFV, filterValue);
            ViewData["VDNumbProdSatisFilterCond"] = products.Count();
            ViewData["VDProductList"] = products.Take(numbProdDisplayed * page).OrderBy(prod => prod.ID).Skip((page - 1) * numbProdDisplayed).ToList();
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
            if(!(prod.MoreImages == null))
            {
                prod.MoreImages.Split(delimiter).ForEach(delegate (String photoName) {
                    images.Add(prod.Image.Replace(prod.Image.Split(char.Parse("/")).Last(), photoName));
                });
            }

            prodDetails.mainImages = images;
            prodDetails.product = prod;
            prodDetails.productCategories = prod.Category == null ? null : categoryCtl.GetCategoriesCC(prod.CategoryID, prod.Category);
            prodDetails.pmtDetail_PmtPackage_Models = promotionCtl.Get_PmtDetail_PmtPackage_PC(prod.PromotionPackageID ?? default (int));
            prodDetails.PCS_PS_Model = prodDao.Get_PCS_PS_Dao(prod.CategoryID, prod.ID);

            List<ProductDetailsModel> listProd = new List<ProductDetailsModel>();
            listProd.Add(prodDetails);

            ViewData["ProdType"] = categoryCtl.GetProductTypeCC(prod.CategoryID).Name;
            ViewData["Supplier"] = supplierCtl.GetSupplierSC(prod.SupplierID ?? default(int)).Name;
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


        public long DeleteProduct(int prodId) // Xóa sản phẩm
        {
            return prodDao.Delete(prodId);
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
            ViewBag.CreatedBy = new SelectList(prodDao.GetCreatorAUpdateDao(), "ID", "FullName", null);
            ViewBag.UpdatedBy = new SelectList(prodDao.GetCreatorAUpdateDao(), "ID", "FullName", null);
        }

        public void setViewData(int PCId, int ProdId)
        {
            ViewData["VDCS"] = this.GetCategorySpecificationsPC(PCId, ProdId);
        }
    }
}