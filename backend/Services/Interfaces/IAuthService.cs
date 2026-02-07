using backend.DTOs;
using backend.Models;

namespace backend.Services.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto?> LoginAsync(UserLoginDto loginDto);
}
