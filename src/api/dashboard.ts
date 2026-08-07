import { api } from "@/lib/api"
import type { 
    DashboardSummary,
    AttentionRequiredItem
 } from "@/types/dashboard";


export async function getDashboard(): Promise<DashboardSummary> {
    const response = await api.get<DashboardSummary>("/dashboard");

    return response.data;
}

export async function getAttentionRequired(): Promise<AttentionRequiredItem[]> {
    const response = await api.get<AttentionRequiredItem[]>(
        "/dashboard/attention-required"
    );

    return response.data;
}