import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceCreationDialog from "../shared/components/Workspaces/WorkspaceCreationDialog";
import WorkspaceEditDialog from "../shared/components/Workspaces/WorkspaceEditDialog";
import type { WorkspaceCreateDto, WorkspaceReadDto, WorkspaceUpdateDto } from "../shared/types/workspace";
import WorkspaceElement from "../shared/components/Workspaces/WorkspaceElement";
import { useWorkspaces } from "@/shared/hooks/useWorkspaces";

/*
interface WorkspacePageProps {
}
*/
export default function WorkspacePage(/*props: WorkspacePageProps*/) {
    const navigate = useNavigate();
    //const [Workspaces, setWorkspaces] = useState<WorkspaceReadDto[]>([]);
    const [editingWorkspace, setEditingWorkspace] = useState<WorkspaceReadDto | null>(null);
    const [messageLocal, setMessageLocal] = useState("");

    const { workspaces, loadWorkspaces, createWorkspace, updateWorkspace, deleteWorkspace } = useWorkspaces();

    useEffect(() => {
        loadWorkspaces();
    }, [loadWorkspaces]);



    const handleCreateWorkspace = async (workspace: WorkspaceCreateDto) => {
        try {
            await createWorkspace(workspace);
            setMessageLocal(`Workspace "${workspace.name}" has been created successfully!`);

        } catch (error) {
            console.error(error);
            setMessageLocal(error instanceof Error ? error.message : "Failed to create task.");
        }
    }

    const handleDeleteWorkspace = async (workspaceId: number) => {
        try {
            await deleteWorkspace(workspaceId);
            setEditingWorkspace(null);
            setMessageLocal(`Workspace has been deleted successfully!`);
        } catch (error) {
            console.error(error);
            setMessageLocal(error instanceof Error ? error.message : "Failed to delete workspace.");
        }
    }

    const handleUpdateWorkspace = async (updatedWorkspace: WorkspaceUpdateDto, workspaceId: number) => {
        try {
            await updateWorkspace(updatedWorkspace, workspaceId);
            setEditingWorkspace(null);
            setMessageLocal(`Workspace "${updatedWorkspace.name}" has been updated successfully!`);
        } catch (error) {
            console.error(error);
            setMessageLocal(error instanceof Error ? error.message : "Failed to update workspace.");
        }
    }

    return (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-purple-700 mb-2 text-center">Workspace Manager</h1>
            <p className="text-gray-600 mb-6 text-center">{messageLocal}</p>
            {workspaces.length === 0 ? (
                <p className="text-center text-gray-500">No Workspaces available.</p>
            ) : (
                <ul className="space-y-4 mb-8 border rounded-lg p-4 bg-gray-50">
                    {workspaces.map((workspace: WorkspaceReadDto) => (
                        <li
                            key={workspace.id}
                        >
                            <WorkspaceElement
                                workspace={workspace}
                                onClick={() => navigate(`/workspace/${workspace.id}`)}
                                onEdit={() => setEditingWorkspace(workspace)}
                            />
                        </li>
                    ))}
                </ul>
            )}
            {
                editingWorkspace && <WorkspaceEditDialog
                    isOpen={!!editingWorkspace}
                    workspace={editingWorkspace}
                    workspaceId={editingWorkspace?.id}
                    onClose={() => setEditingWorkspace(null)}
                    onSubmit={handleUpdateWorkspace}
                    onDelete={handleDeleteWorkspace}
                />
            }


            <div className="mt-8">
                <h2 className="text-lg font-bold text-purple-600 mb-2">Create New Workspace</h2>
                <WorkspaceCreationDialog onSubmit={handleCreateWorkspace} />
            </div>
        </div>
    );
}