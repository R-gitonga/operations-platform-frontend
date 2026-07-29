import { useQuery } from "@tanstack/react-query";

import { getStageHistory } from "@/api/production";

export function useProductionItemStageHistory(
    wsoItemId: number,
) {
    return useQuery({

        queryKey: [
            "production-stage-history",
            wsoItemId,
        ],

        queryFn: () =>
            getStageHistory(wsoItemId),

        enabled: !!wsoItemId,

    });
}