import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updatePoSettings } from "@/api/poSettings";
import { getApiErrorMessage } from "@/lib/apiError";

import type { UpdatePoSettingsRequest } from "@/types/poSettings";

export function useUpdatePoSettings() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdatePoSettingsRequest) =>
            updatePoSettings(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["po-settings"] });
            toast.success("Purchase order alert settings updated.");
        },

        onError: (error) => {
            toast.error(getApiErrorMessage(error));
        },
    });
}