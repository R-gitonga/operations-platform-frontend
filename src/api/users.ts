import { api } from "@/lib/api";

import type {
    CreateUserRequest,
    UpdateUserRequest,
    User,
} from "@/types/user";

export async function getUsers(): Promise<User[]> {
    const response = await api.get<User[]>("/users");

    return response.data;
}

export async function getUser(id: number): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);

    return response.data;
}

export async function createUser(
    request: CreateUserRequest,
): Promise<User> {
    const response = await api.post<User>(
        "/users",
        request,
    );

    return response.data;
}

export async function updateUser(
    id: number,
    request: UpdateUserRequest,
): Promise<User> {
    const response = await api.put<User>(
        `/users/${id}`,
        request,
    );

    return response.data;
}

export async function deactivateUser(
    id: number,
): Promise<User> {
    const response = await api.patch<User>(
        `/users/${id}/deactivate`,
    );

    return response.data;
}