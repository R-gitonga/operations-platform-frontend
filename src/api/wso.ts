import { api } from "@/lib/api";
import type { WsoSummary } from "@/types/summary";
import type {
    WsoOrder,
    WsoDetail,
    CreateCompleteWsoRequest,
    UpdateWsoRequest,
} from "@/types/wso"
export async function createWso(
    payload: CreateCompleteWsoRequest
): Promise<WsoDetail> {
    const response = await api.post(
        "/wso",
        payload
    );

    return response.data;
}

export async function getWsos(): Promise<WsoOrder[]> {
    const response = await api.get<WsoOrder[]>('/wso');

    return response.data;
}

export async function getWso(id: number): Promise<WsoDetail> {
    const response = await api.get(`/wso/${id}`);

    return response.data;
}

export async function updateWso(
    id: number,
    payload: UpdateWsoRequest
) : Promise<WsoDetail> {

    const response = await api.put(
        `/wso/${id}`,
        payload
    );

    return response.data;
}

export async function cancelWso(id: number) {
    const response = await api.patch(
        `/wso/${id}/cancel`
    );

    return response.data;
}

export async function getSummary(): Promise<WsoSummary> {
    const response = await api.get(
        "/wso/summary"
    );

    return response.data;
}

