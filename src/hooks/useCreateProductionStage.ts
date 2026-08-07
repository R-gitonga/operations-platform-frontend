import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProductionStage } from "@/api/productionStage";

export function useCreateProductionStage() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createProductionStage,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["production-stages"],

            });

        },

    });

}