using asp_todo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace asp_todo.Components
{
    public class TabViewComponent : ViewComponent
    {
        private ITabRepository repository;
        public TabViewComponent(ITabRepository repo)
        {
            repository = repo;
        }
        public IViewComponentResult Invoke()
        {
            return View(repository.Tabs);
        }
    }
}
