import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deactivateBrandingLocation } from "@/api/branding";

export function useDeactivateBrandingLocation() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: deactivateBrandingLocation,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["branding-locations"],

            });

        },

    });

}