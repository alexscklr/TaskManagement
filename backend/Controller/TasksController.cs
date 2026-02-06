using backend.DTOs;
using backend.Interfaces;
using backend.Models;
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
    public async Task<ActionResult<IEnumerable<TodoTaskReadDto>>> GetTasks([FromQuery] int workspaceId)
    {
        var tasks = await _taskService.GetAllTasksAsync(workspaceId);
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoTask>> GetTaskById(int id)
    {
        var task = await _taskService.GetTaskByIdAsync(id);
        if (task == null)
            return NotFound();
        return Ok(task);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var success = await _taskService.DeleteTaskAsync(id);
        if (!success)
            return NotFound();
        return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult<TodoTask>> CreateTask(TaskCreateDto taskDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var createdTask = await _taskService.CreateTaskAsync(taskDto);
        return CreatedAtAction(nameof(GetTasks), new { id = createdTask.Id }, createdTask);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TodoTask>> UpdateTask(int id, TaskUpdateDto taskDto)
    {
        var task = await _taskService.GetTaskByIdAsync(id);
        if (task == null)
            return NotFound();
        var updatedTask = await _taskService.UpdateTaskAsync(id, taskDto);
        return Ok(updatedTask);
    }
}
