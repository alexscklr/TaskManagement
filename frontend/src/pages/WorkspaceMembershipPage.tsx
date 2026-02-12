import { defaultWorkspaceInvite } from "@/shared/constants/workspaces";
import { useInviteUserMutation, useUsersInWorkspaceQuery } from "@/shared/hooks/useWorkspaceMemberships";
import type { WorkspaceMembershipInviteDto } from "@/shared/types/workspacemembership";
import { useState } from "react";


interface WorkspaceMembershipPageProps {
    workspaceId: number;
}

export default function WorkspaceMembershipPage(props: WorkspaceMembershipPageProps) {

    const { data: memberships, isLoading, isError, error } = useUsersInWorkspaceQuery(props.workspaceId);
    const { mutate: inviteUser, isPending: isInviting, isError: isInviteError, error: inviteError } = useInviteUserMutation(props.workspaceId);

    const [messageLocal, setMessageLocal] = useState("");
    const [newMembership, setNewMembership] = useState<WorkspaceMembershipInviteDto>({ ...defaultWorkspaceInvite, workspaceId: props.workspaceId });

    const handleInviteUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newMembership) {
            setMessageLocal("Please fill in the invitation details.");
            return;
        }
        inviteUser(newMembership, {
            onSuccess: () => {
                setMessageLocal(`Invitation sent to "${newMembership.email}" successfully!`);
            }
        });
    }

    return (
        <section title="WorkspaceMembers" className="w-full max-w-2xl mt-8 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-lg font-bold text-purple-600 mb-2">Workspace Members</h2>
            <p className="text-gray-600 mb-4">{messageLocal || "Manage your workspace members here."}</p>
            <hr className="my-6 border-gray-300" />
            {isLoading || isInviting ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : isError && error ? (
                <p className="text-center text-red-500">{`Error loading workspace members: ${error.message}`}</p>
            ) : isInviteError && inviteError ? (
                <p className="text-center text-red-500">{`Error inviting user: ${inviteError.message}`}</p>
            ) : memberships?.length === 0 ? (
                <p className="text-center text-gray-500">No workspace members available.</p>
            ) : (
                <ul className="space-y-4 mb-8 border rounded-lg p-4 bg-gray-50">
                    {memberships?.map(membership => (
                        <li key={membership.user.id} className="border border-gray-300 rounded-md p-0">
                            {membership.user.username}
                            {membership.role}
                            {membership.joinedAt}
                        </li>
                    ))}
                </ul>
            )}
            <hr className="my-6 border-gray-300" />
            <form onSubmit={handleInviteUser}>
                <input
                    type="email"
                    placeholder="User's email"
                    className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    onChange={(e) => setNewMembership(prev => ({ ...prev, email: e.target.value, workspaceId: props.workspaceId, role: "Member" } as WorkspaceMembershipInviteDto))}
                    required
                />
                <select
                    className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    onChange={(e) => setNewMembership(prev => ({ ...prev, role: e.target.value as WorkspaceMembershipInviteDto['role'], workspaceId: props.workspaceId, email: prev.email } as WorkspaceMembershipInviteDto))}
                >
                    <option value="Member">Member</option>
                    <option value="Admin">Admin</option>
                    <option value="Owner">Owner</option>
                </select>
                <button
                    type="submit"
                    className="mt-4 w-full bg-purple-600 text-white font-semibold py-2 rounded-md shadow hover:bg-purple-700 transition"
                >
                    Invite a new member
                </button>
            </form>

        </section>
    );
}