import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBrandingLocation } from "@/api/branding";

import type { UpdateBrandingLocationRequest } from "@/types/branding";

export function useUpdateBrandingLocation() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({
            id,
            request,
        }: {
            id: number;
            request: UpdateBrandingLocationRequest;
        }) => updateBrandingLocation(id, request),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["branding-locations"],

            });

        },

    });

}