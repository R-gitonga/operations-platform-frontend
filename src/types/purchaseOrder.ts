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

// Resolution: 'replaced' | 'returned_for_credit' | 'written_off' | 'accepted'
export interface PoDefect {
    id: number;

    po_line_item_id: number;

    qty_defective: number;

    reason: string;

    status: "open" | "resolved";

    resolution_type: string | null;

    resolution_notes: string | null;

    reported_by: string;

    reported_at: string;

    resolved_by: string | null;

    resolved_at: string | null;
}

export interface CreatePoDefectRequest {
    qty_defective: number;
    reason: string;
}

export interface ResolvePoDefectRequest {
    resolution_type: "replaced" | "returned_for_credit" | "written_off" | "accepted";
    resolution_notes?: string;
}

// total_accepted = total_delivered - total_defective. outstanding
// can rise above zero again if a defect is reported after receiving
// looked complete.
export interface PoLineItemDetail extends PoLineItem {
    total_delivered: number;
    total_defective: number;
    total_accepted: number;
    outstanding: number;
    defects: PoDefect[];
}

export interface PoReceiptLine {
    id: number;

    po_receipt_id: number;

    po_line_item_id: number;

    qty_delivered: number;

    total_delivered_to_date: number;

    delivered_balance: number;
}

export interface CreatePoReceiptLineRequest {
    po_line_item_id: number;
    qty_delivered: number;
}

export interface PoReceipt {
    id: number;

    purchase_order_id: number;

    delivery_note_reference: string | null;

    notes: string | null;

    received_by: string;

    received_at: string;

    created_at: string;
}

// received_by is NOT part of this request -- it's stamped from the
// authenticated user on the backend.
export interface CreatePoReceiptRequest {
    delivery_note_reference?: string | null;
    notes?: string | null;
    lines: CreatePoReceiptLineRequest[];
}

export interface PoReceiptDetail extends PoReceipt {
    lines: PoReceiptLine[];
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

    total_qty_delivered: number;

    total_qty_accepted: number;

    created_by: string;

    created_at: string;

    line_items: PoLineItemDetail[];

    notes: PoItemNote[];
}

export interface CreatePurchaseOrderRequest {
    erp_reference: string;

    accounts_reference: string;

    supplier_id: number;

    description: string | null;

    items: CreatePoItemRequest[];
}

// status is the raw persisted value ('active'/'cancelled') -- use
// it for permission checks (e.g. can this be edited/cancelled).
// derived_status is the computed display label
// ('active'/'partial'/'completed'/'cancelled').
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

    derived_status: string;

    total_items: number;

    total_qty_ordered: number;

    total_qty_delivered: number;

    total_qty_accepted: number;

    total_qty_defective: number;

    total_outstanding: number;

    created_by: string;

    created_at: string;

    items: PoItemDetail[];

    receipts: PoReceiptDetail[];
}


// Merged, server-computed timeline: one entry per note, per
// delivery line, and per defect, sorted newest-first. Fields
// outside an entry's own event_type are always null.
export interface PoProcurementEvent {
    id: string;

    po_item_id: number;

    event_type: "note" | "receipt" | "defect";

    size: string | null;

    note: string | null;

    qty_delivered: number | null;
    total_delivered_to_date: number | null;
    delivered_balance: number | null;
    delivery_note_reference: string | null;

    qty_defective: number | null;
    reason: string | null;
    defect_status: "open" | "resolved" | null;
    resolution_type: string | null;
    resolution_notes: string | null;

    changed_by: string;

    changed_at: string;
}