using backend.DTOs;

public class WorkspaceMembershipInvitationReadDto
{
    // Die Daten der Einladung selbst
    public int Id { get; set; } // Die ID der Membership/Invitation
    public string Role { get; set; } = null!;
    public DateTime InvitedAt { get; set; }

    // Die Daten des Objekts, zu dem eingeladen wird
    public WorkspaceReadDto Workspace { get; set; } = null!;
}
