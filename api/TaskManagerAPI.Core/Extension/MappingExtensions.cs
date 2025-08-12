using TaskManagerAPI.Core.DataAccess.Entities;
using TaskManagerAPI.Core.Models.Task;

namespace TaskManagerAPI.Core.Extension
{
    public static class MappingExtensions
    {
        public static TaskItemDto? ToDto(this TaskItem? entity)
        {
            if (entity is null)
                return null;

            return new TaskItemDto(
                entity.Id,
                entity.Title,
                entity.Description,
                entity.IsCompleted
            );
        }

        public static TaskItem ToEntity(this TaskItemDto dto)
        {
            return new TaskItem
            {
                Id = dto.Id,
                Title = dto.Title ?? string.Empty, 
                Description = dto.Description ?? string.Empty,
                IsCompleted = dto.IsCompleted
            };
        }
    }
}
