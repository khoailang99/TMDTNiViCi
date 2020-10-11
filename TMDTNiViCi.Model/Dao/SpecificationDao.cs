using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMDTNiViCi.Model.EF;

namespace TMDTNiViCi.Model.Dao
{
    public class SpecificationDao
    {
        TMDTNiViCiDbContext db = null;
        public SpecificationDao()
        {
            db = new TMDTNiViCiDbContext();
        }

        public bool SpecificationsInsertedDao(int ProdId) // Kiểm tra xem thông số kĩ thuật đã đc chèn chưa
        {
            if (db.Product_Specifications.Count(ps => ps.ProductID == ProdId) > 0)
            {
                return true;
            }
            return false;
        }

        public bool InsertSpecificationDao(Product_Specifications ps) // Thêm tskt
        {
            db.Product_Specifications.Add(ps);
            try
            {
                db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool UpdateSpecificationDao(Product_Specifications ps) // Cập nhật tskt
        {
            var sfc = db.Product_Specifications.SingleOrDefault(psu => psu.SpecificationID == ps.SpecificationID && psu.ProductID == ps.ProductID);
            if (sfc == null)
            {
                return InsertSpecificationDao(ps);
            }

            // Cập nhật nội dung thông số kĩ thuật của sản phẩm đc chọn        
            try
            {
                sfc.Value = ps.Value;
                sfc.Status = ps.Status;
                sfc.TypeSpecifications = ps.TypeSpecifications;
                sfc.IsDeleted = ps.IsDeleted;
                db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }

        }
    }
}
