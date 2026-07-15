import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cancelWso } from "@/api/wso";

export function useCancelWso() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => cancelWso(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wsos"],
            });

            queryClient.invalidateQueries({
                queryKey: ["wso"],
            });

            queryClient.invalidateQueries({
                queryKey: ["summary"],
            });
        },
    });
}