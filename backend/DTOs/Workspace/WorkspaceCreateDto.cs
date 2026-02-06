using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;

public class WorkspaceCreateDto
{
    [Required]
    [StringLength(50)]
    public string Name { get; set; } = string.Empty;
}
