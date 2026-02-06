using backend.DTOs;
using backend.Models;

namespace backend.Interfaces;

public interface IWorkspaceService
{
    Task<IEnumerable<WorkspaceReadDto>> GetAllWorkspacesAsync();
    Task<WorkspaceReadDto?> GetWorkspaceByIdAsync(int id);
    Task<WorkspaceReadDto> CreateWorkspaceAsync(WorkspaceCreateDto workspaceDto);
    Task<bool> DeleteWorkspaceAsync(int id);
    Task<WorkspaceReadDto> UpdateWorkspaceAsync(int id, WorkspaceUpdateDto workspaceDto);
}
