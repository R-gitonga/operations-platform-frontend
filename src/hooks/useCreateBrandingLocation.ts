import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createBrandingLocation } from "@/api/branding";

export function useCreateBrandingLocation() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createBrandingLocation,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["branding-locations"],

            });

        },

    });

}