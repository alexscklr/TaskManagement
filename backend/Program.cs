using backend.Data;
using backend.Interfaces;
using backend.Middleware;
using backend.Profiles;
using backend.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=taskmanager.db")
);

// In Program.cs
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddControllers();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IWorkspaceService, WorkspaceService>();

var allowedOrigins = builder.Configuration.GetValue<string>("AllowedOrigins");
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowReact",
        builder =>
            builder
                .WithOrigins(allowedOrigins ?? "http://localhost:5173") // Vite Standard-Port
                .AllowAnyMethod()
                .AllowAnyHeader()
    );
});

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// app.UseHttpsRedirection();
//
app.UseCors("AllowReact");

app.UseAuthorization();

app.MapControllers();

app.Run();
