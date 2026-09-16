export interface PurchaseOrder {
    id: number;

    erp_reference: string;

    accounts_reference: string;

    supplier_id: number;

    supplier_name: string;

    description: string | null;

    attachment_path: string | null;

    attachment_name: string | null;

    status: string;

    created_by: string;

    created_at: string;

    updated_at: string;
}

export interface UpdatePurchaseOrderRequest {
    erp_reference?: string;
    accounts_reference?: string;
    supplier_id?: number;
    supplier_name?: string;
    description?: string;
}

export interface PoLineItem {
    id: number;

    po_item_id: number;

    size: string;

    qty_ordered: number;

    created_at: string;

    updated_at: string;
}

export interface CreatePoLineItemRequest {
    size: string;
    qty_ordered: number;
}

export interface UpdatePoLineItemRequest {
    size: string;
    qty_ordered: number;
}

export interface PoItemNote {
    id: number;

    po_item_id: number;

    note: string;

    created_by: string;

    created_at: string;
}

export interface CreatePoItemNoteRequest {
    note: string;
}

export interface PoItem {
    id: number;

    purchase_order_id: number;

    category_id: number | null;

    description: string | null;

    expected_delivery_date: string | null;

    branding_required: boolean;

    branding_type_id: number | null;

    branding_type_name: string | null;

    branding_location_id: number | null;

    branding_location_name: string | null;

    created_by: string;

    created_at: string;

    updated_at: string;
}

// Used both standalone (adding an item to an existing PO) and
// nested inside CreatePurchaseOrderRequest.
export interface CreatePoItemRequest {
    category_id: number | null;
    description: string | null;
    expected_delivery_date: string | null;
    branding_required: boolean;
    branding_type_id: number | null;
    branding_location_id: number | null;
    line_items: CreatePoLineItemRequest[];
}

export interface UpdatePoItemRequest {
    category_id: number | null;
    description: string | null;
    expected_delivery_date: string | null;
    branding_required: boolean;
    branding_type_id: number | null;
    branding_location_id: number | null;
}

export interface PoItemDetail {
    id: number;

    purchase_order_id: number;

    category_id: number | null;

    description: string | null;

    expected_delivery_date: string | null;

    branding_required: boolean;

    branding_type_id: number | null;

    branding_type_name: string | null;

    branding_location_id: number | null;

    branding_location_name: string | null;

    total_qty_ordered: number;

    created_by: string;

    created_at: string;

    line_items: PoLineItem[];

    notes: PoItemNote[];
}

export interface CreatePurchaseOrderRequest {
    erp_reference: string;

    accounts_reference: string;

    supplier_id: number;

    description: string | null;

    items: CreatePoItemRequest[];
}

export interface PurchaseOrderDetail {
    id: number;

    erp_reference: string;

    accounts_reference: string;

    supplier_id: number;

    supplier_name: string;

    description: string | null;

    attachment_path: string | null;

    attachment_name: string | null;

    status: string;

    total_items: number;

    total_qty_ordered: number;

    created_by: string;

    created_at: string;

    items: PoItemDetail[];
}