using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Core.DataAccess;
using TaskManagerAPI.Core.Services.Task;

namespace TaskManagerAPI.Minimal.Helpers
{
    public static class StartupHelper
    {
        public static void CustomRegister(this WebApplicationBuilder builder, bool isMinimalApi)
        {
            builder.Services.AddDbContext<TaskDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: "AllowedCors",
                                  policy =>
                                  {
                                      policy.WithOrigins("http://localhost:4200")
                                            .AllowAnyHeader()
                                            .AllowAnyMethod();
                                  });
            });

            if(!isMinimalApi)
            {
                builder.Services.AddControllers();
                builder.Services.Dependencies();
            }            
        }

        public static void Dependencies(this IServiceCollection services)
        {
            services.AddScoped<ITaskService, TaskService>();
        }
    }
}
