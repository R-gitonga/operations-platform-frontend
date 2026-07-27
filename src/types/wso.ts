import type { CreateWsoLineItemRequest, WsoLineItem } from "./lineItem";

export interface WsoOrder {
    id: number;
    category_id: number | null;
    date_signed: string | null;
    wso_number: string;
    req_number: string | null;
    description: string | null;
    design_code: string | null;
    fabric_code: string | null;
    remarks: string | null;
    attachment_name: string | null;
    attachment_path: string | null;
    status: string;
    current_stage_id: number | null;
    current_stage_name: string | null;
    current_stage_color: string | null;
    current_stage_changed_by: string | null;
    current_stage_changed_at: string | null;
    current_stage_notes: string | null;
}

export interface WsoDetail extends WsoOrder {
    line_item_count: number;

    total_qty_raised: number;

    total_qty_received: number;

    total_balance: number;

    line_items: WsoLineItem[];
}

export interface CreateCompleteWsoRequest {
    category_id?: number;

    date_signed?: string;

    wso_number: string;

    req_number?: string;

    description?: string;

    design_code?: string;

    fabric_code?: string;

    remarks?: string;

    line_items: CreateWsoLineItemRequest[];
}

export interface UpdateWsoRequest {
    category_id?: number;

    date_signed?: string;

    wso_number?: string;

    req_number?: string;

    description?: string;

    design_code?: string;

    fabric_code?: string;

    remarks?: string;

    status?: string;
}

export interface WsoSummary {
    total_orders: number;
    status_counts: Record<string, number>;
    total_quantity: number;
}