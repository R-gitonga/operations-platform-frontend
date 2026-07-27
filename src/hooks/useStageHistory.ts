import { useQuery } from "@tanstack/react-query";

import { getStageHistory } from "@/api/production";

export function useStageHistory(
    wsoId: number,
) {
    return useQuery({

        queryKey: [
            "stage-history",
            wsoId,
        ],

        queryFn: () =>
            getStageHistory(wsoId),

        enabled: !!wsoId,

    });
}