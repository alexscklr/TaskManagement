using backend.DTOs;
using backend.Models;

namespace backend.Services.Interfaces;

public interface IWorkspaceService
{
    Task<IEnumerable<WorkspaceReadDto>> GetAllWorkspacesAsync();
    Task<IEnumerable<WorkspaceReadDto>> GetAllWorkspacesForUserAsync(int userId);
    Task<WorkspaceReadDto?> GetWorkspaceByIdAsync(int id);
    Task<WorkspaceReadDto> CreateWorkspaceAsync(WorkspaceCreateDto workspaceDto, int creatorUserId);
    Task<bool> DeleteWorkspaceAsync(int id);
    Task<WorkspaceReadDto> UpdateWorkspaceAsync(int id, WorkspaceUpdateDto workspaceDto);
}
