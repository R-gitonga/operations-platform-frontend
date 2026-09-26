import { useQuery } from "@tanstack/react-query";

import { getPoReceipts } from "@/api/purchaseOrders";

export function usePoReceipts(purchaseOrderId: number) {
    return useQuery({
        queryKey: ["po-receipts", purchaseOrderId],

        queryFn: () => getPoReceipts(purchaseOrderId),
    });
}