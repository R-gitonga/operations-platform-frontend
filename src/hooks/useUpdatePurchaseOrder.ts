import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updatePurchaseOrder } from "@/api/purchaseOrders";

import type { UpdatePurchaseOrderRequest } from "@/types/purchaseOrder";

interface UpdatePurchaseOrderVariables {
    id: number;
    payload: UpdatePurchaseOrderRequest;
}

export function useUpdatePurchaseOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: UpdatePurchaseOrderVariables) =>
            updatePurchaseOrder(id, payload),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["purchase-order", variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["purchase-orders"],
            });

            toast.success("Purchase Order updated successfully.");
        },

        onError: (error: any) => {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update Purchase Order.";

            toast.error(message);
        },
    });
}