import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deactivateSupplier } from "@/api/suppliers";

export function useDeactivateSupplier() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: deactivateSupplier,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["suppliers"],

            });

            toast.success("Supplier deactivated.");

        },

        onError: (error: any) => {

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to deactivate supplier.";

            toast.error(message);

        },

    });

}