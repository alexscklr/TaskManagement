import { useEffect, useState } from "react";
import type { WorkspaceUpdateDto } from "../../types/workspace";


interface WorkspaceEditDialogProps {
    isOpen: boolean;
    workspace: WorkspaceUpdateDto;
    workspaceId: number;
    onSubmit: (workspace: WorkspaceUpdateDto, workspaceId: number) => void;
    onClose: () => void;
    onDelete: (workspaceId: number) => void;
}

export default function WorkspaceEditDialog({ isOpen, workspace, workspaceId, onSubmit, onClose, onDelete }: WorkspaceEditDialogProps) {
    const [editedWorkspace, setEditedWorkspace] = useState<WorkspaceUpdateDto>(workspace);

    useEffect(() => {
        setEditedWorkspace(workspace);
    }, [workspace]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(editedWorkspace, workspaceId);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
                <div className="bg-purple-600 px-6 py-4">
                    <h3 className="text-xl font-bold text-white">Edit Workspace</h3>
                </div>

                <form className="p-6 space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="workspace-name" className="font-medium text-gray-700">Name</label>
                        <input
                            id="workspace-name"
                            type="text"
                            value={editedWorkspace.name}
                            onChange={(e) => setEditedWorkspace({ ...editedWorkspace, name: e.target.value })}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        />
                    </div>

                    <div className="flex gap-3 pt-4 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 shadow transition"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => onDelete(workspaceId)}
                            className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 shadow transition"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}