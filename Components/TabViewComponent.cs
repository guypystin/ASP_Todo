using asp_todo.Models;
using Microsoft.AspNetCore.Mvc;

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
