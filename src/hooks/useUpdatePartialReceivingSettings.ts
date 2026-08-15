import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updatePartialReceivingSettings } from "@/api/partialReceivingSettings";

import type { UpdatePartialReceivingSettings } from "@/types/partialReceivingSettings";

export function useUpdatePartialReceivingSettings() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            settings: UpdatePartialReceivingSettings
        ) => updatePartialReceivingSettings(settings),

        onSuccess: (updatedSettings) => {
            queryClient.setQueryData(
                ["partial-receiving", "settings"],
                updatedSettings
            );
        },
    });
}