import type {
    CreateWsoLineItemRequest,
    WsoLineItem,
} from "./lineItem";
import type { ProductionItemFormData } from "./productionItemForm";

export interface WsoOrder {
    id: number;

    date_signed: string | null;

    wso_number: string;

    req_number: string | null;

    attachment_name: string | null;

    attachment_path: string | null;

    status: string;

    created_at?: string | null;

    updated_at?: string | null;
}

export interface WsoDetail {
    id: number;

    date_signed: string | null;

    wso_number: string;

    req_number: string | null;

    attachment_name: string | null;

    attachment_path: string | null;

    status: string;

    total_items: number;

    total_qty_raised: number;

    total_qty_received: number;

    total_balance: number;

    items: WsoItemDetail[];
}

export interface WsoItemDetail {
    id: number;

    category_id: number | null;

    description: string | null;

    design_code: string | null;

    fabric_code: string | null;

    branding_required: boolean;

    branding_completed: boolean;

    current_stage_id: number | null;

    current_stage_name: string | null;

    current_stage_color: string | null;

    current_stage_changed_by: string | null;

    current_stage_changed_at: string | null;

    current_stage_notes: string | null;

    total_qty_raised: number;

    total_qty_received: number;

    total_balance: number;

    line_items: WsoLineItem[];
}


export interface CreateCompleteWsoRequest {
    date_signed?: string;

    wso_number: string;

    req_number?: string;

    items: ProductionItemFormData[];
}

export interface UpdateWsoRequest {
    date_signed?: string;

    wso_number?: string;

    req_number?: string;

    status?: string;
}

export interface WsoSummary {
    total_orders: number;

    status_counts: Record<string, number>;

    total_qty_raised: number;

    total_qty_received: number;

    total_balance: number;
}