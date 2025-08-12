using TaskManagerAPI.Core.Models.Task;

namespace TaskManagerAPI.Core.Services.Task
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItemDto>> GetAll();
        Task<TaskItemDto?> GetById(int id);
        Task<TaskItemDto?> CreateTask(TaskItemDto dto);
        Task<bool> UpdateTask(int id, TaskItemDto updatedTask);
        Task<bool> RemoveTask(int id);
    }
}
