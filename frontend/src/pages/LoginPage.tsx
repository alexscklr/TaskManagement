import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Wichtig für den Redirect
import { useAuthContext } from "@/features/auth/context/AuthContext";
import { login as apiLogin } from "@/features/auth/lib/auth"; // Dein Axios Call
import LoginDialog from "@/features/auth/components/LoginDialog";
import type { UserLoginDto } from "@/shared/types/user";

export default function LoginPage() {
    const [messageLocal, setMessageLocal] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuthContext();
    const navigate = useNavigate();

    const handleLogin = async (credentials: UserLoginDto) => {
        setIsLoading(true);
        setMessageLocal("");

        try {
            // 1. API Call ausführen
            const response = await apiLogin(credentials.email, credentials.password);

            // 2. AuthContext aktualisieren (User & Token speichern)
            login(response.user, response.token);

            // 3. Weiterleitung
            navigate("/");
        } catch (error: unknown) {
            setMessageLocal(error instanceof Error ? error.message : "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
            <div className="mt-8">
                <h1 className="text-lg font-bold text-purple-600 mb-2">Login</h1>
                <p className="text-gray-600 mb-6 text-center">{isLoading ? "Loading..." : messageLocal}</p>
                <LoginDialog
                    onSubmit={handleLogin} />
            </div>
        </div>
    );
}