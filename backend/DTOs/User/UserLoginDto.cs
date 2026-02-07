using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.DTOs;

public class UserLoginDto
{
    [Required]
    [EmailAddress]
    public required string Email { get; set; } = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 6)]
    public required string Password { get; set; } = string.Empty;
}
