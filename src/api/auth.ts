import { api } from "@/lib/api";
import type { LoginRequest, LoginResponse } from "@/types/auth";

export async function login(
    request: LoginRequest,
): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
        "/auth/login",
        request,
    );

    return response.data;
}

export async function getCurrentUser(): Promise<LoginResponse> {
    const response = await api.get<LoginResponse>(
        "/auth/me",
    );

    return response.data;
}

export async function logout(): Promise<void> {
    await api.post("/auth/logout");
}