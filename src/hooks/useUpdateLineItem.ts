import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateLineItem } from "@/api/lineItem";

export function useUpdateLineItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: any) => updateLineItem(id, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wso"],
            });

            queryClient.invalidateQueries({
                queryKey: ["wsos"],
            });
        },
    });
}