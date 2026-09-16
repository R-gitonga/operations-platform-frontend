import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createPurchaseOrder } from "@/api/purchaseOrders";

export function useCreatePurchaseOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPurchaseOrder,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["purchase-orders"],
            });

            toast.success("Purchase Order created successfully.");
        },

        onError: (error: any) => {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to create Purchase Order.";

            toast.error(message);
        },
    });
}