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

export function useChangeStage(
    wsoId: number,
) {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (
            payload: UpdateProductionStageRequest,
        ) =>
            updateProductionStage(
                wsoId,
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
                queryKey: ["stage-history", wsoId],
            });

        },

    });

}