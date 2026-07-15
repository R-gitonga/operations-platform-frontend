import { useMutation, useQueryClient } from "@tanstack/react-query";

import { receiveLineItem } from "@/api/lineItem";

import type { ReceiveLineItemRequest } from "@/types/lineItem";

interface ReceiveLineItemMutation {
    id: number;
    payload: ReceiveLineItemRequest;
}

export function useReceiveLineItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: ReceiveLineItemMutation) =>
            receiveLineItem(id, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wsos"],
            });

            queryClient.invalidateQueries({
                queryKey: ["wso"],
            });
        },
    });
}