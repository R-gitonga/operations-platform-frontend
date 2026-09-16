import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { cancelPurchaseOrder } from "@/api/purchaseOrders";

export function useCancelPurchaseOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cancelPurchaseOrder,

        onSuccess: async (_, id) => {

            await queryClient.invalidateQueries({
                queryKey: ["purchase-orders"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["purchase-order", id],
            });

            toast.success("Purchase Order cancelled.");
        },

        onError: (error: any) => {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to cancel Purchase Order.";

            toast.error(message);
        },
    });
}