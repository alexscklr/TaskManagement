using backend.Models;

public class WorkspaceMembershipInviteDto
{
    public string Email { get; set; } = null!; // User gibt E-Mail ein
    public int WorkspaceId { get; set; }
    public WorkspaceRole Role { get; set; }
}
