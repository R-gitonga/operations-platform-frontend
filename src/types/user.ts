export interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
    active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
}

export interface UpdateUserRequest {
    name: string;
    email: string;
    role: "admin" | "user";
    active: boolean;
}