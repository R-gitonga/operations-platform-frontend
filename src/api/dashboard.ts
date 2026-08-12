import { api } from "@/lib/api";
import type {
    DashboardSummary,
    AttentionRequiredItem,
} from "@/types/dashboard";

export async function getDashboard(
    page = 1,
    pageSize = 10
): Promise<DashboardSummary> {
    const response = await api.get<DashboardSummary>(
        "/dashboard",
        {
            params: {
                page,
                page_size: pageSize,
            },
        }
    );

    return response.data;
}

export async function getAttentionRequired(): Promise<AttentionRequiredItem[]> {
    const response = await api.get<AttentionRequiredItem[]>(
        "/dashboard/attention-required"
    );

    return response.data;
}