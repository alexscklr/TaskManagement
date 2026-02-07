import { useEffect, useState } from "react";
import { useUsers } from "@/shared/hooks/useUsers";
import type { UserCreateDto, UserReadDto, UserUpdateDto } from "@/shared/types/user";
import UserElement from "@/shared/components/Users/UserElement";
import UserEditDialog from "@/shared/components/Users/UserEditDialog";
import SignUpDialog from "@/features/auth/components/SignupDialog";

/*
interface UserPageProps {
}*/

export default function UserPage(/*props: UserPageProps*/) {
    const [editingUser, setEditingUser] = useState<UserReadDto | null>(null);
    const [messageLocal, setMessageLocal] = useState("");

    const { users, loadUsers, deleteUser, createUser, updateUser } = useUsers();

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);


    const handleCreateUser = async (user: UserCreateDto) => {
        try {
            await createUser(user);
            setMessageLocal(`User "${user.username}" has been created successfully!`);

        } catch (error) {
            console.error(error);
            setMessageLocal(error instanceof Error ? error.message : "Failed to create user.");
        }
    }

    const handleDeleteUser = async (userId: number) => {
        try {
            await deleteUser(userId);
            setEditingUser(null);
            setMessageLocal(`User has been deleted successfully!`);
        } catch (error) {
            console.error(error);
            setMessageLocal(error instanceof Error ? error.message : "Failed to delete user.");
        }
    }

    const handleUpdateUser = async (updatedUser: UserUpdateDto, userId: number) => {
        try {
            await updateUser(updatedUser, userId);
            setEditingUser(null);
            setMessageLocal(`User "${updatedUser.username}" has been updated successfully!`);
        } catch (error) {
            console.error(error);
            setMessageLocal(error instanceof Error ? error.message : "Failed to update user.");
        }
    }

    return (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-purple-700 mb-2 text-center">User Manager</h1>
            <p className="text-gray-600 mb-6 text-center">{messageLocal}</p>
            <hr className="my-6 border-gray-300" />
            {users.length === 0 ? (
                <p className="text-center text-gray-500">No users available.</p>
            ) : (
                <ul className="space-y-4 mb-8 border rounded-lg p-4 bg-gray-50">
                    {users.map((user: UserReadDto) => (
                        <li
                            key={user.id}
                        >
                            <UserElement user={user} onClick={() => setEditingUser(user)} />
                        </li>
                    ))}
                </ul>
            )}
            {
                editingUser && <UserEditDialog
                    isOpen={!!editingUser}
                    user={{
                        ...editingUser,
                        newPassword: ""
                    }}
                    userId={editingUser?.id}
                    onClose={() => setEditingUser(null)}
                    onSubmit={handleUpdateUser}
                    onDelete={handleDeleteUser}
                />
            }

            <hr className="my-6 border-gray-300" />
            <div className="mt-8">
                <h2 className="text-lg font-bold text-purple-600 mb-2">Create New User</h2>
                <SignUpDialog
                    onSubmit={handleCreateUser} />
            </div>
        </div>
    );
}