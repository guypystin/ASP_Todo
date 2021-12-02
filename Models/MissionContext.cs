using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace asp_todo.Models
{
    public class MissionContext : DbContext
    {
        public DbSet<Mission> Missions { get; set; }

        public MissionContext(DbContextOptions<MissionContext> options)
        :base(options)
        {
            Database.EnsureCreated(); 
        }
    }
}
