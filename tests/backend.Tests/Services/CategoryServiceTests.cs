using AutoMapper;
using backend.Data;
using backend.Models;
using backend.Services;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace backend.Tests.Services;

public class CategoryServiceTests
{
    private readonly Mock<IMapper> _mockMapper;
    private readonly AppDbContext _context;
    private readonly CategoryService _service;

    public CategoryServiceTests()
    {
        // 1. Mapper Mock erstellen
        _mockMapper = new Mock<IMapper>();

        // 2. Context vorbereiten (In-Memory)
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        // Wir erstellen hier die echte Instanz
        _context = new AppDbContext(options);
        _context.Database.EnsureCreated();

        // 3. Service erstellen
        // Da _context kein Mock ist, übergeben wir ihn direkt ohne .Object
        _service = new CategoryService(_context, _mockMapper.Object);
    }

    [Fact]
    public async Task DeleteCategoryAsync_WhenCategoryExists_ShouldReturnTrue()
    {
        // Arrange
        var category = new Category { Id = 1, Name = "Test Category" };
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        // Act
        var result = await _service.DeleteCategoryAsync(1);

        // Assert
        result.Should().BeTrue();
        var deletedCategory = await _context.Categories.FindAsync(1);
        deletedCategory.Should().BeNull();
    }

    [Fact]
    public async Task DeleteCategoryAsync_WhenCategoryDoesNotExist_ShouldReturnFalse()
    {
        //Act
        Func<Task> act = async () => await _service.DeleteCategoryAsync(999);

        //Assert
        await act.Should().ThrowAsync<KeyNotFoundException>();
    }
}
