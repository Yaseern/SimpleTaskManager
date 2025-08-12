namespace TaskManagerAPI.Core.Models.Task
{
    public record TaskItemDto(
        int Id,
        string Title,
        string? Description,
        bool IsCompleted
    );
}
