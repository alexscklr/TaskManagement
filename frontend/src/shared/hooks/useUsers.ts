import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UserReadDto, UserUpdateDto } from '../types/user';
import { createUser, fetchUsers, updateUser, deleteUser } from '../lib/users';

export function useUsersQuery() {
    return useQuery<UserReadDto[]>({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });
}

export function useCreateUserMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}

export function useUpdateUserMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ updatedUser, userId }: { updatedUser: UserUpdateDto; userId: number }) =>
            updateUser(updatedUser, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}

export function useDeleteUserMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId: number) => deleteUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}