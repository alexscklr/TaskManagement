using backend.DTOs;

public class AuthResponseDto
{
    public required string Token { get; set; }
    public required UserReadDto User { get; set; }
}
