import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
	getUsersInWorkspace,
	inviteUserToWorkspace,
	updateUserRole,
	removeUserFromWorkspace,
	getInvitationsForUser,
	acceptInvitation,
} from '../lib/workspacememberships';
import type {
	WorkspaceMembershipUpdateDto,
	WorkspaceMembershipReadDto,
	WorkspaceMembershipInviteDto,
	WorkspaceMembershipInvitationReadDto,
} from '../types/workspacemembership';

export function useUsersInWorkspaceQuery(workspaceId: number) {
	return useQuery<WorkspaceMembershipReadDto[]>({
		queryKey: ['workspaceUsers', workspaceId],
		queryFn: () => getUsersInWorkspace(workspaceId),
		enabled: !!workspaceId,
	});
}

export function useInviteUserMutation(workspaceId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: WorkspaceMembershipInviteDto) => inviteUserToWorkspace(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['workspaceUsers', workspaceId] });
		},
	});
}

export function useUpdateUserRoleMutation(workspaceId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ userId, data }: { userId: number; data: WorkspaceMembershipUpdateDto }) =>
			updateUserRole(userId, workspaceId, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['workspaceUsers', workspaceId] });
		},
	});
}

export function useRemoveUserMutation(workspaceId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (userId: number) => removeUserFromWorkspace(userId, workspaceId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['workspaceUsers', workspaceId] });
		},
	});
}

export function useInvitationsQuery() {
	return useQuery<WorkspaceMembershipInvitationReadDto[]>({
		queryKey: ['workspaceInvitations'],
		queryFn: getInvitationsForUser,
	});
}

export function useAcceptInvitationMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (workspaceId: number) => acceptInvitation(workspaceId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['workspaceInvitations'] });
		},
	});
}
