using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMDTNiViCi.Model.EF;
using TMDTNiViCi.Model.Models;

namespace TMDTNiViCi.Model.Dao
{
    public class ProductDao
    {
        TMDTNiViCiDbContext db = null;
        char delimiter = char.Parse(",");
        public ProductDao()
        {
            db = new TMDTNiViCiDbContext();
        }

        public long Insert(Product product)
        {
            try
            {
                db.Products.Add(product);
                db.SaveChanges();
                return product.ID;
            }
            catch (Exception e)
            {
                return 0;
            }
        }

        public long Update(Product product)
        {
            var updatedProd = db.Products.SingleOrDefault(prod => prod.ID == product.ID);
            try
            {
                // Cập nhật các thuộc tính của sản phẩm đc chọn
                updatedProd.Name = product.Name;
                updatedProd.Quantity = product.Quantity;
                updatedProd.OriginalPrice = product.OriginalPrice;
                updatedProd.Price = product.Price;
                updatedProd.PromotionPrice = product.PromotionPrice;
                updatedProd.SupplierID = product.SupplierID;
                updatedProd.CreatedBy = product.CreatedBy;
                updatedProd.PromotionPackageID = product.PromotionPackageID;
                updatedProd.Category = product.Category;
                updatedProd.Status = product.Status;
                updatedProd.Description = product.Description;
                updatedProd.Content = product.Content;
                updatedProd.Alias = product.Alias;
                updatedProd.MetaDescription = product.MetaDescription;
                updatedProd.MetaKeyword = product.MetaKeyword;
                updatedProd.Image = product.Image;
                updatedProd.MoreImages = product.MoreImages;
                updatedProd.SeoImage = product.SeoImage;

                db.SaveChanges();
                return updatedProd.ID;
            }
            catch (Exception e)
            {
                return 0;
            }
        }

        public Product GetProductDao(int ProdID)
        {
            return db.Products.SingleOrDefault(prod => prod.ID == ProdID);
        }

        public List<ProductCategory> GetProductTypeDao(int PCId)
        {
            List<ProductCategory> productCategoryList = new List<ProductCategory>();
            if (PCId > 0)
            {
                productCategoryList.Add(db.ProductCategories.SingleOrDefault(pc => pc.ID == PCId));
                return productCategoryList;
            }
            
            var groupedResult = db.ProductCategories.ToList().GroupBy(pcl => pcl.ParentID);
            foreach (var gr in groupedResult)
            {
                // Sắp xếp các loại sản phẩm thuộc cùng một loại theo thứ tự tăng dần
                foreach (ProductCategory pc in gr.OrderBy(pc => pc.DisplayOrder))
                {
                    productCategoryList.Add(pc);
                }
            }
            return productCategoryList;
        }
        public List<PCSpecification> GetPCSpecificationsDao(int PCId)
        {
            List<PCSpecification> specificationList;
            if (db.PCSpecifications.Count(pcs => pcs.ProductCategoriesID == PCId) > 0)
            {
                specificationList = (from lsp in db.ProductCategories
                                     where lsp.ID == PCId
                                     from tskt in db.PCSpecifications
                                     where lsp.Relationship.Contains("," + tskt.ProductCategoriesID.ToString() + ",") && tskt.IsGeneralInfo != 0 || tskt.ProductCategoriesID == PCId
                                     select tskt).ToList();
            }
            else
            {
                specificationList = (from lsp in db.ProductCategories
                                     where lsp.ID == PCId
                                     from tskt in db.PCSpecifications
                                     where lsp.Relationship.Contains("," + tskt.ProductCategoriesID.ToString() + ",")
                                     select tskt).ToList();
            }
            return specificationList;
        }

        public List<ProductCategoryS_ProductS_Model> GetProductCategoriesSDao(int PCId)
        {
            List<ProductCategoryS_ProductS_Model> List_PCS_PS;
            if (db.PCSpecifications.Count(pcs => pcs.ProductCategoriesID == PCId) > 0)
            {
                List_PCS_PS = (from lsp in db.ProductCategories
                                     where lsp.ID == PCId
                                     from tskt in db.PCSpecifications
                                     where lsp.Relationship.Contains("," + tskt.ProductCategoriesID.ToString() + ",") && tskt.IsGeneralInfo != 0 || tskt.ProductCategoriesID == PCId
                                     select new ProductCategoryS_ProductS_Model { PCSModel = tskt, PSModel = null }).ToList();
            }
            else
            {
                List_PCS_PS = (from lsp in db.ProductCategories
                                     where lsp.ID == PCId
                                     from tskt in db.PCSpecifications
                                     where lsp.Relationship.Contains("," + tskt.ProductCategoriesID.ToString() + ",")
                                     select new ProductCategoryS_ProductS_Model { PCSModel = tskt, PSModel = null }).ToList();
            }
            return List_PCS_PS;
        }

        public List<ProductCategoryS_ProductS_Model> Get_PCS_PS_Dao(int PCId, int ProdID)
        {
            List<ProductCategoryS_ProductS_Model> List_PCS_PS = GetProductCategoriesSDao(PCId);
            List<Product_Specifications> List_PS;

            if(ProdID > 0)
            {
                List_PS = (db.Product_Specifications.Where(ps => ps.ProductID == ProdID).Select(ps => ps)).ToList();
                foreach (var pcs_ps in List_PCS_PS)
                {
                    pcs_ps.PSModel = List_PS.Find(ps => ps.SpecificationID == pcs_ps.PCSModel.ID);
                }

                List_PCS_PS = List_PCS_PS.OrderBy(pcs_ps => pcs_ps.PCSModel.TypeSpecifications).ToList();
            }

            return List_PCS_PS;

        }

        public List<Supplier> GetSuppliersDao()
        {
            return db.Suppliers.ToList();
        }

        public List<PromotionPackage> GetPromotionPackagesDao()
        {
            return db.PromotionPackages.ToList();
        }

        public List<ApplicationUser> GetCreatorDao()
        {
            return (from arg in db.ApplicationUserGroups
                    join au in db.ApplicationUsers
                    on arg.UserID equals au.ID
                    where arg.GroupID == 1
                    select au).ToList();
        }

        public List<Product> GetProductListDao(int prodNumb, int pageNumb)
        {
            if(pageNumb == 0) // Đc thực thi khi không có phân trang nào đc click
            {
                return db.Products.Take(prodNumb).ToList();
            }
            return db.Products.Take(prodNumb * pageNumb).ToList().Skip((pageNumb - 1) * prodNumb).ToList();
        }

        public long GetTotalProductDao()
        {
            return db.Products.Count();
        }
    }
}
