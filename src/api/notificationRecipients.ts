import { api } from "@/lib/api";

import type { NotificationRecipient, CreateNotificationRecipientRequest } from "@/types/settings";

export async function getNotificationRecipients(): Promise<NotificationRecipient[]> {
    const response = await api.get<NotificationRecipient[]>(
        "/settings/notifications/recipients"
    );

    return response.data
}

export async function updateNotificationRecipient(
    id: number,
    request: {
        notification_event_id: number;
        display_name: string;
        email: string;
        enabled: boolean;
    },
): Promise<NotificationRecipient> {

    const response = await api.patch<NotificationRecipient>(
        `/settings/notifications/recipients/${id}`,
        request,
    );

    return response.data;
}

export async function createNotificationRecipient(
    request: CreateNotificationRecipientRequest,
): Promise<NotificationRecipient> {

    const response = await api.post<NotificationRecipient>(
        "/settings/notifications/recipients",
        request,
    );

    return response.data;
}