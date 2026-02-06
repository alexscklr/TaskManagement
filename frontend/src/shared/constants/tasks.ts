import type { TaskCreateDto } from "../types/task";


export const defaultTaskCreate: TaskCreateDto = {
    title: '',
    description: '',
    categoryId: 0,
    priority: 1,
    workspaceId: 0,
}