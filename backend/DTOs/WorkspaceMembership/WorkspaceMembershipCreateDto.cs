using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.DTOs;

public class WorkspaceMembershipCreateDto
{
    [Required]
    public int UserId { get; set; }

    [Required]
    public int WorkspaceId { get; set; }

    [Required]
    public WorkspaceRole Role { get; set; } = WorkspaceRole.Member;
}
