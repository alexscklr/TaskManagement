using System.Security.Claims;
using backend.DTOs;
using backend.Models;
using backend.Services;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller;

[ApiController]
[Route("api/[controller]")]
public class WorkspaceMembershipsController : ControllerBase
{
    private readonly IWorkspaceMembershipService _membershipService;

    public WorkspaceMembershipsController(IWorkspaceMembershipService membershipService)
    {
        _membershipService = membershipService;
    }

    [HttpPost("invite")]
    public async Task<ActionResult<WorkspaceMembershipReadDto>> InviteUser(
        [FromBody] WorkspaceMembershipInviteDto dto
    )
    {
        var result = await _membershipService.InviteUserToWorkspaceAsync(dto);
        return Ok(result);
    }

    [HttpGet("invitations")]
    [Authorize]
    public async Task<
        ActionResult<IEnumerable<WorkspaceMembershipInvitationReadDto>>
    > GetInvitations()
    {
        // ID aus dem Token holen statt aus der Query
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var invitations = await _membershipService.GetPendingInvitationsForUserAsync(userId);
        return Ok(invitations);
    }

    [HttpPost("accept")]
    [Authorize]
    public async Task<ActionResult> AcceptInvitation([FromQuery] int workspaceId)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        await _membershipService.AcceptWorkspaceInvitationAsync(userId, workspaceId);
        return Ok();
    }

    [HttpDelete("remove")]
    public async Task<ActionResult> RemoveUser([FromQuery] int userId, [FromQuery] int workspaceId)
    {
        await _membershipService.RemoveUserFromWorkspaceAsync(userId, workspaceId);
        return Ok();
    }

    [HttpPut("role")]
    public async Task<ActionResult<WorkspaceMembershipReadDto>> UpdateRole(
        [FromQuery] int userId,
        [FromQuery] int workspaceId,
        [FromBody] WorkspaceMembershipUpdateDto dto
    )
    {
        var result = await _membershipService.UpdateUserRoleInWorkspaceAsync(
            userId,
            workspaceId,
            dto
        );
        return Ok(result);
    }

    [HttpGet("users")]
    public async Task<ActionResult<IEnumerable<UserReadDto>>> GetUsers([FromQuery] int workspaceId)
    {
        var users = await _membershipService.GetUsersInWorkspaceAsync(workspaceId);
        return Ok(users);
    }

    [HttpGet("workspaces")]
    public async Task<ActionResult<IEnumerable<WorkspaceReadDto>>> GetWorkspaces(
        [FromQuery] int userId
    )
    {
        var workspaces = await _membershipService.GetWorkspacesForUserAsync(userId);
        return Ok(workspaces);
    }

    [HttpGet("membership")]
    public async Task<ActionResult<WorkspaceMembershipReadDto?>> GetMembership(
        [FromQuery] int userId,
        [FromQuery] int workspaceId
    )
    {
        var membership = await _membershipService.GetMembershipAsync(userId, workspaceId);
        if (membership == null)
            return NotFound();
        return Ok(membership);
    }

    [HttpGet("is-in-workspace")]
    public async Task<ActionResult<bool>> IsUserInWorkspace(
        [FromQuery] int userId,
        [FromQuery] int workspaceId
    )
    {
        var isIn = await _membershipService.IsUserInWorkspaceAsync(userId, workspaceId);
        return Ok(isIn);
    }

    [HttpGet("has-role")]
    public async Task<ActionResult<bool>> HasUserRole(
        [FromQuery] int userId,
        [FromQuery] int workspaceId,
        [FromQuery] WorkspaceRole role
    )
    {
        var hasRole = await _membershipService.HasUserRoleInWorkspaceAsync(
            userId,
            workspaceId,
            role
        );
        return Ok(hasRole);
    }

    [HttpGet("role")]
    public async Task<ActionResult<WorkspaceRole>> GetUserRole(
        [FromQuery] int userId,
        [FromQuery] int workspaceId
    )
    {
        var role = await _membershipService.GetUserRoleInWorkspaceAsync(userId, workspaceId);
        return Ok(role);
    }
}
