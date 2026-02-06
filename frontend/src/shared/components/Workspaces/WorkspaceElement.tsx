import type { WorkspaceReadDto } from "../../types/workspace";

interface WorkspaceElementProps {
    workspace: WorkspaceReadDto;
    onClick: () => void;
    onEdit: (e: React.MouseEvent) => void;
}

export default function WorkspaceElement({ workspace, onClick, onEdit }: WorkspaceElementProps) {
    return (
        <div 
            className="border border-gray-300 rounded-lg p-5 mb-4 cursor-pointer hover:shadow-lg transition bg-white flex justify-between items-center group"
            onClick={onClick}
        >
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition-colors">
                {workspace.name}
            </h2>
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onEdit(e);
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 font-semibold rounded-md transition duration-200 border border-transparent hover:border-purple-200"
            >
                Edit
            </button>
        </div>
    )
}