
import { Link } from "react-router-dom";
import { useAuthContext } from "../features/auth/context/AuthContext";

export default function Header() {
    const {logout, user} = useAuthContext();

    const handleLogout = async () => {
        await logout();
    };
    return (
        <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
            <div className="text-2xl font-bold">
                <Link to="/" className="hover:text-gray-300">Task Management</Link>
            </div>

            <div className="flex items-center gap-4">
                <Link to="/invitations" className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded">Invitations</Link>
                {!user && (
                    <>
                        <Link to="/login" className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded">Login</Link>
                        <Link to="/signup" className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded">Sign Up</Link>
                    </>
                )}
                {user && (
                    <button onClick={handleLogout} className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded">
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
}