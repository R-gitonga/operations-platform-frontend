import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadAttachment } from "@/api/attachment";

export function useUploadAttachment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            file,
        }: {
            id: number;
            file: File;
        }) => uploadAttachment(id, file),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["wso", variables.id],
            });
        },
    });
}