using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.DTOs;

public class UserUpdateDto
{
    [Required]
    [StringLength(30)]
    public required string Username { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public required string Email { get; set; } = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 6)]
    public required string NewPassword { get; set; } = string.Empty;
}
