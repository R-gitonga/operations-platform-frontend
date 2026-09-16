import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addPoItemNote } from "@/api/purchaseOrders";
import { getApiErrorMessage } from "@/lib/apiError";

import type { CreatePoItemNoteRequest } from "@/types/purchaseOrder";

interface AddPoItemNoteVariables {
    poItemId: number;
    purchaseOrderId: number;
    payload: CreatePoItemNoteRequest;
}

export function useAddPoItemNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ poItemId, payload }: AddPoItemNoteVariables) =>
            addPoItemNote(poItemId, payload),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["po-item-notes", variables.poItemId],
            });

            queryClient.invalidateQueries({
                queryKey: ["purchase-order", variables.purchaseOrderId],
            });

            toast.success("Note added.");
        },

        onError: (error) => {
            toast.error(getApiErrorMessage(error));
        },
    });
}