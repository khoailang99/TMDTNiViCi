namespace TMDTNiViCi.Model.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Order
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
        }

        public int ID { get; set; }

        public int? CustomerID { get; set; }

        [StringLength(256)]
        public string CustomerName { get; set; }

        [StringLength(256)]
        public string CustomerAddress { get; set; }

        [StringLength(256)]
        public string CustomerEmail { get; set; }

        public long? CustomerPhoneNumber { get; set; }

        [StringLength(750)]
        public string CustomerMessage { get; set; }

        public int? PaymentMethodID { get; set; }

        public bool? PaymentStatus { get; set; }

        public int? OrderStatusID { get; set; }

        [StringLength(250)]
        public string OrderCanceller { get; set; }

        [StringLength(500)]
        public string ReasonCancellation { get; set; }

        public int? PersonMadeID { get; set; }

        public DateTime? CreatedDate { get; set; }

        [StringLength(50)]
        public string CreatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }

        [StringLength(50)]
        public string UpdatedBy { get; set; }

        public short Status { get; set; }

        public bool IsDeleted { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }

        public virtual OrderStatu OrderStatu { get; set; }

        public virtual PaymentMethod PaymentMethod { get; set; }
    }
}
