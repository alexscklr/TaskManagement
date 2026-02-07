using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class TaskService : ITaskService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public TaskService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<TodoTaskReadDto>> GetAllTasksAsync(int workspaceId)
    {
        var tasks = await _context
            .Tasks.Include(t => t.Category) // WICHTIG: Lade die Kategorie mit, sonst bleibt CategoryName leer!
            .Where(t => t.WorkspaceId == workspaceId) // FILTERUNG
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();

        return _mapper.Map<IEnumerable<TodoTaskReadDto>>(tasks);
    }

    public async Task<TodoTaskReadDto> CreateTaskAsync(TaskCreateDto taskDto)
    {
        var taskEntity = new TodoTask
        {
            Title = taskDto.Title,
            Description = taskDto.Description,
            IsCompleted = false,
            CategoryId = taskDto.CategoryId,
            Priority = taskDto.Priority,
            CreatedAt = DateTime.UtcNow,
            WorkspaceId = taskDto.WorkspaceId,
        };

        _context.Tasks.Add(taskEntity);
        await _context.SaveChangesAsync();

        // 100% Sicher: Task komplett neu aus der DB laden mit Category
        // Das garantiert, dass wir exakt das zurückgeben, was gespeichert wurde.
        var createdTaskWithCategory = await _context
            .Tasks.Include(t => t.Category)
            .FirstOrDefaultAsync(t => t.Id == taskEntity.Id);

        return _mapper.Map<TodoTaskReadDto>(createdTaskWithCategory);
    }

    public async Task<bool> DeleteTaskAsync(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null)
            throw new KeyNotFoundException($"Task with id {id} not found.");

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<TodoTaskReadDto?> GetTaskByIdAsync(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null)
            throw new KeyNotFoundException($"Task with id {id} not found.");
        return _mapper.Map<TodoTaskReadDto>(task);
    }

    public async Task<TodoTaskReadDto> UpdateTaskAsync(int id, TaskUpdateDto taskDto)
    {
        // KORREKTUR: Entity direkt laden für Tracking
        var taskEntity = await _context.Tasks.FindAsync(id);

        if (taskEntity == null)
            throw new KeyNotFoundException($"Task with id {id} not found.");

        // Backup der bestehenden CategoryId, falls im DTO '0' gesendet wird
        var previousCategoryId = taskEntity.CategoryId;

        // Mapping auf die Entity
        _mapper.Map(taskDto, taskEntity);

        // Falls CategoryId 0 ist (z.B. nicht im Formular gesetzt), behalte die alte ID
        if (taskDto.CategoryId == 0)
        {
            taskEntity.CategoryId = previousCategoryId;
        }

        taskEntity.Id = id;

        await _context.SaveChangesAsync();

        // 100% Sicher: Task komplett neu aus der DB laden mit Category
        var updatedTaskWithCategory = await _context
            .Tasks.Include(t => t.Category)
            .FirstOrDefaultAsync(t => t.Id == id);

        return _mapper.Map<TodoTaskReadDto>(updatedTaskWithCategory);
    }
}
