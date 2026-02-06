using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;

public class WorkspaceUpdateDto
{
    [Required]
    [StringLength(50)]
    public string Name { get; set; } = string.Empty;
}
