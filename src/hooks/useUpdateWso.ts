import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateWso } from "@/api/wso";

import type { UpdateWsoRequest } from "@/types/wso";

interface UpdateWsoVariables {
    id: number;
    payload: UpdateWsoRequest;
}

export function useUpdateWso() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, payload}: UpdateWsoVariables) => updateWso(id, payload),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["wso", variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["wsos"],
            });

            queryClient.invalidateQueries({
                queryKey: ["summary"],
            });
        },
    });
}