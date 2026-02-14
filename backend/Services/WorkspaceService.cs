using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class WorkspaceService : IWorkspaceService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public WorkspaceService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<WorkspaceReadDto>> GetAllWorkspacesAsync()
    {
        var workspaces = await _context.Workspaces.ToListAsync();
        return _mapper.Map<IEnumerable<WorkspaceReadDto>>(workspaces);
    }

    public async Task<IEnumerable<WorkspaceReadDto>> GetAllWorkspacesForUserAsync(int userId)
    {
        var workspaces = await _context
            .Workspaces.Where(w => w.WorkspaceMemberships.Any(m => m.UserId == userId))
            .ToListAsync();
        return _mapper.Map<IEnumerable<WorkspaceReadDto>>(workspaces);
    }

    public async Task<WorkspaceReadDto?> GetWorkspaceByIdAsync(int id)
    {
        var workspace = await _context.Workspaces.FindAsync(id);
        if (workspace == null)
            throw new KeyNotFoundException($"Workspace with id {id} not found.");
        return _mapper.Map<WorkspaceReadDto>(workspace);
    }

    public async Task<WorkspaceReadDto> CreateWorkspaceAsync(
        WorkspaceCreateDto workspaceDto,
        int creatorUserId
    )
    {
        var workspace = _mapper.Map<Workspace>(workspaceDto);
        _context.Workspaces.Add(workspace);
        await _context.SaveChangesAsync();

        var membership = new WorkspaceMembership
        {
            UserId = creatorUserId,
            WorkspaceId = workspace.Id,
            Role = WorkspaceRole.Owner,
            JoinedAt = DateTime.UtcNow,
        };

        _context.WorkspaceMemberships.Add(membership);
        await _context.SaveChangesAsync();

        return _mapper.Map<WorkspaceReadDto>(workspace);
    }

    public async Task<bool> DeleteWorkspaceAsync(int id)
    {
        var workspace = await _context.Workspaces.FindAsync(id);
        if (workspace == null)
            throw new KeyNotFoundException($"Workspace with id {id} not found.");

        _context.Workspaces.Remove(workspace);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<WorkspaceReadDto> UpdateWorkspaceAsync(
        int id,
        WorkspaceUpdateDto workspaceDto
    )
    {
        var workspace = await _context.Workspaces.FindAsync(id);
        if (workspace == null)
            throw new KeyNotFoundException("Workspace not found");

        _mapper.Map(workspaceDto, workspace);
        await _context.SaveChangesAsync();
        return _mapper.Map<WorkspaceReadDto>(workspace);
    }
}
