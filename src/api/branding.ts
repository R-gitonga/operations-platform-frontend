import { api } from "@/lib/api";

import type {
    BrandingType,
    BrandingLocation,
    CreateBrandingTypeRequest,
    UpdateBrandingTypeRequest,
    CreateBrandingLocationRequest,
    UpdateBrandingLocationRequest,
} from "@/types/branding";

// --------------------------------------------------
// Branding Types
// --------------------------------------------------

export async function getBrandingTypes(): Promise<BrandingType[]> {
    const response = await api.get<BrandingType[]>(
        "/branding/types",
    );

    return response.data;
}

export async function getAllBrandingTypes(): Promise<BrandingType[]> {
    const response = await api.get<BrandingType[]>(
        "/branding/types/all",
    );

    return response.data;
}

export async function createBrandingType(
    request: CreateBrandingTypeRequest,
): Promise<BrandingType> {
    const response = await api.post<BrandingType>(
        "/branding/types",
        request,
    );

    return response.data;
}

export async function updateBrandingType(
    id: number,
    request: UpdateBrandingTypeRequest,
): Promise<BrandingType> {
    const response = await api.put<BrandingType>(
        `/branding/types/${id}`,
        request,
    );

    return response.data;
}

export async function activateBrandingType(
    id: number,
): Promise<BrandingType> {
    const response = await api.patch<BrandingType>(
        `/branding/types/${id}/activate`,
    );

    return response.data;
}

export async function deactivateBrandingType(
    id: number,
): Promise<BrandingType> {
    const response = await api.patch<BrandingType>(
        `/branding/types/${id}/deactivate`,
    );

    return response.data;
}

// --------------------------------------------------
// Branding Locations
// --------------------------------------------------

export async function getBrandingLocations(): Promise<BrandingLocation[]> {
    const response = await api.get<BrandingLocation[]>(
        "/branding/locations",
    );

    return response.data;
}

export async function getAllBrandingLocations(): Promise<BrandingLocation[]> {
    const response = await api.get<BrandingLocation[]>(
        "/branding/locations/all",
    );

    return response.data;
}

export async function createBrandingLocation(
    request: CreateBrandingLocationRequest,
): Promise<BrandingLocation> {
    const response = await api.post<BrandingLocation>(
        "/branding/locations",
        request,
    );

    return response.data;
}

export async function updateBrandingLocation(
    id: number,
    request: UpdateBrandingLocationRequest,
): Promise<BrandingLocation> {
    const response = await api.put<BrandingLocation>(
        `/branding/locations/${id}`,
        request,
    );

    return response.data;
}

export async function activateBrandingLocation(
    id: number,
): Promise<BrandingLocation> {
    const response = await api.patch<BrandingLocation>(
        `/branding/locations/${id}/activate`,
    );

    return response.data;
}

export async function deactivateBrandingLocation(
    id: number,
): Promise<BrandingLocation> {
    const response = await api.patch<BrandingLocation>(
        `/branding/locations/${id}/deactivate`,
    );

    return response.data;
}