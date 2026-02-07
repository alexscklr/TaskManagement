using backend.DTOs;
using backend.Models;

namespace backend.Services.Interfaces;

public interface IUserService
{
    Task<IEnumerable<UserReadDto>> GetAllUsersAsync();
    Task<UserReadDto?> GetUserByIdAsync(int id);
    Task<UserReadDto> CreateUserAsync(UserCreateDto userDto);
    Task<bool> DeleteUserAsync(int id);
    Task<UserReadDto> UpdateUserAsync(int id, UserUpdateDto userDto);
}
