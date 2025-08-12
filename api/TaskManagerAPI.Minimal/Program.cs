using TaskManagerAPI.Core.Models.Configuration;
using TaskManagerAPI.Minimal.Helpers;
using static TaskManagerAPI.Core.Extension.BasicAuthExtensions;

var builder = WebApplication.CreateBuilder(args);

var isMinimalAPI = builder.Configuration.GetSection("IsMinimalAPI").Get<bool>();
builder.CustomRegister(isMinimalAPI);

var app = builder.Build();

app.UseCors("AllowedCors");

app.MapGet("/", () => new { Message = "Welcome to the task manager!" });

var auth = builder.Configuration.GetSection("SimpleAuth").Get<SimpleAuth>()!;

app.UseBasicAuth(auth.Username, auth.Password);

if (isMinimalAPI)
{
    app.CustomMinimalApiRegister();
}
else
{
    app.MapControllers();
}

app.Run();
