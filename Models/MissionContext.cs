using Microsoft.EntityFrameworkCore;

namespace asp_todo.Models
{
    public class MissionContext : DbContext
    {
        public DbSet<Mission> Missions { get; set; }
        public DbSet<Tab> Tabs { get; set; }
        public MissionContext(DbContextOptions<MissionContext> options)
            :base(options)
        {
            Database.EnsureCreated(); 
        }
    }
}
