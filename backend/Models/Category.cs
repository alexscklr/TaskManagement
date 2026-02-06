using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Category
{
    public int Id { get; set; }

    [Required]
    [StringLength(50)]
    public string Name { get; set; } = string.Empty;
    public string Color { get; set; } = "#000000";
    public ICollection<TodoTask> Tasks { get; set; } = new List<TodoTask>();

    public int WorkspaceId { get; set; }
    public Workspace Workspace { get; set; } = null!;
}
