using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TMDTNiViCi.Model.EF;
using TMDTNiViCi.Model.Models;

namespace TMDTNiViCi.Areas.admin.Models
{
    public class ProductDetailsModel
    {
        public List<String> mainImages { get; set; }
        public Product product { get; set; }

        public Supplier supplier { get; set; }

        public List<ProductCategory> productCategories { get; set; }

        public List<PmtDetail_PmtPackage_Model> pmtDetail_PmtPackage_Models { get; set; }

        public List<ProductCategoryS_ProductS_Model> PCS_PS_Model { get; set; }
    }
}