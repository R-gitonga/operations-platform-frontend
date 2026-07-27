import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateNotificationSetting } from "@/api/settings";

import type { UpdateNotificationSettingRequest } from "@/types/settings";

export function useUpdateNotificationSetting() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({
            id,
            request,
        }: {
            id: number;
            request: UpdateNotificationSettingRequest;
        }) =>
            updateNotificationSetting(id, request),

            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["notification-settings"],
                });
            },
    });
}