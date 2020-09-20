namespace TMDTNiViCi.Model.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ApplicationGroup
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ApplicationGroup()
        {
            ApplicationRoleGroups = new HashSet<ApplicationRoleGroup>();
            ApplicationUserGroups = new HashSet<ApplicationUserGroup>();
        }

        public int ID { get; set; }

        [Required]
        [StringLength(256)]
        public string Name { get; set; }

        public int? ParentID { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        public bool? Status { get; set; }

        public bool? IsDeleted { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ApplicationRoleGroup> ApplicationRoleGroups { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ApplicationUserGroup> ApplicationUserGroups { get; set; }
    }
}
