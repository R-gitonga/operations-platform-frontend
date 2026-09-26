import { api } from "@/lib/api";

import type {
    PoDashboardSummary,
    PoOverdueItem,
} from "@/types/poDashboard";

export async function getPoDashboard(
    page = 1,
    pageSize = 10,
): Promise<PoDashboardSummary> {

    const response = await api.get<PoDashboardSummary>(
        "/purchase-orders/dashboard",
        {
            params: {
                page,
                page_size: pageSize,
            },
        },
    );

    return response.data;
}

export async function getPoOverdue(): Promise<PoOverdueItem[]> {

    const response = await api.get<PoOverdueItem[]>(
        "/purchase-orders/dashboard/overdue",
    );

    return response.data;
}