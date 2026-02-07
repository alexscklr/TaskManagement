using backend.Services.Interfaces;

public class PasswordHasher : IPasswordHasher
{
    public string HashPassword(string password)
    {
        // Implement a secure hashing algorithm, e.g., using BCrypt
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    public bool VerifyPassword(string password, string hash)
    {
        // Verify the provided password against the hashed password
        return BCrypt.Net.BCrypt.Verify(password, hash);
    }
}
