import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateLineItem } from "@/api/lineItem";

export function useUpdateLineItem() {
    const queryCLient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: any) => updateLineItem(id, payload),

        onSuccess: (_, variables) => {
            queryCLient.invalidateQueries({
                queryKey: ["wso",]
            });

            queryCLient.invalidateQueries({
                queryKey: ["wso", variables.id],
            });

            queryCLient.invalidateQueries({
                queryKey: ["wsos"],
            });
        },
    });
}