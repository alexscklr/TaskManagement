import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CategoryReadDto, CategoryUpdateDto } from '../types/category';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../lib/categories';

export function useCategoriesQuery(workspaceId: number) {
    return useQuery<CategoryReadDto[]>({
        queryKey: ['categories', workspaceId],
        queryFn: () => fetchCategories(workspaceId),
        enabled: !!workspaceId,
    });
}

export function useCreateCategoryMutation(workspaceId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories', workspaceId] });
        },
    });
}

export function useUpdateCategoryMutation(workspaceId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ updatedCategory, categoryId }: { updatedCategory: CategoryUpdateDto; categoryId: number }) =>
            updateCategory(updatedCategory, categoryId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories', workspaceId] });
        },
    });
}

export function useDeleteCategoryMutation(workspaceId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (categoryId: number) => deleteCategory(categoryId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories', workspaceId] });
        },
    });
}