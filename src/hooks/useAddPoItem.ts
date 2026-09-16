import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addPoItem } from "@/api/purchaseOrders";

import type {CreatePoItemRequest} from "@/types/purchaseOrder"
interface AddPoItemVariables {
    purchaseOrderId: number;
    payload: CreatePoItemRequest;
}

export function useAddPoItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ purchaseOrderId, payload }: AddPoItemVariables) =>
            addPoItem(purchaseOrderId, payload),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["purchase-order", variables.purchaseOrderId],
            });

            toast.success("Item added to Purchase Order.");
        },

        onError: (error: any) => {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to add item.";

            toast.error(message);
        },
    });
}