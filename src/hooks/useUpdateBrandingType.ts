import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBrandingType } from "@/api/branding";

import type { UpdateBrandingTypeRequest } from "@/types/branding";

export function useUpdateBrandingType() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({
            id,
            request,
        }: {
            id: number;
            request: UpdateBrandingTypeRequest;
        }) => updateBrandingType(id, request),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["branding-types"],

            });

        },

    });

}