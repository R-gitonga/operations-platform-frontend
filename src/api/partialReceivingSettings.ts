import { api } from "@/lib/api";

import type {
    PartialReceivingSettings,
    UpdatePartialReceivingSettings,
} from "@/types/partialReceivingSettings";

export async function getPartialReceivingSettings(): Promise<PartialReceivingSettings> {
    const response = await api.get<PartialReceivingSettings>(
        "/partial-receiving/settings"
    );

    return response.data;
}

export async function updatePartialReceivingSettings(
    settings: UpdatePartialReceivingSettings
): Promise<PartialReceivingSettings> {
    const response = await api.put<PartialReceivingSettings>(
        "/partial-receiving/settings",
        settings
    );

    return response.data;
}