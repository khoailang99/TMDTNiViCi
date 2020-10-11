using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMDTNiViCi.Model.EF;

namespace TMDTNiViCi.Model.Models
{
    public class PmtDetail_PmtPackage_Model
    {
        public PromotionPackage PmtPackage { get; set; }

        public List<Promotion> PmtDetail { get; set; }
    }
}
