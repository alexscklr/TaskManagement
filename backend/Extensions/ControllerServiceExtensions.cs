using System.Text.Json;
using System.Text.Json.Serialization;

public static class ControllerServiceExtensions
{
    public static IServiceCollection AddCustomControllers(this IServiceCollection services)
    {
        services
            .AddControllers()
            .AddJsonOptions(options =>
            {
                // camelCase erzwingen (z.B. "workspaceId" statt "WorkspaceId")
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;

                // Enums als Text (z.B. "Owner") statt Zahlen (0) übertragen
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());

                // Optional: Ignoriert Zyklen (hilfreich bei n:m Beziehungen)
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });

        return services;
    }
}
