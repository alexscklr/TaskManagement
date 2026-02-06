using backend.DTOs;
using backend.Models;

namespace backend.Interfaces;

public interface ITaskService
{
    Task<IEnumerable<TodoTaskReadDto>> GetAllTasksAsync(int workspaceId);
    Task<TodoTaskReadDto?> GetTaskByIdAsync(int id);
    Task<TodoTaskReadDto> CreateTaskAsync(TaskCreateDto taskDto);
    Task<bool> DeleteTaskAsync(int id);
    Task<TodoTaskReadDto> UpdateTaskAsync(int id, TaskUpdateDto taskDto);
}
