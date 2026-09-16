import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateSupplier } from "@/api/suppliers";

import type { UpdateSupplierRequest } from "@/types/supplier";

export function useUpdateSupplier() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({
            id,
            request,
        }: {
            id: number;
            request: UpdateSupplierRequest;
        }) => updateSupplier(id, request),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["suppliers"],

            });

            toast.success("Supplier updated successfully.");

        },

        onError: (error: any) => {

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update supplier.";

            toast.error(message);

        },

    });

}