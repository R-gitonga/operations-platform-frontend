import { api } from "@/lib/api";
import type {
    BootstrapAdminRequest,
    ForgotPasswordRequest,
    LoginRequest,
    LoginResponse,
    ResetPasswordRequest,
} from "@/types/auth";

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

export async function requestPasswordReset(
    request: ForgotPasswordRequest,
): Promise<void> {
    await api.post("/auth/forgot-password", request);
}

export async function resetPassword(
    request: ResetPasswordRequest,
): Promise<void> {
    await api.post("/auth/reset-password", request);
}

export async function bootstrapAdmin(
    request: BootstrapAdminRequest,
): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(
        "/auth/bootstrap-admin",
        request,
    );

    return response.data;
}