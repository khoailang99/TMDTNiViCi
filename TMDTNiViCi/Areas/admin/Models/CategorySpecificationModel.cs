using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TMDTNiViCi.Model.EF;
using TMDTNiViCi.Model.Models;

namespace TMDTNiViCi.Areas.admin.Models
{
    public class CategorySpecificationModel
    {
        public IEnumerable<ProductCategory> CSCategory { get; set; }
        public IEnumerable<ProductCategoryS_ProductS_Model> PCS_PS_Model { get; set; }
    }
}