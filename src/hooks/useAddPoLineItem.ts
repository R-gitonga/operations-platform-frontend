import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addPoLineItem } from "@/api/purchaseOrders";

import type { CreatePoLineItemRequest } from "@/types/purchaseOrder";

interface AddPoLineItemVariables {
    poItemId: number;
    purchaseOrderId: number;
    payload: CreatePoLineItemRequest;
}

export function useAddPoLineItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ poItemId, payload }: AddPoLineItemVariables) =>
            addPoLineItem(poItemId, payload),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["purchase-order", variables.purchaseOrderId],
            });

            toast.success("Line added.");
        },

        onError: (error: any) => {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to add line.";

            toast.error(message);
        },
    });
}