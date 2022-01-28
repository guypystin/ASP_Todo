using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace asp_todo.Models
{
    public interface ITabRepository
    {
        IEnumerable<Tab> Tabs { get; }
    }
}
