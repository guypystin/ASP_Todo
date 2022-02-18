using asp_todo.Models.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace asp_todo.Models.Repository.Realizations
{
    public class EFMissionRepository : IMissionRepository
    {
        private MissionContext context;

        public EFMissionRepository(MissionContext ctx)
        {
            context = ctx;
        }
        public IEnumerable<Mission> Missions => context.Missions;
    }
}
