using backend.DTOs;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<TodoTaskReadDto>>> GetTasks(
        [FromQuery] int workspaceId
    )
    {
        var tasks = await _taskService.GetAllTasksAsync(workspaceId);
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<TodoTask>> GetTaskById(int id)
    {
        var task = await _taskService.GetTaskByIdAsync(id);
        if (task == null)
            return NotFound();
        return Ok(task);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var success = await _taskService.DeleteTaskAsync(id);
        if (!success)
            return NotFound();
        return NoContent();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<TodoTask>> CreateTask(TaskCreateDto taskDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var createdTask = await _taskService.CreateTaskAsync(taskDto);
        return CreatedAtAction(nameof(GetTasks), new { id = createdTask.Id }, createdTask);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<TodoTask>> UpdateTask(int id, TaskUpdateDto taskDto)
    {
        var task = await _taskService.GetTaskByIdAsync(id);
        if (task == null)
            return NotFound();
        var updatedTask = await _taskService.UpdateTaskAsync(id, taskDto);
        return Ok(updatedTask);
    }
}
