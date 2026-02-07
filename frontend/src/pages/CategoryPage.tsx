import { useEffect, useState } from "react";
import CategoryElement from "../shared/components/Categories/CategoryElement";
import CategoryEditDialog from "../shared/components/Categories/CategoryEditDialog";
import type { CategoryCreateDto, CategoryReadDto, CategoryUpdateDto } from "../shared/types/category";
import CategoryCreationDialog from "../shared/components/Categories/CategoryCreationDialog";
import { useCategories } from "@/shared/hooks/useCategories";

interface CategoryPageProps {
    workspaceId: number;
}

export default function CategoryPage(props: CategoryPageProps) {
    //const [categories, setCategories] = useState<CategoryReadDto[]>([]);
    const [editingCategory, setEditingCategory] = useState<CategoryReadDto | null>(null);
    const [messageLocal, setMessageLocal] = useState("");
    const [showCreateDialog, setShowCreateDialog] = useState(false);

    const { categories, loadCategories, createCategory, updateCategory, deleteCategory } = useCategories();

    useEffect(() => {
        loadCategories(props.workspaceId);
    }, [props.workspaceId, loadCategories]);


    const handleCreateCategory = async (category: CategoryCreateDto) => {
        try {
            await createCategory(category);
            setMessageLocal(`Category "${category.name}" has been created successfully!`);

        } catch (error) {
            console.error(error);
            setMessageLocal(error instanceof Error ? error.message : "Failed to create category.");
        }
    }

    const handleDeleteCategory = async (categoryId: number) => {
        try {
            await deleteCategory(categoryId);
            setEditingCategory(null);
            setMessageLocal(`Category has been deleted successfully!`);
        } catch (error) {
            console.error(error);
            setMessageLocal(error instanceof Error ? error.message : "Failed to delete category.");
        }
    }

    const handleUpdateCategory = async (updatedCategory: CategoryUpdateDto, categoryId: number) => {
        try {
            await updateCategory(updatedCategory, categoryId);
            setEditingCategory(null);
            setMessageLocal(`Category "${updatedCategory.name}" has been updated successfully!`);
        } catch (error) {
            console.error(error);
            setMessageLocal(error instanceof Error ? error.message : "Failed to update category.");
        }
    }


    return (
        <section title="Categories" className="w-full max-w-2xl mt-8 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-lg font-bold text-purple-600 mb-2">Categories</h2>
            <p className="text-gray-600 mb-4">{messageLocal || "Manage your task categories here."}</p>
            <hr className="my-6 border-gray-300" />
            {categories.length === 0 ? (
                <p className="text-center text-gray-500">No categories available.</p>
            ) : (
                <ul className="space-y-4 mb-8 border rounded-lg p-4 bg-gray-50">
                    {categories.map(category => (
                        <li key={category.id} className="border border-gray-300 rounded-md p-0">
                            <CategoryElement category={category} onClick={() => setEditingCategory(category)} />
                        </li>
                    ))}
                </ul>
            )}
            {editingCategory && (
                <CategoryEditDialog
                    isOpen={!!editingCategory}
                    category={editingCategory}
                    categoryId={editingCategory.id}
                    onClose={() => setEditingCategory(null)}
                    onSubmit={handleUpdateCategory}
                    onDelete={handleDeleteCategory}
                />
            )}
            <hr className="my-6 border-gray-300" />
            {showCreateDialog && (
                <CategoryCreationDialog
                    onSubmit={handleCreateCategory}
                />
            )}

            <button
                className="mt-4 w-full bg-purple-600 text-white font-semibold py-2 rounded-md shadow hover:bg-purple-700 transition"
                onClick={() => setShowCreateDialog(true)}
            >
                Create New Category
            </button>
        </section>
    );
}