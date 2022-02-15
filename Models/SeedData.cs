using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace asp_todo.Models
{
    public class SeedData
    {
        //Принимает в аргументы middleware 
        public static void EnsurePopulated(IApplicationBuilder app)
        {
            //отправка данных в бд
            MissionContext context = app.ApplicationServices
                .GetRequiredService<MissionContext>();
            context.Database.Migrate();
            
            if (!context.Missions.Any())
            {
                context.Missions.AddRange(
                    new Mission
                    {
                        Name = "Первая задача",
                        Add_Time = System.DateTime.Now,
                        Complete = false
                    }
                );
                context.SaveChanges();
            }
            
        }
    }
}
