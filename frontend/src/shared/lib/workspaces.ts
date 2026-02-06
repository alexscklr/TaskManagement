import api from "../../api/axiosInstance";
import type { WorkspaceCreateDto, WorkspaceReadDto, WorkspaceUpdateDto } from "../types/workspace";

export async function fetchWorkspaces() {
    const response = await api.get<WorkspaceReadDto[]>('/workspaces');
    return response.data;
}

export async function createWorkspace(workspace: WorkspaceCreateDto) {
    const response = await api.post<WorkspaceReadDto>('/workspaces', workspace);
    return response.data;
}

export async function updateWorkspace(workspace: WorkspaceUpdateDto, workspaceId: number) {
    const response = await api.put<WorkspaceReadDto>(`/workspaces/${workspaceId}`, workspace);
    return response.data;
}

export async function deleteWorkspace(workspaceId: number) {
    const response = await api.delete(`/workspaces/${workspaceId}`);
    return response.data;
}