using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMDTNiViCi.Model.EF;
using TMDTNiViCi.Model.Models;

namespace TMDTNiViCi.Model.Dao
{
    public class PromotionDao
    {
        TMDTNiViCiDbContext db = null;
        char delimiter = char.Parse(",");
        public PromotionDao()
        {
            db = new TMDTNiViCiDbContext();
        }

        // Lấy gói khuyến mãi và khuyến mãi
        public List<PmtDetail_PmtPackage_Model> Get_PmtDetail_PmtPackage_Dao(int pmtPackageId)
        {
            return (from pPackage in db.PromotionPackages
                    where pPackage.ID == pmtPackageId
                    select new PmtDetail_PmtPackage_Model
                    {
                        PmtPackage = pPackage,
                        PmtDetail = (from pd in db.PromotionDetails
                                     where pd.ProPackageID == pPackage.ID
                                     join pmt in db.Promotions on pd.PromotionID equals pmt.ID
                                     select pmt).ToList()
                    }).ToList();
        }
    }
}
