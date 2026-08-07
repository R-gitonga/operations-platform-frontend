import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProductionStage } from "@/api/productionStage";

import type { UpdateProductionStageRequest } from "@/types/productionStage";

export function useUpdateProductionStage() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({
            id,
            request,
        }: {
            id: number;
            request: UpdateProductionStageRequest;
        }) => updateProductionStage(id, request),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["production-stages"],

            });

        },

    });

}