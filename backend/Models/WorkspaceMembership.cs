namespace backend.Models;

public enum WorkspaceRole
{
    Owner,
    Admin,
    Member,
}

public class WorkspaceMembership
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int WorkspaceId { get; set; }
    public WorkspaceRole Role { get; set; } = WorkspaceRole.Member;
    public DateTime? JoinedAt { get; set; } = null;
    public DateTime? InvitedAt { get; set; } = null;

    // Navigation properties
    public User User { get; set; } = null!;
    public Workspace Workspace { get; set; } = null!;
}
