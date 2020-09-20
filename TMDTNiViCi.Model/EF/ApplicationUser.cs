namespace TMDTNiViCi.Model.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ApplicationUser
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ApplicationUser()
        {
            ApplicationUserGroups = new HashSet<ApplicationUserGroup>();
            Evaluates = new HashSet<Evaluate>();
            Feedbacks = new HashSet<Feedback>();
            Orders = new HashSet<Order>();
        }

        public int ID { get; set; }

        [Required]
        [StringLength(256)]
        public string FullName { get; set; }

        public DateTime? BirthDay { get; set; }

        [StringLength(20)]
        public string Gender { get; set; }

        [StringLength(256)]
        public string Address { get; set; }

        [StringLength(256)]
        public string Email { get; set; }

        public bool? EmailConfirmed { get; set; }

        public long? PhoneNumber { get; set; }

        public bool? PhoneNumberConfirmed { get; set; }

        [StringLength(50)]
        public string AccountName { get; set; }

        [StringLength(256)]
        public string PasswordHash { get; set; }

        [StringLength(256)]
        public string Avatar { get; set; }

        public bool? LockoutEnabled { get; set; }

        public DateTime? LockoutEndDate { get; set; }

        public DateTime? CreatedDate { get; set; }

        [StringLength(50)]
        public string CreatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }

        [StringLength(50)]
        public string UpdatedBy { get; set; }

        public bool? Status { get; set; }

        public bool? IsDeleted { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ApplicationUserGroup> ApplicationUserGroups { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Evaluate> Evaluates { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Feedback> Feedbacks { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Order> Orders { get; set; }
    }
}
