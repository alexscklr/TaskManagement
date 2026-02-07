using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using backend.Data;
using backend.Middleware;
using backend.Models;
using backend.Profiles;
using backend.Services;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=taskmanager.db")
);

var jwtKey = builder.Configuration["Jwt:Key"];

if (string.IsNullOrEmpty(jwtKey) || jwtKey.Length < 32)
{
    throw new Exception("JWT Key is missing or too short! Please set 'Jwt:Key' in User Secrets.");
}

var key = Encoding.UTF8.GetBytes(jwtKey);

builder
    .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],
            ValidateLifetime = true,
        };
    });

builder
    .Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;

        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddControllers();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IWorkspaceService, WorkspaceService>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>(); // Custom PasswordHasher registration
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAuthService, AuthService>();

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
