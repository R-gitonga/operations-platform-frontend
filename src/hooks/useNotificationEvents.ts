import { useQuery } from "@tanstack/react-query";

import { getNotificationEvents } from "@/api/notificationEvents";

export function useNotificationEvents() {
    return useQuery({
        queryKey: ["notification-events"],
        queryFn: getNotificationEvents,
    });
}