import { useState } from "react";
import type { UserLoginDto } from "@/shared/types/user";

interface LoginDialogProps {
    onSubmit: (user: UserLoginDto) => void;
}

export default function LoginDialog({ onSubmit }: LoginDialogProps) {
    const [credentials, setCredentials] = useState<UserLoginDto>({ email: "", password: "" });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(credentials); // Reicht die Daten hoch an die LoginPage
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-medium text-gray-700">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={credentials.email}
                    onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
                    required
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="font-medium text-gray-700">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={credentials.password}
                    onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition shadow-md"
            >
                Login
            </button>
        </form>
    );
}