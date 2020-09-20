namespace TMDTNiViCi.Model.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ApplicationUserGroup
    {
        public int ID { get; set; }

        public int UserID { get; set; }

        public int GroupID { get; set; }

        public virtual ApplicationGroup ApplicationGroup { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
