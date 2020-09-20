namespace TMDTNiViCi.Model.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Menu
    {
        public int ID { get; set; }

        [Required]
        [StringLength(250)]
        public string Name { get; set; }

        [StringLength(50)]
        public string Icon { get; set; }

        [StringLength(256)]
        public string URL { get; set; }

        public short? DisplayOrder { get; set; }

        public int? ParentID { get; set; }

        public int? GroupID { get; set; }

        public bool? Status { get; set; }

        public bool? IsDeleted { get; set; }

        public virtual MenuGroup MenuGroup { get; set; }
    }
}
