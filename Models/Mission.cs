using System;

namespace asp_todo.Models
{
    public class Mission
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Add_Time { get; set; }
        public bool Complete { get; set; }
    }
}
