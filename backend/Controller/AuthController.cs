using backend.DTOs;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IUserService _userService;

    public AuthController(IAuthService authService, IUserService userService)
    {
        _authService = authService;
        _userService = userService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDto loginDto)
    {
        var authResponse = await _authService.LoginAsync(loginDto);

        if (authResponse == null)
            return Unauthorized("Invalid email or password.");

        return Ok(authResponse);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserCreateDto registerDto)
    {
        // Hier nutzt du deinen bestehenden UserService!
        var user = await _userService.CreateUserAsync(registerDto);
        return Ok(user);
    }
}
