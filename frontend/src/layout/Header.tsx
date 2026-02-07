
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
            <div className="text-2xl font-bold">
                <Link to="/" className="hover:text-gray-300">Task Management</Link>
            </div>

            <div className="flex items-center gap-4">
                <Link to="/login" className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded">Login</Link>
                <Link to="/signup" className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded">Sign Up</Link>
            </div>
        </header>
    );
}