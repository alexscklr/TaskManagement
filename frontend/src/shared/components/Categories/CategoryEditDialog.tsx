import { useState, useEffect } from "react";
import type { CategoryUpdateDto } from "../../types/category";

interface CategoryEditDialogProps {
    isOpen: boolean;
    category: CategoryUpdateDto;
    categoryId: number;
    onSubmit: (category: CategoryUpdateDto, categoryId: number) => void;
    onClose: () => void;
    onDelete: (categoryId: number) => void;
}

export default function CategoryEditDialog({ isOpen, category, categoryId, onClose, onSubmit, onDelete }: CategoryEditDialogProps) {
    const [editedCategory, setEditedCategory] = useState<CategoryUpdateDto>(category);

    useEffect(() => {
        setEditedCategory(category);
    }, [category]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(editedCategory, categoryId);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
                <div className="bg-purple-600 px-6 py-4">
                    <h3 className="text-xl font-bold text-white">Edit Category</h3>
                </div>

                <form className="p-6 space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="cat-title" className="font-medium text-gray-700">Title</label>
                        <input
                            id="cat-title"
                            type="text"
                            value={editedCategory.name}
                            onChange={(e) => setEditedCategory({ ...editedCategory, name: e.target.value })}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label htmlFor="cat-color" className="font-medium text-gray-700">Color</label>
                        <div className="flex items-center gap-2">
                            <input
                                id="cat-color"
                                type="color"
                                value={editedCategory.color}
                                onChange={(e) => setEditedCategory({ ...editedCategory, color: e.target.value })}
                                className="w-16 h-10 border border-gray-300 rounded-md cursor-pointer"
                                required
                            />
                            <span className="text-gray-500 text-sm">{editedCategory.color}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 shadow transition"
                        >
                            Save Changes
                        </button>
                        <button 
                            type="button" 
                            onClick={() => onDelete(categoryId)} 
                            className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 shadow transition"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}