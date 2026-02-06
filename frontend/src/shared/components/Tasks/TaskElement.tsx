import type { TaskReadDto } from "../../types/task";
import CategoryElement from "../Categories/CategoryElement";


interface TaskElementProps {
    task: TaskReadDto;
    onClick: () => void;
}

export default function TaskElement({ task, onClick }: TaskElementProps) {
    return (
        <div
            className="border border-gray-300 rounded-lg p-4 mb-4 cursor-pointer hover:shadow-lg transition"
            onClick={onClick}
        >
            <div className="w-full flex justify-between mb-2 items-center">
                <h2 className="text-xl font-semibold text-blue-700 mb-1">{task.title}</h2>
                {task.category && <CategoryElement category={task.category} onClick={() => { }} size="small" />}
            </div>
            <p className="text-gray-700 mb-2">{task.description}</p>
            <span className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                Priority: {task.priority === 0 ? 'Low' : task.priority === 1 ? 'Medium' : 'High'}
            </span>
            <br />
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${task.isCompleted ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                Status: {task.isCompleted ? 'Completed' : 'Pending'}
            </span>
        </div>
    );
}