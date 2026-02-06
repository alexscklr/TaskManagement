using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public enum TaskPriority
{
    Low,
    Medium,
    High,
}

public class TodoTask
{
    public int Id { get; set; }

    public int CategoryId { get; set; }
    public Category? Category { get; set; }

    [Required(ErrorMessage = "Title is required.")]
    [StringLength(
        100,
        MinimumLength = 3,
        ErrorMessage = "Title must be between 3 and 100 characters."
    )]
    public string Title { get; set; } = string.Empty;

    [MaxLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
    public string Description { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int WorkspaceId { get; set; }
    public Workspace Workspace { get; set; } = null!;
}
