export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    user_id: number;
    email: string;
    display_name: string;
    role: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    password: string;
}
