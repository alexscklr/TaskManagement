import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceCreationDialog from "../shared/components/Workspaces/WorkspaceCreationDialog";
import WorkspaceEditDialog from "../shared/components/Workspaces/WorkspaceEditDialog";
import type { WorkspaceCreateDto, WorkspaceReadDto, WorkspaceUpdateDto } from "../shared/types/workspace";
import WorkspaceElement from "../shared/components/Workspaces/WorkspaceElement";
import {
    useWorkspacesQuery,
    useCreateWorkspaceMutation,
    useUpdateWorkspaceMutation,
    useDeleteWorkspaceMutation,
} from "@/shared/hooks/useWorkspaces";

/*
interface WorkspacePageProps {
}
*/
export default function WorkspacePage() {
    const navigate = useNavigate();
    const [editingWorkspace, setEditingWorkspace] = useState<WorkspaceReadDto | null>(null);
    const [messageLocal, setMessageLocal] = useState("");

    const { data: workspaces = [], isLoading, error } = useWorkspacesQuery();
    const createWorkspaceMutation = useCreateWorkspaceMutation();
    const updateWorkspaceMutation = useUpdateWorkspaceMutation();
    const deleteWorkspaceMutation = useDeleteWorkspaceMutation();

    const handleCreateWorkspace = async (workspace: WorkspaceCreateDto) => {
        createWorkspaceMutation.mutate(workspace, {
            onSuccess: () => setMessageLocal(`Workspace "${workspace.name}" has been created successfully!`),
            onError: (error: unknown) => setMessageLocal(error instanceof Error ? error.message : "Failed to create workspace."),
        });
    };

    const handleDeleteWorkspace = async (workspaceId: number) => {
        deleteWorkspaceMutation.mutate(workspaceId, {
            onSuccess: () => {
                setEditingWorkspace(null);
                setMessageLocal("Workspace has been deleted successfully!");
            },
            onError: (error: unknown) => setMessageLocal(error instanceof Error ? error.message : "Failed to delete workspace."),
        });
    };

    const handleUpdateWorkspace = async (updatedWorkspace: WorkspaceUpdateDto, workspaceId: number) => {
        updateWorkspaceMutation.mutate({ updatedWorkspace, workspaceId }, {
            onSuccess: () => {
                setEditingWorkspace(null);
                setMessageLocal(`Workspace "${updatedWorkspace.name}" has been updated successfully!`);
            },
            onError: (error: unknown) => setMessageLocal(error instanceof Error ? error.message : "Failed to update workspace."),
        });
    };

    return (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-purple-700 mb-2 text-center">Workspace Manager</h1>
            <p className="text-gray-600 mb-6 text-center">{messageLocal}</p>
            {isLoading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">Error loading workspaces</p>
            ) : workspaces.length === 0 ? (
                <p className="text-center text-gray-500">No Workspaces available.</p>
            ) : (
                <ul className="space-y-4 mb-8 border rounded-lg p-4 bg-gray-50">
                    {workspaces.map((workspace: WorkspaceReadDto) => (
                        <li key={workspace.id}>
                            <WorkspaceElement
                                workspace={workspace}
                                onClick={() => navigate(`/workspace/${workspace.id}`)}
                                onEdit={() => setEditingWorkspace(workspace)}
                            />
                        </li>
                    ))}
                </ul>
            )}
            {editingWorkspace && (
                <WorkspaceEditDialog
                    isOpen={!!editingWorkspace}
                    workspace={editingWorkspace}
                    workspaceId={editingWorkspace?.id}
                    onClose={() => setEditingWorkspace(null)}
                    onSubmit={handleUpdateWorkspace}
                    onDelete={handleDeleteWorkspace}
                />
            )}
            <div className="mt-8">
                <h2 className="text-lg font-bold text-purple-600 mb-2">Create New Workspace</h2>
                <WorkspaceCreationDialog onSubmit={handleCreateWorkspace} />
            </div>
        </div>
    );
}