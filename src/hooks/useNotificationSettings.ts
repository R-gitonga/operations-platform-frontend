import { useQuery } from "@tanstack/react-query";

import { getNotificationSettings } from "@/api/settings";

export function useNotificationSettings() {

    return useQuery({

        queryKey: ["notification-settings"],

        queryFn: getNotificationSettings,
    });
}