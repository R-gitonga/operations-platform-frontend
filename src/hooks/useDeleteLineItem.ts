import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteLineItem } from "@/api/lineItem";

export function useDeleteLineItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteLineItem(id),

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