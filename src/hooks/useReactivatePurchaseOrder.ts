import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { reactivatePurchaseOrder } from "@/api/purchaseOrders";

export function useReactivatePurchaseOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: reactivatePurchaseOrder,

        onSuccess: async (_, id) => {

            await queryClient.invalidateQueries({
                queryKey: ["purchase-orders"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["purchase-order", id],
            });

            toast.success("Purchase Order reactivated.");
        },

        onError: (error: any) => {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to reactivate Purchase Order.";

            toast.error(message);
        },
    });
}