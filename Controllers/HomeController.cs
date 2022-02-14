using asp_todo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace asp_todo.Controllers
{
    public class HomeController : Controller
    {
        
        private readonly ILogger<HomeController> _logger;
        private readonly MissionContext _context;
        public HomeController(ILogger<HomeController> logger, MissionContext context)
        {
            _logger = logger;
            _context = context;
        }
        [HttpGet]
        public IActionResult Index()
        {
            return View("~/Views/Home/Index.cshtml", _context.Missions.ToList());
        }
        
        [HttpPost]
        public IActionResult Index(Mission mission)
        {
            mission.Add_Time = System.DateTime.Now;
            //mission.Tab_Id = UrlHelperExtensions.ActionLink.
            _context.Missions.AddRange(
                new Mission
                {
                    Id = mission.Id,
                    Name = mission.Name,
                    Add_Time = mission.Add_Time,
                    Complete = mission.Complete,
                    Tab_Id = mission.Tab_Id
                }

                );
            _context.SaveChanges();
            return View(_context.Missions.ToList());
        }

        [HttpPost]
        public IActionResult AddTab(Tab tab)
        {

            _context.Tabs.AddRange(
                new Tab
                {
                    Id = tab.Id,
                    Name = tab.Name
                }
                );

            _context.SaveChanges();
            return Redirect("/");
        }
        //GET /todo/delete/5
        public async Task<ActionResult> Delete(int id)
        {
            Mission item = await _context.Missions.FindAsync(id);
            _context.Missions.Remove(item);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
        //GET /Home/1
        [Route("/Home/TabClick/{id}", Name = "Custom")]
        public async Task<ActionResult> TabClick(int id)
        {
            //return RedirectToAction("Home", "TabClick", new { id = number });
            var users = _context.Missions.Where(p => p.Id == id);
            int _umber = id;
            return View("~/Views/Home/Index.cshtml", users.ToList());
        }
            public IActionResult Privacy()
        {
            return View();
        }
    }
}
