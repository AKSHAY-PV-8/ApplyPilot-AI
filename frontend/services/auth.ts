import api from "@/lib/api"

export interface RegisterData {
    name: string,
    email: string,
    password: string
}

export interface LoginData {
    email: string,
    password: string
}

export const registerUser = async (data: RegisterData) => {
    const registerResponse = await api.post("/auth/register", data);
    return registerResponse.data;
}

export const loginUser = async (data: LoginData) => {
    const loginResponse = await api.post("/auth/login", data);
    return loginResponse.data;
}

export const logoutUser = async () => {
    const logoutResponse = await api.post("/auth/logout");
    return logoutResponse.data;
}