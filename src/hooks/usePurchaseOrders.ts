import { useQuery } from "@tanstack/react-query";

import { getPurchaseOrders, getPurchaseOrder } from "@/api/purchaseOrders";

export function usePurchaseOrders(
    search?: string,
    status?: string,
) {
    return useQuery({
        queryKey: [
            "purchase-orders",
            search,
            status,
        ],

        queryFn: () => getPurchaseOrders(search, status),
    });
}

export function usePurchaseOrder(id: number) {
    return useQuery({
        queryKey: ["purchase-order", id],

        queryFn: () => getPurchaseOrder(id),
    });
}