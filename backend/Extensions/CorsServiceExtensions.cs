public static class CorsServiceExtensions
{
    public static IServiceCollection AddCustomCors(
        this IServiceCollection services,
        IConfiguration config
    )
    {
        var allowedOrigins = config.GetValue<string>("AllowedOrigins") ?? "http://localhost:5173";

        services.AddCors(options =>
        {
            options.AddPolicy(
                "AllowReact",
                builder =>
                {
                    builder
                        .WithOrigins(allowedOrigins)
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials(); // Wichtig, falls du später Cookies/SignalR nutzt
                }
            );
        });

        return services;
    }
}
