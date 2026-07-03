import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createWso } from "@/api/wso";

export function useCreateWso() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createWso,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wsos"],
            });

            queryClient.invalidateQueries({
                queryKey: ["summary",]
            });
        },
    });
}