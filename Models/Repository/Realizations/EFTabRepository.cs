using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace asp_todo.Models
{
    public class EFTabRepository : ITabRepository
    {
        private MissionContext context;

        public EFTabRepository(MissionContext ctx)
        {
            context = ctx;
        }
        public IEnumerable<Tab> Tabs => context.Tabs;
    }
}
