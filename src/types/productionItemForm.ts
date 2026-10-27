import type { CreateWsoLineItemRequest } from "./lineItem";

export interface ProductionItemBrandingFormData {
    branding_type_id: number;
    branding_location_id: number;
    quantity: number;
}

export interface ProductionItemFormData {
    paid_order_reason?: "mtm" | "stock_out" | null;
    category_id?: number;
    description: string;
    design_code: string;
    fabric_code: string;
    branding_required: boolean;
    branding: ProductionItemBrandingFormData[];
    line_items: CreateWsoLineItemRequest[];
}