using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;

public class WorkspaceReadDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}
