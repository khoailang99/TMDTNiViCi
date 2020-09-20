namespace TMDTNiViCi.Model.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Feedback
    {
        public int ID { get; set; }

        public int? ProductID { get; set; }

        public int? UserID { get; set; }

        public string Content { get; set; }

        public int? ParentID { get; set; }

        public DateTime? CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }

        public bool? Status { get; set; }

        public bool? IsDeleted { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }

        public virtual Product Product { get; set; }
    }
}
