import { useQuery } from "@tanstack/react-query";

import { getPoDashboard, getPoOverdue } from "@/api/poDashboard";

export function usePoDashboard(page = 1, pageSize = 10) {
    return useQuery({
        queryKey: ["po-dashboard", page, pageSize],
        queryFn: () => getPoDashboard(page, pageSize),
    });
}

export function usePoOverdue() {
    return useQuery({
        queryKey: ["po-dashboard-overdue"],
        queryFn: () => getPoOverdue(),
    });
}