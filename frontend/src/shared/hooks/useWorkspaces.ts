import { useCallback, useState } from "react";
import type { WorkspaceCreateDto, WorkspaceReadDto, WorkspaceUpdateDto } from "../types/workspace";
import { createWorkspace as createWorkspacesApi, fetchWorkspaces, updateWorkspace as updateWorkspacesApi, deleteWorkspace as deleteWorkspacesApi } from "../lib/workspaces";



export function useWorkspaces() {
    const [workspaces, setWorkspaces] = useState<WorkspaceReadDto[]>([]);

    const loadWorkspaces = useCallback(async () => {
        const fetchedWorkspaces = await fetchWorkspaces();
        setWorkspaces(fetchedWorkspaces);
    }, []);

    const createWorkspace = useCallback(async (workspace: WorkspaceCreateDto) => {
        const createdWorkspace: WorkspaceReadDto = await createWorkspacesApi(workspace);
        setWorkspaces(prevWorkspaces => [...prevWorkspaces, createdWorkspace]);
    }, []);

    const updateWorkspace = useCallback(async (updatedWorkspace: WorkspaceUpdateDto, workspaceId: number) => {
        const uworkspace: WorkspaceReadDto = await updateWorkspacesApi(updatedWorkspace, workspaceId);
        setWorkspaces(prevWorkspaces => prevWorkspaces.map(workspace => workspace.id === workspaceId ? uworkspace : workspace));
    }, []);

    const deleteWorkspace = useCallback(async (workspaceId: number) => {
        await deleteWorkspacesApi(workspaceId);
        setWorkspaces(prevWorkspaces => prevWorkspaces.filter(workspace => workspace.id !== workspaceId));
    }, []);
    
    return {workspaces, loadWorkspaces, createWorkspace, updateWorkspace, deleteWorkspace};
}