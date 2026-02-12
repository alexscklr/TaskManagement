import { type UserReadDto } from './user';
import type { WorkspaceReadDto } from './workspace';

interface WorkspaceMembershipBase {
    userId: number;
    workspaceId: number;
}
export interface WorkspaceMembershipInviteDto {
  email: string;
  workspaceId: number;
  role: WorkspaceRole;
}

export interface WorkspaceMembershipInvitationReadDto {
  id: number;
  role: WorkspaceRole;
  invitedAt: string;
  workspace: WorkspaceReadDto;
}

export interface WorkspaceMembershipReadDto extends WorkspaceMembershipBase {
  role: WorkspaceRole;
  joinedAt: string | null;
  user: UserReadDto;
}

export interface WorkspaceMembershipCreateDto extends WorkspaceMembershipBase {
  role: WorkspaceRole;
}

export interface WorkspaceMembershipUpdateDto {
  role: WorkspaceRole;
}

export const WorkspaceRole = {
    Owner: 'Owner',
    Admin: 'Admin',
    Member: 'Member'
} as const;

export type WorkspaceRole = typeof WorkspaceRole[keyof typeof WorkspaceRole];
