import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { TaskReadDto, TaskUpdateDto } from '../types/task';
import { createTask, fetchTasks, updateTask, deleteTask } from '../lib/tasks';

export function useTasksQuery(workspaceId: number) {
    return useQuery<TaskReadDto[]>({
        queryKey: ['tasks', workspaceId],
        queryFn: () => fetchTasks(workspaceId),
        enabled: !!workspaceId,
    });
}

export function useCreateTaskMutation(workspaceId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', workspaceId] });
        },
    });
}

export function useUpdateTaskMutation(workspaceId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ updatedTask, taskId }: { updatedTask: TaskUpdateDto; taskId: number }) =>
            updateTask(updatedTask, taskId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', workspaceId] });
        },
    });
}

export function useDeleteTaskMutation(workspaceId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (taskId: number) => deleteTask(taskId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', workspaceId] });
        },
    });
}