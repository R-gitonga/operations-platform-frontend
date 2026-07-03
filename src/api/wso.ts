import { api } from "@/lib/api";
import type { WsoOrder } from "@/types/wso";
import type { WsoDetail } from "@/types/wsoDetail";
import type { CreateCompleteWsoRequest } from "@/types/createWso";

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