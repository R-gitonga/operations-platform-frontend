import { useQuery } from "@tanstack/react-query";

import { getPoProcurementTimeline } from "@/api/purchaseOrders";

export function usePoProcurementTimeline(poItemId: number) {
    return useQuery({
        queryKey: ["po-procurement-timeline", poItemId],

        queryFn: () => getPoProcurementTimeline(poItemId),
    });
}