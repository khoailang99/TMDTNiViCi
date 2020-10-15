using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMDTNiViCi.Model.EF;

namespace TMDTNiViCi.Model.Dao
{
    public class UserDao
    {
        TMDTNiViCiDbContext db = null;
        public UserDao()
        {
            db = new TMDTNiViCiDbContext();
        }

        public bool Login(string userName, string passWord)
        {
            var result = db.ApplicationUsers.Count(user => user.AccountName == userName && user.PasswordHash == passWord);
            var x = (from tenThongSo in db.Products where tenThongSo.ID == 7 select tenThongSo.Name).ToList();
            if (result > 0)
            {
                return true;
            }
            return false;
        }

        public ApplicationUser GetUserByAccountName(string AccName)
        {
            return db.ApplicationUsers.SingleOrDefault(user => user.AccountName == AccName);
        }

        public long Insert(ApplicationUser entity)
        {
            db.ApplicationUsers.Add(entity);
            db.SaveChanges();
            return entity.ID;
        }

        public ApplicationUser GetAUserInfoDao(int id)
        {
            return db.ApplicationUsers.SingleOrDefault(user => user.ID == id);
        }
    }
}
