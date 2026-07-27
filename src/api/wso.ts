import { api } from "@/lib/api";

import type {
    WsoOrder,
    WsoDetail,
    CreateCompleteWsoRequest,
    UpdateWsoRequest,
} from "@/types/wso";

import type {
    CreateWsoLineItemRequest,
    UpdateWsoLineItemRequest,
    ReceiveLineItemRequest,
} from "@/types/lineItem";

// --------------------------------------------------
// Workshop Orders
// --------------------------------------------------

export async function getWsos(
    search?: string,
    status?: string,
): Promise<WsoOrder[]> {

    const params = new URLSearchParams();

    if (search?.trim()) {
        params.append("search", search);
    }

    if (status && status !== "all") {
        params.append("status", status);
    }

    const response = await api.get<WsoOrder[]>(
        `/wso?${params.toString()}`
    );

    return response.data;
}

export async function getWso(
    id: number,
): Promise<WsoDetail> {

    const response =
        await api.get<WsoDetail>(`/wso/${id}`);

    return response.data;
}

export async function createWso(
    payload: CreateCompleteWsoRequest,
) {
    const response = await api.post(
        "/wso",
        payload,
    );

    return response.data;
}

export async function updateWso(
    id: number,
    payload: UpdateWsoRequest,
) {
    const response = await api.put(
        `/wso/${id}`,
        payload,
    );

    return response.data;
}

export async function cancelWso(
    id: number,
) {
    return api.post(`/wso/${id}/cancel`);
}

export async function reactivateWso(
    id: number,
) {
    return api.post(`/wso/${id}/reactivate`);
}

export async function uploadAttachment(
    id: number,
    file: File,
) {
    const form = new FormData();

    form.append("file", file);

    const response = await api.post(
        `/wso/${id}/attachment`,
        form,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    );

    return response.data;
}

// --------------------------------------------------
// Line Items
// --------------------------------------------------

export async function createLineItem(
    wsoId: number,
    payload: CreateWsoLineItemRequest,
) {
    const response = await api.post(
        `/wso/${wsoId}/line-items`,
        payload,
    );

    return response.data;
}

export async function updateLineItem(
    id: number,
    payload: UpdateWsoLineItemRequest,
) {
    const response = await api.put(
        `/line-items/${id}`,
        payload,
    );

    return response.data;
}

export async function receiveLineItem(
    id: number,
    payload: ReceiveLineItemRequest,
) {
    const response = await api.post(
        `/line-items/${id}/receive`,
        payload,
    );

    return response.data;
}

export async function deleteLineItem(
    id: number,
) {
    const response = await api.delete(
        `/line-items/${id}`,
    );

    return response.data;
}



