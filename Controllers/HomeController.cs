using asp_todo.Models;
using Microsoft.AspNetCore.Mvc;
using System;
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

        //POST /Home/AddMission/{12}
        [Route("/Home/AddMission/{TabId}")] //Добавляет записи
        [HttpPost]
        public IActionResult Index(Mission mission, int TabId)
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

            var curTable = _context.Missions.Where(p => p.Tab_Id == TabId);
            return ViewComponent("MissionTable", curTable.ToList());
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
        [Route("/Home/DeleteMission/{Tab_id}/{id}")]
        public async Task<ActionResult> DeleteMission(int id, int Tab_id) //удаление записей
        {
            Mission MissionItem = await _context.Missions.FindAsync(id);
             _context.Missions.Remove(MissionItem);
            await _context.SaveChangesAsync();
            var tabList = _context.Missions.Where(p => p.Tab_Id == Tab_id);
            return ViewComponent("MissionTable", tabList.ToList());
        }
        //GET /Home/DeleteTab/5
        public async Task<ActionResult> DeleteTab(int id) //удаление таблиц
        {
            Tab TabItem = await _context.Tabs.FindAsync(id);
            _context.Tabs.Remove(TabItem);
            var deleteList = _context.Missions.Where(p => p.Tab_Id == id);
            _context.Missions.RemoveRange(deleteList); //удаление всех связанных с таблицей заданий
            await _context.SaveChangesAsync();
            return View("~/Views/Home/Index.cshtml", _context.Missions.ToList()); //возврат на главную
        }

        //GET /Home//TabClick/25
        [Route("/Home/TabClick/{id}", Name = "Custom")] 
        public async Task<ActionResult> TabClick(int id) //отвечает на ajax запрос
        {
            var tabList = _context.Missions.Where(p => p.Tab_Id == id);
            return ViewComponent("MissionTable", tabList.ToList());
        }

        [Route("/Home/checkboxClick")]
        public async Task<ActionResult> CompleteClick(int id, bool value, int Tab_id) //отвечает на ajax запрос
        {
            Mission mission = _context.Missions.Find(id);
            mission.Complete = value;
            _context.SaveChanges();
            var tabList = _context.Missions.Where(p => p.Tab_Id == Tab_id);
            return ViewComponent("MissionTable", tabList.ToList());
        }
    }
}