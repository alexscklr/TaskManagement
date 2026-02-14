using backend.DTOs;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<CategoryReadDto>>> GetCategories(
        [FromQuery] int workspaceId
    )
    {
        var categories = await _categoryService.GetAllCategoriesAsync(workspaceId);
        return Ok(categories);
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<CategoryReadDto>> GetCategoryById(int id)
    {
        var category = await _categoryService.GetCategoryByIdAsync(id);
        if (category == null)
            return NotFound();
        return Ok(category);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var success = await _categoryService.DeleteCategoryAsync(id);
        if (!success)
            return NotFound();
        return NoContent();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<CategoryReadDto>> CreateCategory(CategoryCreateDto categoryDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var createdCategory = await _categoryService.CreateCategoryAsync(categoryDto);
        return CreatedAtAction(
            nameof(GetCategoryById),
            new { id = createdCategory.Id },
            createdCategory
        );
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<CategoryReadDto>> UpdateCategory(
        int id,
        CategoryUpdateDto categoryDto
    )
    {
        var category = await _categoryService.GetCategoryByIdAsync(id);
        if (category == null)
            return NotFound();
        var updatedCategory = await _categoryService.UpdateCategoryAsync(id, categoryDto);
        return Ok(updatedCategory);
    }
}
