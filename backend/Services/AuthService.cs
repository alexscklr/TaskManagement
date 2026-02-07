using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IConfiguration _config; // Für JWT-Geheimnisse
    private readonly IMapper _mapper;

    public AuthService(
        AppDbContext context,
        IPasswordHasher passwordHasher,
        IConfiguration config,
        IMapper mapper
    )
    {
        _context = context;
        _passwordHasher = passwordHasher;
        _config = config;
        _mapper = mapper;
    }

    private string GenerateJwtToken(User user)
    {
        // Hol den Key aus der Configuration
        var key = _config["Jwt:Key"];
        if (string.IsNullOrEmpty(key))
            throw new Exception("JWT Key not configured.");

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
            new Claim("jti", Guid.NewGuid().ToString()), // Eindeutige ID für den Token
        };

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7), // Nutze UtcNow für Konsistenz
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task<AuthResponseDto?> LoginAsync(UserLoginDto loginDto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

        if (user == null || !_passwordHasher.VerifyPassword(loginDto.Password, user.PasswordHash))
            return null;

        var token = GenerateJwtToken(user);

        // Wir geben beides zurück: Den Schlüssel (Token) und wer den Schlüssel hält (User)
        return new AuthResponseDto { Token = token, User = _mapper.Map<UserReadDto>(user) };
    }
}
