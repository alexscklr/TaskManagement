using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<TodoTask> Tasks { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Workspace> Workspaces { get; set; }
    public DbSet<User> Users { get; set; }
    //public DbSet<WorkspaceMembership> Memberships { get; set; }
}
