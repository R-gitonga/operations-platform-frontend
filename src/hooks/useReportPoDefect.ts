import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { reportPoDefect } from "@/api/purchaseOrders";
import { getApiErrorMessage } from "@/lib/apiError";

import type { CreatePoDefectRequest } from "@/types/purchaseOrder";

interface ReportPoDefectVariables {
    poLineItemId: number;
    purchaseOrderId: number;
    payload: CreatePoDefectRequest;
}

export function useReportPoDefect() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ poLineItemId, payload }: ReportPoDefectVariables) =>
            reportPoDefect(poLineItemId, payload),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["po-defects", variables.poLineItemId],
            });

            queryClient.invalidateQueries({
                queryKey: ["purchase-order", variables.purchaseOrderId],
            });

            // We only have the line item id here, not its parent
            // po_item id -- invalidate every procurement timeline
            // by prefix.
            queryClient.invalidateQueries({
                queryKey: ["po-procurement-timeline"],
            });

            toast.success("Defect reported.");
        },

        onError: (error) => {
            toast.error(getApiErrorMessage(error));
        },
    });
}