import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadPurchaseOrderAttachment } from "@/api/purchaseOrders";

export function useUploadPurchaseOrderAttachment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            file,
        }: {
            id: number;
            file: File;
        }) => uploadPurchaseOrderAttachment(id, file),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["purchase-order", variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["purchase-orders"],
            });
        },
    });
}
