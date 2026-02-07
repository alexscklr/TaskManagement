using AutoMapper;
using backend.Data;
using backend.Models;
using backend.Services;
using backend.Services.Interfaces;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace backend.Tests.Services;

public class UserServiceTests
{
    private readonly Mock<IMapper> _mockMapper;
    private readonly AppDbContext _context;
    private readonly UserService _service;
    private readonly Mock<IPasswordHasher> _mockPasswordHasher;

    public UserServiceTests()
    {
        // 1. Mapper Mock erstellen
        _mockMapper = new Mock<IMapper>();
        _mockPasswordHasher = new Mock<IPasswordHasher>();

        // 2. Context vorbereiten (In-Memory)
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        // Wir erstellen hier die echte Instanz
        _context = new AppDbContext(options);
        _context.Database.EnsureCreated();

        // 3. Service erstellen
        // Da _context kein Mock ist, übergeben wir ihn direkt ohne .Object
        _service = new UserService(_context, _mockMapper.Object, _mockPasswordHasher.Object);
    }

    [Fact]
    public async Task DeleteUserAsync_WhenUserExists_ShouldReturnTrue()
    {
        // Arrange
        var user = new User
        {
            Id = 1,
            Username = "Test User",
            Email = "test@example.com",
            PasswordHash = "hashedpassword",
        };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        // Act
        var result = await _service.DeleteUserAsync(1);

        // Assert
        result.Should().BeTrue();
        var deletedUser = await _context.Users.FindAsync(1);
        deletedUser.Should().BeNull();
    }

    [Fact]
    public async Task DeleteUserAsync_WhenUserDoesNotExist_ShouldReturnFalse()
    {
        //Act
        Func<Task> act = async () => await _service.DeleteUserAsync(999);

        //Assert
        await act.Should().ThrowAsync<KeyNotFoundException>();
    }
}
