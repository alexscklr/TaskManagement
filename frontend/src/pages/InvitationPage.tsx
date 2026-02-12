import { useAcceptInvitationMutation, useInvitationsQuery } from "@/shared/hooks/useWorkspaceMemberships";
import type { WorkspaceMembershipInvitationReadDto } from "@/shared/types/workspacemembership";



export default function InvitationPage() {

    const { data: invitations } = useInvitationsQuery();
    const { mutate: acceptInvitation, isPending: isAccepting } = useAcceptInvitationMutation();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-purple-600 mb-4">Invitations</h1>
            <ul>
                {invitations?.map((invitation: WorkspaceMembershipInvitationReadDto) => (
                    <li key={`${invitation.workspace.id}`} className="mb-2 p-4 border rounded-lg bg-gray-50">
                        <p><strong>Workspace:</strong> {invitation.workspace.name}</p>
                        <button 
                            onClick={() => acceptInvitation(invitation.workspace.id)} 
                            disabled={isAccepting}
                            className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                            Accept
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}