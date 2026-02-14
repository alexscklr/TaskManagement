using System.Security.Claims;

public static class ClaimsPrincipalExtensions
{
    public static int GetUserId(this ClaimsPrincipal user)
    {
        var claim = user.FindFirst(ClaimTypes.NameIdentifier) ?? user.FindFirst("sub");

        if (claim == null)
            throw new Exception("User ID claim not found");

        return int.Parse(claim.Value);
    }
}
