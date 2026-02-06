import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskPage from "./TaskPage";
import CategoryPage from "./CategoryPage";

export default function WorkspaceDetailsPage() {
    const { workspaceId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'tasks' | 'categories'>('tasks');

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <button 
                onClick={() => navigate('/')}
                className="mb-4 text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1"
            >
                &larr; Back to Workspaces
            </button>
            
            <div className="bg-white rounded-xl shadow-lg p-8 min-h-[600px]">
                <div className="flex gap-6 mb-6 border-b border-gray-200">
                     <button 
                        className={`pb-3 px-2 font-bold text-lg transition-colors relative ${activeTab === 'tasks' ? 'text-purple-600' : 'text-gray-500 hover:text-purple-400'}`}
                        onClick={() => setActiveTab('tasks')}
                     >
                        Tasks
                        {activeTab === 'tasks' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-t-full" />}
                     </button>
                     <button 
                        className={`pb-3 px-2 font-bold text-lg transition-colors relative ${activeTab === 'categories' ? 'text-purple-600' : 'text-gray-500 hover:text-purple-400'}`}
                        onClick={() => setActiveTab('categories')}
                     >
                        Categories
                        {activeTab === 'categories' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-t-full" />}
                     </button>
                </div>
                
                <div className="mt-4">
                    {/* Only render content if we have a valid ID */}
                    {workspaceId ? (
                        activeTab === 'tasks' 
                            ? <TaskPage workspaceId={Number(workspaceId)} /> 
                            : <CategoryPage workspaceId={Number(workspaceId)} />
                    ) : (
                        <p>Invalid Workspace ID</p>
                    )}
                </div>
            </div>
        </div>
    );
}
