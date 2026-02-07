import { useState, useEffect } from "react";
import type { UserUpdateDto } from "@/shared/types/user";

interface UserEditDialogProps {
    isOpen: boolean;
    user: UserUpdateDto;
    userId: number;
    onSubmit: (user: UserUpdateDto, userId: number) => void;
    onClose: () => void;
    onDelete: (userId: number) => void;
}

export default function UserEditDialog({ isOpen, user, userId, onClose, onSubmit, onDelete }: UserEditDialogProps) {
    const [editedUser, setEditedUser] = useState<UserUpdateDto>(user);

    useEffect(() => {
        setEditedUser(user);
    }, [user]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(editedUser, userId);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
                <div className="bg-purple-600 px-6 py-4">
                    <h3 className="text-xl font-bold text-white">Edit User</h3>
                </div>

                <form className="p-6 space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="cat-title" className="font-medium text-gray-700">Title</label>
                        <input
                            id="cat-title"
                            type="text"
                            value={editedUser.username}
                            onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={editedUser.email}
                            onChange={e => setEditedUser({ ...editedUser, email: e.target.value })}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={editedUser.newPassword}
                            onChange={e => setEditedUser({ ...editedUser, newPassword: e.target.value })}
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
                            onClick={() => onDelete(userId)}
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