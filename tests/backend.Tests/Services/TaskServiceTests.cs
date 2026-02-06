using AutoMapper;
using backend.Data;
using backend.Models;
using backend.Services;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace backend.Tests.Services;

public class TaskServiceTests
{
    private readonly Mock<IMapper> _mockMapper;
    private readonly AppDbContext _context;
    private readonly TaskService _service;

    public TaskServiceTests()
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
        _service = new TaskService(_context, _mockMapper.Object);
    }

    [Fact]
    public async Task DeleteTaskAsync_WhenTaskExists_ShouldReturnTrue()
    {
        // Arrange
        var task = new TodoTask { Id = 1, Title = "Test Task" };
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        // Act
        var result = await _service.DeleteTaskAsync(1);

        // Assert
        result.Should().BeTrue();
        var deletedTask = await _context.Tasks.FindAsync(1);
        deletedTask.Should().BeNull();
    }

    [Fact]
    public async Task DeleteTaskAsync_WhenTaskDoesNotExist_ShouldReturnFalse()
    {
        //Act
        Func<Task> act = async () => await _service.DeleteTaskAsync(999);

        //Assert
        await act.Should().ThrowAsync<KeyNotFoundException>();
    }
}
