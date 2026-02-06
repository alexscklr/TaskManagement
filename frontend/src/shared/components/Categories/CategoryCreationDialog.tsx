import { useState } from "react";
import { defaultCategoryCreate } from "../../constants/categories";
import type { CategoryCreateDto } from "../../types/category";

interface CategoryCreationDialogProps {
    onSubmit: (category: CategoryCreateDto) => void;
}

export default function CategoryCreationDialog(categoryProps: CategoryCreationDialogProps) {
    const [newCategory, setNewCategory] = useState<CategoryCreateDto>(defaultCategoryCreate);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        categoryProps.onSubmit(newCategory);
        setNewCategory(defaultCategoryCreate);
    }

    return (
        <form
            className="space-y-4"
            onSubmit={e => handleSubmit(e)}
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="title" className="font-medium text-gray-700">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={newCategory.name}
                    onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="color" className="font-medium text-gray-700">Color:</label>
                <input
                    type="color"
                    id="color"
                    name="color"
                    value={newCategory.color}
                    onChange={e => setNewCategory({ ...newCategory, color: e.target.value })}
                    className="w-16 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md shadow hover:bg-purple-700 transition"
            >
                Save Category
            </button>
        </form>
    );
}