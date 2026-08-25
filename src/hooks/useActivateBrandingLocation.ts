import { useMutation, useQueryClient } from "@tanstack/react-query";

import { activateBrandingLocation } from "@/api/branding";

export function useActivateBrandingLocation() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: activateBrandingLocation,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["branding-locations"],

            });

        },

    });

}