import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cancelWso } from "@/api/wso";

export function useCancelWso() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cancelWso,

        onSuccess: async (_, id) => {

            await queryClient.invalidateQueries({
                queryKey: ["wsos"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["summary"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["wso", id],
            });

            await queryClient.refetchQueries({
                queryKey: ["wso", id],
            });
        },
    });
}