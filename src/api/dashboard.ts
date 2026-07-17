import { api } from "@/lib/api"
import type { DashboardSummary } from "@/types/dashboard";


export async function getDashboard(): Promise<DashboardSummary> {
    const response = await api.get<DashboardSummary>("/dashboard");

    return response.data;
}
