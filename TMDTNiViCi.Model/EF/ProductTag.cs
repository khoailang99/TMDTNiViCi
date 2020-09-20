namespace TMDTNiViCi.Model.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ProductTag
    {
        public int ID { get; set; }

        public int ProductID { get; set; }

        [Required]
        [StringLength(50)]
        public string TagID { get; set; }

        public virtual Product Product { get; set; }

        public virtual Tag Tag { get; set; }
    }
}
