using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Core.DataAccess.Entities;

namespace TaskManagerAPI.Core.DataAccess
{
    public class TaskDbContext : DbContext
    {
        public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options) { }

        public DbSet<TaskItem> Tasks => Set<TaskItem>();
    }
}
