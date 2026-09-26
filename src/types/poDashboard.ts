export interface PoOrderSummary {
    total: number;
    active: number;
    partial: number;
    completed: number;
    cancelled: number;
}

export interface PoQuantitySummary {
    qty_ordered: number;
    qty_delivered: number;
    qty_accepted: number;
    qty_defective: number;
    outstanding: number;
}

export interface PoSupplierSummary {
    supplier_id: number;
    supplier_name: string;
    open_orders: number;
    total_qty_ordered: number;
}

export interface PoRecentOrder {
    id: number;
    accounts_reference: string;
    supplier_name: string;
    derived_status: string;
}

export interface PoOutstandingOrder {
    id: number;
    accounts_reference: string;
    supplier_name: string;
    outstanding_qty: number;
}

export interface PoRecentActivity {
    changed_at: string;
    purchase_order_id: number;
    accounts_reference: string;
    po_item_id: number;
    item_description: string | null;
    event_type: "note" | "receipt" | "defect";
    size: string | null;
    changed_by: string;
    note: string | null;
    qty_delivered: number | null;
    total_delivered_to_date: number | null;
    delivered_balance: number | null;
    qty_defective: number | null;
    reason: string | null;
    defect_status: "open" | "resolved" | null;
}

export interface PoRecentActivityPage {
    items: PoRecentActivity[];
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
}

export interface PoDashboardSummary {
    orders: PoOrderSummary;
    quantities: PoQuantitySummary;
    by_supplier: PoSupplierSummary[];
    recent_orders: PoRecentOrder[];
    largest_outstanding: PoOutstandingOrder[];
    recent_activity: PoRecentActivityPage;
}

export interface PoOverdueItem {
    purchase_order_id: number;
    accounts_reference: string;
    supplier_name: string;
    po_item_id: number;
    description: string | null;
    size: string;
    expected_delivery_date: string;
    days_overdue: number;
    outstanding: number;
}