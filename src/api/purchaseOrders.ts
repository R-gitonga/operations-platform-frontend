import { api } from "@/lib/api";

import type {
    PurchaseOrder,
    PurchaseOrderDetail,
    CreatePurchaseOrderRequest,
    UpdatePurchaseOrderRequest,
    PoItem,
    PoItemDetail,
    CreatePoItemRequest,
    UpdatePoItemRequest,
    PoLineItem,
    PoLineItemDetail,
    CreatePoLineItemRequest,
    UpdatePoLineItemRequest,
    PoItemNote,
    CreatePoItemNoteRequest,
    PoProcurementEvent,
    PoReceiptDetail,
    CreatePoReceiptRequest,
    PoDefect,
    CreatePoDefectRequest,
    ResolvePoDefectRequest,
} from "@/types/purchaseOrder";

// --------------------------------------------------
// Purchase Orders
// --------------------------------------------------

export async function getPurchaseOrders(
    search?: string,
    status?: string,
): Promise<PurchaseOrder[]> {

    const params = new URLSearchParams();

    if (search?.trim()) {
        params.append("search", search);
    }

    if (status && status !== "all") {
        params.append("status", status);
    }

    const response = await api.get<PurchaseOrder[]>(
        `/purchase-orders?${params.toString()}`,
    );

    return response.data;
}

export async function getPurchaseOrder(
    id: number,
): Promise<PurchaseOrderDetail> {

    const response = await api.get<PurchaseOrderDetail>(
        `/purchase-orders/${id}`,
    );

    return response.data;
}

export async function createPurchaseOrder(
    payload: CreatePurchaseOrderRequest,
): Promise<PurchaseOrderDetail> {

    const response = await api.post<PurchaseOrderDetail>(
        "/purchase-orders",
        payload,
    );

    return response.data;
}

export async function updatePurchaseOrder(
    id: number,
    payload: UpdatePurchaseOrderRequest,
): Promise<PurchaseOrder> {

    const response = await api.put<PurchaseOrder>(
        `/purchase-orders/${id}`,
        payload,
    );

    return response.data;
}

export async function cancelPurchaseOrder(
    id: number,
): Promise<PurchaseOrder> {

    const response = await api.patch<PurchaseOrder>(
        `/purchase-orders/${id}/cancel`,
    );

    return response.data;
}

export async function reactivatePurchaseOrder(
    id: number,
): Promise<PurchaseOrder> {

    const response = await api.patch<PurchaseOrder>(
        `/purchase-orders/${id}/reactivate`,
    );

    return response.data;
}

export async function uploadPurchaseOrderAttachment(
    id: number,
    file: File,
): Promise<PurchaseOrder> {

    const form = new FormData();

    form.append("file", file);

    const response = await api.post<PurchaseOrder>(
        `/purchase-orders/${id}/attachment`,
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
// PO Items
// --------------------------------------------------

export async function addPoItem(
    purchaseOrderId: number,
    payload: CreatePoItemRequest,
): Promise<PoItemDetail> {

    const response = await api.post<PoItemDetail>(
        `/purchase-orders/${purchaseOrderId}/items`,
        payload,
    );

    return response.data;
}

export async function getPoItem(
    id: number,
): Promise<PoItemDetail> {

    const response = await api.get<PoItemDetail>(
        `/po-items/${id}`,
    );

    return response.data;
}

export async function updatePoItem(
    id: number,
    payload: UpdatePoItemRequest,
): Promise<PoItem> {

    const response = await api.put<PoItem>(
        `/po-items/${id}`,
        payload,
    );

    return response.data;
}

// --------------------------------------------------
// PO Line Items
// --------------------------------------------------

export async function addPoLineItem(
    poItemId: number,
    payload: CreatePoLineItemRequest,
): Promise<PoLineItem> {

    const response = await api.post<PoLineItem>(
        `/po-items/${poItemId}/line-items`,
        payload,
    );

    return response.data;
}

export async function updatePoLineItem(
    id: number,
    payload: UpdatePoLineItemRequest,
): Promise<PoLineItem> {

    const response = await api.put<PoLineItem>(
        `/po-line-items/${id}`,
        payload,
    );

    return response.data;
}

export async function getPoLineItem(
    id: number,
): Promise<PoLineItemDetail> {

    const response = await api.get<PoLineItemDetail>(
        `/po-line-items/${id}`,
    );

    return response.data;
}

// --------------------------------------------------
// PO Item Notes
// --------------------------------------------------

export async function addPoItemNote(
    poItemId: number,
    payload: CreatePoItemNoteRequest,
): Promise<PoItemNote> {

    const response = await api.post<PoItemNote>(
        `/po-items/${poItemId}/notes`,
        payload,
    );

    return response.data;
}

export async function getPoItemNotes(
    poItemId: number,
): Promise<PoItemNote[]> {

    const response = await api.get<PoItemNote[]>(
        `/po-items/${poItemId}/notes`,
    );

    return response.data;
}

export async function getPoProcurementTimeline(
    poItemId: number,
): Promise<PoProcurementEvent[]> {

    const response = await api.get<PoProcurementEvent[]>(
        `/po-items/${poItemId}/procurement-timeline`,
    );

    return response.data;
}

// --------------------------------------------------
// PO Receipts
// --------------------------------------------------

export async function getPoReceipts(
    purchaseOrderId: number,
): Promise<PoReceiptDetail[]> {

    const response = await api.get<PoReceiptDetail[]>(
        `/purchase-orders/${purchaseOrderId}/receipts`,
    );

    return response.data;
}

export async function recordPoReceipt(
    purchaseOrderId: number,
    payload: CreatePoReceiptRequest,
): Promise<PoReceiptDetail> {

    const response = await api.post<PoReceiptDetail>(
        `/purchase-orders/${purchaseOrderId}/receipts`,
        payload,
    );

    return response.data;
}

// --------------------------------------------------
// PO Defects
// --------------------------------------------------

export async function getPoDefects(
    poLineItemId: number,
): Promise<PoDefect[]> {

    const response = await api.get<PoDefect[]>(
        `/po-line-items/${poLineItemId}/defects`,
    );

    return response.data;
}

export async function reportPoDefect(
    poLineItemId: number,
    payload: CreatePoDefectRequest,
): Promise<PoDefect> {

    const response = await api.post<PoDefect>(
        `/po-line-items/${poLineItemId}/defects`,
        payload,
    );

    return response.data;
}

export async function resolvePoDefect(
    defectId: number,
    payload: ResolvePoDefectRequest,
): Promise<PoDefect> {

    const response = await api.patch<PoDefect>(
        `/po-defects/${defectId}/resolve`,
        payload,
    );

    return response.data;
}