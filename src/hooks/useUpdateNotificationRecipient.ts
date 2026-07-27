import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateNotificationRecipient } from "@/api/notificationRecipients";

export function useUpdateNotificationRecipient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            request,
        }: {
            id: number;
            request: {
                notification_event_id: number;
                display_name: string;
                email: string;
                enabled: boolean;
            };
        }) => updateNotificationRecipient(id, request),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notification-recipients"],
            });
        },
    });
}