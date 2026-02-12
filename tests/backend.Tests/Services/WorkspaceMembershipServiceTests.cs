using AutoMapper;
using backend.Data;
using backend.Models;
using backend.Services;
using backend.Services.Interfaces;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;

public class WorkspaceMembershipServiceTests
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _context;
    private readonly IWorkspaceMembershipService _service;

    public WorkspaceMembershipServiceTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        _context = new AppDbContext(options);

        // Echten Mapper konfigurieren
        var config = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<backend.Profiles.MappingProfile>();
        });
        _mapper = config.CreateMapper();

        _service = new WorkspaceMembershipService(_context, _mapper);
    }

    [Fact]
    public async Task InviteUserToWorkspaceAsync_ShouldAddMembership_WhenUserExists()
    {
        // 1. Arrange: User in die Test-DB schreiben
        var existingUser = new User
        {
            Email = "test@example.com",
            Username = "testuser",
            PasswordHash = "any",
        };
        _context.Users.Add(existingUser);

        var existingWorkspace = new Workspace { Name = "Test Workspace" };
        _context.Workspaces.Add(existingWorkspace);

        await _context.SaveChangesAsync();

        var membershipDto = new WorkspaceMembershipInviteDto
        {
            Email = "test@example.com",
            WorkspaceId = existingWorkspace.Id,
            Role = WorkspaceRole.Member,
        };

        // 2. Act
        var result = await _service.InviteUserToWorkspaceAsync(membershipDto);

        // 3. Assert

        var membershipInDb = await _context.WorkspaceMemberships.FirstOrDefaultAsync(m =>
            m.UserId == existingUser.Id && m.WorkspaceId == existingWorkspace.Id
        );

        membershipInDb.Should().NotBeNull();
        membershipInDb!.Role.Should().Be(membershipDto.Role);
    }

    [Fact]
    public async Task GetPendingInvitationsForUserAsync_ShouldReturnInvitations_WhenInvitationsExist()
    {
        // 1. Arrange
        var user = new User
        {
            Email = "test@example.com",
            Username = "test",
            PasswordHash = "any",
        };
        _context.Users.Add(user);

        var workspace = new Workspace { Name = "Test Workspace" };
        _context.Workspaces.Add(workspace);

        await _context.SaveChangesAsync(); // IDs werden hier generiert

        var membership = new WorkspaceMembership
        {
            UserId = user.Id,
            WorkspaceId = workspace.Id,
            Role = WorkspaceRole.Member,
            JoinedAt = null, // Stelle sicher, dass das Model "DateTime?" ist!
        };
        _context.WorkspaceMemberships.Add(membership);
        await _context.SaveChangesAsync();

        // WICHTIG: Cache leeren, damit der Service neu lädt
        _context.ChangeTracker.Clear();

        // 2. Act
        var result = await _service.GetPendingInvitationsForUserAsync(user.Id);

        // 3. Assert
        result.Should().NotBeNull().And.HaveCount(1);
    }
}
