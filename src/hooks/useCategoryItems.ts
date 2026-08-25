import { useQuery } from "@tanstack/react-query";

import { getCategoryItems } from "@/api/category";

export function useCategoryItems(categoryId: number | null) {
    return useQuery({
        queryKey: ["category-items", categoryId],

        queryFn: () => getCategoryItems(categoryId as number),

        enabled: categoryId !== null,
    });
}