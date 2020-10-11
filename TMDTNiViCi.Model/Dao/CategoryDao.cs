using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMDTNiViCi.Model.EF;

namespace TMDTNiViCi.Model.Dao
{
    public class CategoryDao
    {
        TMDTNiViCiDbContext db = null;
        char delimiter = char.Parse(",");
        public CategoryDao()
        {
            db = new TMDTNiViCiDbContext();
        }

        public ProductCategory GetProductTypeDao(int PCId)
        {
            return db.ProductCategories.SingleOrDefault(prodT => prodT.ID == PCId);
        }

        public List<ProductCategory> GetAllProdTypesAndCategoriesDao(bool boolGetAllProdTypes)
        {
            List<ProductCategory> listProdCategories = new List<ProductCategory>();
            var priSecondaryPCResultGoupted = db.ProductCategories.Where(prodT => prodT.ParentID == 0).GroupJoin(db.ProductCategories,
                prodT1 => prodT1.ID,
                prodT2 => prodT2.ParentID,
                (prodT1, prodT2_Group) => new {
                    primaryPC = prodT1,
                    groupSecondaryProd = prodT2_Group.OrderBy(prodT2 => prodT2.DisplayOrder)
                }).OrderBy(prodT1 => prodT1.primaryPC.DisplayOrder);

            foreach (var group in priSecondaryPCResultGoupted)
            {
                listProdCategories.Add(group.primaryPC);
                foreach (var secondaryPC in group.groupSecondaryProd)
                {
                    if (boolGetAllProdTypes && secondaryPC.IsCategory > 0)
                    {
                        continue;
                    }
                    listProdCategories.Add(secondaryPC);
                    listProdCategories.AddRange(db.ProductCategories.ToList().FindAll(prodT => prodT.IsCategory == 0 && boolGetAllProdTypes && prodT.ParentID == secondaryPC.ID || prodT.ParentID == secondaryPC.ID).OrderBy(prodT => prodT.DisplayOrder).ToList());
                }
            }
            return listProdCategories;
        }

        public List<ProductCategory> GetCategoriesPTDao(int PTId, string selectedCategories)
        {
            var categoriesLinq = db.ProductCategories.Where(prodC2 => prodC2.ParentID == PTId && prodC2.IsCategory > 0).OrderBy(prodT => prodT.DisplayOrder)
                .GroupJoin(db.ProductCategories,
                prodC2 => prodC2.ID,
                prodC3 => prodC3.ParentID,
                (prodC2, prodC3_Group) => new { 
                    secondaryC = prodC2,
                    tertiaryC = prodC3_Group.Where(prodC => selectedCategories.Contains(",".ToString() + prodC.ID.ToString() + ",".ToString()) || prodC.IsCategory > 0 && selectedCategories == null).OrderBy(prodC => prodC.DisplayOrder)
                });
            List<ProductCategory> categories = new List<ProductCategory>();
            foreach(var category in categoriesLinq) 
            {
                categories.Add(category.secondaryC);
                categories.AddRange(category.tertiaryC.ToList());
            }
            return categories;
        }

        public List<ProductCategory> GetListProdCategoryDao(int prodTypeId, string categories)
        {
            return (from c in db.ProductCategories where c.ID == prodTypeId || categories.Contains(",".ToString()+c.ID.ToString()+ ",".ToString())
                    select c).ToList();
        }
    }
}
