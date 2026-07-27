import { useQuery } from "@tanstack/react-query";

import { getNotificationRecipients } from "@/api/notificationRecipients";

export function useNotificationRecipients() {
    return useQuery({
        queryKey: ["notification-recipients"],
        queryFn: getNotificationRecipients,
    });
}