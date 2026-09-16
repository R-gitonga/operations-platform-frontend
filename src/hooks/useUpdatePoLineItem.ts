import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updatePoLineItem } from "@/api/purchaseOrders";

import type { UpdatePoLineItemRequest } from "@/types/purchaseOrder";

interface UpdatePoLineItemVariables {
    id: number;
    purchaseOrderId: number;
    payload: UpdatePoLineItemRequest;
}

export function useUpdatePoLineItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: UpdatePoLineItemVariables) =>
            updatePoLineItem(id, payload),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["purchase-order", variables.purchaseOrderId],
            });

            toast.success("Line updated.");
        },

        onError: (error: any) => {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update line.";

            toast.error(message);
        },
    });
}