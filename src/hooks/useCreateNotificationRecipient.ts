import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNotificationRecipient } from "@/api/notificationRecipients";

export function useCreateNotificationRecipient() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createNotificationRecipient,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["notification-recipients"],
            });

        },

    });

}