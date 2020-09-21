using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMDTNiViCi.Model.EF;

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

        public bool InsertSpecification(Product_Specifications ps)
        {
            try
            {
                db.Product_Specifications.Add(ps);
                db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }

        }

        public List<ProductCategory> GetProductTypeDao()
        {
            List<ProductCategory> productCategoryList = new List<ProductCategory>();
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
    }
}
