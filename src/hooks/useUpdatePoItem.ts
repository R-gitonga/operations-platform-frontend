import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updatePoItem } from "@/api/purchaseOrders";

import type { UpdatePoItemRequest } from "@/types/purchaseOrder";

interface UpdatePoItemVariables {
    id: number;
    purchaseOrderId: number;
    payload: UpdatePoItemRequest;
}

export function useUpdatePoItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: UpdatePoItemVariables) =>
            updatePoItem(id, payload),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["purchase-order", variables.purchaseOrderId],
            });

            toast.success("Item updated.");
        },

        onError: (error: any) => {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update item.";

            toast.error(message);
        },
    });
}