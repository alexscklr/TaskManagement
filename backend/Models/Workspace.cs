using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Workspace
{
    public int Id { get; set; }

    [Required]
    [StringLength(50)]
    public required string Name { get; set; } = string.Empty;

    public ICollection<Category> Categories { get; set; } = new List<Category>();
    public ICollection<TodoTask> Tasks { get; set; } = new List<TodoTask>();
    public ICollection<WorkspaceMembership> WorkspaceMemberships { get; set; } =
        new List<WorkspaceMembership>();
}
