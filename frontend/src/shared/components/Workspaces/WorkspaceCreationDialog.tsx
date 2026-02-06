import { useState } from "react";
import type { WorkspaceCreateDto } from "../../types/workspace";
import { defaultWorkspaceCreate } from "../../constants/workspaces";

interface WorkspaceCreationDialogProps {
    onSubmit: (workspace: WorkspaceCreateDto) => void;
}

export default function WorkspaceCreationDialog(workspaceProps: WorkspaceCreationDialogProps) {
    const [newWorkspace, setNewWorkspace] = useState<WorkspaceCreateDto>(defaultWorkspaceCreate);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        workspaceProps.onSubmit(newWorkspace);
        setNewWorkspace(defaultWorkspaceCreate);
    }

    return (
        <form
            className="space-y-4"
            onSubmit={e => handleSubmit(e)}
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="title" className="font-medium text-gray-700">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={newWorkspace.name}
                    onChange={e => setNewWorkspace({ ...newWorkspace, name: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md shadow hover:bg-purple-700 transition"
            >
                Save Workspace
            </button>
        </form>
    );
}