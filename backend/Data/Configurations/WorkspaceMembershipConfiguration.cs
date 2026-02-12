using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class WorkspaceMembershipConfiguration : IEntityTypeConfiguration<WorkspaceMembership>
{
    public void Configure(EntityTypeBuilder<WorkspaceMembership> builder)
    {
        // Der Composite Index für Eindeutigkeit:
        builder.HasIndex(m => new { m.UserId, m.WorkspaceId }).IsUnique();

        // Optional: Beziehungen definieren (ähnlich wie bei deiner Category)
        builder
            .HasOne(m => m.User)
            .WithMany(u => u.WorkspaceMemberships)
            .HasForeignKey(m => m.UserId);

        builder
            .HasOne(m => m.Workspace)
            .WithMany(w => w.WorkspaceMemberships)
            .HasForeignKey(m => m.WorkspaceId);
    }
}
