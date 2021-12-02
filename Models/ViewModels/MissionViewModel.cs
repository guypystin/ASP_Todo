using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace asp_todo.Models.ViewModels
{
    public class MissionViewModel
    {
        public IEnumerable<Mission> Missions { get; set; }
    }
}
