import { useQuery } from "@tanstack/react-query";

import { getProductionStageItems } from "@/api/productionStage";

export function useProductionStageItems(
    stageId?: number,
) {
    return useQuery({
        queryKey:["production-stage-items", stageId],

        queryFn: () => getProductionStageItems(stageId!),

        enabled: stageId !== undefined,
    });
}