using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class User
{
    public int Id { get; set; }

    [Required]
    [StringLength(30)]
    public required string Username { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public required string Email { get; set; } = string.Empty;

    [Required]
    public required string PasswordHash { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    //Beziehungen
    public ICollection<WorkspaceMembership> WorkspaceMemberships { get; set; } =
        new List<WorkspaceMembership>();
}
