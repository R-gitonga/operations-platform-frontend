import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deactivateBrandingType } from "@/api/branding";

export function useDeactivateBrandingType() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: deactivateBrandingType,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["branding-types"],

            });

        },

    });

}