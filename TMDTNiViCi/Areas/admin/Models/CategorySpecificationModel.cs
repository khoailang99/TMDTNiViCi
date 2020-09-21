using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TMDTNiViCi.Model.EF;

namespace TMDTNiViCi.Areas.admin.Models
{
    public class CategorySpecificationModel
    {
        public IEnumerable<ProductCategory> CSCategory { get; set; }
        public IEnumerable<PCSpecification> CSSpecification { get; set; }
    }
}