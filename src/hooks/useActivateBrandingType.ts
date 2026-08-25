import { useMutation, useQueryClient } from "@tanstack/react-query";

import { activateBrandingType } from "@/api/branding";

export function useActivateBrandingType() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: activateBrandingType,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["branding-types"],

            });

        },

    });

}