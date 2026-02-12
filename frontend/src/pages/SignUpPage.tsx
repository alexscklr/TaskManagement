import { useState } from "react";
import { useCreateUserMutation } from "@/shared/hooks/useUsers";
import type { UserCreateDto } from "@/shared/types/user";
import SignUpDialog from "@/features/auth/components/SignupDialog";

/*
interface UserPageProps {
}*/
export default function UserPage() {
    const [messageLocal, setMessageLocal] = useState("");
    const createUserMutation = useCreateUserMutation();

    const handleCreateUser = async (user: UserCreateDto) => {
        createUserMutation.mutate(user, {
            onSuccess: () => setMessageLocal(`User "${user.username}" has been created successfully!`),
            onError: (error: unknown) => setMessageLocal(error instanceof Error ? error.message : "Failed to create user."),
        });
    };

    return (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
            <div className="mt-8">
                <h1 className="text-lg font-bold text-purple-600 mb-2">Create New User</h1>
                <p className="text-gray-600 mb-6 text-center">{messageLocal}</p>
                <SignUpDialog onSubmit={handleCreateUser} />
            </div>
        </div>
    );
}