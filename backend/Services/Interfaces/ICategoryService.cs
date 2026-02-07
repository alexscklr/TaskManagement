using backend.DTOs;
using backend.Models;

namespace backend.Services.Interfaces;

public interface ICategoryService
{
    Task<IEnumerable<CategoryReadDto>> GetAllCategoriesAsync(int workspaceId);
    Task<CategoryReadDto?> GetCategoryByIdAsync(int id);
    Task<CategoryReadDto> CreateCategoryAsync(CategoryCreateDto categoryDto);
    Task<bool> DeleteCategoryAsync(int id);
    Task<CategoryReadDto> UpdateCategoryAsync(int id, CategoryUpdateDto categoryDto);
}
