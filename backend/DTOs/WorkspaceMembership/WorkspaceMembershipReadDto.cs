using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.DTOs;

public class WorkspaceMembershipReadDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int WorkspaceId { get; set; }
    public WorkspaceRole Role { get; set; } = WorkspaceRole.Member;
}
