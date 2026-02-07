import api from "@/api/axiosInstance";
import type { UserCreateDto, UserReadDto, UserUpdateDto } from "../types/user";

export async function fetchUsers() {
    const response = await api.get<UserReadDto[]>(`/users`);
    return response.data;
}

export async function createUser(user: UserCreateDto) {
    const response = await api.post<UserReadDto>('/users', user);
    return response.data;
}

export async function updateUser(user: UserUpdateDto, userId: number) {
    const response = await api.put<UserReadDto>(`/users/${userId}`, user);
    return response.data;
}

export async function deleteUser(userId: number) {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
}