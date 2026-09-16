import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { activateSupplier } from "@/api/suppliers";

export function useActivateSupplier() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: activateSupplier,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["suppliers"],

            });

            toast.success("Supplier activated.");

        },

        onError: (error: any) => {

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to activate supplier.";

            toast.error(message);

        },

    });

}