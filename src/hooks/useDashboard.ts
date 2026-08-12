import { useQuery } from "@tanstack/react-query";

import { getDashboard } from "@/api/dashboard";

export function useDashboard(
    page = 1,
    pageSize = 10
) {
    return useQuery({
        queryKey: ["dashboard", page, pageSize],
        queryFn: () => getDashboard(page, pageSize),
    });
}