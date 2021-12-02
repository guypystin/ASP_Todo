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
            return View(_context.Missions.ToList());
        }

        /*Дописать отправку ViewModel в представление */
        [HttpPost]
        public IActionResult Index(Mission mission)
        {
            mission.Add_Time = System.DateTime.Now;
            _context.Missions.AddRange(
                new Mission
                {
                    Id = mission.Id,
                    Name = mission.Name,
                    Add_Time = mission.Add_Time,
                    Complete = mission.Complete
                }
                );
            _context.SaveChanges();
            return View(_context.Missions.ToList());
        }

        public IActionResult Privacy()
        {
            return View();
        }
    }
}
