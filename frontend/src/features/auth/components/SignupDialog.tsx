
import { useState } from "react";
import type { UserCreateDto } from "@/shared/types/user";
import { defaultUserCreate } from "@/shared/constants/users";

interface SignUpDialogProps {
    onSubmit: (user: UserCreateDto) => void;
}

export default function SignUpDialog(userProps: SignUpDialogProps) {
    const [newUser, setNewUser] = useState<UserCreateDto>(defaultUserCreate);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        userProps.onSubmit(newUser);
        setNewUser(defaultUserCreate);
    }

    return (
        <form
            className="space-y-4"
            onSubmit={e => handleSubmit(e)}
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="username" className="font-medium text-gray-700">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={newUser.username}
                    onChange={e => setNewUser({ ...newUser, username: e.target.value })}
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
                    value={newUser.email}
                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
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
                    value={newUser.password}
                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md shadow hover:bg-purple-700 transition"
            >
                Save User
            </button>
        </form>
    );
}