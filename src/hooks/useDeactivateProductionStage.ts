import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deactivateProductionStage } from "@/api/productionStage";

export function useDeactivateProductionStage() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: deactivateProductionStage,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["production-stages"],

            });

        },

    });

}