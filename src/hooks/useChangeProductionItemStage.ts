import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    updateProductionStage,
} from "@/api/production";

import type {
    UpdateProductionStageRequest,
} from "@/types/production";

export function useChangeProductionItemStage(
    wsoId: number,
    productionItemId: number,
) {
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (
            payload: UpdateProductionStageRequest,
        ) =>
            updateProductionStage(
                productionItemId,
                payload,
            ),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["wso", wsoId],
            });

            queryClient.invalidateQueries({
                queryKey: ["wsos"],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "production-stage-history",
                    productionItemId,
                ],
            });

        },

    });
}