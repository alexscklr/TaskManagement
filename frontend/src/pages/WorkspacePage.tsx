import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWorkspace, deleteWorkspace, fetchWorkspaces, updateWorkspace } from "../shared/lib/workspaces";
import WorkspaceCreationDialog from "../shared/components/Workspaces/WorkspaceCreationDialog";
import WorkspaceEditDialog from "../shared/components/Workspaces/WorkspaceEditDialog";
import type { WorkspaceReadDto } from "../shared/types/workspace";
import WorkspaceElement from "../shared/components/Workspaces/WorkspaceElement";


interface WorkspacePageProps {
}

export default function WorkspacePage(props: WorkspacePageProps) {
    const navigate = useNavigate();
    const [Workspaces, setWorkspaces] = useState<WorkspaceReadDto[]>([]);
    const [editingWorkspace, setEditingWorkspace] = useState<WorkspaceReadDto | null>(null);
    const [messageLocal, setMessageLocal] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const Workspaces = await fetchWorkspaces();
            setWorkspaces(Workspaces);
        };

        fetchData();
    }, []);



    const handleDeleteWorkspace = async (WorkspaceId: number) => {
        try {
            await deleteWorkspace(WorkspaceId);
            setWorkspaces(Workspaces.filter(t => t.id !== WorkspaceId));
            setEditingWorkspace(null);
            setMessageLocal(`Workspace has been deleted successfully!`);
        } catch (error) {
            console.error(error);
            setMessageLocal("Failed to delete Workspace.");
        }
    }

    return (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-purple-700 mb-2 text-center">Workspace Manager</h1>
            <p className="text-gray-600 mb-6 text-center">{messageLocal}</p>
            {Workspaces.length === 0 ? (
                <p className="text-center text-gray-500">No Workspaces available.</p>
            ) : (
                <ul className="space-y-4 mb-8 border rounded-lg p-4 bg-gray-50">
                    {Workspaces.map((Workspace: WorkspaceReadDto) => (
                        <li
                            key={Workspace.id}
                        >
                            <WorkspaceElement 
                                workspace={Workspace} 
                                onClick={() => navigate(`/workspace/${Workspace.id}`)} 
                                onEdit={(e) => setEditingWorkspace(Workspace)} 
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
                    onSubmit={async (updatedWorkspace) => {
                        if (!editingWorkspace) return;
                        try {
                            const fullUpdatedWorkspace = await updateWorkspace(updatedWorkspace, editingWorkspace.id);
                            setWorkspaces(Workspaces.map(t => t.id === fullUpdatedWorkspace.id ? fullUpdatedWorkspace : t));
                            setEditingWorkspace(null);
                            setMessageLocal(`Workspace "${fullUpdatedWorkspace.name}" aktualisiert!`);
                        } catch (error: unknown) {
                            setMessageLocal(error instanceof Error ? error.message : "Fehler beim Update");
                        }
                    }}
                    onDelete={handleDeleteWorkspace}
                />
            }


            <div className="mt-8">
                <h2 className="text-lg font-bold text-purple-600 mb-2">Create New Workspace</h2>
                <WorkspaceCreationDialog onSubmit={async (workspace) => {
                    try {
                        const createdWorkspace = await createWorkspace(workspace);
                        setWorkspaces(prevWorkspaces => [...prevWorkspaces, createdWorkspace]);
                        setMessageLocal(`Workspace "${createdWorkspace.name}" has been created successfully!`);
                    } catch (error: unknown) {
                        if (error instanceof Error) {
                            setMessageLocal(error.message || "Failed to create Workspace.");
                        } else {
                            setMessageLocal("An unknown error occurred.");
                        }
                    }
                }} />
            </div>
        </div>
    );
}