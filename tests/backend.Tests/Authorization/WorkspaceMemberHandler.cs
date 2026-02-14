using System.Security.Claims;
using backend.Authorization.Workspaces;
using backend.Data;
using backend.Models;
using FluentAssertions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Moq;

public class WorkspaceMemberHandlerTests
{
    private readonly DbContextOptions<AppDbContext> _dbOptions;

    public WorkspaceMemberHandlerTests()
    {
        // In-Memory DB für isolierte Tests
        _dbOptions = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
    }

    [Fact]
    public async Task HandleRequirementAsync_UserIsMember_ShouldSucceed()
    {
        // ARRANGE
        using var context = new AppDbContext(_dbOptions);
        var userId = 1;
        var workspaceId = 10;

        // Testdaten anlegen
        context.WorkspaceMemberships.Add(
            new WorkspaceMembership { UserId = userId, WorkspaceId = workspaceId }
        );
        await context.SaveChangesAsync();

        // Claims simulieren
        var claims = new[] { new Claim(ClaimTypes.NameIdentifier, userId.ToString()) };
        var user = new ClaimsPrincipal(new ClaimsIdentity(claims));

        // HttpContext simulieren (Routing-Daten für "id")
        var httpContextMock = new Mock<HttpContext>();
        var routeData = new Microsoft.AspNetCore.Routing.RouteData();
        routeData.Values.Add("id", workspaceId.ToString());

        httpContextMock
            .Setup(x => x.Features.Get<IRoutingFeature>())
            .Returns(new RoutingFeature { RouteData = routeData });
        // Alternativ für neuere .NET Versionen:
        // httpContextMock.Setup(x => x.Items).Returns(new Dictionary<object, object?>());

        var accessorMock = new Mock<IHttpContextAccessor>();
        accessorMock.Setup(x => x.HttpContext).Returns(httpContextMock.Object);

        var handler = new WorkspaceMemberHandler(context, accessorMock.Object);
        var requirement = new WorkspaceMemberRequirement();
        var authContext = new AuthorizationHandlerContext(new[] { requirement }, user, null);

        // ACT
        await handler.HandleAsync(authContext);

        // ASSERT
        authContext.HasSucceeded.Should().BeTrue();
    }

    [Fact]
    public async Task HandleRequirementAsync_UserIsNotMember_ShouldNotSucceed()
    {
        // ARRANGE
        using var context = new AppDbContext(_dbOptions);
        // DB ist leer -> User ist kein Mitglied

        var user = new ClaimsPrincipal(
            new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, "1") })
        );

        var accessorMock = new Mock<IHttpContextAccessor>();
        // Mock für HttpContext mit falscher ID oder leer

        var handler = new WorkspaceMemberHandler(context, accessorMock.Object);
        var requirement = new WorkspaceMemberRequirement();
        var authContext = new AuthorizationHandlerContext(new[] { requirement }, user, null);

        // ACT
        await handler.HandleAsync(authContext);

        // ASSERT
        authContext.HasSucceeded.Should().BeFalse();
    }
}
