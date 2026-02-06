using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.DTOs;

public class TodoTaskReadDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }

    public CategoryReadDto? Category { get; set; }

    public bool IsCompleted { get; set; }
    public TaskPriority Priority { get; set; }
}
//
