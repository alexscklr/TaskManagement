import { useCallback, useState } from "react";
import type { UserCreateDto, UserReadDto, UserUpdateDto } from "../types/user";
import { createUser as createUserApi, fetchUsers, updateUser as updateUserApi, deleteUser as deleteUserApi } from "../lib/users";



export function useUsers() {
    const [users, setUsers] = useState<UserReadDto[]>([]);

    const loadUsers = useCallback(async () => {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
    }, []);

    const createUser = useCallback(async (user: UserCreateDto) => {
        const createdUser: UserReadDto = await createUserApi(user);
        setUsers(prevUsers => [...prevUsers, createdUser]);
    }, []);

    const updateUser = useCallback(async (updatedUser: UserUpdateDto, userId: number) => {
        const updatedUserData: UserReadDto = await updateUserApi(updatedUser, userId);
        setUsers(prevUsers => prevUsers.map(user => user.id === userId ? updatedUserData : user));
    }, []);

    const deleteUser = useCallback(async (userId: number) => {
        await deleteUserApi(userId);
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    }, []);
    
    return {users, loadUsers, createUser, updateUser, deleteUser};
}