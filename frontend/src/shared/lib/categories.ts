import api from "@/api/axiosInstance";
import type { CategoryCreateDto, CategoryReadDto, CategoryUpdateDto } from "../types/category";

export async function fetchCategories(workspaceId: number) {
    const response = await api.get<CategoryReadDto[]>(`/categories?workspaceId=${workspaceId}`);
    return response.data;
}

export async function createCategory(category: CategoryCreateDto) {
    const response = await api.post<CategoryReadDto>('/categories', category);
    return response.data;
}

export async function updateCategory(category: CategoryUpdateDto, categoryId: number) {
    const response = await api.put<CategoryReadDto>(`/categories/${categoryId}`, category);
    return response.data;
}

export async function deleteCategory(categoryId: number) {
    const response = await api.delete(`/categories/${categoryId}`);
    return response.data;
}