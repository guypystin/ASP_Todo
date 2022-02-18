using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace asp_todo.Models.Repository.Interfaces
{
    public interface IMissionRepository
    {
        IEnumerable<Mission> Missions { get;}
    }
}
