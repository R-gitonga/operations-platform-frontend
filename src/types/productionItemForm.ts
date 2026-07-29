import type { CreateWsoLineItemRequest } from "./lineItem";

export interface ProductionItemFormData {
    category_id?: number;

    description: string;

    design_code: string;

    fabric_code: string;

    branding_required: boolean;

    branding_completed: boolean;

    line_items: CreateWsoLineItemRequest[];
}