using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class UserService : IUserService
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;
    private readonly IPasswordHasher _passwordHasher;

    public UserService(AppDbContext context, IMapper mapper, IPasswordHasher passwordHasher)
    {
        _context = context;
        _mapper = mapper;
        _passwordHasher = passwordHasher;
    }

    public async Task<IEnumerable<UserReadDto>> GetAllUsersAsync()
    {
        var users = await _context.Users.ToListAsync();

        return _mapper.Map<IEnumerable<UserReadDto>>(users);
    }

    public async Task<UserReadDto> CreateUserAsync(UserCreateDto userDto)
    {
        var hashedPassword = _passwordHasher.HashPassword(userDto.Password);

        var userEntity = new User
        {
            Username = userDto.Username,
            Email = userDto.Email,
            PasswordHash = hashedPassword,
        };
        _context.Users.Add(userEntity);
        await _context.SaveChangesAsync();
        return _mapper.Map<UserReadDto>(userEntity);
    }

    public async Task<bool> DeleteUserAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
            throw new KeyNotFoundException($"User with id {id} not found.");

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<UserReadDto?> GetUserByIdAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
            throw new KeyNotFoundException($"User with id {id} not found.");
        return _mapper.Map<UserReadDto>(user);
    }

    public async Task<UserReadDto> UpdateUserAsync(int id, UserUpdateDto userDto)
    {
        // KORREKTUR: Wir laden die ENTITY direkt aus der DB, nicht das DTO
        var userEntity = await _context.Users.FindAsync(id);

        if (userEntity == null)
            throw new KeyNotFoundException($"User with id {id} not found.");

        // Update der Entity-Werte durch AutoMapper
        _mapper.Map(userDto, userEntity);

        // Die ID darf nicht überschrieben werden (Sicherheit)
        userEntity.Id = id;

        // Jetzt werden die Änderungen an der Entity erkannt und gespeichert
        await _context.SaveChangesAsync();

        // Das aktualisierte Objekt als DTO zurückgeben
        return _mapper.Map<UserReadDto>(userEntity);
    }
}
