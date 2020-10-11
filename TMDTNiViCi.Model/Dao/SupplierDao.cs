using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMDTNiViCi.Model.EF;

namespace TMDTNiViCi.Model.Dao
{
    public class SupplierDao
    {
        TMDTNiViCiDbContext db = null;
        char delimiter = char.Parse(",");
        public SupplierDao()
        {
            db = new TMDTNiViCiDbContext();
        }

        public Supplier GetSupplierDao(int id)
        {
            return db.Suppliers.SingleOrDefault(s => s.ID == id);
        }
    }
}
