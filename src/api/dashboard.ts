import { api } from "@/lib/api"
import type { WsoSummary } from "@/types/summary";

export async function getSummary(): Promise<WsoSummary> {
    const response = await api.get("/wso/summary");

    return response.data;
}
