namespace TMDTNiViCi.Model.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ApplicationRoleGroup
    {
        public int ID { get; set; }

        public int RoleID { get; set; }

        public int GroupID { get; set; }

        public virtual ApplicationGroup ApplicationGroup { get; set; }

        public virtual ApplicationRole ApplicationRole { get; set; }
    }
}
