namespace TMDTNiViCi.Model.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class PCSpecification
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PCSpecification()
        {
            Product_Specifications = new HashSet<Product_Specifications>();
        }

        public int ID { get; set; }

        [Required]
        [StringLength(250)]
        public string Name { get; set; }

        public int ProductCategoriesID { get; set; }

        public short? IsGeneralInfo { get; set; }

        public short Status { get; set; }

        public bool IsDeleted { get; set; }

        public int? IsFilter { get; set; }

        public int? ParentID { get; set; }

        public virtual ProductCategory ProductCategory { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Product_Specifications> Product_Specifications { get; set; }
    }
}
