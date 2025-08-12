using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Core.DataAccess;
using TaskManagerAPI.Core.Extension;
using TaskManagerAPI.Core.Models.Task;

namespace TaskManagerAPI.Core.Services.Task
{
    public class TaskService(TaskDbContext dbContext) : ITaskService
    {
        public async Task<IEnumerable<TaskItemDto>> GetAll()
        {
            var tasks = await dbContext.Tasks.ToListAsync();
            return tasks.Select(t => t.ToDto()!);
        }

        public async Task<TaskItemDto?> GetById(int id)
        {
            var task = await dbContext.Tasks.FindAsync(id);
            return task.ToDto();
        }

        public async Task<TaskItemDto?> CreateTask(TaskItemDto dto)
        {
            var task = dto.ToEntity();
            dbContext.Tasks.Add(task);
            await dbContext.SaveChangesAsync();

            return task.ToDto();
        }

        public async Task<bool> UpdateTask(int id, TaskItemDto updatedTask)
        {
            var isExists = true;
            var task = await dbContext.Tasks.FindAsync(id);
            if (task is null) return !isExists;

            task.Title = updatedTask.Title;
            task.Description = updatedTask.Description ?? string.Empty;
            task.IsCompleted = updatedTask.IsCompleted;
            await dbContext.SaveChangesAsync();

            return isExists;
        }

        public async Task<bool> RemoveTask(int id)
        {
            var isExists = true;
            var task = await dbContext.Tasks.FindAsync(id);
            if (task is null) return !isExists;

            dbContext.Tasks.Remove(task);
            await dbContext.SaveChangesAsync();

            return isExists;
        }
    }
}
