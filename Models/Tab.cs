using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace asp_todo.Models
{
    public class Tab
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Tab_Id { get; set; }
    }
}
