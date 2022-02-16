using asp_todo.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace asp_todo.Controllers
{
    public class HomeController : Controller
    {
        private readonly MissionContext _context;
        public HomeController(MissionContext context)
        {
            _context = context;
        }

        //GET /Home/Index
        [HttpGet]
        public IActionResult Index() //главная страница
        {
            return View("~/Views/Home/Index.cshtml", _context.Missions.ToList());
        }

        //POST /Home/Index
        [Route("/Home/Index")] //Добавляет записи
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
                    Complete = mission.Complete,
                    Tab_Id = mission.Tab_Id
                }

                );
            _context.SaveChanges();
            return View(_context.Missions.ToList());
        }

        [HttpPost] 
        public IActionResult AddTab(Tab tab) //добавляет списки задач
        {
            _context.Tabs.AddRange(
                new Tab
                {
                    Id = tab.Id,
                    Name = tab.Name
                });

            _context.SaveChanges();
            return Redirect("/");
        }

        //GET /Home/DeleteMission/5
        public async Task<ActionResult> DeleteMission(int id) //удаление записей
        {
            Mission MissionItem = await _context.Missions.FindAsync(id);
            _context.Missions.Remove(MissionItem);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
        //GET /Home/DeleteTab/5
        public async Task<ActionResult> DeleteTab(int id) //удаление таблиц
        {
            Tab TabItem = await _context.Tabs.FindAsync(id);
            _context.Tabs.Remove(TabItem);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        //GET /Home//TabClick/25
        [Route("/Home/TabClick/{id}", Name = "Custom")] 
        public async Task<ActionResult> TabClick(int id) //отвечает на ajax запрос
        {
            var tabList = _context.Missions.Where(p => p.Tab_Id == id);
            return View("~/Views/Home/Index.cshtml", tabList.ToList());
        }
    }
}
