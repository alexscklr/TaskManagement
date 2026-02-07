import { useCallback, useState } from "react";
import type { CategoryCreateDto, CategoryReadDto, CategoryUpdateDto } from "../types/category";
import { fetchCategories, createCategory as createCategoryApi, updateCategory as updateCategoryApi, deleteCategory as deleteCategoryApi } from "../lib/categories";



export function useCategories() {
    const [categories, setCategories] = useState<CategoryReadDto[]>([]);

    const loadCategories = useCallback(async (workspaceId: number) => {
        const fetchedCategories = await fetchCategories(workspaceId);
        setCategories(fetchedCategories);
    }, []);

    const createCategory = useCallback(async (category: CategoryCreateDto) => {
        const createdCategory: CategoryReadDto = await createCategoryApi(category);
        setCategories(prevCategories => [...prevCategories, createdCategory]);
    }, []);

    const updateCategory = useCallback(async (updatedCategory: CategoryUpdateDto, categoryId: number) => {
        const updatedCat: CategoryReadDto = await updateCategoryApi(updatedCategory, categoryId);
        setCategories(prevCategories => prevCategories.map(category => category.id === categoryId ? updatedCat : category));
    }, []);

    const deleteCategory = useCallback(async (categoryId: number) => {
        await deleteCategoryApi(categoryId);
        setCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
    }, []);
    
    return {categories, loadCategories, createCategory, updateCategory, deleteCategory};
}