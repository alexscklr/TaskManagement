using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.DTOs;

public class WorkspaceMembershipUpdateDto
{
    public WorkspaceRole Role { get; set; }
}
