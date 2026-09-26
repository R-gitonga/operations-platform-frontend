import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { resolvePoDefect } from "@/api/purchaseOrders";
import { getApiErrorMessage } from "@/lib/apiError";

import type { ResolvePoDefectRequest } from "@/types/purchaseOrder";

interface ResolvePoDefectVariables {
    defectId: number;
    poLineItemId: number;
    purchaseOrderId: number;
    payload: ResolvePoDefectRequest;
}

export function useResolvePoDefect() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ defectId, payload }: ResolvePoDefectVariables) =>
            resolvePoDefect(defectId, payload),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["po-defects", variables.poLineItemId],
            });

            queryClient.invalidateQueries({
                queryKey: ["purchase-order", variables.purchaseOrderId],
            });

            queryClient.invalidateQueries({
                queryKey: ["po-procurement-timeline"],
            });

            toast.success("Defect resolved.");
        },

        onError: (error) => {
            toast.error(getApiErrorMessage(error));
        },
    });
}