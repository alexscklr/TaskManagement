import type { WorkspaceCreateDto } from "../types/workspace";
import type { WorkspaceMembershipInviteDto } from "../types/workspacemembership";


export const defaultWorkspaceCreate: WorkspaceCreateDto = {
    name: '',
}

export const defaultWorkspaceInvite: WorkspaceMembershipInviteDto = {
    email: '',
    workspaceId: 0,
    role: 'Member'
}