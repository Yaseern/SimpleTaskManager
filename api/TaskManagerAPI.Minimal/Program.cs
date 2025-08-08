using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TaskManagerAPI.Core.DataAccess;
using TaskManagerAPI.Core.DataAccess.Entities;
using TaskManagerAPI.Core.Models.Configuration;
using static TaskManagerAPI.Core.Extension.BasicAuthExtensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TaskDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

var auth = builder.Configuration.GetSection("SimpleAuth").Get<SimpleAuth>()!;

app.UseBasicAuth(auth.Username, auth.Password);

app.MapGet("/api/tasks", async (TaskDbContext db) =>
    await db.Tasks.ToListAsync());

app.MapGet("/api/tasks/{id}", async (int id, TaskDbContext db) =>
    await db.Tasks.FindAsync(id) is TaskItem task ? Results.Ok(task) : Results.NotFound());

app.MapPost("/api/tasks", async (TaskItem task, TaskDbContext db) =>
{
    db.Tasks.Add(task);
    await db.SaveChangesAsync();
    return Results.Created($"/api/tasks/{task.Id}", task);
});

app.MapPut("/api/tasks/{id}", async (int id, TaskItem updatedTask, TaskDbContext db) =>
{
    var task = await db.Tasks.FindAsync(id);
    if (task is null) return Results.NotFound();

    task.Title = updatedTask.Title;
    task.Description = updatedTask.Description;
    task.IsCompleted = updatedTask.IsCompleted;
    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/api/tasks/{id}", async (int id, TaskDbContext db) =>
{
    var task = await db.Tasks.FindAsync(id);
    if (task is null) return Results.NotFound();

    db.Tasks.Remove(task);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();
