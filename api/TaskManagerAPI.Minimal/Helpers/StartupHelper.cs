using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Core.DataAccess;

namespace TaskManagerAPI.Minimal.Helpers
{
    public static class StartupHelper
    {
        public static void CustomRegister(this WebApplicationBuilder builder)
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
        }
    }
}
