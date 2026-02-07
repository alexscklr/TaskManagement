import { useCallback, useState } from "react";
import type { TaskCreateDto, TaskReadDto, TaskUpdateDto } from "../types/task";
import { createTask as createTaskApi, fetchTasks, updateTask as updateTaskApi, deleteTask as deleteTaskApi } from "../lib/tasks";



export function useTasks() {
    const [tasks, setTasks] = useState<TaskReadDto[]>([]);

    const loadTasks = useCallback(async (workspaceId: number) => {
        const fetchedTasks = await fetchTasks(workspaceId);
        setTasks(fetchedTasks);
    }, []);

    const createTask = useCallback(async (task: TaskCreateDto) => {
        const createdTask: TaskReadDto = await createTaskApi(task);
        setTasks(prevTasks => [...prevTasks, createdTask]);
    }, []);

    const updateTask = useCallback(async (updatedTask: TaskUpdateDto, taskId: number) => {
        const utask: TaskReadDto = await updateTaskApi(updatedTask, taskId);
        setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? utask : task));
    }, []);

    const deleteTask = useCallback(async (taskId: number) => {
        await deleteTaskApi(taskId);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }, []);
    
    return {tasks, loadTasks, createTask, updateTask, deleteTask};
}