import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCategory } from "@/api/category";

import type { Category, CreateCategoryRequest } from "@/types/category";

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateCategoryRequest) =>
            createCategory(payload),

        onSuccess: (category) => {
            queryClient.setQueryData<Category[]>(
                ["categories"],
                (old = []) => [...old, category]
            );
            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },
    });
}