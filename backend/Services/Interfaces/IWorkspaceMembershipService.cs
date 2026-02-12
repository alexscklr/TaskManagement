using backend.DTOs;
using backend.Models;

namespace backend.Services.Interfaces;

public interface IWorkspaceMembershipService
{
    Task<WorkspaceMembershipReadDto> InviteUserToWorkspaceAsync(
        WorkspaceMembershipInviteDto membershipDto
    );
    Task<IEnumerable<WorkspaceMembershipInvitationReadDto>> GetPendingInvitationsForUserAsync(
        int userId
    );
    Task<bool> AcceptWorkspaceInvitationAsync(int userId, int workspaceId);
    Task<bool> RemoveUserFromWorkspaceAsync(int userId, int workspaceId);
    Task<WorkspaceMembershipReadDto> UpdateUserRoleInWorkspaceAsync(
        int userId,
        int workspaceId,
        WorkspaceMembershipUpdateDto membershipDto
    );

    Task<IEnumerable<UserReadDto>> GetUsersInWorkspaceAsync(int workspaceId);
    Task<IEnumerable<WorkspaceReadDto>> GetWorkspacesForUserAsync(int userId);

    Task<WorkspaceMembershipReadDto?> GetMembershipAsync(int userId, int workspaceId);

    Task<bool> IsUserInWorkspaceAsync(int userId, int workspaceId);
    Task<bool> HasUserRoleInWorkspaceAsync(int userId, int workspaceId, WorkspaceRole role);
    Task<WorkspaceRole> GetUserRoleInWorkspaceAsync(int userId, int workspaceId);
}
