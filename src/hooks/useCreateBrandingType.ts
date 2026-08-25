import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createBrandingType } from "@/api/branding";

export function useCreateBrandingType() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createBrandingType,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["branding-types"],

            });

        },

    });

}