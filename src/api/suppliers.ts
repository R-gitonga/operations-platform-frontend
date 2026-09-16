import { api } from "@/lib/api";

import type {
    Supplier,
    CreateSupplierRequest,
    UpdateSupplierRequest,
} from "@/types/supplier";

export async function getSuppliers(): Promise<Supplier[]> {
    const response = await api.get<Supplier[]>(
        "/suppliers",
    );

    return response.data;
}

export async function getAllSuppliers(): Promise<Supplier[]> {
    const response = await api.get<Supplier[]>(
        "/suppliers/all",
    );

    return response.data;
}

export async function createSupplier(
    request: CreateSupplierRequest,
): Promise<Supplier> {
    const response = await api.post<Supplier>(
        "/suppliers",
        request,
    );

    return response.data;
}

export async function updateSupplier(
    id: number,
    request: UpdateSupplierRequest,
): Promise<Supplier> {
    const response = await api.put<Supplier>(
        `/suppliers/${id}`,
        request,
    );

    return response.data;
}

export async function activateSupplier(
    id: number,
): Promise<Supplier> {
    const response = await api.patch<Supplier>(
        `/suppliers/${id}/activate`,
    );

    return response.data;
}

export async function deactivateSupplier(
    id: number,
): Promise<Supplier> {
    const response = await api.patch<Supplier>(
        `/suppliers/${id}/deactivate`,
    );

    return response.data;
}