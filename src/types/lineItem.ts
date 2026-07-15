export interface WsoLineItem {
    id: number;
    wso_order_id: number;

    size: string;

    qty_raised: number;
    qty_received: number;

    received_date: string | null;

    status: string;

    balance: number;
}

export interface CreateWsoLineItemRequest {
    size: string;

    qty_raised: number;

    qty_received?: number;

    received_date?: string | null

    status?: string;
}

export interface UpdateWsoLineItemRequest {
    size?: string;

    qty_raised?: number;

    qty_received?: number;

    received_date?: string | null

    status?: string;
}

export interface ReceiveLineItemRequest {
    quantity: number;
}
