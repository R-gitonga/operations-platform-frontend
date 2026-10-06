import { api } from "@/lib/api";

import type { PoSettings, UpdatePoSettingsRequest } from "@/types/poSettings";

export async function getPoSettings(): Promise<PoSettings> {
    const response = await api.get<PoSettings>("/po-settings");
    return response.data;
}

export async function updatePoSettings(
    payload: UpdatePoSettingsRequest,
): Promise<PoSettings> {
    const response = await api.put<PoSettings>("/po-settings", payload);
    return response.data;
}