import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getProductionStages,
    getStageHistory,
    updateProductionStage,
} from "@/api/production";

import type {
    UpdateProductionStageRequest,
} from "@/types/production";

// --------------------------------------------------
// Production Stages
// --------------------------------------------------

export function useProductionStages() {

    return useQuery({

        queryKey: ["production-stages"],

        queryFn: getProductionStages,
    });
}

// --------------------------------------------------
// Stage History
// --------------------------------------------------

export function useStageHistory(
    wsoId: number,
) {

    return useQuery({

        queryKey: ["stage-history", wsoId],

        queryFn: () => getStageHistory(wsoId),

        enabled: !!wsoId,
    });
}

// --------------------------------------------------
// Change Stage
// --------------------------------------------------

export function useUpdateProductionStage(
    wsoId: number,
) {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (

            payload: UpdateProductionStageRequest,

        ) => updateProductionStage(

            wsoId,

            payload,

        ),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["stage-history", wsoId],

            });

            queryClient.invalidateQueries({

                queryKey: ["wso", wsoId],

            });

            queryClient.invalidateQueries({

                queryKey: ["wsos"],

            });
        },
    });
}