import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createSupplier } from "@/api/suppliers";

export function useCreateSupplier() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createSupplier,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["suppliers"],

            });

            toast.success("Supplier created successfully.");

        },

        onError: (error: any) => {

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to create supplier.";

            toast.error(message);

        },

    });

}