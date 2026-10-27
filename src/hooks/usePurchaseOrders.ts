import { useQuery } from "@tanstack/react-query";

import { getPurchaseOrders, getPurchaseOrder } from "@/api/purchaseOrders";

export function usePurchaseOrders(
    search?: string,
    status?: string,
    classification?: string,
) {
    return useQuery({
        queryKey: [
            "purchase-orders",
            search,
            status, classification,
        ],

        queryFn: () => getPurchaseOrders(search, status, classification),
    });
}

export function usePurchaseOrder(id: number) {
    return useQuery({
        queryKey: ["purchase-order", id],

        queryFn: () => getPurchaseOrder(id),
    });
}