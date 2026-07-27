import { api } from "@/lib/api";

import type { NotificationEvent } from "@/types/settings";

export async function getNotificationEvents(): Promise<NotificationEvent[]> {
    const response = await api.get<NotificationEvent[]>(
        "/settings/notifications/events"
    );

    return response.data;
}