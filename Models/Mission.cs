using System;
using System.ComponentModel.DataAnnotations;

namespace asp_todo.Models
{
    public class Mission
    {
        public int Id { get; set; }
        /*        [Required]
                [DisplayFormat(ConvertEmptyStringToNull = false)]*/
        /*        [StringLength(8, ErrorMessage = "Name length can't be more than 8.")]*/
        public string Name { get; set; }
        public DateTime Add_Time { get; set; }
        public bool Complete { get; set; }
        public int Tab_Id { get; set; }
    }
}
