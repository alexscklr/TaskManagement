using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.DTOs;

public class TaskCreateDto
{
    [Required(ErrorMessage = "WorkspaceId ist erforderlich")]
    public int WorkspaceId { get; set; }

    [Required(ErrorMessage = "Titel darf nicht leer sein")]
    [StringLength(100, MinimumLength = 3)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(500, ErrorMessage = "Beschreibung darf maximal 500 Zeichen lang sein")]
    public string Description { get; set; } = string.Empty;
    public int CategoryId { get; set; }

    [EnumDataType(typeof(TaskPriority), ErrorMessage = "Ungültige Priorität")]
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;
}
