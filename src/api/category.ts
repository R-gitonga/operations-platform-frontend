import { api } from "@/lib/api";

import type { Category, CreateCategoryRequest, UpdateCategoryRequest } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
    const response = await api.get(
        "/categories"
    );

    return response.data;
}

export async function createCategory(
    payload: CreateCategoryRequest
): Promise<Category> {
    const response = await api.post(
        "/categories",
        payload
    );

    return response.data;
}

export async function updateCategory(
    id: number,
    payload: UpdateCategoryRequest
): Promise<Category> {
    const response = await api.put(
        `/categories/${id}`,
        payload
    );

    return response.data;
}

export async function deleteCategory(
    id: number
): Promise<Category> {
    const response = await api.delete(
        `/categories/${id}`
    );

    return response.data;
}