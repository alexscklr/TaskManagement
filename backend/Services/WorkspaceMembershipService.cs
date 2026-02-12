using System.Diagnostics.Eventing.Reader;
using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class WorkspaceMembershipService : IWorkspaceMembershipService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public WorkspaceMembershipService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<WorkspaceMembershipReadDto> InviteUserToWorkspaceAsync(
        WorkspaceMembershipInviteDto membershipDto
    )
    {
        var userId = await _context
            .Users.Where(u => u.Email == membershipDto.Email)
            .Select(u => u.Id)
            .FirstOrDefaultAsync();

        var membershipEntity = new WorkspaceMembership
        {
            UserId = userId,
            WorkspaceId = membershipDto.WorkspaceId,
            Role = membershipDto.Role,
            JoinedAt = null, // Invitation pending, so JoinedAt is null
        };

        _context.WorkspaceMemberships.Add(membershipEntity);
        await _context.SaveChangesAsync();

        return _mapper.Map<WorkspaceMembershipReadDto>(membershipEntity);
    }

    public async Task<
        IEnumerable<WorkspaceMembershipInvitationReadDto>
    > GetPendingInvitationsForUserAsync(int userId)
    {
        var memberships = await _context
            .WorkspaceMemberships.Include(m => m.Workspace)
            .Where(m => m.UserId == userId && m.JoinedAt == null)
            .ToListAsync();

        if (memberships == null)
        {
            throw new KeyNotFoundException($"Invitations for user {userId} not found.");
        }

        return _mapper.Map<IEnumerable<WorkspaceMembershipInvitationReadDto>>(memberships);
    }

    public async Task<bool> AcceptWorkspaceInvitationAsync(int userId, int workspaceId)
    {
        var membership = await _context.WorkspaceMemberships.FirstOrDefaultAsync(m =>
            m.UserId == userId && m.WorkspaceId == workspaceId
        );

        if (membership == null)
        {
            throw new KeyNotFoundException(
                $"Invitation for user {userId} to workspace {workspaceId} not found."
            );
        }

        membership.JoinedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> RemoveUserFromWorkspaceAsync(int userId, int workspaceId)
    {
        var membership = await _context.WorkspaceMemberships.FirstOrDefaultAsync(m =>
            m.UserId == userId && m.WorkspaceId == workspaceId
        );

        if (membership == null)
        {
            throw new KeyNotFoundException(
                $"Membership for user {userId} in workspace {workspaceId} not found."
            );
        }

        _context.WorkspaceMemberships.Remove(membership);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<WorkspaceMembershipReadDto> UpdateUserRoleInWorkspaceAsync(
        int userId,
        int workspaceId,
        WorkspaceMembershipUpdateDto membershipDto
    )
    {
        var membership = await _context.WorkspaceMemberships.FirstOrDefaultAsync(m =>
            m.UserId == userId && m.WorkspaceId == workspaceId
        );

        if (membership == null)
        {
            throw new KeyNotFoundException(
                $"Membership for user {userId} in workspace {workspaceId} not found."
            );
        }

        membership.Role = membershipDto.Role;
        await _context.SaveChangesAsync();

        return _mapper.Map<WorkspaceMembershipReadDto>(membership);
    }

    public async Task<IEnumerable<UserReadDto>> GetUsersInWorkspaceAsync(int workspaceId)
    {
        var memberships = await _context
            .WorkspaceMemberships.Where(m => m.WorkspaceId == workspaceId && m.JoinedAt != null)
            .Include(m => m.User)
            .ToListAsync();

        var users = memberships.Select(m => m.User).ToList();
        var userDtos = _mapper.Map<List<UserReadDto>>(users);

        return userDtos;
    }

    public async Task<IEnumerable<WorkspaceReadDto>> GetWorkspacesForUserAsync(int userId)
    {
        var memberships = await _context
            .WorkspaceMemberships.Where(m => m.UserId == userId && m.JoinedAt != null)
            .Include(m => m.Workspace)
            .ToListAsync();

        var workspaces = memberships.Select(m => m.Workspace).ToList();
        var workspaceDtos = _mapper.Map<List<WorkspaceReadDto>>(workspaces);

        return workspaceDtos;
    }

    public async Task<WorkspaceMembershipReadDto?> GetMembershipAsync(int userId, int workspaceId)
    {
        var membership = await _context.WorkspaceMemberships.FirstOrDefaultAsync(m =>
            m.UserId == userId && m.WorkspaceId == workspaceId
        );

        if (membership == null)
        {
            return null;
        }

        return _mapper.Map<WorkspaceMembershipReadDto>(membership);
    }

    public async Task<bool> IsUserInWorkspaceAsync(int userId, int workspaceId)
    {
        var membership = await _context.WorkspaceMemberships.FirstOrDefaultAsync(m =>
            m.UserId == userId && m.WorkspaceId == workspaceId
        );

        return membership != null;
    }

    public async Task<bool> HasUserRoleInWorkspaceAsync(
        int userId,
        int workspaceId,
        WorkspaceRole role
    )
    {
        var membership = await _context.WorkspaceMemberships.FirstOrDefaultAsync(m =>
            m.UserId == userId && m.WorkspaceId == workspaceId && m.Role == role
        );

        return membership != null;
    }

    public async Task<WorkspaceRole> GetUserRoleInWorkspaceAsync(int userId, int workspaceId)
    {
        var membership = await _context.WorkspaceMemberships.FirstOrDefaultAsync(m =>
            m.UserId == userId && m.WorkspaceId == workspaceId
        );

        if (membership == null)
        {
            throw new KeyNotFoundException(
                $"Membership for user {userId} in workspace {workspaceId} not found."
            );
        }

        return membership.Role;
    }
}
