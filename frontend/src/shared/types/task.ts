import type { CategoryReadDto } from "./category";

export const TaskPriority = {
    Low: 0,
    Medium: 1,
    High: 2
} as const;

export type TaskPriority = typeof TaskPriority[keyof typeof TaskPriority];


interface TaskBase {
    title: string;
    description: string;
    priority: TaskPriority;
}

export interface TaskReadDto extends TaskBase {
    id: number;
    workspaceId: number;
    createdAt: string;
    category : CategoryReadDto;
    isCompleted: boolean;
}

export interface TaskCreateDto extends TaskBase {
    workspaceId: number;
    categoryId: number;
}

export interface TaskUpdateDto extends TaskCreateDto {
    isCompleted: boolean;
}

export interface TaskDeleteDto {
    id: number;
}