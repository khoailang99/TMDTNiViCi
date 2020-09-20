namespace TMDTNiViCi.Model.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Product
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Product()
        {
            Evaluates = new HashSet<Evaluate>();
            Feedbacks = new HashSet<Feedback>();
            OrderDetails = new HashSet<OrderDetail>();
            Product_Specifications = new HashSet<Product_Specifications>();
            ProductTags = new HashSet<ProductTag>();
        }

        public int ID { get; set; }

        [Required]
        [StringLength(256)]
        public string Name { get; set; }

        [StringLength(256)]
        public string Alias { get; set; }

        public int CategoryID { get; set; }

        [StringLength(256)]
        public string Image { get; set; }

        [Column(TypeName = "xml")]
        public string MoreImages { get; set; }

        public decimal? Price { get; set; }

        public decimal? OriginalPrice { get; set; }

        public decimal? PromotionPrice { get; set; }

        [StringLength(50)]
        public string DiscountCode { get; set; }

        [StringLength(255)]
        public string Category { get; set; }

        [StringLength(750)]
        public string Description { get; set; }

        public string Content { get; set; }

        public bool? HomeFlag { get; set; }

        public bool? HotFlag { get; set; }

        public int? ViewCount { get; set; }

        public int? Quantity { get; set; }

        public int? BrandID { get; set; }

        public int? SupplierID { get; set; }

        public int? PromotionPackageID { get; set; }

        [StringLength(700)]
        public string Tags { get; set; }

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

        public short? Status { get; set; }

        public bool? IsDeleted { get; set; }

        [StringLength(256)]
        public string SeoImage { get; set; }

        public virtual Brand Brand { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Evaluate> Evaluates { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Feedback> Feedbacks { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Product_Specifications> Product_Specifications { get; set; }

        public virtual ProductCategory ProductCategory { get; set; }

        public virtual PromotionPackage PromotionPackage { get; set; }

        public virtual Supplier Supplier { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ProductTag> ProductTags { get; set; }
    }
}
