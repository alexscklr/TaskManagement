import api from "@/api/axiosInstance";
import type { TaskCreateDto, TaskReadDto, TaskUpdateDto } from "../types/task";

export async function fetchTasks(workspaceId: number) {
    const response = await api.get<TaskReadDto[]>(`/tasks?workspaceId=${workspaceId}`);
    return response.data;
}

export async function createTask(task: TaskCreateDto) {
    const response = await api.post<TaskReadDto>('/tasks', task);
    return response.data;
}

export async function updateTask(task: TaskUpdateDto, taskId: number) {
    const response = await api.put<TaskReadDto>(`/tasks/${taskId}`, task);
    return response.data;
}

export async function deleteTask(taskId: number) {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
}