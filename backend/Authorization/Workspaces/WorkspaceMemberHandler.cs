using System.Security.Claims;
using backend.Data; // Dein Namespace für den AppDbContext
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace backend.Authorization.Workspaces;

public class WorkspaceMemberRequirement : IAuthorizationRequirement { }

public class WorkspaceMemberHandler : AuthorizationHandler<WorkspaceMemberRequirement>
{
    private readonly AppDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public WorkspaceMemberHandler(AppDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
    }

    protected override async Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        WorkspaceMemberRequirement requirement
    )
    {
        // 1. User-ID aus dem JWT extrahieren
        var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            return;

        if (!int.TryParse(userIdClaim.Value, out var userId))
            return;

        // 2. Workspace-ID aus der URL extrahieren (z.B. /api/workspaces/{id})
        var routeData = _httpContextAccessor.HttpContext?.GetRouteData();
        if (routeData == null || !routeData.Values.TryGetValue("id", out var idValue))
        {
            return;
        }

        if (!int.TryParse(idValue?.ToString(), out var workspaceId))
            return;

        // 3. Datenbank-Check: Existiert ein Eintrag in der Membership-Tabelle?
        var isMember = await _context.WorkspaceMemberships.AnyAsync(m =>
            m.WorkspaceId == workspaceId && m.UserId == userId
        );

        if (isMember)
        {
            context.Succeed(requirement);
        }
    }
}
