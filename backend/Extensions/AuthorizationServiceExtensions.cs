using backend.Authorization.Workspaces;
using Microsoft.AspNetCore.Authorization;

// weitere Namespaces...

public static class AuthorizationServiceExtensions
{
    public static IServiceCollection AddApplicationAuthorization(this IServiceCollection services)
    {
        services.AddAuthorization(options =>
        {
            options.AddPolicy(
                "WorkspaceMember",
                policy => policy.Requirements.Add(new WorkspaceMemberRequirement())
            );
        });

        // Alle Handler zentral registrieren
        services.AddScoped<IAuthorizationHandler, WorkspaceMemberHandler>();

        return services;
    }
}
