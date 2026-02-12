import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { WorkspaceReadDto, WorkspaceUpdateDto } from '../types/workspace';
import { createWorkspace, fetchWorkspaces, updateWorkspace, deleteWorkspace } from '../lib/workspaces';

export function useWorkspacesQuery() {
    return useQuery<WorkspaceReadDto[]>({
        queryKey: ['workspaces'],
        queryFn: fetchWorkspaces,
    });
}

export function useCreateWorkspaceMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createWorkspace,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workspaces'] });
        },
    });
}

export function useUpdateWorkspaceMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ updatedWorkspace, workspaceId }: { updatedWorkspace: WorkspaceUpdateDto; workspaceId: number }) =>
            updateWorkspace(updatedWorkspace, workspaceId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workspaces'] });
        },
    });
}

export function useDeleteWorkspaceMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (workspaceId: number) => deleteWorkspace(workspaceId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workspaces'] });
        },
    });
}