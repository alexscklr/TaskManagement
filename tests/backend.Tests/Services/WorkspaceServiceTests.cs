using AutoMapper;
using backend.Data;
using backend.Models;
using backend.Services;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace backend.Tests.Services;

public class WorkspaceServiceTests
{
    private readonly Mock<IMapper> _mockMapper;
    private readonly AppDbContext _context;
    private readonly WorkspaceService _service;

    public WorkspaceServiceTests()
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
        _service = new WorkspaceService(_context, _mockMapper.Object);
    }

    [Fact]
    public async Task DeleteWorkspaceAsync_WhenWorkspaceExists_ShouldReturnTrue()
    {
        // Arrange
        var workspace = new Workspace { Id = 1, Name = "Test Workspace" };
        _context.Workspaces.Add(workspace);
        await _context.SaveChangesAsync();

        // Act
        var result = await _service.DeleteWorkspaceAsync(1);

        // Assert
        result.Should().BeTrue();
        var deletedWorkspace = await _context.Workspaces.FindAsync(1);
        deletedWorkspace.Should().BeNull();
    }

    [Fact]
    public async Task DeleteWorkspaceAsync_WhenWorkspaceDoesNotExist_ShouldReturnFalse()
    {
        //Act
        Func<Task> act = async () => await _service.DeleteWorkspaceAsync(999);

        //Assert
        await act.Should().ThrowAsync<KeyNotFoundException>();
    }
}
