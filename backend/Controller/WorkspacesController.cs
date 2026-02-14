using backend.DTOs;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller;

[ApiController]
[Route("api/[controller]")]
public class WorkspacesController : ControllerBase
{
    private readonly IWorkspaceService _workspaceService;

    public WorkspacesController(IWorkspaceService workspaceService)
    {
        _workspaceService = workspaceService;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<Workspace>>> GetWorkspaces()
    {
        var userId = User.GetUserId();
        var workspaces = await _workspaceService.GetAllWorkspacesForUserAsync(userId);
        return Ok(workspaces);
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<Workspace>> GetWorkspaceById(int id)
    {
        var workspace = await _workspaceService.GetWorkspaceByIdAsync(id);
        if (workspace == null)
            return NotFound();
        return Ok(workspace);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteWorkspace(int id)
    {
        var success = await _workspaceService.DeleteWorkspaceAsync(id);
        if (!success)
            return NotFound();
        return NoContent();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Workspace>> CreateWorkspace(WorkspaceCreateDto workspaceDto)
    {
        var userId = User.GetUserId();

        var createdWorkspace = await _workspaceService.CreateWorkspaceAsync(workspaceDto, userId);
        return CreatedAtAction(
            nameof(GetWorkspaces),
            new { id = createdWorkspace.Id },
            createdWorkspace
        );
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "WorkspaceMember")]
    public async Task<ActionResult<Workspace>> UpdateWorkspace(
        int id,
        WorkspaceUpdateDto workspaceDto
    )
    {
        var workspace = await _workspaceService.GetWorkspaceByIdAsync(id);
        if (workspace == null)
            return NotFound();
        var updatedWorkspace = await _workspaceService.UpdateWorkspaceAsync(id, workspaceDto);
        return Ok(updatedWorkspace);
    }
}
