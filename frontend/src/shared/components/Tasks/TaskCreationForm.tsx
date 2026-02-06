import { useEffect, useState } from "react";
import type { TaskCreateDto } from "../../types/task";
import { TaskPriority, type TaskPriority as TaskPriorityType } from "../../types/task";
import { defaultTaskCreate as defaultTask } from "../../constants/tasks";
import { fetchCategories } from "../../lib/categories";
import type { CategoryReadDto } from "../../types/category";

interface TaskCreationFormProps {
    onSubmit: (task: TaskCreateDto) => void;
    workspaceId: number;
}

export default function TaskCreationForm(taskProps: TaskCreationFormProps) {
    const [newTask, setNewTask] = useState<TaskCreateDto>(defaultTask);
    const [categories, setCategories] = useState<CategoryReadDto[]>([]);
    
    useEffect(() => {
            const fetchData = async () => {
                const cats = await fetchCategories(taskProps.workspaceId);
                setCategories(cats);
                // Automatisch erste Kategorie wählen, wenn noch keine (0) gesetzt ist
                if (cats.length > 0) {
                    setNewTask(prev => {
                        // Nur updaten wenn noch auf 0
                        if (prev.categoryId === 0) {
                            return { ...prev, categoryId: cats[0].id };
                        }
                        return prev;
                    });
                }
            };
            fetchData();
        }, [taskProps.workspaceId]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        taskProps.onSubmit(newTask);
        // Reset Form, aber behalte die aktuelle Category ID bei (User Friendly)
        setNewTask({
            ...defaultTask,
            categoryId: newTask.categoryId 
        });
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
                    value={newTask.title}
                    onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="description" className="font-medium text-gray-700">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={newTask.description}
                    onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                    rows={3}
                    required
                ></textarea>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="priority" className="font-medium text-gray-700">Priority:</label>
                <select 
                    id="priority"
                    name="priority"
                    value={newTask.priority}
                    onChange={e => setNewTask({ ...newTask, priority: Number(e.target.value) as TaskPriorityType })}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                >
                    <option value={TaskPriority.Low}>Low</option>
                    <option value={TaskPriority.Medium}>Medium</option>
                    <option value={TaskPriority.High}>High</option>
                </select>
            </div>
            <div className="flex items-center gap-2 pt-2">
                <label htmlFor="categoryId" className="font-medium text-gray-700">Category ID:</label>
                <select 
                    id="categoryId"
                    name="categoryId"
                    value={newTask.categoryId}
                    onChange={e => setNewTask({ ...newTask, categoryId: Number(e.target.value) })}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                >
                    {/* Fallback Option, falls beim Laden kurzzeitig nichts da ist oder Liste leer */}
                    <option value={0} disabled>-- Select Category --</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md shadow hover:bg-purple-700 transition"
            >
                Create Task
            </button>
        </form>
    );
}