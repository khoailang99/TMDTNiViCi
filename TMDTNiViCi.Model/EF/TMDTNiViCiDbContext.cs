namespace TMDTNiViCi.Model.EF
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class TMDTNiViCiDbContext : DbContext
    {
        public TMDTNiViCiDbContext()
            : base("name=TMDTNiViCiDbContext")
        {
        }

        public virtual DbSet<ApplicationGroup> ApplicationGroups { get; set; }
        public virtual DbSet<ApplicationRoleGroup> ApplicationRoleGroups { get; set; }
        public virtual DbSet<ApplicationRole> ApplicationRoles { get; set; }
        public virtual DbSet<ApplicationUserGroup> ApplicationUserGroups { get; set; }
        public virtual DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public virtual DbSet<Banner> Banners { get; set; }
        public virtual DbSet<Brand> Brands { get; set; }
        public virtual DbSet<Evaluate> Evaluates { get; set; }
        public virtual DbSet<Feedback> Feedbacks { get; set; }
        public virtual DbSet<MenuGroup> MenuGroups { get; set; }
        public virtual DbSet<Menu> Menus { get; set; }
        public virtual DbSet<Notification> Notifications { get; set; }
        public virtual DbSet<OrderDetail> OrderDetails { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderStatu> OrderStatus { get; set; }
        public virtual DbSet<PaymentMethod> PaymentMethods { get; set; }
        public virtual DbSet<PCSpecification> PCSpecifications { get; set; }
        public virtual DbSet<PostCategory> PostCategories { get; set; }
        public virtual DbSet<Post> Posts { get; set; }
        public virtual DbSet<PostTag> PostTags { get; set; }
        public virtual DbSet<Product_Specifications> Product_Specifications { get; set; }
        public virtual DbSet<ProductCategory> ProductCategories { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductTag> ProductTags { get; set; }
        public virtual DbSet<PromotionDetail> PromotionDetails { get; set; }
        public virtual DbSet<PromotionPackage> PromotionPackages { get; set; }
        public virtual DbSet<Promotion> Promotions { get; set; }
        public virtual DbSet<Slide> Slides { get; set; }
        public virtual DbSet<Supplier> Suppliers { get; set; }
        public virtual DbSet<Tag> Tags { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ApplicationGroup>()
                .HasMany(e => e.ApplicationRoleGroups)
                .WithRequired(e => e.ApplicationGroup)
                .HasForeignKey(e => e.GroupID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ApplicationGroup>()
                .HasMany(e => e.ApplicationUserGroups)
                .WithRequired(e => e.ApplicationGroup)
                .HasForeignKey(e => e.GroupID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ApplicationRole>()
                .Property(e => e.URL)
                .IsUnicode(false);

            modelBuilder.Entity<ApplicationRole>()
                .HasMany(e => e.ApplicationRoleGroups)
                .WithRequired(e => e.ApplicationRole)
                .HasForeignKey(e => e.RoleID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ApplicationUser>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<ApplicationUser>()
                .Property(e => e.AccountName)
                .IsUnicode(false);

            modelBuilder.Entity<ApplicationUser>()
                .Property(e => e.PasswordHash)
                .IsUnicode(false);

            modelBuilder.Entity<ApplicationUser>()
                .Property(e => e.Avatar)
                .IsUnicode(false);

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(e => e.ApplicationUserGroups)
                .WithRequired(e => e.ApplicationUser)
                .HasForeignKey(e => e.UserID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(e => e.Evaluates)
                .WithOptional(e => e.ApplicationUser)
                .HasForeignKey(e => e.UserID);

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(e => e.Feedbacks)
                .WithOptional(e => e.ApplicationUser)
                .HasForeignKey(e => e.UserID);

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(e => e.Orders)
                .WithOptional(e => e.ApplicationUser)
                .HasForeignKey(e => e.PersonMadeID);

            modelBuilder.Entity<Banner>()
                .Property(e => e.Image)
                .IsUnicode(false);

            modelBuilder.Entity<Brand>()
                .Property(e => e.Alias)
                .IsUnicode(false);

            modelBuilder.Entity<Brand>()
                .Property(e => e.Image)
                .IsUnicode(false);

            modelBuilder.Entity<Brand>()
                .Property(e => e.Website)
                .IsUnicode(false);

            modelBuilder.Entity<MenuGroup>()
                .HasMany(e => e.Menus)
                .WithOptional(e => e.MenuGroup)
                .HasForeignKey(e => e.GroupID);

            modelBuilder.Entity<Menu>()
                .Property(e => e.Icon)
                .IsUnicode(false);

            modelBuilder.Entity<Notification>()
                .Property(e => e.Icon)
                .IsUnicode(false);

            modelBuilder.Entity<Order>()
                .Property(e => e.CustomerEmail)
                .IsUnicode(false);

            modelBuilder.Entity<Order>()
                .HasMany(e => e.OrderDetails)
                .WithRequired(e => e.Order)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<OrderStatu>()
                .HasMany(e => e.Orders)
                .WithOptional(e => e.OrderStatu)
                .HasForeignKey(e => e.OrderStatusID);

            modelBuilder.Entity<PCSpecification>()
                .HasMany(e => e.Product_Specifications)
                .WithRequired(e => e.PCSpecification)
                .HasForeignKey(e => e.SpecificationID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<PostCategory>()
                .Property(e => e.Alias)
                .IsUnicode(false);

            modelBuilder.Entity<PostCategory>()
                .HasMany(e => e.Posts)
                .WithRequired(e => e.PostCategory)
                .HasForeignKey(e => e.CategoryID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Post>()
                .Property(e => e.Alias)
                .IsUnicode(false);

            modelBuilder.Entity<Post>()
                .HasMany(e => e.PostTags)
                .WithRequired(e => e.Post)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<PostTag>()
                .Property(e => e.TagID)
                .IsUnicode(false);

            modelBuilder.Entity<ProductCategory>()
                .Property(e => e.Alias)
                .IsUnicode(false);

            modelBuilder.Entity<ProductCategory>()
                .Property(e => e.Image)
                .IsUnicode(false);

            modelBuilder.Entity<ProductCategory>()
                .Property(e => e.Relationship)
                .IsUnicode(false);

            modelBuilder.Entity<ProductCategory>()
                .HasMany(e => e.PCSpecifications)
                .WithRequired(e => e.ProductCategory)
                .HasForeignKey(e => e.ProductCategoriesID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ProductCategory>()
                .HasMany(e => e.Products)
                .WithRequired(e => e.ProductCategory)
                .HasForeignKey(e => e.CategoryID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.Alias)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.DiscountCode)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.Category)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.SeoImage)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .HasMany(e => e.OrderDetails)
                .WithRequired(e => e.Product)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Product>()
                .HasMany(e => e.Product_Specifications)
                .WithRequired(e => e.Product)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Product>()
                .HasMany(e => e.ProductTags)
                .WithRequired(e => e.Product)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ProductTag>()
                .Property(e => e.TagID)
                .IsUnicode(false);

            modelBuilder.Entity<PromotionPackage>()
                .HasMany(e => e.PromotionDetails)
                .WithRequired(e => e.PromotionPackage)
                .HasForeignKey(e => e.ProPackageID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Promotion>()
                .Property(e => e.Value)
                .HasPrecision(10, 2);

            modelBuilder.Entity<Promotion>()
                .HasMany(e => e.PromotionDetails)
                .WithRequired(e => e.Promotion)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Slide>()
                .Property(e => e.Image)
                .IsUnicode(false);

            modelBuilder.Entity<Supplier>()
                .Property(e => e.Alias)
                .IsUnicode(false);

            modelBuilder.Entity<Tag>()
                .Property(e => e.ID)
                .IsUnicode(false);

            modelBuilder.Entity<Tag>()
                .Property(e => e.Type)
                .IsUnicode(false);

            modelBuilder.Entity<Tag>()
                .HasMany(e => e.PostTags)
                .WithRequired(e => e.Tag)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Tag>()
                .HasMany(e => e.ProductTags)
                .WithRequired(e => e.Tag)
                .WillCascadeOnDelete(false);
        }
    }
}
