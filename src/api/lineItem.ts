import { api } from "@/lib/api";

import type {
    WsoLineItem,
    CreateWsoLineItemRequest,
    UpdateWsoLineItemRequest,
    ReceiveLineItemRequest,
} from "@/types/lineItem";

export async function createLineItem(
    wsoId: number,
    payload: CreateWsoLineItemRequest
): Promise<WsoLineItem> {
    const response = await api.post(
        `/wso/${wsoId}/line-items`,
        payload
    );

    return response.data;
}

export async function updateLineItem(
    id: number,
    payload: UpdateWsoLineItemRequest
): Promise<WsoLineItem> {
    const response = await api.put(
        `line-items/${id}`,
        payload
    );

    return response.data;
}

export async function deleteLineItem(
    id: number,
): Promise<void> {
    
    await api.delete(
        `/line-items/${id}`
    );

}

export async function receiveLineItem(
    id: number,
    payload: ReceiveLineItemRequest
): Promise<WsoLineItem> {
    const response = await api.patch(
        `/line-items/${id}/receive`,
        payload
    );

    return response.data;
}