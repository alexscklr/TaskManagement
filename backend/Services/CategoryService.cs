using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class CategoryService : ICategoryService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public CategoryService(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<CategoryReadDto>> GetAllCategoriesAsync(int workspaceId)
    {
        var categories = await _context
            .Categories.Where(c => c.WorkspaceId == workspaceId) // FILTERUNG
            .ToListAsync();

        return _mapper.Map<IEnumerable<CategoryReadDto>>(categories);
    }

    public async Task<CategoryReadDto> CreateCategoryAsync(CategoryCreateDto categoryDto)
    {
        var categoryEntity = new Category
        {
            Name = categoryDto.Name,
            Color = categoryDto.Color,
            WorkspaceId = categoryDto.WorkspaceId,
        };
        _context.Categories.Add(categoryEntity);
        await _context.SaveChangesAsync();
        return _mapper.Map<CategoryReadDto>(categoryEntity);
    }

    public async Task<bool> DeleteCategoryAsync(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null)
            throw new KeyNotFoundException($"Category with id {id} not found.");

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<CategoryReadDto?> GetCategoryByIdAsync(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null)
            throw new KeyNotFoundException($"Category with id {id} not found.");
        return _mapper.Map<CategoryReadDto>(category);
    }

    public async Task<CategoryReadDto> UpdateCategoryAsync(int id, CategoryUpdateDto categoryDto)
    {
        // KORREKTUR: Wir laden die ENTITY direkt aus der DB, nicht das DTO
        var categoryEntity = await _context.Categories.FindAsync(id);

        if (categoryEntity == null)
            throw new KeyNotFoundException($"Category with id {id} not found.");

        // Update der Entity-Werte durch AutoMapper
        _mapper.Map(categoryDto, categoryEntity);

        // Die ID darf nicht überschrieben werden (Sicherheit)
        categoryEntity.Id = id;

        // Jetzt werden die Änderungen an der Entity erkannt und gespeichert
        await _context.SaveChangesAsync();

        // Das aktualisierte Objekt als DTO zurückgeben
        return _mapper.Map<CategoryReadDto>(categoryEntity);
    }
}
