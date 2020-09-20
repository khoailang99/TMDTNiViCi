namespace TMDTNiViCi.Model.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Notification
    {
        public int ID { get; set; }

        [StringLength(256)]
        public string Name { get; set; }

        [StringLength(256)]
        public string Icon { get; set; }

        [StringLength(256)]
        public string URL { get; set; }

        public short? DisplayOrder { get; set; }

        public DateTime? CreatedDate { get; set; }

        [StringLength(50)]
        public string CreatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }

        [StringLength(50)]
        public string UpdatedBy { get; set; }

        [StringLength(150)]
        public string MetaKeyword { get; set; }

        [StringLength(150)]
        public string MetaDescription { get; set; }

        public bool? Status { get; set; }

        public bool? IsDeleted { get; set; }
    }
}
