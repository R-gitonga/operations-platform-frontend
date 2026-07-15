import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createLineItem } from "@/api/lineItem";

export function useCreateLineItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            wsoId,
            payload,
        }: any) =>
            createLineItem(wsoId, payload),

            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: ["wso", variables.wsoId],
                });

                queryClient.invalidateQueries({
                    queryKey: ["wsos"],
                });
            },
    });
}

