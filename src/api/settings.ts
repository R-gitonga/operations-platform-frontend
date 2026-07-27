import { api } from "@/lib/api";

import type {
    NotificationSetting,
    UpdateNotificationSettingRequest,

 } from "@/types/settings";

export async function getNotificationSettings(): Promise<NotificationSetting[]> {
    const response = await api.get<NotificationSetting[]>(
        "/settings/notifications"
    );

    return response.data;
}


export async function updateNotificationSetting(
    id: number,
    request: UpdateNotificationSettingRequest,
) {
    await api.patch(
        `/settings/notifications/${id}`,
        request,
    );
}