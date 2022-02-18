using asp_todo.Models;
using asp_todo.Models.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace asp_todo.Components
{
    public class MissionTableViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke(List<Mission> miss)
        {
            return View(miss);
        }
    }
}
