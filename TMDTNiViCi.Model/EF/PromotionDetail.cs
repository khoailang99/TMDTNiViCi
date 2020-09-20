namespace TMDTNiViCi.Model.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class PromotionDetail
    {
        public int ID { get; set; }

        public int PromotionID { get; set; }

        public int ProPackageID { get; set; }

        public virtual Promotion Promotion { get; set; }

        public virtual PromotionPackage PromotionPackage { get; set; }
    }
}
