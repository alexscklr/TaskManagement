using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Interfaces;
using backend.Models;
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

    public async Task<WorkspaceReadDto?> GetWorkspaceByIdAsync(int id)
    {
        var workspace = await _context.Workspaces.FindAsync(id);
        if (workspace == null)
            throw new KeyNotFoundException($"Workspace with id {id} not found.");
        return _mapper.Map<WorkspaceReadDto>(workspace);
    }

    public async Task<WorkspaceReadDto> CreateWorkspaceAsync(WorkspaceCreateDto workspaceDto)
    {
        var workspace = _mapper.Map<Workspace>(workspaceDto);
        _context.Workspaces.Add(workspace);
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
