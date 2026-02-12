using backend.Services;
using backend.Services.Interfaces;

public static class ServiceExtensions
{
    public static void AddCustomServices(this IServiceCollection services)
    {
        services.AddScoped<ITaskService, TaskService>();
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<IWorkspaceService, WorkspaceService>();
        services.AddScoped<IPasswordHasher, PasswordHasher>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IWorkspaceMembershipService, WorkspaceMembershipService>();
    }
}
