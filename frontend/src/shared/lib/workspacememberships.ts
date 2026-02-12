import type { WorkspaceMembershipInvitationReadDto, WorkspaceMembershipInviteDto, WorkspaceMembershipReadDto, WorkspaceMembershipUpdateDto } from "../types/workspacemembership";
import api from "../../api/axiosInstance";

export const getUsersInWorkspace = async (workspaceId: number) => {
  const res = await api.get<WorkspaceMembershipReadDto[]>(`/WorkspaceMemberships/users?workspaceId=${workspaceId}`);
  return res.data;
};

export const inviteUserToWorkspace = async (data: WorkspaceMembershipInviteDto) => {
  const res = await api.post<WorkspaceMembershipReadDto>(`/WorkspaceMemberships/invite`, data);
  return res.data;
};

export const updateUserRole = async (userId: number, workspaceId: number, data: WorkspaceMembershipUpdateDto) => {
  const res = await api.put<WorkspaceMembershipReadDto>(`/WorkspaceMemberships/role?userId=${userId}&workspaceId=${workspaceId}`, data);
  return res.data;
};

export const removeUserFromWorkspace = async (userId: number, workspaceId: number) => {
  await api.delete(`/WorkspaceMemberships/remove?userId=${userId}&workspaceId=${workspaceId}`);
};

export const getInvitationsForUser = async () => {
  const res = await api.get<WorkspaceMembershipInvitationReadDto[]>(`/WorkspaceMemberships/invitations`);
  return res.data;
};

export const acceptInvitation = async (workspaceId: number) => {
  await api.post(`/WorkspaceMemberships/accept?workspaceId=${workspaceId}`);
};
