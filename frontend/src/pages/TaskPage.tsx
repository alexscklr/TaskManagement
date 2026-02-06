import { useEffect, useState } from "react";
import TaskCreationForm from "../shared/components/Tasks/TaskCreationForm";
import TaskEditDialog from "../shared/components/Tasks/TaskEditDialog";
import TaskElement from "../shared/components/Tasks/TaskElement";
import { updateTask, createTask, deleteTask, fetchTasks } from "../shared/lib/tasks";
import type { TaskReadDto } from "../shared/types/task";


interface TaskPageProps {
    workspaceId: number;
}

export default function TaskPage(props: TaskPageProps) {
    const [tasks, setTasks] = useState<TaskReadDto[]>([]);
    const [editingTask, setEditingTask] = useState<TaskReadDto | null>(null);
    const [messageLocal, setMessageLocal] = useState("");

    useEffect(() => {
        const fetchData = async () => {
             // Pass workspaceId to fetch
            const tasks = await fetchTasks(props.workspaceId);
            setTasks(tasks);
        };
        
        fetchData();
    }, [props.workspaceId]);


    const handleDeleteTask = async (taskId: number) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(t => t.id !== taskId));
            setEditingTask(null);
            setMessageLocal(`Task has been deleted successfully!`);
        } catch (error) {
            console.error(error);
            setMessageLocal("Failed to delete task.");
        }
    }

    return (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-purple-700 mb-2 text-center">Task Manager</h1>
            <p className="text-gray-600 mb-6 text-center">{messageLocal}</p>
            <hr className="my-6 border-gray-300" />
            {tasks.length === 0 ? (
                <p className="text-center text-gray-500">No tasks available.</p>
            ) : (
                <ul className="space-y-4 mb-8 border rounded-lg p-4 bg-gray-50">
                    {tasks.map((task: TaskReadDto) => (
                        <li
                            key={task.id}
                        >
                            <TaskElement task={task} onClick={() => setEditingTask(task)} />
                        </li>
                    ))}
                </ul>
            )}
            {
                editingTask && <TaskEditDialog
                    isOpen={!!editingTask}
                    task={{
                        ...editingTask,
                        categoryId: editingTask.category?.id ?? 0
                    }}
                    taskId={editingTask?.id}
                    workspaceId={props.workspaceId}
                    onClose={() => setEditingTask(null)}
                    onSubmit={async (updatedTask) => {
                        if (!editingTask) return;
                        try {
                            const fullUpdatedTask = await updateTask(updatedTask, editingTask.id);
                            setTasks(tasks.map(t => t.id === fullUpdatedTask.id ? fullUpdatedTask : t));
                            setEditingTask(null);
                            setMessageLocal(`Task "${fullUpdatedTask.title}" aktualisiert!`);
                        } catch (error: unknown) {
                            setMessageLocal(error instanceof Error ? error.message : "Fehler beim Update");
                        }
                    }}
                    onDelete={handleDeleteTask}
                />
            }

            <hr className="my-6 border-gray-300" />
            <div className="mt-8">
                <h2 className="text-lg font-bold text-purple-600 mb-2">Create New Task</h2>
                <TaskCreationForm 
                    workspaceId={props.workspaceId}
                    onSubmit={async (task) => {
                    try {
                        const createdTask = await createTask({ ...task, workspaceId: props.workspaceId });
                        setTasks(prevTasks => [...prevTasks, createdTask]);
                        setMessageLocal(`Task "${createdTask.title}" has been created successfully!`);
                    } catch (error: unknown) {
                        if (error instanceof Error) {
                            setMessageLocal(error.message || "Failed to create task.");
                        } else {
                            setMessageLocal("An unknown error occurred.");
                        }
                    }
                }} />
            </div>
        </div>
    );
}