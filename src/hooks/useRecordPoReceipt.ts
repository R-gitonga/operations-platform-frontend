import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { recordPoReceipt } from "@/api/purchaseOrders";
import { getApiErrorMessage } from "@/lib/apiError";

import type { CreatePoReceiptRequest } from "@/types/purchaseOrder";

interface RecordPoReceiptVariables {
    purchaseOrderId: number;
    payload: CreatePoReceiptRequest;
}

export function useRecordPoReceipt() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ purchaseOrderId, payload }: RecordPoReceiptVariables) =>
            recordPoReceipt(purchaseOrderId, payload),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["purchase-order", variables.purchaseOrderId],
            });

            queryClient.invalidateQueries({
                queryKey: ["po-receipts", variables.purchaseOrderId],
            });

            // A delivery can touch several items at once and we
            // don't know their ids here -- invalidate every
            // procurement timeline by prefix rather than one.
            queryClient.invalidateQueries({
                queryKey: ["po-procurement-timeline"],
            });

            queryClient.invalidateQueries({
                queryKey: ["purchase-orders"],
            });

            toast.success("Delivery recorded.");
        },

        onError: (error) => {
            toast.error(getApiErrorMessage(error));
        },
    });
}