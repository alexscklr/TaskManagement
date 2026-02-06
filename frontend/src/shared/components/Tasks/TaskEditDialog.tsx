import { useState, useEffect } from "react";
import { TaskPriority, type TaskPriority as TaskPriorityType, type TaskUpdateDto } from "../../types/task";
import { fetchCategories } from "../../lib/categories";
import type { CategoryReadDto } from "../../types/category";

interface TaskEditDialogProps {
    isOpen: boolean;
    task: TaskUpdateDto;
    taskId: number;
    workspaceId: number;
    onClose: () => void;
    onSubmit: (task: TaskUpdateDto, taskId: number) => void;
    onDelete: (taskId: number) => void;
}

export default function TaskEditDialog({ isOpen, task, taskId, workspaceId, onClose, onSubmit, onDelete }: TaskEditDialogProps) {
    const [editedTask, setEditedTask] = useState<TaskUpdateDto>(task);
    const [categories, setCategories] = useState<CategoryReadDto[]>([]);

    useEffect(() => {
        fetchCategories(workspaceId).then(setCategories);
    }, [workspaceId]);

    if (!isOpen || !editedTask) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
                <div className="bg-purple-600 px-6 py-4">
                    <h3 className="text-xl font-bold text-white">Edit Task</h3>
                </div>
                
                <form 
                    className="p-6 space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(editedTask, taskId);
                    }}
                >
                    <div className="flex flex-col gap-1">
                        <label htmlFor="edit-title" className="font-medium text-gray-700">Title</label>
                        <input
                            id="edit-title"
                            type="text"
                            value={editedTask.title}
                            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label htmlFor="edit-desc" className="font-medium text-gray-700">Description</label>
                        <textarea
                            id="edit-desc"
                            value={editedTask.description}
                            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                            rows={4}
                            required
                        ></textarea>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="edit-priority" className="font-medium text-gray-700">Priority</label>
                        <select
                            id="edit-priority"
                            value={editedTask.priority}
                            onChange={(e) => setEditedTask({ ...editedTask, priority: Number(e.target.value) as TaskPriorityType })}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        >
                            <option value={TaskPriority.Low}>Low</option>
                            <option value={TaskPriority.Medium}>Medium</option>
                            <option value={TaskPriority.High}>High</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="edit-category" className="font-medium text-gray-700">Category</label>
                        <select
                            id="edit-category"
                            value={editedTask.categoryId}
                            onChange={(e) => setEditedTask({ ...editedTask, categoryId: Number(e.target.value) })}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        >
                            <option value={0} disabled>-- Select Category --</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <input
                            id="edit-completed"
                            type="checkbox"
                            checked={editedTask.isCompleted}
                            onChange={(e) => setEditedTask({ ...editedTask, isCompleted: e.target.checked })}
                            className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="edit-completed" className="font-medium text-gray-700 select-none">
                            Mark as Completed
                        </label>
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
                        <button type="button" onClick={() => onDelete(taskId)} className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 shadow transition">
                            Delete Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
