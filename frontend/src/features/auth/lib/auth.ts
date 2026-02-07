import api from "@/api/axiosInstance";


export async function login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
}

export async function logout() {
    await api.post('/auth/logout');
}