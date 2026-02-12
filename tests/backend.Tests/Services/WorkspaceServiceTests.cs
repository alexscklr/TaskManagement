using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Models;
using backend.Services;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace backend.Tests.Services;

public class WorkspaceServiceTests
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _context;
    private readonly WorkspaceService _service;

    public WorkspaceServiceTests()
    {
        // 1. Echten Mapper konfigurieren
        var config = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<backend.Profiles.MappingProfile>();
        });
        _mapper = config.CreateMapper();

        // 2. Context vorbereiten (In-Memory)
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        // Wir erstellen hier die echte Instanz
        _context = new AppDbContext(options);
        _context.Database.EnsureCreated();

        // 3. Service erstellen
        _service = new WorkspaceService(_context, _mapper);
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

    [Fact]
    public async Task CreateWorkspaceAsync_ShouldCreateWorkspaceAndMembership()
    {
        // Arrange
        var workspaceDto = new WorkspaceCreateDto { Name = "New Workspace" };

        var creatorUser = new UserCreateDto
        {
            Email = "creator@example.com",
            Password = "password",
            Username = "creator",
        };
        var creatorUserEntity = new User
        {
            Id = 1,
            Email = creatorUser.Email,
            Username = creatorUser.Username,
            PasswordHash = "hashedpassword",
        };

        // Act
        var result = await _service.CreateWorkspaceAsync(workspaceDto, creatorUserEntity.Id);

        // Assert
        var createdWorkspace = await _context.Workspaces.FindAsync(result.Id);
        createdWorkspace.Should().NotBeNull();
        createdWorkspace!.Name.Should().Be(workspaceDto.Name);

        var membershipInDb = await _context.WorkspaceMemberships.FirstOrDefaultAsync(m =>
            m.UserId == 1 && m.WorkspaceId == createdWorkspace.Id
        );

        membershipInDb.Should().NotBeNull();
        membershipInDb!.Role.Should().Be(WorkspaceRole.Owner);
    }
}
