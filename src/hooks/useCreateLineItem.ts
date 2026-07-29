import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createLineItem } from "@/api/lineItem";

export function useCreateLineItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            wsoItemId,
            payload,
        }: {
            wsoItemId: number;
            payload: any;
        }) =>
            createLineItem(wsoItemId, payload),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["wso"],
            });

            queryClient.invalidateQueries({
                queryKey: ["wso", variables.wsoItemId],
            });

            queryClient.invalidateQueries({
                queryKey: ["wsos"],
            });
        },
    });
}