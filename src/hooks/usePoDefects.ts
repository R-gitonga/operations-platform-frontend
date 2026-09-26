import { useQuery } from "@tanstack/react-query";

import { getPoDefects } from "@/api/purchaseOrders";

export function usePoDefects(poLineItemId: number) {
    return useQuery({
        queryKey: ["po-defects", poLineItemId],

        queryFn: () => getPoDefects(poLineItemId),
    });
}