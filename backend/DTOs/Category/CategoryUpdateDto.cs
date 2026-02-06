using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;

public class CategoryUpdateDto
{
    public int Id { get; set; }

    [Required]
    [StringLength(50)]
    public string Name { get; set; } = string.Empty;

    [RegularExpression(
        "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$",
        ErrorMessage = "Ungültiges Hex-Format."
    )]
    public string Color { get; set; } = "#000000";
}
